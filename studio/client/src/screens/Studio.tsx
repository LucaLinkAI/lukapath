import { Sidebar } from '../components/Sidebar';
import { ChatPanel } from '../components/ChatPanel';
import { ArtifactPanel } from '../components/ArtifactPanel';
import { useStore } from '../state/store';

export function Studio() {
  const drawerOpen = useStore((s) => s.drawerOpen);
  return (
    <div className={`studio${drawerOpen ? ' drawer-open' : ''}`}>
      <Sidebar />
      <ChatPanel />
      <ArtifactPanel />
    </div>
  );
}
