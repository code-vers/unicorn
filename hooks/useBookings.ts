import { useState, useEffect, useCallback } from "react";
import { BookingService, BookingResponse } from "../lib/api/booking.service";

type BookingScope = "mine" | "all";

export const useBookings = (scope: BookingScope = "mine") => {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data =
        scope === "all"
          ? await BookingService.getAllBookings({ page: 1, limit: 5 })
          : await BookingService.getMyBookings();
      setBookings(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch bookings");
    } finally {
      setIsLoading(false);
    }
  }, [scope]);

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
