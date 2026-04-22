# Icon System

> Component: Icon System (Dual-Folder Architecture)
> CSS: none (inline styles) | JS: `icon-engine.js` | HTML ref: `icons.html`

## Quick Summary

The Elegant theme uses a **dual-folder icon architecture**: a locked `assets/icons/` folder for predefined component icons (exported from Figma, never modified), and an on-demand `assets/lucide-icons/` folder for custom/converted content fetched from the Lucide CDN. The `icon-engine.js` provides intelligent resolution from concepts, emojis, or class names to the correct Lucide icon file.

## Configuration

### Folder Architecture

| Folder | Purpose | Rule |
|---|---|---|
| `assets/icons/` | Elegant Library — Figma exports | **DO NOT TOUCH** — never add, modify, or delete |
| `assets/lucide-icons/` | On-demand Lucide icons | Accumulate per conversion — reuse existing, fetch only new |

### Lucide Icon Naming

Pattern: `{lucide-name}-{size}.svg`
Examples: `search-14.svg`, `bell-24.svg`, `trash-2-14.svg`

### Stroke Weight Rules

| Size | Stroke Width |
|---|---|
| ≤14 px | `1` |
| 16 px | `1.25` |
| ≥24 px | `1.5` |

### Size Grid (8-point aligned)

| Size | Usage |
|---|---|
| 10 px | Plus inside compact Add button |
| 12 px | Date pickers, mini chevrons |
| 14 px | **DEFAULT** — buttons, dropdowns, tables, sidebar, tiles |
| 16 px | Tile headers, stat cards, checkboxes, topnav |
| 24 px | Navigation, toolbar, action-bar, table row actions |
| 32 px | Hero sections, empty states |

### Predefined Component Icons (assets/icons/)

**Brand:** `logo-log360.svg`

**TopNavBar:** `icon-notification.svg`, `icon-question.svg`, `icon-user-avatar.svg`, `icon-apps-grid.svg`, `icon-search.svg`, `icon-plus.svg`

**SideMenu:** `icon-search-settings.svg`, `icon-troubleshoot.svg`, `icon-admin-settings.svg`, `icon-system-settings.svg`, `icon-sidemenu-settings.svg`, `icon-slider-close.svg`, `icon-sm-chevron-right.svg`, `icon-sm-chevron-down.svg`

**Header:** `icon-help.svg`

**Table — Action Bar:** `icon-actionbar-search.svg`, `icon-actionbar-filter.svg`, `icon-actionbar-refresh.svg`, `icon-view-type.svg`, `icon-chevron-left.svg`, `icon-chevron-right.svg`, `icon-chevron-down.svg`

**Table — Row Actions:** `icon-action-approve.svg`, `icon-action-edit.svg`, `icon-action-delete.svg`, `icon-action-more.svg`, `icon-checkbox.svg`, `icon-checkbox-checked.svg`, `icon-checkbox-indeterminate.svg`

**Table — Cell Icons:** `icon-agent.svg`, `icon-status-enabled.svg`, `icon-status-disabled.svg`

**Widget Toolbar:** `icon-widget-maximize.svg`, `icon-widget-schedule.svg`, `icon-widget-sort.svg`, `icon-widget-notification.svg`, `icon-refresh.svg`, `icon-more.svg`

**Line Tab:** `icon-linetab-settings.svg`

## Required Icons

N/A — this is the icon system itself.

## Complete HTML

