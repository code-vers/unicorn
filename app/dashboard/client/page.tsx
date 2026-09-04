'use client';

import {
  Bell,
  CalendarDays,
  Car,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileText,
  MapPin,
  Phone,
  ReceiptText,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { useBookings } from '@/hooks/useBookings';
import { useNotifications } from '@/hooks/useNotifications';
import { UserService } from '@/lib/api/user.service';

const actions = [
  { label: 'Book a Car', href: '/', icon: Car, className: 'bg-[#ebf7ed] text-[#3fa344]' },
  { label: 'Extend Rental', href: '/dashboard/my-bookings', icon: Clock3, className: 'bg-[#fff3e8] text-[#ff7815]' },
  { label: 'View Invoice', href: '/dashboard/my-documents', icon: FileText, className: 'bg-[#e0f7ff] text-[#155dfc]' },
  { label: 'Contact Support', href: '/dashboard/support', icon: Phone, className: 'bg-[#fff0f0] text-[#dc2626]' },
];

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function ClientDashboardPage() {
  const [userName, setUserName] = useState('');
  const [today] = useState(() => Date.now());
  const { bookings, isLoading: bookingsLoading } = useBookings();
  const { notifications, isLoading: notificationsLoading } = useNotifications();

  useEffect(() => {
    UserService.getMe()
      .then((user) => setUserName(user?.name?.split(' ')[0] ?? ''))
      .catch(() => setUserName(''));
  }, []);

  const activeBookings = bookings
    .filter(
      (booking) =>
        (booking.bookingStatus === 'ONGOING' || booking.bookingStatus === 'CONFIRMED') &&
        new Date(booking.pickupDate).getTime() <= today,
    )
    .slice(0, 3);
  const upcomingBookings = bookings
    .filter(
      (booking) =>
        booking.bookingStatus === 'PENDING' ||
        (booking.bookingStatus === 'CONFIRMED' && new Date(booking.pickupDate).getTime() > today),
    )
    .sort((a, b) => new Date(a.pickupDate).getTime() - new Date(b.pickupDate).getTime())
    .slice(0, 2);
  const recentNotifications = notifications.slice(0, 6);
  const currentDate = new Date(today).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const remainingDays = (date: string) =>
    Math.max(0, Math.ceil((new Date(date).getTime() - today) / 86_400_000));

  if (bookingsLoading || notificationsLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className='space-y-6 px-4 pb-4 text-[#0a1413]'>
      <header className='flex min-h-[109px] items-center justify-between border-b border-[#e5e7eb] py-3'>
        <div>
          <h2 className='font-montserrat text-sm font-bold leading-[1.6]'>
            Welcome back, {userName || 'Client'} 👋
          </h2>
          <p className='font-lato text-xs leading-[1.6] text-[#6b7280]'>{currentDate}</p>
        </div>
        <div className='relative h-24 w-40 overflow-hidden rounded-[10px]'>
          <Image
            src='/dashboard/rental-car.jpg'
            alt='Rental car'
            fill
            sizes='160px'
            priority
            className='object-cover'
          />
        </div>
      </header>

      <section className='overflow-hidden rounded-[14px] border border-[#e5e7eb] bg-white'>
        <div className='flex h-14 items-center gap-2 border-b border-[#f2f4f7] px-[14px]'>
          <span className='flex size-6 items-center justify-center rounded-md border border-[#3fa34d1a] bg-[#ebf7ed]'>
            <Car className='text-[#3fa34d]' size={16} />
          </span>
          <h3 className='font-montserrat text-sm font-bold'>Active Bookings</h3>
        </div>
        <div className='divide-y divide-[#e5e7eb]'>
          {activeBookings.length ? (
            activeBookings.map((booking) => (
              <div key={booking.id} className='flex min-h-[52px] items-center justify-between gap-5 p-3'>
                <div className='min-w-0 space-y-1.5'>
                  <div className='flex flex-wrap items-center gap-3'>
                    <p className='font-lato text-sm font-bold'>Booking {booking.referenceId}</p>
                    <span className='rounded-[3px] bg-[#3fa34d] px-1 text-[10px] font-bold leading-4 text-white'>
                      ● Active
                    </span>
                  </div>
                  <div className='flex flex-wrap items-center gap-x-6 gap-y-1 font-lato text-xs text-[#6a7282]'>
                    <span className='flex items-center gap-1'><MapPin size={13} />{booking.pickupLocation?.name || 'Pickup location'}</span>
                    <span className='flex items-center gap-1'><CalendarDays size={13} />Return: {formatDate(booking.dropOffDate)}</span>
                    <span className='flex items-center gap-1'><Clock3 size={13} />{remainingDays(booking.dropOffDate)} days remaining</span>
                  </div>
                </div>
                <Link href='/dashboard/my-bookings' className='flex shrink-0 items-center gap-1 font-lato text-sm font-semibold text-[#3fa344]'>
                  View Details <ChevronRight size={15} />
                </Link>
              </div>
            ))
          ) : (
            <p className='p-5 text-center font-lato text-sm text-[#6b7280]'>You have no active bookings at the moment.</p>
          )}
        </div>
      </section>

      <section className='space-y-4 rounded-[10px] border border-[#e5e7eb] p-3'>
        <h3 className='font-montserrat text-sm font-bold'>Quick Actions</h3>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6'>
          {actions.map(({ label, href, icon: Icon, className }) => (
            <Link key={label} href={href} className={`flex min-h-[72px] flex-col items-center justify-center gap-2 rounded-[10px] p-3 font-lato text-sm font-bold transition-opacity hover:opacity-80 ${className}`}>
              <Icon size={24} />
              {label}
            </Link>
          ))}
        </div>
      </section>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <section className='overflow-hidden rounded-[14px] border border-[#e5e7eb] bg-white'>
          <div className='flex h-14 items-center border-b border-[#e5e7eb] px-[14px]'>
            <h3 className='font-montserrat text-sm font-bold'>Upcoming Bookings</h3>
          </div>
          <div className='divide-y divide-[#e5e7eb]'>
            {upcomingBookings.length ? (
              upcomingBookings.map((booking) => (
                <div key={booking.id} className='flex gap-3 p-3'>
                  <div className='relative h-[105px] w-[125px] shrink-0 overflow-hidden rounded-md'>
                    <Image
                      src='/dashboard/toyota-land-cruiser.jpg'
                      alt='Toyota Land Cruiser'
                      fill
                      sizes='125px'
                      className='object-cover'
                    />
                  </div>
                  <div className='min-w-0 font-lato'>
                    <h4 className='text-sm font-bold'>Booking {booking.referenceId}</h4>
                    <p className='text-xs text-[#6b7280]'>{booking.bookingStatus}</p>
                    <div className='mt-2 space-y-1 text-sm font-medium'>
                      <p className='flex items-center gap-2'><CalendarDays size={13} className='text-[#3fa344]' />Pick-up: {formatDate(booking.pickupDate)}</p>
                      <p className='flex items-center gap-2'><MapPin size={13} className='text-[#3fa344]' />{booking.pickupLocation?.name || 'Pickup location'}</p>
                      <p className='flex items-center gap-2'><CircleDollarSign size={13} className='text-[#3fa344]' />Ksh {Number(booking.totalAmount).toLocaleString()}</p>
                    </div>
                    <Link href='/dashboard/my-bookings' className='mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#3fa344]'>
                      View Details <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className='p-5 text-center font-lato text-sm text-[#6b7280]'>You have no upcoming bookings.</p>
            )}
          </div>
        </section>

        <section className='flex overflow-hidden rounded-[14px] border border-[#e5e7eb] bg-white shadow-[0_1px_5px_rgba(0,0,0,0.05)]'>
          <div className='flex min-w-0 flex-1 flex-col'>
            <div className='flex h-14 items-center justify-between border-b border-[#f2f4f7] px-[14px]'>
              <div className='flex items-center gap-2'>
                <span className='flex size-6 items-center justify-center rounded-[7px] bg-[#ebf7ed]'><Bell size={13} className='text-[#3fa34d]' /></span>
                <div>
                  <h3 className='font-montserrat text-sm font-bold leading-4'>Recent Notifications</h3>
                  <p className='font-lato text-xs text-[#6b7280]'>Live updates</p>
                </div>
              </div>
              <span className='flex items-center gap-1.5 rounded-full bg-[#fff3e8] px-2 py-0.5 font-lato text-xs text-[#ff7815]'><i className='size-1 rounded-full bg-[#ff7815]' />Live</span>
            </div>
            <div className='flex-1 divide-y divide-[#fafbfc]'>
              {recentNotifications.length ? (
                recentNotifications.map((notification) => (
                  <div key={notification.id} className='flex min-h-[42px] items-start justify-between gap-4 p-3'>
                    <div className='flex min-w-0 items-start gap-3'>
                      <span className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border ${
                        notification.type === 'BOOKING'
                          ? 'border-[#2e7a391a] bg-[#ebf7ed] text-[#3fa34d]'
                          : notification.type === 'PAYMENT'
                            ? 'border-[#0891b21a] bg-[#e0f7ff] text-[#0891b2]'
                            : 'border-[#ff78151a] bg-[#fff3e8] text-[#ff7815]'
                      }`}>
                        {notification.type === 'BOOKING' ? <ShieldCheck size={12} /> : notification.type === 'PAYMENT' ? <ReceiptText size={12} /> : <Bell size={12} />}
                      </span>
                      <p className='truncate font-lato text-sm font-bold'>{notification.title || notification.message}</p>
                    </div>
                    <time className='shrink-0 font-lato text-xs text-[#6b7280]'>
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </time>
                  </div>
                ))
              ) : (
                <p className='p-5 text-center font-lato text-sm text-[#6b7280]'>No recent notifications.</p>
              )}
            </div>
            {recentNotifications.length > 3 && (
              <button className='flex h-9 items-center gap-1 border-t border-[#e8ecf0] px-[14px] font-lato text-xs text-[#6b7280]'>
                <ChevronDown size={11} /> Show {recentNotifications.length - 3} More
              </button>
            )}
            <div className='p-3'>
              <Link href='/dashboard/notifications' className='flex h-10 w-full items-center justify-center rounded-md bg-[#3fa344] font-lato text-sm font-bold text-white'>
                View All Activity
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
