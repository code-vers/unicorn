import {
  DashboardMetrics,
  PendingPayment,
  RevenueData,
  VehicleStats,
  TodayAtGlance,
  PerformanceScore,
  RecentBooking,
  Driver,
  Customer,
  Location,
  Payment,
  PricingConfig,
  DropOffCharge,
  BookingTrend,
  RevenueGrowth,
  VehicleDistribution,
  ReportMetric,
  Notification,
} from '@/types/dashboard';

// ... (existing functions)

export const getNotifications = (): Notification[] => {
  return [
    {
      id: '1',
      type: 'Booking',
      title: 'Booking',
      description: 'New booking request from John Doe',
      time: '5 minutes ago',
    },
    {
      id: '2',
      type: 'Payment',
      title: 'Payment',
      description: 'Payment received for booking #1234',
      time: '5 minutes ago',
    },
    {
      id: '3',
      type: 'Rental',
      title: 'Rental',
      description: 'Payment received for booking #1234',
      time: '5 minutes ago',
    },
    {
      id: '4',
      type: 'Overdue',
      title: 'Overdue',
      description: 'Overdue rental: Honda Accord - Jane Smith',
      time: '5 minutes ago',
    },
  ];
};

export const getDashboardMetrics = (): DashboardMetrics => {
  return {
    totalRevenue: 754000,
    reservations: 3285,
    upcomingRentals: 89,
    pendingArrivals: 62,
    activeVehicles: 94,
    completedToday: 8,
  };
};

export const getRevenueData = (): RevenueData[] => {
  return [
    { date: 'Jan', revenue: 42000, expenses: 28000, net: 14000 },
    { date: 'Feb', revenue: 38000, expenses: 25000, net: 13000 },
    { date: 'Mar', revenue: 52000, expenses: 31000, net: 21000 },
    { date: 'Apr', revenue: 48000, expenses: 29000, net: 19000 },
    { date: 'May', revenue: 62000, expenses: 38000, net: 24000 },
    { date: 'Jun', revenue: 58000, expenses: 35000, net: 23000 },
    { date: 'Jul', revenue: 72000, expenses: 43000, net: 29000 },
    { date: 'Aug', revenue: 68000, expenses: 40000, net: 28000 },
    { date: 'Sep', revenue: 56000, expenses: 34000, net: 22000 },
    { date: 'Oct', revenue: 78000, expenses: 45000, net: 33000 },
    { date: 'Nov', revenue: 82000, expenses: 47000, net: 35000 },
    { date: 'Dec', revenue: 95000, expenses: 52000, net: 43000 },
  ];
};

export const getVehicleStats = (): VehicleStats[] => {
  return [
    { type: 'Toyota Camry', count: 45, color: '#3FA34D' },
    { type: 'Honda Accord', count: 38, color: '#FF7815' },
    { type: 'Mercedes C-Class', count: 32, color: '#FFB800' },
    { type: 'BMW 3 Series', count: 28, color: '#F6F6F6' },
    { type: 'Audi A4', count: 25, color: '#0A1413' },
  ];
};

export const getPendingPayments = (): PendingPayment[] => {
  return [
    {
      id: 'INV-2411',
      name: 'James Okafor',
      amount: 1240,
      daysOverdue: 3,
      initials: 'JO',
      avatarColor: '#EBF7ED',
    },
    {
      id: 'INV-2408',
      name: 'Amira Diallo',
      amount: 890,
      daysOverdue: 5,
      initials: 'AD',
      avatarColor: '#EBF7ED',
    },
    {
      id: 'INV-2405',
      name: 'Sophie Turner',
      amount: 2100,
      daysOverdue: 9,
      initials: 'ST',
      avatarColor: '#FFF3E8',
    },
    {
      id: 'INV-2401',
      name: 'Felix Mensah',
      amount: 650,
      daysOverdue: 14,
      initials: 'FM',
      avatarColor: '#FFF3E8',
    },
  ];
};

