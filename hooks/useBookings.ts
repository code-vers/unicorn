import { useState, useEffect, useCallback } from 'react';
import { BookingService, BookingResponse } from '../lib/api/booking.service';

export const useBookings = () => {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await BookingService.getMyBookings();
      setBookings(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bookings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    bookings,
    isLoading,
    error,
    refresh: fetchBookings,
  };
};
