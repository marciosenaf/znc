/* =========================================================
   CONFIGURAÇÃO — troque os "#" pelos seus links reais
   ========================================================= */
const CONFIG = {
  // Ícones das redes no topo (deixe "#" se ainda não tiver o link)
  social: [
    { name: "YouTube", icon: "fa-brands fa-youtube", href: "https://www.youtube.com/@znctec" },
    { name: "TikTok", icon: "fa-brands fa-tiktok", href: "https://www.tiktok.com/@zncmeme" },
    { name: "Instagram", icon: "fa-brands fa-instagram", href: "https://www.instagram.com/znctec/" },
    { name: "Facebook", icon: "fa-brands fa-facebook", href: "https://www.facebook.com/znctec" },
    { name: "Discord", icon: "fa-brands fa-discord", href: "https://discord.gg/7TCxx7jRBw" },
  ],
  sections: [
    {
      title: "Canais de Promoções",
      links: [
        { label: "Promoções Tech", icon: "fa-brands fa-whatsapp", href: "https://whatsapp.com/channel/0029VbDiYMu6WaKgf9chgE3T", handle: "WhatsApp" },
        { label: "Promoções Tech", icon: "fa-brands fa-telegram", href: "https://t.me/zncpromos", handle: "Telegram" }
      ]
    },
  /*   {
      title: "Sigam as Redes",
      links: [
   //     { label: "ZNC Tech", icon: "fa-brands fa-youtube", href: "", handle: "YouTube" },
 //       { label: "ZNC", icon: "fa-brands fa-discord", href: "#", handle: "Discord" }
      ]
    }  */
  ],
  /* accordion: {
    title: "Redes de Memes",
    emoji: "😂",
    links: [
      { label: "ZNC Meme", icon: "fa-brands fa-tiktok", href: "#", handle: "@zncmeme" },
      { label: "ZNC Meme", icon: "fa-brands fa-instagram", href: "#", handle: "@zncmeme" },
      { label: "ZNC Meme", icon: "fa-brands fa-facebook", href: "#", handle: "@zncmeme" },
      { label: "ZNC Meme", icon: "fa-brands fa-youtube", href: "#", handle: "@zncmeme" }
    ]
  } */
};

const SITE = { url: location.href, title: "Zona Não Controlada | ZNC" };

/* ========= ELEMENTOS ========= */
const app = document.getElementById("app");
const toast = document.getElementById("toast");
const logo = document.getElementById("logo");
const shareBtn = document.getElementById("shareBtn");
const yearEl = document.getElementById("year");

/* ========= HELPERS ========= */
let delay = 0;
const nextDelay = () => `${(delay += 0.06).toFixed(2)}s`;

function createLinkCard({ label, icon, href, handle }) {
  const a = document.createElement("a");
  a.className = "link-card";
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.style.setProperty("--delay", nextDelay());

  const iconWrap = document.createElement("span");
  iconWrap.className = "link-icon";
  const iconEl = document.createElement("i");
  iconEl.className = icon;
  iconWrap.appendChild(iconEl);

  const text = document.createElement("span");
  text.className = "link-text";
  const labelEl = document.createElement("span");
  labelEl.className = "link-label";
  labelEl.textContent = label;
  text.appendChild(labelEl);

  if (handle && handle.startsWith("@")) {
    const handleEl = document.createElement("span");
    handleEl.className = "link-handle";
    handleEl.textContent = handle;
    text.appendChild(handleEl);
  }

  const arrow = document.createElement("span");
  arrow.className = "link-arrow";
  arrow.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

  a.append(iconWrap, text, arrow);
  return a;
}

/* ========= RENDER ========= */
function renderSocial() {
  const nav = document.getElementById("social");
  if (!nav) return;

  CONFIG.social.forEach(({ name, icon, href }) => {
    const a = document.createElement("a");
    a.className = "social-link";
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", name);
    a.title = name;

    const i = document.createElement("i");
    i.className = icon;
    a.appendChild(i);

    nav.appendChild(a);
  });
}

function renderSections() {
  CONFIG.sections.forEach((sec) => {
    const section = document.createElement("section");
    section.className = "section";

    const title = document.createElement("h2");
    title.className = "section-title";
    title.textContent = sec.title;

    const list = document.createElement("div");
    list.className = "links";
    sec.links.forEach((l) => list.appendChild(createLinkCard(l)));

    section.append(title, list);
    app.appendChild(section);
  });
}

function renderAccordion() {
  const acc = CONFIG.accordion;

  const section = document.createElement("section");
  section.className = "section";

  const trigger = document.createElement("button");
  trigger.className = "accordion-trigger";
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", "memes-panel");
  trigger.style.setProperty("--delay", nextDelay());

  const emoji = document.createElement("span");
  emoji.className = "accordion-emoji";
  emoji.textContent = acc.emoji;

  const label = document.createElement("span");
  label.className = "accordion-label";
  label.textContent = acc.title;

  const chevron = document.createElement("span");
  chevron.className = "accordion-chevron";
  chevron.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';

  trigger.append(emoji, label, chevron);

  const panel = document.createElement("div");
  panel.className = "accordion-panel";
  panel.id = "memes-panel";

  const panelLinks = document.createElement("div");
  panelLinks.className = "links";
  acc.links.forEach((l) => panelLinks.appendChild(createLinkCard(l)));
  panel.appendChild(panelLinks);

  trigger.addEventListener("click", () => {
    const open = panel.classList.toggle("open");
    trigger.setAttribute("aria-expanded", String(open));
  });

  section.append(trigger, panel);
  app.appendChild(section);
}

/* ========= LOGO COM FALLBACK ========= */
function setupLogoFallback() {
  if (!logo) return;
  logo.addEventListener("error", () => {
    const fallback = document.createElement("span");
    fallback.className = "avatar-fallback";
    fallback.textContent = "ZNC";
    logo.replaceWith(fallback);
  });
}

/* ========= TOAST ========= */
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ========= COMPARTILHAR / COPIAR ========= */
function setupShare() {
  shareBtn.addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: SITE.title, url: SITE.url });
      } catch (_) {
        /* usuário cancelou */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(SITE.url);
      showToast("Link copiado!");
    } catch {
      showToast("Não foi possível copiar");
    }
  });
}

/* ========= INIT ========= */
function init() {
  renderSocial();
  renderSections();
  renderAccordion();
  setupLogoFallback();
  setupShare();
  yearEl.textContent = new Date().getFullYear();
}

init();