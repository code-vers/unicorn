"use client";
import { Check, Car, User } from "lucide-react";
import React, { useState } from "react";
import { VehicleResponse } from "../../lib/api/vehicle.service";
import { getAssetUrl } from "../../lib/asset-url";
import { BookingCalculateResponse } from "../../lib/api/booking.service";

// ── Props ─────────────────────────────────────────────────────────────────────
interface CarPropertiesSectionProps {
  vehicle: VehicleResponse | null;
  isChauffeurDriven: boolean;
  setIsChauffeurDriven: (v: boolean) => void;
  hasGps: boolean;
  setHasGps: (v: boolean) => void;
  hasFullInsurance: boolean;
  setHasFullInsurance: (v: boolean) => void;
  hasAdditionalDriver: boolean;
  setHasAdditionalDriver: (v: boolean) => void;
  hasChildSeat: boolean;
  setHasChildSeat: (v: boolean) => void;
  priceBreakdown?: BookingCalculateResponse | null;
  priceLoading?: boolean;
}

const ADDONS = [
  { key: "hasGps" as const, label: "GPS Navigation", hint: "Live turn-by-turn navigation device", priceKey: "gpsCharge" as const },
  { key: "hasFullInsurance" as const, label: "Full Insurance", hint: "Comprehensive collision and theft cover", priceKey: "fullInsuranceCharge" as const },
  { key: "hasAdditionalDriver" as const, label: "Additional Driver", hint: "Add an extra authorised driver", priceKey: "additionalDriverCharge" as const },
  { key: "hasChildSeat" as const, label: "Child Seat", hint: "Compliant safety seat for children", priceKey: "childSeatCharge" as const },
] as const;

type AddonKey = "hasGps" | "hasFullInsurance" | "hasAdditionalDriver" | "hasChildSeat";
type TabId = "properties" | "rental-terms";

