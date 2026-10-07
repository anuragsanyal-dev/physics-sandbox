export type Direction = 'right' | 'left';
export type WaveMode = 'single' | 'superposition' | 'standing' | 'beats' | 'reflection';
export type BoundaryType = 'fixed' | 'free';
export interface WaveParameters { amplitude:number; frequency:number; wavelength:number; phase:number; direction:Direction }
export interface WavePoint { time:number; position:number; wave1:number; wave2:number; resultant:number; isNode:boolean; isAntinode:boolean }
export interface Harmonic { number:number; length:number; speed:number; wavelength:number; frequency:number; nodeCount:number; antinodeCount:number }
export interface WaveRun { lab:'waves'; mode:WaveMode; preset:string; wave1:WaveParameters; wave2:WaveParameters; observationPoint:number; boundary:BoundaryType; harmonicNumber:number|null; stringLength:number; stringSpeed:number; beatFrequency:number|null; time:number }
export const TAU=2*Math.PI;
export function validateWave(p:WaveParameters):string[]{const e:string[]=[];if(!Number.isFinite(p.amplitude)||p.amplitude<0||p.amplitude>2)e.push('Amplitude must be between 0 and 2 m.');if(!Number.isFinite(p.frequency)||p.frequency<=0||p.frequency>10)e.push('Frequency must be greater than 0 and at most 10 Hz.');if(!Number.isFinite(p.wavelength)||p.wavelength<=0||p.wavelength>10)e.push('Wavelength must be greater than 0 and at most 10 m.');if(!Number.isFinite(p.phase)||p.phase<0||p.phase>TAU)e.push('Phase must be finite and between 0 and 2π radians.');if(p.direction!=='right'&&p.direction!=='left')e.push('Direction must be right or left.');return e}
export function validateString(length:number,harmonic:number):string[]{const e:string[]=[];if(!Number.isFinite(length)||length<=0)e.push('String length must be finite and positive.');if(!Number.isInteger(harmonic)||harmonic<1||harmonic>4)e.push('Harmonic number must be an integer from 1 to 4.');return e}

