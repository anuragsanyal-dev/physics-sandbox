export interface GravityBody { id: string; name: string; type: 'Star' | 'Planet' | 'Moon' | 'Asteroid' | 'Custom'; mass: number; radius: number; x: number; y: number; vx: number; vy: number; }
export interface GravityState { time: number; bodies: GravityBody[]; }
export interface SystemMetrics { kineticEnergy: number; potentialEnergy: number; totalEnergy: number; momentumX: number; momentumY: number; momentumMagnitude: number; angularMomentumZ: number; barycenterX: number; barycenterY: number; }
