'use client';

import { getPricingConfig } from '@/lib/dashboard-data';
import { ChevronDown } from 'lucide-react';

export default function PricingForm() {
  const config = getPricingConfig();

  return (
    <div className='flex flex-col gap-10 w-full'>
      {/* Selection Dropdown */}
      <div className='flex flex-col gap-2'>
        <label className='text-[#0A1413] text-[14px] font-nunito'>Apply pricing to:</label>
        <div className='relative w-full max-w-[505px]'>
          <select className='w-full bg-white border border-[#D3D3D3] rounded-[4px] h-[38px] px-3 appearance-none focus:outline-none focus:ring-1 focus:ring-[#3FA34D] text-[14px] font-nunito'>
            <option>All Vehicles</option>
            <option>Toyota Camry</option>
            <option>Mercedes C-Class</option>
          </select>
          <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]' size={16} />
        </div>
      </div>

      {/* Main Pricing Sections */}
      <div className='bg-white border border-[#D3D3D3] rounded-[12px] p-6 shadow-sm'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Base Rates */}
          <div className='flex flex-col gap-4'>
            <h3 className='text-[#0A1413] text-[20px] font-montserrat font-bold mb-2'>Base Rates</h3>
            <div className='flex flex-col gap-1'>
              <label className='text-[#0A1413] text-[14px] font-nunito'>Daily Rate ($)</label>
              <input
                type='number'
                defaultValue={config.baseRates.daily}
                className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-[#0A1413] text-[14px] font-nunito'>Weekly Rate ($)</label>
              <input
                type='number'
                defaultValue={config.baseRates.weekly}
                className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-[#0A1413] text-[14px] font-nunito'>Monthly Rate ($)</label>
              <input
                type='number'
                defaultValue={config.baseRates.monthly}
                className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
              />
            </div>
          </div>

          {/* Service Type */}
          <div className='flex flex-col gap-4'>
            <h3 className='text-[#0A1413] text-[18px] font-montserrat font-bold mb-2'>Service Type</h3>
            <div className='flex flex-col gap-1'>
              <label className='text-[#0A1413] text-[14px] font-nunito'>Self-Drive Rate ($/day)</label>
              <input
                type='number'
                defaultValue={config.serviceType.selfDrive}
                className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-[#0A1413] text-[14px] font-nunito'>Chauffeur Rate ($/day)</label>
              <input
                type='number'
                defaultValue={config.serviceType.chauffeur}
                className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-[#0A1413] text-[14px] font-nunito'>Seasonal Rate Multiplier</label>
              <input
                type='number'
                step='0.1'
                defaultValue={config.serviceType.seasonalMultiplier}
                className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
              />
            </div>
          </div>

          {/* Additional Charges */}
          <div className='flex flex-col gap-4'>
            <h3 className='text-[#0A1413] text-[18px] font-montserrat font-bold mb-2'>Additional Charges</h3>
            <div className='flex flex-col gap-1'>
              <label className='text-[#0A1413] text-[14px] font-nunito'>Extra Day ($)</label>
              <input
                type='number'
                defaultValue={config.additionalCharges.extraDay}
                className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-[#0A1413] text-[14px] font-nunito'>Late Return ($/hour)</label>
              <input
                type='number'
                defaultValue={config.additionalCharges.lateReturn}
                className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-[#0A1413] text-[14px] font-nunito'>Security Deposit ($)</label>
              <input
                type='number'
                defaultValue={config.additionalCharges.securityDeposit}
                className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-[#0A1413] text-[14px] font-nunito'>Delivery/Collection ($)</label>
              <input
                type='number'
                defaultValue={config.additionalCharges.deliveryCollection}
                className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-[#0A1413] text-[14px] font-nunito'>Airport Pickup/Drop ($)</label>
              <input
                type='number'
                defaultValue={config.additionalCharges.airportPickupDrop}
                className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-[#0A1413] text-[14px] font-nunito'>Extra Mileage ($/km)</label>
              <input
                type='number'
                step='0.01'
                defaultValue={config.additionalCharges.extraMileage}
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
                defaultValue={config.specialOffers.discountPercentage}
                className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
              />
            </div>
          </div>
          <div className='flex flex-col justify-end'>
            <div className='flex flex-col gap-1'>
              <label className='text-[#0A1413] text-[14px] font-nunito'>Valid Until</label>
              <input
                type='date'
                defaultValue={config.specialOffers.validUntil}
                className='w-full border border-[#9CA3AF] rounded-[4px] h-[43px] px-3 text-[14px] font-nunito text-[#6B7280] focus:outline-none focus:border-[#3FA34D]'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className='flex justify-start'>
        <button className='bg-[#3FA34D] hover:bg-[#348a41] text-white px-9 py-2 rounded-[6px] text-[14px] font-bold font-wix transition-colors whitespace-nowrap shadow-sm'>
          Save Changes
        </button>
      </div>
    </div>
  );
}
