# Stat Card (Tile Widget)

> Component: Stat Card / Tile Widget
> CSS: `echarts-widget.css` (auto-injected) | JS: `echarts-widget.js` → `ElegantEChart.tileWidget()` | HTML ref: `stat-card.html`, `predefined-charts/tile-widgets.html`

## Quick Summary

The **Stat Card** (internally "Tile Widget") is a dashboard KPI tile rendered by `ElegantEChart.tileWidget()`. There are **10 types** covering every dashboard metric pattern — from alert summaries with severity breakdowns to duration KPIs, progress bars, ring charts, and mini donuts.

Tiles come in two widths:
- **Wide** (Types 1–3): Span 2 columns in the grid via `.tile-card--wide`
- **Half** (Types 4–10): Fit 2 per row in a 2-column grid

All tiles are JS-rendered into a container `<div>` — you provide the data object and type number; the JS generates the inner HTML.

## Configuration

### Container Classes

| Class | Purpose |
|---|---|
| `.tile-grid` | Grid container — `display:grid; grid-template-columns:repeat(2,1fr); gap:16px` |
| `.tile-card` | Base card (half-width: Types 4–10) |
| `.tile-card--wide` | Full-width card (wide: Types 1–3), spans 2 columns |

### Required Scripts (load in order)

```html
<script src="./predefined-components/lib/echarts.min.js"></script>
<script src="./predefined-components/echarts-elegant-theme.js"></script>
<script src="./predefined-components/echarts-widget.js"></script>
```

`echarts-widget.js` auto-injects `echarts-widget.css` for all `.ti-*` classes.

## Required Icons

All icons loaded from `assets/icons/`:

| Icon file | Purpose |
|---|---|
| `icon-tile-sev-critical.svg` | Red hexagon (severity critical) |
| `icon-tile-sev-trouble.svg` | Orange diamond (severity trouble/high) |
| `icon-tile-sev-attention.svg` | Yellow triangle (severity attention/warning) |
| `icon-metric-trend-up.svg` | Trend arrow (flip `scaleY(-1)` for down) |
| `icon-metric-clock.svg` | Clock face for MTTR |
| `icon-alert-hourglass.svg` | Hourglass for SLA |
| `icon-alert-schedule.svg` | Calendar for SLA |
| `icon-summary-bell.svg` | Notification bell |
| `icon-tile-muted.svg` | Muted/silenced icon |
| `icon-tile-zia.svg` | AI/Zia icon |
| `icon-alert-info.svg` | Info circle |
| `icon-alert-success.svg` | Success checkmark |
| `icon-widget-maximize.svg` | Maximize widget (card toolbar) |

## Complete HTML

### Grid Wrapper + All 10 Types

