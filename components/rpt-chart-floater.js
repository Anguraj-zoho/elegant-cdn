/**
 * RPT-CHART-FLOATER — Report page chart floating toolbar
 * Handles: Customize View drawer, chart type switching, chart/grid toggle
 */
(function () {
  'use strict';

  /* ── Chart palette ── */
  var COLORS = ['#2C66DD','#DD1616','#FABB34','#198019','#FF5900','#9B59B6','#00BCD4','#E91E63'];

  /* ── Chart type registry (Chart.js config builders) ── */
  var CHART_BUILDERS = {
    line:  buildLine,
    bar:   buildBar,
    area:  buildArea,
    pie:   buildPie,
    donut: buildDonut
  };

  /* ══════════════════════════════════════════════════════════
     INIT — bind floater buttons
     ══════════════════════════════════════════════════════════ */
  document.addEventListener('click', function (e) {
    var btn;
    /* Customize View button */
    btn = e.target.closest('.rpt-chart-floater__btn[data-action="customize"]');
    if (btn) { e.preventDefault(); openCustomizeView(btn.closest('.rpt-chart-area')); return; }

    /* Chart/Grid toggle */
    btn = e.target.closest('.rpt-chart-floater__btn--toggle');
    if (btn) { e.preventDefault(); toggleView(btn); return; }

    /* Customize View dialog close */
    if (e.target.closest('.cv-dialog__close')) { closeCustomizeView(); return; }

    /* Overlay click-outside */
    if (e.target.classList && e.target.classList.contains('cv-overlay')) { closeCustomizeView(); return; }

    /* CV tab switch */
    var tab = e.target.closest('.cv-tab');
    if (tab) { switchCvTab(tab); return; }

    /* CV Save */
    if (e.target.closest('.cv-save-btn')) { applyCvChanges(); return; }

    /* CV Cancel */
    if (e.target.closest('.cv-cancel-btn')) { closeCustomizeView(); return; }
  });

  /* ══════════════════════════════════════════════════════════
     CHART / GRID TOGGLE
     ══════════════════════════════════════════════════════════ */
  function toggleView(btn) {
    var current = btn.getAttribute('data-view') || 'chart';
    var next = current === 'chart' ? 'grid' : 'chart';
    btn.setAttribute('data-view', next);
    btn.setAttribute('title', next === 'chart' ? 'Chart View' : 'Grid View');

    /* Swap icon */
    var svg = btn.querySelector('svg');
    if (svg) {
      if (next === 'grid') {
        svg.innerHTML = '<rect x="1" y="1" width="5" height="5"/><rect x="8" y="1" width="5" height="5"/><rect x="1" y="8" width="5" height="5"/><rect x="8" y="8" width="5" height="5"/>';
      } else {
        svg.innerHTML = '<path d="M1 13H13M3.5 13V8M7 13V4M10.5 13V6.5"/>';
      }
    }

    var area = btn.closest('.rpt-chart-area');
    if (area) {
      var chartEl = area.querySelector('.rpt-chart');
      var legendEl = area.querySelector('.rpt-chart-legend');
      var gridEl = area.querySelector('.rpt-grid-placeholder');
      if (chartEl) chartEl.style.display = next === 'chart' ? '' : 'none';
      if (legendEl) legendEl.style.display = next === 'chart' ? '' : 'none';
      if (gridEl) gridEl.style.display = next === 'grid' ? '' : 'none';
    }

    document.body.dispatchEvent(new CustomEvent('rpt-chart-view:toggle', {
      detail: { view: next, button: btn }
    }));
  }

  /* ══════════════════════════════════════════════════════════
     CUSTOMIZE VIEW DRAWER
     ══════════════════════════════════════════════════════════ */
  var _cvArea = null;

  function openCustomizeView(area) {
    _cvArea = area;
    closeCustomizeView();

    var currentType = (area && area.getAttribute('data-chart-type')) || 'line';

    var html =
      '<div class="cv-overlay">' +
        '<div class="cv-dialog">' +
          '<div class="cv-dialog__head">' +
            '<span class="cv-dialog__title">Customize View</span>' +
            '<button class="cv-dialog__close" title="Close"><svg viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>' +
          '</div>' +
          '<div class="cv-tabs">' +
            '<button class="cv-tab cv-tab--active" data-cv-tab="sort">Sorting and Limits</button>' +
            '<button class="cv-tab" data-cv-tab="widget">Widget</button>' +
          '</div>' +
          /* Sorting & Limits panel */
          '<div class="cv-panel cv-panel--active" data-cv-panel="sort">' +
            '<div class="cv-row"><span class="cv-row__label">Field</span><select class="cv-select"><option>Source</option><option>Severity</option><option>Event ID</option></select></div>' +
            '<div class="cv-row"><span class="cv-row__label">Sort By</span><select class="cv-select"><option>Most Occurred</option><option>Least Occurred</option><option>Alphabetical</option></select></div>' +
            '<div class="cv-row"><span class="cv-row__label">Limit</span><input class="cv-input" type="number" value="100" min="1" max="10000"></div>' +
          '</div>' +
          /* Widget panel */
          '<div class="cv-panel" data-cv-panel="widget">' +
            '<div class="cv-row"><span class="cv-row__label">Widget Type</span>' +
              '<div class="cv-radio-group">' +
                '<label class="cv-radio"><input type="radio" name="cv-widget-type" value="graph" checked> Graph</label>' +
                '<label class="cv-radio"><input type="radio" name="cv-widget-type" value="table"> Table</label>' +
              '</div>' +
            '</div>' +
            '<div class="cv-row"><span class="cv-row__label">Chart Type</span>' +
              '<select class="cv-select cv-chart-type-select">' +
                '<option value="line"'  + (currentType === 'line'  ? ' selected' : '') + '>Line Chart</option>' +
                '<option value="bar"'   + (currentType === 'bar'   ? ' selected' : '') + '>Bar Chart</option>' +
                '<option value="area"'  + (currentType === 'area'  ? ' selected' : '') + '>Area Chart</option>' +
                '<option value="pie"'   + (currentType === 'pie'   ? ' selected' : '') + '>Pie Chart</option>' +
                '<option value="donut"' + (currentType === 'donut' ? ' selected' : '') + '>Donut Chart</option>' +
              '</select>' +
            '</div>' +
          '</div>' +
          '<div class="cv-footer">' +
            '<button class="btn-secondary cv-cancel-btn"><span>Cancel</span></button>' +
            '<button class="btn-primary cv-save-btn"><span>Save</span></button>' +
          '</div>' +
        '</div>' +
      '</div>';

    var frag = document.createElement('div');
    frag.innerHTML = html;
    document.body.appendChild(frag.firstElementChild);
    document.body.style.overflow = 'hidden';
  }

  function closeCustomizeView() {
    var overlay = document.querySelector('.cv-overlay');
    if (overlay) overlay.remove();
    document.body.style.overflow = '';
  }

  function switchCvTab(tab) {
    var panelId = tab.getAttribute('data-cv-tab');
    var dialog = tab.closest('.cv-dialog');
    dialog.querySelectorAll('.cv-tab').forEach(function (t) { t.classList.remove('cv-tab--active'); });
    tab.classList.add('cv-tab--active');
    dialog.querySelectorAll('.cv-panel').forEach(function (p) {
      p.classList.toggle('cv-panel--active', p.getAttribute('data-cv-panel') === panelId);
    });
  }

  function applyCvChanges() {
    var select = document.querySelector('.cv-chart-type-select');
    if (select && _cvArea) {
      var newType = select.value;
      _cvArea.setAttribute('data-chart-type', newType);
      renderChart(_cvArea, newType);
    }
    closeCustomizeView();
  }

  /* ══════════════════════════════════════════════════════════
     CHART RENDERING (Chart.js)
     ══════════════════════════════════════════════════════════ */
  var _chartInstances = {};

  function renderChart(area, type) {
    if (!window.Chart) return;
    type = type || 'line';

    var canvasEl = area.querySelector('.rpt-chart canvas');
    if (!canvasEl) return;
    var id = canvasEl.id || 'rpt-chart-default';

    if (_chartInstances[id]) { _chartInstances[id].destroy(); }

    var builder = CHART_BUILDERS[type] || CHART_BUILDERS.line;
    var cfg = builder();
    _chartInstances[id] = new Chart(canvasEl, cfg);

    /* Update legend */
    updateLegend(area, cfg);
  }

  function updateLegend(area, cfg) {
    var legendEl = area.querySelector('.rpt-chart-legend');
    if (!legendEl) return;
    legendEl.innerHTML = '';

    var datasets = cfg.data.datasets || [];
    var labels = cfg.data.labels || [];

    if (cfg.type === 'pie' || cfg.type === 'doughnut') {
      labels.forEach(function (label, i) {
        var color = (datasets[0] && datasets[0].backgroundColor && datasets[0].backgroundColor[i]) || COLORS[i % COLORS.length];
        legendEl.innerHTML += '<span class="rpt-chart-legend__item"><span class="rpt-chart-legend__dot" style="background:' + color + '"></span>' + label + '</span>';
      });
    } else {
      datasets.forEach(function (ds) {
        var color = ds.borderColor || ds.backgroundColor || COLORS[0];
        if (Array.isArray(color)) color = color[0];
        legendEl.innerHTML += '<span class="rpt-chart-legend__item"><span class="rpt-chart-legend__dot" style="background:' + color + '"></span>' + (ds.label || '') + '</span>';
      });
    }
  }

  /* ── Demo data ── */
  var LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var DATA_SETS = [
    { label: 'Error',         data: [400,380,450,520,490,600,580,620,550,640,610,700],   color: '#DD1616' },
    { label: 'Warning',       data: [200,190,210,180,220,250,240,260,230,270,250,280],   color: '#FABB34' },
    { label: 'Information',   data: [1200,1100,1300,1250,1400,1350,1500,1450,1550,1600,1500,1650], color: '#198019' },
    { label: 'Success',       data: [800,850,900,870,920,950,980,1000,1020,1050,1080,1100],  color: '#2C66DD' },
    { label: 'Failure',       data: [50,40,60,55,70,65,80,75,90,85,95,100],              color: '#FF5900' }
  ];

  var COMMON_OPTS = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false, bodyFont: { size: 11 }, titleFont: { size: 11 } }
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#626262' } },
      y: { grid: { color: '#F0F0F0' }, ticks: { font: { size: 10 }, color: '#626262' }, beginAtZero: true }
    }
  };

  function buildLine() {
    return {
      type: 'line',
      data: {
        labels: LABELS,
        datasets: DATA_SETS.map(function (ds) {
          return { label: ds.label, data: ds.data, borderColor: ds.color, backgroundColor: 'transparent', borderWidth: 2, pointRadius: 3, pointBackgroundColor: ds.color, tension: 0.3 };
        })
      },
      options: COMMON_OPTS
    };
  }

  function buildBar() {
    return {
      type: 'bar',
      data: {
        labels: LABELS,
        datasets: DATA_SETS.map(function (ds) {
          return { label: ds.label, data: ds.data, backgroundColor: ds.color, borderRadius: 2, maxBarThickness: 24 };
        })
      },
      options: COMMON_OPTS
    };
  }

  function buildArea() {
    return {
      type: 'line',
      data: {
        labels: LABELS,
        datasets: DATA_SETS.map(function (ds) {
          return { label: ds.label, data: ds.data, borderColor: ds.color, backgroundColor: ds.color + '22', fill: true, borderWidth: 1.5, pointRadius: 0, tension: 0.35 };
        })
      },
      options: COMMON_OPTS
    };
  }

  function buildPie() {
    var totals = DATA_SETS.map(function (ds) { var s = 0; ds.data.forEach(function (v) { s += v; }); return s; });
    return {
      type: 'pie',
      data: {
        labels: DATA_SETS.map(function (ds) { return ds.label; }),
        datasets: [{ data: totals, backgroundColor: DATA_SETS.map(function (ds) { return ds.color; }), borderWidth: 1 }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    };
  }

  function buildDonut() {
    var cfg = buildPie();
    cfg.type = 'doughnut';
    cfg.options.cutout = '55%';
    return cfg;
  }

  /* ══════════════════════════════════════════════════════════
     AUTO-INIT on page load
     ══════════════════════════════════════════════════════════ */
  function autoInit() {
    document.querySelectorAll('.rpt-chart-area').forEach(function (area) {
      var type = area.getAttribute('data-chart-type') || 'line';
      renderChart(area, type);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    setTimeout(autoInit, 50);
  }

  /* Public API */
  window.ElegantRptChartFloater = {
    renderChart: renderChart,
    openCustomizeView: openCustomizeView,
    closeCustomizeView: closeCustomizeView
  };
})();
