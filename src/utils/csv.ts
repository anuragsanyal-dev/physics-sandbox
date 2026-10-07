import type { TrajectoryPoint, SimulationMode } from '../physics/projectile/types';

/** Serialize simulation output. Aerodynamic columns are included for Real World and Compare modes. */
export function trajectoryCsv(points: TrajectoryPoint[], mode: SimulationMode = 'ideal'): string {
  const columns = [
    'time_s', 'x_m', 'y_m', 'vx_m_per_s', 'vy_m_per_s', 'speed_m_per_s',
    'ax_m_per_s2', 'ay_m_per_s2', 'kinetic_energy_J', 'potential_energy_J', 'total_energy_J',
  ];
  const includeAerodynamics = mode !== 'ideal';
  if (includeAerodynamics) columns.push('relative_air_speed_m_per_s', 'drag_force_N', 'drag_acceleration_m_per_s2');
  const rows = points.map(point => {
    const values = [
      point.time, point.x, point.y, point.vx, point.vy, point.speed,
      point.ax, point.ay, point.kineticEnergy, point.potentialEnergy, point.totalEnergy,
    ];
    if (includeAerodynamics) values.push(point.relativeAirSpeed, point.dragForce, point.dragAcceleration);
    return values.map(value => value.toPrecision(10)).join(',');
  });
  return [columns.join(','), ...rows].join('\n');
}

export function downloadCsv(content: string, filename: string): void {
  const url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}