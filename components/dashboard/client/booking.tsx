'use client';

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  DollarSign,
  Eye,
  Plus,
  Search,
  Smartphone,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const bookingsData = [
  {
    id: '#1001',
    agreementNo: 'URC-2026-0089',
    vehicle: 'Toyota Land Cruiser V8',
    startDate: '2026-05-15',
    returnDate: '2026-05-15',
    location: 'JKIA Airport',
    amount: '$250',
    remainingDays: 2,
    image: '/product/car.png',
  },
  {
    id: '#1002',
    agreementNo: 'URC-2026-0089',
    vehicle: 'Toyota Land Cruiser V8',
    startDate: '2026-05-15',
    returnDate: '2026-05-15',
    location: 'JKIA Airport',
    amount: '$400',
    remainingDays: 4,
    image: '/product/car.png',
  },
  {
    id: '#1001',
    agreementNo: 'URC-2026-0089',
    vehicle: 'Toyota Land Cruiser V8',
    startDate: '2026-05-15',
    returnDate: '2026-05-15',
    location: 'JKIA Airport',
    amount: '$250',
    remainingDays: 6,
    image: '/product/car.png',
  },
  {
    id: '#1002',
    agreementNo: 'URC-2026-0089',
    vehicle: 'Toyota Land Cruiser V8',
    startDate: '2026-05-15',
    returnDate: '2026-05-15',
    location: 'JKIA Airport',
    amount: '$400',
    remainingDays: 1,
    image: '/product/car.png',
  },
  {
    id: '#1001',
    agreementNo: 'URC-2026-0089',
    vehicle: 'Toyota Land Cruiser V8',
    startDate: '2026-05-15',
    returnDate: '2026-05-15',
    location: 'JKIA Airport',
    amount: '$840',
    remainingDays: 1,
    image: '/product/car.png',
  },
  {
    id: '#1002',
    agreementNo: 'URC-2026-0089',
    vehicle: 'Toyota Land Cruiser V8',
    startDate: '2026-05-15',
    returnDate: '2026-05-15',
    location: 'JKIA Airport',
    amount: '$250',
    remainingDays: 1,
    image: '/product/car.png',
  },
  {
    id: '#1001',
    agreementNo: 'URC-2026-0089',
    vehicle: 'Toyota Land Cruiser V8',
    startDate: '2026-05-15',
    returnDate: '2026-05-15',
    location: 'JKIA Airport',
    amount: '$840',
    remainingDays: 1,
    image: '/product/car.png',
  },
];

interface ExtendBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
}

