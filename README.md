# Suacha Estilo · Concepto de catálogo web

> **Concepto demostrativo NO oficial.** Esta página es una maqueta creada para presentar una posible web comercial. Los productos, precios, imágenes y textos de marca son de ejemplo hasta que el propietario los confirme.

Landing page de una sola página para una tienda de ropa urbana en Soacha, Cundinamarca. Catálogo con búsqueda y filtros, y consultas por WhatsApp. Sin pasarela de pagos ni compras en línea.

## Características

- Diseño mobile-first (desde 320 px) con identidad urbana: negro carbón + verde lima.
- Menú móvil funcional (se cierra con Escape y al elegir un enlace).
- Categorías y catálogo generados desde un archivo de datos.
- Búsqueda (ignora mayúsculas, tildes y espacios sobrantes) combinada con filtro por categoría.
- Mensaje amable cuando no hay resultados, con botón para mostrar todo.
- Botón de WhatsApp por producto con mensaje prellenado que incluye el nombre.
- Botón flotante de WhatsApp (solo ícono en móviles para no tapar contenido).
- Enlace a Google Maps generado desde la dirección (sin API ni claves).
- Imágenes con carga diferida y bloque alternativo si fallan.
- Accesibilidad: enlace "saltar al catálogo", foco visible, `aria-pressed` en filtros, `prefers-reduced-motion`.
- Sin dependencias: HTML, CSS y JavaScript nativos. El DOM se construye sin `innerHTML`.

## Estructura

```
suacha-estilo/
├── index.html
├── css/styles.css
├── js/
│   ├── products.js   ← datos: teléfono, dirección, categorías, productos
│   └── app.js        ← lógica: búsqueda, filtros, WhatsApp, menú
├── assets/
│   ├── images/       ← fotos propias/aprobadas
│   └── icons/
├── README.md
├── CREDITS.md        ← procedencia de imágenes
└── .gitignore
```

## Ejecutar en local

No necesita instalación. Opciones:

1. Abrir `index.html` con doble clic, o
2. Servir la carpeta: `python3 -m http.server 8000` y visitar `http://localhost:8000`.

Las imágenes de demostración se cargan desde internet (Unsplash), así que necesitas conexión.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `suacha-estilo`).
2. Desde la carpeta del proyecto:
   ```
   git init
   git add .
   git commit -m "Primera versión del concepto Suacha Estilo"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/suacha-estilo.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. Tras un par de minutos la página queda en `https://TU_USUARIO.github.io/suacha-estilo/`.
5. Cuando exista la URL definitiva, añade `<link rel="canonical">` y `og:image` en `index.html`.

## Cómo editar

**Productos y categorías:** edita `js/products.js`. Cada producto tiene `id`, `name`, `category` (el `id` de una categoría), `price` (número en COP, sin puntos), `image`, `description` y `tag` (opcional, puede ir `""`). Para una categoría nueva, añádela a `CATEGORIES`: la tarjeta y el filtro aparecen solos.

**Teléfono de WhatsApp:** cambia `WHATSAPP_NUMBER` en `js/products.js`. Formato internacional sin `+`, espacios ni guiones (ejemplo: `573112112023`). Es la única constante que se usa en toda la página.

**Dirección:** cambia `STORE_ADDRESS` en `js/products.js` (el enlace de Maps se regenera). También actualiza el texto visible en `index.html` (secciones Ubicación y pie).

**Quitar avisos de demostración:** pon `DEMO_MODE = false` en `js/products.js` (oculta el banner, la advertencia del catálogo y las etiquetas "Precio de ejemplo"). Revisa además el texto del pie en `index.html`.

**Reemplazar imágenes:** guarda las fotos aprobadas en `assets/images/` (ideal: JPG/WebP comprimido, ~700×875 px para productos) y apunta `image` a la ruta, por ejemplo `assets/images/gorra-01.jpg`. Las imágenes del hero y de la sección Nosotros están directamente en `index.html`.

## Pendiente de confirmar con el propietario antes de publicar

- Autorización para usar el nombre y publicar la web.
- Número oficial de WhatsApp (`573112112023` es solo referencia).
- Dirección exacta y horarios (no se publican horarios).
- Logotipo, fotografías reales de productos y categorías reales.
- Precios, tallas, colores y existencias reales.
- Si ofrece domicilios o envíos y cómo (la página no afirma nada al respecto).
- Textos de la sección "Nosotros" (hoy es un borrador, no historia oficial).
- Redes sociales oficiales (no se incluyó ninguna).
- Dominio deseado y persona responsable de actualizar el catálogo.
- Retirar el aviso de concepto no oficial solo tras la autorización.

## Pruebas de la lógica

Las funciones puras se pueden probar con Node (`node tests/logic.test.js`).

## Licencias de imágenes

Ver `CREDITS.md`.
