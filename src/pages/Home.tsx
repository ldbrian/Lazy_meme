import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HotWordCard from "@/components/HotWordCard";
import CultureCard from "@/components/CultureCard";
import MemeCarousel from "@/components/MemeCarousel";
import { useHotWords, useMemes, useCultureContent } from "@/services/dataService";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import en from "@/locales/en";


export default function Home() {
  const t = en; // 固定使用英文
  const userLevel = 5;
  const levelProgress = 65;
  const { isAuthenticated } = useAuth();
  
  // 测试Supabase连接
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { testSupabaseConnection } = await import('@/services/supabaseService');
        await testSupabaseConnection();
      } catch (error) {
        console.error('Supabase连接检查失败:', error);
      }
    };
    
    checkConnection();
  }, []);
  
  // 添加手动重试连接的状态和方法
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'success' | 'error'>('loading');
  
  useEffect(() => {
    const checkConnection = async () => {
      setConnectionStatus('loading');
      try {
        const { testSupabaseConnection } = await import('@/services/supabaseService');
        const success = await testSupabaseConnection();
        setConnectionStatus(success ? 'success' : 'error');
      } catch (error) {
        console.error('Supabase连接检查失败:', error);
        setConnectionStatus('error');
      }
    };
    
    checkConnection();
  }, []);
  
  // 从数据库获取数据
  const { data: hotWords, loading: hotWordsLoading, error: hotWordsError, isEmpty: hotWordsIsEmpty, refetch: hotWordsRefetch } = useHotWords();
  const { data: memesData, loading: memesLoading, error: memesError, isEmpty: memesIsEmpty, refetch: memesRefetch } = useMemes();
  const { data: cultureData, loading: cultureLoading, error: cultureError, isEmpty: cultureIsEmpty, refetch: cultureRefetch } = useCultureContent();
  
  // 错误处理 - 显示详细错误信息
   useEffect(() => {
    if (hotWordsError) {
      const errorMsg = hotWordsError instanceof Error ? hotWordsError.message : 'Unknown error';
      toast.error(`Failed to load hot words: ${errorMsg}`);
      console.error('Hot words error details:', hotWordsError);
    }
    if (memesError) {
      const errorMsg = memesError instanceof Error ? memesError.message : 'Unknown error';
      toast.error(`Failed to load memes: ${errorMsg}`);
      console.error('Memes error details:', memesError);
    }
    if (cultureError) {
      const errorMsg = cultureError instanceof Error ? cultureError.message : 'Unknown error';
      toast.error(`Failed to load culture content: ${errorMsg}`);
      console.error('Culture error details:', cultureError);
    }
  }, [hotWordsError, memesError, cultureError]);
  
  // 成就数据
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
                
                {/* 连接状态显示 */}
                {connectionStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center mb-2">
                      <i className="fas fa-exclamation-triangle text-red-500 mr-2"></i>
                      <h3 className="font-bold text-red-700">无法连接到服务器</h3>
                    </div>
                    <p className="text-red-600 text-sm mb-4">请检查您的网络连接或稍后重试</p>
                    <button
                      onClick={async () => {
                        setConnectionStatus('loading');
                        const { retrySupabaseConnection } = await import('@/services/supabaseService');
                        const success = await retrySupabaseConnection();
                        setConnectionStatus(success ? 'success' : 'error');
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <i className="fas fa-sync-alt mr-1"></i> 重试连接
                    </button>
                  </div>
                )}
                
                {connectionStatus === 'loading' && (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-[#4A6163] border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-[#4A6163]">正在连接到服务器...</p>
                  </div>
                )}
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
              ) : hotWordsError ? (
                <div className="col-span-full bg-white rounded-xl shadow-md text-center p-8 border border-red-100">
                  <i className="fas fa-exclamation-triangle text-3xl text-red-500 mb-4"></i>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Failed to load hot words</h3>
                  <p className="text-gray-600 mb-4">{hotWordsError.message}</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                      onClick={() => window.location.reload()}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <i className="fas fa-sync-alt mr-1"></i> Retry
                    </button>
                    <button 
                      onClick={() => hotWordsRefetch?.()}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <i className="fas fa-database mr-1"></i> Refresh Data
                    </button>
                  </div>
                </div>
              ) : hotWordsIsEmpty ? (
                <div className="col-span-full bg-white rounded-xl shadow-md text-center p-8 border border-yellow-100">
                  <i className="fas fa-info-circle text-3xl text-yellow-500 mb-4"></i>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No hot words found</h3>
                  <p className="text-gray-600 mb-4">The hotwords table is empty. Please add data to Supabase first.</p>
                  <button 
                    onClick={() => hotWordsRefetch?.()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <i className="fas fa-refresh mr-1"></i> Check Again
                  </button>
                </div>
              ) : hotWords && hotWords.length > 0 ? (
                hotWords.map((hotWord) => (
                  <HotWordCard key={hotWord.id} hotWord={hotWord} />
                ))
              ) : (
                <div className="col-span-full bg-white rounded-xl shadow-md text-center p-8">
                  <i className="fas fa-question-circle text-3xl text-gray-400 mb-4"></i>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Waiting for data</h3>
                  <p className="text-gray-600 mb-4">Please wait while we connect to the database</p>
                  <button 
                    onClick={() => hotWordsRefetch?.()}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <i className="fas fa-sync-alt mr-1"></i> Refresh
                  </button>
                </div>
              )}
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
              {cultureLoading ? (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-[#4A6163]/10 animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded w-1/3 mt-8"></div>
                </div>
              ) : cultureError ? (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-red-100 text-center py-12">
                  <i className="fas fa-exclamation-triangle text-3xl text-red-500 mb-4"></i>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Failed to load culture content</h3>
                  <p className="text-gray-600 mb-4">{cultureError.message}</p>
                  <button 
                    onClick={() => cultureRefetch?.()}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <i className="fas fa-sync-alt mr-1"></i> Retry
                  </button>
                </div>
              ) : cultureIsEmpty || !cultureData ? (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-yellow-100 text-center py-12">
                  <i className="fas fa-info-circle text-3xl text-yellow-500 mb-4"></i>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No culture content found</h3>
                  <p className="text-gray-600 mb-4">The culture_content table is empty or no data was returned</p>
                  <button 
                    onClick={() => cultureRefetch?.()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <i className="fas fa-refresh mr-1"></i> Check Again
                  </button>
                </div>
              ) : (
                <CultureCard culture={cultureData} />
              )}
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
              {memesLoading ? (
                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden animate-pulse h-64">
                  <div className="h-full w-full bg-gray-200"></div>
                </div>
              ) : memesError ? (
                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden h-64 flex items-center justify-center border border-red-100">
                  <div className="text-center px-6">
                    <i className="fas fa-exclamation-triangle text-3xl text-red-500 mb-4"></i>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Failed to load memes</h3>
                    <p className="text-gray-600 mb-4">{memesError.message}</p>
                    <button 
                      onClick={() => memesRefetch?.()}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <i className="fas fa-sync-alt mr-1"></i> Retry
                    </button>
                  </div>
                </div>
              ) : memesIsEmpty ? (
                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden h-64 flex items-center justify-center border border-yellow-100">
                  <div className="text-center px-6">
                    <i className="fas fa-info-circle text-3xl text-yellow-500 mb-4"></i>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No memes found</h3>
                    <p className="text-gray-600 mb-4">The memes table is currently empty</p>
                    <button 
                      onClick={() => memesRefetch?.()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <i className="fas fa-refresh mr-1"></i> Check Again
                    </button>
                  </div>
                </div>
              ) : memesData && memesData.length > 0 ? (
                <MemeCarousel memes={memesData} />
              ) : (
                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden h-64 flex items-center justify-center">
                  <div className="text-center px-6">
                    <i className="fas fa-question-circle text-3xl text-gray-400 mb-4"></i>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Waiting for memes data</h3>
                    <button 
                      onClick={() => memesRefetch?.()}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <i className="fas fa-sync-alt mr-1"></i> Refresh
                    </button>
                  </div>
                </div>
              )}
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
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}