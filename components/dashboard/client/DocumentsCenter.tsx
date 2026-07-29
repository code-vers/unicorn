'use client';

import { 
  Upload, 
  FileText, 
  Eye
} from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useDocuments } from '@/hooks/useDocuments';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';
import type { DocumentResponse, DocumentType } from '@/lib/api/document.service';

interface DocumentRowProps {
  title: string;
  type: DocumentType;
  required?: boolean;
  document?: DocumentResponse;
  onUpload: (file: File, type: DocumentType) => Promise<DocumentResponse>;
}

const DocumentRow: React.FC<DocumentRowProps> = ({ title, type, required, document, onUpload }) => {
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

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return 'bg-[#EBF7ED] text-[#3FA34D]';
      case 'REJECTED':
        return 'bg-[#FFDAD6] text-[#BA1A1A]';
      case 'PENDING_REVIEW':
        return 'bg-[#FFFAE0] text-[#D8A500]';
      default:
        return 'bg-[#F6F6F6] text-[#6B7280]';
    }
  };

  const openDocument = (path: string) => {
    const fullUrl = path.startsWith('http') ? path : `http://localhost:5000${path}`;
    window.open(fullUrl, '_blank');
  };

  // Determine current status string
  let displayStatus = '';
  if (document) {
    displayStatus = document.status === 'VERIFIED' ? '✓ Verified' : document.status.replace('_', ' ');
  } else if (required) {
    displayStatus = 'Required';
  }

  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center justify-between">
        <p className="text-[#0A1413] text-base font-['Lato'] font-normal">{title}</p>
        {displayStatus && (
          <div className={`${document ? getStatusStyles(document.status) : 'bg-[#FFDAD6] text-[#BA1A1A]'} px-2 py-0.5 rounded-[5px]`}>
            <p className="text-[10px] font-['Lato'] capitalize">{displayStatus.toLowerCase()}</p>
          </div>
        )}
      </div>

      <div className={`border-[#E5E7EB] border-[1.5px] border-dashed rounded-lg p-6 flex flex-col items-center gap-3 ${!document && !isUploading ? 'cursor-pointer group hover:bg-gray-50' : ''}`}
           onClick={() => !document && !isUploading && fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
        />

        {document ? (
          <div className="bg-[#F6F6F6] rounded-md p-3 flex items-center gap-3 w-full cursor-default">
            <div className="bg-[#EBF7ED] rounded-md w-10 h-10 flex items-center justify-center">
              <FileText size={18} className="text-[#3FA34D]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#0A1413] text-sm font-['Nunito'] truncate font-normal">{title} File</p>
              <p className="text-[#6B7280] text-[10px] font-['Lato']">Uploaded {new Date(document.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={(e) => { e.stopPropagation(); openDocument(document.path); }} className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-500"><Eye size={14} /></button>
            </div>
          </div>
        ) : isUploading ? (
          <div className="flex flex-col items-center gap-3 w-full py-2">
            <Spinner size="sm" />
            <p className="text-[#6B7280] text-sm font-['Nunito'] font-normal">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="size-8 flex items-center justify-center">
              <Upload size={32} className="text-[#6B7280] group-hover:text-[#0A1413] transition-colors" />
            </div>
            <p className="text-[#6B7280] text-sm font-['Nunito'] font-normal group-hover:text-[#0A1413] transition-colors">
              Drag and drop or click to upload
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function DocumentsCenter() {
  const { documents, isLoading, uploadDocument } = useDocuments();

  const getDoc = (type: DocumentType) => documents.find(d => d.type === type);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-10 space-y-8 min-h-screen">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] pb-3">
        <h2 className="text-[14px] font-bold text-[#0A1413] font-montserrat uppercase tracking-wider">Documents Center</h2>
        <p className="text-[12px] text-[#6B7280] font-lato">Upload and manage your required rental documents.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1630px]">
        {/* Required Documents */}
        <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 space-y-4 h-full">
          <h3 className="text-[#0A1413] text-xl font-bold font-montserrat">Required Documents</h3>
          <div className="space-y-4">
            <DocumentRow 
              title="Driver's License" 
              type="DRIVERS_LICENSE" 
              required 
              document={getDoc('DRIVERS_LICENSE')}
              onUpload={uploadDocument}
            />
            <DocumentRow 
              title="Passport / National ID" 
              type="PASSPORT_ID" 
              required 
              document={getDoc('PASSPORT_ID')}
              onUpload={uploadDocument}
            />
          </div>
        </div>

        {/* Corporate Documents */}
        <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 space-y-4 h-full flex flex-col">
          <h3 className="text-[#0A1413] text-xl font-bold font-montserrat">Corporate Documents</h3>
          <div className="space-y-4 flex-1">
            <DocumentRow 
              title="KRA PIN Certificate" 
              type="KRA_PIN" 
              document={getDoc('KRA_PIN')}
              onUpload={uploadDocument}
            />
            <DocumentRow 
              title="Company Registration" 
              type="COMPANY_REGISTRATION" 
              document={getDoc('COMPANY_REGISTRATION')}
              onUpload={uploadDocument}
            />
          </div>
        </div>
      </div>

      {/* Signed Rental Agreements */}
      <div className="bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] max-w-[1630px]">
        <div className="p-5 border-b border-[#E8ECF0]">
          <h3 className="text-[#0A1413] text-xl font-bold font-montserrat">Signed Rental Agreements</h3>
        </div>
        <div className="p-6 space-y-3">
          <div className="text-center py-6 text-gray-500 text-sm font-lato">
            No signed agreements available yet. They will appear here once a booking is verified.
          </div>
        </div>
      </div>
    </div>
  );
}
