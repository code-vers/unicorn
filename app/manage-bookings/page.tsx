'use client';

import {
  Calendar,
  Car,
  Check,
  ChevronRight,
  Loader2,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
  BookingModifyPayload,
  BookingResponse,
  BookingService,
} from '@/lib/api/booking.service';
import { SectionSkeleton, Skeleton } from '@/components/ui/Skeleton';

type BookingTab = 'All Bookings' | 'Upcoming' | 'Completed';

const tabs: BookingTab[] = ['All Bookings', 'Upcoming', 'Completed'];
const editableAddons = [
  { key: 'hasGps', label: 'GPS navigation' },
  { key: 'hasFullInsurance', label: 'Full insurance' },
  { key: 'hasAdditionalDriver', label: 'Additional driver' },
  { key: 'hasChildSeat', label: 'Child seat' },
] as const;

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const toDateTimeLocal = (value: string) => {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const statusClasses: Record<BookingResponse['bookingStatus'], string> = {
  PENDING: 'bg-amber-50 text-amber-700',
  CONFIRMED: 'bg-blue-50 text-blue-700',
  ONGOING: 'bg-emerald-50 text-emerald-700',
  COMPLETED: 'bg-slate-100 text-slate-600',
  CANCELLED: 'bg-red-50 text-red-700',
};

export default function ManageBookings() {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<BookingTab>('All Bookings');
  const [selectedBooking, setSelectedBooking] = useState<BookingResponse | null>(null);
  const [editingBooking, setEditingBooking] = useState<BookingResponse | null>(null);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const loadBookings = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await BookingService.getMyBookings({
        page: 1,
        limit: 100,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      });
      setBookings(data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load bookings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    BookingService.getMyBookings({
      page: 1,
      limit: 100,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    })
      .then(setBookings)
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load bookings');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredBookings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return bookings.filter((booking) => {
      const matchesTab =
        activeTab === 'All Bookings' ||
        (activeTab === 'Upcoming' &&
          ['PENDING', 'CONFIRMED', 'ONGOING'].includes(booking.bookingStatus)) ||
        (activeTab === 'Completed' &&
          ['COMPLETED', 'CANCELLED'].includes(booking.bookingStatus));
      const searchText = [
        booking.referenceId,
        booking.vehicle?.name,
        booking.vehicle?.category,
        booking.pickupLocation?.name,
        booking.dropOffLocation?.name,
        booking.bookingStatus,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return matchesTab && (!normalizedQuery || searchText.includes(normalizedQuery));
    });
  }, [activeTab, bookings, query]);

  const openDetails = async (booking: BookingResponse) => {
    setSelectedBooking(booking);
    setIsFetchingDetails(true);
    try {
      setSelectedBooking(await BookingService.getBookingById(booking.id));
    } catch (requestError) {
      toast.error(requestError instanceof Error ? requestError.message : 'Unable to load booking');
    } finally {
      setIsFetchingDetails(false);
    }
  };

  const handleModify = async (payload: BookingModifyPayload) => {
    if (!editingBooking) return;
    setIsSaving(true);
    try {
      const updated = await BookingService.modifyBooking(editingBooking.id, payload);
      setBookings((current) =>
        current.map((booking) =>
          booking.id === editingBooking.id ? { ...booking, ...updated } : booking,
        ),
      );
      setEditingBooking(null);
      toast.success('Booking updated successfully');
      await loadBookings();
    } catch (requestError) {
      toast.error(requestError instanceof Error ? requestError.message : 'Unable to update booking');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className='min-h-screen bg-[#f8fafc] px-4 py-10 font-sans text-[#0f172a] sm:px-8'>
      <div className='mx-auto max-w-[1280px]'>
        <div className='mb-8'>
          <h1 className='mb-2 text-3xl font-bold text-[#0f172a] sm:text-[32px]'>Manage Your Bookings</h1>
          <p className='text-[15px] text-[#64748b]'>View and manage all your car rental reservations</p>
        </div>

        <div className='mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
          <label className='relative block w-full max-w-[520px]'>
            <span className='sr-only'>Search bookings</span>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]' size={20} />
            <input
              type='search'
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Search by car, reference, location, or status...'
              className='h-[52px] w-full rounded-lg border border-[#cbd5e1] bg-white pl-12 pr-4 text-sm font-medium text-[#0f172a] shadow-sm outline-none placeholder:font-normal placeholder:text-[#64748b] focus:border-[#43a047] focus:ring-2 focus:ring-[#43a047]/20'
            />
          </label>
          <button
            onClick={() => void loadBookings()}
            disabled={isLoading}
            className='inline-flex h-11 items-center justify-center gap-2 self-start rounded-lg border border-[#cbd5e1] bg-white px-4 text-sm font-semibold text-[#334155] hover:bg-[#f1f5f9] disabled:opacity-60'
          >
            <SlidersHorizontal size={17} /> Refresh
          </button>
        </div>

        <div className='mb-8 flex overflow-x-auto border-b border-[#e2e8f0]' role='tablist'>
          {tabs.map((tab) => (
            <button
              key={tab}
              role='tab'
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap border-b-2 px-6 py-3 text-sm font-semibold transition-colors sm:px-10 ${
                activeTab === tab
                  ? 'border-[#43a047] bg-[#43a047] text-white'
                  : 'border-transparent text-[#475569] hover:border-[#43a047] hover:text-[#2e7d32]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {isLoading ? (
          <SectionSkeleton rows={5} />
        ) : error ? (
          <div className='rounded-2xl border border-red-200 bg-white p-10 text-center'>
            <p className='font-semibold text-red-700'>{error}</p>
            <p className='mt-2 text-sm text-[#64748b]'>Please sign in again or check that the booking service is running.</p>
            <button onClick={() => void loadBookings()} className='mt-5 rounded-lg bg-[#43a047] px-5 py-2.5 text-sm font-bold text-white'>Try Again</button>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className='rounded-2xl border border-[#e2e8f0] bg-white p-12 text-center'>
            <Car className='mx-auto mb-4 text-[#94a3b8]' size={42} />
            <h2 className='text-lg font-bold text-[#1e293b]'>No bookings found</h2>
            <p className='mt-1 text-sm text-[#64748b]'>Try another search or booking category.</p>
          </div>
        ) : (
          <div className='space-y-5'>
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onDetails={() => void openDetails(booking)}
                onModify={() => setEditingBooking(booking)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          isLoading={isFetchingDetails}
          onClose={() => setSelectedBooking(null)}
          onModify={() => {
            setEditingBooking(selectedBooking);
            setSelectedBooking(null);
          }}
        />
      )}
      {editingBooking && (
        <ModifyBookingModal
          booking={editingBooking}
          isSaving={isSaving}
          onClose={() => setEditingBooking(null)}
          onSubmit={handleModify}
        />
      )}
    </main>
  );
}

function BookingCard({
  booking,
  onDetails,
  onModify,
}: {
  booking: BookingResponse;
  onDetails: () => void;
  onModify: () => void;
}) {
  const canModify = ['PENDING', 'CONFIRMED', 'ONGOING'].includes(booking.bookingStatus);

  return (
    <article className='flex flex-col gap-6 rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm lg:flex-row lg:p-7'>
      <div className='relative min-h-[180px] w-full shrink-0 overflow-hidden rounded-xl bg-[#f8fafc] p-4 lg:w-[260px]'>
        <Image
          src='/product/car.png'
          alt={booking.vehicle?.name || 'Rental vehicle'}
          fill
          sizes='(max-width: 1023px) 100vw, 260px'
          className='object-contain p-4'
        />
      </div>
      <div className='min-w-0 flex-1'>
        <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
          <div>
            <div className='mb-1 flex flex-wrap items-center gap-3'>
              <h2 className='text-xl font-bold text-[#1e293b]'>{booking.vehicle?.name || 'Reserved Vehicle'}</h2>
              <span className={`rounded px-2.5 py-1 text-[11px] font-bold tracking-wide ${statusClasses[booking.bookingStatus]}`}>
                {booking.bookingStatus}
              </span>
            </div>
            <p className='flex flex-wrap items-center gap-2 text-sm text-[#64748b]'>
              <Car size={17} />
              {booking.vehicle?.category || 'Rental vehicle'} • Ref: {booking.referenceId}
            </p>
          </div>
          <div className='text-left sm:text-right'>
            <p className='text-2xl font-extrabold text-[#43a047]'>Ksh {Number(booking.totalAmount).toLocaleString()}</p>
            <p className='text-xs font-medium text-[#64748b]'>Total price</p>
          </div>
        </div>

        <div className='mb-6 grid grid-cols-1 gap-6 border-b border-[#e2e8f0] pb-6 sm:grid-cols-2'>
          <BookingPoint label='Pickup' date={booking.pickupDate} location={booking.pickupLocation?.name || 'Pickup location'} orange />
          <BookingPoint label='Return' date={booking.dropOffDate} location={booking.dropOffLocation?.name || 'Return location'} />
        </div>

        <div className='flex flex-col gap-3 sm:flex-row sm:justify-end'>
          <button onClick={onDetails} className='inline-flex h-11 items-center justify-center gap-1 rounded-lg border-2 border-[#ff8f00] px-6 text-sm font-bold text-[#b45309] hover:bg-[#ff8f00] hover:text-white'>
            View Details <ChevronRight size={16} />
          </button>
          {canModify && (
            <button onClick={onModify} className='h-11 rounded-lg bg-[#43a047] px-6 text-sm font-bold text-white shadow-sm hover:bg-[#388e3c]'>
              Modify Booking
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function BookingPoint({ label, date, location, orange = false }: { label: string; date: string; location: string; orange?: boolean }) {
  return (
    <div className='flex items-start gap-3'>
      <span className={`rounded-lg p-2 ${orange ? 'bg-[#fff4e5] text-[#ff8f00]' : 'bg-[#e8f5e9] text-[#43a047]'}`}><Calendar size={19} /></span>
      <div>
        <p className='text-sm font-bold text-[#1e293b]'>{label}</p>
        <p className='text-sm font-medium text-[#475569]'>{formatDateTime(date)}</p>
        <p className='mt-2 flex items-center gap-1.5 text-sm text-[#475569]'><MapPin size={15} />{location}</p>
      </div>
    </div>
  );
}

function ModalShell({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-[#0f172a]/60 p-4' role='dialog' aria-modal='true'>
      <div className='max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl'>
        <div className='sticky top-0 z-10 flex items-center justify-between border-b border-[#e2e8f0] bg-white px-6 py-4'>
          <h2 className='text-xl font-bold text-[#0f172a]'>{title}</h2>
          <button onClick={onClose} aria-label='Close dialog' className='rounded-lg p-2 text-[#475569] hover:bg-[#f1f5f9]'><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function BookingDetailsModal({ booking, isLoading, onClose, onModify }: { booking: BookingResponse; isLoading: boolean; onClose: () => void; onModify: () => void }) {
  return (
    <ModalShell title={`Booking ${booking.referenceId}`} onClose={onClose}>
      <div className='space-y-6 p-6 text-[#0f172a]'>
        {isLoading && (
          <div className='space-y-2' role='status' aria-label='Refreshing booking details'>
            <Skeleton className='h-4 w-48' />
            <Skeleton className='h-3 w-72 max-w-full' />
          </div>
        )}
        <div className='flex flex-wrap items-start justify-between gap-4'>
          <div>
            <h3 className='text-lg font-bold'>{booking.vehicle?.name || 'Reserved Vehicle'}</h3>
            <p className='text-sm text-[#64748b]'>{booking.vehicle?.category || 'Rental vehicle'}</p>
          </div>
          <span className={`rounded px-3 py-1 text-xs font-bold ${statusClasses[booking.bookingStatus]}`}>{booking.bookingStatus}</span>
        </div>
        <div className='grid gap-5 rounded-xl bg-[#f8fafc] p-5 sm:grid-cols-2'>
          <BookingPoint label='Pickup' date={booking.pickupDate} location={booking.pickupLocation?.name || 'Pickup location'} orange />
          <BookingPoint label='Return' date={booking.dropOffDate} location={booking.dropOffLocation?.name || 'Return location'} />
        </div>
        <dl className='grid grid-cols-2 gap-4 text-sm'>
          <div><dt className='text-[#64748b]'>Payment</dt><dd className='font-bold'>{booking.paymentStatus}</dd></div>
          <div><dt className='text-[#64748b]'>Amount paid</dt><dd className='font-bold'>Ksh {Number(booking.amountPaid).toLocaleString()}</dd></div>
          <div><dt className='text-[#64748b]'>Rental cost</dt><dd className='font-bold'>Ksh {Number(booking.rentalCost).toLocaleString()}</dd></div>
          <div><dt className='text-[#64748b]'>Total amount</dt><dd className='font-bold text-[#43a047]'>Ksh {Number(booking.totalAmount).toLocaleString()}</dd></div>
        </dl>
        <div>
          <p className='mb-3 text-sm font-bold'>Add-ons</p>
          <div className='flex flex-wrap gap-2'>
            {editableAddons.filter(({ key }) => booking[key]).map(({ key, label }) => (
              <span key={key} className='inline-flex items-center gap-1 rounded-full bg-[#e8f5e9] px-3 py-1 text-xs font-semibold text-[#2e7d32]'><Check size={13} />{label}</span>
            ))}
            {!editableAddons.some(({ key }) => booking[key]) && <span className='text-sm text-[#64748b]'>No add-ons selected</span>}
          </div>
        </div>
        <div className='flex justify-end gap-3 border-t border-[#e2e8f0] pt-5'>
          <button onClick={onClose} className='rounded-lg border border-[#cbd5e1] px-5 py-2.5 text-sm font-bold text-[#334155]'>Close</button>
          {['PENDING', 'CONFIRMED', 'ONGOING'].includes(booking.bookingStatus) && (
            <button onClick={onModify} className='rounded-lg bg-[#43a047] px-5 py-2.5 text-sm font-bold text-white'>Modify Booking</button>
          )}
        </div>
      </div>
    </ModalShell>
  );
}

function ModifyBookingModal({ booking, isSaving, onClose, onSubmit }: { booking: BookingResponse; isSaving: boolean; onClose: () => void; onSubmit: (payload: BookingModifyPayload) => Promise<void> }) {
  const [dropOffDate, setDropOffDate] = useState(toDateTimeLocal(booking.dropOffDate));
  const [addons, setAddons] = useState<Required<Omit<BookingModifyPayload, 'dropOffDate'>>>({
    hasGps: booking.hasGps,
    hasFullInsurance: booking.hasFullInsurance,
    hasAdditionalDriver: booking.hasAdditionalDriver,
    hasChildSeat: booking.hasChildSeat,
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (new Date(dropOffDate) <= new Date(booking.pickupDate)) {
      toast.error('Return date must be after the pickup date');
      return;
    }
    void onSubmit({ dropOffDate: new Date(dropOffDate).toISOString(), ...addons });
  };

  return (
    <ModalShell title='Modify Booking' onClose={onClose}>
      <form onSubmit={submit} className='space-y-6 p-6 text-[#0f172a]'>
        <div>
          <label htmlFor='dropOffDate' className='mb-2 block text-sm font-bold text-[#1e293b]'>Return date and time</label>
          <input
            id='dropOffDate'
            type='datetime-local'
            value={dropOffDate}
            min={toDateTimeLocal(booking.pickupDate)}
            onChange={(event) => setDropOffDate(event.target.value)}
            required
            className='h-12 w-full rounded-lg border border-[#94a3b8] bg-white px-4 text-base font-medium text-[#0f172a] outline-none [color-scheme:light] focus:border-[#43a047] focus:ring-2 focus:ring-[#43a047]/20'
          />
          <p className='mt-2 text-xs text-[#64748b]'>Changing the return date recalculates availability and pricing.</p>
        </div>
        <fieldset>
          <legend className='mb-3 text-sm font-bold text-[#1e293b]'>Add-ons</legend>
          <div className='grid gap-3 sm:grid-cols-2'>
            {editableAddons.map(({ key, label }) => (
              <label key={key} className='flex cursor-pointer items-center gap-3 rounded-lg border border-[#cbd5e1] bg-white p-4 text-sm font-semibold text-[#334155]'>
                <input
                  type='checkbox'
                  checked={addons[key]}
                  onChange={(event) => setAddons((current) => ({ ...current, [key]: event.target.checked }))}
                  className='size-4 accent-[#43a047]'
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className='flex justify-end gap-3 border-t border-[#e2e8f0] pt-5'>
          <button type='button' onClick={onClose} disabled={isSaving} className='rounded-lg border border-[#cbd5e1] px-5 py-2.5 text-sm font-bold text-[#334155]'>Cancel</button>
          <button type='submit' disabled={isSaving} className='inline-flex min-w-36 items-center justify-center gap-2 rounded-lg bg-[#43a047] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60'>
            {isSaving && <Loader2 className='animate-spin' size={16} />} Save Changes
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
