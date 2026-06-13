import { supabase } from '@/lib/supabase';
import NewsCard from '@/components/NewsCard';
import Script from 'next/script'; 

export const revalidate = 0;

export default async function Home() {
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
    .order('published_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error("Gagal memuat berita:", error);
  }

  return (
    // Menggunakan Grid 12 kolom untuk kontrol lebar yang presisi
    <div className="bg-white w-full pb-10 pt-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* KOLOM KIRI: BERITA TERKINI (7/12 Bagian) */}
      <main className="lg:col-span-7 xl:col-span-8">
        <div className="flex justify-between items-end mb-6 border-b-4 border-gray-900 pb-2">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-wide">
            Berita Terkini
          </h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {articles?.map((article) => (
            <NewsCard 
              key={article.id}
              title={article.title}
              slug={article.slug}
              thumbnailUrl={article.thumbnail_url}
              categoryName={(article.siraja_sub_categories as any)?.name || 'Uncategorized'}
              publishedAt={article.published_at}
            />
          ))}
          
          {(!articles || articles.length === 0) && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 font-medium">Belum ada berita yang diterbitkan saat ini.</p>
            </div>
          )}
        </div>
      </main>

      {/* KOLOM KANAN: SIDEBAR SOSIAL MEDIA (5/12 Bagian - Dibuat lebih lebar) */}
      <aside className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8">
        <div className="border-b-4 border-red-700 pb-2">
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">
            Ikuti Kita
          </h2>
        </div>
        
        <div className="flex flex-col gap-6">
          
          {/* Instagram Embed */}
          <div className="w-full">
            <div className="text-gray-400 font-bold mb-2 text-sm">Instagram Siraja.id</div>
            <blockquote 
              className="instagram-media" 
              data-instgrm-permalink="https://www.instagram.com/p/DY4Kuitg9TE/?utm_source=ig_embed&amp;utm_campaign=loading" 
              data-instgrm-version="14" 
              style={{ background: '#FFF', border: 0, borderRadius: '3px', boxShadow: '0 0 1px 0 rgba(0,0,0,0.5)', margin: '0', maxWidth: '100%', minWidth: 'auto', padding: 0, width: '100%' }}
            >
            </blockquote>
            <Script src="//www.instagram.com/embed.js" strategy="lazyOnload" />
          </div>

          {/* TikTok Embed - Lebar Penuh Sidebar */}
          <div className="w-full bg-white rounded-xl overflow-hidden">
            <div className="text-gray-400 font-bold mb-2 text-sm">TikTok Siraja.id</div>
            <blockquote 
              className="tiktok-embed" 
              cite="https://www.tiktok.com/@sirajaidofficial/video/7621402351743618311" 
              data-video-id="7621402351743618311" 
              style={{ width: '100%', maxWidth: '100%', margin: '0' }}
            >
              <section>
                <a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@sirajaidofficial?refer=embed">
                  @sirajaidofficial
                </a>
              </section>
            </blockquote>
            <Script async src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
          </div>

        </div>
      </aside>
    </div>
  );
}