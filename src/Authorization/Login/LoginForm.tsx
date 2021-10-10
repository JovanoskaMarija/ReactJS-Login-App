import "./Login.css";

import { Field, Form, Formik, FormikProps } from "formik";
import { useContext, useEffect, useMemo, useRef } from "react";
import { Button, Form as BootstrapForm } from "react-bootstrap";
import Cookies from "universal-cookie";

import useAxios from "../../api/useAxiosHook";
import logo from "../../assets/logo.svg";
import { FormValues, validationSchema, initialValues } from "./Login.function";
import { TokenContext, TokenInterface } from "../../Context/TokenContext";

function Login(): JSX.Element {
  const formRef = useRef<FormikProps<FormValues>>(null);

  const { setToken } = useContext(TokenContext);

  const cookies = useMemo(() => {
    return new Cookies();
  }, []);

  const { data, error, sendRequest } = useAxios<TokenInterface | undefined>(
    {},
    { skipIf: true }
  );
  useEffect(() => {
    if (!data) {
      return;
    }

    if (data) {
      if (setToken) {
        cookies.set("Token", data?.token);
        if (cookies.get("Token")) {
          setToken(cookies.get("Token"));
        }
      }
    }
  }, [cookies, data, setToken]);

  function handleSubmit(values: { username: string; password: string }) {
    sendRequest({
      url: "/login",
      method: "post",
      data: {
        username: values.username,
        password: values.password,
      },
    });
  }

  const schema = useMemo(() => validationSchema(), []);

  return (
    <div className="login-page">
      <div className="form-wrapper">
        <h1 className="page-title">Login</h1>
        <img src={logo} alt="" width="100px" />

        {error?.response?.status === 401 && (
          <div className="login-error">Incorrect username or password</div>
        )}

        <div>
          <Formik
            innerRef={formRef}
            validationSchema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="d-flex flex-column">
                  <BootstrapForm.Group>
                    <BootstrapForm.Label className="login-label">
                      Username
                    </BootstrapForm.Label>
                    <BootstrapForm.Control
                      as={Field}
                      type="text"
                      name="username"
                    />
                  </BootstrapForm.Group>
                  {touched.username && errors.username ? (
                    <div className="invalid-msg">{errors.username}</div>
                  ) : null}
                </div>

                <div className="d-flex flex-column">
                  <BootstrapForm.Group>
                    <BootstrapForm.Label className="login-label">
                      Password
                    </BootstrapForm.Label>
                    <BootstrapForm.Control
                      as={Field}
                      type="password"
                      name="password"
                    />
                  </BootstrapForm.Group>
                  {touched.password && errors.password ? (
                    <div className="invalid-msg">{errors.password}</div>
                  ) : null}
                </div>

                <Button type="submit" className="login-btn">
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
