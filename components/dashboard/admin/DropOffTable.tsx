'use client';

import { useState, useEffect, useCallback } from 'react';
import { Pencil, Trash2, Search, Info, ChevronLeft, ChevronRight, Loader2, Plus } from 'lucide-react';
import { DropOffChargeService, DropOffChargeResponse } from '@/lib/api/dropOffCharge.service';
import DropOffChargeModal from './DropOffChargeModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import type { DropOffChargePayload } from '@/lib/api/dropOffCharge.service';

const LIMIT = 10;

export default function DropOffTable() {
  const [charges, setCharges] = useState<DropOffChargeResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSaving, setIsModalSaving] = useState(false);
  const [editingCharge, setEditingCharge] = useState<DropOffChargeResponse | null>(null);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const totalPages = Math.ceil(total / LIMIT);

  const fetchCharges = useCallback(async (currentPage: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await DropOffChargeService.getAllCharges({ page: currentPage, limit: LIMIT });
      setCharges(res.data);
      setTotal(res.meta.total);
    } catch (err: any) {
      setError(err.message || 'Failed to load drop-off charges.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharges(page);
  }, [page, fetchCharges]);

  const handleOpenAddModal = () => {
    setEditingCharge(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (charge: DropOffChargeResponse) => {
    setEditingCharge(charge);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCharge(null);
  };

  const handleModalSubmit = async (payload: DropOffChargePayload) => {
    setIsModalSaving(true);
    try {
      if (editingCharge) {
        await DropOffChargeService.updateCharge(editingCharge.id, payload);
      } else {
        await DropOffChargeService.createCharge(payload);
      }
      handleCloseModal();
      fetchCharges(page);
    } catch (err: any) {
      alert(err.message || 'Failed to save charge.');
    } finally {
      setIsModalSaving(false);
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeletingId(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await DropOffChargeService.deleteCharge(deletingId);
      handleCloseDeleteModal();
      // If last item on a page > 1, go back one page
      const newTotal = total - 1;
      const newTotalPages = Math.ceil(newTotal / LIMIT);
      if (page > newTotalPages && newTotalPages > 0) {
        setPage(newTotalPages);
      } else {
        fetchCharges(page);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete charge.');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-[#EBF7ED] text-[#3FA34D]';
      case 'INACTIVE':
        return 'bg-[#F3F4F6] text-[#6B7280]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const startItem = total === 0 ? 0 : (page - 1) * LIMIT + 1;
  const endItem = Math.min(page * LIMIT, total);

  return (
    <>
      <div className='flex flex-col gap-5 w-full'>
        {/* Information Card */}
        <div className='bg-[#EFF6FF] border-l-4 border-[#3B82F6] p-4 rounded-[16px] flex items-start gap-3 shadow-[0px_1px_2.5px_rgba(0,0,0,0.05)]'>
          <Info className='text-[#3B82F6] shrink-0 mt-0.5' size={16} />
          <p className='text-[#1D4ED8] text-[14px] font-nunito leading-relaxed'>
            Drop-off charges are applied per vehicle based on pickup and drop-off locations.
          </p>
        </div>

        <div className='bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col w-full'>
          {/* Toolbar */}
          <div className='p-5 border-b border-[#E8ECF0] flex justify-between items-center'>
            <div className='relative w-[200px]'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(26,32,44,0.5)]' size={12} />
              <input
                type='text'
                placeholder='Search charges...'
                className='w-full bg-[#F4F6F8] border border-[#E8ECF0] rounded-[8px] py-1.5 pl-9 pr-3 text-[10px] text-[#1A202C] focus:outline-none focus:ring-1 focus:ring-[#3FA34D] font-lato'
              />
            </div>
            <button
              onClick={handleOpenAddModal}
              className='flex items-center gap-2 bg-[#3FA34D] hover:bg-[#348a41] text-white px-5 py-2 rounded-[6px] text-[13px] font-bold font-wix transition-colors'
            >
              <Plus size={15} />
              Add Drop-Off Charge
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className='p-4 m-4 bg-red-50 text-red-600 text-[13px] font-lato rounded-[8px]'>
              {error}
            </div>
          )}

          {/* Table */}
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse min-w-[1100px]'>
              <thead>
                <tr className='bg-[#FAFBFC] border-b border-[#E8ECF0] h-[50px]'>
                  <th className='px-3 py-2 w-[50px]'>
                    <div className='w-[15px] h-[15px] bg-white border border-[#E8ECF0] rounded-[4px] mx-auto' />
                  </th>
                  <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase'>Pickup Location</th>
                  <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase'>Drop-off Location</th>
                  <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase'>Vehicle Category</th>
                  <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase'>Specific Vehicle</th>
                  <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase'>Charge Type</th>
                  <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase'>Amount</th>
                  <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase'>Status</th>
                  <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={9} className='text-center py-16'>
                      <Loader2 className='animate-spin text-[#3FA34D] mx-auto' size={28} />
                    </td>
                  </tr>
                ) : charges.length === 0 ? (
                  <tr>
                    <td colSpan={9} className='text-center py-16 text-[13px] text-[#A0AEC0] font-lato'>
                      No drop-off charges found. Click &quot;Add Drop-Off Charge&quot; to create one.
                    </td>
                  </tr>
                ) : (
                  charges.map((charge, index) => (
                    <tr
                      key={charge.id}
                      className={`${index % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'} border-b border-[#F4F6F8] hover:bg-gray-50 transition-colors h-[50px]`}
                    >
                      <td className='px-3 py-2'>
                        <div className='w-[15px] h-[15px] bg-white border border-[#E8ECF0] rounded-[4px] mx-auto' />
                      </td>
                      <td className='px-3 py-2 text-[12px] text-[#6B7280] font-lato'>
                        {charge.pickupLocation.name}
                        <span className='block text-[10px] text-[#A0AEC0]'>{charge.pickupLocation.city}</span>
                      </td>
                      <td className='px-3 py-2 text-[12px] font-semibold text-[#6B7280] font-lato'>
                        {charge.dropOffLocation.name}
                        <span className='block text-[10px] text-[#A0AEC0] font-normal'>{charge.dropOffLocation.city}</span>
                      </td>
                      <td className='px-3 py-2 text-[12px] text-[#6B7280] font-lato'>
                        {charge.vehicleCategory ? charge.vehicleCategory.replace(/_/g, ' ') : <span className='text-[#A0AEC0]'>—</span>}
                      </td>
                      <td className='px-3 py-2 text-[12px] text-[#6B7280] font-lato'>
                        {charge.vehicle ? `${charge.vehicle.name} (${charge.vehicle.brand})` : <span className='text-[#A0AEC0]'>—</span>}
                      </td>
                      <td className='px-3 py-2 text-[12px] text-[#6B7280] font-lato'>
                        {charge.chargeType ? charge.chargeType.replace('_', ' ') : <span className='text-[#A0AEC0]'>—</span>}
                      </td>
                      <td className='px-3 py-2 text-[12px] font-semibold text-[#1A202C] font-lato'>
                        ${Number(charge.amount).toFixed(2)}
                      </td>
                      <td className='px-3 py-2'>
                        <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] text-[10px] font-normal min-w-[55px] ${getStatusStyles(charge.status)}`}>
                          {charge.status}
                        </span>
                      </td>
                      <td className='px-3 py-2'>
                        <div className='flex items-center gap-1.5'>
                          <button
                            onClick={() => handleOpenEditModal(charge)}
                            className='p-1.5 text-[#6B7280] bg-[#F6F6F6] rounded-[5px] hover:bg-gray-200 transition-colors'
                            title='Edit charge'
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(charge.id)}
                            className='p-1.5 text-[#DC2626] bg-[#FFF0F0] border border-[#F6F6F6] rounded-[5px] hover:bg-[#ffe0e0] transition-colors'
                            title='Delete charge'
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
              {total === 0 ? 'No results' : `Showing ${startItem}–${endItem} of ${total}`}
            </p>
            {totalPages > 1 && (
              <div className='flex items-center gap-1'>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className='w-7 h-7 flex items-center justify-center bg-[#F6F6F6] border border-[#F6F6F6] text-[#6B7280] rounded-[6px] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors'
                >
                  <ChevronLeft size={12} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-7 h-7 flex items-center justify-center text-[12px] font-bold rounded-[6px] transition-colors ${
                      p === page
                        ? 'bg-gradient-to-br from-[#3FA34D] to-[#2E7A39] text-white shadow-[0px_2px_3px_rgba(63,163,77,0.25)]'
                        : 'bg-[#F6F6F6] border border-[#F6F6F6] text-[#6B7280] hover:bg-gray-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className='w-7 h-7 flex items-center justify-center bg-[#F6F6F6] border border-[#F6F6F6] text-[#6B7280] rounded-[6px] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors'
                >
                  <ChevronRight size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <DropOffChargeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        initialData={editingCharge}
        isLoading={isModalSaving}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title='Delete Drop-Off Charge'
        message='Are you sure you want to delete this drop-off charge rule? This action cannot be undone.'
      />
    </>
  );
}
