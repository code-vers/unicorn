'use client';

import React from 'react';

export default function SettingsForm() {
  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Top Row: Personal Info and Change Password */}
      <div className="flex flex-col xl:flex-row gap-5 w-full">
        {/* Personal Information */}
        <div className="bg-white border border-[#D3D3D3] border-[1.5px] rounded-[12px] p-6 flex-1 shadow-sm">
          <h3 className="text-[#0A1413] text-[18px] font-montserrat font-bold mb-6">
            Personal Information
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#0A1413] text-[14px] font-nunito">Full Name</label>
              <input
                type="text"
                defaultValue="Admin User"
                className="w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#0A1413] focus:outline-none focus:border-[#3FA34D]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#0A1413] text-[14px] font-nunito">Email Address</label>
              <input
                type="email"
                defaultValue="admin@unicornrentacar.com"
                className="w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#0A1413] focus:outline-none focus:border-[#3FA34D]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#0A1413] text-[14px] font-nunito">Phone Number</label>
              <input
                type="text"
                defaultValue="+254 712 345 678"
                className="w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#0A1413] focus:outline-none focus:border-[#3FA34D]"
              />
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white border border-[#D3D3D3] border-[1.5px] rounded-[12px] p-6 flex-1 shadow-sm">
          <h3 className="text-[#0A1413] text-[18px] font-montserrat font-bold mb-6">
            Change Password
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#0A1413] text-[14px] font-nunito">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#0A1413] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#3FA34D]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#0A1413] text-[14px] font-nunito">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#0A1413] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#3FA34D]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#0A1413] text-[14px] font-nunito">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#0A1413] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#3FA34D]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white border border-[#D3D3D3] border-[1.5px] rounded-[12px] p-6 shadow-sm">
        <h3 className="text-[#0A1413] text-[18px] font-montserrat font-bold mb-6">
          Notification Settings
        </h3>
        <div className="flex flex-col gap-3">
          {[
            'Email notifications for new bookings',
            'Email notifications for payments',
            'Email notifications for vehicle returns',
            'SMS notifications',
            'Push notifications',
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`notify-${index}`}
                className="w-[14px] h-[14px] border-[#E5E7EB] rounded-[4px] accent-[#3FA34D]"
              />
              <label
                htmlFor={`notify-${index}`}
                className="text-[#6B7280] text-[14px] font-nunito cursor-pointer"
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-start">
        <button className="bg-[#3FA34D] hover:bg-[#348a41] text-white px-9 py-2 rounded-[6px] text-[14px] font-bold font-wix transition-colors whitespace-nowrap shadow-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
}
