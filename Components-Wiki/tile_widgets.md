# Tile Widgets

> Component: `ElegantEChart.tileWidget`
> Files: `components/echarts-widget.js`, `components/echarts-widget.css`, `components/predefined-charts/tile-widgets.html`

## Quick Summary

Tile Widgets are dashboard KPI stat tiles rendered via `ElegantEChart.tileWidget()`. There are **10 distinct types** covering every dashboard KPI pattern — from big-number cards with sparklines to donut rings, duration clocks, priority bar segments, and severity breakdowns. All tiles are pure HTML (no ECharts canvas) built by the JS function and styled by `echarts-widget.css`.

**Required scripts (load in order):**

```html
<script src="components/lib/echarts.min.js"></script>
<script src="components/echarts-elegant-theme.js"></script>
<script src="components/echarts-widget.js"></script>
```

**Required icons (loaded by JS from `assets/icons/`):**

```
icon-metric-trend-up.svg, icon-tile-sev-critical.svg,
icon-tile-sev-trouble.svg, icon-tile-sev-attention.svg,
icon-alert-schedule.svg, icon-alert-hourglass.svg,
icon-tile-muted.svg, icon-metric-clock.svg,
icon-summary-bell.svg, icon-alert-warning.svg,
icon-status-success.svg, icon-status-waiting.svg
```

---

## Types / Tile Types

### Type 1: Active Alerts (Wide — severity + SLA + sparkline)

A wide tile (spans 2 columns) showing a big count, trend arrow, inline SVG sparkline, severity breakdown icons, and SLA/muted alert counts.

**HTML:**

```html
<div class="tile-card tile-card--wide">
  <div class="card__header">
    <span class="card__title">Active Alerts</span>
    <div class="card__toolbar">
      <img src="assets/icons/icon-widget-maximize.svg" alt="" style="width:14px;height:14px;cursor:pointer;">
    </div>
  </div>
  <div id="tile-1"></div>
</div>
```

**JS API call:**

```js
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
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `value` | `string` | Main count (formatted, e.g. `'10,000'`) |
| `trend` | `string` | Trend percentage (e.g. `'+7.1%'`) |
| `severity` | `array` | Array of `{ sev: 'critical'|'trouble'|'attention', value: number }` |
| `slaViolated` | `number` | SLA violated count |
| `mutedAlerts` | `number` | Muted alerts count |

---

### Type 2: Priority Score Bars (Wide)

A wide tile showing a colored segmented bar track with per-segment values, labels, ranges, and dots.

**HTML:**

```html
<div class="tile-card tile-card--wide">
  <div class="card__header">
    <span class="card__title">Priority Score</span>
  </div>
  <div id="tile-2"></div>
</div>
```

**JS API call:**

```js
ElegantEChart.tileWidget('tile-2', {
  bars: [
    { value: 100, label: 'Extra High', range: '86-100', color: '#DD1616', dotColor: '#DD1616', flex: 1 },
    { value: 80,  label: 'High',       range: '71-85',  color: '#D14900', dotColor: '#D14900', flex: 2 },
    { value: 50,  label: 'Medium',     range: '36-70',  color: '#FABB34', dotColor: '#FABB34', flex: 3 },
    { value: 30,  label: 'Low',        range: '21-35',  color: '#198019', dotColor: '#198019', flex: 1 },
    { value: 50,  label: 'Extra Low',  range: '0-20',   color: '#4A90D9', dotColor: '#4A90D9', flex: 1 }
  ]
}, { type: 2 });
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `bars` | `array` | Array of bar segment objects |
| `bars[].value` | `number` | Numeric value shown |
| `bars[].label` | `string` | Label (e.g. `'Extra High'`) |
| `bars[].range` | `string` | Score range (e.g. `'86-100'`) |
| `bars[].color` | `string` | Hex color for the bar segment |
| `bars[].dotColor` | `string` | Hex color for the legend dot |
| `bars[].flex` | `number` | Relative width (CSS flex value) |

