import { useMemo } from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "universal-cookie";

function AuthRoute({ ...routeProps }): JSX.Element {
  const cookies = useMemo(() => {
    return new Cookies();
  }, []);

  const token = cookies.get("Token");

  return token ? <Route {...routeProps} /> : <Redirect to="/login" />;
}

export default AuthRoute;
