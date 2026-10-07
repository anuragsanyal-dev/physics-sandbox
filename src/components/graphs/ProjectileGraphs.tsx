import { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { TrajectoryPoint } from '../../physics/projectile/types';
const tabs = ['Trajectory', 'Position', 'Velocity', 'Acceleration', 'Energy', 'Speed'] as const;
type GraphTab = typeof tabs[number];
export function ProjectileGraphs({ data, ideal }: { data: TrajectoryPoint[]; ideal?: TrajectoryPoint[] }) {
  const [tab, setTab] = useState<GraphTab>('Trajectory');
  const compare = !!ideal;
  useEffect(() => { if (!compare && tab === 'Speed') setTab('Trajectory'); }, [compare, tab]);
  const rows = (points: TrajectoryPoint[]) => points
    .filter((_, i) => i % Math.max(1, Math.floor(points.length / 240)) === 0)
    .map(point => ({ ...point, axis: tab === 'Trajectory' ? point.x : point.time }));
  const pointsFor = (tag: string) => tag === 'Ideal' ? ideal ?? [] : data;
  const line = (tag: string, name: string, key: keyof TrajectoryPoint, color: string) =>
    <Line key={tag + name} name={(tag ? tag + ' · ' : '') + name} data={rows(pointsFor(tag))}
      dataKey={key} stroke={color} dot={false} isAnimationActive={false} />;
  const series = (tag: string, color: string) => {
    if (tab === 'Trajectory') return [line(tag, 'y', 'y', color)];
    if (tab === 'Position') return [line(tag, 'x', 'x', color), line(tag, 'y', 'y', tag === 'Ideal' ? '#f59e0b' : '#fbbf24')];
    if (tab === 'Velocity') return [line(tag, 'vx', 'vx', color), line(tag, 'vy', 'vy', '#f59e0b')];
    if (tab === 'Acceleration') return [line(tag, 'ax', 'ax', color), line(tag, 'ay', 'ay', '#fb7185')];
    if (tab === 'Speed') return [line(tag, 'speed', 'speed', color)];
    return (['kineticEnergy', 'potentialEnergy', 'totalEnergy'] as const).map((key, i) =>
      line(tag, ['KE', 'PE', 'Mechanical'][i]!, key, ['#06b6d4', '#f59e0b', '#10b981'][i]!));
  };
  const all = [...series(compare ? 'Real World' : '', '#06b6d4'), ...(compare ? series('Ideal', '#fb7185') : [])];
  const x = tab === 'Trajectory' ? 'x (m)' : 'Time (s)';
  const y = tab === 'Trajectory' ? 'Height (m)' : tab === 'Position' ? 'Position (m)' :
    tab === 'Velocity' ? 'Velocity (m/s)' : tab === 'Acceleration' ? 'Acceleration (m/s²)' :
      tab === 'Speed' ? 'Speed (m/s)' : 'Energy (J)';
  return <section className="graphs">
    <header>{tabs.filter(name => compare || name !== 'Speed').map(name =>
      <button className={name === tab ? 'active' : ''} key={name} onClick={() => setTab(name)}>{name}</button>)}</header>
    <ResponsiveContainer width="100%" height="90%"><LineChart margin={{ top: 5, right: 12, bottom: 12, left: 5 }}>
      <CartesianGrid stroke="#263244" strokeDasharray="3 3"/>
      <XAxis type="number" dataKey="axis" tick={{ fill: '#94a3b8', fontSize: 9 }}
        label={{ value: x, position: 'insideBottom', fill: '#94a3b8', fontSize: 9 }}/>
      <YAxis tick={{ fill: '#94a3b8', fontSize: 9 }} width={48}
        label={{ value: y, angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 9 }}/>
      <Tooltip contentStyle={{ background: '#111827', borderColor: '#374151', fontSize: 10 }}/>
      <Legend wrapperStyle={{ fontSize: 9 }}/>{all}
    </LineChart></ResponsiveContainer>
  </section>;
}