-- ============================================
-- Buat dropdown ikon untuk kolom "icon" di tabel nearby_facilities
-- Jalankan SQL ini di Supabase SQL Editor (tab baru)
-- ============================================

-- 1. Buat tipe enum dengan daftar ikon yang tersedia
CREATE TYPE facility_icon AS ENUM (
  'school',
  'medical_services',
  'local_pharmacy',
  'shopping_bag',
  'store',
  'restaurant',
  'mosque',
  'church',
  'park',
  'fitness_center',
  'pool',
  'train',
  'directions_bus',
  'flight',
  'account_balance',
  'local_atm',
  'local_police',
  'local_fire_department',
  'library_books',
  'sports_soccer',
  'golf_course',
  'beach_access',
  'child_care',
  'pets',
  'local_parking',
  'local_gas_station',
  'local_car_wash',
  'local_laundry_service',
  'local_post_office'
);

-- 2. Hapus default value dulu agar bisa diubah tipenya
ALTER TABLE nearby_facilities ALTER COLUMN icon DROP DEFAULT;

-- 3. Ubah kolom icon dari text menjadi enum (dropdown)
ALTER TABLE nearby_facilities
  ALTER COLUMN icon TYPE facility_icon
  USING icon::facility_icon;
