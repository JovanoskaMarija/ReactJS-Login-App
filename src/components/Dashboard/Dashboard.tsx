import { useContext, useEffect } from "react";
import useAxios from "../../api/useAxiosHook";
import { UserContext } from "../../components/Context/UserContext";
import welcomeImg from "../../assets/welcome-bro.svg";
import { IsUserLoggedInContext } from "../Context/IsUserLoggedInContext";

function Dashboard() {
  const { isLoggedIn } = useContext(IsUserLoggedInContext);
  const { user, setUser } = useContext(UserContext);

  const { data, loading, sendRequest } = useAxios();

  useEffect(() => {
    if ((isLoggedIn && user) || loading) {
      return;
    }

    if (isLoggedIn) {
      sendRequest({
        url: "/user",
        method: "get",
      });
    }
  }, [sendRequest, loading, isLoggedIn, user, data]);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (setUser) {
      setUser(data);
    }
  }, [data, setUser]);

  return (
    <div>
      <div style={{ maxWidth: "700px", margin: "auto" }}>
        <img src={welcomeImg} alt="" id="welcome_img" />
      </div>
    </div>
  );
}

export default Dashboard;
