import { Link } from "react-router-dom";
import { CultureContent } from "@/data/mockData";

interface CultureCardProps {
  culture: CultureContent;
}

export default function CultureCard({ culture }: CultureCardProps) {
  return (
    <Link 
      to={`/culture/${culture.id}`}
        className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative h-48 bg-gray-200">
        <img 
          src={culture.imageUrl} 
          alt={culture.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
         <h3 className="text-xl font-bold text-blue-600 mb-2">{culture.title}</h3>
        <p className="text-gray-600 line-clamp-2">{culture.summary}</p>
      </div>
    </Link>
  );
}