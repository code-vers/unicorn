'use client';

import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { UserService } from '../../../lib/api/user.service';
import { SectionSkeleton } from '@/components/ui/Skeleton';


export default function SettingsForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // Profile form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await UserService.getMe();
        setName(user.name || '');
        setEmail(user.email || '');
        setPhoneNumber(user.phoneNumber || '');
      } catch (error: any) {
        toast.error(error?.message || 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phoneNumber', phoneNumber);
      await UserService.updateProfile(formData);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update profile');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    setIsSavingPassword(true);
    try {
      await UserService.changePassword({ currentPassword, newPassword });
      toast.success('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to change password');
    } finally {
      setIsSavingPassword(false);
    }
  };

  if (isLoading) {
    return <SectionSkeleton rows={5} />;
  }

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Top Row: Personal Info and Change Password */}
      <div className="flex flex-col xl:flex-row gap-5 w-full">
        {/* Personal Information */}
        <form onSubmit={handleProfileSave} className="bg-white border border-[#D3D3D3] border-[1.5px] rounded-[12px] p-6 flex-1 shadow-sm flex flex-col gap-6">
          <h3 className="text-[#0A1413] text-[18px] font-montserrat font-bold">
            Personal Information
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#0A1413] text-[14px] font-nunito">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#0A1413] focus:outline-none focus:border-[#3FA34D]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#0A1413] text-[14px] font-nunito">Email Address</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#9CA3AF] bg-[#F4F6F8] cursor-not-allowed"
              />
              <p className="text-[11px] text-[#A0AEC0] font-nunito">Email cannot be changed here.</p>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#0A1413] text-[14px] font-nunito">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+254 712 345 678"
                className="w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#0A1413] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#3FA34D]"
              />
            </div>
          </div>
          <div className="flex justify-start mt-auto">
            <button
              type="submit"
              disabled={isSavingProfile}
              className="bg-[#3FA34D] hover:bg-[#348a41] text-white px-9 py-2 rounded-[6px] text-[14px] font-bold font-wix transition-colors whitespace-nowrap shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSavingProfile ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>

        {/* Change Password */}
        <form onSubmit={handlePasswordSave} className="bg-white border border-[#D3D3D3] border-[1.5px] rounded-[12px] p-6 flex-1 shadow-sm flex flex-col gap-6">
          <h3 className="text-[#0A1413] text-[18px] font-montserrat font-bold">
            Change Password
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#0A1413] text-[14px] font-nunito">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                required
                className="w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#0A1413] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#3FA34D]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#0A1413] text-[14px] font-nunito">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#0A1413] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#3FA34D]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#0A1413] text-[14px] font-nunito">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#0A1413] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#3FA34D]"
              />
            </div>
          </div>
          <div className="flex justify-start mt-auto">
            <button
              type="submit"
              disabled={isSavingPassword}
              className="bg-[#3FA34D] hover:bg-[#348a41] text-white px-9 py-2 rounded-[6px] text-[14px] font-bold font-wix transition-colors whitespace-nowrap shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSavingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      {/* Notification Settings (UI only) */}
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
    </div>
  );
}
