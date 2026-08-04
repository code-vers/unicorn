import { useState, useEffect, useCallback } from 'react';
import { SettingService, SystemSettingResponse, SystemSettingPayload } from '../lib/api/setting.service';

export const useSettings = () => {
  const [data, setData] = useState<SystemSettingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await SettingService.getAllSettings();
      setData(response || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch settings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const upsertSetting = async (payload: SystemSettingPayload) => {
    const result = await SettingService.upsertSetting(payload);
    await fetchSettings();
    return result;
  };

  const deleteSetting = async (key: string) => {
    await SettingService.deleteSetting(key);
    await fetchSettings();
  };

  return {
    settings: data,
    isLoading,
    error,
    upsertSetting,
    deleteSetting,
    refresh: fetchSettings,
  };
};
