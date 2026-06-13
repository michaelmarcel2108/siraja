'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface HorizontalBanner {
  id: number;
  title: string;
  image_url: string;
  link_url: string;
}

export default function Navbar() {
  const [today, setToday] = useState('');
  const [banners, setBanners] = useState<HorizontalBanner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State untuk Mobile Menu & Dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const dateStr = new Date().toLocaleDateString('id-ID', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    setToday(dateStr);
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      const { data, error } = await supabase
        .from('siraja_horizontal_banners')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setBanners(data);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const toggleMobileDropdown = (menu: string) => {
    if (openMobileDropdown === menu) {
      setOpenMobileDropdown(null);
    } else {
      setOpenMobileDropdown(menu);
    }
  };

  return (
    <>
      <header className="bg-white relative z-40">
        {/* Top Bar */}
        <div className="bg-gray-900 text-white text-xs py-2">
          <div className="max-w-6xl mx-auto px-4 flex justify-between">
            <span>{today || 'Memuat tanggal...'}</span>
            <div className="hidden md:flex gap-4">
              <span className="hover:text-red-400 cursor-pointer transition">Buleleng</span>
              <span className="hover:text-red-400 cursor-pointer transition">Denpasar</span>
              <span className="hover:text-red-400 cursor-pointer transition">Badung</span>
            </div>
          </div>
        </div>

        {/* Logo & Banner Area */}
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-6 flex flex-col gap-4">
          
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 shrink-0">
              <Image 
                src="/logo-fix.png" 
                alt="Logo Siraja.id" 
                width={160} 
                height={160} 
                className="object-contain"
                priority
              />
            </Link>

            {/* Banner Desktop (Sembunyi di Mobile) */}
            <div className="hidden md:flex w-[728px] h-[90px] bg-gray-50 border border-gray-200 items-center justify-center text-gray-400 text-sm font-semibold rounded relative overflow-hidden group">
              {banners.length > 0 ? (
                banners.map((banner, index) => (
                  <a
                    key={banner.id}
                    href={banner.link_url}
                    target="_blank"
                    rel="noreferrer"
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" />
                  </a>
                ))
              ) : (
                <span>[ Space Banner Iklan 728x90 ]</span>
              )}
            </div>

            {/* Tombol Hamburger (Hanya Tampil di Mobile) */}
            <button 
              className="md:hidden p-2 text-gray-900 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>

          {/* Banner Mobile (Muncul di bawah logo saat layar kecil) */}
          <div className="md:hidden w-full h-[80px] bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 text-xs font-semibold rounded relative overflow-hidden group">
            {banners.length > 0 ? (
              banners.map((banner, index) => (
                <a
                  key={banner.id}
                  href={banner.link_url}
                  target="_blank"
                  rel="noreferrer"
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" />
                </a>
              ))
            ) : (
              <span>[ Space Banner Iklan Mobile ]</span>
            )}
          </div>

        </div>
      </header>

      {/* MAIN NAVBAR (Sticky Menu) */}
      <nav className="border-t-2 border-b-2 border-gray-100 bg-white sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 relative">
          
          {/* MENU DESKTOP */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8 overflow-visible whitespace-nowrap text-sm font-bold text-gray-800 uppercase tracking-wide">
            <li className="py-4"><Link href="/" className="hover:text-red-600 transition duration-200">Beranda</Link></li>
            
            <li className="relative group py-4">
              <Link href="/kategori/daerah" className="hover:text-red-600 transition duration-200 flex items-center gap-1">Daerah <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></Link>
              <ul className="absolute left-0 top-full w-48 bg-white border-t-2 border-red-700 shadow-lg hidden group-hover:block transition-all duration-300 z-50">
                <li><Link href="/kategori/daerah/buleleng" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Buleleng</Link></li>
                <li className="border-t border-gray-100"><Link href="/kategori/daerah/denpasar" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Denpasar</Link></li>
                <li className="border-t border-gray-100"><Link href="/kategori/daerah/badung" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Badung</Link></li>
              </ul>
            </li>

            <li className="relative group py-4">
              <Link href="/kategori/pendidikan" className="hover:text-red-600 transition duration-200 flex items-center gap-1">Pendidikan <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></Link>
              <ul className="absolute left-0 top-full w-48 bg-white border-t-2 border-red-700 shadow-lg hidden group-hover:block transition-all duration-300 z-50">
                <li><Link href="/kategori/pendidikan/kampus" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Seputar Kampus</Link></li>
                <li className="border-t border-gray-100"><Link href="/kategori/pendidikan/sekolah" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Sekolah</Link></li>
              </ul>
            </li>

            <li className="py-4"><Link href="/kategori/olahraga" className="hover:text-red-600 transition duration-200">Olahraga</Link></li>

            <li className="relative group py-4">
              <Link href="/kategori/umkm" className="hover:text-red-600 transition duration-200 flex items-center gap-1">UMKM <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></Link>
              <ul className="absolute left-0 top-full w-56 bg-white border-t-2 border-red-700 shadow-lg hidden group-hover:block transition-all duration-300 z-50">
                <li><Link href="/kategori/umkm/kuliner" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Rekomendasi Kuliner</Link></li>
                <li className="border-t border-gray-100"><Link href="/kategori/umkm/produk-lokal" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Produk Lokal</Link></li>
              </ul>
            </li>

            <li className="text-gray-300 py-4">|</li>

            <li className="relative group py-4">
              <Link href="/layanan" className="text-red-700 hover:text-red-500 transition duration-200 flex items-center gap-1">Layanan Kita <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></Link>
              <ul className="absolute left-0 top-full w-64 bg-white border-t-2 border-red-700 shadow-lg hidden group-hover:block transition-all duration-300 z-50">
                <li><Link href="/layanan/social-media" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Social Media Management</Link></li>
                <li className="border-t border-gray-100"><Link href="/layanan/video-review" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Video Review</Link></li>
                <li className="border-t border-gray-100"><Link href="/layanan/ecommerce" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">E-Commerce Activation</Link></li>
                <li className="border-t border-gray-100"><Link href="/layanan/website" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Pembuatan Website</Link></li>
              </ul>
            </li>
          </ul>

          {/* MENU MOBILE (Dropdown dari Hamburger) */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white border-b-2 border-red-700 shadow-xl flex flex-col text-sm font-bold text-gray-800 uppercase tracking-wide z-50">
              <Link href="/" className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>Beranda</Link>
              
              {/* Dropdown Mobile: Daerah */}
              <div>
                <button onClick={() => toggleMobileDropdown('daerah')} className="w-full text-left px-4 py-3 border-b border-gray-100 flex justify-between items-center hover:bg-gray-50">
                  Daerah <svg className={`w-4 h-4 transition-transform ${openMobileDropdown === 'daerah' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {openMobileDropdown === 'daerah' && (
                  <div className="bg-gray-50 flex flex-col border-b border-gray-100 pl-4">
                    <Link href="/kategori/daerah/buleleng" className="px-4 py-3 border-b border-gray-100 text-gray-600 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>Buleleng</Link>
                    <Link href="/kategori/daerah/denpasar" className="px-4 py-3 border-b border-gray-100 text-gray-600 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>Denpasar</Link>
                    <Link href="/kategori/daerah/badung" className="px-4 py-3 text-gray-600 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>Badung</Link>
                  </div>
                )}
              </div>

              {/* Dropdown Mobile: Pendidikan */}
              <div>
                <button onClick={() => toggleMobileDropdown('pendidikan')} className="w-full text-left px-4 py-3 border-b border-gray-100 flex justify-between items-center hover:bg-gray-50">
                  Pendidikan <svg className={`w-4 h-4 transition-transform ${openMobileDropdown === 'pendidikan' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {openMobileDropdown === 'pendidikan' && (
                  <div className="bg-gray-50 flex flex-col border-b border-gray-100 pl-4">
                    <Link href="/kategori/pendidikan/kampus" className="px-4 py-3 border-b border-gray-100 text-gray-600 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>Seputar Kampus</Link>
                    <Link href="/kategori/pendidikan/sekolah" className="px-4 py-3 text-gray-600 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>Sekolah</Link>
                  </div>
                )}
              </div>

              <Link href="/kategori/olahraga" className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>Olahraga</Link>

              {/* Dropdown Mobile: UMKM */}
              <div>
                <button onClick={() => toggleMobileDropdown('umkm')} className="w-full text-left px-4 py-3 border-b border-gray-100 flex justify-between items-center hover:bg-gray-50">
                  UMKM <svg className={`w-4 h-4 transition-transform ${openMobileDropdown === 'umkm' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {openMobileDropdown === 'umkm' && (
                  <div className="bg-gray-50 flex flex-col border-b border-gray-100 pl-4">
                    <Link href="/kategori/umkm/kuliner" className="px-4 py-3 border-b border-gray-100 text-gray-600 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>Rekomendasi Kuliner</Link>
                    <Link href="/kategori/umkm/produk-lokal" className="px-4 py-3 text-gray-600 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>Produk Lokal</Link>
                  </div>
                )}
              </div>

              {/* Dropdown Mobile: Layanan Kita */}
              <div>
                <button onClick={() => toggleMobileDropdown('layanan')} className="w-full text-left px-4 py-3 text-red-700 flex justify-between items-center hover:bg-red-50">
                  Layanan Kita <svg className={`w-4 h-4 transition-transform ${openMobileDropdown === 'layanan' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {openMobileDropdown === 'layanan' && (
                  <div className="bg-red-50 flex flex-col pl-4 border-t border-red-100">
                    <Link href="/layanan/social-media" className="px-4 py-3 border-b border-red-100 text-red-800 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>Social Media Management</Link>
                    <Link href="/layanan/video-review" className="px-4 py-3 border-b border-red-100 text-red-800 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>Video Review</Link>
                    <Link href="/layanan/ecommerce" className="px-4 py-3 border-b border-red-100 text-red-800 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>E-Commerce Activation</Link>
                    <Link href="/layanan/website" className="px-4 py-3 text-red-800 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>Pembuatan Website</Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}