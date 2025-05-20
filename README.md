# 🌐 Web Portal Berita dengan Next.js dan OAuth2

## 📖 Deskripsi

Aplikasi ini adalah portal berita berbasis web yang dibangun menggunakan **Next.js**. Pengguna dapat melakukan login menggunakan **OAuth2 (Google)** untuk mengakses daftar berita utama dari tiga sumber berita berbeda. Aplikasi menyajikan **judul, gambar, waktu, ringkasan, dan detail berita** dalam antarmuka yang konsisten dan menarik.

---

## ✨ Fitur Utama

- ✅ **Autentikasi OAuth2 dengan Google**
- 📰 **Halaman Daftar Berita Utama**
  - Menampilkan berita dari **NewsAPI**, **NYTimesAPI**, dan **The Guardian API**
  - Tampilan seragam antar sumber (judul, gambar, timestamp)
- 📄 **Halaman Detail Berita**
  - Menyediakan konten lengkap berita beserta gambar dan informasi waktu
- 📱 **Tampilan Responsif**
  - Cocok untuk perangkat desktop maupun mobile

---

## 🔗 Sumber API Berita

1. [NewsAPI.org](https://newsapi.org)
2. [The New York Times Developer API](https://developer.nytimes.com/)
3. [The Guardian Open Platform](https://open-platform.theguardian.com/)

> Semua data berita diseragamkan secara visual untuk menyamakan ukuran gambar, format tanggal, dan panjang judul.

---

## 🚀 Instalasi & Setup

1. **Clone repositori**
   ```bash
   git clone https://github.com/username/repository-name.git
   cd repository-name

2. **Install dependencies**
    ```bash
    npm install

3. **Atur variabel lingkungan**
    Buat file .env.local dan tambahkan variabel berikut:
    ```env
    NEXT_PUBLIC_NEWSAPI_KEY=your_newsapi_key
    NEXT_PUBLIC_NYTIMES_API_KEY=your_nytimes_api_key
    NEXT_PUBLIC_GUARDIAN_API_KEY=your_guardian_api_key

    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret

    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=http://localhost:3000

4. **Jalankan proyek**
    ```bash
    npm run dev


## 🗂️ Struktur Proyek

```plaintext
WEB-PORTAL-BERITA/
├── components/          # Komponen UI global (Navbar, Provider, Toast)
├── public/              # Asset statis (ikon SVG)
├── src/
│   └── app/
│       ├── api/         # Konfigurasi OAuth (NextAuth)
│       ├── hooks/       # Custom hook (useNews)
│       ├── lib/         # Utilitas fetch berita
│       ├── login/       # Halaman login
│       ├── news/[id]/   # Halaman detail berita
│       ├── layout.tsx   # Layout global
│       └── page.tsx     # Halaman utama
├── globals.css          # Styling global
└── package.json