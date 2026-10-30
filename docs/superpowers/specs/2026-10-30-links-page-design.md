# Diseño: Página `/links` (link-in-bio para Instagram)

Fecha: 2026-10-30
Estado: Aprobado por Jesús (conversación)

## Intención

Página ligera tipo "link-in-bio" para poner como enlace del perfil de Instagram
(`@alcalajesus846`). Presenta quién es Jesús y conecta a sus 4 destinos:
Portafolio, GitHub, LinkedIn e Instagram. Debe cargar rápido dentro del
navegador interno de Instagram y sentirse parte del sitio principal.

## Objetivos

- Ruta `/links` con columna móvil (~430px) centrada en escritorio.
- Tarjeta de perfil: avatar, nombre (Oswald uppercase), rol, bio corta.
- 4 tarjetas de enlace: Portafolio (CTA principal, tinta sólida), GitHub,
  LinkedIn, Instagram.
- Animación de entrada idéntica en espíritu a la del hero: clip-path + rotate,
  SplitText, scramble text, stagger de tarjetas.
- 3D: tilt con perspectiva en perfil y tarjetas vía giroscopio
  (DeviceOrientation); fallback a drag/touch y a mouse en escritorio.
- Fondo: shader `hero-grid.ts` reutilizado, atenuado, con dynamic import.
- Idioma visual del design system "Warm Neo-Brutalist Engineering" (`DESIGN.md`).

## No objetivos

- Analytics, QR, formulario de contacto, themes, header/footer del sitio.
- Layout distinto para escritorio (solo centrar la columna).
- Escena WebGL con objetos 3D reales (opción B, descartada).

## Enfoques considerados

1. **A. Mismo idioma del hero, versión móvil (elegida).** GSAP + tilt 3D DOM +
   shader de fondo reutilizado. Coherente, ligero, funciona en el in-app
   browser de Instagram. Riesgo: permiso de DeviceOrientation en iOS →
   degradar con gracia.
2. **B. Escena three.js completa.** Objetos 3D en WebGL. Más pesado, texto
   menos nítido, rompe coherencia. Descartada.
3. **C. Solo GSAP + CSS 3D.** Sin giroscopio ni WebGL. Seguro pero sin factor
   "3D" pedido. Descartada.

## Restricciones

- `prefers-reduced-motion` desactiva intro y shader (patrón del hero).
- three.js se carga con dynamic import, solo si no hay reduced-motion.
- El layout de `/links` no usa el JSON-LD del `Layout.astro` principal; solo
  meta/OG básicos + canonical.

## Decisiones

- Orden de links: Portafolio → GitHub → LinkedIn → Instagram.
- Datos centralizados en `src/data/links.ts` (bio, links, avatar).
- Instagram: `https://instagram.com/alcalajesus846`.
- Portafolio: `https://jesus-avina.dev/`.
- Iconos de marca con `simple-icons` (ya en el repo), flecha con lucide.
- Pie mínimo: `© 2026` + nota mono.

## Pendiente para el builder

- Texto exacto de la bio (1–2 líneas).
- Avatar: reutilizar `avatar-frente.jpg` u otro del repo.
- Intensidad exacta del shader de fondo y del tilt (afinar a ojo).
- Discreción/tamaño del botón "Activar movimiento" en iOS.