// ── Component ─────────────────────────────────────────────────────────────────
const CarPropertiesSection: React.FC<CarPropertiesSectionProps> = ({
  vehicle,
  isChauffeurDriven,
  setIsChauffeurDriven,
  hasGps,
  setHasGps,
  hasFullInsurance,
  setHasFullInsurance,
  hasAdditionalDriver,
  setHasAdditionalDriver,
  hasChildSeat,
  setHasChildSeat,
  priceBreakdown,
  priceLoading,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>("properties");

  const price = vehicle?.pricing?.dailyRate
    ? Number(vehicle.pricing.dailyRate).toLocaleString()
    : "—";
  const name = vehicle?.name ?? "Loading vehicle...";
  const imageUrl = vehicle?.images?.[0]?.path
    ? getAssetUrl(vehicle.images[0].path)
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

  // Price formatting helper
  const fmt = (n: number) => `Ksh ${n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

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
              <button
                onClick={() => setActiveTab("properties")}
                className={`px-10 py-4 text-[16px] font-semibold rounded-t-[4px] transition-colors ${
                  activeTab === "properties"
                    ? "bg-[#43A047] text-white"
                    : "bg-transparent text-[#43A047] hover:bg-[#43A047]/10"
                }`}
              >
                Properties Overview
              </button>
              <button
                onClick={() => setActiveTab("rental-terms")}
                className={`px-10 py-4 text-[16px] font-semibold rounded-t-[4px] transition-colors ${
                  activeTab === "rental-terms"
                    ? "bg-[#43A047] text-white"
                    : "bg-transparent text-[#43A047] hover:bg-[#43A047]/10"
                }`}
              >
                Rental Terms
              </button>
            </div>

            {/* Properties Overview Tab */}
            {activeTab === "properties" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-6 mb-10">
                  {/* Column 1: Policy Info */}
                  <div className="space-y-8">
                    <div className="border-l-[3px] border-[#FF8F00] pl-4">
                      <p className="text-[14px] text-[#777777] mb-2">Fuel policy</p>
                      <p className="text-[18px] font-bold text-[#1A1A1A]">Same to same</p>
                    </div>
                  </div>

                  {/* Column 2: Included Features */}
                  <div className="space-y-5">
                    {vehicle?.features
                      ?.filter((f) => !f.isAddon)
                      .map((feature) => (
                        <FeatureItem key={feature.id} label={feature.name} />
                      ))}
                    {(!vehicle?.features || vehicle.features.filter((f) => !f.isAddon).length === 0) && (
                      <>
                        <FeatureItem label="Unlimited mileage" />
                        <FeatureItem label="Collision Damage Waiver" />
                      </>
                    )}
                  </div>
                </div>

                {/* Drive Type Selection */}
                <div className="mb-8">
                  <h3 className="text-[17px] font-bold text-[#1A1A1A] mb-4">Drive Type</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DriveTypeOption
                      icon={<Car size={20} />}
                      label="Self Drive"
                      hint="Drive the vehicle yourself"
                      selected={!isChauffeurDriven}
                      onClick={() => setIsChauffeurDriven(false)}
                    />
                    <DriveTypeOption
                      icon={<User size={20} />}
                      label="Chauffeur Driven"
                      hint="Professional driver provided"
                      selected={isChauffeurDriven}
                      onClick={() => setIsChauffeurDriven(true)}
                      price={vehicle?.pricing?.chauffeurRate ? `+${fmt(Number(vehicle.pricing.chauffeurRate))}/day` : undefined}
                    />
                  </div>
                </div>

                {/* Add-on Extras */}
                <div>
                  <h3 className="text-[17px] font-bold text-[#1A1A1A] mb-4">Optional Extras</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ADDONS.map(({ key, label, hint, priceKey }) => {
                      const checked = addonValues[key];
                      const addonPrice = vehicle?.pricing ? (vehicle.pricing as any)[priceKey] : null;
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
                            <p className="text-[15px] font-bold text-[#1A1A1A] leading-tight">
                              {label}
                              {addonPrice ? (
                                <span className="text-[#43A047] ml-2 text-[13px]">(+Ksh {Number(addonPrice).toLocaleString()})</span>
                              ) : null}
                            </p>
                            <p className="text-[12px] text-[#777777] mt-0.5">{hint}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Rental Terms Tab */}
            {activeTab === "rental-terms" && (
              <div className="space-y-6 text-[14px] text-[#444444] leading-[1.8]">
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">General Terms</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Minimum rental period is 1 day (24 hours).</li>
                    <li>A valid driving licence is required at the time of pickup.</li>
                    <li>The minimum age for renting a vehicle is 23 years.</li>
                    <li>An international driving permit (IDP) may be required for foreign licence holders.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Fuel Policy</h4>
                  <p>Vehicles are provided with a full tank of fuel and must be returned with the same fuel level. Failure to do so may incur a refuelling charge.</p>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Mileage</h4>
                  <p>All rentals include unlimited mileage unless otherwise stated.</p>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Security Deposit</h4>
                  <p>
                    A security deposit of{" "}
                    <strong>
                      {vehicle?.pricing?.securityDeposit
                        ? fmt(Number(vehicle.pricing.securityDeposit))
                        : "Ksh 10,000"}
                    </strong>{" "}
                    is required and will be refunded upon safe return of the vehicle.
                  </p>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Cancellation Policy</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Free cancellation up to 48 hours before pickup.</li>
                    <li>Cancellations within 48 hours of pickup are subject to a cancellation fee.</li>
                    <li>No-shows will be charged the full rental amount.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Insurance</h4>
                  <p>Basic insurance (CDW and TPL) is included. Full insurance coverage can be added as an optional extra.</p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: PRICE CARD */}
          <div className="lg:w-[350px] shrink-0">
            <div className="bg-[#F3F5F6] rounded-[12px] p-8 sticky top-8">
              <h2 className="text-[26px] font-bold text-[#1A1A1A] mb-1 text-center">
                {priceLoading ? (
                  <span className="text-[18px]">Calculating...</span>
                ) : priceBreakdown ? (
                  fmt(Number(priceBreakdown.totalAmount))
                ) : (
                  `Ksh ${price}`
                )}
              </h2>
              <p className="text-[14px] text-[#777777] mb-6 text-center">
                {priceBreakdown ? "Total" : "Per day"}
              </p>

              {/* Detailed Breakdown */}
              {priceBreakdown && (
                <div className="border-t border-[#E0E0E0] pt-5 mb-5 space-y-3">
                  <BreakdownRow label={`Rental (${priceBreakdown.durationDays} day${priceBreakdown.durationDays !== 1 ? "s" : ""})`} value={priceBreakdown.rentalCost} />
                  {priceBreakdown.chauffeurFee > 0 && (
                    <BreakdownRow label="Chauffeur Charge" value={priceBreakdown.chauffeurFee} />
                  )}
                  {priceBreakdown.deliveryFee > 0 && (
                    <BreakdownRow label="Delivery / Collection" value={priceBreakdown.deliveryFee} />
                  )}
                  {priceBreakdown.airportFee > 0 && (
                    <BreakdownRow label="Airport Fee" value={priceBreakdown.airportFee} />
                  )}
                  {priceBreakdown.dropOffFee > 0 && (
                    <BreakdownRow label="Drop-off Fee" value={priceBreakdown.dropOffFee} />
                  )}
                  {priceBreakdown.pickupFee > 0 && (
                    <BreakdownRow label="Pickup Fee" value={priceBreakdown.pickupFee} />
                  )}
                  {priceBreakdown.addonsCost > 0 && (
                    <BreakdownRow label="Add-ons" value={priceBreakdown.addonsCost} />
                  )}
                  <div className="border-t border-[#E0E0E0] pt-3">
                    <BreakdownRow label="Subtotal" value={priceBreakdown.subtotal} bold />
                  </div>
                  <BreakdownRow
                    label={`Tax (${priceBreakdown.taxPercentage}%)`}
                    value={priceBreakdown.taxAmount}
                  />
                  <div className="border-t border-[#E0E0E0] pt-3">
                    <BreakdownRow label="Total" value={priceBreakdown.totalAmount} bold accent />
                  </div>
                </div>
              )}

              {!priceBreakdown && <div className="w-full h-[1px] bg-[#E0E0E0] mb-8" />}

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

/* --- SUB-COMPONENTS --- */

const FeatureItem = ({ label }: { label: string }) => (
  <div className="flex items-center gap-4">
    <Check size={18} className="text-[#FF8F00] shrink-0" />
    <span className="text-[15px] font-medium text-[#1A1A1A]">{label}</span>
  </div>
);

interface DriveTypeOptionProps {
  icon: React.ReactNode;
  label: string;
  hint: string;
  selected: boolean;
  onClick: () => void;
  price?: string;
}

const DriveTypeOption: React.FC<DriveTypeOptionProps> = ({ icon, label, hint, selected, onClick, price }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-start gap-4 p-4 rounded-[10px] border-2 text-left transition-all duration-150 ${
      selected
        ? "border-[#43A047] bg-[#F0FAF0]"
        : "border-[#E5E7EB] bg-white hover:border-[#43A047]/40"
    }`}
  >
    <div
      className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
        selected ? "border-[#43A047]" : "border-[#D1D5DB]"
      }`}
    >
      {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#43A047]" />}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="text-[#43A047]">{icon}</span>
        <p className="text-[15px] font-bold text-[#1A1A1A] leading-tight">
          {label}
          {price && <span className="text-[#43A047] ml-2 text-[13px]">({price})</span>}
        </p>
      </div>
      <p className="text-[12px] text-[#777777] mt-0.5 ml-7">{hint}</p>
    </div>
  </button>
);

interface BreakdownRowProps {
  label: string;
  value: number;
  bold?: boolean;
  accent?: boolean;
}

const BreakdownRow: React.FC<BreakdownRowProps> = ({ label, value, bold, accent }) => (
  <div className="flex justify-between items-center">
    <span className={`text-[13px] ${bold ? "font-bold text-[#1A1A1A]" : "text-[#666666]"}`}>
      {label}
    </span>
    <span className={`text-[13px] ${bold ? "font-bold" : ""} ${accent ? "text-[#43A047] text-[15px]" : "text-[#1A1A1A]"}`}>
      Ksh {value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
    </span>
  </div>
);

export default CarPropertiesSection;
