# Header

> Component: Page Header
> CSS: `header.css` | JS: none | HTML ref: `header.html`

## ⚠ Critical Rules (READ BEFORE BUILDING)

- **Variant 3 (Report Header) is MANDATORY on every Reports data-table page (Shell C).** It requires all four action buttons: `Edit Report`, `Export As`, `Schedule Reports`, `More`. Skipping any of these is a bug — common failure is missing `Edit Report`.
- **Variants 1 & 2 are FORBIDDEN on Reports pages.** Use Variant 3.
- **Each action button's dropdown panel must be a SIBLING of the button, not a child** (see LLM-WIKI "HTML Validity Rules"). Wrap each button+panel in `<div class="ph-action-wrap" style="position:relative;">`.

## Quick Summary

The **Header** is a 40px-tall horizontal bar that sits at the top of the main content area (below the TopNavBar). It contains the page title and optional help icon, back button, or right-aligned action buttons. There are **3 variants**:

1. **Default (with Help Icon)** — Title + help icon. Used on most pages.
2. **With Back Button** — Back arrow + title. Used for drill-down/detail pages.
3. **Report Header (with Right Actions)** — Title + help + right-aligned action buttons (Edit Report, Export As, Schedule Reports, More). **MANDATORY** on every Reports data-table page (Shell C).

## Configuration

| Token | Value | Purpose |
|---|---|---|
| `--header-height` | `40px` | Header bar height |
| `--header-gap` | `8px` | Gap between items |
| `--header-border-bottom` | `#E9E9E9` | Bottom border colour |
| `--header-title-font-size` | `16px` | Title font size |
| `--header-title-font-weight` | `600` | Title font weight (Semibold) |
| `--header-title-color` | `#000000` | Title text colour |
| `--header-help-icon-size` | `14px` | Help icon size |
| `--header-help-icon-color` | `#626262` | Help icon colour |

## Required Icons

| Icon file | Purpose | Used in Variant |
|---|---|---|
| `icon-help.svg` | Help icon (14×14) | Variant 1 |
| `icon-back-arrow.svg` | Back arrow (14×14) | Variant 2 |
| `icon-report-help.svg` | Report help icon | Variant 3 |
| `icon-rpt-edit.svg` | Edit Report button | Variant 3 |
| `icon-rpt-export.svg` | Export As button | Variant 3 |
| `icon-rpt-schedule.svg` | Schedule Reports button | Variant 3 |
| `icon-rpt-more.svg` | More actions button | Variant 3 |

## Complete HTML

### Variant 1: Default — With Help Icon

```html
<div class="page-header">
  <h1 class="page-header__title">Page Title</h1>
  <button class="page-header__help" title="Help">
    <img src="../assets/icons/icon-help.svg" alt="" style="width:14px;height:14px;" />
  </button>
</div>
```

### Variant 2: With Back Button

```html
<div class="page-header">
  <button class="page-header__back" onclick="history.back()" title="Back">
    <img src="../assets/icons/icon-back-arrow.svg" alt="" />
  </button>
  <h1 class="page-header__title">Page Title</h1>
</div>
```

### Variant 3: Report Header — Title + Help + Right Actions

```html
<div class="page-header">
  <h1 class="page-header__title">All Events</h1>
  <button class="page-header__help" title="Help">
    <img src="../assets/icons/icon-report-help.svg" alt="" style="width:14px;height:14px;" />
  </button>
  <div class="page-header__actions">
    <button class="page-header__action-btn" title="Edit this report">
      <img src="../assets/icons/icon-rpt-edit.svg" alt="" />
      <span>Edit Report</span>
    </button>
    <button class="page-header__action-btn" title="Export report data">
      <img src="../assets/icons/icon-rpt-export.svg" alt="" />
      <span>Export As</span>
    </button>
    <button class="page-header__action-btn" title="Schedule periodic reports">
      <img src="../assets/icons/icon-rpt-schedule.svg" alt="" />
      <span>Schedule Reports</span>
    </button>
    <button class="page-header__action-btn" title="More actions">
      <img src="../assets/icons/icon-rpt-more.svg" alt="" />
      <span>More</span>
    </button>
  </div>
</div>
```

## Complete CSS

