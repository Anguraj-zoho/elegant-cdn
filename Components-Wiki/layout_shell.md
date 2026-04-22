# Layout Shell

> Source: `layout.css` + `layout.html` + `responsive.css`

## Quick Summary

The Layout Shell is the **base page skeleton** that every page in the Elegant 1.0 system uses. It provides a full-viewport flex container (`div.app-shell`) that stacks the TopNavBar at the top and the body area below. The body area (`div.app-body`) is a horizontal flex container that holds the optional sidebar and the main content area.

All four App Shells (A, B, C, D) are built on top of this base structure. The layout is responsive across three breakpoints: Desktop (>1024px), Tablet (768–1024px), and Mobile (<768px).

---

## Complete HTML Template

```html
<!--
  ============================================================
  LAYOUT SHELL — Predefined HTML Skeleton
  ============================================================
  Use this as the base template for any new page.
  Replace {{PAGE_TITLE}}, {{ACTIVE_TAB}}, {{ACTIVE_MENU_ITEM}},
  and fill in the main-content area.

  FILE NAMING:
    Converted HTML files go directly in figma-export/ — NO subfolder.
    Use lowercase + hyphens for the filename.
    Example: figma-export/settings-applications.html  NOT  figma-export/settings-applications/index.html

  DATA ATTRIBUTES:
    data-active-tab="TabName"   on <header class="topnavbar">
    data-active-item="ItemName" on <aside class="sidemenu">
    JS reads these on load — no manual class editing needed.

  REQUIRED CSS (in this order, with cache-busting ?v=N):
    tokens.css → layout.css → topnavbar.css → sidemenu.css
    → header.css → classic-tab.css → table.css → responsive.css

  REQUIRED JS (at bottom of body):
    topnavbar.js → sidemenu.js → classic-tab.js → table.js

  RESPONSIVE:
    Desktop > 1024px  — original Figma layout
    Tablet  768–1024px — sidebar overlay, priority+ tabs, hamburger
    Mobile  < 768px   — stacked layout, drawer sidebar, compact nav

  DEPLOYMENT:
    Always bump ?v=N on CSS links when pushing to GitHub Pages
    to bust browser cache.
  ============================================================
-->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{PAGE_TITLE}}</title>

  <!-- Predefined CSS (bump ?v=N after changes for cache busting) -->
  <link rel="stylesheet" href="./predefined-components/tokens.css?v=4" />
  <link rel="stylesheet" href="./predefined-components/layout.css?v=4" />
  <link rel="stylesheet" href="./predefined-components/topnavbar.css?v=4" />
  <link rel="stylesheet" href="./predefined-components/sidemenu.css?v=4" />
  <link rel="stylesheet" href="./predefined-components/header.css?v=4" />
  <link rel="stylesheet" href="./predefined-components/classic-tab.css?v=4" />
  <link rel="stylesheet" href="./predefined-components/table.css?v=4" />
  <link rel="stylesheet" href="./predefined-components/responsive.css?v=4" />
</head>
<body>
<!-- Sidebar overlay backdrop (mobile/tablet) -->
<div class="sidemenu-backdrop"></div>

<div class="app-shell">

  <!-- TOPNAVBAR: paste from topnavbar.html, set data-active-tab -->

  <div class="app-body">

    <!-- SIDEMENU: paste from sidemenu.html, set data-active-item -->

    <!-- Expand button (visible when sidebar collapsed on desktop) -->
    <button class="sidemenu-expand" id="sidebarExpand" title="Expand sidebar">
      <img src="./assets/icons/icon-slider-close.svg" alt="" />
    </button>

    <main class="main-content">

      <!-- HEADER: paste from header.html, set title -->

      <!-- CONTENT: classic-tab, table, form, etc. -->

    </main>
  </div>

</div>

<!-- Bottom sheet for mobile/tablet tab navigation (OUTSIDE app-shell) -->
<div class="nav-bottom-sheet" id="navBottomSheet">
  <div class="nav-bottom-sheet__backdrop"></div>
  <div class="nav-bottom-sheet__panel">
    <div class="nav-bottom-sheet__handle"></div>
    <ul class="nav-bottom-sheet__list">
      <li><button class="nav-bottom-sheet__item" data-tab="Dashboard">Dashboard</button></li>
      <li><button class="nav-bottom-sheet__item" data-tab="Reports">Reports</button></li>
      <li><button class="nav-bottom-sheet__item" data-tab="Compliance">Compliance</button></li>
      <li><button class="nav-bottom-sheet__item" data-tab="Search">Search</button></li>
      <li><button class="nav-bottom-sheet__item" data-tab="Correlation">Correlation</button></li>
      <li><button class="nav-bottom-sheet__item" data-tab="Alert">Alert</button></li>
      <li><button class="nav-bottom-sheet__item" data-tab="Cloud Protection">Cloud Protection</button></li>
      <li><button class="nav-bottom-sheet__item" data-tab="Settings">Settings</button></li>
      <li><button class="nav-bottom-sheet__item" data-tab="Support">Support</button></li>
    </ul>
  </div>
</div>

<!-- Predefined JS -->
<script src="./predefined-components/topnavbar.js"></script>
<script src="./predefined-components/sidemenu.js"></script>
<script src="./predefined-components/classic-tab.js"></script>
<script src="./predefined-components/table.js"></script>
</body>
</html>
```

