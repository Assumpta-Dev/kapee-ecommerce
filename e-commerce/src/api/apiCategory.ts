import apiClient from "./apiClient";

export const getCategories = () => apiClient.get("/category");
