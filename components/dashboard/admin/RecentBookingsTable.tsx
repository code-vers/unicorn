'use client';

import { getRecentBookings } from '@/lib/dashboard-data';
import { Eye, Pencil, Trash2, Search, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';

export default function RecentBookingsTable() {
  const bookings = getRecentBookings();

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-[#E0F7FF] text-[#0891B2]';
      case 'Completed':
        return 'bg-[#EBF7ED] text-[#3FA34D]';
      case 'Pending':
        return 'bg-[#FFF9E0] text-[#D8A500]';
      case 'Cancelled':
        return 'bg-[#FFF0F0] text-[#DC2626]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPaymentStatusStyles = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-[#EBF7ED] text-[#3FA34D]';
      case 'Pending':
        return 'bg-[#FFF9E0] text-[#D8A500]';
      case 'Refunded':
        return 'bg-[#FFF3E8] text-[#FF7815]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className='bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col'>
      <div className='p-6 border-b border-[#E8ECF0] flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h3 className='text-[18px] font-bold text-[#0A1413] font-montserrat'>
            Recent Bookings
          </h3>
          <p className='text-[#6B7280] text-[12px] font-lato'>12 records</p>
        </div>

        <div className='flex flex-wrap items-center gap-3'>
          <div className='relative w-full sm:w-[200px]'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={14} />
            <input
              type='text'
              placeholder='Search bookings...'
              className='w-full bg-[#F4F6F8] border border-[#E8ECF0] rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-[#3FA34D]'
            />
          </div>
          <button className='flex items-center gap-2 px-3 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-lg text-xs text-[#718096] hover:bg-gray-100'>
            Status <Filter size={12} />
          </button>
          <button className='flex items-center gap-2 px-3 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-lg text-xs text-[#718096] hover:bg-gray-100'>
            <Filter size={12} /> Filter
          </button>
          <button className='flex items-center gap-2 px-3 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-lg text-xs text-[#718096] hover:bg-gray-100'>
            <Download size={12} /> Export
          </button>
          <button className='bg-[#3FA34D] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#348a41] transition-colors'>
            New Booking
          </button>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full text-left border-collapse min-w-[1000px]'>
          <thead>
            <tr className='bg-[#FAFBFC] border-b border-[#E8ECF0]'>
              <th className='p-4 w-12'>
                <div className='w-4 h-4 border border-[#E8ECF0] rounded' />
              </th>
              <th className='p-4 text-[#A0AEC0] text-[12px] font-normal uppercase'>Customer</th>
              <th className='p-4 text-[#A0AEC0] text-[12px] font-normal uppercase'>Vehicle</th>
              <th className='p-4 text-[#A0AEC0] text-[12px] font-normal uppercase'>Pickup</th>
              <th className='p-4 text-[#A0AEC0] text-[12px] font-normal uppercase'>Drop-off</th>
              <th className='p-4 text-[#A0AEC0] text-[12px] font-normal uppercase'>Type</th>
              <th className='p-4 text-[#A0AEC0] text-[12px] font-normal uppercase'>Status</th>
              <th className='p-4 text-[#A0AEC0] text-[12px] font-normal uppercase'>Payment</th>
              <th className='p-4 text-[#A0AEC0] text-[12px] font-normal uppercase text-right'>Amount</th>
              <th className='p-4 text-[#A0AEC0] text-[12px] font-normal uppercase text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={booking.id}
                className={`${index % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'} border-b border-[#F4F6F8] hover:bg-gray-50 transition-colors`}
              >
                <td className='p-4'>
                  <div className='w-4 h-4 border border-[#E8ECF0] rounded' />
                </td>
                <td className='p-4'>
                  <div className='flex items-center gap-3'>
                    <div
                      className='w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold'
                      style={{ backgroundColor: booking.customer.avatarColor, color: '#0A1413' }}
                    >
                      {booking.customer.initials}
                    </div>
                    <div>
                      <p className='text-[14px] font-bold text-[#0A1413] font-lato'>{booking.customer.name}</p>
                      <p className='text-[10px] text-[#6B7280] font-lato'>{booking.id}</p>
                    </div>
                  </div>
                </td>
                <td className='p-4 text-[12px] text-[#6B7280] font-lato'>{booking.vehicle}</td>
                <td className='p-4 text-[12px] text-[#6B7280] font-lato'>{booking.pickupDate}</td>
                <td className='p-4 text-[12px] text-[#6B7280] font-lato'>{booking.dropoffDate}</td>
                <td className='p-4 text-[12px] text-[#6B7280] font-lato'>{booking.type}</td>
                <td className='p-4'>
                  <span className={`px-2 py-1 rounded-md text-[10px] font-semibold ${getStatusStyles(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className='p-4'>
                  <span className={`px-2 py-1 rounded-md text-[10px] font-semibold ${getPaymentStatusStyles(booking.paymentStatus)}`}>
                    {booking.paymentStatus}
                  </span>
                </td>
                <td className='p-4 text-[14px] font-bold text-[#0A1413] text-right font-lato'>
                  £{booking.amount}
                </td>
                <td className='p-4'>
                  <div className='flex items-center justify-center gap-2'>
                    <button className='p-1.5 text-[#3FA34D] bg-[#EBF7ED] rounded-md hover:bg-[#d5eedb] transition-colors'>
                      <Eye size={12} />
                    </button>
                    <button className='p-1.5 text-[#6B7280] bg-[#F6F6F6] rounded-md hover:bg-gray-200 transition-colors'>
                      <Pencil size={12} />
                    </button>
                    <button className='p-1.5 text-[#DC2626] bg-[#FFF0F0] rounded-md hover:bg-[#ffe0e0] transition-colors'>
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#E8ECF0]'>
        <p className='text-[12px] text-[#A0AEC0] font-lato'>Showing 1–7 of 12</p>
        <div className='flex items-center gap-2'>
          <button className='p-2 bg-[#F6F6F6] text-[#6B7280] rounded-md opacity-50 cursor-not-allowed'>
            <ChevronLeft size={14} />
          </button>
          <button className='w-8 h-8 bg-gradient-to-br from-[#3FA34D] to-[#2E7A39] text-white text-[12px] font-bold rounded-md shadow-md'>
            1
          </button>
          <button className='w-8 h-8 bg-[#F6F6F6] text-[#6B7280] text-[12px] font-bold rounded-md hover:bg-gray-200'>
            2
          </button>
          <button className='p-2 bg-[#F6F6F6] text-[#6B7280] rounded-md hover:bg-gray-200'>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
