/* ==========================================================================
   دعوة زفاف عمر & شيماء — عدّل CONFIG فقط
   ========================================================================== */

const CONFIG = {
  siteUrl: "https://smartcodecrew.github.io/engagement-invitation/",

  families: "أفراح آل باداود و آل بازمول",
  groomShort: "عمر",
  brideShort: "شيماء",
  groomFull: "الشاب عمر عبدالله باداود",
  brideFull: "الآنسة شيماء سالم بازمول",

  hijri: "29/5/1448 هـ",
  weekday: "الاثنين",
  gregorian: "9/11/2026 م",
  gregorianPretty: "9 نوفمبر 2026",
  day: "09",
  monthName: "نوفمبر",
  year: "2026",

  /* بدون وقت محدد في نص الدعوة — العدّاد حتى بداية يوم الزفاف */
  eventDateTime: "2026-11-09T00:00:00+03:00",

  venue: "قاعة شغف",
  venueArea: "الإسكان الجنوبي",
  googleMaps: "https://maps.app.goo.gl/aAZLaeySVqAbGbz67",

  music: "assets/music/piano.mp3",

  blessing: "بارك الله لهما وبارك عليهما وجمع بينهما في خير.",
  night: "في ليلة زاهية يضوي الفرح عالي سماها وبقلوب يملؤها الفرح وتغمرها السعادة",
  inviteLead: "بصادق الود والمحبة أتشرف بدعوتكم لحضور حفل زفاف ابني ..",

  timeline: [
    { time: "", title: "الاستقبال", text: "نستقبلكم بصادق الود والمحبة" },
    { time: "", title: "عقد القران", text: "وذلك بمشيئة الله تعالى في هذه الليلة المباركة" },
    { time: "", title: "الفرح", text: "وبحضوركم يتم الفرح والسرور" },
  ],

  rules: [
    "الدعوة شخصية",
    "جنة الأطفال منازلهم",
    "يمنع جوالات الكاميرا",
  ],

  /* ضع روابط صور العروسين هنا لتظهر في ألبوم اللحظات */
  photos: [],

  /* املأهما ليظهر حساب الهدية وزر النسخ */
  giftName: "",
  iban: "",

  closing: "وبحضوركم يتم الفرح والسرور",
  countdownLabel: "يبدأ الحفل بعد",

  guestGreeting: "دعوة خاصة إلى {name}",
  guests: {},

  rsvpKey: "omar_shaima_rsvp",
  wishKey: "omar_shaima_wish",
};

const $ = (s, c = document) => c.querySelector(s);
const pad = (n) => String(n).padStart(2, "0");
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

const GUEST = { name: "" };
let attending = true;
let guestsCount = 1;
let musicOn = false;

function sanitizeName(raw) {
  return clean(raw, 40, true);
}

function sanitizeText(raw, max) {
  return clean(raw, max, false);
}

