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
    phone?: string;
    email?: string;
  };
  vehicle: string;
  pickupDate: string;
  dropoffDate: string;
  type: 'Chauffeur' | 'Self-drive';
  status: 'In Progress' | 'Completed' | 'Pending' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded' | 'Partial';
  amount: number;
}

export interface Driver {
  id: string;
  name: string;
  initials: string;
  phone: string;
  whatsapp: string;
  license: string;
  assignedVehicle: string;
  availability: 'Available' | 'On Duty' | 'Off Duty';
}

export interface Customer {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  totalBookings: number;
  status: 'Available' | 'Active' | 'Inactive';
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  type: 'Office' | 'Airport';
  status: 'Paid' | 'Pending' | 'Partial';
}

export interface Payment {
  id: string;
  bookingId: string;
  customerEmail: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Partial';
}

export interface PricingConfig {
  baseRates: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  serviceType: {
    selfDrive: number;
    chauffeur: number;
    seasonalMultiplier: number;
  };
  additionalCharges: {
    extraDay: number;
    lateReturn: number;
    securityDeposit: number;
    deliveryCollection: number;
    airportPickupDrop: number;
    extraMileage: number;
  };
  specialOffers: {
    discountPercentage: number;
    validUntil: string;
  };
}

export interface DropOffCharge {
  id: string;
  pickupLocation: string;
  dropOffLocation: string;
  vehicleCategory: string;
  vehicleCarType: string;
  chargeType: 'Fixed' | 'Per KM';
  amount: string;
  status: 'Paid' | 'Pending' | 'Partial';
}

export interface BookingTrend {
  month: string;
  bookings: number;
}

export interface RevenueGrowth {
  month: string;
  revenue: number;
}

export interface VehicleDistribution {
  category: string;
  count: number;
  color: string;
}

export interface ReportMetric {
  label: string;
  value: string | number;
}

export interface Notification {
  id: string;
  type: 'Booking' | 'Payment' | 'Rental' | 'Overdue';
  title: string;
  description: string;
  time: string;
}
