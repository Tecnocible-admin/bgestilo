# BG Boutique

Sitio web estático tradicional en español. No utiliza Vite, React, Node.js, npm, compilaciones ni un servidor especial.

## Abrir el proyecto

Visual Studio Code debe abrir exactamente esta carpeta:

```text
C:\Users\SoporTec-TECNOCIBLE\Documents\bgestilo-ACT
```

## Ver con Live Server

1. Abre la carpeta anterior en Visual Studio Code.
2. Selecciona `index.html`.
3. Haz clic derecho.
4. Selecciona **Open with Live Server**.
5. El sitio abrirá en una dirección similar a `http://127.0.0.1:5500/index.html`.

No es necesario ejecutar `npm install`, `npm run dev` ni ninguna compilación. La extensión Live Server no se instala automáticamente: debe estar disponible en Visual Studio Code.

También puedes abrir `index.html` directamente para una revisión básica, aunque Live Server es la forma recomendada.

## Archivos editables

- `index.html`: estructura, textos, SEO y contenido.
- `estilos.css`: diseño responsive completo.
- `script.js`: menú, carruseles, desplazamiento a Contacto y enlaces de Drive.
- `imagenes/`: logotipos y fotografías locales.

Todas las rutas son relativas. Para publicar, sube `index.html`, `estilos.css`, `script.js` y la carpeta `imagenes` conservando exactamente la misma estructura.

## Catálogos

Las cuatro carpetas públicas de Google Drive están centralizadas al principio de `script.js`. Cada tarjeta abre su carpeta correspondiente en una pestaña nueva. No hay credenciales, tokens ni claves en el navegador.

Los carruseles usan cinco fotografías locales por categoría:

- `imagenes/ninos/ninos-01.webp` a `ninos-05.webp`
- `imagenes/mujer/mujer-01.webp` a `mujer-05.webp`
- `imagenes/caballero/caballero-01.webp` a `caballero-05.webp`
- `imagenes/calzado/calzado-01.webp` a `calzado-05.webp`

## Contacto editable

El WhatsApp visible es `+52 312 166 3908`. Solo existe un botón real de WhatsApp dentro de “Hablemos por WhatsApp”. El enlace “Contacto” de la navegación desplaza a esa sección.

Antes de publicar debe confirmarse la inconsistencia del sitio anterior: mostraba `+3121663908`, pero otro enlace apuntaba a `+3121192953`.

Otros datos recuperados:

- Correo: `boutiquebgcol@gmail.com`.
- Instagram: `@boutique_bg_estilo`.
- Facebook: el enlace recuperado dirige a Tecnocible y debe confirmarse.
- Ubicación general: Colima, México.

## Publicación

No se realizó ningún despliegue ni se modificó el dominio. El sitio está listo para cualquier hosting estático tradicional.
