<div align="center">

# 🦄 Unicorn Frontend

**Car Rental Management System — Next.js Frontend**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, responsive car rental web application built with Next.js 16, React 19, and Tailwind CSS v4.

</div>

---

## 📖 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Features](#-features)
- [API Integration](#-api-integration)

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Axios](https://axios-http.com/) | HTTP client for API calls |
| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Form handling and validation |
| [Recharts](https://recharts.org/) | Data visualization / charts |
| [Lucide React](https://lucide.dev/) + React Icons | Icon library |
| [React Hot Toast](https://react-hot-toast.com/) | Toast notifications |
| [Vitest](https://vitest.dev/) | Testing framework |

---

## 📂 Project Structure

```text
├── app/
│   ├── (auth)/                 # Authentication routes (login, register, forgot-password, reset-password)
│   ├── about-us/               # About page
│   ├── contact-us/             # Contact page
│   ├── checkout/               # Booking checkout & payment flow (success / cancel)
│   ├── dashboard/
│   │   ├── (admin)/            # Admin dashboard (bookings, vehicles, drivers, customers, reports, etc.)
│   │   ├── (client)/           # Client dashboard (my-bookings, profile, trip-management, etc.)
│   │   └── client/             # Client-specific layout pages
│   ├── manage-bookings/        # Booking management interface
│   ├── product/                # Vehicle listing / catalog
│   ├── product-details/        # Vehicle detail view
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles & Tailwind imports
├── components/                 # Reusable UI components
│   ├── dashboard/              # Admin & client dashboard components
│   ├── ui/                     # Shared UI primitives (Skeleton, etc.)
│   └── ...
├── lib/                        # Utility functions & API service classes
│   └── api/                    # Axios instances & backend service wrappers
├── hooks/                      # Custom React hooks
├── contexts/                   # React context providers
├── types/                      # Shared TypeScript type definitions
├── public/                     # Static assets (images, fonts, etc.)
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20.x
- **npm** >= 10.x (or `pnpm` / `yarn`)

### Installation

```bash
cd unicorn/frontend

# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file from the example:

```bash
cp .env.example .env.local
```

### Start Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend REST API base URL | `http://localhost:5000/api/v1` |
| `NEXT_PUBLIC_ASSET_BASE_URL` | Static asset / upload server URL | `http://localhost:5000` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL | `http://localhost:3000` |

> **Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript compiler (no emit) |
| `npm test` | Run Vitest tests |
| `npm run check` | Run lint + test + typecheck + build (CI) |

---

## ✨ Features

- **Authentication**: Login, register, password reset, email verification
- **Vehicle Browsing**: Search, filter, and view detailed vehicle listings
- **Booking Flow**: Multi-step checkout with Stripe payment integration
- **Client Dashboard**: Manage personal bookings, payments, documents, profile, and support tickets
- **Admin Dashboard**: Full admin panel for managing bookings, vehicles, drivers, locations, pricing, reports, customer support, and system settings
- **Real-time Charts**: Analytics and reporting powered by Recharts
- **Responsive Design**: Mobile-first layouts using Tailwind CSS v4
- **Form Validation**: Schema-driven forms with Zod and React Hook Form
- **Toast Notifications**: User feedback via React Hot Toast

---

## 🔌 API Integration

The frontend communicates with the Unicorn Backend via RESTful API endpoints.

- **Base URL**: Configured via `NEXT_PUBLIC_API_BASE_URL`
- **Authentication**: JWT-based (access token + refresh token) stored in HTTP-only cookies
- **API Services**: Located in `lib/api/` — organized service classes for each domain (auth, booking, vehicle, payment, etc.)

Example service structure:

```typescript
// lib/api/booking.service.ts
class BookingService {
  static async getAllBookings() { ... }
  static async getBookingById(id: string) { ... }
  static async updateBookingStatus(id: string, status: string) { ... }
}
```

---

<div align="center">

Built with ❤️ for the Unicorn Car Rental Platform

</div>
