import MyBookings from '@/components/dashboard/client/booking';

export default function MyBookingsPage() {
  return (
    <div className='h-full w-full flex flex-col'>
            <div className='flex-1'>
                <main className="flex-1 overflow-y-auto bg-white">
          <MyBookings />
        </main>
      </div>
    </div>
  );
}
