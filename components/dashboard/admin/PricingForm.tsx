'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Trash2 } from 'lucide-react';
import { VehicleService, VehicleResponse } from '@/lib/api/vehicle.service';
import { PricingService, PricingPayload } from '@/lib/api/pricing.service';
import { Spinner } from '@/components/ui/Spinner';
import { SectionSkeleton } from '@/components/ui/Skeleton';


const defaultPricing: PricingPayload = {
  dailyRate: 0,
  weeklyRate: 0,
  monthlyRate: 0,
  selfDriveRate: 0,
  chauffeurRate: 0,
  seasonalMultiplier: 1,
  extraDayCharge: 0,
  lateReturnHourlyCharge: 0,
  securityDeposit: 0,
  deliveryCollectionCharge: 0,
  airportPickupDropCharge: 0,
  extraMileageCharge: 0,
  discountPercentage: 0,
  discountValidUntil: '',
  gpsCharge: 0,
  fullInsuranceCharge: 0,
  additionalDriverCharge: 0,
  childSeatCharge: 0,
};

export default function PricingForm() {
  const [vehicles, setVehicles] = useState<VehicleResponse[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('GLOBAL');
  const [formData, setFormData] = useState<PricingPayload>(defaultPricing);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    fetchPricing(selectedVehicleId);
  }, [selectedVehicleId]);

  async function fetchVehicles() {
    try {
      const response = await VehicleService.getVehicles({ limit: 100 });
      setVehicles(response.data);
    } catch (error: unknown) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to fetch vehicles'
      });
    }
  }

  async function fetchPricing(vehicleId: string) {
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const vId = vehicleId === 'GLOBAL' ? undefined : vehicleId;
      const pricing = await PricingService.getPricing(vId);
      if (pricing) {
        // Format date string for input type="date" if it exists
        const formattedDate = pricing.discountValidUntil 
          ? new Date(pricing.discountValidUntil).toISOString().split('T')[0]
          : '';
        
        const parsedPricing: Record<string, any> = { ...pricing };
        Object.keys(defaultPricing).forEach(key => {
          if (key !== 'discountValidUntil' && parsedPricing[key] !== undefined) {
            parsedPricing[key] = Number(parsedPricing[key]);
          }
        });

        setFormData({
          ...defaultPricing,
          ...parsedPricing,
          discountValidUntil: formattedDate
        });
      } else {
        setFormData(defaultPricing);
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to fetch pricing' });
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value ? Number(value) : 0) : value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const payload: PricingPayload = {
        ...formData,
        vehicleId: selectedVehicleId === 'GLOBAL' ? null : selectedVehicleId,
      };
      
      // Convert empty date string to null or undefined
      if (!payload.discountValidUntil) {
        payload.discountValidUntil = null;
      } else {
        // Ensure it is proper datetime if required by backend, or just let backend handle YYYY-MM-DD
        payload.discountValidUntil = new Date(payload.discountValidUntil).toISOString();
      }

      await PricingService.savePricing(payload);
      setMessage({ type: 'success', text: 'Pricing saved successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to save pricing' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (selectedVehicleId === 'GLOBAL') return;
    
    if (!confirm('Are you sure you want to delete specific pricing for this vehicle? It will revert to global pricing.')) {
      return;
    }

    setIsDeleting(true);
    setMessage({ type: '', text: '' });
    try {
      await PricingService.deletePricing(selectedVehicleId);
      setMessage({ type: 'success', text: 'Specific pricing deleted. Reverted to global.' });
      await fetchPricing(selectedVehicleId); // Refresh to show global fallback
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to delete pricing' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='flex flex-col gap-10 w-full'>
      {message.text && (
        <div className={`p-4 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message.text}
        </div>
      )}

      {/* Selection Dropdown */}
      <div className='flex flex-col gap-2'>
        <label className='text-[#0A1413] text-[14px] font-nunito'>Apply pricing to:</label>
        <div className='flex items-center gap-4'>
          <div className='relative w-full max-w-[505px]'>
            <select 
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className='w-full bg-white border border-[#D3D3D3] rounded-[4px] h-[38px] px-3 appearance-none focus:outline-none focus:ring-1 focus:ring-[#3FA34D] text-[14px] font-nunito text-[#0A1413]'
            >
              <option value="GLOBAL">All Vehicles (Global Default)</option>
              {vehicles.map(v => (
                <option key={v.id} value={v.id}>{v.name} ({v.brand})</option>
              ))}
            </select>
            <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]' size={16} />
          </div>
          {selectedVehicleId !== 'GLOBAL' && (
            <button 
              onClick={handleDelete}
              disabled={isDeleting || isLoading}
              className='flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium'
            >
              <Trash2 size={16} />
              Revert to Global
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <SectionSkeleton rows={7} />
      ) : (
        <>
          {/* Main Pricing Sections */}
          <div className='bg-white border border-[#D3D3D3] rounded-[12px] p-6 shadow-sm'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {/* Base Rates */}
              <div className='flex flex-col gap-4'>
                <h3 className='text-[#0A1413] text-[20px] font-montserrat font-bold mb-2'>Base Rates</h3>
                <div className='flex flex-col gap-1'>
                  <label className='text-[#0A1413] text-[14px] font-nunito'>Daily Rate (KES)</label>
                  <input
                    type='number'
                    name='dailyRate'
                    value={formData.dailyRate}
                    onChange={handleInputChange}
                    className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-[#0A1413] text-[14px] font-nunito'>Weekly Rate (KES)</label>
                  <input
                    type='number'
                    name='weeklyRate'
                    value={formData.weeklyRate}
                    onChange={handleInputChange}
                    className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-[#0A1413] text-[14px] font-nunito'>Monthly Rate (KES)</label>
                  <input
                    type='number'
                    name='monthlyRate'
                    value={formData.monthlyRate}
                    onChange={handleInputChange}
                    className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
                  />
                </div>
              </div>

              {/* Service Type */}
              <div className='flex flex-col gap-4'>
                <h3 className='text-[#0A1413] text-[18px] font-montserrat font-bold mb-2'>Service Type</h3>
                <div className='flex flex-col gap-1'>
                  <label className='text-[#0A1413] text-[14px] font-nunito'>Self-Drive Rate (KES/day)</label>
                  <input
                    type='number'
                    name='selfDriveRate'
                    value={formData.selfDriveRate}
                    onChange={handleInputChange}
                    className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-[#0A1413] text-[14px] font-nunito'>Chauffeur Rate (KES/day)</label>
                  <input
                    type='number'
                    name='chauffeurRate'
                    value={formData.chauffeurRate}
                    onChange={handleInputChange}
                    className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-[#0A1413] text-[14px] font-nunito'>Seasonal Rate Multiplier</label>
                  <input
                    type='number'
                    step='0.1'
                    name='seasonalMultiplier'
                    value={formData.seasonalMultiplier}
                    onChange={handleInputChange}
                    className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
                  />
                </div>
              </div>

              {/* Additional Charges */}
              <div className='flex flex-col gap-4'>
                <h3 className='text-[#0A1413] text-[18px] font-montserrat font-bold mb-2'>Additional Charges</h3>
                <div className='flex flex-col gap-1'>
                  <label className='text-[#0A1413] text-[14px] font-nunito'>Extra Day (KES)</label>
                  <input
                    type='number'
                    name='extraDayCharge'
                    value={formData.extraDayCharge}
                    onChange={handleInputChange}
                    className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-[#0A1413] text-[14px] font-nunito'>Late Return (KES/hour)</label>
                  <input
                    type='number'
                    name='lateReturnHourlyCharge'
                    value={formData.lateReturnHourlyCharge}
                    onChange={handleInputChange}
                    className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-[#0A1413] text-[14px] font-nunito'>Security Deposit (KES)</label>
                  <input
                    type='number'
                    name='securityDeposit'
                    value={formData.securityDeposit}
                    onChange={handleInputChange}
                    className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-[#0A1413] text-[14px] font-nunito'>Delivery/Collection (KES)</label>
                  <input
                    type='number'
                    name='deliveryCollectionCharge'
                    value={formData.deliveryCollectionCharge}
                    onChange={handleInputChange}
                    className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-[#0A1413] text-[14px] font-nunito'>Airport Pickup/Drop (KES)</label>
                  <input
                    type='number'
                    name='airportPickupDropCharge'
                    value={formData.airportPickupDropCharge}
                    onChange={handleInputChange}
                    className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-[#0A1413] text-[14px] font-nunito'>Extra Mileage (KES/km)</label>
                  <input
                    type='number'
                    step='0.01'
                    name='extraMileageCharge'
                    value={formData.extraMileageCharge}
                    onChange={handleInputChange}
                    className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Special Offers */}
          <div className='bg-white border border-[#D3D3D3] rounded-[12px] p-6 shadow-sm'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='flex flex-col gap-4'>
                <h3 className='text-[#0A1413] text-[18px] font-montserrat font-bold mb-2'>Special Offers</h3>
                <div className='flex flex-col gap-1'>
                  <label className='text-[#0A1413] text-[14px] font-nunito'>Discount Percentage (%)</label>
                  <input
                    type='number'
                    name='discountPercentage'
                    value={formData.discountPercentage}
                    onChange={handleInputChange}
                    className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
                  />
                </div>
              </div>
              <div className='flex flex-col justify-end'>
                <div className='flex flex-col gap-1'>
                  <label className='text-[#0A1413] text-[14px] font-nunito'>Valid Until</label>
                  <input
                    type='date'
                    name='discountValidUntil'
                    value={formData.discountValidUntil || ''}
                    onChange={handleInputChange}
                    className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className='flex justify-start'>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className='bg-[#3FA34D] hover:bg-[#348a41] text-white px-9 py-2 rounded-[6px] text-[14px] font-bold font-wix transition-colors whitespace-nowrap shadow-sm disabled:opacity-50 flex items-center gap-2'
            >
              {isSaving ? <Spinner size="sm" variant="primary" /> : null}
              Save Changes
            </button>
          </div>
        </>
      )}
    </div>
  );
}
