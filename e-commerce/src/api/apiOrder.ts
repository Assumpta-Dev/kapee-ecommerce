import apiClient from './apiClient';

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  specs: string[];
  quantity: number;
  price: number;
}

export interface OrderData {
  _id?: string;
  orderNumber: string;
  customerId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  subtotal: number;
  discount: number;
  shipping: number;
  insurance: number;
  tax: number;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  shippingMethod: string;
  trackingNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const orderAPI = {
  getAll: async () => {
    const response = await apiClient.get('/orders');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  create: async (data: Partial<OrderData>) => {
    const response = await apiClient.post('/orders', data);
    return response.data;
  },

  update: async (id: string, data: Partial<OrderData>) => {
    const response = await apiClient.put(`/orders/${id}`, data);
    return response.data;
  },

  updateStatus: async (id: string, status: OrderData['status']) => {
    const response = await apiClient.patch(`/orders/${id}/status`, { status });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/orders/${id}`);
    return response.data;
  }
};
