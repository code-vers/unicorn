'use client';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang='en'>
      <body>
        <main className='flex min-h-screen flex-col items-center justify-center px-6 text-center'>
          <h1 className='text-3xl font-bold'>Unicorn is temporarily unavailable</h1>
          <button onClick={reset} className='mt-6 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white'>
            Retry
          </button>
        </main>
      </body>
    </html>
  );
}
