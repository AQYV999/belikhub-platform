# Design Document: BelikHub Web Platform (Samara-Inspired Editorial & Conrad Challenge 5-Role System)

**Date:** 2026-11-21  
**Project:** BelikHub Web Platform  
**Target Event:** Conrad Challenge  
**Geographic & Partner Context:** Batang Regency, Central Java (Blado District, Bismo & Wonomerto Villages), in partnership with PDAM Kabupaten Batang.  
**Design Reference:** Samara Architecture & Editorial Minimalist Design Language (`Belik Hub-rea-recording.zip`).

---

## 1. Intent & The "Why"
Mata air pegunungan (*belik*) di lereng Gunung Prau / Dieng utara (wilayah Batang) menopang ribuan KK dan suplai air bersih pedesaan maupun PDAM. Namun, sistem ini menghadapi 4 krisis utama:
1. **Penyusutan debit dan risiko sedimentasi/pencemaran** tanpa telemetri pemantauan objektif.
2. **Tata kelola iuran pemeliharaan pipa warga yang manual**, rawan tunggakan, dan minim transparansi kas desa.
3. **Keterlambatan respons kebocoran pipa transmisi** di medan curam pegunungan.
4. **Ketidakpercayaan donatur/CSR** akibat ketiadaan pelaporan dampak berkala atas program restorasi hulu.

BelikHub diciptakan untuk menjawab keempat masalah ini melalui perpaduan **teknologi pemantauan hulu (Belik Sense)**, **layanan konservasi bentang alam (Conservation Services)**, dan **sistem tata kelola retribusi komunitas berbasis digital**.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- **Estetika Kelas Dunia ala Samara**: Mengadopsi visual *warm ivory* (`#FDFDF7`), *evergreen* (`#375033`), *charcoal* (`#262626`), tipografi resmi *Regola*, tata letak editorial, kontras tinggi, dan fotografi bertema alam/hidrologi Indonesia.
- **Storytelling Lengkap**:
  - Halaman **Beranda (Home)** dengan doorway slider / editorial showcase.
  - Halaman **Solusi (Solutions)**: Belik Sense (arsitektur IoT & satelit Sentinel-2) dan Conservation Services (restorasi hulu).
  - Halaman **Proyek (Projects)**: Menampilkan portofolio mata air Batang (Tuk Bismo, Tuk Silumut, Tuk Luwung, Tuk Kalisari) dengan status pilot yang jujur.
  - Halaman **Tentang Kami (About)**: Latar belakang tim, kemitraan PDAM Batang, dan partisipasi Conrad Challenge.
  - Komponen **Kemitraan (Partner With Us)**: Formulir minat kemitraan desa/CSR/instansi.
- **Platform Interaktif 5-Peran Terpadu**:
  - **Warga**: Telemetri Tuk Bismo, Pass Iuran QRIS/Rekening, Riwayat/Struk Digital, Formulir Lapor Pipa Bocor + GPS, Tautkan ID Meteran.
  - **Pengelola (BUMDes Tirta)**: KPI Collection Rate, Saldo Kas, Meter Reading kubikasi & auto-generate tagihan, Cash Collection, Publikasi Progres Konservasi.
  - **Relawan (Patroli Konservasi)**: Form Inspeksi Lapangan 4 tipe (kebocoran, longsor, sampah, reboisasi) dengan validasi koordinat GPS Indonesia (-11.5 s/d 6.5, 94.0 s/d 141.5), tingkat urgensi, bukti foto, backlog patroli.
  - **Donatur (Publik & CSR)**: Katalog Kampanye Restorasi, Checkout Donasi QRIS/Bank instan & nominal bebas, Impact Timeline berfoto, Sertifikat Kontribusi Hijau.
  - **Admin (PDAM Batang / Super Admin)**: Macro Dashboard agregat 4 mata air se-kabupaten, 3-Lane Verification Queue (Donasi, Laporan Masalah, Retribusi), Manajemen Master Data mata air & tarif.
- **Demo Mode Switcher Bar Instan**: Top-bar mengambang yang persisten namun elegan, memudahkan juri lomba berpindah antar 5 peran dalam 1 klik tanpa login berulang.
- **Shared Reactive State**: Menggunakan state mock reaktif di client (didukung `localStorage`) sehingga aksi di satu peran (misal Warga lapor bocor atau Pengelola catat meter) langsung tecermin di peran lain (Relawan/Admin).

