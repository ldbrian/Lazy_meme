import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { hotWords } from "@/data/mockData";
import { toast } from "sonner";

export default function HotWordsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredWords = hotWords.filter(word => {
    const matchesSearch = word.chinese.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         word.english.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter ? word.difficulty === difficultyFilter : true;
    return matchesSearch && matchesDifficulty;
  });

  const totalPages = Math.ceil(filteredWords.length / itemsPerPage);
  const paginatedWords = filteredWords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleShare = (word: string) => {
    if (navigator.share) {
      navigator.share({
        title: `中文热词: ${word}`,
        text: `看看这个有趣的中文网络热词: ${word}`,
        url: window.location.href
      }).catch(() => toast.error('分享失败'));
    } else {
      toast('已复制分享链接到剪贴板');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* 搜索和筛选区 */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="搜索热词..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={difficultyFilter || ""}
              onChange={(e) => {
                setDifficultyFilter(e.target.value ? Number(e.target.value) : null);
                setCurrentPage(1);
              }}
            >
              <option value="">所有难度</option>
              <option value="1">1星</option>
              <option value="2">2星</option>
              <option value="3">3星</option>
              <option value="4">4星</option>
              <option value="5">5星</option>
            </select>
          </div>
        </section>

        {/* 热词列表 */}
        <section>
          {paginatedWords.length > 0 ? (
            <div className="space-y-8">
              {paginatedWords.map((word, index) => (
                <motion.div
                  key={word.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                      {/* 视频区 */}
                      <div className="lg:w-3/5 p-4">
                        <div className="relative pb-[56.25%] bg-gray-200 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <i className="fas fa-play text-4xl text-red-600"></i>
                          </div>
                        </div>
                      </div>

                      {/* 文字说明区 */}
                      <div className="lg:w-2/5 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <Link to={`/hotwords/${word.id}`} className="group">
                            <h3 className="text-2xl font-bold text-red-600 group-hover:underline">
                              {word.chinese}
                            </h3>
                            <p className="text-gray-500">{word.pinyin}</p>
                          </Link>
                          <button 
                            onClick={() => handleShare(word.chinese)}
                            className="text-gray-500 hover:text-red-600"
                          >
                            <i className="fas fa-share-alt"></i>
                          </button>
                        </div>

                        <p className="text-gray-700 mb-2">
                          <span className="font-semibold">English:</span> {word.english}
                        </p>

                        <div className="mb-4">
                          <p className="font-semibold text-gray-700 mb-1">使用场景:</p>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {word.scenarios.map((scene, i) => (
                              <li key={i}>{scene}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-4">
                          <p className="font-semibold text-gray-700 mb-1">相关用法:</p>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {word.usages.map((usage, i) => (
                              <li key={i}>{usage}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center">
                          <span className="font-semibold text-gray-700 mr-2">难度:</span>
                          {[...Array(5)].map((_, i) => (
                            <i 
                              key={i} 
                              className={`fas fa-star ${i < word.difficulty ? 'text-red-600' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              没有找到匹配的热词
            </div>
          )}

          {/* 分页控制 */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                  上一页
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 border rounded-lg ${currentPage === page ? 'bg-red-600 text-white' : ''}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                  下一页
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}