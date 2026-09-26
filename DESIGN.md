---
name: Warm Neo-Brutalist Engineering
colors:
  surface: '#fbf9f3'
  surface-dim: '#dbdad4'
  surface-bright: '#fbf9f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f4ee'
  surface-container: '#efeee8'
  surface-container-high: '#e9e8e2'
  surface-container-highest: '#e4e3dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#444748'
  inverse-surface: '#30312d'
  inverse-on-surface: '#f2f1eb'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#626262'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1d1b1a'
  on-tertiary-container: '#868381'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e6e1df'
  tertiary-fixed-dim: '#cac6c3'
  on-tertiary-fixed: '#1d1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#fbf9f3'
  on-background: '#1b1c19'
  surface-variant: '#e4e3dd'
  surface-card: '#ECEBE5'
  surface-inset: '#DFDED8'
  border-dark: '#111111'
  border-subtle: rgba(17, 17, 17, 0.15)
  code-surface: '#1A1A1A'
  code-text: '#E6E5DF'
typography:
  headline-display:
    fontFamily: Oswald
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 76px
    letterSpacing: 0.04em
  headline-display-mobile:
    fontFamily: Oswald
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: 0.03em
  headline-lg:
    fontFamily: Oswald
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 46px
    letterSpacing: 0.03em
  headline-lg-mobile:
    fontFamily: Oswald
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Oswald
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0.02em
  headline-sm:
    fontFamily: Oswald
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Oswald
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-desktop: 2rem
  margin: 1.25rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system blends **Soft Brutalism** with **Warm Minimalism** tailored for a specialized React frontend architect and web engineer. It eschews the chaotic neon clutter of aggressive neo-brutalism in favor of an editorial, tactile, and restrained paper-like environment. 

The aesthetic communicates structural precision, high craftsmanship, and technical mastery. The tone is confident, intellectual, and unpretentious:
- **Atmosphere:** Warm linen, tactile paper editorial layouts, ink-black architectural lines, and rigorous typographic hierarchies.
- **Personality:** Decisive, functionalist, highly systematic, and modern.
- **Emotional Response:** Inspires trust, relief from visual fatigue, and immediate recognition of sophisticated UI engineering capability.

## Colors

The palette relies on a calibrated rest-eyes chromatic system designed around tactile physical metaphors: ink (`#111111`) meeting unbleached linen canvas (`#E6E5DF`).

- **Primary (`#111111`):** Ink Charcoal. Used for key headlines, crisp solid buttons, functional structural boundaries, and high-impact micro-interactions.
- **Secondary (`#666666`):** Mid Gray. Dedicated to supportive metadata, subheadings, architectural notes, and secondary context labels.
- **Neutral (`#E6E5DF`):** Linen Off-White base. Forms the default document canvas, minimizing screen glare while offering natural warmth.
- **Semantic & Specialized Tokens:**
  - `surface-card` (`#ECEBE5`): Slightly lighter surface layer for projecting container depth without drop shadows.
  - `surface-inset` (`#DFDED8`): Recessed visual state for input fills, code previews, and tag backdrops.
  - `border-dark` (`#111111`): Authoritative 1px or 2px architectural bounding line.
  - `code-surface` (`#1A1A1A`) & `code-text` (`#E6E5DF`): Inverted technical containers for displaying React architecture, terminal logs, and code snippets.

## Typography

The typographical strategy constructs an explicit tension between **Oswald** (commanding, condensed, industrial uppercase display) and **Inter** (objective, neogrotesque, neutral utility). **JetBrains Mono** introduces monospaced precision for technical callouts, React props, git hashes, and stack specifications.

- **Display & Headlines:** Always transformed to `text-transform: uppercase` with slightly expanded tracking (`0.02em` to `0.04em`) to maintain editorial cadence and readability across condensed letterforms.
- **Body:** Kept in sentence case with comfortable leading (1.5x - 1.6x) to facilitate continuous reading on light warm backgrounds.
- **Labels & Code:** Monospaced or condensed caps used for stack tags (`REACT 19`, `ZUSTAND`, `TAILWIND`), component metrics, and timeline markers.

## Layout & Spacing

The layout is built upon a **12-column rigid modular grid** with disciplined structural lines and abundant, deliberate breathing room.

