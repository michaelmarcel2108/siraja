"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function TulisArtikel() {
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [status, setStatus] = useState("draft");
  
  // State baru khusus untuk file gambar
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase
        .from("siraja_sub_categories")
        .select(`id, name, siraja_categories (name)`);
      if (data) setSubCategories(data);
    }
    fetchCategories();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    const autoSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    setSlug(autoSlug);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let uploadedImageUrl = null;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('siraja_images')
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("Gagal upload gambar: " + uploadError.message);
        setIsSubmitting(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('siraja_images')
        .getPublicUrl(fileName);

      uploadedImageUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from("siraja_articles").insert([
      {
        title,
        slug,
        content,
        thumbnail_url: uploadedImageUrl,
        sub_category_id: subCategoryId || null,
        status,
        published_at: status === "published" ? new Date().toISOString() : null,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      alert("Gagal menyimpan artikel: " + error.message);
    } else {
      alert("Artikel berhasil disimpan!");
      router.push("/admin/berita"); 
    }
  };

  return (
    <div className="max-w-4xl bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Tulis Artikel Baru</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Judul Artikel</label>
          <input type="text" required value={title} onChange={handleTitleChange} placeholder="Masukkan judul berita..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Slug (URL)</label>
          <input type="text" required value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 outline-none transition text-gray-600" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
            <select required value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition">
              <option value="" disabled>Pilih Kategori...</option>
              {subCategories.map((sub) => (
                <option key={sub.id} value={sub.id}>{sub.siraja_categories?.name} - {sub.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition">
              <option value="draft">Draft (Simpan Sementara)</option>
              <option value="published">Publish (Tampilkan ke Publik)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Thumbnail Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 transition cursor-pointer border border-gray-300 rounded-lg p-1"
          />
          {imageFile && <p className="text-xs text-green-600 mt-2">Gambar terpilih: {imageFile.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Isi Berita</label>
          <textarea required rows={12} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Tulis isi berita di sini..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition resize-y"></textarea>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button type="submit" disabled={isSubmitting} className={`px-8 py-3 rounded-lg font-bold text-white transition shadow-md ${isSubmitting ? "bg-red-400 cursor-not-allowed" : "bg-red-700 hover:bg-red-800"}`}>
            {isSubmitting ? "Mengupload & Menyimpan..." : "Simpan Artikel"}
          </button>
        </div>

      </form>
    </div>
  );
}