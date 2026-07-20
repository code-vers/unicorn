'use client';

import { ChevronLeft, ChevronRight, Download, Info, Pencil, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocations } from '../../../hooks/useLocations';
import { useVehicles } from '../../../hooks/useVehicles';
import { VehicleResponse } from '../../../lib/api/vehicle.service';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import VehicleModal from './VehicleModal';

export default function VehiclesTable() {
  const {
    vehicles,
    meta,
    isLoading,
    query,
    updateQuery,
    createVehicle,
    updateVehicle,
    updateAvailability,
    deleteVehicle,
  } = useVehicles();
  const { locations } = useLocations({ limit: 100 });

  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleResponse | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [vehiclesToDelete, setVehiclesToDelete] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuery({ searchTerm: e.target.value });
  };

  const openAddModal = () => {
    setSelectedVehicle(null);
    setIsVehicleModalOpen(true);
  };

  const openEditModal = (vehicle: VehicleResponse) => {
    setSelectedVehicle(vehicle);
    setIsVehicleModalOpen(true);
  };

  const openDeleteModal = (id: string) => {
    setVehiclesToDelete([id]);
    setIsDeleteModalOpen(true);
  };

  const openBulkDeleteModal = () => {
    setVehiclesToDelete(selectedIds);
    setIsDeleteModalOpen(true);
  };

  const handleVehicleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      if (selectedVehicle) {
        await updateVehicle(selectedVehicle.id, formData);
        toast.success('Vehicle updated successfully');
      } else {
        await createVehicle(formData);
        toast.success('Vehicle added successfully');
      }
      setIsVehicleModalOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (vehiclesToDelete.length === 0) return;
    setIsSubmitting(true);
    try {
      await deleteVehicle(vehiclesToDelete.length === 1 ? vehiclesToDelete[0] : vehiclesToDelete);
      toast.success(
        vehiclesToDelete.length === 1
          ? 'Vehicle deleted successfully'
          : 'Vehicles deleted successfully',
      );
      setIsDeleteModalOpen(false);
      setVehiclesToDelete([]);
      setSelectedIds([]);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete vehicle(s)');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAvailability = async (id: string, currentAvailability: string) => {
    const nextAvailability =
      currentAvailability === 'AVAILABLE'
        ? 'RENTED'
        : currentAvailability === 'RENTED'
          ? 'MAINTENANCE'
          : 'AVAILABLE';
    try {
      await updateAvailability(id, nextAvailability);
      toast.success(`Availability changed to ${nextAvailability}`);
    } catch (error: any) {
      toast.error('Failed to change availability');
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(vehicles.map((v) => v.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const formatText = (text: string) => {
    if (!text) return '';
    return text
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className='flex flex-col gap-5 w-full'>
      {/* Information Card */}
      <div className='bg-[#EFF6FF] border-l-4 border-[#3B82F6] p-4 rounded-[16px] flex items-start gap-3'>
        <Info className='text-[#3B82F6] shrink-0 mt-0.5' size={16} />
        <p className='text-[#1D4ED8] text-[14px] font-nunito leading-relaxed'>
          Manage your fleet inventory, pricing, and availability. Vehicles set to ACTIVE and
          AVAILABLE will appear in the customer booking flow.
        </p>
      </div>

      <div className='bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col w-full'>
        {/* Toolbar */}
        <div className='bg-white border-b border-[#E8ECF0] p-5 flex flex-wrap items-center justify-between gap-3'>
          <div className='flex items-center gap-2'>
            {selectedIds.length > 0 && (
              <button
                onClick={openBulkDeleteModal}
                className='bg-red-50 text-red-600 border border-red-200 px-3 py-2 rounded-[6px] text-[13px] font-bold font-wix hover:bg-red-100 transition-colors flex items-center gap-2'
              >
                <Trash2 size={14} /> Delete Selected ({selectedIds.length})
              </button>
            )}
          </div>

          <div className='flex flex-wrap items-center justify-end gap-3 flex-1'>
            {/* Search Input */}
            <div className='relative w-full sm:w-[240px]'>
              <Search
                className='absolute left-3 top-1/2 -translate-y-1/2 text-[#718096]'
                size={14}
              />
              <input
                type='text'
                placeholder='Search vehicles…'
                onChange={handleSearch}
                className='w-full bg-[#F4F6F8] border border-[#E8ECF0] rounded-lg h-[34px] pl-9 pr-4 text-[10px] font-lato text-[#1A202C]/50 focus:outline-none focus:ring-1 focus:ring-[#3FA34D]'
              />
            </div>

            {/* Category Filter */}
            <select
              value={query.category || ''}
              onChange={(e) => updateQuery({ category: e.target.value || undefined })}
              className='px-3 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-md h-[34px] min-w-[120px] text-[12px] font-lato text-[#718096] hover:bg-gray-100 transition-colors focus:outline-none appearance-none cursor-pointer'
              style={{
                backgroundImage:
                  'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23718096%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 8px center',
                paddingRight: '24px',
              }}
            >
              <option value=''>All Categories</option>
              <option value='SALOON'>Saloon</option>
              <option value='SUV'>SUV</option>
              <option value='VAN'>Van</option>
              <option value='LUXURY'>Luxury</option>
              <option value='FOUR_WD'>4WD</option>
              <option value='CHAUFFEUR_DRIVEN'>Chauffeur Driven</option>
              <option value='SELF_DRIVEN'>Self Driven</option>
            </select>

            {/* Availability Filter */}
            <select
              value={query.availability || ''}
              onChange={(e) => updateQuery({ availability: e.target.value || undefined })}
              className='px-3 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-md h-[34px] min-w-[120px] text-[12px] font-lato text-[#718096] hover:bg-gray-100 transition-colors focus:outline-none appearance-none cursor-pointer'
              style={{
                backgroundImage:
                  'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23718096%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 8px center',
                paddingRight: '24px',
              }}
            >
              <option value=''>All Status</option>
              <option value='AVAILABLE'>Available</option>
              <option value='RENTED'>Rented</option>
              <option value='MAINTENANCE'>Maintenance</option>
            </select>

            {/* Export Button */}
            <button className='flex items-center gap-2 px-3 h-[34px] bg-[#F4F6F8] border border-[#E8ECF0] rounded-md text-[12px] font-lato text-[#718096] hover:bg-gray-100 transition-colors'>
              <Download size={14} />
              <span>Export</span>
            </button>

            {/* Add Vehicle Button */}
            <button
              onClick={openAddModal}
              className='bg-[#3FA34D] text-white h-[34px] px-6 rounded-md text-[14px] font-wix font-bold hover:bg-[#348a41] transition-all shadow-[0px_1px_2px_rgba(0,0,0,0.05)]'
            >
              Add Vehicle
            </button>
          </div>
        </div>

        {/* Table */}
        <div className='overflow-x-auto min-h-[300px] relative'>
          {isLoading && vehicles.length === 0 ? (
            <div className='absolute inset-0 flex items-center justify-center bg-white/50 z-10'>
              <div className='w-8 h-8 border-4 border-[#3FA34D] border-t-transparent rounded-full animate-spin'></div>
            </div>
          ) : null}
          <table className='w-full text-left border-collapse min-w-[1200px]'>
            <thead>
              <tr className='bg-[#FAFBFC] border-b border-[#E8ECF0] h-[50px]'>
                <th className='px-3 py-2 w-[50px] text-center'>
                  <input
                    type='checkbox'
                    checked={vehicles.length > 0 && selectedIds.length === vehicles.length}
                    onChange={handleSelectAll}
                    className='w-3.5 h-3.5 rounded-[4px] border-[#E8ECF0] text-[#3FA34D] focus:ring-[#3FA34D] mx-auto cursor-pointer'
                  />
                </th>
                <th className='text-[#A0AEC0] text-[12px] font-normal font-lato py-[5px] w-[200px] uppercase'>
                  Vehicle Name
                </th>
                <th className='text-[#A0AEC0] text-[12px] font-normal font-lato py-[5px] w-[115px] uppercase'>
                  Category
                </th>
                <th className='text-[#A0AEC0] text-[12px] font-normal font-lato py-[5px] w-[102px] uppercase'>
                  Brand
                </th>
                <th className='text-[#A0AEC0] text-[12px] font-normal font-lato py-[5px] w-[86px] uppercase'>
                  Year
                </th>
                <th className='text-[#A0AEC0] text-[12px] font-normal font-lato py-[5px] w-[120px] uppercase'>
                  Transmission
                </th>
                <th className='text-[#A0AEC0] text-[12px] font-normal font-lato py-[5px] w-[86px] px-[14px] uppercase'>
                  Seating
                </th>
                <th className='text-[#A0AEC0] text-[12px] font-normal font-lato py-[5px] w-[75px] uppercase'>
                  Daily Rate
                </th>
                <th className='text-[#A0AEC0] text-[12px] font-normal font-lato py-[5px] w-[114px] uppercase'>
                  Availability
                </th>
                <th className='text-[#A0AEC0] text-[12px] font-normal font-lato py-[5px] w-[110px] uppercase'>
                  Location
                </th>
                <th className='text-[#A0AEC0] text-[12px] font-normal font-lato py-[5px] w-[152px] px-[14px] uppercase'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-[#F4F6F8]'>
              {vehicles.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={11} className='text-center py-10 text-gray-500 font-lato'>
                    No vehicles found.
                  </td>
                </tr>
              ) : (
                vehicles.map((vehicle, index) => (
                  <tr
                    key={vehicle.id}
                    className={`${index % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'} h-[50px] hover:bg-gray-50 transition-colors group`}
                  >
                    <td className='px-3 py-2 text-center'>
                      <input
                        type='checkbox'
                        checked={selectedIds.includes(vehicle.id)}
                        onChange={() => handleSelectRow(vehicle.id)}
                        className='w-3.5 h-3.5 rounded-[4px] border-[#E8ECF0] text-[#3FA34D] focus:ring-[#3FA34D] mx-auto cursor-pointer'
                      />
                    </td>
                    <td className='text-[#0A1413] text-[12px] font-lato py-[15px] font-bold'>
                      <div className='flex items-center gap-2'>
                        {vehicle.images && vehicle.images.length > 0 ? (
                          <div className='relative w-8 h-8 rounded-full overflow-hidden border bg-gray-100'>
                            <div className='absolute inset-0 flex items-center justify-center text-gray-400 text-[10px]'>
                              Img
                            </div>
                            <img
                              src={`http://localhost:5000${vehicle.images[0].path}`}
                              alt={vehicle.name}
                              className='w-full h-full object-cover relative z-10 bg-white'
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        ) : (
                          <div className='w-8 h-8 rounded-full border bg-gray-100 flex items-center justify-center text-gray-400 text-[10px]'>
                            Img
                          </div>
                        )}
                        <span>{vehicle.name}</span>
                        {vehicle.isFeatured && (
                          <span className='px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-[9px] rounded-full'>
                            ★
                          </span>
                        )}
                      </div>
                    </td>
                    <td className='text-[#6B7280] text-[12px] font-lato py-[15px]'>
                      {formatText(vehicle.category)}
                    </td>
                    <td className='text-[#6B7280] text-[12px] font-lato py-[15px]'>
                      {vehicle.brand}
                    </td>
                    <td className='text-[#6B7280] text-[12px] font-lato py-[15px]'>
                      {vehicle.year}
                    </td>
                    <td className='text-[#6B7280] text-[12px] font-lato py-[15px]'>
                      {formatText(vehicle.transmission)}
                    </td>
                    <td className='text-[#6B7280] text-[12px] font-lato py-[15px] px-[14px] text-center'>
                      {vehicle.seatingCapacity}
                    </td>
                    <td className='text-[#6B7280] text-[12px] font-lato py-[15px] font-bold'>
                      AED {vehicle.dailyRate}
                    </td>
                    <td className='py-[15px]'>
                      <button
                        onClick={() => toggleAvailability(vehicle.id, vehicle.availability)}
                        className={`px-[7px] py-[3px] rounded-[5px] text-[10px] font-bold font-lato inline-flex items-center justify-center cursor-pointer transition-colors ${
                          vehicle.availability === 'AVAILABLE'
                            ? 'bg-[#EBF7ED] text-[#3FA34D] hover:bg-[#d4f0d8]'
                            : vehicle.availability === 'RENTED'
                              ? 'bg-[#EFF6FF] text-[#3B82F6] hover:bg-[#dbeafe]'
                              : 'bg-[#FFFAE0] text-[#D8A500] hover:bg-[#fef08a]'
                        }`}
                        title='Click to toggle availability'
                      >
                        {formatText(vehicle.availability)}
                      </button>
                    </td>
                    <td className='text-[#6B7280] text-[12px] font-lato py-[15px]'>
                      {vehicle.location?.name || 'Unassigned'}
                    </td>
                    <td className='px-[14px] py-[11px]'>
                      <div className='flex gap-[4px]'>
                        <button
                          onClick={() => openEditModal(vehicle)}
                          className='bg-[#F6F6F6] text-[#6B7280] p-1.5 rounded-[5px] hover:bg-gray-200 transition-all transform hover:scale-105'
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(vehicle.id)}
                          className='bg-[#FFF0F0] text-[#DC2626] p-1.5 rounded-[5px] hover:bg-[#ffe0e0] transition-all transform hover:scale-105'
                        >
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
            Showing {vehicles.length > 0 ? (meta.page - 1) * meta.limit + 1 : 0}–
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
      </div>

      <VehicleModal
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
        onSubmit={handleVehicleSubmit}
        initialData={selectedVehicle}
        isLoading={isSubmitting}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isSubmitting}
        title={
          vehiclesToDelete.length > 1
            ? `Delete ${vehiclesToDelete.length} Vehicles`
            : 'Delete Vehicle'
        }
        message={
          vehiclesToDelete.length > 1
            ? `Are you sure you want to delete these ${vehiclesToDelete.length} vehicles? They will be completely removed.`
            : 'Are you sure you want to delete this vehicle? It will be completely removed.'
        }
      />
    </div>
  );
}
