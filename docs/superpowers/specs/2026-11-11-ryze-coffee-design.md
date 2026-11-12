# Ryze Coffee — Desain Website Company Profile

Tanggal: 2026-11-11
Status: draf, menunggu persetujuan

## 1. Maksud & alasan

Website company profile untuk kedai kopi **fiktif** bernama **Ryze Coffee**, dibuat sebagai **portofolio** pemiliknya. Tujuannya menunjukkan kemampuan membangun website modern yang terasa seperti brand kopi sungguhan (inspirasi suasana: situs brand kopi kekinian seperti fore.coffee).

Yang paling ingin ditonjolkan: **halaman pembuka** (bagian pertama yang dilihat pengunjung) dengan video kopi dituang ke gelas, lalu **katalog menu** yang fotonya seragam seperti katalog jualan.

Ukuran sukses: pengunjung (perekrut / klien) membuka link, langsung terkesan dengan bagian pembuka, bisa menelusuri menu dengan mulus di laptop maupun HP, dan situsnya terasa "jadi" — bukan latihan setengah jalan.

## 2. Tujuan, bukan-tujuan, anti-tujuan

**Tujuan**
- 4 halaman: Beranda, Tentang, Menu, Toko.
- Bagian pembuka gaya "teks kiri + video dalam bingkai lengkung kanan" (opsi C yang dipilih).
- Katalog 12 minuman dalam 3 kategori, dengan tampilan detail saat diklik.
- Animasi halus yang terasa modern, responsif penuh (HP–desktop).
- Bisa dipublikasikan dengan link publik (Vercel).

**Bukan tujuan**
- Pemesanan, keranjang, pembayaran, login, akun.
- Pilihan ukuran / hot-iced / tombol beli di detail menu — detail **hanya tampilan**.
- CMS / panel admin. Data cukup dari file JSON.
- Multi-bahasa (situs berbahasa Indonesia; nama menu boleh bahasa Inggris seperti umumnya kedai kopi).
- Pastry / makanan.

**Anti-tujuan** (gagal walau "jalan")
- Memakai nama, logo, foto, atau teks milik Fore Coffee atau brand nyata lain.
- Foto menu yang tidak seragam (latar/sudut/gelas berbeda-beda) — merusak kesan katalog.
- Bagian pembuka yang patah-patah atau lama dimuat (video berat tanpa poster).
- Tampilan HP yang berantakan.

## 3. Batasan

- **Siapa membangun:** Claude menulis seluruh kode di folder `d:\belajar\coffee`; pemilik meninjau hasil jadinya. Rencana berbentuk tugas implementasi biasa, bukan langkah mengajar.

- Lingkungan: Windows 11, VS Code. **Node.js belum terpasang** — harus dipasang (versi LTS) sebelum mulai.
- Folder proyek `d:\belajar\coffee` belum berupa repo git (akan di-`git init` di awal).
- Foto & video AI dibuat lewat konektor ElevenLabs yang **belum diotorisasi** dan memakai kredit pemilik. Website harus bisa jalan penuh dengan aset pengganti sampai aset AI siap.
- Semua aset pihak ketiga harus berlisensi bebas pakai (Pexels, Mixkit, Google Fonts).

## 4. Pendekatan yang dipertimbangkan

| Pendekatan | Kelebihan | Kekurangan |
|---|---|---|
| **Next.js (React) + Tailwind CSS + Framer Motion** ✅ | Stack paling dicari perekrut; animasi mulus; routing halaman rapi; SEO baik; deploy gratis di Vercel | Perlu memasang Node.js; lebih banyak konsep untuk dipelajari |
| Vite + React + Tailwind | Lebih ringan & sederhana | SEO & struktur halaman kurang dari Next.js; nilai portofolio sedikit di bawah |
| HTML/CSS/JS + GSAP | Tanpa instalasi, paling mudah dipahami | Kurang "modern" di mata perekrut; cepat berantakan saat halaman bertambah |

**Dipilih: Next.js + Tailwind + Framer Motion** — karena tujuannya portofolio, dan ini kombinasi yang paling menunjukkan kemampuan web modern.

Untuk bagian pembuka juga dipertimbangkan 3 tata letak (mockup di `.superpowers/brainstorm/hero-options.html`): A video layar penuh, B tuangan mengikuti scroll, **C teks + video dalam bingkai** ✅ — dipilih pemilik.

