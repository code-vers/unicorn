import { Spinner } from '@/components/ui/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info, Upload, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { useLocations } from '../../../hooks/useLocations';
import { FeatureResponse, FeatureService } from '../../../lib/api/feature.service';
import { VehicleImage, VehicleResponse } from '../../../lib/api/vehicle.service';
import { getAssetUrl } from '@/lib/asset-url';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const vehicleSchema = z.object({
  name: z.string().min(1, 'Vehicle name is required'),
  category: z.enum([
    'SALOON',
    'SUV',
    'VAN',
    'LUXURY',
    'FOUR_WD',
    'CHAUFFEUR_DRIVEN',
    'SELF_DRIVEN',
  ]),
  brand: z.string().min(1, 'Brand is required'),
  year: z
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  transmission: z.enum(['AUTOMATIC', 'MANUAL']),
  fuelType: z.enum(['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID']),
  seatingCapacity: z.number().min(1),
  luggageCapacity: z.number().min(0, 'Luggage capacity cannot be negative').nullable().optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
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

export default function VehicleModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: VehicleModalProps) {
  const { locations } = useLocations({ limit: 100 });
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<VehicleImage[]>([]);
  const [availableFeatures, setAvailableFeatures] = useState<FeatureResponse[]>([]);
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const [newFeatureName, setNewFeatureName] = useState('');
  const [isSavingFeature, setIsSavingFeature] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      status: 'ACTIVE',
      availability: 'AVAILABLE',
      fuelType: 'PETROL',
      category: 'SALOON',
      transmission: 'AUTOMATIC',
      features: [],
      isFeatured: false,
      description: '',
      luggageCapacity: 2,
    },
  });

  useEffect(() => {
    if (isOpen) {
      FeatureService.getFeatures({ limit: 100 })
        .then((res) => setAvailableFeatures(res.data))
        .catch((error: unknown) =>
          toast.error(error instanceof Error ? error.message : 'Failed to load features')
        );

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
          description: initialData.description || '',
          features: initialData.features?.map((f) => f.id) || [],
          isFeatured: initialData.isFeatured || false,
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
          description: '',
          features: [],
          isFeatured: false,
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
      const validFiles = selectedFiles.filter(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE,
      );
      setImages((prev) => [...prev, ...validFiles]);
    }
  };

  const handleCreateFeature = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!newFeatureName.trim()) return;

    try {
      setIsSavingFeature(true);
      const newFeature = await FeatureService.createFeature({
        name: newFeatureName.trim(),
        charge: 0,
        isAddon: false,
      });
      setAvailableFeatures((prev) => [...prev, newFeature]);

      const currentFeatures = getValues('features') || [];
      setValue('features', [...currentFeatures, newFeature.id], { shouldDirty: true });

      setNewFeatureName('');
      setIsAddingFeature(false);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to create feature');
    } finally {
      setIsSavingFeature(false);
    }
  };

  const handleDeleteFeature = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete the feature "${name}"?`)) {
      return;
    }

    try {
      await FeatureService.deleteFeature(id);
      setAvailableFeatures((prev) => prev.filter((f) => f.id !== id));

      // Remove it from the form's selected features if it was checked
      const currentFeatures = getValues('features') || [];
      if (currentFeatures.includes(id)) {
        setValue(
          'features',
          currentFeatures.filter((fId) => fId !== id),
          { shouldDirty: true },
        );
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete feature');
    }
  };

  const handleFormSubmit = async (data: VehicleFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === 'features') {
          formData.append(key, JSON.stringify(value));
        } else if (typeof value === 'boolean') {
          formData.append(key, value ? 'true' : 'false');
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    images.forEach((file) => {
      formData.append('images', file);
    });

    await onSubmit(formData);
  };

  if (!isOpen) return null;

  const labelClass = 'block text-[14px] text-[#0a1413] font-nunito mb-1.5 leading-[1.6]';
  const inputClass =
    'w-full border-[1.5px] border-[#9ca3af] rounded-[4px] h-[43px] px-[12px] py-[8px] text-[14px] text-[#0a1413] font-nunito focus:outline-none focus:border-[#3fa344] placeholder:text-[#6b7280]';
  const selectClass = inputClass + ' appearance-none bg-white cursor-pointer';

  // Custom chevron for selects
  const selectStyle = {
    backgroundImage:
      'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-hidden'>
      <div className='bg-white rounded-[12px] w-full max-w-[670px] max-h-[90vh] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col animate-in fade-in zoom-in-95 duration-200'>
        {/* Header */}
        <div className='flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e7eb] shrink-0'>
          <h3 className='text-[18px] font-bold font-montserrat text-[#0a1413] leading-[28px]'>
            {initialData ? 'Edit Vehicle' : 'Add Vehicle'}
          </h3>
          <button
            onClick={onClose}
            disabled={isLoading}
            className='text-[#0a1413] hover:opacity-70 transition-opacity'
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <form
          id='vehicle-form'
          onSubmit={handleSubmit(handleFormSubmit)}
          className='p-[24px] flex flex-col gap-[16px] overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
        >
          {/* Section 1: Basic Information */}
          <div className='mb-2'>
            <h4 className='text-[14px] font-bold text-[#0a1413] font-montserrat mb-3 pb-1 border-b border-gray-100'>
              Basic Information
            </h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-[16px]'>
              <div>
                <label className={labelClass}>Vehicle Name (Model)</label>
                <input
                  {...register('name')}
                  placeholder='Enter vehicle name'
                  className={inputClass}
                />
                {errors.name && (
                  <p className='text-red-500 text-[10px] mt-1'>{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Brand</label>
                <input {...register('brand')} placeholder='Enter brand' className={inputClass} />
                {errors.brand && (
                  <p className='text-red-500 text-[10px] mt-1'>{errors.brand.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select {...register('category')} className={selectClass} style={selectStyle}>
                  <option value='' disabled>
                    Select category
                  </option>
                  <option value='SALOON'>Saloon</option>
                  <option value='SUV'>SUV</option>
                  <option value='VAN'>Van</option>
                  <option value='LUXURY'>Luxury</option>
                  <option value='FOUR_WD'>4WD</option>
                  <option value='CHAUFFEUR_DRIVEN'>Chauffeur Driven</option>
                  <option value='SELF_DRIVEN'>Self Driven</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Year</label>
                <input
                  type='number'
                  {...register('year', { valueAsNumber: true })}
                  placeholder='Enter year'
                  className={inputClass}
                />
                {errors.year && (
                  <p className='text-red-500 text-[10px] mt-1'>{errors.year.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Specifications */}
          <div className='mb-2'>
            <h4 className='text-[14px] font-bold text-[#0a1413] font-montserrat mb-3 pb-1 border-b border-gray-100'>
              Specifications
            </h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-[16px]'>
              <div>
                <label className={labelClass}>Transmission</label>
                <select {...register('transmission')} className={selectClass} style={selectStyle}>
                  <option value='' disabled>
                    Select transmission
                  </option>
                  <option value='AUTOMATIC'>Automatic</option>
                  <option value='MANUAL'>Manual</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Fuel Type</label>
                <select {...register('fuelType')} className={selectClass} style={selectStyle}>
                  <option value='' disabled>
                    Select fuel type
                  </option>
                  <option value='PETROL'>Petrol</option>
                  <option value='DIESEL'>Diesel</option>
                  <option value='ELECTRIC'>Electric</option>
                  <option value='HYBRID'>Hybrid</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Seating Capacity</label>
                <input
                  type='number'
                  {...register('seatingCapacity', { valueAsNumber: true })}
                  placeholder='Enter number of seats'
                  className={inputClass}
                />
                {errors.seatingCapacity && (
                  <p className='text-red-500 text-[10px] mt-1'>{errors.seatingCapacity.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Luggage Capacity</label>
                <input
                  type='number'
                  {...register('luggageCapacity', { valueAsNumber: true })}
                  placeholder='Enter luggage capacity'
                  className={inputClass}
                />
                {errors.luggageCapacity && (
                  <p className='text-red-500 text-[10px] mt-1'>{errors.luggageCapacity.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Details & Features */}
          <div className='mb-2'>
            <h4 className='text-[14px] font-bold text-[#0a1413] font-montserrat mb-3 pb-1 border-b border-gray-100'>
              Details & Features
            </h4>
            <div className='flex flex-col gap-[16px]'>
              <div>
                <label className={labelClass}>Current Location</label>
                <select {...register('locationId')} className={selectClass} style={selectStyle}>
                  <option value=''>Select location</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
                {errors.locationId && (
                  <p className='text-red-500 text-[10px] mt-1'>{errors.locationId.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  {...register('description')}
                  placeholder='Enter vehicle description'
                  className={`${inputClass} min-h-[80px] py-2 resize-y`}
                />
              </div>
              <div>
                <label className={labelClass}>Features</label>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 border-[1.5px] border-[#9ca3af] rounded-[4px] p-3 max-h-[150px] overflow-y-auto mb-2'>
                  {availableFeatures.map((feature) => {
                    const selectedFeatures = watch('features') || [];
                    const isChecked = selectedFeatures.includes(feature.id);
                    return (
                      <label
                        key={feature.id}
                        className='flex items-center gap-2 cursor-pointer group relative'
                      >
                        <input
                          type='checkbox'
                          checked={isChecked}
                          onChange={(e) => {
                            const current = getValues('features') || [];
                            if (e.target.checked) {
                              setValue('features', [...current, feature.id], { shouldDirty: true });
                            } else {
                              setValue(
                                'features',
                                current.filter((id: string) => id !== feature.id),
                                { shouldDirty: true },
                              );
                            }
                          }}
                          className='w-4 h-4 text-[#3fa344] focus:ring-[#3fa344] border-gray-300 rounded cursor-pointer'
                        />
                        <span className='text-[13px] text-[#0a1413] font-nunito group-hover:text-[#3fa344] transition-colors pr-6 truncate'>
                          {feature.name}
                        </span>

                        <button
                          type='button'
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation(); // prevent checking/unchecking the box
                            handleDeleteFeature(feature.id, feature.name);
                          }}
                          className='absolute right-0 top-1/2 -translate-y-1/2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded'
                          title='Delete feature permanently'
                        >
                          <X size={12} strokeWidth={2.5} />
                        </button>
                      </label>
                    );
                  })}
                  {availableFeatures.length === 0 && (
                    <span className='text-xs text-gray-500 col-span-3'>
                      No features found. You can add one below.
                    </span>
                  )}
                </div>

                {/* Inline Feature Add */}
                {!isAddingFeature ? (
                  <button
                    type='button'
                    onClick={() => setIsAddingFeature(true)}
                    className='text-[#3fa344] text-[13px] font-bold font-nunito hover:underline flex items-center gap-1'
                  >
                    + Add Custom Feature
                  </button>
                ) : (
                  <div className='flex items-center gap-2 mt-2'>
                    <input
                      type='text'
                      value={newFeatureName}
                      onChange={(e) => setNewFeatureName(e.target.value)}
                      placeholder='e.g. Leather Seats'
                      className={`${inputClass} h-[36px] flex-1`}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleCreateFeature(e);
                        }
                      }}
                    />
                    <button
                      type='button'
                      onClick={handleCreateFeature}
                      disabled={isSavingFeature || !newFeatureName.trim()}
                      className='bg-[#3fa344] text-white px-3 py-1.5 rounded-[4px] text-[13px] font-bold disabled:opacity-50 min-w-[60px]'
                    >
                      {isSavingFeature ? '...' : 'Save'}
                    </button>
                    <button
                      type='button'
                      onClick={() => {
                        setIsAddingFeature(false);
                        setNewFeatureName('');
                      }}
                      className='bg-gray-200 text-gray-700 px-3 py-1.5 rounded-[4px] text-[13px] font-bold hover:bg-gray-300'
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Status & Visibility */}
          <div className='mb-2'>
            <h4 className='text-[14px] font-bold text-[#0a1413] font-montserrat mb-3 pb-1 border-b border-gray-100'>
              Status & Visibility
            </h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-[16px] mb-4'>
              <div>
                <label className={labelClass}>Status</label>
                <select {...register('status')} className={selectClass} style={selectStyle}>
                  <option value='ACTIVE'>Active</option>
                  <option value='INACTIVE'>Inactive</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Availability</label>
                <select {...register('availability')} className={selectClass} style={selectStyle}>
                  <option value='AVAILABLE'>Available</option>
                  <option value='RENTED'>Rented</option>
                  <option value='MAINTENANCE'>Maintenance</option>
                </select>
              </div>
            </div>
            <div>
              <label className='flex items-center gap-3 cursor-pointer group w-fit bg-[#ffffff] px-4 py-3 border border-gray-200 rounded-[8px]'>
                <input
                  type='checkbox'
                  {...register('isFeatured')}
                  className='w-5 h-5 text-[#3fa344] focus:ring-[#3fa344] border-gray-300 rounded cursor-pointer'
                />
                <span className='text-[14px] text-[#0a1413] font-bold font-nunito group-hover:text-[#3fa344] transition-colors'>
                  Featured Vehicle (Display on Homepage)
                </span>
              </label>
            </div>
          </div>

          {/* Section 5: Media */}
          <div className='mb-1'>
            <h4 className='text-[14px] font-bold text-[#0a1413] font-montserrat mb-3 pb-1 border-b border-gray-100'>
              Media
            </h4>
            <label className={labelClass}>Vehicle Images</label>
            <div className='border-[1.5px] border-dashed border-[#e5e7eb] rounded-[8px] p-[24px] flex flex-col items-center justify-center gap-1.5 relative cursor-pointer hover:bg-gray-50 transition-colors'>
              <input
                type='file'
                multiple
                accept={ACCEPTED_IMAGE_TYPES.join(',')}
                onChange={handleImageChange}
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              />
              <Upload className='text-[#6b7280] mb-1' size={24} strokeWidth={1.5} />
              <p className='text-[14px] text-[#0a1413] font-nunito text-center'>
                Click to upload or drag and drop
              </p>
              <p className='text-[14px] text-[#6b7280] font-nunito text-center'>
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>

            {/* Image Previews */}
            {(images.length > 0 || existingImages.length > 0) && (
              <div className='grid grid-cols-4 gap-2 mt-3'>
                {existingImages.map((img, idx) => (
                  <div
                    key={`ext-${idx}`}
                    className='relative aspect-video bg-gray-100 rounded-[6px] overflow-hidden border'
                  >
                    <img
                    src={getAssetUrl(img.path)}
                      alt='vehicle'
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
                {images.map((img, idx) => (
                  <div
                    key={`new-${idx}`}
                    className='relative aspect-video bg-gray-100 rounded-[6px] overflow-hidden border'
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt='preview'
                      className='w-full h-full object-cover'
                    />
                    <button
                      type='button'
                      onClick={() => setImages(images.filter((_, i) => i !== idx))}
                      className='absolute top-1 right-1 bg-red-500/80 text-white rounded-full p-1 hover:bg-red-600'
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Helper Note */}
          <div className='bg-[rgba(239,246,255,0.5)] border border-[#dbeafe] rounded-[4px] p-[13px] flex items-center gap-[6px] mt-1'>
            <Info className='text-[#2563eb]' size={14} />
            <p className='text-[12px] text-[#2563eb] font-lato leading-[1.6]'>
              Drop-off charges are applied per vehicle based on selected pickup and drop-off
              locations.
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className='flex justify-end px-[24px] py-[16px] border-t border-[#e5e7eb] bg-white rounded-b-[12px] shrink-0'>
          <button
            type='submit'
            form='vehicle-form'
            disabled={isLoading}
            className='bg-[#3fa344] hover:bg-[#348a39] text-white font-wix font-bold text-[14px] px-[36px] py-[10px] rounded-[6px] transition-colors disabled:opacity-50 min-w-[150px] flex justify-center items-center h-[42px]'
          >
            {isLoading ? (
              <Spinner size='sm' variant='white' />
            ) : initialData ? (
              'Save Changes'
            ) : (
              'Save Vehicle'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
