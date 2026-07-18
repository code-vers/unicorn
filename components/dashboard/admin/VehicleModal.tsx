import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Upload, Info } from 'lucide-react';
import { VehicleResponse, VehicleImage } from '../../../lib/api/vehicle.service';
import { useLocations } from '../../../hooks/useLocations';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg+xml", "image/gif"];

const vehicleSchema = z.object({
  name: z.string().min(1, 'Vehicle name is required'),
  category: z.enum(['SALOON', 'SUV', 'VAN', 'LUXURY', 'FOUR_WD', 'CHAUFFEUR_DRIVEN', 'SELF_DRIVEN']),
  brand: z.string().min(1, 'Brand is required'),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  transmission: z.enum(['AUTOMATIC', 'MANUAL']),
  fuelType: z.enum(['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID']),
  seatingCapacity: z.number().min(1),
  luggageCapacity: z.number().nullable().optional(),
  dailyRate: z.number().min(0),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  availability: z.enum(['AVAILABLE', 'RENTED', 'MAINTENANCE']).optional(),
  locationId: z.string().min(1, 'Location is required'),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  initialData: VehicleResponse | null;
  isLoading: boolean;
}

export default function VehicleModal({ isOpen, onClose, onSubmit, initialData, isLoading }: VehicleModalProps) {
  const { locations } = useLocations({ limit: 100 });
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<VehicleImage[]>([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      status: 'ACTIVE',
      availability: 'AVAILABLE',
      fuelType: 'PETROL',
      category: 'SALOON',
      transmission: 'AUTOMATIC'
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          name: initialData.name,
          category: initialData.category as any,
          brand: initialData.brand,
          year: initialData.year,
          transmission: initialData.transmission as any,
          fuelType: initialData.fuelType as any,
          seatingCapacity: initialData.seatingCapacity,
          luggageCapacity: initialData.luggageCapacity,
          dailyRate: initialData.dailyRate,
          status: initialData.status as any,
          availability: initialData.availability as any,
          locationId: initialData.locationId,
        });
        setExistingImages(initialData.images || []);
        setImages([]);
      } else {
        reset({
          name: '',
          category: 'SALOON',
          brand: '',
          year: new Date().getFullYear(),
          transmission: 'AUTOMATIC',
          fuelType: 'PETROL',
          seatingCapacity: 4,
          luggageCapacity: 2,
          dailyRate: 0,
          status: 'ACTIVE',
          availability: 'AVAILABLE',
          locationId: '',
        });
        setImages([]);
        setExistingImages([]);
      }
    }
  }, [isOpen, initialData, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.filter(file => 
        ACCEPTED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE
      );
      setImages(prev => [...prev, ...validFiles]);
    }
  };

  const handleFormSubmit = async (data: VehicleFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    images.forEach((file) => {
      formData.append('images', file);
    });

    await onSubmit(formData);
  };

  if (!isOpen) return null;

  const labelClass = "block text-[14px] text-[#0a1413] font-nunito mb-1.5 leading-[1.6]";
  const inputClass = "w-full border-[1.5px] border-[#9ca3af] rounded-[4px] h-[43px] px-[12px] py-[8px] text-[14px] text-[#0a1413] font-nunito focus:outline-none focus:border-[#3fa344] placeholder:text-[#6b7280]";
  const selectClass = inputClass + " appearance-none bg-white cursor-pointer";
  
  // Custom chevron for selects
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
            {initialData ? 'Edit Vehicle' : 'Add Vehicle'}
          </h3>
          <button onClick={onClose} disabled={isLoading} className="text-[#0a1413] hover:opacity-70 transition-opacity">
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <form id="vehicle-form" onSubmit={handleSubmit(handleFormSubmit)} className="p-[24px] flex flex-col gap-[16px] overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[16px] gap-y-[16px]">
            {/* Left Column */}
            <div className="flex flex-col gap-[16px]">
              <div>
                <label className={labelClass}>Vehicle Name</label>
                <input {...register('name')} placeholder="Enter vehicle name" className={inputClass} />
                {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className={labelClass}>Brand</label>
                <input {...register('brand')} placeholder="Enter brand" className={inputClass} />
                {errors.brand && <p className="text-red-500 text-[10px] mt-1">{errors.brand.message}</p>}
              </div>

              <div>
                <label className={labelClass}>Transmission</label>
                <select {...register('transmission')} className={selectClass} style={selectStyle}>
                  <option value="" disabled>Select transmission</option>
                  <option value="AUTOMATIC">Automatic</option>
                  <option value="MANUAL">Manual</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Daily Rate</label>
                <div className="relative">
                  <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#6b7280] text-[14px] font-nunito pointer-events-none">KES</span>
                  <input type="number" {...register('dailyRate', { valueAsNumber: true })} placeholder="Enter daily rate" className={`${inputClass} pl-[45px]`} />
                </div>
                {errors.dailyRate && <p className="text-red-500 text-[10px] mt-1">{errors.dailyRate.message}</p>}
              </div>

              {/* Extra Backend Required Field */}
              <div>
                <label className={labelClass}>Fuel Type</label>
                <select {...register('fuelType')} className={selectClass} style={selectStyle}>
                  <option value="" disabled>Select fuel type</option>
                  <option value="PETROL">Petrol</option>
                  <option value="DIESEL">Diesel</option>
                  <option value="ELECTRIC">Electric</option>
                  <option value="HYBRID">Hybrid</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-[16px]">
              <div>
                <label className={labelClass}>Category</label>
                <select {...register('category')} className={selectClass} style={selectStyle}>
                  <option value="" disabled>Select category</option>
                  <option value="SALOON">Saloon</option>
                  <option value="SUV">SUV</option>
                  <option value="VAN">Van</option>
                  <option value="LUXURY">Luxury</option>
                  <option value="FOUR_WD">4WD</option>
                  <option value="CHAUFFEUR_DRIVEN">Chauffeur Driven</option>
                  <option value="SELF_DRIVEN">Self Driven</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Year</label>
                <input type="number" {...register('year', { valueAsNumber: true })} placeholder="Enter year" className={inputClass} />
                {errors.year && <p className="text-red-500 text-[10px] mt-1">{errors.year.message}</p>}
              </div>

              <div>
                <label className={labelClass}>Seating Capacity</label>
                <input type="number" {...register('seatingCapacity', { valueAsNumber: true })} placeholder="Enter number of seats" className={inputClass} />
                {errors.seatingCapacity && <p className="text-red-500 text-[10px] mt-1">{errors.seatingCapacity.message}</p>}
              </div>

              <div>
                <label className={labelClass}>Status</label>
                <select {...register('status')} className={selectClass} style={selectStyle}>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>

              {/* Extra Backend Required Field */}
              <div>
                <label className={labelClass}>Availability</label>
                <select {...register('availability')} className={selectClass} style={selectStyle}>
                  <option value="AVAILABLE">Available</option>
                  <option value="RENTED">Rented</option>
                  <option value="MAINTENANCE">Maintenance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Full Width Location */}
          <div className="mt-1">
            <label className={labelClass}>Current Location</label>
            <select {...register('locationId')} className={selectClass} style={selectStyle}>
              <option value="">Select location</option>
              {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
            </select>
            {errors.locationId && <p className="text-red-500 text-[10px] mt-1">{errors.locationId.message}</p>}
          </div>

          {/* Image Uploader */}
          <div className="mt-1">
            <label className={labelClass}>Vehicle Images</label>
            <div className="border-[1.5px] border-dashed border-[#e5e7eb] rounded-[8px] p-[24px] flex flex-col items-center justify-center gap-1.5 relative cursor-pointer hover:bg-gray-50 transition-colors">
              <input type="file" multiple accept={ACCEPTED_IMAGE_TYPES.join(',')} onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Upload className="text-[#6b7280] mb-1" size={24} strokeWidth={1.5} />
              <p className="text-[14px] text-[#0a1413] font-nunito text-center">Click to upload or drag and drop</p>
              <p className="text-[14px] text-[#6b7280] font-nunito text-center">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>

            {/* Image Previews */}
            {(images.length > 0 || existingImages.length > 0) && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {existingImages.map((img, idx) => (
                  <div key={`ext-${idx}`} className="relative aspect-video bg-gray-100 rounded-[6px] overflow-hidden border">
                    <img src={`http://localhost:5000${img.path}`} alt="vehicle" className="w-full h-full object-cover" />
                  </div>
                ))}
                {images.map((img, idx) => (
                  <div key={`new-${idx}`} className="relative aspect-video bg-gray-100 rounded-[6px] overflow-hidden border">
                    <img src={URL.createObjectURL(img)} alt="preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setImages(images.filter((_, i) => i !== idx))} className="absolute top-1 right-1 bg-red-500/80 text-white rounded-full p-1 hover:bg-red-600">
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Helper Note */}
          <div className="bg-[rgba(239,246,255,0.5)] border border-[#dbeafe] rounded-[4px] p-[13px] flex items-center gap-[6px] mt-1">
            <Info className="text-[#2563eb]" size={14} />
            <p className="text-[12px] text-[#2563eb] font-lato leading-[1.6]">
              Drop-off charges are applied per vehicle based on selected pickup and drop-off locations.
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end px-[24px] py-[16px] border-t border-[#e5e7eb] bg-white rounded-b-[12px] shrink-0">
          <button 
            type="submit"
            form="vehicle-form"
            disabled={isLoading}
            className="bg-[#3fa344] hover:bg-[#348a39] text-white font-wix font-bold text-[14px] px-[36px] py-[10px] rounded-[6px] transition-colors disabled:opacity-50 min-w-[150px] flex justify-center items-center h-[42px]"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              initialData ? 'Save Changes' : 'Save Vehicle'
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
