import { useMemo, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../containers/Login/LoginForm";
import { UserContext, UserInterface } from "../components/Context/UserContext";
import NavigationBar from "../components/Navbar/Navbar";
import Dashboard from "../components/Dashboard/Dashboard";
import AuthRoute from "../components/AuthRoute";
import UnauthRoute from "../components/UnauthRoute";
import { IsUserLoggedInContext } from "../components/Context/IsUserLoggedInContext";

function Routes() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface>();

  const loggedInProvider = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [
    isLoggedIn,
    setIsLoggedIn,
  ]);

  const userProvider = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <IsUserLoggedInContext.Provider value={loggedInProvider}>
      <UserContext.Provider value={userProvider}>
        {isLoggedIn && <NavigationBar />}

        <Switch>
          <UnauthRoute path="/login" component={Login} />
          <AuthRoute path="/dashboard" component={Dashboard} />

          <Route path="/" exact>
            {isLoggedIn ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </UserContext.Provider>
    </IsUserLoggedInContext.Provider>
  );
}

export default Routes;
