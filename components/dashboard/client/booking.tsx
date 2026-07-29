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
import { useState, useMemo } from 'react';
import { useBookings } from '@/hooks/useBookings';
import { BookingResponse, BookingService } from '@/lib/api/booking.service';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

interface ExtendBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingResponse;
  onSuccess: () => void;
}

const ExtendBookingModal = ({ isOpen, onClose, booking, onSuccess }: ExtendBookingModalProps) => {
  const [extensionDays, setExtensionDays] = useState(1);
  const [isExtending, setIsExtending] = useState(false);

  if (!isOpen || !booking) return null;

  // Calculate pricing
  const dailyRate = Number(booking.rentalCost) / ((new Date(booking.dropOffDate).getTime() - new Date(booking.pickupDate).getTime()) / (1000 * 3600 * 24));
  const extensionCost = dailyRate * extensionDays;
  const taxAmount = extensionCost * (Number(booking.taxPercentage) / 100);
  const newTotal = extensionCost + taxAmount;
  
  const currentTotal = Number(booking.totalAmount);
  const updatedTotal = currentTotal + newTotal;

  const handleExtend = async () => {
    setIsExtending(true);
    try {
      // Bypassing actual payment step per requirements
      await BookingService.extendPayment(booking.id, {
        amount: newTotal,
        paymentMethod: 'LATER',
        transactionId: 'EXT-' + Date.now(),
        additionalDays: extensionDays
      });
      toast.success('Booking extension request submitted successfully!');
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error?.message || 'Failed to extend booking');
    } finally {
      setIsExtending(false);
    }
  };

  const newReturnDate = new Date(booking.dropOffDate);
  newReturnDate.setDate(newReturnDate.getDate() + extensionDays);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
      <div className='bg-white rounded-[12px] border border-[#E5E7EB] shadow-2xl w-full max-w-[720px] max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200'>
        <button
          onClick={onClose}
          className='absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-600 transition-colors'
        >
          <X size={20} />
        </button>

        <div className='p-10 space-y-8'>
          <div className='space-y-2'>
            <h3 className='text-[20px] font-bold text-[#0A1413] font-montserrat'>
              Extend Your Booking
            </h3>
            <p className='text-[14px] text-[#4A5565] font-inter'>
              Extend your current rental period securely.
              <br />
              Reference: {booking.referenceId}
            </p>
          </div>

          <div className='bg-[#F6F6F6] border border-[#E5E7EB] rounded-[12px] p-5 flex items-center gap-5'>
            <div className='relative w-32 h-24 flex-shrink-0'>
              <Image src={'/product/car.png'} alt="Vehicle" fill className='object-contain' />
            </div>
            <div className='space-y-2'>
              <h4 className='text-[20px] font-bold text-[#0A1413] font-montserrat'>
                Vehicle Details
              </h4>
              <div className='flex items-center gap-2 text-[14px] text-[#4A5565] font-inter'>
                <span>Ref: {booking.referenceId}</span>
              </div>
            </div>
          </div>

          <div className='space-y-6'>
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
                    {new Date(booking.dropOffDate).toLocaleDateString()}
                  </div>
                </div>
                <div className='space-y-2'>
                  <label className='text-[14px] font-normal text-[#0A1413] font-nunito'>Rate</label>
                  <div className='bg-[#F6F6F6] border border-[#E5E7EB] rounded-[4px] px-3 py-2 text-[14px] text-[#0A1413] font-nunito'>
                    ${Number(booking.totalAmount).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <hr className='border-[#E5E7EB]' />

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
                  min={1}
                  value={extensionDays}
                  onChange={(e) => setExtensionDays(Math.max(1, parseInt(e.target.value) || 1))}
                  className='w-full bg-[#F6F6F6] border border-[#E5E7EB] rounded-[4px] px-3 py-2 text-[14px] text-[#0A1413] font-nunito focus:outline-none focus:ring-1 focus:ring-[#3FA344]'
                />
              </div>
              <div className='bg-[#F6F6F6] rounded-[6px] p-3 flex items-center gap-3'>
                <div className='bg-[#EBF7ED] rounded-[6px] w-10 h-10 flex items-center justify-center'>
                  <Calendar className='w-4 h-4 text-[#3FA344]' />
                </div>
                <div>
                  <p className='text-[10px] text-[#6B7280] font-lato'>New Return Date</p>
                  <p className='text-[14px] font-normal text-[#0A1413] font-nunito'>{newReturnDate.toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <hr className='border-[#E5E7EB]' />

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
                  <span className='text-[#6B7280]'>Base Rental</span>
                  <span className='text-[#0A1413] font-medium'>${currentTotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between items-center text-[14px] font-nunito'>
                  <span className='text-[#6B7280]'>Extension Duration</span>
                  <span className='text-[#3FA344] font-medium'>{extensionDays} days</span>
                </div>
                <div className='flex justify-between items-center text-[14px] font-nunito'>
                  <span className='text-[#6B7280]'>Daily Rate</span>
                  <span className='text-[#0A1413] font-medium'>${dailyRate.toFixed(2)}</span>
                </div>
                <div className='flex justify-between items-center text-[14px] font-nunito'>
                  <span className='text-[#6B7280]'>Extension Cost</span>
                  <span className='text-[#0A1413] font-medium'>${extensionCost.toFixed(2)}</span>
                </div>
                <div className='h-px bg-[#E5E7EB]' />
                <div className='flex justify-between items-center text-[14px] font-nunito'>
                  <span className='text-[#6B7280]'>Taxes ({booking.taxPercentage}%)</span>
                  <span className='text-[#0A1413] font-medium'>${taxAmount.toFixed(2)}</span>
                </div>
                <div className='h-px bg-[#E5E7EB]' />
                <div className='flex justify-between items-center'>
                  <span className='text-[20px] font-semibold text-[#101828] font-lato'>
                    New Total
                  </span>
                  <div className='text-right'>
                    <p className='text-[24px] font-bold text-[#3FA344] font-lato'>${updatedTotal.toFixed(2)}</p>
                    <p className='text-[14px] font-nunito'>
                      <span className='text-[#6B7280]'>Previous: ${currentTotal.toFixed(2)}</span>
                      <span className='text-[#DC2626] ml-1'>(+${newTotal.toFixed(2)})</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-4 pt-4'>
              <button
                onClick={onClose}
                className='flex-1 border border-[#FF7815] rounded-[6px] py-3 text-[18px] font-bold text-[#FF7815] font-montserrat hover:bg-orange-50 transition-colors'
              >
                Cancel
              </button>
              <button 
                onClick={handleExtend}
                disabled={isExtending}
                className='flex-1 bg-[#3FA344] rounded-[6px] py-3 text-[18px] font-bold text-white font-montserrat hover:bg-[#358A3A] transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center'
              >
                {isExtending ? <Spinner size="sm" /> : 'Request Extension'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MyBookings() {
  const { bookings, isLoading, refresh } = useBookings();
  const [activeTab, setActiveTab] = useState('Active Rentals');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<BookingResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const tabs = ['Active Rentals', 'Upcoming', 'Past History'];

  const filteredBookings = useMemo(() => {
    const today = new Date().getTime();
    
    let filtered = bookings;

    // Filter by tab
    if (activeTab === 'Active Rentals') {
      filtered = filtered.filter(b => b.bookingStatus === 'CONFIRMED' || b.bookingStatus === 'ONGOING');
    } else if (activeTab === 'Upcoming') {
      filtered = filtered.filter(b => b.bookingStatus === 'PENDING' && new Date(b.pickupDate).getTime() > today);
    } else if (activeTab === 'Past History') {
      filtered = filtered.filter(b => b.bookingStatus === 'COMPLETED' || b.bookingStatus === 'CANCELLED');
    }

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(b => b.referenceId.toLowerCase().includes(q));
    }

    return filtered;
  }, [bookings, activeTab, searchQuery]);

  const paginatedBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const handleExtendClick = (booking: BookingResponse) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const calculateRemainingDays = (dropOffDate: string) => {
    const today = new Date().getTime();
    const dropOff = new Date(dropOffDate).getTime();
    const diff = dropOff - today;
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6 p-10 w-full'>
      <div className='border-b border-gray-200 pb-3 flex flex-col gap-0.5'>
        <h2 className='text-[14px] font-bold text-[#0A1413] font-montserrat'>My Bookings</h2>
        <p className='text-[12px] text-[#6B7280] font-lato'>
          Track all your car rental bookings in one place.
        </p>
      </div>

      <div className='bg-white border border-[#E5E7EB] p-1 rounded-[10px] flex items-center gap-1 w-fit'>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
            className={`px-4 py-1.5 rounded-[4px] text-[14px] font-bold font-lato transition-all ${
              activeTab === tab ? 'bg-[#EBF7ED] text-[#3FA344]' : 'text-[#0A1413] hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className='bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] overflow-hidden'>
        <div className='p-5 border-b border-[#E8ECF0] flex justify-end'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={12} />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search by Reference...'
              className='bg-[#F4F6F8] border border-[#E8ECF0] rounded-[8px] pl-8 pr-3 py-1.5 text-[10px] text-gray-500 w-[170px] outline-none focus:ring-1 focus:ring-[#3FA344]'
            />
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-[#FAFBFC] border-y border-[#E8ECF0]'>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase'>Image</th>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase'>Reference ID</th>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase'>Start Date</th>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase'>Return Date</th>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase'>Status</th>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase'>Amount</th>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase'>Remaining Days</th>
                <th className='px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase text-center'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-[#F4F6F8]'>
              {paginatedBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-3 py-8 text-center text-sm text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((booking, index) => (
                  <tr key={booking.id} className='hover:bg-gray-50 transition-colors'>
                    <td className='px-3 py-2.5'>
                      <div className='relative w-10 h-7 rounded-[4px] overflow-hidden bg-gray-100'>
                        <Image src={'/product/car.png'} alt="Vehicle" fill className='object-cover' />
                      </div>
                    </td>
                    <td className='px-3 py-2.5 text-[12px] font-semibold text-[#0A1413] font-lato'>{booking.referenceId}</td>
                    <td className='px-3 py-2.5 text-[12px] text-[#6B7280] font-lato'>{new Date(booking.pickupDate).toLocaleDateString()}</td>
                    <td className='px-3 py-2.5 text-[12px] text-[#6B7280] font-lato'>{new Date(booking.dropOffDate).toLocaleDateString()}</td>
                    <td className='px-3 py-2.5 text-[12px] text-[#6B7280] font-lato'>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        booking.bookingStatus === 'CONFIRMED' || booking.bookingStatus === 'ONGOING' ? 'bg-[#EBF7ED] text-[#3FA344]' :
                        booking.bookingStatus === 'COMPLETED' ? 'bg-gray-100 text-gray-600' :
                        booking.bookingStatus === 'CANCELLED' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'
                      }`}>
                        {booking.bookingStatus}
                      </span>
                    </td>
                    <td className='px-3 py-2.5 text-[12px] text-[#6B7280] font-lato'>${Number(booking.totalAmount).toFixed(2)}</td>
                    <td className='px-3 py-2.5 text-[12px] text-[#6B7280] font-lato'>
                      {activeTab === 'Active Rentals' ? calculateRemainingDays(booking.dropOffDate) : '-'}
                    </td>
                    <td className='px-3 py-2.5'>
                      <div className='flex items-center justify-center gap-1'>
                        <button className='bg-[#F6F6F6] p-1.5 rounded-[5px] text-gray-500 hover:bg-gray-100 transition-colors'>
                          <Eye size={12} />
                        </button>
                        {activeTab === 'Active Rentals' && (
                          <button
                            onClick={() => handleExtendClick(booking)}
                            className='bg-[#EBF7ED] px-2 py-1.5 rounded-[5px] flex items-center gap-1.5 hover:bg-[#DDF0E2] transition-colors'
                          >
                            <Plus size={10} className='text-[#3FA344]' />
                            <span className='text-[8px] font-bold text-[#3FA344] font-nunito uppercase'>
                              Extend Booking
                            </span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        {totalPages > 1 && (
          <div className='p-5 border-t border-[#E8ECF0] flex items-center justify-between'>
            <p className='text-[10.5px] text-[#A0AEC0] font-lato'>
              Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length}
            </p>
            <div className='flex items-center gap-1'>
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className='w-7 h-7 flex items-center justify-center rounded-[6px] bg-[#F6F6F6] text-gray-400 hover:bg-gray-100 disabled:opacity-50 transition-colors'
              >
                <ChevronLeft size={12} />
              </button>
              
              <button className='w-7 h-7 flex items-center justify-center rounded-[6px] text-[12px] font-bold text-white shadow-md bg-gradient-to-br from-[#3FA34D] to-[#2E7A39]'>
                {currentPage}
              </button>
              
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className='w-7 h-7 flex items-center justify-center rounded-[6px] bg-[#F6F6F6] text-gray-400 hover:bg-gray-100 disabled:opacity-50 transition-colors'
              >
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && selectedBooking && (
        <ExtendBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          booking={selectedBooking}
          onSuccess={refresh}
        />
      )}
    </div>
  );
}