---

## Complete CSS

### layout.css

```css
/* ============================================================
   LAYOUT — Page shell structure from Figma MCP
   Full viewport: TopNavBar (78px) + Body (sidebar + main)
   ============================================================ */

.app-shell {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
}

.app-body {
  display: flex;
  flex: 1;
  min-height: 0;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: var(--main-content-bg);
  padding: var(--main-content-padding);
}
```

---

## Responsive CSS

### responsive.css

```css
/* ============================================================
   RESPONSIVE — Tablet & Mobile breakpoints
   ============================================================
   Desktop:  > 1024px  — original Figma layout (no changes)
   Tablet:   768–1024px — sidebar overlay, priority+ tabs
   Mobile:   < 768px   — stacked layout, drawer sidebar
   ============================================================
   TAB OVERFLOW: Handled by topnavbar.js (priority+ pattern).
   JS measures available space, shows as many tabs as fit,
   always keeps the active tab visible, and pushes the rest
   into the "..." bottom sheet. CSS just provides the styles.
   ============================================================ */

/* ── Hamburger toggle (hidden on desktop) ── */
.topnavbar__hamburger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  border-radius: 6px;
  transition: background 0.15s;
}
.topnavbar__hamburger:hover {
  background: var(--icon-container-hover-bg, #3D4255);
}
.topnavbar__hamburger svg {
  width: 20px;
  height: 20px;
}

/* ── "More" three-dot button — hidden by default, shown by JS when tabs overflow ── */
.topnavbar__more {
  display: none;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  border-radius: 4px;
  transition: background 0.15s;
}
.topnavbar__more--visible {
  display: flex;
}
.topnavbar__more:hover {
  background: rgba(255, 255, 255, 0.1);
}
.topnavbar__more svg {
  width: 18px;
  height: 18px;
}

/* ── Tab hidden by JS overflow (not by CSS media query) ── */
.topnavbar__tab--overflow {
  display: none !important;
}

/* ── Sidebar overlay backdrop ── */
.sidemenu-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99;
  opacity: 0;
  transition: opacity 0.25s ease;
}
.sidemenu-backdrop--visible {
  display: block;
  opacity: 1;
}

/* ── Bottom sheet for tab navigation ── */
.nav-bottom-sheet {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  pointer-events: none;
}
.nav-bottom-sheet--open {
  display: block;
  pointer-events: auto;
}

.nav-bottom-sheet__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.nav-bottom-sheet--open .nav-bottom-sheet__backdrop {
  opacity: 1;
}

.nav-bottom-sheet__panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 201;
  background: #FFFFFF;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.15);
  transform: translateY(100%);
  transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1);
  max-height: 70vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.nav-bottom-sheet--open .nav-bottom-sheet__panel {
  transform: translateY(0);
}

.nav-bottom-sheet__handle {
  display: flex;
  justify-content: center;
  padding: 12px 0 8px;
}
.nav-bottom-sheet__handle::after {
  content: '';
  width: 40px;
  height: 4px;
  background: #D0D0D0;
  border-radius: 2px;
}

.nav-bottom-sheet__list {
  list-style: none;
  margin: 0;
  padding: 0 0 env(safe-area-inset-bottom, 16px);
}

.nav-bottom-sheet__item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 52px;
  padding: 0 24px;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 15px;
  font-weight: 400;
  color: #000000;
  cursor: pointer;
  text-align: left;
  transition: background 0.12s;
  border-bottom: 1px solid #F0F0F0;
}
.nav-bottom-sheet__item:last-child {
  border-bottom: none;
}
.nav-bottom-sheet__item:hover {
  background: #F5F5F5;
}
.nav-bottom-sheet__item--active {
  font-weight: 600;
  color: #2C66DD;
  background: #F0F6FF;
}
.nav-bottom-sheet__item--active:hover {
  background: #E5EEFA;
}

/* ============================================================
   TABLET — 768px to 1024px
   ============================================================ */
@media (max-width: 1024px) {

  /* Show hamburger in Row 1, logo stays left-aligned next to it */
  .topnavbar__hamburger {
    display: flex;
  }
  .topnavbar__row1-container {
    justify-content: flex-start;
    gap: 16px;
  }
  .topnavbar__logo {
    padding-left: 0;
  }
  .topnavbar__right {
    margin-left: auto;
  }

  /* Tabs: let JS manage overflow, no CSS scroll */
  .topnavbar__tabs {
    overflow: hidden;
    flex: 1;
    min-width: 0;
  }

  /* Search box: shrink */
  .topnavbar__search {
    width: 140px;
  }

  /* Sidebar: off-screen overlay mode */
  .sidemenu {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 0;
    width: var(--sidebar-width);
    box-shadow: none;
  }
  .sidemenu.sidemenu--overlay-open {
    transform: translateX(0);
    opacity: 1;
    box-shadow: 4px 0 16px rgba(0, 0, 0, 0.15);
  }

  .sidemenu.sidemenu--collapsed {
    width: var(--sidebar-width);
    border-right: 1px solid var(--sidebar-stroke);
    pointer-events: auto;
  }

  .sidemenu__bottom-btn img,
  .sidemenu__bottom-btn svg {
    transform: rotate(180deg);
  }

  .app-body {
    position: relative;
  }
  .main-content {
    width: 100%;
  }

  .classic-tab__headers {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .classic-tab__headers::-webkit-scrollbar {
    display: none;
  }

  .data-table {
    min-width: 900px;
  }
}

/* ============================================================
   MOBILE — under 768px
   ============================================================ */
@media (max-width: 767px) {

  .topnavbar__hamburger {
    display: flex;
  }

  .topnavbar__tabs {
    overflow: hidden;
    flex: 1;
    min-width: 0;
  }

  /* ── Row 1: compact ── */
  .topnavbar__row1 {
    padding: 3px 8px;
  }
  .topnavbar__subscription {
    display: none;
  }
  .topnavbar__divider {
    display: none;
  }
  .topnavbar__right {
    gap: 8px;
  }
  .topnavbar__icons {
    gap: 8px;
  }

  /* ── Row 2: hide search ── */
  .topnavbar__segment {
    display: none;
  }
  .topnavbar__row2 {
    padding: 0 4px;
  }

  /* ── Sidebar: full-height overlay drawer ── */
  .sidemenu {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 0;
    box-shadow: none;
  }
  .sidemenu.sidemenu--overlay-open {
    transform: translateX(0);
    opacity: 1;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.2);
  }
  .sidemenu.sidemenu--collapsed {
    width: 280px;
    border-right: 1px solid var(--sidebar-stroke);
    pointer-events: auto;
  }

  .sidemenu__bottom-btn img,
  .sidemenu__bottom-btn svg {
    transform: rotate(180deg);
  }

  /* ── Main content: full width, reduced padding ── */
  .main-content {
    padding: 0 8px;
  }

  .page-header__title {
    font-size: 14px;
  }

  .classic-tab__headers {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    flex-wrap: nowrap;
  }
  .classic-tab__headers::-webkit-scrollbar {
    display: none;
  }
  .classic-tab__header {
    flex-shrink: 0;
  }
  .classic-tab__filler {
    flex-shrink: 0;
    min-width: 20px;
  }
  .classic-tab__content {
    padding: 12px 8px;
  }

  .button-row {
    justify-content: stretch;
  }
  .btn-primary {
    width: 100%;
    justify-content: center;
  }

  .actionbar {
    flex-wrap: wrap;
    height: auto;
    padding: 6px 4px;
    gap: 4px;
  }
  .actionbar__left,
  .actionbar__right {
    gap: 4px;
  }
  .actionbar__pagination {
    font-size: 11px;
  }
  .actionbar__icon-btn--view img,
  .actionbar__icon-btn--view svg {
    width: 32px;
  }

  .data-table {
    min-width: 800px;
  }
  .data-table-wrap {
    -webkit-overflow-scrolling: touch;
  }

  body {
    overflow: auto;
  }
  .app-shell {
    height: auto;
    min-height: 100vh;
  }

  .nav-bottom-sheet__panel {
    max-height: 80vh;
  }
  .nav-bottom-sheet__item {
    height: 48px;
    font-size: 14px;
    padding: 0 20px;
  }
}

/* ============================================================
   SMALL MOBILE — under 480px
   ============================================================ */
@media (max-width: 480px) {

  .topnavbar__icons .topnavbar__icon-btn:nth-child(3) {
    display: none;
  }

  .sidemenu.sidemenu--overlay-open {
    width: 100vw;
  }
  .sidemenu.sidemenu--collapsed {
    width: 100vw;
  }

  .classic-tab__header {
    padding: 8px 10px;
    font-size: 11px;
  }

  .nav-bottom-sheet__panel {
    border-radius: 12px 12px 0 0;
  }
}
```

