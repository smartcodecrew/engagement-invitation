/* ==========================================================================
   Cinematic Invitation — مهندس صلاح × دكتورة شروق
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

  inviteLead: "يسر",
  inviteText: "دعوتكم لتشريفنا في حفل خطوبتنا",
  continueLabel: "ابدأ الرحلة",

  quote:
    "الحب ليس أن نجد الكمال في الآخر، بل أن نرى الجمال في رحلتنا معًا.",
  quoteAuthor: "— لحظة خاصة",

  endingMessage: "وجودكم يزيد فرحتنا جمالاً.",

  guestGreeting: "أهلاً بك يا {name}",
  guestInviteText: "ندعو {name} لتشريفنا في حفل خطوبتنا",

  rsvpThanksYes: "سعداء بحضوركم! ننتظركم بفارغ الصبر.",
  rsvpThanksNo: "نشكركم على الرد. نتمنى لكم كل الخير.",
  rsvpKey: "salah_shorouq_rsvp_v1",
  openedKey: "salah_shorouq_opened_v1",

  guests: {
    // alaa: "علاء",
  },

  story: [
    {
      date: "البداية",
      title: "أول لقاء",
      description: "لحظة صادقة فتحت باب قصة جميلة.",
    },
    {
      date: "13/12/2026",
      title: "الخطوبة",
      description: "نعلن ارتباطنا بحضور أحبّ الناس إلينا.",
    },
    {
      date: "قريبًا",
      title: "الزفاف",
      description: "فصل جديد بإذن الله… كونوا معنا في الطريق.",
    },
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

/* --------------------------------------------------------------------------
   State & utils
   -------------------------------------------------------------------------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const pad = (n) => String(n).padStart(2, "0");
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGsap = () => typeof gsap !== "undefined";

const GUEST = { name: "", id: "" };
let lenis = null;
let journeyStarted = false;
let envelopeBusy = false;
let galleryIndex = 0;
let lightboxFocus = null;
let confettiRaf = 0;
let countdownTimer = null;
let lastAnnounce = "";

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
   Apply CONFIG
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
    invite.textContent = GUEST.name
      ? tpl(CONFIG.guestInviteText, GUEST.name)
      : CONFIG.inviteText;
  }

  const maps = $("#maps-link");
  if (maps) maps.href = CONFIG.googleMaps.trim();

  const audio = $("#bg-music");
  const musicUi = $("#music-player");
  if (CONFIG.music && audio && musicUi) {
    audio.src = CONFIG.music;
    musicUi.hidden = false;
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
    li.innerHTML = `
      <span class="story__dot" aria-hidden="true"></span>
      <div class="story__card">
        <span class="story__date"></span>
        <h3 class="story__title"></h3>
        <p class="story__desc"></p>
      </div>`;
    li.querySelector(".story__date").textContent = item.date;
    li.querySelector(".story__title").textContent = item.title;
    li.querySelector(".story__desc").textContent = item.description;
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
    el.textContent = "";
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
  el.textContent = "";
  CONFIG.quote.split(/\s+/).forEach((word) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    el.append(span, document.createTextNode(" "));
  });
}

/* --------------------------------------------------------------------------
   Particles helpers
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
  const countBase = opts.count || 40;
  const color = opts.color || "212, 175, 55";
  const speed = opts.speed || 0.22;

  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth || innerWidth;
    h = canvas.clientHeight || innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(countBase, Math.floor((w * h) / (opts.density || 28000)));
    parts = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * (opts.size || 1.6) + 0.3,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      a: Math.random() * 0.45 + 0.1,
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
    stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.2,
      s: Math.random() * 0.35 + 0.05,
      a: Math.random(),
    }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      s.y += s.s;
      s.a += 0.02;
      if (s.y > h) s.y = 0;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 230, 163, ${0.25 + Math.sin(s.a) * 0.35})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  };
  resize();
  draw();
  addEventListener("resize", resize);
}

function burstConfetti(n = 90) {
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
  const colors = ["#D4AF37", "#F5E6A3", "#fff", "#8B6914"];
  const bits = Array.from({ length: n }, () => ({
    x: w / 2 + (Math.random() - 0.5) * 60,
    y: h * 0.4,
    w: Math.random() * 8 + 3,
    h: Math.random() * 5 + 2,
    c: colors[(Math.random() * colors.length) | 0],
    vx: (Math.random() - 0.5) * 14,
    vy: Math.random() * -11 - 3,
    r: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.28,
    life: 1,
  }));
  const tick = () => {
    ctx.clearRect(0, 0, w, h);
    let alive = false;
    for (const p of bits) {
      p.vy += 0.27;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      p.life -= 0.01;
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
   Intro cinematic
   -------------------------------------------------------------------------- */
