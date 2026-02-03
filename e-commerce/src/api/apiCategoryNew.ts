import apiClient from './apiClient';

export interface CategoryData {
  name: string;
  description?: string;
  image?: File;
}

export const categoryAPI = {
  getAll: async () => {
    const response = await apiClient.get('/category');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/category/${id}`);
    return response.data;
  },

  create: async (data: CategoryData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.description) {
      formData.append('description', data.description);
    }
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await apiClient.post('/category', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id: string, data: CategoryData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.description) {
      formData.append('description', data.description);
    }
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await apiClient.put(`/category/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/category/${id}`);
    return response.data;
  }
};