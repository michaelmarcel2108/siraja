import Link from "next/link";

interface NewsCardProps {
  title: string;
  slug: string;
  thumbnailUrl?: string | null;
  categoryName: string;
  publishedAt: string | null;
}

export default function NewsCard({ 
  title, 
  slug, 
  thumbnailUrl, 
  categoryName, 
  publishedAt 
}: NewsCardProps) {
  
  // Format tanggal jika ada
  const formattedDate = publishedAt 
    ? new Date(publishedAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : 'Belum dipublish';

  return (
    <Link href={`/berita/${slug}`}>
      <div className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white flex flex-col h-full">
        {/* Area Gambar */}
        <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
          {thumbnailUrl ? (
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              Tidak ada gambar
            </div>
          )}
          
          {/* Badge Kategori Mengambang */}
          <div className="absolute bottom-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded">
            {categoryName}
          </div>
        </div>
        
        {/* Area Teks */}
        <div className="p-4 flex flex-col flex-grow justify-between">
          <h2 className="text-lg font-bold text-gray-900 line-clamp-3 mb-3 group-hover:text-red-700 transition-colors">
            {title}
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            {formattedDate}
          </p>
        </div>
      </div>
    </Link>
  );
}