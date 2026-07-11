import TripManagement from '@/components/dashboard/client/TripManagement';

export default function TripManagementPage() {
  return (
    <div className='h-full w-full flex flex-col'>
            <div className='flex-1'>
                <main className="flex-1 overflow-y-auto bg-white">
          <TripManagement />
        </main>
      </div>
    </div>
  );
}
