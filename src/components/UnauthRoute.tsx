import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { IsUserLoggedInContext } from "./Context/IsUserLoggedInContext";

function UnauthRoute({ ...routeProps }: RouteProps): JSX.Element {
  const { isLoggedIn } = useContext(IsUserLoggedInContext);

  return isLoggedIn ? <Redirect to="/" /> : <Route {...routeProps} />;
}

export default UnauthRoute;
