import { apiClient, extractErrorMessage } from '../api-client';

export interface PricingPayload {
  id?: string;
  vehicleId?: string | null;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  chauffeurRate: number;
  securityDeposit: number;
  deliveryCollectionCharge: number;
  airportPickupDropCharge: number;
  gpsCharge?: number;
  fullInsuranceCharge?: number;
  additionalDriverCharge?: number;
  childSeatCharge?: number;
  discountPercentage?: number;
  discountValidFrom?: string | null;
  discountValidUntil?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export const PricingService = {
  getPricing: async (vehicleId?: string): Promise<PricingPayload | null> => {
    try {
      const params = vehicleId ? { vehicleId } : undefined;
      const response = await apiClient.get('/pricing', { params });
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch pricing configuration'));
    }
  },

  savePricing: async (payload: PricingPayload): Promise<PricingPayload> => {
    try {
      const response = await apiClient.put('/pricing', payload);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to save pricing configuration'));
    }
  },

  deletePricing: async (vehicleId: string): Promise<void> => {
    try {
      await apiClient.delete(`/pricing/${vehicleId}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to delete specific pricing'));
    }
  },
};
