const EM_DASH = '—';

/** Readable display formatting only; never use this for physics calculations. */
export function fmt(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return EM_DASH;
  if (value === 0) return (0).toFixed(digits);
  const magnitude = Math.abs(value);
  if (magnitude >= 1e6 || magnitude < 10 ** (-digits - 1)) return value.toExponential(Math.min(6, Math.max(1, digits)));
  const rounded = value.toFixed(digits);
  return Number(rounded) === 0 ? (0).toFixed(digits) : rounded;
}

export function fmtScientific(value: number, digits = 3): string {
  if (!Number.isFinite(value)) return EM_DASH;
  if (value === 0) return '0';
  return value.toExponential(digits);
}
