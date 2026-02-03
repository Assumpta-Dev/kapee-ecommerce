import apiClient from "./apiClient";

export const getCategories = async () => {
  try {
    const response = await apiClient.get("/category");
    return response.data?.data || response.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
