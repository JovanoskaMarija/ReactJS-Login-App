import axios from "axios";
import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

interface ReturnInterface<D, E> {
  data: D | undefined;
  error: AxiosError<E> | undefined;
  loading: boolean;
  sendRequest: (newConfig?: AxiosRequestConfig) => void;
}

function useAxios<D = object, E = object>(
  config?: AxiosRequestConfig,
  plusConfig?: any
): ReturnInterface<D, E> {
  const [data, setData] = useState<D>();
  const [error, setError] = useState<AxiosError<E>>();
  const [loading, setLoading] = useState<boolean>(false);

  const isMountedRef = useRef<boolean>(true);

  const fetchData = useCallback(
    (newConfig?: AxiosRequestConfig) => {
      const requestConfig: AxiosRequestConfig = {
        ...{ plusConfig },
        ...{ config },
        ...newConfig,
      };

      setLoading(true);

      axiosInstance(requestConfig)
        .then((response) => {
          if (!isMountedRef.current) {
            return;
          }
          setError(undefined);
          setData(response.data);
        })
        .catch((error: AxiosError<E>) => {
          if (Axios.isCancel(error) || !isMountedRef.current) {
            return;
          }
          setData(undefined);
          setError(error);
        })
        .finally(() => {
          if (!isMountedRef.current) {
            return;
          }
          setLoading(false);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(config)]
  );

  useEffect(
    () => {
      if (plusConfig?.skipIf) {
        return;
      }

      fetchData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [plusConfig, fetchData]
  );

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      // axiosCancelToken.current.cancel();
    };
  }, []);

  return { data, error, loading, sendRequest: fetchData };
}

export default useAxios;
