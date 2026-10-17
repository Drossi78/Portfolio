// i18n.js
const DICTS = {
  de: {
    "nav.home": "Start",
    "nav.skills": "Fähigkeiten",
    "nav.certs": "Zertifizierung",
    "nav.projects": "Projekte",
    "nav.contact": "Kontakt",

    "hero.subtitle": "Auf dem Weg zum Software Developer & Security Engineer | OT- und Embedded-Security",
    "hero.paragraph":
      "Ich bin Software Developer mit einer starken Leidenschaft für Cybersicherheit und studiere Ingenieur-Informatik an der THM. Mein Ziel ist es, moderne, zuverlässige und sichere Systeme zu entwickeln – von Webanwendungen bis zu eingebetteten Systemen und industriellen Steuerungen. Mit analytischem Denken, technischer Neugier und einem ausgeprägten Verantwortungsbewusstsein arbeite ich daran, digitale Lösungen zu schaffen, die funktional und sicher zugleich sind.",
    "hero.specializing": "Spezialisiert auf Webentwicklung, Embedded-Systeme und industrielle Cybersicherheit",

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

    "hero.subtitle": "On the path to Software Developer & Security Engineer | OT and Embedded Security",
    "hero.paragraph":
      "I am a software developer with a strong passion for cybersecurity, currently studying Engineering Informatics at THM. My goal is to build modern, reliable, and secure systems, from web applications to embedded systems and industrial control systems. With analytical thinking, technical curiosity, and a strong sense of responsibility, I work to create digital solutions that are both functional and secure.",
    "hero.specializing": "Specializing in web development, embedded systems, and industrial cybersecurity",

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
