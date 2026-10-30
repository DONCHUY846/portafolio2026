# Página `/links` (link-in-bio) — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ruta `/links` tipo link-in-bio para el perfil de Instagram, con animación de entrada estilo hero, tilt 3D por giroscopio y fondo shader reutilizado.

**Architecture:** Página Astro estática autocontenida: datos en `src/data/links.ts`, layout ligero propio (sin JSON-LD), un componente de página `src/pages/links.astro` (markup + estilos scoped) y un módulo `src/scripts/links-motion.ts` con la intro GSAP + tilt 3D, cableado con dynamic import (mismo patrón que `Hero.astro`). El shader de fondo se reutiliza sin modificar (`initHeroGrid`), atenuado vía CSS.

**Tech Stack:** Astro 6 (static), GSAP (SplitText, ScrambleTextPlugin), three.js (solo `hero-grid.ts` existente), simple-icons + @lucide/astro, astro:assets.

**Spec:** `docs/superpowers/specs/2026-10-30-links-page-design.md`

## Global Constraints

- **Sin dependencias nuevas.** gsap, three, simple-icons y lucide ya están instalados.
- **Sin framework de pruebas en el repo** (y no se agrega uno). Verificación = `npx astro check` (0 errores), `npm run build` (exitoso) y chequeos manuales con `npm run dev` en `http://localhost:4321/links`, documentados en cada tarea.
- **Tokens de `src/styles/global.css`**, no hex inline donde exista token: `--primary-color`, `--neutral-color` (#e6e5df, texto sobre tinta), `--outline-color`, `--surface-card-color`, `--surface-inset-color`, `--border-thick` (1.5px), `--border-thin` (1px), `--shadow-md` (3px 3px 0), `--shadow-lg` (4px 4px 0), `--radius-md` (6px), `--radius-lg` (8px), `--headline-font`, `--body-font`, `--label-font`, `--transition-press`, `--transition-surface`.
- **`prefers-reduced-motion: reduce`** desactiva intro, tilt y shader; el contenido es visible sin JS y sin animación (estados iniciales con `.from()`/`fromTo()` sobre el estado final del DOM, como el hero).
- Columna única `max-width: 430px`, centrada con `margin-inline: auto` en escritorio. `min-height: 100vh` con fallback y luego `100svh` (in-app browser de Instagram).
- Todo copy visible en español; datos centralizados en `src/data/links.ts` (una sola fuente).
- Los 4 links externos llevan `target="_blank" rel="noopener noreferrer"`.
- Estilo de commits: conventional (`feat:`, `chore:`), mensajes en inglés, como el historial del repo.

## Review Focus

1. **`prefers-reduced-motion: reduce`** — recargar la página no debe dejar nada invisible ni animado (la intro usa `.from()` así que el DOM final ya es el estado visible; el shader no se importa). Test manual en Task 4.
2. **Navegador in-app de Instagram / iOS sin WebGL** — `initHeroGrid` ya hace try/catch y retorna noop; la página debe seguir funcional sin canvas. Test manual en Task 4.
3. **Sin JS** — los 4 links, nombre y bio deben ser HTML servido por Astro y navegables con JS deshabilitado. Test manual en Task 3.
4. **Escritorio ≥1024px** — columna centrada (430px), tilt sigue el mouse (media `(hover: hover) and (pointer: fine)`). Test manual en Task 4.
5. **Pantallas de 320px** — sin scroll horizontal, tarjetas full-width, tap targets ≥44px de alto, textos sin desbordar. Test manual en Task 3.

---

### Task 1: Datos de la página — `src/data/links.ts`

**Files:**
- Create: `src/data/links.ts`

**Interfaces:**
- Consumes: `site` de `src/data/site` (`site.url`, `site.profiles.github`, `site.profiles.linkedin`).
- Produces: `linksPage` (objeto `as const`) con la forma exacta:

```ts
export interface LinksEntry {
	id: 'portafolio' | 'github' | 'linkedin' | 'instagram';
	label: string;   // uppercase
	href: string;
	hint: string;    // pista mono, ej. '@alcalajesus846'
	icon: 'github' | 'linkedin' | 'instagram' | 'arrow';
	variant: 'primary' | 'default';
}

export const linksPage = {
	title: string;        // 'Jesús Aviña Alcalá | Links'
	description: string;  // meta description en español
	fullName: string;     // 'Jesús Aviña Alcalá' (sr-only h1)
	displayName: string;  // 'JESÚS AVIÑA' (visible, SplitText)
	role: string;         // 'FRONTEND ARCHITECT' (scramble)
	bio: string;          // 1–2 líneas
	avatarAlt: string;
	links: LinksEntry[];  // orden: portafolio, github, linkedin, instagram
	footnote: string;     // '© 2026 — JESÚS AVIÑA ALCALÁ · MÉXICO'
	motionCta: string;    // 'ACTIVAR MOVIMIENTO' (botón permiso iOS)
};
```

- [ ] **Step 1: Crear `src/data/links.ts`** con los valores exactos:

```ts
import { site } from './site';

export const linksPage = {
	title: 'Jesús Aviña Alcalá | Links',
	description:
		'Todos los links de Jesús Aviña Alcalá: portafolio, GitHub, LinkedIn e Instagram. Frontend Architect desde México.',
	fullName: 'Jesús Aviña Alcalá',
	displayName: 'JESÚS AVIÑA',
	role: 'FRONTEND ARCHITECT',
	bio: 'Construyo design systems, librerías de componentes e interfaces rápidas que se mantienen sanas al escalar. México / LATAM.',
	avatarAlt: 'Retrato de Jesús Aviña Alcalá',
	links: [
		{ id: 'portafolio', label: 'PORTAFOLIO', href: site.url, hint: 'jesus-avina.dev', icon: 'arrow', variant: 'primary' },
		{ id: 'github', label: 'GITHUB', href: site.profiles.github, hint: 'github.com/donchuy846', icon: 'github', variant: 'default' },
		{ id: 'linkedin', label: 'LINKEDIN', href: site.profiles.linkedin, hint: 'in/jesus-aviña-alcalá', icon: 'linkedin', variant: 'default' },
		{ id: 'instagram', label: 'INSTAGRAM', href: 'https://instagram.com/alcalajesus846', hint: '@alcalajesus846', icon: 'instagram', variant: 'default' },
	],
	footnote: '© 2026 — JESÚS AVIÑA ALCALÁ · MÉXICO',
	motionCta: 'ACTIVAR MOVIMIENTO',
} as const;
```

- [ ] **Step 2: Verificar tipos**

Run: `npx astro check`
Expected: 0 errors (sin diagnósticos nuevos).

- [ ] **Step 3: Commit**

```bash
git add src/data/links.ts
git commit -m "feat(links): add link-in-bio page data"
```

---

### Task 2: Layout ligero — `src/layouts/LinksLayout.astro`

**Files:**
- Create: `src/layouts/LinksLayout.astro`

**Interfaces:**
- Consumes: `site` de `src/data/site`; `global.css`.
- Produces: componente `LinksLayout` con props opcionales `title` y `description` (defaults desde `linksPage` no — usar defaults propios simples, el page pasa los valores). Slot único para el contenido. SIN JSON-LD, sin `link rel="sitemap"`, sin meta `profile:`.

- [ ] **Step 1: Crear `LinksLayout.astro`** — copiar del `<head>` de `src/layouts/Layout.astro` solo: `charset`, `viewport`, `title`, `description`, `author`, `robots` (mismos valores de Layout), `theme-color #fbf9f3`, `canonical` (mismo cálculo `new URL(Astro.url.pathname, Astro.site ?? site.url)`), los 4 `link` de favicon + manifest, `og:` básicos (`og:type` `website`, `og:site_name` 'Jesús Aviña Alcalá — Portafolio', `og:locale es_MX`, title, description, url, image con `new URL(site.ogImage, canonical).href` + alt) y `twitter:card summary_large_image` + title/description/image/alt. `<html lang={site.locale}>`, `<body><slot /></body>`. Import de `../styles/global.css` en el frontmatter.

- [ ] **Step 2: Verificar build**

Run: `npx astro check && npm run build`
Expected: 0 errors, build exitoso.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/LinksLayout.astro
git commit -m "feat(links): add lightweight layout without JSON-LD"
```

---

### Task 3: Página estática — `src/pages/links.astro` (markup + estilos, sin JS)

**Files:**
- Create: `src/pages/links.astro`

**Interfaces:**
- Consumes: `LinksLayout` (Task 2), `linksPage` (Task 1), `Image` de `astro:assets` con `import avatar from '../assets/avatar-frente.jpg'`, `siGithub`/`siLinkedin`/`siInstagram` de `simple-icons` (para linkedin reusar el `linkedinPath` del footer NO — usar `siLinkedin` de simple-icons), `ArrowUpRight` de `@lucide/astro/icons`.
- Produces: ruta `/links` renderizada 100% en HTML (Task 4 añade los data-attrs y el script). Atributos `data-*` que Task 4 consume: `[data-links]` (raíz `main`), `[data-links-canvas]`, `[data-links-profile]`, `[data-links-name]`, `[data-links-role]`, `[data-links-bio]`, `[data-links-card]` (cada `<a>` de link), `[data-links-footnote]`, `[data-links-motion-cta]` (botón `hidden`).

- [ ] **Step 1: Frontmatter + markup.** Estructura exacta:

```astro
---
import LinksLayout from '../layouts/LinksLayout.astro';
import { Image } from 'astro:assets';
import { ArrowUpRight } from '@lucide/astro/icons';
import { siGithub, siLinkedin, siInstagram } from 'simple-icons';
import avatar from '../assets/avatar-frente.jpg';
import { linksPage } from '../data/links';
---
<LinksLayout title={linksPage.title} description={linksPage.description}>
  <main class="links" data-links>
    <canvas class="links__canvas" data-links-canvas aria-hidden="true"></canvas>
    <div class="links__frame">
      <section class="links__profile" data-links-profile>
        <Image class="links__avatar" src={avatar} alt={linksPage.avatarAlt}
          widths={[240, 360]} sizes="200px" quality={100} format="webp" loading="eager" decoding="async" />
        <h1 class="links__name">
          <span class="sr-only">{linksPage.fullName} — Frontend Architect</span>
          <span class="links__name-text" data-links-name aria-hidden="true">{linksPage.displayName}</span>
        </h1>
        <p class="links__role" data-links-role>{linksPage.role}</p>
        <p class="links__bio" data-links-bio>{linksPage.bio}</p>
      </section>
      <ul class="links__list">
        {/* un <li><a data-links-card class="link-card link-card--primary|-default"> por entry:
            icono (svg simple-icons 20px o ArrowUpRight para 'arrow'),
            <span class="link-card__label">{label}</span>,
            <span class="link-card__hint">{hint}</span>,
            <ArrowUpRight class="link-card__arrow" /> */}
      </ul>
      <p class="links__footnote" data-links-footnote>{linksPage.footnote}</p>
      <button class="links__motion-cta" data-links-motion-cta type="button" hidden>{linksPage.motionCta}</button>
    </div>
  </main>
</LinksLayout>
```

Cada `<a>`: `href` + `target="_blank"` + `rel="noopener noreferrer"` + `aria-label` tipo "Portafolio de Jesús Aviña Alcalá". El `sr-only` ya existe en `global.css` (lo usa Hero).

- [ ] **Step 2: Estilos scoped** (bloque `<style>` en la página). Reglas clave:
  - `.links`: `position: relative; min-height: 100vh; min-height: 100svh; display: flex; align-items: center; justify-content: center; padding: var(--space-lg); overflow: hidden;`
  - `.links__canvas`: absolute inset 0, `opacity: 0.7` (atenuación del shader), `z-index: 0`, pointer-events none.
  - `.links__frame`: `position: relative; z-index: 1; width: 100%; max-width: 430px; display: flex; flex-direction: column; gap: var(--space-lg);`
  - `.links__profile`: `background: var(--surface-card-color); border: var(--border-thick); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); padding: var(--space-lg); display: grid; justify-items: center; text-align: center; gap: var(--space-sm);`
  - `.links__avatar`: `width: 200px; height: 200px; object-fit: cover; border: var(--border-thin); border-radius: var(--radius-md);`
  - `.links__name-text`: `font-family: var(--headline-font); font-size: var(--font-headline-lg-mobile-size); font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase;`
  - `.links__role`: `font-family: var(--label-font); font-size: var(--font-code-size); color: var(--outline-color);`
  - `.links__bio`: `font-family: var(--body-font); font-size: var(--font-body-sm-size); line-height: 1.5; color: var(--on-surface-variant-color);`
  - `.links__list`: `display: grid; gap: var(--space-md); list-style: none; padding: 0; margin: 0;`
  - `.link-card`: `display: flex; align-items: center; gap: var(--space-md); min-height: 64px; padding: var(--space-md) var(--space-lg); background: var(--surface-card-color); border: var(--border-thick); border-radius: var(--radius-md); box-shadow: var(--shadow-md);` + transiciones `var(--transition-press)` (transform/box-shadow) y `var(--transition-surface)` (background). `:hover`/`:focus-visible`: `translate(-1px, -1px)` + `--shadow-lg` (primary: `translate(0,0)` y `--shadow-md`). `:active`: `translate(2px, 2px)` + sombra `none` (patrón botón de DESIGN.md). `:focus-visible`: `outline: var(--border-heavy); outline-offset: 2px;` (token existente, lo usa `Footer.astro`).
  - `.link-card--primary`: `background: var(--primary-color); color: var(--neutral-color);` (hint y flecha heredan con `opacity` o `--outline-color` no aplica sobre tinta: usar `rgba(230,229,223,0.7)` para hint/flecha). Labels en `var(--headline-font)`, uppercase, `letter-spacing: 0.06em`, `font-size: 18px`.
  - `.link-card__hint`: `font-family: var(--label-font); font-size: var(--font-code-size); color: var(--outline-color);` (primary: variante rgba).
  - `.links__footnote`: `font-family: var(--label-font); font-size: 11px; color: var(--outline-color); text-align: center; letter-spacing: 0.08em;`
  - `.links__motion-cta`: estilo botón secundario de `global.css` (`btn` existe — reusar la clase `.btn .btn-secondary` si aplica, sino replicar), `align-self: center;`
  - Iconos `.link-card__icon svg`: `display: block; width: 20px; height: 20px;` color heredado.

- [ ] **Step 3: Verificar build + página servida**

Run: `npm run build && ls dist/links/index.html`
Expected: build exitoso, `dist/links/index.html` existe.

Run: `npm run dev` y abrir `http://localhost:4321/links`
Manual: (a) los 4 links tienen href correcto y `target=_blank`; (b) con JS deshabilitado todo el contenido y links funcionan; (c) viewport 320px (devtools iPhone SE) sin scroll horizontal, tarjetas full width; (d) escritorio: columna centrada; (e) click en "PORTAFOLIO" abre `https://jesus-avina.dev/`.