---

## Required CSS Order

CSS files **must** be loaded in this exact order. Each file may depend on tokens or layout classes defined by the ones above it.

```html
<link rel="stylesheet" href="components/tokens.css" />
<link rel="stylesheet" href="components/layout.css" />
<link rel="stylesheet" href="components/topnavbar.css" />
<link rel="stylesheet" href="components/sidemenu.css" />
<link rel="stylesheet" href="components/header.css" />
<link rel="stylesheet" href="components/classic-tab.css" />
<link rel="stylesheet" href="components/table.css" />
<link rel="stylesheet" href="components/responsive.css" />
```

**Additional CSS (load after the above, order flexible):**

| CSS File | When to Include |
|----------|----------------|
| `line-tab.css` | Shell A (Dashboard) and Shell D (Split Panel) |
| `widget.css` | Any page with widget cards |
| `drawer.css` | Any page with side drawers |
| `form-input.css` | Any page with form inputs |
| `form-dropdown.css` | Any page with dropdown menus |
| `notification-banner.css` | Any page with toast notifications |
| `echarts-widget.css` | Auto-injected by `echarts-widget.js` — no manual link needed |

### Order rationale

1. **`tokens.css`** — defines all CSS custom properties; every other file reads from `:root`
2. **`layout.css`** — defines `.app-shell`, `.app-body`, `.main-content` structural containers
3. **`topnavbar.css`** — styles the fixed top navigation (78px)
4. **`sidemenu.css`** — styles the sidebar (240px), depends on token variables
5. **`header.css`** — styles the page header (40px)
6. **`classic-tab.css`** — styles classic tab containers and panels
7. **`table.css`** — styles data tables, action bars, and cell helpers
8. **`responsive.css`** — media query overrides for tablet/mobile; MUST load LAST to override all above

