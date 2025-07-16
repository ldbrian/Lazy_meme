import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import HotWordsPage from "@/pages/HotWordsPage";
import MemesPage from "@/pages/MemesPage";
import CulturePage from "@/pages/CulturePage";
import CommunityPage from "@/pages/CommunityPage";
import ProfilePage from "@/pages/ProfilePage";
import AdminPage from "@/pages/AdminPage";
import { createContext, useState, useContext } from "react";
import { LanguageProvider } from "@/context/LanguageContext";

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

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin, logout }}
    >
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotwords" element={<HotWordsPage />} />
          <Route path="/hotwords/:id" element={<div className="text-center text-xl">热词详情页</div>} />
          <Route path="/culture" element={<CulturePage />} />
          <Route path="/culture/:id" element={<CulturePage />} />
          <Route path="/memes" element={<MemesPage />} />
          <Route path="/memes/:id" element={<div className="text-center text-xl">梗图详情页</div>} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </LanguageProvider>
    </AuthContext.Provider>
  );
}
