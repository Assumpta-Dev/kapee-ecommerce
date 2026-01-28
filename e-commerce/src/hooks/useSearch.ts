import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useCategories, useProducts } from './useApi';

interface SearchResult {
  type: 'category' | 'product';
  id: number;
  name: string;
  tag?: string;
  img?: string;
}

export const useSearch = (searchTerm: string) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const { data: categories = [] } = useCategories();
  const { data: products = [] } = useProducts();

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

  // Search function
  const searchData = (term: string): SearchResult[] => {
    if (!term.trim()) return [];

    const results: SearchResult[] = [];
    
    // Search categories
    categories.forEach((category: any) => {
      if (category.name?.toLowerCase().includes(term.toLowerCase()) || 
          category.tag?.toLowerCase().includes(term.toLowerCase())) {
        results.push({
          type: 'category',
          id: category.id || category._id,
          name: category.name || category.tag,
          img: category.image || category.img
        });
      }
    });

    // Search products
    products.forEach((product: any) => {
      if (
        product.name?.toLowerCase().includes(term.toLowerCase()) ||
        product.title?.toLowerCase().includes(term.toLowerCase()) ||
        product.category?.toLowerCase().includes(term.toLowerCase()) ||
        product.tag?.toLowerCase().includes(term.toLowerCase())
      ) {
        results.push({
          type: 'product',
          id: product.id || product._id,
          name: product.name || product.title,
          tag: product.category || product.tag,
          img: product.image || product.img
        });
      }
    });

    return results.slice(0, 8);
  };

  // React Query for search results
  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['search', searchTerm, categories, products],
    queryFn: () => searchData(searchTerm),
    enabled: searchTerm.length > 0 && categories.length > 0 && products.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  return {
    searchResults,
    isLoading,
    searchHistory,
    saveToHistory
  };
};