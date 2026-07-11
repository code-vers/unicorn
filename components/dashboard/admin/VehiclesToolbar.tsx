'use client';

import { ChevronDown, Download, Filter, Search } from 'lucide-react';

export default function VehiclesToolbar() {
  return (
    <div className='bg-white border-b border-[#E8ECF0] p-5 flex flex-wrap items-center justify-end gap-3'>
      {/* Search Input */}
      <div className='relative w-full sm:w-[240px]'>
        <Search
          className='absolute left-3 top-1/2 -translate-y-1/2 text-[#718096]'
          size={14}
        />
        <input
          type='text'
          placeholder='Search bookings…'
          className='w-full bg-[#F4F6F8] border border-[#E8ECF0] rounded-lg h-[34px] pl-9 pr-4 text-[10px] font-["Lato"] text-[#1A202C]/50 focus:outline-none focus:ring-1 focus:ring-[#3FA34D]'
        />
      </div>

      {/* Status Filter */}
      <button className='flex items-center justify-between gap-2 px-3 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-md min-w-[98px] text-[12px] font-["Lato"] text-[#718096] hover:bg-gray-100 transition-colors'>
        <span>Status</span>
        <ChevronDown size={14} />
      </button>

      {/* Filter Button */}
      <button className='flex items-center gap-2 px-3 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-md text-[12px] font-["Lato"] text-[#718096] hover:bg-gray-100 transition-colors'>
        <Filter size={14} />
        <span>Filter</span>
      </button>

      {/* Export Button */}
      <button className='flex items-center gap-2 px-3 py-1.5 bg-[#F4F6F8] border border-[#E8ECF0] rounded-md text-[12px] font-["Lato"] text-[#718096] hover:bg-gray-100 transition-colors'>
        <Download size={14} />
        <span>Export</span>
      </button>

      {/* Add Vehicle Button */}
      <button className='bg-[#3FA34D] text-white h-[34px] px-6 rounded-md text-[14px] font-["Wix_Madefor_Text"] font-bold hover:bg-[#348a41] transition-all ml-2 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]'>
        Add Vehicle
      </button>
    </div>
  );
}
