import React, { useMemo, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes/Routes";
import { TokenContext } from "./Context/TokenContext";
import NavigationBar from "./Navbar/Navbar";
import { UserContext } from "./Context/UserContext";

function App() {
  const [token, setToken] = useState<any>();
  const [user, setUser] = useState<any>();
  const tokenProvider = useMemo(() => ({ token, setToken }), [token, setToken]);
  const userProvider = useMemo(() => ({ user, setUser }), [user, setUser]);

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
