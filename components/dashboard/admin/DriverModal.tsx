import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Upload, Info } from 'lucide-react';
import { DriverResponse } from '../../../lib/api/driver.service';
import { useVehicles } from '../../../hooks/useVehicles';
import { Spinner } from '@/components/ui/Spinner';


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg+xml", "image/gif"];

const driverSchema = z.object({
  name: z.string().min(1, 'Driver name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  whatsappNumber: z.string().min(1, 'WhatsApp number is required'),
  licenseDetails: z.string().optional(),
  notes: z.string().optional(),
  availability: z.enum(['AVAILABLE', 'ASSIGNED', 'UNAVAILABLE']).optional(),
  assignedVehicleId: z.string().optional(),
});

type DriverFormData = z.infer<typeof driverSchema>;

interface DriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  initialData: DriverResponse | null;
  isLoading: boolean;
}

export default function DriverModal({ isOpen, onClose, onSubmit, initialData, isLoading }: DriverModalProps) {
  const { vehicles } = useVehicles({ limit: 100 });
  const [photo, setPhoto] = useState<File | null>(null);
  const [licensePhoto, setLicensePhoto] = useState<File | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<DriverFormData>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      availability: 'AVAILABLE',
      assignedVehicleId: ''
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          name: initialData.name,
          phoneNumber: initialData.phoneNumber,
          whatsappNumber: initialData.whatsappNumber,
          licenseDetails: initialData.licenseDetails || '',
          notes: initialData.notes || '',
          availability: initialData.availability,
          assignedVehicleId: initialData.assignedVehicleId || '',
        });
        setPhoto(null);
        setLicensePhoto(null);
      } else {
        reset({
          name: '',
          phoneNumber: '',
          whatsappNumber: '',
          licenseDetails: '',
          notes: '',
          availability: 'AVAILABLE',
          assignedVehicleId: '',
        });
        setPhoto(null);
        setLicensePhoto(null);
      }
    }
  }, [isOpen, initialData, reset]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (ACCEPTED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE) {
        setPhoto(file);
      }
    }
  };

  const handleLicensePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (ACCEPTED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE) {
        setLicensePhoto(file);
      }
    }
  };

  const handleFormSubmit = async (data: DriverFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value.toString());
      }
    });

    if (photo) {
      formData.append('photo', photo);
    }
    if (licensePhoto) {
      formData.append('licensePhoto', licensePhoto);
    }

    await onSubmit(formData);
  };

  if (!isOpen) return null;

  const labelClass = "block text-[14px] text-[#0a1413] font-nunito mb-1.5 leading-[1.6]";
  const inputClass = "w-full border-[1.5px] border-[#9ca3af] rounded-[4px] h-[43px] px-[12px] py-[8px] text-[14px] text-[#0a1413] font-nunito focus:outline-none focus:border-[#3fa344] placeholder:text-[#6b7280]";
  const selectClass = inputClass + " appearance-none bg-white cursor-pointer";
  
  const selectStyle = {
    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-hidden">
      <div className="bg-white rounded-[12px] w-full max-w-[670px] max-h-[90vh] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e7eb] shrink-0">
          <h3 className="text-[18px] font-bold font-montserrat text-[#0a1413] leading-[28px]">
            {initialData ? 'Edit Driver' : 'Add Driver'}
          </h3>
          <button onClick={onClose} disabled={isLoading} className="text-[#0a1413] hover:opacity-70 transition-opacity">
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <form id="driver-form" onSubmit={handleSubmit(handleFormSubmit)} className="p-[24px] flex flex-col gap-[16px] overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[16px] gap-y-[16px]">
            {/* Left Column */}
            <div className="flex flex-col gap-[16px]">
              <div>
                <label className={labelClass}>Driver Name</label>
                <input {...register('name')} placeholder="Enter driver name" className={inputClass} />
                {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <input {...register('phoneNumber')} placeholder="Enter phone number" className={inputClass} />
                {errors.phoneNumber && <p className="text-red-500 text-[10px] mt-1">{errors.phoneNumber.message}</p>}
              </div>

              <div>
                <label className={labelClass}>Availability</label>
                <select {...register('availability')} className={selectClass} style={selectStyle}>
                  <option value="AVAILABLE">Available</option>
                  <option value="ASSIGNED">Assigned</option>
                  <option value="UNAVAILABLE">Unavailable</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-[16px]">
              <div>
                <label className={labelClass}>WhatsApp Number</label>
                <input {...register('whatsappNumber')} placeholder="Enter WhatsApp number" className={inputClass} />
                {errors.whatsappNumber && <p className="text-red-500 text-[10px] mt-1">{errors.whatsappNumber.message}</p>}
              </div>

              <div>
                <label className={labelClass}>License Details</label>
                <input {...register('licenseDetails')} placeholder="Enter license details" className={inputClass} />
                {errors.licenseDetails && <p className="text-red-500 text-[10px] mt-1">{errors.licenseDetails.message}</p>}
              </div>

              <div>
                <label className={labelClass}>Assigned Vehicle (Optional)</label>
                <select {...register('assignedVehicleId')} className={selectClass} style={selectStyle}>
                  <option value="">None</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>{v.name} ({v.brand})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-1">
            <label className={labelClass}>Notes (Optional)</label>
            <input {...register('notes')} placeholder="Enter any notes" className={inputClass} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[16px] gap-y-[16px] mt-1">
            {/* Profile Photo Uploader */}
            <div>
              <label className={labelClass}>Profile Photo</label>
              <div className="border-[1.5px] border-dashed border-[#e5e7eb] rounded-[8px] p-[24px] flex flex-col items-center justify-center gap-1.5 relative cursor-pointer hover:bg-gray-50 transition-colors h-[160px]">
                <input type="file" accept={ACCEPTED_IMAGE_TYPES.join(',')} onChange={handlePhotoChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <Upload className="text-[#6b7280] mb-1" size={24} strokeWidth={1.5} />
                <p className="text-[12px] text-[#0a1413] font-nunito text-center">Click to upload photo</p>
              </div>
              {photo && (
                <div className="mt-2 text-[12px] text-green-600 font-semibold flex justify-between items-center bg-green-50 p-2 rounded">
                  <span className="truncate max-w-[150px]">{photo.name}</span>
                  <button type="button" onClick={() => setPhoto(null)}><X size={14}/></button>
                </div>
              )}
              {!photo && initialData?.photoUrl && (
                <div className="mt-2 text-[12px] text-gray-500 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden border">
                    <img src={`http://localhost:5000${initialData.photoUrl}`} className="w-full h-full object-cover" alt="Current photo" />
                  </div>
                  Current photo
                </div>
              )}
            </div>

            {/* License Photo Uploader */}
            <div>
              <label className={labelClass}>License Photo</label>
              <div className="border-[1.5px] border-dashed border-[#e5e7eb] rounded-[8px] p-[24px] flex flex-col items-center justify-center gap-1.5 relative cursor-pointer hover:bg-gray-50 transition-colors h-[160px]">
                <input type="file" accept={ACCEPTED_IMAGE_TYPES.join(',')} onChange={handleLicensePhotoChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <Upload className="text-[#6b7280] mb-1" size={24} strokeWidth={1.5} />
                <p className="text-[12px] text-[#0a1413] font-nunito text-center">Click to upload license</p>
              </div>
              {licensePhoto && (
                <div className="mt-2 text-[12px] text-green-600 font-semibold flex justify-between items-center bg-green-50 p-2 rounded">
                  <span className="truncate max-w-[150px]">{licensePhoto.name}</span>
                  <button type="button" onClick={() => setLicensePhoto(null)}><X size={14}/></button>
                </div>
              )}
              {!licensePhoto && initialData?.licensePhotoUrl && (
                <div className="mt-2 text-[12px] text-gray-500 flex items-center gap-2">
                  <div className="w-8 h-6 rounded overflow-hidden border">
                    <img src={`http://localhost:5000${initialData.licensePhotoUrl}`} className="w-full h-full object-cover" alt="Current license" />
                  </div>
                  Current license
                </div>
              )}
            </div>
          </div>

          {/* Helper Note */}
          <div className="bg-[rgba(239,246,255,0.5)] border border-[#dbeafe] rounded-[4px] p-[13px] flex items-center gap-[6px] mt-1">
            <Info className="text-[#2563eb]" size={14} />
            <p className="text-[12px] text-[#2563eb] font-lato leading-[1.6]">
              Drivers marked as AVAILABLE will be assigned to incoming bookings automatically.
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end px-[24px] py-[16px] border-t border-[#e5e7eb] bg-white rounded-b-[12px] shrink-0">
          <button 
            type="submit"
            form="driver-form"
            disabled={isLoading}
            className="bg-[#3fa344] hover:bg-[#348a39] text-white font-wix font-bold text-[14px] px-[36px] py-[10px] rounded-[6px] transition-colors disabled:opacity-50 min-w-[150px] flex justify-center items-center h-[42px]"
          >
            {isLoading ? (
              <Spinner size="sm" variant="white" />
            ) : (
              initialData ? 'Save Changes' : 'Save Driver'
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
