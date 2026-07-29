import { apiClient, extractErrorMessage } from '../api-client';

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export const NotificationService = {
  getUserNotifications: async (limit?: number): Promise<Notification[]> => {
    try {
      const url = limit ? `/notifications?limit=${limit}` : '/notifications';
      const response = await apiClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch notifications'));
    }
  },
  
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
