'use client';

import { useState } from 'react';
import { Eye, Pencil, Trash2, Search, Download, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDrivers } from '../../../hooks/useDrivers';
import { DriverResponse } from '../../../lib/api/driver.service';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import DriverModal from './DriverModal';
import { Spinner } from '@/components/ui/Spinner';


export default function DriversTable() {
  const {
    drivers,
    meta,
    isLoading,
    query,
    updateQuery,
    createDriver,
    updateDriver,
    updateAvailability,
    deleteDriver,
  } = useDrivers();

  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<DriverResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [driversToDelete, setDriversToDelete] = useState<string[]>([]);

  const formatText = (text: string | undefined | null) => {
    if (!text) return 'N/A';
    return text.split('_').map((word) => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getAvailabilityStyles = (availability: string) => {
    switch (availability) {
      case 'AVAILABLE':
        return 'bg-[#EBF7ED] text-[#3FA34D] hover:bg-[#d4f0d8]';
      case 'ASSIGNED':
        return 'bg-[#FFF3E8] text-[#FF7815] hover:bg-[#ffe1cc]';
      case 'UNAVAILABLE':
        return 'bg-[#FFF0F0] text-[#DC2626] hover:bg-[#ffe0e0]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const toggleAvailability = async (id: string, current: string) => {
    const nextAvailability = current === 'AVAILABLE' ? 'UNAVAILABLE' : 'AVAILABLE';
    try {
      await updateAvailability(id, nextAvailability);
      toast.success(`Availability changed to ${formatText(nextAvailability)}`);
    } catch (error: any) {
      toast.error('Failed to change availability');
    }
  };

  const openAddModal = () => {
    setSelectedDriver(null);
    setIsDriverModalOpen(true);
  };

  const openEditModal = (driver: DriverResponse) => {
    setSelectedDriver(driver);
    setIsDriverModalOpen(true);
  };

  const handleDriverSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      if (selectedDriver) {
        await updateDriver(selectedDriver.id, formData);
        toast.success('Driver updated successfully');
      } else {
        await createDriver(formData);
        toast.success('Driver created successfully');
      }
      setIsDriverModalOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteModal = (id: string) => {
    setDriversToDelete([id]);
    setIsDeleteModalOpen(true);
  };

  const openBulkDeleteModal = () => {
    setDriversToDelete(selectedIds);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsSubmitting(true);
    try {
      await deleteDriver(driversToDelete.length === 1 ? driversToDelete[0] : driversToDelete);
      toast.success(
        driversToDelete.length === 1
          ? 'Driver deleted successfully'
          : 'Drivers deleted successfully'
      );
      setIsDeleteModalOpen(false);
      setDriversToDelete([]);
      setSelectedIds([]);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to delete drivers');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(drivers.map((d) => d.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className='bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col w-full'>
      {/* Toolbar */}
      <div className='p-5 border-b border-[#E8ECF0] flex justify-between items-center flex-wrap gap-3'>
        <div className='flex items-center gap-2'>
          {selectedIds.length > 0 && (
            <button
              onClick={openBulkDeleteModal}
              className='bg-red-50 text-red-600 border border-red-200 px-3 py-2 rounded-[6px] text-[13px] font-bold font-wix hover:bg-red-100 transition-colors flex items-center gap-2'
            >
              <Trash2 size={14} />
              Delete Selected ({selectedIds.length})
            </button>
          )}
        </div>

        <div className='flex items-center justify-end gap-3 flex-wrap flex-1'>
          <div className='relative w-[170px] sm:w-[200px]'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-[#718096]' size={14} />
            <input
              type='text'
              value={query.searchTerm || ''}
              onChange={(e) => updateQuery({ searchTerm: e.target.value })}
              placeholder='Search drivers...'
              className='w-full bg-[#F4F6F8] border border-[#E8ECF0] rounded-[8px] h-[34px] pl-9 pr-3 text-[12px] text-[#1A202C] focus:outline-none focus:ring-1 focus:ring-[#3FA34D] font-lato placeholder-[#A0AEC0]'
            />
          </div>
          
          <select
            value={query.availability || ''}
            onChange={(e) => updateQuery({ availability: e.target.value || undefined })}
            className='bg-[#F4F6F8] border border-[#E8ECF0] rounded-[7px] h-[34px] px-3 pr-8 text-[12px] text-[#718096] hover:bg-gray-100 font-lato transition-colors appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#3FA34D]'
            style={{
              backgroundImage:
                'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23718096%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 8px center',
            }}
          >
            <option value="">All Status</option>
            <option value="AVAILABLE">Available (Eligible for work)</option>
            <option value="UNAVAILABLE">Unavailable (On Leave)</option>
          </select>
          
          <button className='flex items-center gap-1.5 px-3 h-[34px] bg-[#F4F6F8] border border-[#E8ECF0] rounded-[7px] text-[12px] text-[#718096] hover:bg-gray-100 font-lato transition-colors'>
            <Download size={14} /> Export
          </button>

          <button onClick={openAddModal} className='bg-[#3FA34D] hover:bg-[#348a41] text-white h-[34px] px-6 rounded-[6px] text-[14px] font-bold font-wix transition-colors flex items-center gap-2 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]'>
            Add Driver
          </button>
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto min-h-[300px] relative'>
        {isLoading && drivers.length === 0 ? (
          <div className='absolute inset-0 flex items-center justify-center bg-white/50 z-10'>
            <Spinner size="md" />
          </div>
        ) : null}
        <table className='w-full text-left border-collapse min-w-[1200px]'>
          <thead>
            <tr className='bg-[#FAFBFC] border-b border-[#E8ECF0] h-[50px]'>
              <th className='px-3 py-2 w-[50px] text-center'>
                <input
                  type='checkbox'
                  checked={drivers.length > 0 && selectedIds.length === drivers.length}
                  onChange={handleSelectAll}
                  className='w-3.5 h-3.5 rounded-[4px] border-[#E8ECF0] text-[#3FA34D] focus:ring-[#3FA34D] mx-auto cursor-pointer'
                />
              </th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[220px]'>Name</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[152px]'>Phone</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[152px]'>Whatsapp</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[90px]'>License</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[134px]'>Assigned Vehicle</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[114px]'>Availability</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase text-center w-[152px]'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-[#F4F6F8]'>
            {drivers.length === 0 && !isLoading ? (
              <tr>
                <td colSpan={8} className='text-center py-10 text-gray-500 font-lato'>
                  No drivers found.
                </td>
              </tr>
            ) : (
              drivers.map((driver, index) => (
                <tr
                  key={driver.id}
                  className={`${index % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'} h-[50px] hover:bg-gray-50 transition-colors group`}
                >
                  <td className='px-3 py-2 text-center'>
                    <input
                      type='checkbox'
                      checked={selectedIds.includes(driver.id)}
                      onChange={() => handleSelectRow(driver.id)}
                      className='w-3.5 h-3.5 rounded-[4px] border-[#E8ECF0] text-[#3FA34D] focus:ring-[#3FA34D] mx-auto cursor-pointer'
                    />
                  </td>
                  <td className='px-3 py-2'>
                    <div className='flex items-center gap-2'>
                      {driver.photoUrl ? (
                        <div className='relative w-[30px] h-[30px] rounded-[8px] overflow-hidden border border-gray-200 bg-[rgba(63,163,77,0.09)]'>
                          <div className='absolute inset-0 flex items-center justify-center'>
                            <span className='text-[10px] font-bold text-[#3FA34D] font-montserrat'>{getInitials(driver.name)}</span>
                          </div>
                          <img 
                            src={`http://localhost:5000${driver.photoUrl}`} 
                            alt={driver.name} 
                            className='w-full h-full object-cover relative z-10 bg-white'
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      ) : (
                        <div className='w-[30px] h-[30px] rounded-[8px] bg-[rgba(63,163,77,0.09)] flex items-center justify-center'>
                          <span className='text-[10px] font-bold text-[#3FA34D] font-montserrat'>{getInitials(driver.name)}</span>
                        </div>
                      )}
                      <span className='text-[12px] font-semibold text-[#1A202C] font-lato'>{driver.name}</span>
                    </div>
                  </td>
                  <td className='px-3 py-2 text-[12px] font-semibold text-[#0A1413] font-lato'>{driver.phoneNumber}</td>
                  <td className='px-3 py-2 text-[12px] font-semibold text-[#0A1413] font-lato'>{driver.whatsappNumber}</td>
                  <td className='px-3 py-2 text-[12px] text-[#6B7280] font-lato'>{driver.licenseDetails || 'N/A'}</td>
                  <td className='px-3 py-2 text-[12px] text-[#6B7280] font-lato'>{driver.assignedVehicle?.name || 'Unassigned'}</td>
                  <td className='px-3 py-2'>
                    {driver.bookings && driver.bookings.length > 0 ? (
                      <span className='inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] text-[10px] font-bold min-w-[50px] bg-[#FFF3E8] text-[#FF7815] cursor-default' title="Driver has an active booking today">
                        ASSIGNED (ON DUTY)
                      </span>
                    ) : (
                      <button
                        onClick={() => toggleAvailability(driver.id, driver.availability)}
                        className={`inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] text-[10px] font-bold min-w-[50px] transition-colors cursor-pointer ${getAvailabilityStyles(driver.availability)}`}
                        title="Click to toggle availability"
                      >
                        {formatText(driver.availability)}
                      </button>
                    )}
                  </td>
                  <td className='px-3 py-2'>
                    <div className='flex items-center justify-center gap-[4px]'>
                      <button onClick={() => openEditModal(driver)} className='bg-[#F6F6F6] text-[#6B7280] p-1.5 rounded-[5px] hover:bg-gray-200 transition-all transform hover:scale-105'>
                        <Pencil size={12} />
                      </button>
                      <button onClick={() => openDeleteModal(driver.id)} className='bg-[#FFF0F0] text-[#DC2626] p-1.5 rounded-[5px] hover:bg-[#ffe0e0] transition-all transform hover:scale-105'>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='px-10 py-5 flex items-center justify-between border-t border-[#E8ECF0]'>
        <p className='text-[10.5px] text-[#A0AEC0] font-lato'>
          Showing {drivers.length > 0 ? (meta.page - 1) * meta.limit + 1 : 0}–
          {Math.min(meta.page * meta.limit, meta.total)} of {meta.total}
        </p>
        <div className='flex items-center gap-1'>
          <button
            disabled={meta.page <= 1}
            onClick={() => updateQuery({ page: meta.page - 1 })}
            className='w-7 h-7 flex items-center justify-center bg-[#F6F6F6] border border-[#F6F6F6] text-[#6B7280] rounded-[6px] hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <ChevronLeft size={12} />
          </button>
          <button className='w-7 h-7 flex items-center justify-center bg-gradient-to-br from-[#3FA34D] to-[#2E7A39] text-white text-[12px] font-bold rounded-[6px] shadow-[0px_2px_3px_rgba(63,163,77,0.25)]'>
            {meta.page}
          </button>
          <button
            disabled={meta.page >= Math.ceil(meta.total / meta.limit) || meta.total === 0}
            onClick={() => updateQuery({ page: meta.page + 1 })}
            className='w-7 h-7 flex items-center justify-center bg-[#F6F6F6] border border-[#F6F6F6] text-[#6B7280] rounded-[6px] hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      <DriverModal
        isOpen={isDriverModalOpen}
        onClose={() => setIsDriverModalOpen(false)}
        onSubmit={handleDriverSubmit}
        initialData={selectedDriver}
        isLoading={isSubmitting}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isSubmitting}
        title={
          driversToDelete.length > 1
            ? `Delete ${driversToDelete.length} Drivers`
            : 'Delete Driver'
        }
        message={
          driversToDelete.length > 1
            ? `Are you sure you want to delete these ${driversToDelete.length} drivers? They will be completely removed.`
            : 'Are you sure you want to delete this driver? It will be completely removed.'
        }
      />
    </div>
  );
}
