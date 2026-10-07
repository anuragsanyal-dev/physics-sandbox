export type LabId = 'home' | 'projectile' | 'orbits' | 'collisions' | 'pendulum' | 'wave';
type Lab = { id: LabId; title: string; short: string; description: string; color: string; icon: string; tags: string[] };
export const labs: Lab[] = [
  { id: 'projectile', title: 'Projectile Motion', short: 'Projectile', description: 'Compare ideal analytical projectile motion with numerical trajectories including quadratic air resistance and wind.', color: '#06b6d4', icon: '↗', tags: ['Analytical Mechanics', 'RK4', 'Quadratic Drag', 'Energy'] },
  { id: 'orbits', title: 'Gravity & Orbital Mechanics', short: 'Gravity & Orbits', description: 'Explore Newtonian N-body gravity, orbital motion, barycenters, and conservation laws using symplectic numerical integration.', color: '#a855f7', icon: '◉', tags: ['N-Body Gravity', 'Velocity Verlet', 'Orbits', 'Conservation Laws'] },
  { id: 'collisions', title: 'Collisions', short: 'Collisions', description: 'Investigate momentum, kinetic energy, impulse, restitution, and center-of-mass motion in one-dimensional collisions.', color: '#10b981', icon: '⟷', tags: ['Momentum', 'Restitution', 'Impulse', 'Conservation'] },
  { id: 'pendulum', title: 'Pendulum', short: 'Pendulum', description: 'Compare the analytical small-angle approximation with nonlinear numerical pendulum motion and damping.', color: '#f59e0b', icon: '⌁', tags: ['SHM', 'Nonlinear Dynamics', 'RK4', 'Approximation Error'] },
  { id: 'wave', title: 'Wave & Interference', short: 'Wave Lab', description: 'Explore travelling waves, superposition, interference, standing waves, harmonics, beats, and reflection.', color: '#f43f5e', icon: '∿', tags: ['Superposition', 'Interference', 'Standing Waves', 'Beats'] },
];
