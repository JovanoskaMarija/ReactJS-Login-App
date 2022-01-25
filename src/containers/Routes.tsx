import { useMemo, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../containers/Login/LoginForm";
import { UserContext, UserInterface } from "../Context/UserContext";
import NavigationBar from "./Dashboard/Navbar/Navbar";
import Dashboard from "./Dashboard/Dashboard";
import AuthRoute from "./AuthRoute";
import Cookies from "universal-cookie";

function Routes() {
  const [user, setUser] = useState<UserInterface>({
    username: "",
    firstName: "",
    lastName: "",
  });
  const userProvider = useMemo(() => ({ user, setUser }), [user, setUser]);

  const cookies = useMemo(() => {
    return new Cookies();
  }, []);

  const token = cookies.get("Token");

  return (
    <UserContext.Provider value={userProvider}>
      {token && <NavigationBar />}

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <AuthRoute path="/dashboard">
          <Dashboard />
        </AuthRoute>
        <Redirect to="/login" exact />
      </Switch>
    </UserContext.Provider>
  );
}

export default Routes;
