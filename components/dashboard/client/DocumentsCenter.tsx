'use client';

import { 
  Upload, 
  FileText, 
  Eye, 
  Download, 
  X,
  Plus,
  Check
} from 'lucide-react';
import React from 'react';

interface DocumentRowProps {
  title: string;
  status?: 'Required' | 'Verified' | 'Pending Review';
  file?: {
    name: string;
    size: string;
    uploadedAt: string;
  };
}

const DocumentRow: React.FC<DocumentRowProps> = ({ title, status, file }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Required':
        return 'bg-[#FFDAD6] text-[#BA1A1A]';
      case 'Verified':
        return 'bg-[#EBF7ED] text-[#3FA34D]';
      case 'Pending Review':
        return 'bg-[#FFFAE0] text-[#D8A500]';
      default:
        return 'bg-[#F6F6F6] text-[#6B7280]';
    }
  };

  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center justify-between">
        <p className="text-[#0A1413] text-base font-['Lato'] font-normal">{title}</p>
        {status && (
          <div className={`${getStatusStyles()} px-2 py-0.5 rounded-[5px]`}>
            <p className="text-[10px] font-['Lato']">{status === 'Verified' ? '✓ Verified' : status}</p>
          </div>
        )}
      </div>

      <div className="border-[#E5E7EB] border-[1.5px] border-dashed rounded-lg p-6 flex flex-col items-center gap-3">
        {file ? (
          <div className="bg-[#F6F6F6] rounded-md p-3 flex items-center gap-3 w-full">
            <div className="bg-[#EBF7ED] rounded-md w-10 h-10 flex items-center justify-center">
              <FileText size={18} className="text-[#3FA34D]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#0A1413] text-sm font-['Nunito'] truncate font-normal">{file.name}</p>
              <p className="text-[#6B7280] text-[10px] font-['Lato']">{file.size} · Uploaded {file.uploadedAt}</p>
            </div>
            <div className="flex gap-1">
              <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-500"><Eye size={14} /></button>
              <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-500"><Download size={14} /></button>
              <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-500"><X size={14} /></button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 cursor-pointer group w-full">
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

interface SignedAgreementProps {
  name: string;
  details: string;
}

const SignedAgreement: React.FC<SignedAgreementProps> = ({ name, details }) => {
  return (
    <div className="bg-[#F6F6F6] rounded-md p-3 flex items-center gap-3 w-full">
      <div className="bg-[#EBF7ED] rounded-md w-10 h-10 flex items-center justify-center">
        <FileText size={18} className="text-[#3FA34D]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#0A1413] text-sm font-['Nunito'] truncate font-normal">{name}</p>
        <p className="text-[#6B7280] text-[10px] font-['Lato']">{details}</p>
      </div>
      <div className="flex gap-1">
        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-500"><Eye size={14} /></button>
        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-500"><Download size={14} /></button>
      </div>
    </div>
  );
};

export default function DocumentsCenter() {
  return (
    <div className="p-10 space-y-8 bg-white min-h-screen">
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
            <DocumentRow title="Driver's License" status="Required" />
            <DocumentRow 
              title="Passport / National ID" 
              status="Verified" 
              file={{ name: 'Passport / National ID.pdf', size: '890 KB', uploadedAt: 'Jun 5, 2026' }}
            />
            <DocumentRow title="KRA PIN Certificate" status="Pending Review" />
          </div>
        </div>

        {/* Insurance Documents */}
        <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 space-y-4 h-full flex flex-col">
          <h3 className="text-[#0A1413] text-xl font-bold font-montserrat">Insurance Documents</h3>
          <div className="space-y-4 flex-1">
            <DocumentRow title="Document 1" />
            <DocumentRow title="Document 2" />
          </div>
          <button className="w-full bg-[#3FA344] text-white py-2.5 rounded-[6px] font-bold text-sm mt-4 hover:bg-[#358A3A] transition-colors">
            Add Another Document
          </button>
        </div>
      </div>

      {/* Signed Rental Agreements */}
      <div className="bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] max-w-[1630px]">
        <div className="p-5 border-b border-[#E8ECF0]">
          <h3 className="text-[#0A1413] text-xl font-bold font-montserrat">Signed Rental Agreements</h3>
        </div>
        <div className="p-6 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <SignedAgreement 
              key={i}
              name="Rental Agreement – URC-2026-0089"
              details="Toyota Prado VX – KBZ 456T · Jun 8, 2026 · 245 KB"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
