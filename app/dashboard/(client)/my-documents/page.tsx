import DocumentsCenter from '@/components/dashboard/client/DocumentsCenter';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default function MyDocumentsPage() {
  return (
    <div className="flex h-screen bg-white">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="My Documents" />
        <main className="flex-1 overflow-y-auto bg-white">
          <DocumentsCenter />
        </main>
      </div>
    </div>
  );
}