```html
<!-- ═══ GRID WRAPPER ═══ -->
<div class="tile-grid" style="grid-template-columns: repeat(3, 1fr);">

  <!-- ═══ TYPE 1 — Active Alerts (WIDE: severity + SLA + sparkline) ═══ -->
  <div class="tile-card tile-card--wide">
    <div class="card__header">
      <span class="card__title">Active Alerts</span>
      <div class="card__toolbar">
        <img src="assets/icons/icon-widget-maximize.svg" alt="" style="width:14px;height:14px;cursor:pointer;">
      </div>
    </div>
    <div id="tile-1"></div>
  </div>

  <!-- ═══ TYPE 6 — Total Count + Sparkline (HALF) ═══ -->
  <div class="tile-card">
    <div class="card__header">
      <span class="card__title">Total Events</span>
    </div>
    <div id="tile-6"></div>
  </div>

  <!-- ═══ TYPE 2 — Priority Score Bars (WIDE) ═══ -->
  <div class="tile-card tile-card--wide">
    <div class="card__header">
      <span class="card__title">Priority Score</span>
    </div>
    <div id="tile-2"></div>
  </div>

  <!-- ═══ TYPE 3 — Incident Columns (WIDE: value + spark + severity columns) ═══ -->
  <div class="tile-card tile-card--wide">
    <div class="card__header">
      <span class="card__title">Active Incidents</span>
    </div>
    <div id="tile-3"></div>
  </div>

  <!-- ═══ TYPE 4 — Duration (HALF: hrs min + clock icon) ═══ -->
  <div class="tile-card">
    <div class="card__header">
      <span class="card__title">MTTR</span>
    </div>
    <div id="tile-4"></div>
  </div>

  <!-- ═══ TYPE 5 — SLA Violated + Segments (HALF) ═══ -->
  <div class="tile-card">
    <div class="card__header">
      <span class="card__title">SLA Violated</span>
    </div>
    <div id="tile-5"></div>
  </div>

  <!-- ═══ TYPE 7 — MTTI Duration + Sparkline (HALF) ═══ -->
  <div class="tile-card">
    <div class="card__header">
      <span class="card__title">MTTI</span>
    </div>
    <div id="tile-7"></div>
  </div>

  <!-- ═══ TYPE 8 — Progress + Severity (HALF) ═══ -->
  <div class="tile-card">
    <div class="card__header">
      <span class="card__title">Investigations Running</span>
    </div>
    <div id="tile-8"></div>
  </div>

  <!-- ═══ TYPE 9 — Donut Ring + Status Cards (HALF) ═══ -->
  <div class="tile-card">
    <div class="card__header">
      <span class="card__title">Created Incidents</span>
    </div>
    <div id="tile-9"></div>
  </div>

  <!-- ═══ TYPE 10 — Mini Donut + Legend (HALF) ═══ -->
  <div class="tile-card">
    <div class="card__header">
      <span class="card__title">All Activities</span>
    </div>
    <div id="tile-10"></div>
  </div>

</div>
```

### Initialization Script (all 10 types)

```html
<script>
// Type 1 — Active Alerts (wide tile with severity breakdown, SLA, sparkline)
ElegantEChart.tileWidget('tile-1', {
  value: '10,000',
  trend: '+7.1%',
  severity: [
    { sev: 'critical', value: 640 },
    { sev: 'trouble', value: 220 },
    { sev: 'attention', value: 68 }
  ],
  slaViolated: 25,
  mutedAlerts: 25
}, { type: 1 });

// Type 2 — Priority Score (wide bar segments)
ElegantEChart.tileWidget('tile-2', {
  bars: [
    { value: 100, label: 'Extra High', range: '86-100', color: '#DD1616', dotColor: '#DD1616', flex: 1 },
    { value: 80,  label: 'High',       range: '71-85',  color: '#D14900', dotColor: '#D14900', flex: 2 },
    { value: 50,  label: 'Medium',     range: '36-70',  color: '#FABB34', dotColor: '#FABB34', flex: 3 },
    { value: 30,  label: 'Low',        range: '21-35',  color: '#198019', dotColor: '#198019', flex: 1 },
    { value: 50,  label: 'Extra Low',  range: '0-20',   color: '#4A90D9', dotColor: '#4A90D9', flex: 1 }
  ]
}, { type: 2 });

// Type 3 — Active Incidents (wide: value + spark + severity columns)
ElegantEChart.tileWidget('tile-3', {
  value: 5612,
  trend: '+19.5%',
  columns: [
    { label: 'Decisive',      value: 5498, sev: 'critical', color: '#DD1616' },
    { label: 'Failed',        value: 78,   sev: 'trouble',  color: '#D14900' },
    { label: 'Fired but',     value: 36,   sev: 'attention', color: '#FABB34' }
  ]
}, { type: 3 });

// Type 4 — MTTR Duration
ElegantEChart.tileWidget('tile-4', {
  parts: [
    { value: 4, unit: 'hrs' },
    { value: 22, unit: 'min' }
  ]
}, { type: 4 });

// Type 5 — SLA Violated + Segments
ElegantEChart.tileWidget('tile-5', {
  value: 342,
  segments: [
    { flex: 45, color: '#DD1616' },
    { flex: 30, color: '#D14900' },
    { flex: 25, color: '#FABB34' }
  ]
}, { type: 5 });

// Type 6 — Total Count + Sparkline
ElegantEChart.tileWidget('tile-6', {
  value: '12,847',
  trend: '+14.6%',
  sparkColor: '#2C66DD'
}, { type: 6 });

// Type 7 — MTTI Duration + Sparkline
ElegantEChart.tileWidget('tile-7', {
  parts: [
    { value: 3, unit: 'hrs' },
    { value: 47, unit: 'min' }
  ],
  trend: '-8.2%',
  trendColor: '#198019',
  subtitle: 'Mean Time to Investigate',
  sparkColor: '#198019'
}, { type: 7 });

// Type 8 — Progress + Severity
ElegantEChart.tileWidget('tile-8', {
  value: 892,
  trend: '+5.1%',
  trendColor: '#198019',
  icon: 'icon-tile-zia.svg',
  progress: { label: 'AI Confidence', pct: '94.5%' },
  severity: [
    { sev: 'critical', value: 234 },
    { sev: 'trouble', value: 412 },
    { sev: 'attention', value: 246 }
  ]
}, { type: 8 });

// Type 9 — Donut Ring + Status Cards
ElegantEChart.tileWidget('tile-9', {
  value: 342,
  trend: '+5.1%',
  trendColor: '#198019',
  ringPct: 78,
  subtitle: 'Created Incidents',
  cards: [
    { label: 'Auto', value: 267, icon: 'icon-status-success.svg' },
    { label: 'Manual', value: 75, icon: 'icon-status-waiting.svg' }
  ]
}, { type: 9 });

// Type 10 — Mini Donut + Legend
ElegantEChart.tileWidget('tile-10', {
  value: 892,
  change: '+15.3%',
  donut: [
    { pct: 45, color: '#2C66DD' },
    { pct: 30, color: '#009CBB' },
    { pct: 25, color: '#FABB34' }
  ],
  legend: [
    { label: 'Network', value: 401, color: '#2C66DD' },
    { label: 'Cloud', value: 268, color: '#009CBB' },
    { label: 'Endpoint', value: 223, color: '#FABB34' }
  ]
}, { type: 10 });
</script>
```