- **Grid System:** 12 columns on desktop (breakpoints `>= 1024px`) with `2rem` gutters; 6 columns on tablet (breakpoints `>= 640px` and `< 1024px`) with `1.5rem` gutters; 4 columns on mobile with `1rem` gutters.
- **Framing & Alignment:** Major portfolio sections (Hero, Featured Works, Technical Architecture, Playground) are enclosed within 1px solid `#111111` divider lines, giving the entire viewport the appearance of an architectural blueprint or broadsheet layout.
- **Rhythm:** Consistent vertical rhythms utilizing multiples of `0.5rem` (8px). Generous block padding (`space-xl` to twice `space-xl`) prevents the brutalist borders from feeling cramped.

## Elevation & Depth

Visual hierarchy is communicated via **flat physical contact and tectonic offsets**, completely eschewing standard blurry drop shadows and frosted glass effects:

- **Hard Contact Shadows (Neo-Brutalist Offset):** When interactive components (buttons, feature cards, dialogs) achieve elevation or hover focus, they project a crisp, unblurred shadow: `2px 2px 0px #111111` or `4px 4px 0px #111111`.
- **Active State Translation:** Active states physically press inward using `transform: translate(2px, 2px)` while collapsing the offset shadow to `0px 0px 0px #111111`, providing instant haptic mechanical feedback.
- **Structural Outlines:** Every container boundary utilizes a crisp `1px` or `2px solid #111111` stroke. Depth is defined through planar nesting (e.g., placing an inset surface `#DFDED8` badge inside an elevated `#ECEBE5` project card) rather than simulated lighting.

## Shapes

The geometric personality balances industrial rigidity with tactile approachability:

- **Corner Radii:** Set precisely to `6px` (`0.375rem`) for compact components like buttons, input fields, and tags; `8px` (`0.5rem`) for major project containers, modals, and preview viewports.
- **Philosophy:** Perfectly sharp 0px corners feel overly severe, while high border radii dilute the engineering brutalism. Controlled 6px–8px radii yield an engineered, mechanical device finish (similar to physical synthesizers, lab equipment, or premium stationery cards).

## Components

### Buttons
- **Primary Action (Solid Ink):** Background `#111111`, text `#E6E5DF`, border `1px solid #111111`, radius `6px`. Font: `Oswald`, semi-bold, uppercase, tracked (`0.06em`). Hover: offset shadow `3px 3px 0px #111111`, translate `(-1px, -1px)`. Active: translate `(2px, 2px)`, shadow `0px 0px 0px`.
- **Secondary Action (Wireframe Paper):** Background `transparent`, text `#111111`, border `1.5px solid #111111`, radius `6px`. Hover: background `#DFDED8`.
- **Tertiary / Link Action:** Monospaced label (`JetBrains Mono`) with an animated baseline stroke that expands from 0% to 100% on hover, accompanied by an external arrow glyph (`↗`).

### Cards & Project Showcases
- **Surface:** `#ECEBE5` canvas framed with `1.5px solid #111111` and `8px` border radius.
- **Composition:** Divided internally by `1px solid #111111` horizontal lines separating the interactive live demo/screenshot area, the architectural summary, and the technical stack chips.
- **Interaction:** Hover state produces an external hard shadow `4px 4px 0px #111111` and an upward translation of `(-2px, -2px)`.

### Chips & Badges
- **Specification:** Monospaced text (`label-code`) inside a `surface-inset` (`#DFDED8`) pill or rectangular box with `1px solid #111111` border, padding `2px 8px`, border radius `4px`.
- **Tech Stack Flags:** Used to denote library versions (e.g., `NEXT.JS 15`, `TYPESCRIPT 5.6`, `RSC`).

### Form Elements & Text Inputs
- **Base Input:** Background `#DFDED8`, border `1.5px solid #111111`, radius `6px`, padding `12px 16px`, text `#111111`, placeholder `#666666`.
- **Focus State:** Background `#ECEBE5`, hard border outline `2px solid #111111`, box-shadow `2px 2px 0px #111111`. No default browser glow.

### Code Blocks & Architecture Windows
- **Terminal Shell:** Background `#1A1A1A`, text `#E6E5DF`, border `1.5px solid #111111`, radius `8px`.
- **Window Header:** Solid strip containing three `8px` monochromatic circular dots and an uppercase title in `label-code` format (`App.tsx` or `architecture-diagram.ts`).

### Selection Controls (Checkbox & Radio)
- **Checkbox:** Square `18px x 18px` with `4px` radius, `1.5px solid #111111` border. Checked state fills `#111111` with an architectural crisp checkmark in `#E6E5DF`.
- **Radio:** Circular `18px x 18px`, `1.5px solid #111111` border. Checked state renders a solid concentric `#111111` circle with a `3px` inner gap.