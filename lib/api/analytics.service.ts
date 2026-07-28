import { apiClient, extractErrorMessage } from '../api-client';

export interface AnalyticsOverview {
  totalRevenue: number;
  reservations: number;
  upcomingRentals: number;
  pendingArrivals: number;
  activeVehicles: number;
  completedToday: number;
}

export interface RevenueTrend {
  month: string;
  revenue: number;
  expenses: number;
  net: number;
}

export interface BookingTrend {
  month: string;
  bookings: number;
}

export interface VehicleStat {
  type: string;
  count: number;
  color: string;
}

export interface PerformanceScore {
  score: number;
  reviewsCount: number;
  rating: number;
}

export const AnalyticsService = {
  getOverview: async (): Promise<AnalyticsOverview> => {
    try {
      const response = await apiClient.get('/analytics/overview');
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch analytics overview'));
    }
  },

  getRevenueTrends: async (): Promise<RevenueTrend[]> => {
    try {
      const response = await apiClient.get('/analytics/revenue-trends');
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch revenue trends'));
    }
  },

  getBookingTrends: async (): Promise<BookingTrend[]> => {
    try {
      const response = await apiClient.get('/analytics/booking-trends');
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch booking trends'));
    }
  },

  getVehicleStats: async (): Promise<VehicleStat[]> => {
    try {
      const response = await apiClient.get('/analytics/vehicle-stats');
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch vehicle stats'));
    }
  },

  getPerformance: async (): Promise<PerformanceScore> => {
    try {
      const response = await apiClient.get('/analytics/performance');
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch performance score'));
    }
  },
};
