import { create } from 'zustand';
import type { ChatSession, Message, Artifact, AuthStatus } from '../types';
import { streamChat, uploadFiles } from '../api/chatStream';

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export type Theme = 'dark' | 'light';

// Resolve the initial theme from localStorage and apply it to <html> before first
// paint so there's no flash of the wrong theme.
function initTheme(): Theme {
  let t: Theme = 'dark';
  try {
    if (localStorage.getItem('lp-theme') === 'light') t = 'light';
  } catch {
    /* ignore */
  }
  if (typeof document !== 'undefined') document.documentElement.dataset.theme = t;
  return t;
}

function applyTheme(t: Theme) {
  if (typeof document !== 'undefined') document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem('lp-theme', t);
  } catch {
    /* ignore */
  }
}

type Store = {
  entered: boolean;
  auth: AuthStatus | null;
  sessions: Record<string, ChatSession>; // keyed by localId
  order: string[]; // localIds, most-recent first
  activeId: string | null; // localId
  busy: boolean;
  drawerOpen: boolean; // right-side preview drawer
  theme: Theme;

  setEntered: (v: boolean) => void;
  setAuth: (a: AuthStatus) => void;
  newChat: () => string; // returns localId
  selectChat: (localId: string) => void;
  current: () => ChatSession | null;
  send: (prompt: string, opts?: { newChat?: boolean; attachments?: File[] }) => Promise<void>;
  setActiveArtifact: (file: string) => void; // also opens the drawer
  setDrawerOpen: (v: boolean) => void;
  toggleDrawer: () => void;
  toggleTheme: () => void;
};

export const useStore = create<Store>((set, get) => ({
  entered: false,
  auth: null,
  sessions: {},
  order: [],
  activeId: null,
  busy: false,
  drawerOpen: false,
  theme: initTheme(),

  setEntered: (v) => set({ entered: v }),
  setAuth: (a) => set({ auth: a }),
  setDrawerOpen: (v) => set({ drawerOpen: v }),
  toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),
  toggleTheme: () =>
    set((s) => {
      const theme: Theme = s.theme === 'dark' ? 'light' : 'dark';
      applyTheme(theme);
      return { theme };
    }),

  newChat: () => {
    const localId = uid();
    const session: ChatSession = {
      id: '',
      localId,
      title: '新对话',
      accent: '#e8a050',
      messages: [],
      artifacts: [],
    };
    set((s) => ({
      sessions: { ...s.sessions, [localId]: session },
      order: [localId, ...s.order],
      activeId: localId,
    }));
    return localId;
  },

  selectChat: (localId) => set({ activeId: localId }),

  current: () => {
    const { activeId, sessions } = get();
    return activeId ? sessions[activeId] ?? null : null;
  },

  setActiveArtifact: (file) => {
    const { activeId, sessions } = get();
    if (!activeId) return;
    const s = sessions[activeId];
    if (!s) return;
    set({
      sessions: { ...sessions, [activeId]: { ...s, activeArtifact: file } },
      drawerOpen: true,
    });
  },

  send: async (prompt, opts) => {
    if (get().busy) return;
    let localId = get().activeId;
    if (opts?.newChat || !localId) localId = get().newChat();
    const lid = localId!;

    const patch = (mut: (s: ChatSession) => ChatSession) =>
      set((st) => {
        const cur = st.sessions[lid];
        if (!cur) return {};
        return { sessions: { ...st.sessions, [lid]: mut(cur) } };
      });

    const attachments = opts?.attachments ?? [];
    const attachNote = attachments.length
      ? `\n\n📎 ${attachments.map((f) => f.name).join(' · ')}`
      : '';

    // append user message (with any attachment names) + a placeholder assistant message
    const userMsg: Message = { id: uid(), role: 'user', text: prompt + attachNote };
    const asstMsg: Message = { id: uid(), role: 'assistant', text: '', tools: [] };
    patch((s) => ({
      ...s,
      title: s.messages.length === 0 ? prompt.slice(0, 24) || '附件' : s.title,
      messages: [...s.messages, userMsg, asstMsg],
    }));
    // bump recency
    set((st) => ({ order: [lid, ...st.order.filter((x) => x !== lid)] }));
    set({ busy: true });

    let serverSessionId = get().sessions[lid]?.id || undefined;
    let agentPrompt = prompt;

    try {
      // Upload attachments first (creates the server session if needed), then
      // hand the agent their absolute paths so it can Read them this turn.
      if (attachments.length) {
        const up = await uploadFiles(serverSessionId, attachments);
        serverSessionId = up.sessionId;
        patch((s) => ({ ...s, id: up.sessionId }));
        const list = up.files.map((f) => `- ${f.path}`).join('\n');
        agentPrompt =
          `${prompt}\n\n[用户上传了 ${up.files.length} 个文件，已保存到以下绝对路径，` +
          `请用 Read 工具按需读取（图片可直接读取）：\n${list}\n]`;
      }

      await streamChat({ sessionId: serverSessionId, prompt: agentPrompt }, (ev) => {
        switch (ev.type) {
          case 'session':
            patch((s) => ({ ...s, id: ev.sessionId }));
            break;
          case 'token':
            patch((s) => ({
              ...s,
              messages: s.messages.map((m) =>
                m.id === asstMsg.id ? { ...m, text: m.text + ev.text } : m,
              ),
            }));
            break;
          case 'tool':
            patch((s) => ({
              ...s,
              messages: s.messages.map((m) =>
                m.id === asstMsg.id
                  ? { ...m, tools: [...(m.tools ?? []), { name: ev.name, summary: ev.summary }] }
                  : m,
              ),
            }));
            break;
          case 'artifact': {
            const art: Artifact = { file: ev.file, url: ev.url, accent: ev.accent };
            patch((s) => ({
              ...s,
              accent: ev.accent,
              artifacts: [...s.artifacts.filter((a) => a.file !== art.file), art],
              activeArtifact: art.file,
              // attach an inline card to the assistant message that produced it
              messages: s.messages.map((m) =>
                m.id === asstMsg.id
                  ? { ...m, artifacts: [...(m.artifacts ?? []).filter((a) => a.file !== art.file), art] }
                  : m,
              ),
            }));
            // auto-open the preview drawer when a file is generated
            set({ drawerOpen: true });
            break;
          }
          case 'error':
            patch((s) => ({
              ...s,
              messages: s.messages.map((m) =>
                m.id === asstMsg.id
                  ? { ...m, text: m.text + `\n\n⚠ ${ev.message}` }
                  : m,
              ),
            }));
            break;
          case 'done':
          case 'start':
          default:
            break;
        }
      });
    } catch (err: any) {
      const message = String(err?.message ?? err);
      patch((s) => ({
        ...s,
        messages: s.messages.map((m) =>
          m.id === asstMsg.id ? { ...m, text: m.text + `\n\n⚠ ${message}` } : m,
        ),
      }));
    } finally {
      set({ busy: false });
    }
  },
}));
