// src/api/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:7000/api", // Back to original with /api
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default apiClient;
