import type { HTMLAttributes } from 'react';

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden='true'
      className={`animate-pulse rounded-md bg-slate-200 ${className}`}
      {...props}
    />
  );
}

export function PageSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`min-h-[70vh] w-full bg-white p-6 sm:p-8 lg:p-10 ${className}`}
      role='status'
      aria-label='Loading page'
    >
      <span className='sr-only'>Loading…</span>
      <div className='mx-auto w-full max-w-7xl space-y-8'>
        <div className='space-y-3'>
          <Skeleton className='h-8 w-56' />
          <Skeleton className='h-4 w-full max-w-md' />
        </div>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4'>
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className='rounded-2xl border border-slate-200 bg-white p-5'>
              <Skeleton className='mb-5 h-10 w-10 rounded-xl' />
              <Skeleton className='mb-3 h-7 w-24' />
              <Skeleton className='h-4 w-32' />
            </div>
          ))}
        </div>
        <SectionSkeleton rows={5} />
      </div>
    </div>
  );
}

export function SectionSkeleton({ rows = 4, className = '' }: { rows?: number; className?: string }) {
  return (
    <div
      className={`w-full rounded-2xl border border-slate-200 bg-white p-5 ${className}`}
      role='status'
      aria-label='Loading content'
    >
      <span className='sr-only'>Loading…</span>
      <div className='mb-6 flex items-center justify-between gap-4'>
        <Skeleton className='h-6 w-44' />
        <Skeleton className='h-9 w-28' />
      </div>
      <div className='space-y-4'>
        {Array.from({ length: rows }, (_, index) => (
          <div key={index} className='flex items-center gap-4'>
            <Skeleton className='h-10 w-10 shrink-0 rounded-full' />
            <div className='flex-1 space-y-2'>
              <Skeleton className='h-4 w-2/3' />
              <Skeleton className='h-3 w-1/3' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardGridSkeleton({ cards = 4 }: { cards?: number }) {
  return (
    <div
      className='grid w-full grid-cols-1 gap-6 bg-white sm:grid-cols-2 xl:grid-cols-4'
      role='status'
      aria-label='Loading cards'
    >
      <span className='sr-only'>Loading…</span>
      {Array.from({ length: cards }, (_, index) => (
        <div key={index} className='overflow-hidden rounded-2xl border border-slate-200 bg-white'>
          <Skeleton className='h-44 w-full rounded-none' />
          <div className='space-y-3 p-5'>
            <Skeleton className='h-5 w-2/3' />
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='h-10 w-full' />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableRowsSkeleton({ columns, rows = 5 }: { columns: number; rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <tr key={rowIndex} aria-hidden='true' className='border-b border-slate-100 bg-white'>
          {Array.from({ length: columns }, (_, columnIndex) => (
            <td key={columnIndex} className='px-4 py-4'>
              <Skeleton className={`h-4 ${columnIndex === 0 ? 'w-28' : 'w-20'}`} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function TableSkeleton({ rows = 6, className = '' }: { rows?: number; className?: string }) {
  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-slate-200 bg-white ${className}`}
      role='status'
      aria-label='Loading table'
    >
      <span className='sr-only'>Loading…</span>
      <div className='flex gap-6 border-b border-slate-200 bg-slate-50 px-5 py-4'>
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className='h-3 flex-1' />
        ))}
      </div>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div key={rowIndex} className='flex gap-6 border-b border-slate-100 px-5 py-4 last:border-0'>
          {Array.from({ length: 4 }, (_, columnIndex) => (
            <Skeleton
              key={columnIndex}
              className={`h-4 flex-1 ${columnIndex > 1 ? 'hidden sm:block' : ''}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
