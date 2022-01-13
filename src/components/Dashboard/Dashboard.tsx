import { useContext, useEffect } from "react";
import useAxios from "../../api/useAxiosHook";
import { TokenContext } from "../../components/Context/TokenContext";
import { UserContext } from "../../components/Context/UserContext";
import welcomeImg from "../../assets/welcome-bro.svg";

function Dashboard() {
  const { token } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);

  const { data, loading, sendRequest } = useAxios();

  useEffect(() => {
    if ((token && user) || loading) {
      return;
    }

    if (token) {
      sendRequest({
        url: "/user",
        method: "get",
        headers: { Authorization: `${token}` },
      });
    }
  }, [sendRequest, loading, token, user, data]);

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
        <img src={welcomeImg} alt="" />
      </div>
    </div>
  );
}

export default Dashboard;
