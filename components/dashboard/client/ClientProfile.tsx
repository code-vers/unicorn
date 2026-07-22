'use client';

import { Camera, User, ShieldCheck, Heart, Trash2, Upload } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { UserService, UserDocument } from '../../../lib/api/user.service';

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
}: {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) => (
  <div className="space-y-1.5 w-full">
    <label className="text-[14px] font-normal text-[#0A1413] font-nunito">{label}</label>
    <div className="relative">
      <input
        type={type}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full bg-white border border-[#9CA3AF] rounded-[4px] px-3 py-2.5 text-[14px] text-[#0A1413] font-nunito focus:outline-none focus:ring-1 focus:ring-[#3FA344] transition-all placeholder:text-[#9CA3AF] disabled:bg-[#F4F6F8] disabled:text-[#9CA3AF] disabled:cursor-not-allowed"
      />
    </div>
  </div>
);

const getDocStatusStyles = (status: string) => {
  switch (status) {
    case 'VERIFIED':  return 'bg-[#EBF7ED] text-[#3FA34D]';
    case 'REJECTED':  return 'bg-[#FFF0F0] text-[#DC2626]';
    default:          return 'bg-[#FFFAE0] text-[#D8A500]';
  }
};

export default function ClientProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Profile fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [idPassportNumber, setIdPassportNumber] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Emergency contact fields
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactEmail, setEmergencyContactEmail] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [emergencyContactRelation, setEmergencyContactRelation] = useState('');

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Documents
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [docName, setDocName] = useState('');
  const [docType, setDocType] = useState('');
  const [docFile, setDocFile] = useState<File | null>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const getInitials = (n: string) => {
    const parts = n.trim().split(' ');
    if (parts.length > 1) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return n.substring(0, 2).toUpperCase();
  };

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:5000';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await UserService.getMe();
        setName(user.name || '');
        setEmail(user.email || '');
        setPhoneNumber(user.phoneNumber || '');
        setAddress(user.address || '');
        setIdPassportNumber(user.idPassportNumber || '');
        setPhotoUrl(user.photoUrl || null);
        setEmergencyContactName(user.emergencyContactName || '');
        setEmergencyContactEmail(user.emergencyContactEmail || '');
        setEmergencyContactPhone(user.emergencyContactPhone || '');
        setEmergencyContactRelation(user.emergencyContactRelation || '');
        setDocuments(user.documents || []);
      } catch (error: any) {
        toast.error(error?.message || 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phoneNumber', phoneNumber);
      formData.append('address', address);
      formData.append('idPassportNumber', idPassportNumber);
      formData.append('emergencyContactName', emergencyContactName);
      formData.append('emergencyContactEmail', emergencyContactEmail);
      formData.append('emergencyContactPhone', emergencyContactPhone);
      formData.append('emergencyContactRelation', emergencyContactRelation);
      if (photoFile) formData.append('photo', photoFile);

      const updated = await UserService.updateProfile(formData);
      setPhotoUrl(updated.photoUrl);
      setPhotoFile(null);
      setPhotoPreview(null);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
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

  const handleDocUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docFile || !docType || !docName) {
      toast.error('Please fill in document name, type, and select a file');
      return;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('document', docFile);
      formData.append('type', docType);
      formData.append('name', docName);
      const newDoc = await UserService.uploadDocument(formData);
      setDocuments((prev) => [...prev, newDoc]);
      setDocName('');
      setDocType('');
      setDocFile(null);
      if (docInputRef.current) docInputRef.current.value = '';
      toast.success('Document uploaded successfully');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDocDelete = async (docId: string) => {
    try {
      await UserService.deleteDocument(docId);
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
      toast.success('Document deleted');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to delete document');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-[#3FA344] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="p-10 space-y-10 bg-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1600px]">

        {/* Left Column: Personal Info */}
        <div className="space-y-8">
          <div className="bg-white border-[1.5px] border-[#D3D3D3] rounded-[12px] p-8 space-y-8 shadow-sm">
            {/* Profile Header */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="bg-[#3FA344] w-24 h-24 rounded-full flex items-center justify-center text-white text-[28px] font-bold font-lato overflow-hidden">
                  {(photoPreview || photoUrl) ? (
                    <img
                      src={photoPreview || `${baseUrl}${photoUrl}`}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    getInitials(name || 'U')
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-white border border-[#E5E7EB] p-1.5 rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  <Camera size={14} className="text-[#0A1413]" />
                </button>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="hidden"
                />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-[20px] font-bold text-[#0A1413] font-montserrat">{name || 'User'}</h3>
                <p className="text-[16px] text-[#6B7280] font-lato font-semibold">{email}</p>
              </div>
            </div>

            {/* Personal Information Form */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
                <User size={18} className="text-[#3FA344]" />
                <h4 className="text-[18px] font-bold text-[#0A1413] font-montserrat">Personal Information</h4>
              </div>
              <div className="space-y-4">
                <InputField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                <InputField label="Email Address" value={email} disabled />
                <InputField label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+254 712 345 678" />
                <InputField label="Physical Address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="14 Kiambu Road, Westlands" />
                <InputField label="ID / Passport Number" value={idPassportNumber} onChange={(e) => setIdPassportNumber(e.target.value)} placeholder="29876543" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Emergency Contact */}
        <div className="space-y-8">
          <div className="bg-white border-[1.5px] border-[#D3D3D3] rounded-[12px] p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
              <Heart size={18} className="text-[#3FA344]" />
              <h4 className="text-[18px] font-bold text-[#0A1413] font-montserrat">Emergency Contact</h4>
            </div>
            <div className="space-y-4">
              <InputField label="Full Name" value={emergencyContactName} onChange={(e) => setEmergencyContactName(e.target.value)} placeholder="Jane Doe" />
              <InputField label="Email Address" value={emergencyContactEmail} onChange={(e) => setEmergencyContactEmail(e.target.value)} type="email" placeholder="jane@example.com" />
              <InputField label="Phone Number" value={emergencyContactPhone} onChange={(e) => setEmergencyContactPhone(e.target.value)} placeholder="+254 712 345 678" />
              <InputField label="Relationship" value={emergencyContactRelation} onChange={(e) => setEmergencyContactRelation(e.target.value)} placeholder="Spouse" />
            </div>
          </div>
        </div>

        {/* Full Width: Change Password */}
        <div className="lg:col-span-2">
          <div className="bg-white border-[1.5px] border-[#D3D3D3] rounded-[12px] p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
              <ShieldCheck size={18} className="text-[#3FA344]" />
              <h4 className="text-[18px] font-bold text-[#0A1413] font-montserrat">Change Password</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Current Password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password" />
              <InputField label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
              <InputField label="Confirm New Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" />
            </div>
            <button
              type="button"
              onClick={handlePasswordChange}
              disabled={isSavingPassword}
              className="bg-[#0A1413] text-white px-8 py-2.5 rounded-[6px] font-bold text-[14px] font-wix hover:bg-[#1a2f2e] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSavingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </div>

        {/* Full Width: Documents */}
        <div className="lg:col-span-2">
          <div className="bg-white border-[1.5px] border-[#D3D3D3] rounded-[12px] p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
              <Upload size={18} className="text-[#3FA344]" />
              <h4 className="text-[18px] font-bold text-[#0A1413] font-montserrat">My Documents</h4>
            </div>

            {/* Upload Form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-normal text-[#0A1413] font-nunito">Document Name</label>
                <input
                  type="text"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="e.g. My Driving License"
                  className="w-full bg-white border border-[#9CA3AF] rounded-[4px] px-3 py-2.5 text-[14px] text-[#0A1413] font-nunito focus:outline-none focus:ring-1 focus:ring-[#3FA344] placeholder:text-[#9CA3AF]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-normal text-[#0A1413] font-nunito">Document Type</label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full bg-white border border-[#9CA3AF] rounded-[4px] px-3 py-2.5 text-[14px] text-[#0A1413] font-nunito focus:outline-none focus:ring-1 focus:ring-[#3FA344]"
                >
                  <option value="">Select type...</option>
                  <option value="DRIVING_LICENSE">Driving License</option>
                  <option value="NATIONAL_ID">National ID</option>
                  <option value="PASSPORT">Passport</option>
                  <option value="KRA_PIN">KRA PIN</option>
                  <option value="COMPANY_REGISTRATION">Company Registration</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-normal text-[#0A1413] font-nunito">File</label>
                <input
                  ref={docInputRef}
                  type="file"
                  onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                  className="w-full bg-white border border-[#9CA3AF] rounded-[4px] px-3 py-2 text-[13px] text-[#0A1413] font-nunito focus:outline-none file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-[12px] file:font-bold file:bg-[#EBF7ED] file:text-[#3FA34D] hover:file:bg-[#d5eedb]"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleDocUpload}
              disabled={isUploading}
              className="flex items-center gap-2 bg-[#3FA344] text-white px-6 py-2.5 rounded-[6px] font-bold text-[14px] font-wix hover:bg-[#358A3A] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Upload size={14} />
              {isUploading ? 'Uploading...' : 'Upload Document'}
            </button>

            {/* Existing Documents */}
            {documents.length > 0 && (
              <div className="space-y-2 mt-4">
                <p className="text-[13px] font-semibold text-[#0A1413] font-lato">Uploaded Documents</p>
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between bg-[#F8FAF9] border border-[#E8ECF0] rounded-[8px] px-4 py-3">
                    <div>
                      <p className="text-[13px] font-semibold text-[#1A202C] font-lato">{doc.name || doc.type}</p>
                      <p className="text-[11px] text-[#A0AEC0] font-lato">{doc.type} · {new Date(doc.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-[5px] text-[10px] font-lato ${getDocStatusStyles(doc.status)}`}>
                        {doc.status}
                      </span>
                      {doc.status !== 'VERIFIED' && (
                        <button
                          type="button"
                          onClick={() => handleDocDelete(doc.id)}
                          className="bg-[#FFF0F0] text-[#DC2626] p-1.5 rounded-[5px] hover:bg-[#ffe0e0] transition-all"
                          title="Delete document"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Save All Button */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#3FA344] text-white px-10 py-3 rounded-[6px] font-bold text-[14px] font-wix hover:bg-[#358A3A] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </form>
  );
}
