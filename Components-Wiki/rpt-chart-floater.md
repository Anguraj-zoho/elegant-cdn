# RPT Chart Floater

> Component: RPT Chart Floater
> CSS: `rpt-chart-floater.css` | JS: `rpt-chart-floater.js` | HTML ref: `rpt-chart-floater.html`

## ⚠ Critical Rules (READ BEFORE BUILDING)

- **MANDATORY on every Log360 Cloud Reports page.** If the page uses Shell C, this component must be present inside `.rpt-chart-area`.
- **FORBIDDEN on dashboards, settings, threat hub, or any non-Reports page.**
- **The host `.rpt-chart-area` must have `position:relative`** for absolute docking to work. Missing this = floater drifts to the top-left corner of the viewport.
- **Legacy `.rpt-chart-toggle` segmented control is BANNED in new work.** Use this floater instead.

## Quick Summary

A compact pill-shaped floating toolbar that docks to the top-right corner of a report-page chart area. Contains exactly two icon-buttons separated by a vertical divider: **Customize View** (opens a drawer) and **Chart/Grid toggle** (switches between chart and table view). Replaces the deprecated `.rpt-chart-toggle` segmented control.

## Configuration

| Property | Values | Description |
|---|---|---|
| Button 1 | `data-drawer-open="customizeViewDrawer"` | Opens the Customize View drawer (wired by `drawer.js`) |
| Button 2 | `data-view="chart"` / `"grid"` | Toggles between chart and grid view |
| `aria-pressed` | `"true"` / `"false"` | Reflects active chart view state |
| Host | `.rpt-chart-area` | Must be `position:relative` for absolute docking |

### Sizing (Figma Specs)

| Property | Value |
|---|---|
| Height | 24 px |
| Icon button | 28×24 px |
| SVG icon | 14×14 px, `stroke=currentColor` |
| Divider | 1 px × 16 px, `#DCDCDC` |
| Corner radius | 3 px |
| Background | `#FFFFFF`, border `1px solid #DCDCDC` |
| Shadow | `0 1px 2px rgba(0,0,0,0.04)` |
| Default color | `#626262`; hover `#2C66DD`; active `#2C66DD` |

## Required Icons

None (uses inline SVG paths).

## Complete HTML

```html
<!--
  ============================================================
  RPT-CHART-FLOATER — Predefined HTML Component
  Report-page chart floating control (pill with 2 icon-buttons)
  ============================================================

  SCOPE
    MANDATORY for Log360 Cloud report pages.
    REPLACES the deprecated `.rpt-chart-toggle` (Chart View /
    Grid View segmented control).

  PAIR WITH
    elegant-agent/data/components/rpt-chart-floater.css
    elegant-agent/data/components/rpt-chart-floater.js
    drawer.css + drawer.js (for the Customize View drawer)

  DEFAULT SLOTS
    Button 1: Customize view  → opens drawer (data-drawer-open="customizeViewDrawer")
    Button 2: Chart-view toggle (chart ↔ grid) → rpt-chart-floater.js

  MINIMUM HOST
    <div class="rpt-chart-area"> must be position:relative (the
    .rpt-chart-area class already supplies that). Place the
    floater as the first child — the chart canvas follows.

  DO NOT
    * Don't place outside a report page (use other toolbars instead).
    * Don't add >3 buttons (keep the pill compact — if you need more
      actions, use an ActionBar or a drawer).
    * Don't replace this with a custom floating control.
-->

<!-- ── Canonical usage ── -->
<div class="rpt-chart-area">

  <div class="rpt-chart-floater" role="toolbar" aria-label="Chart tools">
    <!-- Left: Customize View → opens drawer -->
    <button class="rpt-chart-floater__btn"
            type="button"
            data-drawer-open="customizeViewDrawer"
            title="Customize View"
            aria-label="Customize View">
      <!-- Horizontal sliders / equalizer icon (3 bars with knobs) -->
      <svg viewBox="0 0 14 14" aria-hidden="true">
        <path d="M1 3.5H5M9 3.5H13M1 7H8M11 7H13M1 10.5H4M7 10.5H13"/>
        <circle cx="7" cy="3.5" r="1.5"/><circle cx="9.5" cy="7" r="1.5"/><circle cx="5.5" cy="10.5" r="1.5"/>
      </svg>
    </button>

    <div class="rpt-chart-floater__divider" aria-hidden="true"></div>

    <!-- Right: Chart ↔ Grid view toggle -->
    <button class="rpt-chart-floater__btn rpt-chart-floater__btn--toggle"
            type="button"
            title="Chart View"
            aria-label="Toggle Chart / Grid View"
            aria-pressed="true"
            data-view="chart">
      <!-- Bar chart icon (3 vertical bars on baseline) -->
      <svg viewBox="0 0 14 14" aria-hidden="true">
        <path d="M1 13H13M3.5 13V8M7 13V4M10.5 13V6.5"/>
      </svg>
    </button>
  </div>

  <!-- Chart canvas host (ECharts / SVG / canvas). Report-page code fills this. -->
  <div class="rpt-chart" id="reportChart"></div>
</div>
```

