# Sidemenu — Variant 1: Settings

> Component: Sidemenu (Variant 1) | Width: 240px
> CSS: `sidemenu.css` | JS: `sidemenu.js` | HTML ref: `sidemenu.html`

## Quick Summary

Variant 1 is the **Settings sidebar** used on all configuration / admin pages. It features:

- A **search bar** at the top ("Search Settings")
- **Three L1 collapsible sections**, each with its own icon: Log Source Configuration, Admin Settings, System Settings
- **L2 sub-headers** (grey category labels) that group items inside the Admin Settings section
- **L2 items** (clickable links) nested under each L1 section
- A **bottom collapse bar** with `icon-slider-close.svg`
- An **expand button** that appears when the sidebar is collapsed

Use this variant whenever the page is a **Settings / Configuration / Admin** page (Shell B layout).

---

## Configuration

### `data-active-item` attribute

Set `data-active-item="ItemName"` on the `<aside class="sidemenu">` element. The value must **exactly match** (case-sensitive) the text content of the target menu item.

On page load, `sidemenu.js` reads this attribute and:

1. Finds the matching `.sidemenu__item` by its `textContent.trim()`
2. Adds `sidemenu__item--active` class to that item
3. Auto-expands the parent `.sidemenu__section` (chevron rotates down, children become visible)

**No manual class editing is needed** — all items start as plain links with `style="display:none"`.

### Examples

```html
<aside class="sidemenu" data-active-item="Applications">
<aside class="sidemenu" data-active-item="Manage Agents">
<aside class="sidemenu" data-active-item="Storage Tiers">
```

---

## Required Icons

| Icon file | Purpose | Size |
|---|---|---|
| `icon-search-settings.svg` | Search bar magnifying glass | 14×14 |
| `icon-sm-chevron-right.svg` | L1 chevron (collapsed state) | 14×14 |
| `icon-sm-chevron-down.svg` | L1 chevron (expanded state — set by JS) | 14×14 |
| `icon-troubleshoot.svg` | L1 section icon for "Log Source Configuration" | 14×14 |
| `icon-admin-settings.svg` | L1 section icon for "Admin Settings" | 14×14 |
| `icon-system-settings.svg` | L1 section icon for "System Settings" | 14×14 |
| `icon-slider-close.svg` | Bottom bar collapse/expand button | 14×14 |

All icons live under `../assets/icons/` relative to the HTML file.

---

## Complete HTML

