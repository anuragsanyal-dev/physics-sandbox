import {angularFrequency,waveNumber} from './wave';
export function standingDisplacement(amplitude:number,wavelength:number,frequency:number,x:number,t:number){return 2*amplitude*Math.sin(waveNumber(wavelength)*x)*Math.cos(angularFrequency(frequency)*t)}
export function standingNodePositions(wavelength:number,length:number){const spacing=wavelength/2;return Array.from({length:Math.floor(length/spacing+1e-10)+1},(_,i)=>i*spacing).filter(x=>x<=length+1e-9)}
export function standingAntinodePositions(wavelength:number,length:number){const spacing=wavelength/2;return Array.from({length:Math.ceil(length/spacing)},(_,i)=>(i+.5)*spacing).filter(x=>x<length)}
export function fixedStringHarmonic(length:number,speed:number,n:number){return {number:n,length,speed,wavelength:2*length/n,frequency:n*speed/(2*length),nodeCount:n+1,antinodeCount:n}}
