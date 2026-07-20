import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LocationPayload, LocationResponse } from '../../../lib/api/location.service';

const locationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  locationType: z.enum(['OFFICE', 'AIRPORT', 'HOTEL', 'PORT', 'SHOWROOM', 'OTHER']),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING']).optional(),
});

type LocationFormValues = z.infer<typeof locationSchema>;

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LocationPayload) => Promise<void>;
  initialData?: LocationResponse | null;
  isLoading?: boolean;
}

export default function LocationModal({ isOpen, onClose, onSubmit, initialData, isLoading }: LocationModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: '',
      address: '',
      city: '',
      locationType: 'OFFICE',
      status: 'ACTIVE',
    },
  });

  useEffect(() => {
    if (initialData && isOpen) {
      reset({
        name: initialData.name,
        address: initialData.address,
        city: initialData.city,
        locationType: initialData.locationType as any,
        status: initialData.status as any,
      });
    } else if (!isOpen) {
      reset();
    }
  }, [initialData, isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[16px] w-full max-w-[500px] shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-[#E8ECF0]">
          <h3 className="text-[18px] font-bold font-montserrat text-gray-900">
            {initialData ? 'Edit Location' : 'Add New Location'}
          </h3>
          <button onClick={onClose} disabled={isLoading} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-[12px] font-bold text-gray-700 font-lato mb-1">Location Name *</label>
              <input 
                {...register('name')}
                className={`w-full bg-[#F4F6F8] border ${errors.name ? 'border-red-500' : 'border-[#E8ECF0]'} rounded-[8px] py-2 px-3 text-[13px] text-[#1A202C] focus:outline-none focus:ring-1 focus:ring-[#3FA34D] font-lato`}
                placeholder="e.g. Downtown Office"
              />
              {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name.message}</p>}
            </div>
            
            <div>
              <label className="block text-[12px] font-bold text-gray-700 font-lato mb-1">Address *</label>
              <input 
                {...register('address')}
                className={`w-full bg-[#F4F6F8] border ${errors.address ? 'border-red-500' : 'border-[#E8ECF0]'} rounded-[8px] py-2 px-3 text-[13px] text-[#1A202C] focus:outline-none focus:ring-1 focus:ring-[#3FA34D] font-lato`}
                placeholder="e.g. 123 Main St"
              />
              {errors.address && <p className="text-red-500 text-[10px] mt-1">{errors.address.message}</p>}
            </div>

            <div>
              <label className="block text-[12px] font-bold text-gray-700 font-lato mb-1">City *</label>
              <input 
                {...register('city')}
                className={`w-full bg-[#F4F6F8] border ${errors.city ? 'border-red-500' : 'border-[#E8ECF0]'} rounded-[8px] py-2 px-3 text-[13px] text-[#1A202C] focus:outline-none focus:ring-1 focus:ring-[#3FA34D] font-lato`}
                placeholder="e.g. New York"
              />
              {errors.city && <p className="text-red-500 text-[10px] mt-1">{errors.city.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold text-gray-700 font-lato mb-1">Location Type *</label>
                <select 
                  {...register('locationType')}
                  className="w-full bg-[#F4F6F8] border border-[#E8ECF0] rounded-[8px] py-2 px-3 text-[13px] text-[#1A202C] focus:outline-none focus:ring-1 focus:ring-[#3FA34D] font-lato"
                >
                  <option value="OFFICE">Office</option>
                  <option value="AIRPORT">Airport</option>
                  <option value="HOTEL">Hotel</option>
                  <option value="PORT">Port</option>
                  <option value="SHOWROOM">Showroom</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[12px] font-bold text-gray-700 font-lato mb-1">Status</label>
                <select 
                  {...register('status')}
                  className="w-full bg-[#F4F6F8] border border-[#E8ECF0] rounded-[8px] py-2 px-3 text-[13px] text-[#1A202C] focus:outline-none focus:ring-1 focus:ring-[#3FA34D] font-lato"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="PENDING">Pending</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="p-5 border-t border-[#E8ECF0] bg-gray-50 flex justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 rounded-[6px] text-[13px] font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 rounded-[6px] text-[13px] font-bold text-white bg-[#3FA34D] hover:bg-[#348a41] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? 'Saving...' : (initialData ? 'Update Location' : 'Add Location')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
