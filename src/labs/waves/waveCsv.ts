import type {WavePoint} from '../../physics/waves/types';
export const WAVE_CSV_HEADER='time_s,position_m,wave_1_displacement_m,wave_2_displacement_m,resultant_displacement_m,is_node,is_antinode';
export function waveCsv(points:WavePoint[]){return [WAVE_CSV_HEADER,...points.map(p=>[p.time,p.position,p.wave1,p.wave2,p.resultant,Number(p.isNode),Number(p.isAntinode)].map(v=>typeof v==='number'?Number(v.toFixed(8)):v).join(','))].join('\n')}

