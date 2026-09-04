"use client";
import { LocationResponse, LocationService } from "@/lib/api/location.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuCheck } from "react-icons/lu";

const HeroSection: React.FC = () => {
  const router = useRouter();

  const [locations, setLocations] = useState<LocationResponse[]>([]);
  const [pickupLocationId, setPickupLocationId] = useState("");
  const [dropOffLocationId, setDropOffLocationId] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");

  // Fetch locations
  useEffect(() => {
    LocationService.getLocations({ status: "ACTIVE", limit: 100 })
      .then((res) => setLocations(res.data))
      .catch(() => {});
  }, []);

  // ── Date/Time Strict Validation ──────────────────────────────────────────────
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  const minPickupTime = pickupDate === todayStr ? currentTime : undefined;
  const minDropOffTime = pickupDate === dropOffDate ? pickupTime : undefined;

  useEffect(() => {
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
  }, [pickupDate, dropOffDate, pickupTime, dropOffTime, todayStr, currentTime]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (pickupDate) params.set("pickupDate", pickupDate);
    if (pickupTime) params.set("pickupTime", pickupTime);
    if (dropOffDate) params.set("dropOffDate", dropOffDate);
    if (dropOffTime) params.set("dropOffTime", dropOffTime);
    if (pickupLocationId) params.set("pickupLocationId", pickupLocationId);
    if (dropOffLocationId) params.set("dropOffLocationId", dropOffLocationId);

    router.push(`/product?${params.toString()}`);
  };

  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/Home/heroCar.png')" }}
    >
      {/* Darker Overlay for better text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

      <div className="relative z-10 w-full max-w-[1440px] px-4 md:px-10 flex flex-col items-center">
        {/* Title */}
        <h1 className="text-3xl md:text-[40px] mt-20 md:mt-10 font-bold text-white mb-8 text-center">
          Want to rent a car in Malindi?
        </h1>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 text-white text-sm md:text-[24px]">
          <div className="flex items-center gap-2">
            <LuCheck className="text-white" /> <span>No Hidden Costs</span>
          </div>
          <div className="flex items-center gap-2">
            <LuCheck className="text-white" /> <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <LuCheck className="text-white" /> <span>Free Cancellation</span>
          </div>
        </div>

        {/* Search Card */}
        <div className="w-full max-w-[1240px] bg-[#0A0A0A80] backdrop-blur-sm p-6 md:p-10 lg:px-[60px] lg:py-[40px] rounded-[20px] border border-white/5 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[40px] gap-x-[62px]">
            
            {/* ROW 1: Pick-up */}
            {/* Pick-up Location */}
            <div className="flex flex-col gap-[16px]">
              <label className="text-white text-[16px] lg:text-[20px] font-medium font-montserrat ml-2">
                Pick-up Location
              </label>
              <select
                value={pickupLocationId}
                onChange={(e) => setPickupLocationId(e.target.value)}
                className="w-full h-[60px] px-[20px] lg:px-[43px] rounded-[50px] bg-white text-[#6b7280] text-[16px] lg:text-[20px] font-mulish appearance-none outline-none cursor-pointer shadow-sm"
              >
                <option value="">-- Select --</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} — {loc.city}
                  </option>
                ))}
              </select>
            </div>

            {/* Pick-up Date */}
            <div className="flex flex-col gap-[16px]">
              <label className="text-white text-[16px] lg:text-[20px] font-medium font-montserrat ml-2">
                Pick-up Date
              </label>
              <input
                type="date"
                value={pickupDate}
                min={todayStr}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full h-[60px] px-[20px] lg:px-[43px] rounded-[50px] bg-white text-[#6b7280] text-[16px] lg:text-[20px] font-mulish outline-none cursor-pointer shadow-sm"
              />
            </div>

            {/* Pick-up Time */}
            <div className="flex flex-col gap-[16px]">
              <label className="text-white text-[16px] lg:text-[20px] font-medium font-montserrat ml-2">
                Time <span className="text-[#dc2626]">*</span>
              </label>
              <input
                type="time"
                value={pickupTime}
                min={minPickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full h-[60px] px-[20px] lg:px-[43px] rounded-[50px] bg-white text-[#6b7280] text-[16px] lg:text-[20px] font-mulish outline-none cursor-pointer shadow-sm"
              />
            </div>

            {/* ROW 2: Drop-off */}
            {/* Drop-off Location */}
            <div className="flex flex-col gap-[16px]">
              <label className="text-white text-[16px] lg:text-[20px] font-medium font-montserrat ml-2">
                Drop-off Location
              </label>
              <select
                value={dropOffLocationId}
                onChange={(e) => setDropOffLocationId(e.target.value)}
                className="w-full h-[60px] px-[20px] lg:px-[43px] rounded-[50px] bg-white text-[#6b7280] text-[16px] lg:text-[20px] font-mulish appearance-none outline-none cursor-pointer shadow-sm"
              >
                <option value="">-- Select --</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} — {loc.city}
                  </option>
                ))}
              </select>
            </div>

            {/* Drop-off Date */}
            <div className="flex flex-col gap-[16px]">
              <label className="text-white text-[16px] lg:text-[20px] font-medium font-montserrat ml-2">
                Drop-off Date
              </label>
              <input
                type="date"
                value={dropOffDate}
                min={pickupDate || todayStr}
                onChange={(e) => setDropOffDate(e.target.value)}
                className="w-full h-[60px] px-[20px] lg:px-[43px] rounded-[50px] bg-white text-[#6b7280] text-[16px] lg:text-[20px] font-mulish outline-none cursor-pointer shadow-sm"
              />
            </div>

            {/* Drop-off Time */}
            <div className="flex flex-col gap-[16px]">
              <label className="text-white text-[16px] lg:text-[20px] font-medium font-montserrat ml-2">
                Drop-off Time <span className="text-[#dc2626]">*</span>
              </label>
              <input
                type="time"
                value={dropOffTime}
                min={minDropOffTime}
                onChange={(e) => setDropOffTime(e.target.value)}
                className="w-full h-[60px] px-[20px] lg:px-[43px] rounded-[50px] bg-white text-[#6b7280] text-[16px] lg:text-[20px] font-mulish outline-none cursor-pointer shadow-sm"
              />
            </div>

            {/* ROW 3: Search Button */}
            <div className="md:col-span-2 lg:col-span-1 pt-2">
              <button
                onClick={handleSearch}
                className="w-full lg:max-w-[341px] h-[60px] bg-white text-[#3fa344] font-bold font-montserrat text-[20px] rounded-[50px] hover:bg-gray-100 transition shadow-lg flex items-center justify-center"
              >
                SEARCH
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
