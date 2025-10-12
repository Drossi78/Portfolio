/* ========= Données de projets ========= */
const PROJECTS = [
  {
    id: "p1",
    title: "Sneak-Game",
    short: "Ein beliebtes Multiplayer-Spiel, bei dem Sie gegen andere Spieler antreten, um die größte Schlange zu werden.",
    description: "Dies ist ein einfaches Snake-Spiel, das mit JavaScript, HTML5 Canvas und modernen ES6+ Funktionen erstellt wurde. Der Spieler kann seinen Namen eingeben, die Farbe der Schlange wählen und versuchen, so viele Punkte wie möglich zu sammeln, indem er die Nahrung frisst, während er Kollisionen mit den Wänden oder sich selbst vermeidet.",
    tech: ["JavaScript","HTML5 Canvas","modernen ES6+"],
    image: "foto/neu/jeu.jpg",
    gallery: ["foto/neu/Accueil-game.jpg"],
    live: "https://exemple.com/budget",
    code: "https://github.com/Drossi78/snake.git",
    year: 2024,
    featured: true
  },
  {
    id: "p2",
    title: "Portfolio 3D",
    short: "Portfolio animé Three.js.",
    description: "Scènes 3D interactives, transitions fluides, GLTF optimisés. Accessibilité & performance.",
    tech: ["Three.js","Vite","GLTF"],
    image: "images/3d.jpg",
    gallery: ["images/3d.jpg"],
    live: "https://drossi78.github.io/Portfolio/",
    code: "https://github.com/tonuser/portfolio-3d",
    year: 2024
  },
  {
    id: "p3",
    title: "auth_system",
    short: "Benutzer-Authentifizierung mit Registrierung, Login, Logout, Rollen/ Rechten sowie Wiederherstellungs- und Sicherheitsfunktionen. ",
    description: "PHP, CSS, JavaScript",
    tech: ["PHP","CSS","Hack"],
    image: "foto/image.png",
    gallery: ["foto/image.png"],
    live: null,
    code: "https://github.com/Drossi78/auth_system.git",
    year: 2023
  },
  
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