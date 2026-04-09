import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/apiCategory';
import { getProducts } from '../api/apiProduct';
import { fallbackCategories, fallbackProducts } from '../utils/fallbackData';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const response = await getCategories();
        return response.length > 0 ? response : fallbackCategories;
      } catch (error) {
        return fallbackCategories;
      }
    },
    initialData: fallbackCategories,
    retry: 1,
    staleTime: 10 * 60 * 1000,
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'], 
    queryFn: async () => {
      try {
        const response = await getProducts();
        return response.length > 0 ? response : fallbackProducts;
      } catch (error) {
        return fallbackProducts;
      }
    },
    initialData: fallbackProducts,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};
