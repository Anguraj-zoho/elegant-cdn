# Design Tokens

> Source: `tokens.css`

## Quick Summary

All CSS custom properties (design tokens) used across the Elegant 1.0 component system. These tokens define the single source of truth for colors, typography, spacing, radii, and component dimensions. Every component in the system references these variables — hardcoding hex values outside this palette is forbidden.

Font: **Zoho Puvi** (self-hosted from `assets/fonts/`), available in Regular (400), Medium (500), Semibold (600), and Bold (700).

## 🧱 Z-index scale (READ BEFORE ADDING ANY OVERLAY)

Ad-hoc `z-index` values are banned. Use ONLY the following tokens so layer conflicts (dropdown trapped under classic-tab, popover hidden behind sticky header, etc.) cannot happen.

| Variable | Value | Layer |
|---|---|---|
| `--z-base` | 0 | Default in-flow content |
| `--z-sticky-table` | 20 | Sticky table header rows |
| `--z-sidemenu` | 50 | Side menu, OS picker |
| `--z-sidemenu-popover` | 60 | Side menu sub-popover |
| `--z-sticky-chrome` | 80 | Topnavbar, sticky page headers |
| `--z-floating-panel` | 300 | Floating menus opened from page-header buttons (e.g. Export History, Scheduled Reports popover) — NOT inside a drawer |
| `--z-dropdown` | 500 | `.form-dropdown` on the main page |
| `--z-tooltip` | 600 | Tooltips with pointer arrow |
| `--z-drawer-backdrop` | 900 | Modal backdrop |
| `--z-drawer` | 910 | Drawer surface |
| `--z-drawer-dropdown` | 920 | `.form-dropdown` whose trigger is INSIDE a drawer |
| `--z-drawer-tooltip` | 930 | Tooltip inside a drawer |
| `--z-toast` | 1400 | Toast notifications |
| `--z-notification` | 1500 | Full-width notification banners |
| `--z-debug-overlay` | 9999 | Dev-only overlays |

### Hard rules

1. **Never hardcode a z-index number.** Use `var(--z-*)`.
2. **Never use `z-index` without `position` on the same element.** It does nothing and misleads reviewers.
3. **Never give a parent `z-index` just to "raise content."** That creates a stacking context that traps descendant popovers — use `isolation: isolate` instead if you only need to confine stacking within a subtree (this is what `.classic-tab__headers` does).
4. **Inside a drawer, `.form-dropdown` auto-picks `--z-drawer-dropdown`.** No action needed.
5. **Dropdowns that could grow taller than a scrollable ancestor (drawer body, modal) must use the `.form-dropdown--portal` modifier** and be re-parented to `<body>` by `form-dropdown.js`. Otherwise `overflow:auto` on the ancestor will clip them.

### Known trap: `z-index: 1` on a wrapper

```css
/* ❌ WRONG — creates a stacking context that traps popovers painted from
   further up the DOM */
.some-header { position: relative; z-index: 1; }

/* ✅ RIGHT — confines stacking to the subtree without trapping external
   popovers */
.some-header { position: relative; isolation: isolate; }
```

This was the root cause of the Export History popover rendering under the classic-tab on the Windows Startup report.

---

## Complete CSS

