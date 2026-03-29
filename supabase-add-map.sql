-- ============================================
-- Tambah kolom latitude & longitude ke tabel properties
-- Jalankan SQL ini di Supabase SQL Editor
-- ============================================

ALTER TABLE properties ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;

-- Isi koordinat untuk 3 properti yang sudah ada:

-- The Amarta Sleman (dekat UGM)
UPDATE properties SET latitude = -7.7713, longitude = 110.3775
WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

-- Kota Baru Residence (pusat Yogyakarta)
UPDATE properties SET latitude = -7.7856, longitude = 110.3695
WHERE id = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';

-- Bantul Heritage (Bantul)
UPDATE properties SET latitude = -7.8868, longitude = 110.3285
WHERE id = 'c3d4e5f6-a7b8-9012-cdef-123456789012';
