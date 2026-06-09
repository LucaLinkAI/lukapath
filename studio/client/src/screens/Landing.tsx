import { useEffect, useState } from 'react';
import { useStore } from '../state/store';
import { fetchAuthStatus } from '../api/chatStream';

export function Landing() {
  const setEntered = useStore((s) => s.setEntered);
  const auth = useStore((s) => s.auth);
  const setAuth = useStore((s) => s.setAuth);
  const [checking, setChecking] = useState(true);

  async function check(force = false) {
    setChecking(true);
    try {
      const a = await fetchAuthStatus(force);
      setAuth(a);
    } catch {
      setAuth({ ok: false, reason: 'server_unreachable' });
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="landing">
      <div className="landing-eyebrow">路卡命运罗盘 · LucaPath Studio</div>
      <div className="landing-logo">
        LucaPath
        <span className="en">Destiny Intelligence</span>
      </div>
      <div className="landing-tagline">
        融合 <strong>八字命理 · MBTI心理 · 西方星盘 · 紫微斗数</strong>，
        <br />
        为个人、家庭、孩子与创业伙伴生成专属命运罗盘。
      </div>
      <div className="landing-systems">
        <span className="sys-badge">八字命理</span>
        <span className="sys-badge">MBTI心理</span>
        <span className="sys-badge">西方星盘</span>
        <span className="sys-badge">紫微斗数</span>
      </div>

      <button
        className="enter-btn"
        disabled={!auth?.ok}
        onClick={() => setEntered(true)}
      >
        进入罗盘
      </button>

      <div className="auth-line">
        {checking ? (
          <span style={{ color: 'var(--w4)' }}>正在检查 Claude 订阅连接…</span>
        ) : auth?.ok ? (
          <span className="auth-ok">● 已连接 Claude Code 订阅{auth.apiKeySource && auth.apiKeySource !== 'none' ? ` (${auth.apiKeySource})` : ''}</span>
        ) : (
          <span className="auth-bad">● 未检测到已登录的 Claude Code</span>
        )}
      </div>

      {!checking && !auth?.ok && (
        <div className="auth-hint">
          请先在终端运行 <code>claude</code> 并登录你的 Claude Pro / Max 账户，然后
          <button
            onClick={() => check(true)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--gl)',
              textDecoration: 'underline',
              padding: '0 4px',
              fontSize: 13,
            }}
          >
            重新检查
          </button>
          。
        </div>
      )}
    </div>
  );
}
