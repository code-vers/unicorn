"use client";
import {
  Briefcase,
  Car,
  Check,
  Settings2,
  Users,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { VehicleQuery, VehicleResponse, VehicleService } from "../../lib/api/vehicle.service";
import { Spinner } from '@/components/ui/Spinner';


// ── Base URL helper ──────────────────────────────────────────────────────────
const getBaseUrl = () =>
  (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1").replace(
    "/api/v1",
    ""
  );

// ── CarResultCard ────────────────────────────────────────────────────────────
interface CarResultCardProps {
  vehicle: VehicleResponse;
}

export const CarResultCard: React.FC<CarResultCardProps> = ({ vehicle }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const baseUrl = getBaseUrl();

  // Build the "View Details" URL — carry over dates/times from the search page
  // so the checkout screen pre-populates without the user having to re-enter them.
  const buildDetailsUrl = () => {
    const params = new URLSearchParams();
    params.set("id", vehicle.id);
    const forward = ["pickupDate", "pickupTime", "dropOffDate", "dropOffTime", "pickupLocationId", "dropOffLocationId"];
    forward.forEach((key) => {
      const val = searchParams.get(key);
      if (val) params.set(key, val);
    });
    return `/product-details?${params.toString()}`;
  };

  const imageUrl =
    vehicle.images && vehicle.images.length > 0
      ? `${baseUrl}${vehicle.images[0].path}`
      : "/product/car.png";

  const dailyRate = vehicle.pricing?.dailyRate;

  return (
    <div className="w-full bg-[#FDFDFD] border border-[#E5E5E5] rounded-[12px] flex flex-col md:flex-row overflow-hidden mb-5 shadow-sm">
      {/* LEFT & CENTER CONTENT SECTION */}
      <div className="flex-[3] p-5 lg:p-7 flex flex-col">
        {/* 1. Header Area: Title & category */}
        <div className="flex items-baseline gap-2 mb-4">
          <h2 className="text-[#43a047] text-[20px] lg:text-[24px] font-bold tracking-tight">
            {vehicle.name}
          </h2>
          <span className="text-[#666666] text-[14px] font-normal">
            or similar
          </span>
        </div>

        {/* 2. Specs Bar */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6 border-b border-[#F0F0F0] pb-5">
          <SpecItem
            icon={<Settings2 size={16} />}
            label={vehicle.transmission === "AUTOMATIC" ? "Automatic" : "Manual"}
          />
          <SpecItem
            icon={<Users size={16} />}
            label={`${vehicle.seatingCapacity} Seats`}
          />
          {vehicle.luggageCapacity !== null && vehicle.luggageCapacity !== undefined && (
            <SpecItem
              icon={<Briefcase size={16} />}
              label={`${vehicle.luggageCapacity} bag${vehicle.luggageCapacity !== 1 ? "s" : ""}`}
            />
          )}
          <SpecItem
            icon={<Car size={16} />}
            label={vehicle.category.replace(/_/g, " ")}
          />
        </div>

        {/* 3. Image & Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Car Image */}
          <div className="flex justify-center items-center">
            <img
              src={imageUrl}
              alt={vehicle.name}
              className="w-full max-w-[260px] h-auto object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Features Column */}
          <div className="flex flex-col gap-3">
            <FeatureItem
              icon={<Car size={10} strokeWidth={3} />}
              text="Meet and greet service"
              isOrange
            />
            <FeatureItem
              icon={<Car size={10} strokeWidth={3} />}
              text="Instant Confirmation!"
              isOrange
            />
            <FeatureItem
              icon={<Check size={12} strokeWidth={3} />}
              text="Free Cancellation"
            />
            <FeatureItem
              icon={<Check size={12} strokeWidth={3} />}
              text="Full Prepayment"
            />
            {vehicle.features && vehicle.features.length > 0 && (
              <FeatureItem
                icon={<Check size={12} strokeWidth={3} />}
                text={vehicle.features.map((f) => f.name).join(", ")}
              />
            )}
          </div>
        </div>
      </div>

      {/* RIGHT PRICING SIDEBAR */}
      <div className="flex-1 bg-white md:bg-transparent border-t md:border-t-0 md:border-l border-[#E5E5E5] flex flex-col items-center justify-center p-6 lg:p-8 min-w-[200px]">
        <div className="mb-5">
          {dailyRate !== undefined ? (
            <>
              <p className="text-[#ff8f00] text-[22px] lg:text-[26px] font-extrabold">
                KSH {Number(dailyRate).toLocaleString()}
              </p>
              <p className="text-[#666666] text-[12px] text-center">/ day</p>
            </>
          ) : (
            <p className="text-[#666666] text-[14px]">Price on request</p>
          )}
        </div>

        <button
          onClick={() => router.push(buildDetailsUrl())}
          className="w-full bg-[#3FA34D] text-white py-3 px-6 rounded-[8px] font-bold text-[15px] transition-all hover:bg-[#3d9140] active:scale-95 shadow-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// ── Sub-components ───────────────────────────────────────────────────────────
const SpecItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex items-center gap-2 text-[#444444]">
    <span className="text-[#666666]">{icon}</span>
    <span className="text-[13px] font-medium leading-none">{label}</span>
  </div>
);

const FeatureItem = ({
  icon,
  text,
  isOrange,
}: {
  icon: React.ReactNode;
  text: string;
  isOrange?: boolean;
}) => (
  <div className="flex items-center gap-3">
    <div
      className={`flex-shrink-0 w-5 h-5 rounded-full border ${
        isOrange
          ? "border-[#ff8f00] text-[#ff8f00]"
          : "border-[#43a047] text-[#43a047]"
      } flex items-center justify-center`}
    >
      {icon}
    </div>
    <span className="text-[#333333] text-[13.5px] font-medium tracking-tight">
      {text}
    </span>
  </div>
);

// ── CarResultsList ───────────────────────────────────────────────────────────
interface CarResultsListProps {
  query: VehicleQuery;
}

export const CarResultsList: React.FC<CarResultsListProps> = ({ query }) => {
  const [vehicles, setVehicles] = React.useState<VehicleResponse[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    VehicleService.getVehicles(query)
      .then((response) => {
        if (!cancelled) {
          setVehicles(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Failed to load vehicles.");
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(query)]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Spinner size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 font-nunito">{error}</div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Car size={48} className="text-[#D1D5DB] mb-4" />
        <p className="text-[#666666] text-[16px] font-semibold">
          No vehicles found
        </p>
        <p className="text-[#9CA3AF] text-[14px] mt-1">
          Try adjusting your filters or changing the dates.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {vehicles.map((vehicle) => (
        <CarResultCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default CarResultsList;
