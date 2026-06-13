import { supabase } from '@/lib/supabase';
import NewsCard from '@/components/NewsCard';
import NewsCardSlide from '@/components/NewsCardSlide';
import NewsCardHorizontal from '@/components/NewsCardHorizontal';
import Script from 'next/script'; 

export const revalidate = 0;

export default async function BeritaPage() {
  // Mengambil hingga 15 artikel agar variasi tampilan penuh dan ramai ke bawah
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
    .limit(15);

  if (error) {
    console.error("Gagal memuat berita:", error);
  }

  // Memisahkan artikel untuk variasi komponen card
  const slideArticles = articles?.slice(0, 1) || [];      // 1 Artikel pertama untuk Slide/Headline
  const gridArticles = articles?.slice(1, 4) || [];       // 3 Artikel berikutnya untuk Grid standar
  const horizontalArticles = articles?.slice(4) || [];   // Sisa artikel untuk list horizontal kecil banyak ke bawah

  return (
    <div className="bg-white w-full pb-10 pt-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* KOLOM KIRI: KONTEN BERITA UTAMA (7/12 Bagian) */}
      <main className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
        
        {/* HEADER HALAMAN */}
        <div className="border-b-4 border-gray-900 pb-2">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-wide">
            Kanal Berita
          </h1>
        </div>

        {/* JIKA TIDAK ADA BERITA SAMA SEKALI */}
        {(!articles || articles.length === 0) && (
          <div className="w-full flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">Belum ada berita yang diterbitkan saat ini.</p>
          </div>
        )}

        {/* SECTION 1: NEWS CARD SLIDE (BERITA UTAMA / HEADLINE) */}
        {slideArticles.length > 0 && (
          <div className="w-full">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Syor Utama</h2>
            {slideArticles.map((article) => (
              <NewsCardSlide
                key={article.id}
                title={article.title}
                slug={article.slug}
                thumbnailUrl={article.thumbnail_url}
                categoryName={(article.siraja_sub_categories as any)?.name || 'Uncategorized'}
                publishedAt={article.published_at}
              />
            ))}
          </div>
        )}

        {/* SECTION 2: NEWS CARD STANDARD (GRID BERITA) */}
        {gridArticles.length > 0 && (
          <div className="w-full">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Berita Terkini</h2>
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

        {/* SECTION 3: NEWS CARD HORIZONTAL (KECIL KECIL BANYAK KE BAWAH) */}
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

      {/* KOLOM KANAN: SIDEBAR SOSIAL MEDIA & BANNER (5/12 Bagian) */}
      <aside className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8">
        
        {/* JUDAL SIDEBAR */}
        <div className="border-b-4 border-red-700 pb-2">
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">
            Ikuti Kita
          </h2>
        </div>
        
        {/* WRAPPER MEDIA SOSIAL */}
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

          {/* SECTION TAMBAHAN: BANNER VERTIKAL SEBANYAK 2 */}
          <div className="w-full flex flex-col gap-4 mt-4">
            <div className="border-b-2 border-gray-200 pb-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ruang Promosi</span>
            </div>
            
            {/* Banner Vertikal 1 */}
            <div className="w-full h-80 bg-gray-50 border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-4 text-center group hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2 text-gray-400 group-hover:scale-110 transition-transform">
                📢
              </div>
              <p className="text-sm font-bold text-gray-700">Banner Vertikal 1</p>
              <p className="text-xs text-gray-400 mt-1">Sewa slot iklan di sini</p>
            </div>

            {/* Banner Vertikal 2 */}
            <div className="w-full h-80 bg-gray-50 border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-4 text-center group hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2 text-gray-400 group-hover:scale-110 transition-transform">
                💼
              </div>
              <p className="text-sm font-bold text-gray-700">Banner Vertikal 2</p>
              <p className="text-xs text-gray-400 mt-1">Hubungi Admin Siraja.id</p>
            </div>
          </div>

        </div>
      </aside>
    </div>
  );
}