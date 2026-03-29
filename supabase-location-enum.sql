-- ============================================
-- Buat dropdown lokasi untuk kolom "location_city" di tabel properties
-- Jalankan SQL ini di Supabase SQL Editor (tab baru)
-- ============================================

-- 1. Hapus tipe jika sudah ada (agar bisa re-run aman)
DROP TYPE IF EXISTS location_city_type;

-- 2. Buat tipe enum dengan daftar lokasi
CREATE TYPE location_city_type AS ENUM (
  'Yogyakarta',
  'Sleman',
  'Bantul'
  'Semua Area'
);

-- 3. Hapus default value dulu agar bisa diubah tipenya
ALTER TABLE properties ALTER COLUMN location_city DROP DEFAULT;

-- 4. Ubah kolom location_city dari text menjadi enum (dropdown)
ALTER TABLE properties
  ALTER COLUMN location_city TYPE location_city_type
  USING location_city::location_city_type;
