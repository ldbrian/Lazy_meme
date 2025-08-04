import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userType: "user" | "admin" | null;
  login: (type: "user" | "admin") => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userType: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // 从localStorage加载状态
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    userType: "user" | "admin" | null;
  }>(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userType = localStorage.getItem('userType') as "user" | "admin" | null;
    
    return {
      isAuthenticated,
      userType: isAuthenticated ? userType : null
    };
  });

  // 当状态变化时保存到localStorage
  useEffect(() => {
    if (authState.isAuthenticated && authState.userType) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', authState.userType);
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userType');
    }
  }, [authState]);

  const login = (type: "user" | "admin"): Promise<void> => {
    return new Promise((resolve) => {
      setAuthState({
        isAuthenticated: true,
        userType: type
      });
      resolve();
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      userType: null
    });
  };

  return (
    <AuthContext.Provider
       value={{
         isAuthenticated: authState.isAuthenticated,
         userType: authState.userType,
         login,
         logout,
       }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
