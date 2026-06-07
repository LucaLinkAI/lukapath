import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useStore } from '../state/store';
import type { Artifact, Message } from '../types';

// The app doesn't expose a thinking-budget control, so effort is a fixed label.
// The model name is read live from the Claude Code session (auth.model).
const EFFORT_LABEL = '高 · High';

export function ChatPanel() {
  const current = useStore((s) => s.current());
  const busy = useStore((s) => s.busy);
  const send = useStore((s) => s.send);
  const auth = useStore((s) => s.auth);
  const toggleDrawer = useStore((s) => s.toggleDrawer);
  const [draft, setDraft] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [current?.messages]);

  function addFiles(list: FileList | File[] | null) {
    if (!list) return;
    const incoming = Array.from(list);
    if (incoming.length) setAttachments((prev) => [...prev, ...incoming]);
  }

  function removeAttachment(i: number) {
    setAttachments((prev) => prev.filter((_, idx) => idx !== i));
  }

  function submit() {
    const text = draft.trim();
    if ((!text && attachments.length === 0) || busy) return;
    const files = attachments;
    setDraft('');
    setAttachments([]);
    void send(text, { attachments: files });
  }

  // Drag/drop over the whole chat panel.
  function onDragEnter(e: React.DragEvent) {
    if (!Array.from(e.dataTransfer.types).includes('Files')) return;
    dragDepth.current += 1;
    setDragging(true);
  }
  function onDragLeave() {
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setDragging(false);
  }
  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    dragDepth.current = 0;
    setDragging(false);
    if (busy) return;
    addFiles(e.dataTransfer.files);
  }

  const messages = current?.messages ?? [];
  const canSend = !busy && (draft.trim().length > 0 || attachments.length > 0);
  const artifactCount = current?.artifacts?.length ?? 0;

  return (
    <main
      className="chat"
      onDragEnter={onDragEnter}
      onDragOver={(e) => {
        if (Array.from(e.dataTransfer.types).includes('Files')) e.preventDefault();
      }}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="chat-head">
        <div className="chat-head-title">{current?.title ?? '路卡成长罗盘'}</div>
        <div className="chat-head-right">
          <div className="status-indicator">
            <span className={`status-dot${busy ? ' busy' : ''}`} />
            {busy ? '生成中…' : 'Claude · 本地订阅'}
          </div>
          <button
            className="panel-btn"
            onClick={toggleDrawer}
            title={artifactCount > 0 ? '查看报告预览' : '暂无报告'}
            aria-label="报告预览"
            disabled={artifactCount === 0}
          >
            <PanelIcon />
            {artifactCount > 0 && <span className="panel-count">{artifactCount}</span>}
          </button>
          <ThemeToggle />
        </div>
      </div>

      <div className="messages" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="empty-chat">
            <div className="glyph">🧭</div>
            <div className="et">从左侧选择一种报告，或直接开始对话</div>
            <div className="es">
              我会一步步询问出生信息与背景，融合八字、MBTI、星盘与紫微，生成你的专属命理报告。
            </div>
          </div>
        ) : (
          messages.map((m) => <Bubble key={m.id} msg={m} busy={busy} />)
        )}
      </div>

      <div className="composer">
        <div className={`composer-inner${dragging ? ' dragover' : ''}`}>
          {attachments.length > 0 && (
            <div className="attach-row">
              {attachments.map((f, i) => (
                <span key={i} className="attach-chip" title={f.name}>
                  <span className="attach-icon">{f.type.startsWith('image/') ? '🖼' : '📄'}</span>
                  <span className="attach-name">{f.name}</span>
                  <button className="attach-x" onClick={() => removeAttachment(i)} aria-label="移除">
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <textarea
            rows={1}
            placeholder="输入消息…（Enter 发送，Shift+Enter 换行）"
            value={draft}
            disabled={busy}
            onChange={(e) => {
              setDraft(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 180) + 'px';
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            onPaste={(e) => {
              const files = Array.from(e.clipboardData.files);
              if (files.length) {
                e.preventDefault();
                addFiles(files);
              }
            }}
          />

          <div className="composer-toolbar">
            <div className="composer-left">
              <button
                className="attach-btn"
                onClick={() => fileRef.current?.click()}
                disabled={busy}
                title="添加文件或图片"
                aria-label="添加文件或图片"
              >
                +
              </button>
              <input
                ref={fileRef}
                type="file"
                multiple
                hidden
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = '';
                }}
              />
            </div>
            <div className="composer-right">
              <span className="model-badge" title="当前模型 · 推理强度">
                <span className="model-name">{formatModel(auth?.model)}</span>
                <span className="model-dot">·</span>
                <span className="model-effort">{EFFORT_LABEL}</span>
              </span>
              <button className="send-btn" disabled={!canSend} onClick={submit}>
                ↑
              </button>
            </div>
          </div>

          {dragging && <div className="drop-overlay">松开以添加文件 / 图片</div>}
        </div>
        <div className="composer-hint">
          报告由 Claude 结合命理算法生成，仅供参考与娱乐。
        </div>
      </div>
    </main>
  );
}

/** Map a Claude model id (e.g. "claude-opus-4-8...") to a friendly label. */
function formatModel(model?: string): string {
  if (!model) return 'Claude';
  const m = model.toLowerCase();
  const fam = m.match(/(opus|sonnet|haiku)/)?.[1];
  if (!fam) return model;
  const label = fam.charAt(0).toUpperCase() + fam.slice(1);
  const ver = m.match(/(?:opus|sonnet|haiku)-(\d+)(?:-(\d+))?/);
  if (!ver) return label;
  const major = ver[1];
  const minor = ver[2] && ver[2].length <= 2 ? ver[2] : undefined; // skip date suffixes
  return `${label} ${major}${minor ? '.' + minor : ''}`;
}

function Bubble({ msg, busy }: { msg: Message; busy: boolean }) {
  const isUser = msg.role === 'user';
  const showSpinner = busy && msg.role === 'assistant' && !msg.text;
  return (
    <div className={`msg ${msg.role}`}>
      <div className="msg-role">{isUser ? '你' : '罗盘'}</div>
      {msg.tools && msg.tools.length > 0 && (
        <div style={{ marginBottom: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {msg.tools.map((t, i) => (
            <span key={i} className="tool-chip">
              <span className="spinner" />
              {t.summary || t.name}
            </span>
          ))}
        </div>
      )}
      <div className="msg-body">
        {isUser ? (
          msg.text
        ) : msg.text ? (
          <ReactMarkdown>{msg.text}</ReactMarkdown>
        ) : showSpinner ? (
          <span style={{ color: 'var(--w4)' }}>正在思考…</span>
        ) : null}
      </div>
      {msg.artifacts && msg.artifacts.length > 0 && (
        <div className="file-cards">
          {msg.artifacts.map((a) => (
            <FileCard key={a.file} art={a} />
          ))}
        </div>
      )}
    </div>
  );
}

function FileCard({ art }: { art: Artifact }) {
  const setActiveArtifact = useStore((s) => s.setActiveArtifact);
  const title = art.file.replace(/\.html$/i, '');
  return (
    <div
      className="file-card"
      role="button"
      tabIndex={0}
      title="在右侧预览打开"
      onClick={() => setActiveArtifact(art.file)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActiveArtifact(art.file);
        }
      }}
    >
      <span className="file-card-icon" style={{ color: art.accent }}>
        {'</>'}
      </span>
      <div className="file-card-meta">
        <div className="file-card-title">{title}</div>
        <div className="file-card-sub">HTML 报告</div>
      </div>
      <button
        className="file-card-open"
        onClick={(e) => {
          e.stopPropagation();
          window.open(art.url, '_blank', 'noopener');
        }}
      >
        ⤢ 在浏览器打开
      </button>
    </div>
  );
}

function ThemeToggle() {
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);
  const isDark = theme === 'dark';
  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      title={isDark ? '切换到浅色主题' : '切换到深色主题'}
      aria-label="切换主题"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <line x1="12" y1="2.5" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="21.5" />
        <line x1="2.5" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="21.5" y2="12" />
        <line x1="5.2" y1="5.2" x2="7" y2="7" />
        <line x1="17" y1="17" x2="18.8" y2="18.8" />
        <line x1="18.8" y1="5.2" x2="17" y2="7" />
        <line x1="7" y1="17" x2="5.2" y2="18.8" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 13.5A8 8 0 1 1 10.5 4a6.3 6.3 0 0 0 9.5 9.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PanelIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <line x1="15" y1="4" x2="15" y2="20" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
