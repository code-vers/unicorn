"use client";

import React, { useEffect, useState } from "react";
import { VehicleResponse, VehicleService } from "@/lib/api/vehicle.service";
import { CarResultCard } from "@/components/product/CarResultCard";
import { CardGridSkeleton } from '@/components/ui/Skeleton';


const AvailableVehiclesSection: React.FC = () => {
  const [vehicles, setVehicles] = useState<VehicleResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeaturedVehicles = async () => {
      try {
        setIsLoading(true);
        // We need to explicitly ask for status and availability so that if an Admin
        // is viewing the page, they don't see inactive or rented cars (since admins
        // bypass the automatic backend filters).
        const res = await VehicleService.getVehicles({
          isFeatured: "true",
          status: "ACTIVE",
          availability: "AVAILABLE",
          limit: 10,
        });
        setVehicles(res.data || []);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'Failed to load available vehicles');
        setVehicles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedVehicles();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto min-h-[300px]">
          <CardGridSkeleton cards={4} />
        </div>
      </section>
    );
  }

  if (vehicles.length === 0) {
    return error ? (
      <section className='px-6 py-12 text-center text-sm text-red-700'>{error}</section>
    ) : null;
  }

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#111827]">
            Available Vehicles
          </h2>
          <p className="text-[#6B7280] text-[16px] mt-2">
            Choose from our selection of featured vehicles ready for your next adventure.
          </p>
        </div>

        {/* Use a grid or flex for the cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1440px] mx-auto">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="flex h-full">
               <CarResultCard vehicle={vehicle} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableVehiclesSection;
