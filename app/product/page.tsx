"use client";
import CarResultsList from "@/components/product/CarResultCard";
import CategorySlider from "@/components/product/CategorySlider";
import Sidebar from "@/components/product/Sidebar";
import { VehicleQuery } from "@/lib/api/vehicle.service";
import { Menu } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { Spinner } from '@/components/ui/Spinner';


// Combine a date string and time string into a UTC ISO string for the backend.
const buildIso = (date: string, time: string): string | undefined => {
  if (!date) return undefined;
  return time ? `${date}T${time}:00.000Z` : `${date}T00:00:00.000Z`;
};

const ProductContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // ── Filter state ────────────────────────────────────────────────────────────
  // Initialise dates from URL params (set by HeroSection on homepage)
  const [pickupDate, setPickupDate] = useState<string>(
    searchParams.get("pickupDate") || ""
  );
  const [pickupTime, setPickupTime] = useState<string>(
    searchParams.get("pickupTime") || ""
  );
  const [dropOffDate, setDropOffDate] = useState<string>(
    searchParams.get("dropOffDate") || ""
  );
  const [dropOffTime, setDropOffTime] = useState<string>(
    searchParams.get("dropOffTime") || ""
  );
  const [pickupLocationId, setPickupLocationId] = useState<string>(
    searchParams.get("pickupLocationId") || ""
  );
  const [dropOffLocationId, setDropOffLocationId] = useState<string>(
    searchParams.get("dropOffLocationId") || ""
  );
  const [category, setCategory] = useState<string>("");
  const [transmission, setTransmission] = useState<string>("");
  const [fuelType, setFuelType] = useState<string>("");
  const [seatingCapacity, setSeatingCapacity] = useState<number | undefined>(
    undefined
  );
  const [featureIds, setFeatureIds] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  // ── Assembled query sent to CarResultsList ──────────────────────────────────
  const [submittedQuery, setSubmittedQuery] = useState<VehicleQuery>({
    pickupDate: buildIso(
      searchParams.get("pickupDate") || "",
      searchParams.get("pickupTime") || ""
    ),
    dropOffDate: buildIso(
      searchParams.get("dropOffDate") || "",
      searchParams.get("dropOffTime") || ""
    ),
    status: "ACTIVE",
    availability: "AVAILABLE",
  });

  // ── Handlers passed to Sidebar ──────────────────────────────────────────────
  const handleSearch = useCallback(() => {
    // 1. Sync all form state to the URL
    const params = new URLSearchParams(searchParams.toString());
    if (pickupDate) params.set("pickupDate", pickupDate); else params.delete("pickupDate");
    if (pickupTime) params.set("pickupTime", pickupTime); else params.delete("pickupTime");
    if (dropOffDate) params.set("dropOffDate", dropOffDate); else params.delete("dropOffDate");
    if (dropOffTime) params.set("dropOffTime", dropOffTime); else params.delete("dropOffTime");
    if (pickupLocationId) params.set("pickupLocationId", pickupLocationId); else params.delete("pickupLocationId");
    if (dropOffLocationId) params.set("dropOffLocationId", dropOffLocationId); else params.delete("dropOffLocationId");
    
    router.replace(`${pathname}?${params.toString()}`);

    // 2. Submit the query to refresh results
    setSubmittedQuery({
      // pickupLocationId / dropOffLocationId are used in the booking flow (Phase 3),
      // not as a vehicle search filter on the backend.
      pickupDate: buildIso(pickupDate, pickupTime),
      dropOffDate: buildIso(dropOffDate, dropOffTime),
      category: category || undefined,
      transmission: transmission || undefined,
      fuelType: fuelType || undefined,
      seatingCapacity: seatingCapacity,
      featureIds: featureIds.length > 0 ? featureIds : undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      status: "ACTIVE",
      availability: "AVAILABLE",
    });
    setSidebarOpen(false);
  }, [
    pickupDate,
    pickupTime,
    dropOffDate,
    dropOffTime,
    pickupLocationId,
    dropOffLocationId,
    category,
    transmission,
    fuelType,
    seatingCapacity,
    featureIds,
    minPrice,
    maxPrice,
    searchParams,
    router,
    pathname,
  ]);

  // ── Category selected from CategorySlider ───────────────────────────────────
  const handleCategorySelect = useCallback(
    (selectedCategory: string) => {
      const next = category === selectedCategory ? "" : selectedCategory;
      setCategory(next);
      // Immediately apply category filter without requiring Search button click
      setSubmittedQuery((prev) => ({
        ...prev,
        category: next || undefined,
      }));
    },
    [category]
  );

  // ── Sidebar props bundle ────────────────────────────────────────────────────
  const sidebarProps = useMemo(
    () => ({
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
      onSearch: handleSearch,
    }),
    [
      pickupDate,
      pickupTime,
      dropOffDate,
      dropOffTime,
      pickupLocationId,
      dropOffLocationId,
      transmission,
      fuelType,
      seatingCapacity,
      featureIds,
      minPrice,
      maxPrice,
      handleSearch,
    ]
  );

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Responsive Container */}
      <div className="mx-auto max-w-[1440px] w-full flex flex-col lg:flex-row pt-4 lg:pt-[32px] px-4 md:px-8 gap-6 lg:gap-10">
        {/* Sidebar: Mobile Hidden / Desktop Sticky */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-[70] w-[320px] transition-transform duration-300
          lg:translate-x-0 lg:sticky lg:top-[32px] lg:w-[340px] lg:z-0
          ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
          h-screen lg:h-[calc(100vh-64px)] overflow-y-auto no-scrollbar
        `}
        >
          <Sidebar {...sidebarProps} />
        </aside>

        {/* Content Area */}
        <main className="flex-1 pb-20">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mb-4 w-full bg-white p-3 rounded-lg border border-gray-200 text-[#43a047] font-bold flex items-center justify-center gap-2 shadow-sm"
          >
            <Menu size={20} /> View Filters
          </button>

          <div className="max-w-[1000px] w-full">
            {/* 1. Category Slider */}
            <div className="mb-8">
              <CategorySlider
                activeCategory={category}
                onCategorySelect={handleCategorySelect}
              />
            </div>

            {/* 2. Car Result Cards List */}
            <CarResultsList query={submittedQuery} />
          </div>
        </main>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default function Page() {
  return (
    <React.Suspense fallback={<Spinner size="lg" fullScreen className="bg-[#F5F5F5]" />}>
      <ProductContent />
    </React.Suspense>
  );
}
