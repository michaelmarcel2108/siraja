import Link from 'next/link';

export const metadata = {
  title: 'Jasa Pembuatan Website - Siraja.id',
  description: 'Pilihan paket pembuatan website profesional dan responsif untuk mendukung pertumbuhan bisnis dan digitalisasi ide kita.',
};

export default function JasaWebsitePage() {
  const websitePackages = [
    {
      name: 'Paket Landing Page',
      price: 'Rp 750.000',
      description: 'Solusi cepat dan hemat untuk halaman portofolio, peluncuran produk tunggal, atau profil ringkas bisnis kita.',
      features: [
        '1 Halaman Utama (Scroll Halus)',
        'Desain Modern & Mobile Friendly',
        'Integrasi Langsung ke WhatsApp',
        'Gratis Domain (.com / .id) 1 Tahun',
        'Gratis SSL Keamanan (HTTPS)',
        'Selesai dalam 3-5 Hari Kerja',
      ],
      notIncluded: [
        'Sistem Database Dinamis',
        'Halaman Admin / Dashboard Kelola',
        'Optimasi SEO Advance',
      ],
      popular: false,
      waLink: 'https://wa.me/628123456789?text=Halo%20Admin%20Siraja.id,%20saya%20tertarik%20dengan%20Paket%20Landing%20Page.',
    },
    {
      name: 'Paket UMKM & Bisnis',
      price: 'Rp 1.500.000',
      description: 'Pilihan paling populer untuk profil perusahaan, katalog produk, sekolah, hingga platform informasi desa kita.',
      features: [
        'Hingga 5-7 Halaman Utama',
        'Fitur Blog / Pengelolaan Berita',
        'Desain Premium Kustom sesuai Brand',
        'Integrasi Google Maps & Sosial Media',
        'Optimasi Kecepatan & SEO Dasar',
        'Gratis Domain & Hosting 1 Tahun',
        'Selesai dalam 7-12 Hari Kerja',
      ],
      notIncluded: [
        'Sistem Aplikasi Kustom Rumit',
        'Integrasi Payment Gateway Otomatis',
      ],
      popular: true,
      waLink: 'https://wa.me/628123456789?text=Halo%20Admin%20Siraja.id,%20saya%20tertarik%20dengan%20Paket%20UMKM%20dan%20Bisnis.',
    },
    {
      name: 'Paket Portal & Custom',
      price: 'Hubungi Kita',
      description: 'Sistem web aplikasi kustom berskala besar seperti portal berita dinamis, e-commerce, atau sistem informasi manajemen.',
      features: [
        'Jumlah Halaman Tidak Terbatas',
        'Panel Admin Kustom (Dashboard Kuat)',
        'Integrasi Database (Supabase / PostgreSQL)',
        'Sistem Keamanan Premium & Enkripsi',
        'Optimasi SEO Tingkat Lanjut',
        'Fitur Kustom sesuai Kebutuhan Teknis',
        'Garansi & Maintenance Bulanan',
      ],
      notIncluded: [],
      popular: false,
      waLink: 'https://wa.me/628123456789?text=Halo%20Admin%20Siraja.id,%20saya%20ingin%20berkonsultasi%20mengenai%20Paket%20Portal%20dan%20Custom%20Website.',
    },
  ];

  return (
    <div className="bg-white w-full pb-16 pt-4 space-y-12">
      
      {/* HEADER HALAMAN */}
      <div className="border-b-4 border-gray-900 pb-4">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-wide">
          Jasa Pembuatan Website
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Rangkaian solusi website profesional, responsif, dan berkecepatan tinggi untuk mendukung transformasi digital ekosistem kita.
        </p>
      </div>

      {/* GRID KARTU PAKET LAYANAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {websitePackages.map((pkg, idx) => (
          <div 
            key={idx} 
            className={`bg-white border-2 rounded-2xl p-6 relative flex flex-col h-full transition-all duration-300 ${
              pkg.popular 
                ? 'border-red-600 shadow-xl lg:-mt-4 lg:mb-4' 
                : 'border-gray-200 shadow-sm hover:shadow-md'
            }`}
          >
            {/* Tag Populer */}
            {pkg.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                Paling Populer
              </span>
            )}

            {/* Nama & Harga Paket */}
            <div className="mb-6 border-b border-gray-100 pb-4 text-center">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-wide mb-2">{pkg.name}</h3>
              <p className="text-2xl font-black text-red-700 tracking-tight">{pkg.price}</p>
              <p className="text-xs text-gray-400 mt-1">{pkg.price.includes('Rp') ? '/ Sekali Bayar' : 'Harga Menyesuaikan Fitur'}</p>
            </div>

            {/* Deskripsi Singkat */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6 text-center">
              {pkg.description}
            </p>

            {/* Daftar Fitur Terbuka */}
            <div className="space-y-3 flex-1 mb-8">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Fitur Utama:</p>
              {pkg.features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2.5 text-sm">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}

              {/* Daftar Fitur yang Belum Termasuk */}
              {pkg.notIncluded.map((feature, nIdx) => (
                <div key={nIdx} className="flex items-start gap-2.5 text-sm opacity-50">
                  <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span className="text-gray-400 line-through">{feature}</span>
                </div>
              ))}
            </div>

            {/* Tombol Ambil Paket */}
            <a 
              href={pkg.waLink}
              target="_blank"
              rel="noreferrer"
              className={`w-full text-center font-black uppercase tracking-wide text-sm py-3 rounded-xl transition-all duration-300 block ${
                pkg.popular
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-100'
                  : 'bg-gray-900 hover:bg-gray-800 text-white'
              }`}
            >
              Pesan Paket Ini
            </a>
          </div>
        ))}
      </div>

      {/* FOOTER INFORMASI TAMBAHAN */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-lg font-black text-gray-900 uppercase tracking-wide">Punya Kebutuhan Web yang Lebih Spesifik?</h4>
          <p className="text-sm text-gray-500">Mari diskusikan rancangan website impian kamu bersama tim pengembang software kita.</p>
        </div>
        <a 
          href="https://wa.me/628123456789?text=Halo%20Admin%20Siraja.id,%20saya%20ingin%20konsultasi%20custom%20website."
          target="_blank"
          rel="noreferrer"
          className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-black uppercase tracking-wide text-xs px-6 py-3 rounded-xl transition-colors shrink-0"
        >
          Konsultasi Gratis
        </a>
      </div>

    </div>
  );
}