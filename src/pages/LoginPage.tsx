import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user"); // "user" or "admin"
  const [loading, setLoading] = useState(false);
  
   const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  // 如果已登录，重定向到首页
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    // 模拟登录请求延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 模拟登录验证 - 使用不同凭据区分用户类型
    const isUserLogin = userType === "user" && username === "user" && password === "password";
    const isAdminLogin = userType === "admin" && username === "admin" && password === "admin";
    
    if (isUserLogin || isAdminLogin) {
      // 等待登录状态更新完成
        await login(userType);
        toast.success(`成功登录为${userType === "admin" ? "管理员" : "普通用户"}`);
        navigate(userType === "admin" ? "/admin" : "/profile", { replace: true });
    } else {
      toast.error("用户名或密码不正确");
    }
  } catch (error) {
    toast.error("登录过程中出现错误");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8">
               <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Login <span className="text-sm opacity-70">用户登录</span></h2>
               
               <form onSubmit={handleLogin} className="space-y-4">
                {/* 用户类型选择 */}
                <div className="flex border rounded-lg overflow-hidden">
                   <button
                     type="button"
                     className={`flex-1 py-2 px-4 ${userType === "user" 
                       ? "bg-red-600 text-white" 
                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                     onClick={() => setUserType("user")}
                   >
                     Regular User <span className="text-xs opacity-70">普通用户</span>
                   </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 ${userType === "admin" 
                      ? "bg-red-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    onClick={() => setUserType("admin")}
                   >
                     Admin <span className="text-xs opacity-70">管理员</span>
                   </button>
                </div>
                
                {/* 用户名输入 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username <span className="text-xs opacity-70">用户名</span></label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <i className="fas fa-user"></i>
                    </span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                       placeholder={userType === "user" ? "Username" : "Admin Username"}
                     />
                   </div>
                </div>
                
                {/* 密码输入 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                       placeholder={userType === "user" ? "Password" : "Admin Password"}
                     />
                   </div>
                </div>
                
                {/* 登录按钮 */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i> 登录中...
                    </>
                  ) : (
                    "登录"
                  )}
                </button>
              </form>
              
              {/* 模拟登录信息提示 */}
              <div className="mt-4 text-xs text-gray-500 text-center">
                <p>测试账号:</p>
                <p className="mt-1">普通用户: user / password</p>
                <p>管理员: admin / admin</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
