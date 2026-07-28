import { useState, useEffect, useCallback } from 'react';
import { BookingService, BookingResponse } from '../lib/api/booking.service';

export const useBookings = () => {
  const [data, setData] = useState<BookingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await BookingService.getAllBookings();
      // Assume response is the array of bookings. The backend may wrap it, but our service says `return response.data.data;`
      setData(response || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bookings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateBookingStatus = async (
    id: string,
    status: 'PENDING' | 'CONFIRMED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED',
    assignedDriverId?: string
  ) => {
    const result = await BookingService.updateBookingStatus(id, status, assignedDriverId);
    await fetchBookings();
    return result;
  };

  return {
    bookings: data,
    isLoading,
    error,
    updateBookingStatus,
    refresh: fetchBookings,
  };
};