## Complete CSS

```css
/* ============================================================
   RPT-CHART-FLOATER — Predefined CSS Component
   Report-page chart floating control
   ------------------------------------------------------------
   WHAT IT IS
     A compact pill-shaped floating bar that docks to the
     top-right of a report-page chart area. It holds exactly
     two icon-buttons separated by a 1px vertical divider:
       [ ⚙ Customize ]  │  [ 📊 Chart-view toggle ]

     This REPLACES the legacy `.rpt-chart-toggle` segmented
     control (Chart View / Grid View) used in earlier Elegant
     report pages. The legacy toggle is BANNED in new work.

   WHERE TO USE IT
     ONLY on Log360 Cloud report pages (ASSEMBLY TYPE C / D
     — the pattern where a Classic Tab wraps a chart and a
     data table sits outside).
     NEVER on settings, dashboard, or threat-hub pages.

   HOST CONTEXT
     Place inside the Classic Tab content area, OR directly
     inside `.rpt-chart-area` when no Classic Tab is used.
     The host must be `position:relative` so the floater can
     dock absolute top-right.

   CANONICAL STRUCTURE
     <div class="rpt-chart-area">
       <div class="rpt-chart-floater" role="toolbar">
         <button class="rpt-chart-floater__btn" data-drawer-open="customizeViewDrawer"
                 title="Customize view">…SVG…</button>
         <div class="rpt-chart-floater__divider" aria-hidden="true"></div>
         <button class="rpt-chart-floater__btn rpt-chart-floater__btn--toggle"
                 title="Chart view" aria-pressed="true">…SVG…</button>
       </div>
       <div class="rpt-chart" id="…"></div>
     </div>

   BEHAVIOUR
     * First button: opens a drawer via data-drawer-open (usually
       "customizeViewDrawer"). ElegantDrawer (drawer.js) wires
       this automatically.
     * Second button: toggles chart↔grid view. rpt-chart-floater.js
       flips aria-pressed and dispatches a 'rpt-chart-view:toggle'
       CustomEvent for page-level chart renderers to listen to.

   SIZING (Figma — pill micro-toolbar)
     * Height 24px, padding 0 (icons control their own hit-area)
     * Icon button 28x24, 14x14 SVG centred, stroke=currentColor
     * Divider 1px × 16px, #DCDCDC
     * Corner radius 3px
     * Background #FFFFFF, 1px border #DCDCDC
     * Shadow 0 1px 2px rgba(0,0,0,0.04)
     * Default color #626262; hover #2C66DD, active #2C66DD
   ============================================================ */

.rpt-chart-area {
  position: relative;
}

.rpt-chart-floater {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;

  display: inline-flex;
  align-items: stretch;
  height: 24px;

  background: #FFFFFF;
  border: 1px solid #DCDCDC;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  font-family: var(--font-family, 'Zoho Puvi', sans-serif);
  color: #626262;
}

.rpt-chart-floater__btn {
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 28px;
  padding: 0;

  cursor: pointer;
  color: inherit;
  background: transparent;
  transition: background 0.12s ease, color 0.12s ease;
}

.rpt-chart-floater__btn:hover {
  background: #F0F6FF;
  color: #2C66DD;
}
.rpt-chart-floater__btn:focus-visible {
  outline: 2px solid #2C66DD;
  outline-offset: -2px;
}
.rpt-chart-floater__btn[aria-pressed="true"] {
  color: #2C66DD;
}

.rpt-chart-floater__btn svg {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  display: block;
}

.rpt-chart-floater__divider {
  width: 1px;
  align-self: center;
  height: 16px;
  background: #DCDCDC;
}

/* ── Optional: a 3rd+ button (rare). Keep pill consistent. ── */
.rpt-chart-floater__btn + .rpt-chart-floater__divider + .rpt-chart-floater__btn { /* no-op guard */ }
```