```css
/* ============================================================
   DESIGN TOKENS — Extracted from Figma Elegant Components 1.0 via MCP
   Font: Zoho Puvi — self-hosted from static.zohocdn.com
   ============================================================ */

@font-face {
  font-family: 'Zoho Puvi';
  src: url('../assets/fonts/Zoho_Puvi_Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Zoho Puvi';
  src: url('../assets/fonts/Zoho_Puvi_Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Zoho Puvi';
  src: url('../assets/fonts/Zoho_Puvi_Semibold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Zoho Puvi';
  src: url('../assets/fonts/Zoho_Puvi_Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

:root {
  /* ── Font Stack ── */
  --font-family: 'Zoho Puvi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* ── TopNavBar Row 1 ── */
  --topnav-row1-bg: #272D42;       /* Figma: rgb(0.153,0.176,0.259) */
  --topnav-row1-height: 44px;
  --topnav-row1-padding: 3px 16px 3px 8px;

  /* ── TopNavBar Row 2 ── */
  --topnav-row2-bg: #343B52;       /* Figma: rgb(0.204,0.231,0.322) */
  --topnav-row2-height: 34px;
  --topnav-row2-padding: 0 8px;

  /* ── TopNavBar Logo ── */
  --logo-font-size: 18px;
  --logo-font-weight: 600;         /* Zoho Puvi Semibold */
  --logo-color: #FFFFFF;
  --logo-icon-size: 24px;
  --logo-area-padding: 4px 8px;
  --logo-area-gap: 8px;

  /* ── TopNavBar Tabs (in Row 2) ── */
  --nav-tab-height: 34px;
  --nav-tab-padding: 8px 12px;      /* Figma: 8px 16px — reduced 4px for browser font width */
  --nav-tab-font-size: 14px;        /* Figma: 14px Zoho Puvi */
  --nav-tab-font-weight: 400;      /* Zoho Puvi Regular */
  --nav-tab-unselected-bg: #343B52;
  --nav-tab-unselected-text: #D6D7DC;  /* Figma: rgb(0.839,0.843,0.863) */
  --nav-tab-selected-bg: #FFFFFF;
  --nav-tab-selected-text: #000000;

  /* ── TopNavBar Subscription ── */
  --subscription-bg: #272D42;
  --subscription-text: #D6D7DC;
  --subscription-font-size: 13px;
  --subscription-padding: 8px;
  --subscription-radius: 8px;

  /* ── TopNavBar Right Icons ── */
  --icon-container-size: 32px;
  --icon-container-radius: 8px;
  --icon-container-hover-bg: #3D4255;
  --icon-gap: 16px;
  --badge-font-size: 11px;
  --badge-radius: 10px;
  --badge-blue: #2C66DD;            /* Figma: rgb(0.173,0.400,0.867) */
  --badge-red: #DD1616;             /* Figma: rgb(0.867,0.086,0.086) */
  --badge-text: #FFFFFF;

  /* ── TopNavBar Search (Row 2 right) ── */
  --search-width: 200px;
  --search-height: 24px;
  --search-stroke: #586B7D;         /* Figma: rgb(0.345,0.376,0.490) */
  --search-radius: 4px;
  --search-padding: 0 6px 2px 6px;
  --search-font-size: 13px;
  --search-placeholder: #7E88AB;    /* Figma: rgb(0.494,0.533,0.669) */

  /* ── TopNavBar Add Button (Row 2 right) ── */
  --add-btn-bg: #6B7495;            /* Figma: rgb(0.420,0.455,0.584) */
  --add-btn-radius: 4px;
  --add-btn-padding: 4px 8px;
  --add-btn-font-size: 13px;
  --add-btn-height: 24px;
  --add-btn-gap: 6px;

  /* ── Sidebar ── */
  --sidebar-width: 240px;
  --sidebar-bg: #E9E9E9;            /* Figma: rgb(0.914,0.914,0.914) */
  --sidebar-stroke: #E9E9E9;
  --sidebar-active-bg: #DCDCDC;     /* Figma: rgb(0.863,0.863,0.863) */
  --sidebar-active-border: #2C66DD;
  --sidebar-item-height: 32px;
  --sidebar-l1-font-size: 13px;
  --sidebar-l1-font-weight: 500;    /* Zoho Puvi Medium */
  --sidebar-l1-padding-left: 12px;
  --sidebar-l2-subheader-padding-left: 32px;
  --sidebar-l2-item-padding-left: 54px;
  --sidebar-item-font-size: 12px;
  --sidebar-text-primary: #000000;
  --sidebar-text-secondary: #626262; /* Figma: rgb(0.384,0.384,0.384) */
  --sidebar-search-placeholder: #939393; /* Figma: rgb(0.576,0.576,0.576) */

  /* ── Header ── */
  --header-height: 40px;
  --header-title-font-size: 16px;
  --header-title-font-weight: 600;  /* Zoho Puvi Semibold */
  --header-title-color: #000000;
  --header-gap: 8px;                /* Figma: itemSpacing 8 */
  --header-border-bottom: #E9E9E9;  /* Figma: strokeBottomWeight 1, rgb(0.914) */
  --header-help-icon-size: 14px;
  --header-help-icon-color: #626262;

  /* ── Classic Tab ── */
  --classic-tab-padding-top: 16px;
  --classic-tab-header-height: 32px;
  --classic-tab-header-spacing: -1px;
  --classic-tab-selected-bg: #FFFFFF;
  --classic-tab-unselected-bg: #E9E9E9;
  --classic-tab-stroke: #DCDCDC;     /* Figma: rgb(0.863,0.863,0.863) */
  --classic-tab-font-size: 12px;
  --classic-tab-padding: 9px 16px;
  --classic-tab-body-bg: #FFFFFF;
  --classic-tab-body-padding: 16px;

  /* ── Button Row ── */
  --button-row-padding-top: 16px;
  --button-row-padding-bottom: 12px;

  /* ── Primary Button ── */
  --btn-primary-bg: #2C66DD;
  --btn-primary-text: #FFFFFF;
  --btn-primary-font-size: 12px;
  --btn-primary-height: 28px;
  --btn-primary-radius: 2px;
  --btn-primary-padding: 0 16px;

  /* ── Secondary Button (Figma: Secondary Button 740:68772 — white fill, 1px #2C66DD border, blue text/icons) ── */
  --btn-secondary-bg: #FFFFFF;
  --btn-secondary-border: #2C66DD;
  --btn-secondary-text: #2C66DD;
  --btn-secondary-hover-bg: #F0F6FF;      /* subtle blue tint on hover */
  --btn-secondary-disabled-opacity: 0.5;
  --btn-secondary-font-size: 12px;
  --btn-secondary-height: 28px;           /* matches primary for row alignment */
  --btn-secondary-radius: 2px;
  --btn-secondary-padding: 0 16px;

  /* ── Tertiary Button (Figma: Tertiary Button 740:68997 — white outlined neutral) ── */
  --btn-tertiary-bg: #FFFFFF;             /* Figma fill: rgb(1,1,1) white */
  --btn-tertiary-border: #ABABAB;         /* Figma stroke: rgb(0.671) solid grey @ 100% opacity */
  --btn-tertiary-text: #000000;           /* Figma text: rgb(0,0,0) pure black */
  --btn-tertiary-icon: #000000;           /* Figma icon stroke: rgb(0,0,0) */
  --btn-tertiary-hover-bg: #F5F5F5;       /* subtle grey tint on white */
  --btn-tertiary-disabled-opacity: 0.5;
  --btn-tertiary-font-size: 12px;
  --btn-tertiary-height: 28px;            /* matches primary/secondary for row baseline alignment */
  --btn-tertiary-radius: 2px;
  --btn-tertiary-padding: 0 16px;

  /* ── Table ── */
  --table-header-bg: #F5F5F5;
  --table-header-font-size: 12px;
  --table-header-font-weight: 500;    /* Zoho Puvi Medium */
  --table-header-color: #000000;      /* Figma: rgb(0,0,0) — BLACK not grey */
  --table-header-height: 32px;
  --table-row-height: 40px;
  --table-border: #DCDCDC;
  --table-hover-bg: #FAFAFA;
  --table-selected-bg: #F9FBFF;
  --table-selected-hover-bg: #F0F5FF;
  --table-font-size: 12px;
  --table-text-primary: #000000;

  /* ── Links ── */
  --link-color: #006AFF;
  --link-hover: #0055D4;

  /* ── Status Icons ── */
  --status-disabled: #DD1616;
  --status-enabled: #198019;

  /* ── ActionBar ── */
  --actionbar-height: 36px;
  --actionbar-bg: #FFFFFF;
  --actionbar-border: #DCDCDC;
  --actionbar-icon-size: 24px;           /* Figma: icons are 24x24 containers */
  --actionbar-gap: 8px;                  /* Figma: itemSpacing 8 */
  --actionbar-padding: 6px 4px;          /* Figma: padding 6 4 6 4 */
  --actionbar-separator-height: 16px;
  --actionbar-pagination-font-size: 12px;

  /* ── Table Actions Column ── */
  --table-action-icon-size: 24px;        /* Figma: action icons 24x24 */
  --table-action-icon-gap: 8px;          /* Figma: itemSpacing 8 */

  /* ── Main Content ── */
  --main-content-bg: #FFFFFF;
  --main-content-padding: 0 16px;

  /* ── Dashboard / Widget Grid ── */
  --dash-bg: #F5F5F5;
  --dash-gap: 4px;
  --dash-header-height: 28px;

  /* ── Widget Card ── */
  --widget-bg: #FFFFFF;
  --widget-border: #E9E9E9;
  --widget-radius: 4px;
  --widget-padding: 24px;
  --widget-title-gap: 8px;
  --widget-content-gap: 20px;

  /* ── Widget Typography ── */
  --widget-title-fs: 14px;
  --widget-title-fw: 600;
  --widget-title-color: #000000;
  --widget-label-fs: 11px;
  --widget-label-fw: 400;
  --widget-label-color: #626262;
  --widget-value-fs: 20px;
  --widget-value-fw: 400;
  --widget-value-color: #000000;
  --widget-value-lg-fs: 28px;
  --widget-value-xl-fs: 50px;
  --widget-value-xl-fw: 600;
  --widget-pct-fs: 12px;
  --widget-pct-fw: 600;
  --widget-pct-color: #000000;
  --widget-sub-fs: 11px;
  --widget-sub-color: #626262;

  /* ── Widget Toolbar Icons ── */
  --widget-toolbar-icon-size: 24px;
  --widget-toolbar-icon-bg: #D9D9D9;
  --widget-toolbar-icon-radius: 2px;
  --widget-toolbar-icon-pad: 5px;
  --widget-toolbar-gap: 8px;

  /* ── Widget Chart Colors ── */
  --chart-blue: #2C66DD;
  --chart-teal: #009CBB;
  --chart-purple: #A51C50;
  --chart-orange: #D14900;
  --chart-green: #198019;
  --chart-red: #DD1616;
  --chart-amber: #FABB34;
  --chart-light-blue: #4A90D9;
  --chart-grid: #E9E9E9;

  /* ── Alert Card (inside Recent Alerts widget) ── */
  --alert-card-bg: #FFFFFF;
  --alert-card-border: #E9E9E9;
  --alert-card-radius: 4px;
  --alert-card-padding: 12px;
  --alert-card-gap: 8px;
  --alert-card-body-fs: 11px;
  --alert-card-body-color: #626262;
  --alert-card-list-gap: 12px;

  /* ── Severity Badge Colors ── */
  --sev-critical-bg: #DD1616;
  --sev-high-bg: #FF5900;
  --sev-medium-bg: #FABB34;
  --sev-low-bg: #198019;
  --sev-verylow-bg: #626262;
  --sev-badge-text: #FFFFFF;
  --sev-badge-fs: 11px;
  --sev-badge-fw: 600;
  --sev-badge-radius: 4px;
  --sev-badge-pad: 2px 8px;
}

/* ── Base Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body {
  margin: 0;
  padding: 0;
  background: #FFFFFF;
  overflow-x: hidden;
}
body {
  min-height: 100vh;
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ── Scrollbar ── */
.scrollbar-thin::-webkit-scrollbar { width: 5px; }
.scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: #c4c4c4; border-radius: 3px; }
```

