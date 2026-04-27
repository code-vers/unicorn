import React from "react";

interface InputGroupProps {
  label: string;
  placeholder?: string;
  type?: "text" | "date" | "time";
  isSelect?: boolean;
  required?: boolean;
}

interface CheckboxProps {
  label: string;
  id: string;
}

const Sidebar: React.FC = () => {
  return (
    /* Removed h-screen and fixed w-[340px]. 
       Added w-full so it fills the sidebar container in your Layout Page. */
    <div className='w-full flex flex-col gap-4'>
      {/* 1. GREEN SEARCH FORM */}
      <div className='bg-[#43a047] p-5 rounded-[6px] space-y-4 shadow-sm'>
        <div className='space-y-4'>
          <InputGroup
            label='Pick-up Location'
            placeholder='-- Select --'
            isSelect
          />
          <InputGroup
            label='Pick-up Date'
            type='date'
            placeholder='MM/DD/YYYY'
          />
          <InputGroup
            label='Pick-up Time'
            type='time'
            placeholder='HH:MM'
            required
          />
          <InputGroup
            label='Drop-off Location'
            placeholder='-- Select --'
            isSelect
          />
          <InputGroup
            label='Drop-off Date'
            type='date'
            placeholder='MM/DD/YYYY'
          />
          <InputGroup
            label='Drop-off Time'
            type='time'
            placeholder='HH:MM'
            required
          />
        </div>

        <button className='w-full bg-white text-[#43a047] font-bold py-3 rounded-md mt-2 uppercase text-sm tracking-wide shadow-sm hover:bg-gray-50 transition-colors'>
          Search
        </button>
      </div>

      {/* 2. POPULAR FILTERS CARD */}
      <div className='bg-[#F9F9F9] border border-[#E5E5E5] rounded-[6px] p-6 mb-4 shadow-sm'>
        <h3 className='text-[#333333] font-bold text-base mb-1'>
          Popular Filters
        </h3>
        <div className='w-24 h-[1px] bg-[#E5E5E5] mb-6'></div>

        <div className='space-y-4 mb-8'>
          <Checkbox label='Automatic Transmission' id='at' />
          <Checkbox label='Air Conditioning' id='ac' />
          <Checkbox label='Diesel' id='diesel' />
          <Checkbox label='Petrol' id='petrol' />
          <Checkbox label='4 Seats' id='4s' />
          <Checkbox label='5 Seats' id='5s' />
          <Checkbox label='6+ Seats' id='6s' />
        </div>

        {/* Price Inputs - Flex wrap for responsiveness */}
        <div className='flex flex-row lg:flex-col gap-4'>
          <div className='flex flex-col flex-1'>
            <input
              type='text'
              className='w-full lg:w-[120px] border border-[#E5E5E5] bg-white rounded-md p-2 text-sm outline-none focus:border-[#43a047]'
            />
            <p className='text-[#666666] text-xs mt-1'>Min Price</p>
          </div>
          <div className='flex flex-col flex-1'>
            <input
              type='text'
              className='w-full lg:w-[120px] border border-[#E5E5E5] bg-white rounded-md p-2 text-sm outline-none focus:border-[#43a047]'
            />
            <p className='text-[#666666] text-xs mt-1'>Max Price</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- Helper Components --- */

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  placeholder,
  type = "text",
  isSelect,
  required,
}) => (
  <div className='flex flex-col'>
    <label className='text-white text-[13px] font-medium mb-1.5 flex items-center'>
      {label}{" "}
      {required && <span className='text-red-200 ml-1 font-bold'>*</span>}
    </label>
    <div className='relative'>
      {isSelect ? (
        <select className='w-full h-11 px-4 rounded-full bg-white text-gray-400 text-sm appearance-none outline-none cursor-pointer'>
          <option value=''>{placeholder}</option>
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className='w-full h-11 px-4 rounded-md bg-white text-gray-700 text-sm outline-none placeholder:text-gray-300'
        />
      )}
      {isSelect && (
        <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
          <svg width='10' height='6' viewBox='0 0 10 6' fill='none'>
            <path
              d='M1 1L5 5L9 1'
              stroke='#999999'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      )}
    </div>
  </div>
);

const Checkbox: React.FC<CheckboxProps> = ({ label, id }) => (
  <label htmlFor={id} className='flex items-center group cursor-pointer'>
    <div className='relative flex items-center justify-center'>
      <input
        id={id}
        type='checkbox'
        className='peer appearance-none w-4 h-4 border border-[#D1D5DB] rounded bg-white checked:bg-[#43a047] checked:border-[#43a047] transition-all'
      />
      <svg
        className='absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='4'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
      </svg>
    </div>
    <span className='ml-3 text-sm text-[#666666] group-hover:text-gray-900 transition-colors font-normal'>
      {label}
    </span>
  </label>
);

export default Sidebar;
