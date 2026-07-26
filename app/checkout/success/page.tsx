"use client";
import { CheckCircle2, ChevronRight, Download, Calendar, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { BookingService } from "@/lib/api/booking.service";
import { Spinner } from '@/components/ui/Spinner';


function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const bookingRef = searchParams.get("booking") || "UC2026-XXXX";
  
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // In a real scenario, we would fetch the exact booking details by referenceId.
  // For now, we will simulate loading and show a standard success message.
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [bookingRef]);

  return (
    <div className="w-full max-w-[700px] bg-white rounded-[20px] shadow-sm border border-[#E5E7EB] overflow-hidden">
      
      {/* Header / Success Banner */}
      <div className="bg-[#EBF7ED] px-10 py-12 flex flex-col items-center text-center border-b border-[rgba(63,163,77,0.1)]">
        <div className="w-20 h-20 bg-[#3FA34D] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#3FA34D]/30">
          <CheckCircle2 size={40} className="text-white" />
        </div>
        <h1 className="text-[32px] font-bold text-[#0A1413] font-montserrat mb-3">
          Reservation Request Received!
        </h1>
        <p className="text-[16px] text-[#4B5563] font-lato max-w-[480px] leading-relaxed">
          Thank you for choosing Unicorn Rent a Car. Your reservation request has been successfully submitted. We will contact you shortly to confirm availability and arrange payment.
        </p>
      </div>

      {/* Booking Details Summary */}
      <div className="p-10 space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-[#F9FAFB] rounded-[12px] border border-[#F3F4F6]">
          <div>
            <p className="text-[13px] text-[#6B7280] font-bold uppercase tracking-wide mb-1">Booking Reference</p>
            <p className="text-[24px] font-bold text-[#1A1A1A] font-montserrat">#{bookingRef}</p>
          </div>
          <div className="mt-4 md:mt-0 px-4 py-2 bg-[#FEF3C7] text-[#D97706] rounded-[50px] text-[13px] font-bold tracking-wide uppercase">
            Pending Confirmation
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-[18px] font-bold text-[#1A1A1A] font-montserrat border-b border-gray-100 pb-3">What happens next?</h3>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#F3F4F6] text-[#4B5563] flex items-center justify-center font-bold shrink-0">1</div>
              <p className="text-[15px] text-[#4B5563] font-lato pt-1 leading-relaxed">Our team will review your request and vehicle availability for your selected dates.</p>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#F3F4F6] text-[#4B5563] flex items-center justify-center font-bold shrink-0">2</div>
              <p className="text-[15px] text-[#4B5563] font-lato pt-1 leading-relaxed">You will receive an email and a phone call to confirm your reservation and discuss payment options (M-Pesa, Cash, or Bank Transfer).</p>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#F3F4F6] text-[#4B5563] flex items-center justify-center font-bold shrink-0">3</div>
              <p className="text-[15px] text-[#4B5563] font-lato pt-1 leading-relaxed">Once confirmed, you can track your booking status directly from your dashboard.</p>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
          <Link 
            href={`/dashboard/client?booking=${bookingRef}`}
            className="flex-1 bg-[#3FA34D] text-white h-[56px] rounded-[50px] flex items-center justify-center font-bold text-[16px] hover:bg-[#358a3a] transition-colors shadow-md"
          >
            View My Dashboard
          </Link>
          <Link 
            href="/"
            className="flex-1 bg-white text-[#4B5563] border border-[#D1D5DB] h-[56px] rounded-[50px] flex items-center justify-center font-bold text-[16px] hover:bg-gray-50 transition-colors"
          >
            Return Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-6 py-20">
      <Suspense fallback={<Spinner size="lg" centered className="h-[400px]" />}>
        <CheckoutSuccessContent />
      </Suspense>
    </div>
  );
}

