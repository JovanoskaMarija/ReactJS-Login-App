import { useState } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const useAxios = () => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);

  const sendRequest = async (params: AxiosRequestConfig) => {
    try {
      setLoading(true);
      const result = await axiosInstance.request(params);
      setData(result.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, sendRequest };
};

export default useAxios;
