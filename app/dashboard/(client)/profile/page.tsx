import ClientProfile from '@/components/dashboard/client/ClientProfile';

export default function ProfilePage() {
  return (
    <div className='h-full w-full flex flex-col'>
            <div className='flex-1'>
                <main className="flex-1 overflow-y-auto bg-white">
          <ClientProfile />
        </main>
      </div>
    </div>
  );
}
