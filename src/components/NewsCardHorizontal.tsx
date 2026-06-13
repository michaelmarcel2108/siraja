import Link from 'next/link';

interface NewsCardProps {
  title: string;
  slug: string;
  thumbnailUrl: string;
  categoryName: string;
  publishedAt: string;
}

export default function NewsCardHorizontal({ title, slug, thumbnailUrl, categoryName, publishedAt }: NewsCardProps) {
  // Format tanggal standar
  const dateObj = new Date(publishedAt);
  const formattedDate = dateObj.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Link href={`/berita/${slug}`} className="group flex gap-4 bg-white hover:bg-gray-50 transition-colors p-3 rounded-xl border border-transparent hover:border-gray-200 shadow-sm hover:shadow-md cursor-pointer">
      
      {/* Thumbnail Kiri */}
      <div className="relative w-[110px] sm:w-[130px] shrink-0 aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
        <img 
          src={thumbnailUrl || '/file.svg'} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Konten Kanan */}
      <div className="flex flex-col justify-center flex-1 py-1">
        {/* Kategori */}
        <span className="text-red-600 font-bold text-[10px] sm:text-xs uppercase tracking-wider mb-1.5 block">
          {categoryName}
        </span>
        
        {/* Judul */}
        <h3 className="text-gray-900 font-bold text-sm sm:text-base leading-snug line-clamp-2 mb-1.5 group-hover:text-red-600 transition-colors">
          {title}
        </h3>
        
        {/* Tanggal */}
        <p className="text-gray-500 text-[10px] sm:text-xs font-medium">
          {formattedDate}
        </p>
      </div>
    </Link>
  );
}