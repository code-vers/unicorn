import { apiClient, extractErrorMessage } from '../api-client';
import { PaginatedResponse } from './location.service';
import { PricingPayload } from './pricing.service';
import { FeatureResponse } from './feature.service';

export interface VehicleImage {
  id: string;
  path: string;
  order: number;
}

export interface VehicleResponse {
  id: string;
  name: string;
  category: string;
  brand: string;
  year: number;
  transmission: string;
  fuelType: string;
  seatingCapacity: number;
  luggageCapacity: number | null;
  description: string | null;
  features: FeatureResponse[];
  pricing?: PricingPayload;
  status: 'ACTIVE' | 'INACTIVE';
  availability: 'AVAILABLE' | 'RENTED' | 'MAINTENANCE';
  isFeatured: boolean;
  locationId: string;
  createdAt: string;
  updatedAt: string;
  images?: VehicleImage[];
  location?: {
    id: string;
    name: string;
    city: string;
  };
}

export interface VehicleQuery {
  searchTerm?: string;
  category?: string;
  transmission?: string;
  fuelType?: string;
  locationId?: string;
  availability?: string;
  status?: string;
  isFeatured?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  // Advanced search filters
  pickupDate?: string;
  dropOffDate?: string;
  seatingCapacity?: number;
  featureIds?: string[];
}

export const VehicleService = {
  getVehicles: async (query?: VehicleQuery): Promise<PaginatedResponse<VehicleResponse>> => {
    try {
      const { featureIds, ...rest } = query || {};

      // Build URLSearchParams manually so featureIds serializes as
      // featureIds=id1&featureIds=id2 (not featureIds[]=id1) which is
      // what the backend expects.
      const params = new URLSearchParams();
      Object.entries(rest).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
      if (featureIds && featureIds.length > 0) {
        featureIds.forEach((id) => params.append('featureIds', id));
      }

      const response = await apiClient.get('/vehicles', { params });
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch vehicles'));
    }
  },

  getVehicle: async (id: string): Promise<VehicleResponse> => {
    try {
      const response = await apiClient.get(`/vehicles/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch vehicle details'));
    }
  },

  createVehicle: async (formData: FormData): Promise<VehicleResponse> => {
    try {
      const response = await apiClient.post('/vehicles', formData);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to create vehicle'));
    }
  },

  updateVehicle: async (id: string, formData: FormData): Promise<VehicleResponse> => {
    try {
      const response = await apiClient.patch(`/vehicles/${id}`, formData);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to update vehicle'));
    }
  },

  updateAvailability: async (id: string, availability: string): Promise<VehicleResponse> => {
    try {
      const response = await apiClient.patch(`/vehicles/${id}/availability`, { availability });
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to update vehicle availability'));
    }
  },

  deleteVehicle: async (idOrIds: string | string[]): Promise<void> => {
    try {
      if (Array.isArray(idOrIds)) {
        await apiClient.delete('/vehicles/bulk', { data: idOrIds });
      } else {
        await apiClient.delete(`/vehicles/${idOrIds}`);
      }
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to delete vehicle(s)'));
    }
  },
};
