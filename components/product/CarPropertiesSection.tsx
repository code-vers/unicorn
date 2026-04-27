import { Check } from "lucide-react";
import React from "react";

const CarPropertiesSection: React.FC = () => {
  return (
    <div className='bg-white'>
      <div className='max-w-[1440px] mx-auto p-6 bg-white'>
        {/* --- TOP SECTION: VEHICLE HEADER --- */}
        <div className='flex flex-col md:flex-row gap-8 mb-10'>
          <div className='w-full md:w-1/3'>
            <img
              src='/product/car.png'
              alt='Toyota Vitz'
              className='w-full h-auto object-contain'
            />
          </div>
          <div className='flex-1 pt-4'>
            <h1 className='text-[28px] font-bold text-[#1A1A1A] mb-4'>
              Toyota Toyota Vitz
            </h1>
            <div className='flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-[#777777] mb-6'>
              <span>4 seats</span>
              <span>1 bags</span>
              <span>5 doors</span>
              <span>No Air Conditioning</span>
              <span>Automatic</span>
            </div>
            <span className='inline-block bg-[#FFF4E5] text-[#FF8F00] text-[11px] font-bold px-3 py-1 rounded-[4px] uppercase tracking-wider'>
              Partial Prepayment
            </span>
          </div>
        </div>

        {/* --- BOTTOM SECTION: DETAILS & PRICE --- */}
        <div className='flex flex-col lg:flex-row gap-10 border-t border-[#EEEEEE] pt-8'>
          {/* LEFT: PROPERTIES OVERVIEW */}
          <div className='flex-1'>
            {/* Tabs */}
            <div className='flex mb-10 border-b border-[#43A047]/20'>
              <button className='bg-[#43A047] text-white px-10 py-4 text-[16px] font-semibold rounded-t-[4px]'>
                Properties Overview
              </button>
              <button className='bg-transparent text-[#43A047] px-10 py-4 text-[16px] font-semibold'>
                Rental Terms
              </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-6'>
              {/* Column 1: Policy Info */}
              <div className='space-y-8'>
                <div className='border-l-[3px] border-[#FF8F00] pl-4'>
                  <p className='text-[14px] text-[#777777] mb-2'>Fuel policy</p>
                  <p className='text-[18px] font-bold text-[#1A1A1A]'>
                    Same to same
                  </p>
                </div>
                <div className='border-l-[3px] border-[#FF8F00] pl-4'>
                  <p className='text-[14px] text-[#777777] mb-2'>
                    Pick-up location
                  </p>
                  <p className='text-[18px] font-bold text-[#1A1A1A]'>
                    Meet & Greet
                  </p>
                </div>
              </div>

              {/* Column 2: Checkmark Features */}
              <div className='space-y-5'>
                <FeatureItem label='Unlimited mileage' />
                <FeatureItem label='Collision Damage Waiver' />
                <FeatureItem label='Theft Protection' />
                <FeatureItem label='Roadside Assistance' />
                <FeatureItem label='Third Party Liability (TPL)' />
              </div>
            </div>
          </div>

          {/* RIGHT: PRICE CARD */}
          <div className='lg:w-[320px] shrink-0'>
            <div className='bg-[#F3F5F6] rounded-[12px] p-8 text-center'>
              <h2 className='text-[26px] font-bold text-[#1A1A1A] mb-1'>
                Ksh 4,640.00
              </h2>
              <p className='text-[14px] text-[#777777] mb-6'>Cost of rental</p>

              <div className='w-full h-[1px] bg-[#E0E0E0] mb-8' />

              <div className='text-left'>
                <p className='text-[#FF8F00] text-[13px] font-bold uppercase mb-4 tracking-tight'>
                  Good Choice
                </p>
                <div className='flex gap-3 items-start'>
                  <Check size={18} className='text-[#FF8F00] mt-1 shrink-0' />
                  <p className='text-[14px] text-[#1A1A1A] leading-[1.6]'>
                    <span className='font-bold'>80% lower price</span> than the
                    average for a Compact car.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- SUB-COMPONENT --- */
const FeatureItem = ({ label }: { label: string }) => (
  <div className='flex items-center gap-4'>
    <Check size={18} className='text-[#FF8F00] shrink-0' />
    <span className='text-[15px] font-medium text-[#1A1A1A]'>{label}</span>
  </div>
);

export default CarPropertiesSection;
