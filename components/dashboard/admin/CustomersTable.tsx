'use client';

import { Fragment, useState } from 'react';
import { Eye, Trash2, Search, Download, ChevronLeft, ChevronRight, ChevronDown, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUsers } from '../../../hooks/useUsers';
import { UserResponse } from '../../../lib/api/user.service';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { TableSkeleton } from '@/components/ui/Skeleton';
import { getAssetUrl } from '@/lib/asset-url';


export default function CustomersTable() {
  const {
    users,
    meta,
    isLoading,
    query,
    updateQuery,
    changeRole,
    updateDocumentStatus,
    deleteUser,
  } = useUsers();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [usersToDelete, setUsersToDelete] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length > 1) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'ACTIVE':   return 'bg-[#EBF7ED] text-[#3FA34D]';
      case 'INACTIVE': return 'bg-[#F3F4F6] text-[#6B7280]';
      case 'BLOCKED':   return 'bg-[#FFF0F0] text-[#DC2626]';
      default:          return 'bg-[#EBF7ED] text-[#3FA34D]';
    }
  };

  const getRoleStyles = (role: string) => {
    return role === 'ADMIN'
      ? 'bg-[#FFF3E8] text-[#FF7815]'
      : 'bg-[#EBF7ED] text-[#3FA34D]';
  };

  const getDocStatusStyles = (status: string) => {
    switch (status) {
      case 'VERIFIED':  return 'bg-[#EBF7ED] text-[#3FA34D]';
      case 'REJECTED':  return 'bg-[#FFF0F0] text-[#DC2626]';
      default:          return 'bg-[#FFFAE0] text-[#D8A500]';
    }
  };

  const openDeleteModal = (id: string) => {
    setUsersToDelete([id]);
    setIsDeleteModalOpen(true);
  };

  const openBulkDeleteModal = () => {
    setUsersToDelete(selectedIds);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsSubmitting(true);
    try {
      await deleteUser(usersToDelete.length === 1 ? usersToDelete[0] : usersToDelete);
      toast.success(usersToDelete.length === 1 ? 'Customer deleted successfully' : 'Customers deleted successfully');
      setIsDeleteModalOpen(false);
      setUsersToDelete([]);
      setSelectedIds([]);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to delete customer(s)');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleToggle = async (user: UserResponse) => {
    const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
    try {
      await changeRole(user.id, newRole);
      toast.success(`Role changed to ${newRole}`);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to change role');
    }
  };

  const handleDocumentStatus = async (docId: string, status: 'VERIFIED' | 'REJECTED') => {
    try {
      await updateDocumentStatus(docId, status);
      toast.success(`Document ${status === 'VERIFIED' ? 'approved' : 'rejected'} successfully`);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update document status');
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIds(e.target.checked ? users.map((u) => u.id) : []);
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
              placeholder='Search customers...'
              className='w-full bg-[#F4F6F8] border border-[#E8ECF0] rounded-[8px] h-[34px] pl-9 pr-3 text-[12px] text-[#1A202C] focus:outline-none focus:ring-1 focus:ring-[#3FA34D] font-lato placeholder-[#A0AEC0]'
            />
          </div>
          <button className='flex items-center gap-1.5 px-3 h-[34px] bg-[#F4F6F8] border border-[#E8ECF0] rounded-[7px] text-[12px] text-[#718096] hover:bg-gray-100 font-lato transition-colors'>
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto min-h-[300px] relative'>
        {isLoading && users.length === 0 ? (
          <div className='absolute inset-0 z-10 bg-white'>
            <TableSkeleton className='h-full rounded-none border-0' rows={6} />
          </div>
        ) : null}
        <table className='w-full text-left border-collapse min-w-[1100px]'>
          <thead>
            <tr className='bg-[#FAFBFC] border-b border-[#E8ECF0] h-[50px]'>
              <th className='px-3 py-2 w-[50px] text-center'>
                <input
                  type='checkbox'
                  checked={users.length > 0 && selectedIds.length === users.length}
                  onChange={handleSelectAll}
                  className='w-3.5 h-3.5 rounded-[4px] border-[#E8ECF0] text-[#3FA34D] focus:ring-[#3FA34D] mx-auto cursor-pointer'
                />
              </th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[220px]'>Name</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[180px]'>Email</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[140px]'>Phone</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[100px]'>Role</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[110px]'>Status</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[100px]'>Documents</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase text-center w-[130px]'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-[#F4F6F8]'>
            {users.length === 0 && !isLoading ? (
              <tr>
                <td colSpan={8} className='text-center py-10 text-gray-500 font-lato'>
                  No customers found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <Fragment key={user.id}>
                  <tr
                    className={`${index % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'} h-[50px] hover:bg-gray-50 transition-colors`}
                  >
                    <td className='px-3 py-2 text-center'>
                      <input
                        type='checkbox'
                        checked={selectedIds.includes(user.id)}
                        onChange={() => handleSelectRow(user.id)}
                        className='w-3.5 h-3.5 rounded-[4px] border-[#E8ECF0] text-[#3FA34D] focus:ring-[#3FA34D] mx-auto cursor-pointer'
                      />
                    </td>
                    <td className='px-3 py-2'>
                      <div className='flex items-center gap-2'>
                        <div className='w-[30px] h-[30px] rounded-[8px] bg-[rgba(63,163,77,0.09)] flex items-center justify-center flex-shrink-0'>
                          {user.photoUrl ? (
                            <img
                            src={getAssetUrl(user.photoUrl)}
                              alt={user.name}
                              className='w-full h-full object-cover rounded-[8px]'
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                          ) : (
                            <span className='text-[10px] font-bold text-[#3FA34D] font-montserrat'>{getInitials(user.name)}</span>
                          )}
                        </div>
                        <span className='text-[12px] font-semibold text-[#1A202C] font-lato'>{user.name}</span>
                      </div>
                    </td>
                    <td className='px-3 py-2 text-[12px] font-semibold text-[#0A1413] font-lato truncate max-w-[180px]'>{user.email}</td>
                    <td className='px-3 py-2 text-[12px] font-semibold text-[#0A1413] font-lato'>{user.phoneNumber || '—'}</td>
                    <td className='px-3 py-2'>
                      <button
                        onClick={() => handleRoleToggle(user)}
                        title='Click to toggle role'
                        className={`inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] text-[10px] font-bold min-w-[50px] transition-colors cursor-pointer ${getRoleStyles(user.role)}`}
                      >
                        {user.role}
                      </button>
                    </td>
                    <td className='px-3 py-2'>
                      <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] text-[10px] font-normal min-w-[60px] ${getStatusStyles(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className='px-3 py-2 text-[12px] text-[#6B7280] font-lato'>
                      {user.documents?.length ? (
                        <button
                          onClick={() => setExpandedUserId(expandedUserId === user.id ? null : user.id)}
                          className='flex items-center gap-1 text-[#3FA34D] font-semibold hover:underline'
                        >
                          {user.documents.length} doc{user.documents.length > 1 ? 's' : ''}
                          <ChevronDown size={12} className={`transition-transform ${expandedUserId === user.id ? 'rotate-180' : ''}`} />
                        </button>
                      ) : (
                        <span className='text-[#A0AEC0]'>None</span>
                      )}
                    </td>
                    <td className='px-3 py-2'>
                      <div className='flex items-center justify-center gap-[4px]'>
                        <button
                          onClick={() => openDeleteModal(user.id)}
                          className='bg-[#FFF0F0] text-[#DC2626] p-1.5 rounded-[5px] hover:bg-[#ffe0e0] transition-all transform hover:scale-105'
                          title='Delete customer'
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Expandable documents sub-row */}
                  {expandedUserId === user.id && user.documents?.length > 0 && (
                    <tr key={`${user.id}-docs`} className='bg-[#F8FAF9]'>
                      <td colSpan={8} className='px-6 py-3'>
                        <div className='text-[11px] font-lato text-[#0A1413] font-semibold mb-2'>Documents</div>
                        <div className='flex flex-col gap-2'>
                          {user.documents.map((doc) => (
                            <div key={doc.id} className='flex items-center justify-between bg-white border border-[#E8ECF0] rounded-[8px] px-3 py-2'>
                              <div className='flex flex-col gap-0.5'>
                                <span className='text-[12px] font-semibold text-[#1A202C] font-lato'>{doc.name || doc.type}</span>
                                <span className='text-[10px] text-[#A0AEC0] font-lato'>{doc.type} · {new Date(doc.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className='flex items-center gap-2'>
                                <span className={`px-2 py-0.5 rounded-[5px] text-[10px] font-lato ${getDocStatusStyles(doc.status)}`}>
                                  {doc.status}
                                </span>
                                {doc.status === 'PENDING_REVIEW' && (
                                  <div className='flex gap-1'>
                                    <button
                                      onClick={() => handleDocumentStatus(doc.id, 'VERIFIED')}
                                      title='Approve'
                                      className='bg-[#EBF7ED] text-[#3FA34D] w-[26px] h-[26px] flex items-center justify-center rounded-[5px] hover:bg-[#d8eedb] transition-all transform hover:scale-105'
                                    >
                                      <Check size={12} strokeWidth={3} />
                                    </button>
                                    <button
                                      onClick={() => handleDocumentStatus(doc.id, 'REJECTED')}
                                      title='Reject'
                                      className='bg-[#FFF0F0] text-[#DC2626] w-[26px] h-[26px] flex items-center justify-center rounded-[5px] hover:bg-[#ffe0e0] transition-all transform hover:scale-105'
                                    >
                                      <X size={12} strokeWidth={3} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='px-10 py-5 flex items-center justify-between border-t border-[#E8ECF0]'>
        <p className='text-[10.5px] text-[#A0AEC0] font-lato'>
          Showing {users.length > 0 ? (meta.page - 1) * meta.limit + 1 : 0}–
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

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isSubmitting}
        title={usersToDelete.length > 1 ? `Delete ${usersToDelete.length} Customers` : 'Delete Customer'}
        message={
          usersToDelete.length > 1
            ? `Are you sure you want to delete these ${usersToDelete.length} customers? This will soft-delete their accounts.`
            : 'Are you sure you want to delete this customer? Their account will be deactivated.'
        }
      />
    </div>
  );
}
