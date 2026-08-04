'use client';

import { 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  MessageSquare,
  Undo2,
  Navigation,
  Info,
  User,
} from 'lucide-react';
import React, { useState } from 'react';
import { useBookings } from '@/hooks/useBookings';
import { Spinner } from '@/components/ui/Spinner';

type TabType = 'Pick-Up Instructions' | 'Office Locations' | 'Return Instructions' | 'Airport Meet & Greet' | 'Driver Contacts';

const tabs: TabType[] = [
  'Pick-Up Instructions',
  'Office Locations',
  'Return Instructions',
  'Airport Meet & Greet',
  'Driver Contacts'
];

export default function TripManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('Pick-Up Instructions');
  const { bookings, isLoading } = useBookings();

  // Find the active booking (ongoing or confirmed that is starting today/soon)
  const activeBooking = bookings?.find(b => b.bookingStatus === 'ONGOING' || b.bookingStatus === 'CONFIRMED');

  const renderContent = () => {
    switch (activeTab) {
      case 'Pick-Up Instructions':
        return <PickUpInstructions />;
      case 'Office Locations':
        return <OfficeLocations />;
      case 'Return Instructions':
        return <ReturnInstructions />;
      case 'Airport Meet & Greet':
        return <AirportMeetGreet booking={activeBooking} />;
      case 'Driver Contacts':
        return <DriverContacts booking={activeBooking} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-10 space-y-8 min-h-screen">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] pb-3">
        <h2 className="text-[14px] font-bold text-[#0A1413] font-montserrat uppercase tracking-wider">Trip Management</h2>
        <p className="text-[12px] text-[#6B7280] font-lato">Everything you need for a smooth rental experience.</p>
      </div>

      {/* Menubar */}
      <div className="bg-white border border-[#E5E7EB] p-1 rounded-[10px] flex items-center gap-1 w-fit flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-[4px] text-[14px] font-bold font-lato transition-all ${
              activeTab === tab 
                ? 'bg-[#EBF7ED] text-[#3FA344]' 
                : 'text-[#0A1413] hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dynamic Content */}
      <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {renderContent()}
      </div>
    </div>
  );
}

