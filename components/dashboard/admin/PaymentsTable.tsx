'use client';

import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { TableSkeleton } from '@/components/ui/Skeleton';
import { PaymentService, type PaymentRecord } from '@/lib/api/payment.service';

const formatCurrency = (amount: string) =>
  new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(Number(amount));

export default function PaymentsTable() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PaymentService.getMyPayments()
      .then(setPayments)
      .catch((error: unknown) =>
        toast.error(error instanceof Error ? error.message : 'Unable to load payments')
      )
      .finally(() => setLoading(false));
  }, []);

  const filteredPayments = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return payments;
    return payments.filter((payment) =>
      [payment.booking.referenceId, payment.transactionId, payment.booking.vehicle.name]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search))
    );
  }, [payments, query]);

  if (loading) return <TableSkeleton rows={6} />;

  return (
    <section className='overflow-hidden rounded-xl border border-gray-200 bg-white'>
      <div className='flex justify-end border-b border-gray-200 p-4'>
        <label className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={14} />
          <span className='sr-only'>Search transactions</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Search transactions…'
            className='rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-xs'
          />
        </label>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full text-left text-xs'>
          <thead className='bg-gray-50 text-gray-500'>
            <tr>
              <th className='px-4 py-3'>Booking</th>
              <th className='px-4 py-3'>Vehicle</th>
              <th className='px-4 py-3'>Transaction</th>
              <th className='px-4 py-3'>Method</th>
              <th className='px-4 py-3'>Amount</th>
              <th className='px-4 py-3'>Status</th>
              <th className='px-4 py-3'>Date</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td className='px-4 py-3 font-semibold'>{payment.booking.referenceId}</td>
                <td className='px-4 py-3'>{payment.booking.vehicle.name}</td>
                <td className='px-4 py-3'>{payment.transactionId ?? 'Pending'}</td>
                <td className='px-4 py-3'>{payment.paymentMethod}</td>
                <td className='px-4 py-3'>{formatCurrency(payment.amount)}</td>
                <td className='px-4 py-3'>{payment.paymentStatus}</td>
                <td className='px-4 py-3'>{new Date(payment.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {filteredPayments.length === 0 && (
              <tr>
                <td colSpan={7} className='px-4 py-10 text-center text-gray-500'>
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
