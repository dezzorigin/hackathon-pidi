# DESIGN.md — LUNAS

> Panduan desain + prompt siap-tempel untuk membangun UI **LUNAS** di **Google Stitch** (stitch.withgoogle.com).
> Tujuan: 6 layar mockup yang konsisten untuk attachment submission (status: *Mockup & Validated Architecture*).

---

## 0. Cara pakai (alur kerja Stitch)

1. Buka Stitch, mode **Standard** (mode ini yang bisa **Export ke Figma**).
2. Untuk tiap layar: **tempel `[GAYA]` (Bagian 3) + prompt layar (Bagian 4)** sebagai satu prompt, lalu *Generate*.
3. Kerjakan **berkelompok 3 layar** (Batch A lalu Batch B) supaya gaya tidak melenceng.
4. Setelah semua jadi: **Shift+Klik (multi-select) semua layar → tempel "Prompt Konsistensi" (Bagian 5)** untuk menyamakan warna, font, dan spacing.
5. Iterasi **3–5x** per layar dengan follow-up kecil (jangan anggap hasil pertama final).
6. **Export ke Figma** (referensi dimensi/warna) **dan** salin **HTML/CSS** dari Code panel — keduanya berguna untuk tim dev.

---

## 1. Konteks produk (latar untuk Stitch)

LUNAS (Layanan Utang & Navigasi Aset) adalah asisten keuangan **otonom** berbasis Open Banking untuk Milenial, Gen-Z, dan pekerja *gig*. Aplikasi menarik data rekening & utang tanpa input manual (read-only), lalu otomatis memprioritaskan pelunasan utang berbunga tinggi (Paylater/Pinjol) sebelum berinvestasi — dengan konfirmasi 1-Tap + 2FA dari pengguna. Penggunanya sering cemas soal utang, jadi UI harus **menenangkan, jujur, dan memberi rasa kendali** — bukan menghakimi.

- Platform: **mobile** (iOS & Android, satu desain).
- Bahasa UI: **Bahasa Indonesia** (santai-profesional).

---

## 2. Design system

### Palet warna
| Peran | Hex | Pakai untuk |
|---|---|---|
| Primary (brand) | `#4338CA` | tombol utama, header brand, aksen aktif |
| Primary gelap | `#312E81` | judul besar, teks di atas indigo |
| Latar app | `#F6F7FB` | background semua layar |
| Kartu / surface | `#FFFFFF` | kartu, sheet, input |
| Teal (positif) | `#0D9488` | aset, investasi, progres, dampak baik |
| Coral (utang) | `#E24B4A` | nominal utang, bunga, APR tinggi |
| Amber (nudge) | `#E07B16` | peringatan perilaku, transaksi impulsif |
| Teks utama | `#161D2E` | judul & angka |
| Teks sekunder | `#5A6577` | keterangan, helper |
| Garis/border | `#E3E7EF` | pemisah halus |

Aturan warna: indigo = aksi & brand; teal = hal baik (aset/investasi/progres); coral = utang/bunga; amber = nudge. Jangan campur lebih dari 2 warna kuat dalam satu kartu.

### Tipografi
- Font: **Plus Jakarta Sans** (atau geometric sans bersih serupa).
- Angka uang: **besar & tebal** (weight 700–800), jadi fokus visual.
- Judul layar 22–26px/700, body 14–16px/400–500, helper 12–13px/500.
- Selalu **sentence case** (bukan Title Case, bukan KAPITAL).

### Komponen & bentuk
- Kartu radius **16–20px**, shadow lembut, padding longgar.
- Tombol primer: indigo penuh, radius pill/12px, teks putih.
- Chip/badge: pill kecil, warna sesuai makna (APR tinggi = coral).
- **Bottom navigation** 4 tab: Beranda · Utang · Investasi · Profil.
- Progress: **ring/arc** untuk debt-free countdown; bar tipis untuk progres per-utang.
- Banyak ruang napas (white space), hindari padat.

### Ikon
- Gaya **outline**, stroke ~2px (mis. set Lucide/Tabler). Hindari ikon 3D atau penuh warna.

