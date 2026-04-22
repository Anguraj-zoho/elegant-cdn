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
 *   <script src="./predefined-components/rpt-chart-floater.js"><\/script>
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
