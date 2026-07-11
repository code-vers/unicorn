import DocumentsCenter from '@/components/dashboard/client/DocumentsCenter';

export default function MyDocumentsPage() {
  return (
    <div className='h-full w-full flex flex-col'>
            <div className='flex-1'>
                <main className="flex-1 overflow-y-auto bg-white">
          <DocumentsCenter />
        </main>
      </div>
    </div>
  );
}
