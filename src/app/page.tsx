import { supabase } from '@/lib/supabase';
import NewsCard from '@/components/NewsCard';
import HeadlineSlider from '@/components/HeadlineSlider'; 
import NewsCardHorizontal from '@/components/NewsCardHorizontal';
import Script from 'next/script'; 

export const revalidate = 0;

export default async function Home() {
  // Fetch data artikel dan banner secara paralel agar loading lebih cepat
  const [articlesResponse, bannersResponse] = await Promise.all([
    supabase
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
      .limit(22), // <-- DIUBAH MENJADI 22 AGAR SISA ARTIKEL HORIZONTAL BERTAMBAH 7 ITEM
    
    supabase
      .from('siraja_banners')
      .select('id, title, image_url, link_url')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(2)
  ]);

  const articles = articlesResponse.data;
  const banners = bannersResponse.data;

  if (articlesResponse.error) console.error("Gagal memuat berita:", articlesResponse.error);
  if (bannersResponse.error) console.error("Gagal memuat banner:", bannersResponse.error);

  // Memisahkan artikel untuk variasi komponen card di dashboard
  const slideArticles = articles?.slice(0, 3) || [];       // 3 Artikel terbaru untuk Slider
  const gridArticles = articles?.slice(3, 9) || [];        // 6 Artikel untuk Grid Terpopuler
  const horizontalArticles = articles?.slice(9) || [];     // Otomatis mengambil sisa 13 artikel ke bawah

  // Format data slide agar sesuai dengan tipe di komponen HeadlineSlider
  const formattedSlideArticles = slideArticles.map(article => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    thumbnailUrl: article.thumbnail_url,
    categoryName: (article.siraja_sub_categories as any)?.name || 'Uncategorized',
    publishedAt: article.published_at
  }));

  return (
    <div className="bg-white w-full pb-10 pt-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* KOLOM KIRI: KONTEN UTAMA DASHBOARD */}
      <main className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
        
        <div className="flex justify-between items-end mb-2 pb-2">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-wide">
            Berita Terkini
          </h1>
        </div>

        {(!articles || articles.length === 0) && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">Belum ada berita yang diterbitkan saat ini.</p>
          </div>
        )}

        {/* SECTION 1: HEADLINE SLIDER BERITA UTAMA */}
        {formattedSlideArticles.length > 0 && (
          <div className="w-full">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Sorotan Utama</h2>
            <HeadlineSlider articles={formattedSlideArticles} />
          </div>
        )}

        {/* SECTION 2: NEWS CARD STANDARD (GRID) */}
        {gridArticles.length > 0 && (
          <div className="w-full">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Berita Terpopuler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {gridArticles.map((article) => (
                <NewsCard 
                  key={article.id}
                  title={article.title}
                  slug={article.slug}
                  thumbnailUrl={article.thumbnail_url}
                  categoryName={(article.siraja_sub_categories as any)?.name || 'Uncategorized'}
                  publishedAt={article.published_at}
                />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: NEWS CARD HORIZONTAL (SISA BANYAK KE BAWAH) */}
        {horizontalArticles.length > 0 && (
          <div className="w-full">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Daftar Berita Lainnya</h2>
            <div className="flex flex-col gap-4">
              {horizontalArticles.map((article) => (
                <NewsCardHorizontal
                  key={article.id}
                  title={article.title}
                  slug={article.slug}
                  thumbnailUrl={article.thumbnail_url}
                  categoryName={(article.siraja_sub_categories as any)?.name || 'Uncategorized'}
                  publishedAt={article.published_at}
                />
              ))}
            </div>
          </div>
        )}
        
      </main>

      {/* KOLOM KANAN: SIDEBAR SOSIAL MEDIA & BANNER PROMOSI */}
      <aside className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8">
        
        <div className=" pb-2">
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">
            Ikuti Kita
          </h2>
        </div>
        
        <div className="flex flex-col gap-6">
          
          {/* Instagram Embed */}
          <div className="w-full overflow-hidden">
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

          {/* TikTok Embed */}
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

          {/* SECTION BANNER VERTIKAL DINAMIS DARI DATABASE */}
          <div className="w-full flex flex-col gap-4 mt-4">
            <div className="border-b-2 border-gray-200 pb-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ruang Promosi</span>
            </div>
            
            {banners && banners.length > 0 ? (
              banners.map((banner) => (
                <a 
                  key={banner.id}
                  href={banner.link_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="block w-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group bg-gray-100"
                >
                  <img 
                    src={banner.image_url} 
                    alt={banner.title} 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </a>
              ))
            ) : (
              <div className="w-full h-40 bg-gray-50 border border-dashed border-gray-300 rounded-xl flex items-center justify-center p-4 text-center">
                <p className="text-xs text-gray-400">Belum ada promo aktif</p>
              </div>
            )}
          </div>

        </div>
      </aside>
    </div>
  );
}