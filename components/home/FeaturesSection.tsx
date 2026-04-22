import React from "react";
import {
  LuCalendar,
  LuHeadphones,
  LuTag,
  LuThumbsUp,
  LuX,
} from "react-icons/lu";

const FeaturesSection: React.FC = () => {
  const whyBookLinks = [
    { icon: <LuX className='text-[#FF7815]' />, text: "No Sneaky Fees" },
    {
      icon: <LuHeadphones className='text-[#FF7A21]' />,
      text: "Help When You Need It (24/7)",
    },
    {
      icon: <LuCalendar className='text-[#FF7815]' />,
      text: "Plans Change? No Worries!",
    },
    {
      icon: <LuThumbsUp className='text-[#FF7815]' />,
      text: "Solid Cars, Safe Drivers",
    },
  ];

  return (
    <section className='py-16 px-6 bg-white'>
      <div className='max-w-[1440px] mx-auto'>
        {/* Section Heading */}
        <h2 className='text-[28px] md:text-[32px] font-bold text-[#111827] mb-10'>
          Great Cars, Fair Prices. You Drive Happy!
        </h2>

        {/* Grid Container */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Card 1: Find Your Perfect Wheels */}
          <div className='border-[2px] border-[#FF7815] rounded-[12px] p-8 flex flex-col h-full'>
            <h3 className='text-[20px] font-bold text-[#111827] mb-6'>
              Find Your Perfect Wheels
            </h3>
            <p className='text-[#6B7280] text-[15px] leading-[1.6]'>
              Heading out on a Kenyan adventure and need a sturdy 4x4? Zipping
              around the city and want something comfy and cool? Got the whole
              family or a group and need a spacious van or bus? Whatever your
              trip looks like, we&apos;ve got the right ride for you. From solo
              business trips to big group tours, finding your ideal car with us
              is quick, simple, and totally stress-free. Just tell us what you
              need, and we&apos;ll point you in the right direction!
            </p>
          </div>

          {/* Card 2: Why Book With Unicorn? */}
          <div className='border-[2px] border-[#FF7815] rounded-[12px] p-8 flex flex-col h-full'>
            <h3 className='text-[20px] font-bold text-[#111827] mb-8'>
              Why Book With Unicorn?
            </h3>
            <ul className='space-y-6'>
              {whyBookLinks.map((item, index) => (
                <li key={index} className='flex items-center space-x-4'>
                  <div className='w-10 h-10 rounded-full bg-[#FFE3CE] flex items-center justify-center shrink-0'>
                    {item.icon}
                  </div>
                  <span className='text-[#6B7280] text-[16px] font-medium'>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: How Are Our Prices So Good? */}
          <div className='border-[2px] border-[#FF7815] rounded-[12px] p-8 flex flex-col h-full'>
            {/* Price Tag Icon */}
            <div className='w-14 h-14 bg-[#FF7A21] rounded-full flex items-center justify-center mb-6'>
              <LuTag className='text-white text-2xl rotate-90' />
            </div>
            <h3 className='text-[20px] font-bold text-[#111827] mb-6'>
              How Are Our Prices So Good?
            </h3>
            <p className='text-[#6B7280] text-[15px] leading-[1.6]'>
              It&apos;s pretty simple: we are the car guys! We own our vehicles
              and manage everything ourselves. That means no extra layers or
              middleman costs. Just good, straight-up value for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
