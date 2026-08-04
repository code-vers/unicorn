'use client';

import { Star } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Spinner } from '@/components/ui/Spinner';

export default function PerformanceScore() {
  const { performance: data, isLoading, error } = useAnalytics();

  if (isLoading) {
    return (
      <div className='bg-gradient-to-br from-[#3FA34D] to-[#2E7A39] rounded-[16px] p-5 text-white shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] flex items-center justify-center min-h-[160px]'>
        <Spinner size="md" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className='bg-gradient-to-br from-[#3FA34D] to-[#2E7A39] rounded-[16px] p-5 text-white shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] flex items-center justify-center min-h-[160px] text-sm'>
        Failed to load score.
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-br from-[#3FA34D] to-[#2E7A39] rounded-[16px] p-5 text-white shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] flex flex-col justify-between'>
      <div>
        <div className='flex items-center gap-2 mb-4'>
          <Star size={12} fill='white' className='text-white' />
          <h3 className='text-[10px] font-bold tracking-wider uppercase opacity-70'>
            PERFORMANCE SCORE
          </h3>
        </div>

        <div className='mb-2'>
          <h2 className='text-[24px] font-bold font-montserrat'>{data.score}%</h2>
        </div>

        <div className='flex items-center gap-1 mb-4'>
          {[1, 2, 3, 4].map((i) => (
            <Star key={i} size={13} fill='white' className='text-white' />
          ))}
          <Star size={13} className='text-white' />
          <span className='ml-2 text-[12px] font-lato opacity-70'>{data.rating} / 5.0</span>
        </div>
      </div>

      <div className='space-y-2'>
        <div className='w-full bg-white/20 h-1 rounded-full overflow-hidden'>
          <div className='bg-white h-full rounded-full' style={{ width: `${data.score}%` }} />
        </div>
        <div className='flex items-center justify-between text-[10px] opacity-45 font-lato'>
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
