/* ==========================================================================
   Luxury Engagement Invitation — Production Script
   Edit CONFIG to customize the entire site.
   ========================================================================== */

const CONFIG = {
  siteUrl: "https://smartcodecrew.github.io/engagement-invitation/",

  brideName: "سارة محمد",
  groomName: "أحمد علي",
  brideShort: "سارة",
  groomShort: "أحمد",

  dateDisplay: "الجمعة، ١٥ ربيع الأول ١٤٤٧ هـ",
  dateGregorian: "2026-09-18",
  timeDisplay: "٧:٠٠ مساءً",
  venue: "قاعة الياسمين الفاخرة — الرياض",
  mapsLink: "https://maps.google.com/?q=Riyadh+Saudi+Arabia",
  eventDateTime: "2026-09-18T19:00:00+03:00",
  eventDurationHours: 4,

  heroTitleAr: "دعوة خطوبة",
  heroTitleEn: "Engagement Invitation",
  inviteVerse: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا",
  inviteMessage: "يتشرف أهل العروسين بدعوتكم لحضور حفل خطوبتهما",
  inviteClosing: "حضوركم يسعدنا ويُكمل فرحتنا",
  quoteText: "الحب ليس أن ننظر إلى بعضنا البعض، بل أن ننظر معًا في نفس الاتجاه.",
  quoteAuthor: "— أنطوان دو سانت إكزوبيري",
  thanksText: "حضوركم ودعواتكم تعني لنا الكثير. نسأل الله أن يجمعنا على الخير والبركة.",

  musicPath: "assets/music/romantic.mp3",

  gallery: [
    { src: "assets/images/gallery-1.svg", alt: "لحظة رومانسية فاخرة", wide: true },
    { src: "assets/images/gallery-2.svg", alt: "تفاصيل ذهبية أنيقة" },
    { src: "assets/images/gallery-3.svg", alt: "أجواء الاحتفال" },
    { src: "assets/images/gallery-4.svg", alt: "ورود وذهب" },
    { src: "assets/images/gallery-5.svg", alt: "إضاءة ناعمة", wide: true },
    { src: "assets/images/gallery-6.svg", alt: "ذكرى جميلة" },
  ],

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

  rsvpStorageKey: "engagement_rsvp_v1",
  openedStorageKey: "engagement_opened_v1",
  rsvpThanksAttend: "سعداء بحضوركم! ننتظركم بفارغ الصبر.",
  rsvpThanksDecline: "نشكركم على الرد. نتمنى لكم كل الخير.",
};

/* --------------------------------------------------------------------------
   Utilities
   -------------------------------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const pad = (n) => String(n).padStart(2, "0");

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const hasGsap = () => typeof window.gsap !== "undefined";

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value != null) el.textContent = value;
}

function debounce(fn, wait = 150) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

function showToast(message, ms = 2800) {
  const toast = $("#toast");
  if (!toast) return;
  toast.hidden = false;
  toast.textContent = message;
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, ms);
}

function lockBodyScroll(lock) {
  document.body.style.overflow = lock ? "hidden" : "";
}

function getFocusable(root) {
  return $$(
    'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])',
    root
  ).filter((el) => !el.hasAttribute("hidden") && el.offsetParent !== null);
}

function trapFocus(container, event) {
  if (event.key !== "Tab") return;
  const focusable = getFocusable(container);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

/* --------------------------------------------------------------------------
   Apply CONFIG
   -------------------------------------------------------------------------- */
function applyConfig() {
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
  if (maps) maps.href = CONFIG.mapsLink;

  const audio = $("#bg-music");
  if (audio) audio.src = CONFIG.musicPath;

  document.title = `${CONFIG.heroTitleAr} | ${CONFIG.brideShort} & ${CONFIG.groomShort}`;
  setupCalendarLink();
}