---

## Token Categories

### Font Stack

| Token | Value | Notes |
|-------|-------|-------|
| `--font-family` | `'Zoho Puvi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | System fallback chain |

**Font weights available:**

| Weight | Name | File |
|--------|------|------|
| 400 | Regular | `Zoho_Puvi_Regular.woff2` |
| 500 | Medium | `Zoho_Puvi_Medium.woff2` |
| 600 | Semibold | `Zoho_Puvi_Semibold.woff2` |
| 700 | Bold | `Zoho_Puvi_Bold.woff2` |

---

### TopNavBar Tokens

**Row 1 (Brand bar — dark):**

| Token | Value | Usage |
|-------|-------|-------|
| `--topnav-row1-bg` | `#272D42` | Row 1 background |
| `--topnav-row1-height` | `44px` | Row 1 height |
| `--topnav-row1-padding` | `3px 16px 3px 8px` | Row 1 internal padding |

**Row 2 (Tab bar — slightly lighter):**

| Token | Value | Usage |
|-------|-------|-------|
| `--topnav-row2-bg` | `#343B52` | Row 2 background |
| `--topnav-row2-height` | `34px` | Row 2 height |
| `--topnav-row2-padding` | `0 8px` | Row 2 internal padding |

**Logo area:**

| Token | Value | Usage |
|-------|-------|-------|
| `--logo-font-size` | `18px` | Logo text size |
| `--logo-font-weight` | `600` | Logo text weight (Semibold) |
| `--logo-color` | `#FFFFFF` | Logo text color |
| `--logo-icon-size` | `24px` | Logo icon dimensions |
| `--logo-area-padding` | `4px 8px` | Logo container padding |
| `--logo-area-gap` | `8px` | Gap between logo icon and text |

