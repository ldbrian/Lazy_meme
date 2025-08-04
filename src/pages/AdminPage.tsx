import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("hotwords");
  const { logout } = useAuth();

  const isActive = (tab: string) => activeTab === tab;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex flex-col md:flex-row">
        {/* 侧边栏导航 */}
        <div className="w-full md:w-64 bg-white shadow-md">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-red-600">后台管理系统</h1>
          </div>
          <nav className="p-2">
            <button
              onClick={() => setActiveTab("hotwords")}
              className={`w-full text-left px-4 py-3 rounded-lg mb-1 ${isActive("hotwords") ? "bg-red-50 text-red-600" : "hover:bg-gray-50"}`}
            >
               <i className="fas fa-fire mr-2"></i> Hot Words <span className="text-sm opacity-70">热词管理</span>
            </button>
            <button
              onClick={() => setActiveTab("culture")}
              className={`w-full text-left px-4 py-3 rounded-lg mb-1 ${isActive("culture") ? "bg-red-50 text-red-600" : "hover:bg-gray-50"}`}
            >
               <i className="fas fa-globe-asia mr-2"></i> Culture Content <span className="text-sm opacity-70">文化内容管理</span>
            </button>
            <button
              onClick={() => setActiveTab("memes")}
              className={`w-full text-left px-4 py-3 rounded-lg mb-1 ${isActive("memes") ? "bg-red-50 text-red-600" : "hover:bg-gray-50"}`}
            >
               <i className="fas fa-image mr-2"></i> Memes <span className="text-sm opacity-70">梗图管理</span>
            </button>
          </nav>
          <div className="p-4 border-t mt-auto">
            <button
              onClick={logout}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <i className="fas fa-sign-out-alt mr-2"></i> 退出登录
            </button>
          </div>
        </div>

        {/* 主内容区 */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}