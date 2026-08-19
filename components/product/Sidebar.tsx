"use client";
import { FeatureResponse, FeatureService } from "@/lib/api/feature.service";
import { LocationResponse, LocationService } from "@/lib/api/location.service";
import React, { useEffect, useState } from "react";

// ── Prop types ──────────────────────────────────────────────────────────────
interface SidebarProps {
  pickupDate: string;
  setPickupDate: (v: string) => void;
  pickupTime: string;
  setPickupTime: (v: string) => void;
  dropOffDate: string;
  setDropOffDate: (v: string) => void;
  dropOffTime: string;
  setDropOffTime: (v: string) => void;
  pickupLocationId: string;
  setPickupLocationId: (v: string) => void;
  dropOffLocationId: string;
  setDropOffLocationId: (v: string) => void;
  transmission: string;
  setTransmission: (v: string) => void;
  fuelType: string;
  setFuelType: (v: string) => void;
  seatingCapacity: number | undefined;
  setSeatingCapacity: (v: number | undefined) => void;
  featureIds: string[];
  setFeatureIds: (v: string[]) => void;
  minPrice: string;
  setMinPrice: (v: string) => void;
  maxPrice: string;
  setMaxPrice: (v: string) => void;
  onSearch: () => void;
}

// ── Seat options ────────────────────────────────────────────────────────────
const SEAT_OPTIONS: { label: string; value: number }[] = [
  { label: "4 Seats", value: 4 },
  { label: "5 Seats", value: 5 },
  { label: "6+ Seats", value: 6 },
];

