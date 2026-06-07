import { useState } from 'react';
import { useStore } from '../state/store';

export function ArtifactPanel() {
  const current = useStore((s) => s.current());
  const setActiveArtifact = useStore((s) => s.setActiveArtifact);
  const drawerOpen = useStore((s) => s.drawerOpen);
  const setDrawerOpen = useStore((s) => s.setDrawerOpen);
  const [reloadKey, setReloadKey] = useState(0);

  const artifacts = current?.artifacts ?? [];
  const active =
    artifacts.find((a) => a.file === current?.activeArtifact) ?? artifacts[artifacts.length - 1];

  return (
    <aside className={`artifact-drawer${drawerOpen ? ' open' : ''}`} aria-hidden={!drawerOpen}>
      <div className="artifact-head">
        <span className="artifact-accent" style={{ background: active?.accent ?? 'var(--w2)' }} />
        <span className="artifact-name" title={active?.file} style={active ? undefined : { color: 'var(--w4)' }}>
          {active?.file ?? '报告预览'}
        </span>
        {active && (
          <>
            <button
              className="artifact-icon-btn"
              title="在浏览器打开"
              onClick={() => window.open(active.url, '_blank', 'noopener')}
            >
              ⤢
            </button>
            <button
              className="artifact-icon-btn"
              title="刷新"
              onClick={() => setReloadKey((k) => k + 1)}
            >
              ↻
            </button>
            <a className="download-btn" href={`${active.url}?download=1`} download={active.file}>
              ⤓ 下载
            </a>
          </>
        )}
        <button className="artifact-icon-btn" title="关闭" onClick={() => setDrawerOpen(false)}>
          ✕
        </button>
      </div>

      {!active ? (
        <div className="artifact-empty">
          <div className="glyph">🧭</div>
          <div className="et">报告将在这里出现</div>
          <div className="es">
            完成左侧的信息收集后，生成的命理报告会在此实时预览，顶部可一键在浏览器打开或下载 HTML。
          </div>
        </div>
      ) : (
        <>
          {artifacts.length > 1 && (
            <div className="artifact-tabs">
              {artifacts.map((a) => (
                <button
                  key={a.file}
                  className={`artifact-tab${a.file === active.file ? ' active' : ''}`}
                  title={a.file}
                  onClick={() => setActiveArtifact(a.file)}
                >
                  {a.file}
                </button>
              ))}
            </div>
          )}

          <iframe
            className="artifact-frame"
            src={active.url}
            title={active.file}
            sandbox="allow-same-origin allow-scripts allow-popups allow-downloads"
            key={`${active.url}#${reloadKey}`}
          />
        </>
      )}
    </aside>
  );
}
