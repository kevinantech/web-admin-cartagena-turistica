import { createContext, useContext } from "react";

export type Session = {
  userId: string;
};

export type AuthContextType = {
  session?: Session;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
