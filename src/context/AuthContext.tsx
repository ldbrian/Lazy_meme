import { createContext, useContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  isAdmin: false,
  setIsAdmin: (value: boolean) => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}