## Complete CSS

The tile-specific CSS is in `echarts-widget.css` (auto-injected by `echarts-widget.js`). Tile-related portion:

```css
/* ── Tile Widgets ── */
.tile-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.tile-card {
  background: #fff;
  border: 1px solid #E9E9E9;
  border-radius: 8px;
  padding: 20px 24px;
  position: relative;
  overflow: hidden;
}
.tile-card--wide { grid-column: span 2; }
.tile-card .card__header { display: flex; align-items: center; margin-bottom: 12px; }
.tile-card .card__title { font-size: 14px; font-weight: 600; color: #000; }
.tile-card .card__toolbar {
  margin-left: auto; display: flex; gap: 2px;
  opacity: 0; transition: opacity .15s ease;
}
.tile-card:hover .card__toolbar { opacity: 1; }
@media (max-width: 900px) {
  .tile-grid { grid-template-columns: 1fr; }
  .tile-card--wide { grid-column: span 1; }
}

.ti { display: flex; align-items: flex-end; gap: 18px; font-family: var(--font-family); }
.ti-wide { width: 100%; }
.ti-half { width: 100%; }
.ti-big { font-size: 36px; font-weight: 400; color: #000; line-height: 1.1; }
.ti-trend { display: inline-flex; align-items: center; gap: 2px; font-size: 12px; font-weight: 500; margin-left: 8px; }
.ti-trend-icon { width: 14px; height: 14px; }
.ti-val-row { display: flex; align-items: baseline; flex-wrap: wrap; }
.ti-label-sm { font-size: 12px; color: #626262; white-space: nowrap; }
.ti-sev-row { display: flex; gap: 24px; align-items: center; }
.ti-sev { display: flex; align-items: center; gap: 6px; font-size: 16px; }
.ti-sev b { font-weight: 500; }
.ti-sev-icon { width: 20px; height: 20px; }
.ti-icon-sm { width: 14px; height: 14px; vertical-align: middle; opacity: .7; }

/* Type 1 — bottom-aligned 3-column layout */
.ti-1 { align-items: flex-end; }
.ti-1-left { flex: 0 0 auto; display: flex; flex-direction: column; justify-content: flex-end; }
.ti-1-spark { flex: 0 0 200px; align-self: flex-end; }
.ti-1-right { flex: 1 1 auto; display: flex; flex-direction: column; gap: 8px; align-items: stretch; }
.ti-1-sev-row { display: flex; align-items: center; gap: 24px; }
.ti-1-sev-row .ti-label-sm { margin-bottom: 0; }
.ti-1-divider { width: 100%; height: 0; border-top: 1px solid #E9E9E9; }
.ti-1-meta-row { display: flex; gap: 40px; align-items: center; }
.ti-meta { display: flex; align-items: center; gap: 6px; font-size: 12px; }
.ti-meta .ti-label-sm { margin-bottom: 0; }
.ti-meta b { font-weight: 600; font-size: 16px; }
.ti-spark { width: 100%; height: 50px; display: block; }

/* Type 2 — priority bars */
.ti-2 { flex-direction: column; align-items: stretch; gap: 0; }
.ti-bars-track { display: flex; width: 100%; height: 8px; border-radius: 4px; overflow: hidden; }
.ti-bars-seg { height: 100%; }
.ti-bars { display: flex; gap: 0; width: 100%; margin-top: 8px; }
.ti-bar-col { flex: 1; display: flex; flex-direction: column; align-items: flex-start; }
.ti-bar-val { font-size: 28px; font-weight: 400; color: #000; line-height: 1.1; }
.ti-bar-label { font-size: 11px; color: #000; display: flex; align-items: center; gap: 4px; margin-top: 2px; }
.ti-bar-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

/* Type 3 — incident columns */
.ti-cols { display: flex; gap: 0; }
.ti-col { padding: 4px 20px; }
.ti-col-label { font-size: 12px; color: #626262; margin-bottom: 4px; }
.ti-col-row { display: flex; align-items: center; gap: 6px; }
.ti-col-val { font-size: 20px; font-weight: 500; }

/* Type 4 — duration */
.ti-4 { justify-content: space-between; }
.ti-dur { display: flex; align-items: baseline; gap: 4px; }
.ti-dur-big { font-size: 36px; font-weight: 400; color: #000; }
.ti-dur-unit { font-size: 14px; color: #626262; margin-right: 12px; }
.ti-icon-lg { width: 48px; height: 48px; }
.ti-icon-hg { width: 48px; height: 56px; }

/* Type 5 — SLA bar */
.ti-5 { justify-content: space-between; flex-wrap: wrap; }
.ti-5-left { display: flex; flex-direction: column; gap: 12px; }
.ti-seg-bar { display: flex; width: 200px; height: 6px; border-radius: 3px; overflow: hidden; }
.ti-seg { height: 100%; }

/* Type 6 — tall with sparkline */
.ti-6 { flex-wrap: wrap; align-items: flex-start; position: relative; }
.ti-icon-bell { width: 32px; height: 32px; position: absolute; top: 0; right: 0; }
.ti-spark-full { width: 100%; flex: 0 0 100%; margin-top: 8px; }
.ti-spark-full .ti-spark { height: 80px; }

/* Type 7 — investigation MTTI */
.ti-7 { flex-wrap: wrap; align-items: flex-start; }
.ti-sub { font-size: 12px; color: #626262; width: 100%; margin-top: 2px; }

/* Type 8 — progress + severity */
.ti-8 { flex-direction: column; align-items: stretch; gap: 6px; }
.ti-8-top { display: flex; align-items: flex-start; justify-content: space-between; }
.ti-8-icon { width: 32px; height: 32px; flex-shrink: 0; }
.ti-prog-row { display: flex; justify-content: space-between; align-items: center; margin-top: 4px; }
.ti-prog-pct { font-size: 12px; font-weight: 500; color: #000; }
.ti-prog-bar { width: 100%; height: 6px; background: #E9E9E9; border-radius: 3px; overflow: hidden; }
.ti-prog-fill { height: 100%; border-radius: 3px; }

/* Type 9 — donut + status cards */
.ti-9 { flex-direction: column; align-items: stretch; gap: 10px; }
.ti-9-top { display: flex; justify-content: space-between; align-items: flex-start; }
.ti-ring { position: relative; width: 48px; height: 48px; flex-shrink: 0; }
.ti-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.ti-ring-val { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; color: #000; }
.ti-status-cards { display: flex; gap: 8px; }
.ti-status-card {
  flex: 1; padding: 8px 12px; background: #F5F8F5; border-radius: 4px;
  display: flex; flex-direction: column; gap: 4px;
}
.ti-sc-label { font-size: 11px; color: #626262; }
.ti-sc-row { display: flex; align-items: center; gap: 6px; }
.ti-sc-row b { font-size: 18px; font-weight: 500; color: #000; }
.ti-sc-icon { width: 14px; height: 14px; }

/* Type 10 — mini donut + legend */
.ti-10 { flex-direction: column; align-items: stretch; gap: 8px; }
.ti-10-top { display: flex; justify-content: space-between; align-items: flex-start; }
.ti-change { font-size: 12px; color: #198019; display: flex; align-items: center; gap: 2px; margin-top: 2px; }
.ti-change-arrow { font-size: 10px; }
.ti-mini-donut { width: 48px; height: 48px; }
.ti-mini-donut svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.ti-legend-row { display: flex; gap: 16px; flex-wrap: wrap; }
.ti-leg { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #000; }
.ti-leg b { font-weight: 600; }
.ti-leg-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
```