Untuk foto menu dipertimbangkan: foto AI ✅, foto Unsplash terkurasi, ilustrasi SVG. **Dipilih foto AI** demi keseragaman dan logo Ryze di gelas.

## 5. Keputusan pemilik (seperti yang diputuskan)

### Brand
- Nama: **Ryze Coffee**.

### Bagian pembuka (Beranda, layar pertama)
- Tata letak opsi C: kiri teks, kanan video dalam bingkai lengkung (atas membulat, bawah sudut kecil).
- Judul: **Iced Spanish Latte**
- Teks pendukung: *"Racikan espresso pilihan berpadu dengan susu manis, menghasilkan rasa creamy yang lembut namun tetap ringan. Sekali teguk, langsung jatuh hati."*
- Tombol: "Lihat Menu →" ke halaman Menu.
- Dua kartu menu melayang di atas bingkai video: **Spanish Latte** (Best Seller) dan **Matcha Cloud** (Baru), masing-masing nama + label + harga. Bisa diklik → membuka detail menu tersebut di halaman Menu.
- Video:
  - **Sementara (dan cadangan permanen):** Pexels — https://www.pexels.com/id-id/video/teknik-menuang-espresso-yang-artistik-untuk-es-latte-37672642/
  - **Target:** video AI 5–8 detik, espresso dituang ke **gelas plastik** berisi susu & es, logo Ryze Coffee di gelas. Dibuat setelah konektor ElevenLabs siap. Jika pemilik kurang suka hasilnya, tetap pakai video Pexels.
  - Video diputar otomatis, tanpa suara, berulang.

### Katalog menu
- 12 minuman, 3 kategori: **Signature**, **Classic Coffee**, **Non-Coffee**. Tanpa pastry.
- Tab kategori + "Semua". Kartu: foto, nama, harga, label opsional (Best Seller / New).
- Klik kartu → tampilan detail: **foto di kiri, di kanan kategori/label, nama, deskripsi, harga**. Hanya tampilan, ada tombol tutup. Di HP: foto di atas, teks di bawah.
- Foto: dibuat AI, gaya seragam — gelas plastik berlogo Ryze, sudut & pencahayaan sama, latar polos.

## 6. Usulan saya (diputuskan pembuat dokumen, boleh dikoreksi)

### Struktur halaman
- `/` **Beranda**: pembuka → cerita Ryze singkat (2–3 kalimat + tautan ke Tentang) → 4 menu unggulan (kartu yang sama dengan katalog) → ajakan "Kunjungi Toko".
- `/tentang` **Tentang**: kisah brand, asal biji kopi (Nusantara, mis. Gayo, Toraja, Kintamani), proses "dari biji ke gelas" 3–4 langkah, beberapa angka (mis. jumlah cabang, gelas tersaji) — semua fiktif.
- `/menu` **Menu**: katalog di atas.
- `/toko` **Toko**: 4 cabang fiktif (kota besar di Indonesia), tiap cabang: nama, alamat, jam buka, peta tersemat.
- Navigasi atas tetap (sticky) + footer (logo, tautan halaman, media sosial fiktif, © Ryze Coffee — proyek portofolio).

### Identitas visual
- Warna (dari mockup yang disukai): hijau tua brand `#1F4D3A`, krem `#EFE2CF`, latar `#F4EFE8`, cokelat kopi `#4A2A17`, teks `#2A1D14`.
- Huruf: **Fraunces** (judul) + **Inter** (teks), dari Google Fonts via `next/font`.
- Logo: logotype teks "Ryze Coffee" dalam Fraunces (SVG), dipakai juga sebagai acuan logo di gelas pada prompt AI.

### Gerak & interaksi
- Saat dimuat: judul muncul baris per baris, teks & tombol menyusul.
- Kartu melayang bergerak pelan naik-turun terus-menerus.
- Bingkai video bergeser sedikit lebih lambat dari teks saat di-scroll (efek kedalaman ringan).
- Bagian-bagian halaman muncul (fade + naik sedikit) saat masuk layar.
- Pergantian tab kategori dan buka-tutup detail menu dianimasikan.
- Menghormati pengaturan `prefers-reduced-motion` (animasi dimatikan / diminimalkan).

