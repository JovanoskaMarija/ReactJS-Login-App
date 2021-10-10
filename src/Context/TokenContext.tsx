import { createContext, Dispatch, SetStateAction } from "react";
export interface TokenInterface {
  token: string;
}

interface Props {
  token: TokenInterface | undefined;
  setToken: Dispatch<SetStateAction<TokenInterface | undefined>>;
}

export const TokenContext = createContext<Partial<Props>>({});
