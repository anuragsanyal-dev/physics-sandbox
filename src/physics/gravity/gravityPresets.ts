import type { GravityBody } from './types';
import { G } from './gravity';
export interface GravityPreset { id: string; name: string; note: string; bodies: GravityBody[]; }
const AU = 149_597_870_700;
const body = (id: string, name: string, type: GravityBody['type'], mass: number, radius: number, x: number, y: number, vx: number, vy: number): GravityBody => ({ id, name, type, mass, radius, x, y, vx, vy });
function barycentric(bodies: GravityBody[]): GravityBody[] {
  const mass = bodies.reduce((s, b) => s + b.mass, 0);
  const x = bodies.reduce((s, b) => s + b.mass * b.x, 0) / mass, y = bodies.reduce((s, b) => s + b.mass * b.y, 0) / mass;
  const vx = bodies.reduce((s, b) => s + b.mass * b.vx, 0) / mass, vy = bodies.reduce((s, b) => s + b.mass * b.vy, 0) / mass;
  return bodies.map(b => ({ ...b, x: b.x - x, y: b.y - y, vx: b.vx - vx, vy: b.vy - vy }));
}
function pair(a: GravityBody, b: GravityBody): GravityBody[] { return barycentric([a, b]); }
function circ(mass: number, r: number): number { return Math.sqrt(G * mass / r); }
const sun = 1.98847e30, earth = 5.9722e24, moon = 7.342e22;
export const gravityPresets: GravityPreset[] = [
 { id:'sun-earth', name:'Sun + Earth', note:'Near-circular two-body orbit; barycentric initial conditions.', bodies:pair(body('sun','Sun','Star',sun,6.957e8,0,0,0,0),body('earth','Earth','Planet',earth,6.371e6,AU,0,0,circ(sun,AU))) },
 { id:'earth-moon', name:'Earth + Moon', note:'Near-circular Earth-Moon orbit initialized about its barycenter.', bodies:pair(body('earth','Earth','Planet',earth,6.371e6,0,0,0,0),body('moon','Moon','Moon',moon,1.737e6,384_400_000,0,0,circ(earth+moon,384_400_000))) },
 { id:'sun-earth-moon', name:'Sun + Earth + Moon', note:'Simplified nested circular initial conditions, not an ephemeris.', bodies:barycentric([body('sun','Sun','Star',sun,6.957e8,0,0,0,0),body('earth','Earth','Planet',earth,6.371e6,AU,0,-29_780,29_780),body('moon','Moon','Moon',moon,1.737e6,AU+384_400_000,0,-28_758,30_802)]) },
 { id:'inner-solar', name:'Inner Solar System', note:'Approximate circular starting states; not real-time ephemerides.', bodies:barycentric([body('sun','Sun','Star',sun,6.957e8,0,0,0,0),...[[ 'Mercury',3.3011e23,5.79e10,47_360],[ 'Venus',4.8675e24,1.082e11,35_020],[ 'Earth',earth,AU,29_780],[ 'Mars',6.4171e23,2.279e11,24_070]].map(([name,mass,r,v],i)=>body(String(name).toLowerCase(),String(name),'Planet',Number(mass),i===0?2.44e6:6e6,Number(r),0,0,Number(v)))]) },
 { id:'binary-star', name:'Binary Star', note:'Both stars move around their common barycenter.', bodies:pair(body('star-a','Sirius A','Star',2e30,7e8,-5e10,0,0,-12_200),body('star-b','Sirius B','Star',1e30,5e8,1e11,0,0,24_400)) },
 { id:'three-body', name:'Three-Body Figure Eight', note:'Equal-mass choreographic orbit; sensitive to initial conditions.', bodies:[body('body-a','Body A','Custom',1e24,1e6,-97_000_436,24_308_753,380.9,353.3),body('body-b','Body B','Custom',1e24,1e6,97_000_436,-24_308_753,380.9,353.3),body('body-c','Body C','Custom',1e24,1e6,0,0,-761.8,-706.6)] },
 { id:'asteroid-flyby', name:'Asteroid Flyby', note:'Low-mass asteroid undergoes gravitational deflection by a central planet.', bodies:[body('planet','Central Planet','Planet',5.9722e24,6.371e6,0,0,0,0),body('asteroid','Asteroid','Asteroid',1e12,2e4,-20_000_000,8_000_000,5_000,0)] },
];
export function getGravityPreset(id: string): GravityPreset { return gravityPresets.find(p => p.id === id) ?? gravityPresets[0]!; }