### Responsif
- HP: video pindah ke bawah judul, lebar penuh, tanpa bingkai lengkung yang sempit; kartu melayang jadi lebih kecil atau berbaris di bawah video.
- Grid katalog: 2 kolom di HP, 3 di tablet, 4 di desktop.

### Data
- `data/menu.json`: daftar minuman dengan field `id` (slug), `name`, `category` (`signature` | `classic` | `non-coffee`), `price` (angka Rupiah), `description`, `image` (`/menu/<slug>.webp`), `badge` (opsional: `best-seller` | `new`), `featured` (boolean, untuk 4 menu unggulan di Beranda).
- `data/stores.json`: `id`, `name`, `city`, `address`, `hours`, `mapQuery` (untuk peta).
- Harga ditampilkan format Rupiah Indonesia (mis. "Rp 30.000").
- Daftar 12 menu awal (harga boleh disesuaikan):
  - Signature: Spanish Latte (Best Seller, Rp 30.000), Aren Latte (Rp 28.000), Caramel Cloud Latte (Rp 32.000), Ryze Butterscotch (New, Rp 33.000)
  - Classic Coffee: Americano (Rp 22.000), Cappuccino (Rp 27.000), Café Latte (Rp 27.000), Espresso (Rp 18.000)
  - Non-Coffee: Matcha Cloud (New, Rp 32.000), Chocolate Velvet (Rp 28.000), Red Velvet Latte (Rp 29.000), Lychee Tea (Rp 24.000)

### Aset
- Sampai foto AI siap: gambar pengganti seragam (siluet gelas SVG di latar krem) supaya tata letak sudah final.
- Video: file MP4 dikompres (target < 4 MB, 720p) + gambar poster (frame pertama) agar layar pertama tidak kosong saat memuat. Disimpan lokal di `public/`, bukan hotlink.
- Prompt AI foto: satu templat yang sama untuk semua menu (gelas plastik bening, logo Ryze, latar krem polos, cahaya lembut dari kiri, sudut 3/4 sedikit dari atas), hanya isi minumannya yang berbeda.

### Peta toko
- Peta tersemat tanpa API key (embed Google Maps via query alamat, atau OpenStreetMap). Dimuat malas (lazy) agar halaman tetap ringan.

### Tautan ke detail menu
- Detail menu bisa dibuka lewat URL `/menu?item=<slug>` (mis. `/menu?item=spanish-latte`), sehingga bisa dibagikan dan dibuka dari halaman lain.
- Kartu melayang di pembuka dan 4 menu unggulan di Beranda mengarah ke `/menu?item=<slug>` (berpindah ke halaman Menu, detail langsung terbuka).
- Menutup detail menghapus `item` dari URL.

### Kualitas
- Lighthouse (mobile) target ≥ 90 untuk Performance, Accessibility, Best Practices, SEO.
- Gambar via `next/image`; metadata & Open Graph per halaman.
- Deploy ke Vercel dari repo GitHub pemilik. Langkah yang butuh akun (membuat repo GitHub, menghubungkan Vercel) dilakukan pemilik dengan panduan langkah demi langkah; tanpa domain kustom (cukup `*.vercel.app`).

### Urutan pengerjaan aset
- Website dibangun sampai selesai dulu dengan gambar pengganti + video Pexels; "selesai" **tidak** bergantung pada aset AI.
- Pembuatan foto & video AI adalah tahap terakhir yang terpisah, dijalankan setelah konektor ElevenLabs diotorisasi. Pemilik yang menilai apakah hasilnya layak dipakai.
- Jika foto AI kurang bagus: pemilik mencari sendiri foto pengganti. Karena itu nama & lokasi file foto harus sederhana dan terdokumentasi (`public/menu/<slug>.webp`, ukuran persegi yang disarankan), agar foto cukup ditimpa tanpa mengubah kode.

## 7. Diserahkan ke pembuat

- Struktur folder & komponen di dalam Next.js (App Router, TypeScript).
- Detail implementasi tampilan detail menu (modal/dialog atau panel), selama tata letak foto-kiri/teks-kanan terpenuhi dan bisa ditutup dengan tombol ✕, klik di luar, dan tombol Esc.
- Isi teks halaman Tentang & deskripsi tiap menu (bahasa Indonesia, nada hangat & menggoda seperti teks pembuka yang dipilih).
- Nama & alamat cabang fiktif.
- Durasi & kurva animasi.
