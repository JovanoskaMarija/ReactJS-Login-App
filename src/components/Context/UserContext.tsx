import { createContext, Dispatch, SetStateAction } from "react";
export interface UserInterface {
  username?: string;
  firstName?: string;
  lastName?: string;
}

interface Props {
  user: UserInterface | undefined;
  setUser: Dispatch<SetStateAction<UserInterface | undefined>>;
}

export const UserContext = createContext<Partial<Props>>({});
