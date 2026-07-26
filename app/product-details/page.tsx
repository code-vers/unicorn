"use client";
import BookingProcess from "@/components/product/BookingProcess";
import CarPropertiesSection from "@/components/product/CarPropertiesSection";
import DriverDetailsForm from "@/components/product/DriverDetailsForm";
import {
  BookingCalculatePayload,
  BookingCalculateResponse,
  BookingService,
} from "@/lib/api/booking.service";
import { VehicleResponse, VehicleService } from "@/lib/api/vehicle.service";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

// ── Product Details Page (Booking State Owner) ────────────────────────────────
//
// This page is the single source of truth for the checkout flow.
// It:
//  1. Reads vehicle ID + dates from URL params
//  2. Fetches the full vehicle record
//  3. Calls /bookings/calculate whenever add-ons change to get a live price
//  4. Passes state + setters down to child components as props

const ProductDetailsContent: React.FC = () => {
  const searchParams = useSearchParams();

  // ── URL params (set by CarResultCard when user clicks "View Details") ───────
  const vehicleId = searchParams.get("id") ?? "";

  // ── Booking form state ────────────────────────────────────────────────────────
  const [pickupDate, setPickupDate] = useState(searchParams.get("pickupDate") ?? "");
  const [pickupTime, setPickupTime] = useState(searchParams.get("pickupTime") ?? "");
  const [dropOffDate, setDropOffDate] = useState(searchParams.get("dropOffDate") ?? "");
  const [dropOffTime, setDropOffTime] = useState(searchParams.get("dropOffTime") ?? "");

  // Ensure dropOffDate is never strictly before pickupDate
  useEffect(() => {
    if (pickupDate && dropOffDate && dropOffDate < pickupDate) {
      setDropOffDate(pickupDate);
    }
  }, [pickupDate, dropOffDate]);

  // ── Vehicle data ─────────────────────────────────────────────────────────────
  const [vehicle, setVehicle] = useState<VehicleResponse | null>(null);
  const [vehicleLoading, setVehicleLoading] = useState(true);

  useEffect(() => {
    if (!vehicleId) return;
    VehicleService.getVehicle(vehicleId)
      .then(setVehicle)
      .catch(console.error)
      .finally(() => setVehicleLoading(false));
  }, [vehicleId]);

  // ── Booking form state ────────────────────────────────────────────────────────
  const [pickupLocationId, setPickupLocationId] = useState(searchParams.get("pickupLocationId") ?? "");
  const [dropOffLocationId, setDropOffLocationId] = useState(searchParams.get("dropOffLocationId") ?? "");
  const [hasGps, setHasGps] = useState(false);
  const [hasFullInsurance, setHasFullInsurance] = useState(false);
  const [hasAdditionalDriver, setHasAdditionalDriver] = useState(false);
  const [hasChildSeat, setHasChildSeat] = useState(false);

  // ── Locations data ────────────────────────────────────────────────────────────
  const [locations, setLocations] = useState<any[]>([]);
  useEffect(() => {
    import("@/lib/api/location.service").then((mod) => {
      mod.LocationService.getLocations({ status: "ACTIVE" })
        .then((res) => setLocations(res.data))
        .catch(console.error);
    });
  }, []);

  const getLocName = (id: string, fallback: string | undefined) => {
    if (!id) return fallback;
    const loc = locations.find((l) => l.id === id);
    return loc ? loc.name : fallback;
  };

  // ── Live price calculation ────────────────────────────────────────────────────
  const [priceBreakdown, setPriceBreakdown] =
    useState<BookingCalculateResponse | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);

  // Build the ISO strings for dates. We combine date + time strings from URL params.
  const buildIso = (date: string, time: string) => {
    if (!date) return "";
    return time ? `${date}T${time}:00.000Z` : `${date}T00:00:00.000Z`;
  };

  const pickupDateIso = buildIso(pickupDate, pickupTime);
  const dropOffDateIso = buildIso(dropOffDate, dropOffTime);

  const runCalculate = useCallback(async () => {
    // We need at minimum: vehicleId, both dates, and location IDs
    // Locations may not be set yet; we use the vehicle's own location as a safe default
    if (!vehicleId || !pickupDateIso || !dropOffDateIso) return;

    const effectivePickupId = pickupLocationId || vehicle?.locationId || "";
    const effectiveDropOffId = dropOffLocationId || vehicle?.locationId || "";
    if (!effectivePickupId || !effectiveDropOffId) return;

    const payload: BookingCalculatePayload = {
      vehicleId,
      pickupLocationId: effectivePickupId,
      dropOffLocationId: effectiveDropOffId,
      pickupDate: pickupDateIso,
      dropOffDate: dropOffDateIso,
      hasGps,
      hasFullInsurance,
      hasAdditionalDriver,
      hasChildSeat,
    };

    setPriceLoading(true);
    try {
      const result = await BookingService.calculate(payload);
      setPriceBreakdown(result);
    } catch (err) {
      console.error("Price calculation failed:", err);
    } finally {
      setPriceLoading(false);
    }
  }, [
    vehicleId,
    pickupDateIso,
    dropOffDateIso,
    pickupLocationId,
    dropOffLocationId,
    vehicle?.locationId,
    hasGps,
    hasFullInsurance,
    hasAdditionalDriver,
    hasChildSeat,
  ]);

  // Re-calculate whenever any relevant state changes (including add-on toggles)
  useEffect(() => {
    if (vehicle) runCalculate();
  }, [vehicle, runCalculate]);

  if (vehicleLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-white w-full">
        <div className="w-10 h-10 border-4 border-[#43A047] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Step progress + pickup/dropoff details */}
      <BookingProcess
        pickupDate={pickupDate}
        pickupTime={pickupTime}
        dropOffDate={dropOffDate}
        dropOffTime={dropOffTime}
        pickupLocationId={pickupLocationId}
        dropOffLocationId={dropOffLocationId}
        setPickupDate={setPickupDate}
        setPickupTime={setPickupTime}
        setDropOffDate={setDropOffDate}
        setDropOffTime={setDropOffTime}
        setPickupLocationId={setPickupLocationId}
        setDropOffLocationId={setDropOffLocationId}
        locations={locations}
      />

      {/* Vehicle properties + add-on toggles */}
      <CarPropertiesSection
        vehicle={vehicle}
        hasGps={hasGps}
        setHasGps={setHasGps}
        hasFullInsurance={hasFullInsurance}
        setHasFullInsurance={setHasFullInsurance}
        hasAdditionalDriver={hasAdditionalDriver}
        setHasAdditionalDriver={setHasAdditionalDriver}
        hasChildSeat={hasChildSeat}
        setHasChildSeat={setHasChildSeat}
      />

      {/* Driver details form + live price breakdown + submit */}
      <DriverDetailsForm
        vehicle={vehicle}
        vehicleId={vehicleId}
        pickupLocationId={pickupLocationId || vehicle?.locationId || ""}
        dropOffLocationId={dropOffLocationId || vehicle?.locationId || ""}
        pickupDate={pickupDateIso}
        dropOffDate={dropOffDateIso}
        hasGps={hasGps}
        hasFullInsurance={hasFullInsurance}
        hasAdditionalDriver={hasAdditionalDriver}
        hasChildSeat={hasChildSeat}
        priceBreakdown={priceBreakdown}
        priceLoading={priceLoading}
      />
    </div>
  );
};

export default function ProductDetailsPage() {
  return (
    <React.Suspense fallback={<div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-white w-full"><div className="w-10 h-10 border-4 border-[#43A047] border-t-transparent rounded-full animate-spin" /></div>}>
      <ProductDetailsContent />
    </React.Suspense>
  );
}
