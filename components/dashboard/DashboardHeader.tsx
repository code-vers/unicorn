'use client';

import { Bell, ChevronDown, RefreshCcw, Search, Settings } from 'lucide-react';

// 1. Strict Data Contracts
// This ensures your UI is entirely decoupled from the data fetching logic
interface UserProfile {
  name: string;
  role: string;
  avatarUrl?: string;
}

interface Breadcrumb {
  label: string;
  href?: string;
  active?: boolean;
}

interface DashboardHeaderProps {
  title?: string;
  breadcrumbs?: Breadcrumb[];
  lastUpdated?: string;
  hasUnreadNotifications?: boolean;
  completedToday?: number;
  user?: UserProfile;
  onSearch?: (query: string) => void;
  onToggleSidebar?: () => void;
}

export default function DashboardHeader({
  // 2. Default props act as our "Mock Data" until the backend is hooked up
  title = 'Dashboard Overview',
  breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', active: true },
  ],
  lastUpdated = 'Updated 16 May 2026, 11:59',
  hasUnreadNotifications = true,
  user = {
    name: 'Sarah Admin',
    role: 'Super Admin',
    avatarUrl: '/avatars/sarah.jpg', // Swap with actual CDN URL later
  },
  onSearch,
  onToggleSidebar,
}: DashboardHeaderProps) {
  return (
    <header className='flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-3 bg-white border-b border-gray-200 w-full'>
      {/* Left Section: Context & Navigation */}
      <div className='flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0'>
        {/* Sidebar Toggle / App Icon Launcher */}
        <button
          onClick={onToggleSidebar}
          aria-label='Toggle Navigation'
          className='flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200'
        >
          <div className='w-3.5 h-3.5 bg-gray-400 rounded-sm' />
        </button>

        <div className='flex flex-col'>
          <h1 className='text-[17px] font-bold text-gray-900 leading-tight'>{title}</h1>

          {/* Breadcrumbs Semantic Navigation */}
          <nav aria-label='Breadcrumb' className='mt-0.5'>
            <ol className='flex items-center gap-1.5 text-[11px] font-medium'>
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className='flex items-center gap-1.5'>
                  <span className={crumb.active ? 'text-[#2E7D32]' : 'text-gray-400'}>
                    {crumb.label}
                  </span>
                  {index < breadcrumbs.length - 1 && <span className='text-gray-300'>/</span>}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* Right Section: Tools & Profile */}
      <div className='flex items-center flex-wrap gap-3 w-full md:w-auto'>
        {/* Last Updated Badge */}
        <div className='hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-md border border-gray-100'>
          <RefreshCcw size={14} className='text-gray-400' />
          <span className='text-[11px] text-gray-500 font-medium'>{lastUpdated}</span>
        </div>

        {/* Global Search */}
        <div className='relative flex-grow md:flex-grow-0'>
          <div className='absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none'>
            <Search size={14} className='text-gray-400' />
          </div>
          <input
            type='text'
            placeholder='Search...'
            onChange={(e) => onSearch?.(e.target.value)}
            className='w-full md:w-48 xl:w-64 pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-100 rounded-md text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600/50 focus:border-green-600/50 transition-all'
          />
        </div>

        {/* Action Icons */}
        <button
          aria-label='Settings'
          className='flex-shrink-0 p-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-md text-gray-500 transition-colors'
        >
          <Settings size={16} />
        </button>

        <button
          aria-label='Notifications'
          className='relative flex-shrink-0 p-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-md text-gray-500 transition-colors'
        >
          <Bell size={16} />
          {hasUnreadNotifications && (
            // Absolute positioning to place the dot exactly like the design
            <span className='absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-600 rounded-full border border-white' />
          )}
        </button>

        {/* User Profile Dropdown */}
        <button
          aria-label='User Menu'
          className='flex items-center gap-2.5 pl-3 border-l border-gray-200 ml-1 hover:opacity-80 transition-opacity'
        >
          <div className='relative w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200'>
            {/* Fallback color if no image, otherwise use Next Image */}
            <div className='w-full h-full bg-[#7CA29C]' />
            {/*
              <Image
                src={user.avatarUrl}
                alt={`${user.name}'s avatar`}
                fill
                className="object-cover"
              />
            */}
          </div>
          <div className='hidden sm:flex flex-col items-start text-left'>
            <span className='text-xs font-bold text-gray-900 leading-none'>{user.name}</span>
            <span className='text-[10px] text-gray-500 font-medium mt-0.5 leading-none'>
              {user.role}
            </span>
          </div>
          <ChevronDown size={14} className='text-gray-400 hidden sm:block ml-1' />
        </button>
      </div>
    </header>
  );
}
