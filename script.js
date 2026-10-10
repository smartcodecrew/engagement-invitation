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

  /* بدون وقت محدد في نص الدعوة — العدّاد حتى بداية يوم الزفاف */
  eventDateTime: "2026-11-09T00:00:00+03:00",

  venue: "قاعة شغف",
  venueArea: "الإسكان الجنوبي",
  googleMaps: "https://maps.app.goo.gl/aAZLaeySVqAbGbz67",

  music: "",

  blessing: "بارك الله لهما وبارك عليهما وجمع بينهما في خير.",
  night: "في ليلة زاهية يضوي الفرح عالي سماها وبقلوب يملؤها الفرح وتغمرها السعادة",
  inviteLead: "بصادق الود والمحبة أتشرف بدعوتكم لحضور حفل زفاف ابني ..",

  rules: [
    "الدعوة شخصية",
    "جنة الأطفال منازلهم",
    "يمنع جوالات الكاميرا",
  ],

  closing: "وبحضوركم يتم الفرح والسرور",
  countdownLabel: "يبدأ الحفل بعد",

  guestGreeting: "دعوة خاصة إلى {name}",
  guests: {},

  rsvpKey: "omar_shaima_opened",
};

const $ = (s, c = document) => c.querySelector(s);
const pad = (n) => String(n).padStart(2, "0");
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

const GUEST = { name: "" };

function sanitizeName(raw) {
  if (!raw) return "";
  try { raw = decodeURIComponent(String(raw).replace(/\+/g, " ")); }
  catch { raw = String(raw); }
  return raw.replace(/[<>"'`\\]/g, "").replace(/\s+/g, " ").trim().slice(0, 40);
}

function resolveGuest() {
  const p = new URLSearchParams(location.search);
  const id = sanitizeName(p.get("id") || "").toLowerCase();
  GUEST.name = id && CONFIG.guests[id]
    ? sanitizeName(CONFIG.guests[id])
    : sanitizeName(p.get("to") || p.get("name") || "");
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value != null) el.textContent = value;
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
  setText("loc-names", `${CONFIG.groomShort} و ${CONFIG.brideShort}`);
  setText("date-hijri", CONFIG.hijri.replace(" هـ", ""));
  setText("date-weekday", CONFIG.weekday);
  setText("date-greg", CONFIG.gregorian.replace(" م", ""));
  setText("venue-name", CONFIG.venue);
  setText("venue-address", CONFIG.venueArea);
  setText("cd-title", CONFIG.countdownLabel);
  setText("closing-text", CONFIG.closing);
  setText("closing-date", CONFIG.gregorianPretty);

  const maps = $("#maps-link");
  if (maps) maps.href = CONFIG.googleMaps;

  const guest = $("#cover-guest");
  if (guest && GUEST.name) {
    guest.hidden = false;
    guest.textContent = CONFIG.guestGreeting.replace("{name}", GUEST.name);
  }

  const letter = $("#letter-body");
  if (letter) {
    letter.replaceChildren();
    const blocks = [
      CONFIG.blessing,
      CONFIG.night,
      CONFIG.inviteLead,
    ];
    blocks.forEach((text) => {
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

  const rules = $("#rules");
  if (rules) {
    rules.replaceChildren();
    CONFIG.rules.forEach((rule) => {
      const li = document.createElement("li");
      li.textContent = rule;
      rules.appendChild(li);
    });
  }

  if (CONFIG.music) {
    const audio = $("#bg-music");
    const btn = $("#music-toggle");
    if (audio && btn) {
      audio.src = CONFIG.music;
      btn.hidden = false;
    }
  }

  document.title = `دعوة زفاف | ${CONFIG.groomShort} & ${CONFIG.brideShort}`;
  setupCalendar();
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
    `DTEND;VALUE=DATE:20261110`,
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

  const finish = () => {
    doors.hidden = true;
    if (stage) stage.hidden = false;
    initCountdown();
    initScroll();
    initMusic();
  };

  const left = $(".door--left");
  const right = $(".door--right");
  const seal = $(".seal");
  const label = $("#open-invite-label");

  if (typeof gsap === "undefined" || reduced()) {
    finish();
    return;
  }

  const tl = gsap.timeline({ onComplete: finish });
  tl.to(seal, { scale: 1.08, duration: 0.18 })
    .to(seal, { scale: 0, opacity: 0, duration: 0.35, ease: "power2.in" })
    .to(label, { opacity: 0, y: 12, duration: 0.3 }, "<")
    .to(right, { xPercent: 105, duration: 1.15, ease: "power3.inOut" }, "-=0.05")
    .to(left, { xPercent: -105, duration: 1.15, ease: "power3.inOut" }, "<")
    .to(doors, { opacity: 0, duration: 0.35 });
}

function initScroll() {
  const scroller = $("#scroller");
  const btn = $("#scroll-next");
  if (!scroller || !btn) return;

  const next = () => {
    const panels = [...scroller.querySelectorAll(".panel")];
    const current = panels.findIndex((panel) => panel.getBoundingClientRect().top >= -20);
    const target = panels[Math.min(current + 1, panels.length - 1)] || panels[panels.length - 1];
    const atEnd = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 8;
    if (atEnd) {
      panels[0].scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
      return;
    }
    target.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
  };

  btn.addEventListener("click", next);
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

function initMusic() {
  const audio = $("#bg-music");
  const btn = $("#music-toggle");
  if (!audio || !btn || !CONFIG.music) return;
  let on = false;
  btn.addEventListener("click", async () => {
    try {
      if (on) audio.pause();
      else await audio.play();
      on = !audio.paused;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute("aria-label", on ? "إيقاف الموسيقى" : "تشغيل الموسيقى");
    } catch {
      btn.setAttribute("aria-label", "تعذر تشغيل الموسيقى");
    }
  });
}

function boot() {
  applyConfig();
  $("#open-invite")?.addEventListener("click", openDoors);
  $("#open-invite-label")?.addEventListener("click", openDoors);
  $("#open-invite")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openDoors();
    }
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
