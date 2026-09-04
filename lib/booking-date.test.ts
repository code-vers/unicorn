import { describe, expect, it } from 'vitest';

import { toBookingIso } from './booking-date';

describe('toBookingIso', () => {
  it('converts Kenya-local booking time to UTC', () => {
    expect(toBookingIso('2026-08-09', '12:30')).toBe('2026-08-09T09:30:00.000Z');
  });

  it('uses midnight when time is omitted', () => {
    expect(toBookingIso('2026-08-09')).toBe('2026-08-08T21:00:00.000Z');
  });

  it('rejects an invalid date', () => {
    expect(toBookingIso('not-a-date')).toBeUndefined();
    expect(toBookingIso('')).toBeUndefined();
  });
});
