import { apiClient, extractErrorMessage } from '../api-client';
import { PaginatedResponse } from './location.service';

export interface FeaturePayload {
  name: string;
  description?: string;
  iconUrl?: string;
  charge?: number;
  isAddon?: boolean;
}

export interface FeatureResponse {
  id: string;
  name: string;
  description: string | null;
  iconUrl: string | null;
  charge: number;
  isAddon: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FeatureQuery {
  searchTerm?: string;
  isAddon?: boolean | string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const FeatureService = {
  getFeatures: async (query?: FeatureQuery): Promise<PaginatedResponse<FeatureResponse>> => {
    try {
      const response = await apiClient.get('/features', { params: query });
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch features'));
    }
  },

  getFeatureById: async (id: string): Promise<FeatureResponse> => {
    try {
      const response = await apiClient.get(`/features/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch feature'));
    }
  },

  createFeature: async (payload: FeaturePayload): Promise<FeatureResponse> => {
    try {
      const response = await apiClient.post('/features', payload);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to create feature'));
    }
  },

  updateFeature: async (id: string, payload: Partial<FeaturePayload>): Promise<FeatureResponse> => {
    try {
      const response = await apiClient.patch(`/features/${id}`, payload);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to update feature'));
    }
  },

  deleteFeature: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/features/${id}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to delete feature'));
    }
  },
};
