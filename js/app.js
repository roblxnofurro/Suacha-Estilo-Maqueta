/* =====================================================
   Suacha Estilo · lógica de la página
   Depende de js/products.js (cargado antes en index.html).
   Estructura:
   1) Funciones puras (búsqueda, filtros, precios, WhatsApp)
   2) Funciones de interfaz (DOM)
   3) Arranque
   ===================================================== */

// En el navegador los datos son variables globales de products.js.
// En Node (pruebas) se importan con require.
const DATA = (typeof module !== "undefined" && module.exports)
  ? require("./products.js")
  : { WHATSAPP_NUMBER, STORE_ADDRESS, DEMO_MODE, CATEGORIES, PRODUCTS };

/* ---------- 1. FUNCIONES PURAS ---------- */

/** Minúsculas, sin tildes y con espacios sobrantes eliminados. */
function normalizeText(value) {
  return String(value == null ? "" : value)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Formato monetario colombiano: $ 65.000 */
function formatCOP(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(amount);
}

/** Convierte el id de categoría en su nombre visible. */
function getCategoryName(categories, categoryId) {
  const found = categories.find((c) => c.id === categoryId);
  return found ? found.name : categoryId;
}

/** Combina búsqueda + categoría. categoryId "todos" = sin filtro. */
function filterProducts(products, categories, categoryId, searchTerm) {
  const term = normalizeText(searchTerm);
  return products.filter((product) => {
    const matchesCategory = categoryId === "todos" || product.category === categoryId;
    if (!matchesCategory) return false;
    if (!term) return true;
    const haystack = normalizeText(
      [product.name, getCategoryName(categories, product.category), product.tag].join(" ")
    );
    return haystack.includes(term);
  });
}

/** Enlace wa.me con mensaje prellenado. El número va sin +, espacios ni guiones. */
function buildWhatsAppUrl(phone, message) {
  const cleanPhone = String(phone).replace(/\D/g, "");
  return "https://wa.me/" + cleanPhone + "?text=" + encodeURIComponent(message);
}

function buildProductMessage(product) {
  return (
    "Hola, vi esta prenda en el catálogo de Suacha Estilo: " + product.name +
    ". Quisiera consultar su disponibilidad, tallas y colores."
  );
}

function buildMapsUrl(address) {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address);
}

/* ---------- 2. INTERFAZ (solo navegador) ---------- */

const state = { category: "todos", term: "" };

/** Crea un elemento sin usar innerHTML (evita inyección de HTML). */
function createEl(tag, options, children) {
  const node = document.createElement(tag);
  const opts = options || {};
  if (opts.className) node.className = opts.className;
  if (opts.text != null) node.textContent = opts.text;
  if (opts.attrs) {
    Object.keys(opts.attrs).forEach((key) => node.setAttribute(key, opts.attrs[key]));
  }
  (children || []).forEach((child) => child && node.appendChild(child));
  return node;
}

/** Si una imagen falla, la reemplaza por un bloque con texto. */
function attachImageFallback(img, label) {
  function replace() {
    if (!img.parentNode) return;
    const fallback = createEl("div", {
      className: "img-fallback",
      text: label || "Imagen no disponible",
      attrs: { role: "img", "aria-label": img.alt || label || "Imagen no disponible" }
    });
    img.replaceWith(fallback);
  }
  img.addEventListener("error", replace, { once: true });
  // Por si el error ocurrió antes de registrar el listener.
  if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) replace();
}

function createImage(src, alt, label, lazy) {
  const img = createEl("img", {
    attrs: { src: src, alt: alt, width: "700", height: "875", decoding: "async" }
  });
  if (lazy) img.setAttribute("loading", "lazy");
  attachImageFallback(img, label);
  return img;
}

function renderCategoryCards() {
  const grid = document.getElementById("categoryGrid");
  grid.replaceChildren();
  DATA.CATEGORIES.forEach((category) => {
    const link = createEl("a", {
      className: "category",
      attrs: { href: "#catalogo", "data-category": category.id }
    }, [
      createImage(category.image, category.alt, category.name, true),
      createEl("span", { className: "category-name", text: category.name })
    ]);
    link.setAttribute("aria-label", "Ver " + category.name + " en el catálogo");
    grid.appendChild(link);
  });
}

