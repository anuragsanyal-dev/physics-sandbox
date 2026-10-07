import { describe, expect, it } from 'vitest';
import { fmt, fmtScientific } from './formatting';

describe('shared numerical display formatting', () => {
  it('uses readable fixed precision for ordinary values', () => {
    expect(fmt(9.000000000000002, 3)).toBe('9.000');
    expect(fmt(-12.345, 2)).toBe('-12.35');
  });
  it('keeps very large and small values in scientific notation', () => {
    expect(fmt(2.66e40, 3)).toBe('2.660e+40');
    expect(fmt(1.23e-15, 3)).toBe('1.230e-15');
  });
  it('formats zero without a negative sign and marks non-finite values', () => {
    expect(fmt(-0, 3)).toBe('0.000');
    expect(fmt(-0.001, 2)).toBe('0.00');
    expect(fmt(-0.0001, 2)).toBe('-1.00e-4');
    expect(fmt(Number.NaN)).toBe('—');
    expect(fmt(Number.POSITIVE_INFINITY)).toBe('—');
    expect(fmtScientific(0)).toBe('0');
  });
});

