# Sidemenu — Variant 2: Reports

> Component: Sidemenu (Variant 2) | Width: 240px
> CSS: `sidemenu.css` | JS: `sidemenu.js` | HTML ref: `sidemenu-type2.html`

## Quick Summary

Variant 2 is the **Reports sidebar** used on all report listing / report viewer pages. It differs from Variant 1 in several key ways:

- **OS Dropdown** at the top (Windows / Unix/Linux selector)
- **Flat accordion** — L1 buttons have **no section icons**, just chevron + text (`sidemenu__l1--flat`)
- **No L2 sub-headers** — items are flat lists under each L1 category
- **Bottom links** — 3 sticky utility links: Scheduled Reports, Manage Reports, Need New Reports?
- **Collapse icon** uses `icon-sm-collapse.svg` (not `icon-slider-close.svg`)
- Search placeholder: "Search Reports (Ctrl+Space)"
- The `<aside>` has **both** `sidemenu` and `sidemenu--type2` classes

Use this variant whenever the page is a **Reports** page (Shell C layout).

---

## Configuration

### `data-active-item` attribute

Set `data-active-item="ItemName"` on the `<aside class="sidemenu sidemenu--type2">` element. The value must **exactly match** (case-sensitive) the text content of the target menu item.

On page load, `sidemenu.js` runs `initType2Active()` which:

1. Checks all `.sidemenu__l1--flat` buttons — if an L1 button's `<span>` text matches, it gets `sidemenu__l1--active` (blue left border on the L1 row itself)
2. Checks all `.sidemenu__item` links — if a sub-item text matches, it gets `sidemenu__item--active` and its parent section auto-expands
3. Chevron rotates to down on expanded sections

### L1-level vs L2-level active

- If the active item name matches an **L1 button text** (e.g., "Logon Reports"), the L1 button itself gets highlighted with `.sidemenu__l1--active` — a blue left-border indicator.
- If it matches a **sub-item text** (e.g., "All Events"), the sub-item gets `.sidemenu__item--active` and the parent section expands.

### Examples

```html
<aside class="sidemenu sidemenu--type2" data-active-item="All Events">
<aside class="sidemenu sidemenu--type2" data-active-item="Logon Reports">
<aside class="sidemenu sidemenu--type2" data-active-item="Threats Reports">
```

---

## Required Icons

| Icon file | Purpose | Size |
|---|---|---|
| `icon-os-windows.svg` | OS dropdown — Windows icon | 14×14 |
| `icon-os-linux.svg` | OS dropdown — Unix/Linux icon | 14×14 |
| `icon-sm-chevron-down.svg` | OS dropdown arrow + expanded section chevron (set by JS) | 14×14 |
| `icon-sm-chevron-right.svg` | Collapsed section chevron | 14×14 |
| `icon-search-settings.svg` | Search bar magnifying glass | 14×14 |
| `icon-sm-clock.svg` | Bottom link — Scheduled Reports | 14×14 |
| `icon-sm-manage.svg` | Bottom link — Manage Reports | 14×14 |
| `icon-sm-bulb.svg` | Bottom link — Need New Reports? | 14×14 |
| `icon-sm-collapse.svg` | Bottom bar collapse button | 14×14 |

All icons live under `../assets/icons/` relative to the HTML file.

---

## Complete HTML