## JavaScript API

### Usage

```javascript
ElegantEChart.tileWidget(domId, data, { type: N });
```

Where `domId` is the id of the container `<div>`, `data` is the data object (schema varies by type), and `N` is the type number (1–10).

### Data Schemas by Type

#### Type 1: Active Alerts (Wide)

```javascript
ElegantEChart.tileWidget('tile-1', {
  value: '10000',         // main KPI number
  trend: '20%',           // percentage change (shown with red up arrow)
  severity: [             // severity breakdown
    { sev: 'critical', value: '560' },
    { sev: 'trouble', value: '220' },
    { sev: 'attention', value: '59' }
  ],
  slaViolated: '25',      // SLA violated count (optional)
  mutedAlerts: '25'       // muted alerts count (optional)
}, { type: 1 });
```

#### Type 2: Priority Score (Wide)

```javascript
ElegantEChart.tileWidget('tile-2', {
  bars: [
    { value: '100', label: 'Critical', range: '91-100', color: '#8B1A1A', dotColor: '#8B1A1A', flex: 100 },
    { value: '80',  label: 'High',     range: '71-90',  color: '#DD1616', dotColor: '#DD1616', flex: 80 },
    { value: '50',  label: 'Medium',   range: '51-70',  color: '#F4A0A0', dotColor: '#FF5900', flex: 50 },
    { value: '30',  label: 'Low',      range: '26-50',  color: '#FF5900', dotColor: '#FABB34', flex: 30 },
    { value: '50',  label: 'Very Low', range: '0-25',   color: '#FABB34', dotColor: '#198019', flex: 50 }
  ]
}, { type: 2 });
```

