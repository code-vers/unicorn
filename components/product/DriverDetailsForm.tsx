"use client";
import React, { useState } from "react";
import {
  BookingCalculateResponse,
  BookingService,
} from "../../lib/api/booking.service";
import { VehicleResponse } from "../../lib/api/vehicle.service";
import { Spinner } from '@/components/ui/Spinner';
import { Skeleton } from '@/components/ui/Skeleton';


// ── Props ─────────────────────────────────────────────────────────────────────
interface DriverDetailsFormProps {
  vehicle: VehicleResponse | null;
  vehicleId: string;
  pickupLocationId: string;
  dropOffLocationId: string;
  pickupDate: string;
  dropOffDate: string;
  hasGps: boolean;
  hasFullInsurance: boolean;
  hasAdditionalDriver: boolean;
  hasChildSeat: boolean;
  priceBreakdown: BookingCalculateResponse | null;
  priceLoading: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────
const DriverDetailsForm: React.FC<DriverDetailsFormProps> = ({
  vehicle,
  vehicleId,
  pickupLocationId,
  dropOffLocationId,
  pickupDate,
  dropOffDate,
  hasGps,
  hasFullInsurance,
  hasAdditionalDriver,
  hasChildSeat,
  priceBreakdown,
  priceLoading,
}) => {
  // ── Driver Detail Fields ────────────────────────────────────────────────────
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dobDay, setDobDay] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobYear, setDobYear] = useState("");
  const [message, setMessage] = useState("");
  const [wantsOffers, setWantsOffers] = useState(false);

  // ── Billing Info Fields ─────────────────────────────────────────────────────
  const [billingSameAsDriver, setBillingSameAsDriver] = useState(true);
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZip, setBillingZip] = useState("");

  // ── Submission State ────────────────────────────────────────────────────────
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Price display helpers ───────────────────────────────────────────────────
  const fmt = (n?: number | null) =>
    n !== undefined && n !== null ? `KSH ${n.toFixed(2)}` : "—";

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !phone) {
      setError("Please fill in all required driver details.");
      return;
    }
    if (!pickupLocationId || !dropOffLocationId) {
      setError("Please select pick-up and drop-off locations.");
      return;
    }
    if (!pickupDate || !dropOffDate) {
      setError("Pick-up and drop-off dates are required. Please go back and select your dates.");
      return;
    }

    const dateOfBirth =
      dobDay && dobMonth && dobYear
        ? `${dobYear}-${dobMonth.padStart(2, "0")}-${dobDay.padStart(2, "0")}`
        : undefined;

    const billingInfo = {
      firstName: billingSameAsDriver ? firstName : firstName,
      lastName: billingSameAsDriver ? lastName : lastName,
      email: billingSameAsDriver ? email : email,
      phone: billingSameAsDriver ? phone : phone,
      address: billingAddress,
      city: billingCity || (billingSameAsDriver ? "" : ""),
      country: billingCountry,
      state: billingState || undefined,
      zipCode: billingZip || undefined,
    };

    if (!billingInfo.address || !billingInfo.city || !billingInfo.country) {
      setError("Please fill in all required billing information.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const { checkout } = await BookingService.createCheckout({
        vehicleId,
        pickupLocationId,
        dropOffLocationId,
        pickupDate,
        dropOffDate,
        hasGps,
        hasFullInsurance,
        hasAdditionalDriver,
        hasChildSeat,
        driverDetails: {
          firstName,
          lastName,
          email,
          phone,
          dateOfBirth,
          message: message || undefined,
        },
        billingInfo,
      });

      window.location.assign(checkout.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-[1440px] mx-auto p-6 bg-white">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* --- LEFT SIDE: FORM --- */}
          <div className="flex-1 w-full">
            <h2 className="text-[28px] font-bold text-[#1A1A1A] mb-8">
              Enter driver details
            </h2>

            {/* Basic Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-6">
              <InputGroup
                label="Email *"
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={setEmail}
              />
              <InputGroup
                label="Phone *"
                placeholder="Enter phone number"
                type="tel"
                value={phone}
                onChange={setPhone}
              />
              <InputGroup
                label="First Name *"
                placeholder="Enter first name"
                value={firstName}
                onChange={setFirstName}
              />
              <InputGroup
                label="Last Name *"
                placeholder="Enter last name"
                value={lastName}
                onChange={setLastName}
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-6">
              <label className="block text-[15px] font-bold text-[#1A1A1A] mb-3">
                Date of Birth
              </label>
              <div className="grid grid-cols-3 gap-4">
                <SelectGroup
                  placeholder="DAY"
                  value={dobDay}
                  onChange={setDobDay}
                  options={Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"))}
                />
                <SelectGroup
                  placeholder="MONTH"
                  value={dobMonth}
                  onChange={setDobMonth}
                  options={["01","02","03","04","05","06","07","08","09","10","11","12"]}
                />
                <SelectGroup
                  placeholder="YEAR"
                  value={dobYear}
                  onChange={setDobYear}
                  options={Array.from({ length: 80 }, (_, i) => String(new Date().getFullYear() - 18 - i))}
                />
              </div>
            </div>

            {/* Message */}
            <div className="mb-8">
              <label className="block text-[15px] font-bold text-[#1A1A1A] mb-3">
                Message to Car Supplier
              </label>
              <textarea
                placeholder="YOUR MESSAGE..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-[140px] p-4 bg-white border border-[#E5E7EB] rounded-[6px] text-[14px] text-[#1A1A1A] outline-none focus:border-[#43A047] uppercase placeholder:text-[#9CA3AF]"
              />
            </div>

            {/* Billing Info */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold text-[#1A1A1A]">Billing Information</h3>
                <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#555]">
                  <input
                    type="checkbox"
                    checked={billingSameAsDriver}
                    onChange={(e) => setBillingSameAsDriver(e.target.checked)}
                    className="w-4 h-4 accent-[#43A047]"
                  />
                  Same as driver details
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <InputGroup
                  label="Address *"
                  placeholder="Street address"
                  value={billingAddress}
                  onChange={setBillingAddress}
                />
                <InputGroup
                  label="City *"
                  placeholder="City"
                  value={billingCity}
                  onChange={setBillingCity}
                />
                <InputGroup
                  label="Country *"
                  placeholder="Country"
                  value={billingCountry}
                  onChange={setBillingCountry}
                />
                <InputGroup
                  label="State / County"
                  placeholder="State (optional)"
                  value={billingState}
                  onChange={setBillingState}
                />
                <InputGroup
                  label="ZIP / Postal Code"
                  placeholder="ZIP (optional)"
                  value={billingZip}
                  onChange={setBillingZip}
                />
              </div>
            </div>

            {/* Offers Checkbox */}
            <div className="flex items-center gap-3 mb-6">
              <input
                type="checkbox"
                id="offers"
                checked={wantsOffers}
                onChange={(e) => setWantsOffers(e.target.checked)}
                className="w-[18px] h-[18px] accent-[#43A047] cursor-pointer"
              />
              <label htmlFor="offers" className="text-[14px] text-[#444444] cursor-pointer">
                Yes, I would like to receive special offers, exclusive deals, and discounts from unicorn rent a car
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-[6px] text-red-600 text-[14px]">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={submitting || priceLoading}
              className="bg-[#43A047] text-white px-10 py-4 rounded-[6px] font-bold text-[16px] hover:bg-[#388E3C] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-3"
            >
              {submitting ? (
                <>
                  <Spinner size="sm" variant="white" />
                  Processing…
                </>
              ) : (
                "Pay & Confirm Reservation"
              )}
            </button>
          </div>

          {/* --- RIGHT SIDE: LIVE PRICE BREAKDOWN --- */}
          <div className="w-full lg:w-[380px] shrink-0 sticky top-8">
            <div className="bg-[#0F172A] text-white rounded-[12px] p-8 shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-[20px] font-bold">Price breakdown</h3>
                <span className="border border-[#FF8F00] text-[#FF8F00] text-[10px] font-bold px-2 py-1 rounded-[4px] uppercase tracking-tighter">
                  Instant Booking
                </span>
              </div>

              {priceLoading ? (
                <div className="space-y-5 py-2" role="status" aria-label="Calculating price">
                  <Skeleton className="h-3 w-24 bg-slate-700" />
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full bg-slate-700" />
                    <Skeleton className="h-4 w-5/6 bg-slate-700" />
                    <Skeleton className="h-px w-full bg-slate-700" />
                    <Skeleton className="h-5 w-full bg-slate-700" />
                  </div>
                </div>
              ) : priceBreakdown ? (
                <>
                  {/* Rental */}
                  <div className="mb-4">
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">RENTAL</p>
                    <FeeRow label={`Cost of rental (${priceBreakdown.durationDays} day${priceBreakdown.durationDays !== 1 ? "s" : ""})`} value={fmt(priceBreakdown.rentalCost)} />
                  </div>

                  <div className="w-full h-[1px] bg-gray-700 my-5" />

                  {/* Fees */}
                  <div className="mb-4 space-y-3">
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">TAXES & FEES</p>
                    <FeeRow label="Pick-up fee" value={fmt(priceBreakdown.pickupFee)} />
                    <FeeRow label="Drop-off fee" value={fmt(priceBreakdown.dropOffFee)} />
                    {priceBreakdown.addonsCost > 0 && (
                      <FeeRow label="Optional extras" value={fmt(priceBreakdown.addonsCost)} />
                    )}
                    <FeeRow label={`VAT (${priceBreakdown.taxPercentage}%)`} value={fmt(priceBreakdown.taxAmount)} />
                  </div>

                  <div className="w-full h-[1px] bg-gray-700 my-5" />

                  {/* Totals */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[15px] font-bold">
                      <span>Subtotal</span>
                      <span>{fmt(priceBreakdown.subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[18px] font-extrabold text-white">
                      <span>Total to pay</span>
                      <span className="text-[20px] text-[#43A047]">{fmt(priceBreakdown.totalAmount)}</span>
                    </div>
                  </div>
                </>
              ) : (
                // Fallback when dates not yet selected
                <div className="text-center py-8">
                  <p className="text-gray-400 text-[14px]">
                    Select pick-up and drop-off locations above to see your price breakdown.
                  </p>
                  {vehicle?.pricing?.dailyRate && (
                    <p className="text-white text-[22px] font-bold mt-4">
                      KSH {Number(vehicle.pricing.dailyRate).toLocaleString()}
                      <span className="text-gray-400 text-[14px] font-normal ml-1">/ day</span>
                    </p>
                  )}
                </div>
              )}

              <p className="text-[10px] text-gray-500 leading-relaxed mt-8">
                All mandatory taxes and fees are included in the total above. No hidden charges at pick-up.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- HELPER COMPONENTS --- */

const InputGroup = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-[15px] font-bold text-[#1A1A1A]">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-[52px] px-4 bg-white border border-[#E5E7EB] rounded-[6px] text-[14px] text-[#1A1A1A] outline-none focus:border-[#43A047] placeholder:text-[#9CA3AF]"
    />
  </div>
);

const SelectGroup = ({
  placeholder,
  value,
  onChange,
  options,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-[52px] px-4 bg-white border border-[#E5E7EB] rounded-[6px] text-[14px] text-[#1A1A1A] appearance-none outline-none cursor-pointer focus:border-[#43A047]"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  </div>
);

const FeeRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-[13px]">
    <span className="text-gray-300">{label}</span>
    <span className="text-gray-100 font-medium">{value}</span>
  </div>
);

export default DriverDetailsForm;
