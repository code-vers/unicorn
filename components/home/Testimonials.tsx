"use client";

import React, { useRef, useState } from "react";
import {
  HiCheckCircle,
  HiChevronLeft,
  HiChevronRight,
  HiStar,
} from "react-icons/hi";

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLeftBtn, setShowLeftBtn] = useState(false);

  const reviews = [
    {
      name: "Felix Ralphson",
      initials: "F",
      bgColor: "bg-[#689F38]",
      date: "4 days ago on",
      text: "Friendly stuff, car was not very fresh but it was priced accordingly. For 20usd I was...",
    },
    {
      name: "Marcel Dekker",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "7 days ago on",
      text: "Had a great experience renting a car here. It may not have been the newest car, but the...",
    },
    {
      name: "Patrick",
      initials: "P",
      bgColor: "bg-[#7B1FA2]",
      date: "1 month ago on",
      text: "Nice company with very good price. Handover takes some time, but there are no troubles...",
    },
    {
      name: "Ferdi R",
      initials: "F",
      bgColor: "bg-[#5C6BC0]",
      date: "1 month ago on",
      text: "Everything was perfect, car was in good condition and the pick-up and drop-off was...",
    },
    {
      name: "Sarah K.",
      initials: "S",
      bgColor: "bg-orange-500",
      date: "2 months ago on",
      text: "Amazing service! The car was delivered right to my hotel and the process was seamless.",
    },
    {
      name: "John Doe",
      initials: "J",
      bgColor: "bg-blue-500",
      date: "3 months ago on",
      text: "Great prices and very reliable vehicles. Will definitely use Unicorn again for my next trip.",
    },
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;

      // Update Left Button visibility
      setShowLeftBtn(scrollLeft > 10);

      // Update Active Dot
      const cardWidth =
        scrollRef.current.querySelector("div")?.clientWidth || clientWidth;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth =
        scrollRef.current.querySelector("div")?.clientWidth || 300;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth =
        scrollRef.current.querySelector("div")?.clientWidth || 0;
      scrollRef.current.scrollTo({
        left: index * (cardWidth + 16),
        behavior: "smooth",
      });
    }
  };

  return (
    <div className='w-full bg-white'>
      {" "}
      {/* Full Width Background */}
      <section className='py-16 max-w-[1440px] mx-auto overflow-hidden'>
        {" "}
        {/* Centered Content */}
        <h2 className='text-[28px] font-bold text-[#111827] mb-10'>
          What Our Clients Say About Us
        </h2>
        <div className='relative group'>
          {/* Left Arrow Button */}
          {showLeftBtn && (
            <button
              onClick={() => scroll("left")}
              className='absolute -left-4 top-[45%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 text-gray-600 rounded-full flex items-center justify-center shadow-md transition-all z-20 hover:bg-gray-50'>
              <HiChevronLeft size={24} />
            </button>
          )}

          {/* Slider Container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className='flex space-x-4 overflow-x-auto pb-10 snap-x snap-mandatory no-scrollbar scroll-smooth'>
            {reviews.map((review, index) => (
              <div
                key={index}
                className='min-w-[85%] md:min-w-[calc(25%-12px)] bg-white border border-gray-200 rounded-xl p-6 shadow-sm snap-start flex flex-col justify-between h-[280px]'>
                <div>
                  <div className='flex items-center space-x-3 mb-2'>
                    {review.img ? (
                      <img
                        src={review.img}
                        className='w-10 h-10 rounded-full object-cover'
                        alt=''
                      />
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-full ${review.bgColor} flex items-center justify-center text-white font-bold`}>
                        {review.initials}
                      </div>
                    )}
                    <div className='flex items-center space-x-1'>
                      <span className='font-bold text-[15px] text-gray-900'>
                        {review.name}
                      </span>
                      <HiCheckCircle className='text-[#1C64F2] w-5 h-5' />
                    </div>
                  </div>

                  <div className='flex items-center space-x-1 text-[12px] text-gray-500 mb-4'>
                    <span>{review.date}</span>
                    <span className='font-bold flex'>
                      <span className='text-[#4285F4]'>G</span>
                      <span className='text-[#EA4335]'>o</span>
                      <span className='text-[#FBBC05]'>o</span>
                      <span className='text-[#4285F4]'>g</span>
                      <span className='text-[#34A853]'>l</span>
                      <span className='text-[#EA4335]'>e</span>
                    </span>
                  </div>

                  <div className='flex space-x-0.5 mb-3'>
                    {[...Array(5)].map((_, i) => (
                      <HiStar key={i} className='text-[#FFB400] w-5 h-5' />
                    ))}
                  </div>

                  <p className='text-[14px] text-gray-700 leading-relaxed line-clamp-4'>
                    {review.text}
                  </p>
                </div>

                <button className='text-[#1C64F2] text-[14px] font-medium hover:underline text-left mt-2'>
                  Read more
                </button>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            className='absolute -right-4 top-[45%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 text-gray-600 rounded-full flex items-center justify-center shadow-md transition-all z-20 hover:bg-gray-50'>
            <HiChevronRight size={24} />
          </button>

          {/* Pagination Dots */}
          <div className='flex justify-center items-center mt-6 space-x-1.5'>
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === i
                    ? "w-2.5 h-2.5 bg-black"
                    : "w-1.5 h-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      <style jsx>{`
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

export default Testimonials;