### Mood & tone
- Kata sifat: **tenang, terpercaya, modern, menenangkan (anti-cemas), rapi, premium tapi ramah.**
- Tone copy: suportif, jujur, tidak menghakimi, berbasis fakta (angka & tanggal nyata).

---

## 3. Blok `[GAYA]` — tempel di awal SETIAP prompt layar

```
Gaya: aplikasi mobile fintech "LUNAS", light theme. Background #F6F7FB; kartu putih #FFFFFF radius 20px dengan shadow lembut. Primary indigo #4338CA; aksen teal #0D9488 (aset/investasi/positif); coral #E24B4A (utang/bunga); amber #E07B16 (nudge). Teks #161D2E (utama) & #5A6577 (sekunder); border #E3E7EF. Font Plus Jakarta Sans; nominal uang ditampilkan besar dan tebal. Ikon outline 2px. Mood: tenang, terpercaya, modern, menenangkan, rapi, banyak ruang napas. Bahasa Indonesia santai-profesional, sentence case. Bottom navigation: Beranda, Utang, Investasi, Profil.
```

---

## 4. Prompt per layar (siap tempel)

> Tempel **`[GAYA]` + satu blok di bawah** sekaligus. Angka contoh sudah konsisten antar-layar.

### Batch A

**Layar 1 — Onboarding: Hubungkan akun & Dynamic Buffer**
```
Buat layar onboarding. Dari atas ke bawah: judul "Hubungkan rekening & e-wallet kamu"; subteks "LUNAS hanya membaca data (read-only). Kredensial bankmu tidak pernah disimpan." Lalu daftar kartu akun yang bisa dihubungkan (placeholder logo + nama + tombol "Hubungkan"): "BCA" (sudah terhubung, centang teal), "GoPay Later" (sudah terhubung, centang teal), "Kredivo" (tombol Hubungkan), "Akulaku" (tombol Hubungkan). Lalu seksi "Atur Dynamic Buffer" dengan slider dan angka besar "Rp 1.500.000" dan helper "Saldo minimum untuk kebutuhan harianmu — LUNAS tidak akan menyentuh dana ini." Baris kepercayaan dengan ikon perisai kecil: "Enkripsi TLS 1.3 · Akses read-only". Tombol primer sticky di bawah "Lanjutkan".
```

**Layar 2 — Beranda: Dashboard Net-Worth**
```
Buat layar beranda dashboard. Kartu hero atas: label "Kekayaan bersih", angka besar "Rp 4.250.000", indikator naik kecil warna teal, dan sparkline tipis. Di bawahnya dua chip statistik bersebelahan: "Aset Rp 9.000.000" (teal) dan "Utang Rp 4.750.000" (coral). Lalu kartu "Debt-Free Countdown" dengan ring progres ~62%, teks tengah "Bebas utang dalam 4 bln 12 hr", subteks "Target: 16 Okt 2026". Lalu kartu "Aksi LUNAS hari ini": "Ada Rp 800.000 di atas buffer — lunasi Kredivo (APR 42%)?" dengan tombol primer "Tinjau". Lalu banner nudge amber lembut: "Kamu hampir checkout Rp 350.000 — itu memundurkan bebas utang 6 hari." Bottom navigation aktif di Beranda.
```

**Layar 3 — Utang: Liabilities Tracker + Debt-Free Countdown**
```
Buat layar daftar utang. Judul "Utang kamu". Header ringkas: ring/arc progres bebas utang, "Total outstanding Rp 4.750.000", dan baris coral "Bunga tergerus bulan ini Rp 142.000". Chip penjelas: "Diurutkan: bunga tertinggi dulu (Avalanche)". Lalu daftar kartu utang urut dari bunga tertinggi: 1) "Kredivo" Rp 2.100.000, badge "42% p.a." (coral), tag "Prioritas #1", bar progres pelunasan tipis; 2) "Akulaku" Rp 1.650.000, badge "36% p.a."; 3) "GoPay Later" Rp 1.000.000, badge "30% p.a.". Bottom navigation aktif di Utang.
```

### Batch B

