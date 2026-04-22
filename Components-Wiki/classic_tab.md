# Classic Tab

> Component: Classic Tab | Height: 32px (header tabs)
> CSS: `classic-tab.css` | JS: `classic-tab.js` | HTML ref: `classic-tab.html`

## 🚦 Pick-the-Right-Tab Decision Matrix (READ THIS FIRST)

`classic-tab` is **not** a generic tab component. It's a **framed card container** with a tab strip on top. If your screen doesn't need the framed card, use `line-tab` instead.

| You need… | Use | Why |
|---|---|---|
| A card-framed content area with tabs on top (e.g. full report body, settings page section) | **`classic-tab`** | The bordered `.classic-tab__body` IS the card |
| A segmented control inside a **drawer / modal / form** to switch between two or more panes that don't need their own border | **`line-tab` (default)** | Panes render flush; no redundant frame inside the drawer |
| Compact pill tabs for sub-navigation (e.g. "Servers & Workstation \| Network Devices") | **`line-tab.line-tab--quicklink`** | 32px pills on a gray track |
| Icon + text tabs | **`line-tab.line-tab--with-icon`** | 14px icon slot |
| Dashboard tabs with right-side actions (calendar, refresh, settings gear) | **`line-tab` + `.line-tab__actions`** (Variant 4) | Built-in action slot |

**Rule of thumb**: if the tab body needs its own visible border/background, use `classic-tab`. If the tab body blends into the parent surface (drawer, form, modal), use `line-tab`.

## ⛔ Anti-pattern: `classic-tab` without `.classic-tab__body`

```html
<!-- ❌ WRONG — orphan tab strip (produced the "Customize View" drawer bug) -->
<div class="classic-tab">
  <div class="classic-tab__headers">
    <button class="classic-tab__header classic-tab__header--selected">Sorting and Limits</button>
    <button class="classic-tab__header classic-tab__header--unselected">Widget</button>
    <div class="classic-tab__filler"></div>
  </div>
</div>
<div class="drawer-form" data-cv-pane="sorting">...</div>
<div class="drawer-form" data-cv-pane="widget" style="display:none">...</div>
```

**Why it breaks:**
1. The selected tab's `border-bottom` is painted white to merge with the body — without `.classic-tab__body` that white border has nothing to merge into, leaving a gap.
2. The shelf/container effect comes from `.classic-tab__body`'s border — without it, the tab strip floats orphaned.
3. Index-based switching in `classic-tab.js` scans for `.classic-tab__body > .classic-tab__content` siblings. If they don't exist, switching is silently broken and developers invent their own `data-cv-tab` / `data-cv-pane` attributes (bypassing the built-in JS).

**Library self-defense (active since v1.0.1):** `.classic-tab:not(:has(> .classic-tab__body))` now draws a fallback border + background so the strip is never completely orphaned. But the correct fix is still to either add the body panel or switch to `line-tab`.

**Dev-time warning**: add `<html data-cta-debug>` to surface an inline red warning on any `.classic-tab` missing `.classic-tab__body`.

**✅ Correct for an in-drawer segmented control (use `line-tab`):**

```html
<div class="line-tab">
  <div class="line-tab__headers">
    <button class="line-tab__header line-tab__header--selected" data-tab="sorting">Sorting and Limits</button>
    <button class="line-tab__header line-tab__header--unselected" data-tab="widget">Widget</button>
  </div>
</div>
<div class="line-tab__body">
  <div class="line-tab__content line-tab__content--active" data-tab-content="sorting">
    <!-- form rows here -->
  </div>
  <div class="line-tab__content" data-tab-content="widget">
    <!-- form rows here -->
  </div>
</div>
```

**✅ Correct for a full-page framed area (use `classic-tab` WITH body):**

```html
<div class="classic-tab">
  <div class="classic-tab__headers">
    <button class="classic-tab__header classic-tab__header--selected">All Events</button>
    <button class="classic-tab__header classic-tab__header--unselected">Top Source</button>
    <div class="classic-tab__filler"></div>
  </div>
  <div class="classic-tab__body">
    <div class="classic-tab__content">
      <!-- chart / table content -->
    </div>
    <div class="classic-tab__content" style="display:none">
      <!-- chart / table content -->
    </div>
  </div>
</div>
```

## Quick Summary

