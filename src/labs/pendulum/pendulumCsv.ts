import type { PendulumMode, PendulumSample } from '../../physics/pendulum/types';
export const PENDULUM_CSV_HEADER='time_s,angle_rad,angle_deg,angular_velocity_rad_per_s,angular_acceleration_rad_per_s2,tangential_speed_m_per_s,kinetic_energy_J,potential_energy_J,total_mechanical_energy_J,small_angle_angle_rad,nonlinear_angle_rad,angle_difference_rad,angle_difference_deg';
export function pendulumCsv(samples:readonly PendulumSample[],mode:PendulumMode='nonlinear'):string{
 const rows=samples.map(s=>{const small=mode==='small-angle';const angle=small?s.thetaSmall:s.thetaNonlinear,omega=small?s.omegaSmall:s.omegaNonlinear,alpha=small?s.alphaSmall:s.alphaNonlinear,speed=small?s.tangentialSpeedSmall:s.tangentialSpeed,ke=small?s.kineticEnergySmall:s.kineticEnergy,pe=small?s.potentialEnergySmall:s.potentialEnergy,total=small?s.totalEnergySmall:s.totalEnergy;return[s.time,angle,angle*180/Math.PI,omega,alpha,speed,ke,pe,total,s.thetaSmall,s.thetaNonlinear,s.angleDifference,s.angleDifference*180/Math.PI].map(x=>Number(x).toPrecision(12)).join(',')});
 return[PENDULUM_CSV_HEADER,...rows].join('\n');
}
