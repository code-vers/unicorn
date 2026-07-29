"use client";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { VehicleResponse } from "../../lib/api/vehicle.service";
import { LocationResponse, LocationService } from "../../lib/api/location.service";

// ── Props ─────────────────────────────────────────────────────────────────────
interface CarPropertiesSectionProps {
  vehicle: VehicleResponse | null;
  hasGps: boolean;
  setHasGps: (v: boolean) => void;
  hasFullInsurance: boolean;
  setHasFullInsurance: (v: boolean) => void;
  hasAdditionalDriver: boolean;
  setHasAdditionalDriver: (v: boolean) => void;
  hasChildSeat: boolean;
  setHasChildSeat: (v: boolean) => void;
}

const ADDONS = [
  { key: "hasGps" as const, label: "GPS Navigation", hint: "Live turn-by-turn navigation device" },
  { key: "hasFullInsurance" as const, label: "Full Insurance", hint: "Comprehensive collision and theft cover" },
  { key: "hasAdditionalDriver" as const, label: "Additional Driver", hint: "Add an extra authorised driver" },
  { key: "hasChildSeat" as const, label: "Child Seat", hint: "Compliant safety seat for children" },
] as const;

type AddonKey = "hasGps" | "hasFullInsurance" | "hasAdditionalDriver" | "hasChildSeat";

// ── Component ─────────────────────────────────────────────────────────────────
const CarPropertiesSection: React.FC<CarPropertiesSectionProps> = ({
  vehicle,
  hasGps,
  setHasGps,
  hasFullInsurance,
  setHasFullInsurance,
  hasAdditionalDriver,
  setHasAdditionalDriver,
  hasChildSeat,
  setHasChildSeat,
}) => {
  const getBaseUrl = () =>
    (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1").replace("/api/v1", "");

  const price = vehicle?.pricing?.dailyRate
    ? Number(vehicle.pricing.dailyRate).toLocaleString()
    : "—";
  const name = vehicle?.name ?? "Loading vehicle...";
  const imageUrl = vehicle?.images?.[0]?.path
    ? `${getBaseUrl()}${vehicle.images[0].path}`
    : "/product/car.png";

  // Map toggle setter by key
  const addonSetters: Record<AddonKey, (v: boolean) => void> = {
    hasGps: setHasGps,
    hasFullInsurance: setHasFullInsurance,
    hasAdditionalDriver: setHasAdditionalDriver,
    hasChildSeat: setHasChildSeat,
  };
  const addonValues: Record<AddonKey, boolean> = {
    hasGps,
    hasFullInsurance,
    hasAdditionalDriver,
    hasChildSeat,
  };

  return (
    <div className="bg-white">
      <div className="max-w-[1440px] mx-auto p-6 bg-white">
        {/* --- TOP SECTION: VEHICLE HEADER --- */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="w-full md:w-1/3">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="flex-1 pt-4">
            <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-4">{name}</h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-[#777777] mb-6">
              <span>{vehicle?.seatingCapacity ?? "—"} seats</span>
              <span>{vehicle?.luggageCapacity ?? "—"} bags</span>
              <span>{vehicle?.transmission ?? "—"}</span>
              <span>{vehicle?.fuelType ?? "—"}</span>
            </div>
            <span className="inline-block bg-[#FFF4E5] text-[#FF8F00] text-[11px] font-bold px-3 py-1 rounded-[4px] uppercase tracking-wider">
              Instant Booking
            </span>
          </div>
        </div>

        {/* --- BOTTOM SECTION: DETAILS & PRICE --- */}
        <div className="flex flex-col lg:flex-row gap-10 border-t border-[#EEEEEE] pt-8">
          {/* LEFT: PROPERTIES & ADD-ONS */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex mb-10 border-b border-[#43A047]/20">
              <button className="bg-[#43A047] text-white px-10 py-4 text-[16px] font-semibold rounded-t-[4px]">
                Properties Overview
              </button>
              <button className="bg-transparent text-[#43A047] px-10 py-4 text-[16px] font-semibold">
                Rental Terms
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-6 mb-10">
              {/* Column 1: Policy Info */}
              <div className="space-y-8">
                <div className="border-l-[3px] border-[#FF8F00] pl-4">
                  <p className="text-[14px] text-[#777777] mb-2">Fuel policy</p>
                  <p className="text-[18px] font-bold text-[#1A1A1A]">Same to same</p>
                </div>
                <div className="border-l-[3px] border-[#FF8F00] pl-4">
                  <p className="text-[14px] text-[#777777] mb-2">Pick-up location</p>
                  <p className="text-[18px] font-bold text-[#1A1A1A]">
                    {vehicle?.location?.name ?? "Meet & Greet"}
                  </p>
                </div>
              </div>

              {/* Column 2: Included Features */}
              <div className="space-y-5">
                <FeatureItem label="Unlimited mileage" />
                <FeatureItem label="Collision Damage Waiver" />
                <FeatureItem label="Theft Protection" />
                <FeatureItem label="Roadside Assistance" />
                <FeatureItem label="Third Party Liability (TPL)" />
              </div>
            </div>

            {/* Add-on Extras */}
            <div>
              <h3 className="text-[17px] font-bold text-[#1A1A1A] mb-4">Optional Extras</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ADDONS.map(({ key, label, hint }) => {
                  const checked = addonValues[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => addonSetters[key](!checked)}
                      className={`flex items-start gap-4 p-4 rounded-[10px] border-2 text-left transition-all duration-150 ${
                        checked
                          ? "border-[#43A047] bg-[#F0FAF0]"
                          : "border-[#E5E7EB] bg-white hover:border-[#43A047]/40"
                      }`}
                    >
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-[4px] border-2 flex items-center justify-center shrink-0 transition-colors ${
                          checked ? "border-[#43A047] bg-[#43A047]" : "border-[#D1D5DB]"
                        }`}
                      >
                        {checked && <Check size={12} strokeWidth={3} className="text-white" />}
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-[#1A1A1A] leading-tight">{label}</p>
                        <p className="text-[12px] text-[#777777] mt-0.5">{hint}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: PRICE CARD */}
          <div className="lg:w-[320px] shrink-0">
            <div className="bg-[#F3F5F6] rounded-[12px] p-8 text-center sticky top-8">
              <h2 className="text-[26px] font-bold text-[#1A1A1A] mb-1">Ksh {price}</h2>
              <p className="text-[14px] text-[#777777] mb-6">Per day</p>

              <div className="w-full h-[1px] bg-[#E0E0E0] mb-8" />

              <div className="text-left">
                <p className="text-[#FF8F00] text-[13px] font-bold uppercase mb-4 tracking-tight">
                  Good Choice
                </p>
                <div className="flex gap-3 items-start">
                  <Check size={18} className="text-[#FF8F00] mt-1 shrink-0" />
                  <p className="text-[14px] text-[#1A1A1A] leading-[1.6]">
                    <span className="font-bold">Instant confirmation</span> — your booking is secured
                    immediately after submission.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- SUB-COMPONENT --- */
const FeatureItem = ({ label }: { label: string }) => (
  <div className="flex items-center gap-4">
    <Check size={18} className="text-[#FF8F00] shrink-0" />
    <span className="text-[15px] font-medium text-[#1A1A1A]">{label}</span>
  </div>
);

export default CarPropertiesSection;
