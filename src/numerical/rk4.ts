/** Classical fourth-order Runge–Kutta step for a vector-valued ODE. */
export type Derivative<T extends readonly number[]> = (state: T, time: number) => T;

export function rk4Step<T extends readonly number[]>(derivative: Derivative<T>, state: T, time: number, dt: number): T {
  if (!(Number.isFinite(dt) && dt > 0)) throw new RangeError('RK4 timestep must be finite and positive.');
  const addScaled = (base: T, slope: T, scale: number): T => base.map((value, index) => value + (slope[index] ?? 0) * scale) as unknown as T;
  const k1 = derivative(state, time);
  const k2 = derivative(addScaled(state, k1, dt / 2), time + dt / 2);
  const k3 = derivative(addScaled(state, k2, dt / 2), time + dt / 2);
  const k4 = derivative(addScaled(state, k3, dt), time + dt);
  return state.map((value, index) => value + dt / 6 * ((k1[index] ?? 0) + 2 * (k2[index] ?? 0) + 2 * (k3[index] ?? 0) + (k4[index] ?? 0))) as unknown as T;
}