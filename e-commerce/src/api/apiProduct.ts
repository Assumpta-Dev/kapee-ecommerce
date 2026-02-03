import apiClient from "./apiClient";

// Define the Product type (VERY important for TypeScript)
export interface Product {
  id: number;
  title: string;
  price: string;
  img: string;
  category?: string;
}

// FULL request
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get("/product");
    return response.data?.data || response.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
