/* =========================
   i18n + Theme + UI helpers
   ========================= */
 /* ========= Données de projets ========= */
const PROJECTS = [
  {
    id: "p1",
    title: "Sneak-Game",
    short: "Ein beliebtes Multiplayer-Spiel, bei dem Sie gegen andere Spieler antreten, um die größte Schlange zu werden.",
    description: "Dies ist ein einfaches Snake-Spiel, das mit JavaScript, HTML5 Canvas und modernen ES6+ Funktionen erstellt wurde. Der Spieler kann seinen Namen eingeben, die Farbe der Schlange wählen und versuchen, so viele Punkte wie möglich zu sammeln, indem er die Nahrung frisst, während er Kollisionen mit den Wänden oder sich selbst vermeidet.",
    tech: ["JavaScript","HTML5 Canvas","modernen ES6+"],
    image: "foto/jeux.png",
    gallery: ["foto/Accueil-game.png"],
    live: "",
    code: "https://github.com/Drossi78/snake.git",
    year: 2024,
    featured: true
  },
  {
    id: "p2",
    title: "Portfolio 3D",
    short: "Portfolio ",
    description: "Portfolio-Projekt ist eine interaktive Webanwendung, die moderne 3D-Technologien nutzt, um Projekte, Fähigkeiten und kreative Arbeiten visuell beeindruckend zu präsentieren.Statt klassischer flacher Webseiten bewegt sich der Nutzer in einer dreidimensionalen Umgebung, in der Inhalte, Projekte und Animationen lebendig dargestellt werden",
    tech: ["JavaScript","HTML5","CSS"],
    image: "foto/portfolio.png",
    gallery: ["foto/portfolio.png"],
    live: "https://drossi78.github.io/Portfolio/",
    code: "https://github.com/Drossi78/Portfolio.git",
    year: 2025
  },
  {
    id: "p3",
    title: "Kno-Buchung",
    short: "Ticket buchen ,Login,Reservierung",
    description: " Kino Ticketbuchung“ ist eine vollständige Webanwendung zur Online-Reservierung von Kinotickets, entwickelt mit modernen Webtechnologien wie HTML, CSS, JavaScript und Node.js.Ziel ist es, ein einfaches, ansprechendes und funktionsfähiges System zur Film- und Sitzplatzreservierung zu simulieren",
    tech: ["JavaScript","CSS","HTML5","Node/Express","jQuery"],
    image: "foto/kino.png",
    gallery: ["foto/login.png","foto/Register.png"],
    live: null,
    code: "https://github.com/Drossi78/kino_buchung-master",
    year: 2023
  },
  {
    id: "p4",
    title: "auth_system",
    short: "Benutzer-Authentifizierung mit Registrierung, Login, Logout, Rollen/ Rechten sowie Wiederherstellungs- und Sicherheitsfunktionen. ",
    description: "Benutzer-Authentifizierung mit Registrierung, Login, Logout, Rollen/ Rechten sowie Wiederherstellungs- und Sicherheitsfunktionen.",
    tech: ["PHP","CSS","Hack"],
    image: "foto/image.png",
    gallery: ["foto/image.png"],
    live: null,
    code: "https://github.com/Drossi78/auth_system.git",
    year: 2023
     
  }
];

