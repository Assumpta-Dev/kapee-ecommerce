import apiClient from './apiClient';

export interface ProductData {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  quantity: number;
  images?: FileList;
}

export const productAPI = {
  getAll: async () => {
    const response = await apiClient.get('/product');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/product/${id}`);
    return response.data;
  },

  create: async (data: ProductData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('categoryId', data.categoryId);
    formData.append('quantity', data.quantity.toString());
    
    if (data.images) {
      Array.from(data.images).forEach((file) => {
        formData.append('images', file);
      });
    }

    const response = await apiClient.post('/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id: string, data: Partial<ProductData>) => {
    const response = await apiClient.put(`/product/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/product/${id}`);
    return response.data;
  }
};