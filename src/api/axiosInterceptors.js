// src/utils/axiosInstance.js

import axios from 'axios';

// Define your API base URL
const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or any other source)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response error globally (for example, token expiration)
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login (or show a modal)
      localStorage.removeItem('token');
      window.location.href = '/'; // Adjust as needed
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
