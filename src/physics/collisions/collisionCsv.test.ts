import { describe, expect, it } from 'vitest';
import { collisionCsv } from '../../labs/collisions/collisionCsv';
import type { CollisionSample } from './types';
const sample:CollisionSample={time:1,xA:-.5,xB:.5,xCM:0,vA:0,vB:5,vCM:2.5,pA:0,pB:5,pTotal:5,keA:0,keB:12.5,keTotal:12.5,collided:1,impulseA:-5,impulseB:5,restitution:1};
describe('collision CSV',()=>it('includes required headers and numerical sampled data',()=>{const[head,row]=collisionCsv([sample]).split('\n'),columns=head!.split(','),data=row!.split(',').map(Number);expect(columns).toContain('time_s');expect(columns).toContain('object_a_momentum_kg_m_per_s');expect(columns).toContain('total_kinetic_energy_J');expect(columns).toContain('center_of_mass_velocity_m_per_s');expect(columns).toContain('collision_occurred');expect(data).toHaveLength(columns.length);expect(data.every(Number.isFinite)).toBe(true);expect(data[0]).toBe(1);expect(data[7]).toBe(5);expect(data[12]).toBe(2.5)}));