const ExtendBookingModal = ({ isOpen, onClose, booking }: ExtendBookingModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
      <div className='bg-white rounded-[12px] border border-[#E5E7EB] shadow-2xl w-full max-w-[720px] max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-600 transition-colors'
        >
          <X size={20} />
        </button>

        <div className='p-10 space-y-8'>
          {/* Header */}
          <div className='space-y-2'>
            <h3 className='text-[20px] font-bold text-[#0A1413] font-montserrat'>
              Extend Your Booking
            </h3>
            <p className='text-[14px] text-[#4A5565] font-inter'>
              Extend your current rental period securely.
              <br />
              Reference: {booking.agreementNo}
            </p>
          </div>

          {/* Car Info Card */}
          <div className='bg-[#F6F6F6] border border-[#E5E7EB] rounded-[12px] p-5 flex items-center gap-5'>
            <div className='relative w-32 h-24 flex-shrink-0'>
              <Image src={booking.image} alt={booking.vehicle} fill className='object-contain' />
            </div>
            <div className='space-y-2'>
              <h4 className='text-[20px] font-bold text-[#0A1413] font-montserrat'>
                {booking.vehicle}
              </h4>
              <div className='flex items-center gap-2 text-[14px] text-[#4A5565] font-inter'>
                <Car className='w-4 h-4' />
                <span>Luxury Sedan</span>
                <span className='text-[#99A1AF]'>•</span>
                <span>Ref: {booking.agreementNo}</span>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className='space-y-6'>
            {/* Current Status */}
            <div className='space-y-5'>
              <div className='flex items-center gap-3'>
                <Calendar className='w-4 h-4 text-[#101828]' />
                <h5 className='text-[16px] font-bold text-[#101828] font-montserrat'>
                  Current Status
                </h5>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-[14px] font-normal text-[#0A1413] font-nunito'>Date</label>
                  <div className='bg-[#F6F6F6] border border-[#E5E7EB] rounded-[4px] px-3 py-2 text-[14px] text-[#0A1413] font-nunito'>
                    {booking.returnDate}
                  </div>
                </div>
                <div className='space-y-2'>
                  <label className='text-[14px] font-normal text-[#0A1413] font-nunito'>Rate</label>
                  <div className='bg-[#F6F6F6] border border-[#E5E7EB] rounded-[4px] px-3 py-2 text-[14px] text-[#0A1413] font-nunito'>
                    {booking.amount}
                  </div>
                </div>
              </div>
            </div>

            <hr className='border-[#E5E7EB]' />

            {/* Extension Duration */}
            <div className='space-y-5'>
              <div className='flex items-center gap-3'>
                <Clock className='w-5 h-5 text-[#101828]' />
                <h5 className='text-[16px] font-bold text-[#101828] font-montserrat'>
                  Extension Duration
                </h5>
              </div>
              <div className='space-y-2'>
                <label className='text-[14px] font-normal text-[#0A1413] font-nunito'>Days</label>
                <input
                  type='number'
                  defaultValue={3}
                  className='w-full bg-[#F6F6F6] border border-[#E5E7EB] rounded-[4px] px-3 py-2 text-[14px] text-[#0A1413] font-nunito focus:outline-none focus:ring-1 focus:ring-[#3FA344]'
                />
              </div>
              <div className='bg-[#F6F6F6] rounded-[6px] p-3 flex items-center gap-3'>
                <div className='bg-[#EBF7ED] rounded-[6px] w-10 h-10 flex items-center justify-center'>
                  <Calendar className='w-4 h-4 text-[#3FA344]' />
                </div>
                <div>
                  <p className='text-[10px] text-[#6B7280] font-lato'>New Return Date</p>
                  <p className='text-[14px] font-normal text-[#0A1413] font-nunito'>Jun 8, 2026</p>
                </div>
              </div>
            </div>

            <hr className='border-[#E5E7EB]' />

            {/* Payment Method */}
            <div className='bg-white border border-[#E5E7EB] rounded-[14px] p-5 space-y-6'>
              <h5 className='text-[14px] font-bold text-[#0A1413] font-montserrat uppercase'>
                Payment Method
              </h5>
              <div className='grid grid-cols-2 gap-2'>
                <button className='flex items-center justify-center gap-2 border border-[#6B7280] rounded-[6px] py-2 text-[14px] font-bold text-[#6B7280] font-wix'>
                  <Smartphone className='w-3.5 h-3.5' />
                  M-Pesa
                </button>
                <button className='flex items-center justify-center gap-2 border border-gray-200 rounded-[6px] py-2 text-[14px] font-bold text-gray-400 font-wix bg-gray-50'>
                  <CreditCard className='w-3.5 h-3.5' />
                  Card
                </button>
              </div>
              <div className='space-y-2'>
                <label className='text-[14px] font-normal text-[#0A1413] font-nunito'>
                  M-Pesa Phone Number
                </label>
                <input
                  type='text'
                  placeholder='07XX XXX XXX'
                  className='w-full bg-[#F6F6F6] border border-[#E5E7EB] rounded-[4px] px-3 py-2 text-[14px] text-[#0A1413] font-nunito focus:outline-none focus:ring-1 focus:ring-[#3FA344]'
                />
              </div>
            </div>

            {/* Price Summary */}
            <div className='space-y-5'>
              <div className='flex items-center gap-3'>
                <DollarSign className='w-4 h-4 text-[#101828]' />
                <h5 className='text-[16px] font-bold text-[#101828] font-montserrat'>
                  Updated Price Summary
                </h5>
              </div>
              <div className='bg-[#DAFFDF] rounded-[12px] p-5 space-y-3'>
                <div className='flex justify-between items-center text-[14px] font-nunito'>
                  <span className='text-[#6B7280]'>Base Rental (5 days)</span>
                  <span className='text-[#0A1413] font-medium'>$485.00</span>
                </div>
                <div className='flex justify-between items-center text-[14px] font-nunito'>
                  <span className='text-[#6B7280]'>Extension Duration</span>
                  <span className='text-[#3FA344] font-medium'>3 days</span>
                </div>
                <div className='flex justify-between items-center text-[14px] font-nunito'>
                  <span className='text-[#6B7280]'>Daily Rate</span>
                  <span className='text-[#0A1413] font-medium'>$65.00</span>
                </div>
                <div className='flex justify-between items-center text-[14px] font-nunito'>
                  <span className='text-[#6B7280]'>Rental Cost</span>
                  <span className='text-[#0A1413] font-medium'>$45.00</span>
                </div>
                <div className='h-px bg-[#E5E7EB]' />
                <div className='flex justify-between items-center text-[14px] font-nunito'>
                  <span className='text-[#6B7280]'>Subtotal</span>
                  <span className='text-[#0A1413] font-medium'>$595.00</span>
                </div>
                <div className='flex justify-between items-center text-[14px] font-nunito'>
                  <span className='text-[#6B7280]'>Taxes & Fees (12%)</span>
                  <span className='text-[#0A1413] font-medium'>$71.40</span>
                </div>
                <div className='h-px bg-[#E5E7EB]' />
                <div className='flex justify-between items-center'>
                  <span className='text-[20px] font-semibold text-[#101828] font-lato'>
                    New Total
                  </span>
                  <div className='text-right'>
                    <p className='text-[24px] font-bold text-[#3FA344] font-lato'>$666.40</p>
                    <p className='text-[14px] font-nunito'>
                      <span className='text-[#6B7280]'>Previous: $485.00</span>
                      <span className='text-[#DC2626] ml-1'>(+$181.40)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className='flex gap-4 pt-4'>
              <button
                onClick={onClose}
                className='flex-1 border border-[#FF7815] rounded-[6px] py-3 text-[18px] font-bold text-[#FF7815] font-montserrat hover:bg-orange-50 transition-colors'
              >
                Cancel
              </button>
              <button className='flex-1 bg-[#3FA344] rounded-[6px] py-3 text-[18px] font-bold text-white font-montserrat hover:bg-[#358A3A] transition-colors shadow-sm'>
                Pay & Extend
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Re-using the car icon from other parts of the project if available, otherwise using standard lucide
const Car = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M12.6667 9.33333V4.66667C12.6667 4.31305 12.5262 3.97391 12.2762 3.72386C12.0261 3.47381 11.687 3.33333 11.3333 3.33333H4.66667C4.31305 3.33333 3.97391 3.47381 3.72386 3.72386C3.47381 3.97391 3.33333 4.31305 3.33333 4.66667V9.33333C3.33333 9.68695 3.47381 10.0261 3.72386 10.2761C3.97391 10.5262 4.31305 10.6667 4.66667 10.6667H11.3333C11.687 10.6667 12.0261 10.5262 12.2762 10.2761C12.5262 10.0261 12.6667 9.68695 12.6667 9.33333Z'
      stroke='currentColor'
      strokeWidth='1.2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M4.66667 10.6667V12'
      stroke='currentColor'
      strokeWidth='1.2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M11.3333 10.6667V12'
      stroke='currentColor'
      strokeWidth='1.2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M1.33333 6.66667H3.33333'
      stroke='currentColor'
      strokeWidth='1.2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M12.6667 6.66667H14.6667'
      stroke='currentColor'
      strokeWidth='1.2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState('Active Rentals');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ['Active Rentals', 'Upcoming', 'Past History'];

  const handleExtendClick = (booking: any) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  return (
    <div className='flex flex-col gap-6 p-10 w-full bg-white'>
      {/* Header Section */}
      <div className='border-b border-gray-200 pb-3 flex flex-col gap-0.5'>
        <h2 className='text-[14px] font-bold text-[#0A1413] font-montserrat'>My Bookings</h2>
        <p className='text-[12px] text-[#6B7280] font-lato'>
          Track all your car rental bookings in one place.
        </p>
      </div>

      {/* Menubar/Tabs */}
      <div className='bg-white border border-[#E5E7EB] p-1 rounded-[10px] flex items-center gap-1 w-fit'>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-[4px] text-[14px] font-bold font-lato transition-all ${
              activeTab === tab ? 'bg-[#EBF7ED] text-[#3FA344]' : 'text-[#0A1413] hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className='bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] overflow-hidden'>
        {/* Table Toolbar */}
        <div className='p-5 border-b border-[#E8ECF0] flex justify-end'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={12} />
            <input
              type='text'
              placeholder='Search bookings...'
              className='bg-[#F4F6F8] border border-[#E8ECF0] rounded-[8px] pl-8 pr-3 py-1.5 text-[10px] text-gray-500 w-[170px] outline-none focus:ring-1 focus:ring-[#3FA344]'
            />
          </div>
        </div>

        {/* Table Content */}
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-[#FAFBFC] border-y border-[#E8ECF0]'>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase'>
                  Image
                </th>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase'>
                  Booking ID
                </th>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase'>
                  Rental Agreement No
                </th>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase'>
                  Vehicle
                </th>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase'>
                  Start Date
                </th>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase'>
                  Return Date
                </th>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase'>
                  Location
                </th>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase'>
                  Amount
                </th>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase'>
                  Remaining Days
                </th>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase text-center'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-[#F4F6F8]'>
              {bookingsData.map((booking, index) => (
                <tr key={index} className='hover:bg-gray-50 transition-colors'>
                  <td className='px-3 py-2.5'>
                    <div className='relative w-10 h-7 rounded-[4px] overflow-hidden bg-gray-100'>
                      <Image
                        src={booking.image}
                        alt={booking.vehicle}
                        fill
                        className='object-cover'
                      />
                    </div>
                  </td>
                  <td className='px-3 py-2.5 text-[12px] text-[#0A1413] font-lato'>{booking.id}</td>
                  <td className='px-3 py-2.5 text-[12px] font-semibold text-[#0A1413] font-lato'>
                    {booking.agreementNo}
                  </td>
                  <td className='px-3 py-2.5 text-[12px] font-semibold text-[#0A1413] font-lato'>
                    {booking.vehicle}
                  </td>
                  <td className='px-3 py-2.5 text-[12px] text-[#6B7280] font-lato'>
                    {booking.startDate}
                  </td>
                  <td className='px-3 py-2.5 text-[12px] text-[#6B7280] font-lato'>
                    {booking.returnDate}
                  </td>
                  <td className='px-3 py-2.5 text-[12px] text-[#6B7280] font-lato'>
                    {booking.location}
                  </td>
                  <td className='px-3 py-2.5 text-[12px] text-[#6B7280] font-lato'>
                    {booking.amount}
                  </td>
                  <td className='px-3 py-2.5 text-[12px] text-[#6B7280] font-lato'>
                    {booking.remainingDays}
                  </td>
                  <td className='px-3 py-2.5'>
                    <div className='flex items-center justify-center gap-1'>
                      <button className='bg-[#F6F6F6] p-1.5 rounded-[5px] text-gray-500 hover:bg-gray-100 transition-colors'>
                        <Eye size={12} />
                      </button>
                      <button
                        onClick={() => handleExtendClick(booking)}
                        className='bg-[#EBF7ED] px-2 py-1.5 rounded-[5px] flex items-center gap-1.5 hover:bg-[#DDF0E2] transition-colors'
                      >
                        <Plus size={10} className='text-[#3FA344]' />
                        <span className='text-[8px] font-bold text-[#3FA344] font-nunito uppercase'>
                          Extend Booking
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className='p-5 border-t border-[#E8ECF0] flex items-center justify-between'>
          <p className='text-[10.5px] text-[#A0AEC0] font-lato'>Showing 1–7 of 12</p>
          <div className='flex items-center gap-1'>
            <button className='w-7 h-7 flex items-center justify-center rounded-[6px] bg-[#F6F6F6] text-gray-400 opacity-50 cursor-not-allowed'>
              <ChevronLeft size={12} />
            </button>
            <button className='w-7 h-7 flex items-center justify-center rounded-[6px] text-[12px] font-bold text-white shadow-md bg-gradient-to-br from-[#3FA34D] to-[#2E7A39]'>
              1
            </button>
            <button className='w-7 h-7 flex items-center justify-center rounded-[6px] text-[12px] text-[#6B7280] bg-[#F6F6F6] hover:bg-gray-100 font-lato'>
              2
            </button>
            <button className='w-7 h-7 flex items-center justify-center rounded-[6px] bg-[#F6F6F6] text-gray-400 hover:bg-gray-100 transition-colors'>
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Extension Modal */}
      {selectedBooking && (
        <ExtendBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          booking={selectedBooking}
        />
      )}
    </div>
  );
}
