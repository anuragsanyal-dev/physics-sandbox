export type PendulumMode = 'small-angle' | 'nonlinear' | 'compare';
export interface PendulumParameters { length:number; mass:number; initialAngle:number; initialAngularVelocity:number; gravity:number; damping:number; }
export interface PendulumState { time:number; theta:number; omega:number; }
export interface PendulumSample { time:number; thetaSmall:number; omegaSmall:number; thetaNonlinear:number; omegaNonlinear:number; alphaNonlinear:number; alphaSmall:number; tangentialSpeedSmall:number; angleDifference:number; tangentialSpeed:number; kineticEnergy:number; potentialEnergy:number; totalEnergy:number; kineticEnergySmall:number; potentialEnergySmall:number; totalEnergySmall:number; x:number; y:number; }
