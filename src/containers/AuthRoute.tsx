import { useMemo, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import { UserContext, UserInterface } from "../Context/UserContext";

function AuthRoute({ ...routeProps }): JSX.Element {
  const [user, setUser] = useState<UserInterface>({
    username: "",
    firstName: "",
    lastName: "",
  });

  const userProvider = useMemo(() => ({ user, setUser }), [user, setUser]);

  const cookies = new Cookies();

  const token = cookies.get("Token");

  return token ? (
    <UserContext.Provider value={userProvider}>
      <Route {...routeProps} />
    </UserContext.Provider>
  ) : (
    <Redirect to="/login" />
  );
}

export default AuthRoute;
