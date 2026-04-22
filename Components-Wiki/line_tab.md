# Line Tab

> Component: Line Tab | Height: 40px (default/icon/dashboard), 32px (quicklink)
> CSS: `line-tab.css` | JS: `line-tab.js` | HTML ref: `line-tab.html`

## 🚦 line-tab vs classic-tab (when in doubt, pick line-tab)

Both components exist. They are NOT interchangeable.

| Scenario | Component | Why |
|---|---|---|
| Tabs inside a **drawer / modal / form** | **`line-tab`** | Drawer is already a card; a second frame is visual noise |
| **Segmented controls** (binary/ternary switch between views of the same data) | **`line-tab`** | No frame required |
| **Sub-navigation** within a page (pills, quicklinks) | **`line-tab.line-tab--quicklink`** | Pill variant designed for this |
| **Dashboard tabs** with right-side actions | **`line-tab` + `.line-tab__actions`** | Variant 4 has action slot |
| **Full-page framed content area** (e.g. Reports chart area, settings sections) | **`classic-tab`** | The `.classic-tab__body` IS the card |

**Architectural cue**: if you find yourself writing `<div class="classic-tab">` without also writing `<div class="classic-tab__body">` directly inside it, STOP — you want `line-tab`.

See `classic_tab.md` → "Pick-the-Right-Tab Decision Matrix" for the inverse view.

## ⚠ Required CSS link

**Every page using any `line-tab` variant MUST include:**

```html
<link rel="stylesheet" href="components/line-tab.css" />
```

Missing this link is the #1 cause of "quicklink / line-tab renders as plain buttons" bugs. The component CSS defines the entire variant system — without it you get browser-default `<button>` rendering.

## Quick Summary

The **Line Tab** is a horizontal tab-switching component from the Elegant 1.0 design system. It provides four distinct variants for different contexts:

| Variant | Class Modifier | Height | Use Case |
|---------|---------------|--------|----------|
| Default | `.line-tab` | 40px | Standard page sections with plain text tabs |
| Icon with Line Tab | `.line-tab.line-tab--with-icon` | 40px | Tabs that need a leading icon for visual identity |
| QuickLink | `.line-tab.line-tab--quicklink` | 32px | Compact pill-style links for sub-navigation |
| Dashboard Line Tab | `.line-tab` + `.line-tab__actions` | 40px | Dashboard pages with right-aligned action controls |

All variants share the same JS and support multiple independent groups on one page. Tab switching uses `data-tab` on headers mapped to `data-tab-content` on body panels.

## Configuration

| Setting | How |
|---------|-----|
| **Tab count** | Add/remove `<button class="line-tab__header">` elements inside `.line-tab__headers` |
| **Active tab** | Add `line-tab__header--selected` to the default tab; all others get `line-tab__header--unselected` |
| **Tab labels** | Set text content inside each `.line-tab__header` button |
| **Tab ID mapping** | Set `data-tab="id"` on each header, `data-tab-content="id"` on each body panel |
| **Visible panel** | Add `line-tab__content--active` to the default-visible body panel |
| **Checkbox (boolean)** | Add `<img class="line-tab__checkbox" src="icon-checkbox.svg">` inside each header |
| **Settings icon (boolean)** | Add `<button class="line-tab__settings">` inside each header |
| **Pagination (boolean)** | Add `.line-tab__pagination` block after `.line-tab__headers` |
| **Dashboard Settings (boolean)** | Add `.line-tab__dashboard-settings` block after `.line-tab__headers` |
| **Right Actions (Variant 4)** | Add `.line-tab__actions` block after `.line-tab__headers` |

## Required Icons

| Icon | Path | Used In |
|------|------|---------|
| Chevron Left | `../assets/icons/icon-chevron-left.svg` | Pagination prev button |
| Chevron Right | `../assets/icons/icon-chevron-right.svg` | Pagination next button |
| Chevron Down | `../assets/icons/icon-chevron-down.svg` | QuickLink arrow |
| Refresh | `../assets/icons/icon-actionbar-refresh.svg` | Pagination refresh |
| Filter | `../assets/icons/icon-actionbar-filter.svg` | Dashboard settings filter |
| Settings | `../assets/icons/icon-linetab-settings.svg` | Icon variant tab icon, Settings gear |
| Checkbox | `../assets/icons/icon-checkbox.svg` | Checkbox boolean |
| Calendar | `../assets/icons/icon-calendar-input.svg` | Dashboard calendar input |
| Lucide CDN icons | `<i data-lucide="name">` | Variant 4 action buttons (maximize-2, refresh-cw, settings, etc.) |

