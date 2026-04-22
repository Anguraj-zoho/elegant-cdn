# Components-Wiki — Master Index

> **Purpose**: Self-contained building block knowledge for every Elegant 1.0 component.
> Instead of reading raw CSS/JS files and guessing HTML structure, the agent reads ONE `.md` file per component and gets the complete HTML + CSS + JS + icons — ready to copy-paste and assemble.

---

## How the Agent Uses This Wiki

### Assembly Workflow
1. **Pick a Shell** → Read `app_shells.md` → Choose Shell A/B/C/D based on page type
2. **Get the Layout** → Read `layout_shell.md` → Copy the base HTML skeleton
3. **Add Shell Components** → Read the specific component MD files listed below
4. **Get Design Tokens** → Read `design_tokens.md` for CSS variable reference
5. **Assemble** → Slot each component's Complete HTML into the shell template
6. **If a component doesn't exist** → Use `design_tokens.md` color/spacing tokens to create a new one following the Elegant design system patterns

### Fallback Rule (read carefully — this is a TRAP)

**Before inventing anything, verify the component is truly missing.** 99% of the time it already exists and the agent just didn't open the right file. Common traps:

| Thing you think you need | Where it actually is |
|---|---|
| Filter textbox that opens a drawer | `form_input.md` → `.rpt-textbox--wide` |
| Checkbox | `form_input.md` → `.form-checkbox` (NEVER raw `<input type=checkbox>`) |
| Radio button | `form_input.md` → `.form-radio` (NEVER raw `<input type=radio>`) |
| Dropdown select | `form_dropdown.md` (NEVER native `<select>`) |
| Filter row on Reports page | `form_input.md` → `.reports-input-row--type1` |
| "+ Incident" button on actionbar | `actionbar.md` Type 8 → `.actionbar__btn-report` |
| Save / Cancel form buttons | `button-row.md` → `.btn-primary`, `.btn-secondary`, `.btn-tertiary` |
| Drawer with form fields | `drawer.md` → `.drawer-grid`, `.drawer-detail`, `.drawer-card`, `.form-group`, `.form-actions` |
| Chart/Grid toggle on Reports | `rpt-chart-floater.md` |
| Severity pill in tile | `tile_widgets.md` → `.ti-sev-row` |
| Stat-card colored background | `widget.md` → `.bg-red`, `.bg-blue`, etc. |
| **Segmented control inside a drawer** (e.g. "Sorting \| Widget") | `line_tab.md` default variant (NEVER `classic-tab` — no `__body` = broken strip) |
| **Remove drawer body padding** | `drawer.md` → `.drawer__body--no-pad` / `--flush-x` / `--flush-top` (NEVER inline `style="padding:0"`) |
| **Table/List view toggle on reports** | `rpt-chart-floater.md` (NOT a button in the actionbar — old theme put it in actionbar, Elegant moved it to the chart floater) |
| **Rows-per-page dropdown on reports** | Not part of `actionbar.md` Type 8 — use pagination text + prev/next. If you truly need a per-page picker, ask the user first |
| **Report page filter/search UI** | `form_input.md` → `.reports-input-row--type1` + `.rpt-textbox--*` (NEVER a bare `<input>` in the actionbar) |
| **Wider input inside a drawer form** | `form_input.md` → use `.form-row__input--full` modifier (NEVER inline `.form-row__input { flex: 1 }` — breaks the 280px invariant and the 432px dropdown-trigger bug) |
| **Narrow input inside a drawer form** | `form_input.md` → `.form-row__input--medium` (160) / `--small` (100). NEVER redefine `--small` to a custom width via inline CSS |
| **Consistent label widths in a drawer form** | `form_input.md` → `.drawer-form--labels-80/100/120/140/160/200` on the container. NEVER use `.form-row--gap-16` in a vertical drawer form (produces jagged hug-content labels) and NEVER decorate each `<label>` with per-row `--100/--140` modifiers (risks one row being forgotten) |
| **Z-index / stacking layer for any overlay** | `design_tokens.md` → use `var(--z-dropdown)` / `var(--z-drawer)` / `var(--z-floating-panel)` etc. NEVER hardcode a number. NEVER put `position: relative; z-index: 1` on a wrapper (use `isolation: isolate` to confine stacking) |

