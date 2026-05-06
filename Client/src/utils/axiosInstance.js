// src/utils/axiosInstance.js
import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Request interceptor: dynamically adds latest token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Use consistent key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor: handles errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.error("Unauthorized - redirecting to login");
        localStorage.removeItem("accessToken"); // optional: clear token
        window.location.href = "/login";
      } else if (status === 500) {
        console.error("Server error - please try again later");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout - please try again later");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
