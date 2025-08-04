import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HotWordCard from "@/components/HotWordCard";
import CultureCard from "@/components/CultureCard";
import MemeCarousel from "@/components/MemeCarousel";
import { hotWords, cultureContent, memes } from "@/data/mockData";
import { motion } from "framer-motion";
  import { useAuth } from "@/context/AuthContext";
  import { toast } from "sonner";
  import en from "@/locales/en";


export default function Home() {
  const [hotWordsLoading, setHotWordsLoading] = useState(false);
  const t = en; // 固定使用英文
  const userLevel = 5;
  const levelProgress = 65;
  const { isAuthenticated } = useAuth();
  
  // 移除未定义的成就引用
  const achievements = [
    { id: 1, name: "Language Learner", icon: "fa-trophy", color: "bg-[#FFC94B]" },
    { id: 2, name: "Culture Explorer", icon: "fa-globe-asia", color: "bg-[#4A6163]" },
    { id: 3, name: "Meme Master", icon: "fa-image", color: "bg-[#F9A66C]" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAF4]">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* 欢迎区域 - 玻璃拟态设计 */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 p-8 rounded-3xl backdrop-blur-md bg-white/30 border border-white/20 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(249,250,244,0.7) 0%, rgba(249,166,108,0.3) 100%)'
          }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-[#4A6163] mb-4">{t.home.welcome}</h1>
            <p className="text-lg text-[#4A6163]/90 mb-6">
              {t.home.description}
            </p>
          </div>

          {isAuthenticated ? (
            <>
              {/* 等级进度条 */}
              <div className="max-w-2xl mx-auto mb-8 p-4 rounded-xl backdrop-blur-sm bg-white/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#4A6163] font-medium">等级 {userLevel}</span>
                  <span className="text-[#4A6163] font-bold">{levelProgress}%</span>
                </div>
                <div className="w-full bg-white/30 h-3 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${levelProgress}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-[#4A6163] rounded-full"
                  />
                </div>
              </div>

              {/* 统计卡片 - 悬浮效果 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {[
                  { value: 32, label: "已学习热词", color: "bg-[#4A6163]/10" },
                  { value: 8, label: "已完成课程", color: "bg-[#F9A66C]/10" },
                  { value: 15, label: "连续学习天数", color: "bg-[#FFC94B]/10" },
                  { value: 5, label: "获得成就", color: "bg-[#F17A7E]/10" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className={`${stat.color} p-4 rounded-xl backdrop-blur-sm border border-white/20 shadow-md`}
                  >
                    <p className="text-sm text-[#4A6163]/90">{stat.label}</p>
                    <p className="text-2xl font-bold text-[#4A6163]">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* 成就徽章展示 */}
              <div className="mt-8 text-center">
                <h3 className="text-[#4A6163] font-medium mb-4">已解锁成就</h3>
                <div className="flex justify-center space-x-4">
                  {achievements.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`${achievement.color} w-14 h-14 rounded-full flex items-center justify-center shadow-lg`}
                      title={achievement.name}
                    >
                      <i className={`fas ${achievement.icon} text-white`}></i>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          ) : (
             <div className="max-w-md mx-auto text-center p-6 bg-white/50 rounded-xl">
               <p className="text-lg text-[#4A6163] mb-6">Log in to view your learning data and personalized recommendations</p>
               <a 
                href="/login" 
                className="inline-block px-6 py-3 bg-[#4A6163] text-white font-bold rounded-xl hover:bg-[#3A5153] transition-colors"
              >
                Login Now
              </a>
            </div>
          )}
        </motion.section>

        {/* 热词展示区 */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <motion.h2 
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="text-3xl font-bold text-[#4A6163] mb-4 md:mb-0"
            >
              {t.home.todayHotwords}
            </motion.h2>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/hotwords" 
              className="flex items-center text-[#4A6163] hover:text-[#F9A66C] transition-colors"
            >
               {t.common.viewAll} <i className="fas fa-chevron-right ml-1 text-sm"></i>
            </motion.a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotWordsLoading ? (
              // 加载状态占位符
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-4 w-4 bg-gray-200 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : hotWords.map((hotWord) => (
              <HotWordCard key={hotWord.id} hotWord={hotWord} />
            ))}
          </div>
        </section>

        {/* 文化内容推荐 */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-3xl font-bold text-[#4A6163] mb-4 md:mb-0">
              {t.home.cultureRecommendation}
            </h2>
            <a href="/culture" className="flex items-center text-[#4A6163] hover:text-[#F9A66C] transition-colors">
              查看更多 <i className="fas fa-chevron-right ml-1 text-sm"></i>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CultureCard culture={cultureContent} />
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-[#4A6163]/10"
            >
             <h3 className="text-2xl font-bold text-[#4A6163] mb-6">Learning Path Recommendation</h3>
               <ul className="space-y-4">
                 {[
                   { step: 1, title: "Basic Hot Word Learning", color: "bg-[#F17A7E]/20", textColor: "text-[#F17A7E]" },
                   { step: 2, title: "Cultural Difference Understanding", color: "bg-[#F9A66C]/20", textColor: "text-[#F9A66C]" },
                   { step: 3, title: "Internet Meme Analysis", color: "bg-[#4A6163]/20", textColor: "text-[#4A6163]" },
                 ].map((item) => (
                   <motion.li 
                     key={item.step}
                     whileHover={{ x: 5 }}
                     className="flex items-center p-3 rounded-lg hover:bg-[#F9FAF4] transition-colors"
                   >
                     <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center mr-4`}>
                       <span className={`${item.textColor} font-bold`}>{item.step}</span>
                     </div>
                     <span className="text-[#4A6163]">{item.title}</span>
                   </motion.li>
                 ))}
               </ul>
               <motion.button 
                 whileHover={{ scale: 1.03 }}
                 whileTap={{ scale: 0.98 }}
                 className="mt-8 w-full py-3 bg-gradient-to-r from-[#F9A66C] to-[#FFC94B] text-white rounded-xl hover:shadow-md transition-all"
               >
                 Start Learning
               </motion.button>
            </motion.div>
          </div>
        </section>

        {/* 梗图轮播 */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-3xl font-bold text-[#4A6163] mb-4 md:mb-0">
              {t.home.popularMemes}
            </h2>
            <a href="/memes" className="flex items-center text-[#4A6163] hover:text-[#F9A66C] transition-colors">
               View All <i className="fas fa-chevron-right ml-1 text-sm"></i>
            </a>
          </div>
          <div className="max-w-5xl mx-auto">
            <MemeCarousel memes={memes} />
          </div>
        </section>

        {/* 社区入口 */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12 p-8 rounded-3xl backdrop-blur-md bg-[#4A6163]/10 border border-[#4A6163]/20 shadow-lg"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#4A6163] mb-4">{t.home.joinCommunity}</h2>
            <p className="text-[#4A6163]/90 mb-8">{t.home.description}</p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               href="/community" 
               className="inline-block px-8 py-3 bg-[#4A6163] text-white font-bold rounded-xl hover:shadow-md transition-all"
             >
                Join Now
              </motion.a>
             
              {/* 管理员登录已移至导航栏 */}
           </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}