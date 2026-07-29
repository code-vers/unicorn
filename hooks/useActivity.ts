import { useState, useEffect, useCallback } from 'react';
import { ActivityService, ActivityLog } from '../lib/api/activity.service';

export const useActivity = (initialLimit: number = 10) => {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLimit, setCurrentLimit] = useState(initialLimit);
  const [hasMore, setHasMore] = useState(true);

  const fetchActivities = useCallback(async (limitToFetch: number, isInitial = false) => {
    setIsLoading(true);
    if (isInitial) setError(null);
    try {
      const data = await ActivityService.getRecentActivity(limitToFetch);
      setActivities(data || []);
      setHasMore((data || []).length === limitToFetch);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch activity logs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities(currentLimit, true);
  }, [fetchActivities, currentLimit]);

  const loadMore = useCallback(() => {
    setCurrentLimit((prev) => prev + initialLimit);
  }, [initialLimit]);

  return {
    activities,
    isLoading,
    error,
    hasMore,
    loadMore,
    refresh: () => fetchActivities(currentLimit, true),
  };
};
