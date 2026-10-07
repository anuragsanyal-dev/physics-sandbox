import {TAU} from './types';import type {WaveParameters} from './types';
export {validateWave} from './types';
export const period=(f:number)=>1/f;
export const waveNumber=(lambda:number)=>TAU/lambda;
export const angularFrequency=(f:number)=>TAU*f;
export const waveSpeed=(f:number,lambda:number)=>f*lambda;
export const phaseDegreesToRadians=(degrees:number)=>degrees*Math.PI/180;
export function waveDisplacement(p:WaveParameters,x:number,t:number):number{const sign=p.direction==='right'?-1:1;return p.amplitude*Math.sin(waveNumber(p.wavelength)*x+sign*angularFrequency(p.frequency)*t+p.phase)}
export function interferenceAmplitude(a1:number,a2:number,phaseDifference:number):number{return Math.sqrt(a1*a1+a2*a2+2*a1*a2*Math.cos(phaseDifference))}
export function equalWaveResultantAmplitude(amplitude:number,phaseDifference:number):number{return 2*amplitude*Math.abs(Math.cos(phaseDifference/2))}