```html
<!--
  ============================================================
  SIDEMENU TYPE 2 — Reports Sidebar (OS Dropdown + Search + Flat Accordion)
  ============================================================
  CANONICAL markup — production-aligned with Log360_cloud_demo.html.
  MANDATORY for every Reports page. NEVER build a custom reports
  sidebar. NEVER remove the OS dropdown or the search bar — they
  are the core affordances that distinguish Reports from other pages.

  CONFIGURATION:
  ─────────────
  Set data-active-item="ItemName" on the <aside> to auto-highlight a
  menu item. For L1-level highlighting (no expanded sub-items), the
  L1 button itself gets highlighted with a blue left-border indicator.

  OS DROPDOWN (top of sidebar):
  - Windows (default) or Unix/Linux
  - Click the dropdown to switch; OS icon + label swap automatically
  - Sections below refresh to match the OS's report categories

  SEARCH (below OS dropdown):
  - Placeholder: "Search Reports (Ctrl+Space)"
  - Ctrl+Space keyboard shortcut jumps focus into the input
  - Typing filters the section list in real-time

  FLAT ACCORDION (main body):
  - Each .sidemenu__section = one L1 button (flat — no section icon)
  - L1 uses chevron-right rotation to indicate expand/collapse state
  - Sub-items (.sidemenu__item) are hidden by default; expanded on click

  BOTTOM LINKS (sticky above collapse bar):
  - Scheduled Reports (clock icon)
  - Manage Reports (manage icon)
  - Need New Reports ? (bulb icon)
  All 3 bottom-link icons are 14×14, from the sm-* series.

  BOTTOM COLLAPSE BAR:
  - Uses icon-sm-collapse.svg (NOT icon-slider-close.svg — those are legacy)

  CSS:  tokens.css + sidemenu.css (includes Type 2 rules)
  JS:   sidemenu.js (OS dropdown + flat accordion + search filter logic)
  ============================================================
-->

<!-- ═══════ SIDEMENU TYPE 2 (w=240) — Reports ═══════ -->
<aside class="sidemenu sidemenu--type2" data-active-item="All Events" id="reports-sidemenu">
  <div class="sidemenu__scroll scrollbar-thin">

    <!-- OS Dropdown + divider + Search -->
    <div class="sidemenu__os-dropdown-wrap">
      <div class="sidemenu__os-dropdown">
        <img src="../assets/icons/icon-os-windows.svg" alt="" class="sidemenu__os-icon" />
        <span class="sidemenu__os-label">Windows</span>
        <div class="sidemenu__os-arrow">
          <img src="../assets/icons/icon-sm-chevron-down.svg" alt="" />
        </div>
        <div class="sidemenu__os-options">
          <div class="sidemenu__os-option" data-label="Windows" data-icon="../assets/icons/icon-os-windows.svg">
            <img src="../assets/icons/icon-os-windows.svg" alt="" /> Windows
          </div>
          <div class="sidemenu__os-option" data-label="Unix/Linux" data-icon="../assets/icons/icon-os-linux.svg">
            <img src="../assets/icons/icon-os-linux.svg" alt="" /> Unix/Linux
          </div>
        </div>
      </div>

      <div class="sidemenu__divider"></div>

      <div class="sidemenu__search">
        <img src="../assets/icons/icon-search-settings.svg" alt="" />
        <input type="text" placeholder="Search Reports (Ctrl+Space)" />
      </div>
    </div>

    <!-- ── Flat accordion menu items (Windows categories) ── -->

    <div class="sidemenu__section">
      <button class="sidemenu__l1 sidemenu__l1--flat">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <span>Windows Events</span>
      </button>
      <a href="#" class="sidemenu__item" style="display:none">All Events</a>
      <a href="#" class="sidemenu__item" style="display:none">Important Events</a>
    </div>

    <div class="sidemenu__section">
      <button class="sidemenu__l1 sidemenu__l1--flat">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <span>Logon Reports</span>
      </button>
    </div>

    <div class="sidemenu__section">
      <button class="sidemenu__l1 sidemenu__l1--flat">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <span>Logoff Reports</span>
      </button>
    </div>

    <div class="sidemenu__section">
      <button class="sidemenu__l1 sidemenu__l1--flat">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <span>Trend Reports</span>
      </button>
    </div>

    <div class="sidemenu__section">
      <button class="sidemenu__l1 sidemenu__l1--flat">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <span>Failed Logon Reports</span>
      </button>
    </div>

    <div class="sidemenu__section">
      <button class="sidemenu__l1 sidemenu__l1--flat">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <span>User Account Management</span>
      </button>
    </div>

    <div class="sidemenu__section">
      <button class="sidemenu__l1 sidemenu__l1--flat">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <span>Removable Disk Auditing</span>
      </button>
    </div>

    <div class="sidemenu__section">
      <button class="sidemenu__l1 sidemenu__l1--flat">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <span>SUDO Commands</span>
      </button>
    </div>

    <div class="sidemenu__section">
      <button class="sidemenu__l1 sidemenu__l1--flat">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <span>Mail Server Reports</span>
      </button>
    </div>

    <div class="sidemenu__section">
      <button class="sidemenu__l1 sidemenu__l1--flat">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <span>Threats Reports</span>
      </button>
    </div>

    <div class="sidemenu__section">
      <button class="sidemenu__l1 sidemenu__l1--flat">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <span>NFS Reports</span>
      </button>
    </div>

    <div class="sidemenu__section">
      <button class="sidemenu__l1 sidemenu__l1--flat">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <span>Others</span>
      </button>
    </div>

    <div class="sidemenu__section">
      <button class="sidemenu__l1 sidemenu__l1--flat">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <span>FTP Server Reports</span>
      </button>
    </div>

    <div class="sidemenu__section">
      <button class="sidemenu__l1 sidemenu__l1--flat">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <span>System Events</span>
      </button>
    </div>

    <div class="sidemenu__section">
      <button class="sidemenu__l1 sidemenu__l1--flat">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <span>Device Severity Reports</span>
      </button>
    </div>

  </div>

  <!-- Bottom links (3 canonical report utilities) -->
  <div class="sidemenu__bottom-links">
    <a href="#" class="sidemenu__bottom-link">
      <img src="../assets/icons/icon-sm-clock.svg" alt="" style="width:14px;height:14px;" />
      Scheduled Reports
    </a>
    <a href="#" class="sidemenu__bottom-link">
      <img src="../assets/icons/icon-sm-manage.svg" alt="" style="width:14px;height:14px;" />
      Manage Reports
    </a>
    <a href="#" class="sidemenu__bottom-link">
      <img src="../assets/icons/icon-sm-bulb.svg" alt="" style="width:14px;height:14px;" />
      Need New Reports ?
    </a>
  </div>

  <!-- Bottom collapse bar -->
  <div class="sidemenu__bottom">
    <button class="sidemenu__bottom-btn" title="Collapse sidebar">
      <img src="../assets/icons/icon-sm-collapse.svg" alt="" />
    </button>
  </div>
</aside>
```