---

### Type 3: Active Incidents (Wide — value + spark + severity columns)

A wide tile with a big count, trend, sparkline, and bordered severity columns on the right.

**HTML:**

```html
<div class="tile-card tile-card--wide">
  <div class="card__header">
    <span class="card__title">Active Incidents</span>
  </div>
  <div id="tile-3"></div>
</div>
```

**JS API call:**

```js
ElegantEChart.tileWidget('tile-3', {
  value: 5612,
  trend: '+19.5%',
  columns: [
    { label: 'Decisive',      value: 5498, sev: 'critical', color: '#DD1616' },
    { label: 'Failed',        value: 78,   sev: 'trouble',  color: '#D14900' },
    { label: 'Fired but',     value: 36,   sev: 'attention', color: '#FABB34' }
  ]
}, { type: 3 });
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `value` | `number` | Main count |
| `trend` | `string` | Trend percentage |
| `columns` | `array` | Array of column objects |
| `columns[].label` | `string` | Column label |
| `columns[].value` | `number` | Column count |
| `columns[].sev` | `string` | `'critical'`, `'trouble'`, or `'attention'` |
| `columns[].color` | `string` | Hex color for left border |

---

### Type 4: Duration (Half — hrs min + clock icon)

A half-width tile showing a duration value (hours + minutes) with a clock icon.

**HTML:**

```html
<div class="tile-card">
  <div class="card__header">
    <span class="card__title">MTTR</span>
  </div>
  <div id="tile-4"></div>
</div>
```

**JS API call:**

```js
ElegantEChart.tileWidget('tile-4', {
  parts: [
    { value: 4, unit: 'hrs' },
    { value: 22, unit: 'min' }
  ]
}, { type: 4 });
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `parts` | `array` | Array of `{ value: number, unit: string }` duration parts |

---

### Type 5: SLA Violated + Segments (Half)

A half-width tile with a big count, a segmented color bar, and an hourglass icon.

**HTML:**

```html
<div class="tile-card">
  <div class="card__header">
    <span class="card__title">SLA Violated</span>
  </div>
  <div id="tile-5"></div>
</div>
```

**JS API call:**

```js
ElegantEChart.tileWidget('tile-5', {
  value: 342,
  segments: [
    { flex: 45, color: '#DD1616' },
    { flex: 30, color: '#D14900' },
    { flex: 25, color: '#FABB34' }
  ]
}, { type: 5 });
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `value` | `number` | Main count |
| `segments` | `array` | Array of `{ flex: number, color: string }` bar segments |

---

### Type 6: Total Count + Sparkline (Half)

A half-width tile with a big count, trend, bell icon, and a full-width sparkline.

**HTML:**

```html
<div class="tile-card">
  <div class="card__header">
    <span class="card__title">Total Events</span>
  </div>
  <div id="tile-6"></div>
</div>
```

**JS API call:**

```js
ElegantEChart.tileWidget('tile-6', {
  value: '12,847',
  trend: '+14.6%',
  sparkColor: '#2C66DD'
}, { type: 6 });
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `value` | `string` | Formatted count |
| `trend` | `string` | Trend percentage |
| `sparkColor` | `string` | Hex color for sparkline (default `'#DD1616'`) |

---

### Type 7: MTTI Duration + Sparkline (Half)

A half-width tile with a duration value, trend, optional subtitle, and a full-width sparkline.

**HTML:**

```html
<div class="tile-card">
  <div class="card__header">
    <span class="card__title">MTTI</span>
  </div>
  <div id="tile-7"></div>
</div>
```

**JS API call:**

