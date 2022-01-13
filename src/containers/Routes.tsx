import { useEffect, useMemo, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Cookies from "universal-cookie";
import Login from "../containers/Login/LoginForm";
import {
  TokenContext,
  TokenInterface,
} from "../components/Context/TokenContext";
import { UserContext, UserInterface } from "../components/Context/UserContext";
import NavigationBar from "../components/Navbar/Navbar";
import Dashboard from "../components/Dashboard/Dashboard";
import AuthRoute from "../components/AuthRoute";
import UnauthRoute from "../components/UnauthRoute";

function Routes() {
  const [token, setToken] = useState<TokenInterface>();
  const [user, setUser] = useState<UserInterface>();
  const tokenProvider = useMemo(() => ({ token, setToken }), [token, setToken]);
  const userProvider = useMemo(() => ({ user, setUser }), [user, setUser]);

  const cookies = useMemo(() => {
    return new Cookies();
  }, []);

  useEffect(() => {
    if (cookies.get("Token")) {
      setToken(cookies.get("Token"));
    }
  }, [cookies]);

  return (
    <TokenContext.Provider value={tokenProvider}>
      <UserContext.Provider value={userProvider}>
        {token && <NavigationBar />}

        <Switch>
          <UnauthRoute path="/login" component={Login} />
          <AuthRoute path="/dashboard" component={Dashboard} />

          <Route path="/" exact>
            {token ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}

export default Routes;
