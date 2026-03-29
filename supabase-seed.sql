-- ============================================
-- GriyaPintar Database Schema + Seed Data
-- Jalankan SQL ini di Supabase SQL Editor
-- ============================================

-- 1. Tabel Properti
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL, -- dalam Juta (2400 = Rp 2.4 Miliar)
  location_city TEXT NOT NULL,
  location_label TEXT NOT NULL,
  bedrooms INTEGER NOT NULL DEFAULT 3,
  bathrooms INTEGER NOT NULL DEFAULT 2,
  land_area INTEGER NOT NULL DEFAULT 120,
  description TEXT,
  ai_insight TEXT,
  monthly_installment TEXT,
  is_featured BOOLEAN DEFAULT false,
  type TEXT DEFAULT 'beli',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabel Gambar Properti
CREATE TABLE IF NOT EXISTS property_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0
);

-- 3. Tabel Kelebihan Properti
CREATE TABLE IF NOT EXISTS property_highlights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- 4. Tabel Fasilitas Terdekat
CREATE TABLE IF NOT EXISTS nearby_facilities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'location_on',
  distance_text TEXT NOT NULL
);

-- ============================================
-- SEED DATA: 3 Properti Awal
-- ============================================

-- Properti 1: The Amarta Sleman
INSERT INTO properties (id, name, price, location_city, location_label, bedrooms, bathrooms, land_area, description, ai_insight, monthly_installment, is_featured, type)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'The Amarta Sleman',
  2400,
  'Sleman',
  'Sleman, Jogja',
  3, 2, 120,
  'The Amarta Sleman menawarkan hunian modern dengan konsep tropis minimalis di jantung Sleman. Desain arsitektur yang mengedepankan sirkulasi udara alami dan pencahayaan maksimal. Rumah ini sudah dilengkapi dengan sistem smart home dan keamanan 24 jam untuk kenyamanan keluarga Anda.',
  'Properti ini memiliki nilai investasi tinggi karena kedekatannya dengan kawasan pendidikan UGM dan akses cepat ke pusat bisnis Sleman.',
  '± 6jt',
  true,
  'beli'
);

-- Properti 2: Kota Baru Residence
INSERT INTO properties (id, name, price, location_city, location_label, bedrooms, bathrooms, land_area, description, ai_insight, monthly_installment, is_featured, type)
VALUES (
  'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  'Kota Baru Residence',
  1800,
  'Yogyakarta',
  'Yogyakarta',
  3, 2, 120,
  'Kota Baru Residence terletak di kawasan perumahan elite Yogyakarta. Akses mudah ke pusat kota dan fasilitas publik lengkap menjadikan properti ini pilihan sempurna untuk keluarga modern.',
  'Lokasi strategis di pusat kota dengan akses langsung ke jalur transportasi utama dan kawasan bisnis Yogyakarta.',
  '± 5jt',
  false,
  'beli'
);

-- Properti 3: Bantul Heritage
INSERT INTO properties (id, name, price, location_city, location_label, bedrooms, bathrooms, land_area, description, ai_insight, monthly_installment, is_featured, type)
VALUES (
  'c3d4e5f6-a7b8-9012-cdef-123456789012',
  'Bantul Heritage',
  3200,
  'Bantul',
  'Bantul, Jogja',
  3, 2, 120,
  'Bantul Heritage menghadirkan perpaduan sempurna antara arsitektur etnik Jawa dan desain kontemporer. Dikelilingi pemandangan sawah yang asri, properti ini menawarkan ketenangan dan kenyamanan hidup yang sesungguhnya.',
  'Kawasan Bantul terus mengalami apresiasi harga properti yang signifikan, menjadikannya pilihan investasi jangka panjang yang sangat menarik.',
  '± 8jt',
  false,
  'beli'
);

-- ============================================
-- GAMBAR PROPERTI
-- ============================================

