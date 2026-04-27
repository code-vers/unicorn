"use client";
import { Clock, Info, MapPin } from "lucide-react";
import React from "react";

const BookingProcess: React.FC = () => {
  return (
    <div className='bg-white'>
      <div className='w-full max-w-[1440px] mx-auto  p-4 md:p-10'>
        {/* --- STEPPER SECTION --- */}
        <div className='relative mb-20 max-w-[900px] mx-auto'>
          {/* Background Track */}
          <div className='absolute top-[48px] left-0 w-full h-[6px] bg-[#EEEEEE] rounded-full' />
          {/* Active Progress Fill - To the center of the 2nd circle */}
          <div className='absolute top-[48px] left-0 w-[33%] h-[6px] bg-[#43a047] rounded-full z-0' />

          <div className='relative flex justify-between items-start'>
            <StepItem label='Select vehicle' status='completed' />
            <StepItem label='Booking Details' status='current' />
            <StepItem label='Secure Payment' status='upcoming' />
            <StepItem label='Confirmation' status='upcoming' />
          </div>
        </div>

        {/* --- DETAILS CARD --- */}
        <div className='bg-white border border-[#EBEBEB] rounded-[16px] p-6 md:p-10 flex flex-col lg:flex-row gap-10 shadow-sm'>
          {/* Left: Pick-up Section */}
          <div className='flex-1 flex flex-col gap-6'>
            <div>
              <p className='text-[12px] font-bold text-[#A0A0A0] uppercase tracking-[0.05em] mb-3'>
                PICK-UP
              </p>
              <h3 className='text-[19px] font-bold text-[#222222]'>
                28-Mar-2026, Saturday, 11:10
              </h3>
              <p className='text-[14px] text-[#444444] mt-1'>
                Jomo Kenyatta International Airport Nairobi
              </p>
            </div>

            <div className='flex flex-col gap-5'>
              <InfoRow
                icon={<MapPin size={22} />}
                title='Pick-up Location'
                desc='Meet & Greet'
              />
              <InfoRow
                icon={<Clock size={22} />}
                title='Business hours'
                desc='All day 08:00–22:30'
              />
              <InfoRow
                icon={
                  <Info
                    size={22}
                    className='bg-black text-white rounded-full p-[2px]'
                  />
                }
                title='Pick-up instructions'
                desc='Upon arrival please contact the representative of the company. After call the representative will be waiting in the arrival hall. The car is located at the airport parking spot.'
              />
            </div>
          </div>

          {/* Center: Map Section (Exact Figma Sizing) */}
          <div className='lg:w-[160px] xl:w-[180px] h-[340px] flex-shrink-0'>
            <div className='relative w-full h-full bg-[#F0F0F0] rounded-sm overflow-hidden border border-[#E0E0E0]'>
              {/* Map Grid Pattern Placeholder */}
              <div className='absolute inset-0 opacity-30 bg-[radial-gradient(#CCC_1px,transparent_1px)] [background-size:16px_16px]' />
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/36.92, -1.33,12/200x400?access_token=YOUR_TOKEN')] bg-cover" />

              <div className='absolute bottom-6 left-0 right-0 px-3'>
                <button className='w-full bg-white py-2.5 rounded-[4px] shadow-lg text-[#FF8F00] text-[13px] font-bold border border-[#F5F5F5] hover:bg-gray-50 transition-colors'>
                  Show on map
                </button>
              </div>
            </div>
          </div>

          {/* Right: Drop-off Section */}
          <div className='flex-1 flex flex-col gap-6'>
            <div>
              <p className='text-[12px] font-bold text-[#A0A0A0] uppercase tracking-[0.05em] mb-3'>
                DROP-OFF
              </p>
              <h3 className='text-[19px] font-bold text-[#222222]'>
                29-Mar-2026, Saturday, 15:10
              </h3>
              <p className='text-[14px] text-[#444444] mt-1'>
                Wilson airport Nairobi
              </p>
            </div>

            <div className='flex flex-col gap-5'>
              <InfoRow
                icon={<Clock size={22} />}
                title='Business hours'
                desc='All day 08:00-22:30'
              />
              <InfoRow
                icon={
                  <Info
                    size={22}
                    className='bg-black text-white rounded-full p-[2px]'
                  />
                }
                title='Drop-off instructions'
                desc='Please clarify Drop-off instructions with Car Provider upon Pick-up'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const StepItem = ({
  label,
  status,
}: {
  label: string;
  status: "completed" | "current" | "upcoming";
}) => {
  return (
    <div className='flex flex-col items-center flex-1 relative z-10'>
      <span
        className={`text-[15px] font-medium mb-6 ${status === "completed" || status === "current" ? "text-[#43a047]" : "text-[#777777]"}`}>
        {label}
      </span>
      {/* Circle Container */}
      <div className='h-[24px] flex items-center justify-center'>
        <div
          className={`rounded-full transition-all duration-300
          ${status === "completed" ? "w-[32px] h-[32px] bg-[#43a047]" : ""}
          ${status === "current" ? "w-[32px] h-[32px] bg-[#43a047] border-[6px] border-[#A8D1A1]" : ""}
          ${status === "upcoming" ? "w-[28px] h-[28px] bg-[#D6D6D6]" : ""}
        `}
        />
      </div>
    </div>
  );
};

const InfoRow = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className='flex gap-4 items-start'>
    <div className='text-[#111111] shrink-0 mt-0.5'>{icon}</div>
    <div className='flex flex-col gap-1'>
      <h4 className='text-[15px] font-bold text-[#222222] leading-tight'>
        {title}
      </h4>
      <p className='text-[13.5px] text-[#555555] leading-[1.6]'>{desc}</p>
    </div>
  </div>
);

export default BookingProcess;
