/* ==========================================================================
   Awwwards-tier cinematic invitation — صلاح × شروق
   Edit CONFIG only.
   ========================================================================== */

const CONFIG = {
  siteUrl: "https://smartcodecrew.github.io/engagement-invitation/",

  groom: "المهندس صلاح",
  bride: "الدكتورة شروق",
  groomShort: "صلاح",
  brideShort: "شروق",

  date: "13/12/2026",
  time: "8:00 مساءً",
  location: "قرية أهناسيا",
  googleMaps: "https://maps.app.goo.gl/EWszfpLokuVTryTx9",
  eventDateTime: "2026-12-13T20:00:00+02:00",

  music: "",

  introLine1: "كل قصة جميلة...\nتبدأ بلحظة.",
  introLine2: "وهذه لحظتنا.",

  inviteText: "دعوتكم لتشريفنا في حفل خطوبتنا",
  continueLabel: "ابدأ الرحلة",

  quote: "الحب ليس أن نجد الكمال في الآخر، بل أن نرى الجمال في رحلتنا معًا.",
  quoteAuthor: "— لحظة خاصة",
  endingMessage: "وجودكم يزيد فرحتنا جمالاً.",

  guestGreeting: "أهلاً بك يا {name}",
  guestInviteText: "ندعو {name} لتشريفنا في حفل خطوبتنا",

  rsvpThanksYes: "سعداء بحضوركم! ننتظركم بفارغ الصبر.",
  rsvpThanksNo: "نشكركم على الرد. نتمنى لكم كل الخير.",
  rsvpKey: "salah_shorouq_rsvp_v2",
  openedKey: "salah_shorouq_opened_v2",

  guests: {},

  story: [
    { date: "البداية", title: "أول لقاء", description: "لحظة صادقة فتحت باب قصة جميلة." },
    { date: "13/12/2026", title: "الخطوبة", description: "نعلن ارتباطنا بحضور أحبّ الناس إلينا." },
    { date: "قريبًا", title: "الزفاف", description: "فصل جديد بإذن الله… كونوا معنا في الطريق." },
  ],

  gallery: [
    { src: "assets/images/gallery-1.svg", alt: "لحظة ذهبية" },
    { src: "assets/images/gallery-2.svg", alt: "تفاصيل فاخرة" },
    { src: "assets/images/gallery-3.svg", alt: "احتفال ناعم" },
    { src: "assets/images/gallery-4.svg", alt: "ورود" },
    { src: "assets/images/gallery-5.svg", alt: "إضاءة" },
    { src: "assets/images/gallery-6.svg", alt: "ذكرى" },
  ],
};

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const pad = (n) => String(n).padStart(2, "0");
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGsap = () => typeof gsap !== "undefined";
const finePointer = () => matchMedia("(pointer: fine)").matches;

const GUEST = { name: "", id: "" };
let lenis = null;
let journeyStarted = false;
let envelopeBusy = false;
let introSkip = false;
let galleryIndex = 0;
let lightboxFocus = null;
let confettiRaf = 0;
let countdownTimer = null;
let lastAnnounce = "";
const cdPrev = { days: "", hours: "", minutes: "", seconds: "" };

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value != null) el.textContent = value;
}

