'use client';

import { 
  Wallet, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  ChevronDown, 
  Eye, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Smartphone,
  CreditCard,
  Plus
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const transactionData = [
  {
    bookingId: '#1001',
    paymentId: 'URC-2026-0089',
    vehicle: 'Toyota Land Cruiser V8',
    date: 'May 20, 2026',
    method: 'M-Pesa',
    amount: '$250',
    status: 'Paid',
    image: '/product/car.png'
  },
  {
    bookingId: '#1002',
    paymentId: 'URC-2026-0089',
    vehicle: 'Toyota Land Cruiser V8',
    date: 'May 20, 2026',
    method: 'M-Pesa',
    amount: '$400',
    status: 'Paid',
    image: '/product/car.png'
  },
  {
    bookingId: '#1001',
    paymentId: 'URC-2026-0089',
    vehicle: 'Toyota Land Cruiser V8',
    date: 'May 20, 2026',
    method: 'M-Pesa',
    amount: '$250',
    status: 'Paid',
    image: '/product/car.png'
  },
  {
    bookingId: '#1002',
    paymentId: 'URC-2026-0089',
    vehicle: 'Toyota Land Cruiser V8',
    date: 'May 20, 2026',
    method: 'M-Pesa',
    amount: '$400',
    status: 'Paid',
    image: '/product/car.png'
  },
  {
    bookingId: '#1001',
    paymentId: 'URC-2026-0089',
    vehicle: 'Toyota Land Cruiser V8',
    date: 'May 20, 2026',
    method: 'Card',
    amount: '$840',
    status: 'Paid',
    image: '/product/car.png'
  },
  {
    bookingId: '#1002',
    paymentId: 'URC-2026-0089',
    vehicle: 'Toyota Land Cruiser V8',
    date: 'May 20, 2026',
    method: 'Card',
    amount: '$250',
    status: 'Pending',
    image: '/product/car.png'
  },
  {
    bookingId: '#1001',
    paymentId: 'URC-2026-0089',
    vehicle: 'Toyota Land Cruiser V8',
    date: 'May 20, 2026',
    method: 'Card',
    amount: '$840',
    status: 'Pending',
    image: '/product/car.png'
  }
];

export default function Payments() {
  return (
    <div className="p-10 space-y-8 bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] pb-3">
        <h2 className="text-[14px] font-bold text-[#0A1413] font-montserrat uppercase tracking-wider">Payments</h2>
        <p className="text-[12px] text-[#6B7280] font-lato">View payment history and manage your payment methods.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border-[1.5px] border-[#D3D3D3] rounded-[16px] p-5 space-y-3">
          <div className="bg-[#EBF7ED] rounded-[8px] w-10 h-10 flex items-center justify-center">
            <Wallet size={18} className="text-[#3FA34D]" />
          </div>
          <div>
            <p className="text-[28px] font-bold text-[#0A1413] font-montserrat">1,284</p>
            <p className="text-[12px] font-bold text-[#6B7280] font-montserrat uppercase">Total Paid</p>
          </div>
        </div>
        <div className="bg-white border-[1.5px] border-[#D3D3D3] rounded-[16px] p-5 space-y-3">
          <div className="bg-[#FFEFDF] rounded-[8px] w-10 h-10 flex items-center justify-center">
            <AlertCircle size={18} className="text-[#FF7815]" />
          </div>
          <div>
            <p className="text-[28px] font-bold text-[#0A1413] font-montserrat">3285</p>
            <p className="text-[12px] font-bold text-[#6B7280] font-montserrat uppercase">Pending</p>
          </div>
        </div>
        <div className="bg-white border-[1.5px] border-[#D3D3D3] rounded-[16px] p-5 space-y-3">
          <div className="bg-[#FFF4DF] rounded-[8px] w-10 h-10 flex items-center justify-center">
            <CheckCircle2 size={18} className="text-[#D89A1C]" />
          </div>
          <div>
            <p className="text-[28px] font-bold text-[#0A1413] font-montserrat">4</p>
            <p className="text-[12px] font-bold text-[#6B7280] font-montserrat uppercase">Total Transactions</p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-[#E8ECF0] flex justify-end gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              className="bg-[#F4F6F8] border border-[#E8ECF0] rounded-[8px] pl-8 pr-3 py-1.5 text-[10px] text-gray-500 w-[170px] outline-none"
            />
          </div>
          <button className="bg-[#F4F6F8] border border-[#E8ECF0] rounded-[7px] px-3 py-1.5 flex items-center gap-1 text-[12px] text-[#718096] font-lato">
            All Payment Methods <ChevronDown size={12} />
          </button>
          <button className="bg-[#F4F6F8] border border-[#E8ECF0] rounded-[7px] px-3 py-1.5 flex items-center gap-1 text-[12px] text-[#718096] font-lato">
            All Status <ChevronDown size={12} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAFBFC] border-y border-[#E8ECF0]">
                <th className="px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase">Image</th>
                <th className="px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase">Booking ID</th>
                <th className="px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase">Payment ID</th>
                <th className="px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase">Vehicle</th>
                <th className="px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase">Date</th>
                <th className="px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase">Method</th>
                <th className="px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase">Total Amount</th>
                <th className="px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase">Status</th>
                <th className="px-3 py-4 text-[12px] font-normal text-[#A0AEC0] font-lato uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F6F8]">
              {transactionData.map((tx, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2.5">
                    <div className="relative w-10 h-7 rounded-[4px] overflow-hidden bg-gray-100">
                      <Image src={tx.image} alt={tx.vehicle} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-[12px] text-[#0A1413] font-lato">{tx.bookingId}</td>
                  <td className="px-3 py-2.5 text-[12px] font-semibold text-[#0A1413] font-lato">{tx.paymentId}</td>
                  <td className="px-3 py-2.5 text-[12px] font-semibold text-[#0A1413] font-lato">{tx.vehicle}</td>
                  <td className="px-3 py-2.5 text-[12px] text-[#6B7280] font-lato">{tx.date}</td>
                  <td className="px-3 py-2.5 text-[12px] text-[#6B7280] font-lato">{tx.method}</td>
                  <td className="px-3 py-2.5 text-[12px] text-[#6B7280] font-lato">{tx.amount}</td>
                  <td className="px-3 py-2.5">
                    <span className={`px-2 py-0.5 rounded-[5px] text-[10px] font-bold ${
                      tx.status === 'Paid' ? 'bg-[#EBF7ED] text-[#3FA34D]' : 'bg-[#FFFBE0] text-[#D8A500]'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center justify-center gap-1">
                      <button className="bg-[#F6F6F6] p-1.5 rounded-[5px] text-gray-500 hover:bg-gray-200 transition-colors">
                        <Eye size={12} />
                      </button>
                      <button className="bg-[#E0F7FF] p-1.5 rounded-[5px] text-[#0891B2] hover:bg-[#D0F0FA] transition-colors">
                        <Download size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-5 border-t border-[#E8ECF0] flex items-center justify-between">
          <p className="text-[10.5px] text-[#A0AEC0] font-lato">Showing 1–7 of 12</p>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded-[6px] bg-[#F6F6F6] text-gray-400 opacity-50"><ChevronLeft size={12} /></button>
            <button className="w-7 h-7 flex items-center justify-center rounded-[6px] text-[12px] font-bold text-white shadow-md bg-gradient-to-br from-[#3FA34D] to-[#2E7A39]">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-[6px] text-[12px] text-[#6B7280] bg-[#F6F6F6] hover:bg-gray-100 font-lato">2</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-[6px] bg-[#F6F6F6] text-gray-400 hover:bg-gray-100"><ChevronRight size={12} /></button>
          </div>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Saved Payment Methods */}
        <section className="bg-white border border-[#E5E7EB] rounded-[14px] flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E5E7EB]">
            <h3 className="text-[14px] font-bold text-[#0A1413] font-montserrat uppercase tracking-wider">Saved Payment Methods</h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="border border-[#E5E7EB] rounded-[10px] p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#F0FDF4] rounded-[6px] w-10 h-10 flex items-center justify-center">
                  <Smartphone size={18} className="text-[#3FA34D]" />
                </div>
                <div>
                  <p className="text-[14px] font-normal text-[#0A1413] font-nunito">M-Pesa</p>
                  <p className="text-[12px] text-[#6B7280] font-lato">+254 712 345 678</p>
                </div>
              </div>
              <span className="bg-[#3FA34D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[3px]">Primary</span>
            </div>

            <div className="border border-[#E5E7EB] rounded-[10px] p-3 flex items-center gap-3">
              <div className="bg-[#E0F7FF] rounded-[6px] w-10 h-10 flex items-center justify-center">
                <CreditCard size={18} className="text-[#0891B2]" />
              </div>
              <div>
                <p className="text-[14px] font-normal text-[#0A1413] font-nunito">Visa Card</p>
                <p className="text-[12px] text-[#6B7280] font-lato">•••• •••• •••• 4521</p>
              </div>
            </div>

            <button className="w-full border-2 border-dashed border-[#E5E7EB] rounded-[10px] py-3 text-[14px] font-semibold text-[#6B7280] font-montserrat hover:bg-gray-50 transition-colors">
              + Add Payment Method
            </button>
          </div>
        </section>

        {/* Pay Outstanding Balance */}
        <section className="bg-white border border-[#E5E7EB] rounded-[14px] p-5 space-y-6">
          <div className="space-y-1">
            <h3 className="text-[14px] font-bold text-[#0A1413] font-montserrat uppercase tracking-wider">Pay Outstanding Balance</h3>
            <div className="flex justify-between items-center">
              <p className="text-[14px] text-[#6B7280] font-lato">Pending (URC-2026-0101)</p>
              <p className="text-[14px] font-semibold text-[#0A1413] font-lato">$ 42,000</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-[#3FA344] text-white py-2 rounded-[6px] flex items-center justify-center gap-2 text-[14px] font-bold font-wix hover:bg-[#358A3A] transition-colors">
              <Smartphone size={14} /> M-Pesa
            </button>
            <button className="flex-1 border border-[#0891B2] text-[#0891B2] py-2 rounded-[6px] flex items-center justify-center gap-2 text-[14px] font-bold font-wix hover:bg-cyan-50 transition-colors">
              <CreditCard size={14} /> Card
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
