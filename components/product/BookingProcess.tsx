"use client";
import { Clock, Info, MapPin } from "lucide-react";
import React from "react";

// ── Props ─────────────────────────────────────────────────────────────────────
interface BookingProcessProps {
  pickupDate: string;
  pickupTime: string;
  dropOffDate: string;
  dropOffTime: string;
  pickupLocationId: string;
  dropOffLocationId: string;
  setPickupDate: (v: string) => void;
  setPickupTime: (v: string) => void;
  setDropOffDate: (v: string) => void;
  setDropOffTime: (v: string) => void;
  setPickupLocationId: (v: string) => void;
  setDropOffLocationId: (v: string) => void;
  locations: any[];
}

// ── Component ─────────────────────────────────────────────────────────────────
const BookingProcess: React.FC<BookingProcessProps> = ({
  pickupDate,
  pickupTime,
  dropOffDate,
  dropOffTime,
  pickupLocationId,
  dropOffLocationId,
  setPickupDate,
  setPickupTime,
  setDropOffDate,
  setDropOffTime,
  setPickupLocationId,
  setDropOffLocationId,
  locations,
}) => {
  // ── Date/Time Strict Validation ──────────────────────────────────────────────
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  const minPickupTime = pickupDate === todayStr ? currentTime : undefined;
  const minDropOffTime = pickupDate === dropOffDate ? pickupTime : undefined;

  React.useEffect(() => {
    let newPickupDate = pickupDate;

    if (pickupDate && pickupDate < todayStr) {
      setPickupDate(todayStr);
      newPickupDate = todayStr;
    }
    
    if (newPickupDate && dropOffDate && dropOffDate < newPickupDate) {
      setDropOffDate(newPickupDate);
    }
    
    if (newPickupDate === todayStr && pickupTime && pickupTime < currentTime) {
      setPickupTime(currentTime);
    }
    
    const effectiveDropOffDate = (newPickupDate && dropOffDate && dropOffDate < newPickupDate) ? newPickupDate : dropOffDate;
    if (newPickupDate && effectiveDropOffDate && newPickupDate === effectiveDropOffDate && pickupTime && dropOffTime) {
      if (dropOffTime <= pickupTime) {
        const [hours, m] = pickupTime.split(':').map(Number);
        const h = Math.min(23, hours + 1);
        setDropOffTime(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
      }
    }
  }, [pickupDate, dropOffDate, pickupTime, dropOffTime, setPickupDate, setDropOffDate, setPickupTime, setDropOffTime]);

  return (
    <div className="bg-white">
      <div className="w-full max-w-[1440px] mx-auto p-4 md:p-10">
        {/* --- STEPPER SECTION --- */}
        <div className="relative mb-16 max-w-[1000px] mx-auto">
          {/* Background Track */}
          <div className="absolute top-[58px] left-0 w-full h-[12px] bg-[#f6f6f6]" />
          {/* Active Progress Fill */}
          <div className="absolute top-[58px] left-0 w-[50%] h-[12px] bg-[#3fa344]" />

          <div className="relative flex justify-between items-start">
            <StepItem label="Select vehicle" status="completed" />
            <StepItem label="Booking Details" status="current" />
            <StepItem label="Customer Details" status="upcoming" />
          </div>
        </div>

        {/* --- DETAILS CARD --- */}
        <div className="bg-white border border-[#EBEBEB] rounded-[16px] p-6 md:p-10 flex flex-col lg:flex-row gap-10 shadow-sm">
          {/* Left: Pick-up Section */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <p className="text-[12px] font-bold text-[#A0A0A0] uppercase tracking-[0.05em] mb-4">PICK-UP DETAILS</p>
              
              <div className="flex flex-col gap-4">
                {/* Location */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#555555] uppercase tracking-wide">Location</label>
                  <select
                    value={pickupLocationId}
                    onChange={(e) => setPickupLocationId(e.target.value)}
                    className="h-[48px] px-4 border border-[#E5E7EB] rounded-[6px] text-[14px] text-[#1A1A1A] outline-none focus:border-[#43A047] bg-white"
                  >
                    <option value="">Select location…</option>
                    {locations.map((l) => (
                      <option key={l.id} value={l.id}>{l.name} — {l.city}</option>
                    ))}
                  </select>
                </div>
                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[#555555] uppercase tracking-wide">Date</label>
                    <input
                      type="date"
                      value={pickupDate}
                      min={todayStr}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="h-[48px] px-4 border border-[#E5E7EB] rounded-[6px] text-[14px] text-[#1A1A1A] outline-none focus:border-[#43A047] bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[#555555] uppercase tracking-wide">Time</label>
                    <input
                      type="time"
                      value={pickupTime}
                      min={minPickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="h-[48px] px-4 border border-[#E5E7EB] rounded-[6px] text-[14px] text-[#1A1A1A] outline-none focus:border-[#43A047] bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 mt-4">
              <InfoRow icon={<MapPin size={22} />} title="Pick-up Location" desc="Meet & Greet" />
              <InfoRow icon={<Clock size={22} />} title="Business hours" desc="All day 08:00–22:30" />
              <InfoRow
                icon={<Info size={22} className="bg-black text-white rounded-full p-[2px]" />}
                title="Pick-up instructions"
                desc="Upon arrival please contact the representative of the company. After call the representative will be waiting in the arrival hall."
              />
            </div>
          </div>

          {/* Center: Map Placeholder */}
          <div className="lg:w-[160px] xl:w-[180px] flex flex-col justify-center shrink-0">
            <div className="relative w-full h-[340px] bg-[#F0F0F0] rounded-sm overflow-hidden border border-[#E0E0E0] mt-12 lg:mt-0">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#CCC_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute bottom-6 left-0 right-0 px-3">
                <button className="w-full bg-white py-2.5 rounded-[4px] shadow-lg text-[#FF8F00] text-[13px] font-bold border border-[#F5F5F5] hover:bg-gray-50 transition-colors">
                  Show on map
                </button>
              </div>
            </div>
          </div>

          {/* Right: Drop-off Section */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <p className="text-[12px] font-bold text-[#A0A0A0] uppercase tracking-[0.05em] mb-4">DROP-OFF DETAILS</p>
              
              <div className="flex flex-col gap-4">
                {/* Location */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#555555] uppercase tracking-wide">Location</label>
                  <select
                    value={dropOffLocationId}
                    onChange={(e) => setDropOffLocationId(e.target.value)}
                    className="h-[48px] px-4 border border-[#E5E7EB] rounded-[6px] text-[14px] text-[#1A1A1A] outline-none focus:border-[#43A047] bg-white"
                  >
                    <option value="">Select location…</option>
                    {locations.map((l) => (
                      <option key={l.id} value={l.id}>{l.name} — {l.city}</option>
                    ))}
                  </select>
                </div>
                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[#555555] uppercase tracking-wide">Date</label>
                    <input
                      type="date"
                      value={dropOffDate}
                      min={pickupDate || todayStr}
                      onChange={(e) => setDropOffDate(e.target.value)}
                      className="h-[48px] px-4 border border-[#E5E7EB] rounded-[6px] text-[14px] text-[#1A1A1A] outline-none focus:border-[#43A047] bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[#555555] uppercase tracking-wide">Time</label>
                    <input
                      type="time"
                      value={dropOffTime}
                      min={minDropOffTime}
                      onChange={(e) => setDropOffTime(e.target.value)}
                      className="h-[48px] px-4 border border-[#E5E7EB] rounded-[6px] text-[14px] text-[#1A1A1A] outline-none focus:border-[#43A047] bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 mt-4">
              <InfoRow icon={<Clock size={22} />} title="Business hours" desc="All day 08:00-22:30" />
              <InfoRow
                icon={<Info size={22} className="bg-black text-white rounded-full p-[2px]" />}
                title="Drop-off instructions"
                desc="Please clarify Drop-off instructions with Car Provider upon Pick-up."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const StepItem = ({ label, status }: { label: string; status: "completed" | "current" | "upcoming" }) => (
  <div className="flex flex-col items-center flex-1 relative z-10 gap-4">
    <span className={`text-[18px] font-normal ${status === "completed" ? "text-[#3fa344]" : "text-[#6b7280]"}`}>
      {label}
    </span>
    <div className="h-[40px] flex items-center justify-center">
      <div
        className={`rounded-full transition-all duration-300 w-[40px] h-[40px]
          ${status === "completed" ? "bg-[#3fa344]" : ""}
          ${status === "current" ? "bg-[#f6f6f6] border-[8px] border-[#3fa344]" : ""}
          ${status === "upcoming" ? "bg-[#d1d5db]" : ""}
        `}
      />
    </div>
  </div>
);

const InfoRow = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="flex gap-4 items-start">
    <div className="text-[#111111] shrink-0 mt-0.5">{icon}</div>
    <div className="flex flex-col gap-1">
      <h4 className="text-[15px] font-bold text-[#222222] leading-tight">{title}</h4>
      <p className="text-[13.5px] text-[#555555] leading-[1.6]">{desc}</p>
    </div>
  </div>
);

export default BookingProcess;
