'use client';

import { useState, useEffect } from 'react';
import { BookingService, BookingResponse } from '@/lib/api/booking.service';
import { Eye, Check, Trash2, Search, Filter, Download, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export default function BookingsTable() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await BookingService.getAllBookings();
      setBookings(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'CONFIRMED' | 'CANCELLED') => {
    try {
      await BookingService.updateBookingStatus(id, status);
      // Optimistic update
      setBookings(prev => prev.map(b => b.id === id ? { ...b, bookingStatus: status } : b));
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
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

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading bookings...</div>;
  }

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
          
          <button className='flex items-center gap-1.5 px-2 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-[7px] text-[12px] text-[#718096] hover:bg-gray-100 font-lato transition-colors'>
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
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
            {bookings.length === 0 ? (
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
                      <button className='p-1.5 text-[#3FA34D] bg-[#EBF7ED] rounded-[5px] hover:bg-[#d5eedb] transition-colors' title="View">
                        <Eye size={12} />
                      </button>
                      
                      {booking.bookingStatus === 'PENDING' && (
                        <>
                          <button 
                            onClick={() => handleUpdateStatus(booking.id, 'CONFIRMED')}
                            className='p-1.5 text-[#3FA34D] bg-[#EBF7ED] border border-[#3FA34D] rounded-[5px] hover:bg-[#3FA34D] hover:text-white transition-colors' 
                            title="Approve"
                          >
                            <Check size={12} />
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(booking.id, 'CANCELLED')}
                            className='p-1.5 text-[#DC2626] bg-[#FFF0F0] border border-[#DC2626] rounded-[5px] hover:bg-[#DC2626] hover:text-white transition-colors' 
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
    </div>
  );
}
