import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import HotWordsPage from "@/pages/HotWordsPage";
import MemesPage from "@/pages/MemesPage";
import CulturePage from "@/pages/CulturePage";
import CommunityPage from "@/pages/CommunityPage";
import ProfilePage from "@/pages/ProfilePage";
import AdminPage from "@/pages/AdminPage";
import LoginPage from "@/pages/LoginPage";
import { useAuth } from "@/context/AuthContext";

// 受保护的路由组件 - 需要登录
const ProtectedRoute = ({ children, requireAdmin = false }: { 
  children: React.ReactNode; 
  requireAdmin?: boolean 
}) => {
  const { isAuthenticated, userType } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && userType !== "admin") {
    return <Navigate to="/profile" replace />;
  }
  
  return <>{children}</>;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/hotwords" element={<HotWordsPage />} />
      <Route path="/hotwords/:id" element={<div className="text-center text-xl">热词详情页</div>} />
      <Route path="/culture" element={<CulturePage />} />
      <Route path="/culture/:id" element={<CulturePage />} />
      <Route path="/memes" element={<MemesPage />} />
      <Route path="/memes/:id" element={<div className="text-center text-xl">梗图详情页</div>} />
      <Route path="/community" element={<CommunityPage />} />
      
      {/* 受保护的路由 */}
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requireAdmin>
            <AdminPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
