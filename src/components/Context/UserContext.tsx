import { createContext, Dispatch, SetStateAction } from "react";
export interface UserInterface {
  username: string;
  firstName: string;
  lastName: string;
}

interface Props {
  user: UserInterface;
  setUser: Dispatch<SetStateAction<UserInterface>>;
}

export const UserContext = createContext<Props>({
  user: { username: "", firstName: "", lastName: "" },
  setUser: () => {},
});