The **Classic Tab** is a traditional tabbed container from the Elegant 1.0 design system. It features rectangular tab headers with a bordered body panel below. The selected tab has a white background that seamlessly merges with the body (its bottom border matches the body background), while unselected tabs have a gray (#E9E9E9) background. A filler element spans the remaining header width.

| Property | Value |
|----------|-------|
| Header height | 32px (`--classic-tab-header-height`) |
| Header spacing | -1px (`--classic-tab-header-spacing`, overlapping borders) |
| Tab padding | 9px 16px (`--classic-tab-padding`) |
| Font size | 12px (`--classic-tab-font-size`) |
| Selected bg | white (`--classic-tab-selected-bg`) |
| Unselected bg | #E9E9E9 (`--classic-tab-unselected-bg`) |
| Stroke color | #DCDCDC (`--classic-tab-stroke`) |
| Body padding | 16px all sides (`--classic-tab-body-padding`) |
| Body background | white (`--classic-tab-body-bg`) |

## Configuration

| Setting | How |
|---------|-----|
| **Tab count** | Add/remove `<button class="classic-tab__header">` elements inside `.classic-tab__headers` |
| **Active tab** | Add `classic-tab__header--selected` to ONE tab; all others get `classic-tab__header--unselected` |
| **Tab labels** | Set text content inside each `.classic-tab__header` button |
| **Tab content** | Place content inside `<div class="classic-tab__content">` panels inside `.classic-tab__body` |
| **Hidden panels** | Add `style="display:none"` to all non-active `.classic-tab__content` panels |
| **Prevent switching** | Add `data-no-switch` attribute to a header to disable JS tab switching for that tab |
| **Filler** | Always include `<div class="classic-tab__filler"></div>` as the last child in `.classic-tab__headers` |

## Required Icons

The Classic Tab component does not require any icons. All tab headers are plain text.

## Variants

### Variant 1: Classic Tab (Single Variant)

Rectangular tab headers with a white body panel. Selected tab merges visually with the body. The filler element fills remaining space in the header row with the unselected background color.

```html
<div class="classic-tab">
  <div class="classic-tab__headers">
    <button class="classic-tab__header classic-tab__header--selected">Tab 1</button>
    <button class="classic-tab__header classic-tab__header--unselected">Tab 2</button>
    <button class="classic-tab__header classic-tab__header--unselected">Tab 3</button>
    <div class="classic-tab__filler"></div>
  </div>

  <div class="classic-tab__body scrollbar-thin">
    <!-- Tab 1 content (visible by default) -->
    <div class="classic-tab__content">
      <!-- Place your content here: button-row, actionbar, table, form, etc. -->
    </div>

    <!-- Tab 2 content (hidden by default) -->
    <div class="classic-tab__content" style="display:none">
    </div>

    <!-- Tab 3 content (hidden by default) -->
    <div class="classic-tab__content" style="display:none">
    </div>
  </div>
</div>
```

---

## Complete CSS

```css
/* ============================================================
   CLASSIC TAB — Captured from Figma MCP
   Header tabs: h=32, spacing=-1px
   Selected: white bg | Unselected: #E9E9E9
   Stroke: #DCDCDC | Tab padding: 9px 16px
   Body: white bg, border except top, strokeTop=0
   ============================================================ */

.classic-tab {
  display: flex;
  flex-direction: column;
  padding-top: var(--classic-tab-padding-top);
}

/* Tab headers row */
.classic-tab__headers {
  display: flex;
  align-items: flex-end;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.classic-tab__header {
  display: flex;
  align-items: center;
  height: var(--classic-tab-header-height);
  padding: var(--classic-tab-padding);
  font-size: var(--classic-tab-font-size);
  font-family: inherit;
  font-weight: 400;
  border: 1px solid var(--classic-tab-stroke);
  cursor: pointer;
  white-space: nowrap;
  margin-right: var(--classic-tab-header-spacing);
  border-radius: 0;
  line-height: 1;
}

.classic-tab__header--selected {
  background: var(--classic-tab-selected-bg);
  color: var(--header-title-color);
  border-bottom-color: var(--classic-tab-selected-bg);
}

.classic-tab__header--unselected {
  background: var(--classic-tab-unselected-bg);
  color: var(--header-title-color);
}
.classic-tab__header--unselected:hover {
  background: #e0e0e0;
}

/* Filler (fills remaining space in header row) */
.classic-tab__filler {
  flex: 1;
  height: var(--classic-tab-header-height);
  background: var(--classic-tab-unselected-bg);
  border: 1px solid var(--classic-tab-stroke);
}

/* Tab body — hugs content (matches Figma primaryAxisSizingMode: AUTO) */
.classic-tab__body {
  background: var(--classic-tab-body-bg);
  border: 1px solid var(--classic-tab-stroke);
  border-top: none;
}

/* Inner content — matches Figma "Classic Tab table outer frame" padding: 16 all sides */
.classic-tab__content {
  padding: var(--classic-tab-body-padding);
}
```

**CSS Custom Properties (defined in tokens.css):**

| Token | Default | Purpose |
|-------|---------|---------|
| `--classic-tab-padding-top` | — | Top padding on the `.classic-tab` container |
| `--classic-tab-header-height` | 32px | Height of tab header buttons |
| `--classic-tab-padding` | 9px 16px | Padding inside tab headers |
| `--classic-tab-font-size` | 12px | Font size for tab labels |
| `--classic-tab-stroke` | #DCDCDC | Border color for tabs, filler, and body |
| `--classic-tab-header-spacing` | -1px | Negative margin to overlap tab borders |
| `--classic-tab-selected-bg` | #FFFFFF | Background for selected tab |
| `--classic-tab-unselected-bg` | #E9E9E9 | Background for unselected tabs and filler |
| `--classic-tab-body-bg` | #FFFFFF | Background for the body panel |
| `--classic-tab-body-padding` | 16px | Padding inside each content panel |
| `--header-title-color` | — | Text color for tab labels (shared token) |

## JavaScript API

```js
/* ============================================================
   CLASSIC TAB — Predefined JavaScript
   Handles tab switching for the classic-tab component.
   Include via: <script src="../predefined-components/classic-tab.js"></script>
   ============================================================ */

(function () {
  'use strict';

  function initClassicTabs() {
    document.querySelectorAll('.classic-tab').forEach(function (tabGroup) {
      var headersWrap = tabGroup.querySelector('.classic-tab__headers');
      if (!headersWrap) return;
      var headers = headersWrap.querySelectorAll(':scope > .classic-tab__header');
      var bodyWrap = tabGroup.querySelector(':scope > .classic-tab__body');
      var panels = bodyWrap ? bodyWrap.querySelectorAll(':scope > .classic-tab__content') : [];

      headers.forEach(function (header, index) {
        header.addEventListener('click', function () {
          if (header.hasAttribute('data-no-switch')) return;
          headers.forEach(function (h) {
            h.classList.remove('classic-tab__header--selected');
            h.classList.add('classic-tab__header--unselected');
          });

          header.classList.remove('classic-tab__header--unselected');
          header.classList.add('classic-tab__header--selected');

          panels.forEach(function (panel, i) {
            panel.style.display = (i === index) ? '' : 'none';
          });
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClassicTabs);
  } else {
    initClassicTabs();
  }
})();
```

## Assembly Notes

1. **Self-contained:** Unlike Line Tab, the Classic Tab is fully self-contained — `.classic-tab__body` is a **child** of `.classic-tab`, not a sibling. The JS queries within the `.classic-tab` scope.

2. **Index-based switching:** The JS matches headers to panels by **index position** (not by data attributes). The first header controls the first `.classic-tab__content`, the second header controls the second, etc. Order matters.

3. **Filler is required:** Always include `<div class="classic-tab__filler"></div>` as the last element in `.classic-tab__headers`. It fills remaining horizontal space with the unselected background and border, creating the visual "shelf" effect.

4. **Border trick:** The selected tab sets `border-bottom-color` to the same white as the body background, visually merging the tab with the body below. This only works when the tab and body share the same background color.

5. **Overlapping borders:** Headers use `margin-right: -1px` so adjacent tab borders overlap, preventing double-width borders between tabs.

6. **No data attributes needed:** Unlike Line Tab, Classic Tab does not use `data-tab` / `data-tab-content` attributes. Switching is purely index-based.

7. **Prevent switching:** Add `data-no-switch` to any header button to prevent the JS from switching tabs when that header is clicked. Useful for tabs that trigger custom behavior instead.

8. **Scrollbar:** The body has a `scrollbar-thin` utility class for thin custom scrollbars when content overflows.

9. **Multiple groups:** Multiple independent `.classic-tab` groups on the same page work automatically — the JS scopes each group with `querySelectorAll('.classic-tab').forEach(...)`.

10. **Content placement:** Place any content inside `.classic-tab__content` panels — button rows, action bars, tables, forms, charts, etc. Each panel gets 16px padding by default.
