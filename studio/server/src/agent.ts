import { query } from '@anthropic-ai/claude-agent-sdk';
import type { Options, SDKMessage } from '@anthropic-ai/claude-agent-sdk';
import { PROJECT_ROOT, AGENT_MODEL } from './config.ts';
import type { SessionState } from './sessions.ts';

// Decided once at boot by probeSkills(): does skill resolution work from a nested
// session cwd, or must we run from PROJECT_ROOT?
let cwdMode: 'session' | 'projectRoot' = 'session';
export function setCwdMode(mode: 'session' | 'projectRoot') {
  cwdMode = mode;
}
export function getCwdMode() {
  return cwdMode;
}

/** Normalized events the rest of the server understands. */
export type AgentEvent =
  | { kind: 'session'; sdkSessionId: string; skills: string[] }
  | { kind: 'token'; text: string }
  | { kind: 'tool'; name: string; summary: string }
  | { kind: 'write'; path: string }
  | { kind: 'done'; result: string }
  | { kind: 'auth_error'; message: string }
  | { kind: 'error'; message: string };

function baseOptions(session: SessionState): Options {
  return {
    cwd: cwdMode === 'session' ? session.outputDir : PROJECT_ROOT,
    model: AGENT_MODEL,
    settingSources: ['user', 'project', 'local'], // loads PROJECT_ROOT/.claude/skills
    permissionMode: 'bypassPermissions', // headless: no human to approve tool prompts
    allowDangerouslySkipPermissions: true,
    tools: { type: 'preset', preset: 'claude_code' }, // includes the Skill tool
    includePartialMessages: true, // token-by-token streaming via stream_event
    additionalDirectories: [session.outputDir, PROJECT_ROOT],
  };
}

/**
 * Run one conversational turn. Yields normalized AgentEvents. Captures the SDK
 * session id (for resume) and any .html Write paths into the session.
 */
export async function* runTurn(
  session: SessionState,
  prompt: string,
): AsyncGenerator<AgentEvent> {
  const options: Options = {
    ...baseOptions(session),
    ...(session.sdkSessionId ? { resume: session.sdkSessionId } : {}),
  };

  // Always steer the agent to write the report HTML into this session's output
  // dir (absolute path). The skills say "save to the project/working directory",
  // which the model otherwise resolves to the project root — polluting it and
  // breaking per-session isolation. detectArtifacts() relocates strays as a
  // safety net, but steering keeps it clean in the common case.
  const steer = `\n\n[系统要求：生成的报告 HTML 文件必须使用绝对路径保存到此目录中：${session.outputDir}/ 。不要保存到项目根目录或其他位置。]`;

  try {
    for await (const message of query({ prompt: prompt + steer, options }) as AsyncIterable<SDKMessage>) {
      if (process.env.DEBUG_AGENT) console.error('[agent] msg:', message.type, (message as any).subtype ?? '');
      switch (message.type) {
        case 'system': {
          if (message.subtype === 'init') {
            session.sdkSessionId = message.session_id;
            yield { kind: 'session', sdkSessionId: message.session_id, skills: message.skills ?? [] };
          }
          break;
        }
        case 'stream_event': {
          // Partial streaming: emit text deltas as tokens.
          const ev: any = message.event;
          if (ev?.type === 'content_block_delta' && ev.delta?.type === 'text_delta') {
            const text: string = ev.delta.text ?? '';
            if (text) yield { kind: 'token', text };
          }
          break;
        }
        case 'assistant': {
          // Use full assistant message only for tool_use detection (text already
          // streamed via stream_event). Capture .html Write paths.
          if (message.error === 'authentication_failed') {
            yield { kind: 'auth_error', message: 'authentication_failed' };
          }
          const content: any[] = (message.message as any)?.content ?? [];
          for (const block of content) {
            if (block?.type === 'tool_use') {
              const name: string = block.name;
              yield { kind: 'tool', name, summary: summarizeTool(name, block.input) };
              const fp = extractWritePath(name, block.input);
              if (fp && fp.endsWith('.html')) {
                session.pendingWritePaths.push(fp);
                yield { kind: 'write', path: fp };
              }
            }
          }
          break;
        }
        case 'result': {
          if (message.subtype === 'success') {
            yield { kind: 'done', result: message.result ?? '' };
          } else {
            yield { kind: 'error', message: `result:${message.subtype}` };
          }
          break;
        }
        case 'auth_status': {
          if (message.error) yield { kind: 'auth_error', message: message.error };
          break;
        }
        default:
          break;
      }
    }
  } catch (err: any) {
    const msg = String(err?.message ?? err);
    if (/auth|login|unauthor|credential|oauth|401/i.test(msg)) {
      yield { kind: 'auth_error', message: msg };
    } else {
      yield { kind: 'error', message: msg };
    }
  }
}