### Non-Goals
- Tidak mengintegrasikan gateway perbankan live (menggunakan simulasi transaksi QRIS dan verifikasi bukti transfer yang interaktif).
- Tidak memalsukan telemetri live IoT awan; arsitektur hardware tetap dinyatakan secara jujur: logger offline berbasis ESP32, flow meter, dan kartu SD, dengan sinkronisasi periodik serta observasi satelit Sentinel-2 NDVI.

### Anti-Goals
- Dilarang membuat tampilan dashboard SaaS generik yang penuh warna neon / gradien berlebihan.
- Dilarang membuat klaim palsu bahwa satelit bisa mengukur debit air secara langsung atau sistem memiliki live satellite cloud telemetry tanpa basis data fisik.

---

## 3. Approaches Considered & Trade-offs

### Pendekatan yang Dipertimbangkan:
1. **Opsi 1 — Terpadu (Unified Top-Bar Switcher & Platform Modal/Portal)** *(Dipilih)*:
   - Situs publik memiliki navigasi editorial Samara yang lengkap. Terdapat bar persisten di atas layar: *"Conrad Challenge Interactive Demo: [Warga] [Pengelola] [Relawan] [Donatur] [Admin]"*.
   - Mengklik salah satu peran akan membuka panel platform interaktif terpadu dengan desain yang tetap menganut palet Samara. Juri dapat menutup panel platform kapan saja untuk kembali membaca cerita editorial.
   - *Keuntungan:* Storytelling dan fungsionalitas teknis saling melengkapi; pengalaman juri sangat mulus dan efisien.

2. **Opsi 2 — Pemisahan Rute Total (`/platform`)**:
   - Website presentasi dan dashboard dipisah di folder/halaman berbeda.
   - *Kelemahan:* Juri harus bolak-balik antar URL dan kehilangan benang merah antara narasi konservasi dan implementasi lapangannya.

---

## 4. Arsitektur Teknis & Keputusan Desain (Architectural Decisions)

### Keputusan Builder & Klarifikasi Teknis
1. **Target Deployment & State Persistence**:
   - Menggunakan Vite Client-Side Application dengan router client-side (SPA) sehingga transisi antar halaman (Home, Solutions, Projects, About) dan pergantian 5 peran pada Demo Bar berjalan instan tanpa reload browser, mempertahankan state interaktif juri.
   - Semua data 5 peran (telemetri, tagihan warga, laporan patroli relawan, donasi CSR, verifikasi admin) dikelola oleh `src/store.js` yang reaktif dan disimpan di `localStorage`.
   - Disediakan tombol **"Reset Data Demo"** pada Demo Switcher Bar agar juri dapat mengembalikan simulasi ke skenario awal kapan saja.
2. **Ketersediaan Aset & Tipografi Samara**:
   - Aset font resmi *Regola* (`regola-book.woff2`, `regola-medium.woff2`, `regola-light.woff2`, dll.) dan visual aset dari ekstraksi `Belik Hub-rea-recording.zip` disalin ke dalam `public/assets/fonts/` dan `public/assets/images/`.
   - Menggunakan CSS tokens persis seperti ekstraksi Samara (`#FDFDF7`, `#F7F7F0`, `#375033`, `#262626`, `#6B6B66`, `#111111`).
3. **Cakupan Hardware Belik Sense & Satelit**:
   - Disajikan dalam bentuk visual arsitektur teknis interaktif dan data simulasi terkalibrasi (offline ESP32 logger, flow meter, SD card, dan observasi vegetasi Sentinel-2 NDVI), tanpa klaim palsu koneksi cloud real-time atau pengukuran debit langsung dari satelit.

---

## 5. Rencana Fase Implementasi (4 Fase)

- **Fase 1**: Penataan struktur proyek (menggabungkan aset Samara dari zip ke workspace Vite), pembuatan Design System, Header Navigasi Samara, Top Demo Role Switcher Bar, dan Homepage Editorial lengkap (Hero, Solutions Cards, Brand Statement, How It Works, Projects showcase, Partnership CTA, Footer).
- **Fase 2**: Halaman Solutions (Belik Sense arsitektur offline ESP32 + Sentinel-2 NDVI, dan Conservation Services).
- **Fase 3**: Halaman Projects (detail portofolio Tuk Bismo, Silumut, Luwung, Kalisari) dan Halaman About (konteks Conrad Challenge & kemitraan PDAM Batang).
- **Fase 4**: Modul Platform Interaktif 5 Peran (Warga, Pengelola, Relawan, Donatur, Admin) dengan state interkoneksi, validasi form, modal pembayaran QRIS, sertifikat digital, dan verifikasi antrean admin; pengetesan build produksi Vite.