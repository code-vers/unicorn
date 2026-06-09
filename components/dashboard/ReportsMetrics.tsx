'use client';

import { ReportMetric } from '@/types/dashboard';

interface ReportsMetricsProps {
  metrics: ReportMetric[];
}

export default function ReportsMetrics({ metrics }: ReportsMetricsProps) {
  return (
    <div className='flex flex-col gap-6 w-full'>
      <h3 className='text-[#0A1413] text-[20px] font-montserrat font-bold leading-[1.6]'>
        Key Metrics
      </h3>
      <div className='flex flex-col gap-3 w-full'>
        {metrics.map((metric, index) => (
          <div
            key={index}
            className='border border-[#E5E7EB] rounded-[8px] p-4 flex flex-col gap-1 w-full bg-white shadow-sm'
          >
            <span className='text-[#6B7280] text-[14px] font-nunito'>{metric.label}</span>
            <span className='text-[#3FA344] text-[20px] font-montserrat font-bold'>
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