export const getRecentActivity = () => {
  return [
    {
      id: '1',
      type: 'booking' as const,
      title: 'New Booking',
      description: 'Oliver Chen — BMW 5 Series · Self-Drive',
      time: '2 min ago',
      status: 'new' as const,
    },
    {
      id: '2',
      type: 'driver' as const,
      title: 'Driver Assigned',
      description: 'Mike Asante assigned to BK-4021',
      time: '18 min ago',
      status: 'completed' as const,
    },
    {
      id: '3',
      type: 'payment' as const,
      title: 'Payment Overdue',
      description: 'Amira Diallo · INV-2408 · £890',
      time: '1 hr ago',
      status: 'pending' as const,
    },
    {
      id: '4',
      type: 'booking' as const,
      title: 'Booking Completed',
      description: 'Felix Mensah — Ford Explorer returned',
      time: '2 hr ago',
      status: 'completed' as const,
    },
    {
      id: '5',
      type: 'assignment' as const,
      title: 'Service Alert',
      description: 'Toyota Camry (LT21 ABC) — service due',
      time: '3 hr ago',
      status: 'pending' as const,
    },
  ];
};

export const getTodayAtGlance = (): TodayAtGlance => {
  return {
    revenue: 3840,
    revenueChange: 12,
    newBookings: 12,
    pendingActions: 5,
  };
};

export const getPerformanceScore = (): PerformanceScore => {
  return {
    score: 94.2,
    reviewsCount: 284,
    rating: 4.7,
  };
};

export const getRecentBookings = (): RecentBooking[] => {
  return [
    {
      id: '#1001',
      customer: { 
        name: 'John Doe', 
        id: '#1001', 
        initials: 'JD', 
        avatarColor: '#EBF7ED',
        phone: '+254 712 345 678',
        email: 'john@example.com'
      },
      vehicle: 'Toyota Camry',
      pickupDate: '2026-05-20',
      dropoffDate: '2026-05-25',
      type: 'Self-drive',
      status: 'Completed',
      paymentStatus: 'Paid',
      amount: 250,
    },
    {
      id: '#1002',
      customer: { 
        name: 'John Doe', 
        id: '#1002', 
        initials: 'JD', 
        avatarColor: '#FFF3E8',
        phone: '+254 712 345 678',
        email: 'john@example.com'
      },
      vehicle: 'Toyota Camry',
      pickupDate: '2026-05-20',
      dropoffDate: '2026-05-25',
      type: 'Chauffeur',
      status: 'Completed',
      paymentStatus: 'Paid',
      amount: 250,
    },
    {
      id: '#1003',
      customer: { 
        name: 'John Doe', 
        id: '#1003', 
        initials: 'JD', 
        avatarColor: '#EBE9F5',
        phone: '+254 712 345 678',
        email: 'john@example.com'
      },
      vehicle: 'Toyota Camry',
      pickupDate: '2026-05-20',
      dropoffDate: '2026-05-25',
      type: 'Self-drive',
      status: 'Pending',
      paymentStatus: 'Pending',
      amount: 250,
    },
    {
      id: '#1004',
      customer: { 
        name: 'John Doe', 
        id: '#1004', 
        initials: 'JD', 
        avatarColor: '#E0F7FF',
        phone: '+254 712 345 678',
        email: 'john@example.com'
      },
      vehicle: 'Toyota Camry',
      pickupDate: '2026-05-20',
      dropoffDate: '2026-05-25',
      type: 'Self-drive',
      status: 'Pending',
      paymentStatus: 'Paid',
      amount: 250,
    },
    {
      id: '#1005',
      customer: { 
        name: 'John Doe', 
        id: '#1005', 
        initials: 'JD', 
        avatarColor: '#FFF9E0',
        phone: '+254 712 345 678',
        email: 'john@example.com'
      },
      vehicle: 'Toyota Camry',
      pickupDate: '2026-05-20',
      dropoffDate: '2026-05-25',
      type: 'Chauffeur',
      status: 'Completed',
      paymentStatus: 'Pending',
      amount: 250,
    },
    {
      id: '#1006',
      customer: { 
        name: 'John Doe', 
        id: '#1006', 
        initials: 'JD', 
        avatarColor: '#FFF0F0',
        phone: '+254 712 345 678',
        email: 'john@example.com'
      },
      vehicle: 'Toyota Camry',
      pickupDate: '2026-05-20',
      dropoffDate: '2026-05-25',
      type: 'Chauffeur',
      status: 'Pending',
      paymentStatus: 'Partial',
      amount: 250,
    },
    {
      id: '#1007',
      customer: { 
        name: 'John Doe', 
        id: '#1007', 
        initials: 'JD', 
        avatarColor: '#EBF7ED',
        phone: '+254 712 345 678',
        email: 'john@example.com'
      },
      vehicle: 'Toyota Camry',
      pickupDate: '2026-05-20',
      dropoffDate: '2026-05-25',
      type: 'Chauffeur',
      status: 'Completed',
      paymentStatus: 'Pending',
      amount: 250,
    },
  ];
};

