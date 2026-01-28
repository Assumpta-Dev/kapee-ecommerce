import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/apiCategory';
import { getProducts } from '../api/apiProduct';

// Fallback data in case backend is not available
const fallbackCategories = [
  {id: 1, img: "./1 (8).jpg", tag: "Men", name: "Men" },
  {id: 2, img: "./1 (1).jpg", tag: "Bags", name: "Bags" },
  {id: 3, img: "./1 (2).jpg", tag: "pants", name: "Pants" },
  {id: 4, img: "./1 (3).jpg", tag: "Trouser", name: "Trouser" },
  {id: 5, img: "./1 (4).jpg", tag: "Party", name: "Party" },
  {id: 6, img: "./1 (5).jpg", tag: "Shoes", name: "Shoes" },
  {id: 7, img: "./1 (6).jpg", tag: "Men's complete", name: "Men's Complete" },
  {id: 8, img: "./1 (31).jpg", tag: "Female shoes", name: "Female Shoes" },
];

const fallbackProducts = [
  { id: 1, img: "/1 (25).jpg", tag: "Men's Fashion", title: "Premium Leather Casual Shoes", rate: 4, price: "$99", name: "Premium Leather Casual Shoes", category: "Men's Fashion", image: "/1 (25).jpg", rating: 4 },
  { id: 2, img: "/1 (20).jpg", tag: "Female Bags", title: "Designer Handbag Collection", rate: 4, price: "$70", name: "Designer Handbag Collection", category: "Female Bags", image: "/1 (20).jpg", rating: 4 },
  { id: 3, img: "/1 (19).jpg", tag: "Female pants", title: "Slim Fit Denim Jeans", rate: 4, price: "$13", name: "Slim Fit Denim Jeans", category: "Female pants", image: "/1 (19).jpg", rating: 4 },
  { id: 4, img: "/1 (40).jpg", tag: "Trouser", title: "Formal Business Trousers", rate: 4, price: "$100", name: "Formal Business Trousers", category: "Trouser", image: "/1 (40).jpg", rating: 4 },
  { id: 5, img: "/1 (17).jpg", tag: "Party wear", title: "Elegant Evening Dress", rate: 4, price: "$70", name: "Elegant Evening Dress", category: "Party wear", image: "/1 (17).jpg", rating: 4 },
  { id: 6, img: "/1 (60).jpg", tag: "Girl's shoes", title: "Kids Comfort Sneakers", rate: 4, price: "$43", name: "Kids Comfort Sneakers", category: "Girl's shoes", image: "/1 (60).jpg", rating: 4 },
  { id: 7, img: "/1 (55).jpg", tag: "Men's complete", title: "Men's Complete Outfit Set", rate: 4, price: "$99", name: "Men's Complete Outfit Set", category: "Men's complete", image: "/1 (55).jpg", rating: 4 },
  { id: 8, img: "/1 (31).jpg", tag: "Female shoes", title: "Women's Classic Pumps", rate: 4, price: "$74", name: "Women's Classic Pumps", category: "Female shoes", image: "/1 (31).jpg", rating: 4 },
  { id: 9, img: "/1 (30).jpg", tag: "High hills", title: "Stiletto High Heels", rate: 4, price: "$30", name: "Stiletto High Heels", category: "High hills", image: "/1 (30).jpg", rating: 4 },
  { id: 10, img: "/1 (74).jpg", tag: "Tops", title: "Casual Cotton T-Shirt", rate: 4, price: "$55", name: "Casual Cotton T-Shirt", category: "Tops", image: "/1 (74).jpg", rating: 4 },
  { id: 11, img: "/1 (23).jpg", tag: "Female Pant", title: "Wide Leg Palazzo Pants", rate: 4, price: "$55", name: "Wide Leg Palazzo Pants", category: "Female Pant", image: "/1 (23).jpg", rating: 4 },
  { id: 12, img: "/1 (51).jpg", tag: "Men's Fashion", title: "Men Hooded Navy Blue & Grey T-Shirt", rate: 5, price: "$39", name: "Men Hooded Navy Blue & Grey T-Shirt", category: "Men's Fashion", image: "/1 (51).jpg", rating: 5 },
];

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => fallbackCategories, // Always use fallback for now
    staleTime: 10 * 60 * 1000,
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'], 
    queryFn: () => fallbackProducts, // Always use fallback for now
    staleTime: 5 * 60 * 1000,
  });
};