"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LuMenu, LuUserRoundPlus, LuX } from "react-icons/lu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Manage Bookings", href: "/manage-bookings" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <section className='bg-white sticky top-0 z-50'>
      <nav className='flex items-center justify-between max-w-[1440px] h-[80px] mx-auto px-6'>
        {/* Logo */}
        <div className='flex items-center space-x-2'>
          <img src='/unicorn.png' alt='Logo' className='h-[52px]' />
        </div>

        {/* Desktop Nav Links */}
        <div className='hidden md:flex space-x-8'>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href}>
                <p
                  className={`text-[14px] transition ${
                    isActive
                      ? "text-[#0A1413]"
                      : "text-[#6B7280] hover:text-[#0A1413]"
                  }`}>
                  {link.name}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Desktop Login Button */}
        <div className='hidden md:block'>
          <button className='bg-[#3FA34D] text-white w-[120px] h-[48px] flex justify-center items-center rounded-full hover:bg-green-700 transition'>
            <LuUserRoundPlus className='h-5 w-5 mr-2' />
            Login
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className='md:hidden flex items-center'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-[#0A1413] focus:outline-none'>
            {isOpen ? <LuX size={28} /> : <LuMenu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className='md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg'>
          <div className='flex flex-col p-6 space-y-4'>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}>
                  <p
                    className={`text-[16px] font-medium transition ${
                      isActive
                        ? "text-[#0A1413]"
                        : "text-[#6B7280] hover:text-[#0A1413]"
                    }`}>
                    {link.name}
                  </p>
                </Link>
              );
            })}
            <hr className='border-gray-100' />
            <button className='bg-[#3FA34D] text-white w-full h-[48px] flex justify-center items-center rounded-full hover:bg-green-700 transition'>
              <LuUserRoundPlus className='h-5 w-5 mr-2' />
              Login
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Navbar;
