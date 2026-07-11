'use client';

import { 
  Car, 
  MapPin, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Plus, 
  FileText, 
  Phone, 
  Bell,
  CheckCircle2,
  AlertCircle,
  Download
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SupportCenter from '@/components/dashboard/client/SupportCenter';

export default function ClientDashboardPage() {
  const currentDate = "Tuesday, 9 June 2026";

  return (
    <div className='h-full w-full flex flex-col'>
            <div className='flex-1'>
                <main className="flex-1 overflow-y-auto bg-white">
          <div className="p-10 space-y-6 max-w-[1600px] mx-auto">
            {/* Header Section */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="space-y-0.5">
                <h2 className="text-[14px] font-bold text-[#0A1413] font-montserrat">
                  Welcome back, Afiah 👋
                </h2>
                <p className="text-[12px] text-[#6B7280] font-lato">
                  {currentDate}
                </p>
              </div>
              <div className="relative w-40 h-24 rounded-[10px] overflow-hidden">
                <Image 
                  src="/unicorn.png" 
                  alt="Rental car" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="space-y-12">
              
              {/* Active Bookings Section */}
              <section className="bg-white border border-[#E5E7EB] rounded-[14px] overflow-hidden">
                <div className="px-[14px] py-[11px] border-b border-[#F2F4F7] flex items-center gap-2">
                  <div className="bg-[#EBF7ED] border border-[rgba(63,163,77,0.1)] rounded-[6px] p-1">
                    <Car size={16} className="text-[#3FA34D]" />
                  </div>
                  <h3 className="text-[14px] font-bold text-[#0A1413] font-montserrat uppercase tracking-wider">Active Bookings</h3>
                </div>
                <div className="divide-y divide-[#E5E7EB]">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-3 flex items-center justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                          <span className="text-[14px] font-bold text-[#0A1413] font-lato">
                            Toyota Prado VX – KBZ 456T
                          </span>
                          <span className="bg-[#3FA34D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[3px] flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-white rounded-full"></span> Active
                          </span>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-1.5 text-[12px] text-[#6A7282] font-lato">
                            <MapPin size={13} className="text-[#6A7282]" /> Nairobi CBD Office
                          </div>
                          <div className="flex items-center gap-1.5 text-[12px] text-[#6A7282] font-lato">
                            <Calendar size={13} className="text-[#6A7282]" /> Return: Jun 11, 2026
                          </div>
                          <div className="flex items-center gap-1.5 text-[12px] text-[#6A7282] font-lato">
                            <Clock size={13} className="text-[#6A7282]" /> 3 days remaining
                          </div>
                        </div>
                      </div>
                      <Link href="#" className="flex items-center gap-1 text-[#3FA344] text-[14px] font-semibold font-lato hover:underline">
                        View Details <ChevronRight size={15} />
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick Actions Section */}
              <section className="border border-[#E5E7EB] rounded-[10px] p-3 space-y-4">
                <h3 className="text-[14px] font-bold text-[#0A1413] font-montserrat uppercase tracking-wider">Quick Actions</h3>
                <div className="grid grid-cols-4 gap-6">
                  <button className="bg-[#EBF7ED] rounded-[10px] p-3 flex flex-col items-center gap-2 hover:opacity-90 transition-opacity">
                    <Plus size={24} className="text-[#3FA344]" />
                    <span className="text-[14px] font-bold text-[#3FA344] font-lato">Book a Car</span>
                  </button>
                  <button className="bg-[#FFF3E8] rounded-[10px] p-3 flex flex-col items-center gap-2 hover:opacity-90 transition-opacity">
                    <Clock size={24} className="text-[#FF7815]" />
                    <span className="text-[14px] font-bold text-[#FF7815] font-lato">Extend Rental</span>
                  </button>
                  <button className="bg-[#E0F7FF] rounded-[10px] p-3 flex flex-col items-center gap-2 hover:opacity-90 transition-opacity">
                    <FileText size={24} className="text-[#155DFC]" />
                    <span className="text-[14px] font-bold text-[#155DFC] font-lato">View Invoice</span>
                  </button>
                  <Link href="/dashboard/support" className="bg-[#FFF0F0] rounded-[10px] p-3 flex flex-col items-center gap-2 hover:opacity-90 transition-opacity text-center">
                    <Phone size={24} className="text-[#DC2626]" />
                    <span className="text-[14px] font-bold text-[#DC2626] font-lato">Contact Support</span>
                  </Link>
                </div>
              </section>

              {/* Bottom Grid: Upcoming Bookings & Recent Notifications */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Upcoming Bookings */}
                <section className="bg-white border border-[#E5E7EB] rounded-[14px] overflow-hidden flex flex-col min-h-[480px]">
                  <div className="px-5 py-4 border-b border-[#E5E7EB]">
                    <h3 className="text-[14px] font-bold text-[#0A1413] font-montserrat uppercase tracking-wider">Upcoming Bookings</h3>
                  </div>
                  <div className="divide-y divide-[#E5E7EB]">
                    {[1, 2].map((i) => (
                      <div key={i} className="p-5 flex gap-4">
                        <div className="relative w-32 h-24 rounded-[6px] overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image 
                            src="/product/car.png" 
                            alt="Toyota Land Cruiser V8" 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <h4 className="text-[14px] font-bold text-[#0A1413] font-lato">Toyota Land Cruiser V8</h4>
                          <p className="text-[12px] text-[#6B7280] font-lato">KCB 789G · 7 Seater SUV</p>
                          <div className="pt-3 space-y-1.5">
                            <div className="flex items-center gap-2 text-[14px] text-[#0A1413] font-medium font-lato">
                              <Calendar size={13} className="text-[#6B7280]" /> Pick-up: Jun 14, 2026 · 08:00 AM
                            </div>
                            <div className="flex items-center gap-2 text-[14px] text-[#0A1413] font-medium font-lato">
                              <MapPin size={13} className="text-[#6B7280]" /> Jomo Kenyatta Intl Airport
                            </div>
                            <div className="flex items-center gap-2 text-[14px] text-[#0A1413] font-medium font-lato">
                              <Clock size={13} className="text-[#6B7280]" /> Duration: 5 Days · Ksh 42,000
                            </div>
                          </div>
                          <Link href="#" className="inline-flex items-center gap-1 text-[#3FA344] text-[14px] font-medium font-lato pt-3 hover:underline">
                            View Details <ChevronRight size={13} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Recent Notifications */}
                <section className="bg-white border border-[#E5E7EB] rounded-[14px] overflow-hidden flex flex-col shadow-sm">
                  <div className="px-[14px] py-[11px] border-b border-[#F2F4F7] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-[#EBF7ED] rounded-[7px] p-1">
                        <Bell size={13} className="text-[#3FA34D]" />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-bold text-[#0A1413] font-montserrat uppercase tracking-wider">Recent Notifications</h3>
                        <p className="text-[12px] text-[#6B7280] font-lato">Live updates</p>
                      </div>
                    </div>
                    <div className="bg-[#FFF3E8] rounded-[20px] px-2 py-0.5 flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#FF7815] rounded-full"></span>
                      <span className="text-[#FF7815] text-[12px] font-bold font-lato">Live</span>
                    </div>
                  </div>
                  <div className="flex-1 divide-y divide-[#FAFBFC]">
                    <div className="p-3 px-4 flex items-start justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex gap-3 items-start">
                        <div className="bg-[#EBF7ED] border border-[rgba(46,122,57,0.1)] rounded-[6px] p-1.5 mt-0.5 flex-shrink-0">
                          <CheckCircle2 size={12} className="text-[#3FA34D]" />
                        </div>
                        <p className="text-[14px] font-bold text-[#0A1413] font-lato leading-tight">
                          Your extension to Jun 15 has been approved.
                        </p>
                      </div>
                      <span className="text-[12px] text-[#6B7280] font-lato whitespace-nowrap ml-4">2 min ago</span>
                    </div>
                    <div className="p-3 px-4 flex items-start justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex gap-3 items-start">
                        <div className="bg-[#FFF3E8] border border-[rgba(255,120,21,0.1)] rounded-[6px] p-1.5 mt-0.5 flex-shrink-0">
                          <AlertCircle size={12} className="text-[#FF7815]" />
                        </div>
                        <p className="text-[14px] font-bold text-[#0A1413] font-lato leading-tight">
                          Vehicle return reminder: Toyota Prado due in 3 days.
                        </p>
                      </div>
                      <span className="text-[12px] text-[#6B7280] font-lato whitespace-nowrap ml-4">2 min ago</span>
                    </div>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="p-3 px-4 flex items-start justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex gap-3 items-start">
                          <div className="bg-[#E0F7FF] border border-[rgba(8,145,178,0.1)] rounded-[6px] p-1.5 mt-0.5 flex-shrink-0">
                            <Download size={12} className="text-[#0891B2]" />
                          </div>
                          <p className="text-[14px] font-bold text-[#0A1413] font-lato leading-tight">
                            Invoice #INV-2026-0089 is ready for download.
                          </p>
                        </div>
                        <span className="text-[12px] text-[#6B7280] font-lato whitespace-nowrap ml-4">2 min ago</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[#E8ECF0] p-2 px-[14px]">
                    <button className="w-full py-1.5 flex items-center justify-center gap-1 text-[12px] text-[#6B7280] font-lato hover:bg-gray-50 rounded-[7px] transition-colors">
                      <ChevronRight size={11} className="rotate-90" /> Show 3 More
                    </button>
                  </div>
                  <div className="p-3 px-4 pb-4">
                    <button className="w-full bg-[#3FA344] text-white py-[13px] rounded-[6px] text-[14px] font-bold font-montserrat hover:bg-[#358a3a] transition-colors shadow-sm">
                      View All Activity
                    </button>
                  </div>
                </section>
              </div>

              {/* Support Section */}
              <section className="pt-6">
                <SupportCenter />
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
