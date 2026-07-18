import { apiClient, extractErrorMessage } from '../api-client';

export interface LocationPayload {
  name: string;
  address: string;
  city: string;
  locationType: 'OFFICE' | 'AIRPORT' | 'HOTEL' | 'PORT' | 'SHOWROOM' | 'OTHER';
  status?: 'ACTIVE' | 'INACTIVE' | 'PENDING';
}

export interface LocationResponse {
  id: string;
  name: string;
  address: string;
  city: string;
  locationType: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LocationQuery {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  city?: string;
  status?: string;
}

export interface PaginatedResponse<T> {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T[];
}

export const LocationService = {
  getLocations: async (query?: LocationQuery): Promise<PaginatedResponse<LocationResponse>> => {
    try {
      const response = await apiClient.get('/locations', { params: query });
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch locations'));
    }
  },

  createLocation: async (payload: LocationPayload): Promise<LocationResponse> => {
    try {
      const response = await apiClient.post('/locations', payload);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to create location'));
    }
  },

  updateLocation: async (id: string, payload: Partial<LocationPayload>): Promise<LocationResponse> => {
    try {
      const response = await apiClient.patch(`/locations/${id}`, payload);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to update location'));
    }
  },

  deleteLocation: async (idOrIds: string | string[]): Promise<void> => {
    try {
      if (Array.isArray(idOrIds)) {
        await apiClient.delete(`/locations/bulk`, { data: idOrIds });
      } else {
        await apiClient.delete(`/locations/${idOrIds}`);
      }
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to delete location'));
    }
  },
};
