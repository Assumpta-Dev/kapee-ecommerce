import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { getCategories } from '../api/apiCategory';
import { getProducts } from '../api/apiProduct';

interface SearchResult {
  type: 'category' | 'product';
  id: number;
  name: string;
  tag?: string;
  img?: string;
}

export const useBackendSearch = (searchTerm: string) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Save search to history
  const saveToHistory = (term: string) => {
    if (term.trim() && !searchHistory.includes(term)) {
      const newHistory = [term, ...searchHistory.slice(0, 4)];
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  };

  // Search backend data
  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['backendSearch', searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) return [];
      
      const results: SearchResult[] = [];
      
      try {
        // Search backend categories
        const categoriesResponse = await getCategories();
        const categories = categoriesResponse.data || [];
        
        categories.forEach((category: any) => {
          if (category.name?.toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push({
              type: 'category',
              id: category.id || category._id,
              name: category.name,
              img: category.image || category.img
            });
          }
        });

        // Search backend products
        const productsResponse = await getProducts();
        const products = productsResponse.data || [];
        
        products.forEach((product: any) => {
          if (
            product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category?.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            results.push({
              type: 'product',
              id: product.id || product._id,
              name: product.name,
              tag: product.category,
              img: product.image || product.img
            });
          }
        });
      } catch (error) {
        console.warn('Backend search failed, no results');
      }

      return results.slice(0, 8);
    },
    enabled: searchTerm.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  return {
    searchResults,
    isLoading,
    searchHistory,
    saveToHistory
  };
};