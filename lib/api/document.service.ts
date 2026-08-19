import axios from 'axios';

import { apiClient, extractErrorMessage } from '../api-client';

export type DocumentType =
  | 'DRIVERS_LICENSE'
  | 'PASSPORT_ID'
  | 'NATIONAL_ID'
  | 'KRA_PIN'
  | 'INSURANCE'
  | 'COMPANY_REGISTRATION'
  | 'TAX_CERTIFICATE'
  | 'OTHER';

export type DocumentStatus = 'PENDING_REVIEW' | 'VERIFIED' | 'REJECTED';

export interface DocumentResponse {
  id: string;
  userId: string;
  type: DocumentType;
  name: string;
  path: string;
  status: DocumentStatus;
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
}

const extractDocumentErrorMessage = async (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error) && error.response?.data instanceof Blob) {
    try {
      const payload = JSON.parse(await error.response.data.text()) as {
        message?: string;
        errorSources?: Array<{ message?: string }>;
      };
      const sourceMessages = payload.errorSources
        ?.map((source) => source.message)
        .filter((message): message is string => Boolean(message));

      if (sourceMessages?.length) return sourceMessages.join(' | ');
      if (payload.message) return payload.message;
    } catch {
      return fallback;
    }
  }

  return extractErrorMessage(error, fallback);
};

export const DocumentService = {
  getAllDocuments: async (): Promise<DocumentResponse[]> => {
    try {
      const response = await apiClient.get('/documents');
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch documents'));
    }
  },

  getMyDocuments: async (): Promise<DocumentResponse[]> => {
    try {
      const response = await apiClient.get('/documents/my-documents');
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch your documents'));
    }
  },

  openDocument: async (id: string): Promise<void> => {
    const previewWindow = window.open('about:blank', '_blank');
    if (previewWindow) previewWindow.opener = null;

    try {
      const response = await apiClient.get(`/documents/${id}/file`, { responseType: 'blob' });
      const objectUrl = URL.createObjectURL(response.data);
      if (previewWindow) {
        previewWindow.location.replace(objectUrl);
      } else {
        const openedWindow = window.open(objectUrl, '_blank', 'noopener,noreferrer');
        if (!openedWindow) throw new Error('Allow pop-ups to view this document.');
      }
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
    } catch (error) {
      previewWindow?.close();
      throw new Error(await extractDocumentErrorMessage(error, 'Failed to open document'));
    }
  },

  updateDocumentStatus: async (id: string, status: DocumentStatus): Promise<DocumentResponse> => {
    try {
      const response = await apiClient.patch(`/documents/${id}/status`, { status });
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to update document status'));
    }
  },

  uploadDocument: async (file: File, type: DocumentType): Promise<DocumentResponse> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await apiClient.post('/documents', formData);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to upload document'));
    }
  },
};
