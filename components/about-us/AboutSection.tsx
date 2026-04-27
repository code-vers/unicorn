import { FaQuoteLeft } from "react-icons/fa";

/**
 * AboutSection Component
 * * Key Features:
 * - Rounded image container with specific aspect ratio.
 * - Multi-layered typography (Header, Body, Quote).
 * - Custom Orange Quote Icon styling (#ff8f00 / #fff5e6).
 * - Responsive padding and max-widths to maintain "image-like" alignment.
 */
const AboutSection = () => {
  return (
    <div className=' mx-auto bg-white'>
      <section className=' py-12 max-w-[1440px] mx-auto font-sans flex flex-col items-center text-center'>
        {/* Top Hero Image */}
        <div className='w-full mb-16 overflow-hidden rounded-[2.5rem] shadow-sm'>
          <img
            src='/About-Us/about.png'
            alt='Aerial view of Kenya intersection'
            className='w-full h-[591px] object-cover'
          />
        </div>

        {/* Main Headline */}
        <h2 className='text-2xl md:text-[40px] font-extrabold text-gray-900 leading-snug mb-8 '>
          Hello from Unicorn Rent A Car! We're passionate about making your
          Kenyan travels truly memorable, easy, and reliable.
        </h2>

        {/* Body Description */}
        <div className='max-w-6xl mb-12'>
          <p className='text-[#0A1413] text-xs md:text-[16px] leading-relaxed px-4'>
            Hi, we're Unicorn. We're making your Kenyan journeys smooth and
            reliable for everyone. Unicorn Rent A Car Ltd is a leading car
            rental and leasing company in Kenya, whose mission is to provide
            accessible, high-quality vehicles and dependable service for all
            your travel needs. We started Unicorn right here in Nairobi because
            we wanted to create the kind of car rental experience we'd want for
            ourselves—one that's straightforward, friendly, and always has your
            back, like a trusted travel companion. We believe every traveler,
            whether for business or leisure, deserves access to reliable,
            well-maintained vehicles and a rental process that's easy and
            supportive.
          </p>
        </div>

        {/* Quote Icon */}
        <div className='mb-6 flex justify-center'>
          <div className='bg-[#fff5e6] p-4 rounded-full flex items-center justify-center w-16 h-16'>
            <FaQuoteLeft className='text-orange-400' />
          </div>
        </div>

        {/* Footer Quote */}
        <blockquote className='text-xl md:text-2xl font-bold text-gray-800 leading-normal max-w-2xl italic-not-needed'>
          “We started Unicorn to create a car rental company that feels like a
          reliable friend on your journey.”
        </blockquote>
      </section>
    </div>
  );
};

export default AboutSection;
