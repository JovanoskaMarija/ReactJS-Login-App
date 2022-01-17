import { createContext, Dispatch, SetStateAction } from "react";

interface Props {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const IsUserLoggedInContext = createContext<Partial<Props>>({});
