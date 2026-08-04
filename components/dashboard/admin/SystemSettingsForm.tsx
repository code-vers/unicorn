'use client';

import { Spinner } from '@/components/ui/Spinner';
import { useSettings } from '@/hooks/useSettings';
import { Plus, Save, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function SystemSettingsForm() {
  const { settings, isLoading, upsertSetting, deleteSetting } = useSettings();

  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey || !newValue) {
      toast.error('Key and Value are required');
      return;
    }

    setIsAdding(true);
    try {
      await upsertSetting({ key: newKey, value: newValue, description: newDesc });
      toast.success('Setting added successfully');
      setNewKey('');
      setNewValue('');
      setNewDesc('');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to add setting');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (key: string) => {
    if (!window.confirm(`Are you sure you want to delete setting: ${key}?`)) return;
    try {
      await deleteSetting(key);
      toast.success('Setting deleted');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to delete setting');
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[300px]'>
        <Spinner size='md' />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-8 w-full'>
      <div className='bg-white border border-[#D3D3D3] border-[1.5px] rounded-[12px] p-6 shadow-sm'>
        <h3 className='text-[#0A1413] text-[18px] font-montserrat font-bold mb-6'>
          Global System Settings
        </h3>

        <div className='overflow-x-auto mb-8'>
          <table className='w-full text-left border-collapse min-w-[600px]'>
            <thead>
              <tr className='bg-[#FAFBFC] border-b border-[#E8ECF0]'>
                <th className='p-4 text-[#A0AEC0] text-[12px] font-normal uppercase'>Key</th>
                <th className='p-4 text-[#A0AEC0] text-[12px] font-normal uppercase'>Value</th>
                <th className='p-4 text-[#A0AEC0] text-[12px] font-normal uppercase'>
                  Description
                </th>
                <th className='p-4 text-[#A0AEC0] text-[12px] font-normal uppercase text-center w-24'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {settings.length === 0 ? (
                <tr>
                  <td colSpan={4} className='p-4 text-center text-[#6B7280] text-sm font-lato'>
                    No system settings found. Add one below.
                  </td>
                </tr>
              ) : (
                settings.map((setting) => (
                  <tr
                    key={setting.key}
                    className='border-b border-[#F4F6F8] hover:bg-gray-50 transition-colors'
                  >
                    <td className='p-4 font-bold text-[#0A1413] text-[14px] font-lato'>
                      {setting.key}
                    </td>
                    <td className='p-4 text-[#6B7280] text-[14px] font-lato'>{setting.value}</td>
                    <td className='p-4 text-[#6B7280] text-[12px] font-lato'>
                      {setting.description || '-'}
                    </td>
                    <td className='p-4 flex justify-center'>
                      <button
                        onClick={() => handleDelete(setting.key)}
                        className='p-1.5 text-[#DC2626] bg-[#FFF0F0] rounded-md hover:bg-[#ffe0e0] transition-colors'
                        title='Delete Setting'
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <form onSubmit={handleAdd} className='bg-[#ffffff] p-5 rounded-lg border border-[#E8ECF0]'>
          <h4 className='text-[14px] font-bold text-[#0A1413] font-montserrat mb-4 flex items-center gap-2'>
            <Plus size={16} className='text-[#3FA34D]' /> Add / Update Setting
          </h4>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
            <div className='flex flex-col gap-1'>
              <label className='text-[#0A1413] text-[12px] font-nunito'>Setting Key</label>
              <input
                type='text'
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder='e.g. TAX_PERCENTAGE'
                required
                className='w-full border border-[#9CA3AF] rounded-[4px] h-[38px] px-3 text-[14px] font-nunito text-[#0A1413] focus:outline-none focus:border-[#3FA34D]'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-[#0A1413] text-[12px] font-nunito'>Value</label>
              <input
                type='text'
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder='e.g. 16'
                required
                className='w-full border border-[#9CA3AF] rounded-[4px] h-[38px] px-3 text-[14px] font-nunito text-[#0A1413] focus:outline-none focus:border-[#3FA34D]'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-[#0A1413] text-[12px] font-nunito'>
                Description (Optional)
              </label>
              <input
                type='text'
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder='e.g. VAT percentage applied to all bookings'
                className='w-full border border-[#9CA3AF] rounded-[4px] h-[38px] px-3 text-[14px] font-nunito text-[#0A1413] focus:outline-none focus:border-[#3FA34D]'
              />
            </div>
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              disabled={isAdding}
              className='flex items-center gap-2 bg-[#3FA34D] hover:bg-[#348a41] text-white px-6 py-2 rounded-[6px] text-[14px] font-bold font-wix transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed'
            >
              <Save size={16} />
              {isAdding ? 'Saving...' : 'Save Setting'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
