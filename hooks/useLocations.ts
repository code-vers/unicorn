import { useState, useEffect, useCallback } from 'react';
import { LocationService, LocationQuery, LocationResponse, PaginatedResponse, LocationPayload } from '../lib/api/location.service';

export const useLocations = (initialQuery?: LocationQuery) => {
  const [data, setData] = useState<LocationResponse[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<LocationResponse>['meta']>({ page: 1, limit: 10, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [query, setQuery] = useState<LocationQuery>(initialQuery || { page: 1, limit: 10 });

  const fetchLocations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await LocationService.getLocations(query);
      setData(response.data || []);
      setMeta(response.meta || { page: 1, limit: 10, total: 0 });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch locations');
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const updateQuery = (newQuery: Partial<LocationQuery>) => {
    setQuery(prev => ({ ...prev, ...newQuery, page: newQuery.searchTerm !== undefined ? 1 : (newQuery.page || prev.page) }));
  };

  const createLocation = async (payload: LocationPayload) => {
    const result = await LocationService.createLocation(payload);
    await fetchLocations();
    return result;
  };

  const updateLocation = async (id: string, payload: Partial<LocationPayload>) => {
    const result = await LocationService.updateLocation(id, payload);
    await fetchLocations();
    return result;
  };

  const deleteLocation = async (id: string | string[]) => {
    await LocationService.deleteLocation(id);
    await fetchLocations();
  };

  return {
    locations: data,
    meta,
    isLoading,
    error,
    query,
    updateQuery,
    createLocation,
    updateLocation,
    deleteLocation,
    refresh: fetchLocations,
  };
};