```css
/* ============================================================
   HEADER — Captured from Figma MCP
   Height: 40px | Layout: VERTICAL, inner HORIZONTAL
   Title: 16px Zoho Puvi Semibold (→ Inter 600), black
   Help icon: 14x14, #626262 stroke, gap 8px from title
   Bottom stroke: 1px solid #E9E9E9
   ============================================================ */

.page-header {
  display: flex;
  align-items: center;
  gap: var(--header-gap);                    /* 8px */
  height: var(--header-height);              /* 40px */
  flex-shrink: 0;
  border-bottom: 1px solid var(--header-border-bottom); /* #E9E9E9 */
}

.page-header__title {
  font-size: var(--header-title-font-size);  /* 16px */
  font-weight: var(--header-title-font-weight); /* 600 Semibold */
  color: var(--header-title-color);          /* #000000 */
  line-height: 1.2;
}

.page-header__help {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
}
.page-header__help:hover {
  opacity: 0.7;
}
.page-header__help img,
.page-header__help svg {
  width: 14px;
  height: 14px;
}

/* --- Back Button (Variant: Header with Back) --- */
.page-header__back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;
  border: 1px solid var(--table-border);        /* #DCDCDC */
  border-radius: 2px;
  background: transparent;
  padding: 0;
}
.page-header__back:hover {
  background: var(--table-hover-bg);            /* #F0F6FF */
  border-color: var(--btn-primary-bg);          /* #2C66DD */
}
.page-header__back img,
.page-header__back svg {
  width: 14px;
  height: 14px;
}

/* ── Report Header Actions (Variant 3: Report Header) ──
   Right-aligned button group containing Edit Report, Export As,
   Schedule Reports, More (and optional future actions).
   Each button: 24px height, transparent bg, icon+label.
   Used on every Reports data-table page to sit next to the title. */
.page-header__actions {
  margin-left: auto;                             /* push to far right */
  display: flex;
  align-items: center;
  gap: 4px;                                      /* Figma: itemSpacing 4 */
  flex-shrink: 0;
}

.page-header__action-btn {
  height: 24px;
  border: none;
  background: transparent;
  color: #000;
  font-size: 12px;
  font-family: var(--font-family);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
  border-radius: 2px;
  white-space: nowrap;
  transition: background 0.12s;
}
.page-header__action-btn:hover {
  background: #F0F0F0;
}
.page-header__action-btn:active {
  background: #E9E9E9;
}
.page-header__action-btn img,
.page-header__action-btn svg {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}
```

## Variants

### Variant 1: Default (with Help Icon)

- **Use case:** Most standard pages (Settings, Alerts, Compliance landing, etc.)
- **Elements:** `h1.page-header__title` + `button.page-header__help`
- **Customisation:** Change `<h1>` text for page title. Remove the help button if not needed.

### Variant 2: With Back Button

- **Use case:** Drill-down pages, detail views, sub-pages that need navigation back
- **Elements:** `button.page-header__back` + `h1.page-header__title`
- **Customisation:** Set `onclick` on `.page-header__back` for navigation. Optionally add `.page-header__help` after the title.
- **Back button spec:** 24×24 bordered frame with left-arrow icon, `border: 1px solid #DCDCDC`, hover: blue border + light blue bg

### Variant 3: Report Header (with Right Actions)

- **Use case:** **Every** Reports data-table page under the Reports TopNavBar tab
- **Elements:** `h1.page-header__title` + `button.page-header__help` + `div.page-header__actions` with `.page-header__action-btn` children
- **Standard 4 actions:** Edit Report, Export As, Schedule Reports, More
- **Button spec:** 24px height, transparent bg, 12×12 icon + 12px label, 8px horizontal padding, 4px icon-to-label gap, hover bg `#F0F0F0`, active bg `#E9E9E9`, 2px radius

## Assembly Notes

1. The header sits **inside** `.main-content` and **below** the TopNavBar.
2. It uses design tokens from `tokens.css` — ensure tokens are loaded first.
3. Variant 3 is **mandatory** for all Report pages — do not use Variant 1 or 2 for reports.
4. The `.page-header__actions` container uses `margin-left: auto` to push actions to the far right.
5. Back button hover state changes both background (`#F0F6FF`) and border colour (`#2C66DD`).
6. Help icon is 14×14 with `opacity: 0.7` on hover.
