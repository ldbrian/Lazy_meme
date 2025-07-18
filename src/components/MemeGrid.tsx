import { useState } from "react";
import { Link } from "react-router-dom";
import { Meme, HotWord } from "@/data/mockData";
import { toast } from "sonner";

interface MemeGridProps {
  memes: Meme[];
  hotWords: HotWord[];
}

export default function MemeGrid({ memes, hotWords }: MemeGridProps) {
  const [expandedMeme, setExpandedMeme] = useState<number | null>(null);

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: `中文梗图: ${title}`,
        text: `看看这个有趣的中文梗图: ${title}`,
        url: window.location.href
      }).catch(() => toast.error('分享失败'));
    } else {
      toast('已复制分享链接到剪贴板');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const getRelatedWord = (id: number) => {
    return hotWords.find(word => word.id === id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {memes.map((meme) => (
        <div 
          key={meme.id}
          className="relative group rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          onClick={() => setExpandedMeme(expandedMeme === meme.id ? null : meme.id)}
        >
          {/* 图片部分 */}
          <div className="relative aspect-square bg-gray-200">
            <img
              src={meme.imageUrl}
              alt={meme.title}
              className="w-full h-full object-cover"
            />
            
            {/* 悬停说明框 */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
              <h3 className="text-xl font-bold mb-2">{meme.title}</h3>
              <p className="text-sm mb-1">
                <span className="font-semibold">中文:</span> {meme.chineseDesc}
              </p>
              <p className="text-sm mb-1">
                <span className="font-semibold">English:</span> {meme.englishDesc}
              </p>
              <p className="text-sm mb-2">
                <span className="font-semibold">文化分析:</span> {meme.culturalAnalysis}
              </p>
              
              {/* 相关热词 */}
              {meme.relatedWords.length > 0 && (
                <div className="mb-2">
                  <p className="text-sm font-semibold">相关热词:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {meme.relatedWords.map((wordId) => {
                      const word = getRelatedWord(wordId);
                      return word ? (
                        <Link 
                          key={wordId} 
                          to={`/hotwords/${wordId}`}
                          className="text-xs bg-red-600/80 hover:bg-red-700 text-white px-2 py-1 rounded"
                        >
                          {word.chinese}
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
              
              {/* 分享按钮 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(meme.title);
                }}
                className="absolute top-2 right-2 text-white hover:text-red-400 transition-colors"
              >
                <i className="fas fa-share-alt text-xl"></i>
              </button>
            </div>
          </div>

          {/* 展开的详细信息 */}
          {expandedMeme === meme.id && (
            <div className="bg-white p-4">
              <h3 className="text-lg font-bold text-red-600 mb-2">{meme.title}</h3>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">中文解释:</span> {meme.chineseDesc}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">English:</span> {meme.englishDesc}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">文化分析:</span> {meme.culturalAnalysis}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}