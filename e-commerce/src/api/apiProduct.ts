import apiClient from "./apiClient";

export const getProducts = () => apiClient.get("/product");
