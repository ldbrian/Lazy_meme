import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MemeGrid from "@/components/MemeGrid";
import { memes, hotWords } from "@/data/mockData";

export default function MemesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-6 border-b-2 border-red-600 pb-2 inline-block">
            Meme Zone <span className="text-sm opacity-70">梗图专区</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Explore popular memes in Chinese internet culture, understand the cultural meanings behind them
          </p>
          <MemeGrid memes={memes} hotWords={hotWords} />
        </section>
      </main>
      <Footer />
    </div>
  );
}