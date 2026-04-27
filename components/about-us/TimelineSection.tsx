/**
 * TimelineSection Component
 * * Features:
 * - Exact color matching: Background (#dcfce7 variant) and Orange (#ff8f00).
 * - Vertical line connector using absolute positioning.
 * - Rounded images with precise shadow and aspect ratios.
 * - Responsive grid layout that maintains alignment.
 */
const TimelineSection = () => {
  const steps = [
    {
      id: 1,
      title: "Laying the Foundation & Our First Rentals",
      description:
        "Unicorn Rent A Car began its journey in Nairobi with a clear vision: to offer reliable and friendly car rental services. We started with a modest fleet, focusing on providing excellent customer care and ensuring every client had a smooth ride from day one. Our early days were all about building trust and understanding the needs of our local community.",
      image: "/About-Us/nigga.jpg", // Representative image of driver
      isActive: true,
    },
    {
      id: 2,
      title: "Growing Our Fleet & Expanding Our Reach",
      description:
        "As more people experienced the Unicorn difference, we grew! We carefully expanded our fleet to include a wider variety of vehicles – from economical saloons to spacious SUVs and vans.",
      image: "/About-Us/car.jpg", // Representative image of fleet
      isActive: false,
    },
  ];

  return (
    <section className='bg-[#DAFFDF] py-20 px-6 md:px-0 font-sans overflow-hidden'>
      <div className='max-w-[1440px] mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-20'>
          <h2 className='text-3xl md:text-4xl font-extrabold text-gray-900 mb-4'>
            Unicorn Over The Years
          </h2>
          <p className='text-gray-700 text-sm italic'>
            A brief snapshot of our journey.
          </p>
        </div>

        {/* Timeline Container */}
        <div className='relative'>
          {/* Vertical Line */}
          <div className='absolute left-[34%] md:left-[33.3%] top-0 bottom-0 w-[2px] bg-[#ff8f00] hidden md:block'></div>

          {steps.map((step, index) => (
            <div
              key={step.id}
              className='relative grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 items-center'>
              {/* Left Side: Image */}
              <div className='md:col-span-4 flex justify-center md:justify-end pr-0 md:pr-12'>
                <div className='w-full max-w-[320px] aspect-[4/3] rounded-2xl overflow-hidden shadow-lg'>
                  <img
                    src={step.image}
                    alt={step.title}
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>

              {/* Middle: Circle Indicator */}
              <div className='absolute left-[33.3%] transform -translate-x-1/2 hidden md:flex items-center justify-center z-10'>
                <div
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-bold text-lg
                  ${
                    step.isActive
                      ? "bg-[#ff8f00] border-[#ff8f00] text-white shadow-md"
                      : "bg-white border-gray-300 text-gray-800"
                  }`}>
                  {step.id}
                </div>
              </div>

              {/* Right Side: Text Content */}
              <div className='md:col-span-7 md:pl-16 text-left'>
                <h3 className='text-xl md:text-2xl font-bold text-gray-900 mb-4'>
                  {step.title}
                </h3>
                <p className='text-gray-700 text-sm md:text-base leading-relaxed max-w-2xl'>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
