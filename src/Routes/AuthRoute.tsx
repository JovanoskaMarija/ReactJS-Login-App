import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { TokenContext } from "../Context/TokenContext";

function AuthRoute({ ...routeProps }): JSX.Element {
  const { token } = useContext(TokenContext);

  return token || (typeof token === "object" && Object.keys(token)) ? (
    <Route {...routeProps} />
  ) : (
    <Redirect to="/" />
  );
}

export default AuthRoute;
