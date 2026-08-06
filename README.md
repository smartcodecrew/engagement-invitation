# دعوة خطوبة سينمائية — صلاح & شروق

A cinematic digital engagement invitation. Not a webpage — a journey.

**Live:** https://smartcodecrew.github.io/engagement-invitation/

---

## Project Overview

Black-gold luxury experience inspired by Apple product launches and premium wedding stationery.

- Cinematic intro typography
- 3D luxury envelope + wax seal
- Glass invitation card
- Full-viewport scroll scenes (Lenis + GSAP)
- Personalized guest links (`?to=الاسم`)
- Countdown, story, gallery, quote, maps, RSVP, finale

### Couple

| | |
|--|--|
| Groom | المهندس صلاح |
| Bride | الدكتورة شروق |
| Date | 13/12/2026 |
| Time | 8:00 مساءً |
| Location | [قرية أهناسيا](https://maps.app.goo.gl/EWszfpLokuVTryTx9) |

---

## Features

- Intro: “كل قصة جميلة… تبدأ بلحظة.”
- Realistic envelope open + confetti
- Apple-style full-screen chapters
- Smooth scroll (Lenis)
- Magnetic buttons, parallax, particles, stars
- RSVP → LocalStorage
- Guest personalization + [`guests.html`](guests.html) link generator
- SEO, Open Graph, Manifest, a11y basics

---

## Tech Stack

HTML5 · CSS3 · Vanilla JS · GSAP · ScrollTrigger · Lenis · AOS · Font Awesome · Google Fonts (Cairo, Amiri, Poppins)

---

## Folder Structure

```text
/
├── index.html
├── style.css
├── script.js
├── guests.html
├── site.webmanifest
├── README.md
├── LICENSE
├── .gitignore
└── assets/
    ├── images/
    ├── music/
    ├── icons/
    └── fonts/
```

---

## Customization

Edit **`CONFIG`** at the top of `script.js` only:

```js
const CONFIG = {
  groom: "المهندس صلاح",
  bride: "الدكتورة شروق",
  date: "13/12/2026",
  time: "8:00 مساءً",
  location: "قرية أهناسيا",
  googleMaps: "https://maps.app.goo.gl/EWszfpLokuVTryTx9",
  eventDateTime: "2026-12-13T20:00:00+02:00",
  music: "assets/music/track.mp3",
  gallery: [ /* ... */ ],
};
```

### Personalized links

```text
https://smartcodecrew.github.io/engagement-invitation/?to=علاء
```

Generate many links via **guests.html**.

---

## How to Run

```bash
python -m http.server 8080
```

Open `http://localhost:8080`.

---

## Deploy (GitHub Pages)

1. Push to `master` / `main`
2. Settings → Pages → Deploy from branch → `/` root
3. Site: `https://<user>.github.io/<repo>/`

---

## Performance

- Deferred libraries
- Lazy-loaded gallery images
- Canvas particles respect `prefers-reduced-motion`
- Session restore skips intro after first open

---

## Credits

Designed as a cinematic invitation for **المهندس صلاح** & **الدكتورة شروق**.

MIT License.
