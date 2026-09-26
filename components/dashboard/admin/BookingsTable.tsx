'use client';

import { useState, useEffect, useRef } from 'react';
import { BookingService, BookingResponse } from '@/lib/api/booking.service';
import { Eye, Check, Trash2, Search, Filter, Download, ChevronLeft, ChevronRight, ChevronDown, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { TableSkeleton } from '@/components/ui/Skeleton';


export default function BookingsTable() {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingBookingId, setViewingBookingId] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<BookingResponse | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [updatingBookingId, setUpdatingBookingId] = useState<string | null>(null);
  const detailsRequestId = useRef(0);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await BookingService.getAllBookings();
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'CONFIRMED' | 'CANCELLED') => {
    setUpdatingBookingId(id);
    try {
      await BookingService.updateBookingStatus(id, status);
      setBookings(prev => prev.map(b => b.id === id ? { ...b, bookingStatus: status } : b));
      toast.success(`Booking ${status.toLowerCase()} successfully`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setUpdatingBookingId(null);
    }
  };

  const handleViewBooking = async (id: string) => {
    const requestId = ++detailsRequestId.current;
    setViewingBookingId(id);
    setSelectedBooking(null);
    setDetailsLoading(true);

    try {
      const booking = await BookingService.getBookingById(id);
      if (requestId === detailsRequestId.current) setSelectedBooking(booking);
    } catch (err) {
      if (requestId === detailsRequestId.current) {
        setViewingBookingId(null);
        toast.error(err instanceof Error ? err.message : 'Failed to load booking details');
      }
    } finally {
      if (requestId === detailsRequestId.current) setDetailsLoading(false);
    }
  };

  const exportToCSV = () => {
    if (bookings.length === 0) {
      toast.error('No bookings to export');
      return;
    }

    const headers = [
      'Reference ID',
      'Customer Name',
      'Customer Email',
      'Customer Phone',
      'Vehicle',
      'Pickup Date',
      'Dropoff Date',
      'Pickup Location',
      'Dropoff Location',
      'Rental Cost',
      'Total Amount',
      'Amount Paid',
      'Payment Status',
      'Booking Status',
      'Created At',
    ];

    const escapeCSV = (value: string | number | null | undefined) => {
      const str = String(value ?? '');
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = bookings.map((booking) => {
      const customerName = booking.driverDetails
        ? `${booking.driverDetails.firstName} ${booking.driverDetails.lastName}`
        : (booking.user?.name || '');
      const customerEmail = booking.driverDetails?.email || booking.user?.email || '';
      const customerPhone = booking.driverDetails?.phone || '';
      const vehicleName = booking.vehicle?.name || '';
      const pickupLocation = booking.pickupLocation?.name || '';
      const dropoffLocation = booking.dropOffLocation?.name || '';
      const formatDate = (dateStr: string) =>
        dateStr ? new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : '';

      return [
        booking.referenceId,
        customerName,
        customerEmail,
        customerPhone,
        vehicleName,
        formatDate(booking.pickupDate),
        formatDate(booking.dropOffDate),
        pickupLocation,
        dropoffLocation,
        `KSH ${Number(booking.rentalCost).toLocaleString()}`,
        `KSH ${Number(booking.totalAmount).toLocaleString()}`,
        `KSH ${Number(booking.amountPaid).toLocaleString()}`,
        booking.paymentStatus,
        booking.bookingStatus,
        formatDate(booking.createdAt),
      ].map(escapeCSV).join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Bookings exported successfully');
  };

  const closeDetails = () => {
    detailsRequestId.current += 1;
    setViewingBookingId(null);
    setSelectedBooking(null);
    setDetailsLoading(false);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'COMPLETED':
      case 'CONFIRMED':
      case 'ONGOING':
        return 'bg-[#EBF7ED] text-[#3FA34D]';
      case 'PENDING':
        return 'bg-[#FFF9E0] text-[#D8A500]';
      case 'CANCELLED':
        return 'bg-[#FFF0F0] text-[#DC2626]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPaymentStatusStyles = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-[#EBF7ED] text-[#3FA34D]';
      case 'PENDING':
        return 'bg-[#FFF9E0] text-[#D8A500]';
      case 'REFUNDED':
      case 'FAILED':
        return 'bg-[#FFF0F0] text-[#DC2626]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };



  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className='bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col w-full'>
      {/* Toolbar */}
      <div className='p-5 border-b border-[#E8ECF0] flex justify-end items-center'>
        <div className='flex items-center gap-1.5'>
          <div className='relative w-[170px]'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(26,32,44,0.5)]' size={12} />
            <input
              type='text'
              placeholder='Search bookings...'
              className='w-full bg-[#F4F6F8] border border-[#E8ECF0] rounded-[8px] py-1.5 pl-9 pr-3 text-[10px] text-[#1A202C] focus:outline-none focus:ring-1 focus:ring-[#3FA34D] font-lato'
            />
          </div>
          
          <button className='flex items-center justify-between gap-2 px-2 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-[7px] w-[98px] text-[12px] text-[#718096] hover:bg-gray-100 font-lato transition-colors'>
            Status <ChevronDown size={12} />
          </button>
          
          <button className='flex items-center gap-1.5 px-2 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-[7px] text-[12px] text-[#718096] hover:bg-gray-100 font-lato transition-colors'>
            <Filter size={12} /> Filter
          </button>
          
          <button
            onClick={exportToCSV}
            className='flex items-center gap-1.5 px-2 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-[7px] text-[12px] text-[#718096] hover:bg-gray-100 font-lato transition-colors'
          >
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto min-h-[300px] relative'>
        {loading && bookings.length === 0 ? (
          <div className='absolute inset-0 z-10 bg-white'>
            <TableSkeleton className='h-full rounded-none border-0' rows={6} />
          </div>
        ) : null}
        <table className='w-full text-left border-collapse min-w-[1200px]'>
          <thead>
            <tr className='bg-[#FAFBFC] border-b border-[#E8ECF0] h-[50px]'>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[95px] pl-5'>Booking ID</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[115px]'>Customer</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[152px]'>Contact</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[86px]'>Vehicle</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[90px]'>Pickup Date</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[119px]'>Dropoff Date</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[80px]'>Price</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[114px]'>Payment</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[114px]'>Status</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase text-center w-[152px] pr-5'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 && !loading ? (
              <tr>
                <td colSpan={10} className="text-center py-6 text-gray-500 text-sm">No bookings found.</td>
              </tr>
            ) : bookings.map((booking, index) => {
              // Extract details (safely handling nested relations)
              const customerName = booking.driverDetails ? `${booking.driverDetails.firstName} ${booking.driverDetails.lastName}` : (booking.user?.name || 'Unknown');
              const customerPhone = booking.driverDetails?.phone || 'N/A';
              const customerEmail = booking.driverDetails?.email || booking.user?.email || 'N/A';
              const vehicleName = booking.vehicle?.name || 'Unknown Vehicle';
              
              const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
              const pickupDate = booking.pickupDate ? formatDate(booking.pickupDate) : 'N/A';
              const dropOffDate = booking.dropOffDate ? formatDate(booking.dropOffDate) : 'N/A';

              return (
                <tr
                  key={booking.id}
                  className={`${index % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'} border-b border-[#F4F6F8] hover:bg-gray-50 transition-colors h-[50px]`}
                >
                  <td className='px-3 py-2 text-[12px] text-[#0A1413] font-lato pl-5'>{booking.referenceId}</td>
                  <td className='px-3 py-2 text-[12px] text-[#6B7280] font-lato font-medium'>{customerName}</td>
                  <td className='px-3 py-2'>
                    <div className='flex flex-col'>
                      <span className='text-[12px] font-semibold text-[#0A1413] font-lato'>{customerPhone}</span>
                      <span className='text-[9.5px] text-[#6B7280] font-montserrat'>{customerEmail}</span>
                    </div>
                  </td>
                  <td className='px-3 py-2 text-[12px] text-[#6B7280] font-lato'>{vehicleName}</td>
                  <td className='px-3 py-2 text-[12px] text-[#6B7280] font-lato'>{pickupDate}</td>
                  <td className='px-3 py-2 text-[12px] text-[#6B7280] font-lato'>{dropOffDate}</td>
                  <td className='px-3 py-2 text-[12px] text-[#6B7280] font-lato font-bold'>KSH {Number(booking.totalAmount).toLocaleString()}</td>
                  <td className='px-3 py-2'>
                    <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] text-[10px] font-normal min-w-[35px] ${getPaymentStatusStyles(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className='px-3 py-2'>
                    <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] text-[10px] font-normal min-w-[35px] ${getStatusStyles(booking.bookingStatus)}`}>
                      {booking.bookingStatus}
                    </span>
                  </td>
                  <td className='px-3 py-2 pr-5'>
                    <div className='flex items-center justify-center gap-2'>
                      <button
                        type='button'
                        onClick={() => void handleViewBooking(booking.id)}
                        className='p-1.5 text-[#3FA34D] bg-[#EBF7ED] rounded-[5px] hover:bg-[#d5eedb] transition-colors'
                        title='View booking'
                        aria-label={`View booking ${booking.referenceId}`}
                      >
                        <Eye size={12} />
                      </button>
                      
                      {booking.bookingStatus === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(booking.id, 'CONFIRMED')}
                            disabled={updatingBookingId === booking.id}
                            className='p-1.5 text-[#3FA34D] bg-[#EBF7ED] border border-[#3FA34D] rounded-[5px] hover:bg-[#3FA34D] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                            title="Approve"
                          >
                            {updatingBookingId === booking.id ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <Check size={12} />
                            )}
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(booking.id, 'CANCELLED')}
                            disabled={updatingBookingId === booking.id}
                            className='p-1.5 text-[#DC2626] bg-[#FFF0F0] border border-[#DC2626] rounded-[5px] hover:bg-[#DC2626] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                            title="Reject"
                          >
                            <Trash2 size={12} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='px-10 py-5 flex items-center justify-between border-t border-[#E8ECF0]'>
        <p className='text-[10.5px] text-[#A0AEC0] font-lato'>Showing {bookings.length} bookings</p>
        <div className='flex items-center gap-1'>
          <button className='w-7 h-7 flex items-center justify-center bg-[#F6F6F6] border border-[#F6F6F6] text-[#6B7280] rounded-[6px] opacity-50 cursor-not-allowed'>
            <ChevronLeft size={12} />
          </button>
          <button className='w-7 h-7 flex items-center justify-center bg-gradient-to-br from-[#3FA34D] to-[#2E7A39] text-white text-[12px] font-bold rounded-[6px] shadow-[0px_2px_3px_rgba(63,163,77,0.25)]'>
            1
          </button>
          <button className='w-7 h-7 flex items-center justify-center bg-[#F6F6F6] border border-[#F6F6F6] text-[#6B7280] rounded-[6px] opacity-50 cursor-not-allowed'>
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {viewingBookingId && (
        <BookingDetailsDialog
          booking={selectedBooking}
          isLoading={detailsLoading}
          onClose={closeDetails}
        />
      )}
    </div>
  );
}

function BookingDetailsDialog({
  booking,
  isLoading,
  onClose,
}: {
  booking: BookingResponse | null;
  isLoading: boolean;
  onClose: () => void;
}) {
  const customerName = booking?.driverDetails
    ? `${booking.driverDetails.firstName} ${booking.driverDetails.lastName}`
    : booking?.user?.name || 'Unknown';
  const formatDate = (value: string) => new Date(value).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
  const formatAmount = (value: string) => `KSH ${Number(value).toLocaleString()}`;

  return (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4'
      role='dialog'
      aria-modal='true'
      aria-labelledby='booking-details-title'
      onKeyDown={(event) => { if (event.key === 'Escape') onClose(); }}
    >
      <div className='max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl'>
        <div className='sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4'>
          <h2 id='booking-details-title' className='text-xl font-bold text-gray-900'>
            Booking {booking?.referenceId || 'details'}
          </h2>
          <button type='button' onClick={onClose} autoFocus aria-label='Close booking details' className='rounded-lg p-2 text-gray-500 hover:bg-gray-100'>
            <X size={20} />
          </button>
        </div>
        {isLoading ? (
          <p className='p-6 text-sm text-gray-600' role='status'>Loading booking details...</p>
        ) : booking ? (
          <div className='grid gap-5 p-6 text-sm sm:grid-cols-2'>
            <Detail label='Customer' value={customerName} />
            <Detail label='Contact' value={booking.driverDetails?.phone || booking.driverDetails?.email || booking.user?.email || 'N/A'} />
            <Detail label='Vehicle' value={booking.vehicle?.name || 'Unknown Vehicle'} />
            <Detail label='Booking status' value={booking.bookingStatus} />
            <Detail label='Pickup' value={`${formatDate(booking.pickupDate)} · ${booking.pickupLocation?.name || 'N/A'}`} />
            <Detail label='Drop-off' value={`${formatDate(booking.dropOffDate)} · ${booking.dropOffLocation?.name || 'N/A'}`} />
            <Detail label='Payment status' value={booking.paymentStatus} />
            <Detail label='Amount paid' value={formatAmount(booking.amountPaid)} />
            <Detail label='Rental cost' value={formatAmount(booking.rentalCost)} />
            <Detail label='Total amount' value={formatAmount(booking.totalAmount)} />
            <div className='sm:col-span-2'>
              <p className='mb-2 text-gray-500'>Add-ons</p>
              <p className='font-semibold text-gray-900'>
                {[
                  booking.hasGps && 'GPS',
                  booking.hasFullInsurance && 'Full insurance',
                  booking.hasAdditionalDriver && 'Additional driver',
                  booking.hasChildSeat && 'Child seat',
                ].filter(Boolean).join(', ') || 'None'}
              </p>
            </div>
          </div>
        ) : null}
        <div className='flex justify-end border-t border-gray-200 px-6 py-4'>
          <button type='button' onClick={onClose} className='rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50'>Close</button>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className='text-gray-500'>{label}</p>
      <p className='mt-1 font-semibold text-gray-900'>{value}</p>
    </div>
  );
}
