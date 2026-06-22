-- ============================================================
-- HELPER: Buat user manual dari Supabase SQL Editor
-- Gunakan ini kalau halaman Register error 500
-- ============================================================
-- Cara pakai:
-- 1. Buka Supabase Dashboard → SQL Editor → New Query
-- 2. Copy-paste script ini
-- 3. Ubah email, password, dan nama sesuai kebutuhan
-- 4. Klik Run
-- 5. Login di /login dengan email & password tersebut
-- ============================================================

-- Fungsi untuk membuat user baru secara manual
-- Jalankan setiap blok secara terpisah:

-- ========== BLOCK 1: Buat akun Member ==========
-- Ganti email, password, dan nama sesuai kebutuhan
SELECT auth.create_user(
  'email_kamu@gmail.com',       -- ← ganti email
  'password123',                -- ← ganti password
  true                          -- auto confirm (tidak perlu verifikasi email)
);

-- Setelah user dibuat, profile otomatis terbuat via trigger.
-- Kalau trigger tidak jalan, jalankan BLOCK 2 di bawah:

-- ========== BLOCK 2 (opsional): Buat profile manual ==========
-- Ganti USER_ID dengan ID user yang muncul dari BLOCK 1
-- Atau cari ID-nya di: Authentication → Users → klik user → lihat UUID
--
-- INSERT INTO user_profiles (id, full_name, role, points, tier)
-- VALUES (
--   'UUID-USER-DISINI',         -- ← ganti dengan UUID user
--   'Nama Lengkap',             -- ← ganti nama
--   'member',                   -- 'member' atau 'admin'
--   0,
--   'Bronze'
-- );

-- ========== BLOCK 3: Ubah user jadi Admin ==========
-- Jalankan ini setelah user dibuat, untuk menjadikannya admin:
--
-- UPDATE user_profiles
-- SET role = 'admin'
-- WHERE id = 'UUID-USER-DISINI';   -- ← ganti dengan UUID user
