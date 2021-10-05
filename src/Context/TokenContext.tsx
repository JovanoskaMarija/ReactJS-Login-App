import { createContext, Dispatch, SetStateAction } from "react";
export interface TokenInterface {
  token?: string;
}

interface Props {
  token: string | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>>;
}

export const TokenContext = createContext<Partial<Props>>({});
