'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { DropOffChargePayload, DropOffChargeResponse, VehicleCategory, ChargeType, DropOffChargeStatus } from '../../../lib/api/dropOffCharge.service';
import { LocationService, LocationResponse } from '../../../lib/api/location.service';
import { VehicleService, VehicleResponse } from '../../../lib/api/vehicle.service';
import { Skeleton } from '@/components/ui/Skeleton';
import toast from 'react-hot-toast';


const VEHICLE_CATEGORIES: VehicleCategory[] = ['SALOON', 'SUV', 'VAN', 'LUXURY', 'FOUR_WD', 'CHAUFFEUR_DRIVEN', 'SELF_DRIVEN'];
const CHARGE_TYPES: ChargeType[] = ['FIXED', 'PER_KM'];
const STATUSES: DropOffChargeStatus[] = ['ACTIVE', 'INACTIVE'];

const dropOffChargeSchema = z.object({
  pickupLocationId: z.string().uuid('Please select a valid pickup location.'),
  dropOffLocationId: z.string().uuid('Please select a valid drop-off location.'),
  vehicleCategory: z.enum(['SALOON', 'SUV', 'VAN', 'LUXURY', 'FOUR_WD', 'CHAUFFEUR_DRIVEN', 'SELF_DRIVEN']).optional().or(z.literal('')),
  vehicleId: z.string().optional(),
  chargeType: z.enum(['FIXED', 'PER_KM']).optional().or(z.literal('')),
  amount: z.string().min(1, 'Amount is required').refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, 'Amount must be a valid positive number'),
  distanceKm: z.string().optional().refine((val) => !val || (!isNaN(parseFloat(val)) && parseFloat(val) > 0), 'Distance must be greater than zero'),
  seasonalMultiplier: z.string().optional().refine((val) => !val || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0), 'Must be a valid positive number'),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
}).refine((data) => data.pickupLocationId !== data.dropOffLocationId, {
  message: 'Pickup and drop-off locations cannot be the same.',
  path: ['dropOffLocationId'],
}).refine((data) => data.chargeType !== 'PER_KM' || Boolean(data.distanceKm), {
  message: 'Distance is required for a per-kilometre charge.',
  path: ['distanceKm'],
});

type DropOffChargeFormValues = z.infer<typeof dropOffChargeSchema>;

interface DropOffChargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DropOffChargePayload) => Promise<void>;
  initialData?: DropOffChargeResponse | null;
  isLoading?: boolean;
}

