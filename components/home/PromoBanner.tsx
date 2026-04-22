import React from "react";

const PromoBanner: React.FC = () => {
  return (
    <section className='w-full'>
      <div
        className='relative w-full h-[200px] md:h-[160px] bg-cover bg-center flex items-center'
        style={{ backgroundImage: "url('/Home/promoImg.png')" }}>
        {/* Dark Overlay - ensures text is readable on all screen sizes */}
        <div className='absolute inset-0 bg-black/50'></div>

        {/* Content Container - Adjusted for full-width alignment */}
        <div className='relative z-10 w-full max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
          {/* Text Content */}
          <div className='flex flex-col'>
            <h2 className='text-white text-xl md:text-2xl lg:text-3xl font-bold tracking-tight'>
              Kenya's Best Season Calling! Explorer Deals!
            </h2>
            <p className='text-white/90 text-lg md:text-xl font-medium mt-2'>
              Book Your Unicorn Ride Now & Save
            </p>
          </div>

          {/* Button */}
          <button className='bg-[#3FA34D] cursor-pointer hover:bg-[#4ca64f] text-white font-bold py-3 px-10 rounded-lg transition-all duration-200 text-sm md:text-base whitespace-nowrap shadow-md'>
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
