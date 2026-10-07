import type { EnvironmentPreset } from '../physics/projectile/types';
export const environments:EnvironmentPreset[]=[
{id:'earth',name:'Earth',gravity:9.81,airDensity:1.225},{id:'moon',name:'Moon',gravity:1.62,airDensity:0},
{id:'mars',name:'Mars',gravity:3.72,airDensity:.020},{id:'venus',name:'Venus',gravity:8.87,airDensity:65},
{id:'mercury',name:'Mercury',gravity:3.7,airDensity:0},{id:'jupiter',name:'Jupiter · simplified gravity only',gravity:24.79,airDensity:0,note:'Simplified gravity only; no surface or atmosphere is modeled.'},
{id:'custom',name:'Custom',gravity:9.81,airDensity:1.225}];