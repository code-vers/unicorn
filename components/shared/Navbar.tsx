"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LuMenu, LuUserRoundPlus, LuX, LuUser } from "react-icons/lu";
import { useAuth } from "@/contexts/AuthContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

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

        {/* Desktop Auth Section */}
        <div className='hidden md:block relative'>
          {user ? (
            <div>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='flex items-center space-x-2 text-[#0A1413] hover:text-[#3FA34D] transition focus:outline-none'
              >
                <LuUser className='h-9 w-9 text-[#3FA34D]' />
                <span className='font-medium text-[15px]'>{user.name}</span>
              </button>
              
              {/* Dropdown */}
              {isDropdownOpen && (
                <div className='absolute right-0 mt-3 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50 overflow-hidden'>
                  <Link
                    href='/dashboard'
                    onClick={() => setIsDropdownOpen(false)}
                    className='block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition'
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                    }}
                    className='block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition'
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className='bg-[#3FA34D] text-white w-[120px] h-[48px] flex justify-center items-center rounded-full hover:bg-green-700 transition'>
                <LuUserRoundPlus className='h-5 w-5 mr-2' />
                Login
              </button>
            </Link>
          )}
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
            
            {/* Mobile Auth Section */}
            {user ? (
              <div className='flex flex-col space-y-4 pt-2'>
                <div className='flex items-center space-x-3 px-2'>
                  <LuUser className='h-10 w-10 text-[#3FA34D]' />
                  <div>
                    <p className='text-[#0A1413] font-semibold'>{user.name}</p>
                    <p className='text-xs text-gray-500'>{user.email}</p>
                  </div>
                </div>
                <div className='flex flex-col space-y-1 mt-2'>
                  <Link
                    href='/dashboard'
                    onClick={() => setIsOpen(false)}
                    className='block px-2 py-2 text-[16px] text-gray-700 font-medium hover:text-[#3FA34D] transition'
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                    className='block w-full text-left px-2 py-2 text-[16px] text-red-600 font-medium hover:text-red-700 transition'
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <button className='bg-[#3FA34D] text-white w-full h-[48px] flex justify-center items-center rounded-full hover:bg-green-700 transition'>
                  <LuUserRoundPlus className='h-5 w-5 mr-2' />
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Navbar;