```html
<!--
  ============================================================
  SIDEMENU — Predefined HTML Component (Settings pages)
  ============================================================

  CONFIGURATION (data- attribute):
  ─────────────────────────────────
  Set data-active-item="ItemName" on the <aside> element.
  The JS (sidemenu.js) reads this attribute on page load and:
    1. Finds the matching menu item by its text content
    2. Adds sidemenu__item--active class to it
    3. Auto-expands the parent L1 section (chevron down, children visible)

  NO manual class editing needed — all items start as plain links.

  AVAILABLE ITEM NAMES (case-sensitive, must match text exactly):

  ┌─ Log Source Configuration
  │   ├─ "Devices"
  │   ├─ "Applications"
  │   ├─ "Import Logs"
  │   ├─ "Manage Cloud Sources"
  │   ├─ "File Integrity Monitoring"
  │   └─ "Log Forwarding"
  ├─ Admin Settings
  │   ├─ "Manage Agents"
  │   ├─ "Manage Log Source Groups"
  │   ├─ "User Management"
  │   ├─ "Technician Audit"
  │   ├─ "Threat Management"
  │   ├─ "Account Settings"
  │   ├─ "Listener Ports"
  │   ├─ "Auto Device Configration"
  │   ├─ "All Extensions"
  │   ├─ "Installed Extensions"
  │   ├─ "Extension Profiles"
  │   ├─ "Product Settings"
  │   ├─ "Privacy Settings"
  │   ├─ "Working Hour Settings"
  │   ├─ "Custom Log Format"
  │   ├─ "Storage Tiers"
  │   ├─ "Log Collection Filters"
  │   ├─ "Reload Archive Logs"
  │   ├─ "Log Forwarding"
  │   ├─ "My Account"
  │   ├─ "Tags"
  │   ├─ "License"
  │   ├─ "Custom Widgets"
  │   └─ "Insights"
  └─ System Settings
      ├─ "Server CA Management"
      └─ "Certificate Trust Store"

  EXAMPLES:
    <aside class="sidemenu" data-active-item="Applications">
    <aside class="sidemenu" data-active-item="Manage Agents">
    <aside class="sidemenu" data-active-item="Storage Tiers">

  CSS:  tokens.css + sidemenu.css
  JS:   sidemenu.js  (reads data-active-item + collapse/expand/search)
  ============================================================
-->

<!-- ═══════ SIDEMENU (w=240) ═══════ -->
<aside class="sidemenu" data-active-item="Applications">
  <div class="sidemenu__scroll scrollbar-thin">

    <!-- Search -->
    <div class="sidemenu__search-wrap">
      <div class="sidemenu__search">
        <img src="../assets/icons/icon-search-settings.svg" alt="" />
        <input type="text" placeholder="Search Settings" />
      </div>
    </div>

    <!-- ── Log Source Configuration ── -->
    <div class="sidemenu__section" data-section="log-source">
      <button class="sidemenu__l1">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <img src="../assets/icons/icon-troubleshoot.svg" alt="" class="sidemenu__l1-icon" />
        <span>Log Source Configuration</span>
      </button>
      <a href="#" class="sidemenu__item" style="display:none">Devices</a>
      <a href="#" class="sidemenu__item" style="display:none">Applications</a>
      <a href="#" class="sidemenu__item" style="display:none">Import Logs</a>
      <a href="#" class="sidemenu__item" style="display:none">Manage Cloud Sources</a>
      <a href="#" class="sidemenu__item" style="display:none">File Integrity Monitoring</a>
      <a href="#" class="sidemenu__item" style="display:none">Log Forwarding</a>
    </div>

    <!-- ── Admin Settings ── -->
    <div class="sidemenu__section" data-section="admin">
      <button class="sidemenu__l1">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <img src="../assets/icons/icon-admin-settings.svg" alt="" class="sidemenu__l1-icon" />
        <span>Admin Settings</span>
      </button>
      <!-- Management -->
      <div class="sidemenu__l2-subheader" style="display:none">Management</div>
      <a href="#" class="sidemenu__item" style="display:none">Manage Agents</a>
      <a href="#" class="sidemenu__item" style="display:none">Manage Log Source Groups</a>
      <a href="#" class="sidemenu__item" style="display:none">User Management</a>
      <a href="#" class="sidemenu__item" style="display:none">Technician Audit</a>
      <a href="#" class="sidemenu__item" style="display:none">Threat Management</a>
      <a href="#" class="sidemenu__item" style="display:none">Account Settings</a>
      <a href="#" class="sidemenu__item" style="display:none">Listener Ports</a>
      <a href="#" class="sidemenu__item" style="display:none">Auto Device Configration</a>
      <!-- MarketPlace -->
      <div class="sidemenu__l2-subheader" style="display:none">MarketPlace</div>
      <a href="#" class="sidemenu__item" style="display:none">All Extensions</a>
      <a href="#" class="sidemenu__item" style="display:none">Installed Extensions</a>
      <a href="#" class="sidemenu__item" style="display:none">Extension Profiles</a>
      <!-- Product Customization -->
      <div class="sidemenu__l2-subheader" style="display:none">Product Customization</div>
      <a href="#" class="sidemenu__item" style="display:none">Product Settings</a>
      <a href="#" class="sidemenu__item" style="display:none">Privacy Settings</a>
      <a href="#" class="sidemenu__item" style="display:none">Working Hour Settings</a>
      <a href="#" class="sidemenu__item" style="display:none">Custom Log Format</a>
      <!-- Data Storage -->
      <div class="sidemenu__l2-subheader" style="display:none">Data Storage</div>
      <a href="#" class="sidemenu__item" style="display:none">Storage Tiers</a>
      <a href="#" class="sidemenu__item" style="display:none">Log Collection Filters</a>
      <a href="#" class="sidemenu__item" style="display:none">Reload Archive Logs</a>
      <a href="#" class="sidemenu__item" style="display:none">Log Forwarding</a>
      <!-- General -->
      <div class="sidemenu__l2-subheader" style="display:none">General</div>
      <a href="#" class="sidemenu__item" style="display:none">My Account</a>
      <a href="#" class="sidemenu__item" style="display:none">Tags</a>
      <a href="#" class="sidemenu__item" style="display:none">License</a>
      <!-- Developer Space -->
      <div class="sidemenu__l2-subheader" style="display:none">Developer Space</div>
      <a href="#" class="sidemenu__item" style="display:none">Custom Widgets</a>
      <!-- Zia -->
      <div class="sidemenu__l2-subheader" style="display:none">Zia</div>
      <a href="#" class="sidemenu__item" style="display:none">Insights</a>
    </div>

    <!-- ── System Settings ── -->
    <div class="sidemenu__section" data-section="system">
      <button class="sidemenu__l1">
        <img src="../assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__chevron" />
        <img src="../assets/icons/icon-system-settings.svg" alt="" class="sidemenu__l1-icon" />
        <span>System Settings</span>
      </button>
      <a href="#" class="sidemenu__item" style="display:none">Server CA Management</a>
      <a href="#" class="sidemenu__item" style="display:none">Certificate Trust Store</a>
    </div>
  </div>

  <!-- Bottom bar -->
  <div class="sidemenu__bottom">
    <button class="sidemenu__bottom-btn" title="Collapse sidebar">
      <img src="../assets/icons/icon-slider-close.svg" alt="" />
    </button>
  </div>
</aside>

<!-- Expand button (visible when sidebar collapsed) -->
<button class="sidemenu-expand" id="sidebarExpand" title="Expand sidebar">
  <img src="../assets/icons/icon-slider-close.svg" alt="" />
</button>
```

