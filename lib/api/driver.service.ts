import { apiClient, extractErrorMessage } from '../api-client';

export interface DriverResponse {
  id: string;
  name: string;
  phoneNumber: string;
  whatsappNumber: string;
  photoUrl: string | null;
  licensePhotoUrl: string | null;
  licenseDetails: string | null;
  availability: 'AVAILABLE' | 'ASSIGNED' | 'UNAVAILABLE';
  notes: string | null;
  assignedVehicleId: string | null;
  assignedVehicle?: {
    id: string;
    name: string;
    brand: string;
    category: string;
  };
  bookings?: Array<{
    id: string;
    bookingStatus: string;
    pickupDate: string;
    dropOffDate: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface DriverQuery {
  page?: number;
  limit?: number;
  searchTerm?: string;
  availability?: string;
}

export const DriverService = {
  getDrivers: async (query?: DriverQuery) => {
    const params = new URLSearchParams();
    if (query?.page) params.append('page', query.page.toString());
    if (query?.limit) params.append('limit', query.limit.toString());
    if (query?.searchTerm) params.append('searchTerm', query.searchTerm);
    if (query?.availability) params.append('availability', query.availability);

    try {
      const response = await apiClient.get(`/drivers?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch drivers'));
    }
  },

  getDriverById: async (id: string) => {
    try {
      const response = await apiClient.get(`/drivers/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to fetch driver details'));
    }
  },

  createDriver: async (formData: FormData) => {
    try {
      const response = await apiClient.post('/drivers', formData);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to create driver'));
    }
  },

  updateDriver: async (id: string, formData: FormData) => {
    try {
      const response = await apiClient.patch(`/drivers/${id}`, formData);
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to update driver'));
    }
  },

  updateAvailability: async (id: string, availability: string) => {
    try {
      const response = await apiClient.patch(`/drivers/${id}/availability`, { availability });
      return response.data.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to update driver availability'));
    }
  },

  deleteDriver: async (idOrIds: string | string[]) => {
    try {
      const response = await apiClient.delete(Array.isArray(idOrIds) ? '/drivers/bulk' : `/drivers/${idOrIds}`, {
        data: Array.isArray(idOrIds) ? idOrIds : undefined,
      });
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to delete driver(s)'));
    }
  }
};
