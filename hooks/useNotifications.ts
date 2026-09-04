import { useState, useEffect, useCallback } from 'react';
import { NotificationService, Notification } from '../lib/api/notification.service';

export const useNotifications = (limit: number = 10) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Assuming getNotifications and getUserNotifications do the same thing now
      // Or we can just use the backend's default get all for user
      const data = await NotificationService.getUserNotifications();
      setNotifications(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch notifications');
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (id: string) => {
    try {
      await NotificationService.markAsRead(id);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to mark notification as read');
    }
  };

  return {
    notifications,
    isLoading,
    error,
    markAsRead,
    refresh: fetchNotifications,
  };
};