export default function DropOffChargeModal({ isOpen, onClose, onSubmit, initialData, isLoading }: DropOffChargeModalProps) {
  const [locations, setLocations] = useState<LocationResponse[]>([]);
  const [vehicles, setVehicles] = useState<VehicleResponse[]>([]);
  const [isFetchingOptions, setIsFetchingOptions] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<DropOffChargeFormValues>({
    resolver: zodResolver(dropOffChargeSchema),
    defaultValues: {
      pickupLocationId: '',
      dropOffLocationId: '',
      vehicleCategory: '',
      vehicleId: '',
      chargeType: 'FIXED',
      amount: '0',
      distanceKm: '',
      seasonalMultiplier: '',
      status: 'ACTIVE',
    },
  });
  const chargeType = watch('chargeType');

  useEffect(() => {
    if (isOpen) {
      setIsFetchingOptions(true);
      Promise.all([
        LocationService.getLocations({ limit: 200 }),
        VehicleService.getVehicles({ limit: 200 }),
      ]).then(([locRes, vehRes]) => {
        setLocations(locRes.data);
        setVehicles(vehRes.data);
      }).catch((error: unknown) => {
        toast.error(error instanceof Error ? error.message : 'Failed to load form options');
      }).finally(() => setIsFetchingOptions(false));
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialData && isOpen) {
      reset({
        pickupLocationId: initialData.pickupLocationId,
        dropOffLocationId: initialData.dropOffLocationId,
        vehicleCategory: initialData.vehicleCategory ?? '',
        vehicleId: initialData.vehicleId ?? '',
        chargeType: initialData.chargeType ?? 'FIXED',
        amount: String(initialData.amount),
        distanceKm: initialData.distanceKm != null ? String(initialData.distanceKm) : '',
        seasonalMultiplier: initialData.seasonalMultiplier != null ? String(initialData.seasonalMultiplier) : '',
        status: initialData.status,
      });
    } else if (!isOpen) {
      reset({
        pickupLocationId: '',
        dropOffLocationId: '',
        vehicleCategory: '',
        vehicleId: '',
        chargeType: 'FIXED',
        amount: '0',
        distanceKm: '',
        seasonalMultiplier: '',
        status: 'ACTIVE',
      });
    }
  }, [initialData, isOpen, reset]);

  if (!isOpen) return null;

  const handleFormSubmit = (values: DropOffChargeFormValues) => {
    const amountNum = parseFloat(values.amount);
    if (isNaN(amountNum) || amountNum < 0) return;

    const payload: DropOffChargePayload = {
      pickupLocationId: values.pickupLocationId,
      dropOffLocationId: values.dropOffLocationId,
      amount: amountNum,
      ...(values.distanceKm ? { distanceKm: parseFloat(values.distanceKm) } : {}),
      ...(values.vehicleCategory ? { vehicleCategory: values.vehicleCategory as VehicleCategory } : {}),
      ...(values.vehicleId ? { vehicleId: values.vehicleId } : {}),
      ...(values.chargeType ? { chargeType: values.chargeType as ChargeType } : {}),
      ...(values.seasonalMultiplier ? { seasonalMultiplier: parseFloat(values.seasonalMultiplier) } : {}),
      ...(values.status ? { status: values.status } : {}),
    };
    onSubmit(payload);
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-[#F4F6F8] border ${hasError ? 'border-red-500' : 'border-[#E8ECF0]'} rounded-[8px] py-2 px-3 text-[13px] text-[#1A202C] focus:outline-none focus:ring-1 focus:ring-[#3FA34D] font-lato`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[16px] w-full max-w-[580px] shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-[#E8ECF0] shrink-0">
          <h3 className="text-[18px] font-bold font-montserrat text-gray-900">
            {initialData ? 'Edit Drop-Off Charge' : 'Add Drop-Off Charge'}
          </h3>
          <button onClick={onClose} disabled={isLoading} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col overflow-y-auto">
          <div className="p-5 space-y-4">
            {isFetchingOptions && (
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2' role='status' aria-label='Loading options'>
                <Skeleton className='h-10 w-full' />
                <Skeleton className='h-10 w-full' />
              </div>
            )}

            {/* Locations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold text-gray-700 font-lato mb-1">Pickup Location *</label>
                <select {...register('pickupLocationId')} className={inputClass(!!errors.pickupLocationId)}>
                  <option value="">Select pickup location</option>
                  {locations.map(l => (
                    <option key={l.id} value={l.id}>{l.name} ({l.city})</option>
                  ))}
                </select>
                {errors.pickupLocationId && <p className="text-red-500 text-[10px] mt-1">{errors.pickupLocationId.message}</p>}
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-700 font-lato mb-1">Drop-Off Location *</label>
                <select {...register('dropOffLocationId')} className={inputClass(!!errors.dropOffLocationId)}>
                  <option value="">Select drop-off location</option>
                  {locations.map(l => (
                    <option key={l.id} value={l.id}>{l.name} ({l.city})</option>
                  ))}
                </select>
                {errors.dropOffLocationId && <p className="text-red-500 text-[10px] mt-1">{errors.dropOffLocationId.message}</p>}
              </div>
            </div>

            {/* Vehicle Category & Specific Vehicle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold text-gray-700 font-lato mb-1">Vehicle Category <span className="text-gray-400 font-normal">(optional)</span></label>
                <select {...register('vehicleCategory')} className={inputClass(false)}>
                  <option value="">All Categories</option>
                  {VEHICLE_CATEGORIES.map(c => (
                    <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-700 font-lato mb-1">Specific Vehicle <span className="text-gray-400 font-normal">(optional)</span></label>
                <select {...register('vehicleId')} className={inputClass(false)}>
                  <option value="">All Vehicles</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>{v.name} ({v.brand})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Charge Type & Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold text-gray-700 font-lato mb-1">Charge Type</label>
                <select {...register('chargeType')} className={inputClass(false)}>
                  {CHARGE_TYPES.map(t => (
                    <option key={t} value={t}>{t.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-700 font-lato mb-1">Amount (KES) *</label>
                <input
                  type="text"
                  inputMode="decimal"
                  {...register('amount')}
                  onInput={(e) => {
                    let val = e.currentTarget.value.replace(/[^0-9.]/g, '');
                    const parts = val.split('.');
                    if (parts.length > 2) val = parts[0] + '.' + parts.slice(1).join('');
                    e.currentTarget.value = val;
                  }}
                  className={inputClass(!!errors.amount)}
                  placeholder="0.00"
                />
                {errors.amount && <p className="text-red-500 text-[10px] mt-1">{errors.amount.message}</p>}
              </div>
            </div>

            {chargeType === 'PER_KM' && (
              <div>
                <label className="block text-[12px] font-bold text-gray-700 font-lato mb-1">Route Distance (km) *</label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  {...register('distanceKm')}
                  className={inputClass(!!errors.distanceKm)}
                  placeholder="e.g. 24.5"
                />
                {errors.distanceKm && <p className="text-red-500 text-[10px] mt-1">{errors.distanceKm.message}</p>}
              </div>
            )}

            {/* Seasonal Multiplier & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold text-gray-700 font-lato mb-1">Seasonal Multiplier <span className="text-gray-400 font-normal">(optional)</span></label>
                <input
                  type="text"
                  inputMode="decimal"
                  {...register('seasonalMultiplier')}
                  onInput={(e) => {
                    let val = e.currentTarget.value.replace(/[^0-9.]/g, '');
                    const parts = val.split('.');
                    if (parts.length > 2) val = parts[0] + '.' + parts.slice(1).join('');
                    e.currentTarget.value = val;
                  }}
                  className={inputClass(false)}
                  placeholder="e.g. 1.5"
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-700 font-lato mb-1">Status</label>
                <select {...register('status')} className={inputClass(false)}>
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-[#E8ECF0] bg-gray-50 flex justify-end gap-3 shrink-0">
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
              disabled={isLoading || isFetchingOptions}
              className="px-6 py-2 rounded-[6px] text-[13px] font-bold text-white bg-[#3FA34D] hover:bg-[#348a41] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? 'Saving...' : (initialData ? 'Update Charge' : 'Add Charge')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