export const getDrivers = (): Driver[] => {
  return [
    {
      id: '1',
      name: 'James Kamau',
      initials: 'JK',
      phone: '+254 712 345 678',
      whatsapp: '+254 712 345 678',
      license: 'DL-123456',
      assignedVehicle: 'Mercedes C-Class',
      availability: 'Available',
    },
    {
      id: '2',
      name: 'James Kamau',
      initials: 'JK',
      phone: '+254 712 345 678',
      whatsapp: '+254 712 345 678',
      license: 'DL-123456',
      assignedVehicle: 'Mercedes C-Class',
      availability: 'Available',
    },
    {
      id: '3',
      name: 'James Kamau',
      initials: 'JK',
      phone: '+254 712 345 678',
      whatsapp: '+254 712 345 678',
      license: 'DL-123456',
      assignedVehicle: 'Toyota Camry',
      availability: 'On Duty',
    },
    {
      id: '4',
      name: 'James Kamau',
      initials: 'JK',
      phone: '+254 712 345 678',
      whatsapp: '+254 712 345 678',
      license: 'DL-123456',
      assignedVehicle: 'Mercedes C-Class',
      availability: 'Available',
    },
    {
      id: '5',
      name: 'James Kamau',
      initials: 'JK',
      phone: '+254 712 345 678',
      whatsapp: '+254 712 345 678',
      license: 'DL-123456',
      assignedVehicle: 'Mercedes C-Class',
      availability: 'Available',
    },
    {
      id: '6',
      name: 'James Kamau',
      initials: 'JK',
      phone: '+254 712 345 678',
      whatsapp: '+254 712 345 678',
      license: 'DL-123456',
      assignedVehicle: 'Toyota Camry',
      availability: 'On Duty',
    },
    {
      id: '7',
      name: 'James Kamau',
      initials: 'JK',
      phone: '+254 712 345 678',
      whatsapp: '+254 712 345 678',
      license: 'DL-123456',
      assignedVehicle: 'Toyota Camry',
      availability: 'On Duty',
    },
  ];
};

export const getCustomers = (): Customer[] => {
  return [
    {
      id: '1',
      name: 'John Doe',
      initials: 'JD',
      email: 'john@example.com',
      phone: '+254 712 345 678',
      totalBookings: 5,
      status: 'Available',
    },
    {
      id: '2',
      name: 'John Doe',
      initials: 'JD',
      email: 'john@example.com',
      phone: '+254 712 345 678',
      totalBookings: 3,
      status: 'Available',
    },
    {
      id: '3',
      name: 'John Doe',
      initials: 'JD',
      email: 'john@example.com',
      phone: '+254 712 345 678',
      totalBookings: 2,
      status: 'Available',
    },
    {
      id: '4',
      name: 'John Doe',
      initials: 'JD',
      email: 'john@example.com',
      phone: '+254 712 345 678',
      totalBookings: 5,
      status: 'Available',
    },
    {
      id: '5',
      name: 'John Doe',
      initials: 'JD',
      email: 'john@example.com',
      phone: '+254 712 345 678',
      totalBookings: 3,
      status: 'Available',
    },
    {
      id: '6',
      name: 'John Doe',
      initials: 'JD',
      email: 'john@example.com',
      phone: '+254 712 345 678',
      totalBookings: 3,
      status: 'Available',
    },
    {
      id: '7',
      name: 'John Doe',
      initials: 'JD',
      email: 'john@example.com',
      phone: '+254 712 345 678',
      totalBookings: 2,
      status: 'Available',
    },
  ];
};

