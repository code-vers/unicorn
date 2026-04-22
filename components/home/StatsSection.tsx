import React from "react";
import { LuCar, LuGlobe, LuHeadphones, LuHotel } from "react-icons/lu";

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: <LuGlobe className='w-12 h-12 md:w-16 md:h-16' />,
      number: "10+",
      label: "Easy Pick - Up Spots",
    },
    {
      icon: <LuHotel className='w-12 h-12 md:w-16 md:h-16' />,
      number: "15+",
      label: "Vehicles",
    },
    {
      icon: <LuCar className='w-12 h-12 md:w-16 md:h-16' />,
      number: "6+",
      label: "Vehicles averaging years old",
    },
    {
      icon: <LuHeadphones className='w-12 h-12 md:w-16 md:h-16' />,
      number: "24/7",
      label: "Customer Support",
    },
  ];

  return (
    <section className='w-full bg-[#48A04D] py-12 md:py-16'>
      <div className='max-w-[1440px] mx-auto px-6 md:px-12'>
        {/* Section Title */}
        <h2 className='text-white text-xl md:text-[28px] font-bold mb-10 md:mb-14'>
          Find your car in one of our
        </h2>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4'>
          {stats.map((stat, index) => (
            <div key={index} className='flex items-center space-x-4 text-white'>
              {/* Icon Container */}
              <div className='shrink-0 opacity-90'>{stat.icon}</div>

              {/* Text Container */}
              <div className='flex flex-col'>
                <span className='text-3xl md:text-5xl font-bold leading-none mb-1'>
                  {stat.number}
                </span>
                <span className='text-[14px] md:text-[16px] font-medium leading-tight opacity-90 max-w-[150px]'>
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
