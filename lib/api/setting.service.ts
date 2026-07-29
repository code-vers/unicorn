import { apiClient, extractErrorMessage } from '../api-client';

export interface SystemSettingPayload {
  key: string;
  value: string;
  description?: string;
}

export interface SystemSettingResponse {
  id: string;
  key: string;
  value: string;
  description: string | null;
  updatedAt: string;
}

export const SettingService = {
  getAllSettings: async (): Promise<SystemSettingResponse[]> => {
    try {
      const response = await apiClient.get('/settings');
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch system settings'));
    }
  },

  getSettingByKey: async (key: string): Promise<SystemSettingResponse> => {
    try {
      const response = await apiClient.get(`/settings/${key}`);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch system setting'));
    }
  },

  upsertSetting: async (payload: SystemSettingPayload): Promise<SystemSettingResponse> => {
    try {
      const response = await apiClient.post('/settings', payload);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to upsert system setting'));
    }
  },

  deleteSetting: async (key: string): Promise<void> => {
    try {
      await apiClient.delete(`/settings/${key}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to delete system setting'));
    }
  },
};
