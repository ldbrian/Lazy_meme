import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const { userType, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: userType === "admin" ? "管理员账户" : "普通用户",
    email: userType === "admin" ? "admin@example.com" : "user@example.com",
    learningProgress: 65,
    lastLogin: "2025-07-22",
    learnedWords: userType === "admin" ? 120 : 32,
    favoriteCategories: ["网络热词", "流行梗图"]
  });

  const handleLogout = () => {
    logout();
    toast.success("成功退出登录");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
             <h1 className="text-3xl font-bold text-red-600">Profile <span className="text-sm opacity-70">个人资料</span></h1>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>Logout <span className="text-xs opacity-70">退出登录</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                  <i className="fas fa-user text-4xl text-red-600"></i>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
                  <p className="text-gray-500">{userData.email}</p>
                  <p className="text-sm text-gray-500 mt-1">最后登录: {userData.lastLogin}</p>
                </div>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="ml-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  {isEditing ? "保存" : "编辑资料"}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">学习进度</h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>总体进度</span>
                  <span className="font-bold">{userData.learningProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-red-600 h-2.5 rounded-full" 
                    style={{ width: `${userData.learningProgress}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">{userData.learnedWords}</p>
                  <p className="text-gray-500">已学习热词</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">12</p>
                  <p className="text-gray-500">已收藏梗图</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">8</p>
                  <p className="text-gray-500">文化知识点</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">兴趣分类</h3>
              <div className="flex flex-wrap gap-2">
                {userData.favoriteCategories.map((category, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm cursor-pointer hover:bg-gray-200">
                  <i className="fas fa-plus mr-1"></i>添加
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">最近学习</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-700">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  <span>网络热词: "躺平"</span>
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  <span>梗图解析: 熊猫表情包</span>
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  <span>文化对比: 春节 vs 圣诞节</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">学习统计</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 border border-gray-100 rounded-lg">
                <p className="text-2xl font-bold text-red-600">15</p>
                <p className="text-gray-500 text-sm">连续学习天数</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">4.8</p>
                <p className="text-gray-500 text-sm">平均每日学习小时</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <p className="text-2xl font-bold text-green-600">92%</p>
                <p className="text-gray-500 text-sm">热词掌握率</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">5</p>
                <p className="text-gray-500 text-sm">获得成就徽章</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
