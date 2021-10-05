import { useContext, useMemo } from "react";
import { Nav, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { TokenContext } from "../Context/TokenContext";
import { UserContext } from "../Context/UserContext";
import logo from "../assets/logo.svg";

import Cookies from "universal-cookie";

function NavigationBar() {
  const history = useHistory();
  const { setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);

  const cookies = useMemo(() => {
    return new Cookies();
  }, []);
  return (
    <Nav
      variant="tabs"
      defaultActiveKey="/dashboard"
      className="d-flex justify-content-between"
    >
      <Nav.Item className="d-flex justify-content-start align-items-center">
        <img src={logo} alt="" width="50px" />
        {user?.firstName} {user?.lastName}
      </Nav.Item>

      <Nav.Item>
        <Button
          onClick={() => {
            if (setToken) {
              setToken("");
            }
            if (setUser) {
              setUser({});
            }

            cookies.remove("Token");
            history.go(0);
          }}
          className="btn btn-light"
        >
          Logout
        </Button>
      </Nav.Item>
    </Nav>
  );
}

export default NavigationBar;
