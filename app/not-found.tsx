import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='flex min-h-[60vh] flex-col items-center justify-center px-6 text-center'>
      <h1 className='text-4xl font-bold text-slate-900'>Page not found</h1>
      <p className='mt-3 text-slate-600'>The page you requested does not exist.</p>
      <Link href='/' className='mt-6 rounded-lg bg-[#3FA34D] px-6 py-3 font-semibold text-white'>
        Return home
      </Link>
    </main>
  );
}
