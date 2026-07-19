# Calculator Pro Max Ultra Universe AI++
Kalkulator parodi paling premium di multiverse. **Versi standalone** — HTML + CSS + JS murni, tanpa build tool, siap di-push ke GitHub & di-host gratis via **GitHub Pages**.
By **SMP Studios** — Squad Minion Plenger. 100% parodi, 0% duit beneran.
## Jalankan Lokal
Cukup buka `index.html` di browser. Atau pakai server statis apapun:
```bash
# python
python3 -m http.server 8000
# node
npx serve .
```
Buka `http://localhost:8000`.
## Deploy ke GitHub Pages
1. Push folder ini ke repo GitHub kamu.
2. Repo → **Settings → Pages**.
3. Source: **Deploy from a branch** → pilih `main` / root (atau `/github-version` kalau di subfolder — pakai folder `docs/` biar lebih standar).
4. Simpan. URL akan muncul dalam ~1 menit: `https://<user>.github.io/<repo>/`.
## Susunan File
```
github-version/
├── index.html   ← struktur halaman (login, kalkulator, modal premium & payment)
├── styles.css   ← tema iOS glass gelap, animasi, sticker "TRIMA KASIH"
├── app.js       ← seluruh logika: kalkulasi, batas 5x, achievements, event random, easter eggs, fake payment
└── README.md    ← file ini
```
Semua file sudah berisi code lengkap dan siap jalan.
## Fitur
- 🔐 Login palsu (nama disimpan di `localStorage`)
- 🧮 Kalkulator penuh dengan keyboard support
- 🚧 Batas 5 kalkulasi gratis → modal premium wajib
- 💸 3 paket imajinasi: PRO / ULTIMATE / UNIVERSE
- 🎬 Alur pembayaran palsu: konfirmasi → progress absurd → sticker **TRIMA KASIH**
- 🏆 5 achievement unlockable
- ⚽ Event random & easter eggs (Ronaldo, Messi, Herobrine, alien, pisang)
- 🌌 UI glassmorphism iOS-style, animasi shine & orb
## Lisensi
Parodi murni untuk hiburan. Tidak ada pembayaran nyata dilakukan.
