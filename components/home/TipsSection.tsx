import React from "react";

const TipsSection: React.FC = () => {
  const tips = [
    {
      title: "Book Ahead & Relax",
      description:
        "Want the best pick of our cars, especially during busy seasons? Booking a bit early is a smart move. Plus, with our easy cancellation, you can lock in your ideal ride without stress if your plans need to change a little.",
      // Replace with your actual image path (e.g., /images/calendar.png)
      imageSrc: "/Home/car.png",
      bgColor: "bg-[#D1FAE5]", // Light Green
    },
    {
      title: "See Why Folks Love Us",
      description:
        "We're chuffed about the great trips our customers have! We encourage you to check out what people say about Unicorn Rent A Car online, or ask around. We're all about happy drivers and awesome Kenyan adventures!",
      imageSrc: "Home/avatar.png",
      bgColor: "bg-[#FEF3C7]", // Light Yellow
    },
    {
      title: "Security Deposit",
      description:
        "Like with most car rentals, there's a security deposit when you grab your keys. We're totally upfront about it, and all the details will be clear when you book. Just make sure you've got room on your card, and you're good to go!",
      imageSrc: "Home/wallet.png",
      bgColor: "bg-[#DBEAFE]", // Light Blue
    },
    {
      title: "Simple Mileage",
      description:
        "This is the really good part! With Unicorn, you get unlimited mileage. Seriously, explore to your heart's content! For fuel, it's just 'full-to-full' - you pick it up with a full tank and bring it back full. Easy peasy, no guessing games.",
      imageSrc: "/Home/phone.png",
      bgColor: "bg-[#E0E7FF]", // Light Purple
    },
  ];

  return (
    <section className='w-full bg-white py-20'>
      <div className='max-w-[1440px] mx-auto px-4 md:px-0 text-center'>
        {/* Heading */}
        <h2 className='text-[32px] md:text-[40px] font-bold text-[#111827] mb-6'>
          Get the Most Out of Your Unicorn Ride!
        </h2>

        {/* Subtext */}
        <p className='max-w-[1150px] mx-auto text-[#6B7280] text-[16px] md:text-[18px] leading-relaxed mb-16'>
          We want your Kenyan adventure to be awesome from start to finish! Here
          are a few simple tips to make sure renting and driving your unicorn
          car is super easy and fun. Let&apos;s get you ready for the road!
        </p>

        {/* Tips Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
          {tips.map((tip, index) => (
            <div key={index} className='flex flex-col items-center group'>
              {/* Circular Image Container */}
              <div
                className={`w-[140px] h-[140px] rounded-full ${tip.bgColor} flex items-center justify-center mb-8 transition-transform group-hover:scale-105 overflow-hidden`}>
                <img
                  src={tip.imageSrc}
                  alt={tip.title}
                  // mix-blend-multiply ensures white image backgrounds match the pastel circles
                  className='w-16 h-16 object-contain mix-blend-multiply'
                />
              </div>

              {/* Text Content */}
              <h3 className='text-[22px] font-bold text-[#111827] mb-4'>
                {tip.title}
              </h3>
              <p className='text-[#4B5563] text-[15px] leading-[1.7] text-center md:text-left lg:text-center'>
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TipsSection;
