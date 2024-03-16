import axios from "axios";
import { API_URL } from "../config";

const axiosInstance = axios.create({
  API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
