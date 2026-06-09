'use client';

import React from 'react';
import { Upload, Check, X } from 'lucide-react';

interface DocumentUploadProps {
  title: string;
  required?: boolean;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ title, required }) => {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[#0A1413] text-base font-['Lato']">{title}</p>
        <div className={`${required ? 'bg-[#FFDAD6] text-[#BA1A1A]' : 'bg-[#F6F6F6] text-[#6B7280]'} px-2 py-0.5 rounded-[5px]`}>
          <p className="text-[10px] font-['Lato']">{required ? 'Required' : 'Optional'}</p>
        </div>
      </div>
      <div className="border-[#E5E7EB] border-[1.5px] border-dashed rounded-lg p-6 flex flex-col items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
        <Upload size={32} className="text-[#6B7280]" />
        <p className="text-[#6B7280] text-sm font-['Nunito']">Drag and drop or click to upload</p>
      </div>
    </div>
  );
};

const recentUploads = [
  { customer: 'John Doe', type: 'Driving License', date: '2026-05-25', status: 'Approved' },
  { customer: 'John Doe', type: 'National ID', date: '2026-05-25', status: 'Approved' },
  { customer: 'John Doe', type: 'Driving License', date: '2026-05-25', status: 'Pending' },
  { customer: 'John Doe', type: 'Driving License', date: '2026-05-25', status: 'Pending' },
  { customer: 'John Doe', type: 'National ID', date: '2026-05-25', status: 'Approved' },
  { customer: 'John Doe', type: 'KRA Pin', date: '2026-05-25', status: 'Pending' },
  { customer: 'John Doe', type: 'KRA Pin', date: '2026-05-25', status: 'Approved' },
];

export default function DocumentsContent() {
  return (
    <div className="space-y-10 w-full">
      {/* Upload Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Self-Drive Documents */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-6">
          <h3 className="text-[#0A1413] text-xl font-bold font-['Montserrat'] leading-[1.6]">Self-Drive Documents</h3>
          <div className="space-y-4">
            <DocumentUpload title="Driving License" required />
            <DocumentUpload title="National ID" />
            <DocumentUpload title="KRA Pin" />
          </div>
        </div>

        {/* Corporate Documents */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-6">
          <h3 className="text-[#0A1413] text-xl font-bold font-['Montserrat'] leading-[1.6]">Corporate Documents</h3>
          <div className="space-y-4">
            <DocumentUpload title="Company Registration" />
            <DocumentUpload title="Tax Certificate" />
          </div>
        </div>
      </div>

      {/* Recent Uploads Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)]">
        <div className="p-5 border-b border-[#E8ECF0]">
          <h3 className="text-[#0A1413] text-xl font-bold font-['Montserrat'] leading-[1.6]">Recent Uploads</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAFBFC] border-b border-[#E8ECF0] h-[50px]">
                <th className="px-[11px] py-[9px] w-[50px]">
                  <div className="bg-white border border-[#E8ECF0] rounded-[4px] size-[15px] cursor-pointer" />
                </th>
                <th className="text-[#A0AEC0] text-[12px] font-normal font-['Lato'] py-[5px] w-[200px]">CUSTOMER</th>
                <th className="text-[#A0AEC0] text-[12px] font-normal font-['Lato'] py-[5px] w-[250px]">DOCUMENT TYPE</th>
                <th className="text-[#A0AEC0] text-[12px] font-normal font-['Lato'] py-[5px] w-[200px]">UPLOAD DATE</th>
                <th className="text-[#A0AEC0] text-[12px] font-normal font-['Lato'] py-[5px] w-[200px]">STATUS</th>
                <th className="text-[#A0AEC0] text-[12px] font-normal font-['Lato'] py-[5px] px-[14px]">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F6F8]">
              {recentUploads.map((upload, index) => (
                <tr 
                  key={index} 
                  className={`${index % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'} h-[50px] hover:bg-gray-50 transition-colors group`}
                >
                  <td className="px-[11px] py-[9px]">
                    <div className="bg-white border border-[#E8ECF0] rounded-[4px] size-[15px] cursor-pointer" />
                  </td>
                  <td className="text-[#6B7280] text-[12px] font-['Lato'] py-[15px]">{upload.customer}</td>
                  <td className="text-[#6B7280] text-[12px] font-['Lato'] py-[15px]">{upload.type}</td>
                  <td className="text-[#6B7280] text-[12px] font-['Lato'] py-[15px]">{upload.date}</td>
                  <td className="py-[15px]">
                    <span className={`px-[7px] py-[2px] rounded-[5px] text-[10px] font-['Lato'] inline-flex items-center justify-center ${
                      upload.status === 'Approved' ? 'bg-[#EBF7ED] text-[#3FA34D]' : 'bg-[#FFFAE0] text-[#D8A500]'
                    }`}>
                      {upload.status}
                    </span>
                  </td>
                  <td className="px-[14px] py-[11px]">
                    <div className="flex gap-[4px] opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-[#EBF7ED] text-[#3FA34D] p-1.5 rounded-[5px] hover:bg-[#d8eedb] transition-all transform hover:scale-105">
                        <Check size={12} />
                      </button>
                      <button className="bg-[#FFF0F0] text-[#DC2626] p-1.5 rounded-[5px] hover:bg-[#ffe0e0] transition-all transform hover:scale-105">
                        <X size={12} />
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
