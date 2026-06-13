import Link from 'next/link';

interface NewsCardProps {
  title: string;
  slug: string;
  thumbnailUrl: string;
  categoryName: string;
  publishedAt: string;
}

export default function NewsCardSlide({ title, slug, thumbnailUrl, categoryName, publishedAt }: NewsCardProps) {
  // Format tanggal (misal: Kam, 12 Jun 2024)
  const dateObj = new Date(publishedAt);
  const formattedDate = dateObj.toLocaleDateString('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <Link href={`/berita/${slug}`} className="group relative block w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-sm">
      {/* Gambar Background */}
      <img 
        src={thumbnailUrl || '/file.svg'} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Overlay Gradient Hitam dari bawah ke atas */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent"></div>

      {/* Konten Text di Bawah */}
      <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col justify-end">
        {/* Badge Kategori */}
        <span className="bg-red-600 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded w-fit mb-3 shadow-md">
          {categoryName}
        </span>
        
        {/* Judul Berita */}
        <h3 className="text-white font-bold text-base sm:text-lg md:text-xl line-clamp-3 leading-snug mb-2 group-hover:text-gray-200 transition-colors text-shadow-sm">
          {title}
        </h3>
        
        {/* Tanggal */}
        <p className="text-gray-300 text-[10px] md:text-xs font-medium">
          {formattedDate}
        </p>
      </div>
    </Link>
  );
}