import { useState, useEffect, useCallback } from 'react';
import { VehicleService, VehicleQuery, VehicleResponse } from '../lib/api/vehicle.service';
import { PaginatedResponse } from '../lib/api/location.service';

export const useVehicles = (initialQuery?: VehicleQuery) => {
  const [data, setData] = useState<VehicleResponse[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<VehicleResponse>['meta']>({ page: 1, limit: 10, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [query, setQuery] = useState<VehicleQuery>(initialQuery || { page: 1, limit: 10 });

  const fetchVehicles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await VehicleService.getVehicles(query);
      setData(response.data || []);
      setMeta(response.meta || { page: 1, limit: 10, total: 0 });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch vehicles');
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const updateQuery = (newQuery: Partial<VehicleQuery>) => {
    setQuery(prev => ({ ...prev, ...newQuery, page: newQuery.searchTerm !== undefined ? 1 : (newQuery.page || prev.page) }));
  };

  const createVehicle = async (formData: FormData) => {
    const result = await VehicleService.createVehicle(formData);
    await fetchVehicles();
    return result;
  };

  const updateVehicle = async (id: string, formData: FormData) => {
    const result = await VehicleService.updateVehicle(id, formData);
    await fetchVehicles();
    return result;
  };

  const updateAvailability = async (id: string, availability: string) => {
    const result = await VehicleService.updateAvailability(id, availability);
    await fetchVehicles();
    return result;
  };

  const deleteVehicle = async (idOrIds: string | string[]) => {
    await VehicleService.deleteVehicle(idOrIds);
    await fetchVehicles();
  };

  return {
    vehicles: data,
    meta,
    isLoading,
    error,
    query,
    updateQuery,
    createVehicle,
    updateVehicle,
    updateAvailability,
    deleteVehicle,
    refresh: fetchVehicles,
  };
};
