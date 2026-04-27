import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const ContactUs: React.FC = () => {
  return (
    <div className='w-full bg-white font-sans'>
      {/* --- HERO SECTION WITH OVERLAY CARDS --- */}
      <div
        className='relative h-[400px] w-full bg-cover bg-center'
        style={{
          backgroundImage: "url('/contact/road.png')",
        }}>
        <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
          <h1 className='text-white text-[48px] font-bold'>Contact Us</h1>
        </div>

        {/* --- FLOATING INFO CARDS --- */}
        <div className='hidden md:flex'>
          <div className='absolute -bottom-24 bg-white pt-16 rounded-2xl left-1/2 -translate-x-1/2 w-full max-w-[1440px] px-8 md:px-12'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              <InfoCard
                icon={<MapPin className='text-white' size={32} />}
                title='Head Office'
                lines={["66 Muthithi Road, Westlands00100", "Nairobi, Kenya"]}
              />
              <InfoCard
                icon={<Phone className='text-white' size={32} />}
                title='Phone'
                lines={["+254717600100", "+254737444555"]}
              />
              <InfoCard
                icon={<Mail className='text-white' size={32} />}
                title='Email'
                lines={[
                  "reservations@unicornrentacar.net",
                  "reservations@unicornrentacar.co.ke",
                ]}
              />
              <InfoCard
                icon={<Clock className='text-white' size={32} />}
                title='Timings'
                lines={["Mon-Fri: 8:00 AM - 5:00 PM", "Sat: 8:00 AM - 1:00 PM"]}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Responisive*/}

      <div className='md:hidden px-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          <InfoCard
            icon={<MapPin className='text-white' size={32} />}
            title='Head Office'
            lines={["66 Muthithi Road, Westlands00100", "Nairobi, Kenya"]}
          />
          <InfoCard
            icon={<Phone className='text-white' size={32} />}
            title='Phone'
            lines={["+254717600100", "+254737444555"]}
          />
          <InfoCard
            icon={<Mail className='text-white' size={32} />}
            title='Email'
            lines={[
              "reservations@unicornrentacar.net",
              "reservations@unicornrentacar.co.ke",
            ]}
          />
          <InfoCard
            icon={<Clock className='text-white' size={32} />}
            title='Timings'
            lines={["Mon-Fri: 8:00 AM - 5:00 PM", "Sat: 8:00 AM - 1:00 PM"]}
          />
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className='max-w-[1440px] mx-auto px-8 md:px-12 pt-20 md:pt-40 pb-20'>
        {/* --- REAL GOOGLE MAP INTEGRATION --- */}
        <div className='w-full h-[450px] rounded-[16px] overflow-hidden shadow-sm mb-20 border border-[#F1F5F9]'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.847146522434!2d36.8048622757273!3d-1.2642571356066223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173c3a49339f%3A0x67396a8479e39401!2sMuthithi%20Rd%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd'
            width='100%'
            height='100%'
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'></iframe>
        </div>

        {/* --- CONTACT FORM SECTION --- */}
        <div className='max-w-[1140px]'>
          <div className='mb-10'>
            <h2 className='text-[32px] font-bold text-[#1E293B]'>
              Get in Touch <span className='text-[#43A047]'>With Us</span>
            </h2>
            <p className='text-[#64748B] text-[16px] mt-4 leading-relaxed max-w-[800px]'>
              Have a question or want to discuss your rental needs? Fill out the
              form below, and our team at Unicorn will get back to you as soon
              as possible.
            </p>
          </div>

          <form className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <input
                type='text'
                placeholder='YOUR NAME'
                className='w-full h-[56px] px-6 border border-[#E2E8F0] rounded-[8px] outline-none focus:border-[#43A047] text-[13px] uppercase tracking-wider font-medium text-[#1E293B]'
              />
              <input
                type='text'
                placeholder='YOUR EMAIL'
                className='w-full h-[56px] px-6 border border-[#E2E8F0] rounded-[8px] outline-none focus:border-[#43A047] text-[13px] uppercase tracking-wider font-medium text-[#1E293B]'
              />
              <input
                type='text'
                placeholder='YOUR PHONE NUMBER'
                className='w-full h-[56px] px-6 border border-[#E2E8F0] rounded-[8px] outline-none focus:border-[#43A047] text-[13px] uppercase tracking-wider font-medium text-[#1E293B]'
              />
              <input
                type='text'
                placeholder='SUBJECT'
                className='w-full h-[56px] px-6 border border-[#E2E8F0] rounded-[8px] outline-none focus:border-[#43A047] text-[13px] uppercase tracking-wider font-medium text-[#1E293B]'
              />
            </div>
            <textarea
              placeholder='MESSAGE'
              rows={6}
              className='w-full p-6 border border-[#E2E8F0] rounded-[8px] outline-none focus:border-[#43A047] text-[13px] uppercase tracking-wider font-medium text-[#1E293B] resize-none'></textarea>

            <button
              type='submit'
              className='bg-[#43A047] text-white px-10 py-4 rounded-[8px] font-bold text-[15px] hover:bg-[#388E3C] transition-all shadow-md shadow-green-100'>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

/* --- HELPER COMPONENT FOR INFO CARDS --- */

type InfoCardProps = {
  icon: React.ReactNode;
  title: string;
  lines: string[];
};
const InfoCard = ({ icon, title, lines }: InfoCardProps) => {
  return (
    <div className='relative flex flex-col items-center pt-12 pb-8 px-4 bg-[#f0f5fa] rounded-lg h-full'>
      {/* Orange Icon Circle */}
      <div className='absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#ff7b1d] rounded-full flex items-center justify-center shadow-lg border-4 border-white'>
        {icon}
      </div>

      {/* Content */}
      <div className='text-center mt-2'>
        <h3 className='text-xl font-bold text-[#1a1a1a] mb-4'>{title}</h3>
        <div className='space-y-1'>
          {lines.map((line, index) => (
            <p
              key={index}
              className='text-gray-500 text-sm font-medium leading-relaxed'>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
