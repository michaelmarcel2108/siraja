'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  slug: string;
  thumbnailUrl: string;
  categoryName: string;
  publishedAt: string;
}

export default function HeadlineSlider({ articles }: { articles: Article[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Jalankan efek slide otomatis setiap 5 detik
  useEffect(() => {
    if (articles.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 5000); 
    
    return () => clearInterval(interval);
  }, [articles.length]);

  if (!articles || articles.length === 0) return null;

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-sm group">
      {articles.map((article, index) => {
        // Format Tanggal
        const dateObj = new Date(article.publishedAt);
        const formattedDate = dateObj.toLocaleDateString('id-ID', {
          weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
        });

        return (
          <Link 
            key={article.id} 
            href={`/berita/${article.slug}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Gambar Background */}
            <img 
              src={article.thumbnailUrl || '/file.svg'} 
              alt={article.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

            {/* Teks Konten */}
            <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col justify-end">
              <span className="bg-red-600 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded w-fit mb-3 shadow-md">
                {article.categoryName}
              </span>
              <h3 className="text-white font-bold text-base sm:text-lg md:text-xl line-clamp-3 leading-snug mb-2 text-shadow-sm">
                {article.title}
              </h3>
              <p className="text-gray-300 text-[10px] md:text-xs font-medium">
                {formattedDate}
              </p>
            </div>
          </Link>
        );
      })}
      
      {/* Indikator Titik (Dots) di pojok kanan bawah */}
      <div className="absolute bottom-4 right-5 z-20 flex gap-1.5">
        {articles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-red-600 w-5' : 'bg-white/50 w-2 hover:bg-white'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}