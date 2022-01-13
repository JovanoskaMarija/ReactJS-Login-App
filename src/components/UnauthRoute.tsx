import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { TokenContext } from "./Context/TokenContext";

function UnauthRoute({ ...routeProps }: RouteProps): JSX.Element {
  const { token } = useContext(TokenContext);

  return token ? <Redirect to="/" /> : <Route {...routeProps} />;
}

export default UnauthRoute;
