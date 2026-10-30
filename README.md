# 💖 A Birthday Wonderland for Shristy ("Jannnnuuu")

A complete, fully functional, highly interactive, frontend-only romantic birthday surprise web application crafted with React, Vite, Tailwind CSS, Framer Motion, and Lucide React.

---

## 🌟 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```
   The static production output will be generated in the `dist/` directory, ready to deploy instantly to Vercel, Netlify, or GitHub Pages.

---

## 📁 Adding Your Photographs & Music

Place your files in the following folders:

### 1. Photographs (`public/assets/photos/`)
- `photo1.jpg` — Memory Gallery Photo #1
- `photo2.jpg` — Memory Gallery Photo #2
- `photo3.jpg` — Memory Gallery Photo #3
- `photo4.jpg` — Memory Gallery Photo #4
- `photo5.jpg` — Memory Gallery Photo #5
- `photo6.jpg` — Memory Gallery Photo #6
- `puzzle-image.jpg` — 4×4 Sliding Puzzle photo
- `shristy-final.jpg` — Prominent framed photograph on the Grand Finale page

*(If any photograph is not yet uploaded, a romantic placeholder with heart badges will gracefully display without broken icons).*

### 2. Background Music (`public/assets/music/`)
- `birthday-music.mp3` — Your background MP3 song.
- The music player floats at the top-right and continues playing across all 10 pages without restarting during page transitions.

---

## ⚙️ Customizing Content (`src/config/birthdayConfig.js`)

All personal details, messages, captions, dates, and settings are centralized in:
`src/config/birthdayConfig.js`

You can edit:
- Girlfriend's Name (`Shristy`) & Nickname (`Jannnnuuu`)
- Secret Password (default: `24092026`)
- 10 Heart Collection messages
- Main Love Letter and Hidden Secret Letter
- Timeline Milestones (Text-only)
- Gallery Captions
- Three Promises
- Birthday Cake & Grand Finale messages

---

## 🗺️ The 10-Chapter Romantic Adventure

1. **Page 1 — The Love Lock 🔐**: Enter secret password `24092026` with heart unlock animation.
2. **Page 2 — Welcome, My Jannnnuuu 💗**: Warm welcome message and romantic animations.
3. **Page 3 — Collect My Hearts ❤️**: 10 clickable hearts with unique love notes and counter.
4. **Page 4 — The Love Puzzle 🧩**: 4×4 sliding photo puzzle with step-by-step animated auto-solver.
5. **Page 5 — Our Little Love Letter 💌**: Heart envelope, typewriter love letter, and hidden secret letter.
6. **Page 6 — Our Relationship Timeline 🕰️**: Strictly text-only vertical timeline with SVG heart markers.
7. **Page 7 — Our Little Memory Lane 📸**: 6 polaroid photo scrapbook with full-screen lightbox.
8. **Page 8 — Three Promises For You ❤️**: 3 interactive glowing cards revealing heartfelt promises.
9. **Page 9 — The Birthday Cake 🎂**: Multi-tier cake, candle blowing (button or mic), and cake-cutting animation.
10. **Page 10 — The Grand Birthday Finale 🎆**: Shristy's framed photo, canvas fireworks, confetti, and replay button.

