import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Meme } from "@/data/mockData";

interface MemeCarouselProps {
  memes: Meme[];
}

export default function MemeCarousel({ memes }: MemeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % memes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [memes.length]);

  return (
    <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
      {memes.map((meme, index) => (
        <Link 
          key={meme.id}
          to={`/memes/${meme.id}`}
          className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="relative h-full w-full">
            <img 
              src={meme.imageUrl} 
              alt={meme.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white font-bold">{meme.title}</h3>
            </div>
          </div>
        </Link>
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {memes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
             className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}