function clean(raw, max, decode) {
  if (!raw) return "";
  raw = String(raw);
  if (decode) {
    try { raw = decodeURIComponent(raw.replace(/\+/g, " ")); }
    catch { /* keep the original text */ }
  }
  return raw.replace(/[<>"'`\\]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}

function resolveGuest() {
  const p = new URLSearchParams(location.search);
  const id = sanitizeName(p.get("id") || "").toLowerCase();
  GUEST.name = id && CONFIG.guests[id]
    ? sanitizeName(CONFIG.guests[id])
    : sanitizeName(p.get("to") || p.get("name") || p.get("guest") || "");
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value != null) el.textContent = value;
}

function ornament() {
  const d = document.createElement("div");
  d.className = "ornament";
  d.setAttribute("aria-hidden", "true");
  d.innerHTML = "<span></span><i></i><span></span>";
  return d;
}

function applyConfig() {
  resolveGuest();
  setText("cover-families", CONFIG.families);
  setText("cover-groom", CONFIG.groomShort);
  setText("cover-bride", CONFIG.brideShort);
  setText("letter-groom", CONFIG.groomShort);
  setText("letter-bride", CONFIG.brideShort);
  setText("end-groom", CONFIG.groomShort);
  setText("end-bride", CONFIG.brideShort);
  const names = document.getElementById("loc-names");
  if (names) names.innerHTML = `${CONFIG.groomShort}<br>و<br>${CONFIG.brideShort}`;
  setText("date-day", CONFIG.day);
  setText("date-month", CONFIG.monthName);
  setText("date-year", CONFIG.year);
  setText("date-weekday", CONFIG.weekday);
  setText("date-hijri", CONFIG.hijri);
  setText("venue-name", CONFIG.venue);
  setText("compass-tag", CONFIG.venue);
  setText("venue-address", CONFIG.venueArea);
  setText("cd-title", CONFIG.countdownLabel);
  setText("cd-quote", CONFIG.blessing);
  setText("closing-text", CONFIG.closing);
  setText("closing-date", CONFIG.gregorianPretty);

  const maps = $("#maps-link");
  if (maps) maps.href = CONFIG.googleMaps;

  const guest = $("#cover-guest");
  if (guest && GUEST.name) {
    guest.hidden = false;
    guest.textContent = CONFIG.guestGreeting.replace("{name}", GUEST.name);
    const wishName = $("#wish-name");
    const rsvpName = $("#rsvp-name");
    if (wishName) wishName.value = GUEST.name;
    if (rsvpName) rsvpName.value = GUEST.name;
  }

  const letter = $("#letter-body");
  if (letter) {
    letter.replaceChildren();
    [CONFIG.blessing, CONFIG.night, CONFIG.inviteLead].forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      letter.appendChild(p);
    });
    [CONFIG.groomFull, "على", CONFIG.brideFull].forEach((line, i) => {
      const p = document.createElement("p");
      if (i !== 1) p.className = "emph";
      p.textContent = line;
      letter.appendChild(p);
    });
    const when = document.createElement("p");
    when.textContent = `وذلك بمشيئة الله تعالى يوم ${CONFIG.weekday} ${CONFIG.hijri} الموافق ${CONFIG.gregorian}`;
    letter.appendChild(when);
  }

  const steps = $("#steps");
  if (steps) {
    steps.replaceChildren();
    CONFIG.timeline.forEach((item, index) => {
      if (index) steps.appendChild(ornament());
      const li = document.createElement("li");
      li.className = "rise";
      if (item.time) {
        const time = document.createElement("p");
        time.className = "time";
        time.textContent = item.time;
        li.appendChild(time);
      }
      const title = document.createElement("p");
      title.className = "title";
      title.textContent = item.title;
      const text = document.createElement("p");
      text.className = "text";
      text.textContent = item.text;
      li.append(title, text);
      steps.appendChild(li);
    });
  }

  const rules = $("#rules");
  if (rules) {
    rules.replaceChildren();
    CONFIG.rules.forEach((rule, index) => {
      if (index) rules.appendChild(ornament());
      const li = document.createElement("li");
      li.className = "rise";
      const title = document.createElement("p");
      title.className = "title";
      title.textContent = rule;
      li.appendChild(title);
      rules.appendChild(li);
    });
  }

  if (Array.isArray(CONFIG.photos) && CONFIG.photos.length) {
    const figs = [...document.querySelectorAll("#mosaic img")];
    CONFIG.photos.slice(0, figs.length).forEach((src, i) => {
      if (typeof src === "string" && !/^(javascript|data):/i.test(src)) figs[i].src = src;
    });
    setText("gallery-lead", "معًا، أجمل ما جُمع");
  }

  if (CONFIG.iban) {
    const card = $("#iban-card");
    if (card) card.hidden = false;
    setText("iban-owner", CONFIG.giftName);
    setText("iban-num", CONFIG.iban);
  }

  const audio = $("#bg-music");
  if (audio && CONFIG.music) audio.src = CONFIG.music;

  document.title = `دعوة زفاف | ${CONFIG.groomShort} & ${CONFIG.brideShort}`;
  setupCalendar();
  stampDelays();
}

function stampDelays() {
  document.querySelectorAll(".panel").forEach((panel) => {
    [...panel.children].forEach((child, i) => child.style.setProperty("--d", String(i)));
  });
}

