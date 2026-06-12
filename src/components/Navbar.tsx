import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const today = new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <>
      {/* HEADER (Area Logo & Topbar) - Akan ikut ter-scroll ke atas */}
      <header className="bg-white relative z-40">
        {/* Top Bar */}
        <div className="bg-gray-900 text-white text-xs py-2">
          <div className="max-w-6xl mx-auto px-4 flex justify-between">
            <span suppressHydrationWarning>{today}</span>
            <div className="hidden md:flex gap-4">
              <span className="hover:text-red-400 cursor-pointer transition">Buleleng</span>
              <span className="hover:text-red-400 cursor-pointer transition">Denpasar</span>
              <span className="hover:text-red-400 cursor-pointer transition">Badung</span>
            </div>
          </div>
        </div>

        {/* Logo & Banner Area */}
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-1">
            <Image 
              src="/logo_siraja.png" 
              alt="Logo Siraja.id" 
              width={60} 
              height={60} 
              className="object-contain"
              priority
            />
          </Link>

          {/* Space Banner Iklan */}
          <div className="w-full md:w-[728px] h-[90px] bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-400 text-sm font-semibold rounded hidden md:flex">
            [ Space Banner Iklan 728x90 ]
          </div>
        </div>
      </header>

      {/* MAIN NAVBAR (Menu Utama) - Akan menempel / sticky di atas */}
      <nav className="border-t-2 border-b-2 border-gray-100 bg-white sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <ul className="flex items-center gap-6 md:gap-8 overflow-visible whitespace-nowrap text-sm font-bold text-gray-800 uppercase tracking-wide">
            
            <li className="py-4">
              <Link href="/" className="hover:text-red-600 transition duration-200">
                Beranda
              </Link>
            </li>

            <li className="relative group py-4">
              <Link href="/kategori/daerah" className="hover:text-red-600 transition duration-200 flex items-center gap-1">
                Daerah
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>
              <ul className="absolute left-0 top-full w-48 bg-white border-t-2 border-red-700 shadow-lg hidden group-hover:block transition-all duration-300 z-50">
                <li><Link href="/kategori/daerah/buleleng" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Buleleng</Link></li>
                <li className="border-t border-gray-100"><Link href="/kategori/daerah/denpasar" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Denpasar</Link></li>
                <li className="border-t border-gray-100"><Link href="/kategori/daerah/badung" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Badung</Link></li>
              </ul>
            </li>

            <li className="relative group py-4">
              <Link href="/kategori/pendidikan" className="hover:text-red-600 transition duration-200 flex items-center gap-1">
                Pendidikan
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>
              <ul className="absolute left-0 top-full w-48 bg-white border-t-2 border-red-700 shadow-lg hidden group-hover:block transition-all duration-300 z-50">
                <li><Link href="/kategori/pendidikan/kampus" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Seputar Kampus</Link></li>
                <li className="border-t border-gray-100"><Link href="/kategori/pendidikan/sekolah" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Sekolah</Link></li>
              </ul>
            </li>

            <li className="py-4">
              <Link href="/kategori/olahraga" className="hover:text-red-600 transition duration-200">
                Olahraga
              </Link>
            </li>

            <li className="relative group py-4">
              <Link href="/kategori/umkm" className="hover:text-red-600 transition duration-200 flex items-center gap-1">
                UMKM
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>
              <ul className="absolute left-0 top-full w-56 bg-white border-t-2 border-red-700 shadow-lg hidden group-hover:block transition-all duration-300 z-50">
                <li><Link href="/kategori/umkm/kuliner" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Rekomendasi Kuliner</Link></li>
                <li className="border-t border-gray-100"><Link href="/kategori/umkm/produk-lokal" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Produk Lokal</Link></li>
              </ul>
            </li>

            <li className="text-gray-300 py-4">|</li>

            <li className="relative group py-4">
              <Link href="/layanan" className="text-red-700 hover:text-red-500 transition duration-200 flex items-center gap-1">
                Layanan Kita
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>
              <ul className="absolute left-0 top-full w-64 bg-white border-t-2 border-red-700 shadow-lg hidden group-hover:block transition-all duration-300 z-50">
                <li><Link href="/layanan/social-media" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Social Media Management</Link></li>
                <li className="border-t border-gray-100"><Link href="/layanan/video-review" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Video Review</Link></li>
                <li className="border-t border-gray-100"><Link href="/layanan/ecommerce" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">E-Commerce Activation</Link></li>
              </ul>
            </li>

          </ul>
        </div>
      </nav>
    </>
  );
}