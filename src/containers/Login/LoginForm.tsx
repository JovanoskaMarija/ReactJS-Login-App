import "./Login.css";

import { Field, Form, Formik, FormikProps } from "formik";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Button, Col, FormGroup, Input, Label } from "reactstrap";
import Cookies from "universal-cookie";

import useAxios from "../../api/useAxiosHook";
import logo from "../../assets/logo.svg";
import { FormValues, validationSchema, initialValues } from "./Login.function";
import { TokenContext } from "../../components/Context/TokenContext";

interface Token {
  token: string;
}

function Login(): JSX.Element {
  const formRef = useRef<FormikProps<FormValues>>(null);
  const [tok, setTok] = useState<Token>();

  const { setToken } = useContext(TokenContext);

  const cookies = useMemo(() => {
    return new Cookies();
  }, []);

  const { data, error, sendRequest } = useAxios();
  useEffect(() => {
    if (!data) {
      return;
    }

    if (data) {
      setTok(data);
    }
  }, [data, setTok]);

  useEffect(() => {
    if (tok) {
      if (setToken) {
        cookies.set("Token", tok.token);
        if (cookies.get("Token")) {
          setToken(cookies.get("Token"));
        }
      }
    }
  }, [cookies, setToken, tok]);

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
