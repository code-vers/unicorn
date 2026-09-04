import { apiClient, extractErrorMessage } from '../api-client';

export interface PaymentRecord {
  id: string;
  amount: string;
  paymentMethod: 'MPESA' | 'AIRTEL' | 'CARD' | 'PESAPAL' | 'STRIPE';
  transactionId?: string;
  paymentStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  paymentType: string;
  createdAt: string;
  booking: {
    id: string;
    referenceId: string;
    totalAmount: string;
    amountPaid: string;
    vehicle: { name: string };
  };
}

interface CheckoutSession {
  url: string;
  sessionId: string;
}

const createSession = async (path: string, bookingId: string): Promise<CheckoutSession> => {
  try {
    const response = await apiClient.post(path, { bookingId });
    return response.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Unable to start secure checkout'));
  }
};

export const PaymentService = {
  createExtensionSession: (bookingId: string) =>
    createSession('/payments/create-extension-session', bookingId),

  getMyPayments: async (): Promise<PaymentRecord[]> => {
    try {
      const response = await apiClient.get('/payments/my-payments');
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Unable to load payment history'));
    }
  }
};
