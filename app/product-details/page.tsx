import BookingProcess from "@/components/product/BookingProcess";
import CarPropertiesSection from "@/components/product/CarPropertiesSection";
import DriverDetailsForm from "@/components/product/DriverDetailsForm";

const page = () => {
  return (
    <div>
      <BookingProcess />
      <CarPropertiesSection />
      <DriverDetailsForm />
    </div>
  );
};

export default page;