- [ ] **Step 4: Commit**

```bash
git add src/pages/links.astro
git commit -m "feat(links): add static /links page markup and styles"
```

---

### Task 4: Animaciones — `src/scripts/links-motion.ts` + cableado

**Files:**
- Create: `src/scripts/links-motion.ts`
- Modify: `src/pages/links.astro` (añadir `<script>` de cableado al final)

**Interfaces:**
- Consumes: `initHeroGrid(canvas: HTMLCanvasElement): () => void` de `../scripts/hero-grid` (sin modificarlo); data-attrs de Task 3.
- Produces: `initLinksMotion(root: HTMLElement): () => void` — registra todo dentro de `gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', …)` y retorna cleanup que hace `mm.revert()`.

- [ ] **Step 1: Escribir `initLinksMotion` en `src/scripts/links-motion.ts`** con este diseño (firmas fijas, cuerpos a criterio):

  1. **Intro timeline** (`paused: true`, defaults `ease: 'expo.out'`, mismo patrón de arranque que `Hero.astro`: `document.fonts.ready.then(play)` + `setTimeout(play, 1200)`):
     - `profile`: `fromTo` `clipPath: 'inset(0 0 100% 0)', scale: 0.92, rotate: -2` → `'inset(0 0 0% 0)', scale: 1, rotate: 0`, `duration: 1.1`, en 0.
     - `name`: `SplitText(nameEl, { type: 'chars', charsClass: 'split-char' })`, `from(chars, { yPercent: 150, duration: 0.9, stagger: 0.03 }, 0.15)`.
     - `role`: `from(roleEl, { y: 8, opacity: 0, duration: 0.5, ease: 'power3.out' }, 0.5)` + `to(roleEl, { scrambleText: { text: roleText, chars: 'upperCase', speed: 0.35, revealDelay: 0.15 }, duration: 1.2, ease: 'none', onStart: () => roleEl.textContent = '' }, 0.55)` (registrar `ScrambleTextPlugin`).
     - `bio`: `SplitText` por words, `from(words, { y: 16, opacity: 0, duration: 0.6, stagger: 0.015, ease: 'power3.out' }, 0.7)`.
     - cards: `fromTo(cards, { y: 24, opacity: 0, rotate: -1.5 }, { y: 0, opacity: 1, rotate: 0, duration: 0.7, stagger: 0.08, ease: 'expo.out' }, 0.85)`.
     - `footnote`: `from(footnote, { y: 10, opacity: 0, duration: 0.5, ease: 'power3.out' }, 1.15)`.
  2. **Tilt 3D** — para `profile` y cada card: `gsap.set(el, { transformPerspective: 900 })` y `gsap.quickTo` de `rotationX`/`rotationY` (`duration: 0.5, ease: 'power3'`). Una función compartida `applyTilt(nx: number, ny: number)` mapea `[-1,1]` a `rotationY: nx * 8`, `rotationX: -ny * 8` (invertir signo para que "hacia el usuario" gire natural).
     - **Escritorio:** `mm.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', …)`: `pointermove` sobre `main` → normalizar contra el rect de `.links__frame`.
     - **Giroscopio:** si `'DeviceOrientationEvent' in window`: si `typeof (DeviceOrientationEvent as any).requestPermission === 'function'` → mostrar el botón `data-links-motion-cta` (`hidden = false`); su `click` llama `requestPermission()`; con `'granted'` → escuchar `deviceorientation` (gamma → nx, beta → ny alrededor de 45° de inclinación natural, clamp a ±30 antes de normalizar) y ocultar el botón; con respuesta negativa → ocultar botón y quedarse en touch. En Android/otros: escuchar `deviceorientation` directo.
     - **Touch fallback:** `touchmove` sobre `main` (passive) → normalizar como pointer.
     - `pointerleave`/`touchend` → `applyTilt(0, 0)`.
  3. **Fondo shader:** `import('../scripts/hero-grid').then(m => m.initHeroGrid(canvas))` dentro del mismo matchMedia (guard `if (canvas)`), guardando el dispose para el cleanup.
  4. **Cleanup retornado:** revertir SplitTexts, matar timelines, remover listeners, dispose del shader; el contexto `mm` se limpia con `mm.revert()` en el dispose general de `initLinksMotion`.

