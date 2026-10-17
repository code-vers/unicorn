import { apiClient, extractErrorMessage } from '../api-client';

export interface PaymentRecord {
  id: string;
  amount: string;
  paymentMethod: 'MPESA' | 'AIRTEL' | 'CARD' | 'PESAPAL' | 'STRIPE' | 'PAYSTACK';
  provider: 'MANUAL' | 'STRIPE' | 'PAYSTACK';
  transactionId?: string | null;
  paymentStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED' | 'REVIEW_REQUIRED' | 'REFUND_PENDING';
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
  reference: string;
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

  reviewPayment: async (paymentId: string, action: 'CONFIRM' | 'REFUND'): Promise<PaymentRecord> => {
    try {
      const response = await apiClient.post('/payments/' + paymentId + '/review', { action });
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Unable to review payment'));
    }
  },

  getMyPayments: async (): Promise<PaymentRecord[]> => {
    try {
      const response = await apiClient.get('/payments/my-payments');
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Unable to load payment history'));
    }
  }
};
