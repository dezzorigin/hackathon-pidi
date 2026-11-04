# LUNAS - Product Requirements & Implementation Plan

## 1. Product Vision & Positioning
LUNAS adalah Asisten Keuangan Personal berbasis algoritma yang membantu pengguna menavigasi siklus keuangan mereka. Menggunakan pendekatan *Zero-Friction*, LUNAS mengotomatiskan agregasi data, memberikan notifikasi kontekstual yang ramah pengguna, dan memfasilitasi pelunasan utang atau investasi langsung dari satu aplikasi.

**Tone of Voice & Copywriting:**
Profesional, empatik, jelas, dan memotivasi. (Hindari jargon *tech-bro* berlebihan. Gunakan bahasa sehari-hari yang mudah dipahami).

---

## 2. System Architecture & File Structure
Aplikasi dibangun menggunakan Next.js (App Router) dengan struktur direktori yang memisahkan logika *state*, komponen *reusable*, dan *layout* halaman.

```text
lunas-web/
├── app/
│   ├── layout.tsx                # Root layout provider
│   ├── page.tsx                  # Halaman Utama (Dynamic Dashboard)
│   ├── debt/page.tsx             # Halaman Tracker Utang
│   ├── wealth/page.tsx           # Halaman Portofolio Investasi
│   └── profile/page.tsx          # Halaman Pengaturan & Profil
├── components/
│   ├── layout/                   # Komponen pembentuk kerangka aplikasi
│   │   ├── MobileContainer.tsx   # Wrapper frame mobile (max-w-md)
│   │   ├── BottomNav.tsx         # Navigasi bawah dengan Center FAB
│   │   └── SmartActionModal.tsx  # Bottom sheet untuk notifikasi asisten
│   ├── onboarding/               # Flow pengguna baru
│   │   ├── WelcomeStep.tsx
│   │   ├── AuthStep.tsx          # Login/Signup
│   │   ├── ProfilingStep.tsx
│   │   ├── ConnectBankStep.tsx
│   │   └── BufferSetupStep.tsx
│   └── ui/                       # REUSABLE COMPONENTS (Wajib digunakan berulang)
│       ├── Button.tsx            # Tombol utama (Primary, Secondary, Ghost)
│       ├── InsightCard.tsx       # Kartu putih membulat dengan shadow halus
│       ├── ProgressBar.tsx       # Indikator progres horizontal
│       └── Typography.tsx        # Format teks konsisten (Hero, Title, Label)
├── context/
│   └── AppContext.tsx            # Global State Management (Zustand/React Context)
└── lib/
    ├── data.ts                   # Data awal (Saldo, Daftar Utang, Profil)
    └── utils.ts                  # Fungsi format Rupiah, hitung persentase, dll
3. Global State Management (AppContext.tsx)
Aplikasi wajib berfungsi secara interaktif, bukan sekadar UI mati. Semua interaksi pengguna akan mengubah global state:

userProfile: Tipe profil (Pekerja Harian, Fokus Utang, Fokus Investasi).

balances: Total Kekayaan, Saldo Tersedia, Batas Aman (Dynamic Buffer).

debts: Array daftar utang (Nama, Bunga/APR, Nominal, Progres).

assets: Array daftar investasi.

Fungsi Interaktif (Actions):

executeSweep(amount, targetId): Memotong Saldo Tersedia dan mengurangi Nominal Utang/menambah Aset secara real-time.

completeOnboarding(): Mengubah status user dari new user ke halaman Beranda utama.

4. User Journey & Core Feature Flows
Berikut adalah urutan alur fungsional yang akan dialami pengguna:

Fase 1: The Red Carpet Onboarding
Berjalan di dalam MobileContainer. Mengumpulkan data preferensi untuk mengatur algoritma Dasbor.

Welcome Page:

Visual animasi halus.

Copywriting: "Kendalikan keuanganmu dengan lebih cerdas dan tenang. Mulai langkah pertamamu hari ini."

Authentication (Sign In):

Menampilkan tombol "Lanjutkan dengan Google" dan "Gunakan Email".

Klik tombol akan memicu loading state 1 detik sebelum lanjut ke tahap berikutnya.

Profiling (Fokus Keuangan):

Tiga kartu interaktif yang dapat dipilih:

"Atur pengeluaran harian" (Pekerja Harian/Freelance)

"Fokus lunasi utang" (Fokus Utang)

"Mulai kembangkan dana" (Fokus Investasi)

Connect Bank (Integrasi SNAP BI):

Daftar bank dan e-wallet lokal.

Saat diklik "Hubungkan", muncul indikator loading melingkar, lalu status berubah menjadi Connected.

Copywriting Disclaimer: "Akses aman (read-only) menggunakan standar SNAP BI. Kami tidak pernah menyimpan data rahasiamu."

Dynamic Buffer Setup:

Komponen Slider interaktif. Pengguna menggeser batas nominal (misal: Rp 1.000.000) sebagai "Dana Aman Harian" yang tidak boleh diutak-atik oleh sistem.

Fase 2: Main Application (The Dashboard)
Setelah onboarding, pengguna masuk ke app/page.tsx. Tampilan berubah secara fungsional tergantung hasil Profiling (Fase 1, Tahap 3).

Top Header (Global): Sapaan nama pengguna, Total Kekayaan (Net Worth) yang bereaksi terhadap perubahan data, dan dua InsightCard (Pemasukan vs Pengeluaran).

Dynamic Widgets:

Jika Profil = Pekerja Harian: Muncul ProgressBar sisa dana aman hari ini.

Jika Profil = Fokus Utang: Muncul peringatan "Ada sisa dana Rp 300.000. Lunasi cicilan tertinggi sekarang?" beserta tombol eksekusi 1-Tap.

Jika Profil = Fokus Investasi: Muncul grafik pertumbuhan investasi.

Fase 3: Smart Action Center (Center FAB)
Menggantikan tombol menu tengah biasa dengan tombol '+' besar melayang (Floating Action Button).

Fungsi: Saat diklik, tidak berpindah halaman, melainkan memicu SmartActionModal.tsx (Bottom Sheet meluncur dari bawah).

Isi Modal: Peringatan perilaku finansial (Behavioral Nudging).

Contoh Copywriting: "Terdeteksi rencana transaksi Rp 450.000 di e-commerce. Tahukah kamu, jika dana ini dialihkan ke cicilan A, kamu akan bebas utang 1 bulan lebih cepat."

Interaktivitas Utama: Jika user menekan tombol "Alihkan Dana (1-Tap)", aplikasi akan secara otomatis memotong saldo utama dan menguranginya dari daftar utang di AppContext, menutup modal, dan memperbarui angka di Dasbor secara real-time.

Fase 4: Spesific Internal Tabs
Debt Tab (/debt): Menampilkan daftar utang. Wajib diurutkan secara otomatis (Sorting) berdasarkan Bunga/APR tertinggi (Metode Avalanche). Setiap utang memiliki ProgressBar fungsional.

Wealth Tab (/wealth): Menampilkan grafik donat (Donut Chart) alokasi investasi dan ringkasan imbal hasil.

Profile Tab (/profile): Terdapat opsi ubah profil (untuk mempermudah juri hackathon menguji perubahan UI dasbor secara instan tanpa harus mengulang login).