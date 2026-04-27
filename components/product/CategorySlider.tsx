import React, { useRef } from "react";

interface Category {
  id: string;
  name: string;
  image: string;
}

const categories: Category[] = [
  { id: "1", name: "Passenger Van", image: "/product/car.png" },
  { id: "2", name: "SUV", image: "/product/car.png" },
  { id: "3", name: "Sedan", image: "/product/car.png" },
  { id: "4", name: "Wagon/Estate", image: "/product/car.png" },
  { id: "5", name: "Luxury", image: "/product/car.png" },
];

const CategorySlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className='w-full select-none'>
      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className='flex gap-[18px] overflow-x-auto no-scrollbar scroll-smooth pb-4'>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className='min-w-[190px] h-[220px] bg-white border border-[#E5E5E5] rounded-[6px] flex flex-col items-center justify-between p-6 hover:border-[#43a047] transition-colors cursor-pointer group shadow-sm'>
            <span className='text-[#1A1A1A] font-bold text-[15px] text-center leading-tight'>
              {cat.name}
            </span>
            <div className='w-full flex items-center justify-center flex-1 mt-2'>
              <img
                src={cat.image}
                alt={cat.name}
                className='max-w-full max-h-[100px] object-contain group-hover:scale-105 transition-transform duration-300'
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation and Custom Scrollbar Bar */}
      <div className='flex items-center gap-4 mt-2 px-1'>
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className='text-[#000000] hover:scale-110 transition-transform'>
          <svg width='12' height='12' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' />
          </svg>
        </button>

        {/* Custom Progress Bar */}
        <div className='flex-1 h-[4px] bg-[#E5E5E5] rounded-full relative overflow-hidden'>
          {/* Black indicator matching image_00a560.png */}
          <div className='absolute left-0 top-0 h-full w-1/3 bg-[#1A1A1A] rounded-full transition-all duration-300'></div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className='text-[#000000] hover:scale-110 transition-transform'>
          <svg width='12' height='12' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />
          </svg>
        </button>
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

export default CategorySlider;
