# Dashboard Documentation

## Overview

A production-grade dashboard system for the Unicorn car rental platform built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Recharts.

## Project Structure

```
dashboard/
├── app/
│   └── dashboard/
│       ├── layout.tsx              # Dashboard layout wrapper
│       ├── page.tsx                # Main dashboard page
│       ├── activity/page.tsx       # Activity feed page
│       ├── bookings/page.tsx       # Booking management
│       ├── fleet/page.tsx          # Fleet management
│       ├── drivers/page.tsx        # Driver management
│       ├── payments/page.tsx       # Payment management
│       └── settings/page.tsx       # Settings page
│
├── components/dashboard/
│   ├── DashboardSidebar.tsx        # Navigation sidebar
│   ├── DashboardHeader.tsx         # Top header with controls
│   ├── StatCard.tsx                # Statistics card component
│   ├── RevenueChart.tsx            # Revenue chart visualization
│   ├── VehicleChart.tsx            # Vehicle distribution pie chart
│   ├── PendingPayments.tsx         # Pending payments section
│   └── RecentActivity.tsx          # Recent activity feed
│
├── lib/
│   ├── dashboard-data.ts           # Mock data and API functions
│   ├── dashboard-config.ts         # Configuration constants
│   └── dashboard-utils.ts          # Utility functions
│
└── types/
    └── dashboard.ts                # TypeScript type definitions
```

## Components

### DashboardSidebar

Navigation sidebar with:

- Logo and branding
- Main navigation items with icons
- Badge support for notifications
- User profile section
- Mobile responsive toggle

**Props:** None
**Features:**

- Active route highlighting
- Badge support for menu items
- Mobile hamburger menu
- User profile dropdown
- Logout button

### StatCard

Displays key metrics with trends.

**Props:**

```typescript
interface StatCardProps {
  title: string;
  value: number | string;
  change: number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}
```

### RevenueChart

Bar chart showing revenue vs expenses trend.

**Props:**

```typescript
interface RevenueChartProps {
  data: RevenueData[];
}
```

### VehicleChart

Pie chart displaying vehicle distribution.

**Props:**

```typescript
interface VehicleChartProps {
  data: VehicleStats[];
}
```

### PendingPayments

List of overdue payments with total summary.

**Props:**

```typescript
interface PendingPaymentsProps {
  payments: PendingPayment[];
}
```

### RecentActivity

Activity feed with different activity types and statuses.

**Props:**

```typescript
interface RecentActivityProps {
  activities: ActivityItem[];
}
```

## Types

```typescript
interface DashboardMetrics {
  totalRevenue: number;
  reservations: number;
  upcomingRentals: number;
  pendingArrivals: number;
  activeVehicles: number;
  completedToday: number;
}

interface StatCard {
  title: string;
  value: number | string;
  change: number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

interface RevenueData {
  date: string;
  revenue: number;
  expenses: number;
  net: number;
}

interface VehicleStats {
  type: string;
  count: number;
  color: string;
}

interface PendingPayment {
  id: string;
  name: string;
  amount: number;
  daysOverdue: number;
  initials: string;
  avatarColor: string;
}

interface ActivityItem {
  id: string;
  type: 'booking' | 'payment' | 'driver' | 'service' | 'assignment';
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  status?: 'new' | 'pending' | 'completed';
}
```

## Data Functions

All data functions are in `lib/dashboard-data.ts`:

- `getDashboardMetrics()` - Get main dashboard metrics
- `getRevenueData()` - Get revenue trend data
- `getVehicleStats()` - Get vehicle distribution data
- `getPendingPayments()` - Get overdue payments list
- `getRecentActivity()` - Get recent activity items

## Utility Functions

In `lib/dashboard-utils.ts`:

- `formatCurrency(value)` - Format number as currency
- `formatNumber(value)` - Format number with locale
- `formatPercentage(value, decimals)` - Format as percentage
- `getTimeAgo(date)` - Get human-readable time difference
- `truncateText(text, length)` - Truncate long text
- `getInitials(name)` - Get name initials
- `calculateChange(current, previous)` - Calculate percentage change
- `getStatusColor(status)` - Get status badge color
- `getAvatarColor(index)` - Get avatar background color
- `debounce(func, wait)` - Debounce function calls
- `throttle(func, limit)` - Throttle function calls

## Styling

The dashboard uses:

- **Tailwind CSS** for utility-based styling
- **Responsive Design** with mobile-first approach
- **Color Scheme:**
  - Primary: Purple (#7C3AED)
  - Secondary: Indigo (#4F46E5)
  - Success: Green (#10B981)
  - Warning: Orange (#F59E0B)
  - Danger: Red (#EF4444)

## Routes

- `/dashboard` - Main dashboard overview
- `/dashboard/bookings` - Booking management
- `/dashboard/fleet` - Fleet management
- `/dashboard/drivers` - Driver management
- `/dashboard/payments` - Payment management
- `/dashboard/settings` - Settings
- `/dashboard/activity` - Activity feed

## Integration

### Adding to Your Project

1. **Import Components:**

```typescript
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import StatCard from '@/components/dashboard/StatCard';
```

2. **Use Data Functions:**

```typescript
import { getDashboardMetrics, getRevenueData } from '@/lib/dashboard-data';

const metrics = getDashboardMetrics();
const revenueData = getRevenueData();
```

3. **Use Utilities:**

```typescript
import { formatCurrency, getTimeAgo } from '@/lib/dashboard-utils';

const price = formatCurrency(1000); // $1,000
const time = getTimeAgo('2024-01-01'); // 5 days ago
```

## API Integration (Future)

To connect real API:

1. Update `lib/dashboard-data.ts` functions to call actual API endpoints:

```typescript
export const getDashboardMetrics = async () => {
  const response = await fetch('/api/dashboard/metrics');
  return response.json();
};
```

2. Add API endpoints defined in `lib/dashboard-config.ts`:

```typescript
const API_ENDPOINTS = {
  METRICS: '/api/dashboard/metrics',
  REVENUE: '/api/dashboard/revenue',
  // ... etc
};
```

## Performance Optimization

- **Code Splitting:** Each dashboard page is lazy loaded
- **Image Optimization:** Uses Next.js Image component
- **Caching:** Implement API caching with SWR or React Query
- **Charts:** Recharts optimized for performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- `next@16.2.4`
- `react@19.2.4`
- `tailwindcss@4`
- `lucide-react@1.11.0`
- `recharts@2.12.4`

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Future Enhancements

- [ ] Real-time data updates with WebSockets
- [ ] Advanced filtering and search
- [ ] Export reports (PDF, Excel)
- [ ] User role-based access control
- [ ] Dark mode support
- [ ] Data pagination and infinite scroll
- [ ] Custom date range selection
- [ ] Notification system
- [ ] Settings management
- [ ] Analytics and insights

## Notes

- Mock data is used for development. Replace with actual API calls.
- Ensure proper error handling in data fetching functions.
- Add loading and error states to all data-dependent components.
- Implement proper authentication and authorization checks.