```js
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
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `parts` | `array` | Array of `{ value: number, unit: string }` |
| `trend` | `string` | Trend percentage |
| `trendColor` | `string` | Hex color for trend (default `'#DD1616'`) |
| `subtitle` | `string` | Optional subtitle text |
| `sparkColor` | `string` | Hex color for sparkline |

---

### Type 8: Progress + Severity (Half)

A half-width tile with a big count, trend, optional icon, a gradient progress bar with label, and severity breakdown.

**HTML:**

```html
<div class="tile-card">
  <div class="card__header">
    <span class="card__title">Investigations Running</span>
  </div>
  <div id="tile-8"></div>
</div>
```

**JS API call:**

```js
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
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `value` | `number` | Main count |
| `trend` | `string` | Trend percentage |
| `trendColor` | `string` | Hex color for trend |
| `icon` | `string` | Filename of icon in `assets/icons/` |
| `progress.label` | `string` | Progress bar label |
| `progress.pct` | `string` | Progress percentage (e.g. `'94.5%'`) — also used as CSS width |
| `severity` | `array` | Array of `{ sev, value }` objects |

---

### Type 9: Donut Ring + Status Cards (Half)

A half-width tile with a big count, trend, SVG donut ring, subtitle, and status cards below.

**HTML:**

```html
<div class="tile-card">
  <div class="card__header">
    <span class="card__title">Created Incidents</span>
  </div>
  <div id="tile-9"></div>
</div>
```

**JS API call:**

```js
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
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `value` | `number` | Main count |
| `trend` | `string` | Trend percentage |
| `trendColor` | `string` | Hex color for trend |
| `ringPct` | `number` | Ring fill percentage (0–100) |
| `subtitle` | `string` | Optional subtitle |
| `cards` | `array` | Array of status card objects |
| `cards[].label` | `string` | Card label |
| `cards[].value` | `number` | Card count |
| `cards[].icon` | `string` | Icon filename in `assets/icons/` |

---

### Type 10: Mini Donut + Legend (Half)

A half-width tile with a big count, change indicator, mini SVG donut, and a legend row below.

**HTML:**

```html
<div class="tile-card">
  <div class="card__header">
    <span class="card__title">All Activities</span>
  </div>
  <div id="tile-10"></div>
</div>
```

**JS API call:**

```js
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
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `value` | `number` | Main count |
| `change` | `string` | Change indicator (e.g. `'+15.3%'`) |
| `donut` | `array` | Array of `{ pct: number, color: string }` ring segments |
| `legend` | `array` | Array of `{ label: string, value: number, color: string }` |

---

## Complete HTML Templates

### Grid Wrapper

```html
<div class="tile-grid" style="grid-template-columns: repeat(3, 1fr);">

  <!-- TYPE 1 — Active Alerts (WIDE: severity + SLA + sparkline) -->
  <div class="tile-card tile-card--wide">
    <div class="card__header">
      <span class="card__title">Active Alerts</span>
      <div class="card__toolbar">
        <img src="assets/icons/icon-widget-maximize.svg" alt="" style="width:14px;height:14px;cursor:pointer;">
      </div>
    </div>
    <div id="tile-1"></div>
  </div>

  <!-- TYPE 6 — Total Count + Sparkline (HALF) -->
  <div class="tile-card">
    <div class="card__header">
      <span class="card__title">Total Events</span>
    </div>
    <div id="tile-6"></div>
  </div>

  <!-- TYPE 2 — Priority Score Bars (WIDE) -->
  <div class="tile-card tile-card--wide">
    <div class="card__header">
      <span class="card__title">Priority Score</span>
    </div>
    <div id="tile-2"></div>
  </div>

  <!-- TYPE 3 — Incident Columns (WIDE: value + spark + severity columns) -->
  <div class="tile-card tile-card--wide">
    <div class="card__header">
      <span class="card__title">Active Incidents</span>
    </div>
    <div id="tile-3"></div>
  </div>

  <!-- TYPE 4 — Duration (HALF: hrs min + clock icon) -->
  <div class="tile-card">
    <div class="card__header">
      <span class="card__title">MTTR</span>
    </div>
    <div id="tile-4"></div>
  </div>

  <!-- TYPE 5 — SLA Violated + Segments (HALF) -->
  <div class="tile-card">
    <div class="card__header">
      <span class="card__title">SLA Violated</span>
    </div>
    <div id="tile-5"></div>
  </div>

  <!-- TYPE 7 — MTTI Duration + Sparkline (HALF) -->
  <div class="tile-card">
    <div class="card__header">
      <span class="card__title">MTTI</span>
    </div>
    <div id="tile-7"></div>
  </div>

  <!-- TYPE 8 — Progress + Severity (HALF) -->
  <div class="tile-card">
    <div class="card__header">
      <span class="card__title">Investigations Running</span>
    </div>
    <div id="tile-8"></div>
  </div>

  <!-- TYPE 9 — Donut Ring + Status Cards (HALF) -->
  <div class="tile-card">
    <div class="card__header">
      <span class="card__title">Created Incidents</span>
    </div>
    <div id="tile-9"></div>
  </div>

  <!-- TYPE 10 — Mini Donut + Legend (HALF) -->
  <div class="tile-card">
    <div class="card__header">
      <span class="card__title">All Activities</span>
    </div>
    <div id="tile-10"></div>
  </div>

</div>
```