#### Type 3: Active Incidents (Wide)

```javascript
ElegantEChart.tileWidget('tile-3', {
  value: '100',           // total count
  trend: '20%',           // percentage change
  columns: [
    { label: 'Critical',  value: '25', sev: 'critical',  color: '#DD1616' },
    { label: 'Trouble',   value: '35', sev: 'trouble',   color: '#FF5900' },
    { label: 'Attention', value: '40', sev: 'attention',  color: '#FABB34' }
  ]
}, { type: 3 });
```

#### Type 4: MTTR Duration (Half)

```javascript
ElegantEChart.tileWidget('tile-4', {
  parts: [
    { value: '2', unit: 'Days' },
    { value: '5', unit: 'Hrs' }
  ]
}, { type: 4 });
```

#### Type 5: SLA Violated (Half)

```javascript
ElegantEChart.tileWidget('tile-5', {
  value: '20',            // total violations
  segments: [             // proportional color bar
    { flex: 2,   color: '#8B1A1A' },
    { flex: 1.5, color: '#FF5900' },
    { flex: 4,   color: '#FABB34' }
  ]
}, { type: 5 });
```

#### Type 6: Total Alert Count (Half)

```javascript
ElegantEChart.tileWidget('tile-6', {
  value: '18,452',        // total count
  trend: '30%',           // percentage change
  sparkColor: '#DD1616'   // sparkline colour (defaults to red)
}, { type: 6 });
```

