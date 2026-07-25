"use client";
import React, { useEffect, useState } from "react";
import { VehicleResponse, VehicleService } from "../../lib/api/vehicle.service";

const DriverDetailsForm: React.FC = () => {
  const [vehicle, setVehicle] = useState<VehicleResponse | null>(null);

  useEffect(() => {
    const fetchFirstVehicle = async () => {
      try {
        const response = await VehicleService.getVehicles({ limit: 1 });
        if (response.data.length > 0) {
          setVehicle(response.data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch vehicle:', error);
      }
    };
    fetchFirstVehicle();
  }, []);

  const dailyRateVal = vehicle?.pricing?.dailyRate;
  const rentalCost = dailyRateVal ? Number(dailyRateVal) : 4640;
  const vat = rentalCost * 0.16;
  const total = rentalCost + vat;

  return (
    <div className='bg-white'>
      <div className='max-w-[1440px] mx-auto p-6 bg-white'>
        <div className='flex flex-col lg:flex-row gap-10 items-start'>
          {/* --- LEFT SIDE: FORM --- */}
          <div className='flex-1 w-full'>
            <h2 className='text-[28px] font-bold text-[#1A1A1A] mb-8'>
              Enter driver details
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-6'>
              <InputGroup
                label='Email'
                placeholder='Enter email'
                type='email'
              />
              <InputGroup
                label='Phone'
                placeholder='Enter phone number'
                type='tel'
              />
              <InputGroup label='First Name' placeholder='Enter first name' />
              <InputGroup label='Last Name' placeholder='Enter last name' />
            </div>

            {/* Date of Birth Section */}
            <div className='mb-8'>
              <label className='block text-[15px] font-bold text-[#1A1A1A] mb-3'>
                Date of Birth
              </label>
              <div className='grid grid-cols-3 gap-4'>
                <SelectGroup placeholder='DAY' />
                <SelectGroup placeholder='MONTH' />
                <SelectGroup placeholder='YEAR' />
              </div>
            </div>

            {/* Message Box */}
            <div className='mb-8'>
              <label className='block text-[15px] font-bold text-[#1A1A1A] mb-3'>
                Message to Car Supplier
              </label>
              <textarea
                placeholder='YOUR MESSAGE...'
                className='w-full h-[180px] p-4 bg-white border border-[#E5E7EB] rounded-[6px] text-[14px] outline-none focus:border-[#43A047] uppercase placeholder:text-[#9CA3AF]'
              />
            </div>

            {/* Checkbox */}
            <div className='flex items-center gap-3 mb-10'>
              <input
                type='checkbox'
                id='offers'
                className='w-[18px] h-[18px] accent-[#43A047] cursor-pointer'
              />
              <label
                htmlFor='offers'
                className='text-[14px] text-[#444444] cursor-pointer'>
                Yes, I would like to receive special offers, exclusive deals,
                and discounts from unicorn rent a car
              </label>
            </div>

            <button className='bg-[#43A047] text-white px-10 py-4 rounded-[6px] font-bold text-[16px] hover:bg-[#388E3C] transition-colors shadow-sm'>
              Continue to payment
            </button>
          </div>

          {/* --- RIGHT SIDE: PRICE BREAKDOWN --- */}
          <div className='w-full lg:w-[380px] shrink-0'>
            <div className='bg-[#0F172A] text-white rounded-[12px] p-8 shadow-xl'>
              <div className='flex justify-between items-center mb-10'>
                <h3 className='text-[20px] font-bold'>Price breakdown</h3>
                <span className='border border-[#FF8F00] text-[#FF8F00] text-[10px] font-bold px-2 py-1 rounded-[4px] uppercase tracking-tighter'>
                  Instant Booking
                </span>
              </div>

              {/* RENTAL Section */}
              <div className='mb-6'>
                <p className='text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4'>
                  RENTAL
                </p>
                <div className='flex justify-between text-[14px]'>
                  <span className='text-gray-300'>Cost of rental</span>
                  <span>ksh {rentalCost.toFixed(2)}</span>
                </div>
              </div>

              <div className='w-full h-[1px] bg-gray-700 my-6' />

              {/* TAXES & FEES Section */}
              <div className='mb-6 space-y-4'>
                <p className='text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4'>
                  TAXES & FEES
                </p>
                <FeeRow label='Delivery Fee Drop Off 10' value='ksh 0.00' />
                <FeeRow label='Delivery Fee Pick Up 10' value='ksh 0.00' />
                <FeeRow label='Extra Selected Cost:' value='ksh 0.00' />
                <FeeRow label='VAT (16%)' value={`ksh ${vat.toFixed(2)}`} />
              </div>

              <div className='w-full h-[1px] bg-gray-700 my-6' />

              {/* Totals */}
              <div className='space-y-6'>
                <div className='flex justify-between items-center text-[16px] font-bold'>
                  <span>Subtotal (rental + fees)</span>
                  <span>ksh {total.toFixed(2)}</span>
                </div>

                <div className='flex justify-between items-center text-[18px] font-extrabold text-white'>
                  <span>Total to pay now</span>
                  <span className='text-[20px]'>ksh {total.toFixed(2)}</span>
                </div>

                <div className='flex justify-between text-[13px] text-gray-400'>
                  <span>Pay at pick up</span>
                  <span>ksh 0.00</span>
                </div>
              </div>

              <p className='text-[10px] text-gray-500 leading-relaxed mt-10'>
                All mandatory taxes and fees are included in the total above. No
                hidden charges at pick-up.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- HELPER COMPONENTS --- */

const InputGroup = ({ label, placeholder, type = "text" }: any) => (
  <div className='flex flex-col gap-2'>
    <label className='text-[15px] font-bold text-[#1A1A1A]'>{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className='w-full h-[52px] px-4 bg-white border border-[#E5E7EB] rounded-[6px] text-[14px] outline-none focus:border-[#43A047] placeholder:text-[#9CA3AF]'
    />
  </div>
);

const SelectGroup = ({ placeholder }: any) => (
  <div className='relative'>
    <select className='w-full h-[52px] px-4 bg-white border border-[#E5E7EB] rounded-[6px] text-[14px] text-gray-400 appearance-none outline-none cursor-pointer focus:border-[#43A047]'>
      <option value=''>{placeholder}</option>
    </select>
    <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400'>
      <svg width='12' height='8' viewBox='0 0 12 8' fill='none'>
        <path
          d='M1 1L6 6L11 1'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
    </div>
  </div>
);

const FeeRow = ({ label, value }: any) => (
  <div className='flex justify-between text-[14px]'>
    <span className='text-gray-300'>{label}</span>
    <span className='text-gray-100'>{value}</span>
  </div>
);

export default DriverDetailsForm;
