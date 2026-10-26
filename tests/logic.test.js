// Pruebas de la lógica pura. Ejecutar: node tests/logic.test.js
const assert = require("assert");
const data = require("../js/products.js");
const app = require("../js/app.js");

let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log("OK  " + name);
}

const { CATEGORIES, PRODUCTS, WHATSAPP_NUMBER } = data;
const filter = (cat, term) => app.filterProducts(PRODUCTS, CATEGORIES, cat, term);

test("hay 8 productos y 4 categorías", () => {
  assert.strictEqual(PRODUCTS.length, 8);
  assert.strictEqual(CATEGORIES.length, 4);
});

test("todo producto apunta a una categoría existente y ids son únicos", () => {
  const ids = new Set(CATEGORIES.map((c) => c.id));
  PRODUCTS.forEach((p) => assert.ok(ids.has(p.category), p.name));
  assert.strictEqual(new Set(PRODUCTS.map((p) => p.id)).size, PRODUCTS.length);
});

test("sin filtros devuelve todos", () => assert.strictEqual(filter("todos", "").length, 8));
test("búsqueda ignora mayúsculas y espacios sobrantes", () => {
  assert.strictEqual(filter("todos", "  GORRA  ").length, 2);
});
test("búsqueda ignora tildes", () => assert.strictEqual(filter("todos", "CAMISETÁ").length, 2));
test("filtro por categoría", () => assert.strictEqual(filter("buzos", "").length, 2));
test("filtro y búsqueda combinados", () => {
  assert.strictEqual(filter("camisetas", "oversize").length, 1);
  assert.strictEqual(filter("gorras", "oversize").length, 0);
});
test("sin resultados devuelve lista vacía", () => assert.strictEqual(filter("todos", "zzzz").length, 0));

test("formato COP", () => {
  const out = app.formatCOP(65000).replace(/\s| /g, "");
  assert.strictEqual(out, "$65.000");
});

test("WhatsApp: número limpio y mensaje con nombre del producto", () => {
  const url = app.buildWhatsAppUrl("+57 311-211 2023", app.buildProductMessage(PRODUCTS[0]));
  assert.ok(url.startsWith("https://wa.me/573112112023?text="));
  const msg = decodeURIComponent(url.split("?text=")[1]);
  assert.ok(msg.includes(PRODUCTS[0].name));
  assert.ok(msg.includes("Suacha Estilo"));
});

test("el número configurado no tiene +, espacios ni guiones", () => {
  assert.ok(/^\d+$/.test(WHATSAPP_NUMBER));
});

test("enlace de Maps codifica la dirección", () => {
  const url = app.buildMapsUrl("Cra. 7 #17-26, Soacha");
  assert.ok(url.includes("query=Cra.%207%20%2317-26%2C%20Soacha"));
});

console.log("\n" + passed + " pruebas pasaron.");