**Nav tabs (in Row 2):**

| Token | Value | Usage |
|-------|-------|-------|
| `--nav-tab-height` | `34px` | Tab button height |
| `--nav-tab-padding` | `8px 12px` | Tab button padding |
| `--nav-tab-font-size` | `14px` | Tab label font size |
| `--nav-tab-font-weight` | `400` | Tab label weight (Regular) |
| `--nav-tab-unselected-bg` | `#343B52` | Inactive tab background |
| `--nav-tab-unselected-text` | `#D6D7DC` | Inactive tab text color |
| `--nav-tab-selected-bg` | `#FFFFFF` | Active tab background |
| `--nav-tab-selected-text` | `#000000` | Active tab text color |

**Subscription badge:**

| Token | Value | Usage |
|-------|-------|-------|
| `--subscription-bg` | `#272D42` | Subscription area bg |
| `--subscription-text` | `#D6D7DC` | Subscription text color |
| `--subscription-font-size` | `13px` | Subscription text size |
| `--subscription-padding` | `8px` | Subscription area padding |
| `--subscription-radius` | `8px` | Subscription border radius |

**Right-side icons:**

| Token | Value | Usage |
|-------|-------|-------|
| `--icon-container-size` | `32px` | Icon button hit area |
| `--icon-container-radius` | `8px` | Icon button radius |
| `--icon-container-hover-bg` | `#3D4255` | Icon button hover |
| `--icon-gap` | `16px` | Gap between icon buttons |
| `--badge-font-size` | `11px` | Notification badge text |
| `--badge-radius` | `10px` | Badge border radius |
| `--badge-blue` | `#2C66DD` | Info badge color |
| `--badge-red` | `#DD1616` | Alert badge color |
| `--badge-text` | `#FFFFFF` | Badge text color |

**Search (Row 2 right):**

| Token | Value | Usage |
|-------|-------|-------|
| `--search-width` | `200px` | Search input width |
| `--search-height` | `24px` | Search input height |
| `--search-stroke` | `#586B7D` | Search border color |
| `--search-radius` | `4px` | Search border radius |
| `--search-padding` | `0 6px 2px 6px` | Search internal padding |
| `--search-font-size` | `13px` | Search text size |
| `--search-placeholder` | `#7E88AB` | Placeholder text color |

