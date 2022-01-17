import { useContext, useMemo } from "react";
import { Nav, NavItem, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import logo from "../../assets/logo.svg";

import Cookies from "universal-cookie";
import { IsUserLoggedInContext } from "../Context/IsUserLoggedInContext";

function NavigationBar() {
  const history = useHistory();
  const { setIsLoggedIn } = useContext(IsUserLoggedInContext);
  const { user, setUser } = useContext(UserContext);

  const cookies = useMemo(() => {
    return new Cookies();
  }, []);

  function handleLogout() {
    if (setIsLoggedIn) {
      setIsLoggedIn(false);
    }
    if (setUser) {
      setUser({});
    }

    cookies.remove("Token");
    history?.go(0);
  }

  return (
    <Nav
      variant="tabs"
      defaultactivekey="/dashboard"
      className="d-flex justify-content-between"
    >
      <NavItem className="d-flex justify-content-start align-items-center">
        <img src={logo} alt="" width="50px" />
        {user?.firstName} {user?.lastName}
      </NavItem>

      <NavItem>
        <Button onClick={() => handleLogout()} className="btn btn-light">
          Logout
        </Button>
      </NavItem>
    </Nav>
  );
}

export default NavigationBar;
