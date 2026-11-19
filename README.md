# Aplikasi Absensi Peserta Didik

Aplikasi web statis untuk absensi harian SDN Kanangasari. Frontend menggunakan HTML, Tailwind CSS CDN, Alpine.js, dan Firebase Realtime Database REST API. Tidak memerlukan proses build atau backend tambahan.

## Menjalankan dan deploy

Buka `index.html` melalui web server lokal, atau deploy direktori proyek ini ke Cloudflare Pages dengan **Build command** kosong dan **Build output directory** `.`. `index.html` menjadi halaman utama.

## Struktur Firebase

Aplikasi membaca data dari node berikut:

- `sekolah/20205428/info` untuk nama sekolah dan daftar `roles`.
- `sekolah/20205428/tahun_ajaran` untuk pilihan tahun ajaran.
- `sekolah/20205428/tahun_ajaran/{tahun}/kelas` untuk pilihan kelas.
- `sekolah/20205428/tahun_ajaran/{tahun}/kelas/{kelas}/siswa` untuk siswa. Key setiap siswa diperlakukan sebagai NISN; field yang digunakan adalah `nama` dan `nomor_absen`.

Absensi disimpan dengan `PUT` pada `sekolah/20205428/absensi/{tahun}/{tanggal}/{kelas}/{role_key}`. Setiap record berisi metadata tahun, tanggal, kelas, role, waktu pembaruan, dan map siswa dengan status kehadiran. Karakter role dinormalisasi menjadi huruf kecil dan underscore untuk memenuhi batasan key Firebase.

Pastikan Firebase Realtime Database Rules mengizinkan akses yang sesuai. Aplikasi ini mengakses database langsung dari browser; untuk penggunaan produksi, batasi hak baca/tulis melalui Firebase Authentication dan rules yang sesuai, bukan dengan membuka akses tulis publik.