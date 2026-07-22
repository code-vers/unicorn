"use client";
import {
  Briefcase,
  Car,
  Check,
  DoorOpen,
  Settings2,
  Snowflake,
  Users,
} from "lucide-react";
import React from "react";
import { VehicleResponse, VehicleService } from '../../lib/api/vehicle.service';

/**
 * Brand Colors & Constants
 */
const COLORS = {
  green: "#43a047",
  orange: "#ff8f00",
  textDark: "#333333",
  textGray: "#666666",
  bgLight: "#F9F9F9",
  border: "#E5E5E5",
};

interface CarData {
  id: number;
  name: string;
  price: string;
  image: string;
}

const CarResultCard: React.FC<{ car: CarData }> = ({ car }) => {
  return (
    <div className='w-full bg-[#FDFDFD] border border-[#E5E5E5] rounded-[12px] flex flex-col md:flex-row overflow-hidden mb-5 shadow-sm'>
      {/* LEFT & CENTER CONTENT SECTION */}
      <div className='flex-[3] p-5 lg:p-7 flex flex-col'>
        {/* 1. Header Area: Title & "or similar" */}
        <div className='flex items-baseline gap-2 mb-4'>
          <h2 className='text-[#43a047] text-[20px] lg:text-[24px] font-bold tracking-tight'>
            {car.name}
          </h2>
          <span className='text-[#666666] text-[14px] font-normal'>
            or similar
          </span>
        </div>

        {/* 2. Specs Bar: Responsive grid/flex */}
        <div className='flex flex-wrap items-center gap-x-6 gap-y-3 mb-6 border-b border-[#F0F0F0] pb-5'>
          <SpecItem icon={<Settings2 size={16} />} label='Automatic' />
          <SpecItem icon={<Users size={16} />} label='4 Seats' />
          <SpecItem icon={<Briefcase size={16} />} label='1 bag' />
          <SpecItem
            icon={<Snowflake size={16} />}
            label='Air Conditioning A/C'
          />
          <SpecItem icon={<DoorOpen size={16} />} label='doors 5' />
        </div>

        {/* 3. Visuals & Features Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 items-center'>
          {/* Car Image */}
          <div className='flex justify-center items-center'>
            <img
              src={car.image}
              alt={car.name}
              className='w-full max-w-[260px] h-auto object-contain transition-transform duration-500 hover:scale-105'
            />
          </div>

          {/* Features Column */}
          <div className='flex flex-col gap-3'>
            <FeatureItem
              icon={<Car size={10} strokeWidth={3} />}
              text='Meet and greet service'
              isOrange
            />
            <FeatureItem
              icon={<Car size={10} strokeWidth={3} />}
              text='Instant Confirmation!'
              isOrange
            />
            <FeatureItem
              icon={<Check size={12} strokeWidth={3} />}
              text='Instant Confirmation!'
            />
            <FeatureItem
              icon={<Check size={12} strokeWidth={3} />}
              text='Full Prepayment'
            />
            <FeatureItem
              icon={<Check size={12} strokeWidth={3} />}
              text='Unlimited Mileage'
            />
          </div>
        </div>
      </div>

      {/* RIGHT PRICING SIDEBAR: Stacks on mobile, Sidebar on Desktop */}
      <div className='flex-1 bg-white md:bg-transparent border-t md:border-t-0 md:border-l border-[#E5E5E5] flex flex-col items-center justify-center p-6 lg:p-8 min-w-[200px]'>
        <div className='mb-5'>
          <p className='text-[#ff8f00] text-[22px] lg:text-[26px] font-extrabold'>
            KSH {car.price}
          </p>
        </div>

        <button className='w-full bg-[#3FA34D] text-white py-3 px-6 rounded-[8px] font-bold text-[15px] transition-all hover:bg-[#3d9140] active:scale-95 shadow-sm'>
          View Details
        </button>
      </div>
    </div>
  );
};

/**
 * SPEC ITEM: The horizontal icons under the title
 */
const SpecItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className='flex items-center gap-2 text-[#444444]'>
    <span className='text-[#666666]'>{icon}</span>
    <span className='text-[13px] font-medium leading-none'>{label}</span>
  </div>
);

/**
 * FEATURE ITEM: The list with circles/icons
 */
const FeatureItem = ({
  icon,
  text,
  isOrange,
}: {
  icon: React.ReactNode;
  text: string;
  isOrange?: boolean;
}) => (
  <div className='flex items-center gap-3'>
    <div
      className={`flex-shrink-0 w-5 h-5 rounded-full border ${
        isOrange
          ? "border-[#ff8f00] text-[#ff8f00]"
          : "border-[#43a047] text-[#43a047]"
      } flex items-center justify-center`}>
      {icon}
    </div>
    <span className='text-[#333333] text-[13.5px] font-medium tracking-tight'>
      {text}
    </span>
  </div>
);

/**
 * MAIN LIST VIEW
 */
export const CarResultsList: React.FC = () => {
  const [vehicles, setVehicles] = React.useState<VehicleResponse[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await VehicleService.getVehicles();
        setVehicles(response.data);
      } catch (error) {
        console.error('Failed to fetch vehicles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Loading vehicles...</div>;
  }

  if (vehicles.length === 0) {
    return <div className="text-center py-10">No vehicles available at the moment.</div>;
  }

  return (
    <div className='w-full max-w-[1000px] mx-auto px-4 py-6'>
      {vehicles.map((vehicle) => {
        const imageUrl = vehicle.images && vehicle.images.length > 0 
          ? `http://localhost:5000${vehicle.images[0].path}` 
          : '/product/car.png';

        const carData = {
          id: vehicle.id,
          name: vehicle.name,
          price: vehicle.pricing?.dailyRate?.toString() || '0',
          image: imageUrl
        };

        return <CarResultCard key={vehicle.id} car={carData as any} />;
      })}
    </div>
  );
};

export default CarResultsList;