---

## Complete CSS

These are **all** CSS rules from `sidemenu.css` — the shared base rules **plus** the Type 2–specific rules. Requires `tokens.css` for CSS custom properties.

```css
/* ============================================================
   SIDEMENU — Captured from Figma MCP
   Width: 240px | bg: #E9E9E9 | Items: h=32 each
   L1 headers: chevron(14x14) + section-icon(14x14) + text(13px Medium)
   L2 sub-header: padding-left 32px, 12px Regular, #626262
   L2 items: padding-left 54px, 12px Regular, black
   Active: bg #DCDCDC, border-left 3px solid #2C66DD
   Bottom bar: bg #DCDCDC, h=32, icon right-aligned
   ============================================================ */

.sidemenu {
  width: var(--sidebar-width);
  flex-shrink: 0;
  background: var(--sidebar-bg);
  border-right: 1px solid var(--sidebar-stroke);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: width 0.25s ease, opacity 0.2s ease;
  overflow: hidden;
}

/* Collapsed state */
.sidemenu--collapsed {
  width: 0;
  border-right: none;
  opacity: 0;
  pointer-events: none;
}

/* Expand toggle — visible only when sidebar is collapsed (desktop) */
.sidemenu-expand {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 40px;
  background: var(--sidebar-active-bg, #DCDCDC);
  border: 1px solid var(--sidebar-stroke, #E9E9E9);
  border-left: none;
  border-radius: 0 4px 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 50;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease 0.15s;
  padding: 0;
}
.sidemenu-expand img,
.sidemenu-expand svg {
  width: 14px;
  height: 14px;
  transform: rotate(180deg);
}
.sidemenu-expand--visible {
  opacity: 1;
  pointer-events: auto;
}
.sidemenu-expand:hover {
  background: #D0D0D0;
}

.sidemenu__scroll {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Search box */
.sidemenu__search-wrap {
  padding: 8px 8px 0 8px;
}
.sidemenu__search {
  display: flex;
  align-items: center;
  height: 26px;
  background: #FFFFFF;
  border: 1px solid var(--sidebar-stroke);
  border-radius: 3px;
  padding: 0 8px;
  gap: 6px;
}
.sidemenu__search img,
.sidemenu__search svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
.sidemenu__search input {
  background: transparent;
  border: none;
  outline: none;
  font-size: var(--sidebar-item-font-size);
  font-family: inherit;
  color: var(--sidebar-text-primary);
  width: 100%;
}
.sidemenu__search input::placeholder {
  color: var(--sidebar-search-placeholder);
}

/* Item section container */
.sidemenu__section {
  display: flex;
  flex-direction: column;
}

/* L1 header (e.g. "Log Source Configuration", "Admin Settings") */
.sidemenu__l1 {
  display: flex;
  align-items: center;
  gap: 8px;
  height: var(--sidebar-item-height);
  padding: 0 var(--sidebar-l1-padding-left);
  font-size: var(--sidebar-l1-font-size);
  font-weight: var(--sidebar-l1-font-weight);
  color: var(--sidebar-text-primary);
  cursor: pointer;
  background: var(--sidebar-bg);
  border: none;
  width: 100%;
  text-align: left;
  font-family: inherit;
  transition: background 0.12s;
}
.sidemenu__l1:hover {
  background: rgba(0, 0, 0, 0.04);
}

/* Chevron icon (14x14 from Figma) */
.sidemenu__chevron {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* Section icon next to L1 text (troubleshoot, admin, system) */
.sidemenu__l1-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* L2 sub-header (e.g. "Management", "MarketPlace") */
.sidemenu__l2-subheader {
  display: flex;
  align-items: center;
  height: var(--sidebar-item-height);
  padding: 0 8px 0 var(--sidebar-l2-subheader-padding-left);
  font-size: var(--sidebar-item-font-size);
  color: var(--sidebar-text-secondary);
}

/* L2 item (e.g. "Devices", "Applications") */
.sidemenu__item {
  display: flex;
  align-items: center;
  height: var(--sidebar-item-height);
  padding: 0 8px 0 var(--sidebar-l2-item-padding-left);
  font-size: var(--sidebar-item-font-size);
  font-weight: 400;
  color: var(--sidebar-text-primary);
  text-decoration: none;
  cursor: pointer;
  transition: background 0.12s;
}
.sidemenu__item:hover {
  background: rgba(0, 0, 0, 0.04);
}

/* Active item */
.sidemenu__item--active {
  background: var(--sidebar-active-bg);
  border-left: 3px solid var(--sidebar-active-border);
  padding-left: 51px; /* 54 - 3px border */
}
.sidemenu__item--active:hover {
  background: var(--sidebar-active-bg);
}

/* Disabled item state — non-clickable items for partial builds */
.sidemenu__item--disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}

/* Bottom bar (slider close icon, right-aligned) */
.sidemenu__bottom {
  flex-shrink: 0;
  border-top: 1px solid var(--sidebar-stroke);
  height: 32px;
  background: var(--sidebar-active-bg);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 16px;
}
.sidemenu__bottom-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
}
.sidemenu__bottom-btn img,
.sidemenu__bottom-btn svg {
  width: 14px;
  height: 14px;
}

/* ============================================================
   SIDEMENU TYPE 2 — Reports variant
   Flat accordion (no section icons), OS dropdown header,
   bottom links + "Need New Reports?" with bulb icon
   ============================================================ */

/* OS dropdown */
.sidemenu__os-dropdown-wrap {
  padding: 8px 8px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidemenu__os-dropdown {
  position: relative;
  display: flex;
  align-items: center;
  height: 26px;
  background: #FFFFFF;
  border: 1px solid var(--sidebar-stroke);
  border-radius: 3px;
  padding: 0 0 0 8px;
  cursor: pointer;
  user-select: none;
}
.sidemenu__os-dropdown:hover {
  border-color: #ABABAB;
}

.sidemenu__os-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.sidemenu__os-label {
  flex: 1;
  font-size: 12px;
  font-family: inherit;
  color: var(--sidebar-text-primary);
  padding: 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sidemenu__os-arrow {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-left: 1px solid var(--sidebar-stroke);
}
.sidemenu__os-arrow img,
.sidemenu__os-arrow svg {
  width: 14px;
  height: 14px;
}

/* Dropdown options panel */
.sidemenu__os-options {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #FFFFFF;
  border: 1px solid var(--sidebar-stroke);
  border-top: none;
  border-radius: 0 0 3px 3px;
  z-index: 60;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.sidemenu__os-options--open {
  display: block;
}
.sidemenu__os-option {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  padding: 0 8px;
  font-size: 12px;
  font-family: inherit;
  color: var(--sidebar-text-primary);
  cursor: pointer;
  transition: background 0.1s;
}
.sidemenu__os-option:hover {
  background: var(--table-hover-bg, #F0F6FF);
}
.sidemenu__os-option img,
.sidemenu__os-option svg {
  width: 14px;
  height: 14px;
}

/* Divider line between dropdown and search / sections */
.sidemenu__divider {
  height: 1px;
  background: #DCDCDC;
  margin: 0 8px;
  flex-shrink: 0;
}

/* Type 2 L1 item (flat accordion — no section icon, just chevron + text) */
.sidemenu__l1--flat {
  gap: 6px;
  padding: 0 8px 0 12px;
}

/* Type 2 active L1 (highlighted, blue left border) */
.sidemenu__l1--active {
  background: var(--sidebar-active-bg);
  border-left: 3px solid var(--sidebar-active-border);
  padding-left: 9px;
  font-weight: 500;
}
.sidemenu__l1--active:hover {
  background: var(--sidebar-active-bg);
}

/* Type 2 bottom links */
.sidemenu__bottom-links {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #DCDCDC;
  padding: 0;
}

.sidemenu__bottom-link {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--sidebar-text-primary);
  text-decoration: none;
  cursor: pointer;
  transition: background 0.12s;
}
.sidemenu__bottom-link:hover {
  background: rgba(0, 0, 0, 0.04);
}
.sidemenu__bottom-link img,
.sidemenu__bottom-link svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
```

