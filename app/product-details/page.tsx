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
import { LocationResponse, LocationService } from '@/lib/api/location.service';
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { PageSkeleton } from '@/components/ui/Skeleton';
import { toBookingIso } from '@/lib/booking-date';


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
  const [locations, setLocations] = useState<LocationResponse[]>([]);
  const [pageError, setPageError] = useState('');

  useEffect(() => {
    if (!vehicleId) return;
    VehicleService.getVehicle(vehicleId)
      .then(setVehicle)
      .catch((error: unknown) =>
        setPageError(error instanceof Error ? error.message : 'Failed to load vehicle')
      )
      .finally(() => setVehicleLoading(false));
  }, [vehicleId]);

  useEffect(() => {
    LocationService.getLocations({ status: 'ACTIVE', limit: 100 })
      .then((response) => setLocations(response.data))
      .catch((error: unknown) =>
        setPageError(error instanceof Error ? error.message : 'Failed to load locations')
      );
  }, []);

  // ── Booking form state ────────────────────────────────────────────────────────
  const [pickupLocationId, setPickupLocationId] = useState(searchParams.get("pickupLocationId") ?? "");
  const [dropOffLocationId, setDropOffLocationId] = useState(searchParams.get("dropOffLocationId") ?? "");
  const [hasGps, setHasGps] = useState(false);
  const [hasFullInsurance, setHasFullInsurance] = useState(false);
  const [hasAdditionalDriver, setHasAdditionalDriver] = useState(false);
  const [hasChildSeat, setHasChildSeat] = useState(false);

  // ── Live price calculation ────────────────────────────────────────────────────
  const [priceBreakdown, setPriceBreakdown] =
    useState<BookingCalculateResponse | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);

  // Build the ISO strings for dates. We combine date + time strings from URL params.
  const pickupDateIso = toBookingIso(pickupDate, pickupTime) ?? '';
  const dropOffDateIso = toBookingIso(dropOffDate, dropOffTime) ?? '';

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
      setPageError('');
    } catch (error: unknown) {
      setPriceBreakdown(null);
      setPageError(error instanceof Error ? error.message : 'Price calculation failed');
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
    return <PageSkeleton />;
  }

  return (
    <div>
      {pageError && (
        <div role='alert' className='mx-auto mt-4 max-w-[1440px] rounded-lg bg-red-50 p-3 text-sm text-red-700'>
          {pageError}
        </div>
      )}
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
    <React.Suspense fallback={<PageSkeleton />}>
      <ProductDetailsContent />
    </React.Suspense>
  );
}