**Add button (Row 2 right):**

| Token | Value | Usage |
|-------|-------|-------|
| `--add-btn-bg` | `#6B7495` | Add button background |
| `--add-btn-radius` | `4px` | Add button radius |
| `--add-btn-padding` | `4px 8px` | Add button padding |
| `--add-btn-font-size` | `13px` | Add button text size |
| `--add-btn-height` | `24px` | Add button height |
| `--add-btn-gap` | `6px` | Gap between icon and text |

---

### Sidebar Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--sidebar-width` | `240px` | Desktop sidebar width |
| `--sidebar-bg` | `#E9E9E9` | Sidebar background |
| `--sidebar-stroke` | `#E9E9E9` | Sidebar border color |
| `--sidebar-active-bg` | `#DCDCDC` | Active item background |
| `--sidebar-active-border` | `#2C66DD` | Active item left accent |
| `--sidebar-item-height` | `32px` | Menu item height |
| `--sidebar-l1-font-size` | `13px` | Level-1 item font size |
| `--sidebar-l1-font-weight` | `500` | Level-1 item weight (Medium) |
| `--sidebar-l1-padding-left` | `12px` | Level-1 left padding |
| `--sidebar-l2-subheader-padding-left` | `32px` | Level-2 subheader indent |
| `--sidebar-l2-item-padding-left` | `54px` | Level-2 item indent |
| `--sidebar-item-font-size` | `12px` | Level-2 item font size |
| `--sidebar-text-primary` | `#000000` | Primary sidebar text |
| `--sidebar-text-secondary` | `#626262` | Secondary sidebar text |
| `--sidebar-search-placeholder` | `#939393` | Search placeholder color |

---

### Header Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--header-height` | `40px` | Page header height |
| `--header-title-font-size` | `16px` | Title text size |
| `--header-title-font-weight` | `600` | Title weight (Semibold) |
| `--header-title-color` | `#000000` | Title text color |
| `--header-gap` | `8px` | Gap between title elements |
| `--header-border-bottom` | `#E9E9E9` | Header bottom border |
| `--header-help-icon-size` | `14px` | Help icon dimensions |
| `--header-help-icon-color` | `#626262` | Help icon color |

---

### Classic Tab Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--classic-tab-padding-top` | `16px` | Space above tab headers |
| `--classic-tab-header-height` | `32px` | Tab header row height |
| `--classic-tab-header-spacing` | `-1px` | Negative margin for border overlap |
| `--classic-tab-selected-bg` | `#FFFFFF` | Active tab bg |
| `--classic-tab-unselected-bg` | `#E9E9E9` | Inactive tab bg |
| `--classic-tab-stroke` | `#DCDCDC` | Tab border color |
| `--classic-tab-font-size` | `12px` | Tab label font size |
| `--classic-tab-padding` | `9px 16px` | Tab button padding |
| `--classic-tab-body-bg` | `#FFFFFF` | Tab content background |
| `--classic-tab-body-padding` | `16px` | Tab content padding |

---

### Button Tokens

**Primary Button:**

| Token | Value | Usage |
|-------|-------|-------|
| `--btn-primary-bg` | `#2C66DD` | Background |
| `--btn-primary-text` | `#FFFFFF` | Text color |
| `--btn-primary-font-size` | `12px` | Label size |
| `--btn-primary-height` | `28px` | Button height |
| `--btn-primary-radius` | `2px` | Border radius |
| `--btn-primary-padding` | `0 16px` | Horizontal padding |

**Secondary Button:**

| Token | Value | Usage |
|-------|-------|-------|
| `--btn-secondary-bg` | `#FFFFFF` | Background (white) |
| `--btn-secondary-border` | `#2C66DD` | Border color (blue) |
| `--btn-secondary-text` | `#2C66DD` | Text color (blue) |
| `--btn-secondary-hover-bg` | `#F0F6FF` | Hover background |
| `--btn-secondary-disabled-opacity` | `0.5` | Disabled state opacity |
| `--btn-secondary-font-size` | `12px` | Label size |
| `--btn-secondary-height` | `28px` | Button height |
| `--btn-secondary-radius` | `2px` | Border radius |
| `--btn-secondary-padding` | `0 16px` | Horizontal padding |

**Tertiary Button:**

| Token | Value | Usage |
|-------|-------|-------|
| `--btn-tertiary-bg` | `#FFFFFF` | Background (white) |
| `--btn-tertiary-border` | `#ABABAB` | Border color (grey) |
| `--btn-tertiary-text` | `#000000` | Text color (black) |
| `--btn-tertiary-icon` | `#000000` | Icon color (black) |
| `--btn-tertiary-hover-bg` | `#F5F5F5` | Hover background |
| `--btn-tertiary-disabled-opacity` | `0.5` | Disabled state opacity |
| `--btn-tertiary-font-size` | `12px` | Label size |
| `--btn-tertiary-height` | `28px` | Button height |
| `--btn-tertiary-radius` | `2px` | Border radius |
| `--btn-tertiary-padding` | `0 16px` | Horizontal padding |

