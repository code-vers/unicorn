'use client';

import { Search, ChevronDown, Filter, Download, Calendar } from 'lucide-react';

export default function ReportsToolbar() {
  return (
    <div className='w-full py-5 px-6 flex justify-end items-center border-b border-[#E8ECF0]'>
      <div className='flex items-center gap-1.5 flex-wrap'>
        <div className='relative w-[170px]'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(26,32,44,0.5)]' size={12} />
          <input
            type='text'
            placeholder='Search bookings...'
            className='w-full bg-[#F4F6F8] border border-[#E8ECF0] rounded-[8px] py-1.5 pl-9 pr-3 text-[10px] text-[#1A202C] focus:outline-none focus:ring-1 focus:ring-[#3FA34D] font-lato'
          />
        </div>
        
        <button className='flex items-center justify-between gap-2 px-2 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-[7px] w-[98px] text-[12px] text-[#718096] hover:bg-gray-100 font-lato transition-colors'>
          mm/dd/yyyy <Calendar size={12} />
        </button>

        <button className='flex items-center justify-between gap-2 px-2 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-[7px] w-[98px] text-[12px] text-[#718096] hover:bg-gray-100 font-lato transition-colors'>
          mm/dd/yyyy <Calendar size={12} />
        </button>
        
        <button className='flex items-center justify-between gap-2 px-2 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-[7px] w-[123px] text-[12px] text-[#718096] hover:bg-gray-100 font-lato transition-colors'>
          All Categories <ChevronDown size={12} />
        </button>
        
        <button className='flex items-center gap-1.5 px-2 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-[7px] text-[12px] text-[#718096] hover:bg-gray-100 font-lato transition-colors'>
          <Filter size={12} /> Filter
        </button>
        
        <button className='flex items-center gap-1.5 px-2 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-[7px] text-[12px] text-[#718096] hover:bg-gray-100 font-lato transition-colors whitespace-nowrap'>
          <Download size={12} /> Export CSV
        </button>
      </div>
    </div>
  );
}