-- Gambar The Amarta Sleman
INSERT INTO property_images (property_id, image_url, alt_text, sort_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC97jFIFb8VZn8wDCTwJ-p11LlhyBAFrhYEj-cStSSMHwvbSCven__Yi9MfoG2shNLNPOC4ifHW_aWQOqTRNRmQ6XznHxLFWEQggUd24X3y_eJQDypEEICA_h35WfilFZmcdFNN3MaC8DR08q-AUrXVO86NGFkLE6QZTEGGc1OywW4kA5kjvC61d5vzRkb6kxcQPITj5rlWEreDFiPNVsJRT0iFJfWBHD1_FpcRHN8qLLAyTo5UY-ta8yCd_RdmHas6ndHyGnY8Dygm', 'Modern minimalist house exterior', 0),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTrrNalXwU1uSuqJLKp5kW4MrmMc4NbCsxsyWjW__x5R-GwkPnClny5U6x3v7jehausc33bFEw6Uka92XOG_gWfFhYuiHgU2D0HvTfD5yydK5tDczz7qv0vSDbbek8pby61GzcJRpqeMclt8tgsnuVA16Ez9mHLIoUSCFEr5PtqokyDNjHjUKFcomWLMJY4SnJqxC0yl9nIpNFkMk6Pxjoe6gmxqCilOEgbv4N-CCcQAy1AtvFy2MaqDGtWWfJ_XW0nQCnDQc4ZMrd', 'Luxury interior living room', 1),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqzmkUTb8le0FodTBPD0XGPJKcFv47PWNqFdFSzRlONbhxtz5vxZSH97wLFGGiqz4b0hh6Lb_hbca2HMuGt2FGs0SkjjK2wuLFa64OGJg_6QPO0bEKb1wqJwaLIC_ZbeIG3aVJRe5_EsXBrFtkRxkMadX3WdoLHwA3p6wG2gGg9YvsV_TvHAPysjfRNQoBh4OunMXxM1-abkc-7vfKFr7wnCOhhS01mlLtw7QaumjpJD-S5xImYAiyavropY76TW_FcYgWX0Ltuyz', 'Spacious master bedroom', 2);

-- Gambar Kota Baru Residence
INSERT INTO property_images (property_id, image_url, alt_text, sort_order) VALUES
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBilT7uCweKxVIwYQDbsKM_RI2EZPmgdwfQN4NgHblDwAc9p54toVoc6-LMmLgSM5QVqnKN3THD8Yt3SDwdVt6u0NrKyLMWYF5eTOMWCRqk2sthZN05Hlfn2SBya6_tsrY9KvuGV7WrHeVupfNJi1oP3un7LaPmlxwwLuXIHU1XKq-lM1OIcN3ZF-ZVVncUuFWce_Oz01h8zDbWqTGpucDd_wX4zM9DcVnS0InovnzRxF5urQGLt_J0tqBOIFXrQ24FgzdxCJrGXnP0', 'Luxury residence with manicured garden', 0);

-- Gambar Bantul Heritage
INSERT INTO property_images (property_id, image_url, alt_text, sort_order) VALUES
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPMH11SQzG9OigCc4uDOp4-nNrDOgOUtDRw3pzy40dgxvtcJZCnBCg5woVOuzy-2HfgpgW2VCFM8XOf2Ll4D1T21rjqtjdLKrmMZKW-B5zNkDqSCOZtAwAmk5243YEei-foFxbuH8GrCMSvVvIsW5VUFXEnQjwdEizZKy7IhjTSDjCjkMf8iFgUqeB77X5NkiF1lFWpmprtKS_bRFpQMwjHODOWHo1WJNq9CO7Iwf9HTCTgtFqWBEPbzs3K1vEj5SbyfSqQ2s4IkJu', 'Traditional modern fusion house', 0);

-- ============================================
-- HIGHLIGHTS PROPERTI
-- ============================================

-- Highlights The Amarta Sleman
INSERT INTO property_highlights (property_id, text, sort_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '10 menit ke kampus', 0),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Cicilan ± 6jt', 1),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Area berkembang', 2);

-- Highlights Kota Baru Residence
INSERT INTO property_highlights (property_id, text, sort_order) VALUES
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Kawasan perumahan elite', 0),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Cicilan ± 5jt', 1),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Fasilitas lengkap', 2);

-- Highlights Bantul Heritage
INSERT INTO property_highlights (property_id, text, sort_order) VALUES
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'View sawah asri', 0),
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Cicilan ± 8jt', 1),
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Desain etnik modern', 2);

-- ============================================
-- FASILITAS TERDEKAT (untuk The Amarta Sleman)
-- ============================================

INSERT INTO nearby_facilities (property_id, name, icon, distance_text) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Universitas Gadjah Mada', 'school', '8 Menit • 3.2 km'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Hartono Mall', 'shopping_bag', '12 Menit • 5.1 km'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'RS Dr. Sardjito', 'medical_services', '10 Menit • 4.5 km');