function showToast(msg, ms = 2600) {
  const t = $("#toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("is-visible");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove("is-visible"), ms);
}

function sanitizeName(raw) {
  if (!raw) return "";
  try {
    raw = decodeURIComponent(String(raw).replace(/\+/g, " "));
  } catch {
    raw = String(raw);
  }
  return raw.replace(/[<>"'`\\]/g, "").replace(/\s+/g, " ").trim().slice(0, 40);
}

function resolveGuest() {
  const p = new URLSearchParams(location.search);
  const id = sanitizeName(p.get("id") || "").toLowerCase();
  if (id && CONFIG.guests?.[id]) {
    GUEST.id = id;
    GUEST.name = sanitizeName(CONFIG.guests[id]);
  } else {
    GUEST.name = sanitizeName(p.get("to") || p.get("name") || p.get("guest") || "");
  }
  return GUEST.name;
}

function tpl(str, name) {
  return String(str || "").replace(/\{name\}/g, name);
}

window.buildGuestLink = (name, id) => {
  const url = new URL(CONFIG.siteUrl || location.href.split("?")[0]);
  if (id) url.searchParams.set("id", id);
  else if (name) url.searchParams.set("to", name);
  return url.toString();
};

/* --------------------------------------------------------------------------
   CONFIG → DOM
   -------------------------------------------------------------------------- */
function applyConfig() {
  resolveGuest();
  setText("paper-groom", CONFIG.groom);
  setText("paper-bride", CONFIG.bride);
  setText("paper-date", CONFIG.date);
  setText("paper-time", CONFIG.time);
  setText("paper-location", CONFIG.location);
  setText("location-name", CONFIG.location);
  setText("ending-groom", CONFIG.groom);
  setText("ending-bride", CONFIG.bride);
  setText("ending-message", CONFIG.endingMessage);
  setText("quote-author", CONFIG.quoteAuthor);
  setText("mega-sub", "مهندس · دكتورة");

  const invite = $("#paper-invite");
  if (invite) {
    invite.textContent = GUEST.name ? tpl(CONFIG.guestInviteText, GUEST.name) : CONFIG.inviteText;
  }

  const maps = $("#maps-link");
  if (maps) maps.href = CONFIG.googleMaps.trim();

  if (CONFIG.music) {
    const audio = $("#bg-music");
    const musicUi = $("#music-player");
    if (audio && musicUi) {
      audio.src = CONFIG.music;
      musicUi.hidden = false;
    }
  }

  document.title = `${CONFIG.groomShort} & ${CONFIG.brideShort} | دعوة خطوبة`;
  if (GUEST.name) document.title = `دعوة إلى ${GUEST.name} | ${CONFIG.groomShort} & ${CONFIG.brideShort}`;

  const stageGuest = $("#stage-guest");
  if (stageGuest && GUEST.name) {
    stageGuest.hidden = false;
    stageGuest.textContent = tpl(CONFIG.guestGreeting, GUEST.name);
  }

  const rsvp = $("#rsvp-name");
  if (rsvp && GUEST.name) rsvp.value = GUEST.name;

  buildStory();
  buildGallery();
  splitMegaNames();
  prepareQuote();
}

function buildStory() {
  const list = $("#story-list");
  if (!list) return;
  const frag = document.createDocumentFragment();
  CONFIG.story.forEach((item) => {
    const li = document.createElement("li");
    li.className = "story__item";
    const dot = document.createElement("span");
    dot.className = "story__dot";
    dot.setAttribute("aria-hidden", "true");
    const card = document.createElement("div");
    card.className = "story__card";
    const date = document.createElement("span");
    date.className = "story__date";
    date.textContent = item.date;
    const title = document.createElement("h3");
    title.className = "story__title";
    title.textContent = item.title;
    const desc = document.createElement("p");
    desc.className = "story__desc";
    desc.textContent = item.description;
    card.append(date, title, desc);
    li.append(dot, card);
    frag.appendChild(li);
  });
  list.replaceChildren(frag);
}

function buildGallery() {
  const grid = $("#gallery-grid");
  if (!grid) return;
  const frag = document.createDocumentFragment();
  CONFIG.gallery.forEach((item, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "masonry__item";
    btn.setAttribute("role", "listitem");
    btn.setAttribute("aria-label", `تكبير: ${item.alt}`);
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt;
    img.loading = "lazy";
    img.decoding = "async";
    btn.appendChild(img);
    btn.addEventListener("click", () => openLightbox(i));
    frag.appendChild(btn);
  });
  grid.replaceChildren(frag);
}

function splitMegaNames() {
  const fill = (el, text) => {
    if (!el) return;
    el.setAttribute("aria-label", text);
    el.replaceChildren();
    [...text].forEach((ch) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = ch === " " ? "\u00A0" : ch;
      el.appendChild(span);
    });
  };
  fill($("#mega-groom"), CONFIG.groomShort);
  fill($("#mega-bride"), CONFIG.brideShort);
}

function prepareQuote() {
  const el = $("#quote-text");
  if (!el) return;
  el.replaceChildren();
  CONFIG.quote.split(/\s+/).forEach((word) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    el.append(span, document.createTextNode(" "));
  });
}

/* --------------------------------------------------------------------------
   Cursor / progress / chapters
   -------------------------------------------------------------------------- */
function initCursor() {
  const cursor = $("#cursor");
  if (!cursor || reduced() || !finePointer()) return;

  document.body.classList.add("has-custom-cursor");
  cursor.classList.add("is-on");

  const onMove = (e) => {
    if (!hasGsap()) {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      return;
    }
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  window.addEventListener("pointermove", onMove, { passive: true });

  const hoverSel = "a, button, [role='button'], input, .masonry__item, .envelope";
  document.addEventListener("pointerover", (e) => {
    if (e.target.closest(hoverSel)) cursor.classList.add("is-hover");
  });
  document.addEventListener("pointerout", (e) => {
    if (e.target.closest(hoverSel)) cursor.classList.remove("is-hover");
  });
}

function initProgressAndChapters() {
  const bar = $("#scroll-progress");
  const dots = $$(".chapters__dot");
  const scenes = [
    "#scene-names",
    "#scene-countdown",
    "#scene-story",
    "#scene-gallery",
    "#scene-quote",
    "#scene-location",
    "#scene-rsvp",
    "#scene-ending",
  ];

  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    if (bar) {
      bar.style.transform = `scaleX(${p})`;
      bar.setAttribute("aria-valuenow", String(Math.round(p * 100)));
    }

    let active = 0;
    scenes.forEach((sel, i) => {
      const el = $(sel);
      if (!el) return;
      if (el.getBoundingClientRect().top <= innerHeight * 0.45) active = i;
    });
    dots.forEach((d, i) => d.classList.toggle("is-active", i === active));
  };

  update();
  window.addEventListener("scroll", update, { passive: true });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      const href = dot.getAttribute("href");
      const target = href && $(href);
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
      else target.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
    });
  });
}

