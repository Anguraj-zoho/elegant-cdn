# Elegant Agent — LLM Wiki

> **Single source of truth for AI-assisted UI generation.**
> The agent reads THIS file first, sets up the project folder, pulls COMPLETE components, assembles, then verifies.

---

## ⛔ MCP USERS: MANDATORY FIRST STEP

If you are using the **elegant-agent MCP server**, you MUST call **`setup_project(feature_name)`** BEFORE writing any HTML. This tool returns:
- Folder structure and copy commands
- Critical rules: **NO CDN links, NO inline CSS, NO inline `<svg>`, NO hand-drawn icons**
- Icon reference table mapping each purpose to its `<img src="assets/icons/...">` path
- CSS/JS link patterns (all LOCAL files)

**Skipping this step WILL produce broken output** (missing logo, missing icons, broken styling).

---

## Engine Workflow

```
 0. DETECT MODE → Read user request → pick Mode 1 (addon) / 2 (redesign) / 3 (specific screen)
    Mode 4 (strict Elegant compliance) is ALWAYS active — not a choice.
 1. READ this wiki → pick Shell (A/B/C/D or create new if none fits)
 1b. READ Components-Wiki/INDEX.md → identify which component MD files to pull
 2. SCREENSHOT SCAN — scan bulk screenshot library (see §Screenshot-Driven Generation below)
    Mode 1: scan to find what ALREADY EXISTS → insert new feature alongside
    Mode 2: scan ALL screenshots in tab → redesign every screen
    Mode 3: scan to find the SPECIFIC screen → replicate or find closest reference
 3. CREATE PROJECT FOLDER under figma-export/{feature-name}/
 4. COPY assets/ and components/ folders into the project folder
 5. CREATE SINGLE HTML covering complete feature (all pages, tabs, drawers in ONE file)
 6. PULL components from Components-Wiki — read each component's .md file,
    copy COMPLETE HTML blocks (CSS + HTML + ALL icons via <img src>)
    NEVER hand-code HTML for components that have a wiki file.
 7. ASSEMBLE page by slotting component blocks into Shell (extend shell with new elements as needed)
 8. ADAPT data/content for the feature (use screenshot as pixel reference)
 9. GENERATE ALL INTERACTIONS — scan [Interaction] screenshots for same tab → recreate
    ALL popups/modals/dialogs as Elegant Drawers (see §Popup = Drawer Rule below)
10. INNOVATE if needed — create new components/layouts using Elegant tokens (Mode 4 enforced)
11. VERIFY against the checklist
12. If new feature (Mode 1) → insert as addon into existing IA map (other tabs unclickable)
13. DELIVER — single index.html + full interactions + animations + clean Elegant theme
```

---

## Operating Modes — Pick One Before Starting

The agent operates in one of 4 modes depending on what the user asks. **Detect the mode from the user's request, then follow its workflow exactly.**

### Mode 1: New Feature Addon (Insert New Feature Into Existing Product)

**Trigger:** User says "build me [new feature]", "add [capability] to Log360", "create SOAR", etc.

**What happens:**
1. Agent scans bulk screenshots of the tab(s) the feature touches
2. Identifies what features ALREADY EXIST in each tab (from `[Main]` screenshots)
3. Identifies what line-tabs, sidemenu items, sub-pages are already present
4. INSERTS the new feature alongside existing content — never replaces it
5. Existing features shown as `--disabled` (visible but unclickable) in line-tab and sidemenu
6. New feature tabs/items are clickable and fully functional
7. TopNavBar: target tab `--selected`, ALL other tabs `--disabled`

**Shell selection:** Pick shell based on which tab the feature lives under (Shell A for Dashboard, B for Settings, C for Reports, D for Detail). If the feature spans multiple tabs, build separate pages per tab with correct shell each.

**Innovation allowed:** If the new feature needs UI patterns that don't exist in predefined components, agent creates new components using Elegant tokens. Agent picks an existing shell as base, then extends it with new inputs, buttons, layouts as needed. If no existing shell fits at all, agent creates a completely new shell — but strictly using Elegant color tokens, 8-point grid, Zoho Puvi font, 4px card radius, 2px input radius.

**Competitor analysis:** Agent may search the web for how competitors (Splunk, Sentinel, QRadar, Elastic) implement the same feature. Use competitor UI as inspiration for layout decisions, but NEVER copy their styling — always build with Elegant components.

---

### Mode 2: Redesign Existing Tab (Old Theme → Elegant Theme)

**Trigger:** User says "redesign the Reports tab", "convert Dashboard to Elegant", "rebuild Settings in new theme", etc.

**What happens:**
1. Agent scans ALL screenshots in the target tab folder (both `[Main]` and `[Interaction]`)
2. Reads EVERY screenshot to understand the complete tab — all sub-pages, all sidemenu items, all interactions
3. Creates a complete map of the existing tab: what pages exist, what charts/tables/forms are on each page, what drawers/modals/dropdowns exist
4. Redesigns the ENTIRE tab top-to-bottom using Elegant components:
   - Every `[Main]` screenshot becomes an Elegant page (correct shell, predefined components, ECharts)
   - Every `[Interaction]` screenshot becomes an Elegant drawer/modal/dropdown
   - Sidemenu items replicated from sidemenu screenshots
   - Charts converted to matching `ElegantEChart.*()` types
   - Tables converted to `.data-table` with `<colgroup>`
   - Forms converted to `form-input` + `form-dropdown` components
5. Delivers ONE master `index.html` containing ALL pages as line-tab panels with ALL interactions

**Full coverage required:** Every screen visible in the screenshots must appear in the output. No screen is skipped.

**Enhancement allowed:** Agent may add extra features, better layouts, additional interactions that improve the UX beyond what the old theme had — but the baseline from screenshots must be 100% covered.

---

### Mode 3: Generate Specific Screen (Report / Dashboard / Any Page)

**Trigger:** User says "create the Logon Reports page", "build me the Windows Events report", "generate the Device Management settings page", etc.

**What happens:**
1. Agent searches the bulk screenshot folder for the exact screen by name
2. **If screenshot exists:** Read it → replicate every element in Elegant theme (see Screenshot-Driven Generation §STEP 2)
3. **If screenshot doesn't exist:** Find closest similar screenshot → use as layout template → adapt data/columns/labels (see Screenshot-Driven Generation §STEP 3)
4. Agent scans ALL `[Interaction]` screenshots for the same tab → recreates every dropdown, modal, drawer, filter, export dialog
5. Agent places the new screen correctly in the sidemenu (verified from `Sidemenu * Expanded.png` screenshots)
6. Delivers functional HTML with full interactions (clickable drawers, working pagination placeholders, filter dropdowns)

**Data generation:** Agent generates realistic cybersecurity data for tables, charts, stat cards based on the feature context. May hallucinate usernames, IPs, timestamps, counts — never structure.

---

### Mode 4: Strict Elegant Compliance (100% Design System Adherence)

**This is NOT a separate mode — it is a HARD CONSTRAINT that applies to ALL modes.**

Every output in Mode 1, 2, or 3 MUST satisfy:

| Constraint | Enforcement |
|-----------|-------------|
| Color tokens | 100% from `tokens.css` — never hardcode hex outside token palette |
| Font | `Zoho Puvi` only — never Inter/Roboto/Arial |
| Spacing | 8-point grid (4/8/12/16/20/24) — max 24px hard ceiling |
| Border radius | 4px cards, 2px inputs — no exceptions |
| Icons | From `assets/icons/` (195 SVGs) — 14×14 for actions, never foreign icon libraries |
| Charts | `ElegantEChart.*()` API — never raw `echarts.init()` or Chart.js/D3 |
| Forms | Elegant `form-input` + `form-dropdown` — never native `<select>` or raw `<input>` |
| Tables | `.data-table` with `<colgroup>` — never Bootstrap/Material tables |
| Frameworks | ZERO foreign CSS/JS — no Bootstrap, Tailwind, Material, Font Awesome |
| Animations | Every widget/tile/card animated with `anim-fade-in-up` + staggered delays |
| Refresh | Every widget toolbar refresh icon functional (re-renders on click) |
| New components | If AI creates new component → MUST use Elegant tokens, BEM naming, 8-point grid, Zoho Puvi, entry animations. Save CSS/JS to project `components/` folder. |

**Even AI-innovated components are 100% Elegant.** When the agent creates a new layout, chart wrapper, status pipeline, kanban board, or any novel component — it uses the exact same design tokens, spacing system, and visual language as predefined components. The user should not be able to tell which components are predefined vs. AI-created.

---

### Delivery Standard (ALL Modes)

Every output MUST include:
1. **Complete HTML** — single `index.html` with all pages as line-tab panels, all drawers/modals at bottom
2. **Full interactions** — every dropdown, modal, drawer, filter, export from `[Interaction]` screenshots recreated
3. **Feature document** — the HTML itself serves as the usability document: every tab is navigable, every drawer opens, every button has a target
4. **Top-to-bottom coverage** — multiple screens, sidemenu navigation, drawers, forms, tables, charts — not just one page
5. **Animations everywhere** — fade-in-up on every widget, tile, card with staggered delays
6. **Clean Elegant theme** — zero foreign CSS, zero hardcoded colors, zero non-Puvi fonts

### Shell Adaptability

The agent treats shells as **starting templates, not rigid constraints:**
- Pick the closest shell (A/B/C/D) as a base
- Add new inputs, buttons, toolbar items, action bars as the feature requires
- Extend the shell's content area with new component patterns if needed
- If no shell fits at all (e.g., a completely novel page like a drag-and-drop workflow editor), create a new shell using the same Elegant structural principles:
  - `div.app-shell` (height:100vh, flex:column)
  - `header.topnavbar` (h:78px)
  - Content area with proper flex containment and scroll model
  - All spacing from 8-point grid, all colors from tokens

### Competitor Hybrid Mode

When the feature is completely new (no screenshots, no similar existing pages):
1. Agent searches the web for how competitors implement the same feature
2. Analyzes competitor UI screenshots for layout inspiration (widget placement, flow, information hierarchy)
3. Picks existing Elegant components from the rack that match competitor UI patterns
4. Creates new components for patterns that don't exist — strictly using Elegant tokens
5. Assembles a hybrid: predefined blocks + AI-created blocks, all unified under Elegant theme
6. Result looks like it was always part of Log360 — never like a foreign UI transplant

---

## Project Folder Setup (MANDATORY FIRST STEP)

Before writing any HTML, set up the project folder:

```
figma-export/{feature-name}/
├── index.html                    ← SINGLE HTML file (complete feature)
├── assets/
│   ├── fonts/                    ← Copy from data/assets/fonts/ (4× Zoho Puvi .woff2)
│   └── icons/                    ← Copy from data/assets/icons/ (195× .svg)
└── components/
    ├── tokens.css                ← Copy ALL .css files from data/components/
    ├── layout.css
    ├── topnavbar.css
    ├── sidemenu.css
    ├── line-tab.css
    ├── header.css
    ├── classic-tab.css
    ├── widget.css
    ├── table.css
    ├── drawer.css
    ├── form-input.css
    ├── form-dropdown.css
    ├── responsive.css
    ├── notification-banner.css
    ├── echarts-widget.css
    ├── ... (all other .css)
    ├── topnavbar.js              ← Copy ALL .js files from data/components/
    ├── sidemenu.js
    ├── line-tab.js
    ├── classic-tab.js
    ├── table.js
    ├── drawer.js
    ├── form-input.js
    ├── form-dropdown.js
    ├── echarts-elegant-theme.js
    ├── echarts-widget.js         ← Auto-injects echarts-widget.css, tile widget lives here
    ├── icon-engine.js
    ├── notification-banner.js
    ├── widget.js
    ├── ... (all other .js)
    └── lib/
        ├── echarts.min.js
        ├── echarts-liquidfill.min.js
        ├── world-map-register.js
        └── world.json
```

### Copy Commands (run before writing HTML)
```bash
mkdir -p figma-export/{feature}/assets figma-export/{feature}/components
cp -r data/assets/fonts data/assets/icons figma-export/{feature}/assets/
cp -r data/components/*.css data/components/*.js figma-export/{feature}/components/
cp -r data/components/lib figma-export/{feature}/components/
```

### Why This Matters
- Component HTML uses `<img src="assets/icons/icon-name.svg">` — icons MUST exist at that path
- `echarts-widget.js` auto-injects `echarts-widget.css` relative to its script location
- Tile widgets use `iconBase: './assets/icons/'` to load severity/trend icons
- If assets aren't copied, icons show as broken images and tiles render without decorations

---

## Single HTML Rule (ONE File Per Feature)

### The Rule
Create ONE `index.html` that contains the COMPLETE feature:
- All sub-pages as `line-tab__content` panels (hidden/shown via JS)
- All drawers as `drawer-backdrop` + `drawer` blocks at bottom of body
- All tab views as switchable content areas
- Multi-page navigation via line-tab JS (show/hide panels), NOT separate HTML files

### Why
- Avoids broken cross-page navigation
- All components share the same CSS/JS loading
- Drawers can be triggered from any page view
- Simpler deployment — one file, one folder

### Structure Pattern
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Feature Name — Log360 Cloud</title>
  <!-- Fonts -->
  <link rel="stylesheet" href="components/tokens.css">
  <!-- ALL component CSS files needed -->
  <link rel="stylesheet" href="components/layout.css">
  <link rel="stylesheet" href="components/topnavbar.css">
  <!-- ... every CSS file from the wiki's required list ... -->
  <style>
    /* Page-specific overrides and animations ONLY */
  </style>