function extractWritePath(name: string, input: any): string | undefined {
  if (!input) return undefined;
  // Write / Edit / MultiEdit use file_path; NotebookEdit uses notebook_path
  if (name === 'Write' || name === 'Edit' || name === 'MultiEdit') {
    return typeof input.file_path === 'string' ? input.file_path : undefined;
  }
  return undefined;
}

function summarizeTool(name: string, input: any): string {
  switch (name) {
    case 'Skill':
      return `技能：${input?.command ?? input?.name ?? input?.skill ?? ''}`.trim();
    case 'Write':
      return `写入报告：${basename(input?.file_path)}`;
    case 'Edit':
    case 'MultiEdit':
      return `编辑：${basename(input?.file_path)}`;
    case 'Bash':
      return `运行命令`;
    case 'Read':
      return `读取：${basename(input?.file_path)}`;
    default:
      return name;
  }
}

function basename(p?: string): string {
  if (!p || typeof p !== 'string') return '';
  return p.split('/').pop() ?? p;
}

/**
 * Boot-time probe: confirm the SDK can see the project skills. Tries the nested
 * session-cwd first; if skills are missing, retries from PROJECT_ROOT and sets
 * the global cwd mode accordingly. Returns the discovered skill list + auth state.
 */
export async function probeSkills(
  expected: string[],
  probeCwd: string,
): Promise<{ ok: boolean; mode: 'session' | 'projectRoot'; skills: string[]; authed: boolean; reason?: string }> {
  async function runProbe(cwd: string): Promise<{ skills: string[]; authed: boolean; reason?: string }> {
    const options: Options = {
      cwd,
      model: AGENT_MODEL,
      settingSources: ['user', 'project', 'local'],
      permissionMode: 'bypassPermissions',
      allowDangerouslySkipPermissions: true,
      tools: { type: 'preset', preset: 'claude_code' },
      maxTurns: 1,
    };
    try {
      const it = query({ prompt: 'List your available skill names, one per line.', options }) as AsyncIterable<SDKMessage>;
      let skills: string[] = [];
      for await (const m of it) {
        if (m.type === 'system' && m.subtype === 'init') {
          skills = m.skills ?? [];
        }
        if (m.type === 'assistant' && (m as any).error === 'authentication_failed') {
          return { skills, authed: false, reason: 'authentication_failed' };
        }
        if (m.type === 'result') break; // got what we need
      }
      return { skills, authed: true };
    } catch (err: any) {
      const msg = String(err?.message ?? err);
      const authed = !/auth|login|unauthor|credential|oauth|401/i.test(msg);
      return { skills: [], authed, reason: msg };
    }
  }

  // Try nested session cwd first
  let res = await runProbe(probeCwd);
  if (!res.authed) {
    return { ok: false, mode: 'session', skills: res.skills, authed: false, reason: res.reason };
  }
  const hasAll = (list: string[]) => expected.every((s) => list.includes(s));
  if (hasAll(res.skills)) {
    setCwdMode('session');
    return { ok: true, mode: 'session', skills: res.skills, authed: true };
  }
  // Fallback: run from project root
  const res2 = await runProbe(PROJECT_ROOT);
  if (hasAll(res2.skills)) {
    setCwdMode('projectRoot');
    return { ok: true, mode: 'projectRoot', skills: res2.skills, authed: true };
  }
  // Neither found all skills — keep best info, default to projectRoot (most likely to resolve)
  setCwdMode('projectRoot');
  return {
    ok: false,
    mode: 'projectRoot',
    skills: res2.skills.length ? res2.skills : res.skills,
    authed: true,
    reason: 'expected skills not all discovered',
  };
}
