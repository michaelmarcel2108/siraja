import { supabase } from '@/lib/supabase';
import NewsCard from '@/components/NewsCard';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function KategoriPage({ params }: { params: { slug: string } }) {
  // 1. Cek apakah kategori utama ini ada di database berdasarkan slug URL
  const { data: category, error: categoryError } = await supabase
    .from('siraja_categories')
    .select('id, name')
    .eq('slug', params.slug)
    .single();

  // Jika kategori tidak ditemukan, arahkan ke halaman 404
  if (categoryError || !category) {
    notFound();
  }

  // 2. Ambil semua ID sub-kategori yang terhubung dengan kategori utama ini
  const { data: subCategories } = await supabase
    .from('siraja_sub_categories')
    .select('id')
    .eq('category_id', category.id);

  const subCategoryIds = subCategories?.map(sub => sub.id) || [];

  // 3. Ambil artikel-artikel yang sesuai dengan sub-kategori tersebut
  let articles: any[] = [];
  
  if (subCategoryIds.length > 0) {
    const { data } = await supabase
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
      .in('sub_category_id', subCategoryIds)
      .eq('status', 'published')
      .order('published_at', { ascending: false });
      
    articles = data || [];
  }

  return (
    <div className="space-y-8 bg-white w-full pb-10 pt-4">
      
      {/* Header Kategori */}
      <div className="border-b-4 border-gray-900 pb-4 mb-8">
        <span className="text-red-600 font-bold text-sm uppercase tracking-wider block mb-1">
          Kategori Berita
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-wide">
          {category.name}
        </h1>
      </div>
      
      {/* Grid Berita */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard 
            key={article.id}
            title={article.title}
            slug={article.slug}
            thumbnailUrl={article.thumbnail_url}
            categoryName={article.siraja_sub_categories?.name || category.name}
            publishedAt={article.published_at}
          />
        ))}
      </div>

      {/* Jika belum ada berita di kategori ini */}
      {articles.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l1 1h4a2 2 0 012 2v12a2 2 0 01-2 2z"></path></svg>
          <p className="text-gray-500 font-medium text-lg">Belum ada berita di kategori {category.name}.</p>
        </div>
      )}

    </div>
  );
}