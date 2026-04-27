import React from "react";

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "How old do I need to be to rent a car from Unicorn?",
      answer:
        "Generally, for most of our cars, the main driver needs to be at least 23 years old and have held a valid driver's licence for at least two years. For some of our larger or luxury vehicles, the minimum age might be 25. If you're a younger driver, give us a ring, and we can let you know the best options for you!",
    },
    {
      question: "Can I rent a car from Unicorn without a credit card?",
      answer:
        "For the security deposit, a credit card in the main driver's name is the usual way to go. Some specific locations or car types might require vehicle rental for the agreed period, unlimited mileage (so you can explore freely!) Standard insurance like Collision Damage Waiver and Theft have an option for a cash deposit or debit card, but there could be different conditions. The best thing to do is chat with us directly before you book - we'll explain everything clearly for your situation.",
    },
    {
      question: "What happens if the car breaks down during my rental?",
      answer:
        "Don't worry; we've got your back! All great essentials: free cancellation if your plans change, easy amendments to your booking, theft protection, and a collision damage waiver for peace of mind. Oh, and unlimited mileage on most of our rentals so you can explore freely! We like to keep things straightforward; our cars are well-maintained. But if something unexpected happens, we offer 24-hour support. Just give us a call.",
    },
    {
      question: "Do you offer cars with a driver?",
      answer:
        "Yes, we have skilled and professional chauffeurs who know assistance or arranging a replacement vehicle if needed.",
    },
    {
      question: "What's your fuel policy? And how about mileage?",
      answer:
        "We keep it super simple! For fuel, it's a 'full-to-full' policy - you pick it up the car with a full tank, and you just bring it back full. No complicated calculations! And the best part? Most of our rentals come with unlimited mileage, so you can drive as much as you need.",
    },
    {
      question: "What documents will I need when I come to pick up my car?",
      answer:
        "You'll need your valid driver's licence (and an International Driving Permit if your licence isn't in English; it depends on availability and might have an extra fee). The best way is to ask us when you're planning your trip (a good idea), some official photo ID like your passport or national ID, and the credit card used for the booking/deposit. If you booked online, having your booking confirmation handy (on your phone is fine) helps too!",
    },
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
