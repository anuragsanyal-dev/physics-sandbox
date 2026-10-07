import type { ProjectileParameters } from '../physics/projectile/types';
export const projectilePresets:{id:string;label:string;parameters:ProjectileParameters;environment:string}[]=[
{id:'standard',label:'45° Standard Launch',parameters:{initialVelocity:35,angleDegrees:45,initialHeight:0,mass:1,gravity:9.81},environment:'earth'},
{id:'fast',label:'High-Speed Launch',parameters:{initialVelocity:70,angleDegrees:35,initialHeight:0,mass:1.5,gravity:9.81},environment:'earth'},
{id:'moon',label:'Moon Launch',parameters:{initialVelocity:35,angleDegrees:45,initialHeight:0,mass:1,gravity:1.62},environment:'moon'},
{id:'mars',label:'Mars Launch',parameters:{initialVelocity:35,angleDegrees:45,initialHeight:0,mass:1,gravity:3.72},environment:'mars'},
{id:'platform',label:'High Initial Platform',parameters:{initialVelocity:35,angleDegrees:35,initialHeight:30,mass:1,gravity:9.81},environment:'earth'}];
export const aerodynamicShapes=[{id:'sphere',label:'Sphere',cd:.47},{id:'streamlined',label:'Streamlined body',cd:.04},{id:'cube',label:'Cube',cd:1.05},{id:'custom',label:'Custom',cd:null}] as const;
export const realWorldPresets=[{id:'baseball',label:'Baseball-like Projectile',mass:.145,dragCoefficient:.47,area:.0042},{id:'metal',label:'Dense Metal Sphere',mass:1.2,dragCoefficient:.47,area:.01},{id:'light',label:'Light Ball',mass:.15,dragCoefficient:.47,area:.01},{id:'headwind',label:'Strong Headwind',windX:-10},{id:'tailwind',label:'Strong Tailwind',windX:10},{id:'moonvac',label:'Moon Vacuum',airDensity:0}] as const;