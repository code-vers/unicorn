import Payments from '@/components/dashboard/client/Payments';

export default function MyPaymentsPage() {
  return (
    <div className='h-full w-full flex flex-col'>
            <div className='flex-1'>
                <main className="flex-1 overflow-y-auto bg-white">
          <Payments />
        </main>
      </div>
    </div>
  );
}
