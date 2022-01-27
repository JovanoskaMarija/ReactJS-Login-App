import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../containers/Login/LoginForm";
import Dashboard from "./Dashboard/Dashboard";
import AuthRoute from "./AuthRoute";

function Routes() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <AuthRoute path="/dashboard">
        <Dashboard />
      </AuthRoute>
      <Redirect to="/login" exact />
    </Switch>
  );
}

export default Routes;