/* --------------------------------------------------------------------------
   Particles / stars / confetti
   -------------------------------------------------------------------------- */
function createParticleField(canvas, opts = {}) {
  if (!canvas || reduced()) return { destroy() {} };
  const ctx = canvas.getContext("2d");
  if (!ctx) return { destroy() {} };

  let w = 0;
  let h = 0;
  let dpr = 1;
  let parts = [];
  let raf = 0;
  let running = true;
  const color = opts.color || "212, 175, 55";

  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth || innerWidth;
    h = canvas.clientHeight || innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(opts.count || 48, Math.floor((w * h) / (opts.density || 30000)));
    parts = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * (opts.size || 1.5) + 0.25,
      vx: (Math.random() - 0.5) * (opts.speed || 0.18),
      vy: (Math.random() - 0.5) * (opts.speed || 0.18),
      a: Math.random() * 0.4 + 0.08,
    }));
  };

  const draw = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${p.a})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  };

  resize();
  draw();
  const onResize = () => resize();
  addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(raf);
    } else if (!running) {
      running = true;
      raf = requestAnimationFrame(draw);
    }
  });

  return {
    destroy() {
      running = false;
      cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
    },
  };
}

function createStars(canvas) {
  if (!canvas || reduced()) return;
  const ctx = canvas.getContext("2d");
  let w, h, dpr, stars, raf;
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth || innerWidth;
    h = canvas.clientHeight || innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.35 + 0.15,
      s: Math.random() * 0.28 + 0.04,
      a: Math.random() * Math.PI * 2,
    }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      s.y += s.s;
      s.a += 0.025;
      if (s.y > h) s.y = 0;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(243, 229, 176, ${0.2 + Math.sin(s.a) * 0.35})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  };
  resize();
  draw();
  addEventListener("resize", resize);
}

