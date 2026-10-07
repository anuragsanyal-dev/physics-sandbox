import type { LabId } from '../../app/routes';
import { labs } from '../../app/routes';
export function Header({ active, navigate, onAbout }: { active: LabId; navigate: (id: LabId) => void; onAbout: () => void }) {
  return <header className="topbar">
    <button className="brand" onClick={() => navigate('home')} aria-label="Physics Sandbox Lab Hub"><b>PHYSICS <i>SANDBOX</i></b><small>Interactive Computational Physics Laboratory</small></button>
    <nav aria-label="Main navigation"><button className={active === 'home' ? 'selected' : ''} onClick={() => navigate('home')}>Lab Hub</button>{labs.map(lab => <button className={active === lab.id ? 'selected' : ''} onClick={() => navigate(lab.id)} key={lab.id}>{lab.short}</button>)}</nav>
    <button className="header-about" onClick={onAbout}>About</button>
  </header>;
}
