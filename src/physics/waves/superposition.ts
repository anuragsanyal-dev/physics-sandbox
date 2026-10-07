import type {WaveParameters} from './types';import {waveDisplacement} from './wave';
export function superpose(first:WaveParameters,second:WaveParameters,x:number,t:number){const wave1=waveDisplacement(first,x,t),wave2=waveDisplacement(second,x,t);return {wave1,wave2,resultant:wave1+wave2}}
export function beatFrequency(f1:number,f2:number){return Math.abs(f1-f2)}
export function beatPeriod(f1:number,f2:number){const f=beatFrequency(f1,f2);return f===0?Infinity:1/f}
export function beatEnvelope(a1:number,a2:number,p1:number,p2:number,x:number,t:number,k1:number,k2:number,w1:number,w2:number,sign1=-1,sign2=-1){const delta=(k2-k1)*x+(sign2*w2-sign1*w1)*t+p2-p1;return interferenceAmplitude(a1,a2,delta)}
import {interferenceAmplitude} from './wave';

