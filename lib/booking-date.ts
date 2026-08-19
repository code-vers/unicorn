/** Convert a Kenya-local booking date/time to an unambiguous UTC timestamp. */
export const toBookingIso = (date: string, time = '00:00'): string | undefined => {
  if (!date) return undefined;
  const value = new Date(`${date}T${time || '00:00'}:00+03:00`);
  return Number.isNaN(value.getTime()) ? undefined : value.toISOString();
};