---

## Complete CSS

These are the CSS rules from `sidemenu.css` that apply to Variant 1. Requires `tokens.css` for CSS custom properties.

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
```

---

## JavaScript API

The JavaScript file `sidemenu.js` is **shared between Variant 1 and Variant 2**. For Variant 1, the following functions are relevant:

| Function | Purpose |
|---|---|
| `initActiveFromData()` | Reads `data-active-item` from `.sidemenu`, finds matching `.sidemenu__item` by text, adds `--active` class |
| `initAutoExpand()` | Finds the active item's parent `.sidemenu__section`, shows all children, rotates chevron to down |
| `initSidebarToggle()` | Wires up collapse/expand via bottom bar button and the `#sidebarExpand` button |
| `initOverlayDrawer()` | Mobile/tablet (≤1024px): hamburger opens sidebar as overlay drawer with backdrop |
| `initSectionToggle()` | Click L1 button (non-flat) to toggle show/hide of child items + chevron rotation |
| `initActiveItem()` | Click any `.sidemenu__item` to highlight it and update `data-active-item` |
| `initSearchFilter()` | Typing in the search input filters `.sidemenu__item` elements by text match |

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

### Full hierarchy (L1 > L2 sub-header > L2 items)

**Log Source Configuration** (`data-section="log-source"`, icon: `icon-troubleshoot.svg`)
- Devices
- Applications
- Import Logs
- Manage Cloud Sources
- File Integrity Monitoring
- Log Forwarding

**Admin Settings** (`data-section="admin"`, icon: `icon-admin-settings.svg`)
- *Management*
  - Manage Agents
  - Manage Log Source Groups
  - User Management
  - Technician Audit
  - Threat Management
  - Account Settings
  - Listener Ports
  - Auto Device Configration
- *MarketPlace*
  - All Extensions
  - Installed Extensions
  - Extension Profiles
- *Product Customization*
  - Product Settings
  - Privacy Settings
  - Working Hour Settings
  - Custom Log Format
- *Data Storage*
  - Storage Tiers
  - Log Collection Filters
  - Reload Archive Logs
  - Log Forwarding
- *General*
  - My Account
  - Tags
  - License
- *Developer Space*
  - Custom Widgets
- *Zia*
  - Insights

**System Settings** (`data-section="system"`, icon: `icon-system-settings.svg`)
- Server CA Management
- Certificate Trust Store

---

## States

| State | Class / Mechanism | Description |
|---|---|---|
| **Active item** | `.sidemenu__item--active` | Blue left border (3px `--sidebar-active-border`), background `--sidebar-active-bg` (#DCDCDC). Set automatically by JS from `data-active-item`, or on click. |
| **Collapsed sidebar** | `.sidemenu--collapsed` | Width animates to 0, opacity 0, pointer-events none. The `#sidebarExpand` button gets `.sidemenu-expand--visible`. |
| **Expanded sidebar** | Default (no modifier) | Width = `--sidebar-width` (240px), fully visible. |
| **Section expanded** | Children have `display: ''` (empty = visible), chevron src = `icon-sm-chevron-down.svg` | L2 sub-headers and items are visible. |
| **Section collapsed** | Children have `style="display:none"`, chevron src = `icon-sm-chevron-right.svg` | Default state — all children hidden. |
| **Search filtering** | JS `initSearchFilter()` | Typing in the search input shows/hides `.sidemenu__item` elements based on text match. |
| **Disabled item** | `.sidemenu__item--disabled` | `pointer-events: none`, `opacity: 0.5`, `cursor: not-allowed`. For partial builds. |
| **Overlay drawer** (mobile/tablet ≤1024px) | `.sidemenu--overlay-open` + `.sidemenu-backdrop--visible` | Sidebar slides over content, backdrop darkens page, body scroll locked. |

---

## Assembly Notes

- Place the `<aside class="sidemenu">` inside `.app-body` as the **first child**, before `<main class="main-content">`.
- The `<button class="sidemenu-expand">` goes **after** the `</aside>` closing tag, still inside `.app-body`.
- This variant is used in **Shell B** (Settings layout).
- Requires `tokens.css` loaded before `sidemenu.css` for CSS custom properties (`--sidebar-width`, `--sidebar-bg`, `--sidebar-stroke`, `--sidebar-active-bg`, `--sidebar-active-border`, `--sidebar-text-primary`, `--sidebar-text-secondary`, `--sidebar-search-placeholder`, `--sidebar-item-height`, `--sidebar-item-font-size`, `--sidebar-l1-font-size`, `--sidebar-l1-font-weight`, `--sidebar-l1-padding-left`, `--sidebar-l2-subheader-padding-left`, `--sidebar-l2-item-padding-left`).
- Include `sidemenu.js` at the bottom of the page (before `</body>`) or use `defer`.
- Add `class="scrollbar-thin"` on `.sidemenu__scroll` for styled scrollbar (requires scrollbar utility CSS).
- The sidebar uses `flex-shrink: 0` so it never compresses — the `<main>` beside it takes the remaining width.
