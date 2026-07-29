"use client";
import React, { useRef } from "react";

// Map display name → backend VehicleCategory enum value
const CATEGORIES: { id: string; name: string; backendValue: string; image: string }[] = [
  { id: "1", name: "Passenger Van", backendValue: "VAN", image: "/product/car.png" },
  { id: "2", name: "SUV", backendValue: "SUV", image: "/product/car.png" },
  { id: "3", name: "Sedan / Saloon", backendValue: "SALOON", image: "/product/car.png" },
  { id: "4", name: "Luxury", backendValue: "LUXURY", image: "/product/car.png" },
  { id: "5", name: "4WD", backendValue: "FOUR_WD", image: "/product/car.png" },
  { id: "6", name: "Chauffeur Driven", backendValue: "CHAUFFEUR_DRIVEN", image: "/product/car.png" },
];

interface CategorySliderProps {
  activeCategory: string;
  onCategorySelect: (backendValue: string) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({
  activeCategory,
  onCategorySelect,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [thumbWidthPercent, setThumbWidthPercent] = React.useState(33.33);

  const updateScrollState = React.useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      const progress = maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * 100 : 0;
      const width = scrollWidth > 0 ? (clientWidth / scrollWidth) * 100 : 33.33;

      setScrollProgress(progress);
      setThumbWidthPercent(Math.min(Math.max(width, 10), 100)); // clamp between 10% and 100%
    }
  }, []);

  React.useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

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
    <div className="w-full select-none">
      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex gap-[18px] overflow-x-auto no-scrollbar scroll-smooth pb-4"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.backendValue;
          return (
            <button
              key={cat.id}
              onClick={() => onCategorySelect(cat.backendValue)}
              className={`min-w-[190px] h-[220px] border rounded-[6px] flex flex-col items-center justify-between p-6 transition-colors cursor-pointer group shadow-sm focus:outline-none ${
                isActive
                  ? "bg-[#43a047] border-[#43a047]"
                  : "bg-white border-[#E5E5E5] hover:border-[#43a047]"
              }`}
            >
              <span
                className={`font-bold text-[15px] text-center leading-tight ${
                  isActive ? "text-white" : "text-[#1A1A1A]"
                }`}
              >
                {cat.name}
              </span>
              <div className="w-full flex items-center justify-center flex-1 mt-2">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-w-full max-h-[100px] object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation and Custom Scrollbar Bar */}
      <div className="flex items-center gap-4 mt-2 px-1">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="text-[#000000] hover:scale-110 transition-transform"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        {/* Custom Progress Bar */}
        <div className="flex-1 h-[4px] bg-[#E5E5E5] rounded-full relative overflow-hidden">
          <div
            className="absolute top-0 h-full bg-[#1A1A1A] rounded-full transition-all duration-150"
            style={{
              width: `${thumbWidthPercent}%`,
              left: `${(scrollProgress / 100) * (100 - thumbWidthPercent)}%`,
            }}
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="text-[#000000] hover:scale-110 transition-transform"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
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
