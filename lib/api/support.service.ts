import { apiClient, extractErrorMessage } from '../api-client';

export interface SupportTicketPayload {
  subject: string;
  message: string;
  category?: string;
}

export interface SupportTicketResponse {
  id: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export const SupportService = {
  createTicket: async (payload: SupportTicketPayload): Promise<SupportTicketResponse> => {
    try {
      const response = await apiClient.post('/support', payload);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to submit support ticket'));
    }
  },
};
