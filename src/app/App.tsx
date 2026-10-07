import { lazy, Suspense, useCallback, useRef, useState, type CSSProperties } from 'react';
import { OpeningSplash } from '../components/layout/OpeningSplash';
import { Header } from '../components/layout/Header';
import { labs, type LabId } from './routes';
const CollisionLab = lazy(() => import('../labs/collisions/CollisionLab').then(m => ({ default: m.CollisionLab })));
const GravityLab = lazy(() => import('../labs/gravity/GravityLab').then(m => ({ default: m.GravityLab })));
const ProjectileLab = lazy(() => import('../labs/projectile/ProjectileLab').then(m => ({ default: m.ProjectileLab })));
const PendulumLab = lazy(() => import('../labs/pendulum/PendulumLab').then(m => ({ default: m.PendulumLab })));
const WaveLab = lazy(() => import('../labs/waves/WaveLab').then(m => ({ default: m.WaveLab })));
const loadingLab = <main className="lab-loading" role="status">Loading laboratory…</main>;

function AboutMethodology({ onClose }: { onClose: () => void }) {
  return <div className="about-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <section className="about-dialog" role="dialog" aria-modal="true" aria-labelledby="about-title">
      <button className="about-close" onClick={onClose} aria-label="Close About and Methodology">×</button>
      <p className="eyebrow">ABOUT / METHODOLOGY</p>
      <h2 id="about-title">Physics Sandbox</h2>
      <p className="about-subtitle">Interactive Computational Physics Laboratory</p>
      <p>To explore how analytical physics models, numerical methods, visualization, and conservation analysis can be combined in an interactive computational environment.</p>
      <h3>Methods used</h3>
      <div className="about-method-grid">
        <article><h4>Analytical</h4><p>Closed-form ideal projectile equations, the small-angle pendulum solution, one-dimensional collision outcomes, and sinusoidal wave equations.</p></article>
        <article><h4>Numerical</h4><p>RK4 estimates differential-equation evolution using intermediate slope evaluations for quadratic-drag projectiles and nonlinear pendulums. Velocity Verlet advances Newtonian N-body gravity with a symplectic-style fixed-step method.</p></article>
        <article><h4>Analysis</h4><p>Energy and momentum tracking, angular momentum, orbital analysis, approximation error, period measurement, and wave interference analysis.</p></article>
      </div>
      <p className="about-note">Collision outcomes use analytical equations at an interpolated impact event; object positions advance over simulation time. Numerical methods approximate continuous evolution in finite steps. Analytical models are exact within their stated assumptions.</p>
      <h3>Project guide</h3>
      <ol className="about-guide"><li>Start with Projectile Compare and observe how drag changes trajectory and energy.</li><li>Open Gravity and compare velocity with gravitational acceleration vectors.</li><li>Use Collisions to inspect momentum conservation.</li><li>Compare small-angle and nonlinear pendulum motion.</li><li>Finish with wave superposition and interference.</li></ol>
      <h3>Architecture</h3>
      <p className="about-architecture">UI and controls → lab state → physics engines and numerical methods → derived analysis → Canvas, graphs, telemetry, and CSV</p>
      <p className="about-note">Physics calculations are kept separate from React rendering wherever practical. Simulation data stays in the browser; saved runs use local storage.</p>
    </section>
  </div>;
}

export function App() {
  const [active, setActive] = useState<LabId>('home');
  const [aboutOpen, setAboutOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(true);
  const finishIntro = useCallback(() => setIntroOpen(false), []);
  const labsRef = useRef<HTMLElement>(null);
  const navigateTo = (id: LabId) => { setActive(id); setAboutOpen(false); };
  return <div className="app-shell">
    <Header active={active} navigate={navigateTo} onAbout={() => setAboutOpen(true)} />
    {introOpen && <OpeningSplash onFinish={finishIntro} />}
    {active === 'collisions' ? <Suspense fallback={loadingLab}><CollisionLab /></Suspense> : active === 'orbits' ? <Suspense fallback={loadingLab}><GravityLab /></Suspense> : active === 'projectile' ? <Suspense fallback={loadingLab}><ProjectileLab /></Suspense> : active === 'pendulum' ? <Suspense fallback={loadingLab}><PendulumLab /></Suspense> : active === 'wave' ? <Suspense fallback={loadingLab}><WaveLab /></Suspense> : <main className="hub">
      <div className="hub-inner">
        <section className="hub-hero">
          <p className="eyebrow">PHYSICS SANDBOX</p>
          <h1>Interactive Computational<br />Physics Laboratory</h1>
          <p className="hub-thesis">Physics Sandbox demonstrates not only what physics equations predict, but where simplified theoretical models differ from numerical simulations of more realistic physical systems.</p>
          <button className="primary-action" onClick={() => labsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Explore Laboratories <span aria-hidden="true">↓</span></button>
        </section>
        <section className="hub-labs" ref={labsRef} aria-labelledby="labs-heading">
          <div className="section-heading"><div><p className="eyebrow">FIVE CONNECTED EXPERIMENTS</p><h2 id="labs-heading">Explore the laboratories</h2></div><button className="secondary-action" onClick={() => setAboutOpen(true)}>About / Methodology</button></div>
          <div className="cards">{labs.map((lab, index) => <article className={index === 0 ? 'card flagship' : 'card'} style={{ '--c': lab.color } as CSSProperties} key={lab.id}>
            <div className="card-heading"><span aria-hidden="true">{lab.icon}</span><small>LAB 0{index + 1}</small></div>
            <h3>{lab.title}</h3><p>{lab.description}</p>
            <ul className="concept-tags">{lab.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
            <button className="card-action" onClick={() => navigateTo(lab.id)}>Open Laboratory <span aria-hidden="true">→</span></button>
          </article>)}</div>
        </section>
        <section className="hub-workflow">
          <div><p className="eyebrow">A REPEATABLE INVESTIGATION</p><h2>From parameters to evidence</h2><p>Each lab connects a model to observable motion and inspectable data.</p></div>
          <ol>{['Define physical parameters', 'Select theoretical or numerical model', 'Run the simulation', 'Observe motion and vectors', 'Analyze graphs and conservation laws', 'Compare theory with computation', 'Export data for further analysis'].map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, '0')}</span>{step}</li>)}</ol>
        </section>
        <section className="model-compare"><article><p className="eyebrow">DIRECT MATHEMATICAL EVALUATION</p><h2>Analytical models</h2><p>Ideal projectile motion, the small-angle pendulum, collision outcome equations, and wave equations can be evaluated directly within their assumptions.</p></article><article><p className="eyebrow">FINITE COMPUTATIONAL STEPS</p><h2>Numerical models</h2><p>Quadratic-drag projectiles and nonlinear pendulums use RK4; N-body gravity uses Velocity Verlet. Numerical simulation approximates continuous physical evolution through finite computational steps.</p></article></section>
        <footer className="hub-footer"><span>Physics Sandbox · Educational computational physics</span><button onClick={() => setAboutOpen(true)}>About / Methodology</button></footer>
      </div>
    </main>}
    {aboutOpen && <AboutMethodology onClose={() => setAboutOpen(false)} />}
  </div>;
}


