import { apiClient, extractErrorMessage } from "../api-client";

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
  bookingStatus:
    "PENDING" | "CONFIRMED" | "ONGOING" | "COMPLETED" | "CANCELLED";
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
  checkoutSessionId?: string | null;
  checkoutExpiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
  vehicle?: {
    id: string;
    name: string;
    plateNumber?: string;
    category?: string;
    images?: Array<{ id: string; path: string; order: number }>;
  };
  user?: {
    name: string;
    email: string;
  };
  pickupLocation?: {
    id: string;
    name: string;
    address?: string;
  };
  dropOffLocation?: {
    id: string;
    name: string;
    address?: string;
  };
  assignedDriver?: {
    id: string;
    name: string;
    phoneNumber: string;
    whatsappNumber: string;
    photoUrl?: string;
    availability: "AVAILABLE" | "ASSIGNED" | "UNAVAILABLE";
  };
  driverDetails?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export interface BookingModifyPayload {
  dropOffDate?: string;
  hasGps?: boolean;
  hasFullInsurance?: boolean;
  hasAdditionalDriver?: boolean;
  hasChildSeat?: boolean;
}

export interface BookingCheckoutResponse {
  booking: BookingResponse;
  checkout: {
    url: string;
    sessionId: string;
  };
}

// ── Service ───────────────────────────────────────────────────────────────────

export const BookingService = {
  /**
   * Calculate booking cost breakdown without creating a booking.
   * No auth required. Call this whenever dates or add-ons change.
   * POST /api/v1/bookings/calculate
   */
  calculate: async (
    payload: BookingCalculatePayload,
  ): Promise<BookingCalculateResponse> => {
    try {
      const response = await apiClient.post("/bookings/calculate", payload);
      return response.data.data;
    } catch (error) {
      throw new Error(
        extractErrorMessage(error, "Failed to calculate booking cost"),
      );
    }
  },

  /**
   * Confirm and create a booking. Auth required (JWT token auto-attached).
   * POST /api/v1/bookings
   */
  createBooking: async (
    payload: BookingCreatePayload,
  ): Promise<BookingResponse> => {
    try {
      const response = await apiClient.post("/bookings", payload);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Failed to create booking"));
    }
  },

  /** Create a provisional reservation and its required payment checkout together. */
  createCheckout: async (
    payload: BookingCreatePayload,
  ): Promise<BookingCheckoutResponse> => {
    try {
      const response = await apiClient.post("/bookings/checkout", payload);
      return response.data.data;
    } catch (error) {
      throw new Error(
        extractErrorMessage(error, "Failed to start booking checkout"),
      );
    }
  },

  /** Cancel an unpaid initial checkout and release the vehicle hold. */
  cancelCheckout: async (bookingId: string): Promise<void> => {
    try {
      await apiClient.post(`/bookings/${bookingId}/cancel-checkout`);
    } catch (error) {
      throw new Error(
        extractErrorMessage(error, "Failed to cancel booking checkout"),
      );
    }
  },

  /**
   * Fetch the current user's bookings. Auth required.
   * GET /api/v1/bookings/my-bookings
   */
  getMyBookings: async (params?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<BookingResponse[]> => {
    try {
      const response = await apiClient.get("/bookings/my-bookings", { params });
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Failed to fetch bookings"));
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
      throw new Error(extractErrorMessage(error, "Failed to fetch booking"));
    }
  },

  /** Modify a customer-owned booking. */
  modifyBooking: async (
    id: string,
    payload: BookingModifyPayload,
  ): Promise<BookingResponse> => {
    try {
      const response = await apiClient.patch(`/bookings/${id}/modify`, payload);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Failed to modify booking"));
    }
  },

  /**
   * Fetch all bookings. Admin only.
   * GET /api/v1/bookings
   */
  getAllBookings: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<BookingResponse[]> => {
    try {
      const response = await apiClient.get("/bookings", { params });
      return response.data.data;
    } catch (error) {
      throw new Error(
        extractErrorMessage(error, "Failed to fetch all bookings"),
      );
    }
  },

  /**
   * Update booking status. Admin only.
   * PATCH /api/v1/bookings/:id/status
   */
  updateBookingStatus: async (
    id: string,
    status: "PENDING" | "CONFIRMED" | "ONGOING" | "COMPLETED" | "CANCELLED",
    assignedDriverId?: string,
  ): Promise<BookingResponse> => {
    try {
      const response = await apiClient.patch(`/bookings/${id}/status`, {
        status,
        assignedDriverId,
      });
      return response.data.data;
    } catch (error) {
      throw new Error(
        extractErrorMessage(error, "Failed to update booking status"),
      );
    }
  },
};
