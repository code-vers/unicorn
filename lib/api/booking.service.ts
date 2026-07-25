import { apiClient, extractErrorMessage } from '../api-client';

// ── Request Payloads ──────────────────────────────────────────────────────────

export interface BookingCalculatePayload {
  vehicleId: string;
  pickupLocationId: string;
  dropOffLocationId: string;
  pickupDate: string;
  dropOffDate: string;
  hasGps?: boolean;
  hasFullInsurance?: boolean;
  hasAdditionalDriver?: boolean;
  hasChildSeat?: boolean;
}

export interface BookingDriverDetailPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  message?: string;
}

export interface BookingBillingInfoPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  zipCode?: string;
}

export interface BookingCreatePayload extends BookingCalculatePayload {
  driverDetails: BookingDriverDetailPayload;
  billingInfo: BookingBillingInfoPayload;
}

// ── Response Types ────────────────────────────────────────────────────────────

export interface BookingCalculateResponse {
  durationDays: number;
  rentalCost: number;
  pickupFee: number;
  dropOffFee: number;
  addonsCost: number;
  subtotal: number;
  taxPercentage: number;
  taxAmount: number;
  totalAmount: number;
}

export interface BookingResponse {
  id: string;
  referenceId: string;
  vehicleId: string;
  userId: string;
  pickupLocationId: string;
  dropOffLocationId: string;
  pickupDate: string;
  dropOffDate: string;
  rentalCost: string;
  pickupFee: string;
  dropOffFee: string;
  hasGps: boolean;
  hasFullInsurance: boolean;
  hasAdditionalDriver: boolean;
  hasChildSeat: boolean;
  addonsCost: string;
  taxPercentage: string;
  taxAmount: string;
  totalAmount: string;
  amountPaid: string;
  bookingStatus: 'PENDING' | 'CONFIRMED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  paymentStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  createdAt: string;
  updatedAt: string;
}

// ── Service ───────────────────────────────────────────────────────────────────

export const BookingService = {
  /**
   * Calculate booking cost breakdown without creating a booking.
   * No auth required. Call this whenever dates or add-ons change.
   * POST /api/v1/bookings/calculate
   */
  calculate: async (
    payload: BookingCalculatePayload
  ): Promise<BookingCalculateResponse> => {
    try {
      const response = await apiClient.post('/bookings/calculate', payload);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to calculate booking cost'));
    }
  },

  /**
   * Confirm and create a booking. Auth required (JWT token auto-attached).
   * POST /api/v1/bookings
   */
  createBooking: async (
    payload: BookingCreatePayload
  ): Promise<BookingResponse> => {
    try {
      const response = await apiClient.post('/bookings', payload);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to create booking'));
    }
  },

  /**
   * Fetch the current user's bookings. Auth required.
   * GET /api/v1/bookings/my-bookings
   */
  getMyBookings: async (): Promise<BookingResponse[]> => {
    try {
      const response = await apiClient.get('/bookings/my-bookings');
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch bookings'));
    }
  },

  /**
   * Get a single booking by ID. Auth required.
   * GET /api/v1/bookings/:id
   */
  getBookingById: async (id: string): Promise<BookingResponse> => {
    try {
      const response = await apiClient.get(`/bookings/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch booking'));
    }
  },
};
