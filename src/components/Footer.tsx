import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-10 mt-12 border-t-4 border-red-700">
      <div className="max-w-6xl mx-auto px-4 text-center md:text-left grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Kolom 1: About */}
        <div>
          <h3 className="text-2xl font-bold mb-4">SIRAJA.ID</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Portal berita lokal dan layanan manajemen sosial media profesional untuk membantu bisnis kita lebih dikenal luas.
          </p>
        </div>
        
        {/* Kolom 2: Kontak */}
        <div>
          <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">Hubungi Kita</h4>
          <p className="text-sm text-gray-400">Jl. Gajah Mada, Gang Swastika No.2H<br/>Singaraja, Buleleng [cite: 269]</p>
          <p className="text-sm text-gray-400 mt-2">WA: 081 238 381157 [cite: 268]</p>
        </div>
        
        {/* Kolom 3: Link Layanan */}
        <div>
          <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">Layanan</h4>
          <ul className="text-sm text-gray-400 space-y-2">
            <li><Link href="/layanan" className="hover:text-white transition">Social Media Management</Link></li>
            <li><Link href="/layanan" className="hover:text-white transition">Video Review</Link></li>
            <li><Link href="/layanan" className="hover:text-white transition">E-Commerce Activation</Link></li>
          </ul>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 mt-10 pt-4 border-t border-gray-800 flex flex-col items-center justify-center gap-2">
        <p>© {currentYear} Siraja.id - #SelaluAdaBisaBersamaSiraja [cite: 263]</p>
      </div>
    </footer>
  );
}