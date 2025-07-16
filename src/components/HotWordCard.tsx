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
         <h3 className="text-xl font-bold text-blue-600 mb-2">{hotWord.chinese}</h3>
        <p className="text-gray-600 mb-2">{hotWord.english}</p>
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