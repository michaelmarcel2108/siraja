import Link from 'next/link';

export const metadata = {
  title: 'Layanan & Harga | Siraja.id',
  description: 'Paket Social Media Management dan E-Commerce Activation Siraja.id',
};

export default function LayananPage() {
  const socmedPackages = [
    {
      name: 'Paket UMKM',
      price: 'Rp 500.000',
      normalPrice: 'Rp 600.000',
      features: [
        '4 Video (1 Minggu 1X Post Video)',
        '4 Desain Produk (1 Minggu 1X Post Desain)',
        'Posting di TikTok & Instagram',
        'Tulisan Caption & Hashtag Optimasi',
        'Setup Profil Bio & Link',
        'Admin Posting',
        'Video 1080p Quality 60 FPS',
      ],
      isPopular: false,
    },
    {
      name: 'Paket Silver',
      price: 'Rp 750.000',
      normalPrice: 'Rp 850.000',
      features: [
        '8 Video (1 Minggu 2X Post Video)',
        '8 Desain Produk (1 Minggu 2X Post Desain)',
        'Posting di TikTok & Instagram',
        'Tulisan Caption & Hashtag Optimasi',
        'Setup Profil Bio & Link',
        '2 Talent & Visit',
        'Admin Posting',
        'Video 1080p Quality 60 FPS',
      ],
      isPopular: true, // Paling Laris dipindah ke sini
    },
    {
      name: 'Paket Gold',
      price: 'Rp 900.000',
      normalPrice: 'Rp 1.000.000',
      features: [
        '12 Video (1 Minggu 3X Post Video)',
        '12 Desain Produk (1 Minggu 3X Post Desain)',
        'Posting di TikTok & Instagram',
        'Tulisan Caption & Hashtag Optimasi',
        'Setup Profil Bio & Link',
        '2 Talent & Visit',
        'Admin Posting',
        'Video 1080p Quality 60 FPS',
      ],
      isPopular: false, // Dihapus dari sini
    },
    {
      name: 'Paket Sultan',
      price: 'Rp 1.500.000',
      normalPrice: '',
      features: [
        '20 Video (1 Minggu 5X Post Video)',
        '30 Desain Produk (1 Hari 1X Post Desain)',
        'Posting di TikTok & Instagram',
        'Tulisan Caption & Hashtag Optimasi',
        'Setup Profil Bio & Link',
        '2 Talent & Visit',
        'Admin Posting',
        'Video 1080p Quality 60 FPS',
      ],
      isPopular: false,
    },
  ];

  return (
    <div className="bg-white w-full pb-16 pt-8">
      
      {/* HEADER LAYANAN */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-wide mb-4">
          Beresin Sosial Media Kamu!
        </h1>
        <p className="text-lg text-gray-600">
          Ubah tampilan Instagram & TikTok bisnismu jadi lebih keren. Hemat biaya produksi, tingkatkan penjualan, ayo gabung bersama kita!
        </p>
      </div>

      {/* SECTION: SOCMED MANAGEMENT */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-red-700 bg-red-50 inline-block px-6 py-2 rounded-full uppercase tracking-wider">
            Social Media Management
          </h2>
        </div>

        {/* Grid diubah menjadi xl:grid-cols-4 agar 4 paket sejajar rapi */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          {socmedPackages.map((pkg, index) => (
            <div 
              key={index} 
              className={`relative bg-white rounded-2xl border-2 p-6 xl:p-8 shadow-lg flex flex-col h-full transition-transform hover:-translate-y-2 ${
                pkg.isPopular ? 'border-red-600' : 'border-gray-100'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                  Paling Laris
                </div>
              )}
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
              <div className="mb-6 pb-6 border-b border-gray-100">
                {pkg.normalPrice && (
                  <span className="text-sm text-gray-400 line-through block mb-1">{pkg.normalPrice}</span>
                )}
                <span className="text-3xl xl:text-4xl font-black text-gray-900">{pkg.price}</span>
                <span className="text-sm text-gray-500 font-medium block xl:inline mt-1 xl:mt-0"> / bulan</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    <span className="text-sm text-gray-700 leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href={`https://wa.me/6281238381157?text=Halo%20Siraja.id,%20saya%20tertarik%20dengan%20${pkg.name}%20Social%20Media%20Management.`}
                target="_blank"
                rel="noreferrer"
                className={`w-full py-3 rounded-lg text-center font-bold transition-colors ${
                  pkg.isPopular 
                    ? 'bg-red-600 text-white hover:bg-red-800' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Pilih Paket
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: ECOMMERCE ACTIVATION */}
      <section className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-600 rounded-full blur-[80px] opacity-40"></div>
        
        <div className="flex flex-col md:flex-row gap-10 relative z-10 items-center">
          <div className="md:w-1/2">
            <span className="text-red-400 font-bold tracking-wider text-sm uppercase block mb-2">
              Spesial Marketplace
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
              E-Commerce Activation Package
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Tersedia untuk Shopee, Tokopedia, & TikTok Shop. Maksimalkan tampilan tokomu untuk konversi penjualan yang lebih tinggi!
            </p>
            <div className="flex items-end gap-4 mb-8">
              <div className="text-5xl font-black text-white">Rp 1.000.000</div>
              <div className="text-xl text-gray-500 line-through font-bold pb-1">Rp 2.000.000</div>
            </div>
            <a 
              href="https://wa.me/6281238381157?text=Halo%20Siraja.id,%20saya%20tertarik%20dengan%20Paket%20E-Commerce%20Activation."
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-red-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-red-500 transition-colors shadow-[0_0_20px_rgba(220,38,38,0.4)]"
            >
              Pesan Sekarang
            </a>
          </div>
          
          <div className="md:w-1/2 w-full bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <h3 className="font-bold text-lg mb-4 text-white border-b border-gray-700 pb-2">Yang Kamu Dapatkan:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Product ONLY Photoshoot',
                'Graphic Design utk Katalog',
                'Max 4 slide per-etalase',
                'Max 10 SKU',
                'Caption/deskripsi (SEO Friendly)',
                'Setting Etalase Product',
                'Setting Auto Reply',
                'Keyword Optimization',
                '1X Banner E-Commerce',
                'Deskripsi Toko'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span className="text-sm text-gray-300 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}