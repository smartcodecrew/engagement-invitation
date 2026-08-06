/* ==========================================================================
   Luxury Engagement Invitation — Script
   Edit CONFIG below to customize the entire site.
   ========================================================================== */

/* --------------------------------------------------------------------------
   CONFIG — single source of truth
   -------------------------------------------------------------------------- */
const CONFIG = {
  /* Couple */
  brideName: "سارة محمد",
  groomName: "أحمد علي",
  brideShort: "سارة",
  groomShort: "أحمد",

  /* Event */
  dateDisplay: "الجمعة، ١٥ ربيع الأول ١٤٤٧ هـ",
  dateGregorian: "2026-09-18",
  timeDisplay: "٧:٠٠ مساءً",
  venue: "قاعة الياسمين الفاخرة — الرياض",
  mapsLink: "https://maps.google.com/?q=Riyadh+Saudi+Arabia",

  /* Countdown target (ISO or parseable date string) */
  eventDateTime: "2026-09-18T19:00:00",

  /* Copy */
  heroTitleAr: "دعوة خطوبة",
  heroTitleEn: "Engagement Invitation",
  inviteVerse: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا",
  inviteMessage: "يتشرف أهل العروسين بدعوتكم لحضور حفل خطوبتهما",
  inviteClosing: "حضوركم يسعدنا ويُكمل فرحتنا",
  quoteText: "الحب ليس أن ننظر إلى بعضنا البعض، بل أن ننظر معًا في نفس الاتجاه.",
  quoteAuthor: "— أنطوان دو سانت إكزوبيري",
  thanksText: "حضوركم ودعواتكم تعني لنا الكثير. نسأل الله أن يجمعنا على الخير والبركة.",

  /* Music — place your file in assets/music/ and update the path */
  musicPath: "assets/music/romantic.mp3",

  /* Gallery — local SVGs / images (lazy-loaded) */
  gallery: [
    { src: "assets/images/gallery-1.svg", alt: "لحظة رومانسية فاخرة", wide: true },
    { src: "assets/images/gallery-2.svg", alt: "تفاصيل ذهبية أنيقة" },
    { src: "assets/images/gallery-3.svg", alt: "أجواء الاحتفال" },
    { src: "assets/images/gallery-4.svg", alt: "ورود وذهب" },
    { src: "assets/images/gallery-5.svg", alt: "إضاءة ناعمة", wide: true },
    { src: "assets/images/gallery-6.svg", alt: "ذكرى جميلة" },
  ],

  /* Timeline milestones */
  timeline: [
    {
      date: "اليوم",
      title: "الدعوة",
      description: "نشارككم فرحتنا وندعوكم لتكونوا جزءًا من لحظتنا الخاصة.",
    },
    {
      date: "١٨ سبتمبر ٢٠٢٦",
      title: "الخطوبة",
      description: "حفل الخطوبة في قاعة الياسمين — لحظة إعلان البداية.",
    },
    {
      date: "قريبًا",
      title: "الاستقبال",
      description: "أمسية دافئة مع الأهل والأحبة احتفالًا بالوعد الجميل.",
    },
    {
      date: "المستقبل",
      title: "الزفاف",
      description: "فصل جديد ينتظرنا بإذن الله — كونوا معنا في الرحلة.",
    },
  ],

  /* RSVP */
  rsvpStorageKey: "engagement_rsvp_v1",
  rsvpThanksAttend: "سعداء بحضوركم! ننتظركم بفارغ الصبر.",
  rsvpThanksDecline: "نشكركم على الرد. نتمنى لكم كل الخير.",
};

/* --------------------------------------------------------------------------
   Utilities
   -------------------------------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function pad(n) {
  return String(n).padStart(2, "0");
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* --------------------------------------------------------------------------
   Apply CONFIG to DOM
   -------------------------------------------------------------------------- */