function runIntro() {
  return new Promise((resolve) => {
    const intro = $("#intro");
    const l1 = $("#intro-line-1");
    const l2 = $("#intro-line-2");
    const field = createParticleField($("#intro-particles"), { count: 55, density: 22000, speed: 0.12 });

    const finish = () => {
      field.destroy();
      if (!intro) {
        resolve();
        return;
      }
      if (hasGsap() && !reduced()) {
        gsap.to(intro, {
          opacity: 0,
          duration: 0.9,
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

    if (!intro || reduced() || !hasGsap()) {
      finish();
      return;
    }

    l1.hidden = false;
    l1.textContent = "";
    CONFIG.introLine1.split("\n").forEach((line, i) => {
      if (i) l1.appendChild(document.createElement("br"));
      l1.appendChild(document.createTextNode(line));
    });
    l2.hidden = false;
    l2.textContent = CONFIG.introLine2;

    const tl = gsap.timeline({ onComplete: finish });
    tl.to({}, { duration: 1.6 })
      .fromTo(l1, { opacity: 0, y: 18, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4, ease: "power3.out" })
      .to(l1, { opacity: 0, y: -12, filter: "blur(6px)", duration: 0.9, ease: "power2.in" }, "+=1.4")
      .fromTo(l2, { opacity: 0, y: 18, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" })
      .to(l2, { opacity: 0, filter: "blur(8px)", duration: 0.8 }, "+=1.1")
      .to({}, { duration: 0.35 });
  });
}

/* --------------------------------------------------------------------------
   Envelope
   -------------------------------------------------------------------------- */
function showEnvelopeStage() {
  const stage = $("#envelope-stage");
  if (!stage) return;
  stage.hidden = false;
  createParticleField($("#stage-particles"), { count: 45, density: 26000, speed: 0.15 });

  const envelope = $("#envelope");
  if (hasGsap() && !reduced()) {
    gsap.from(envelope, {
      y: -220,
      opacity: 0,
      rotateX: 28,
      duration: 1.6,
      ease: "power3.out",
    });
    gsap.to(".envelope-stage__spotlight", {
      scale: 1.15,
      opacity: 0.75,
      duration: 3.5,
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
  if (!stage || !envelope || reduced() || !hasGsap()) return;
  if (matchMedia("(pointer: coarse)").matches) return;

  stage.addEventListener(
    "pointermove",
    (e) => {
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      gsap.to(envelope, {
        rotateY: x * -8,
        rotateX: y * 6,
        x: x * 12,
        duration: 0.7,
        ease: "power2.out",
      });
      gsap.to(".envelope-stage__spotlight", {
        x: x * 40,
        y: y * 30,
        duration: 0.9,
        ease: "power2.out",
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
    const stage = $("#envelope-stage");

    const expandPaper = () => {
      if (!paper) return finishToJourney();

      /* Reparent so parent visibility:hidden doesn't hide fixed paper */
      document.body.appendChild(paper);
      paper.classList.add("is-expanded");
      paper.setAttribute("aria-hidden", "false");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn--gold paper__continue magnetic";
      btn.textContent = CONFIG.continueLabel;
      btn.addEventListener("click", finishToJourney);
      paper.querySelector(".paper__inner")?.appendChild(btn);

      if (hasGsap() && !reduced()) {
        gsap.fromTo(
          paper,
          { y: 80, scale: 0.85, opacity: 0.7 },
          { y: 0, scale: 1, opacity: 1, duration: 1, ease: "power3.out" }
        );
      }
      burstConfetti(100);
      initMagnetic();
    };

    if (!hasGsap() || reduced()) {
      expandPaper();
      return;
    }

    const tl = gsap.timeline({ onComplete: expandPaper });
    tl.to(seal, { scale: 1.2, duration: 0.2 })
      .to(seal, { scale: 0, opacity: 0, rotate: 40, duration: 0.45, ease: "back.in(1.4)" })
      .to(flap, { rotateX: -165, duration: 0.95, transformOrigin: "top center", ease: "power3.inOut" }, "-=0.15")
      .to(paper, { y: -130, scale: 1.05, duration: 0.9, ease: "power2.out" }, "-=0.4")
      .to([envelope, ".envelope-stage__spotlight"], { opacity: 0, duration: 0.5 }, "+=0.15")
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
    document.body.style.overflow = "";
    initLenis();
    initScrollScenes();
    initCountdown();
    initMusic();
    initRSVP();
    initLightbox();
    initMagnetic();
    createParticleField($("#bg-particles"), { count: 50, density: 30000, speed: 0.14 });
    createStars($("#stars"));
    if (window.AOS) AOS.init({ once: true, duration: 900, easing: "ease-out-cubic", disable: reduced() });
    burstConfetti(40);
  };

  if (hasGsap() && !reduced() && paper?.classList.contains("is-expanded")) {
    gsap.to(paper, {
      opacity: 0,
      scale: 1.05,
      duration: 0.55,
      onComplete: reveal,
    });
  } else {
    reveal();
  }
}

/* --------------------------------------------------------------------------
   Lenis + scroll scenes
   -------------------------------------------------------------------------- */
function initLenis() {
  if (reduced() || typeof Lenis === "undefined") return;
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  if (hasGsap() && ScrollTrigger) {
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
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.from("#mega-names .char", {
    scrollTrigger: { trigger: "#scene-names", start: "top 70%" },
    y: 80,
    opacity: 0,
    rotateX: -40,
    stagger: 0.05,
    duration: 0.9,
    ease: "power3.out",
  });

  gsap.from(".mega-names__heart", {
    scrollTrigger: { trigger: "#scene-names", start: "top 70%" },
    scale: 0,
    opacity: 0,
    duration: 0.8,
    delay: 0.35,
    ease: "back.out(1.8)",
  });

  gsap.from(".countdown__cell", {
    scrollTrigger: { trigger: "#scene-countdown", start: "top 70%" },
    y: 50,
    opacity: 0,
    stagger: 0.1,
    duration: 0.75,
    ease: "power2.out",
  });

  gsap.from(".story__item", {
    scrollTrigger: { trigger: "#scene-story", start: "top 70%" },
    x: 40,
    opacity: 0,
    stagger: 0.18,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(".masonry__item", {
    scrollTrigger: { trigger: "#scene-gallery", start: "top 75%" },
    y: 40,
    opacity: 0,
    stagger: 0.08,
    duration: 0.7,
    ease: "power2.out",
  });

  gsap.to(".quote__text .word", {
    scrollTrigger: { trigger: "#scene-quote", start: "top 65%" },
    opacity: 1,
    filter: "blur(0px)",
    stagger: 0.08,
    duration: 0.45,
    ease: "power1.out",
  });

  gsap.from(".location-card", {
    scrollTrigger: { trigger: "#scene-location", start: "top 70%" },
    y: 40,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
  });

  gsap.from(".rsvp-card", {
    scrollTrigger: { trigger: "#scene-rsvp", start: "top 70%" },
    y: 40,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
  });

  gsap.from(".ending__message", {
    scrollTrigger: { trigger: "#scene-ending", start: "top 70%" },
    y: 30,
    opacity: 0,
    filter: "blur(8px)",
    duration: 1.1,
    ease: "power3.out",
  });
}

/* --------------------------------------------------------------------------
   Countdown / music / RSVP / lightbox / magnetic
   -------------------------------------------------------------------------- */
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
  setText("cd-days", pad(d));
  setText("cd-hours", pad(h));
  setText("cd-minutes", pad(m));
  setText("cd-seconds", pad(s));
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
      gsap.fromTo(thanks, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 });
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
    if (yes) burstConfetti(50);
  };

  $("#rsvp-yes")?.addEventListener("click", () => save(true));
  $("#rsvp-no")?.addEventListener("click", () => save(false));
}

function openLightbox(i) {
  galleryIndex = i;
  const lb = $("#lightbox");
  const img = $("#lightbox-img");
  const item = CONFIG.gallery[i];
  if (!lb || !img || !item) return;
  lightboxFocus = document.activeElement;
  img.src = item.src;
  img.alt = item.alt;
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  $("#lightbox-close")?.focus();
}

function closeLightbox() {
  const lb = $("#lightbox");
  if (!lb || lb.hidden) return;
  lb.hidden = true;
  document.body.style.overflow = "";
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
  if (reduced() || !hasGsap() || matchMedia("(pointer: coarse)").matches) return;
  $$(".magnetic").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.35, ease: "power2.out" });
    });
    btn.addEventListener("pointerleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
    });
  });
}

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */
function waitLibs(ms = 3000) {
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

  try {
    if (sessionStorage.getItem(CONFIG.openedKey) === "1") {
      $("#intro")?.remove();
      const journey = $("#journey");
      if (journey) journey.hidden = false;
      journeyStarted = true;
      initLenis();
      initScrollScenes();
      initCountdown();
      initMusic();
      initRSVP();
      initLightbox();
      initMagnetic();
      createParticleField($("#bg-particles"), { count: 50, density: 30000 });
      createStars($("#stars"));
      if (window.AOS) AOS.init({ once: true, duration: 900, disable: reduced() });
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
