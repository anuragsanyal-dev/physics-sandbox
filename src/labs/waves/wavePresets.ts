import type {BoundaryType,WaveMode,WaveParameters} from '../../physics/waves/types';
export interface WavePreset {id:string;name:string;mode:WaveMode;wave1:WaveParameters;wave2:WaveParameters;harmonic?:number;boundary?:BoundaryType}
const w=(amplitude:number,frequency:number,wavelength:number,phase=0,direction:'right'|'left'='right'):WaveParameters=>({amplitude,frequency,wavelength,phase,direction});
export const wavePresets:WavePreset[]=[
{id:'basic',name:'Basic Travelling Wave',mode:'single',wave1:w(1,1,2),wave2:w(0,1,2)},
{id:'constructive',name:'Constructive Interference',mode:'superposition',wave1:w(1,1,2),wave2:w(1,1,2)},
{id:'destructive',name:'Destructive Interference · 180°',mode:'superposition',wave1:w(1,1,2),wave2:w(1,1,2,Math.PI)},
{id:'phase-90',name:'Phase Difference · 90°',mode:'superposition',wave1:w(1,1,2),wave2:w(1,1,2,Math.PI/2)},
{id:'standing',name:'General Standing Wave',mode:'standing',wave1:w(1,1,2),wave2:w(1,1,2,0,'left'),harmonic:4},
...([1,2,3,4] as const).map(n=>({id:`harmonic-${n}`,name:n===1?'Fundamental — Fixed String':`${['','Fundamental','Second','Third','Fourth'][n]} Harmonic`,mode:'standing' as const,wave1:w(1,n,8/n),wave2:w(1,n,8/n,0,'left'),harmonic:n})),
{id:'beats',name:'Beats · 4 Hz + 4.5 Hz',mode:'beats',wave1:w(1,4,2),wave2:w(1,4.5,2)},
{id:'fixed-reflection',name:'Fixed-End Reflection',mode:'reflection',wave1:w(1,1,2),wave2:w(1,1,2),boundary:'fixed'},
{id:'free-reflection',name:'Free-End Reflection',mode:'reflection',wave1:w(1,1,2),wave2:w(1,1,2),boundary:'free'}];

