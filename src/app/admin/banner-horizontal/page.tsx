'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';

// Definisi tipe data Banner Horizontal
interface HorizontalBanner {
  id: number;
  title: string;
  image_url: string;
  link_url: string;
  status: string;
}

export default function AdminBannerHorizontalPage() {
  const [banners, setBanners] = useState<HorizontalBanner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [status, setStatus] = useState('active');
  
  // Reference untuk mereset input file
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch data banner saat komponen dimuat
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('siraja_horizontal_banners')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Gagal mengambil data banner horizontal:', error);
      alert('Gagal memuat data banner!');
    } else {
      setBanners(data || []);
    }
    setIsLoading(false);
  };

  const handleAddBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageFile) {
      alert('Judul dan Gambar wajib diisi!');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload Gambar ke Supabase Storage (bucket: siraja_images)
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `banner-horizontal-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('siraja_images')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      // 2. Dapatkan Public URL
      const { data: publicUrlData } = supabase.storage
        .from('siraja_images')
        .getPublicUrl(fileName);

      const publicImageUrl = publicUrlData.publicUrl;

      // 3. Simpan data ke tabel database siraja_horizontal_banners
      const { error: dbError } = await supabase
        .from('siraja_horizontal_banners')
        .insert([
          {
            title,
            image_url: publicImageUrl,
            link_url: linkUrl || '#',
            status
          }
        ]);

      if (dbError) throw dbError;

      alert('Banner slideshow berhasil diunggah dan ditambahkan!');
      
      // Reset form
      setTitle('');
      setImageFile(null);
      setLinkUrl('');
      setStatus('active');
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      // Refresh tabel
      fetchBanners();

    } catch (error: any) {
      console.error('Error saat upload:', error);
      alert('Gagal menambahkan banner: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah kamu yakin ingin menghapus banner ini?')) return;

    const { error } = await supabase
      .from('siraja_horizontal_banners')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Gagal menghapus banner:', error);
      alert('Gagal menghapus banner!');
    } else {
      fetchBanners();
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    const { error } = await supabase
      .from('siraja_horizontal_banners')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error('Gagal mengubah status:', error);
      alert('Gagal mengubah status banner!');
    } else {
      fetchBanners();
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 uppercase">Kelola Slideshow Navbar</h1>
        <p className="text-gray-500 mt-2">Tambahkan dan atur banner horizontal (ukuran disarankan 728x90) yang tampil di header atas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI: FORM TAMBAH BANNER */}
        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Tambah Banner Baru</h2>
          <form onSubmit={handleAddBanner} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul Iklan / Nama Klien</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Misal: Promo Kampus 2026"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              />
            </div>
            
            {/* INPUT FILE UPLOAD GAMBAR */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Gambar (Rekomendasi 728x90)</label>
              <input 
                type="file" 
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tautan Tujuan (Link URL)</label>
              <input 
                type="text" 
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status Penayangan</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
              >
                <option value="active">Aktif (Tampil)</option>
                <option value="inactive">Nonaktif (Disembunyikan)</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Mengunggah...' : 'Upload Banner'}
            </button>
          </form>
        </div>

        {/* KOLOM KANAN: DAFTAR BANNER HORIZONTAL */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="text-center py-10 text-gray-500">Memuat data banner...</div>
          ) : banners.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 border border-dashed border-gray-300 rounded-xl">
              <p className="text-gray-500 font-medium">Belum ada banner slideshow.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {banners.map((banner) => (
                <div key={banner.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row">
                  {/* Thumbnail Banner (Dibuat memanjang) */}
                  <div className="w-full md:w-1/2 h-24 md:h-auto bg-gray-100 relative group border-b md:border-b-0 md:border-r border-gray-200">
                    <img 
                      src={banner.image_url} 
                      alt={banner.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded text-white ${banner.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}>
                        {banner.status === 'active' ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Info Banner */}
                  <div className="p-4 flex flex-col flex-1 justify-center">
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{banner.title}</h3>
                    <a href={banner.link_url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline line-clamp-1 mb-4">
                      {banner.link_url}
                    </a>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleToggleStatus(banner.id, banner.status)}
                        className={`px-3 text-xs font-bold py-1.5 rounded border transition-colors ${
                          banner.status === 'active' 
                            ? 'border-yellow-500 text-yellow-600 hover:bg-yellow-50' 
                            : 'border-green-500 text-green-600 hover:bg-green-50'
                        }`}
                      >
                        {banner.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                      </button>
                      <button 
                        onClick={() => handleDelete(banner.id)}
                        className="px-3 text-xs font-bold py-1.5 rounded border border-red-500 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}