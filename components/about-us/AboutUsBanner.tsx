/**
 * AboutBanner Component
 * * Features:
 * - Responsive typography using custom tracking and leading.
 * - Flexbox grid for the statistical bottom row.
 * - Accurate color matching for the "Unicorn" green (#43a047).
 */
const AboutBanner = () => {
  return (
    <section className='bg-white py-16 px-4 mx-auto text-center'>
      {/* Main Heading */}
      <h1 className='text-4xl md:text-[80px] font-bold text-[#3FA34D] leading-tight mb-10'>
        Your Trusted Partner <br />
        in Transportation <br />
        Across Kenya.
      </h1>

      {/* Description Paragraph */}
      <div className='max-w-5xl mx-auto mb-16'>
        <p className='text-[#0A1413] text-[20px]  leading-relaxed'>
          We have a growing fleet of vehicles amounting to 100 & comprising
          SUVs, saloons, buses and vans. The fleets are driven by our
          experienced chauffeurs who know their country well enough to deliver
          the vehicles and drive you safely. UNICORN RENT A CAR serves
          corporates, NGOs, embassies, hospitality establishments and businesses
          that require leases and long-term vehicle rentals. At UNICORN, we want
          our customers to have the best and experience the best. That's why we
          strive to make our customers happy.
        </p>
      </div>

      {/* Stats Section */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-center'>
        {/* Vehicles */}
        <div className='flex flex-col'>
          <span className='text-5xl font-bold text-black mb-2'>100+</span>
          <span className='text-lg font-bold text-black tracking-wide'>
            Reliable Vehicles
          </span>
        </div>

        {/* Locations */}
        <div className='flex flex-col'>
          <span className='text-5xl font-bold text-black mb-2'>10</span>
          <span className='text-lg font-bold text-black  tracking-wide'>
            Key Pick-Up Locations
          </span>
        </div>

        {/* Support */}
        <div className='flex flex-col'>
          <span className='text-5xl font-bold text-black mb-2'>24/7</span>
          <span className='text-lg font-bold text-black  tracking-wide'>
            Customer Support
          </span>
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;
