-- ============================================
-- FIX: Update Broken Image URLs with Stable Ones
-- ============================================

-- 1. Tambahkan kolom image_url ke tabel properties (agar query lebih simpel)
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 2. Update Gambar Utama di Tabel Properties
UPDATE public.properties SET image_url = 'https://images.unsplash.com/photo-1600585154340-be6199f7e009?auto=format&fit=crop&q=80&w=800' WHERE name = 'The Amarta Sleman';
UPDATE public.properties SET image_url = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800' WHERE name = 'Kota Baru Residence';
UPDATE public.properties SET image_url = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' WHERE name = 'Bantul Heritage';

-- 3. Update Gallery di Tabel Property_Images
-- Hapus gambar lama yang broken
DELETE FROM public.property_images;

-- Masukkan Gambar Baru yang Stabil
INSERT INTO public.property_images (property_id, image_url, alt_text, sort_order) VALUES
-- The Amarta Sleman
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://images.unsplash.com/photo-1600585154340-be6199f7e009?auto=format&fit=crop&q=80&w=800', 'Exterior Modern', 0),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://images.unsplash.com/photo-1600121848594-d86cc4f5950d?auto=format&fit=crop&q=80&w=800', 'Interior Living', 1),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://images.unsplash.com/photo-1616486332302-60bb4f738fe2?auto=format&fit=crop&q=80&w=800', 'Bedroom', 2),

-- Kota Baru Residence
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800', 'City Residence', 0),

-- Bantul Heritage
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', 'Heritage Villa', 0);