function applyConfig() {
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value != null) el.textContent = value;
  };

  setText("hero-title-ar", CONFIG.heroTitleAr);
  setText("hero-title-en", CONFIG.heroTitleEn);
  setText("hero-bride", CONFIG.brideShort);
  setText("hero-groom", CONFIG.groomShort);
  setText("hero-date", CONFIG.dateDisplay);

  setText("preview-bride", CONFIG.brideShort);
  setText("preview-groom", CONFIG.groomShort);

  setText("invite-verse", CONFIG.inviteVerse);
  setText("invite-message", CONFIG.inviteMessage);
  setText("invite-bride", CONFIG.brideName);
  setText("invite-groom", CONFIG.groomName);
  setText("invite-date", CONFIG.dateDisplay);
  setText("invite-time", CONFIG.timeDisplay);
  setText("invite-venue", CONFIG.venue);
  setText("invite-closing", CONFIG.inviteClosing);

  setText("location-venue", CONFIG.venue);
  setText("quote-text", CONFIG.quoteText);
  setText("quote-author", CONFIG.quoteAuthor);
  setText("thanks-text", CONFIG.thanksText);
  setText("thanks-names", `${CONFIG.brideShort} & ${CONFIG.groomShort}`);

  const maps = $("#maps-link");
  if (maps) {
    maps.href = CONFIG.mapsLink;
  }

  const audio = $("#bg-music");
  if (audio) {
    audio.src = CONFIG.musicPath;
  }

  document.title = `${CONFIG.heroTitleAr} | ${CONFIG.brideShort} & ${CONFIG.groomShort}`;
}

/* --------------------------------------------------------------------------
   Gallery
   -------------------------------------------------------------------------- */
let galleryIndex = 0;

function buildGallery() {
  const grid = $("#gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  CONFIG.gallery.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `gallery__item${item.wide ? " gallery__item--wide" : ""}`;
    btn.setAttribute("role", "listitem");
    btn.setAttribute("aria-label", `تكبير: ${item.alt}`);
    btn.dataset.index = String(index);

    btn.innerHTML = `
      <img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async" width="800" height="1000" />
      <span class="gallery__overlay-icon" aria-hidden="true"><i class="fa-solid fa-expand"></i></span>
    `;

    btn.addEventListener("click", () => openLightbox(index));
    grid.appendChild(btn);
  });
}

function openLightbox(index) {
  galleryIndex = index;
  const lb = $("#lightbox");
  const img = $("#lightbox-img");
  const item = CONFIG.gallery[index];
  if (!lb || !img || !item) return;

  img.src = item.src;
  img.alt = item.alt;
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  $("#lightbox-close")?.focus();

  if (window.gsap && !prefersReducedMotion()) {
    gsap.fromTo(img, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" });
  }
}

function closeLightbox() {
  const lb = $("#lightbox");
  if (!lb) return;
  lb.hidden = true;
  document.body.style.overflow = "";
}

function stepLightbox(dir) {
  const len = CONFIG.gallery.length;
  galleryIndex = (galleryIndex + dir + len) % len;
  openLightbox(galleryIndex);
}

function initLightbox() {
  $("#lightbox-close")?.addEventListener("click", closeLightbox);
  $("#lightbox-prev")?.addEventListener("click", () => stepLightbox(-1));
  $("#lightbox-next")?.addEventListener("click", () => stepLightbox(1));

  $("#lightbox")?.addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    const lb = $("#lightbox");
    if (!lb || lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(1);
    if (e.key === "ArrowRight") stepLightbox(-1);
  });
}

/* --------------------------------------------------------------------------
   Timeline
   -------------------------------------------------------------------------- */
function buildTimeline() {
  const list = $("#timeline-list");
  if (!list) return;

  list.innerHTML = CONFIG.timeline
    .map(
      (item, i) => `
    <li class="timeline__item" data-aos="fade-up" data-aos-delay="${i * 100}">
      <span class="timeline__dot" aria-hidden="true"></span>
      <div class="timeline__card">
        <time class="timeline__date">${item.date}</time>
        <h3 class="timeline__title">${item.title}</h3>
        <p class="timeline__desc">${item.description}</p>
      </div>
    </li>
  `
    )
    .join("");
}

