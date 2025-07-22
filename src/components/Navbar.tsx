import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";
import zh from "@/locales/zh";
import en from "@/locales/en";

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated, isAdmin, logout, setIsAdmin } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const t = language === 'zh' ? zh : en;

  const isActive = (path: string) => location.pathname === path;

  return (
     <nav className="bg-[#4A6163]/95 backdrop-blur-sm shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#F9FAF4]">
          {t.navbar.title}
        </Link>
        <div className="flex space-x-8 items-center">
          <Link 
              to="/" 
               className={`px-3 py-1 rounded-md transition-all duration-300 ${isActive('/') 
                 ? 'bg-[#F9FAF4] text-[#4A6163] font-medium shadow-lg'
                 : 'text-[#F9FAF4] hover:bg-[#F9FAF4]/20'}`}
          >
            {t.navbar.home}
          </Link>
          <Link 
              to="/hotwords" 
              className={`px-3 py-1 rounded-md transition-all duration-300 ${isActive('/hotwords') 
                ? 'bg-[#F9FAF4] text-[#F9A66C] font-medium shadow-inner'
                : 'text-[#F9FAF4] hover:bg-[#F9FAF4]/20'}`}
          >
            {t.navbar.hotwords}
          </Link>
          <Link 
            to="/memes" 
            className={`px-3 py-1 rounded-md transition-all duration-300 ${isActive('/memes') 
              ? 'bg-white text-red-600 font-medium shadow-inner'
              : 'text-white hover:bg-white/20'}`}
          >
            {t.navbar.memes}
          </Link>
          <Link 
            to="/culture" 
            className={`px-3 py-1 rounded-md transition-all duration-300 ${isActive('/culture') 
              ? 'bg-white text-red-600 font-medium shadow-inner'
              : 'text-white hover:bg-white/20'}`}
          >
            {t.navbar.culture}
          </Link>
          <Link 
            to="/community" 
            className={`px-3 py-1 rounded-md transition-all duration-300 ${isActive('/community') 
              ? 'bg-white text-red-600 font-medium shadow-inner'
              : 'text-white hover:bg-white/20'}`}
          >
            {t.navbar.community}
          </Link>
          {isAdmin && (
            <Link 
              to="/admin" 
            className={`px-3 py-1 rounded-md transition-all duration-300 ${isActive('/admin') 
              ? 'bg-white text-red-600 font-medium shadow-inner'
              : 'text-white hover:bg-white/20'}`}
            >
              {t.navbar.admin}
            </Link>
          )}
           <button
              onClick={toggleLanguage}
              className="px-3 py-1 text-[#F9FAF4]/80 hover:text-[#F9FAF4]"
            >
             {language === 'zh' ? 'EN' : '中文'}
           </button>
           {isAdmin ? (
             <button 
               onClick={logout}
               className="px-3 py-1 text-gray-600 hover:text-red-600"
             >
               {t.navbar.logout}
             </button>
           ) : (
             <button 
               onClick={() => {
                 setIsAdmin(true);
                 toast.success("管理员登录成功！现在可以访问后台管理页面了");
               }}
               className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
             >
               管理员登录
             </button>
           )}
        </div>
      </div>
    </nav>
  );
}