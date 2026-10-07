import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import type { PendulumSample } from '../../physics/pendulum/types';
export type PendulumGraph = 'angle' | 'velocity' | 'energy' | 'phase' | 'error';
const tabs: [PendulumGraph, string][] = [
  ['angle', 'Angle vs Time'], ['velocity', 'Angular Velocity'], ['energy', 'Energy'], ['phase', 'Phase Space'], ['error', 'Approximation Error'],
];
export function PendulumGraphs({ samples, tab, onTab, mode }: { samples: PendulumSample[]; tab: PendulumGraph; onTab: (v: PendulumGraph) => void; mode: string }) {
  const nonlinear = samples.map(s => ({ ...s, thetaPlot: s.thetaNonlinear, omegaPlot: s.omegaNonlinear }));
  const small = samples.map(s => ({ ...s, thetaPlot: s.thetaSmall, omegaPlot: s.omegaSmall }));
  const singleSmall = mode === 'small-angle';
  return <section className="pendulum-graphs">
    <nav>{tabs.filter(([id]) => id !== 'error' || mode === 'compare').map(([id, label]) =>
      <button key={id} className={tab === id ? 'active' : ''} onClick={() => onTab(id)}>{label}</button>)}</nav>
    <div className="pendulum-chart"><ResponsiveContainer width="100%" height="100%">
      {tab === 'phase' ? <ScatterChart>
        <CartesianGrid stroke="#334155" />
        <XAxis type="number" dataKey="thetaPlot" name="θ" unit=" rad" stroke="#94a3b8" />
        <YAxis type="number" dataKey="omegaPlot" name="ω" unit=" rad/s" stroke="#94a3b8" />
        <Tooltip /><Legend />
        <Scatter data={nonlinear} name={singleSmall ? 'Small-Angle' : 'Nonlinear'}
          line={{ stroke: singleSmall ? '#22d3ee' : '#fb923c' }} fill={singleSmall ? '#22d3ee' : '#fb923c'}
          lineType="joint" isAnimationActive={false} />
        {mode === 'compare' && <Scatter data={small} name="Small-Angle" line={{ stroke: '#22d3ee' }} fill="#22d3ee" lineType="joint" isAnimationActive={false} />}
      </ScatterChart> : <LineChart data={samples}>
        <CartesianGrid stroke="#334155" />
        <XAxis dataKey="time" type="number" domain={['dataMin', 'dataMax']} tickFormatter={v => Number(v).toFixed(1)} stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" /><Tooltip labelFormatter={v => 't = ' + Number(v).toFixed(3) + ' s'} /><Legend />
        {tab === 'angle' && <>
          <Line dataKey={singleSmall ? 'thetaSmall' : 'thetaNonlinear'} name={singleSmall ? 'Small-Angle · rad' : 'Nonlinear · rad'} stroke={singleSmall ? '#22d3ee' : '#fb923c'} dot={false} isAnimationActive={false} />
          {mode === 'compare' && <Line dataKey="thetaSmall" name="Small-Angle · rad" stroke="#22d3ee" dot={false} isAnimationActive={false} />}
        </>}
        {tab === 'velocity' && <>
          <Line dataKey={singleSmall ? 'omegaSmall' : 'omegaNonlinear'} name={singleSmall ? 'Small-Angle · rad/s' : 'Nonlinear · rad/s'} stroke={singleSmall ? '#22d3ee' : '#fb923c'} dot={false} isAnimationActive={false} />
          {mode === 'compare' && <Line dataKey="omegaSmall" name="Small-Angle · rad/s" stroke="#22d3ee" dot={false} isAnimationActive={false} />}
        </>}
        {tab === 'energy' && <>
          <Line dataKey="kineticEnergy" name="Kinetic · J" stroke="#22d3ee" dot={false} isAnimationActive={false} />
          <Line dataKey="potentialEnergy" name="Potential · J" stroke="#a78bfa" dot={false} isAnimationActive={false} />
          <Line dataKey="totalEnergy" name="Total Mechanical · J" stroke="#fbbf24" dot={false} isAnimationActive={false} />
        </>}
        {tab === 'error' && <Line dataKey="angleDifference" name="Δθ · rad" stroke="#f472b6" dot={false} isAnimationActive={false} />}
      </LineChart>}
    </ResponsiveContainer></div>
  </section>;
}
