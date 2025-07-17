import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { PieChart, LineChart, Line, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Mock数据
const userData = {
  name: "张三",
  level: 5,
  achievements: ["热词达人", "文化探索者", "梗图专家", "学习先锋"],
};

const studyRecords = {
  weeklyHours: [5, 7, 6, 8, 4, 9, 6], // 一周每天学习小时数
  history: [
    { id: 1, title: "热词: 破防", time: "2025-07-10 14:30" },
    { id: 2, title: "文化对比: 春节习俗", time: "2025-07-09 10:15" },
    { id: 3, title: "梗图: 熊猫表情包", time: "2025-07-08 18:45" },
    { id: 4, title: "热词: 躺平", time: "2025-07-07 16:20" },
  ],
};

const testResults = [
  { score: 85, correctAnswers: 8, date: "2025-07-05" },
  { score: 90, correctAnswers: 9, date: "2025-06-28" },
  { score: 78, correctAnswers: 7, date: "2025-06-21" },
];

const collections = {
  categories: ["热词", "文化", "梗图", "笔记"],
  items: [
    { id: 1, category: "热词", title: "破防", content: "网络用语，表示被感动或震撼" },
    { id: 2, category: "文化", title: "春节习俗", content: "中国最重要的传统节日" },
    { id: 3, category: "梗图", title: "熊猫表情包", content: "流行的熊猫人表情" },
  ],
};

const COLORS = ['#E53935', '#FF9800', '#4CAF50', '#2196F3'];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("achievements");
  const [noteContent, setNoteContent] = useState("");
  const { logout } = useAuth();

  // 学习时间数据格式化
  const studyTimeData = studyRecords.weeklyHours.map((hours, index) => ({
    day: ["日", "一", "二", "三", "四", "五", "六"][index],
    hours,
  }));

  // 测试通过率
  const passRate = Math.round((testResults[0].correctAnswers / 10) * 100);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 左侧导航 */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-red-100 mx-auto mb-2 flex items-center justify-center">
                  <i className="fas fa-user text-4xl text-red-600"></i>
                </div>
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-gray-500">Lv.{userData.level}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("achievements")}
                  className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "achievements" ? "bg-red-50 text-red-600" : "hover:bg-gray-50"}`}
                >
                  <i className="fas fa-trophy mr-2"></i> 成就系统
                </button>
                <button
                  onClick={() => setActiveTab("records")}
                  className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "records" ? "bg-red-50 text-red-600" : "hover:bg-gray-50"}`}
                >
                  <i className="fas fa-chart-line mr-2"></i> 学习记录
                </button>
                <button
                  onClick={() => setActiveTab("tests")}
                  className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "tests" ? "bg-red-50 text-red-600" : "hover:bg-gray-50"}`}
                >
                  <i className="fas fa-clipboard-check mr-2"></i> 定期测试
                </button>
                <button
                  onClick={() => setActiveTab("collections")}
                  className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "collections" ? "bg-red-50 text-red-600" : "hover:bg-gray-50"}`}
                >
                  <i className="fas fa-bookmark mr-2"></i> 知识管理
                </button>
              </nav>

              <button
                onClick={logout}
                className="w-full mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <i className="fas fa-sign-out-alt mr-2"></i> 退出登录
              </button>
            </div>
          </div>

          {/* 右侧内容区 */}
          <div className="flex-1">
            {/* 成就系统 */}
            {activeTab === "achievements" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-red-600 mb-6 border-b-2 border-red-600 pb-2 inline-block">
                  成就系统
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {userData.achievements.map((achievement, index) => (
                    <div key={index} className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: COLORS[index % COLORS.length] + '20' }}>
                        <i className={`fas fa-${index === 0 ? 'trophy' : index === 1 ? 'globe-asia' : index === 2 ? 'image' : 'graduation-cap'} text-2xl`} style={{ color: COLORS[index % COLORS.length] }}></i>
                      </div>
                      <h3 className="font-bold">{achievement}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 学习记录 */}
            {activeTab === "records" && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-red-600 mb-6 border-b-2 border-red-600 pb-2 inline-block">
                    学习时间分布
                  </h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={studyTimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="hours" stroke="#E53935" strokeWidth={2} name="学习小时数" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-red-600 mb-6 border-b-2 border-red-600 pb-2 inline-block">
                    浏览历史
                  </h2>
                  <div className="space-y-4">
                    {studyRecords.history.map((item) => (
                      <div key={item.id} className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mr-4">
                          <i className="fas fa-history text-red-600"></i>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-gray-500 text-sm">{item.time}</p>
                        </div>
                        <Link to={`/${item.title.includes('热词') ? 'hotwords' : item.title.includes('文化') ? 'culture' : 'memes'}/${item.id}`} className="text-red-600 hover:underline">
                          查看
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 定期测试 */}
            {activeTab === "tests" && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-red-600 mb-6 border-b-2 border-red-600 pb-2 inline-block">
                    最新测试结果
                  </h2>
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-40 h-40 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: '正确', value: testResults[0].correctAnswers },
                              { name: '错误', value: 10 - testResults[0].correctAnswers },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            <Cell fill="#E53935" />
                            <Cell fill="#E0E0E0" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-2xl font-bold">{passRate}%</span>
                        <span className="text-sm text-gray-500">通过率</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">本周测试 ({testResults[0].date})</h3>
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">得分:</span> {testResults[0].score}/100
                      </p>
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">正确题数:</span> {testResults[0].correctAnswers}/10
                      </p>
                      <button className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        开始新测试
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-red-600 mb-6 border-b-2 border-red-600 pb-2 inline-block">
                    历史测试记录
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4">日期</th>
                          <th className="text-left py-2 px-4">得分</th>
                          <th className="text-left py-2 px-4">正确题数</th>
                          <th className="text-left py-2 px-4">通过率</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testResults.map((test, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{test.date}</td>
                            <td className="py-2 px-4">{test.score}</td>
                            <td className="py-2 px-4">{test.correctAnswers}/10</td>
                            <td className="py-2 px-4">{Math.round((test.correctAnswers / 10) * 100)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 知识管理 */}
            {activeTab === "collections" && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-red-600 mb-6 border-b-2 border-red-600 pb-2 inline-block">
                    我的收藏
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {collections.items.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${item.category === '热词' ? 'bg-red-100 text-red-600' : item.category === '文化' ? 'bg-blue-100 text-blue-600' : item.category === '梗图' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                            {item.category}
                          </span>
                        </div>
                        <h3 className="font-bold mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{item.content}</p>
                        <div className="mt-3 flex justify-between items-center">
                          <button className="text-red-600 hover:underline text-sm">
                            编辑
                          </button>
                          <button className="text-gray-500 hover:text-red-600">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-red-600 mb-6 border-b-2 border-red-600 pb-2 inline-block">
                    我的笔记
                  </h2>
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
                    rows={8}
                    placeholder="记录你的学习笔记..."
                  />
                  <div className="flex justify-end space-x-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      取消
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      保存
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