#### Type 7: Investigation MTTI (Half)

```javascript
ElegantEChart.tileWidget('tile-7', {
  parts: [{ value: '4', unit: 'mins 22s' }],
  trend: '10%',
  trendColor: '#198019',  // green = improvement
  subtitle: 'From 247 completed investigations',
  sparkColor: '#198019'
}, { type: 7 });
```

#### Type 8: Investigations Running (Half)

```javascript
ElegantEChart.tileWidget('tile-8', {
  value: '247',
  trend: '10%',
  trendColor: '#198019',
  icon: 'icon-tile-zia.svg',
  progress: { label: 'Queue utilisation', pct: '81.7%' },
  severity: [
    { sev: 'critical', value: '560' },
    { sev: 'trouble', value: '220' },
    { sev: 'attention', value: '59' }
  ]
}, { type: 8 });
```

#### Type 9: Created Incidents (Half)

```javascript
ElegantEChart.tileWidget('tile-9', {
  value: '247',
  trend: '10%',
  trendColor: '#198019',
  ringPct: 13,            // 0-100 for ring chart
  subtitle: 'From 2,891 completed investigations',
  cards: [
    { label: 'Open',      value: '218', icon: 'icon-alert-info.svg' },
    { label: 'Resolved',  value: '168', icon: 'icon-alert-success.svg' },
    { label: 'Escalated', value: '41',  icon: 'icon-tile-sev-attention.svg' }
  ]
}, { type: 9 });
```

#### Type 10: All Activities (Half)

```javascript
ElegantEChart.tileWidget('tile-10', {
  value: '150 K',
  change: '3430 (0.5%)',
  donut: [
    { pct: 23, color: '#A8E0F0' },
    { pct: 21, color: '#0099CC' },
    { pct: 56, color: '#007BA7' }
  ],
  legend: [
    { label: 'Create', value: '1352', color: '#A8E0F0' },
    { label: 'Delete', value: '1254', color: '#0099CC' },
    { label: 'Update', value: '3000', color: '#007BA7' }
  ]
}, { type: 10 });
```

## Variants

### Quick Reference — Type Selection Guide

| Need a... | Use Type | Width |
|---|---|---|
| Alert summary with severity icons | Type 1 | Wide |
| Priority/score band distribution | Type 2 | Wide |
| Incident count with severity cols | Type 3 | Wide |
| Duration KPI (MTTR, MTTD) | Type 4 | Half |
| Violation count with segment bar | Type 5 | Half |
| Volume KPI with sparkline | Type 6 | Half |
| Time KPI with subtitle + sparkline | Type 7 | Half |
| Operational metric with progress bar | Type 8 | Half |
| Entity count with ring + cards | Type 9 | Half |
| Activity breakdown with donut | Type 10 | Half |

### Grid Layout

- **Wide tiles (1–3):** `grid-column: span 2` → full row
- **Half tiles (4–10):** Fit 2 per row in a 2-column grid
- Override to 3-column: `.tile-grid { grid-template-columns: repeat(3, 1fr); }`

## Assembly Notes

1. **Always** load scripts in order: `echarts.min.js` → `echarts-elegant-theme.js` → `echarts-widget.js`.
2. `echarts-widget.js` auto-injects `echarts-widget.css` — no manual CSS link needed.
3. Create the grid: `div.tile-grid > div.tile-card > div#my-tile`, then call `ElegantEChart.tileWidget('my-tile', data, {type: N})`.
4. Wide cards use `.tile-card--wide` class for `grid-column: span 2`.
5. The card toolbar (maximize icon) auto-hides and shows on `.tile-card:hover`.
6. Icons are loaded from `assets/icons/` — ensure the icon SVG files are in place.
7. Trend arrows: red `#DD1616` for increase (bad), green `#198019` for decrease (good); green arrow is flipped via `scaleY(-1)`.