function setupCalendar() {
  const link = $("#calendar-link");
  if (!link) return;
  const start = "20261109";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//AR",
    "BEGIN:VEVENT",
    "UID:omar-shaima-20261109@invitation",
    `DTSTART;VALUE=DATE:${start}`,
    "DTEND;VALUE=DATE:20261110",
    `SUMMARY:زفاف ${CONFIG.groomShort} و ${CONFIG.brideShort}`,
    `LOCATION:${CONFIG.venue} - ${CONFIG.venueArea}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  link.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  link.download = "wedding.ics";
}

function openDoors() {
  const doors = $("#doors");
  const stage = $("#stage");
  if (!doors || doors.classList.contains("is-open")) return;
  doors.classList.add("is-open");
  if (stage) stage.setAttribute("aria-hidden", "false");
  $("#scroll-next").hidden = false;
  playMusic(true);

  const finish = () => {
    doors.hidden = true;
    initCountdown();
    initScroll();
    revealPanels();
    playMusic(true);
    $("#cover")?.classList.add("in");
  };

  const left = $(".door--left");
  const right = $(".door--right");
  const seal = $(".seal");
  const label = $(".doors__open .pill");

  if (typeof gsap === "undefined" || reduced()) {
    finish();
    return;
  }

  const tl = gsap.timeline({ onComplete: finish });
  tl.to(seal, { scale: 1.08, duration: 0.16, transformOrigin: "50% 50%" })
    .to(seal, { scale: 0, opacity: 0, duration: 0.38, ease: "power2.in" })
    .to(label, { opacity: 0, duration: 0.28 }, "<")
    .to(right, { xPercent: 108, duration: 1.25, ease: "power3.inOut" }, "-=0.05")
    .to(left, { xPercent: -108, duration: 1.25, ease: "power3.inOut" }, "<");
}

function revealPanels() {
  const scroller = $("#scroller");
  if (!scroller) return;
  const panels = [...scroller.querySelectorAll(".panel")];
  if (typeof IntersectionObserver === "undefined") {
    panels.forEach((p) => p.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in");
    });
  }, { root: scroller, threshold: 0.45 });
  panels.forEach((panel) => io.observe(panel));
}

function initScroll() {
  const scroller = $("#scroller");
  const btn = $("#scroll-next");
  if (!scroller || !btn) return;
  btn.addEventListener("click", () => {
    const panels = [...scroller.querySelectorAll(".panel")];
    const top = scroller.getBoundingClientRect().top;
    let index = 0;
    panels.forEach((panel, i) => {
      if (panel.getBoundingClientRect().top - top < scroller.clientHeight * 0.4) index = i;
    });
    const atEnd = index >= panels.length - 1;
    const target = atEnd ? panels[0] : panels[index + 1];
    target.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
  });
}

let timer = null;
let announced = "";

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
  setText("cd-days", String(d));
  setText("cd-hours", pad(h));
  setText("cd-minutes", pad(m));
  setText("cd-seconds", pad(s));
  const key = `${d}-${h}-${m}`;
  const live = $("#cd-live");
  if (live && key !== announced) {
    announced = key;
    live.textContent = `متبقي ${d} يوم و ${h} ساعة و ${m} دقيقة`;
  }
}

function initCountdown() {
  updateCountdown();
  clearInterval(timer);
  timer = setInterval(updateCountdown, 1000);
}

async function playMusic(force) {
  const audio = $("#bg-music");
  const btn = $("#music-toggle");
  if (!audio || !btn || !CONFIG.music) return;
  try {
    if (force === false || (force == null && musicOn)) {
      audio.pause();
      musicOn = false;
    } else {
      await audio.play();
      musicOn = !audio.paused;
    }
  } catch {
    musicOn = false;
  }
  btn.classList.toggle("is-on", musicOn);
  btn.setAttribute("aria-pressed", String(musicOn));
  btn.setAttribute("aria-label", musicOn ? "إيقاف الموسيقى" : "تشغيل الموسيقى");
}

function initMusic() {
  $("#music-toggle")?.addEventListener("click", (event) => {
    event.stopPropagation();
    playMusic(musicOn ? false : true);
  });
}

function setCount(n) {
  guestsCount = Math.max(1, Math.min(12, n));
  setText("rsvp-count", String(guestsCount));
  const minus = $("#count-minus");
  if (minus) minus.disabled = guestsCount <= 1;
}

function initForms() {
  const yes = $("#rsvp-yes");
  const no = $("#rsvp-no");
  const wrap = $("#rsvp-count-wrap");
  const pick = (come) => {
    attending = come;
    yes?.classList.toggle("is-pick", come);
    no?.classList.toggle("is-pick", !come);
    yes?.setAttribute("aria-pressed", String(come));
    no?.setAttribute("aria-pressed", String(!come));
    if (wrap) wrap.hidden = !come;
  };
  yes?.addEventListener("click", () => pick(true));
  no?.addEventListener("click", () => pick(false));
  $("#count-minus")?.addEventListener("click", () => setCount(guestsCount - 1));
  $("#count-plus")?.addEventListener("click", () => setCount(guestsCount + 1));
  setCount(1);

  $("#rsvp-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = sanitizeName($("#rsvp-name")?.value || "");
    if (!name) return;
    const payload = { name, attending, count: attending ? guestsCount : 0, at: Date.now() };
    localStorage.setItem(CONFIG.rsvpKey, JSON.stringify(payload));
    $("#rsvp-form").hidden = true;
    $("#rsvp-thanks").hidden = false;
  });

  $("#wish-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = sanitizeName($("#wish-name")?.value || "");
    const text = sanitizeText($("#wish-text")?.value || "", 180);
    if (!name || !text) return;
    let prev = [];
    try { prev = JSON.parse(localStorage.getItem(CONFIG.wishKey) || "[]"); }
    catch { prev = []; }
    prev.push({ name, text, at: Date.now() });
    localStorage.setItem(CONFIG.wishKey, JSON.stringify(prev.slice(-20)));
    $("#wish-form").hidden = true;
    $("#wish-thanks").hidden = false;
  });

  $("#iban-copy")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.iban);
      setText("iban-copy", "تم النسخ");
    } catch {
      setText("iban-copy", "انسخ الرقم يدويًا");
    }
  });

  try {
    const saved = JSON.parse(localStorage.getItem(CONFIG.rsvpKey) || "null");
    if (saved && saved.name) {
      $("#rsvp-form").hidden = true;
      $("#rsvp-thanks").hidden = false;
    }
  } catch { /* ignore broken storage */ }
}

function boot() {
  applyConfig();
  initMusic();
  initForms();
  $("#open-invite")?.addEventListener("click", openDoors);
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();

window.buildGuestLink = (name, id) => {
  const url = new URL(CONFIG.siteUrl || location.href);
  if (id) url.searchParams.set("id", id);
  else url.searchParams.set("to", name);
  return url.toString();
};