export const getLocations = (): Location[] => {
  return [
    {
      id: '1',
      name: 'Nairobi Office',
      address: '66 Muthithi Road',
      city: 'Nairobi',
      type: 'Office',
      status: 'Paid',
    },
    {
      id: '2',
      name: 'Jomo Kenyatta Airport',
      address: 'Kisumu',
      city: 'Mombasa',
      type: 'Office',
      status: 'Paid',
    },
    {
      id: '3',
      name: 'Mombasa Airport',
      address: 'Mombasa',
      city: 'Nairobi',
      type: 'Office',
      status: 'Pending',
    },
    {
      id: '4',
      name: 'Kisumu Airport',
      address: 'Kisumu',
      city: 'Nairobi',
      type: 'Airport',
      status: 'Pending',
    },
    {
      id: '5',
      name: 'Mombasa Airport',
      address: '66 Muthithi Road',
      city: 'Kisumu',
      type: 'Airport',
      status: 'Paid',
    },
    {
      id: '6',
      name: 'Jomo Kenyatta Airport',
      address: '66 Muthithi Road',
      city: 'Kisumu',
      type: 'Airport',
      status: 'Paid',
    },
    {
      id: '7',
      name: 'Kisumu Airport',
      address: 'Mombasa',
      city: 'Mombasa',
      type: 'Office',
      status: 'Partial',
    },
  ];
};

export const getPayments = (): Payment[] => {
  return [
    {
      id: '1',
      bookingId: '#1001',
      customerEmail: 'john@example.com',
      invoiceNumber: '+254 712 345 678',
      date: '2026-05-15',
      amount: 250,
      status: 'Paid',
    },
    {
      id: '2',
      bookingId: '#1002',
      customerEmail: 'john@example.com',
      invoiceNumber: '+254 712 345 678',
      date: '2026-05-15',
      amount: 400,
      status: 'Paid',
    },
    {
      id: '3',
      bookingId: '#1001',
      customerEmail: 'john@example.com',
      invoiceNumber: '+254 712 345 678',
      date: '2026-05-15',
      amount: 250,
      status: 'Pending',
    },
    {
      id: '4',
      bookingId: '#1002',
      customerEmail: 'john@example.com',
      invoiceNumber: '+254 712 345 678',
      date: '2026-05-15',
      amount: 400,
      status: 'Pending',
    },
    {
      id: '5',
      bookingId: '#1001',
      customerEmail: 'john@example.com',
      invoiceNumber: '+254 712 345 678',
      date: '2026-05-15',
      amount: 840,
      status: 'Paid',
    },
    {
      id: '6',
      bookingId: '#1002',
      customerEmail: 'john@example.com',
      invoiceNumber: '+254 712 345 678',
      date: '2026-05-15',
      amount: 250,
      status: 'Paid',
    },
    {
      id: '7',
      bookingId: '#1001',
      customerEmail: 'john@example.com',
      invoiceNumber: '+254 712 345 678',
      date: '2026-05-15',
      amount: 840,
      status: 'Partial',
    },
  ];
};

