# Ryze Coffee

Website company profile untuk **Ryze Coffee**, brand kopi fiktif. Dibuat sebagai proyek portofolio dengan
**Next.js 16 (App Router) + Tailwind CSS 4 + Motion**.

Halaman: **Beranda** (`/`), **Tentang** (`/tentang`), **Menu** (`/menu`), **Toko** (`/toko`).

## Menjalankan di komputer

Butuh Node.js 20+ (proyek ini dibuat dengan Node 24).

```bash
npm install
npm run dev        # buka http://localhost:3000
```

Perintah lain:

| Perintah | Fungsi |
|---|---|
| `npm test` | menjalankan semua tes (Vitest) |
| `npm run lint` | memeriksa kode (ESLint) |
| `npm run build` | build versi produksi |
| `npm start` | menjalankan hasil build |
| `npm run placeholders` | membuat ulang gambar pengganti menu dan `og.png` |

> **Catatan Windows:** jalankan `npm test` dari folder dengan huruf drive **besar** (`D:\belajar\coffee`,
> bukan `d:\...`). Jika huruf drive kecil, Vitest memuat dirinya dua kali dan muncul error aneh seperti
> *"Vitest failed to find the current suite"* atau *"Invalid Chai property"*.

## Mengubah isi

- **Menu** → `data/menu.json` (nama, kategori, harga, deskripsi, label `best-seller` / `new`, `featured` untuk
  4 menu unggulan di Beranda).
- **Toko** → `data/stores.json` (nama, kota, alamat, jam buka, `mapQuery` untuk tautan Google Maps, `tag` opsional seperti "Nuansa alam"). Foto toko: `public/stores/<id>.webp` (16:10).

## Mengganti foto menu

Setiap menu memakai satu file di `public/menu/<slug>.webp`. Cukup **timpa file dengan nama yang sama**, tanpa
mengubah kode. Foto persegi minimal 800×800 px disarankan; foto dengan rasio lain tetap dipotong rapi
(tengah) menjadi persegi.

Daftar nama file:

```
spanish-latte.webp       americano.webp       matcha-cloud.webp
aren-latte.webp          cappuccino.webp      chocolate-velvet.webp
caramel-cloud-latte.webp cafe-latte.webp      red-velvet-latte.webp
ryze-butterscotch.webp   espresso.webp        lychee-tea.webp
```

Format lain (`.jpg`/`.png`)? Ubah juga nilai `image` menu tersebut di `data/menu.json`.

> Jangan jalankan `npm run placeholders` setelah memasang foto asli — skrip itu menimpa semua foto menu.

## Mengganti foto pembuka & interior

- Foto pembuka (Beranda, kanan): `public/hero/hero.webp`, tegak 4:5, latar polos warna `#F7E6D1` agar menyatu dengan latar halaman.
- Foto interior toko (di bawah *Our Story*): `public/story/interior.webp`, lebar 16:9 atau lebih.
- Format lain? Simpan dengan nama sama berekstensi .webp, atau ubah path di `src/components/home/Hero.tsx` / `StoryTeaser.tsx`.

## Deploy ke Vercel (gratis)

1. Buat repository baru (kosong) di [github.com/new](https://github.com/new), misalnya `ryze-coffee`.
2. Di folder proyek:
   ```bash
   git remote add origin https://github.com/<username>/ryze-coffee.git
   git push -u origin main
   ```
3. Masuk ke [vercel.com](https://vercel.com) dengan akun GitHub → **Add New… → Project** → pilih repo
   `ryze-coffee` → **Deploy** (pengaturan bawaan sudah benar).
4. Setelah selesai, website tersedia di `https://ryze-coffee-xxxx.vercel.app`. Setiap `git push` berikutnya
   otomatis memperbarui website.

## Cek kualitas (Lighthouse)

Jalankan `npm run build && npm start`, buka `http://localhost:3000` di Chrome → DevTools → tab **Lighthouse**
→ mode **Mobile** → **Analyze page load**. Target: ≥ 90 untuk Performance, Accessibility, Best Practices, SEO.

## Struktur singkat

```
data/                  isi menu & toko (JSON)
public/menu/           foto menu
public/hero/           foto pembuka
public/story/          foto interior
scripts/               skrip pembuat gambar pengganti
src/app/               halaman (/, /tentang, /menu, /toko)
src/components/        komponen per bagian (home, menu, about, stores, layout, ui)
src/lib/               fungsi bantu (data menu, toko, format Rupiah)
tests/                 tes Vitest
docs/superpowers/      dokumen desain & rencana pengerjaan
```

---

Ryze Coffee adalah brand fiktif. Foto produk dibuat dengan AI.
