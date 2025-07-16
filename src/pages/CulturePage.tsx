import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { cultureComparisons, memes } from "@/data/mockData";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CulturePage() {
  const { id } = useParams();
  const comparison = cultureComparisons.find(c => c.id === Number(id)) || cultureComparisons[0];

  const getRelatedMeme = (id: number) => {
    return memes.find(meme => meme.id === id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `文化对比: ${comparison.title}`,
        text: `看看这个有趣的中西文化对比: ${comparison.title}`,
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
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-red-600 border-b-2 border-red-600 pb-2">
              {comparison.title}
            </h1>
            <button 
              onClick={handleShare}
              className="text-gray-500 hover:text-red-600 transition-colors"
            >
              <i className="fas fa-share-alt text-xl"></i>
            </button>
          </div>

          {/* 双栏对比内容 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* 中国内容 */}
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600/20 to-transparent"></div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-red-600 mb-4">中国视角</h2>
                <p className="text-gray-700 whitespace-pre-line">{comparison.chinaContent}</p>
              </div>
            </div>

            {/* 西方内容 */}
            <div className="relative">
              <div className="absolute -right-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600/20 to-transparent"></div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">西方视角</h2>
                <p className="text-gray-700 whitespace-pre-line">{comparison.westContent}</p>
              </div>
            </div>
          </div>

          {/* 高亮内容 */}
          {comparison.highlights.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2 inline-block">
                重点对比
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {comparison.highlights.map((highlight, index) => (
                  <div 
                    key={index}
                    className="p-4 border-2 border-red-600/30 bg-red-50 rounded-lg"
                  >
                    <p className="text-gray-700">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 相关梗图 */}
          {comparison.relatedMemes.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2 inline-block">
                相关梗图
              </h2>
              <div className="flex flex-wrap gap-4">
                {comparison.relatedMemes.map(memeId => {
                  const meme = getRelatedMeme(memeId);
                  return meme ? (
                    <Link 
                      key={meme.id}
                      to={`/memes/${meme.id}`}
                      className="w-24 h-24 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <img 
                        src={meme.imageUrl} 
                        alt={meme.title}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* 讨论区链接 */}
          <div className="text-center">
            <Link 
              to="/community" 
              className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              加入讨论区参与讨论
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}