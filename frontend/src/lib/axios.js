import axios from "axios";
export const axiosInstance = axios.create({
  // baseURL: "/api/api",
  baseURL: "https://quikly-backend.onrender.com/api",
  withCredentials: true,
});