---

### Table Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--table-header-bg` | `#F5F5F5` | Table header background |
| `--table-header-font-size` | `12px` | Header cell font size |
| `--table-header-font-weight` | `500` | Header cell weight (Medium) |
| `--table-header-color` | `#000000` | Header cell text color |
| `--table-header-height` | `32px` | Header row height |
| `--table-row-height` | `40px` | Body row height |
| `--table-border` | `#DCDCDC` | Cell border color |
| `--table-hover-bg` | `#FAFAFA` | Row hover background |
| `--table-selected-bg` | `#F9FBFF` | Selected row background |
| `--table-selected-hover-bg` | `#F0F5FF` | Selected+hover row bg |
| `--table-font-size` | `12px` | Body cell font size |
| `--table-text-primary` | `#000000` | Body cell text color |

**ActionBar tokens:**

| Token | Value | Usage |
|-------|-------|-------|
| `--actionbar-height` | `36px` | ActionBar height |
| `--actionbar-bg` | `#FFFFFF` | ActionBar background |
| `--actionbar-border` | `#DCDCDC` | ActionBar border |
| `--actionbar-icon-size` | `24px` | Icon container size |
| `--actionbar-gap` | `8px` | Gap between items |
| `--actionbar-padding` | `6px 4px` | Internal padding |
| `--actionbar-separator-height` | `16px` | Vertical separator height |
| `--actionbar-pagination-font-size` | `12px` | Pagination text size |

**Table actions column:**

| Token | Value | Usage |
|-------|-------|-------|
| `--table-action-icon-size` | `24px` | Action icon hit area |
| `--table-action-icon-gap` | `8px` | Gap between action icons |

---

### Widget Tokens

**Card container:**

| Token | Value | Usage |
|-------|-------|-------|
| `--widget-bg` | `#FFFFFF` | Widget card background |
| `--widget-border` | `#E9E9E9` | Widget card border |
| `--widget-radius` | `4px` | Widget border radius |
| `--widget-padding` | `24px` | Widget internal padding |
| `--widget-title-gap` | `8px` | Gap below title |
| `--widget-content-gap` | `20px` | Gap between content sections |

**Widget typography:**

| Token | Value | Usage |
|-------|-------|-------|
| `--widget-title-fs` | `14px` | Widget title size |
| `--widget-title-fw` | `600` | Widget title weight |
| `--widget-title-color` | `#000000` | Widget title color |
| `--widget-label-fs` | `11px` | Label text size |
| `--widget-label-fw` | `400` | Label weight |
| `--widget-label-color` | `#626262` | Label color |
| `--widget-value-fs` | `20px` | Default value size |
| `--widget-value-fw` | `400` | Default value weight |
| `--widget-value-color` | `#000000` | Value color |
| `--widget-value-lg-fs` | `28px` | Large value size |
| `--widget-value-xl-fs` | `50px` | Extra-large value size |
| `--widget-value-xl-fw` | `600` | Extra-large value weight |
| `--widget-pct-fs` | `12px` | Percentage size |
| `--widget-pct-fw` | `600` | Percentage weight |
| `--widget-pct-color` | `#000000` | Percentage color |
| `--widget-sub-fs` | `11px` | Sub-text size |
| `--widget-sub-color` | `#626262` | Sub-text color |

**Widget toolbar:**

| Token | Value | Usage |
|-------|-------|-------|
| `--widget-toolbar-icon-size` | `24px` | Toolbar icon container |
| `--widget-toolbar-icon-bg` | `#D9D9D9` | Toolbar icon background |
| `--widget-toolbar-icon-radius` | `2px` | Toolbar icon radius |
| `--widget-toolbar-icon-pad` | `5px` | Toolbar icon padding |
| `--widget-toolbar-gap` | `8px` | Gap between toolbar items |

**Dashboard grid:**

| Token | Value | Usage |
|-------|-------|-------|
| `--dash-bg` | `#F5F5F5` | Dashboard canvas background |
| `--dash-gap` | `4px` | Gap between widgets |
| `--dash-header-height` | `28px` | Dashboard header height |
| `--main-content-bg` | `#FFFFFF` | Main content area background |
| `--main-content-padding` | `0 16px` | Main content side padding |

**Alert card (inside Recent Alerts widget):**

| Token | Value | Usage |
|-------|-------|-------|
| `--alert-card-bg` | `#FFFFFF` | Alert card background |
| `--alert-card-border` | `#E9E9E9` | Alert card border |
| `--alert-card-radius` | `4px` | Alert card radius |
| `--alert-card-padding` | `12px` | Alert card padding |
| `--alert-card-gap` | `8px` | Gap between alert elements |
| `--alert-card-body-fs` | `11px` | Alert body text size |
| `--alert-card-body-color` | `#626262` | Alert body text color |
| `--alert-card-list-gap` | `12px` | Gap between alert cards |

