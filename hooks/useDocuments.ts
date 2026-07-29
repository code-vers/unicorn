import { useState, useEffect, useCallback } from 'react';
import {
  DocumentService,
  DocumentResponse,
  DocumentStatus,
  DocumentType,
} from '../lib/api/document.service';

export const useDocuments = (scope: 'mine' | 'all' = 'mine') => {
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = scope === 'all'
        ? await DocumentService.getAllDocuments()
        : await DocumentService.getMyDocuments();
      setDocuments(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch documents');
    } finally {
      setIsLoading(false);
    }
  }, [scope]);

  useEffect(() => {
    const request = scope === 'all'
      ? DocumentService.getAllDocuments()
      : DocumentService.getMyDocuments();

    request
      .then((data) => setDocuments(data || []))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to fetch documents');
      })
      .finally(() => setIsLoading(false));
  }, [scope]);

  const updateDocumentStatus = async (id: string, status: DocumentStatus) => {
    const updated = await DocumentService.updateDocumentStatus(id, status);
    setDocuments(prev => prev.map(doc => doc.id === id ? updated : doc));
    return updated;
  };

  const uploadDocument = async (file: File, type: DocumentType) => {
    const newDoc = await DocumentService.uploadDocument(file, type);
    setDocuments(prev => [newDoc, ...prev]);
    return newDoc;
  };

  return {
    documents,
    isLoading,
    error,
    fetchDocuments,
    updateDocumentStatus,
    uploadDocument
  };
};