function renderFilterButtons() {
  const container = document.getElementById("filters");
  container.replaceChildren();
  const items = [{ id: "todos", name: "Todo" }].concat(DATA.CATEGORIES);
  items.forEach((item) => {
    container.appendChild(createEl("button", {
      className: "filter",
      text: item.name,
      attrs: { type: "button", "data-filter": item.id, "aria-pressed": "false" }
    }));
  });
}

function syncFilterButtons() {
  document.querySelectorAll("#filters .filter").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === state.category));
  });
}

function createProductCard(product) {
  const categoryName = getCategoryName(DATA.CATEGORIES, product.category);

  const price = createEl("p", { className: "price", text: formatCOP(product.price) });
  if (DATA.DEMO_MODE) price.appendChild(createEl("small", { text: "Precio de ejemplo" }));

  const whatsapp = createEl("a", {
    className: "btn",
    text: "Consultar por WhatsApp",
    attrs: {
      href: buildWhatsAppUrl(DATA.WHATSAPP_NUMBER, buildProductMessage(product)),
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "Consultar por WhatsApp: " + product.name + " (se abre en una pestaña nueva)"
    }
  });

  return createEl("article", { className: "product" }, [
    createEl("div", { className: "product-media" }, [
      createImage(product.image, product.name + ", " + categoryName.toLowerCase() + " (imagen de ejemplo)", product.name, true)
    ]),
    createEl("div", { className: "product-body" }, [
      createEl("span", { className: "tag", text: product.tag || "" }),
      createEl("h3", { text: product.name }),
      createEl("p", { className: "product-category", text: categoryName }),
      price
    ]),
    whatsapp
  ]);
}

function resetFilters() {
  state.category = "todos";
  state.term = "";
  document.getElementById("searchInput").value = "";
  renderProducts();
}

function createEmptyState() {
  const resetButton = createEl("button", {
    className: "btn",
    text: "Mostrar todos los productos",
    attrs: { type: "button" }
  });
  resetButton.addEventListener("click", resetFilters);
  return createEl("div", { className: "empty" }, [
    createEl("p", { text: "No encontramos prendas con esa búsqueda. Prueba con otra palabra o cambia la categoría." }),
    resetButton
  ]);
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const counter = document.getElementById("resultsCount");
  const results = filterProducts(DATA.PRODUCTS, DATA.CATEGORIES, state.category, state.term);

  syncFilterButtons();
  grid.replaceChildren();

  if (results.length === 0) {
    grid.appendChild(createEmptyState());
    counter.textContent = "Sin resultados.";
    return;
  }
  results.forEach((product) => grid.appendChild(createProductCard(product)));
  counter.textContent = results.length === 1 ? "1 producto" : results.length + " productos";
}

function setupMenu() {
  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");

  function setOpen(open) {
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  links.addEventListener("click", (event) => { if (event.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });
}

function setupCatalogControls() {
  document.getElementById("filters").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    state.category = button.dataset.filter;
    renderProducts();
  });

  document.getElementById("searchInput").addEventListener("input", (event) => {
    state.term = event.target.value;
    renderProducts();
  });

  document.getElementById("categoryGrid").addEventListener("click", (event) => {
    const card = event.target.closest("a[data-category]");
    if (!card) return;
    state.category = card.dataset.category;
    renderProducts();
  });
}

function setupLinksAndStaticContent() {
  const generalMessage = "Hola, quisiera consultar el catálogo de Suacha Estilo.";
  const generalUrl = buildWhatsAppUrl(DATA.WHATSAPP_NUMBER, generalMessage);
  document.getElementById("floatingWhatsApp").href = generalUrl;
  document.getElementById("footerWhatsApp").href = generalUrl;
  document.getElementById("mapsLink").href = buildMapsUrl(DATA.STORE_ADDRESS);
  document.getElementById("year").textContent = String(new Date().getFullYear());
  document.body.classList.toggle("no-demo", !DATA.DEMO_MODE);
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    attachImageFallback(img, img.dataset.fallback);
  });
}

/* ---------- 3. ARRANQUE ---------- */

function init() {
  renderCategoryCards();
  renderFilterButtons();
  setupCatalogControls();
  setupMenu();
  setupLinksAndStaticContent();
  renderProducts();
}

if (typeof document !== "undefined") {
  init();
}

// Exporta las funciones puras para probarlas con Node.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    normalizeText, formatCOP, getCategoryName, filterProducts,
    buildWhatsAppUrl, buildProductMessage, buildMapsUrl
  };
}
