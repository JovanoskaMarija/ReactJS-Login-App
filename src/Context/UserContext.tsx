import { createContext, Dispatch, SetStateAction } from "react";
interface UserInterface{
  username?: string,
  firstName?: string
  lastName?: string
}

interface Props {
  user: UserInterface | undefined;
  setUser: Dispatch<SetStateAction<UserInterface>>
}

export const UserContext = createContext<Partial<Props>>({})