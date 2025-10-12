// i18n.js
const DICTS = {
  de: {
    "nav.home": "Start",
    "nav.skills": "Fähigkeiten",
    "nav.certs": "Zertifizierung",
    "nav.projects": "Projekte",
    "nav.contact": "Kontakt",

    "hero.subtitle": "Auf dem Weg zum Full-Stack Developer & Cybersecurity-Engineer",
    "hero.paragraph":
      "Ich bin ein engagierter Full-Stack-Entwickler mit einer starken Leidenschaft für Cybersicherheit. Mein Ziel ist es, moderne, performante und sichere Webanwendungen zu entwickeln, die höchste Qualitätsstandards erfüllen. Mit analytischem Denken, technischer Neugier und einem ausgeprägten Verantwortungsbewusstsein arbeite ich daran, innovative digitale Lösungen zu schaffen, die sowohl funktional als auch sicher sind.",
    "hero.specializing": "Spezialisiert auf moderne Webentwicklung und Cybersysteme",

    "skills.title": "Technische Expertise",

    "certs.title": "Zertifizierung",
    "certs.subtitle": "Eine Auswahl meiner Zertifikate & Auszeichnungen",
    "certs.filter.all": "Alle",
    "certs.filter.web": "Web",
    "certs.filter.prog": "Programmierung",
    "certs.filter.linux": "Linux & Netzwerk",
    "certs.filter.office": "Office",

    "footer.rights": "Alle Rechte vorbehalten."
  },

  en: {
    "nav.home": "Home",
    "nav.skills": "Skills",
    "nav.certs": "Certifications",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    "hero.subtitle": "On the path to Full-Stack Developer & Cybersecurity Engineer",
    "hero.paragraph":
      "I am a dedicated full-stack developer with a strong passion for cybersecurity. My goal is to build modern, high-performance, and secure web applications that meet the highest quality standards. With analytical thinking, technical curiosity, and a strong sense of responsibility, I work to create innovative digital solutions that are both functional and secure.",
    "hero.specializing": "Specializing in modern web development and cyber systems",

    "skills.title": "Technical Expertise",

    "certs.title": "Certifications",
    "certs.subtitle": "A selection of my certificates & awards",
    "certs.filter.all": "All",
    "certs.filter.web": "Web",
    "certs.filter.prog": "Programming",
    "certs.filter.linux": "Linux & Networking",
    "certs.filter.office": "Office",

    "footer.rights": "All rights reserved."
  }
};

const LANG_KEY = "prefLang";

function applyLang(lang) {
  const dict = DICTS[lang] || DICTS.de;
  // MàJ tous les éléments avec data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  // MàJ attribut lang
  document.documentElement.setAttribute("lang", lang);
  // MàJ bouton
  const current = document.getElementById("langCurrent");
  if (current) current.textContent = lang.toUpperCase();
  // Sauvegarde
  localStorage.setItem(LANG_KEY, lang);
}

function initLangSwitcher() {
  const btn = document.getElementById("langBtn");
  const menu = document.getElementById("langMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const shown = menu.classList.toggle("show");
    btn.setAttribute("aria-expanded", shown ? "true" : "false");
  });

  menu.querySelectorAll("[data-lang]").forEach(item => {
    item.addEventListener("click", () => {
      const lang = item.getAttribute("data-lang");
      applyLang(lang);
      menu.classList.remove("show");
      btn.setAttribute("aria-expanded", "false");
    });
  });

  // Fermer quand on clique ailleurs
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove("show");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

// Init au chargement
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem(LANG_KEY);
  // Détection navigateur si pas de préférence
  const browser = (navigator.language || "de").slice(0,2);
  const initial = (saved || (["de","en"].includes(browser) ? browser : "de"));
  applyLang(initial);
  initLangSwitcher();
  document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem(LANG_KEY);
  const browser = (navigator.language || "de").slice(0,2);
  const initial = (saved || (["de","en"].includes(browser) ? browser : "de"));
  applyLang(initial);
  initLangSwitcher?.(); // ok si tu gardes l’autre menu

  // <select> support
  const sel = document.getElementById("langSelect");
  if (sel) {
    sel.value = initial;
    sel.addEventListener("change", e => applyLang(e.target.value));
  }
});
});
