'use client';

import { CheckCircle2, ReceiptText, Search, Wallet } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { PageSkeleton } from '@/components/ui/Skeleton';
import { PaymentService, type PaymentRecord } from '@/lib/api/payment.service';

const formatCurrency = (value: string | number) =>
  new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(Number(value));

export default function Payments() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PaymentService.getMyPayments()
      .then(setPayments)
      .catch((error: unknown) => {
        toast.error(error instanceof Error ? error.message : 'Unable to load payments');
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredPayments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return payments;
    return payments.filter((payment) =>
      [payment.booking.referenceId, payment.transactionId, payment.booking.vehicle.name]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery))
    );
  }, [payments, query]);

  const paidTotal = payments
    .filter((payment) => payment.paymentStatus === 'SUCCESS')
    .reduce((sum, payment) => sum + Number(payment.amount), 0);
  const successfulPayments = payments.filter((payment) => payment.paymentStatus === 'SUCCESS').length;

  if (loading) return <PageSkeleton />;

  return (
    <div className='min-h-screen space-y-8 bg-white p-6 lg:p-10'>
      <header className='border-b border-[#E5E7EB] pb-3'>
        <h2 className='text-sm font-bold uppercase tracking-wider text-[#0A1413]'>Payments</h2>
        <p className='text-xs text-[#6B7280]'>View your secure payment history.</p>
      </header>

      <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
        {[
          { label: 'Total paid', value: formatCurrency(paidTotal), icon: Wallet },
          { label: 'Successful', value: String(successfulPayments), icon: CheckCircle2 },
          { label: 'Transactions', value: String(payments.length), icon: ReceiptText }
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className='rounded-2xl border border-[#D3D3D3] p-5'>
            <Icon className='mb-3 text-[#3FA34D]' size={20} />
            <p className='text-2xl font-bold text-[#0A1413]'>{value}</p>
            <p className='text-xs font-bold uppercase text-[#6B7280]'>{label}</p>
          </div>
        ))}
      </div>

      <section className='overflow-hidden rounded-2xl border border-[#E5E7EB]'>
        <div className='flex justify-end border-b border-[#E8ECF0] p-5'>
          <label className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={14} />
            <span className='sr-only'>Search payments</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Search payments…'
              className='rounded-lg border border-[#E8ECF0] bg-[#F4F6F8] py-2 pl-9 pr-3 text-xs outline-none'
            />
          </label>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full text-left text-xs'>
            <thead className='bg-[#FAFBFC] text-[#718096]'>
              <tr>
                <th className='px-4 py-3'>Booking</th>
                <th className='px-4 py-3'>Vehicle</th>
                <th className='px-4 py-3'>Transaction</th>
                <th className='px-4 py-3'>Date</th>
                <th className='px-4 py-3'>Method</th>
                <th className='px-4 py-3'>Amount</th>
                <th className='px-4 py-3'>Status</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-[#F4F6F8]'>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className='px-4 py-3 font-semibold'>{payment.booking.referenceId}</td>
                  <td className='px-4 py-3'>{payment.booking.vehicle.name}</td>
                  <td className='px-4 py-3'>{payment.transactionId ?? 'Pending'}</td>
                  <td className='px-4 py-3'>{new Date(payment.createdAt).toLocaleDateString()}</td>
                  <td className='px-4 py-3'>{payment.paymentMethod}</td>
                  <td className='px-4 py-3'>{formatCurrency(payment.amount)}</td>
                  <td className='px-4 py-3'>{payment.paymentStatus}</td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={7} className='px-4 py-10 text-center text-[#6B7280]'>
                    No payment transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
