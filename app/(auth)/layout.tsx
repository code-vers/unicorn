import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white font-sans antialiased">
      {/* Left Side - Visual/Brand Panel (Ultra Professional SaaS Style) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#060A08] overflow-hidden flex-col justify-between border-r border-gray-200 shadow-[24px_0_40px_rgba(0,0,0,0.02)] z-20">
        
        {/* Structural Accents & Clean Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Subtle architectural vertical line */}
          <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
          {/* Soft ambient glow from top corner */}
          <div className="absolute top-[-30%] left-[-20%] w-[70%] h-[70%] bg-[#40A853]/10 rounded-full blur-[140px]"></div>
          {/* Soft ambient glow from bottom corner */}
          <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[60%] bg-[#40A853]/5 rounded-full blur-[120px]"></div>
        </div>

        {/* Header / Logo */}
        <div className="relative z-20 px-16 pt-16">
          <Link href="/" className="inline-flex items-center transition-opacity hover:opacity-80">
            <div className="relative w-36 h-12">
              <Image 
                src="/unicorn.png" 
                alt="Unicorn Logo" 
                fill 
                className="object-contain filter brightness-0 invert"
                priority
              />
            </div>
          </Link>
        </div>
        
        {/* Main Content Area - Structurally aligned */}
        <div className="relative z-20 px-16 flex-1 flex flex-col justify-center mt-12 mb-12">
          
          <div className="space-y-8 max-w-[480px]">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 shadow-sm animate-in fade-in duration-700">
              <span className="flex w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"></span>
              <span className="text-[11px] font-bold tracking-[0.15em] text-emerald-400 uppercase">Enterprise Ready</span>
            </div>

            {/* Typography */}
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
              <h1 className="text-[42px] xl:text-[52px] font-bold text-white leading-[1.1] tracking-tight">
                The premier <br/> 
                fleet management <br/>
                <span className="text-gray-400">and rental platform.</span>
              </h1>
              
              <p className="text-[17px] text-gray-400 font-medium leading-relaxed max-w-[420px]">
                Streamline your luxury vehicle rentals with enterprise-grade security, real-time tracking, and uncompromising performance.
              </p>
            </div>

            {/* Stat Grid */}
            <div className="grid grid-cols-2 gap-12 pt-10 mt-10 border-t border-white/10 animate-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
              <div>
                <p className="text-3xl font-bold text-white mb-1.5">99.9%</p>
                <p className="text-sm text-gray-500 font-medium tracking-wide">Uptime SLA</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-1.5">24/7</p>
                <p className="text-sm text-gray-500 font-medium tracking-wide">Concierge Support</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="relative z-20 px-16 pb-12 flex items-center justify-between border-t border-white/5 pt-8 animate-in fade-in duration-1000 delay-300 fill-mode-both">
          {/* Trust Indicators */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="w-9 h-9 rounded-full border-2 border-[#060A08] bg-gray-800 relative z-30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-[#060A08] bg-gray-700 relative z-20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-[#060A08] bg-gray-600 relative z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[#40A853]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <p className="text-[11px] font-semibold text-gray-500 mt-1 uppercase tracking-wider">Trusted by 10,000+</p>
            </div>
          </div>

          <div className="flex gap-8 text-[13px] text-gray-500 font-medium">
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
          </div>
        </div>
      </div>

      {/* Right side - Form Panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 lg:p-24 relative bg-[#FAFAFA]">
        {/* Mobile Logo Header */}
        <div className="absolute top-8 left-8 lg:hidden">
          <Link href="/" className="relative w-32 h-10 inline-block">
            <Image 
              src="/unicorn.png" 
              alt="Unicorn Logo" 
              fill 
              className="object-contain"
            />
          </Link>
        </div>

        <div className="w-full max-w-[440px] space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {children}
        </div>
      </div>
    </div>
  );
}
