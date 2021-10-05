import { useContext, useEffect } from "react";
import useAxios from "../../api/useAxiosHook";
import { TokenContext } from "../../Context/TokenContext";
import { UserContext } from "../../Context/UserContext";
import welcomeImg from "../../assets/welcome-bro.svg";
interface UserInterface {
  username: string;
  firstName: string;
  lastName: string;
}

function Dashboard() {
  const { token } = useContext(TokenContext);
  const { setUser } = useContext(UserContext);

  const { data, sendRequest } = useAxios<UserInterface>({}, { skipIf: true });

  useEffect(() => {
    if (token) {
      sendRequest({
        url: "/user",
        method: "get",
        headers: { Authorization: `${token}` },
      });
    }
  }, [sendRequest, token]);

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
      {/* <p>Dashboard Page</p> */}
      <div style={{ maxWidth: "700px", margin: "auto" }}>
        <img src={welcomeImg} alt="" />
      </div>
    </div>
  );
}

export default Dashboard;
