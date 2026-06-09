// Dashboard Configuration Constants
export const DASHBOARD_CONFIG = {
  SIDEBAR: {
    WIDTH: '16rem', // 256px
    COLLAPSED_WIDTH: '0',
  },
  COLORS: {
    PRIMARY: '#7C3AED', // purple-600
    SECONDARY: '#4F46E5', // indigo-600
    SUCCESS: '#10B981',
    WARNING: '#F59E0B',
    DANGER: '#EF4444',
    INFO: '#06B6D4',
  },
  STAT_CARD_BG: {
    BLUE: 'bg-blue-100',
    ORANGE: 'bg-orange-100',
    YELLOW: 'bg-yellow-100',
    PURPLE: 'bg-purple-100',
    TEAL: 'bg-teal-100',
    GREEN: 'bg-green-100',
  },
  STAT_CARD_TEXT: {
    BLUE: 'text-blue-600',
    ORANGE: 'text-orange-600',
    YELLOW: 'text-yellow-600',
    PURPLE: 'text-purple-600',
    TEAL: 'text-teal-600',
    GREEN: 'text-green-600',
  },
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536,
  },
};

export const DASHBOARD_NAVIGATION = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    id: 'bookings',
    label: 'Booking Management',
    href: '/dashboard/bookings',
    icon: 'BookOpen',
    badge: true,
  },
  {
    id: 'vehicles',
    label: 'Vehicle Management',
    href: '/dashboard/vehicles',
    icon: 'Car',
  },
  {
    id: 'drivers',
    label: 'Driver Management',
    href: '/dashboard/drivers',
    icon: 'Users',
  },
  {
    id: 'payments',
    label: 'Payment Management',
    href: '/dashboard/payments',
    icon: 'CreditCard',
  },
];

export const CHART_COLORS = {
  REVENUE: '#10B981',
  EXPENSES: '#EF4444',
  NET: '#6366F1',
  VEHICLE_1: '#10B981',
  VEHICLE_2: '#F59E0B',
  VEHICLE_3: '#EC4899',
  VEHICLE_4: '#1F2937',
};

export const MOCK_DATA_REFRESH_INTERVAL = 60000; // 1 minute

export const DASHBOARD_ROUTES = {
  ROOT: '/dashboard',
  BOOKINGS: '/dashboard/bookings',
  VEHICLES: '/dashboard/vehicles',
  DRIVERS: '/dashboard/drivers',
  PAYMENTS: '/dashboard/payments',
  SETTINGS: '/dashboard/settings',
  ACTIVITY: '/dashboard/activity',
};

export const API_ENDPOINTS = {
  METRICS: '/api/dashboard/metrics',
  REVENUE: '/api/dashboard/revenue',
  VEHICLES: '/api/dashboard/vehicles',
  PAYMENTS: '/api/dashboard/payments',
  ACTIVITY: '/api/dashboard/activity',
};
