import { apiClient, extractErrorMessage } from '../api-client';
import { PaginatedResponse } from './location.service';

export type VehicleCategory = 'SALOON' | 'SUV' | 'VAN' | 'LUXURY' | 'FOUR_WD' | 'CHAUFFEUR_DRIVEN' | 'SELF_DRIVEN';
export type ChargeType = 'FIXED' | 'PER_KM';
export type DropOffChargeStatus = 'ACTIVE' | 'INACTIVE';

export interface DropOffChargePayload {
  pickupLocationId: string;
  dropOffLocationId: string;
  vehicleCategory?: VehicleCategory;
  vehicleId?: string;
  chargeType?: ChargeType;
  amount: number;
  seasonalMultiplier?: number;
  status?: DropOffChargeStatus;
}

export interface DropOffChargeResponse {
  id: string;
  pickupLocationId: string;
  dropOffLocationId: string;
  vehicleCategory: VehicleCategory | null;
  vehicleId: string | null;
  chargeType: ChargeType | null;
  amount: number;
  seasonalMultiplier: number | null;
  status: DropOffChargeStatus;
  createdAt: string;
  updatedAt: string;
  pickupLocation: { id: string; name: string; city: string };
  dropOffLocation: { id: string; name: string; city: string };
  vehicle: { id: string; name: string; brand: string } | null;
}

export interface DropOffChargeQuery {
  searchTerm?: string;
  pickupLocationId?: string;
  dropOffLocationId?: string;
  vehicleCategory?: VehicleCategory;
  vehicleId?: string;
  chargeType?: ChargeType;
  status?: DropOffChargeStatus;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const DropOffChargeService = {
  getAllCharges: async (query?: DropOffChargeQuery): Promise<PaginatedResponse<DropOffChargeResponse>> => {
    try {
      const response = await apiClient.get('/drop-off-charges', { params: query });
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch drop-off charges'));
    }
  },

  getChargeById: async (id: string): Promise<DropOffChargeResponse> => {
    try {
      const response = await apiClient.get(`/drop-off-charges/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch drop-off charge'));
    }
  },

  createCharge: async (payload: DropOffChargePayload): Promise<DropOffChargeResponse> => {
    try {
      const response = await apiClient.post('/drop-off-charges', payload);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to create drop-off charge'));
    }
  },

  updateCharge: async (id: string, payload: Partial<DropOffChargePayload>): Promise<DropOffChargeResponse> => {
    try {
      const response = await apiClient.patch(`/drop-off-charges/${id}`, payload);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to update drop-off charge'));
    }
  },

  deleteCharge: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/drop-off-charges/${id}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to delete drop-off charge'));
    }
  },
};
