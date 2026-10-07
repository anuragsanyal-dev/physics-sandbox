import { useEffect, useState } from 'react';

type OpeningSplashProps = { onFinish: () => void };

export function OpeningSplash({ onFinish }: OpeningSplashProps) {
  const [exiting, setExiting] = useState(false);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const fadeDelay = reducedMotion ? 430 : 2440;
    const finishDelay = reducedMotion ? 650 : 2900;
    const fadeTimer = window.setTimeout(() => setExiting(true), fadeDelay);
    const finishTimer = window.setTimeout(onFinish, finishDelay);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onFinish, reducedMotion]);

  return <div className={`opening-splash${exiting ? ' is-exiting' : ''}${reducedMotion ? ' reduced-motion' : ''}`} role="dialog" aria-modal="true" aria-label="Physics Sandbox introduction">
    <svg className="splash-motifs" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path className="splash-line projectile-line" pathLength="1" d="M70 530 Q310 105 550 530" />
      <ellipse className="splash-line orbit-line" pathLength="1" cx="930" cy="330" rx="225" ry="105" transform="rotate(-24 930 330)" />
      <path className="splash-line pendulum-line" pathLength="1" d="M600 145 A185 185 0 0 1 760 238" />
      <path className="splash-line wave-line" pathLength="1" d="M710 520 C760 450 810 450 860 520 S960 590 1010 520 S1110 450 1160 520" />
      <circle className="splash-marker" cx="760" cy="238" r="4" />
    </svg>
    <button className="splash-skip" onClick={onFinish}>Skip intro</button>
    <div className="splash-copy">
      <p className="splash-credit">MADE BY</p>
      <h1 className="splash-author">ANURAG SANYAL &amp; TEAM</h1>
      <span className="splash-divider" aria-hidden="true" />
      <h2 className="splash-title">PHYSICS SANDBOX</h2>
    </div>
    <div className="splash-index" aria-hidden="true"><span>COMPUTATIONAL PHYSICS</span><span>01 — 05</span></div>
  </div>;
}
