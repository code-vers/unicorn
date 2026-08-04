import { useState, useEffect, useCallback } from 'react';
import { AnalyticsService, AnalyticsOverview, RevenueTrend, BookingTrend, VehicleStat, PerformanceScore } from '../lib/api/analytics.service';

export const useAnalytics = () => {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [revenueTrends, setRevenueTrends] = useState<RevenueTrend[]>([]);
  const [bookingTrends, setBookingTrends] = useState<BookingTrend[]>([]);
  const [vehicleStats, setVehicleStats] = useState<VehicleStat[]>([]);
  const [performance, setPerformance] = useState<PerformanceScore | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [overviewData, trendsData, bookingTrendsData, statsData, perfData] = await Promise.all([
        AnalyticsService.getOverview().catch(() => null),
        AnalyticsService.getRevenueTrends().catch(() => []),
        AnalyticsService.getBookingTrends().catch(() => []),
        AnalyticsService.getVehicleStats().catch(() => []),
        AnalyticsService.getPerformance().catch(() => null),
      ]);
      
      if (overviewData) setOverview(overviewData);
      setRevenueTrends(trendsData || []);
      setBookingTrends(bookingTrendsData || []);
      setVehicleStats(statsData || []);
      if (perfData) setPerformance(perfData);
      
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analytics data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    overview,
    revenueTrends,
    bookingTrends,
    vehicleStats,
    performance,
    isLoading,
    error,
    refresh: fetchAll,
  };
};

