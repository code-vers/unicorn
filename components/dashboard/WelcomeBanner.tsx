'use client';

export default function WelcomeBanner() {
  const date = new Date('2026-05-10');
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
      <div>
        <h1 className='text-[24px] font-bold text-[#0A1413] font-montserrat'>
          Welcome back, Sarah 👋
        </h1>
        <p className='text-[#6B7280] text-[14px] font-lato mt-1'>
          {`Here's what's happening with Unicorn Rent-A-Car today.`}
        </p>
      </div>

      <div className='flex items-center gap-3'>
        <div className='bg-[#EBF7ED] px-4 py-2 rounded-full flex items-center gap-2'>
          <div className='w-1.5 h-1.5 bg-[#3FA34D] rounded-full animate-pulse' />
          <span className='text-[#3FA34D] text-[12px] font-bold font-lato'>
            System Online
          </span>
        </div>
        <div className='bg-[#F6F6F6] border border-[#E5E7EB] px-4 py-2 rounded-full'>
          <span className='text-[#6B7280] text-[12px] font-lato'>
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
}
