/* =====================================================
   DATOS DEL CATÁLOGO · Suacha Estilo (DEMOSTRATIVO)
   -----------------------------------------------------
   Todo lo que está aquí es de EJEMPLO hasta que el
   propietario confirme nombres, precios e imágenes.
   Para editar el catálogo basta con modificar este archivo.
   ===================================================== */

// Número en formato internacional, sin "+", espacios ni guiones.
// ⚠ Confirmar con el propietario antes de publicar.
const WHATSAPP_NUMBER = "573112112023";

// Dirección de referencia (confirmar con el propietario).
const STORE_ADDRESS = "Cra. 7 #17-26, Soacha, Cundinamarca, Colombia";

// Mientras sea true se muestran los avisos de contenido demostrativo.
const DEMO_MODE = true;

// Categorías. Para agregar una nueva: añade un objeto aquí y
// productos con ese mismo "id" de categoría. La interfaz se genera sola.
const CATEGORIES = [
  {
    id: "gorras",
    name: "Gorras",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=75",
    alt: "Gorra urbana sobre fondo claro"
  },
  {
    id: "camisetas",
    name: "Camisetas",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=75",
    alt: "Camiseta básica doblada"
  },
  {
    id: "buzos",
    name: "Buzos y sudaderas",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=75",
    alt: "Persona con buzo con capucha"
  },
  {
    id: "accesorios",
    name: "Accesorios",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=75",
    alt: "Accesorios de moda urbana"
  }
];

// Productos de EJEMPLO. Precios en pesos colombianos (COP), sin puntos.
const PRODUCTS = [
  {
    id: "p01",
    name: "Gorra clásica",
    category: "gorras",
    price: 65000,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=75",
    description: "Ejemplo de gorra de uso diario.",
    tag: "Básico urbano"
  },
  {
    id: "p02",
    name: "Gorra street",
    category: "gorras",
    price: 59000,
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=700&q=75",
    description: "Ejemplo de gorra de estilo callejero.",
    tag: ""
  },
  {
    id: "p03",
    name: "Camiseta oversize",
    category: "camisetas",
    price: 75000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=75",
    description: "Ejemplo de camiseta de corte holgado.",
    tag: "Favorito"
  },
  {
    id: "p04",
    name: "Camiseta esencial",
    category: "camisetas",
    price: 68000,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=75",
    description: "Ejemplo de camiseta fácil de combinar.",
    tag: ""
  },
  {
    id: "p05",
    name: "Buzo urbano",
    category: "buzos",
    price: 120000,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=75",
    description: "Ejemplo de buzo con capucha.",
    tag: "Streetwear"
  },
  {
    id: "p06",
    name: "Hoodie relajado",
    category: "buzos",
    price: 135000,
    image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=700&q=75",
    description: "Ejemplo de sudadera de ajuste cómodo.",
    tag: ""
  },
  {
    id: "p07",
    name: "Accesorio diario",
    category: "accesorios",
    price: 35000,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=75",
    description: "Ejemplo de accesorio para completar el look.",
    tag: "Completa el look"
  },
  {
    id: "p08",
    name: "Accesorio urbano",
    category: "accesorios",
    price: 28000,
    image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=700&q=75",
    description: "Ejemplo de detalle de estilo urbano.",
    tag: ""
  }
];

// Permite probar la lógica con Node sin afectar al navegador.
if (typeof module !== "undefined") {
  module.exports = { WHATSAPP_NUMBER, STORE_ADDRESS, DEMO_MODE, CATEGORIES, PRODUCTS };
}
