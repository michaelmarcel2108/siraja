import { supabase } from '@/lib/supabase';
import NewsCard from '@/components/NewsCard';

export const revalidate = 0; 

export default async function SemuaBeritaPage() {
  const { data: articles, error } = await supabase
    .from('siraja_articles')
    .select(`
      id,
      title,
      slug,
      thumbnail_url,
      published_at,
      siraja_sub_categories (
        name
      )
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error("Gagal memuat berita:", error);
  }

  return (
    <div className="space-y-8 bg-white w-full pb-10 pt-4">
      
      {/* Header Halaman */}
      <div className="border-b-4 border-gray-900 pb-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-wide">
          Semua Berita
        </h1>
        <p className="text-gray-500 mt-2">
          Kumpulan informasi dan berita terkini dari berbagai kategori.
        </p>
      </div>
      
      {/* Grid Berita menggunakan NewsCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((article) => (
          <NewsCard 
            key={article.id}
            title={article.title}
            slug={article.slug}
            thumbnailUrl={article.thumbnail_url}
            // TAMBAHKAN 'as any' DI BAWAH INI UNTUK MENGATASI ERROR TYPESCRIPT
            categoryName={(article.siraja_sub_categories as any)?.name || 'Uncategorized'}
            publishedAt={article.published_at}
          />
        ))}
      </div>

      {/* Jika data kosong */}
      {(!articles || articles.length === 0) && (
        <div className="w-full flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l1 1h4a2 2 0 012 2v12a2 2 0 01-2 2z"></path></svg>
          <p className="text-gray-500 font-medium text-lg">Belum ada berita yang diterbitkan saat ini.</p>
        </div>
      )}

    </div>
  );
}