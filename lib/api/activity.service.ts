import { apiClient, extractErrorMessage } from '../api-client';

export interface ActivityLog {
  id: string;
  type: 'booking' | 'payment' | 'driver' | 'service' | 'assignment';
  title: string;
  description: string;
  time: string;
  status?: 'new' | 'pending' | 'completed' | 'failed';
}

export const ActivityService = {
  getRecentActivity: async (limit?: number): Promise<ActivityLog[]> => {
    try {
      const response = await apiClient.get('/activity', { params: { limit } });
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch recent activity'));
    }
  },
};
