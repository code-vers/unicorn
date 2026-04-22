import React from "react";
import { LuCheck } from "react-icons/lu";

const HeroSection: React.FC = () => {
  return (
    <section
      className='relative w-full min-h-screen bg-cover bg-center flex items-center justify-center'
      style={{ backgroundImage: "url('/home/heroCar.png')" }}>
      {/* Darker Overlay for better text readability */}
      <div className='absolute top-0 left-0 w-full h-full bg-black/60'></div>

      <div className='relative z-10 w-full max-w-[1440px] px-6 flex flex-col items-center'>
        {/* Title */}
        <h1 className='text-3xl md:text-[40px] mt-12 md:mt-0 font-bold text-white mb-8 text-center'>
          Want to rent a car in Malindi?
        </h1>

        {/* Trust Badges */}
        <div className='flex flex-wrap justify-center gap-4 md:gap-8 mb-8 text-white text-sm md:text-[28px]'>
          <div className='flex items-center gap-2'>
            <LuCheck className='text-white' /> <span>No Hidden Costs</span>
          </div>
          <div className='flex items-center gap-2'>
            <LuCheck className='text-white' /> <span>24/7 Support</span>
          </div>
          <div className='flex items-center gap-2'>
            <LuCheck className='text-white' /> <span>Free Cancellation</span>
          </div>
        </div>

        {/* Search Card */}
        <div className='w-full max-w-[1280px] bg-[#0A0A0A80]/50 backdrop-blur-sm p-6 md:p-12 rounded-3xl border border-white/10'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8'>
            {/* Row 1: Locations */}
            <div className='flex flex-col gap-2'>
              <label className='text-white text-sm ml-1'>
                Pick-up Location
              </label>
              <select className='w-full h-[56px] px-4 rounded-full bg-white text-gray-500 outline-none appearance-none cursor-pointer'>
                <option>-- Select --</option>
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-white text-sm ml-1'>Pick-up Date</label>
              <input
                type='date'
                className='w-full h-[56px] px-4 rounded-full bg-white text-gray-500 outline-none cursor-pointer'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-white text-sm ml-1'>
                Time <span className='text-red-500'>*</span>
              </label>
              <input
                type='time'
                className='w-full h-[56px] px-4 rounded-full bg-white text-gray-500 outline-none cursor-pointer'
              />
            </div>

            {/* Row 2: Drop-off */}
            <div className='flex flex-col gap-2'>
              <label className='text-white text-sm ml-1'>
                Drop-off Location
              </label>
              <select className='w-full h-[56px] px-4 rounded-full bg-white text-gray-500 outline-none appearance-none cursor-pointer'>
                <option>-- Select --</option>
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-white text-sm ml-1'>Drop-off Date</label>
              <input
                type='date'
                className='w-full h-[56px] px-4 rounded-full bg-white text-gray-500 outline-none cursor-pointer'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-white text-sm ml-1'>
                Drop-off Time <span className='text-red-500'>*</span>
              </label>
              <input
                type='time'
                className='w-full h-[56px] px-4 rounded-full bg-white text-gray-500 outline-none cursor-pointer'
              />
            </div>

            {/* Search Button */}
            <div className='pt-2'>
              <button className='w-full md:w-[240px] h-[56px] bg-white text-[#3FA34D] font-bold text-lg rounded-full hover:bg-gray-100 transition shadow-lg'>
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