</head>
<body>
  <div class="app-shell">
    <!-- TopNavBar (COMPLETE with all icons) -->
    <header class="topnavbar" data-active-tab="Security">...</header>

    <!-- Line Tab (navigation between feature sub-pages) -->
    <div class="line-tab">
      <div class="line-tab__headers">
        <button class="line-tab__header line-tab__header--selected" data-tab="overview">Overview</button>
        <button class="line-tab__header" data-tab="settings">Settings</button>
      </div>
    </div>

    <!-- Sub-page 1: visible by default -->
    <div class="line-tab__body">
      <div class="line-tab__content line-tab__content--active" data-tab-content="overview">
        <!-- Dashboard shell content here -->
      </div>
      <div class="line-tab__content" data-tab-content="settings">
        <!-- Settings shell content here (with sidemenu if needed) -->
      </div>
    </div>
  </div>

  <!-- All drawers go here, outside app-shell -->
  <div class="drawer-backdrop" data-drawer="detail">...</div>
  <div class="drawer drawer--md" id="detailDrawer">...</div>

  <!-- Scripts (load order matters) -->
  <script src="components/lib/echarts.min.js"></script>
  <script src="components/lib/echarts-liquidfill.min.js"></script>
  <script src="components/echarts-elegant-theme.js"></script>
  <script src="components/echarts-widget.js"></script>
  <script src="components/topnavbar.js"></script>
  <script src="components/line-tab.js"></script>
  <!-- ... all other JS ... -->
