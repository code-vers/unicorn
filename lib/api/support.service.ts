import { apiClient, extractErrorMessage } from '../api-client';

export interface SupportTicketPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface SupportTicketResponse {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: SupportTicketStatus;
  createdAt: string;
}

export type SupportTicketStatus = 'PENDING' | 'RESOLVED' | 'CLOSED';

export interface SupportTicketListResponse {
  data: SupportTicketResponse[];
  meta: { page: number; limit: number; total: number; totalPages: number };
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

  getTickets: async (params?: {
    searchTerm?: string;
    status?: SupportTicketStatus;
    page?: number;
    limit?: number;
  }): Promise<SupportTicketListResponse> => {
    try {
      const response = await apiClient.get('/support', { params });
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to load support tickets'));
    }
  },

  updateTicketStatus: async (
    id: string,
    status: SupportTicketStatus
  ): Promise<SupportTicketResponse> => {
    try {
      const response = await apiClient.patch(`/support/${id}/status`, { status });
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to update support ticket'));
    }
  },
};
