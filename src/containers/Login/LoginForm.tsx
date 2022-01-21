import "./Login.css";

import { Field, Form, Formik, FormikProps } from "formik";
import { useMemo, useRef, useState } from "react";
import { Button, Col, FormGroup, Input, Label } from "reactstrap";
import Cookies from "universal-cookie";

import { axiosInstance } from "../../api/axiosInstance";
import logo from "../../assets/logo.svg";
import { FormValues, validationSchema, initialValues } from "./Login.function";
import { useHistory } from "react-router-dom";

interface Token {
  token: string;
}
interface Data {
  data: Token;
}
interface Payload {
  username: string;
  password: string;
}
interface Error {
  status: string | null;
  description: string;
}

function Login() {
  const history = useHistory();
  const formRef = useRef<FormikProps<FormValues>>(null);
  const [error, setError] = useState<Error>({ status: null, description: "" });

  const cookies = useMemo(() => {
    return new Cookies();
  }, []);

  function handleSubmit(values: { username: string; password: string }) {
    const payload = {
      username: values.username,
      password: values.password,
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
  }

  const schema = useMemo(() => validationSchema(), []);

  return (
    <div className="login-page">
      <div className="form-wrapper">
        <h1 className="page-title">Login</h1>
        <img src={logo} alt="" width="100px" />

        {error.status && <div className="login-error">{error.description}</div>}

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
                  <FormGroup>
                    <Label className="login-label" for="username">
                      Username
                    </Label>
                    <Col>
                      <Input
                        tag={Field}
                        id="username"
                        name="username"
                        type="text"
                      />
                    </Col>
                  </FormGroup>
                  {touched.username && errors.username ? (
                    <div className="invalid-msg">{errors.username}</div>
                  ) : null}
                </div>

                <div className="d-flex flex-column">
                  <FormGroup>
                    <Label className="login-label" for="password">
                      Password
                    </Label>
                    <Col>
                      <Input
                        tag={Field}
                        id="password"
                        name="password"
                        type="password"
                        role="password"
                      />
                    </Col>
                  </FormGroup>
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