**Layar 4 — 1-Tap Approve: Konfirmasi pelunasan + 2FA**
```
Buat sheet konfirmasi yang muncul di atas latar gelap (dimmed). Judul "Konfirmasi pelunasan". Kartu ringkas: "Lunasi Kredivo", angka besar "Rp 800.000", badge "42% p.a." (coral), dan baris dampak teal "Mempercepat bebas utang 11 hari". Rincian: "Dana tersedia Rp 2.300.000", "Buffer aman Rp 1.500.000", "Dieksekusi Rp 800.000". Baris keamanan kecil: "Dieksekusi via mitra berlisensi (PJP) — kamu yang menyetujui." Tombol primer besar dengan ikon sidik jari "Tahan untuk setujui", tombol sekunder ghost "Nanti dulu". Mood: aman, mantap, terpercaya.
```

**Layar 5 — Behavioral Nudge: Intervensi transaksi impulsif**
```
Buat layar intervensi penuh yang muncul saat pengguna hampir belanja impulsif. Tenang tapi menarik perhatian, aksen amber. Atas: ikon/ilustrasi outline lembut. Judul "Yakin mau lanjut?". Kartu: "Pengeluaran Rp 350.000 di Tokopedia". Visual dampak: timeline kecil yang menunjukkan tanggal bebas utang bergeser mundur, teks "Bebas utang mundur 6 hari (16 → 22 Okt)". Baris reframe dari AI: "Kalau ditahan, Rp 350.000 ini bisa melunasi 8% tagihan Kredivo." Dua tombol: primer teal "Batalkan, simpan untuk lunasi utang", sekunder ghost "Tetap lanjut". Tone suportif, tidak menghakimi.
```

**Layar 6 — Investasi: RDPU (transisi jadi investor)**
```
Buat layar investasi. Judul "Investasi". Kartu hero: label "Dana diselamatkan dari bunga utang", angka besar teal "Rp 1.200.000", subteks "kini bekerja untukmu". Kartu "RDPU — Reksa Dana Pasar Uang": nilai sekarang "Rp 1.218.400", return "+1,53%" (teal), unit dimiliki. Donut alokasi kecil berlabel "Alokasi optimal (MVO)". Baris toggle "Auto-Sweep ke investasi" dengan helper "Setelah utang sehat, sisa dana otomatis dialihkan ke RDPU." Kartu progres "Dari debitur → investor ritel". Bottom navigation aktif di Investasi.
```

---

## 5. Prompt konsistensi (pakai setelah multi-select semua layar)

```
Samakan semua layar terpilih ke satu design system: background #F6F7FB, kartu putih #FFFFFF radius 20px shadow lembut, primary indigo #4338CA, teal #0D9488 untuk aset/investasi/positif, coral #E24B4A untuk utang/bunga, amber #E07B16 untuk nudge, teks #161D2E & #5A6577, font Plus Jakarta Sans dengan nominal uang besar dan tebal, ikon outline 2px, spacing longgar, bottom navigation seragam (Beranda, Utang, Investasi, Profil). Jaga hierarki tipografi dan radius kartu identik di semua layar.
```

---

## 6. Tips iterasi & export

- **Iterasi terarah**, contoh follow-up: "Perbesar angka kekayaan bersih dan beri lebih banyak ruang di atasnya", "Buat badge APR lebih menonjol (coral)", "Ring countdown jadikan elemen paling dominan".
- **Konsistensi angka**: semua layar memakai set yang sama (net worth Rp 4.250.000; utang Kredivo 42% / Akulaku 36% / GoPay Later 30%; buffer Rp 1.500.000; sweep Rp 800.000). Jangan biarkan Stitch mengubahnya.
- **Export**: ambil **Figma** (untuk slot Link Attachment) + screenshot tiap layar jadi **PNG** (untuk digabung ke PDF File Attachment). Beri nama file PDF: `ID Team - Judul Proposal`.
- **Konsistensi brand dengan arsitektur**: palet indigo/teal/coral/amber sama dengan poster arsitektur LUNAS — jadi seluruh submission terbaca satu identitas.