---

## Required JS Order

JavaScript files are loaded at the bottom of `<body>`, before the closing `</body>` tag.

```html
<!-- ECharts (only if page has charts/tiles) -->
<script src="components/lib/echarts.min.js"></script>
<script src="components/lib/echarts-liquidfill.min.js"></script>
<script src="components/echarts-elegant-theme.js"></script>
<script src="components/echarts-widget.js"></script>

<!-- Core component JS -->
<script src="components/topnavbar.js"></script>
<script src="components/sidemenu.js"></script>
<script src="components/classic-tab.js"></script>
<script src="components/table.js"></script>
```

**Additional JS (load after core, as needed):**

| JS File | When to Include |
|---------|----------------|
| `line-tab.js` | Shell A and Shell D pages |
| `drawer.js` | Any page with drawers |
| `form-input.js` | Any page with form inputs |
| `form-dropdown.js` | Any page with dropdown menus |
| `widget.js` | Any page with widget cards |
| `icon-engine.js` | Dynamically resolves icon paths |
| `notification-banner.js` | Toast notification API |

### Order rationale

1. **ECharts library** loads first (provides `echarts` global)
2. **Liquid fill plugin** extends ECharts (optional, for ring gauges)
3. **Elegant theme** registers the custom theme with ECharts
4. **ECharts widget** provides `ElegantEChart.*` API (depends on ECharts + theme)
5. **TopNavBar JS** initializes tab selection, hamburger toggle, priority+ overflow
6. **SideMenu JS** initializes sidebar collapse, search, active item highlighting
7. **Classic Tab JS** initializes tab switching within the content area
8. **Table JS** initializes checkboxes, sorting, row selection

