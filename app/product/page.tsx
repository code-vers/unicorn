"use client";
import CarResultCard from "@/components/product/CarResultCard";
import CategorySlider from "@/components/product/CategorySlider";
import Sidebar from "@/components/product/Sidebar";
import { Menu } from "lucide-react";
import React, { useState } from "react";

const Page: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='bg-[#F5F5F5] min-h-screen'>
      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black/40 z-[60] lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Responsive Container */}
      <div className='mx-auto max-w-[1440px] w-full flex flex-col lg:flex-row pt-4 lg:pt-[32px] px-4 md:px-8 gap-6 lg:gap-10'>
        {/* Sidebar: Mobile Hidden / Desktop Sticky */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-[70] w-[320px] transition-transform duration-300
          lg:translate-x-0 lg:sticky lg:top-[32px] lg:w-[340px] lg:z-0
          ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
          h-screen lg:h-[calc(100vh-64px)] overflow-y-auto no-scrollbar
        `}>
          <Sidebar />
        </aside>

        {/* Content Area */}
        <main className='flex-1 pb-20'>
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className='lg:hidden mb-4 w-full bg-white p-3 rounded-lg border border-gray-200 text-[#43a047] font-bold flex items-center justify-center gap-2 shadow-sm'>
            <Menu size={20} /> View Filters
          </button>

          <div className='max-w-[1000px] w-full'>
            {/* 1. Category Slider */}
            <div className='mb-8'>
              <CategorySlider />
            </div>

            {/* 2. Car Result Cards List */}
            <div className='flex flex-col gap-6'>
              {[1, 2, 3, 4, 5].map((_, i) => (
                <CarResultCard key={i} />
              ))}
            </div>
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

export default Page;
