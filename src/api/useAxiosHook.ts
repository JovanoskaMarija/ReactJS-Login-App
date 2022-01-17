import { useState } from "react";
import { AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";

import { axiosInstance } from "./axiosInstance";

export const useAxios = () => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);

  axiosInstance.interceptors.request.use((request) => {
    const cookies = new Cookies();
    const token = cookies.get("Token");

    if (token) {
      if (request.headers) {
        request.headers.Authorization = token;
      }
    }
    return request;
  });

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
