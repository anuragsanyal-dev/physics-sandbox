import type { GravityBody, SystemMetrics } from './types';
export const G = 6.6743e-11;
export const DEFAULT_SOFTENING = 1;
const MAX_BODIES = 50;
export function validateBodies(bodies: GravityBody[]): string[] {
  const errors: string[] = [];
  if (bodies.length < 2) errors.push('A system needs at least two bodies.');
  if (bodies.length > MAX_BODIES) errors.push(`A system can contain at most ${MAX_BODIES} bodies.`);
  const ids = new Set<string>();
  for (const body of bodies) {
    if (!body.id || !body.name.trim() || ![body.mass, body.radius, body.x, body.y, body.vx, body.vy].every(Number.isFinite) || body.mass <= 0 || body.radius <= 0) errors.push(`Body ${body.name || body.id || '(unnamed)'} has invalid mass, radius, or state.`);
    if (ids.has(body.id)) errors.push(`Duplicate body id: ${body.id}.`);
    ids.add(body.id);
  }
  return [...new Set(errors)];
}
export function accelerations(bodies: GravityBody[], softening = DEFAULT_SOFTENING): { x: number; y: number }[] {
  if (!Number.isFinite(softening) || softening < 0) throw new RangeError('Softening must be finite and non-negative.');
  const result = bodies.map(() => ({ x: 0, y: 0 })); const e2 = softening * softening;
  for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
    const a = bodies[i]!, b = bodies[j]!; const dx = b.x - a.x, dy = b.y - a.y;
    const r2 = dx * dx + dy * dy + e2; const invR3 = 1 / (r2 * Math.sqrt(r2));
    const ai = G * b.mass * invR3, aj = G * a.mass * invR3;
    result[i]!.x += ai * dx; result[i]!.y += ai * dy; result[j]!.x -= aj * dx; result[j]!.y -= aj * dy;
  }
  return result;
}
/** Symplectic velocity-Verlet step, suited to long conservative orbital evolution. */
export function velocityVerlet(bodies: GravityBody[], dt: number, softening = DEFAULT_SOFTENING): GravityBody[] {
  if (!Number.isFinite(dt) || dt <= 0) throw new RangeError('Timestep must be finite and positive.');
  const a0 = accelerations(bodies, softening);
  const moved = bodies.map((body, i) => ({ ...body, x: body.x + body.vx * dt + .5 * a0[i]!.x * dt * dt, y: body.y + body.vy * dt + .5 * a0[i]!.y * dt * dt, vx: body.vx + .5 * a0[i]!.x * dt, vy: body.vy + .5 * a0[i]!.y * dt }));
  const a1 = accelerations(moved, softening);
  return moved.map((body, i) => ({ ...body, vx: body.vx + .5 * a1[i]!.x * dt, vy: body.vy + .5 * a1[i]!.y * dt }));
}
export function systemMetrics(bodies: GravityBody[], softening = DEFAULT_SOFTENING): SystemMetrics {
  let kineticEnergy = 0, potentialEnergy = 0, momentumX = 0, momentumY = 0, angularMomentumZ = 0, mass = 0, barycenterX = 0, barycenterY = 0;
  for (const b of bodies) { kineticEnergy += .5 * b.mass * (b.vx ** 2 + b.vy ** 2); momentumX += b.mass * b.vx; momentumY += b.mass * b.vy; mass += b.mass; barycenterX += b.mass * b.x; barycenterY += b.mass * b.y; }
  const cx = mass ? barycenterX / mass : 0, cy = mass ? barycenterY / mass : 0, cvx = mass ? momentumX / mass : 0, cvy = mass ? momentumY / mass : 0;
  for (const b of bodies) angularMomentumZ += b.mass * ((b.x - cx) * (b.vy - cvy) - (b.y - cy) * (b.vx - cvx));
  for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) { const a = bodies[i]!, b = bodies[j]!; const r = Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2 + softening ** 2); potentialEnergy -= G * a.mass * b.mass / r; }
  return { kineticEnergy, potentialEnergy, totalEnergy: kineticEnergy + potentialEnergy, momentumX, momentumY, momentumMagnitude: Math.hypot(momentumX, momentumY), angularMomentumZ, barycenterX: mass ? barycenterX / mass : 0, barycenterY: mass ? barycenterY / mass : 0 };
}
export function stepSystem(bodies: GravityBody[], dt: number, softening = DEFAULT_SOFTENING): GravityBody[] {
  const errors = validateBodies(bodies); if (errors.length) throw new RangeError(errors.join(' '));
  const next = velocityVerlet(bodies, dt, softening);
  if (next.some(b => ![b.x, b.y, b.vx, b.vy].every(Number.isFinite))) throw new RangeError('Integration produced a non-finite state.');
  return next;
}


