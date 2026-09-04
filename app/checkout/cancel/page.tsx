'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';

import { Spinner } from '@/components/ui/Spinner';
import { SectionSkeleton } from '@/components/ui/Skeleton';
import { BookingService } from '@/lib/api/booking.service';

function CheckoutCancelledContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('booking_id');
  const bookingReference = searchParams.get('booking');
  const cancellationStarted = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(Boolean(bookingId));

  useEffect(() => {
    if (!bookingId || cancellationStarted.current) return;
    cancellationStarted.current = true;
    let isMounted = true;

    BookingService.cancelCheckout(bookingId)
      .catch((requestError: unknown) => {
        if (!isMounted) return;
        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Unable to release the reservation automatically.'
        );
      })
      .finally(() => {
        if (isMounted) setIsCancelling(false);
      });

    return () => {
      isMounted = false;
    };
  }, [bookingId]);

  return (
    <main className='mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center bg-white px-6 text-center'>
      <h1 className='text-3xl font-bold text-slate-900'>Payment cancelled</h1>
      {isCancelling ? (
        <div className='mt-5 flex items-center gap-3 text-slate-600'>
          <Spinner size='sm' />
          Releasing the temporary vehicle hold…
        </div>
      ) : error ? (
        <p className='mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700'>{error}</p>
      ) : (
        <p className='mt-4 text-slate-600'>
          {bookingId
            ? `No booking${bookingReference ? ` ${bookingReference}` : ''} was confirmed, and the vehicle hold has been released.`
            : 'No payment was taken. Your existing confirmed booking has not changed.'}
        </p>
      )}
      <Link
        href='/product'
        className='mt-8 rounded-lg bg-[#3FA34D] px-6 py-3 font-semibold text-white hover:bg-[#358A3A]'
      >
        Choose a vehicle
      </Link>
    </main>
  );
}

export default function CheckoutCancelledPage() {
  return (
    <Suspense fallback={<SectionSkeleton className='mx-auto my-20 max-w-2xl' rows={3} />}>
      <CheckoutCancelledContent />
    </Suspense>
  );
}
