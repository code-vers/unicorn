import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaRegEnvelope,
  FaTwitter,
} from "react-icons/fa";
import {
  HiChevronRight,
  HiOutlineLocationMarker,
  HiOutlinePhone,
} from "react-icons/hi";

const Footer: React.FC = () => {
  return (
    <footer className='w-full bg-[#111827] text-white pt-16 pb-8'>
      <div className='max-w-[1440px] mx-auto px-6 md:px-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16'>
          {/* About Us Section */}
          <div className='space-y-6'>
            <h3 className='text-[24px] font-bold'>About Us</h3>
            <p className='text-gray-400 text-[15px] leading-relaxed max-w-[340px]'>
              We have a growing fleet of vehicles amounting to 100 & comprising
              SUVs, saloons, buses and vans. The fleets are driven by our
              experienced chauffeurs who know their country well enough to
              deliver the vehicles and drive you safely.
            </p>
            <div className='flex space-x-3'>
              {[FaTwitter, FaFacebookF, FaLinkedinIn].map((Icon, i) => (
                <a
                  key={i}
                  href='#'
                  className='w-10 h-10 bg-gray-500/30 rounded-full flex items-center justify-center hover:bg-gray-500/50 transition-colors'>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className='text-[20px] font-bold mb-6'>Quick Links</h3>
            <ul className='space-y-4'>
              {["Home", "About Us", "Manage Booking", "Contact Us"].map(
                (link) => (
                  <li
                    key={link}
                    className='flex items-center group cursor-pointer text-gray-300 hover:text-white transition-colors'>
                    <HiChevronRight className='mr-2 text-gray-500' />
                    <span className='text-[15px]'>{link}</span>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className='text-[20px] font-bold mb-6'>Legal</h3>
            <ul className='space-y-4'>
              {[
                "Privacy Policy",
                "Cookie Policy",
                "Terms & Conditions",
                "Our Guarantee",
                "Help Page",
              ].map((link) => (
                <li
                  key={link}
                  className='flex items-center group cursor-pointer text-gray-300 hover:text-white transition-colors'>
                  <HiChevronRight className='mr-2 text-gray-500' />
                  <span className='text-[15px]'>{link}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className='text-[20px] font-bold mb-6'>Contact Us</h3>
            <ul className='space-y-5'>
              <li className='flex items-start space-x-4'>
                <HiOutlineLocationMarker className='w-6 h-6 text-gray-400 shrink-0 mt-1' />
                <span className='text-gray-300 text-[15px]'>
                  66 Muthithi Road, Westlands P. O<br />
                  Box 40105 - 00100 Nairobi, Kenya
                </span>
              </li>
              <li className='flex items-center space-x-4'>
                <FaRegEnvelope className='w-5 h-5 text-gray-400 shrink-0' />
                <span className='text-gray-300 text-[15px]'>
                  reservations@unicornrentacar.net
                </span>
              </li>
              <li className='flex items-center space-x-4'>
                <HiOutlinePhone className='w-5 h-5 text-gray-400 shrink-0' />
                <span className='text-gray-300 text-[15px]'>
                  +254 717 600100
                </span>
              </li>
              <li className='flex items-center space-x-4'>
                <HiOutlinePhone className='w-5 h-5 text-gray-400 shrink-0' />
                <span className='text-gray-300 text-[15px]'>
                  +254 737 444555
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-gray-800 pt-8 text-center'>
          <p className='text-gray-500 text-[14px]'>
            Copyright © 2025 Unicorn Rent a Car Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
