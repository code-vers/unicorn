'use client';

import { getPayments } from '@/lib/dashboard-data';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PaymentsTable() {
  const payments = getPayments();

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-[#EBF7ED] text-[#3FA34D]';
      case 'Pending':
        return 'bg-[#FFFAE0] text-[#D8A500]';
      case 'Partial':
        return 'bg-[#FFF3E8] text-[#FF7815]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

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
          
          <button className='flex items-center gap-1.5 px-2 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-[7px] text-[12px] text-[#718096] hover:bg-gray-100 font-lato transition-colors'>
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='w-full text-left border-collapse min-w-[1000px]'>
          <thead>
            <tr className='bg-[#FAFBFC] border-b border-[#E8ECF0] h-[50px]'>
              <th className='px-3 py-2 w-[50px]'>
                <div className='w-[15px] h-[15px] bg-white border border-[#E8ECF0] rounded-[4px] mx-auto' />
              </th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[95px]'>Booking ID</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[220px]'>Customer</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[152px]'>Invoice Number</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[134px]'>Date</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[134px]'>Amount</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase w-[114px]'>Status</th>
              <th className='px-3 py-2 text-[#A0AEC0] text-[12px] font-normal font-lato uppercase text-center w-[152px]'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={payment.id}
                className={`${index % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'} border-b border-[#F4F6F8] hover:bg-gray-50 transition-colors h-[50px]`}
              >
                <td className='px-3 py-2'>
                  <div className='w-[15px] h-[15px] bg-white border border-[#E8ECF0] rounded-[4px] mx-auto' />
                </td>
                <td className='px-3 py-2 text-[12px] text-[#0A1413] font-lato'>{payment.bookingId}</td>
                <td className='px-3 py-2 text-[12px] font-semibold text-[#0A1413] font-lato'>{payment.customerEmail}</td>
                <td className='px-3 py-2 text-[12px] font-semibold text-[#0A1413] font-lato'>{payment.invoiceNumber}</td>
                <td className='px-3 py-2 text-[12px] text-[#6B7280] font-lato'>{payment.date}</td>
                <td className='px-3 py-2 text-[12px] text-[#6B7280] font-lato'>${payment.amount}</td>
                <td className='px-3 py-2'>
                  <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] text-[10px] font-normal min-w-[35px] ${getStatusStyles(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
                <td className='px-3 py-2'>
                  <div className='flex items-center justify-center'>
                    <button className='p-1.5 text-[#3FA34D] bg-[#EBF7ED] rounded-[5px] hover:bg-[#d5eedb] transition-colors'>
                      <Download size={10} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='px-10 py-5 flex items-center justify-between border-t border-[#E8ECF0]'>
        <p className='text-[10.5px] text-[#A0AEC0] font-lato'>Showing 1–7 of 12</p>
        <div className='flex items-center gap-1'>
          <button className='w-7 h-7 flex items-center justify-center bg-[#F6F6F6] border border-[#F6F6F6] text-[#6B7280] rounded-[6px] opacity-50 cursor-not-allowed'>
            <ChevronLeft size={12} />
          </button>
          <button className='w-7 h-7 flex items-center justify-center bg-gradient-to-br from-[#3FA34D] to-[#2E7A39] text-white text-[12px] font-bold rounded-[6px] shadow-[0px_2px_3px_rgba(63,163,77,0.25)]'>
            1
          </button>
          <button className='w-7 h-7 flex items-center justify-center bg-[#F6F6F6] border border-[#F6F6F6] text-[#6B7280] text-[12px] font-normal rounded-[6px] hover:bg-gray-200 transition-colors'>
            2
          </button>
          <button className='w-7 h-7 flex items-center justify-center bg-[#F6F6F6] border border-[#F6F6F6] text-[#6B7280] rounded-[6px] hover:bg-gray-200 transition-colors'>
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
