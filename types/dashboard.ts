export interface StatCard {
  title: string;
  value: number | string;
  change: number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface RevenueData {
  date: string;
  revenue: number;
  expenses: number;
  net: number;
}

export interface VehicleStats {
  type: string;
  count: number;
  color: string;
}

export interface PendingPayment {
  id: string;
  name: string;
  amount: number;
  daysOverdue: number;
  initials: string;
  avatarColor: string;
}

export interface ActivityItem {
  id: string;
  type: 'booking' | 'payment' | 'driver' | 'service' | 'assignment';
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  status?: 'new' | 'pending' | 'completed';
}

export interface DashboardMetrics {
  totalRevenue: number;
  reservations: number;
  upcomingRentals: number;
  pendingArrivals: number;
  activeVehicles: number;
  completedToday: number;
}

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  brand: string;
  year: number;
  transmission: 'Automatic' | 'Manual';
  seating: number;
  dailyRate: number;
  availability: 'Available' | 'Rented';
  location: string;
}

export interface TodayAtGlance {
  revenue: number;
  revenueChange: number;
  newBookings: number;
  pendingActions: number;
}

export interface PerformanceScore {
  score: number;
  reviewsCount: number;
  rating: number;
}

export interface RecentBooking {
  id: string;
  customer: {
    name: string;
    id: string;
    initials: string;
    avatarColor: string;
  };
  vehicle: string;
  pickupDate: string;
  dropoffDate: string;
  type: 'Chauffeur' | 'Self-drive';
  status: 'In Progress' | 'Completed' | 'Pending' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  amount: number;
}