function burstConfetti(n = 100) {
  const canvas = $("#confetti");
  if (!canvas || reduced()) return;
  const ctx = canvas.getContext("2d");
  cancelAnimationFrame(confettiRaf);
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const w = innerWidth;
  const h = innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const colors = ["#D4AF37", "#F3E5B0", "#fff", "#8B6914", "#E8D48B"];
  const bits = Array.from({ length: n }, () => ({
    x: w / 2 + (Math.random() - 0.5) * 80,
    y: h * 0.38,
    w: Math.random() * 9 + 3,
    h: Math.random() * 6 + 2,
    c: colors[(Math.random() * colors.length) | 0],
    vx: (Math.random() - 0.5) * 15,
    vy: Math.random() * -12 - 4,
    r: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    life: 1,
  }));
  const tick = () => {
    ctx.clearRect(0, 0, w, h);
    let alive = false;
    for (const p of bits) {
      p.vy += 0.26;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      p.life -= 0.009;
      if (p.life <= 0) continue;
      alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (alive) confettiRaf = requestAnimationFrame(tick);
  };
  tick();
}

/* --------------------------------------------------------------------------
   Intro
   -------------------------------------------------------------------------- */
function runIntro() {
  return new Promise((resolve) => {
    const intro = $("#intro");
    const l1 = $("#intro-line-1");
    const l2 = $("#intro-line-2");
    const skipBtn = $("#intro-skip");
    const field = createParticleField($("#intro-particles"), { count: 60, density: 20000, speed: 0.1 });
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      field.destroy();
      if (!intro) {
        resolve();
        return;
      }
      if (hasGsap() && !reduced()) {
        gsap.to(intro, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            intro.hidden = true;
            intro.classList.add("is-done");
            resolve();
          },
        });
      } else {
        intro.hidden = true;
        intro.classList.add("is-done");
        resolve();
      }
    };

    skipBtn?.addEventListener("click", () => {
      introSkip = true;
      finish();
    });

    if (!intro || reduced() || !hasGsap()) {
      finish();
      return;
    }

    l1.replaceChildren();
    CONFIG.introLine1.split("\n").forEach((line, i) => {
      if (i) l1.appendChild(document.createElement("br"));
      l1.appendChild(document.createTextNode(line));
    });
    l2.textContent = CONFIG.introLine2;

    gsap.set([l1, l2], { opacity: 0, y: 28, filter: "blur(10px)" });

    const tl = gsap.timeline({ onComplete: finish });
    tl.to({}, { duration: 1.4 })
      .to(l1, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.55, ease: "power3.out" })
      .to(l1, { opacity: 0, y: -14, filter: "blur(8px)", duration: 0.95, ease: "power2.in" }, "+=1.5")
      .to(l2, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.35, ease: "power3.out" })
      .to(l2, { opacity: 0, filter: "blur(10px)", duration: 0.9 }, "+=1.25")
      .to({}, { duration: 0.4 });
  });
}

/* --------------------------------------------------------------------------
   Envelope
   -------------------------------------------------------------------------- */