/* ========= Rendu / Interactions ========= */
document.addEventListener("DOMContentLoaded", () => {
  const $grid = document.getElementById("proj-grid");
  const $filters = document.getElementById("proj-filters");
  const $modal = document.getElementById("proj-modal");
  const $close = document.getElementById("proj-close");

  const $title = document.getElementById("proj-title");
  const $meta  = document.getElementById("proj-meta");
  const $desc  = document.getElementById("proj-desc");
  const $tech  = document.getElementById("proj-tech");
  const $hero  = document.getElementById("proj-hero");
  const $live  = document.getElementById("proj-live");
  const $code  = document.getElementById("proj-code");
  const $gal   = document.getElementById("proj-gallery");

  /* -- Filtres (par techno) -- */
  const allTags = Array.from(new Set(PROJECTS.flatMap(p => p.tech))).sort();
  let active = "Tous";

  function renderFilters() {
    if (!$filters) return;
    const tags = ["Tous", ...allTags];
    $filters.innerHTML = tags.map(t => `
      <button class="${t===active?'active':''}" data-tag="${t}">${t}</button>
    `).join("");
    $filters.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        active = btn.dataset.tag;
        renderGrid();
        renderFilters();
      });
    });
  }

  /* -- Grille -- */
  function card(p){
    return `
      <article class="proj-card" data-id="${p.id}">
        <img class="proj-thumb" src="${p.image}" alt="Aperçu : ${p.title}" loading="lazy">
        <div class="proj-content">
          <div class="proj-title">${p.title}</div>
          <p class="proj-desc">${p.short ?? ""}</p>
          <div class="proj-chips">${p.tech.map(t=>`<span class="proj-chip">${t}</span>`).join("")}</div>
          <div class="proj-links">
            ${p.live?`<a class="proj-link primary" href="${p.live}" target="_blank" rel="noopener">Live</a>`:""}
            ${p.code?`<a class="proj-link" href="${p.code}" target="_blank" rel="noopener">Code</a>`:""}
            <button class="proj-link" data-open="${p.id}">Details</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderGrid(){
    let list = [...PROJECTS].sort((a,b)=>(b.featured?1:0)-(a.featured?1:0)||b.year-a.year);
    if (active !== "Tous") list = list.filter(p=>p.tech.includes(active));
    $grid.innerHTML = list.map(card).join("");
    // Ouvre modale
    $grid.querySelectorAll("[data-open]").forEach(btn=>{
      btn.addEventListener("click", ()=> openModal(btn.dataset.open, /*pushHash*/true));
    });
    // Cliquer sur la carte entière = détails
    $grid.querySelectorAll(".proj-card").forEach(cardEl=>{
      cardEl.addEventListener("click", (e)=>{
        if (e.target.closest("a")) return; // ne pas doublonner si lien Live/Code
        openModal(cardEl.dataset.id, /*pushHash*/true);
      });
    });
  }

  /* -- Modale & deep-link (#project:id) -- */
  function openModal(id, pushHash=false){
    const p = PROJECTS.find(x=>x.id===id);
    if (!p) return;

    $title.textContent = p.title;
    $meta.textContent  = (p.year?`Jahr: ${p.year} · `:"") + (p.tech?.join(" · ")||"");
    $desc.textContent  = p.description || p.short || "";
    $tech.innerHTML    = (p.tech||[]).map(t=>`<span class="proj-chip">${t}</span>`).join("");
    $hero.src = p.image; $hero.alt = "Hero: "+p.title;

    if (p.live){ $live.style.display=""; $live.href=p.live; } else { $live.style.display="none"; }
    if (p.code){ $code.style.display=""; $code.href=p.code; } else { $code.style.display="none"; }

    const pics = (p.gallery && p.gallery.length ? p.gallery : [p.image]);
    $gal.innerHTML = pics.map(src=>`<img src="${src}" alt="Capture ${p.title}" loading="lazy">`).join("");

    if (typeof $modal.showModal === "function") $modal.showModal();
    else $modal.setAttribute("open",""); // fallback vieux navigateurs

    if (pushHash) location.hash = "project:"+encodeURIComponent(p.id);
  }

  function closeModal(){
    if ($modal.hasAttribute("open")) $modal.close?.();
    $modal.removeAttribute("open");
    // si l'URL a #project:..., on le retire
    if (location.hash.startsWith("#project:")) history.replaceState(null,"",location.pathname + location.search);
  }

  $close?.addEventListener("click", closeModal);
  $modal?.addEventListener("click",(e)=>{ if(e.target===$modal) closeModal(); });
  document.addEventListener("keydown",(e)=>{ if(e.key==="Escape") closeModal(); });

  function tryOpenFromHash(){
    if (location.hash.startsWith("#project:")){
      const id = decodeURIComponent(location.hash.split(":")[1]||"");
      if (id) openModal(id, /*pushHash*/false);
    }
  }

  renderFilters();
  renderGrid();
  tryOpenFromHash();
  window.addEventListener("hashchange", tryOpenFromHash);
});
const DICTS = {
    de: {
        "nav.home": "Start", "nav.skills": "Fähigkeiten", "nav.certs": "Zertifizierung", "nav.projects": "Projekt","nav.Berufserfahrung":"Berufserfahrung", "nav.ausbildung":"Ausbildung", "nav.contact": "Kontakt",
        "hero.subtitle": "Auf dem Weg zum Software Developer & Security Engineer | OT- und Embedded-Security",
        "hero.paragraph": "Ich bin Software Developer mit einer starken Leidenschaft für Cybersicherheit und studiere Ingenieur-Informatik an der THM. Mein Ziel ist es, moderne, zuverlässige und sichere Systeme zu entwickeln – von Webanwendungen bis zu eingebetteten Systemen und industriellen Steuerungen. Mit analytischem Denken, technischer Neugier und einem ausgeprägten Verantwortungsbewusstsein arbeite ich daran, digitale Lösungen zu schaffen, die funktional und sicher zugleich sind.",
        "hero.specializing": "Spezialisiert auf Webentwicklung, Embedded-Systeme und industrielle Cybersicherheit",
        "skills.title": "Technische Expertise",
        "certs.title": "Zertifizierung", "certs.subtitle": "Eine Auswahl meiner Zertifikate & Auszeichnungen",
        "certs.filter.all": "Alle", "certs.filter.web": "Web", "certs.filter.prog": "Programmierung", "certs.filter.linux": "Linux & Netzwerk", "certs.filter.office": "Office",
        "footer.rights": "Alle Rechte vorbehalten.", "nav.contact":"Kontakt"
    },
    en: {
        "nav.home": "Home", "nav.skills": "Skills", "nav.certs": "Certifications", "nav.projects": "Projects","nav.Berufserfahrung":"Work-Experience", "nav.ausbildung":"Qualifikation", "nav.contact": "Contact",
        "hero.subtitle": "On the path to Software Developer & Security Engineer | OT and Embedded Security",
        "hero.paragraph": "I am a software developer with a strong passion for cybersecurity, currently studying Engineering Informatics at THM. My goal is to build modern, reliable, and secure systems, from web applications to embedded systems and industrial control systems. With analytical thinking, technical curiosity, and a strong sense of responsibility, I work to create digital solutions that are both functional and secure.",
        "hero.specializing": "Specializing in web development, embedded systems, and industrial cybersecurity",
        "skills.title": "Technical Expertise", "nav.ausbildung":"Ausbildung",
        "certs.title": "Certifications", "certs.subtitle": "A selection of my certificates & awards",
        "certs.filter.all": "All", "certs.filter.web": "Web", "certs.filter.prog": "Programming", "certs.filter.linux": "Linux & Networking", "certs.filter.office": "Office",
        "footer.rights": "All rights reserved.",
    }
};
const LANG_KEY = "prefLang";

function applyLang(lang) {
    const dict = DICTS[lang] || DICTS.de;
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) el.textContent = dict[key];
    });
    document.documentElement.setAttribute("lang", lang);
    const current = document.getElementById("langCurrent");
    if (current) current.textContent = lang.toUpperCase();
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
    document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
            menu.classList.remove("show");
            btn.setAttribute("aria-expanded", "false");
        }
    });
}

/* Theme toggle */
(function () {
    const root = document.documentElement;
    const btn = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme');
    if (saved) root.setAttribute('data-theme', saved);
    const icons = { light: '<i class="fa-solid fa-moon"></i>', dark: '<i class="fa-solid fa-sun"></i>' };
    const setIcon = () => {
        const cur = root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        if (btn) btn.innerHTML = (cur === 'light') ? icons.light : icons.dark;
    };
    setIcon();
    btn?.addEventListener('click', () => {
        const cur = root.getAttribute('data-theme') || 'light';
        const next = (cur === 'dark') ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        setIcon();
    });
})();

/* ============ Init on load ============ */
document.addEventListener("DOMContentLoaded", () => {
    // i18n
    const saved = localStorage.getItem(LANG_KEY);
    const browser = (navigator.language || "de").slice(0, 2);
    const initial = (saved || (["de", "en"].includes(browser) ? browser : "de"));
    applyLang(initial);
    initLangSwitcher();

    // Mobile menu
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
        navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
    }

    // Shadow on scroll
    const nav = document.querySelector('.navbar');
    const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 10);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

    // Active link on scroll (IntersectionObserver)
    const anchors = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = [...anchors].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            const id = '#' + e.target.id;
            if (e.isIntersecting) {
                anchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(s => io.observe(s));

    // Lightbox (certs)
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    const lbCap = document.getElementById('lightboxCaption');
    const btnClose = lb?.querySelector('.lightbox-close');

    const open = (src, caption) => {
        if (!lb) return;
        lbImg.src = src; lbImg.alt = caption || '';
        lbCap.textContent = caption || '';
        lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };
    const close = () => {
        if (!lb) return;
        lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; lbImg.src = '';
    };

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.cert-zoom');
        if (btn) {
            const full = btn.getAttribute('data-full');
            const figure = btn.closest('figure');
            const caption = figure?.querySelector('figcaption strong')?.textContent || '';
            open(full, caption);
        }
    });
    lb?.addEventListener('click', (e) => { if (e.target === lb) close(); });
    btnClose?.addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

    // Cert filters
    const buttons = Array.from(document.querySelectorAll('.cert-filter'));
    const groups = Array.from(document.querySelectorAll('.cert-group'));
    const apply = (key) => groups.forEach(g => g.style.display = (key === 'all' || g.dataset.group === key) ? '' : 'none');
    buttons.forEach(b => {
        b.addEventListener('click', () => {
            buttons.forEach(x => x.classList.remove('is-active')); b.classList.add('is-active');
            apply(b.dataset.group);
        });
    });
    apply('all');
});