/* --------------------------------------------------------------------------
   Countdown
   -------------------------------------------------------------------------- */
function updateCountdown() {
  const target = new Date(CONFIG.eventDateTime).getTime();
  const now = Date.now();
  let diff = Math.max(0, target - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * 1000 * 60;
  const seconds = Math.floor(diff / 1000);

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = pad(val);
  };

  set("cd-days", days);
  set("cd-hours", hours);
  set("cd-minutes", minutes);
  set("cd-seconds", seconds);
}

function initCountdown() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* --------------------------------------------------------------------------
   Music player (no autoplay)
   -------------------------------------------------------------------------- */
function initMusic() {
  const audio = $("#bg-music");
  const btn = $("#music-toggle");
  if (!audio || !btn) return;

  let playing = false;

  const syncUI = () => {
    btn.classList.toggle("is-playing", playing);
    btn.setAttribute("aria-pressed", String(playing));
    btn.setAttribute("aria-label", playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى");
  };

  btn.addEventListener("click", async () => {
    try {
      if (playing) {
        audio.pause();
        playing = false;
      } else {
        await audio.play();
        playing = true;
      }
      syncUI();
    } catch {
      playing = false;
      syncUI();
      btn.setAttribute("aria-label", "تعذر تشغيل الموسيقى — أضف ملفًا في assets/music");
    }
  });

  audio.addEventListener("ended", () => {
    playing = false;
    syncUI();
  });
}

/* --------------------------------------------------------------------------
   RSVP + LocalStorage
   -------------------------------------------------------------------------- */
function initRSVP() {
  const form = $("#rsvp-form");
  const thanks = $("#rsvp-thanks");
  const title = $("#rsvp-thanks-title");
  const msg = $("#rsvp-thanks-msg");
  const nameInput = $("#rsvp-name");

  const showThanks = (attending, name) => {
    if (form) form.hidden = true;
    if (thanks) thanks.hidden = false;
    if (title) title.textContent = attending ? "نتطلع لرؤيتكم" : "شكرًا لردّكم";
    if (msg) {
      const base = attending ? CONFIG.rsvpThanksAttend : CONFIG.rsvpThanksDecline;
      msg.textContent = name ? `${name}، ${base}` : base;
    }

    if (window.gsap && !prefersReducedMotion()) {
      gsap.fromTo(
        thanks,
        { opacity: 0, scale: 0.9, filter: "blur(8px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.7, ease: "power3.out" }
      );
    }
  };

  const saved = localStorage.getItem(CONFIG.rsvpStorageKey);
  if (saved) {
    try {
      const data = JSON.parse(saved);
      showThanks(data.attending, data.name);
    } catch {
      /* ignore corrupt storage */
    }
  }

  const save = (attending) => {
    const name = (nameInput?.value || "").trim();
    const payload = {
      attending,
      name,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(CONFIG.rsvpStorageKey, JSON.stringify(payload));
    showThanks(attending, name);
    if (attending) burstConfetti(40);
  };

  $("#rsvp-yes")?.addEventListener("click", () => save(true));
  $("#rsvp-no")?.addEventListener("click", () => save(false));
}

/* --------------------------------------------------------------------------
   Particles
   -------------------------------------------------------------------------- */
function initParticles() {
  const canvas = $("#particles");
  if (!canvas || prefersReducedMotion()) return;

  const ctx = canvas.getContext("2d");
  let w = 0;
  let h = 0;
  let particles = [];
  let mouse = { x: null, y: null };
  let raf = 0;

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };

  const create = () => {
    const count = Math.min(70, Math.floor((w * h) / 22000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.45 + 0.15,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (mouse.x != null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          p.x -= dx * 0.01;
          p.y -= dy * 0.01;
        }
      }

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${p.a})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  };

  resize();
  create();
  draw();

  window.addEventListener("resize", () => {
    resize();
    create();
  });

  window.addEventListener(
    "pointermove",
    (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    },
    { passive: true }
  );

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(draw);
  });
}

