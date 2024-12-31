import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

// Create an Axios instance with caching enabled
const axiosInstance = setupCache(
  axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  })
);

export default axiosInstance;
