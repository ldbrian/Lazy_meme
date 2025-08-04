import { Link } from "react-router-dom";
import { HotWord } from "@/data/mockData";

interface HotWordCardProps {
  hotWord: HotWord;
}

export default function HotWordCard({ hotWord }: HotWordCardProps) {
  return (
    <Link 
       to={`/hotwords/${hotWord.id}`}
        className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
    >
       <div className="p-4">
          <h3 className="text-xl font-bold text-blue-600 mb-1">{hotWord.chinese} 
            <span className="text-sm font-normal text-gray-500 ml-2">{hotWord.pinyin}</span>
          </h3>
          <div className="text-sm text-gray-500 italic mb-2">中文注释: {hotWord.chinese} - {hotWord.english}</div>
         <p className="text-gray-700 mb-2 font-medium">Definition: {hotWord.english}</p>
         <div className="flex items-center">
           {[...Array(5)].map((_, i) => (
             <i 
               key={i} 
               className={`fas fa-star ${i < hotWord.difficulty ? 'text-yellow-400' : 'text-gray-300'}`}
             />
           ))}
         </div>
       </div>
    </Link>
  );
}