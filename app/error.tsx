'use client';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className='flex min-h-[60vh] flex-col items-center justify-center px-6 text-center'>
      <h1 className='text-3xl font-bold text-slate-900'>Something went wrong</h1>
      <p className='mt-3 text-slate-600'>The page could not be loaded. Please try again.</p>
      <button onClick={reset} className='mt-6 rounded-lg bg-[#3FA34D] px-6 py-3 font-semibold text-white'>
        Try again
      </button>
    </main>
  );
}