</body>
</html>
```

---

## App Shells (Pick One)

### Shell A — Dashboard (Full Width, No Sidemenu)

```
div.app-shell (height:100vh; flex:column)
 ├── header.topnavbar (h:78px = row1:44px + row2:34px)
 ├── div.line-tab (h:40px; flex; border-bottom:1px #E9E9E9)
 │    ├── div.line-tab__headers (flex:1; gap:12px)
 │    │    └── button.line-tab__header × N
 │    └── div.line-tab__actions (flex-shrink:0; gap:8px; margin-left:auto)
 │         ├── div.cal-input (w:280px; h:26px; border:1px #C4C4C4)
 │         │    ├── span.cal-input__text (flex:1; font:12px; pad-left:12px)
 │         │    └── span.cal-input__icon (w:26px; h:26px; bg:#F5F5F5; border-left:1px)
 │         ├── button.line-tab__action-icon-btn (24×24) — refresh
 │         ├── button.line-tab__action-icon-btn (24×24) — expand
 │         ├── div.line-tab__action-separator (1×100%; bg:#E9E9E9)
 │         └── button.line-tab__action-settings (40×40px)
 ├── div.toolbar (h:36px; flex; pad:0 16px; gap:12px; border-bottom:1px #E9E9E9) [OPTIONAL]
 │    ├── button.toolbar__btn.toolbar__btn--active (h:24px; bg:#E8F0FE; color:#2C66DD)
 │    ├── div.toolbar__separator (1×16px; bg:#DCDCDC)
 │    ├── button.toolbar__btn × N
 │    ├── div.toolbar__spacer (flex:1)
 │    └── button.toolbar__btn × N (refresh, filter icons)
 └── div.dash (bg:#F5F5F5; pad:16px; flex:1; overflow-y:auto)
      └── div.dash__grid (flex:column; gap:4px)
           ├── div.dash__row.stat-row (flex; gap:4px) — stat cards (max 4, icon-right)
           ├── div.tile-grid (grid:repeat(3,1fr); gap:4px) — tiles (max 3, max 1 row)
           ├── div.dash__row (flex; gap:4px) — hybrid widgets: ECharts + predefined JS (max 3)
           └── div.dash__row (flex; gap:4px) — hybrid widgets: alertList + chart + table (max 3)
```

**CSS files required:** tokens, layout, topnavbar, line-tab, widget, table, responsive, notification-banner
**JS files required:** topnavbar, line-tab, widget, notification-banner, icon-engine, echarts libs
**Scroll model:** ONLY `.dash` scrolls (overflow-y:auto). Everything above is fixed.
**Used by:** Dashboard tab, Threat Hub, SOAR Overview, Analytics

---

### Shell B — Settings (Sidemenu + Classic Tab + Table)

```
div.app-shell (height:100vh; flex:column)
 ├── header.topnavbar (h:78px)
 ├── div.app-body (flex:1; flex:row; overflow:hidden)
 │    ├── aside.sidemenu (w:240px; flex:column; border-right:1px #E9E9E9)
 │    │    ├── div.sidemenu__search-wrap (pad:8px 12px)
 │    │    ├── div.sidemenu__scroll (flex:1; overflow-y:auto)
 │    │    │    └── div.sidemenu__section × N
 │    │    │         ├── button.sidemenu__l1 (h:32px; pad-left:16px)
 │    │    │         └── a.sidemenu__item (h:32px; pad-left:40px)
 │    │    └── div.sidemenu__bottom (h:32px; border-top:1px)
 │    └── main.main-content (flex:1; pad:0 16px; flex:column)
 │         ├── div.page-header (h:40px; flex; gap:8px; border-bottom:1px)
 │         │    ├── h1.page-header__title (font:14px/600)
 │         │    └── button.page-header__help (14×14 icon)
 │         └── div.classic-tab (pad-top:16px)
 │              ├── div.classic-tab__headers (h:32px; flex)
 │              │    ├── button.classic-tab__header × N (pad:9px 16px; font:12px)
 │              │    └── div.classic-tab__filler (flex:1)
 │              └── div.classic-tab__body (bg:#fff; border:1px no-top; pad:16px)
 │                   └── [CONTENT: button-row, actionbar, data-table]
 └── [nav-bottom-sheet for mobile]
```

**CSS files required:** tokens, layout, topnavbar, sidemenu, header, classic-tab, table, form-input, form-dropdown, responsive, notification-banner
**JS files required:** topnavbar, sidemenu, classic-tab, table, form-dropdown, form-input, notification-banner, icon-engine
**Scroll model:** `.sidemenu__scroll` scrolls sidebar. `.classic-tab__body` or table-scroll-area scrolls content.
**Used by:** Settings tab, Admin pages

---

### Shell C — Reports (Sidemenu + Chart + Table)

```
div.app-shell (height:100vh; flex:column)
 ├── header.topnavbar (h:78px; data-active-tab="Reports")
 ├── div.reports-quicklink [OPTIONAL]
 │    └── div.line-tab.line-tab--quicklink (h:32px)
 ├── div.app-body (flex:1; flex:row; overflow:hidden)
 │    ├── aside.sidemenu.sidemenu--type2 (w:240px)
 │    ├── button.sidemenu-expand (24×40; fixed left)
 │    └── main.main-content (flex:1; flex:column; overflow:hidden)
 │         ├── div.page-header (h:40px; + page-header__actions)
 │         ├── div.reports-input-row (filter inputs row)
 │         ├── div.classic-tab [chart only inside — Type C rule]
 │         │    └── div.rpt-chart-area + rpt-chart-floater
 │         └── div.table-scroll-area (flex:1; overflow-y:auto)
 │              ├── div.actionbar (sticky top:0; z-index:3; h:36px)
 │              └── div.data-table-wrap
 │                   └── table.data-table (table-layout:fixed; width:100%)
 └── [drawers for row detail]
```

**CSS files required:** tokens, layout, topnavbar, sidemenu, header, classic-tab, table, rpt-chart-floater, form-input, drawer, responsive, notification-banner
**Scroll model:** ONLY `.table-scroll-area` scrolls. Actionbar + thead are sticky.
**Used by:** Reports tab, Compliance pages

**Critical Shell C assembly rules (common failure points):**
1. `.reports-quicklink` is a **direct child of `.app-shell`** (sibling of `topnavbar` and `app-body`). NEVER put it inside `main-content`.
2. `.classic-tab` contains **ONLY the chart area** (`.rpt-chart-area` + `rpt-chart-floater`). The classic-tab sits at its natural height with `flex-shrink: 0`.
3. `.table-scroll-area` is a **SIBLING of `.classic-tab`**, not a child. It takes `flex: 1; overflow-y: auto; min-height: 0;` and is the ONLY scrolling element.
4. The header action buttons (Export As, Export History, More, etc.) each have a dropdown panel — **the panel is a sibling of the `<button>`, not a child** (see HTML Validity Rules below). Wrap button+panel in `<div class="ph-action-wrap" style="position:relative;">`.
5. Every ancestor from `.app-shell` down to `.table-scroll-area` needs `min-height:0; overflow:hidden` and proper flex chain — missing any one breaks the scroll and the chart/table "disappear".

---

### Shell D — Split Panel (Detail + AI/Properties)

```
div.app-shell (height:100vh; flex:column)
 ├── header.topnavbar (h:78px)
 ├── div.app-body (flex:1; overflow:hidden)
 │    └── main.main-content (flex:1; flex:column; overflow:hidden)
 │         ├── div.line-tab (h:40px)
 │         └── div.line-tab__body (flex:1; flex:column; min-height:0)
 │              └── div.line-tab__content--active (flex:1; flex:column)
 │                   └── div.split-layout (flex:row; flex:1; min-height:0)
 │                        ├── div.left-panel (flex:1; overflow-y:auto; pad:0 16px 24px)
 │                        │    ├── div.header-bar (flex; gap:12px; h:48px; border-bottom:1px)
 │                        │    └── [widgets, tables, timeline]
 │                        └── div.right-panel (w:380px; border-left:1px; flex:column)
 │                             ├── div.panel-header (pad:12px 16px)
 │                             ├── div.panel-body (flex:1; overflow-y:auto; pad:16px)
 │                             └── div.panel-footer (pad:12px 16px; border-top:1px)
```

**CSS files required:** tokens, layout, topnavbar, line-tab, widget, table, responsive
**Scroll model:** left-panel and right-panel scroll independently. line-tab__body needs flex:1; min-height:0.
**Used by:** AI Investigation, Incident Detail, Playbook Editor

---

## Components-Wiki — Self-Contained Building Blocks (PRIMARY SOURCE)

### What is Components-Wiki?

`data/Components-Wiki/` contains one `.md` file per component with COMPLETE HTML + CSS + JS + icon lists ready to copy-paste. **This is the PRIMARY source for pulling components.** NEVER hand-code component HTML when a wiki file exists.

### Master Index

Read `data/Components-Wiki/INDEX.md` first — it lists every file and maps page types to required components.

### Component Lookup Table

| Need | Read This Wiki File |
|------|-------------------|
| **Shell & Layout** | |
| App Shell selection (A/B/C/D) | `Components-Wiki/app_shells.md` |
| Base HTML skeleton | `Components-Wiki/layout_shell.md` |
| CSS design tokens | `Components-Wiki/design_tokens.md` |
| **Navigation** | |
| TopNavBar | `Components-Wiki/topnavbar.md` |
| Sidemenu (Settings) | `Components-Wiki/sidemenu_variant1_settings.md` |
| Sidemenu (Reports) | `Components-Wiki/sidemenu_variant2_reports.md` |
| Line Tab (4 variants) | `Components-Wiki/line_tab.md` |
| Classic Tab | `Components-Wiki/classic_tab.md` |
| **Content** | |
| Page Header (3 variants) | `Components-Wiki/header.md` |
| Action Bar (8 variants) | `Components-Wiki/actionbar.md` |
| Data Table Type 1 | `Components-Wiki/data_table_type1.md` |
| Data Table Type 2 | `Components-Wiki/data_table_type2.md` |
| Widget Card (10 patterns) | `Components-Wiki/widget.md` |
| Stat Card / Tile (10 types) | `Components-Wiki/stat_card.md` or `tile_widgets.md` |
| Buttons | `Components-Wiki/button-row.md` |
| **Charts** | |
| All ECharts (bar, line, donut, etc.) | `Components-Wiki/predefined_charts.md` |
| Tile Widgets JS API | `Components-Wiki/tile_widgets.md` |
| ECharts Widget Engine | `Components-Wiki/echarts-widget.md` |
| ECharts Theme | `Components-Wiki/echarts-elegant-theme.md` |
| Geo Map Widget | `Components-Wiki/predefined-chart-geo-widget.md` |
| Radar Chart | `Components-Wiki/predefined-chart-radar.md` |
| **Overlays** | |
| Drawer (all variants) | `Components-Wiki/drawer.md` |
| Form Inputs | `Components-Wiki/form_input.md` |
| Form Dropdowns (6 variants) | `Components-Wiki/form_dropdown.md` |
| **Utilities** | |
| Icon Catalog | `Components-Wiki/icons.md` |
| Icon Rendering Engine | `Components-Wiki/icon-engine.md` |
| Report Chart Floater | `Components-Wiki/rpt-chart-floater.md` |

### Agent Assembly Workflow (Using Components-Wiki)

```
1. Read Components-Wiki/app_shells.md → pick Shell A/B/C/D
2. Read Components-Wiki/layout_shell.md → copy base HTML template
3. For each needed component:
   a. Find its .md file from the lookup table above
   b. Read the .md file
   c. Copy the "Complete HTML" block verbatim
   d. Slot it into the correct position in the shell
4. Assemble all blocks into the shell
5. Adapt labels, data, content for the specific feature
6. ONLY if a component does NOT exist in the wiki →
   create a new one using Components-Wiki/design_tokens.md tokens
```

### Quick Lookup: "I need to build a..."

| Page Type | Shell | Must-Read Files |
|-----------|-------|-----------------|
| **Dashboard tab** | Shell A | `app_shells.md`, `topnavbar.md`, `line_tab.md`, `widget.md`, `stat_card.md`, `predefined_charts.md` |
| **Settings page** | Shell B | `app_shells.md`, `topnavbar.md`, `sidemenu_variant1_settings.md`, `header.md`, `classic_tab.md`, `data_table_type1.md`, `actionbar.md` |
| **Reports page** | Shell C | `app_shells.md`, `topnavbar.md`, `sidemenu_variant2_reports.md`, `header.md`, `data_table_type1.md`, `actionbar.md` |
| **Form/Drawer** | Any | `drawer.md`, `form_input.md`, `form_dropdown.md` |
| **Detail/Split** | Shell D | `app_shells.md`, `topnavbar.md`, `line_tab.md`, `widget.md` |

---

## Component Rack (Pull COMPLETE Blocks — CSS + HTML + Icons)

### How to Pull Components — NEVER Skip Icons

1. **PRIMARY:** Read the component's `.md` file from `data/Components-Wiki/` — copy the Complete HTML block
2. Link the CSS file in `<head>` (+ JS file before `</body>`)
3. **NEVER strip icons from the HTML** — if the component has `<img src="assets/icons/icon-search-settings.svg">`, keep it
4. **NEVER replace `<img>` icons with empty placeholders** — the SVG files exist in the copied assets folder
5. Verify ALL icon paths resolve: HTML uses `assets/icons/` (relative to the HTML file location)
6. Modify labels/data AFTER assembly — not the icon structure

### Common Mistake: Hand-Coding Instead of Pulling
**NEVER read only the CSS/JS and then hallucinate the HTML structure.** The wiki files exist specifically to prevent this. If you find yourself writing `<div class="stat-card">` or `<div class="pipeline">` from scratch — STOP. Go read the wiki `.md` file and copy the pre-built block.

### Component: TopNavBar
- **CSS:** `topnavbar.css` | **JS:** `topnavbar.js` | **HTML ref:** `topnavbar.html`
- **Height:** 78px (row1: 44px + row2: 34px)
- **Tab states:** `--selected`, `--unselected`, `--disabled`
- **For addon features:** set target tab to `--selected`, ALL others to `--disabled`
- **Tabs (11, in order):** Home, Reports, Compliance, Search, Security, Alerts, Cloud Protection, Settings, LogMe, Support, Top Blocked Countries
- **Icons bundled (9 SVGs — MUST ALL be present):**
  - `icon-menu.svg` (hamburger)
  - `logo-log360.svg` (logo)
  - `icon-notification.svg` (×2, notification + alert bells)
  - `icon-question.svg` (help)
  - `icon-user-avatar.svg` (avatar)
  - `icon-apps-grid.svg` (grid menu)
  - `icon-ab-more.svg` (overflow tabs)
  - `icon-search.svg` (search input)
  - `icon-plus.svg` (add button)

### Component: SideMenu
- **CSS:** `sidemenu.css` | **JS:** `sidemenu.js` | **HTML ref:** `sidemenu.html`
- **Width:** 240px (desktop), 280px (mobile overlay), 0px (collapsed)
- **Variants:** Default (settings tree), Type 2 (`sidemenu--type2` for reports)
- **Icons bundled (7 SVGs):**
  - `icon-search-settings.svg` (search input)
  - `icon-sm-chevron-right.svg` (×3, L1 expand arrows)
  - `icon-troubleshoot.svg`, `icon-admin-settings.svg`, `icon-system-settings.svg` (section icons)
  - `icon-slider-close.svg` (collapse button)

### Component: Line Tab
- **CSS:** `line-tab.css` | **JS:** `line-tab.js` | **HTML ref:** `line-tab.html`
- **Height:** 40px (default), 32px (quicklink variant)
- **Variants:** Plain text, Icon+text (`--with-icon`), QuickLink (`--quicklink`)
- **Actions area:** cal-input + icon-btns + separator + settings
- **CRITICAL:** cal-input HTML order = `span.cal-input__text` THEN `span.cal-input__icon`

### Component: Classic Tab
- **CSS:** `classic-tab.css` | **JS:** `classic-tab.js` | **HTML ref:** `classic-tab.html`
- **Header height:** 32px | **Tab padding:** 9px 16px
- **Use for:** Settings forms, report chart switcher ONLY. NOT for dashboard sub-views.
- **Body must hug content:** The `.classic-tab__body` should expand to fill available space and its table should fill it:
  ```css
  .classic-tab { flex: 1; display: flex; flex-direction: column; min-height: 0; }
  .classic-tab__body { flex: 1; display: flex; flex-direction: column; min-height: 0; overflow: hidden; }
  .classic-tab__content { flex: 1; display: flex; flex-direction: column; min-height: 0; }
  ```
- **Table inside classic-tab:** Wrap in `.table-scroll-area` for proper scroll containment

### Component: Widget
- **CSS:** `widget.css` | **HTML ref:** `widget.html`
- **Padding:** 24px | **Border:** 1px #E9E9E9 | **Radius:** 4px
- **Structure:** `widget__header` (title + toolbar) + `widget__body`
- **Toolbar buttons:** `widget__toolbar-btn` with 14×14 inline SVG icons

### Component: Data Table
- **CSS:** `table.css` | **JS:** `table.js` | **HTML ref:** `table.html`
- **ActionBar height:** 36px | **Header row:** 32px | **Body rows:** 40px
- **Cell helpers:** `.cell-actions` (flex, gap:8px, icons in 24×24 hit area, icon itself 14×14), `.cell-checkbox` (48px col)
- **Scroll pattern:** `.table-scroll-area` { flex:1; overflow-y:auto } — actionbar sticky top:0, thead sticky top:36px
- **Containment chain:** html,body overflow:hidden → app-shell h:100vh → app-body overflow:hidden → table-scroll-area is ONLY scroll
- **Equal column spacing:** Use `<colgroup>` to define column widths. NEVER let columns auto-size
  ```html
  <colgroup>
    <col style="width:48px">    <!-- checkbox -->
    <col style="width:20%">     <!-- name -->
    <col style="width:15%">     <!-- type -->
    <col style="width:15%">     <!-- category -->
    <col style="width:10%">     <!-- severity -->
    <col style="width:10%">     <!-- status -->
    <col style="width:15%">     <!-- date -->
    <col style="width:100px">   <!-- actions -->
  </colgroup>
  ```
- **Action column icons:** Cell-actions container is 24×24 per icon hit area, but the `<img>` inside is 14×14:
  ```html
  <td>
    <div class="cell-actions">
      <img src="assets/icons/icon-action-edit.svg" alt="Edit" style="width:14px;height:14px;">
      <img src="assets/icons/icon-action-delete.svg" alt="Delete" style="width:14px;height:14px;">
      <img src="assets/icons/icon-action-more.svg" alt="More" style="width:14px;height:14px;">
    </div>
  </td>
  ```
- **Status column icons:** Use `cell-status` with 14×14 status SVGs:
  ```html
  <td>
    <div class="cell-status">
      <img src="assets/icons/icon-status-success.svg" alt="" style="width:14px;height:14px;">
      <span>Enabled</span>
    </div>
  </td>
  ```
- **Checkbox column:** Uses `icon-checkbox.svg` / `icon-checkbox-checked.svg` — `table.js` may replace with inline SVG at runtime

### Component: Drawer
- **CSS:** `drawer.css` | **JS:** `drawer.js` | **HTML ref:** `drawer.html`
- **Wiki:** `Components-Wiki/drawer.md` (COMPLETE HTML + CSS + JS + all variants)
- **Widths:** sm:480, md:600, lg:800, xl:1000, auto:fit-content
- **Structure:** backdrop + panel (drawer__main: top:40px + body:scrollable + footer:60px) + optional rhs:30px
- **Footer:** ONLY `drawer__btn-save` and `drawer__btn-cancel` — no custom button classes
- **Open/close:** JS toggles `.drawer--open` + `.drawer-backdrop--active`

### Popup = Drawer Rule — ALL Popups/Modals MUST Use Drawer

**HARD RULE**: Every popup, modal, dialog, or overlay panel MUST use the predefined **Drawer** component. This applies to ALL pages (reports, settings, dashboards, etc.) and includes:
- "Customize View" dialogs (sorting, limits, widget type, chart type selection)
- "Export As" panels
- "Schedule Reports" forms
- "Edit Report" forms
- "Select Columns" pickers
- Filter configuration panels
- Settings forms that overlay the page
- Any popup shown in old-theme screenshots (e.g., centered modals with title bar + close button)

**When redesigning old-theme screenshots** that show a centered modal/popup (like "Customize View" with Sorting and Limits, Widget Type, Chart Type), **convert them to an Elegant Drawer** sliding in from the right. Map the modal's content into the drawer's body using `Components-Wiki/form_input.md` and `Components-Wiki/form_dropdown.md` for form fields.

**Drawer variant selection:**
- Simple forms (2–5 fields) → `.drawer--sm` (480px)
- Medium forms / settings → `.drawer--md` (600px)
- Tables / large content → `.drawer--lg` (800px)
- Card grid pickers → `.drawer--grid4/5/6`

**NEVER build a custom `<div class="modal">` or `<div class="popup">`.** Always use `Components-Wiki/drawer.md`.

### Component: ActionBar
- **CSS:** (in table.css) | **HTML ref:** `actionbar.html`
- **Height:** 36px | **Pattern:** left (search, separator, filter) + right (pagination, nav, refresh)

### Component: Tile Widgets — JAVASCRIPT API (Not CSS-Only)

**THIS IS THE #1 MISTAKE:** Hand-coding tiles as `<div class="sc">` with custom CSS.
Tile widgets are rendered by `ElegantEChart.tileWidget()` JavaScript function.
The JS generates ALL the DOM, icons, sparklines, severity badges, ring charts, etc.
You provide an empty `<div id>` and data — the JS does the rest.

- **JS:** `echarts-widget.js` (MUST be loaded — this is where tiles live)
- **CSS:** `echarts-widget.css` (auto-injected by the JS — contains 82 `.ti-*` class rules)
- **Full ref:** `data/components/predefined-charts/tile-widgets.html` (all 10 types, copy-paste ready)

**How to use tiles (3 steps):**
```html
<!-- Step 1: Grid wrapper in your HTML -->
<div class="tile-grid" style="grid-template-columns: repeat(3, 1fr);">
  <div class="tile-card tile-card--wide">
    <div class="card__header"><span class="card__title">Active Alerts</span></div>
    <div id="tile-1"></div>  <!-- Empty container — JS fills this -->
  </div>
  <div class="tile-card">
    <div class="card__header"><span class="card__title">Total Events</span></div>
    <div id="tile-2"></div>
  </div>
</div>

<!-- Step 2: Load scripts (at bottom of body) -->
<script src="components/lib/echarts.min.js"></script>
<script src="components/echarts-elegant-theme.js"></script>
<script src="components/echarts-widget.js"></script>

<!-- Step 3: Initialize tiles with data -->
<script>
ElegantEChart.tileWidget('tile-1', {
  value: '10,000', trend: '+7.1%',
  severity: [
    { sev: 'critical', value: 640 },
    { sev: 'trouble', value: 220 },
    { sev: 'attention', value: 68 }
  ],
  slaViolated: 25, mutedAlerts: 25
}, { type: 1 });

ElegantEChart.tileWidget('tile-2', {
  value: '12,847', trend: '+14.6%', sparkColor: '#2C66DD'
}, { type: 6 });
</script>
```

**10 tile types available:**
| Type | Layout | Use Case |
|------|--------|----------|
| 1 | Wide: value + sparkline + severity row + SLA/muted meta | Main KPI (Active Alerts) |
| 2 | Wide: colored bar segments + values per segment | Priority Score breakdown |
| 3 | Wide: value + sparkline + severity columns | Active Incidents |
| 4 | Half: duration (hrs/min) + clock icon | MTTR |
| 5 | Half: value + segment bar + hourglass icon | SLA Violated |
| 6 | Half: value + trend + sparkline + bell icon | Total Count with trend |
| 7 | Half: duration + trend + subtitle + sparkline | MTTI |
| 8 | Half: value + progress bar + severity breakdown | Investigations |
| 9 | Half: value + ring donut + status cards | Created Incidents |
| 10 | Half: value + mini donut + legend | Activity Distribution |

**Icons loaded by tile JS (MUST exist in assets/icons/):**
`icon-metric-trend-up.svg`, `icon-tile-sev-critical.svg`, `icon-tile-sev-trouble.svg`,
`icon-tile-sev-attention.svg`, `icon-alert-schedule.svg`, `icon-alert-hourglass.svg`,
`icon-tile-muted.svg`, `icon-metric-clock.svg`, `icon-summary-bell.svg`

**If tiles are broken, check:**
1. Is `echarts-widget.js` loaded? (without it, divs stay empty)
2. Is `assets/icons/` folder copied? (without it, icons are broken images)
3. Is the `<div id="tile-N">` present? (JS needs it to inject DOM)

**FORBIDDEN:** Never hand-code tile HTML as `<div class="sc">` or custom `<div class="tile">` CSS.
Always use `ElegantEChart.tileWidget(id, data, {type:N})`.

### Component: Alert Feed (USE JS API — NOT custom HTML)
- **API:** `ElegantEChart.alertList(domId, { alerts: [...] })` — generates full scrollable feed
- **Variants:** `ElegantEChart.alertType1()` (with age+assignee), `alertType2()` (SLA timer), `alertType3()` (prioritized+SLA)
- **CSS:** Auto-injected by `echarts-widget.js` via `echarts-widget.css`
- **JS handles:** severity icons, badge colors, timestamps, OS tags, scroll, layout
- **Container:** `<div id="alert-feed"></div>` inside a `.widget` card
- **NEVER hand-code alert HTML with `.al-hdr`/`.al-item` classes — ALWAYS use the JS API**

### Component: Notification Banner
- **CSS:** `notification-banner.css` | **JS:** `notification-banner.js` | **HTML ref:** `notification-banner.html`
- **Types:** success (#E8F2E8), warning (#F7F0E6), error (#FCE8E8), info (#EDF7FA)
- **API:** `ElegantNotif.show(message, type, duration)`

### Component: Form Inputs
- **CSS:** `form-input.css` | **JS:** `form-input.js` | **HTML ref:** `form-input.html`
- **Input width:** 280px (default), 160px, 100px
- **Label width:** 200px (default)
- **Pattern:** `div.form-row` > `label.form-row__label` + `div.form-row__input` > input

### Component: Form Dropdown
- **CSS:** `form-dropdown.css` | **JS:** `form-dropdown.js` | **HTML ref:** `form-dropdown.html`
- **Width:** 280px | **Max list height:** 210px
- **Types:** basic, checkbox-multi, searchable, search+radio, no-data, apply/cancel footer

---

## Mandatory Variants & Classes per Shell

> Many components in the Rack have multiple variants — and the **wrong variant on the wrong shell ships a broken page every time**. This table is the contract. Do not deviate.

### Shell A — Dashboard
| Component | Mandatory variant / class | Forbidden on Shell A |
|---|---|---|
| Header | Variant 1 (Default with Help Icon) | Variant 3 (Reports only) |
| Actionbar | Types 1–7 (pick by use) | Type 8 (`.actionbar__btn-report` — Reports only) |
| rpt-chart-floater | NOT used | ❌ Never add on dashboards |
| Sidemenu | NOT present | ❌ Dashboard shell has no sidemenu |

### Shell B — Settings
| Component | Mandatory variant / class | Forbidden on Shell B |
|---|---|---|
| Sidemenu | `sidemenu_variant1_settings.md` | Variant 2 (Reports) |
| Header | Variant 1 or 2 | Variant 3 |
| Actionbar | Types 1–7 | Type 8 |
| Button row | `.btn-primary` (Save) + `.btn-secondary` (Cancel) | Inline-styled `<button style="...">` |
| rpt-chart-floater | NOT used | ❌ |

### Shell C — Reports ⚠ MOST FAILURE-PRONE
| Component | Mandatory variant / class | Forbidden on Shell C |
|---|---|---|
| Sidemenu | `sidemenu_variant2_reports.md` — includes OS chip + search | Variant 1 (Settings) |
| Header | **Variant 3 mandatory** — Title + help + Edit Report + Export As + Schedule Reports + More | Variants 1 and 2 |
| Filter row | **`.reports-input-row.reports-input-row--type1`** with `.rpt-textbox--wide/medium/small` + `.rpt-filter-btn` | Custom inline `<div class="reports-input-row">` that redefines the class |
| Classic Tab | Contains **ONLY the chart area** (`.rpt-chart-area` + `rpt-chart-floater`) — sits at natural height with `flex-shrink:0` | Table nested inside `.classic-tab__content` |
| rpt-chart-floater | **Mandatory** — Customize View + chart/grid toggle | — |
| Actionbar | **Type 8 mandatory** — `.actionbar__btn-report` (+ Incident) + `icon-ab-search.svg` + `icon-ab-arrow-left/right.svg` | Types 1–7, inline-styled incident button |
| Data table | `data_table_type1.md` | `data_table_type2.md` (`.t2-*` — Shell D only) |
| Table scroll | `.table-scroll-area` is a **sibling of `.classic-tab`**, sole scroll container | Nested inside classic-tab; missing `overflow:hidden` on ancestors |

### Shell D — Detail / Split Panel
| Component | Mandatory variant / class | Forbidden on Shell D |
|---|---|---|
| Header | Variant 2 (with Back button) | — |
| Data table | **`data_table_type2.md`** (grouped, `.t2-*`) | Mixing `.data-table` with `.t2-*` classes |
| Sidemenu | NOT present | — |

### Every Shell — Always-True Contracts
| Rule | Explanation |
|---|---|
| Checkboxes → `.form-checkbox` | NEVER `<input type="checkbox">`; it renders native + platform accent-color (green on macOS). See `form_input.md` L1116. |
| Radios → `.form-radio` | NEVER `<input type="radio">`. Use the `.form-input--radio` pattern from `form_input.md`. |
| Dropdowns → `form-dropdown.css` | NEVER native `<select>`. See `form_dropdown.md` L8 — "NEVER native `<select>`". |
| Buttons → `.btn-primary` / `.btn-secondary` / `.btn-tertiary` | NEVER `<button style="background:#..;color:#..">`. Defined in `tokens.css` + `table.css`. |
| Drawer → paired backdrop | Every `<div class="drawer">` needs `<div class="drawer-backdrop" data-drawer="id">` as a prior sibling. |
| Inline `<style>` in page | MUST NOT redefine any class already defined in a linked CSS file. Only new page-unique selectors are allowed. If you find yourself writing `.reports-input-row { ... }` or `.actionbar { ... }` in inline `<style>`, stop — the official version is already loaded. |

---

## Predefined Charts (Pick from Rack)

All charts use `ElegantEChart.*` API from `echarts-widget.js` with the `elegant` theme.
Container: `<div id="CHART_ID" style="width:100%;min-height:280px;"></div>`

| Chart | API Call | Use For |
|-------|---------|---------|
| Vertical Bar | `ElegantEChart.bar(id, {labels, datasets})` | Volume by category, daily counts |
| Horizontal Bar | `ElegantEChart.hbar(id, {labels, datasets})` | Top-N rankings |
| Line/Area | `ElegantEChart.line(id, {labels, datasets})` | Trends over time (add `fill:true` for area) |
| Stacked Area | `ElegantEChart.stackedArea(id, {labels, datasets})` | Multi-series trends |
| Donut | `ElegantEChart.donut(id, {labels, values, colors})` | Distribution/proportion |
| Radar | `ElegantEChart.radar(id, {labels, datasets})` | Multi-axis comparison |
| Combo | `ElegantEChart.combo(id, {labels, bars, lines}, {dualAxis})` | Bar + line overlay |
| Scatter | `ElegantEChart.scatter(id, {datasets}, {xLabel, yLabel})` | Correlation |
| Gauge | `ElegantEChart.gauge(id, {value, label, color})` | Single KPI score |
| Sankey | `ElegantEChart.sankey(id, {nodes, links})` | Flow/path analysis |
| Sparkline | `ElegantEChart.sparkline(id, {values}, {color})` | Inline trend (h:60px) |
| Calendar Heatmap | `ElegantEChart.calendarHeatmap(id, {values, range})` | Daily volume over year |
| Risk Distribution | `ElegantEChart.riskDistribution(id, {polar, sunburst, radar})` | Composite risk view |
| Nightingale Rose | `ElegantEChart.nightingaleRose(id, {labels, values, colors})` | Polar proportional |
| Waterfall | `ElegantEChart.waterfall(id, {labels, values})` | Cumulative change |
| Network Graph | `ElegantEChart.graph(id, {categories, nodes, links})` | Topology/relationship |
| Pictorial Bar | `ElegantEChart.pictorialBar(id, {labels, datasets})` | Icon-based bar |
| Liquid Fill | `ElegantEChart.liquidFill(id, {values, borderColor})` | Ring gauge |
| Tangential Polar | `ElegantEChart.tangentialPolarBar(id, {categories, datasets})` | Polar stacked bars |

**Theme colors (palette):** `#2C66DD`, `#009CBB`, `#A51C50`, `#D14900`, `#198019`, `#DD1616`, `#FABB34`, `#4A90D9`

**HTML/JS Widget composites:**

| Widget | API Call | Use For |
|--------|---------|---------|
| Tile Widget (10 types) | `ElegantEChart.tileWidget(id, data, {type:N})` | KPI tiles with decorations |
| Summary Chart | `ElegantEChart.summaryChartWidget(id, {tiles, chart})` | KPI row + multi-series chart |
| Alert List | `ElegantEChart.alertList(id, {alerts})` | Scrollable alert feed |
| Team Board | `ElegantEChart.teamBoard(id, {members})` | Responder cards |
| Geo Widget | `ElegantEChart.geoWidget(id, {markers}, {tabs})` | World map + pins |
| Metrics Widget | `ElegantEChart.metricsWidget(id, data)` | KPI bar + ring gauges |
| Alert Type 1/2/3 | `ElegantEChart.alertType1/2/3(id, data)` | Alert card variations |

---

## Icon Inventory (195 SVGs)

### Naming Convention
- `icon-ab-*` — ActionBar icons (delete, disable, enable, more, search, plus, column, table-view, toggle-view)
- `icon-action-*` — Table row actions (approve, delete, edit, more)
- `icon-actionbar-*` — ActionBar toolbar (filter, refresh, search)
- `icon-alert-*` — Alert/notification related (bell, calendar, clock, critical, hourglass, info, schedule, success, warning)
- `icon-avatar-*` — User avatars (person, unassigned)
- `icon-btn-*` — Button icons (chevron, help, plus — with dark variants)
- `icon-checkbox-*` — Checkbox states (unchecked, checked, indeterminate)
- `icon-chevron-*` — Directional (down, left, right)
- `icon-dd-*` — Dropdown (calendar, settings)
- `icon-inc-*` — Incident workbench (created-by, severity-critical, sla-clock, sort)
- `icon-notif-*` — Notification banner (success, error, info, warning, close)
- `icon-os-*` — OS icons (linux, windows)
- `icon-pin-*` — Map pins (attention, critical, trouble)
- `icon-radio-*` — Radio states (checked, unchecked)
- `icon-rpt-*` — Report actions (edit, export, more, schedule)
- `icon-sm-*` — Sidemenu (bulb, chevrons, clock, collapse, manage)
- `icon-status-*` — Status indicators (disabled, info-high/low/medium, not-started, on-hold, partial, skipped, stopped, success, waiting, warning)
- `icon-t2-*` — Table type 2 (ata, avatar, calendar, playbook, rem-executing/failed/success, severity, thumbsup, zia)
- `icon-tab-*` — Dashboard tab icons (ad-overview, anomaly, apache, aws, cloud-protection, entities, event-overview, m365, dynamics, network, pgsql, salesforce, sql-server, add-custom)
- `icon-tile-*` — Tile decorations (muted, sev-attention/critical/trouble, **trend-down**, **trend-up**, zia)
- `icon-widget-*` — Widget toolbar (maximize, notification, schedule, sort)

### Critical Icon Rules
- **Trend icons:** ALWAYS `icon-tile-trend-up.svg` / `icon-tile-trend-down.svg`
- **Input stepper:** `icon-number-up.svg` / `icon-number-down.svg` (ONLY for number inputs)
- **Action icons:** 14×14 inline SVG, NEVER `<img>` tags
- **Severity shapes:** Inline SVG (diamond=critical, triangle=high/warning, circle=low)

---

## IA Map Integration Rules

### Adding a New Feature as Addon — MANDATORY WORKFLOW

A new feature is ALWAYS an addon to the existing product. It must feel like it belongs.

**Step 1: Identify which existing tabs the feature touches**
- Read `LOG360-IA-MAP.md`
- Open `data/LOG360 Cloud Full Product Bulk Screenshot_/{TAB_NAME}/` folder
- See what line-tabs and sub-pages already exist inside that tab
- Your new feature INSERTS alongside existing content — it doesn't replace it

**Step 2: Build each tab's page as a SEPARATE HTML using the CORRECT shell**
- If the feature touches the Home (Dashboard) tab → use **Shell A** (dashboard)
- If the feature touches the Settings tab → use **Shell B** (sidemenu + classic tab)
- If the feature touches the Reports tab → use **Shell C** (sidemenu + chart + table)
- NEVER dump a reports page into a dashboard shell or vice versa
- Each tab type has its OWN shell — respect the shell boundaries

**Step 3: TopNavBar for each HTML**
- Set the tab this page belongs to as `topnavbar__tab--selected`
- Set ALL other tabs to `topnavbar__tab--disabled`
- The line-tab headers show existing sub-tabs (from bulk screenshots) + your new feature's sub-tabs
- Existing sub-tabs are `line-tab__header--disabled` (visible but unclickable)
- Your new feature sub-tabs are clickable

**Step 4: Master HTML Assembly (after all pages are built)**
```
1. Create individual HTMLs per feature sub-page (each with correct shell)
2. After ALL pages are verified working:
3. Create index.html (master) that:
   a. Has the correct topnavbar with all 11 tabs
   b. Loads the first feature page as default view
   c. Line-tab headers have data-nav="filename.html" for seamless navigation
   d. Uses page transition CSS (fadeOut → navigate → fadeIn)
   e. Add cross-page JS that intercepts nav clicks and does window.location.href
4. Enhance master with entry animations (anim-fade-in-up, anim-delay-N)
```

**Step 5: Multi-tab features**
If a feature spans multiple product tabs (e.g., a feature needs a Dashboard view AND a Settings config page):
- Build the Dashboard page with Shell A → topnavbar Home tab selected
- Build the Settings page with Shell B → topnavbar Settings tab selected
- Master HTML shows the primary tab's page first
- Cross-tab navigation uses the topnavbar tab click to switch between these pages

### Shell Selection Rule (NEVER MIX)
| If feature is under... | Use Shell | Contains |
|---|---|---|
| Home (Dashboard) | **A** | line-tab + dash grid + widgets + charts |
| Reports | **C** | sidemenu type2 + chart + table + drawers |
| Settings | **B** | sidemenu + classic-tab + forms + table |
| Security / Threat Hub | **A** | line-tab + toolbar + dash grid |
| Any detail/investigation | **D** | split panel (left detail + right AI/properties) |

### New Component Creation Rules
If no existing component fits, you may create new ones but MUST:
- Use tokens.css color variables (never hardcode colors)
- Follow 8-point grid spacing
- Use Zoho Puvi font family
- Use 2px radius for inputs, 4px for cards
- Never introduce foreign CSS/JS libraries

---

## Screenshot-Driven Generation — MANDATORY Before Building Any Screen

### The Bulk Screenshot Library

All existing product screens are catalogued in:
```
data/LOG360 Cloud Full Product Bulk Screenshot_/
├── DASHBOARD TAB/          (29 files)
├── REPORTS TAB/            (80 files)
├── COMPLIANCE TAB/         (22 files)
├── ALERTS TAB/             (14 files)
├── Security TAB/           (11 files)
├── Settings TAB/           (45 files)
├── SEARCH TAB/             (8 files)
├── CLOUD PROTECTION TAB/   (2 files)
├── LOG ME TAB/             (1 file)
├── SUPPORT TAB/            (1 file)
├── TOP BLOCKED COUNTRIES/  (1 file)
└── Incident workbench.../  (3 files)
```

### File Naming Convention (Already Applied)
Every screenshot is prefixed with its type:
- **`[Main]`** — Primary page view (dashboard, table, overview, sidemenu state)
- **`[Interaction]`** — Clickable overlay (dropdown, modal, drawer, form, tooltip, filter)

Reports screenshots include full **navigation hierarchy**:
```
[Main] Reports - Servers & Workstation - Windows - All Events Table View with Line Chart.png
[Main] Reports - Servers & Workstation - Unix - SU Logons Top Devices Bar Chart Table.png
[Interaction] Reports - Servers & Workstation - Windows - Export As Dropdown PDF CSV XLSX HTML.png
[Interaction] Reports - Applications - TopNav Dropdown Cloud Apps Zoho.png
```

### Workflow: When User Asks for a Screen

**CORE PRINCIPLE: Search by the user's EXACT keywords FIRST. Only read the screenshots that match. Never read all screenshots in a folder.**

---

**STEP 1 — Extract keywords from the user's request and search by NAME**

The user gives specific keywords. Use ONLY those keywords to find the exact screenshot.

```
EXAMPLE 1 — Reports:
  User: "Create Servers & Workstation - Windows - All Events report"
  Keywords: "Servers & Workstation", "Windows", "All Events"
  → Search: ls "REPORTS TAB/" | grep -i "All Events"
  → FOUND: [Main] Reports - Servers & Workstation - Windows - All Events Table View with Line Chart.png
  → Read ONLY this screenshot. This is your reference. Done.

EXAMPLE 2 — Dashboard:
  User: "Create Event Overview dashboard"
  Keywords: "Event Overview"
  → Search: ls "DASHBOARD TAB/" | grep -i "Event Overview"
  → FOUND: [Main] Events Overview - Main Dashboard with Log Trend and Severity Charts.png
  → Read ONLY this screenshot. Inspect what widgets they show. Done.

EXAMPLE 3 — Settings:
  User: "Create the Devices settings page"
  Keywords: "Devices"
  → Search: ls "Settings TAB/" | grep -i "Devices"
  → FOUND: [Main] Settings - Devices Table with Status Agent Name IP Address.png
  → Read ONLY this screenshot. Done.
```

**Rules for Step 1:**
- Extract the most specific keywords from the user's request
- Search the correct tab folder using those keywords
- If EXACT match found → read ONLY that screenshot (and its matching [Interaction] screenshots)
- Do NOT read all screenshots in the folder
- Do NOT read unrelated screenshots "just to understand the tab"

---

**STEP 2 — If screenshot FOUND: Inspect and Recreate (NOT Copy)**

When you find the matching screenshot:

1. **Read the screenshot** — inspect it to extract KNOWLEDGE about what the screen contains:
   - What widgets/cards are shown? (stat cards, tiles, chart widgets, tables, feeds)
   - What chart types are visible? (line, bar, donut, radar, etc.)
   - What data categories are displayed? (log trends, severity, top users, etc.)
   - What layout structure? (2-col, 3-col, full-width, sidebar+main)
   - What interactions are available? (filters, dropdowns, export, tabs)

2. **Extract the KNOWLEDGE — not the pixels:**
   ```
   Screenshot shows: "Event Overview" dashboard with:
   - 4 stat cards (Total Events, Firewall Events, Critical Alerts, Sources)
   - Log Trend line chart (24hr timeline)
   - Severity Distribution donut chart
   - Top 5 Sources horizontal bar chart
   - Recent Events alert feed (scrollable)
   
   KNOWLEDGE EXTRACTED:
   → Need 4 KPI stat cards for event metrics
   → Need a time-series trend chart → use ElegantEChart.line()
   → Need a severity breakdown → use ElegantEChart.donut()
   → Need a ranking chart → use ElegantEChart.hbar()
   → Need an alert/event feed → use ElegantEChart.alertList()
   ```

3. **Recreate using Components-Wiki building blocks:**
   - Pick Shell from tab type (A for dashboard, B for settings, C for reports)
   - Pull each component from its wiki `.md` file
   - Use Elegant chart APIs that MATCH the data purpose (not necessarily the same chart type)
   - You MAY use a BETTER chart type than the original if it fits the data better
   - You MUST use the hybrid widget mix rule (ECharts + predefined JS widgets)

4. **CRITICAL — What "recreate" means:**
   - ✅ Extract: "They show log trends over time" → Build: `ElegantEChart.line()` in a `widget` card
   - ✅ Extract: "They show severity breakdown" → Build: `ElegantEChart.donut()` in a `widget` card
   - ✅ Extract: "They show a data table with columns X, Y, Z" → Build: `data-table` from wiki with matching columns
   - ❌ DO NOT: Copy their CSS classes, recreate their exact HTML structure, or use foreign styling
   - ❌ DO NOT: Hand-code `.pipeline-bar` or `.detect-feed` when `widget.md` + `predefined_charts.md` exist
   - ❌ DO NOT: Skip the Components-Wiki and write custom HTML/CSS for standard components

5. **For Reports pages specifically:**
   - Pick Shell C
   - Pull sidemenu from `Components-Wiki/sidemenu_variant2_reports.md`
   - Pull header from `Components-Wiki/header.md` (Variant 3: Report Header with actions)
   - Pull input row from proper form components (`form_input.md`, `form_dropdown.md`)
   - Pull classic tab from `Components-Wiki/classic_tab.md` for chart area
   - Pull table from `Components-Wiki/data_table_type1.md`
   - Pull actionbar from `Components-Wiki/actionbar.md`

6. **For Dashboard pages specifically:**
   - Pick Shell A
   - Pull line-tab from `Components-Wiki/line_tab.md` (Variant 4: Dashboard with actions)
   - Follow strict row order: Stat Cards → Tiles → Hybrid Widgets
   - Inspect what KPIs the screenshot shows → map each to stat cards or tile widgets
   - Inspect what charts the screenshot shows → map each to an ElegantEChart type
   - Use hybrid mix: at least 1 predefined JS widget (alertList, summaryChart, etc.) per 3 widget rows
   - NEVER duplicate the same chart type twice in one view

---

**STEP 2b — Also find matching [Interaction] screenshots**

After finding the [Main] screenshot, search for interactions using the SAME keywords:

```
User asked for: "Servers & Workstation - Windows - All Events"
→ Search: ls "REPORTS TAB/" | grep -i "Servers & Workstation.*Windows"
→ Found [Interaction] files:
   - Export As Dropdown PDF CSV XLSX HTML.png
   - Customize View Modal Sorting Limits Tab.png
   - Customize View Modal Widget Chart Type.png
   - Select Columns Modal Dialog.png
   - Create Filter Modal Log Source Criteria.png
   - More Menu Pin to Dashboard Annotation.png
→ Read ONLY these interaction screenshots
→ Recreate each as an Elegant Drawer (NOT custom modal — see §Popup = Drawer Rule)
```

---

**STEP 3 — If screenshot NOT FOUND: Two very different paths**

When the user's keywords don't match any screenshot, determine WHICH situation applies:

**Path A — User asked for an EXISTING page type that just lacks a screenshot**
(e.g., "Create RADIUS Authentication Reports", "Build the PostgreSQL Logon page")
This is still Mode 2/3 — NOT a new feature. The user wants a standard report/settings/dashboard page, it just doesn't have a screenshot in the library.

1. **Find a REFERENCE screenshot** — pick the closest similar existing screen as a layout template:
   ```
   User: "Create RADIUS Authentication Reports"
   → No screenshot matches "RADIUS"
   → Search related: grep -i "logon\|authentication" in REPORTS TAB filenames
   → Closest: [Main] Reports - Servers & Workstation - Windows - All Events Table View with Line Chart.png
   → Use this as LAYOUT REFERENCE only (same shell structure, similar arrangement)
   ```
2. **Build using the reference's STRUCTURE but with new content:**
   - Same Shell (C for reports, B for settings, A for dashboards)
   - Same structural arrangement (chart area + table, or widget grid, etc.)
   - NEW data, labels, columns relevant to the user's request
   - Pick chart types that fit the NEW data (not necessarily same as reference)
   - Pull ALL components from Components-Wiki `.md` files
3. **Create interactions** — use the reference's [Interaction] screenshots as templates:
   - Every report needs: Export drawer, Column selector drawer, Filter drawer, Pagination
   - Every settings page needs: Add/Edit form drawer, Delete confirmation
   - Every dashboard needs: Custom view dropdown, date picker, refresh

**Path B — User asked for a COMPLETELY NEW FEATURE that doesn't exist in the product**
(e.g., "Build SOAR module", "Add threat hunting", "Create playbook editor")
This is Mode 1 (Addon) — a completely different workflow. **STOP and follow §Operating Modes → Mode 1 instead.**

Mode 1 workflow summary (defined in detail above):
1. Scan screenshots to understand what ALREADY EXISTS in the target tab
2. INSERT the new feature alongside existing content (old = `--disabled`)
3. TopNavBar: target tab `--selected`, all others `--disabled`
4. Use competitor analysis for layout inspiration (Splunk, Sentinel, QRadar, Elastic)
5. Pick the correct Shell for the tab, extend with new components if needed
6. Create new components using Elegant tokens if predefined ones don't cover the UI
7. If no predefined App Shell fits, CREATE a new shell using Elegant structural principles

**How to distinguish Path A from Path B:**

| Signal | Path A (existing page type) | Path B (new feature / Mode 1) |
|---|---|---|
| User says | "create [report name]", "build [page name]" | "build [new capability]", "add [new module]" |
| It fits an existing tab structure | Yes — it's a report, settings page, or dashboard view | No — it needs new navigation, new workflows |
| Existing product has similar pages | Yes — other reports/settings pages exist in same tab | No — nothing like this exists in the product |
| Example | "Create FTP Logon Reports" | "Build a SOAR playbook editor" |
| Shell to use | Same shell as reference screenshot | May need existing shell extended or entirely new shell |
| Competitor analysis needed? | No — use reference screenshot layout | Yes — research how competitors build this feature |

---

**STEP 4 — Generate matching interactions (TARGETED, not all)**

After building the [Main] screen, find ONLY the interaction screenshots that match the SAME page:

```
Main screenshot found for: "Servers & Workstation - Windows - All Events"
→ Search interactions: ls "REPORTS TAB/" | grep -i "Interaction.*Servers.*Workstation.*Windows"
→ Found: 10 interaction screenshots for this specific page
→ Read and recreate ONLY these 10 as Elegant Drawers
→ Do NOT read interactions from other report pages
```

| Tab | Mandatory Interactions to Generate |
|-----|-----------------------------------|
| **Reports** | Export dropdown, Column selector, Filter modal, Schedule modal, Log source selector, Pagination, View customizer |
| **Settings** | Add/Edit form drawer, Delete confirmation, Filter dropdown, Category dropdown, Monitor interval toolbar |
| **Dashboard** | Custom view dropdown, Export dropdown/history, Tooltip hovers |
| **Compliance** | Edit configuration form, Export modal, Export history, Settings dropdown, View mode toggle |
| **Alerts** | Alert detail drawer, Add profile form, View filter dropdown, Column selector, Ticketing integration form |
| **Security** | Create rule dropdown, Schedule form, Manage rules dropdown, Filter dropdown |
| **Search** | Criteria modal, Log source modal, Log types dropdown, Save as dropdown |

### Workflow Summary (Quick Reference)

```
User: "Build me [screen name]"

1. EXTRACT KEYWORDS from user request (e.g., "Servers & Workstation", "Windows", "All Events")
2. IDENTIFY TAB → map keywords to tab folder (Reports/Settings/Dashboard/etc.)
3. SEARCH BY NAME → ls "{TAB} TAB/" | grep -i "{keywords}"
   ─── Read ONLY the matching screenshots, NOT all screenshots in the folder ───
4. IF NAME MATCHES [Main] screenshot:
   a. Read THAT ONE screenshot → inspect what widgets/charts/tables it contains
   b. Extract KNOWLEDGE (what data, what layout, what components)
   c. Pick Shell from tab type
   d. Pull components from Components-Wiki .md files
   e. Recreate using Elegant building blocks (widget.md, predefined_charts.md, etc.)
   f. Search [Interaction] screenshots with SAME keywords → recreate as Drawers
5. IF NAME DOES NOT MATCH → determine Path A or Path B:
   PATH A (existing page type, no screenshot):
     a. Find closest similar screenshot as LAYOUT REFERENCE only
     b. Build new screen using reference structure + new content
     c. Pull ALL components from Components-Wiki
     d. Create standard interactions (export drawer, filter drawer, etc.)
   PATH B (completely new feature = Mode 1 Addon):
     a. STOP this workflow — switch to §Operating Modes → Mode 1
     b. Scan what ALREADY EXISTS in target tab
     c. INSERT new feature alongside existing (old = --disabled)
     d. Use competitor analysis for layout inspiration
     e. Extend/create shells and components as needed
6. VERIFY → run checklist
```

### ANTI-PATTERNS — Things the Agent Must NEVER Do

| Anti-Pattern | Correct Approach |
|---|---|
| Reading ALL screenshots in a tab folder | Search by user's keywords, read ONLY matches |
| Copying old-theme CSS/HTML from the screenshot | Extract knowledge (what data), recreate with Components-Wiki blocks |
| Hand-coding `.pipeline-bar`, `.detect-feed`, custom stat HTML | Use `widget.md`, `stat_card.md`, `predefined_charts.md` from Components-Wiki |
| Creating `<div class="modal">` or `<div class="popup">` | Use Drawer from `Components-Wiki/drawer.md` |
| Using foreign CSS/chart libraries to match screenshot appearance | Use `ElegantEChart.*()` APIs with Elegant theme |
| Dumping all widgets as the same chart type | Follow hybrid mix rule: ECharts + predefined JS widgets, no duplicates |
| Reading component `.css`/`.js` files and guessing the HTML | Read the component's `.md` file from Components-Wiki for complete HTML |
| Placing a `<button>`, `<a href>`, `<input>`, `<select>` inside another `<button>` | Use the **Button+Dropdown Wrapper Pattern** (see below) |
| Nesting `.table-scroll-area` inside `.classic-tab__content` | In Shell C, `.table-scroll-area` is a **SIBLING** of `.classic-tab`, not a child (see Shell C tree) |
| Putting `.reports-quicklink` bar inside `main-content` | In Shell C, the quicklink bar is a direct child of `.app-shell`, next to `app-body` |

---

## HTML Validity Rules — Do Not Break the Parser

This section has **two parts**. Both are enforced by `scripts/validate-html.py` and block delivery if any rule is violated.

1. **Nested-interactive rule** (parser correctness) — nothing interactive inside `<button>`
2. **No-raw-HTML rule** (design-system compliance) — use Elegant form components, never raw browser controls

---

### Part 2: Never Ship Raw Browser Controls (Design-System Rule)

The Elegant 1.0 system provides specific classes for every form control. Using the raw HTML element silently breaks the design system because the browser renders the native platform control (which uses the OS accent color, native font, native border, etc.), not the Elegant visual spec.

#### Forbidden patterns and their correct replacements

| ❌ Forbidden | ✅ Correct | Lives in |
|---|---|---|
| `<input type="checkbox">` | `<label class="form-checkbox"> <input class="form-checkbox__input" type="checkbox"> <img class="form-checkbox__icon form-checkbox__icon--unchecked" src="assets/icons/icon-checkbox.svg"><img class="form-checkbox__icon form-checkbox__icon--checked" src="assets/icons/icon-checkbox-checked.svg"> Label </label>` | `form-input.css` L1116 |
| `<input type="radio">` | `.form-radio` pattern (see `form_input.md` Type 5) | `form-input.css` |
| `<select>` | `.form-dropdown` pattern | `form-dropdown.css` |
| `<button style="background:#2C66DD;color:#fff;...">Save</button>` | `<button class="btn-primary">Save</button>` | `tokens.css` + `table.css` |
| `<button style="border:1px solid #ABABAB;...">Cancel</button>` | `<button class="btn-secondary">Cancel</button>` | `tokens.css` + `table.css` |
| `<div style="display:flex;gap:6px;align-items:center;...">` (common flex layouts) | Use the component wiki's existing layout class | Component .css |
| Inline `<style>` block that redefines `.reports-input-row`, `.rpt-textbox`, `.actionbar`, `.form-*`, `.btn-*`, `.drawer*`, `.tile-widget`, `.stat-card`, or any other class in the Elegant Class Catalog above | Remove the inline redefinition; the real CSS is already loaded via `<link rel="stylesheet">` | Various |

#### Why this matters

When you write `<input type="checkbox">`, on macOS Safari/Chrome it renders a **green tick** (system accent color) instead of the Elegant `#2C66DD` blue tick. On Windows it renders as a square-with-checkmark in Fluent colors. On different browser engines it renders differently. The Elegant `.form-checkbox` pattern hides the native input and shows two SVG icons (unchecked + checked) — producing pixel-identical output on every platform.

The same logic applies to `<select>` (native dropdown arrow differs per OS), `<input type=radio>` (native fill color differs), and `<button style=...>` (no design-system token = no cross-page consistency).

#### Inline `<style>` — when is it allowed?

Inline `<style>` in a page is **only** allowed for:
- Page-unique animation keyframes
- One-off layout tweaks that have **no Elegant class equivalent**
- Fixes to the flex-containment chain specific to that page's shell composition

Inline `<style>` is **never** allowed for:
- Redefining a class that's already in a linked CSS file (will silently override design tokens)
- Replacing a component because "the screenshot looks slightly different"
- Adding colors, fonts, paddings that would instead be tokens in `design_tokens.md`

#### How the validator enforces this

`scripts/validate-html.py` checks for:
1. Nested interactive elements inside `<button>` (Part 1)
2. `<input type="checkbox">` or `<input type="radio">` without the `.form-checkbox__input` / `.form-radio__input` class
3. `<select>` tags anywhere in the page
4. `<button>` with inline `style=` attribute (excepting position/z-index utility styles)
5. Inline `<style>` blocks that define `.reports-input-row`, `.rpt-textbox`, `.actionbar`, `.form-`, `.btn-`, `.drawer`, `.tile-widget`, `.stat-card`, or any other catalog class

If any check fails, exit code is 1 and the page cannot be delivered.

---

### Part 1: No Interactive Inside Interactive (Parser Correctness)

The HTML5 parser has **strict rules about which elements may nest inside interactive elements**. Violating these rules causes browsers to **silently auto-close the outer element**, which reparents all subsequent content — producing completely broken layouts that look like "the chart and table didn't render" even though the source HTML looks fine.

### The Rule: No Interactive Inside Interactive

A `<button>` element's content model is **phrasing content, but with no interactive content descendants**. This means **NONE of these may appear inside a `<button>`**:

- `<button>` (another button)
- `<a href="...">` (a hyperlink — `<a>` without href is OK)
- `<input>`, `<select>`, `<textarea>`
- `<details>`, `<embed>`, `<iframe>`, `<label>`
- Any element with `tabindex` set
- Any element with `contenteditable`

If you do this, the browser will **implicitly close the outer `<button>`** at the point it encounters the inner interactive element, kicking every subsequent sibling out of its intended parent and ruining your layout.

### How This Manifests

You build this (looks reasonable):
```html
<button class="page-header__action-btn" onclick="toggleDropdown('x')">
  <img src="..." /> <span>Export History</span>
  <div class="export-history" id="x">            <!-- dropdown panel -->
    <div>Item 1</div>
    <div class="footer">
      <a href="#">Show More</a>
      <button>Clear All</button>                 <!-- ⚠️ nested button -->
    </div>
  </div>
</button>
<button>Next Action</button>                     <!-- expected: sibling -->
```

Browser actually parses it as:
```html
<button>                                          <!-- closed early -->
  <img /> <span>Export History</span>
  <div class="export-history">
    <div>Item 1</div>
    <div class="footer"><a href="#">Show More</a></div>
  </div>
</button>
<button>Clear All</button>                        <!-- escaped up -->
... leftover divs reparented as siblings ...
<button>Next Action</button>                      <!-- pushed out of flex row -->
```

Symptoms you will see: buttons that should be in a right-aligned flex row stack **vertically on the left**, dropdown panels appear **inline instead of floating**, and unrelated siblings (the classic-tab, the table) appear to "vanish" because they got pushed outside their intended flex container.

### The Correct Pattern — Button + Dropdown Wrapper

**Always wrap a `<button>` and its dropdown/panel in a `position:relative` container, as siblings — never nest the panel inside the button:**

```html
<div class="action-wrap" style="position:relative;display:inline-flex;align-items:center;">
  <button class="page-header__action-btn" onclick="toggleDropdown('exportHistory')">
    <img src="..." /> <span>Export History</span>
  </button>
  <div class="export-history" id="exportHistory">
    <div class="export-history__item">
      <input type="checkbox" /> File 1        <!-- now safe -->
    </div>
    <div class="export-history__footer">
      <a href="#">Show More</a>
      <button type="button">Clear All</button>  <!-- now safe -->
    </div>
  </div>
</div>
```

Position the dropdown with `position:absolute; top:100%; right:0;` — the wrapper's `position:relative` is its anchor.

### Apply This Pattern To

- Export As + dropdown list
- Export History + panel (with checkboxes and inner buttons)
- More + menu
- Add to Incident + search dropdown (search has an `<input>` — MUST be outside the trigger button)
- Rows Per Page + list
- Any icon button + tooltip/menu/panel

### Sanity Check Before Delivery (MANDATORY)

A full workspace validator lives at `scripts/validate-html.py`. Run it from the workspace root **before declaring any page complete**:

```bash
# Scan everything (generated pages + component source blocks)
python3 scripts/validate-html.py

# Or scan just the page you just built
python3 scripts/validate-html.py figma-export/your-page/index.html
```

Exit code 0 = clean, 1 = issues found. If it returns 1, fix the reported lines before delivering — the page will render broken for the user otherwise.

For ad-hoc inline checks (e.g. in a terminal without the script available), use:

```bash
# From the page folder
python3 -c "
import re
c = open('index.html').read()
# find a <button> whose inner text contains another <button>, <a href>, <input>, <select>, <textarea>
pat = re.compile(r'<button\b[^>]*>((?:(?!</?button\b).)*?)</button>', re.DOTALL)
issues = 0
for m in pat.finditer(c):
    inner = m.group(1)
    for bad in (r'<button\b', r'<a\s+[^>]*href', r'<input\b', r'<select\b', r'<textarea\b'):
        if re.search(bad, inner, re.I):
            ln = c[:m.start()].count(chr(10)) + 1
            print(f'L{ln}: {bad} inside <button>')
            issues += 1
print(f'Total: {issues}')
"
```

If this prints any issues, **the page will render broken**. Fix before delivering.

---

### Tab → Shell → Screenshot Folder Mapping

| User Request Contains | Tab Folder | Shell | Sidemenu? |
|----------------------|-----------|-------|-----------|
| "report", "logon", "events", "audit" | `REPORTS TAB/` | C | Yes (type2) |
| "setting", "config", "admin", "device management" | `Settings TAB/` | B | Yes |
| "dashboard", "overview", "home", "trend" | `DASHBOARD TAB/` | A | No |
| "compliance", "PCI", "HIPAA", "SOX" | `COMPLIANCE TAB/` | C | Yes |
| "alert", "alert profile", "investigation" | `ALERTS TAB/` | A/B | Depends |
| "security", "rule", "detection" | `Security TAB/` | A | No |
| "search", "query", "log search" | `SEARCH TAB/` | Custom | No |
| "cloud protection", "shadow apps" | `CLOUD PROTECTION TAB/` | A | No |
| "support", "help" | `SUPPORT TAB/` | Custom | No |
| "blocked countries", "firewall geo" | `TOP BLOCKED COUNTRIES/` | A | No |
| "incident", "workbench" | `Incident workbench.../` | D | No |

---

## Scroll Rules — Smart Containment (NEVER Misuse)

### The Rule
Only ONE designated container scrolls per shell. The page itself NEVER scrolls.

### Required on EVERY page
```css
html, body { height: 100%; margin: 0; overflow: hidden; }
.app-shell  { height: 100vh; display: flex; flex-direction: column; overflow: hidden; }
```

### Which element scrolls per shell
| Shell | Scrollable element | CSS |
|-------|-------------------|-----|
| A (Dashboard) | `.dash` | `flex:1; overflow-y:auto;` |
| B (Settings) | `.table-scroll-area` or `.classic-tab__body` | `flex:1; overflow-y:auto;` |
| C (Reports) | `.table-scroll-area` | `flex:1; overflow-y:auto; min-height:0;` |
| D (Split Panel) | `.left-panel` AND `.right-panel` independently | `overflow-y:auto;` on each |

### Flex containment chain (MANDATORY for scroll to work)
Every ancestor between `.app-shell` and the scrollable element MUST have:
```css
.parent { flex: 1; display: flex; flex-direction: column; min-height: 0; overflow: hidden; }
```
If ANY ancestor is missing `min-height:0` or `overflow:hidden`, the scroll breaks and the page overflows.

### Where NOT to put scroll
- NEVER on `html`, `body`, or `.app-shell`
- NEVER on `.topnavbar`, `.line-tab`, `.toolbar`, `.actionbar` (these are fixed bars)
- NEVER `overflow:auto` on `.dash__row` or widget containers

---

## Tile Widget Grid Rules — 4px Gap, Max 3 Per Row

### Grid gap = 4px (same as widget grid)
```css
.tile-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;   /* SAME as dash gap — never larger */
}
```

### Max 3 tiles per row — never more
- If all 3 tiles fit comfortably → use `repeat(3, 1fr)`
- If a tile is too wide (type 1/2/3) and 3 won't fit → **keep 2 tiles in that row**. NEVER push the 3rd tile to the next row.
- Acceptable column patterns: `1fr 1fr 1fr` | `2fr 1fr` | `1fr 2fr` | `1fr 1fr`

### Max tile usage per dashboard
- **Maximum 1 row of tiles** (3 tiles) per dashboard view. Do NOT scatter tiles across multiple rows.
- If you have more KPIs than 3 tiles, put the extras in **stat cards** (see Dashboard Structure below), NOT more tile rows.

### Card structure
```html
<div class="tile-grid" style="gap:4px;">
  <div class="tile-card anim-fade-in-up anim-delay-1">
    <div class="card__header">
      <span class="card__title">Title</span>
      <div class="card__toolbar">...</div>
    </div>
    <div id="tile-1"></div>
  </div>
  <div class="tile-card anim-fade-in-up anim-delay-2">
    <div class="card__header"><span class="card__title">Title</span></div>
    <div id="tile-2"></div>
  </div>
  <div class="tile-card anim-fade-in-up anim-delay-3">
    <div class="card__header"><span class="card__title">Title</span></div>
    <div id="tile-3"></div>
  </div>
</div>
```

### Equal height per row
All tiles in the same row MUST have equal height. The grid handles this automatically when using `1fr` columns. NEVER set explicit heights that would create empty space.

### Responsive breakpoints
```css
@media (max-width: 1024px) { .tile-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 767px)  { .tile-grid { grid-template-columns: 1fr; } }
```

### Wide vs Half tiles
- Type 1, 2, 3 → use `.tile-card--wide` (span 2 columns in a 3-col grid)
- Type 4, 5, 6, 7, 8, 9, 10 → use `.tile-card` (span 1 column)
- The JS output uses `.ti-wide` or `.ti-half` classes internally — set automatically

---

## Icon Size Enforcement — 14×14 Everywhere

### The Rule
ALL action/toolbar icons across the entire UI are 14×14px. This is non-negotiable.

### Where 14×14 applies
- TopNavBar row2 tab area: search icon, add icon
- Line-tab action buttons: refresh, expand, settings
- Toolbar buttons: refresh, filter, column icons
- Widget toolbar: maximize, notification, sort
- Table cell-actions: edit, delete, approve, more
- ActionBar: search, filter, refresh, column, toggle-view
- Drawer top: close button icon
- Form inputs: calendar icon, dropdown chevron, plus icon

### How to enforce
```css
.your-icon-container img,
.your-icon-container svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
```

### Exception: only these are NOT 14×14
- TopNavBar row1 hamburger icon: 20×20
- TopNavBar row1 right icons (notification, help, apps): 20×20 (inside 32×32 hit area)
- Logo icon: variable width
- Tile widget internal decorations: managed by JS
- Cell-actions in data-table: 24×24 hit area, but the icon inside is still 14×14

---

## Elegant Class Catalog — "Does this class exist already?"

> Before writing ANY new CSS class or inline `<style>` block, search this table. 90% of the time the class is already shipped in a linked CSS file and you just need to use it. Reimplementing silently overrides the design system.

### Layout & Shell
| Class | Lives in | Purpose |
|---|---|---|
| `.app-shell`, `.app-body`, `.main-content` | `layout.css` | Base flex skeleton |
| `.topnavbar`, `.topnavbar__tab`, `.topnavbar__tab--selected` | `topnavbar.css` | Top nav |
| `.sidemenu`, `.sidemenu--type1`, `.sidemenu--type2` | `sidemenu.css` | Left sidemenu |
| `.reports-quicklink` | `layout.css` | Quicklink bar (Shell C) |

### Page Header
| Class | Lives in | Purpose |
|---|---|---|
| `.page-header` | `header.css` | 40px header bar |
| `.page-header__title` | `header.css` | Title text |
| `.page-header__action-btn` | `header.css` | Right-side icon action buttons |
| `.ph-action-wrap` | `header.css` | **Wrap around button + dropdown panel** (sibling pattern, HTML Validity rule) |

### Input Row (Shell C — Reports)
| Class | Lives in | Purpose |
|---|---|---|
| `.reports-input-row` | `form-input.css` | Filter-row container |
| `.reports-input-row--type1` | `form-input.css` | Type 1 layout (12px gap + right-aligned period) |
| `.reports-input-row__group` | `form-input.css` | A label+input group |
| `.reports-input-row__group--right` | `form-input.css` | Right-aligned group (margin-left:auto) |
| `.rpt-textbox`, `.rpt-textbox--wide/medium/small` | `form-input.css` | Textbox that opens a drawer (280/200/160px) |
| `.rpt-textbox__icon-btn` | `form-input.css` | Icon trigger inside rpt-textbox |
| `.rpt-filter-btn` | `form-input.css` | Filter button with icon + label |

### Form Inputs
| Class | Lives in | Purpose |
|---|---|---|
| `.form-row`, `.form-row__label`, `.form-row__input` | `form-input.css` | Standard form row (22 variants) |
| `.form-row--inline`, `.form-row--gap-16` | `form-input.css` | Inline variant, custom gap |
| `.form-input`, `.form-input--text/textarea/select` | `form-input.css` | Base input styles |
| **`.form-checkbox`** ⚠ | `form-input.css` | **Use instead of `<input type=checkbox>`** — hides input, shows `icon-checkbox.svg` + `icon-checkbox-checked.svg` |
| **`.form-radio`** (pattern via `form-input.css`) ⚠ | `form-input.css` | **Use instead of `<input type=radio>`** |
| `.form-group`, `.form-actions` | `form-input.css` | Form section wrapper + Save/Cancel footer |

### Buttons
| Class | Lives in | Purpose |
|---|---|---|
| **`.btn-primary`** ⚠ | `tokens.css` + `table.css` | Primary blue button (Save) |
| **`.btn-secondary`** ⚠ | `tokens.css` + `table.css` | Secondary outlined (Cancel) |
| **`.btn-tertiary`** ⚠ | `tokens.css` + `table.css` | Text-only tertiary |
| `.button-row`, `.button-row--right/center/between` | `button-row.css` | Save/Cancel layout container |

### Form Dropdowns
| Class | Lives in | Purpose |
|---|---|---|
| `.form-dropdown-wrap`, `.form-dropdown-trigger` | `form-input.css` | Dropdown trigger row |
| `.form-dropdown`, `.form-dropdown__item` | `form-dropdown.css` | Dropdown panel (**NEVER use `<select>`**) |
| `.form-dropdown--open` | `form-dropdown.css` | Open state |

### Actionbar (Table Toolbar)
| Class | Lives in | Purpose |
|---|---|---|
| `.actionbar`, `.actionbar__left`, `.actionbar__right` | `table.css` | Base actionbar (36px) |
| `.actionbar__icon-btn` | `table.css` | 24×24 icon button |
| `.actionbar__nav-btn` | `table.css` | Pagination prev/next |
| `.actionbar__pagination` | `table.css` | `1-25 of 100` text |
| `.actionbar__separator` | `table.css` | Vertical divider |
| **`.actionbar__btn-report`** ⚠ | `table.css` | **Type 8 — mandatory on Reports pages** (+ Incident button) |
| `.ab-state-btn` | `table.css` | State toggle button |

### Data Tables
| Class | Lives in | Purpose |
|---|---|---|
| `.data-table`, `.data-table thead/tbody` | `table.css` | Table Type 1 (flat) |
| `.data-table-wrap` | `table.css` | Horizontal scroll wrapper |
| `.table-scroll-area` | `table.css` | Vertical scroll wrapper (Shell C) |
| `.cell-actions`, `.cell-checkbox`, `.cell-icon-text`, `.cell-link` | `table.css` | Cell helpers |
| `.t2-table`, `.t2-sort`, `.t2-cell-left`, `.t2-details`, `.t2-time`, `.t2-assignee`, `.t2-status`, `.t2-remediation`, `.t2-toolbar` | `table.css` | Table Type 2 (grouped, Shell D) — **do NOT mix with `.data-table`** |

### Drawers
| Class | Lives in | Purpose |
|---|---|---|
| `.drawer`, `.drawer--sm/md/lg/xl` | `drawer.css` | Side drawer container |
| `.drawer-backdrop[data-drawer="id"]` ⚠ | `drawer.css` | **Mandatory sibling** — backdrop for click-to-close |
| `.drawer__main`, `.drawer__top`, `.drawer__body`, `.drawer__footer` | `drawer.css` | Drawer sections |
| `.drawer-grid`, `.drawer-detail`, `.drawer-card` | `drawer.css` | Body layout helpers |

### Tabs
| Class | Lives in | Purpose |
|---|---|---|
| `.classic-tab`, `.classic-tab__headers`, `.classic-tab__header`, `.classic-tab__filler`, `.classic-tab__body`, `.classic-tab__content` | `classic-tab.css` | Classic tabs |
| `.line-tab`, `.line-tab__headers`, `.line-tab__header` | `line-tab.css` | Line tabs (dashboards) |
| `.line-tab__settings` | `line-tab.css` | **Use `<span role="button" tabindex="0">` NOT `<button>`** (HTML Validity) |

### Chart Tools
| Class | Lives in | Purpose |
|---|---|---|
| `.rpt-chart-area`, `.rpt-chart` | `classic-tab.css` | Chart container |
| `.rpt-chart-floater` | `rpt-chart-floater.css` | Floating chart tools |
| `.rpt-chart-floater__btn`, `.rpt-chart-floater__btn--toggle` | `rpt-chart-floater.css` | Floater buttons |
| `.rpt-chart-toggle` | `rpt-chart-floater.css` | Chart/grid view toggle |

### Tile Widgets & Stat Cards
| Class | Lives in | Purpose |
|---|---|---|
| `.tile-widget`, `.ti-sev-row` | `tile-widgets.css` | Severity-row tile |
| `.stat-card`, `.stat-card__value`, `.stat-card__label` | `stat-card.css` | KPI stat card |
| `.bg-red`, `.bg-blue`, `.bg-green`, etc. | `widget.css` | Colored background utilities |

### Rule

If you need a visual pattern and it's NOT in this table, **then** check the component wiki file for that area. If it's still missing, ask the user before inventing. Do not silently add inline CSS for anything in this table.

---

## Filter Inputs — ALWAYS Use Form Components

### The Problem (from screenshots)
Filter rows like "Severity: All | Category: All Categories | Surface: External" were rendered as plain text instead of using Elegant form components.

### The Rule
ANY filter, dropdown, or input in the UI MUST use predefined form components:
- **Dropdowns:** `form-dropdown.css` + `form-dropdown.html` — NEVER plain `<select>` or text labels
- **Text inputs:** `form-input.css` + `form-input.html` — NEVER raw `<input>` without wrapper
- **Filter row layout:** `div.reports-input-row` > `div.reports-input-row__group` > label + `rpt-textbox` trigger

### Filter row pattern (from Reports shell)
```html
<div class="reports-input-row reports-input-row--type1">
  <div class="reports-input-row__group">
    <label>Severity:</label>
    <div class="form-dropdown-wrap">
      <div class="form-dropdown-trigger">
        <input class="form-input form-input--select" readonly value="All" data-dropdown-trigger />
        <div class="form-dropdown-trigger__icon"></div>
      </div>
    </div>
  </div>
  <div class="reports-input-row__group">
    <label>Category:</label>
    <div class="form-dropdown-wrap">
      <div class="form-dropdown-trigger">
        <input class="form-input form-input--select" readonly value="All Categories" data-dropdown-trigger />
        <div class="form-dropdown-trigger__icon"></div>
      </div>
    </div>
  </div>
</div>
```

---

## Design Tokens Quick Reference

| Token | Value | Use |
|-------|-------|-----|
| Font family | Zoho Puvi | All text |
| TopNavBar row1 bg | #272D42 | Dark brand bar |
| TopNavBar row2 bg | #343B52 | Tab bar |
| Selected tab text | #FFFFFF on #343B52 bg | Active nav tab |
| Primary blue | #2C66DD | Links, selected states, primary buttons |
| Sidebar width | 240px | Desktop sidemenu |
| Main content bg | #FFFFFF | Content area |
| Dashboard bg | #F5F5F5 | Dashboard canvas |
| Widget border | #E9E9E9 | Card borders |
| Widget padding | 24px | Card internal spacing |
| Dash gap | 4px | Between widgets |
| Tile grid gap | 4px | Between tiles (SAME as dash gap) |
| Stat card max per row | 4 | Stat cards are compulsory on dashboards |
| Tile max per row | 3 | Max 1 tile row per dashboard |
| Widget max per row | 3 | Vary chart types, no duplicates |
| Table header bg | #FAFAFA | Sticky header |
| Table row height | 40px | Body rows |
| ActionBar height | 36px | Toolbar above table |
| Line-tab height | 40px | Sub-navigation |
| Classic-tab header | 32px | Tab switcher |
| Page header height | 40px | Title bar |
| Button height | 28px | Primary/secondary/tertiary |
| Input height | 26px | Form fields |
| Input width | 280px | Default field width |
| Icon size (action) | 14×14 | All action/toolbar icons |
| Grid system | 8-point | All spacing multiples of 8 |
| **Max spacing** | **24px** | **Hard ceiling — never exceed** |
| Border radius (inputs) | 2px | Inputs, buttons, dropdowns |
| Border radius (cards) | 4px | Widgets, drawers |

---

## 8-Point Grid & Spacing — Hard Ceiling 24px

### The Rule
ALL spacing (padding, margin, gap) MUST be multiples of 8: `4px | 8px | 12px | 16px | 24px`.
**Maximum spacing anywhere is 24px.** Never 32px, 40px, 48px for gaps/margins.

| Element | Spacing | Value |
|---------|---------|-------|
| Dash grid gap | gap | 4px |
| Tile grid gap | gap | 4px (SAME as dash gap) |
| Widget internal padding | padding | 24px (max) |
| Dash row gap | gap | 4px |
| Widget header to body | gap | 8px |
| Stat card padding | padding | 16px 20px |
| Toolbar padding | padding | 0 16px |
| Sidemenu item padding | padding-left | 16px (L1) / 40px (L2) |
| Form row gap | gap | 16px |
| Card border-radius | radius | 4px |
| Button border-radius | radius | 2px |

### When creating new components
New custom components MUST follow the same grid:
- Padding: pick from 4/8/12/16/20/24
- Margins: pick from 4/8/12/16/24
- Gaps: pick from 4/8/12/16
- Border-radius: 2px (inputs/buttons) or 4px (cards/widgets)
- **If you find yourself writing `margin: 32px` or `gap: 40px` — STOP. Reduce to 24px max.**

---

## Dashboard Structure — Strict Row Order

Every dashboard MUST follow this exact top-to-bottom structure. No exceptions.

### Row order (top → bottom)
```
ROW 1: Stat Cards    — max 4 per row, compact value + trend + label
ROW 2: Tiles         — max 3 per row, max 1 row total, rich data tiles (JS API)
ROW 3+: Hybrid Widgets — max 3 per row, MIX of ECharts + predefined JS widgets
```

### Layer 1: Stat Cards (COMPULSORY on every dashboard)

Stat cards are the **top-most row** — compact, white cards with colored left accent, icon on the right side. Match the existing product style.

```css
.stat-row { display: flex; gap: 4px; }
.stat-card {
  flex: 1; min-width: 0; display: flex; align-items: center;
  background: #fff; border: 1px solid #E9E9E9; border-radius: 4px;
  padding: 12px 16px; gap: 12px;
}
.stat-card__body { flex: 1; }
.stat-card__value { font-size: 22px; font-weight: 600; color: #000; }
.stat-card__trend { font-size: 11px; margin-left: 4px; }
.stat-card__trend--up { color: #198019; }
.stat-card__trend--down { color: #DD1616; }
.stat-card__label { font-size: 11px; color: #626262; display: block; margin-top: 2px; }
.stat-card__icon { width: 32px; height: 32px; flex-shrink: 0; opacity: 0.7; }
```
```html
<div class="dash__row stat-row">
  <div class="stat-card anim-fade-in-up anim-delay-1">
    <div class="stat-card__body">
      <span class="stat-card__value">24,891</span>
      <span class="stat-card__trend stat-card__trend--up">+4.7%</span>
      <span class="stat-card__label">Total Events</span>
    </div>
    <img class="stat-card__icon" src="assets/icons/icon-summary-bell.svg" alt="">
  </div>
  <div class="stat-card anim-fade-in-up anim-delay-2">
    <div class="stat-card__body">
      <span class="stat-card__value">1,847</span>
      <span class="stat-card__trend stat-card__trend--up">+4.67%</span>
      <span class="stat-card__label">Firewall Events</span>
    </div>
    <img class="stat-card__icon" src="assets/icons/icon-endpoint.svg" alt="">
  </div>
  <div class="stat-card anim-fade-in-up anim-delay-3">...</div>
  <div class="stat-card anim-fade-in-up anim-delay-4">...</div>
</div>
```
- **Maximum 4 stat cards per row**
- Structure: value + trend (inline) + label, icon on the right
- Every stat card MUST have `anim-fade-in-up` with staggered delay
- Gap between cards: 4px (same as all dashboard gaps)

### Layer 2: Tiles (max 3 per row — max 1 row total)
- Use `ElegantEChart.tileWidget()` — see Tile Widget Grid Rules above
- **Max 3 tiles per row**. If only 2 fit, keep 2. NEVER push a 3rd tile to the next row.
- **Max 1 tile row per dashboard.** Do NOT create multiple tile rows.
- Tiles are for **rich data KPIs** (severity breakdowns, progress bars, sparklines) — NOT simple numbers (those go in stat cards)
- Gap: 4px (same as all dashboard gaps)

### Layer 3: Hybrid Widgets (max 3 per row — MUST be diverse)

**CRITICAL RULE: Never dump all predefined widgets or all ECharts into a dashboard. MIX them.**

Each dashboard view MUST contain a hybrid mix of:
1. **ECharts widgets** — `bar`, `line`, `donut`, `radar`, `combo`, `stackedArea`, `gauge`, etc.
2. **Predefined JS widgets** — `summaryChartWidget`, `alertList`, `alertType1/2/3`, `metricsWidget`, `geoWidget`, `teamBoard`

Widget type diversity per dashboard (pick from each column):

| ECharts (pure chart) | Predefined (JS composite) |
|----------------------|--------------------------|
| `ElegantEChart.bar()` | `ElegantEChart.summaryChartWidget()` |
| `ElegantEChart.line()` | `ElegantEChart.alertList()` |
| `ElegantEChart.donut()` | `ElegantEChart.alertType1()` |
| `ElegantEChart.radar()` | `ElegantEChart.alertType2()` |
| `ElegantEChart.combo()` | `ElegantEChart.alertType3()` |
| `ElegantEChart.stackedArea()` | `ElegantEChart.metricsWidget()` |
| `ElegantEChart.gauge()` | `ElegantEChart.geoWidget()` |
| `ElegantEChart.hbar()` | `ElegantEChart.teamBoard()` |

**Planning rule:** For every 3 widget rows, at least 1 row must contain a predefined JS widget (not all ECharts).

### Dashboard must NOT look repetitive
- **Each line-tab view** (e.g., Overview, Network, Anomaly) MUST have a visibly distinct layout
- Vary the widget mix: if Overview has line+donut+alertList, Network should have bar+gauge+summaryChart
- Vary stat card count: 3 in one view, 4 in another
- Vary tile types: type 1+6+4 in one view, type 8+9+10 in another
- NEVER copy-paste the same dashboard layout across tabs — each tab is a unique screen

### Alert feeds — ALWAYS use predefined JS API
```javascript
// CORRECT — uses predefined alertList with severity icons, badges, timestamps
ElegantEChart.alertList('alert-container', {
  alerts: [
    { title: 'Security Auditing', severity: 'Critical', score: 95,
      desc: 'microsoft-windows-security-auditing : A new process has been created.',
      time: '2026-04-14 03:40:31', source: 'Windows' },
    // ...more alerts
  ]
});
```
**NEVER build custom alert HTML with `.al-hdr`/`.al-item` classes.** Always use the JS API — it handles severity icons, badges, colors, scroll, and layout automatically.

### Equal height per row — NO empty space
```css
.dash__row { display: flex; gap: 4px; align-items: stretch; }
.dash__row > .widget { flex: 1; min-width: 0; }
```
- All items in the same row stretch to equal height via `align-items: stretch`
- NEVER set explicit `height` on widgets — let flex handle it
- If one widget has more content, use `flex: 1.5` or `flex: 2` for it

### Content overflow rule
- Chart widgets: NEVER add inner scroll. Give more flex space or move to next row.
- Alert feeds / tables: `overflow-y: auto` is OK (they naturally scroll)
- Everything else: NO inner scroll — resize or reposition instead

---

## Animations — 100% Coverage on All Widgets

### Entry animations (MANDATORY on every widget, tile, and card)
Every visible element must animate in on page load using staggered delays:

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.anim-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.4s ease forwards;
}
.anim-delay-1 { animation-delay: 0.05s; }
.anim-delay-2 { animation-delay: 0.10s; }
.anim-delay-3 { animation-delay: 0.15s; }
.anim-delay-4 { animation-delay: 0.20s; }
.anim-delay-5 { animation-delay: 0.25s; }
.anim-delay-6 { animation-delay: 0.30s; }
.anim-delay-7 { animation-delay: 0.35s; }
.anim-delay-8 { animation-delay: 0.40s; }
.anim-delay-9 { animation-delay: 0.45s; }
.anim-delay-10 { animation-delay: 0.50s; }
```

### Apply to every element
```html
<div class="tile-card anim-fade-in-up anim-delay-1">...</div>
<div class="tile-card anim-fade-in-up anim-delay-2">...</div>
<div class="widget anim-fade-in-up anim-delay-3">...</div>
<div class="widget anim-fade-in-up anim-delay-4">...</div>
```

### Refresh icon must be functional
Every widget toolbar refresh icon must actually re-render the widget:
```html
<button class="widget__toolbar-btn" onclick="ElegantEChart.bar('chart-id', data);" title="Refresh">
  <img src="assets/icons/icon-actionbar-refresh.svg" alt="" style="width:14px;height:14px;">
</button>
```
For tile widgets, use the returned `refresh` function:
```javascript
var tile1 = ElegantEChart.tileWidget('tile-1', data, {type:1});
// Later: tile1.refresh();
```

---

## Innovate New Components When Needed

### When to create new components
If the feature you're building needs a UI pattern that doesn't exist in the predefined components:
- A new visualization type (timeline, kanban, flow editor)
- A new layout pattern (split view, card carousel, status pipeline)
- A new interaction (drag-and-drop, inline edit, real-time counter)

### Rules for new components
1. **Use Elegant tokens** — colors from `tokens.css`, font `Zoho Puvi`, spacing 8-point grid
2. **Write clean CSS** — use BEM naming like existing components (`newcomp`, `newcomp__header`, `newcomp__body`)
3. **Write working JS** — new components should be interactive (click handlers, animations, state changes)
4. **Add entry animations** — every new component gets `anim-fade-in-up`
5. **Max spacing 24px** — never exceed the hard ceiling
6. **Border-radius 4px** for cards, 2px for inputs
7. **If it has data, make it refreshable** — add a refresh button that re-renders
8. **Save new CSS/JS to the project's `components/` folder** — not inline in the HTML `<style>` block (keep it modular)

### Example: creating a new Agent Status Pipeline component
```css
/* components/agent-pipeline.css */
.agent-pipeline { display: flex; gap: 16px; padding: 16px; }
.agent-pipeline__stage {
  flex: 1; background: #fff; border: 1px solid #E9E9E9;
  border-radius: 4px; padding: 16px; text-align: center;
  font-family: var(--font-family);
}
.agent-pipeline__stage--active { border-color: #2C66DD; background: #F0F5FF; }
.agent-pipeline__count { font-size: 24px; font-weight: 500; color: #000; }
.agent-pipeline__label { font-size: 12px; color: #626262; margin-top: 4px; }
```

---

## Verification Checklist (Pre-Delivery)

### Screenshot Compliance
- [ ] Scanned bulk screenshot folder for user's requested screen BEFORE building
- [ ] If [Main] screenshot existed → every visible element from screenshot is present in output
- [ ] If no screenshot → identified closest reference and adapted layout from it
- [ ] All [Interaction] screenshots for same tab scanned and recreated as drawers/modals/dropdowns
- [ ] Sidemenu items match what's visible in the screenshot (if applicable)
- [ ] New screens placed in correct sidemenu position (verified from Sidemenu Expanded screenshots)

### Shell & Structure
- [ ] Shell structure matches the chosen Shell (A/B/C/D) exactly
- [ ] Reports pages use Shell C (NOT Shell A) — never dump reports into dashboard
- [ ] Settings pages use Shell B (NOT Shell A) — never dump settings into dashboard
- [ ] Every CSS class used has its CSS file linked in `<head>`

### HTML Validity & Design-System Compliance (MANDATORY — blocks delivery)
- [ ] Ran `python3 scripts/validate-html.py <path-to-index.html>` from workspace root — **exit code 0**
- [ ] No `<button>` contains another `<button>`, `<a href>`, `<input>`, `<select>`, `<textarea>`, or `<label>`
- [ ] Button+dropdown pairs are siblings inside a `position:relative` wrapper (not parent/child)
- [ ] `.line-tab__settings` uses `<span role="button" tabindex="0">` NOT `<button>` (nested button bug)
- [ ] **No raw `<input type="checkbox">` or `<input type="radio">`** — use `.form-checkbox` / `.form-radio`
- [ ] **No raw `<select>` tags anywhere** — use `form-dropdown.css` patterns
- [ ] **No `<button style="...">`** with background/border/color — use `.btn-primary` / `.btn-secondary` / `.btn-tertiary`
- [ ] **No inline `<style>` block redefines any class in the Elegant Class Catalog** (exception: Shell C flex-containment patch using only `flex/overflow/min-height/height/width/display/position` properties)

### TopNavBar & IA Map
- [ ] TopNavBar has all 11 tabs: Home, Reports, Compliance, Search, Security, Alerts, Cloud Protection, Settings, LogMe, Support, Top Blocked Countries
- [ ] Correct tab is `--selected`, ALL others are `--disabled`
- [ ] Checked bulk screenshots for existing line-tabs inside the target tab
- [ ] Existing sub-tabs shown as `--disabled`, new feature tabs as clickable

### Icons (14×14 Everywhere)
- [ ] All action icons are 14×14 inline SVG (no `<img>` tags for actions)
- [ ] Trend icons use `icon-tile-trend-up/down.svg` (not `icon-number-*`)
- [ ] Table cell-action icons are 14×14 inside 24×24 hit area
- [ ] All icon paths resolve to existing files in `assets/icons/`

### Scroll
- [ ] `html,body { overflow:hidden; height:100% }` is set
- [ ] `.app-shell { height:100vh; overflow:hidden }` is set
- [ ] Only ONE designated element scrolls (dash / table-scroll-area / panel)
- [ ] Every ancestor has `min-height:0; overflow:hidden` for flex containment
- [ ] Scrollable element has `flex:1; overflow-y:auto`

### Dashboard Structure
- [ ] Row order: stat cards → tiles → hybrid widgets (top to bottom, no exceptions)
- [ ] Stat cards: max 4 per row, icon-right style, animated, present on EVERY dashboard
- [ ] Tile row: max 3 tiles, max 1 row total, gap is 4px
- [ ] If 3 tiles don't fit in a row, keep 2 — NEVER push 3rd to next row
- [ ] Widgets are HYBRID: mix of ECharts + predefined JS widgets (not all same type)
- [ ] Alert feeds use `ElegantEChart.alertList()` JS API (no hand-coded HTML)
- [ ] Each line-tab view has visibly distinct layout/widget mix (no copy-paste dashboards)
- [ ] All items in a row have equal height (align-items: stretch), no empty space
- [ ] Max 3 widgets per row, chart types vary across rows

### Tile Widgets
- [ ] Tile widgets are in `.tile-grid` (NOT inside `.widget` cards)
- [ ] `.tile-grid` gap is `4px` (same as dash gap — NEVER larger)
- [ ] Grid has `repeat(3, 1fr)` on desktop, `repeat(2, 1fr)` at 1024px, `1fr` at 767px
- [ ] No square-shaped tiles (maintain ~2:1 aspect ratio)

### Form Components
- [ ] ALL filter dropdowns use `form-dropdown-wrap` (NEVER plain text or `<select>`)
- [ ] ALL text inputs use `form-input` wrapper (NEVER raw `<input>`)
- [ ] cal-input HTML order: `span.cal-input__text` BEFORE `span.cal-input__icon`

### 8-Point Grid & Spacing
- [ ] ALL spacing values are multiples of 8: 4/8/12/16/20/24
- [ ] No padding, margin, or gap exceeds 24px anywhere
- [ ] New custom components follow the same grid system

### Widget Layout
- [ ] Dashboard widget rows have max 3 widgets per row
- [ ] No widget type is duplicated in the same view
- [ ] Overflowing chart widgets get more flex space or move to next row (no inner scroll)
- [ ] Widget rows use `align-items: stretch` — no empty space in any row

### Animations
- [ ] Every widget, tile, stat card has `anim-fade-in-up` + staggered `anim-delay-N`
- [ ] `@keyframes fadeInUp` is defined in page CSS
- [ ] Refresh icon on every widget toolbar is functional (re-renders chart on click)
- [ ] Tile refresh uses returned function from `ElegantEChart.tileWidget()`

### New Components
- [ ] Any new component uses Elegant tokens (colors, font, radius, spacing)
- [ ] New component CSS follows BEM naming convention
- [ ] New component CSS/JS saved in project `components/` folder (not only inline)
- [ ] New components have entry animations and refresh capability

### Mode Compliance
- [ ] Operating mode detected correctly from user request (1=addon, 2=redesign, 3=specific)
- [ ] Mode 1: existing features shown as `--disabled`, new feature clickable, correct IA placement
- [ ] Mode 2: ALL [Main] screenshots in tab scanned and rebuilt — no screen skipped
- [ ] Mode 2: ALL [Interaction] screenshots recreated as Elegant drawers/modals/dropdowns
- [ ] Mode 3: exact screenshot found and replicated, OR closest reference used as template
- [ ] Mode 4: zero foreign CSS/JS, zero hardcoded colors outside tokens, zero non-Puvi fonts
- [ ] Mode 4: AI-created components use Elegant tokens, BEM naming, 8-point grid, entry animations
- [ ] Shell extended (not dumped) — new inputs/buttons added to base shell as needed
- [ ] If no shell fits, new shell follows Elegant structural principles (flex column, 100vh, proper scroll)

### Components-Wiki Usage
- [ ] Read `Components-Wiki/INDEX.md` before building
- [ ] Every component pulled from its wiki `.md` file (NOT hand-coded)
- [ ] Only created new components when no wiki file existed
- [ ] New components created using `design_tokens.md` token reference

### Popup = Drawer
- [ ] ALL popups, modals, and dialogs use the Drawer component (no custom modals)
- [ ] Old-theme centered modals converted to Elegant Drawers (slide from right)
- [ ] Drawer forms use `form_input.md` + `form_dropdown.md` components inside

### Delivery Completeness
- [ ] Single `index.html` delivered with ALL pages as line-tab panels
- [ ] ALL interactions recreated as Elegant Drawers (NOT custom modals/popups)
- [ ] Top-to-bottom coverage: multiple screens, sidemenu navigation, drawers, forms, tables, charts
- [ ] Every widget/tile/card animated with fade-in-up + staggered delays
- [ ] Clean Elegant theme — indistinguishable from predefined components

### Other
- [ ] Drawer footer uses ONLY `drawer__btn-save` and `drawer__btn-cancel`
- [ ] No foreign CSS/JS libraries introduced
- [ ] Master HTML created after all individual pages verified
