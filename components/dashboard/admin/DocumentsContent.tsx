'use client';

import React, { useRef, useState } from 'react';
import { Upload, Check, X, FileText } from 'lucide-react';
import { useDocuments } from '@/hooks/useDocuments';
import { Spinner } from '@/components/ui/Spinner';
import { TableRowsSkeleton } from '@/components/ui/Skeleton';
import toast from 'react-hot-toast';
import type { DocumentResponse, DocumentStatus, DocumentType } from '@/lib/api/document.service';
import { DocumentService } from '@/lib/api/document.service';


interface DocumentUploadProps {
  title: string;
  type: DocumentType;
  required?: boolean;
  onUpload: (file: File, type: DocumentType) => Promise<DocumentResponse>;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ title, type, required, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await onUpload(file, type);
      toast.success(`${title} uploaded successfully`);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload document');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[#0A1413] text-base font-['Lato']">{title}</p>
        <div className={`${required ? 'bg-[#FFDAD6] text-[#BA1A1A]' : 'bg-[#F6F6F6] text-[#6B7280]'} px-2 py-0.5 rounded-[5px]`}>
          <p className="text-[10px] font-['Lato']">{required ? 'Required' : 'Optional'}</p>
        </div>
      </div>
      <div 
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`border-[#E5E7EB] border-[1.5px] border-dashed rounded-lg p-6 flex flex-col items-center gap-3 ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'} transition-colors`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
        />
        {isUploading ? (
          <Spinner size="sm" />
        ) : (
          <Upload size={32} className="text-[#6B7280]" />
        )}
        <p className="text-[#6B7280] text-sm font-['Nunito']">
          {isUploading ? 'Uploading...' : 'Drag and drop or click to upload'}
        </p>
      </div>
    </div>
  );
};

export default function DocumentsContent() {
  const { documents, isLoading, uploadDocument, updateDocumentStatus } = useDocuments('all');

  const handleStatusUpdate = async (id: string, status: DocumentStatus) => {
    try {
      await updateDocumentStatus(id, status);
      toast.success(`Document marked as ${status}`);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to update status');
    }
  };

  const openDocument = async (id: string) => {
    try {
      await DocumentService.openDocument(id);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to open document');
    }
  };

  return (
    <div className="space-y-10 w-full">
      {/* Upload Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Self-Drive Documents */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-6">
          <h3 className="text-[#0A1413] text-xl font-bold font-['Montserrat'] leading-[1.6]">Self-Drive Documents</h3>
          <div className="space-y-4">
            <DocumentUpload title="Driving License" type="DRIVERS_LICENSE" required onUpload={uploadDocument} />
            <DocumentUpload title="National ID" type="NATIONAL_ID" required onUpload={uploadDocument} />
            <DocumentUpload title="KRA Pin" type="KRA_PIN" onUpload={uploadDocument} />
          </div>
        </div>

        {/* Corporate Documents */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-6">
          <h3 className="text-[#0A1413] text-xl font-bold font-['Montserrat'] leading-[1.6]">Corporate Documents</h3>
          <div className="space-y-4">
            <DocumentUpload title="Company Registration" type="COMPANY_REGISTRATION" required onUpload={uploadDocument} />
            <DocumentUpload title="Tax Certificate" type="TAX_CERTIFICATE" required onUpload={uploadDocument} />
          </div>
        </div>
      </div>

      {/* Recent Uploads Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)]">
        <div className="p-5 border-b border-[#E8ECF0]">
          <h3 className="text-[#0A1413] text-xl font-bold font-['Montserrat'] leading-[1.6]">Recent Uploads</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#FAFBFC] border-b border-[#E8ECF0] h-[50px]">
                <th className="text-[#A0AEC0] text-[12px] font-normal font-['Lato'] py-[5px] pl-6">CUSTOMER</th>
                <th className="text-[#A0AEC0] text-[12px] font-normal font-['Lato'] py-[5px]">DOCUMENT TYPE</th>
                <th className="text-[#A0AEC0] text-[12px] font-normal font-['Lato'] py-[5px]">UPLOAD DATE</th>
                <th className="text-[#A0AEC0] text-[12px] font-normal font-['Lato'] py-[5px]">FILE</th>
                <th className="text-[#A0AEC0] text-[12px] font-normal font-['Lato'] py-[5px]">STATUS</th>
                <th className="text-[#A0AEC0] text-[12px] font-normal font-['Lato'] py-[5px] px-[14px]">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F6F8]">
              {isLoading ? (
                <TableRowsSkeleton columns={6} rows={5} />
              ) : documents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-[#6B7280] text-sm">
                    No documents uploaded yet.
                  </td>
                </tr>
              ) : documents.map((upload, index) => (
                <tr 
                  key={upload.id} 
                  className={`${index % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'} h-[50px] border border-[#F4F6F8] hover:bg-gray-50 transition-colors`}
                >
                  <td className="text-[#6B7280] text-[14px] font-bold font-['Lato'] py-[15px] pl-6">
                    {upload.user?.name || 'Unknown User'}
                    <div className="font-normal text-[12px] text-[#A0AEC0]">{upload.user?.email}</div>
                  </td>
                  <td className="text-[#0A1413] font-bold text-[12px] font-['Lato'] py-[15px]">
                    {upload.type.replace(/_/g, ' ')}
                  </td>
                  <td className="text-[#6B7280] text-[12px] font-['Lato'] py-[15px]">
                    {new Date(upload.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-[15px]">
                    <button 
                      onClick={() => void openDocument(upload.id)}
                      className="flex items-center gap-1 text-[#3FA34D] hover:underline text-[12px] font-['Lato']"
                    >
                      <FileText size={14} /> View File
                    </button>
                  </td>
                  <td className="py-[12px]">
                    <span className={`px-[7px] py-[2px] rounded-[5px] text-[10px] font-['Lato'] inline-flex items-center justify-center ${
                      upload.status === 'VERIFIED' ? 'bg-[#EBF7ED] text-[#3FA34D]' : 
                      upload.status === 'REJECTED' ? 'bg-[#FFF0F0] text-[#DC2626]' : 
                      'bg-[#FFFAE0] text-[#D8A500]'
                    }`}>
                      {upload.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-[14px] py-[11.5px]">
                    <div className="flex gap-[4px]">
                      <button 
                        onClick={() => handleStatusUpdate(upload.id, 'VERIFIED')}
                        disabled={upload.status === 'VERIFIED'}
                        className="bg-[#EBF7ED] text-[#3FA34D] w-[26px] h-[26px] flex items-center justify-center rounded-[5px] hover:bg-[#d8eedb] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Approve"
                      >
                        <Check size={12} strokeWidth={3} />
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(upload.id, 'REJECTED')}
                        disabled={upload.status === 'REJECTED'}
                        className="bg-[#FFF0F0] border border-[#F6F6F6] text-[#DC2626] w-[26px] h-[26px] flex items-center justify-center rounded-[5px] hover:bg-[#ffe0e0] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Reject"
                      >
                        <X size={12} strokeWidth={3} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
