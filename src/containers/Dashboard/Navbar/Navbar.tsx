import { useContext, useMemo } from "react";
import { Nav, NavItem, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../components/Context/UserContext";
import logo from "../../../assets/logo.svg";

import Cookies from "universal-cookie";

function NavigationBar() {
  const history = useHistory();

  const { user, setUser } = useContext(UserContext);

  const cookies = useMemo(() => {
    return new Cookies();
  }, []);

  function handleLogout() {
    setUser({
      username: "",
      firstName: "",
      lastName: "",
    });

    cookies.remove("Token");
    history.push("/login");
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
        <Button onClick={handleLogout} className="btn btn-light">
          Logout
        </Button>
      </NavItem>
    </Nav>
  );
}

export default NavigationBar;