---

### Chart Color Palette

| Token | Hex | Swatch | Usage |
|-------|-----|--------|-------|
| `--chart-blue` | `#2C66DD` | 🔵 | Primary series / brand |
| `--chart-teal` | `#009CBB` | 🟢 | Secondary series |
| `--chart-purple` | `#A51C50` | 🟣 | Tertiary series |
| `--chart-orange` | `#D14900` | 🟠 | Fourth series |
| `--chart-green` | `#198019` | 🟢 | Success / positive |
| `--chart-red` | `#DD1616` | 🔴 | Error / critical |
| `--chart-amber` | `#FABB34` | 🟡 | Warning / medium |
| `--chart-light-blue` | `#4A90D9` | 🔵 | Alternative blue |
| `--chart-grid` | `#E9E9E9` | ⬜ | Grid lines / axis |

**Theme palette order (for ECharts):** `#2C66DD`, `#009CBB`, `#A51C50`, `#D14900`, `#198019`, `#DD1616`, `#FABB34`, `#4A90D9`

---

### Severity Badge Colors

| Token | Hex | Level |
|-------|-----|-------|
| `--sev-critical-bg` | `#DD1616` | Critical |
| `--sev-high-bg` | `#FF5900` | High |
| `--sev-medium-bg` | `#FABB34` | Medium |
| `--sev-low-bg` | `#198019` | Low |
| `--sev-verylow-bg` | `#626262` | Very Low |
| `--sev-badge-text` | `#FFFFFF` | Badge text (all levels) |
| `--sev-badge-fs` | `11px` | Badge font size |
| `--sev-badge-fw` | `600` | Badge font weight |
| `--sev-badge-radius` | `4px` | Badge border radius |
| `--sev-badge-pad` | `2px 8px` | Badge padding |

---

## Color Reference

Complete lookup table of every color in the token system:

| Hex | Token(s) | Usage |
|-----|----------|-------|
| `#000000` | `--nav-tab-selected-text`, `--sidebar-text-primary`, `--header-title-color`, `--table-header-color`, `--table-text-primary`, `--btn-tertiary-text`, `--btn-tertiary-icon`, `--widget-title-color`, `--widget-value-color`, `--widget-pct-color` | Primary text / headings |
| `#FFFFFF` | `--logo-color`, `--nav-tab-selected-bg`, `--btn-primary-text`, `--btn-secondary-bg`, `--btn-tertiary-bg`, `--badge-text`, `--sev-badge-text`, `--classic-tab-selected-bg`, `--classic-tab-body-bg`, `--widget-bg`, `--actionbar-bg`, `--main-content-bg`, `--alert-card-bg` | White backgrounds and text on dark |
| `#272D42` | `--topnav-row1-bg`, `--subscription-bg` | Dark brand (NavBar Row 1) |
| `#343B52` | `--topnav-row2-bg`, `--nav-tab-unselected-bg` | Medium dark (NavBar Row 2) |
| `#3D4255` | `--icon-container-hover-bg` | Icon hover state |
| `#2C66DD` | `--badge-blue`, `--sidebar-active-border`, `--btn-primary-bg`, `--btn-secondary-border`, `--btn-secondary-text`, `--chart-blue` | Primary brand blue |
| `#006AFF` | `--link-color` | Link text |
| `#0055D4` | `--link-hover` | Link hover |
| `#4A90D9` | `--chart-light-blue` | Light blue chart series |
| `#F0F6FF` | `--btn-secondary-hover-bg` | Blue tint hover |
| `#6B7495` | `--add-btn-bg` | Add button background |
| `#586B7D` | `--search-stroke` | Search border |
| `#7E88AB` | `--search-placeholder` | Search placeholder |
| `#D6D7DC` | `--nav-tab-unselected-text`, `--subscription-text` | Muted text on dark |
| `#E9E9E9` | `--sidebar-bg`, `--sidebar-stroke`, `--header-border-bottom`, `--widget-border`, `--alert-card-border`, `--chart-grid`, `--classic-tab-unselected-bg` | Light borders / dividers |
| `#DCDCDC` | `--sidebar-active-bg`, `--classic-tab-stroke`, `--table-border`, `--actionbar-border` | Medium borders |
| `#F5F5F5` | `--table-header-bg`, `--btn-tertiary-hover-bg`, `--dash-bg` | Light grey backgrounds |
| `#FAFAFA` | `--table-hover-bg` | Subtle hover |
| `#F9FBFF` | `--table-selected-bg` | Selected row |
| `#F0F5FF` | `--table-selected-hover-bg` | Selected+hover row |
| `#ABABAB` | `--btn-tertiary-border` | Grey button border |
| `#626262` | `--sidebar-text-secondary`, `--header-help-icon-color`, `--widget-label-color`, `--widget-sub-color`, `--alert-card-body-color`, `--sev-verylow-bg` | Secondary text / muted |
| `#939393` | `--sidebar-search-placeholder` | Sidebar search placeholder |
| `#D9D9D9` | `--widget-toolbar-icon-bg` | Widget toolbar icon bg |
| `#DD1616` | `--badge-red`, `--status-disabled`, `--chart-red`, `--sev-critical-bg` | Error / critical / red |
| `#FF5900` | `--sev-high-bg` | High severity orange |
| `#D14900` | `--chart-orange` | Chart orange series |
| `#FABB34` | `--chart-amber`, `--sev-medium-bg` | Warning / medium amber |
| `#198019` | `--status-enabled`, `--chart-green`, `--sev-low-bg` | Success / enabled green |
| `#009CBB` | `--chart-teal` | Teal chart series |
| `#A51C50` | `--chart-purple` | Purple chart series |

