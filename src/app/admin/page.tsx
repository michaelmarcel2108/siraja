"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function KelolaBerita() {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil data artikel saat halaman dimuat
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("siraja_articles")
      .select(`
        id,
        title,
        status,
        created_at,
        siraja_sub_categories (name)
      `)
      .order('created_at', { ascending: false });

    if (data) {
      setArticles(data);
    }
    if (error) {
      console.error("Gagal memuat artikel:", error);
    }
    setIsLoading(false);
  };

  // Fungsi untuk menghapus artikel
  const handleDelete = async (id: string, title: string) => {
    const isConfirmed = window.confirm(`Yakin ingin menghapus artikel:\n"${title}"?`);
    
    if (!isConfirmed) return;

    // Proses hapus di database Supabase
    const { error } = await supabase
      .from("siraja_articles")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Gagal menghapus artikel: " + error.message);
    } else {
      // Hapus data dari state agar tabel langsung update tanpa refresh
      setArticles(articles.filter(article => article.id !== id));
      alert("Artikel berhasil dihapus!");
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Berita</h1>
        <Link 
          href="/admin/tulis" 
          className="bg-red-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-800 transition text-sm"
        >
          + Tulis Artikel Baru
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-gray-500 font-medium">Memuat data artikel...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                <th className="px-4 py-3 rounded-tl-lg">Judul Artikel</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Tanggal Dibuat</th>
                <th className="px-4 py-3 text-center rounded-tr-lg">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    Belum ada artikel yang ditulis.
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4 text-gray-900 font-medium">
                      {article.title}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {article.siraja_sub_categories?.name || '-'}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        article.status === 'published' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {article.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {new Date(article.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(article.id, article.title)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition"
                        title="Hapus Artikel"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}