```html
<!--
  ============================================================
  ICON SYSTEM — Dual-Folder Architecture
  ============================================================

  TWO icon folders serve different purposes:

  ┌─────────────────────────────────────────────────────────┐
  │  assets/icons/          (Elegant Library — DO NOT TOUCH) │
  │  Quality-checked exports from Figma Elegant library.    │
  │  Used ONLY by predefined components (TopNavBar,         │
  │  SideMenu, Header, Table, ActionBar, etc.)              │
  │  NEVER add to, modify, or delete from this folder.      │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │  assets/lucide-icons/   (On-Demand Lucide Icons)        │
  │  Open-source Lucide icons fetched during conversion.    │
  │  Used for ALL custom/converted content.                 │
  │  Icons accumulate — reuse existing, fetch only new.     │
  │  Naming: {lucide-name}-{size}.svg                       │
  │  Example: search-14.svg, bell-24.svg, trash-2-14.svg    │
  └─────────────────────────────────────────────────────────┘

  ENGINE FILE: ../predefined-components/icon-engine.js
  CDN SOURCE:  https://cdn.jsdelivr.net/npm/lucide-static@1.7.0/icons/

  ============================================================
  STROKE WEIGHT RULES (consistent per size, no exceptions)
  ============================================================
    ≤14px  → stroke-width: 1
     16px  → stroke-width: 1.25
    ≥24px  → stroke-width: 1.5

  ============================================================
  SIZE GRID (8-point aligned)
  ============================================================
    10px — plus inside compact Add button
    12px — date pickers, mini chevrons
    14px — DEFAULT (buttons, dropdowns, tables, sidebar, tiles)
    16px — tile headers, stat cards, checkboxes, topnav
    24px — navigation, toolbar, action-bar, table row actions
    32px — hero sections, empty states

  ============================================================
  PREDEFINED COMPONENT ICONS (assets/icons/ — do not replace)
  ============================================================

  BRAND
    logo-log360.svg

  TOPNAVBAR
    icon-notification.svg, icon-question.svg,
    icon-user-avatar.svg, icon-apps-grid.svg,
    icon-search.svg, icon-plus.svg

  SIDEMENU
    icon-search-settings.svg, icon-troubleshoot.svg,
    icon-admin-settings.svg, icon-system-settings.svg,
    icon-sidemenu-settings.svg, icon-slider-close.svg,
    icon-sm-chevron-right.svg, icon-sm-chevron-down.svg

  HEADER
    icon-help.svg

  TABLE — ACTION BAR
    icon-actionbar-search.svg, icon-actionbar-filter.svg,
    icon-actionbar-refresh.svg, icon-view-type.svg,
    icon-chevron-left.svg, icon-chevron-right.svg,
    icon-chevron-down.svg

  TABLE — ROW ACTIONS
    icon-action-approve.svg, icon-action-edit.svg,
    icon-action-delete.svg, icon-action-more.svg,
    icon-checkbox.svg, icon-checkbox-checked.svg,
    icon-checkbox-indeterminate.svg

  TABLE — CELL ICONS
    icon-agent.svg, icon-status-enabled.svg,
    icon-status-disabled.svg

  WIDGET TOOLBAR
    icon-widget-maximize.svg, icon-widget-schedule.svg,
    icon-widget-sort.svg, icon-widget-notification.svg,
    icon-refresh.svg, icon-more.svg

  LINE TAB
    icon-linetab-settings.svg

  ============================================================
  LUCIDE ICON USAGE (assets/lucide-icons/ — on-demand)
  ============================================================

  HTML Usage:
    <img src="./assets/lucide-icons/search-14.svg" alt="Search" width="14" height="14" />
    <img src="./assets/lucide-icons/bell-24.svg" alt="Notifications" width="24" height="24" />
    <img src="./assets/lucide-icons/shield-check-14.svg" alt="Secure" width="14" height="14" />

  Runtime Placeholder (optional):
    <i data-icon="search" data-icon-context="default"></i>
    <script>ElegantIcons.init();</script>

  ============================================================
-->
```

## Complete CSS

No dedicated CSS file — icons use inline width/height attributes and inherit color via `stroke: currentColor` where applicable.

## JavaScript API

See [Icon Engine](./icon-engine.md) for the full `icon-engine.js` API.

### Quick Usage

```html
<!-- Static (agent-time) -->
<img src="./assets/lucide-icons/search-14.svg" alt="Search" width="14" height="14" />

<!-- Runtime placeholder (optional) -->
<i data-icon="search" data-icon-context="default"></i>
<script>ElegantIcons.init();</script>
```

## Variants

N/A — the icon system is a utility, not a visual component.

## Assembly Notes

- **NEVER** modify `assets/icons/` — these are Figma library exports.
- **ALWAYS** use `assets/lucide-icons/` for custom content icons.
- Every icon at the same rendered size must use the same stroke weight.
- CDN source: `https://cdn.jsdelivr.net/npm/lucide-static@1.7.0/icons/`
- License: ISC (open source, free for commercial use).
