import { apiClient, extractErrorMessage } from '../api-client';

export interface Notification {
  id: string;
  type: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

export const NotificationService = {
  getNotifications: async (limit?: number): Promise<Notification[]> => {
    try {
      const url = limit ? `/notifications?limit=${limit}` : '/notifications';
      const response = await apiClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch notifications'));
    }
  },

  markAsRead: async (id: string): Promise<void> => {
    try {
      await apiClient.patch(`/notifications/${id}/read`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to mark notification as read'));
    }
  },
};
