import axios from "axios";
import Cookies from "universal-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const cookies = new Cookies();

axiosInstance.interceptors.request.use((config) => {
  const token = cookies.get("Token");

  if (config.headers) {
    config.headers.Authorization = token;
  }
  return config;
});

export default axiosInstance;