export const getPricingConfig = (): PricingConfig => {
  return {
    baseRates: {
      daily: 50,
      weekly: 300,
      monthly: 1000,
    },
    serviceType: {
      selfDrive: 50,
      chauffeur: 80,
      seasonalMultiplier: 1.5,
    },
    additionalCharges: {
      extraDay: 45,
      lateReturn: 10,
      securityDeposit: 200,
      deliveryCollection: 25,
      airportPickupDrop: 30,
      extraMileage: 0.5,
    },
    specialOffers: {
      discountPercentage: 10,
      validUntil: '2026-12-31',
    },
  };
};

export const getDropOffCharges = (): DropOffCharge[] => {
  return [
    {
      id: '1',
      pickupLocation: 'Nairobi Airport',
      dropOffLocation: 'Mombasa Airport',
      vehicleCategory: 'Sedan',
      vehicleCarType: 'Toyota Axio',
      chargeType: 'Fixed',
      amount: 'KES 5,000',
      status: 'Paid',
    },
    {
      id: '2',
      pickupLocation: 'Nairobi Airport',
      dropOffLocation: 'Jomo Kenyatta Airport',
      vehicleCategory: 'SUV',
      vehicleCarType: 'Prado',
      chargeType: 'Fixed',
      amount: 'KES 10,000',
      status: 'Paid',
    },
    {
      id: '3',
      pickupLocation: 'Nairobi Airport',
      dropOffLocation: 'Jomo Kenyatta Airport',
      vehicleCategory: 'Sedan',
      vehicleCarType: 'Land Cruiser',
      chargeType: 'Fixed',
      amount: 'KES 0.5/km',
      status: 'Pending',
    },
    {
      id: '4',
      pickupLocation: 'Nairobi Airport',
      dropOffLocation: 'Kisumu Airport',
      vehicleCategory: 'SUV',
      vehicleCarType: 'Land Cruiser',
      chargeType: 'Fixed',
      amount: 'KES 5,000',
      status: 'Pending',
    },
    {
      id: '5',
      pickupLocation: 'Nairobi Airport',
      dropOffLocation: 'Mombasa Airport',
      vehicleCategory: 'Sedan',
      vehicleCarType: 'Toyota Axio',
      chargeType: 'Fixed',
      amount: 'KES 0.5/km',
      status: 'Paid',
    },
    {
      id: '6',
      pickupLocation: 'Nairobi Airport',
      dropOffLocation: 'Jomo Kenyatta Airport',
      vehicleCategory: 'Sedan',
      vehicleCarType: 'All Sedans',
      chargeType: 'Fixed',
      amount: 'KES 0.5/km',
      status: 'Paid',
    },
    {
      id: '7',
      pickupLocation: 'Nairobi Airport',
      dropOffLocation: 'Mombasa Airport',
      vehicleCategory: 'SUV',
      vehicleCarType: 'Toyota Axio',
      chargeType: 'Fixed',
      amount: 'KES 2,500',
      status: 'Partial',
    },
  ];
};

export const getBookingTrends = (): BookingTrend[] => {
  return [
    { month: 'Jan', bookings: 45 },
    { month: 'Feb', bookings: 52 },
    { month: 'Mar', bookings: 48 },
    { month: 'Apr', bookings: 60 },
    { month: 'May', bookings: 55 },
    { month: 'Jun', bookings: 65 },
  ];
};

export const getRevenueGrowth = (): RevenueGrowth[] => {
  return [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 62000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 68000 },
  ];
};

export const getVehicleDistribution = (): VehicleDistribution[] => {
  return [
    { category: 'Sedan', count: 40, color: '#3FA34D' },
    { category: 'SUV', count: 30, color: '#FF7815' },
    { category: 'Luxury', count: 20, color: '#FFB800' },
    { category: 'Van', count: 10, color: '#9CA3AF' },
  ];
};

export const getReportMetrics = (): ReportMetric[] => {
  return [
    { label: 'Average Booking Value', value: '$328' },
    { label: 'Customer Retention Rate', value: '78%' },
    { label: 'Fleet Utilization', value: '85%' },
  ];
};
