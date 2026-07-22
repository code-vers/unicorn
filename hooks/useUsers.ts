import { useState, useEffect, useCallback } from 'react';
import { UserService, UserQuery, UserResponse } from '../lib/api/user.service';
import { PaginatedResponse } from '../lib/api/location.service';

export const useUsers = (initialQuery?: UserQuery) => {
  const [data, setData] = useState<UserResponse[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<UserResponse>['meta']>({ page: 1, limit: 10, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState<UserQuery>(initialQuery || { page: 1, limit: 10 });

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await UserService.getAllUsers(query);
      setData(response.data || []);
      setMeta(response.meta || { page: 1, limit: 10, total: 0 });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateQuery = (newQuery: Partial<UserQuery>) => {
    setQuery(prev => ({
      ...prev,
      ...newQuery,
      page: newQuery.searchTerm !== undefined ? 1 : (newQuery.page || prev.page),
    }));
  };

  const changeRole = async (id: string, role: 'USER' | 'ADMIN') => {
    const result = await UserService.changeRole(id, role);
    await fetchUsers();
    return result;
  };

  const updateDocumentStatus = async (docId: string, status: 'VERIFIED' | 'REJECTED') => {
    const result = await UserService.updateDocumentStatus(docId, status);
    await fetchUsers();
    return result;
  };

  const deleteUser = async (idOrIds: string | string[]) => {
    await UserService.deleteUser(idOrIds);
    await fetchUsers();
  };

  return {
    users: data,
    meta,
    isLoading,
    error,
    query,
    updateQuery,
    changeRole,
    updateDocumentStatus,
    deleteUser,
    refresh: fetchUsers,
  };
};