---

## Typography Scale

| Context | Size | Weight | Token |
|---------|------|--------|-------|
| Logo text | 18px | 600 (Semibold) | `--logo-font-size` |
| Nav tab labels | 14px | 400 (Regular) | `--nav-tab-font-size` |
| Page header title | 16px | 600 (Semibold) | `--header-title-font-size` |
| Sidebar L1 items | 13px | 500 (Medium) | `--sidebar-l1-font-size` |
| Sidebar L2 items | 12px | 400 (Regular) | `--sidebar-item-font-size` |
| Classic tab labels | 12px | 400 (Regular) | `--classic-tab-font-size` |
| Button labels | 12px | — | `--btn-primary-font-size` |
| Table header cells | 12px | 500 (Medium) | `--table-header-font-size` |
| Table body cells | 12px | 400 (Regular) | `--table-font-size` |
| Widget title | 14px | 600 (Semibold) | `--widget-title-fs` |
| Widget label | 11px | 400 (Regular) | `--widget-label-fs` |
| Widget value (default) | 20px | 400 (Regular) | `--widget-value-fs` |
| Widget value (large) | 28px | 400 (Regular) | `--widget-value-lg-fs` |
| Widget value (XL) | 50px | 600 (Semibold) | `--widget-value-xl-fs` |
| Widget percentage | 12px | 600 (Semibold) | `--widget-pct-fs` |
| Widget sub-text | 11px | 400 (Regular) | `--widget-sub-fs` |
| Badge text | 11px | 600 (Semibold) | `--sev-badge-fs` |
| Subscription text | 13px | — | `--subscription-font-size` |
| Search input | 13px | — | `--search-font-size` |
| Add button text | 13px | — | `--add-btn-font-size` |
| ActionBar pagination | 12px | — | `--actionbar-pagination-font-size` |
| Alert card body | 11px | — | `--alert-card-body-fs` |

---

## Spacing Scale

The system uses an **8-point grid** with a **hard ceiling of 24px** for all gaps, margins, and padding.

### Allowed spacing values

| Value | Common usage |
|-------|-------------|
| `4px` | Dash grid gap, tile grid gap, dash row gap, small internal gaps |
| `6px` | Add button gap, actionbar padding, search padding |
| `8px` | Logo gap, header gap, icon gap (small), widget title gap, actionbar gap, alert card gap, toolbar gap |
| `12px` | Nav tab padding (vertical), sidebar L1 padding-left, alert card padding, alert card list gap, stat card gap |
| `16px` | Main content side padding, classic tab body padding, classic tab top padding, button row top padding, form row gap, toolbar horizontal padding, sidebar L1 padding-left |
| `20px` | Widget content gap, stat card horizontal padding |
| `24px` | **Maximum** — widget card padding (the ceiling) |

### Hard ceiling enforcement

**Never use spacing values above 24px.** If you find yourself writing `margin: 32px`, `gap: 40px`, or `padding: 48px` — stop and reduce to 24px or lower.

### Border radius scale

| Value | Where |
|-------|-------|
| `2px` | Inputs, buttons, dropdowns, widget toolbar icons |
| `4px` | Cards, widgets, drawers, search input, severity badges, alert cards |
| `8px` | Icon containers, subscription badge |
| `10px` | Notification badges |

### Component heights (fixed)

| Component | Height |
|-----------|--------|
| TopNavBar total | 78px (44px + 34px) |
| TopNavBar Row 1 | 44px |
| TopNavBar Row 2 | 34px |
| Page header | 40px |
| Line-tab bar | 40px (32px quicklink) |
| Classic tab header | 32px |
| ActionBar | 36px |
| Table header row | 32px |
| Table body row | 40px |
| Sidebar item | 32px |
| Button height | 28px |
| Search input | 24px |
| Add button | 24px |
| Dashboard header | 28px |
