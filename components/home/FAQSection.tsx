import React from "react";

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "What documents do I need to pick up the car?",
      answer: "You will need a valid driving license (held for at least 3 years), a Passport or National ID, a credit card in the driver's name, and your booking voucher. An International Driving Permit (IDP) is required if your license is not in English. Please note, we do not accept digital/e-licenses."
    },
    {
      question: "What is your fuel and mileage policy?",
      answer: "We offer unlimited mileage on our rentals! For fuel, we operate on a 'Same-to-Same' policy—simply return the car with the exact same amount of fuel it had at pick-up to avoid a $25 refuelling service charge."
    },
    {
      question: "Are there any age restrictions for renting a car?",
      answer: "Yes, the minimum age to rent a car with us is 25 years, and the maximum age is 80 years. Drivers must also have a minimum of 3 years of driving experience."
    },
    {
      question: "How does airport pick-up work?",
      answer: "We provide a hassle-free 'Meet and Greet' service. Our agent will be waiting for you at the arrivals terminal (after baggage claim) holding a sign with your name on it."
    },
    {
      question: "Do you allow additional drivers?",
      answer: "Yes, you can add up to 2 additional drivers! The first additional driver is completely free. A second additional driver can be added for just $15 per day."
    },
    {
      question: "Can I drive the car across the border?",
      answer: "Yes, cross-border travel is permitted to Tanzania and Uganda for a one-time fee of $350. We require at least 2 working days' advance notice to arrange the necessary paperwork."
    },
    {
      question: "What happens if I return the car late?",
      answer: "We offer a generous 2-hour grace period for returns. If the vehicle is dropped off later than the grace period, an extra day's rental charge will apply."
    },
    {
      question: "Are pets or smoking allowed in the vehicles?",
      answer: "To ensure our cars stay fresh and clean for all customers, we have a strict no-smoking and no-pets policy. A cleaning fee of $50 applies for smoking, and $100 for pets."
    }
  ];

  return (
    <div className='w-full bg-white py-16 md:py-24'>
      <section className='max-w-[1440px] mx-auto px-6 md:px-0'>
        {/* Section Header */}
        <h2 className='text-[32px] font-bold text-[#111827] mb-12'>FAQ</h2>

        {/* FAQ Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12'>
          {faqs.map((faq, index) => (
            <div key={index} className='flex flex-col'>
              <h3 className='text-[18px] md:text-[20px] font-bold text-[#111827] mb-4 leading-tight'>
                {faq.question}
              </h3>
              <p className='text-[#4B5563] text-[15px] md:text-[16px] leading-[1.6] font-normal'>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQSection;
