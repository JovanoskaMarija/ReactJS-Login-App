import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import axiosInstance from "../api/axiosInstance";
import { Data, Payload, Error } from "../containers/Login/Login.function";

export const useLoginHandler = (
  username: string | undefined,
  password: string | undefined,
  submitted: boolean,
  setError: Dispatch<SetStateAction<Error>>,
  setSubmitted: Dispatch<SetStateAction<boolean>>
) => {
  const history = useHistory();
  const cookies = useMemo(() => {
    return new Cookies();
  }, []);

  useEffect(() => {
    if (!submitted) {
      return;
    }

    if (username && password) {
      const payload = {
        username: username,
        password: password,
      };

      axiosInstance
        .post<Payload, Data>("/login", payload)
        .then(({ data }) => {
          cookies.set("Token", data.token);
          history.push("/dashboard");
        })
        .catch(({ response }) => {
          setError({
            status: response.status,
            description: response.data,
          });
        });

      setSubmitted(false);
    }
  }, [username, password, submitted, cookies, history, setError, setSubmitted]);
};

export default useLoginHandler;
