# Dashboard Quick Reference

## 🚀 Quick Start

```bash
# Start development server
npm run dev

# Visit dashboard
http://localhost:3000/dashboard
```

## 📁 Key Directories

| Path                    | Purpose                 |
| ----------------------- | ----------------------- |
| `app/dashboard/`        | All dashboard pages     |
| `components/dashboard/` | Reusable components     |
| `lib/dashboard-*.ts`    | Data, config, utilities |
| `types/dashboard.ts`    | TypeScript definitions  |

## 🧩 Main Components

### Import Components

```typescript
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import VehicleChart from '@/components/dashboard/VehicleChart';
import PendingPayments from '@/components/dashboard/PendingPayments';
import RecentActivity from '@/components/dashboard/RecentActivity';
```

### Use Components

```typescript
<StatCard
  title="Total Revenue"
  value="$1,284K"
  change={12.5}
  icon={<DollarSign size={28} />}
  bgColor="bg-blue-100"
  textColor="text-blue-600"
/>

<RevenueChart data={revenueData} />

<VehicleChart data={vehicleStats} />

<PendingPayments payments={pendingPayments} />

<RecentActivity activities={activities} />
```

## 📊 Data Functions

```typescript
import {
  getDashboardMetrics,
  getRevenueData,
  getVehicleStats,
  getPendingPayments,
  getRecentActivity,
} from '@/lib/dashboard-data';

// Get all metrics
const metrics = getDashboardMetrics();

// Get specific data
const revenue = getRevenueData();
const vehicles = getVehicleStats();
const payments = getPendingPayments();
const activities = getRecentActivity();
```

## 🛠️ Utility Functions

```typescript
import {
  formatCurrency,
  formatNumber,
  getTimeAgo,
  calculateChange,
  getStatusColor,
  getInitials,
  truncateText,
  debounce,
  throttle,
} from '@/lib/dashboard-utils';

// Format currency
formatCurrency(1000); // "$1,000"

// Format number
formatNumber(1284000); // "1,284,000"

// Time formatting
getTimeAgo('2024-01-01'); // "5 days ago"

// Calculate percentage change
calculateChange(100, 50); // 100

// Get status color class
getStatusColor('new'); // "bg-green-100 text-green-700"

// Get initials
getInitials('John Doe'); // "JD"

// Truncate text
truncateText('Long text', 5); // "Lo..."
```

## ⚙️ Configuration

```typescript
import { DASHBOARD_CONFIG, API_ENDPOINTS } from '@/lib/dashboard-config';

// Use colors
DASHBOARD_CONFIG.COLORS.PRIMARY; // "#7C3AED"

// Use breakpoints
DASHBOARD_CONFIG.BREAKPOINTS.MD; // 768

// Use API endpoints
API_ENDPOINTS.METRICS; // "/api/dashboard/metrics"
```

## 📱 Responsive Breakpoints

| Breakpoint | Size   |
| ---------- | ------ |
| sm         | 640px  |
| md         | 768px  |
| lg         | 1024px |
| xl         | 1280px |
| xxl        | 1536px |

## 🎨 Color Palette

| Color     | Class           | Hex     |
| --------- | --------------- | ------- |
| Primary   | from-purple-600 | #7C3AED |
| Secondary | from-indigo-600 | #4F46E5 |
| Success   | from-green-500  | #10B981 |
| Warning   | from-orange-500 | #F59E0B |
| Danger    | from-red-500    | #EF4444 |

## 📝 Type Definitions

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

interface ActivityItem {
  id: string;
  type: 'booking' | 'payment' | 'driver' | 'service' | 'assignment';
  title: string;
  description: string;
  time: string;
  status?: 'new' | 'pending' | 'completed';
}
```

## 🔗 Routes

| Route                 | Page               |
| --------------------- | ------------------ |
| `/dashboard`          | Dashboard Overview |
| `/dashboard/bookings` | Booking Management |
| `/dashboard/fleet`    | Fleet Management   |
| `/dashboard/drivers`  | Driver Management  |
| `/dashboard/payments` | Payment Management |
| `/dashboard/settings` | Settings           |
| `/dashboard/activity` | Activity Feed      |

## 🔄 Replace Mock Data

In `lib/dashboard-data.ts`:

```typescript
export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
  try {
    const response = await fetch('/api/dashboard/metrics');
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  } catch (error) {
    console.error('Error:', error);
    // Return fallback data
    return {
      totalRevenue: 0,
      reservations: 0,
      upcomingRentals: 0,
      pendingArrivals: 0,
      activeVehicles: 0,
      completedToday: 0,
    };
  }
};
```

## 💡 Tips

1. **Conditional Rendering**: Use `isDashboard` in `components/shared/LayoutWrapper.tsx`
2. **Mobile Sidebar**: Automatically toggles on sm screens
3. **Type Safety**: Always define interfaces in `types/dashboard.ts`
4. **Error Handling**: Wrap async functions in try-catch
5. **Performance**: Use `debounce` for search/filter inputs

## 📚 Documentation Files

- `DASHBOARD.md` - Full feature documentation
- `DASHBOARD_SETUP.md` - Setup summary
- `DASHBOARD_QUICK_REFERENCE.md` - This file
- `lib/dashboard-config.ts` - Configuration constants

## ✨ Code Examples

### Create New Dashboard Page

```typescript
'use client';

import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default function NewPage() {
  return (
    <div className='flex h-screen bg-gray-50'>
      <DashboardSidebar />
      <div className='flex-1 overflow-auto md:ml-0'>
        <DashboardHeader completedToday={12} />
        <div className='p-6'>
          {/* Your content here */}
        </div>
      </div>
    </div>
  );
}
```

### Add New Stat Card

```typescript
<StatCard
  title="Custom Metric"
  value={12345}
  change={8.5}
  icon={<CustomIcon size={28} />}
  bgColor="bg-cyan-100"
  textColor="text-cyan-600"
/>
```

### Format Data Display

```typescript
const revenue = formatCurrency(1284000); // $1,284,000
const time = getTimeAgo('2024-06-01'); // 6 days ago
const initials = getInitials('Sarah Admin'); // SA
```

## 🐛 Troubleshooting

**Navbar/Footer appearing on dashboard?**

- Check `components/shared/LayoutWrapper.tsx` path detection

**Sidebar not toggling on mobile?**

- Ensure Tailwind classes `md:ml-0` are present

**Charts not rendering?**

- Verify recharts is installed: `npm list recharts`

**TypeScript errors?**

- Check type imports from `types/dashboard.ts`

## 📞 Support

For detailed documentation, see:

- `DASHBOARD.md` - Complete feature guide
- `lib/dashboard-config.ts` - Configuration reference
- `types/dashboard.ts` - Type definitions
