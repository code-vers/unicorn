import React from "react";

const RequirementsSection: React.FC = () => {
  const requirements = [
    {
      title: "Driver's Licence",
      description:
        "You'll definitely need your valid driver's licence, and it should be in the name of whoever is down as the main driver. Make sure it hasn't expired! If your licence isn't in English, an International Driving Permit (IDP) alongside your original licence is usually a good idea, especially for visitors to Kenya.",
    },
    {
      title: "Identification",
      description:
        "Yep, you'll need some official photo ID. For visitors from outside Kenya, your passport is perfect. If you're a Kenyan resident, your National ID card will do the trick. Basically, something official that matches the name on your booking and licence.",
    },
    {
      title: "Credit Card",
      description:
        "A credit card in the main driver's name is usually needed for the security deposit. This is pretty standard. If you're wondering about using a debit card or if you don't have a credit card, it's best to give us a quick call or drop us an email beforehand so we can let you know the options with Unicorn.",
    },
    {
      title: "Booking Confirmation",
      description:
        "To confirm your booking, bring a valid photo ID that matches your booking name and licence. Also, have your booking confirmation or voucher (digital or printed) ready if you booked online or prepaid for a quick check-in.",
    },
  ];

  return (
    <div className='w-full bg-white py-16'>
      <section className='max-w-[1440px] mx-auto px-4 md:px-0'>
        {/* Main Heading */}
        <h2 className='text-[28px] md:text-[32px] font-bold text-[#111827] mb-10 text-left'>
          Ready to Grab Your Keys? Here&apos;s What to Bring
        </h2>

        {/* Requirements Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {requirements.map((item, index) => (
            <div
              key={index}
              className='bg-[#F3F4F6] rounded-[20px] p-8 flex flex-col h-full'>
              <h3 className='text-[22px] font-bold text-[#111827] mb-6 leading-tight'>
                {item.title}
              </h3>
              <p className='text-[#4B5563] text-[15px] leading-[1.6] font-medium'>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RequirementsSection;
