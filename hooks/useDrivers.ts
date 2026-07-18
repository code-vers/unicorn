import { useState, useEffect, useCallback } from 'react';
import { DriverService, DriverQuery, DriverResponse } from '../lib/api/driver.service';
import { PaginatedResponse } from '../lib/api/location.service';

export const useDrivers = (initialQuery?: DriverQuery) => {
  const [data, setData] = useState<DriverResponse[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<DriverResponse>['meta']>({ page: 1, limit: 10, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState<DriverQuery>(initialQuery || { page: 1, limit: 10 });

  const fetchDrivers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await DriverService.getDrivers(query);
      setData(response.data || []);
      setMeta(response.meta || { page: 1, limit: 10, total: 0 });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch drivers');
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const updateQuery = (newQuery: Partial<DriverQuery>) => {
    setQuery(prev => ({ ...prev, ...newQuery, page: newQuery.searchTerm !== undefined ? 1 : (newQuery.page || prev.page) }));
  };

  const createDriver = async (formData: FormData) => {
    const result = await DriverService.createDriver(formData);
    await fetchDrivers();
    return result;
  };

  const updateDriver = async (id: string, formData: FormData) => {
    const result = await DriverService.updateDriver(id, formData);
    await fetchDrivers();
    return result;
  };

  const updateAvailability = async (id: string, availability: string) => {
    const result = await DriverService.updateAvailability(id, availability);
    await fetchDrivers();
    return result;
  };

  const deleteDriver = async (idOrIds: string | string[]) => {
    await DriverService.deleteDriver(idOrIds);
    await fetchDrivers();
  };

  return {
    drivers: data,
    meta,
    isLoading,
    error,
    query,
    updateQuery,
    createDriver,
    updateDriver,
    updateAvailability,
    deleteDriver,
    refresh: fetchDrivers,
  };
};