### Critical load-order traps

| Symptom | Root cause | Fix |
|---|---|---|
| Tabs render as plain text buttons with browser-default borders | CSS file for the component (e.g. `line-tab.css`) not linked in `<head>` | Check `<link rel="stylesheet">` entries against every component used; a missing file means the whole variant is unstyled |
| Drawer backdrop doesn't dim the page | Inline `<style>` overrides `.drawer-backdrop` / `.drawer` z-index lower than topnav / other UI | Let `drawer.css`'s canonical `z-index: 900/910` stand. Never override |
| Selected quicklink pill has no white background | `line-tab.css` missing from `<head>` — `.line-tab--quicklink .line-tab__header--selected` rule isn't loaded | Add the `<link>`. The library rule already paints the pill correctly |
| Hard-coded `<col width>` makes table columns uneven | `<colgroup>` uses fixed px widths instead of letting flex distribute | Checkbox column stays fixed (32px); all other `<col />` without width so `table-layout: fixed` distributes equally |
| `classic-tab` strip hangs orphaned (no shelf, no border) | `.classic-tab__body` missing | Either add the body, or switch to `line-tab` if it's a segmented control. Library self-defense draws a fallback border but the correct structure is still required |
| Dropdown trigger / textbox inside a drawer form is way wider than 280px (e.g. 432px) | Inline `<style>` redefined `.form-row__input` as `flex: 1; min-width: 0` — higher specificity than the library's fixed-width rule | Delete the inline override. `.form-row__input` is **280px by default** (Figma invariant); use `--medium` (160) / `--small` (100) / `--full` (capped fill) modifiers. Library clamps children at `max-width: 100%` as a safety net, but the inline rule must still be removed |
| Drawer form labels have inconsistent / jagged left edge | `.form-row--gap-16` applied to rows inside a vertical drawer form → hug-content labels, each a different width | Remove `--gap-16`. Put `.drawer-form--labels-100` (or whichever width fits the widest label) on the `.drawer-form` container — ONE class balances ALL labels |
| Dropdown panel / popover opens behind tabs, headers, or other UI | Hardcoded `z-index` value (e.g. `z-index: 70`) competing with library z-indexes, OR an ancestor has `position:relative; z-index:N` creating a stacking context that traps the overlay | Use `var(--z-*)` from `design_tokens.md` z-index scale. If an ancestor needs stacking confinement, use `isolation: isolate` (doesn't trap external overlays) instead of `z-index: 1` |

**Only if the component is genuinely missing after checking all of the above:**
- Check yourself: "Did I read every file for this page's recipe in INDEX.md?"
- If yes and still missing, create a new component using Elegant design tokens
- Follow BEM naming (`component__element--modifier`), 8-point spacing grid, Zoho Puvi font
- Propose the new class to the user with a short rationale — do not just add it silently
- **NEVER** redefine a class that already exists in a linked CSS file via an inline `<style>` block — this silently overrides the design system

---

## Shell & Layout Files

| File | Component | Variants | Use When |
|------|-----------|----------|----------|
| `app_shells.md` | App Shell Templates A/B/C/D | 4 shells | First step — decide page structure |
| `layout_shell.md` | Base HTML Skeleton | 1 | Every page — base template |
| `design_tokens.md` | CSS Variables & Reset | 1 | Every page — design tokens |

## Navigation Components

| File | Component | Variants | Use When |
|------|-----------|----------|----------|
| `topnavbar.md` | Top Navigation Bar | 1 (with states) | Every page — always included |
| `sidemenu_variant1_settings.md` | Sidemenu — Settings | 1 | Shell B (Settings pages) |
| `sidemenu_variant2_reports.md` | Sidemenu — Reports | 1 | Shell C (Reports pages) |
| `line_tab.md` | Line Tab | 4 variants | Shell A dashboards, sub-navigation |
| `classic_tab.md` | Classic Tab | 1 | Tabbed content inside main area |

## Content Components

| File | Component | Variants | Use When |
|------|-----------|----------|----------|
| `header.md` | Page Header | 3 variants | Every page with a title |
| `actionbar.md` | Action Bar | 8 variants | Above tables — pagination, filters |
| `data_table_type1.md` | Data Table Type 1 | 1 | Standard flat data tables |
| `data_table_type2.md` | Data Table Type 2 | 1 | Grouped/expandable tables |
| `widget.md` | Dashboard Widget Card | 10 patterns | Dashboard widget grid |
| `stat_card.md` | Stat Card / Tile Widget | 10 types | Dashboard KPI tiles |
| `button-row.md` | Button Row | 3 types | Form actions, toolbar buttons |
| `note-container.md` | Note Container | 1 | Info/warning notes |

## Chart & Visualization Components

| File | Component | Variants | Use When |
|------|-----------|----------|----------|
| `predefined_charts.md` | ECharts Wrapper API | 8 chart types | All charts (bar, line, donut, etc.) |
| `tile_widgets.md` | Tile Widget JS API | 10 types | Dashboard KPI tiles via JS |
| `echarts-widget.md` | ECharts Widget Engine | 1 | JS engine for all charts |
| `echarts-elegant-theme.md` | ECharts Theme | 1 | Theme registration for charts |
| `predefined-chart-geo-widget.md` | Geo Map Widget | 1 | World map visualizations |
| `predefined-chart-radar.md` | Radar Chart | 1 | Radar/spider charts |

## Overlay Components

| File | Component | Variants | Use When |
|------|-----------|----------|----------|
| `drawer.md` | Side Drawer | 4+ variants | Forms, details, settings panels |
| `form_input.md` | Form Inputs | Multiple | Text, textarea, checkbox, radio, etc. |
| `form_dropdown.md` | Form Dropdowns | 6 variants | Select, multi-select, search dropdown |

## Utility Files

| File | Component | Use When |
|------|-----------|----------|
| `icons.md` | Icon Catalog | Finding the right icon file |
| `icon-engine.md` | Icon Rendering Engine | Dynamic icon loading |
| `rpt-chart-floater.md` | Report Chart Floater | Floating chart panels on reports |

---

## Quick Lookup: "I need to build a..."

**Rule:** Every recipe below is a **complete list** — open every file named. Omitting any file will cause the agent to improvise and ship foreign CSS or raw HTML. Files marked ⚠ have **mandatory variant rules** the agent MUST follow.

### Recipe A — Dashboard tab (Shell A)

Used for: Home dashboard, Security dashboard, any tile+widget overview page.

**Required files (open all):**
1. `app_shells.md` — pick Shell A tree
2. `layout_shell.md` — base HTML skeleton + CSS load order
3. `design_tokens.md` — CSS variables, colors, spacing
4. `topnavbar.md` — top nav (11 tabs)
5. `line_tab.md` — sub-tabs inside the dashboard
6. `header.md` — page title row (Variant 1 default)
7. `widget.md` — widget cards (10 patterns)
8. `stat_card.md` — KPI tiles (10 types)
9. `tile_widgets.md` — tile JS API (10 types, `window.TileWidget.*`)
10. `predefined_charts.md` — chart wrapper API
11. `echarts-widget.md` — chart JS engine
12. `echarts-elegant-theme.md` — theme registration
13. `icons.md` — icon lookup
14. `form_input.md` — any filter inputs
15. `form_dropdown.md` — any filter dropdowns
16. `drawer.md` — detail drawers (every dashboard has at least one)
17. `button-row.md` — form / action buttons

### Recipe B — Settings page (Shell B)

Used for: all pages under the Settings sidemenu.

**Required files (open all):**
1. `app_shells.md` ⚠ (Shell B only — Settings MUST NOT use Shell A)
2. `layout_shell.md`
3. `design_tokens.md`
4. `topnavbar.md`
5. `sidemenu_variant1_settings.md` ⚠ (mandatory for every Settings page; do NOT build custom)
6. `header.md` (Variant 1 or 2)
7. `classic_tab.md` — tabs within settings pages
8. `data_table_type1.md` — data tables
9. `actionbar.md` — Type 1–7 (NOT Type 8 — that's Reports-only)
10. `form_input.md` — form fields
11. `form_dropdown.md` — all dropdowns
12. `drawer.md` — add/edit drawers
13. `button-row.md` ⚠ — Save/Cancel button rows
14. `note-container.md` — info/warning notes
15. `icons.md`

### Recipe C — Reports page (Shell C)

Used for: every page under the Reports sidemenu (All Events, Top Source, compliance reports, etc.).

**Required files (open all):**
1. `app_shells.md` ⚠ (Shell C only — Reports MUST NOT use Shell A or B)
2. `layout_shell.md`
3. `design_tokens.md`
4. `topnavbar.md`
5. `sidemenu_variant2_reports.md` ⚠ (mandatory; includes OS chip + search)
6. `header.md` ⚠ **Variant 3 mandatory** — Title + help + `Edit Report` + `Export As` + `Schedule Reports` + `More`
7. `classic_tab.md` — sub-tabs inside the report (chart views)
8. `rpt-chart-floater.md` ⚠ **mandatory on every report page** — chart/grid toggle, customize view
9. `predefined_charts.md` + `echarts-widget.md` + `echarts-elegant-theme.md` — chart API
10. `form_input.md` ⚠ — **`.reports-input-row--type1` + `.rpt-textbox--wide/medium/small` + `.rpt-filter-btn` + `.form-checkbox`**
11. `form_dropdown.md` ⚠ — **NEVER use `<select>`**
12. `data_table_type1.md` — data table
13. `actionbar.md` ⚠ **Type 8 mandatory** — uses `.actionbar__btn-report` (+ Incident) + alternate icons (`icon-ab-search`, `icon-ab-arrow-left/right`)
14. `drawer.md` — Customize View, Select Log Source, Select Columns, Export History, Filter, Incident Workbench
15. `button-row.md` — drawer footers
16. `note-container.md`
17. `icons.md`

### Recipe D — Detail / Split-panel page (Shell D)

Used for: Alert detail, Incident workbench, any page with a main body + right properties panel.

**Required files (open all):**
1. `app_shells.md` (Shell D)
2. `layout_shell.md`
3. `design_tokens.md`
4. `topnavbar.md`
5. `header.md` (Variant 2 — with Back button)
6. `line_tab.md` — sub-navigation inside the detail view
7. `data_table_type2.md` — grouped/expandable rows (distinct from `.data-table`; never mix classes)
8. `form_input.md` + `form_dropdown.md`
9. `drawer.md`
10. `button-row.md`
11. `note-container.md`
12. `icons.md`

### Recipe E — Form / Drawer only (embedded in any shell)

Used when adding a single drawer/modal to an existing page.

**Required files (open all):**
1. `drawer.md` ⚠ (every drawer needs paired `.drawer-backdrop` sibling)
2. `form_input.md` ⚠ **Use `.form-checkbox`, `.form-radio` — NEVER raw `<input type=checkbox/radio>`**
3. `form_dropdown.md` ⚠ **NEVER native `<select>`**
4. `button-row.md` ⚠ — Save/Cancel buttons (`.btn-primary`, `.btn-secondary`, `.btn-tertiary`)
5. `design_tokens.md`
6. `icons.md`

### Recipe F — Alert / Compliance page

Pick Shell based on page:
- **Alert list with table + chart** → Recipe C (same as Reports, uses `actionbar` Type 8 variant)
- **Alert detail** → Recipe D
- **Compliance dashboard** → Recipe A
- **Compliance report** → Recipe C

**Before building, always check the bulk screenshot folder** for an exact [Main] match, then determine which recipe above applies.

---

## How to Use These Recipes

1. Match your task to a recipe (A–F) based on the **page type**, not just the sidemenu label.
2. Open **every file listed** before writing any HTML. Do not skip files — each one contains rules not repeated elsewhere.
3. Files marked ⚠ have **mandatory variant rules** — read those files end-to-end, not just the first variant.
4. If a screenshot pattern doesn't match the wiki, the wiki wins. Either the screenshot shows a deprecated pattern or a new variant needs to be added to the wiki (ask the user first).
5. Never introduce a CSS class in an inline `<style>` block that is already defined in a linked CSS file. If the class doesn't do what you need, read the wiki's variant list — the variant you need is almost certainly already there.

---

## File Count Summary

- **Total wiki files**: 43
- **Total lines**: ~18,500
- **Coverage**: Every component in `data/components/` and `data/components/predefined-charts/`