const PickUpInstructions = () => (
  <div className="bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden">
    <div className="p-6 border-b border-[#E5E7EB] flex items-center gap-3">
      <div className="bg-[#EBF7ED] rounded-[6px] w-9 h-9 flex items-center justify-center">
        <Navigation size={18} className="text-[#3FA34D]" />
      </div>
      <div>
        <h3 className="text-[20px] font-bold text-[#0A1413] font-montserrat">Vehicle Pick-Up Instructions</h3>
        <p className="text-[14px] text-[#6A7282] font-nunito">Follow these steps on your pick-up day</p>
      </div>
    </div>
    <div className="p-6 space-y-8">
      {[
        { 
          title: "1. Receive Your Confirmation SMS", 
          desc: "Once your booking is confirmed, you will receive an SMS and email with your rental agreement number, vehicle details, and pick-up reference code.",
          icon: <MessageSquare size={16} className="text-gray-500" />
        },
        { 
          title: "2. Proceed to the Pick-Up Location", 
          desc: "Head to your designated office branch or airport counter. Show your booking reference and a valid government-issued photo ID.",
          icon: <MapPin size={16} className="text-gray-500" />
        },
        { 
          title: "3. Vehicle Inspection & Handover", 
          desc: "A Unicorn agent will walk you through a pre-rental inspection, noting any existing damage. Both parties sign the inspection sheet before keys are handed over.",
          icon: <Navigation size={16} className="text-gray-500" />
        },
        { 
          title: "4. Fuel Level & Mileage Check", 
          desc: "The current fuel level and odometer reading are recorded. You are required to return the vehicle with the same fuel level to avoid refuelling charges.",
          icon: <Info size={16} className="text-gray-500" />
        },
        { 
          title: "5. Drive Away!", 
          desc: "Keys and a copy of your rental agreement are provided. Our 24/7 roadside assistance number is printed on your agreement for any emergencies.",
          icon: <CheckCircle2 size={16} className="text-white" />,
          active: true
        }
      ].map((step, idx, arr) => (
        <div key={idx} className="flex gap-4 relative">
          <div className="flex flex-col items-center">
            <div className={`${step.active ? 'bg-[#3FA344]' : 'bg-[#F6F6F6] border border-[#E5E7EB]'} w-9 h-9 rounded-full flex items-center justify-center z-10`}>
              {step.icon}
            </div>
            {idx !== arr.length - 1 && <div className="w-px h-full bg-[#E5E7EB] absolute top-9" />}
          </div>
          <div className="pb-8">
            <h4 className="text-[14px] font-bold text-[#0A1413] font-nunito">{step.title}</h4>
            <p className="text-[12px] text-[#6B7280] font-lato leading-relaxed max-w-[700px] mt-1">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const OfficeLocations = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      { title: "Nairobi CBD – Head Office", address: "4th Floor, Anniversary Towers, University Way, Nairobi", time: "Mon–Sat: 7:00 AM – 8:00 PM · Sun: 8:00 AM – 5:00 PM", phone: "+254 020 123 4567" },
      { title: "JKIA Airport Branch", address: "Arrivals Hall, Terminal 1A", time: "Open 24 Hours · 7 Days", phone: "+254 020 123 4567" },
      { title: "Westlands Branch", address: "Muthithi Road, Westlands, Nairobi", time: "Mon–Sat: 7:00 AM – 8:00 PM · Sun: 8:00 AM – 5:00 PM", phone: "+254 020 123 4567" },
      { title: "Mombasa Office", address: "Mombasa Malindi Rd, Bamburi", time: "Mon–Sat: 8:00 AM – 6:00 PM", phone: "+254 020 123 4567" },
      { title: "Kisumu Branch", address: "Kisumu International Airport", time: "Mon–Sat: 8:00 AM – 6:00 PM", phone: "+254 020 123 4567" },
      { title: "Eldoret Office", address: "Eldoret Town Center", time: "Mon–Sat: 8:00 AM – 6:00 PM", phone: "+254 020 123 4567" }
    ].map((office, idx) => (
      <div key={idx} className="bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden">
        <div className="p-5 border-b border-[#E5E7EB]">
          <h3 className="text-[18px] font-bold text-[#0A1413] font-montserrat">{office.title}</h3>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex gap-3 items-start">
            <MapPin size={16} className="text-[#3FA344] mt-1" />
            <p className="text-[14px] text-[#0A1413] font-nunito">{office.address}</p>
          </div>
          <div className="flex gap-3 items-start">
            <Clock size={16} className="text-[#3FA344] mt-1" />
            <p className="text-[14px] text-[#0A1413] font-nunito">{office.time}</p>
          </div>
          <div className="flex gap-3 items-start">
            <Phone size={16} className="text-[#3FA344] mt-1" />
            <p className="text-[14px] text-[#0A1413] font-nunito">{office.phone}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ReturnInstructions = () => (
  <div className="space-y-6">
    <div className="bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden">
      <div className="p-6 border-b border-[#E5E7EB] flex items-center gap-3">
        <div className="bg-[#EBF7ED] rounded-[6px] w-9 h-9 flex items-center justify-center">
          <Undo2 size={18} className="text-[#3FA34D]" />
        </div>
        <div>
          <h3 className="text-[20px] font-bold text-[#0A1413] font-montserrat">Vehicle Return Instructions</h3>
          <p className="text-[14px] text-[#6A7282] font-nunito">Follow these steps on your return day</p>
        </div>
      </div>
      <div className="p-6 space-y-8">
        {[
          { 
            title: "1. Plan Your Return Time", 
            desc: "Return by your agreed date and time to avoid late-return charges. If you need more time, use the Extension module at least 2 hours before your return time.",
            icon: <Clock size={16} className="text-gray-500" />
          },
          { 
            title: "2. Refuel to the Original Level", 
            desc: "Return the vehicle with the same fuel level noted during pick-up. Failure to do so incurs a refuelling fee of Ksh 200/litre above the pump rate.",
            icon: <Info size={16} className="text-gray-500" />
          },
          { 
            title: "3. Drive to the Return Branch", 
            desc: "Return to the agreed branch. If you need to return at a different location, contact us in advance — drop-off charges may apply.",
            icon: <MapPin size={16} className="text-gray-500" />
          },
          { 
            title: "4. Post-Rental Inspection", 
            desc: "An agent will inspect the vehicle with you present. Any new damage found will be documented and assessed. You will receive the inspection report by email.",
            icon: <Info size={16} className="text-gray-500" />
          },
          { 
            title: "5. Deposit Refund Process", 
            desc: "Your security deposit is refunded within 3–5 business days after a clean inspection. Track refund status in your Documents Center.",
            icon: <CheckCircle2 size={16} className="text-white" />,
            active: true
          }
        ].map((step, idx, arr) => (
          <div key={idx} className="flex gap-4 relative">
            <div className="flex flex-col items-center">
              <div className={`${step.active ? 'bg-[#3FA344]' : 'bg-[#F6F6F6] border border-[#E5E7EB]'} w-9 h-9 rounded-full flex items-center justify-center z-10`}>
                {step.icon}
              </div>
              {idx !== arr.length - 1 && <div className="w-px h-full bg-[#E5E7EB] absolute top-9" />}
            </div>
            <div className="pb-8">
              <h4 className="text-[14px] font-bold text-[#0A1413] font-nunito">{step.title}</h4>
              <p className="text-[12px] text-[#6B7280] font-lato leading-relaxed max-w-[700px] mt-1">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AirportMeetGreet = ({ booking }: { booking: any }) => {
  if (!booking || !booking.assignedDriver) {
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-6 text-center text-gray-500">
        You do not have an active booking with an assigned driver right now.
      </div>
    );
  }

  const { assignedDriver: driver, pickupLocation } = booking;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#EBF7ED] border border-[#E5E7EB] rounded-[10px] overflow-hidden flex flex-col h-full">
        <div className="p-6 border-b border-[#E5E7EB]">
          <h3 className="text-[20px] font-bold text-[#0A1413] font-montserrat">Your Meet & Greet Driver</h3>
        </div>
        <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              <User size={16} className="text-gray-600" />
              <p className="text-[14px] text-[#0A1413] font-nunito">{driver.firstName} {driver.lastName}</p>
            </div>
            <div className="flex gap-4 items-center">
              <Phone size={16} className="text-gray-600" />
              <p className="text-[14px] text-[#0A1413] font-nunito">{driver.phone}</p>
            </div>
          </div>
          <button className="w-full border border-[#3FA344] text-[#3FA344] py-2 rounded-[6px] flex items-center justify-center gap-2 text-[14px] font-bold hover:bg-[#3FA344]/5 transition-colors mt-4">
            <MessageSquare size={16} /> WhatsApp
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden flex flex-col h-full">
        <div className="p-6 border-b border-[#E5E7EB]">
          <h3 className="text-[20px] font-bold text-[#0A1413] font-montserrat">Meeting Point Details</h3>
        </div>
        <div className="divide-y divide-[#E5E7EB]">
          <div className="p-4 flex gap-4 items-center">
            <div className="bg-[#EBF7ED] rounded-[6px] w-10 h-10 flex items-center justify-center flex-shrink-0">
              <MapPin size={18} className="text-[#3FA34D]" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#0A1413] font-nunito">{pickupLocation?.name || 'Pickup Location'}</p>
              <p className="text-[10px] text-[#6B7280] font-lato">{pickupLocation?.address || 'See confirmation email for exact meeting point'}</p>
            </div>
          </div>
          <div className="p-4 flex gap-4 items-center">
            <div className="bg-[#FEF3C6] rounded-[6px] w-10 h-10 flex items-center justify-center flex-shrink-0">
              <User size={18} className="text-[#D8A500]" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#0A1413] font-nunito">Your Signboard</p>
              <p className="text-[10px] text-[#6B7280] font-lato">The driver will hold a board with your name.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DriverContacts = ({ booking }: { booking: any }) => {
  if (!booking || !booking.assignedDriver) {
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-6 text-center text-gray-500">
        You do not have a driver assigned to any active bookings right now.
      </div>
    );
  }

  const driver = booking.assignedDriver;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden">
          <div className="p-6 border-b border-[#E5E7EB]">
            <h3 className="text-[20px] font-bold text-[#0A1413] font-montserrat">{driver.firstName} {driver.lastName}</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex gap-4 items-center">
              <Phone size={16} className="text-[#3FA344]" />
              <p className="text-[14px] text-[#0A1413] font-nunito">{driver.phone}</p>
            </div>
            <div className="flex gap-4 items-center">
              <Mail size={16} className="text-[#3FA344]" />
              <p className="text-[14px] text-[#0A1413] font-nunito">{driver.email}</p>
            </div>
            <div className="flex gap-4 items-center">
              <MessageSquare size={16} className="text-[#3FA344]" />
              <p className="text-[14px] text-[#0A1413] font-nunito">Status: {driver.status}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button className="border border-[#3FA344] text-[#3FA344] py-1.5 rounded-[6px] flex items-center justify-center gap-1.5 text-[12px] font-bold hover:bg-[#3FA344]/5 transition-colors">
                <MessageSquare size={14} /> WhatsApp
              </button>
              <button className="border border-[#6B7280] text-[#6B7280] py-1.5 rounded-[6px] flex items-center justify-center gap-1.5 text-[12px] font-bold hover:bg-gray-50 transition-colors">
                <Phone size={14} /> Call
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-[14px] p-6 space-y-4">
        <h3 className="text-[14px] font-bold text-[#0A1413] font-montserrat uppercase">24/7 Roadside Assistance</h3>
        <button className="w-full bg-[#3FA344] text-white py-3 rounded-[6px] font-bold text-[14px] hover:bg-[#358A3A] transition-colors flex items-center justify-center gap-2">
          <Phone size={16} /> Call +254 800 123 456
        </button>
      </div>
    </div>
  );
};