function showEnvelopeStage() {
  const stage = $("#envelope-stage");
  if (!stage) return;
  stage.hidden = false;
  createParticleField($("#stage-particles"), { count: 50, density: 24000, speed: 0.14 });

  const envelope = $("#envelope");
  if (hasGsap() && !reduced()) {
    gsap.from(envelope, {
      y: -260,
      opacity: 0,
      rotateX: 32,
      scale: 0.92,
      duration: 1.85,
      ease: "power4.out",
    });
    gsap.to(".envelope-stage__spotlight", {
      scale: 1.18,
      opacity: 0.8,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }

  initEnvelopeParallax();
  initEnvelopeOpen();
}

function initEnvelopeParallax() {
  const stage = $("#envelope-stage");
  const envelope = $("#envelope");
  if (!stage || !envelope || reduced() || !hasGsap() || !finePointer()) return;

  stage.addEventListener(
    "pointermove",
    (e) => {
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      gsap.to(envelope, {
        rotateY: x * -10,
        rotateX: y * 7,
        x: x * 16,
        duration: 0.85,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(".envelope-stage__spotlight", {
        x: x * 50,
        y: y * 35,
        duration: 1,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    { passive: true }
  );
}

function initEnvelopeOpen() {
  const envelope = $("#envelope");
  if (!envelope) return;

  const open = () => {
    if (envelopeBusy || journeyStarted) return;
    envelopeBusy = true;
    envelope.style.pointerEvents = "none";
    $(".envelope__hint")?.remove();

    const flap = $(".envelope__flap");
    const seal = $("#seal");
    const paper = $("#paper");

    const expandPaper = () => {
      if (!paper) return finishToJourney();
      document.body.appendChild(paper);
      paper.classList.add("is-expanded");
      paper.setAttribute("aria-hidden", "false");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn--gold paper__continue magnetic";
      btn.innerHTML = `<span>${CONFIG.continueLabel}</span><i class="fa-solid fa-arrow-down" aria-hidden="true"></i>`;
      btn.addEventListener("click", finishToJourney);
      paper.querySelector(".paper__inner")?.appendChild(btn);

      if (hasGsap() && !reduced()) {
        gsap.fromTo(
          paper,
          { y: 100, scale: 0.88, opacity: 0.5, filter: "blur(8px)" },
          { y: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.15, ease: "power4.out" }
        );
        gsap.from(".paper.is-expanded .paper__inner > *", {
          y: 20,
          opacity: 0,
          stagger: 0.06,
          duration: 0.7,
          delay: 0.2,
          ease: "power3.out",
        });
      }
      burstConfetti(110);
      initMagnetic();
    };

    if (!hasGsap() || reduced()) {
      expandPaper();
      return;
    }

    const tl = gsap.timeline({ onComplete: expandPaper });
    tl.to(seal, { scale: 1.25, duration: 0.22, ease: "power2.out" })
      .to(seal, { scale: 0, opacity: 0, rotate: 55, y: 20, duration: 0.5, ease: "back.in(1.6)" })
      .to(flap, { rotateX: -168, duration: 1.05, transformOrigin: "top center", ease: "power3.inOut" }, "-=0.12")
      .to(paper, { y: -145, scale: 1.06, duration: 0.95, ease: "power2.out" }, "-=0.45")
      .to([envelope, ".envelope-stage__spotlight", ".envelope-stage__floor"], { opacity: 0, duration: 0.55 }, "+=0.12")
      .add(() => {
        envelope.style.visibility = "hidden";
      });
  };

  envelope.addEventListener("click", open);
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });
}

function finishToJourney() {
  if (journeyStarted) return;
  journeyStarted = true;

  try {
    sessionStorage.setItem(CONFIG.openedKey, "1");
  } catch {
    /* ignore */
  }

  const stage = $("#envelope-stage");
  const journey = $("#journey");
  const paper = $("#paper");

  const reveal = () => {
    if (stage) stage.hidden = true;
    if (paper) {
      paper.classList.remove("is-expanded");
      paper.hidden = true;
    }
    if (journey) journey.hidden = false;
    startJourneySystems();
    burstConfetti(36);
  };

  if (hasGsap() && !reduced() && paper?.classList.contains("is-expanded")) {
    gsap.to(paper, { opacity: 0, scale: 1.06, filter: "blur(6px)", duration: 0.6, onComplete: reveal });
  } else {
    reveal();
  }
}

function startJourneySystems() {
  initLenis();
  initScrollScenes();
  initCountdown();
  initMusic();
  initRSVP();
  initLightbox();
  initMagnetic();
  initProgressAndChapters();
  createParticleField($("#bg-particles"), { count: 55, density: 28000, speed: 0.12 });
  createStars($("#stars"));

  if (hasGsap() && !reduced()) {
    gsap.from(".chapters__dot", {
      scale: 0,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      delay: 0.3,
      ease: "back.out(1.6)",
    });
  }
}

/* --------------------------------------------------------------------------
   Lenis + scroll
   -------------------------------------------------------------------------- */
function initLenis() {
  if (reduced() || typeof Lenis === "undefined") return;
  lenis = new Lenis({
    duration: 1.35,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.2,
  });
  if (hasGsap() && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = (t) => {
      lenis.raf(t);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }
}

function initScrollScenes() {
  if (!hasGsap() || !window.ScrollTrigger || reduced()) {
    $$(".quote__text .word").forEach((w) => {
      w.style.opacity = "1";
      w.style.filter = "none";
      w.style.transform = "none";
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.from("#mega-names .char", {
    scrollTrigger: { trigger: "#scene-names", start: "top 68%" },
    y: 100,
    opacity: 0,
    rotateX: -55,
    rotateZ: 4,
    stagger: 0.055,
    duration: 1.05,
    ease: "power4.out",
  });

  gsap.from(".mega-names__heart", {
    scrollTrigger: { trigger: "#scene-names", start: "top 68%" },
    scale: 0,
    opacity: 0,
    duration: 0.9,
    delay: 0.4,
    ease: "back.out(2)",
  });

  gsap.from(".mega-names__sub", {
    scrollTrigger: { trigger: "#scene-names", start: "top 68%" },
    opacity: 0,
    letterSpacing: "0.6em",
    duration: 1.2,
    delay: 0.55,
    ease: "power3.out",
  });

  gsap.to(".ambient-orb--a", {
    y: 160,
    ease: "none",
    scrollTrigger: { scrub: 1.2 },
  });

  gsap.to(".ambient-orb--b", {
    y: -120,
    ease: "none",
    scrollTrigger: { scrub: 1.2 },
  });

  $$(".title-mask > span").forEach((span) => {
    gsap.from(span, {
      scrollTrigger: { trigger: span.closest(".scene"), start: "top 72%" },
      yPercent: 110,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });
  });

  gsap.from(".countdown__cell", {
    scrollTrigger: { trigger: "#scene-countdown", start: "top 70%" },
    y: 60,
    opacity: 0,
    rotateX: -20,
    stagger: 0.1,
    duration: 0.85,
    ease: "power3.out",
  });

  gsap.from(".story__item", {
    scrollTrigger: { trigger: "#scene-story", start: "top 70%" },
    x: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.9,
    ease: "power3.out",
  });

  gsap.from(".masonry__item", {
    scrollTrigger: { trigger: "#scene-gallery", start: "top 75%" },
    y: 50,
    opacity: 0,
    scale: 0.96,
    stagger: 0.07,
    duration: 0.75,
    ease: "power2.out",
  });

  gsap.to(".quote__text .word", {
    scrollTrigger: { trigger: "#scene-quote", start: "top 62%" },
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    stagger: 0.07,
    duration: 0.5,
    ease: "power2.out",
  });

  gsap.from(".quote__mark", {
    scrollTrigger: { trigger: "#scene-quote", start: "top 62%" },
    scale: 0.6,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(".location-card, .rsvp-card", {
    scrollTrigger: { trigger: "#scene-location", start: "top 70%" },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#scene-rsvp .rsvp-card", {
    scrollTrigger: { trigger: "#scene-rsvp", start: "top 70%" },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".ending__message", {
    scrollTrigger: { trigger: "#scene-ending", start: "top 70%" },
    y: 36,
    opacity: 0,
    filter: "blur(10px)",
    duration: 1.25,
    ease: "power3.out",
  });

  gsap.from(".ending__names > *", {
    scrollTrigger: { trigger: "#scene-ending", start: "top 70%" },
    y: 20,
    opacity: 0,
    stagger: 0.12,
    duration: 0.85,
    delay: 0.25,
    ease: "power3.out",
  });
}

/* --------------------------------------------------------------------------
   Countdown with subtle tick
   -------------------------------------------------------------------------- */
function tickDigit(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  const key = id.replace("cd-", "");
  const next = pad(value);
  if (cdPrev[key] === next) return;

  if (hasGsap() && !reduced() && cdPrev[key] !== "") {
    gsap.fromTo(
      el,
      { y: 12, opacity: 0.35 },
      { y: 0, opacity: 1, duration: 0.35, ease: "power2.out", overwrite: true }
    );
  }
  el.textContent = next;
  cdPrev[key] = next;
}

function updateCountdown() {
  const target = new Date(CONFIG.eventDateTime).getTime();
  if (Number.isNaN(target)) return;
  let diff = Math.max(0, target - Date.now());
  const d = Math.floor(diff / 86400000);
  diff -= d * 86400000;
  const h = Math.floor(diff / 3600000);
  diff -= h * 3600000;
  const m = Math.floor(diff / 60000);
  const s = Math.floor((diff - m * 60000) / 1000);

  tickDigit("cd-days", d);
  tickDigit("cd-hours", h);
  tickDigit("cd-minutes", m);
  tickDigit("cd-seconds", s);

  const key = `${d}-${h}-${m}`;
  const live = $("#countdown-live");
  if (live && key !== lastAnnounce) {
    lastAnnounce = key;
    live.textContent = `متبقي ${d} يوم و ${h} ساعة و ${m} دقيقة`;
  }
}

function initCountdown() {
  updateCountdown();
  countdownTimer = setInterval(updateCountdown, 1000);
}

function initMusic() {
  const audio = $("#bg-music");
  const btn = $("#music-toggle");
  if (!audio || !btn || !CONFIG.music) return;
  let playing = false;
  const sync = () => {
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
      sync();
    } catch {
      playing = false;
      sync();
      showToast("تعذر تشغيل الموسيقى");
    }
  });
}

function initRSVP() {
  const form = $("#rsvp-form");
  const thanks = $("#rsvp-thanks");
  const storageKey = GUEST.name ? `${CONFIG.rsvpKey}__${GUEST.name}` : CONFIG.rsvpKey;

  const showThanks = (yes, name) => {
    if (form) form.hidden = true;
    if (thanks) {
      thanks.hidden = false;
      thanks.focus();
    }
    setText("rsvp-thanks-title", yes ? "نتطلع لرؤيتكم" : "شكرًا لردّكم");
    const base = yes ? CONFIG.rsvpThanksYes : CONFIG.rsvpThanksNo;
    setText("rsvp-thanks-msg", name ? `${name}، ${base}` : base);
    if (hasGsap() && !reduced()) {
      gsap.fromTo(thanks, { opacity: 0, y: 20, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "power3.out" });
    }
  };

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const data = JSON.parse(saved);
      if (typeof data.attending === "boolean") showThanks(data.attending, data.name || "");
    }
  } catch {
    /* ignore */
  }

  const save = (yes) => {
    const name = ($("#rsvp-name")?.value || GUEST.name || "").trim().slice(0, 60);
    try {
      localStorage.setItem(storageKey, JSON.stringify({ attending: yes, name, savedAt: new Date().toISOString() }));
    } catch {
      showToast("تعذر حفظ الرد");
    }
    showThanks(yes, name);
    if (yes) burstConfetti(55);
  };

  $("#rsvp-yes")?.addEventListener("click", () => save(true));
  $("#rsvp-no")?.addEventListener("click", () => save(false));
}

function openLightbox(i) {
  galleryIndex = i;
  const lb = $("#lightbox");
  const img = $("#lightbox-img");
  const cap = $("#lightbox-cap");
  const item = CONFIG.gallery[i];
  if (!lb || !img || !item) return;
  lightboxFocus = document.activeElement;
  img.src = item.src;
  img.alt = item.alt;
  if (cap) cap.textContent = item.alt;
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  lenis?.stop?.();
  $("#lightbox-close")?.focus();
  if (hasGsap() && !reduced()) {
    gsap.fromTo(img, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" });
  }
}

function closeLightbox() {
  const lb = $("#lightbox");
  if (!lb || lb.hidden) return;
  lb.hidden = true;
  document.body.style.overflow = "";
  lenis?.start?.();
  lightboxFocus?.focus?.();
}

function initLightbox() {
  const lb = $("#lightbox");
  $("#lightbox-close")?.addEventListener("click", closeLightbox);
  $("#lightbox-prev")?.addEventListener("click", () => {
    galleryIndex = (galleryIndex - 1 + CONFIG.gallery.length) % CONFIG.gallery.length;
    openLightbox(galleryIndex);
  });
  $("#lightbox-next")?.addEventListener("click", () => {
    galleryIndex = (galleryIndex + 1) % CONFIG.gallery.length;
    openLightbox(galleryIndex);
  });
  lb?.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!lb || lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") $("#lightbox-next")?.click();
    if (e.key === "ArrowRight") $("#lightbox-prev")?.click();
  });
}

function initMagnetic() {
  if (reduced() || !hasGsap() || !finePointer()) return;
  $$(".magnetic").forEach((btn) => {
    if (btn.dataset.magnetic === "1") return;
    btn.dataset.magnetic = "1";
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(btn, { x: x * 0.28, y: y * 0.28, duration: 0.4, ease: "power3.out", overwrite: "auto" });
    });
    btn.addEventListener("pointerleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: "power3.out" });
    });
  });
}

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */
function waitLibs(ms = 3500) {
  return new Promise((resolve) => {
    const start = Date.now();
    const tick = () => {
      if (hasGsap() || Date.now() - start > ms) resolve();
      else requestAnimationFrame(tick);
    };
    tick();
  });
}

async function boot() {
  applyConfig();
  initCursor();

  try {
    if (sessionStorage.getItem(CONFIG.openedKey) === "1") {
      $("#intro")?.remove();
      const journey = $("#journey");
      if (journey) journey.hidden = false;
      journeyStarted = true;
      await waitLibs();
      startJourneySystems();
      return;
    }
  } catch {
    /* ignore */
  }

  await waitLibs();
  await runIntro();
  showEnvelopeStage();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
