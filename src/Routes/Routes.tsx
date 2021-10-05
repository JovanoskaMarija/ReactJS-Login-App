import { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../Authorization/Login/LoginForm";
import { TokenContext } from "../Context/TokenContext";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AuthRoute from "./AuthRoute";
import UnauthRoute from "./UnauthRoute";

function Routes() {
  const { token } = useContext(TokenContext);

  return (
    <Switch>
      <UnauthRoute path="/login" component={Login} />
      <AuthRoute path="/dashboard" component={Dashboard} />

      <Route path="/" exact>
        {token ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  );
}

export default Routes;
