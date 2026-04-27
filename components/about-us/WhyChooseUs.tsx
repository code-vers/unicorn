/**
 * WhyChooseUs Component
 * Features:
 * - 3-Column Grid for desktop, 1-column for mobile.
 * - Exact brand orange (#ff8f00) for circular icon backgrounds.
 * - Top-aligned icon and text layout.
 * - Precise typography hierarchy following the design's density.
 */
const WhyChooseUs = () => {
  const features = [
    {
      title: "Modern & Reliable Fleet",
      description:
        "Travel with confidence. Our vehicles are regularly serviced and well-maintained (average 6 years old), ensuring your journey is smooth, safe, and comfortable from start to finish. We offer a diverse range of cars to suit your specific needs.",
      icon: (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          className='w-8 h-8 text-white'>
          <path d='M13 2L3 14h9l-1 8 10-12h-9l1-8z' />
        </svg>
      ),
    },
    {
      title: "Experienced Chauffeurs",
      description:
        "Our drivers are more than just professionals; they are your local guides. With extensive knowledge of Kenya's roads and culture, they ensure you arrive safely and on time while providing a friendly, informative experience.",
      icon: (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          className='w-8 h-8 text-white'>
          <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
          <circle cx='12' cy='7' r='4' />
        </svg>
      ),
    },
    {
      title: "24/7 Support",
      description:
        "Round-the-clock assistance for your peace of mind. Whether you need help with a booking, roadside assistance, or general inquiries, our dedicated team is always just a phone call away, day or night.",
      icon: (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          className='w-8 h-8 text-white'>
          <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
        </svg>
      ),
    },
    {
      title: "Flexible Leasing",
      description:
        "We offer tailored leasing options to suit corporate and individual needs. From short-term rentals to multi-year leases, our plans are designed to be as flexible and convenient as possible for our diverse clientele.",
      icon: (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          className='w-8 h-8 text-white'>
          <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
          <line x1='16' y1='2' x2='16' y2='6' />
          <line x1='8' y1='2' x2='8' y2='6' />
          <line x1='3' y1='10' x2='21' y2='10' />
        </svg>
      ),
    },
    {
      title: "Quality Assurance",
      description:
        "Quality is at the heart of everything we do. From the cleanliness of our cars to the professionalism of our staff, we maintain strict standards to ensure every interaction with Unicorn is exceptional.",
      icon: (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          className='w-8 h-8 text-white'>
          <polyline points='20 6 9 17 4 12' />
        </svg>
      ),
    },
    {
      title: "Customer Satisfaction",
      description:
        "Your happiness is our priority. We take pride in the positive feedback from our clients and constantly strive to improve our services based on your experiences and suggestions.",
      icon: (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          className='w-8 h-8 text-white'>
          <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
        </svg>
      ),
    },
  ];

  return (
    <section className='bg-[#F6F6F6] py-20 px-6 md:px-16 font-sans'>
      <div className='max-w-[1440px] mx-auto'>
        {/* Section Heading */}
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-16'>
          Why Choose Us
        </h2>

        {/* Feature Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16'>
          {features.map((feature, index) => (
            <div key={index} className='flex gap-6'>
              {/* Icon Circle */}
              <div className='flex-shrink-0'>
                <div className='w-16 h-16 bg-[#ff8f00] rounded-full flex items-center justify-center shadow-sm'>
                  {feature.icon}
                </div>
              </div>

              {/* Text Content */}
              <div className='flex flex-col'>
                <h3 className='text-xl font-bold text-gray-900 mb-3 leading-tight'>
                  {feature.title}
                </h3>
                <p className='text-[#4b5563] text-sm leading-relaxed max-w-xs'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
