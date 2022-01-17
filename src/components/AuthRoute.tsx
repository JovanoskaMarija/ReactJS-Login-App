import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { IsUserLoggedInContext } from "./Context/IsUserLoggedInContext";

function AuthRoute({ ...routeProps }): JSX.Element {
  const { isLoggedIn } = useContext(IsUserLoggedInContext);

  return isLoggedIn ? <Route {...routeProps} /> : <Redirect to="/" />;
}

export default AuthRoute;
