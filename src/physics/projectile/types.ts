export interface ProjectileParameters { initialVelocity:number; angleDegrees:number; initialHeight:number; mass:number; gravity:number }
export interface AerodynamicParameters { airDensity:number; dragCoefficient:number; area:number; windX:number; windY:number; integrationTimeStep:number }
export type SimulationMode='ideal'|'real'|'compare';
export interface ProjectileState { time:number;x:number;y:number;vx:number;vy:number;speed:number;ax:number;ay:number;kineticEnergy:number;potentialEnergy:number;totalEnergy:number;relativeAirSpeed:number;dragForce:number;dragAcceleration:number }
export interface ProjectileResult { flightTime:number;horizontalRange:number;maximumHeight:number;timeToMaximumHeight:number;initialVx:number;initialVy:number;impactVx:number;impactVy:number;impactSpeed:number }
export interface TrajectoryPoint extends ProjectileState {}
export interface EnvironmentPreset { id:string;name:string;gravity:number;airDensity:number;note?:string }