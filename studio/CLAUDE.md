# CLAUDE.md — LucaPath Studio

Guidance for Claude Code when working in `studio/`. This is the **app**, distinct from the
repo root (which holds the single-file `lucapath_app.html` MVP and the report **skills**
under `../.claude/skills/`). See `../CLAUDE.md` for project-wide context.

## What this is

LucaPath Studio is a **local, single-user webapp** that wraps the four LucaPath
destiny-report skills behind a Claude-style chat UI. It runs on the machine's **Claude Code
Pro/Max subscription** via the Claude Agent SDK — **no API key**. The chat drives the
skills; generated `.html` reports preview in a slide-in drawer.

```
Landing (auth gate)  →  Studio
                        ├─ left:   Sidebar — new chat · report types · recents
                        ├─ center: streaming chat (drives the skills)
                        └─ right:  ArtifactPanel — report preview drawer (slides in)
```

## Run

```bash
cd studio
npm install
npm run dev          # concurrently runs server (:8787) + client (:3000)
```

- Client: <http://localhost:3000> (Vite, `strictPort` — port 3000 must be free)
- Server: <http://localhost:8787> (API only; Vite proxies `/api` → here)

Requires the **Claude Code CLI installed and logged in** (`claude` in a terminal). On boot
the server probes auth + confirms the project skills load from `../.claude/skills`; watch
for `✓ authed · skills OK`.

Other scripts: `npm run build` (client typecheck + Vite build), `npm start` (server only).

## Architecture

Two npm workspaces: **`server/`** (Express + Agent SDK, TypeScript run via `tsx`) and
**`client/`** (React 18 + Vite + Zustand). No DB — **all chat state is in-memory** and
resets on server restart (generated HTML files persist under `output/`).

### Server (`server/src/`)

- `index.ts` — Express bootstrap, route mounting, boot probe. JSON body limit is **32mb**
  (base64 file uploads).
- `config.ts` — paths (`PROJECT_ROOT` = repo root, holds `.claude/skills`), `PORT`,
  `EXPECTED_SKILLS`, and **`AGENT_MODEL`** (pinned to `claude-sonnet-4-6`; override via the
  `AGENT_MODEL` env var). The CLI default is otherwise Sonnet 4.5.
- `agent.ts` — wraps the SDK `query()`. `baseOptions()` sets `cwd`, `model: AGENT_MODEL`,
  `settingSources:['user','project','local']` (loads project skills),
  `permissionMode:'bypassPermissions'`, `tools: claude_code` preset (includes the Skill
  tool), `includePartialMessages` (token streaming). `runTurn()` yields normalized
  `AgentEvent`s and captures `.html` Write paths. `probeSkills()` runs at boot to pick the
  cwd mode (`session` vs `projectRoot`) that resolves all skills.
- `auth.ts` — `checkClaudeAuth()`: a tiny `query()` probe (pinned to `AGENT_MODEL`) that
  reports `{ ok, apiKeySource, model }`. Cached ~30s.
- `sessions.ts` — in-memory `SessionState` map. Each session owns an `output/<uuid>/` dir
  and the SDK session id (for resume). `inferAccent()` maps a report filename → accent hex.
- `artifacts.ts` — `detectArtifacts()`: after each turn, finds generated `.html` (Write
  events ∪ **non-recursive** scan of the session dir), relocating strays into the session
  dir. Uploads live in `output/<uuid>/uploads/` and are NOT scanned as artifacts.
- `sse.ts` — minimal SSE writer (`event:`/`data:` frames + 15s heartbeat).
- `routes/`
  - `chat.routes.ts` — `POST /api/chat` `{ sessionId?, prompt }` → SSE stream
    (`session`/`start`/`token`/`tool`/`artifact`/`error`/`done`).
  - `auth.routes.ts` — `GET /api/auth/status`.
  - `artifact.routes.ts` — `GET /api/artifact/:sessionId/:file[?download=1]`; whitelisted
    against `session.artifacts` (no raw path join — prevents traversal).
  - `upload.routes.ts` — `POST /api/upload` `{ sessionId?, files:[{name,dataBase64}] }` →
    saves into `output/<uuid>/uploads/`, returns absolute paths. Creates a session if none
    given.

### Client (`client/src/`)

- `App.tsx` — `entered ? <Studio/> : <Landing/>`.
- `screens/Landing.tsx` — auth gate; calls `fetchAuthStatus()` → stores `AuthStatus`
  (incl. `model`, used by the composer model badge).
- `screens/Studio.tsx` — grid: `Sidebar` + `ChatPanel` + `ArtifactPanel`. Adds
  `.drawer-open` when the preview drawer is open (reflows the chat).
- `components/Sidebar.tsx` — new chat, report-type shortcuts, recents.
- `components/ChatPanel.tsx` — chat history + composer. Composer is a two-row, Claude-style
  input: textarea on top; bottom toolbar with `+` attach (file picker / drag-drop / paste)
  on the left and a **model · effort badge** + send button on the right. Drag-drop works
  over the whole panel. Generated files render as inline **`FileCard`s** (open in drawer, or
  `⤢` open in a new browser tab). Top-right bar holds the status indicator, the **drawer
  toggle** (`PanelIcon`, with report-count badge), and the **theme toggle** (`ThemeToggle`).
- `components/ArtifactPanel.tsx` — the report preview as a **fixed slide-in drawer**
  (`.artifact-drawer.open`). Header: open-in-browser, refresh (remounts the iframe),
  download, close. Closed by default; auto-opens when a file is generated.
- `state/store.ts` — Zustand store. Key state: `sessions`/`order`/`activeId`, `busy`,
  `auth`, `drawerOpen`, `theme`. `send()` appends user+assistant messages, uploads any
  attachments first (then injects their absolute paths into the prompt), streams the turn,
  and attaches generated artifacts to the assistant message + auto-opens the drawer.
  `theme` is persisted to `localStorage` and applied to `<html data-theme>`.
- `api/chatStream.ts` — `streamChat()` (SSE parser), `fetchAuthStatus()`, `uploadFiles()` +
  `fileToBase64()`.
- `types.ts` — shared `Message`/`Artifact`/`ChatSession`/`SSEEvent`/`AuthStatus` types.
- `theme.css` — **all styling**. CSS variables on `:root` (dark navy/gold) with a
  `:root[data-theme='light']` override (warm paper/ink). Components read the vars, so theme
  switching is variable-only. Per-report accent vars: `--personal/--family/--child/
  --business/--multi/--meta`.

## Conventions

- **No API key** — auth is the machine's Claude Code subscription. Don't add key-based auth.
- **Styling is variable-driven.** Add new colors as `:root` vars with a `[data-theme='light']`
  counterpart; avoid hardcoded hex in component rules (the only intentional literal is the
  report iframe's white background).
- **State is in-memory and ephemeral.** Don't assume persistence across restarts.
- **Path safety**: serve session files only via the artifact/upload whitelists, never a raw
  `path.join` of user input.
- After changing TS, verify with `cd client && npx tsc -b --noEmit` (client) and
  `cd server && npx tsc --noEmit` (server); `npm run build` does the client check + bundle.
- The skills themselves live in `../.claude/skills/` — edit them there, not here. This app
  only invokes them through the Agent SDK.
