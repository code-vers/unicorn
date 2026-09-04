'use client';

import {
  BarChart2,
  Bell,
  CalendarDays,
  Car,
  CreditCard,
  FileText,
  Headset,
  LayoutGrid,
  MapPin,
  MapPinned,
  Menu,
  Settings,
  Tag,
  Upload,
  User,
  UserCheck,
  Users,
  Wallet,
  X,
  LogOut,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface NavGroup {
  title?: string;
  items: NavItem[];
}

// 2. Configuration Objects for Different Roles
const ADMIN_CONFIG: NavGroup[] = [
  {
    items: [{ label: 'Dashboard', href: '/dashboard', icon: LayoutGrid }],
  },
  {
    title: 'OPERATIONS',
    items: [
      { label: 'Vehicle Management', href: '/dashboard/vehicles', icon: Car },
      {
        label: 'Booking Management',
        href: '/dashboard/bookings',
        icon: CalendarDays,
      },
      { label: 'Driver Management', href: '/dashboard/drivers', icon: UserCheck },
      { label: 'Customer Management', href: '/dashboard/customers', icon: Users },
      { label: 'Location Management', href: '/dashboard/locations', icon: MapPin },
    ],
  },
  {
    title: 'FINANCE',
    items: [
      {
        label: 'Payments / Invoices',
        href: '/dashboard/payments',
        icon: CreditCard,
      },
      { label: 'Pricing', href: '/dashboard/pricing', icon: Tag },
      { label: 'Drop-Off Charges', href: '/dashboard/drop-off', icon: MapPin },
    ],
  },
  {
    title: 'TOOLS',
    items: [
      { label: 'Reports', href: '/dashboard/reports', icon: BarChart2 },
      {
        label: 'Notifications',
        href: '/dashboard/notifications',
        icon: Bell,
      },
      { label: 'Support Tickets', href: '/dashboard/support-tickets', icon: Headset },
      { label: 'Document Upload', href: '/dashboard/documents', icon: Upload },
      { label: 'Profile / Settings', href: '/dashboard/settings', icon: Settings },
    ],
  },
];

const CLIENT_CONFIG: NavGroup[] = [
  {
    items: [
      { label: 'Dashboard', href: '/dashboard/client', icon: LayoutGrid },
      { label: 'My Bookings', href: '/dashboard/my-bookings', icon: Car },
      { label: 'My Payments', href: '/dashboard/my-payments', icon: Wallet },
      { label: 'My Documents', href: '/dashboard/my-documents', icon: FileText },
      { label: 'Trip Management', href: '/dashboard/trip-management', icon: MapPinned },
      { label: 'Profile', href: '/dashboard/profile', icon: User },
      { label: 'Support', href: '/dashboard/support', icon: Headset },
    ],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  // Determine which config to use based on the user's role
  const navigationConfig = user?.role === 'ADMIN' ? ADMIN_CONFIG : CLIENT_CONFIG;

  // Memoize active state checking logic
  const isActive = useMemo(() => {
    return (href: string) => {
      // Exact match for dashboard roots, otherwise check prefix
      if (href === '/dashboard' || href === '/dashboard/client') {
        return pathname === href;
      }
      return pathname === href || pathname.startsWith(`${href}/`);
    };
  }, [pathname]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label='Toggle Menu'
        className='fixed top-4 left-4 z-50 md:hidden p-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 rounded-lg text-gray-600 transition-colors'
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-30 md:hidden transition-opacity'
          onClick={() => setIsOpen(false)}
          aria-hidden='true'
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-72 bg-white border-r border-gray-100 shadow-sm flex flex-col transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className='h-28 flex-shrink-0 flex items-center justify-center border-b border-gray-100 p-4'>
          <Link href='/' className='flex flex-col items-center gap-2'>
            <div className='relative w-28 h-16 flex items-center justify-center overflow-hidden'>
              <Image
                src='/unicorn.png'
                alt='Unicorn Logo'
                fill
                sizes='112px'
                className='object-contain'
                priority
              />
            </div>
          </Link>
        </div>

        {/* Scrollable Navigation */}
        <nav className='flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300'>
          <div className='flex flex-col gap-4'>
            {navigationConfig.map((group, groupIndex) => (
              <div key={groupIndex} className='flex flex-col'>
                {/* Group Header (if exists) */}
                {group.title && (
                  <h3 className='px-6 mb-2 text-[11px] font-bold text-slate-400 tracking-wider uppercase'>
                    {group.title}
                  </h3>
                )}

                {/* Group Items */}
                <ul className='flex flex-col space-y-1'>
                  {group.items.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className={`relative group flex items-center justify-between px-4 py-2.5 mx-3 rounded-xl transition-all duration-200 ${
                            active
                              ? 'bg-[#EEF7F0] text-[#40A853]'
                              : 'text-[#64748B] hover:bg-gray-50 hover:text-slate-700'
                          }`}
                        >
                          {/* Active Left Indicator Bar */}
                          {active && (
                            <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#40A853] rounded-r-md' />
                          )}

                          <div className='flex items-center gap-3 pl-1'>
                            <Icon
                              size={20}
                              strokeWidth={active ? 2.5 : 1.5}
                              className={`transition-colors duration-200 ${
                                active
                                  ? 'text-[#40A853]'
                                  : 'text-[#94A3B8] group-hover:text-slate-500'
                              }`}
                            />
                            <span
                              className={`text-[14px] ${active ? 'font-bold tracking-wide' : 'font-medium'}`}
                            >
                              {item.label}
                            </span>
                          </div>

                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>
        
        {/* Logout Section */}
        <div className='p-4 border-t border-gray-100'>
          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className='w-full relative group flex items-center justify-start px-4 py-3 rounded-xl transition-all duration-200 text-[#D32F2F] hover:bg-red-50'
          >
            <div className='flex items-center gap-4 pl-1'>
              <LogOut size={20} strokeWidth={1.5} className='group-hover:text-red-700' />
              <span className='text-[14px] font-medium group-hover:text-red-700'>Logout</span>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