- [ ] **Step 2: Cablear en `src/pages/links.astro`** — `<script>` al final (mismo patrón que `Hero.astro`): query `[data-links]`, `if (root) import('../scripts/links-motion').then(m => m.initLinksMotion(root))`, sin top-level await si el hero no lo usa.

- [ ] **Step 3: Verificar tipos y build**

Run: `npx astro check && npm run build`
Expected: 0 errores, build exitoso, `dist/links/index.html` contiene el script bundle.

- [ ] **Step 4: Verificación manual completa** (`npm run dev`, `http://localhost:4321/links`):
  - (a) Intro al cargar: perfil se revela con clip-path + endereza, letras del nombre suben escalonadas, rol se descifra, cards entran en stagger, footnote al final.
  - (b) Devtools "Emulate prefers-reduced-motion: reduce" + reload: sin animaciones, todo visible de inmediato, sin canvas shader.
  - (c) Escritorio: mover el mouse inclina perfil y cards en perspectiva.
  - (d) Devtools móvil (touch): arrastrar inclina las cards.
  - (e) `linksPage.links` hrefs correctos en el HTML servido (ver código fuente).
  - (f) Con WebGL deshabilitado (devtools "Disable WebGL" o bloquear three): página funcional, solo sin fondo.

- [ ] **Step 5: Commit**

```bash
git add src/scripts/links-motion.ts src/pages/links.astro
git commit -m "feat(links): add GSAP intro, gyroscope 3D tilt and shader background"
```

---

### Task 5: Verificación final de rama

**Files:** — (solo verificación; arreglos si algo falla)

- [ ] **Step 1:** `npx astro check && npm run build && ls dist/links/index.html` — 0 errores, build exitoso.
- [ ] **Step 2:** Chequeo manual de la Checklist Review Focus completa (1–5) en `http://localhost:4321/links`.
- [ ] **Step 3:** Verificar que la raíz `/` no cambió: abrir `http://localhost:4321/` y confirmar hero intacto (el shader compartido no se tocó).
- [ ] **Step 4:** `git status` limpio tras los commits de las tareas.