---

## JavaScript API

The JavaScript file `sidemenu.js` is **shared between Variant 1 and Variant 2**. For Variant 2, the following Type 2–specific functions are relevant:

| Function | Purpose |
|---|---|
| `initOsDropdown()` | Opens/closes the OS dropdown panel. On option click, swaps the icon + label in the dropdown header. Closes on outside click. |
| `initFlatAccordion()` | Click a `.sidemenu__l1--flat` button to toggle show/hide of its child `.sidemenu__item` elements + chevron rotation. |
| `initType2Active()` | Reads `data-active-item` from `.sidemenu--type2`. Highlights matching L1 button (`.sidemenu__l1--active`) or sub-item (`.sidemenu__item--active`), auto-expands parent section. |
| `initType2ClickHighlight()` | On L1 click: clears all active states. On sub-item click: clears all active states, sets clicked item as active. |
| `initType2Search()` | Typing in search filters sections: hides entire L1 + children if no match, shows matching items. Empty query collapses all items back. |

Shared functions that also apply:

| Function | Purpose |
|---|---|
| `initSidebarToggle()` | Collapse/expand via bottom bar button (shared logic). |
| `initOverlayDrawer()` | Mobile/tablet overlay drawer (shared logic). |

### Full JavaScript (sidemenu.js)

