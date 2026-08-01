import axios from "axios";
import { ApiError } from "@/infrastructure/errors/api-error";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error.response;

    if (response && response.status === 401) {
      localStorage.removeItem("token");
    }

    throw new ApiError(
      response?.data?.message || "Request failed",
      response?.status,
      response?.data
    );
  }
);
