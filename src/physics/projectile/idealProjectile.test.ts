import { describe, it, expect } from 'vitest';
import { calculateResults, sampleTrajectory, stateAt } from './idealProjectile';
import { trajectoryCsv } from '../../utils/csv';
const parameters = { initialVelocity: 10, angleDegrees: 45, initialHeight: 0, mass: 1, gravity: 9.81 };
describe('ideal projectile physics', () => {
  it('matches analytical range and flight time', () => { const result = calculateResults(parameters); expect(result.flightTime).toBeCloseTo(1.4416, 3); expect(result.horizontalRange).toBeCloseTo(10.1937, 3); });
  it('handles a horizontal launch from a non-zero height', () => { const result = calculateResults({ ...parameters, angleDegrees: 0, initialHeight: 20 }); expect(result.flightTime).toBeCloseTo(Math.sqrt(40 / 9.81), 6); expect(result.horizontalRange).toBeCloseTo(10 * result.flightTime, 6); });
  it('produces longer flight and greater range on the Moon than Earth', () => { const earth = calculateResults(parameters), moon = calculateResults({ ...parameters, gravity: 1.62 }); expect(moon.flightTime).toBeGreaterThan(earth.flightTime); expect(moon.horizontalRange).toBeGreaterThan(earth.horizontalRange); });
  it('conserves mechanical energy through the trajectory', () => { const initialEnergy = stateAt(parameters, 0).totalEnergy; for (const point of sampleTrajectory(parameters)) expect(point.totalEnergy).toBeCloseTo(initialEnergy, 9); });
  it('ends exactly at ground level', () => { const points = sampleTrajectory(parameters); expect(points[points.length - 1]?.y).toBe(0); });
  it('matches analytical maximum height', () => { expect(calculateResults(parameters).maximumHeight).toBeCloseTo(100 * Math.sin(Math.PI / 4) ** 2 / (2 * 9.81), 9); });
  it('exports all requested SI columns and trajectory rows to CSV', () => { const points = sampleTrajectory(parameters, 2), rows = trajectoryCsv(points).split('\n'); expect(rows[0]).toBe('time_s,x_m,y_m,vx_m_per_s,vy_m_per_s,speed_m_per_s,ax_m_per_s2,ay_m_per_s2,kinetic_energy_J,potential_energy_J,total_energy_J'); expect(rows).toHaveLength(4); expect(rows[1]?.split(',')).toHaveLength(11); });
});