function setupCalendarLink() {
  const link = $("#calendar-link");
  if (!link) return;

  const start = new Date(CONFIG.eventDateTime);
  if (Number.isNaN(start.getTime())) {
    link.hidden = true;
    return;
  }

  const end = new Date(start.getTime() + CONFIG.eventDurationHours * 60 * 60 * 1000);
  const stamp = (d) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Engagement Invitation//AR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:engagement-${CONFIG.dateGregorian}@invitation`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${CONFIG.heroTitleAr} — ${CONFIG.brideShort} & ${CONFIG.groomShort}`,
    `DESCRIPTION:${CONFIG.inviteMessage}`,
    `LOCATION:${CONFIG.venue}`,
    `URL:${CONFIG.siteUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  link.href = URL.createObjectURL(blob);
  link.download = "engagement.ics";
}

/* --------------------------------------------------------------------------
   Gallery + Lightbox
   -------------------------------------------------------------------------- */
let galleryIndex = 0;
let lightboxLastFocus = null;

function buildGallery() {
  const grid = $("#gallery-grid");
  if (!grid) return;

  const frag = document.createDocumentFragment();

  CONFIG.gallery.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `gallery__item reveal-on-scroll${item.wide ? " gallery__item--wide" : ""}`;
    btn.setAttribute("role", "listitem");
    btn.setAttribute("aria-label", `تكبير: ${item.alt}`);
    btn.dataset.index = String(index);

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt;
    img.loading = "lazy";
    img.decoding = "async";
    img.width = item.wide ? 1200 : 800;
    img.height = item.wide ? 750 : 1000;

    const overlay = document.createElement("span");
    overlay.className = "gallery__overlay-icon";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = '<svg class="icon"><use href="#i-expand"></use></svg>';

    btn.append(img, overlay);
    btn.addEventListener("click", () => openLightbox(index));
    frag.appendChild(btn);
  });

  grid.replaceChildren(frag);
}

function openLightbox(index) {
  galleryIndex = index;
  const lb = $("#lightbox");
  const img = $("#lightbox-img");
  const caption = $("#lightbox-caption");
  const item = CONFIG.gallery[index];
  if (!lb || !img || !item) return;

  lightboxLastFocus = document.activeElement;
  img.src = item.src;
  img.alt = item.alt;
  if (caption) caption.textContent = item.alt;

  lb.hidden = false;
  lockBodyScroll(true);
  $("#lightbox-close")?.focus();

  if (hasGsap() && !prefersReducedMotion()) {
    gsap.fromTo(img, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
  }
}

function closeLightbox() {
  const lb = $("#lightbox");
  if (!lb || lb.hidden) return;
  lb.hidden = true;
  lockBodyScroll(false);
  lightboxLastFocus?.focus?.();
  lightboxLastFocus = null;
}

function stepLightbox(dir) {
  const len = CONFIG.gallery.length;
  galleryIndex = (galleryIndex + dir + len) % len;
  const item = CONFIG.gallery[galleryIndex];
  const img = $("#lightbox-img");
  const caption = $("#lightbox-caption");
  if (!item || !img) return;
  img.src = item.src;
  img.alt = item.alt;
  if (caption) caption.textContent = item.alt;
}

function initLightbox() {
  const lb = $("#lightbox");
  $("#lightbox-close")?.addEventListener("click", closeLightbox);
  $("#lightbox-prev")?.addEventListener("click", () => stepLightbox(-1));
  $("#lightbox-next")?.addEventListener("click", () => stepLightbox(1));

  lb?.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lb || lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(1);
    if (e.key === "ArrowRight") stepLightbox(-1);
    trapFocus(lb, e);
  });
}

/* --------------------------------------------------------------------------
   Timeline
   -------------------------------------------------------------------------- */
function buildTimeline() {
  const list = $("#timeline-list");
  if (!list) return;

  const frag = document.createDocumentFragment();

  CONFIG.timeline.forEach((item) => {
    const li = document.createElement("li");
    li.className = "timeline__item reveal-on-scroll";

    const dot = document.createElement("span");
    dot.className = "timeline__dot";
    dot.setAttribute("aria-hidden", "true");

    const card = document.createElement("div");
    card.className = "timeline__card";

    const date = document.createElement("span");
    date.className = "timeline__date";
    date.textContent = item.date;

    const title = document.createElement("h3");
    title.className = "timeline__title";
    title.textContent = item.title;

    const desc = document.createElement("p");
    desc.className = "timeline__desc";
    desc.textContent = item.description;

    card.append(date, title, desc);
    li.append(dot, card);
    frag.appendChild(li);
  });

  list.replaceChildren(frag);
}

/* --------------------------------------------------------------------------
   Countdown
   -------------------------------------------------------------------------- */
let countdownTimer = null;
let lastAnnounceKey = "";

function updateCountdown() {
  const target = new Date(CONFIG.eventDateTime).getTime();
  if (Number.isNaN(target)) return;

  let diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86400000);
  diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000);
  diff -= hours * 3600000;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff - minutes * 60000) / 1000);

  setText("cd-days", pad(days));
  setText("cd-hours", pad(hours));
  setText("cd-minutes", pad(minutes));
  setText("cd-seconds", pad(seconds));

  /* Announce every minute only — avoid SR spam */
  const live = $("#countdown-live");
  const key = `${days}-${hours}-${minutes}`;
  if (live && key !== lastAnnounceKey) {
    lastAnnounceKey = key;
    live.textContent = `متبقي ${days} يوم و ${hours} ساعة و ${minutes} دقيقة`;
  }
}

function initCountdown() {
  updateCountdown();
  countdownTimer = window.setInterval(updateCountdown, 1000);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    } else if (!countdownTimer) {
      updateCountdown();
      countdownTimer = window.setInterval(updateCountdown, 1000);
    }
  });
}

/* --------------------------------------------------------------------------
   Music
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
      showToast("تعذر تشغيل الموسيقى. أضف ملفًا في assets/music");
    }
  });

  audio.addEventListener("pause", () => {
    if (!audio.ended) {
      playing = false;
      syncUI();
    }
  });

  audio.addEventListener("play", () => {
    playing = true;
    syncUI();
  });
}

/* --------------------------------------------------------------------------
   RSVP
   -------------------------------------------------------------------------- */
function initRSVP() {
  const form = $("#rsvp-form");
  const thanks = $("#rsvp-thanks");
  const title = $("#rsvp-thanks-title");
  const msg = $("#rsvp-thanks-msg");
  const nameInput = $("#rsvp-name");

  const showThanks = (attending, name) => {
    if (form) form.hidden = true;
    if (thanks) {
      thanks.hidden = false;
      thanks.focus();
    }
    if (title) title.textContent = attending ? "نتطلع لرؤيتكم" : "شكرًا لردّكم";
    if (msg) {
      const base = attending ? CONFIG.rsvpThanksAttend : CONFIG.rsvpThanksDecline;
      msg.textContent = name ? `${name}، ${base}` : base;
    }

    if (hasGsap() && !prefersReducedMotion() && thanks) {
      gsap.fromTo(
        thanks,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
      );
    }
  };

  try {
    const saved = localStorage.getItem(CONFIG.rsvpStorageKey);
    if (saved) {
      const data = JSON.parse(saved);
      if (typeof data.attending === "boolean") {
        showThanks(data.attending, data.name || "");
      }
    }
  } catch {
    /* ignore */
  }

  const save = (attending) => {
    const name = (nameInput?.value || "").trim().slice(0, 60);
    try {
      localStorage.setItem(
        CONFIG.rsvpStorageKey,
        JSON.stringify({ attending, name, savedAt: new Date().toISOString() })
      );
    } catch {
      showToast("تعذر حفظ الرد على هذا الجهاز");
    }
    showThanks(attending, name);
    if (attending) burstConfetti(36);
  };

  $("#rsvp-yes")?.addEventListener("click", () => save(true));
  $("#rsvp-no")?.addEventListener("click", () => save(false));

  nameInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      save(true);
    }
  });
}

/* --------------------------------------------------------------------------
   Particles (DPR-aware, paused when hidden / reduced motion)
   -------------------------------------------------------------------------- */
function initParticles() {
  const canvas = $("#particles");
  if (!canvas || prefersReducedMotion()) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  let w = 0;
  let h = 0;
  let dpr = 1;
  let particles = [];
  let mouse = { x: null, y: null };
  let raf = 0;
  let running = true;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const density = w < 640 ? 38000 : 24000;
    const count = Math.min(w < 640 ? 28 : 55, Math.floor((w * h) / density));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.35,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      a: Math.random() * 0.4 + 0.12,
    }));
  };

  const draw = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (mouse.x != null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110) {
          p.x -= dx * 0.008;
          p.y -= dy * 0.008;
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

  const start = () => {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(draw);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  resize();
  draw();

  window.addEventListener("resize", debounce(resize, 200));
  window.addEventListener(
    "pointermove",
    (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    },
    { passive: true }
  );

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });
}

/* --------------------------------------------------------------------------
   Confetti
   -------------------------------------------------------------------------- */
let confettiRaf = 0;

function burstConfetti(amount = 80) {
  const canvas = $("#confetti");
  if (!canvas || prefersReducedMotion()) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  cancelAnimationFrame(confettiRaf);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const colors = ["#D4AF37", "#F5E6A3", "#FFFFFF", "#8B6914", "#E8D48B"];
  const pieces = Array.from({ length: amount }, () => ({
    x: w / 2 + (Math.random() - 0.5) * 80,
    y: h * 0.35,
    ww: Math.random() * 8 + 4,
    hh: Math.random() * 6 + 3,
    color: colors[(Math.random() * colors.length) | 0],
    vx: (Math.random() - 0.5) * 14,
    vy: Math.random() * -12 - 4,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    life: 1,
  }));

  const tick = () => {
    ctx.clearRect(0, 0, w, h);
    let alive = false;

    for (const p of pieces) {
      p.vy += 0.28;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= 0.01;
      if (p.life <= 0) continue;
      alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.ww / 2, -p.hh / 2, p.ww, p.hh);
      ctx.restore();
    }

    if (alive) confettiRaf = requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, w, h);
  };

  tick();
}

/* --------------------------------------------------------------------------
   Loader
   -------------------------------------------------------------------------- */
function initLoader() {
  return new Promise((resolve) => {
    const loader = $("#loader");
    const fill = $(".loader__bar-fill");
    const bar = $("#loader-bar");

    const finish = () => {
      if (!loader) {
        resolve();
        return;
      }
      loader.classList.add("is-done");
      loader.setAttribute("aria-busy", "false");
      loader.setAttribute("aria-hidden", "true");
      resolve();
    };

    if (!loader || prefersReducedMotion()) {
      finish();
      return;
    }

    if (hasGsap() && fill) {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(loader, {
            opacity: 0,
            duration: 0.55,
            ease: "power2.inOut",
            onComplete: finish,
          });
        },
      });

      tl.to(fill, {
        width: "100%",
        duration: 1.25,
        ease: "power2.inOut",
        onUpdate() {
          if (bar) bar.setAttribute("aria-valuenow", String(Math.round(this.progress() * 100)));
        },
      });
      tl.to(".loader__monogram", { scale: 1.12, duration: 0.35, yoyo: true, repeat: 1 }, 0.6);
    } else {
      if (fill) fill.style.width = "100%";
      setTimeout(finish, 700);
    }
  });
}

/* --------------------------------------------------------------------------
   Hero animations
   -------------------------------------------------------------------------- */
function animateHero() {
  if (!hasGsap() || prefersReducedMotion()) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".hero__eyebrow", { y: 24, opacity: 0, duration: 0.7 })
    .from(".hero__title-line", { y: 40, opacity: 0, duration: 0.85 }, "-=0.4")
    .from(".hero__title-en", { y: 16, opacity: 0, duration: 0.55 }, "-=0.45")
    .from(".hero__name", { y: 20, opacity: 0, stagger: 0.12, duration: 0.55 }, "-=0.3")
    .from(".hero__ampersand", { scale: 0.6, opacity: 0, duration: 0.4 }, "-=0.4")
    .from(".hero__date", { opacity: 0, y: 12, duration: 0.45 }, "-=0.25")
    .from("#btn-open", { opacity: 0, y: 18, duration: 0.55 }, "-=0.2");
}

/* --------------------------------------------------------------------------
   Envelope
   -------------------------------------------------------------------------- */
let invitationRevealed = false;
let envelopeAnimating = false;

function revealContentSections() {
  if (invitationRevealed) return;
  invitationRevealed = true;
  document.body.classList.remove("is-invitation-locked");

  const scrollHint = $("#hero-scroll");
  if (scrollHint) scrollHint.hidden = false;

  try {
    sessionStorage.setItem(CONFIG.openedStorageKey, "1");
  } catch {
    /* ignore */
  }

  observeReveals();

  if (hasGsap() && window.ScrollTrigger) {
    ScrollTrigger.refresh();
  }
}

function initEnvelope() {
  const btn = $("#btn-open");
  const section = $("#envelope-section");
  const envelope = $("#envelope");
  const flap = $(".envelope__flap");
  const card = $("#invite-card-preview");
  const seal = $(".envelope__seal");

  if (!btn || !section) return;

  /* Restore open state within session */
  try {
    if (sessionStorage.getItem(CONFIG.openedStorageKey) === "1") {
      revealContentSections();
      btn.hidden = true;
      return;
    }
  } catch {
    /* ignore */
  }

  document.body.classList.add("is-invitation-locked");

  const finishOpen = () => {
    section.hidden = true;
    section.style.opacity = "";
    lockBodyScroll(false);
    btn.hidden = true;
    revealContentSections();
    burstConfetti(72);
    $("#invitation")?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });

    if (hasGsap() && !prefersReducedMotion()) {
      gsap.from("#invitation .invite", {
        opacity: 0,
        y: 48,
        duration: 0.9,
        ease: "power3.out",
      });
    }

    envelopeAnimating = false;
  };

  btn.addEventListener("click", () => {
    if (envelopeAnimating || invitationRevealed) return;
    envelopeAnimating = true;
    btn.disabled = true;

    section.hidden = false;
    lockBodyScroll(true);

    if (!hasGsap() || prefersReducedMotion()) {
      finishOpen();
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        gsap.to(section, {
          opacity: 0,
          duration: 0.5,
          onComplete: finishOpen,
        });
      },
    });

    gsap.set(section, { opacity: 0 });
    tl.to(section, { opacity: 1, duration: 0.35 })
      .from(envelope, { scale: 0.75, rotateX: 18, opacity: 0, duration: 0.65 }, 0)
      .to(seal, { scale: 0, opacity: 0, duration: 0.3 }, "+=0.2")
      .to(flap, { rotateX: -160, duration: 0.8, transformOrigin: "top center" }, "-=0.05")
      .to(card, { y: -150, scale: 1.06, duration: 0.8, ease: "power2.out" }, "-=0.3")
      .to(card, { opacity: 0, scale: 1.15, duration: 0.4 }, "+=0.1");
  });
}

/* --------------------------------------------------------------------------
   Scroll reveals + GSAP polish
   -------------------------------------------------------------------------- */
let revealObserver = null;

function observeReveals() {
  const els = $$(".reveal-on-scroll:not(.is-visible)");
  if (!els.length) return;

  if (prefersReducedMotion()) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  revealObserver?.disconnect();
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  els.forEach((el) => revealObserver.observe(el));
}

function initScrollAnimations() {
  if (!hasGsap() || !window.ScrollTrigger || prefersReducedMotion()) {
    observeReveals();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".ambient__orb--1", {
    y: 100,
    ease: "none",
    scrollTrigger: { scrub: 1 },
  });

  gsap.to(".ambient__orb--2", {
    y: -70,
    ease: "none",
    scrollTrigger: { scrub: 1 },
  });

  observeReveals();
}

function initMouseParallax() {
  if (prefersReducedMotion() || !hasGsap() || window.matchMedia("(pointer: coarse)").matches) {
    return;
  }

  const hero = $("#hero");
  if (!hero) return;

  hero.addEventListener(
    "pointermove",
    (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(".hero__names", { x: x * 14, y: y * 10, duration: 0.7, ease: "power2.out" });
      gsap.to(".hero__title-line", { x: x * 8, y: y * 5, duration: 0.9, ease: "power2.out" });
    },
    { passive: true }
  );
}

/* --------------------------------------------------------------------------
   Boot — wait for deferred GSAP if needed
   -------------------------------------------------------------------------- */
function whenReady(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn, { once: true });
  } else {
    fn();
  }
}

function waitForGsap(timeout = 2500) {
  return new Promise((resolve) => {
    if (hasGsap()) {
      resolve();
      return;
    }
    const start = Date.now();
    const tick = () => {
      if (hasGsap() || Date.now() - start > timeout) resolve();
      else requestAnimationFrame(tick);
    };
    tick();
  });
}

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
  initMouseParallax();

  await waitForGsap();
  await initLoader();
  animateHero();
  initScrollAnimations();
}

whenReady(boot);
