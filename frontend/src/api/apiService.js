// apiService.js
import axios from "axios";

export const apiService = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: "https://e-commerce-mern-project.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // Add other common headers here
  },
});