## JavaScript API

```js
/**
 * RPT-CHART-FLOATER — Predefined JS Component
 * -----------------------------------------------------------
 * Adds view-toggle behaviour to the right-side button of a
 * `.rpt-chart-floater` (chart ↔ grid). The left-side button
 * uses `data-drawer-open` and is wired by drawer.js — no JS
 * needed here for it.
 *
 * EMITS
 *   CustomEvent 'rpt-chart-view:toggle'
 *     detail: { view: 'chart' | 'grid', button: HTMLButtonElement }
 *   Dispatched on document.body so any page-level chart
 *   renderer can react (e.g. swap ECharts <-> table view).
 *
 * STATE
 *   The active view is reflected in:
 *     * aria-pressed="true"  on the toggle button
 *     * data-view="chart" | "grid" on the toggle button
 *
 * USAGE (no boilerplate needed — script self-binds)
 *   <script src="./predefined-components/rpt-chart-floater.js"></script>
 */
(function () {
  'use strict';

  var SELECTOR = '.rpt-chart-floater__btn--toggle';

  function toggle(btn) {
    var current = btn.getAttribute('data-view') || 'chart';
    var next = current === 'chart' ? 'grid' : 'chart';
    btn.setAttribute('data-view', next);
    btn.setAttribute('aria-pressed', next === 'chart' ? 'true' : 'false');
    btn.setAttribute('title', next === 'chart' ? 'Chart view' : 'Grid view');

    document.body.dispatchEvent(new CustomEvent('rpt-chart-view:toggle', {
      detail: { view: next, button: btn }
    }));
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest(SELECTOR);
    if (!btn) return;
    e.preventDefault();
    toggle(btn);
  });

  // Public API (rarely needed — prefer the HTML hooks).
  window.ElegantRptChartFloater = {
    toggle: function (btn) { if (btn) toggle(btn); }
  };
})();
```

### API Reference

| Method | Signature | Description |
|---|---|---|
| `ElegantRptChartFloater.toggle(btn)` | `(HTMLButtonElement) → void` | Programmatically toggle chart/grid view |

### Events

| Event | Target | Detail |
|---|---|---|
| `rpt-chart-view:toggle` | `document.body` | `{ view: 'chart' \| 'grid', button: HTMLButtonElement }` |

## Variants

Only one variant — the two-button pill. A third button slot is supported but rare.

## Assembly Notes

- **MANDATORY** on Log360 Cloud report pages. Do NOT use on dashboards/settings.
- Place as the first child inside `.rpt-chart-area` (which provides `position:relative`).
- The left button auto-wires to `drawer.js` via `data-drawer-open`.
- The right toggle button dispatches `rpt-chart-view:toggle` — listen on `document.body`.
- Keep max 2–3 buttons to maintain compact pill appearance.
- Pair with: `drawer.css`, `drawer.js` for the Customize View drawer.
