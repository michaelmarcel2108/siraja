'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// Tipe data untuk banner
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

  // Efek untuk mendapatkan tanggal hari ini (mencegah error hydration di Next.js)
  useEffect(() => {
    const dateStr = new Date().toLocaleDateString('id-ID', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    setToday(dateStr);
  }, []);

  // Efek untuk mengambil data banner dari Supabase
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

  // Efek untuk menjalankan slideshow otomatis setiap 5 detik
  useEffect(() => {
    if (banners.length <= 1) return; // Tidak perlu slideshow kalau gambar cuma 1 atau kosong

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Ganti gambar setiap 5000ms (5 detik)

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <>
      {/* HEADER (Area Logo & Topbar) - Akan ikut ter-scroll ke atas */}
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
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <Image 
              src="/logo_siraja-horizontal-1.png"
              alt="Logo Siraja.id" 
              width={160} 
              height={160} 
              className="object-contain"
              priority
            />
          </Link>

          {/* SCRIPT SLIDESHOW BANNER IKLAN (728x90) */}
          <div className="w-full md:w-[728px] h-[90px] bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 text-sm font-semibold rounded hidden md:flex relative overflow-hidden group">
            {banners.length > 0 ? (
              banners.map((banner, index) => (
                <a
                  key={banner.id}
                  href={banner.link_url}
                  target="_blank"
                  rel="noreferrer"
                  // Transisi fade-in & fade-out yang halus
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={banner.image_url}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                </a>
              ))
            ) : (
              <span>[ Space Banner Iklan 728x90 ]</span>
            )}
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
                Jasa
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>
              <ul className="absolute left-0 top-full w-64 bg-white border-t-2 border-red-700 shadow-lg hidden group-hover:block transition-all duration-300 z-50">
                <li><Link href="/layanan/social-media" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Social Media Management</Link></li>
                <li className="border-t border-gray-100"><Link href="/layanan/website" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Website Development</Link></li>
                <li className="border-t border-gray-100"><Link href="/layanan/content" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">Content Service</Link></li>
              </ul>
            </li>

          </ul>
        </div>
      </nav>
    </>
  );
}