### Complete Initialization Script

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

---

## Complete CSS

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

---

## JavaScript API

### `ElegantEChart.tileWidget(domId, data, options)`

Renders a tile widget inside the given DOM element.

**Signature:**

```js
ElegantEChart.tileWidget(domId, data, options) → { dom, refresh }
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `domId` | `string` | ID of the container DOM element |
| `data` | `object` | Data object (shape depends on tile type — see per-type sections above) |
| `options` | `object` | Options object |
| `options.type` | `number` | Tile type (1–10, **required**) |
| `options.iconBase` | `string` | Base path for icon assets (default `'./assets/icons/'`) |

**Returns:**

| Field | Type | Description |
|-------|------|-------------|
| `dom` | `HTMLElement` | The container DOM element |
| `refresh` | `function` | Re-renders the tile with the same data |

### Internal helpers used by tileWidget

- **`trendHtml(val, color)`** — Builds a trend arrow span with icon + text. Default color `#DD1616` (red up). Pass `#198019` for green down.
- **`sevRow(items)`** — Builds a `.ti-sev-row` with severity icons and bold values.
- **`sparkSvg(color)`** — Generates an inline SVG sparkline path. Default color `#DD1616`.
- **`SEV_ICONS`** — Map: `{ critical: 'icon-tile-sev-critical.svg', trouble: 'icon-tile-sev-trouble.svg', attention: 'icon-tile-sev-attention.svg' }`

---

## Data Format

Each tile type expects a specific data shape passed as the second argument. See the per-type tables above. Common patterns:

- **`value`** — The headline number (string or number)
- **`trend`** — Trend percentage string (e.g. `'+7.1%'`, `'-8.2%'`)
- **`trendColor`** — Hex color override for the trend arrow/text
- **`severity`** — Array of `{ sev: 'critical'|'trouble'|'attention', value: number }`
- **`parts`** — Array of `{ value: number, unit: string }` for duration displays
- **`sparkColor`** — Hex color for inline SVG sparkline

---

## Assembly Notes

- Tile widgets go inside `.tile-grid` containers on dashboards.
- The grid defaults to **2 columns**. Override to 3 for dashboards: `.tile-grid { grid-template-columns: repeat(3, 1fr); }`
- Wide tiles (Types 1, 2, 3) use `.tile-card--wide` which spans 2 columns.
- Half tiles (Types 4–10) use regular `.tile-card` (1 column).
- Each tile card needs a `.card__header` with `.card__title`, then the target `<div id="tile-N">` where the widget renders.
- When placing inside widget bodies on dashboard pages, the tile grid goes inside `.widget__body` or `.line-tab__body`.
- The JS auto-injects `echarts-widget.css` if not already loaded.
