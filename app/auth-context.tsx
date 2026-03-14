import { createContext } from "react";

export type AuthContextValue = {
  isSignedIn: boolean;
  username: string | null;
  userId: string | null;
  refreshAuth: () => Promise<boolean>;
  signIn: () => Promise<boolean | void>;
  signOut: () => Promise<boolean | void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
