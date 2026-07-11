import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Visual/Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0A1A10] overflow-hidden">
        {/* Background Gradients/Shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#40A853] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#40A853] rounded-full blur-[140px] opacity-20"></div>
        
        {/* Glassmorphism decorative element */}
        <div className="absolute top-1/4 right-[10%] w-32 h-32 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl rotate-12"></div>
        <div className="absolute bottom-1/4 left-[10%] w-48 h-48 bg-white/5 backdrop-blur-md border border-white/10 rounded-full -rotate-12"></div>

        <div className="relative z-10 flex flex-col justify-between w-full p-12 lg:p-20">
          <div>
            <Link href="/" className="inline-block relative w-40 h-24">
              <Image 
                src="/unicorn.png" 
                alt="Unicorn Logo" 
                fill 
                className="object-contain filter brightness-0 invert opacity-90 drop-shadow-lg"
                priority
              />
            </Link>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Premium Vehicle <br/>
              <span className="text-[#40A853]">Rental Experience.</span>
            </h1>
            <p className="text-lg text-emerald-50/70 max-w-md font-medium">
              Join the most exclusive fleet of vehicles. Drive your dreams with seamless booking and transparent pricing.
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-emerald-50/50">
            <span>© {new Date().getFullYear()} Unicorn Ltd.</span>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </div>

      {/* Right side - Form Panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 lg:p-24 relative">
        {/* Mobile Logo Header */}
        <div className="absolute top-6 left-6 lg:hidden">
          <Link href="/" className="relative w-32 h-16 inline-block">
            <Image 
              src="/unicorn.png" 
              alt="Unicorn Logo" 
              fill 
              className="object-contain"
            />
          </Link>
        </div>

        <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </div>
    </div>
  );
}
