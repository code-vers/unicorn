/**
 * MissionVisionSection Component
 * * Features:
 * - Exact brand green (#43a047) for icon backgrounds.
 * - Flexbox grid for perfect symmetry.
 * - Centered layout with constrained paragraph widths for readability.
 * - Inline SVGs to ensure icons match the design exactly without external assets.
 */
const MissionVisionSection = () => {
  return (
    <section className='bg-white py-16 px-6 md:px-12 font-sans'>
      <div className='max-w-[1440px] mx-auto text-center'>
        {/* Main Section Heading */}
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-16'>
          Who We Are and What We Stand For
        </h2>

        {/* Content Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24'>
          {/* Our Mission */}
          <div className='flex flex-col items-center'>
            {/* Icon Container */}
            <div className='w-40 h-40 bg-[#43a047] rounded-full flex items-center justify-center mb-8 shadow-sm'>
              <svg
                className='w-20 h-20 text-white'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z' />
                <path d='m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z' />
                <path d='M9 12H4s.55-3.03 2-4.5c1.45-1.47 5-2.5 5-2.5' />
                <path d='M12 15v5s3.03-.55 4.5-2c1.47-1.45 2.5-5 2.5-5' />
              </svg>
            </div>
            <h3 className='text-2xl font-bold text-gray-900 mb-6'>
              Our Mission
            </h3>
            <p className='text-gray-700 text-sm md:text-[15px] leading-relaxed text-center'>
              To provide accessible, reliable, and high-quality vehicle rental
              and leasing solutions in Kenya, ensuring every customer
              experiences a seamless, supportive, and satisfying journey. We are
              dedicated to maintaining a modern fleet, offering exceptional
              customer service, and building lasting relationships with our
              individual, corporate, and organisational clients through
              professionalism and trust.
            </p>
          </div>

          {/* Our Vision */}
          <div className='flex flex-col items-center'>
            {/* Icon Container */}
            <div className='w-40 h-40 bg-[#43a047] rounded-full flex items-center justify-center mb-8 shadow-sm'>
              <svg
                className='w-20 h-20 text-white'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <circle cx='12' cy='12' r='10' />
                <circle cx='12' cy='12' r='6' />
                <circle cx='12' cy='12' r='2' />
                <path d='M12 2v4' />
                <path d='M12 18v4' />
                <path d='M2 12h4' />
                <path d='M18 12h4' />
                <path d='m17 7-3 3' />
              </svg>
            </div>
            <h3 className='text-2xl font-bold text-gray-900 mb-6'>
              Our Vision
            </h3>
            <p className='text-gray-700 text-sm md:text-[15px] leading-relaxed text-center'>
              To be Kenya's most trusted and preferred car rental and leasing
              partner, recognised for our unwavering commitment to customer
              satisfaction, innovation in service delivery, and a comprehensive
              network that makes exploring and navigating Kenya effortless and
              enjoyable for everyone. We aim to continuously enhance our
              services and expand our reach, setting the standard for excellence
              in the Kenyan transport solutions sector.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
