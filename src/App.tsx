import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes/Routes";
import { TokenContext, TokenInterface } from "./Context/TokenContext";
import NavigationBar from "./Navbar/Navbar";
import { UserContext, UserInterface } from "./Context/UserContext";
import Cookies from "universal-cookie";

function App() {
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
        <Router>
          <div className="App">
            {token && <NavigationBar />}
            <Routes />
          </div>
        </Router>
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}

export default App;
