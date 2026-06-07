import { query } from '@anthropic-ai/claude-agent-sdk';
import type { Options, SDKMessage } from '@anthropic-ai/claude-agent-sdk';
import { AGENT_MODEL } from './config.ts';

type AuthResult = { ok: boolean; reason?: string; apiKeySource?: string; model?: string };

let cache: { at: number; result: AuthResult } | null = null;
const TTL = 30_000;

/**
 * Authoritative auth check: start a tiny query. If the SDK streams a system/init
 * (or any assistant/result) without an auth error, Claude Code is authenticated
 * (using the machine's Pro/Max subscription). Cached ~30s.
 */
export async function checkClaudeAuth(force = false): Promise<AuthResult> {
  if (!force && cache && Date.now() - cache.at < TTL) return cache.result;

  const options: Options = {
    maxTurns: 1,
    model: AGENT_MODEL,
    tools: { type: 'preset', preset: 'claude_code' },
    settingSources: [], // don't need skills for the probe
  };

  let result: AuthResult;
  try {
    const it = query({ prompt: 'ping', options }) as AsyncIterable<SDKMessage>;
    result = { ok: true };
    for await (const m of it) {
      if (m.type === 'system' && m.subtype === 'init') {
        result = { ok: true, apiKeySource: m.apiKeySource, model: m.model };
      }
      if (m.type === 'assistant' && (m as any).error === 'authentication_failed') {
        result = { ok: false, reason: 'not_logged_in' };
        break;
      }
      if (m.type === 'result') break;
    }
  } catch (err: any) {
    const msg = String(err?.message ?? err);
    result = /auth|login|unauthor|credential|oauth|401/i.test(msg)
      ? { ok: false, reason: 'not_logged_in' }
      : { ok: false, reason: msg };
  }

  cache = { at: Date.now(), result };
  return result;
}
