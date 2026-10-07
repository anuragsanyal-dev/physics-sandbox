import { G } from './gravity';
import type { GravityBody } from './types';
export interface OrbitalAnalysis { specificEnergy: number; semiMajorAxis: number; eccentricity: number; period: number | null; classification: 'bound' | 'unbound'; }
/** Keplerian osculating elements for a selected two-body relative state. */
export function analyzeOrbit(primary: GravityBody, orbiting: GravityBody): OrbitalAnalysis {
 const rx=orbiting.x-primary.x, ry=orbiting.y-primary.y, vx=orbiting.vx-primary.vx, vy=orbiting.vy-primary.vy;
 const r=Math.hypot(rx,ry), v2=vx*vx+vy*vy, mu=G*(primary.mass+orbiting.mass);
 if (!(r>0) || !Number.isFinite(r+v2)) throw new RangeError('Orbital state must be finite and bodies must be separated.');
 const energy=v2/2-mu/r, h=rx*vy-ry*vx, e2=Math.max(0,1+2*energy*h*h/(mu*mu));
 const a=energy<0?-mu/(2*energy):Infinity;
 return {specificEnergy:energy,semiMajorAxis:a,eccentricity:Math.sqrt(e2),period:energy<0?2*Math.PI*Math.sqrt(a*a*a/mu):null,classification:energy<0?'bound':'unbound'};
}
