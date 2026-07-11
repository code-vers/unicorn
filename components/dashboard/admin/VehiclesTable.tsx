'use client';

import { getVehicles } from '@/lib/vehicles-data';
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function VehiclesTable() {
  const vehicles = getVehicles();

  return (
    <>
      {/* Scrollable container for the table */}
      <div className='overflow-x-auto'>
        <table className='w-full text-left border-collapse min-w-[1200px]'>
          <thead>
            <tr className='bg-[#FAFBFC] border-b border-[#E8ECF0] h-[50px]'>
              <th className='px-[11px] py-[9px] w-[50px]'>
                <div className='bg-white border border-[#E8ECF0] rounded-[4px] size-[15px] cursor-pointer hover:border-[#3FA34D] transition-colors' />
              </th>
              <th className='text-[#A0AEC0] text-[12px] font-normal font-["Lato"] py-[5px] w-[200px]'>
                VEHICLE NAME
              </th>
              <th className='text-[#A0AEC0] text-[12px] font-normal font-["Lato"] py-[5px] w-[115px]'>
                CATEGORY
              </th>
              <th className='text-[#A0AEC0] text-[12px] font-normal font-["Lato"] py-[5px] w-[102px]'>
                BRAND
              </th>
              <th className='text-[#A0AEC0] text-[12px] font-normal font-["Lato"] py-[5px] w-[86px]'>
                YEAR
              </th>
              <th className='text-[#A0AEC0] text-[12px] font-normal font-["Lato"] py-[5px] w-[120px]'>
                TRANSMISSION
              </th>
              <th className='text-[#A0AEC0] text-[12px] font-normal font-["Lato"] py-[5px] w-[86px] px-[14px]'>
                SEATING
              </th>
              <th className='text-[#A0AEC0] text-[12px] font-normal font-["Lato"] py-[5px] w-[75px]'>
                DAILY RATE
              </th>
              <th className='text-[#A0AEC0] text-[12px] font-normal font-["Lato"] py-[5px] w-[114px]'>
                AVAILABILITY
              </th>
              <th className='text-[#A0AEC0] text-[12px] font-normal font-["Lato"] py-[5px] w-[110px]'>
                LOCATION
              </th>
              <th className='text-[#A0AEC0] text-[12px] font-normal font-["Lato"] py-[5px] w-[152px] px-[14px]'>
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-[#F4F6F8]'>
            {vehicles.map((vehicle, index) => (
              <tr
                key={vehicle.id}
                className={`${
                  index % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'
                } h-[50px] hover:bg-gray-50 transition-colors group`}
              >
                <td className='px-[11px] py-[9px]'>
                  <div className='bg-white border border-[#E8ECF0] rounded-[4px] size-[15px] cursor-pointer hover:border-[#3FA34D] transition-colors' />
                </td>
                <td className='text-[#0A1413] text-[12px] font-["Lato"] py-[15px]'>
                  {vehicle.name}
                </td>
                <td className='text-[#6B7280] text-[12px] font-["Lato"] py-[15px]'>
                  {vehicle.category}
                </td>
                <td className='text-[#6B7280] text-[12px] font-["Lato"] py-[15px]'>
                  {vehicle.brand}
                </td>
                <td className='text-[#6B7280] text-[12px] font-["Lato"] py-[15px]'>
                  {vehicle.year}
                </td>
                <td className='text-[#6B7280] text-[12px] font-["Lato"] py-[15px]'>
                  {vehicle.transmission}
                </td>
                <td className='text-[#6B7280] text-[12px] font-["Lato"] py-[15px] px-[14px]'>
                  {vehicle.seating}
                </td>
                <td className='text-[#6B7280] text-[12px] font-["Lato"] py-[15px]'>
                  ${vehicle.dailyRate}
                </td>
                <td className='py-[15px]'>
                  <span
                    className={`px-[7px] py-[1px] rounded-[5px] text-[10px] font-["Lato"] inline-flex items-center justify-center ${
                      vehicle.availability === 'Available'
                        ? 'bg-[#EBF7ED] text-[#3FA34D]'
                        : 'bg-[#FFFAE0] text-[#D8A500]'
                    }`}
                  >
                    {vehicle.availability}
                  </span>
                </td>
                <td className='text-[#6B7280] text-[12px] font-["Lato"] py-[15px]'>
                  {vehicle.location}
                </td>
                <td className='px-[14px] py-[11px]'>
                  <div className='flex gap-[4px] opacity-0 group-hover:opacity-100 transition-opacity'>
                    <button className='bg-[#EBF7ED] text-[#3FA34D] p-1.5 rounded-[5px] hover:bg-[#d8eedb] transition-all transform hover:scale-105'>
                      <Eye size={12} />
                    </button>
                    <button className='bg-[#F6F6F6] text-[#6B7280] p-1.5 rounded-[5px] hover:bg-gray-200 transition-all transform hover:scale-105'>
                      <Pencil size={12} />
                    </button>
                    <button className='bg-[#FFF0F0] text-[#DC2626] p-1.5 rounded-[5px] hover:bg-[#ffe0e0] transition-all transform hover:scale-105'>
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className='border-t border-[#E8ECF0] px-[40px] py-[20px] flex items-center justify-between'>
        <p className='text-[#A0AEC0] text-[10.5px] font-["Lato"]'>Showing 1–7 of 12</p>
        <div className='flex gap-[4px] items-center'>
          <button className='bg-[#F6F6F6] text-gray-400 p-2 rounded-[6px] opacity-50 cursor-not-allowed hover:bg-gray-100 transition-colors'>
            <ChevronLeft size={12} />
          </button>
          <button className='size-[28px] rounded-[6px] bg-gradient-to-br from-[#3FA34D] to-[#2E7A39] text-white text-[12px] font-bold font-["Lato"] shadow-[0px_2px_3px_rgba(63,163,77,0.25)] flex items-center justify-center transform hover:scale-105 transition-all'>
            1
          </button>
          <button className='size-[28px] rounded-[6px] bg-[#F6F6F6] text-[#6B7280] text-[12px] font-["Lato"] flex items-center justify-center hover:bg-gray-200 transition-all'>
            2
          </button>
          <button className='bg-[#F6F6F6] text-[#6B7280] p-2 rounded-[6px] hover:bg-gray-200 transition-all'>
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </>
  );
}
