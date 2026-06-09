'use client';

import {
  BarChart2,
  Bell,
  CalendarDays,
  Car,
  CreditCard,
  LayoutGrid,
  MapPin,
  Menu,
  Settings,
  Tag,
  Upload,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

// 1. Strict Data Contracts
// This structure maps perfectly to a future backend API response
type BadgeColor = 'green' | 'yellow' | 'red';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: {
    value: number;
    color: BadgeColor;
  };
}

interface NavGroup {
  title?: string;
  items: NavItem[];
}

// 2. Configuration Object
// Extracted from the render loop for performance and maintainability
const navigationConfig: NavGroup[] = [
  {
    // Dashboard sits outside a named category
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
        badge: { value: 12, color: 'green' },
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
        badge: { value: 4, color: 'yellow' },
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
        badge: { value: 7, color: 'red' },
      },
      { label: 'Document Upload', href: '/dashboard/documents', icon: Upload },
      { label: 'Profile / Settings', href: '/dashboard/settings', icon: Settings },
    ],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Memoize active state checking logic
  const isActive = useMemo(() => {
    return (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  }, [pathname]);

  // Helper for badge color mapping
  const getBadgeClasses = (color: BadgeColor) => {
    switch (color) {
      case 'green':
        return 'bg-[#2E7D32] text-white';
      case 'yellow':
        return 'bg-[#FBC02D] text-white';
      case 'red':
        return 'bg-[#D32F2F] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

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
            {/* Replace src with your actual logo path */}
            <div className='relative w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden'>
              <span className='text-xl font-bold text-green-700'>U</span>
              {/* <Image
                   src="/logo.png"
                   alt="Unicorn Logo"
                   fill
                   className="object-contain"
                   priority
                 />
               */}
            </div>
            <span className='text-[10px] font-bold text-green-600 tracking-widest uppercase'>
              Unicorn <span className='text-orange-400'>Rent A Car</span>
            </span>
          </Link>
        </div>

        {/* Scrollable Navigation */}
        <nav className='flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300'>
          <div className='flex flex-col gap-6'>
            {navigationConfig.map((group, groupIndex) => (
              <div key={groupIndex} className='flex flex-col'>
                {/* Group Header */}
                {group.title && (
                  <h3 className='px-6 mb-3 text-xs font-semibold text-slate-400 tracking-wider uppercase'>
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
                          className={`group flex items-center justify-between px-6 py-2.5 transition-all duration-200 ${
                            active
                              ? 'bg-[#E8F5E9] text-[#2E7D32] border-l-4 border-[#2E7D32]' // Active state based on image
                              : 'text-slate-500 hover:bg-gray-50 hover:text-slate-700 border-l-4 border-transparent'
                          }`}
                        >
                          <div className='flex items-center gap-4'>
                            <Icon
                              size={20}
                              className={`transition-colors duration-200 ${active ? 'text-[#2E7D32]' : 'text-slate-400 group-hover:text-slate-600'}`}
                            />
                            <span className={`text-sm ${active ? 'font-semibold' : 'font-medium'}`}>
                              {item.label}
                            </span>
                          </div>

                          {/* Dynamic Badge */}
                          {item.badge && (
                            <span
                              className={`min-w-[20px] h-5 flex items-center justify-center px-1.5 text-[11px] font-bold rounded-full ${getBadgeClasses(item.badge.color)}`}
                            >
                              {item.badge.value}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}
