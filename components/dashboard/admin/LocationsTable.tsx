'use client';

import { useState } from 'react';
import { Pencil, Trash2, Search, ChevronDown, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocations } from '../../../hooks/useLocations';
import LocationModal from './LocationModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import toast from 'react-hot-toast';
import { LocationResponse, LocationPayload } from '../../../lib/api/location.service';
import { TableSkeleton } from '@/components/ui/Skeleton';


export default function LocationsTable() {
  const { locations, meta, isLoading, query, updateQuery, createLocation, updateLocation, deleteLocation } = useLocations();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationResponse | null>(null);
  
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [locationsToDelete, setLocationsToDelete] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-[#EBF7ED] text-[#3FA34D]';
      case 'PENDING':
        return 'bg-[#FFFAE0] text-[#D8A500]';
      case 'INACTIVE':
        return 'bg-[#FFF3E8] text-[#FF7815]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatText = (text: string) => {
    if (!text) return '';
    return text.charAt(0) + text.slice(1).toLowerCase();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuery({ searchTerm: e.target.value });
  };

  const openAddModal = () => {
    setSelectedLocation(null);
    setIsLocationModalOpen(true);
  };

  const openEditModal = (location: LocationResponse) => {
    setSelectedLocation(location);
    setIsLocationModalOpen(true);
  };

  const openDeleteModal = (id: string) => {
    setLocationsToDelete([id]);
    setIsDeleteModalOpen(true);
  };

  const openBulkDeleteModal = () => {
    setLocationsToDelete(selectedIds);
    setIsDeleteModalOpen(true);
  };

  const handleLocationSubmit = async (data: LocationPayload) => {
    setIsSubmitting(true);
    try {
      if (selectedLocation) {
        await updateLocation(selectedLocation.id, data);
        toast.success('Location updated successfully');
      } else {
        await createLocation(data);
        toast.success('Location added successfully');
      }
      setIsLocationModalOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (locationsToDelete.length === 0) return;
    setIsSubmitting(true);
    try {
      await deleteLocation(locationsToDelete.length === 1 ? locationsToDelete[0] : locationsToDelete);
      toast.success(locationsToDelete.length === 1 ? 'Location deleted successfully' : 'Locations deleted successfully');
      setIsDeleteModalOpen(false);
      setLocationsToDelete([]);
      setSelectedIds([]);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete location(s)');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(locations.map(loc => loc.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const availableCities = Array.from(new Set([
    'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Al Ain',
    ...locations.map(loc => loc.city)
  ])).sort();

  return (
    <div className='flex flex-col gap-5 w-full'>
      {/* Information Card */}
      <div className='bg-[#EFF6FF] border-l-4 border-[#3B82F6] p-4 rounded-[16px] flex items-start gap-3'>
        <Info className='text-[#3B82F6] shrink-0 mt-0.5' size={16} />
        <p className='text-[#1D4ED8] text-[14px] font-nunito leading-relaxed'>
          Manage all available pickup and drop-off locations. These locations will appear in the client booking form.
        </p>
      </div>

      <div className='bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col w-full'>
        {/* Toolbar */}
        <div className='p-5 border-b border-[#E8ECF0] flex justify-between items-center'>
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
          <div className='flex items-center gap-1.5 flex-wrap justify-end'>
            <div className='relative w-[230px]'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(26,32,44,0.5)]' size={12} />
              <input
                type='text'
                placeholder='Search by name, city, or address...'
                onChange={handleSearch}
                className='w-full bg-[#F4F6F8] border border-[#E8ECF0] rounded-[8px] py-1.5 pl-9 pr-3 text-[10px] text-[#1A202C] focus:outline-none focus:ring-1 focus:ring-[#3FA34D] font-lato'
              />
            </div>
            
            <select
              value={query.city || ''}
              onChange={(e) => updateQuery({ city: e.target.value || undefined })}
              className='px-2 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-[7px] text-[12px] text-[#718096] hover:bg-gray-100 font-lato transition-colors focus:outline-none appearance-none pr-6 cursor-pointer'
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23718096%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
            >
              <option value="">All Cities</option>
              {availableCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <select
              value={query.status || ''}
              onChange={(e) => updateQuery({ status: e.target.value || undefined })}
              className='px-2 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-[7px] text-[12px] text-[#718096] hover:bg-gray-100 font-lato transition-colors focus:outline-none appearance-none pr-6 cursor-pointer'
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23718096%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
            >
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="PENDING">Pending</option>
            </select>

            <button onClick={openAddModal} className='bg-[#3FA34D] hover:bg-[#348a41] text-white px-9 py-2 rounded-[6px] text-[14px] font-bold font-wix transition-colors'>
              Add Location
            </button>
          </div>
        </div>

        {/* Table */}
        <div className='overflow-x-auto min-h-[300px] relative'>
          {isLoading && locations.length === 0 ? (
            <div className="absolute inset-0 z-10 bg-white">
              <TableSkeleton className='h-full rounded-none border-0' rows={6} />
            </div>
          ) : null}
          <table className='w-full text-left border-collapse min-w-[1000px]'>
            <thead>
              <tr className='bg-[#FAFBFC] border-b border-[#E8ECF0] h-[50px]'>
                <th className='px-3 py-2 w-[50px] text-center'>
                  <input 
                    type="checkbox"
                    checked={locations.length > 0 && selectedIds.length === locations.length}
                    onChange={handleSelectAll}
                    className="w-3.5 h-3.5 rounded-[4px] border-[#E8ECF0] text-[#3FA34D] focus:ring-[#3FA34D] mx-auto cursor-pointer"
                  />
                </th>
                <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[180px]'>Location Name</th>
                <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[220px]'>Address</th>
                <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[150px]'>City</th>
                <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[134px]'>Location Type</th>
                <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[114px]'>Status</th>
                <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[152px]'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500 font-lato">No locations found.</td>
                </tr>
              ) : (
                locations.map((location, index) => (
                  <tr
                    key={location.id}
                    className={`${index % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'} border-b border-[#F4F6F8] hover:bg-gray-50 transition-colors h-[50px]`}
                  >
                    <td className='px-3 py-2 text-center'>
                      <input 
                        type="checkbox"
                        checked={selectedIds.includes(location.id)}
                        onChange={() => handleSelectRow(location.id)}
                        className="w-3.5 h-3.5 rounded-[4px] border-[#E8ECF0] text-[#3FA34D] focus:ring-[#3FA34D] mx-auto cursor-pointer"
                      />
                    </td>
                    <td className='px-3 py-2 text-[12px] text-[#6B7280] font-lato'>{location.name}</td>
                    <td className='px-3 py-2 text-[12px] font-semibold text-[#6B7280] font-lato'>{location.address}</td>
                    <td className='px-3 py-2 text-[12px] font-semibold text-[#6B7280] font-lato'>{location.city}</td>
                    <td className='px-3 py-2 text-[12px] text-[#6B7280] font-lato'>{formatText(location.locationType)}</td>
                    <td className='px-3 py-2'>
                      <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] text-[10px] font-normal min-w-[35px] ${getStatusStyles(location.status)}`}>
                        {formatText(location.status)}
                      </span>
                    </td>
                    <td className='px-3 py-2'>
                      <div className='flex items-center gap-1.5'>
                        <button onClick={() => openEditModal(location)} className='p-1.5 text-[#6B7280] bg-[#F6F6F6] rounded-[5px] hover:bg-gray-200 transition-colors'>
                          <Pencil size={12} />
                        </button>
                        <button onClick={() => openDeleteModal(location.id)} className='p-1.5 text-[#DC2626] bg-[#FFF0F0] border border-[#F6F6F6] rounded-[5px] hover:bg-[#ffe0e0] transition-colors'>
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
            Showing {locations.length > 0 ? ((meta.page - 1) * meta.limit) + 1 : 0}–{Math.min(meta.page * meta.limit, meta.total)} of {meta.total}
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
      
      {/* Footer Text */}
      <p className='w-full text-center text-[#6B7280] text-[12px] font-lato mt-2'>
        Pickup and drop-off dropdowns in the booking form will be populated from active locations only.
      </p>

      <LocationModal 
        isOpen={isLocationModalOpen} 
        onClose={() => setIsLocationModalOpen(false)} 
        onSubmit={handleLocationSubmit}
        initialData={selectedLocation}
        isLoading={isSubmitting}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isSubmitting}
        title={locationsToDelete.length > 1 ? `Delete ${locationsToDelete.length} Locations` : "Delete Location"}
        message={locationsToDelete.length > 1 
          ? `Are you sure you want to delete these ${locationsToDelete.length} locations? They will no longer be available for clients to book.` 
          : "Are you sure you want to delete this location? It will no longer be available for clients to book."}
      />
    </div>
  );
}