## Variants

### Variant 1: Default (Plain Text, h=40)

Standard line tabs with text labels. Selected tab has a blue bottom border (#2C66DD). Unselected tabs show a hover background (#E9E9E9).

**Figma:** `State=Line Tab`

```html
<div class="line-tab">
  <div class="line-tab__headers">
    <button class="line-tab__header line-tab__header--selected" data-tab="tab1">Tab Label 1</button>
    <button class="line-tab__header line-tab__header--unselected" data-tab="tab2">Tab Label 2</button>
    <button class="line-tab__header line-tab__header--unselected" data-tab="tab3">Tab Label 3</button>
  </div>
  <!-- Optional: Pagination (boolean Pagination#8642:0 = true) -->
  <!--
  <div class="line-tab__pagination">
    <button class="line-tab__pagination-btn" aria-label="Previous page">
      <img src="../assets/icons/icon-chevron-left.svg" alt="" />
    </button>
    <button class="line-tab__pagination-btn" aria-label="Next page">
      <img src="../assets/icons/icon-chevron-right.svg" alt="" />
    </button>
    <div class="line-tab__pagination-separator"></div>
    <button class="line-tab__pagination-refresh" aria-label="Refresh">
      <img src="../assets/icons/icon-actionbar-refresh.svg" alt="" />
    </button>
  </div>
  -->
  <!-- Optional: Dashboard Settings (boolean Dashboard Settings#23773:0 = true) -->
  <!--
  <div class="line-tab__dashboard-settings">
    <div class="line-tab__dashboard-settings-separator"></div>
    <button class="line-tab__dashboard-settings-btn" aria-label="Filter">
      <img src="../assets/icons/icon-actionbar-filter.svg" alt="" />
    </button>
  </div>
  -->
</div>
<div class="line-tab__body">
  <div class="line-tab__content line-tab__content--active" data-tab-content="tab1">
    <!-- Tab 1 content here -->
  </div>
  <div class="line-tab__content" data-tab-content="tab2">
    <!-- Tab 2 content here -->
  </div>
  <div class="line-tab__content" data-tab-content="tab3">
    <!-- Tab 3 content here -->
  </div>
</div>
```

**With Checkbox boolean enabled:**

```html
<div class="line-tab">
  <div class="line-tab__headers">
    <button class="line-tab__header line-tab__header--selected" data-tab="tab1">
      <img class="line-tab__checkbox" src="../assets/icons/icon-checkbox.svg" alt="" />
      Tab Label 1
    </button>
    <button class="line-tab__header line-tab__header--unselected" data-tab="tab2">
      <img class="line-tab__checkbox" src="../assets/icons/icon-checkbox.svg" alt="" />
      Tab Label 2
    </button>
  </div>
</div>
```

**With Settings icon boolean enabled:**

```html
<div class="line-tab">
  <div class="line-tab__headers">
    <button class="line-tab__header line-tab__header--selected" data-tab="tab1">
      Tab Label 1
      <!-- MUST be <span role="button"> not <button> — nested <button> is invalid HTML and closes the tab early, breaking the tab strip and everything below it. See LLM-WIKI "HTML Validity Rules". -->
      <span class="line-tab__settings" role="button" tabindex="0" aria-label="Settings" onclick="event.stopPropagation();/* open settings */">
        <img src="../assets/icons/icon-linetab-settings.svg" alt="" />
      </span>
    </button>
    <button class="line-tab__header line-tab__header--unselected" data-tab="tab2">
      Tab Label 2
      <span class="line-tab__settings" role="button" tabindex="0" aria-label="Settings" onclick="event.stopPropagation();/* open settings */">
        <img src="../assets/icons/icon-linetab-settings.svg" alt="" />
      </span>
    </button>
  </div>
</div>
```

> ⚠️ **Why `<span role="button">` instead of `<button>`?** The outer `<button class="line-tab__header">` is already a button. Per HTML5, a `<button>` is NOT allowed to contain any "interactive content" descendant (`<button>`, `<a href>`, `<input>`, `<select>`, `<textarea>`, `<label>`, `<details>`). If you nest a real `<button>` inside, the browser silently closes the outer tab at the inner button — all subsequent tabs pop out of the tab strip and the content area below appears blank. Using `<span role="button" tabindex="0">` is spec-compliant, keeps keyboard accessibility (via `tabindex`), and screen readers announce it correctly (via `role`).

---

### Variant 2: Icon with Line Tab (icon + text, h=40)

Each tab header includes a 14×14 icon before the text label. Uses `.line-tab--with-icon` modifier for tighter icon gap (6px instead of 8px).

**Figma:** `State=Icon with Line Tab`

```html
<div class="line-tab line-tab--with-icon">
  <div class="line-tab__headers">
    <button class="line-tab__header line-tab__header--selected" data-tab="tab1">
      <img class="line-tab__icon" src="../assets/icons/icon-linetab-settings.svg" alt="" />
      Tab Label 1
    </button>
    <button class="line-tab__header line-tab__header--unselected" data-tab="tab2">
      <img class="line-tab__icon" src="../assets/icons/icon-linetab-settings.svg" alt="" />
      Tab Label 2
    </button>
  </div>
</div>
<div class="line-tab__body">
  <div class="line-tab__content line-tab__content--active" data-tab-content="tab1">
  </div>
  <div class="line-tab__content" data-tab-content="tab2">
  </div>
</div>
```

---

### Variant 3: QuickLink (pill tabs, h=32)

Compact tabs with background fills instead of a bottom border. Selected state uses white background; active state uses light blue (#EAF0FC); hover uses #E9E9E9. Includes an optional dropdown arrow icon per tab.

**Figma:** `State=QuickLink`

```html
<div class="line-tab line-tab--quicklink">
  <div class="line-tab__headers">
    <button class="line-tab__header line-tab__header--selected" data-tab="ql1">
      QuickLink 1
      <img class="line-tab__arrow" src="../assets/icons/icon-chevron-down.svg" alt="" />
    </button>
    <button class="line-tab__header line-tab__header--unselected" data-tab="ql2">
      QuickLink 2
      <img class="line-tab__arrow" src="../assets/icons/icon-chevron-down.svg" alt="" />
    </button>
  </div>
</div>
<div class="line-tab__body">
  <div class="line-tab__content line-tab__content--active" data-tab-content="ql1">
  </div>
  <div class="line-tab__content" data-tab-content="ql2">
  </div>
</div>
```

---

### Variant 4: Dashboard Line Tab with Right Actions (h=40)

**MANDATORY for all dashboard tab conversions — no compromise.**

Tabs are left-aligned. The right side has a **dynamic action bar** (`.line-tab__actions`) containing any combination of:

| Action Element | Class | Size | When to Include |
|---------------|-------|------|-----------------|
| Calendar input | `.cal-input` | 280×26 | User HTML has date range / calendar |
| Expand button | `.line-tab__action-icon-btn` | 24×24 | User HTML has expand / fullscreen |
| Refresh button | `.line-tab__action-icon-btn` | 24×24 | User HTML has refresh |
| Download button | `.line-tab__action-icon-btn` | 24×24 | User HTML has export / download |
| Filter button | `.line-tab__action-icon-btn` | 24×24 | User HTML has filter |
| Separator | `.line-tab__action-separator` | 1px | Always placed before settings gear |
| Settings gear | `.line-tab__action-settings` | 40×40 | User HTML has settings / gear (rightmost) |

Icons: ALWAYS use Lucide CDN `<i data-lucide="name">` (14×14).

**Figma:** Dashboard variant with right-actions

```html
<div class="line-tab" style="padding-left:16px;">
  <div class="line-tab__headers">
    <button class="line-tab__header line-tab__header--selected" data-tab="tab1">Dashboard Tab 1</button>
    <button class="line-tab__header line-tab__header--unselected" data-tab="tab2">Dashboard Tab 2</button>
    <button class="line-tab__header line-tab__header--unselected" data-tab="tab3">Dashboard Tab 3</button>
  </div>
  <div class="line-tab__actions">

    <!-- Calendar / Date Range (optional — include if user HTML has date range) -->
    <div class="cal-input" title="Date Range">
      <span class="cal-input__text">2025-12-01 – 2026-12-01</span>
      <span class="cal-input__icon">
        <img src="../assets/icons/icon-calendar-input.svg" alt="" />
      </span>
    </div>

    <!-- Icon buttons — add/remove based on user's HTML input actions -->
    <button class="line-tab__action-icon-btn" title="Expand">
      <i data-lucide="maximize-2" style="width:14px;height:14px;"></i>
    </button>
    <button class="line-tab__action-icon-btn" title="Refresh">
      <i data-lucide="refresh-cw" style="width:14px;height:14px;"></i>
    </button>

    <!-- Separator — always placed before settings gear -->
    <div class="line-tab__action-separator"></div>

    <!-- Settings gear (rightmost) with dropdown -->
    <div class="gear-wrapper" style="position:relative;">
      <button class="line-tab__action-settings" title="Settings">
        <i data-lucide="settings" style="width:14px;height:14px;"></i>
      </button>
    </div>

  </div>
</div>
<div class="line-tab__body">
  <div class="line-tab__content line-tab__content--active" data-tab-content="tab1">
    Dashboard content here
  </div>
</div>
```

---

## Complete CSS

```css
/* ============================================================
   LINE TAB — Captured from Figma Elegant Components 1.0 via MCP
   Component Set ID: 529:18726 | Tab Item ID: 529:18070

   3 outer variants:
     State=Line Tab        → plain text tabs, h=40
     State=Icon with Line Tab → icon + text tabs, h=40
     State=QuickLink       → compact pill tabs, h=32

   9 inner tab-item states:
     LineTab  / Selected   → text #2C66DD, stroke-bottom 2px #2C66DD
     LineTab  / Hover      → text #000, bg #E9E9E9
     LineTab  / Unselected → text #000, no bg
     Icon     / Selected   → icon + text #2C66DD, stroke-bottom 2px
     Icon     / Hover      → icon + text #000, bg #E9E9E9
     Icon     / Unselected → icon + text #000
     Quicklink/ Selected   → text #000, bg #FFF
     Quicklink/ Active     → text #000, bg #EAF0FC
     Quicklink/ Hover      → text #000, bg #E9E9E9

   Booleans: Checkbox, back Icon (Settings gear), Pagination, Dashboard Settings
   ============================================================ */

:root {
  /* ── Line Tab tokens ── */
  --line-tab-height: 40px;
  --line-tab-font-size: 12px;
  --line-tab-font-weight: 400;
  --line-tab-gap: 12px;
  --line-tab-item-padding: 12px 8px;
  --line-tab-item-gap: 8px;
  --line-tab-border-bottom: #E9E9E9;
  --line-tab-selected-color: #2C66DD;
  --line-tab-selected-stroke: 2px;
  --line-tab-unselected-color: #000000;
  --line-tab-hover-bg: #E9E9E9;
  --line-tab-icon-size: 14px;
  --line-tab-icon-gap: 6px;

  /* ── QuickLink variant tokens ── */
  --quicklink-height: 32px;
  --quicklink-gap: 4px;
  --quicklink-item-padding: 9px 8px;
  --quicklink-selected-bg: #FFFFFF;
  --quicklink-active-bg: #EAF0FC;
  --quicklink-hover-bg: #E9E9E9;

  /* ── Pagination tokens ── */
  --line-tab-pagination-height: 24px;
  --line-tab-pagination-icon-size: 24px;
  --line-tab-pagination-icon-bg: #E9E9E9;
}

/* ── Line Tab container ── */
.line-tab {
  display: flex;
  align-items: center;
  height: var(--line-tab-height);
  border-bottom: 1px solid var(--line-tab-border-bottom);
  flex-shrink: 0;
  position: relative;
}

/* ── Tab headers wrapper ── */
.line-tab__headers {
  display: flex;
  align-items: center;
  gap: var(--line-tab-gap);
  height: 100%;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

/* ── Individual tab item ── */
.line-tab__header {
  display: flex;
  align-items: center;
  gap: var(--line-tab-item-gap);
  height: var(--line-tab-height);
  padding: var(--line-tab-item-padding);
  font-size: var(--line-tab-font-size);
  font-weight: var(--line-tab-font-weight);
  font-family: inherit;
  color: var(--line-tab-unselected-color);
  cursor: pointer;
  white-space: nowrap;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  transition: background 0.12s, color 0.12s, border-color 0.12s;
  line-height: 1;
  margin-bottom: -1px;
  box-sizing: border-box;
}

/* Selected state */
.line-tab__header--selected {
  color: var(--line-tab-selected-color);
  border-bottom-color: var(--line-tab-selected-color);
}

/* Unselected state */
.line-tab__header--unselected {
  color: var(--line-tab-unselected-color);
  border-bottom-color: transparent;
}

/* Hover state */
.line-tab__header--unselected:hover {
  background: var(--line-tab-hover-bg);
}

/* ── Icon inside tab (14x14) ── */
.line-tab__icon {
  width: var(--line-tab-icon-size);
  height: var(--line-tab-icon-size);
  flex-shrink: 0;
}

/* Icon with Line Tab variant uses smaller gap */
.line-tab--with-icon .line-tab__header {
  gap: var(--line-tab-icon-gap);
}

/* ── Settings gear icon (right side, optional boolean) ── */
.line-tab__settings {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--line-tab-icon-size);
  height: var(--line-tab-icon-size);
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
  flex-shrink: 0;
}
.line-tab__settings img,
.line-tab__settings svg {
  width: var(--line-tab-icon-size);
  height: var(--line-tab-icon-size);
}

/* ── Checkbox (optional boolean, 16x16) ── */
.line-tab__checkbox {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  cursor: pointer;
}
.line-tab__checkbox img,
.line-tab__checkbox svg {
  width: 16px;
  height: 16px;
}

/* ── Pagination (optional boolean, right-aligned) ── */
.line-tab__pagination {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  margin-left: auto;
  height: var(--line-tab-pagination-height);
}

.line-tab__pagination-btn {
  width: var(--line-tab-pagination-icon-size);
  height: var(--line-tab-pagination-icon-size);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: var(--line-tab-pagination-icon-bg);
  cursor: pointer;
  padding: 0;
  border-radius: 2px;
  transition: background 0.12s;
}
.line-tab__pagination-btn:hover {
  background: #DCDCDC;
}
.line-tab__pagination-btn img,
.line-tab__pagination-btn svg {
  width: 14px;
  height: 14px;
}

.line-tab__pagination-separator {
  width: 1px;
  height: 16px;
  background: #DCDCDC;
  flex-shrink: 0;
}

.line-tab__pagination-refresh {
  width: var(--line-tab-pagination-icon-size);
  height: var(--line-tab-pagination-icon-size);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: var(--line-tab-pagination-icon-bg);
  cursor: pointer;
  padding: 0;
  border-radius: 2px;
  transition: background 0.12s;
}
.line-tab__pagination-refresh:hover {
  background: #DCDCDC;
}
.line-tab__pagination-refresh img,
.line-tab__pagination-refresh svg {
  width: 14px;
  height: 14px;
}

/* ── Dashboard Settings (optional boolean, right-aligned) ── */
.line-tab__dashboard-settings {
  display: flex;
  align-items: center;
  gap: 0;
  flex-shrink: 0;
  margin-left: auto;
  height: var(--line-tab-height);
}

.line-tab__dashboard-settings-separator {
  width: 1px;
  height: 100%;
  background: var(--line-tab-border-bottom);
  flex-shrink: 0;
}

.line-tab__dashboard-settings-btn {
  width: 40px;
  height: var(--line-tab-height);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: #FFFFFF;
  cursor: pointer;
  padding: 0;
  border-bottom: 1px solid var(--line-tab-border-bottom);
  transition: background 0.12s;
}
.line-tab__dashboard-settings-btn:hover {
  background: #F5F5F5;
}
.line-tab__dashboard-settings-btn img,
.line-tab__dashboard-settings-btn svg {
  width: 14px;
  height: 14px;
}

/* ============================================================
   VARIANT 4: Dashboard Line Tab with Right Actions (h=40)
   Tabs left-aligned, right side has dynamic action items:
     Calendar input (280×26, Figma "Textbox without Label" Calendar:Daily)
     + icon buttons (24×24, Lucide CDN icons)
     + separator (1px #E9E9E9 full height)
     + settings gear (40×40)
   Gap: 8px between all action items for breathing space.
   MANDATORY for all dashboard pages — no compromise.
   ============================================================ */
.line-tab__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  margin-left: auto;
  height: var(--line-tab-height);
}

/* ── Calendar / Date Range Input (from Figma Textbox w/o Label, Calendar:Daily) ── */
.cal-input {
  display: flex;
  align-items: center;
  width: 280px;
  height: 26px;
  border: 1px solid #C4C4C4;
  border-radius: 2px;
  background: #fff;
  cursor: pointer;
  overflow: hidden;
  flex-shrink: 0;
}
.cal-input:hover { border-color: #ABABAB; }
.cal-input__text {
  flex: 1;
  padding: 3px 0 3px 12px;
  font-size: 12px;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: inherit;
  line-height: 1;
}
.cal-input__icon {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F5F5F5;
  border-left: 1px solid #C4C4C4;
  flex-shrink: 0;
  border-radius: 0 2px 2px 0;
}
.cal-input__icon img,
.cal-input__icon svg { width: 14px; height: 14px; }

/* ── Icon buttons (24×24, for Lucide icons or SVG assets) ── */
.line-tab__action-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: 2px;
  color: #626262;
}
.line-tab__action-icon-btn:hover { background: #F5F5F5; color: #000; }
.line-tab__action-icon-btn img,
.line-tab__action-icon-btn svg { width: 14px; height: 14px; }

/* ── Vertical separator ── */
.line-tab__action-separator {
  width: 1px;
  height: 100%;
  background: #E9E9E9;
  flex-shrink: 0;
}

/* ── Settings gear button (rightmost, 40×40) ── */
.line-tab__action-settings {
  width: 40px;
  height: var(--line-tab-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: none;
  cursor: pointer;
  padding: 0;
  border-bottom: 1px solid #E9E9E9;
  color: #626262;
}
.line-tab__action-settings:hover { background: #F5F5F5; color: #000; }
.line-tab__action-settings img,
.line-tab__action-settings svg { width: 14px; height: 14px; }

/* ── Legacy support: action-btn (dropdown-style button) ── */
.line-tab__action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 24px;
  padding: 5px 8px;
  font-family: inherit;
  font-size: 12px;
  color: #000;
  background: #fff;
  border: 1px solid #DCDCDC;
  border-radius: 2px;
  cursor: pointer;
  white-space: nowrap;
}
.line-tab__action-btn:hover { background: #F5F5F5; }
.line-tab__action-btn img,
.line-tab__action-btn svg { width: 12px; height: 12px; }
.line-tab__action-btn .line-tab__action-chevron { width: 8px; height: 8px; }

/* ── Line Tab body (content panels below tabs) ── */
.line-tab__body {
  display: flex;
  flex-direction: column;
}

.line-tab__content {
  display: none;
}

.line-tab__content--active {
  display: block;
}

/* ============================================================
   QUICKLINK VARIANT
   h=32, gap=4, pill-style tabs with bg fills
   ============================================================ */
.line-tab--quicklink {
  height: var(--quicklink-height);
}

.line-tab--quicklink .line-tab__headers {
  gap: var(--quicklink-gap);
}

.line-tab--quicklink .line-tab__header {
  height: var(--quicklink-height);
  padding: var(--quicklink-item-padding);
  border-bottom: none;
  margin-bottom: 0;
  border-radius: 0;
  gap: 4px;
}

.line-tab--quicklink .line-tab__header--selected {
  background: var(--quicklink-selected-bg);
  color: var(--line-tab-unselected-color);
}

.line-tab--quicklink .line-tab__header--active {
  background: var(--quicklink-active-bg);
  color: var(--line-tab-unselected-color);
}

.line-tab--quicklink .line-tab__header--unselected {
  background: transparent;
}

.line-tab--quicklink .line-tab__header--unselected:hover {
  background: var(--quicklink-hover-bg);
}

/* Arrow icon in quicklink tabs */
.line-tab__arrow {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
/* ── Disabled header state — non-clickable tabs for single-page builds ── */
.line-tab__header--disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .line-tab__headers {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .line-tab__headers::-webkit-scrollbar {
    display: none;
  }
  .line-tab__header {
    flex-shrink: 0;
  }
}

@media (max-width: 767px) {
  .line-tab__header {
    padding: 10px 6px;
    font-size: 11px;
  }
  .line-tab__pagination {
    gap: 4px;
  }
}
```

## JavaScript API

```js
/**
 * LINE TAB — Tab switching behavior
 * Captured from Figma Elegant Components 1.0
 *
 * Handles:
 *   - Click tab header → switch selected state + show/hide body panels
 *   - data-tab on headers maps to data-tab-content on body panels
 *   - Supports multiple independent line-tab groups on the same page
 *   - QuickLink variant works identically (same JS)
 *
 * Usage:
 *   Include this script AFTER the line-tab HTML.
 *   Tab headers need data-tab="id" attribute.
 *   Body panels need data-tab-content="id" attribute.
 *   The .line-tab__body must immediately follow the .line-tab container.
 */
(function () {
  'use strict';

  function initLineTab(tabContainer) {
    var headersWrap = tabContainer.querySelector('.line-tab__headers');
    var headers = headersWrap ? headersWrap.querySelectorAll(':scope > .line-tab__header') : tabContainer.querySelectorAll('.line-tab__header');
    var body = tabContainer.nextElementSibling;

    if (!body || !body.classList.contains('line-tab__body')) return;

    var panels = body.querySelectorAll(':scope > .line-tab__content');
    var isQuicklink = tabContainer.classList.contains('line-tab--quicklink');

    headers.forEach(function (header) {
      header.addEventListener('click', function () {
        var tabId = this.getAttribute('data-tab');
        if (!tabId) return;

        headers.forEach(function (h) {
          h.classList.remove('line-tab__header--selected');
          if (isQuicklink) {
            h.classList.remove('line-tab__header--active');
          }
          h.classList.add('line-tab__header--unselected');
        });

        this.classList.remove('line-tab__header--unselected');
        this.classList.add('line-tab__header--selected');

        panels.forEach(function (panel) {
          if (panel.getAttribute('data-tab-content') === tabId) {
            panel.classList.add('line-tab__content--active');
          } else {
            panel.classList.remove('line-tab__content--active');
          }
        });

        tabContainer.dispatchEvent(new CustomEvent('linetab:change', {
          bubbles: true,
          detail: { tabId: tabId, header: this }
        }));
      });
    });
  }

  function initAll() {
    document.querySelectorAll('.line-tab').forEach(initLineTab);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
```

## Assembly Notes

1. **Structure:** The `.line-tab` container and `.line-tab__body` must be **siblings** (body immediately follows the tab container). The JS uses `nextElementSibling` to find the body.

2. **Tab ID mapping:** Every `data-tab="X"` on a header must have a matching `data-tab-content="X"` on a body panel. Mismatched IDs will cause panels to not switch.

3. **Default active state:** Always set one header to `--selected` and one body panel to `--active` on page load. The JS does not auto-select a default.

4. **Multiple groups:** Multiple independent line-tab groups on the same page work automatically — the JS scopes switching to each `.line-tab` + its adjacent `.line-tab__body`.

5. **Custom event:** On tab switch, a `linetab:change` CustomEvent bubbles from the `.line-tab` container with `detail: { tabId, header }`. Listen on any ancestor to react to tab changes.

6. **Variant 4 actions are dynamic:** For dashboard pages, only include the action elements that match the user's original HTML. Don't add all actions by default — inspect the source and include only what's needed.

7. **Lucide CDN:** Variant 4 icon buttons use `<i data-lucide="name">`. Ensure the Lucide CDN script (`lucide.createIcons()`) runs after DOM load.

8. **CSS tokens:** Line Tab tokens are defined in `:root`. Override them for theme customization. QuickLink tokens are separate (`--quicklink-*`).

9. **Responsive:** Below 1024px, tab headers become horizontally scrollable. Below 767px, padding and font-size reduce.

10. **Disabled tabs:** Add `line-tab__header--disabled` to make a tab non-clickable (pointer-events: none, opacity: 0.5).