/* --------------------------------------------------------------------------
   Confetti
   -------------------------------------------------------------------------- */
function burstConfetti(amount = 80) {
  const canvas = $("#confetti");
  if (!canvas || prefersReducedMotion()) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#D4AF37", "#F5E6A3", "#FFFFFF", "#8B6914", "#E8D48B"];
  const pieces = Array.from({ length: amount }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 80,
    y: canvas.height * 0.35,
    w: Math.random() * 8 + 4,
    h: Math.random() * 6 + 3,
    color: colors[(Math.random() * colors.length) | 0],
    vx: (Math.random() - 0.5) * 14,
    vy: Math.random() * -12 - 4,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    life: 1,
  }));

  let raf = 0;
  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    for (const p of pieces) {
      p.vy += 0.28;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= 0.008;
      if (p.life <= 0) continue;
      alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (alive) raf = requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  cancelAnimationFrame(raf);
  tick();
}

/* --------------------------------------------------------------------------
   Loader
   -------------------------------------------------------------------------- */
function initLoader() {
  return new Promise((resolve) => {
    const loader = $("#loader");
    const fill = $(".loader__bar-fill");
    const reduced = prefersReducedMotion();

    if (!loader) {
      resolve();
      return;
    }

    if (reduced) {
      loader.classList.add("is-done");
      resolve();
      return;
    }

    if (window.gsap && fill) {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(loader, {
            opacity: 0,
            duration: 0.7,
            ease: "power2.inOut",
            onComplete: () => {
              loader.classList.add("is-done");
              resolve();
            },
          });
        },
      });

      tl.to(fill, { width: "100%", duration: 1.6, ease: "power2.inOut" });
      tl.to(".loader__monogram", { scale: 1.15, duration: 0.4, yoyo: true, repeat: 1 }, 0.8);
    } else {
      setTimeout(() => {
        loader.classList.add("is-done");
        resolve();
      }, 1200);
    }
  });
}

/* --------------------------------------------------------------------------
   Hero intro animations
   -------------------------------------------------------------------------- */
function animateHero() {
  if (!window.gsap || prefersReducedMotion()) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".hero__eyebrow", { y: 30, opacity: 0, filter: "blur(6px)", duration: 0.9 })
    .from(".hero__title-line", { y: 50, opacity: 0, scale: 0.96, duration: 1 }, "-=0.5")
    .from(".hero__title-en", { y: 20, opacity: 0, duration: 0.7 }, "-=0.55")
    .from(".hero__name", { y: 24, opacity: 0, stagger: 0.15, duration: 0.7 }, "-=0.4")
    .from(".hero__ampersand", { scale: 0, opacity: 0, duration: 0.5 }, "-=0.5")
    .from(".hero__date", { opacity: 0, y: 16, duration: 0.6 }, "-=0.35")
    .from("#btn-open", { opacity: 0, y: 24, scale: 0.95, duration: 0.7 }, "-=0.3");

  gsap.to(".hero__glow", {
    scale: 1.15,
    opacity: 0.7,
    duration: 4,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  });
}

/* --------------------------------------------------------------------------
   Envelope open sequence
   -------------------------------------------------------------------------- */
let invitationRevealed = false;

function revealContentSections() {
  if (invitationRevealed) return;
  invitationRevealed = true;
  document.body.classList.remove("is-invitation-locked");
  if (window.AOS) AOS.refresh();
}

