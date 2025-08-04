import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { posts, studyGroups, questions } from "@/data/mockData";
import { toast } from "sonner";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"discussion" | "groups" | "qa">("discussion");

  const handleReply = (postId: number) => {
    toast.success(`回复了帖子 #${postId}`);
  };

  const handleLike = (postId: number) => {
    toast.success(`点赞了帖子 #${postId}`);
  };

  const joinGroup = (groupId: number) => {
    toast.success(`加入了小组 #${groupId}`);
  };

  const answerQuestion = (questionId: number) => {
    toast.success(`回答了问题 #${questionId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-red-600 mb-6 border-b-2 border-red-600 pb-2 inline-block">
           Learning Community <span className="text-sm opacity-70">学习社区</span>
        </h1>

        {/* 标签页导航 */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`py-2 px-4 font-medium ${activeTab === "discussion" ? "text-red-600 border-b-2 border-red-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("discussion")}
          >
             Discussion <span className="text-sm opacity-70">讨论区</span>
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === "groups" ? "text-red-600 border-b-2 border-red-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("groups")}
          >
             Study Groups <span className="text-sm opacity-70">学习小组</span>
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === "qa" ? "text-red-600 border-b-2 border-red-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("qa")}
          >
             Q&A <span className="text-sm opacity-70">问答系统</span>
          </button>
        </div>

        {/* 讨论区内容 */}
        {activeTab === "discussion" && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="分享你的学习心得或问题..."
                rows={3}
              />
              <div className="flex justify-between items-center mt-3">
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-red-600">
                    <i className="far fa-smile text-xl"></i>
                  </button>
                  <button className="text-gray-500 hover:text-red-600">
                    <i className="fas fa-at text-xl"></i>
                  </button>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  发布
                </button>
              </div>
            </div>

            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <i className="fas fa-user text-gray-500"></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{post.author}</h3>
                          <p className="text-gray-500 text-sm">{post.timestamp}</p>
                        </div>
                        <button 
                          onClick={() => handleLike(post.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <i className="far fa-heart"></i> {post.likes}
                        </button>
                      </div>
                      <p className="mt-2 text-gray-700 whitespace-pre-line">{post.content}</p>
                    </div>
                  </div>

                  {/* 回复区 */}
                  <div className="mt-4 pl-12">
                    {post.replies.map((reply) => (
                      <div key={reply.id} className="py-3 border-t border-gray-100">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <i className="fas fa-user text-gray-500 text-sm"></i>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-sm">{reply.author}</h4>
                                <p className="text-gray-500 text-xs">{reply.timestamp}</p>
                              </div>
                              <button className="text-gray-400 hover:text-red-600 text-xs">
                                <i className="far fa-heart"></i> {reply.likes}
                              </button>
                            </div>
                            <p className="mt-1 text-gray-700 text-sm">{reply.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="mt-3 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <i className="fas fa-user text-gray-500 text-sm"></i>
                      </div>
                      <input
                        type="text"
                        className="ml-3 flex-1 px-3 py-1 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-red-500"
                        placeholder="写回复..."
                      />
                      <button 
                        onClick={() => handleReply(post.id)}
                        className="ml-2 px-3 py-1 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition-colors"
                      >
                        回复
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 学习小组内容 */}
        {activeTab === "groups" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-dashed border-gray-200 hover:border-red-300 transition-colors flex flex-col items-center justify-center min-h-[200px]">
              <i className="fas fa-plus text-4xl text-gray-400 mb-3"></i>
              <p className="text-gray-500">创建新小组</p>
            </div>

            {studyGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-red-600 mb-2">{group.name}</h3>
                  <p className="text-gray-500 text-sm mb-1">
                    <span className="font-semibold">主题:</span> {group.topic}
                  </p>
                  <p className="text-gray-700 mb-4">{group.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-sm">
                      <i className="fas fa-users mr-1"></i> {group.members} 成员
                    </p>
                    <button 
                      onClick={() => joinGroup(group.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      加入
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 问答系统内容 */}
        {activeTab === "qa" && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-3"
                placeholder="问题标题"
              />
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="详细描述你的问题..."
                rows={3}
              />
              <div className="flex justify-end mt-3">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  提问
                </button>
              </div>
            </div>

            {questions.map((question) => (
              <div 
                key={question.id} 
                className={`bg-white rounded-lg shadow-md overflow-hidden ${question.solved ? 'border-l-4 border-yellow-500' : ''}`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-red-600 mb-1">{question.title}</h3>
                      <p className="text-gray-500 text-sm mb-2">
                        提问者: {question.author} • 积分: {question.points}
                      </p>
                    </div>
                    {question.solved && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        已解决
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-4">{question.content}</p>

                  {question.answers.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-bold text-gray-700 mb-2">回答 ({question.answers.length})</h4>
                      {question.answers.map((answer) => (
                        <div 
                          key={answer.id} 
                          className={`py-3 px-4 mb-3 rounded-lg ${answer.isBest ? 'bg-yellow-50 border border-yellow-300' : 'bg-gray-50'}`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">{answer.author}</p>
                              <p className="text-gray-500 text-xs mb-1">{answer.timestamp}</p>
                            </div>
                            <div className="flex items-center">
                              <span className="text-yellow-600 mr-2">
                                {answer.isBest && <i className="fas fa-check-circle"></i>}
                              </span>
                              <span className="text-gray-700">{answer.points} 积分</span>
                            </div>
                          </div>
                          <p className="mt-2 text-gray-700">{answer.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="写下你的回答..."
                      rows={3}
                    />
                    <div className="flex justify-end mt-2">
                      <button 
                        onClick={() => answerQuestion(question.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        回答
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}