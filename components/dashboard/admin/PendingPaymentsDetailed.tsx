'use client';

import { AlertCircle, CreditCard } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { TableSkeleton } from '@/components/ui/Skeleton';
import { BookingService, type BookingResponse } from '@/lib/api/booking.service';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);

export default function PendingPaymentsDetailed() {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    BookingService.getAllBookings({ limit: 100 })
      .then(setBookings)
      .finally(() => setLoading(false));
  }, []);

  const pending = useMemo(
    () =>
      bookings
        .map((booking) => ({
          ...booking,
          balance: Math.max(0, Number(booking.totalAmount) - Number(booking.amountPaid))
        }))
        .filter((booking) => booking.balance > 0)
        .sort((left, right) => new Date(left.dropOffDate).getTime() - new Date(right.dropOffDate).getTime()),
    [bookings]
  );
  const overdue = pending.filter((booking) => new Date(booking.dropOffDate) < new Date());
  const pendingTotal = pending.reduce((sum, booking) => sum + booking.balance, 0);

  if (loading) return <TableSkeleton rows={6} />;

  return (
    <section className='flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm'>
      <div className='mb-6 flex items-start justify-between'>
        <div>
          <h3 className='text-sm font-bold text-[#0A1413]'>Pending Payments</h3>
          <p className='text-xs text-gray-500'>{formatCurrency(pendingTotal)} outstanding</p>
        </div>
        <div className='flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs text-red-600'>
          <AlertCircle size={12} /> {overdue.length} overdue
        </div>
      </div>

      <div className='space-y-4'>
        {pending.slice(0, 6).map((booking) => (
          <div key={booking.id} className='flex items-center justify-between border-t border-gray-100 pt-4 first:border-0 first:pt-0'>
            <div className='flex items-center gap-3'>
              <div className='rounded-md bg-gray-100 p-2'><CreditCard size={13} /></div>
              <div>
                <p className='text-xs font-semibold'>{booking.user?.name ?? 'Customer'}</p>
                <p className='text-xs text-gray-500'>{booking.referenceId}</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-xs font-bold'>{formatCurrency(booking.balance)}</p>
              <p className='text-xs text-gray-500'>{new Date(booking.dropOffDate).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
        {pending.length === 0 && <p className='py-8 text-center text-sm text-gray-500'>No pending payments.</p>}
      </div>
    </section>
  );
}
