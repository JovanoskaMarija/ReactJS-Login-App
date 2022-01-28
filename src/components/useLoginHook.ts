import { Dispatch, SetStateAction, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import axiosInstance from "../api/axiosInstance";
import { Payload, Error } from "../containers/Login/Login.function";

interface Data {
  data: {
    token: string;
  };
}

export const useLoginHandler = (
  username: string | undefined,
  password: string | undefined,
  submitted: boolean,
  setError: Dispatch<SetStateAction<Error>>,
  setSubmitted: Dispatch<SetStateAction<boolean>>
) => {
  const history = useHistory();

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
        .then(({ data: { token } }) => {
          new Cookies().set("Token", token);
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
  }, [username, password, submitted, history, setError, setSubmitted]);
};

export default useLoginHandler;
