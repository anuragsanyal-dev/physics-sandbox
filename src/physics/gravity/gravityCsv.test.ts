import { describe, expect, it } from 'vitest';
import { gravitySystemCsv } from './gravityCsv';
import { systemMetrics } from './gravity';
import type { GravityBody } from './types';
const bodies: GravityBody[]=[{id:'sun',name:'Sun',type:'Star',mass:1e30,radius:7e8,x:0,y:0,vx:0,vy:0},{id:'planet',name:'Planet',type:'Planet',mass:1e24,radius:6e6,x:1e9,y:0,vx:0,vy:1000}];
describe('gravity CSV serialization',()=>{it('writes required system columns and numeric conservation data',()=>{const csv=gravitySystemCsv([{time:3600,...systemMetrics(bodies)}],systemMetrics(bodies),3600),[header,row]=csv.split('\n'),columns=header!.split(','),values=row!.split(',').map(Number);expect(columns).toEqual(['time_s','total_kinetic_energy_J','total_potential_energy_J','total_mechanical_energy_J','momentum_x_kg_m_per_s','momentum_y_kg_m_per_s','momentum_magnitude_kg_m_per_s','angular_momentum_z_kg_m2_per_s','barycenter_x_m','barycenter_y_m']);expect(values).toHaveLength(columns.length);expect(values.every(Number.isFinite)).toBe(true);expect(values[0]).toBe(3600);expect(values[1]).toBeGreaterThan(0);expect(values[3]).not.toBe(0);expect(values[8]).toBeGreaterThan(0)});});
