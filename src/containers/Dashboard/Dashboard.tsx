import "./Dashboard.css";
import { useContext, useEffect, useMemo } from "react";
import { UserContext, UserInterface } from "../../Context/UserContext";
import welcomeImg from "../../assets/welcome-bro.svg";
import Cookies from "universal-cookie";
import axiosInstance from "../../api/axiosInstance";

function Dashboard() {
  const { user, setUser } = useContext(UserContext);

  const cookies = useMemo(() => {
    return new Cookies();
  }, []);

  const token = cookies.get("Token");

  const userData =
    user.firstName.length && user.lastName.length && user.username.length;

  useEffect(() => {
    if (token && userData) {
      return;
    }

    if (token && !userData) {
      axiosInstance.get<UserInterface>("/user").then(({ data }) => {
        setUser(data);
      });
    }
  }, [token, user, userData, setUser]);

  return (
    <div>
      <div className="image-container" data-testid="dashboard">
        <img src={welcomeImg} alt="welcome" id="welcome_img" />
      </div>
    </div>
  );
}

export default Dashboard;
