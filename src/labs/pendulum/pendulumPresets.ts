import type { PendulumParameters } from '../../physics/pendulum/types';
export interface PendulumPreset{id:string;name:string;params:PendulumParameters}
const base={length:1,mass:1,initialAngle:5*Math.PI/180,initialAngularVelocity:0,gravity:9.81,damping:0};
export const pendulumPresets:PendulumPreset[]=[
{id:'small-angle',name:'Small-Angle SHM · 5°',params:{...base}},
{id:'moderate',name:'Moderate Angle · 30°',params:{...base,initialAngle:30*Math.PI/180}},
{id:'large',name:'Large Angle · 90°',params:{...base,initialAngle:Math.PI/2}},
{id:'near-inverted',name:'Near-Inverted · 170°',params:{...base,initialAngle:170*Math.PI/180}},
{id:'damped',name:'Damped Pendulum · 45°',params:{...base,initialAngle:Math.PI/4,damping:.18}},
{id:'moon',name:'Moon Pendulum',params:{...base,gravity:1.62}},
{id:'long',name:'Long Pendulum · 4 m',params:{...base,length:4}},
];
