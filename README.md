# دعوة خطوبة فاخرة — Luxury Engagement Invitation

A premium, Apple-inspired digital engagement invitation built with **HTML5**, **CSS3**, and **Vanilla JavaScript**. Dark glassmorphism, golden accents, Arabic typography, and cinematic motion throughout.

---

## Project Overview

This project is a complete, production-ready single-page invitation website. Guests experience a luxury loading sequence, an animated hero, a 3D envelope reveal with confetti, a formal invitation card, live countdown, gallery lightbox, music player, maps link, RSVP with LocalStorage, timeline, quote, and a thank-you finale.

Everything editable lives in one **`CONFIG`** object at the top of `script.js`.

---

## Features

- Luxury loading screen with progress animation
- Hero with floating particles, ambient glow, and mouse parallax
- 3D envelope open sequence (GSAP) + confetti
- Formal bilingual invitation card (Arabic-first)
- Live countdown (days / hours / minutes / seconds)
- Responsive gallery with lightbox
- Floating music player (play/pause, **no autoplay**)
- Google Maps location button
- RSVP with LocalStorage + thank-you animation
- Scroll-driven timeline
- Romantic quote + thank-you sections
- SEO meta tags, Open Graph, Twitter Card, favicon, web manifest
- Accessibility: skip link, ARIA labels, keyboard lightbox, semantic HTML
- Fully responsive (desktop, laptop, tablet, mobile)
- `prefers-reduced-motion` support

---

## Technologies

| Layer | Stack |
|--------|--------|
| Markup | HTML5 (semantic, accessible) |
| Styles | CSS3 (custom properties, glassmorphism) |
| Logic | Vanilla JavaScript (ES6+) |
| Motion | [GSAP](https://gsap.com/) + ScrollTrigger |
| Icons | Inline SVG sprite (no icon CDN) |
| Fonts | Google Fonts — **Cairo**, **Poppins** |

No Bootstrap, React, Tailwind, Font Awesome, or AOS — fewer dependencies, faster loads.

---

## Folder Structure

```text
/
├── index.html
├── style.css
├── script.js
├── site.webmanifest
├── LICENSE
├── README.md
├── .gitignore
└── assets/
    ├── images/          # Gallery artwork
    ├── music/           # Background music (add your MP3)
    └── icons/           # Favicon & icons
```

---

## How to Run

### Option A — Open directly

1. Open `index.html` in a modern browser (Chrome, Edge, Firefox, Safari).
2. For best results with local audio, use a local server (Option B).

### Option B — Local server (recommended)

```bash
# Python 3
python -m http.server 8080

# Or Node (if installed)
npx serve .
```

Then visit `http://localhost:8080`.

---

## Customization Guide

Open **`script.js`** and edit the `CONFIG` object:

```js
const CONFIG = {
  brideName: "سارة محمد",
  groomName: "أحمد علي",
  brideShort: "سارة",
  groomShort: "أحمد",
  dateDisplay: "الجمعة، ١٥ ربيع الأول ١٤٤٧ هـ",
  timeDisplay: "٧:٠٠ مساءً",
  venue: "قاعة الياسمين الفاخرة — الرياض",
  mapsLink: "https://maps.google.com/?q=Your+Venue",
  eventDateTime: "2026-09-18T19:00:00",
  musicPath: "assets/music/romantic.mp3",
  gallery: [ /* { src, alt, wide? } */ ],
  timeline: [ /* { date, title, description } */ ],
  // …messages, quote, RSVP copy
};
```

### Personalized guest links

The site **cannot** read a guest’s name from their phone. Instead, send each person a unique URL:

```text
https://smartcodecrew.github.io/engagement-invitation/?to=محمد
```

Optional short IDs via `CONFIG.guests` in `script.js`:

```js
guests: {
  mohamed: "محمد العتيبي",
},
// then share: ?id=mohamed
```

Use **`guests.html`** to generate WhatsApp-ready links for a list of names.

1. Add photos to `assets/images/`.
2. Update `CONFIG.gallery` paths and `alt` text.
3. Set `wide: true` for landscape featured tiles.

### Add music

1. Place an MP3/OGG file in `assets/music/` (e.g. `romantic.mp3`).
2. Set `CONFIG.musicPath` to that file.
3. Guests must tap the floating music button — autoplay is intentionally disabled.

### Colors & fonts

Edit CSS variables in `style.css` under `:root`:

```css
--bg: #090909;
--accent: #D4AF37;
--text: #FFFFFF;
--font-ar: "Cairo", sans-serif;
--font-en: "Poppins", sans-serif;
```

### SEO / social preview

Update meta tags in `index.html` (`description`, `og:url`, `og:image`, Twitter tags) and `site.webmanifest`.

---

## Deployment Guide

### Any static host

Upload the project root (HTML, CSS, JS, `assets/`, manifest) to:

- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront
- Any shared hosting with static file support

No build step is required.

### Example — Netlify

1. Drag the project folder into Netlify Drop, **or**
2. Connect the GitHub repo and deploy with publish directory `/`.

### Example — Vercel

```bash
npx vercel
```

---

## GitHub Pages Guide

1. Create a GitHub repository and push this project.
2. Go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**.
4. Select `main` (or `master`) and folder `/` (root).
5. Save. Your site will be available at:

   `https://<username>.github.io/<repo-name>/`

6. If the site is in a subpath, ensure asset paths remain relative (they already are).

### Optional — custom domain

Add a `CNAME` file in the repo root with your domain, then configure DNS as GitHub documents.

---

## Accessibility Notes

- Skip-to-content link
- Semantic landmarks (`main`, `section`, `footer`)
- ARIA labels on interactive controls
- Keyboard support for lightbox (`Esc`, arrows)
- Focus-visible outlines on buttons
- Respects `prefers-reduced-motion`

---

## Browser Support

Latest versions of Chrome, Edge, Firefox, and Safari. Backdrop-filter and modern CSS are used for the glass aesthetic.

---

## License

Released under the [MIT License](LICENSE).

---

## Credits

Designed and engineered as a premium static invitation experience. Replace sample names, dates, venue, media, and map link before sharing with guests.