---

## Assembly Notes

### Placeholder tokens in the template

| Token | Replace with |
|-------|-------------|
| `{{PAGE_TITLE}}` | The page title (appears in browser tab) |
| `{{ACTIVE_TAB}}` | Value for `data-active-tab` on `<header class="topnavbar">` |
| `{{ACTIVE_MENU_ITEM}}` | Value for `data-active-item` on `<aside class="sidemenu">` |

### Data attributes drive active states

- `data-active-tab="Settings"` on the `<header class="topnavbar">` element — `topnavbar.js` reads this on load and applies `--selected` class to the matching tab
- `data-active-item="Applications"` on the `<aside class="sidemenu">` element — `sidemenu.js` reads this and highlights the matching menu item

### Cache busting

Always bump `?v=N` on CSS/JS links when deploying to GitHub Pages. The template uses `?v=4` — increment for each deployment.

### Responsive behavior summary

| Breakpoint | Sidebar | TopNavBar | Navigation |
|------------|---------|-----------|------------|
| Desktop (>1024px) | Inline (240px, collapsible) | All tabs visible | Click tabs directly |
| Tablet (768–1024px) | Overlay (hamburger trigger) | Priority+ (overflow → "..." button) | Bottom sheet for hidden tabs |
| Mobile (<768px) | Full-height drawer (280px) | Compact row 1, priority+ row 2 | Bottom sheet for all tabs |
| Small Mobile (<480px) | Full-width drawer (100vw) | Hide 3rd icon, compact tabs | Bottom sheet |

### Scroll containment (CRITICAL)

The layout shell sets up the flex containment chain but does NOT define which element scrolls. Each App Shell designates its own scrollable container:

```
html, body → overflow: hidden
  └── .app-shell → height: 100vh; overflow: hidden
       └── .app-body → flex: 1; overflow: hidden
            └── [scroll container varies by shell]
```

Every ancestor between `.app-shell` and the designated scroll container must have `min-height: 0` and `overflow: hidden` for flex containment to work correctly.

### File naming convention

Output HTML files go directly in `figma-export/` — no subfolders:
- `figma-export/settings-applications.html` ✓
- `figma-export/settings-applications/index.html` ✗

Use lowercase + hyphens for filenames.

### Bottom sheet placement

The `nav-bottom-sheet` element is placed **outside** `div.app-shell` in the HTML structure. This is intentional — it's a fixed-position overlay that should not be affected by the app shell's flex layout.

### Sidebar expand button

The `sidemenu-expand` button (`#sidebarExpand`) is placed inside `.app-body` but outside `.main-content`. It becomes visible when the sidebar is collapsed on desktop, allowing the user to re-expand it.
