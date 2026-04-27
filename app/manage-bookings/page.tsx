import { Calendar, Car, MapPin, MoreVertical, Search } from "lucide-react";
import React from "react";

const ManageBookings: React.FC = () => {
  return (
    /* Changed max-width typo and set background to pure white */
    <div className='w-full min-h-screen bg-white font-sans'>
      <div className='max-w-[1440px] mx-auto px-8 md:px-0 py-10'>
        {/* --- HEADER SECTION --- */}
        <div className='mb-8'>
          <h1 className='text-[32px] font-bold text-[#0F172A] mb-2'>
            Manage Your Bookings
          </h1>
          <p className='text-[#64748B] text-[15px]'>
            View and manage all your car rental reservations
          </p>
        </div>

        {/* --- SEARCH BAR --- */}
        <div className='relative mb-10 max-w-[420px]'>
          <Search
            className='absolute left-4 top-1/2 -translate-y-1/2'
            size={20}
          />
          <input
            type='text'
            placeholder='Search by car name, booking reference, or location...'
            className='w-full h-[52px] pl-12 pr-4 bg-white border border-[#E2E8F0] rounded-[8px] text-[14px] outline-none focus:border-[#43A047] transition-all shadow-sm'
          />
        </div>

        {/* --- TAB NAVIGATION --- */}
        <div className='flex border-b border-[#E2E8F0] mb-10'>
          <button className='bg-[#43A047] text-white px-12 py-4 text-[16px] font-semibold rounded-t-[6px]'>
            All Bookings
          </button>
          <button className='text-[#64748B] hover:text-[#43A047] px-12 py-4 text-[16px] font-semibold transition-colors border-b-2 border-transparent hover:border-[#43A047]'>
            Upcoming
          </button>
          <button className='text-[#64748B] hover:text-[#43A047] px-12 py-4 text-[16px] font-semibold transition-colors border-b-2 border-transparent hover:border-[#43A047]'>
            Completed
          </button>
        </div>

        {/* --- BOOKING CARDS LIST --- */}
        <div className='space-y-6'>
          <BookingCard />
          <BookingCard />
          <BookingCard />
        </div>
      </div>
    </div>
  );
};

/* --- SUB-COMPONENT: BOOKING CARD --- */
const BookingCard = () => (
  <div className='bg-white border border-[#F1F5F9] rounded-[16px] p-8 flex flex-col lg:flex-row gap-10 items-center shadow-sm relative group'>
    {/* Car Image Container - Slightly larger for the 1440px width */}
    <div className='w-full lg:w-[280px] shrink-0 flex justify-center bg-[#F8FAFC] rounded-xl p-4'>
      <img
        src='/product/car.png'
        alt='Mercedes-Benz E-Class'
        className='w-full h-auto object-contain max-h-[160px]'
      />
    </div>

    {/* Content Section */}
    <div className='flex-1 w-full'>
      <div className='flex justify-between items-start mb-6'>
        <div>
          <div className='flex items-center gap-3 mb-1'>
            <h3 className='text-[24px] font-bold text-[#1E293B]'>
              Mercedes-Benz E-Class
            </h3>
            <span className='bg-[#DBEAFE] text-[#2563EB] text-[11px] font-bold px-2.5 py-1 rounded-[4px] uppercase tracking-wider'>
              Upcoming
            </span>
          </div>
          <p className='text-[14px] text-[#64748B] flex items-center gap-2'>
            <span className='flex justify-center gap-1 items-center'>
              <Car /> Luxury Sedan • Ref: UC2026-4501
            </span>
          </p>
        </div>
        <button className='text-[#94A3B8] hover:text-[#1E293B] transition-colors p-2 hover:bg-gray-50 rounded-full'>
          <MoreVertical size={24} />
        </button>
      </div>

      {/* Pickup/Return Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-12 mb-8 border-b border-[#F1F5F9] pb-8'>
        {/* Pickup */}
        <div className='space-y-4'>
          <div className='flex gap-4 items-start'>
            <div className='p-2 bg-[#FFF4E5] rounded-lg'>
              <Calendar size={20} className='text-[#FF8F00]' />
            </div>
            <div>
              <p className='text-[15px] font-bold text-[#1E293B]'>Pickup</p>
              <p className='text-[14px] text-[#64748B]'>Apr 5, 2026 10:00 AM</p>
              <div className='flex items-center gap-1.5 mt-2 text-gray-500'>
                <MapPin className='text-orange-500' size={16} />
                <span className='text-[13px] font-medium'>
                  Miami Intl. Airport
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Return */}
        <div className='space-y-4'>
          <div className='flex gap-4 items-start'>
            <div className='p-2 bg-[#E8F5E9] rounded-lg'>
              <Calendar size={20} className='text-[#43A047]' />
            </div>
            <div>
              <p className='text-[15px] font-bold text-[#1E293B]'>Return</p>
              <p className='text-[14px] text-[#64748B]'>
                Apr 10, 2026 10:00 AM
              </p>
              <div className='flex items-center gap-1.5 mt-2 text-[#43A047]'>
                <MapPin size={16} />
                <span className='text-[13px] text-gray-500 font-medium'>
                  Miami Intl. Airport
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Pricing & Actions */}
      <div className='flex flex-col sm:flex-row justify-between items-end sm:items-center gap-6'>
        <div>
          <p className='text-[28px] font-extrabold text-[#43A047]'>$485.00</p>
          <p className='text-[14px] text-[#94A3B8] font-medium'>Total Price</p>
        </div>
        <div className='flex gap-4 w-full sm:w-auto'>
          <button className='flex-1 sm:flex-none border-2 border-[#FF8F00] text-[#FF8F00] px-8 py-3 rounded-[8px] text-[15px] font-bold hover:bg-[#FF8F00] hover:text-white transition-all'>
            View Details
          </button>
          <button className='flex-1 sm:flex-none bg-[#43A047] text-white px-8 py-3 rounded-[8px] text-[15px] font-bold hover:bg-[#388E3C] shadow-md shadow-green-100 transition-all'>
            Modify Booking
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ManageBookings;