```js
/* ============================================================
   SIDEMENU — Predefined JavaScript
   Reads data-active-item from <aside class="sidemenu"> and
   auto-activates the matching item + expands its parent section.
   Handles: desktop collapse/expand, mobile/tablet overlay drawer,
   section toggle, click highlight, and search filtering.

   Include via: <script src="../predefined-components/sidemenu.js"></script>
   ============================================================ */

(function () {
  'use strict';

  var CHEVRON_DOWN  = './assets/icons/icon-sm-chevron-down.svg';
  var CHEVRON_RIGHT = './assets/icons/icon-sm-chevron-right.svg';
  var TABLET_BREAKPOINT = 1024;

  function isOverlayMode() {
    return window.innerWidth <= TABLET_BREAKPOINT;
  }

  /* ── Read data-active-item and set the active menu item ── */
  function initActiveFromData() {
    var sidebar = document.querySelector('.sidemenu');
    if (!sidebar) return;

    var activeItemName = sidebar.getAttribute('data-active-item');
    if (!activeItemName) return;

    var items = sidebar.querySelectorAll('.sidemenu__item');
    items.forEach(function (item) {
      if (item.textContent.trim() === activeItemName) {
        item.classList.add('sidemenu__item--active');
      } else {
        item.classList.remove('sidemenu__item--active');
      }
    });
  }

  /* ── Auto-expand the section that contains the active item ── */
  function initAutoExpand() {
    var active = document.querySelector('.sidemenu__item--active');
    if (!active) return;

    var section = active.closest('.sidemenu__section');
    if (!section) return;

    var chevron  = section.querySelector('.sidemenu__chevron');
    var children = section.querySelectorAll(
      '.sidemenu__l2-subheader, .sidemenu__item'
    );

    children.forEach(function (el) { el.style.display = ''; });
    if (chevron) chevron.src = CHEVRON_DOWN;
  }

  /* ── Collapse / Expand sidebar (desktop + overlay close) ── */
  function initSidebarToggle() {
    var sidebar    = document.querySelector('.sidemenu');
    var collapseBtn = document.querySelector('.sidemenu__bottom-btn');
    var expandBtn  = document.getElementById('sidebarExpand');
    var backdrop   = document.querySelector('.sidemenu-backdrop');

    if (!sidebar || !collapseBtn || !expandBtn) return;

    function closeOverlay() {
      sidebar.classList.remove('sidemenu--overlay-open');
      if (backdrop) backdrop.classList.remove('sidemenu-backdrop--visible');
      document.body.style.overflow = '';
    }

    function collapse() {
      if (isOverlayMode()) {
        closeOverlay();
      }
      sidebar.classList.add('sidemenu--collapsed');
      expandBtn.classList.add('sidemenu-expand--visible');
      collapseBtn.title = 'Expand sidebar';
    }

    function expand() {
      sidebar.classList.remove('sidemenu--collapsed');
      expandBtn.classList.remove('sidemenu-expand--visible');
      collapseBtn.title = 'Collapse sidebar';
    }

    collapseBtn.addEventListener('click', function () {
      if (sidebar.classList.contains('sidemenu--collapsed')) {
        expand();
      } else {
        collapse();
      }
    });

    expandBtn.addEventListener('click', expand);
  }

  /* ── Mobile/Tablet: overlay drawer toggle ── */
  function initOverlayDrawer() {
    var sidebar  = document.querySelector('.sidemenu');
    var backdrop = document.querySelector('.sidemenu-backdrop');
    var hamburger = document.querySelector('.topnavbar__hamburger');

    if (!sidebar || !backdrop || !hamburger) return;

    function openDrawer() {
      sidebar.classList.add('sidemenu--overlay-open');
      backdrop.classList.add('sidemenu-backdrop--visible');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      sidebar.classList.remove('sidemenu--overlay-open');
      backdrop.classList.remove('sidemenu-backdrop--visible');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      if (sidebar.classList.contains('sidemenu--overlay-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    backdrop.addEventListener('click', closeDrawer);

    window.addEventListener('resize', function () {
      if (!isOverlayMode() && sidebar.classList.contains('sidemenu--overlay-open')) {
        closeDrawer();
      }
    });
  }

  /* ── L1 Section Expand / Collapse (skip --flat, handled by initFlatAccordion) ── */
  function initSectionToggle() {
    document.querySelectorAll('.sidemenu__l1:not(.sidemenu__l1--flat)').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var section  = btn.closest('.sidemenu__section');
        var chevron  = btn.querySelector('.sidemenu__chevron');
        var children = section.querySelectorAll(
          '.sidemenu__l2-subheader, .sidemenu__item'
        );

        var isOpen = children.length > 0 && children[0].style.display !== 'none';

        children.forEach(function (el) {
          el.style.display = isOpen ? 'none' : '';
        });

        if (chevron) {
          chevron.src = isOpen ? CHEVRON_RIGHT : CHEVRON_DOWN;
        }
      });
    });
  }

  /* ── Active Item Highlight on click ── */
  function initActiveItem() {
    var sidebar = document.querySelector('.sidemenu');

    document.querySelectorAll('.sidemenu__item').forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.sidemenu__item--active').forEach(function (el) {
          el.classList.remove('sidemenu__item--active');
        });
        item.classList.add('sidemenu__item--active');

        if (sidebar) {
          sidebar.setAttribute('data-active-item', item.textContent.trim());
        }
      });
    });
  }

  /* ── Search Filter ── */
  function initSearchFilter() {
    var input = document.querySelector('.sidemenu__search input');
    if (!input) return;

    input.addEventListener('input', function () {
      var query = input.value.toLowerCase().trim();

      document.querySelectorAll('.sidemenu__item').forEach(function (item) {
        var text = item.textContent.toLowerCase();
        item.style.display = (!query || text.includes(query)) ? '' : 'none';
      });
    });
  }

  /* ── Type 2: OS Dropdown toggle ── */
  function initOsDropdown() {
    document.querySelectorAll('.sidemenu__os-dropdown').forEach(function (dd) {
      var opts = dd.querySelector('.sidemenu__os-options');
      if (!opts) return;

      dd.addEventListener('click', function (e) {
        e.stopPropagation();
        opts.classList.toggle('sidemenu__os-options--open');
      });

      opts.querySelectorAll('.sidemenu__os-option').forEach(function (opt) {
        opt.addEventListener('click', function (e) {
          e.stopPropagation();
          var osLabel = dd.querySelector('.sidemenu__os-label');
          var osIcon  = dd.querySelector('.sidemenu__os-icon');
          if (osLabel) osLabel.textContent = opt.getAttribute('data-label');
          if (osIcon && opt.getAttribute('data-icon')) osIcon.src = opt.getAttribute('data-icon');
          opts.classList.remove('sidemenu__os-options--open');
        });
      });

      document.addEventListener('click', function () {
        opts.classList.remove('sidemenu__os-options--open');
      });
    });
  }

  /* ── Type 2: Flat L1 accordion toggle ── */
  function initFlatAccordion() {
    document.querySelectorAll('.sidemenu--type2 .sidemenu__l1--flat').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var section = btn.closest('.sidemenu__section');
        var chevron = btn.querySelector('.sidemenu__chevron');
        var children = section.querySelectorAll('.sidemenu__item');
        if (children.length === 0) return;
        var isOpen = children[0].style.display !== 'none';

        children.forEach(function (el) {
          el.style.display = isOpen ? 'none' : '';
        });
        if (chevron) {
          chevron.src = isOpen ? CHEVRON_RIGHT : CHEVRON_DOWN;
        }
      });
    });
  }

  /* ── Type 2: Active L1 from data-active-item ── */
  function initType2Active() {
    document.querySelectorAll('.sidemenu--type2').forEach(function (sidebar) {
      var activeItemName = sidebar.getAttribute('data-active-item');
      if (!activeItemName) return;

      sidebar.querySelectorAll('.sidemenu__l1--flat').forEach(function (btn) {
        var span = btn.querySelector('span');
        if (span && span.textContent.trim() === activeItemName) {
          btn.classList.add('sidemenu__l1--active');
          var section = btn.closest('.sidemenu__section');
          var chevron = btn.querySelector('.sidemenu__chevron');
          var children = section.querySelectorAll('.sidemenu__item');
          children.forEach(function (el) { el.style.display = ''; });
          if (chevron) chevron.src = CHEVRON_DOWN;
        }
      });

      sidebar.querySelectorAll('.sidemenu__item').forEach(function (item) {
        if (item.textContent.trim() === activeItemName) {
          item.classList.add('sidemenu__item--active');
          var section = item.closest('.sidemenu__section');
          if (section) {
            var chevron = section.querySelector('.sidemenu__chevron');
            var children = section.querySelectorAll('.sidemenu__item');
            children.forEach(function (el) { el.style.display = ''; });
            if (chevron) chevron.src = CHEVRON_DOWN;
          }
        }
      });
    });
  }

  /* ── Type 2: Click highlight for flat L1 items ── */
  function initType2ClickHighlight() {
    document.querySelectorAll('.sidemenu--type2 .sidemenu__l1--flat').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sidebar = btn.closest('.sidemenu--type2');
        sidebar.querySelectorAll('.sidemenu__l1--active').forEach(function (el) {
          el.classList.remove('sidemenu__l1--active');
        });
        sidebar.querySelectorAll('.sidemenu__item--active').forEach(function (el) {
          el.classList.remove('sidemenu__item--active');
        });
      });
    });

    document.querySelectorAll('.sidemenu--type2 .sidemenu__item').forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        var sidebar = item.closest('.sidemenu--type2');
        sidebar.querySelectorAll('.sidemenu__item--active').forEach(function (el) {
          el.classList.remove('sidemenu__item--active');
        });
        sidebar.querySelectorAll('.sidemenu__l1--active').forEach(function (el) {
          el.classList.remove('sidemenu__l1--active');
        });
        item.classList.add('sidemenu__item--active');
      });
    });
  }

  /* ── Type 2: Search filter for flat items ── */
  function initType2Search() {
    document.querySelectorAll('.sidemenu--type2 .sidemenu__search input').forEach(function (input) {
      input.addEventListener('input', function () {
        var query = input.value.toLowerCase().trim();
        var sidebar = input.closest('.sidemenu--type2');
        sidebar.querySelectorAll('.sidemenu__section').forEach(function (section) {
          var l1 = section.querySelector('.sidemenu__l1--flat');
          var items = section.querySelectorAll('.sidemenu__item');
          var l1Text = l1 ? l1.textContent.toLowerCase() : '';
          var anyVisible = false;

          if (!query) {
            if (l1) l1.style.display = '';
            items.forEach(function (it) { it.style.display = 'none'; });
            return;
          }

          if (l1Text.includes(query)) {
            if (l1) l1.style.display = '';
            anyVisible = true;
          }

          items.forEach(function (it) {
            if (it.textContent.toLowerCase().includes(query)) {
              it.style.display = '';
              anyVisible = true;
            } else {
              it.style.display = 'none';
            }
          });

          if (l1) l1.style.display = anyVisible ? '' : 'none';
        });
      });
    });
  }

  /* ── Bootstrap ── */
  function init() {
    initActiveFromData();
    initAutoExpand();
    initSidebarToggle();
    initOverlayDrawer();
    initSectionToggle();
    initActiveItem();
    initSearchFilter();
    initOsDropdown();
    initFlatAccordion();
    initType2Active();
    initType2ClickHighlight();
    initType2Search();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

---

## Menu Items

### Full hierarchy (L1 flat sections with sub-items)

All L1 sections use `sidemenu__l1--flat` (no section icon). Only the first section has sub-items in the canonical HTML; other sections can be populated as needed.

| # | L1 Section | Sub-items |
|---|---|---|
| 1 | **Windows Events** | All Events, Important Events |
| 2 | **Logon Reports** | *(expandable, no sub-items in canonical markup)* |
| 3 | **Logoff Reports** | *(expandable, no sub-items in canonical markup)* |
| 4 | **Trend Reports** | *(expandable, no sub-items in canonical markup)* |
| 5 | **Failed Logon Reports** | *(expandable, no sub-items in canonical markup)* |
| 6 | **User Account Management** | *(expandable, no sub-items in canonical markup)* |
| 7 | **Removable Disk Auditing** | *(expandable, no sub-items in canonical markup)* |
| 8 | **SUDO Commands** | *(expandable, no sub-items in canonical markup)* |
| 9 | **Mail Server Reports** | *(expandable, no sub-items in canonical markup)* |
| 10 | **Threats Reports** | *(expandable, no sub-items in canonical markup)* |
| 11 | **NFS Reports** | *(expandable, no sub-items in canonical markup)* |
| 12 | **Others** | *(expandable, no sub-items in canonical markup)* |
| 13 | **FTP Server Reports** | *(expandable, no sub-items in canonical markup)* |
| 14 | **System Events** | *(expandable, no sub-items in canonical markup)* |
| 15 | **Device Severity Reports** | *(expandable, no sub-items in canonical markup)* |

### Bottom Links (always visible, sticky)

- Scheduled Reports (`icon-sm-clock.svg`)
- Manage Reports (`icon-sm-manage.svg`)
- Need New Reports ? (`icon-sm-bulb.svg`)

---

## States

| State | Class / Mechanism | Description |
|---|---|---|
| **Active sub-item** | `.sidemenu__item--active` | Blue left border (3px), background `--sidebar-active-bg`. Set by JS from `data-active-item` or on click. Parent section auto-expands. |
| **Active L1 (flat)** | `.sidemenu__l1--active` | Blue left border (3px) on the L1 button itself, `font-weight: 500`, background `--sidebar-active-bg`. Used when the active item matches an L1 section name. |
| **Collapsed sidebar** | `.sidemenu--collapsed` | Width animates to 0, opacity 0, pointer-events none. |
| **Expanded sidebar** | Default (no modifier) | Width = `--sidebar-width` (240px), fully visible. |
| **Section expanded** | Children have `display: ''`, chevron src = `icon-sm-chevron-down.svg` | Sub-items visible under the L1 button. |
| **Section collapsed** | Children have `style="display:none"`, chevron src = `icon-sm-chevron-right.svg` | Default — sub-items hidden. |
| **OS dropdown open** | `.sidemenu__os-options--open` on the options panel | Dropdown options visible below the selector. Closes on outside click or option selection. |
| **Search filtering** | JS `initType2Search()` | Typing filters both L1 sections and sub-items. If no match in a section, the entire L1 row hides. Empty query resets to default collapsed state. |
| **Disabled item** | `.sidemenu__item--disabled` | `pointer-events: none`, `opacity: 0.5`, `cursor: not-allowed`. For partial builds. |
| **Overlay drawer** (mobile/tablet ≤1024px) | `.sidemenu--overlay-open` + `.sidemenu-backdrop--visible` | Sidebar slides over content, backdrop darkens page, body scroll locked. |

---

## Assembly Notes

- Place `<aside class="sidemenu sidemenu--type2">` inside `.app-body` as the **first child**, before `<main class="main-content">`.
- Variant 2 does **not** use a separate `<button class="sidemenu-expand">` — the collapse bar at the bottom handles both collapse and expand. If you need the expand-from-collapsed behavior, add the expand button after `</aside>` as in Variant 1.
- This variant is used in **Shell C** (Reports layout).
- Requires `tokens.css` loaded before `sidemenu.css` for CSS custom properties.
- Include `sidemenu.js` at the bottom of the page (before `</body>`) or use `defer`.
- The `id="reports-sidemenu"` on the `<aside>` is optional but useful for direct JS targeting.
- The OS dropdown defaults to "Windows". Selecting "Unix/Linux" swaps the icon and label; the report categories below should be dynamically updated to match the selected OS (application-level logic).
- The 3 bottom links (Scheduled Reports, Manage Reports, Need New Reports?) are **always visible** — they sit between the scrollable menu area and the collapse bar.
- Add `class="scrollbar-thin"` on `.sidemenu__scroll` for styled scrollbar (requires scrollbar utility CSS).
- The sidebar uses `flex-shrink: 0` so it never compresses — the `<main>` beside it takes the remaining width.
