import { apiClient, extractErrorMessage } from '../api-client';
import { PaginatedResponse } from './location.service';

// ─── Interfaces matching backend formatUserResponse ───────────────────────────

export interface UserDocument {
  id: string;
  userId: string;
  type: string;
  name: string;
  path: string;
  status: 'PENDING_REVIEW' | 'VERIFIED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'BLOCKED' | 'INACTIVE';
  photoUrl: string | null;
  phoneNumber: string | null;
  address: string | null;
  idPassportNumber: string | null;
  emergencyContactName: string | null;
  emergencyContactEmail: string | null;
  emergencyContactPhone: string | null;
  emergencyContactRelation: string | null;
  documents: UserDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface UserQuery {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

export interface UpdateProfilePayload {
  name?: string;
  phoneNumber?: string;
  address?: string;
  idPassportNumber?: string;
  emergencyContactName?: string;
  emergencyContactEmail?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const UserService = {
  // Customer endpoints
  getMe: async (): Promise<UserResponse> => {
    try {
      const response = await apiClient.get('/users/me');
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch profile'));
    }
  },

  updateProfile: async (formData: FormData): Promise<UserResponse> => {
    try {
      const response = await apiClient.patch('/users/profile', formData);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to update profile'));
    }
  },

  changePassword: async (payload: ChangePasswordPayload): Promise<void> => {
    try {
      await apiClient.patch('/users/password', payload);
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to change password'));
    }
  },

  uploadDocument: async (formData: FormData): Promise<UserDocument> => {
    try {
      const response = await apiClient.post('/users/documents', formData);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to upload document'));
    }
  },

  deleteDocument: async (docId: string): Promise<void> => {
    try {
      await apiClient.delete(`/users/documents/${docId}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to delete document'));
    }
  },

  // Admin endpoints
  getAllUsers: async (query?: UserQuery): Promise<PaginatedResponse<UserResponse>> => {
    try {
      const response = await apiClient.get('/users', { params: query });
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch users'));
    }
  },

  getUserById: async (id: string): Promise<UserResponse> => {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch user'));
    }
  },

  changeRole: async (id: string, role: 'USER' | 'ADMIN'): Promise<UserResponse> => {
    try {
      const response = await apiClient.patch(`/users/${id}/role`, { role });
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to change user role'));
    }
  },

  updateDocumentStatus: async (docId: string, status: 'VERIFIED' | 'REJECTED'): Promise<UserDocument> => {
    try {
      const response = await apiClient.patch(`/users/documents/${docId}/status`, { status });
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to update document status'));
    }
  },

  deleteUser: async (idOrIds: string | string[]): Promise<void> => {
    try {
      if (Array.isArray(idOrIds)) {
        await apiClient.delete('/users', { data: idOrIds });
      } else {
        await apiClient.delete(`/users/${idOrIds}`);
      }
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to delete user(s)'));
    }
  },
};
