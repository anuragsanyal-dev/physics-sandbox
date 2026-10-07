import type { SystemMetrics } from './types';
export interface GravityCsvSample extends SystemMetrics { time: number }
const columns = ['time_s','total_kinetic_energy_J','total_potential_energy_J','total_mechanical_energy_J','momentum_x_kg_m_per_s','momentum_y_kg_m_per_s','momentum_magnitude_kg_m_per_s','angular_momentum_z_kg_m2_per_s','barycenter_x_m','barycenter_y_m'];
/** Serializes already-computed physics samples; this module performs no simulation calculations. */
export function gravitySystemCsv(samples: GravityCsvSample[], current: SystemMetrics, time: number): string {
 const rows = samples.length ? samples : [{ time, ...current }];
 const values = rows.map(s => [s.time,s.kineticEnergy,s.potentialEnergy,s.totalEnergy,s.momentumX,s.momentumY,s.momentumMagnitude,s.angularMomentumZ,s.barycenterX,s.barycenterY].map(v => Number(v).toPrecision(12)).join(','));
 return [columns.join(','), ...values].join('\n');
}