function initEnvelope() {
  const btn = $("#btn-open");
  const section = $("#envelope-section");
  const envelope = $("#envelope");
  const flap = $(".envelope__flap");
  const card = $("#invite-card-preview");
  const seal = $(".envelope__seal");

  if (!btn || !section) return;

  document.body.classList.add("is-invitation-locked");

  btn.addEventListener("click", () => {
    section.hidden = false;
    section.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (!window.gsap || prefersReducedMotion()) {
      section.hidden = true;
      document.body.style.overflow = "";
      revealContentSections();
      $("#invitation")?.scrollIntoView({ behavior: "smooth" });
      burstConfetti(60);
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        gsap.to(section, {
          opacity: 0,
          duration: 0.6,
          onComplete: () => {
            section.hidden = true;
            section.style.opacity = "";
            document.body.style.overflow = "";
            revealContentSections();
            burstConfetti(90);
            $("#invitation")?.scrollIntoView({ behavior: "smooth" });

            gsap.from("#invitation .invite", {
              opacity: 0,
              y: 60,
              scale: 0.94,
              filter: "blur(10px)",
              duration: 1.1,
              ease: "power3.out",
            });
          },
        });
      },
    });

    gsap.set(section, { opacity: 0 });
    tl.to(section, { opacity: 1, duration: 0.4 })
      .from(envelope, { scale: 0.7, rotateX: 25, opacity: 0, duration: 0.7 }, 0)
      .to(seal, { scale: 0, opacity: 0, duration: 0.35 }, "+=0.25")
      .to(flap, { rotateX: -170, duration: 0.85, transformOrigin: "top center" }, "-=0.1")
      .to(
        card,
        {
          y: -160,
          scale: 1.08,
          duration: 0.9,
          ease: "power2.out",
        },
        "-=0.35"
      )
      .to(card, { opacity: 0, scale: 1.2, duration: 0.45 }, "+=0.15");
  });
}

/* --------------------------------------------------------------------------
   Scroll animations (GSAP ScrollTrigger + AOS)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  if (window.AOS) {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      disable: prefersReducedMotion(),
    });
  }

  if (!window.gsap || !window.ScrollTrigger || prefersReducedMotion()) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".countdown__unit").forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 85%" },
      y: 40,
      opacity: 0,
      duration: 0.7,
      delay: i * 0.08,
      ease: "power2.out",
    });
  });

  gsap.from(".quote__text", {
    scrollTrigger: { trigger: "#quote", start: "top 75%" },
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
    duration: 1.1,
    ease: "power3.out",
  });

  gsap.from(".thanks__ornament", {
    scrollTrigger: { trigger: "#thanks", start: "top 80%" },
    scale: 0.5,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.6)",
  });

  /* Parallax ambient orbs */
  gsap.to(".ambient__orb--1", {
    scrollTrigger: { scrub: 1 },
    y: 120,
    ease: "none",
  });

  gsap.to(".ambient__orb--2", {
    scrollTrigger: { scrub: 1 },
    y: -80,
    ease: "none",
  });
}

/* --------------------------------------------------------------------------
   Mouse parallax on hero names
   -------------------------------------------------------------------------- */
function initMouseParallax() {
  if (prefersReducedMotion()) return;
  const hero = $("#hero");
  if (!hero || !window.gsap) return;

  hero.addEventListener(
    "pointermove",
    (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(".hero__names", {
        x: x * 18,
        y: y * 12,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(".hero__title-line", {
        x: x * 10,
        y: y * 6,
        duration: 1,
        ease: "power2.out",
      });
    },
    { passive: true }
  );
}

/* --------------------------------------------------------------------------
   Smooth anchor scrolling enhancement
   -------------------------------------------------------------------------- */
function initSmoothAnchors() {
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    });
  });
}

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */
async function boot() {
  applyConfig();
  buildGallery();
  buildTimeline();
  initLightbox();
  initCountdown();
  initMusic();
  initRSVP();
  initParticles();
  initEnvelope();
  initSmoothAnchors();
  initMouseParallax();

  await initLoader();
  animateHero();
  initScrollAnimations();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