const Sidebar: React.FC<SidebarProps> = ({
  pickupDate,
  setPickupDate,
  pickupTime,
  setPickupTime,
  dropOffDate,
  setDropOffDate,
  dropOffTime,
  setDropOffTime,
  pickupLocationId,
  setPickupLocationId,
  dropOffLocationId,
  setDropOffLocationId,
  transmission,
  setTransmission,
  fuelType,
  setFuelType,
  seatingCapacity,
  setSeatingCapacity,
  featureIds,
  setFeatureIds,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onSearch,
}) => {
  const [locations, setLocations] = useState<LocationResponse[]>([]);
  const [vehicleFeatures, setVehicleFeatures] = useState<FeatureResponse[]>([]);

  // Fetch locations and non-addon features on mount
  useEffect(() => {
    LocationService.getLocations({ status: "ACTIVE", limit: 100 })
      .then((res) => setLocations(res.data))
      .catch(() => {});

    FeatureService.getFeatures({ isAddon: false, limit: 100 })
      .then((res) => setVehicleFeatures(res.data))
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
  }, [pickupDate, dropOffDate, pickupTime, dropOffTime, setPickupDate, setDropOffDate, setPickupTime, setDropOffTime]);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const toggleFeature = (id: string) => {
    setFeatureIds(
      featureIds.includes(id)
        ? featureIds.filter((f) => f !== id)
        : [...featureIds, id]
    );
  };

  const toggleTransmission = (value: string) => {
    setTransmission(transmission === value ? "" : value);
  };

  const toggleFuelType = (value: string) => {
    setFuelType(fuelType === value ? "" : value);
  };

  const toggleSeating = (value: number) => {
    setSeatingCapacity(seatingCapacity === value ? undefined : value);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 1. GREEN SEARCH FORM */}
      <div className="bg-[#43a047] p-5 rounded-[6px] space-y-4 shadow-sm">
        <div className="space-y-4">
          {/* Pick-up Location */}
          <div className="flex flex-col">
            <label className="text-white text-[13px] font-medium mb-1.5">
              Pick-up Location
            </label>
            <div className="relative">
              <select
                value={pickupLocationId}
                onChange={(e) => setPickupLocationId(e.target.value)}
                className="w-full h-11 px-4 rounded-full bg-white text-gray-700 text-sm appearance-none outline-none cursor-pointer"
              >
                <option value="">-- Select --</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} — {loc.city}
                  </option>
                ))}
              </select>
              <ChevronIcon />
            </div>
          </div>

          {/* Pick-up Date */}
          <div className="flex flex-col">
            <label className="text-white text-[13px] font-medium mb-1.5">
              Pick-up Date
            </label>
            <input
              type="date"
              value={pickupDate}
              min={todayStr}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full h-11 px-4 rounded-md bg-white text-gray-700 text-sm outline-none"
            />
          </div>

          {/* Pick-up Time */}
          <div className="flex flex-col">
            <label className="text-white text-[13px] font-medium mb-1.5">
              Pick-up Time <span className="text-red-200 ml-1 font-bold">*</span>
            </label>
            <input
              type="time"
              value={pickupTime}
              min={minPickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full h-11 px-4 rounded-md bg-white text-gray-700 text-sm outline-none"
            />
          </div>

          {/* Drop-off Location */}
          <div className="flex flex-col">
            <label className="text-white text-[13px] font-medium mb-1.5">
              Drop-off Location
            </label>
            <div className="relative">
              <select
                value={dropOffLocationId}
                onChange={(e) => setDropOffLocationId(e.target.value)}
                className="w-full h-11 px-4 rounded-full bg-white text-gray-700 text-sm appearance-none outline-none cursor-pointer"
              >
                <option value="">-- Select --</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} — {loc.city}
                  </option>
                ))}
              </select>
              <ChevronIcon />
            </div>
          </div>

          {/* Drop-off Date */}
          <div className="flex flex-col">
            <label className="text-white text-[13px] font-medium mb-1.5">
              Drop-off Date
            </label>
            <input
              type="date"
              value={dropOffDate}
              min={pickupDate || todayStr}
              onChange={(e) => setDropOffDate(e.target.value)}
              className="w-full h-11 px-4 rounded-md bg-white text-gray-700 text-sm outline-none"
            />
          </div>

          {/* Drop-off Time */}
          <div className="flex flex-col">
            <label className="text-white text-[13px] font-medium mb-1.5">
              Drop-off Time <span className="text-red-200 ml-1 font-bold">*</span>
            </label>
            <input
              type="time"
              value={dropOffTime}
              min={minDropOffTime}
              onChange={(e) => setDropOffTime(e.target.value)}
              className="w-full h-11 px-4 rounded-md bg-white text-gray-700 text-sm outline-none"
            />
          </div>
        </div>

        <button
          onClick={onSearch}
          className="w-full bg-white text-[#43a047] font-bold py-3 rounded-md mt-2 uppercase text-sm tracking-wide shadow-sm hover:bg-gray-50 transition-colors"
        >
          Search
        </button>
      </div>

      {/* 2. POPULAR FILTERS CARD */}
      <div className="bg-[#F9F9F9] border border-[#E5E5E5] rounded-[6px] p-6 mb-4 shadow-sm">
        <h3 className="text-[#333333] font-bold text-base mb-1">
          Popular Filters
        </h3>
        <div className="w-24 h-[1px] bg-[#E5E5E5] mb-6"></div>

        <div className="space-y-4 mb-6">
          {/* Transmission */}
          <Checkbox
            label="Automatic Transmission"
            id="filter-auto"
            checked={transmission === "AUTOMATIC"}
            onChange={() => toggleTransmission("AUTOMATIC")}
          />
          <Checkbox
            label="Manual Transmission"
            id="filter-manual"
            checked={transmission === "MANUAL"}
            onChange={() => toggleTransmission("MANUAL")}
          />

          {/* Fuel Type */}
          <Checkbox
            label="Diesel"
            id="filter-diesel"
            checked={fuelType === "DIESEL"}
            onChange={() => toggleFuelType("DIESEL")}
          />
          <Checkbox
            label="Petrol"
            id="filter-petrol"
            checked={fuelType === "PETROL"}
            onChange={() => toggleFuelType("PETROL")}
          />

          {/* Seating */}
          {SEAT_OPTIONS.map((opt) => (
            <Checkbox
              key={opt.value}
              label={opt.label}
              id={`filter-seat-${opt.value}`}
              checked={seatingCapacity === opt.value}
              onChange={() => toggleSeating(opt.value)}
            />
          ))}

          {/* Dynamic Vehicle Features (non-addon) */}
          {vehicleFeatures.map((feature) => (
            <Checkbox
              key={feature.id}
              label={feature.name}
              id={`filter-feature-${feature.id}`}
              checked={featureIds.includes(feature.id)}
              onChange={() => toggleFeature(feature.id)}
            />
          ))}
        </div>

        {/* Price Range */}
        <div className="flex flex-row lg:flex-col gap-4">
          <div className="flex flex-col flex-1">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
              className="w-full lg:w-[120px] border border-[#E5E5E5] bg-white rounded-md p-2 text-sm outline-none focus:border-[#43a047]"
            />
            <p className="text-[#666666] text-xs mt-1">Min Price</p>
          </div>
          <div className="flex flex-col flex-1">
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Any"
              className="w-full lg:w-[120px] border border-[#E5E5E5] bg-white rounded-md p-2 text-sm outline-none focus:border-[#43a047]"
            />
            <p className="text-[#666666] text-xs mt-1">Max Price</p>
          </div>
        </div>

        <button
          onClick={onSearch}
          className="mt-5 w-full bg-[#43a047] text-white font-bold py-2.5 rounded-md text-sm tracking-wide shadow-sm hover:bg-[#388e3c] transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

// ── Helper Components ────────────────────────────────────────────────────────

const ChevronIcon = () => (
  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
      <path
        d="M1 1L5 5L9 1"
        stroke="#999999"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

interface CheckboxProps {
  label: string;
  id: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, id, checked, onChange }) => (
  <label htmlFor={id} className="flex items-center group cursor-pointer">
    <div className="relative flex items-center justify-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer appearance-none w-4 h-4 border border-[#D1D5DB] rounded bg-white checked:bg-[#43a047] checked:border-[#43a047] transition-all"
      />
      <svg
        className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="ml-3 text-sm text-[#666666] group-hover:text-gray-900 transition-colors font-normal">
      {label}
    </span>
  </label>
);

export default Sidebar;
