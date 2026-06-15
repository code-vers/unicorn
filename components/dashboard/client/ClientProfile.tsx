'use client';

import { Camera, Lock, User, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const InputField = ({ label, value, placeholder, type = "text" }: { label: string, value?: string, placeholder?: string, type?: string }) => (
  <div className="space-y-1.5 w-full">
    <label className="text-[14px] font-normal text-[#0A1413] font-nunito">{label}</label>
    <div className="relative">
      <input 
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="w-full bg-white border border-[#9CA3AF] rounded-[4px] px-3 py-2.5 text-[14px] text-[#0A1413] font-nunito focus:outline-none focus:ring-1 focus:ring-[#3FA344] transition-all placeholder:text-[#9CA3AF]"
      />
    </div>
  </div>
);

export default function ClientProfile() {
  return (
    <div className="p-10 space-y-10 bg-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1600px]">
        
        {/* Left Column: Personal Info */}
        <div className="space-y-8">
          <div className="bg-white border-[1.5px] border-[#D3D3D3] rounded-[12px] p-8 space-y-8 shadow-sm">
            {/* Profile Header */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="bg-[#3FA344] w-24 h-24 rounded-full flex items-center justify-center text-white text-[28px] font-bold font-lato">
                  JK
                </div>
                <button className="absolute bottom-0 right-0 bg-white border border-[#E5E7EB] p-1.5 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <Camera size={14} className="text-[#0A1413]" />
                </button>
              </div>
              <div className="space-y-0.5">
                <h3 className="text-[20px] font-bold text-[#0A1413] font-montserrat">Afiah</h3>
                <p className="text-[16px] text-[#6B7280] font-lato font-semibold">Afiah@gmail.com</p>
              </div>
            </div>

            {/* Personal Information Form */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
                <User size={18} className="text-[#3FA344]" />
                <h4 className="text-[18px] font-bold text-[#0A1413] font-montserrat">Personal Information</h4>
              </div>
              <div className="space-y-4">
                <InputField label="Full Name" value="Afiah" />
                <InputField label="Email Address" value="Afiah@gmail.com" />
                <InputField label="Phone Number" value="+254 712 345 678" />
                <InputField label="Physical Address" value="14 Kiambu Road, Westlands" />
                <InputField label="ID / Passport Number" value="29876543" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Emergency Contact & Security */}
        <div className="space-y-8">
          {/* Emergency Contact */}
          <div className="bg-white border-[1.5px] border-[#D3D3D3] rounded-[12px] p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
              <Heart size={18} className="text-[#3FA344]" />
              <h4 className="text-[18px] font-bold text-[#0A1413] font-montserrat">Emergency Contact</h4>
            </div>
            <div className="space-y-4">
              <InputField label="Full Name" value="user2" />
              <InputField label="Email Address" value="user2@unicornrentacar.com" />
              <InputField label="Phone Number" value="+254 712 345 678" />
              <InputField label="Relationship" value="Spouse" />
            </div>
          </div>
        </div>

        {/* Full Width: Security */}
        <div className="lg:col-span-2">
          <div className="bg-white border-[1.5px] border-[#D3D3D3] rounded-[12px] p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
              <ShieldCheck size={18} className="text-[#3FA344]" />
              <h4 className="text-[18px] font-bold text-[#0A1413] font-montserrat">Change Password</h4>
            </div>
            <div className="space-y-4">
              <InputField label="Current Password" type="password" placeholder="Enter current password" />
              <InputField label="New Password" type="password" placeholder="Enter new password" />
              <InputField label="Confirm New Password" type="password" placeholder="Confirm new password" />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="lg:col-span-2">
          <button className="bg-[#3FA344] text-white px-10 py-3 rounded-[6px] font-bold text-[14px] font-wix hover:bg-[#358A3A] transition-colors shadow-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
