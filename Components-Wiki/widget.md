# Widget

> Component: Widget (Dashboard Card)
> CSS: `widget.css` | JS: `widget.js` | HTML ref: `widget.html`

## Quick Summary

The **Widget** is the primary dashboard card used across Elegant 1.0 pages. Each widget is a white bordered card that contains a title, an auto-hiding toolbar (maximize / refresh / more), and a body area that hosts charts, stats, feeds, or other visualisations. Widgets are placed inside a `.dash` grid container in horizontal `.dash__row` rows. There are **10 predefined widget patterns** covering stat cards, donut charts, bar charts, radar, alert feeds, and more.

**Toolbar behaviour:** Icons are hidden by default (`opacity: 0`). On **widget hover** the toolbar fades in. Individual icons have **no background** by default; on **icon hover** a grey background (`#D9D9D9`) appears plus a tooltip below (via `data-tooltip`).

## Configuration

| Token | Value | Purpose |
|---|---|---|
| `--widget-bg` | `#FFFFFF` | Card background |
| `--widget-border` | `#E9E9E9` | Card border colour |
| `--widget-radius` | `4px` | Border radius |
| `--widget-padding` | `24px` | Inner padding |
| `--widget-title-gap` | `8px` | Gap between title and body |
| `--widget-content-gap` | `20px` | Gap for `widget--gap-lg` |
| `--widget-title-fs` | `14px` | Title font size |
| `--widget-title-fw` | `600` | Title font weight |
| `--widget-title-color` | `#000000` | Title colour |
| `--widget-label-fs` | `11px` | Label font size |
| `--widget-label-color` | `#626262` | Label colour |
| `--widget-value-fs` | `20px` | Value font size (sm) |
| `--widget-value-lg-fs` | `28px` | Value font size (lg) |
| `--widget-value-xl-fs` | `50px` | Value font size (xl) |
| `--widget-toolbar-icon-size` | `24px` | Toolbar icon container |
| `--widget-toolbar-icon-bg` | `#D9D9D9` | Icon hover bg |
| `--dash-bg` | `#F5F5F5` | Dashboard container bg |
| `--dash-gap` | `4px` | Row/col gap |

## Required Icons

| Icon file | Purpose |
|---|---|
| `icon-widget-maximize.svg` | Maximize widget |
| `icon-refresh.svg` | Refresh data |
| `icon-more.svg` | More options |
| `icon-widget-notification.svg` | Alert notification (Recent Alerts) |
| `icon-widget-schedule.svg` | Schedule (SLA widget) |
| `icon-status-disabled.svg` | Severity indicator |
| `icon-filter.svg` | Filter button (dashboard header) |

## Complete HTML

All 10 patterns are wrapped inside a `<div class="dash">` container.

### Dashboard Container

```html
<div class="dash">
  <div class="dash__header">
    <div class="dash__header-left">
      <span class="dash__title">Alerts Overview</span>
      <span class="dash__subtitle">▾</span>
    </div>
    <div class="dash__header-right">
      <button class="widget__toolbar-btn"><img src="../assets/icons/icon-refresh.svg" alt="Refresh"></button>
      <button class="widget__toolbar-btn"><img src="../assets/icons/icon-filter.svg" alt="Filter"></button>
      <span class="widget__label">Last 7 Days</span>
    </div>
  </div>

  <div class="dash__row"> ... widgets ... </div>
  <div class="dash__row"> ... widgets ... </div>
</div>
```

### Pattern 1: Stat Card (Active Alerts)

Large number + sparkline + severity breakdown.

```html
<div class="widget">
  <div class="widget__header">
    <span class="widget__title">Active Alerts</span>
    <div class="widget__toolbar">
      <button class="widget__toolbar-btn" data-tooltip="Maximize"><img src="../assets/icons/icon-widget-maximize.svg" alt=""></button>
      <button class="widget__toolbar-btn" data-tooltip="Refresh"><img src="../assets/icons/icon-refresh.svg" alt=""></button>
      <button class="widget__toolbar-btn" data-tooltip="More"><img src="../assets/icons/icon-more.svg" alt=""></button>
    </div>
  </div>
  <div class="widget__body">
    <div style="display:flex;gap:8px;align-items:flex-end">
      <div>
        <div class="widget__value--lg">10,000</div>
        <div class="widget__sub" style="color:var(--chart-red)">↑20%</div>
      </div>
      <div class="chart-container" style="height:48px;flex:1"><canvas id="sparkline-1"></canvas></div>
    </div>
    <div style="display:flex;gap:24px;flex-wrap:wrap">
      <div class="stat-row"><span class="widget__label">Alert Severity</span></div>
      <div class="stat-row"><img class="stat-row__icon" src="../assets/icons/icon-status-disabled.svg"><span class="widget__value" style="font-size:20px">560</span></div>
      <div class="stat-row"><img class="stat-row__icon" src="../assets/icons/icon-status-disabled.svg"><span class="widget__value" style="font-size:20px">220</span></div>
    </div>
  </div>
</div>
```

### Pattern 2: Priority Score Bar

Segmented horizontal bar + labels below.

```html
<div class="widget">
  <div class="widget__header">
    <span class="widget__title">Priority Score</span>
    <div class="widget__toolbar">
      <button class="widget__toolbar-btn" data-tooltip="Maximize"><img src="../assets/icons/icon-widget-maximize.svg" alt=""></button>
      <button class="widget__toolbar-btn" data-tooltip="Refresh"><img src="../assets/icons/icon-refresh.svg" alt=""></button>
      <button class="widget__toolbar-btn" data-tooltip="More"><img src="../assets/icons/icon-more.svg" alt=""></button>
    </div>
  </div>
  <div class="prio-bar">
    <div class="prio-bar__track">
      <div class="prio-bar__segment bg-red" style="width:33%"></div>
      <div class="prio-bar__segment bg-orange" style="width:27%"></div>
      <div class="prio-bar__segment bg-amber" style="width:17%"></div>
      <div class="prio-bar__segment bg-blue" style="width:10%"></div>
      <div class="prio-bar__segment bg-green" style="width:13%"></div>
    </div>
    <div class="prio-bar__labels">
      <div class="prio-bar__label"><span class="prio-bar__label-dot bg-red"></span><span class="prio-bar__label-text">Critical 81-100</span><span class="prio-bar__label-value">100</span></div>
      <div class="prio-bar__label"><span class="prio-bar__label-dot bg-orange"></span><span class="prio-bar__label-text">High 71-80</span><span class="prio-bar__label-value">80</span></div>
      <div class="prio-bar__label"><span class="prio-bar__label-dot bg-amber"></span><span class="prio-bar__label-text">Medium 51-70</span><span class="prio-bar__label-value">50</span></div>
      <div class="prio-bar__label"><span class="prio-bar__label-dot bg-blue"></span><span class="prio-bar__label-text">Low 26-50</span><span class="prio-bar__label-value">30</span></div>
      <div class="prio-bar__label"><span class="prio-bar__label-dot bg-green"></span><span class="prio-bar__label-text">Very Low 0-25</span><span class="prio-bar__label-value">50</span></div>
    </div>
  </div>
</div>
```

### Pattern 3: Donut Chart (Alerts Intelligence)

Ring donut with center percentage + side stats. Uses Chart.js.

```html
<div class="widget widget--gap-lg">
  <div class="widget__header">
    <span class="widget__title">Alerts Intelligence</span>
    <div class="widget__toolbar">
      <button class="widget__toolbar-btn" data-tooltip="Maximize"><img src="../assets/icons/icon-widget-maximize.svg" alt=""></button>
      <button class="widget__toolbar-btn" data-tooltip="Refresh"><img src="../assets/icons/icon-refresh.svg" alt=""></button>
      <button class="widget__toolbar-btn" data-tooltip="More"><img src="../assets/icons/icon-more.svg" alt=""></button>
    </div>
  </div>
  <div class="widget__body" style="flex-direction:row;gap:24px;align-items:center">
    <div class="donut-wrap" style="width:120px;height:120px">
      <canvas id="donut-1"></canvas>
      <div class="donut-center">
        <span class="donut-center__value">7.3%</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div><div class="sev-badge sev-badge--critical" style="margin-bottom:4px">Analysed</div><div class="widget__value--lg">2.5M</div><div class="widget__sub">Logs</div></div>
      <div><div class="sev-badge sev-badge--high" style="margin-bottom:4px">Detected</div><div class="widget__value--lg">5.3K</div><div class="widget__sub">Alerts</div></div>
    </div>
  </div>
</div>
```

### Pattern 4: Horizontal Bar Chart (Top 5 Suspects)

Label + bar + large number. JS populates rows.

```html
<div class="widget widget--gap-lg">
  <div class="widget__header">
    <span class="widget__title">Top 5 Suspects</span>
    <div class="widget__toolbar">
      <button class="widget__toolbar-btn" data-tooltip="Maximize"><img src="../assets/icons/icon-widget-maximize.svg" alt=""></button>
      <button class="widget__toolbar-btn" data-tooltip="Refresh"><img src="../assets/icons/icon-refresh.svg" alt=""></button>
      <button class="widget__toolbar-btn" data-tooltip="More"><img src="../assets/icons/icon-more.svg" alt=""></button>
    </div>
  </div>
  <div class="hbar" id="hbar-suspects">
    <!-- JS populates rows -->
  </div>
</div>
```

### Pattern 5: Recent Alerts Feed

Scrollable card list. Each card: icon + title + badge + body text + meta.

```html
<div class="widget" style="max-height:600px">
  <div class="widget__header">
    <span class="widget__title">Recent Alerts</span>
    <img src="../assets/icons/icon-widget-notification.svg" alt="" style="width:14px;height:14px">
    <div class="widget__toolbar">
      <button class="widget__toolbar-btn" data-tooltip="Maximize"><img src="../assets/icons/icon-widget-maximize.svg" alt=""></button>
      <button class="widget__toolbar-btn" data-tooltip="Refresh"><img src="../assets/icons/icon-refresh.svg" alt=""></button>
      <button class="widget__toolbar-btn" data-tooltip="More"><img src="../assets/icons/icon-more.svg" alt=""></button>
    </div>
  </div>
  <div class="alert-feed scrollbar-thin" id="alert-feed-1">
    <!-- JS populates alert cards -->
  </div>
</div>
```

### Pattern 6: Radar / Spider Chart

Uses Chart.js radar type.

```html
<div class="widget widget--gap-lg">
  <div class="widget__header">
    <span class="widget__title">Alerts Status and Severity</span>
  </div>
  <div style="display:flex;gap:24px;align-items:center">
    <div class="chart-container" style="width:200px;height:200px;flex-shrink:0">
      <canvas id="radar-1"></canvas>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div class="stat-row"><span class="stat-row__dot bg-red"></span><span class="widget__label">Open</span></div>
      <div style="display:flex;align-items:baseline;gap:8px"><span class="widget__value" style="font-size:20px">250</span><span class="widget__sub">Critical</span></div>
      <div style="display:flex;align-items:baseline;gap:8px"><span class="widget__value" style="font-size:20px">50</span><span class="widget__sub">Trouble</span></div>
      <div style="display:flex;align-items:baseline;gap:8px"><span class="widget__value" style="font-size:20px">50</span><span class="widget__sub">Attention</span></div>
    </div>
  </div>
</div>
```

### Pattern 7: Donut with Side Legend (SLA Violations)

Chart.js doughnut + right-aligned legend list.

```html
<div class="widget widget--gap-lg">
  <div class="widget__header">
    <span class="widget__title">SLA Violations by Priority Score</span>
    <img src="../assets/icons/icon-widget-schedule.svg" alt="" style="width:14px;height:14px">
  </div>
  <div style="display:flex;gap:24px;align-items:center">
    <div class="chart-container" style="width:180px;height:180px;flex-shrink:0">
      <canvas id="donut-sla"></canvas>
    </div>
    <div class="chart-legend" style="flex-direction:column;align-items:flex-start;gap:8px">
      <div class="chart-legend__item"><span class="chart-legend__dot bg-blue"></span>Acknowledged</div>
      <div class="chart-legend__item"><span class="chart-legend__dot bg-green"></span>Assigned</div>
      <div class="chart-legend__item"><span class="chart-legend__dot bg-orange"></span>Under Investigation</div>
    </div>
  </div>
</div>
```

### Pattern 8: Bubble / Concentric Rings (Alerts State Analysis)

Custom rendering via Chart.js bubble or SVG.

```html
<div class="widget widget--gap-lg">
  <div class="widget__header">
    <span class="widget__title">Alerts State Analysis</span>
    <div class="widget__toolbar">
      <button class="widget__toolbar-btn" data-tooltip="Maximize"><img src="../assets/icons/icon-widget-maximize.svg" alt=""></button>
      <button class="widget__toolbar-btn" data-tooltip="Refresh"><img src="../assets/icons/icon-refresh.svg" alt=""></button>
      <button class="widget__toolbar-btn" data-tooltip="More"><img src="../assets/icons/icon-more.svg" alt=""></button>
    </div>
  </div>
  <div style="display:flex;gap:16px;align-items:flex-end">
    <div class="chart-container" style="height:160px;flex:1">
      <canvas id="bubble-analysis"></canvas>
    </div>
  </div>
  <div class="chart-legend">
    <div class="chart-legend__item"><span class="chart-legend__dot bg-blue"></span>Open</div>
    <div class="chart-legend__item"><span class="chart-legend__dot bg-teal"></span>Assigned</div>
    <div class="chart-legend__item"><span class="chart-legend__dot bg-purple"></span>Under Investigation</div>
    <div class="chart-legend__item"><span class="chart-legend__dot bg-orange"></span>Under Remediation</div>
    <div class="chart-legend__item"><span class="chart-legend__dot bg-green"></span>Closed</div>
  </div>
</div>
```

### Pattern 9: Line + Bar Combo (Top 5 Affected Log Sources)

Chart.js mixed chart: bars + line overlay.

```html
<div class="widget widget--gap-lg">
  <div class="widget__header">
    <span class="widget__title">Top 5 Affected Log Sources</span>
  </div>
  <div class="chart-container" style="height:200px">
    <canvas id="combo-logs"></canvas>
  </div>
  <div class="chart-legend">
    <div class="chart-legend__item"><span class="chart-legend__dot bg-red"></span>Critical</div>
    <div class="chart-legend__item"><span class="chart-legend__dot bg-orange"></span>Trouble</div>
    <div class="chart-legend__item"><span class="chart-legend__dot bg-amber"></span>Attention</div>
    <div class="chart-legend__item"><span class="chart-legend__dot" style="border:2px solid var(--chart-blue);background:transparent"></span>Risk Score</div>
  </div>
</div>
```

### Pattern 10: Pie / Donut with Side Legend (Closed Alerts State)

Large donut with center number + right-side legend.

```html
<div class="widget widget--gap-lg">
  <div class="widget__header">
    <span class="widget__title">Closed Alerts State</span>
  </div>
  <div style="display:flex;gap:24px;align-items:center">
    <div class="donut-wrap" style="width:180px;height:180px">
      <canvas id="donut-closed"></canvas>
      <div class="donut-center">
        <span class="widget__value--xl" style="font-size:50px;font-weight:600">60</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <div class="chart-legend__item"><span class="chart-legend__dot bg-red"></span><span class="widget__label">Remediated</span><span class="widget__value" style="font-size:11px;font-weight:600;margin-left:auto">20</span></div>
      <div class="chart-legend__item"><span class="chart-legend__dot bg-orange"></span><span class="widget__label">Moved to Incident</span><span class="widget__value" style="font-size:11px;font-weight:600;margin-left:auto">20</span></div>
      <div class="chart-legend__item"><span class="chart-legend__dot bg-amber"></span><span class="widget__label">False positive</span><span class="widget__value" style="font-size:11px;font-weight:600;margin-left:auto">20</span></div>
      <div class="chart-legend__item"><span class="chart-legend__dot bg-green"></span><span class="widget__label">Benign positive</span><span class="widget__value" style="font-size:11px;font-weight:600;margin-left:auto">20</span></div>
      <div class="chart-legend__item"><span class="chart-legend__dot bg-blue"></span><span class="widget__label">Custom</span><span class="widget__value" style="font-size:11px;font-weight:600;margin-left:auto">20</span></div>
    </div>
  </div>
</div>
```

## Complete CSS

```css
/* ============================================================
   WIDGET — Dashboard widget cards, grid layout, chart containers
   Captured from Figma Elegant Components 1.0 via MCP inspection
   Frame: "1" (531:31621) — SOC Alerts Overview dashboard

   FIGMA STRUCTURE:
     Dashboard (INSTANCE 1568x2042)
     ├── Header row (28px: title + date range + refresh + filter)
     └── Body (VERTICAL gap:4)
         ├── Row (HORIZONTAL gap:4)
         │   ├── Widget Card (bg:#FFF, border:1px #E9E9E9, radius:4, pad:24)
         │   └── Widget Card ...
         ├── Row ...
         └── Row ...

   CAPTURED TOKENS (from Figma):
     Widget bg: #FFFFFF
     Widget border: 1px solid #E9E9E9 (233,233,233)
     Widget border-radius: 4px
     Widget padding: 24px all sides
     Dashboard bg: #F5F5F5 (245,245,245)
     Row/col gap: 4px
     Title: 14px/600 #000000
     Label: 11px/400 #626262
     Value (sm): 20px/400 #000000
     Value (lg): 28px/400 #000000
     Toolbar icon: 24x24, bg:#D9D9D9, radius:2, pad:5
   ============================================================ */

/* ── Dashboard grid container ── */
.dash {
  background: var(--dash-bg);
  display: flex;
  flex-direction: column;
  gap: var(--dash-gap);
}

/* ── Dashboard header bar ── */
.dash__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--dash-header-height);
  padding: 4px 0 0;
}
.dash__header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.dash__header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.dash__title {
  font-size: var(--widget-title-fs);
  font-weight: var(--widget-title-fw);
  color: var(--widget-title-color);
}
.dash__subtitle {
  font-size: var(--widget-label-fs);
  color: var(--widget-label-color);
}

/* ── Widget grid row ── */
.dash__row {
  display: flex;
  gap: var(--dash-gap);
}
.dash__row > * {
  flex: 1;
  min-width: 0;
}

/* ── Widget card ── */
.widget {
  background: var(--widget-bg);
  border: 1px solid var(--widget-border);
  border-radius: var(--widget-radius);
  padding: var(--widget-padding);
  display: flex;
  flex-direction: column;
  gap: var(--widget-title-gap);
}
.widget--gap-lg {
  gap: var(--widget-content-gap);
}
.widget--no-flex {
  flex: none;
}

/* ── Widget header (title + toolbar) ── */
.widget__header {
  display: flex;
  align-items: center;
  gap: var(--widget-title-gap);
  min-height: 24px;
}
.widget__title {
  font-size: var(--widget-title-fs);
  font-weight: var(--widget-title-fw);
  color: var(--widget-title-color);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Widget toolbar (maximize / refresh / more icons) ──
   BEHAVIOR: Hidden by default. Appears on widget hover.
   Individual icon bg is transparent; shows grey bg only on icon hover.
   Each button supports a tooltip via title="" or data-tooltip="". */
.widget__toolbar {
  display: flex;
  align-items: center;
  gap: var(--widget-toolbar-gap);
  flex-shrink: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.widget:hover > .widget__header > .widget__toolbar,
.widget:hover > .ch > .widget__toolbar,
.card:hover > .ch > .widget__toolbar {
  opacity: 1;
  pointer-events: auto;
}
.widget__toolbar-btn {
  position: relative;
  width: var(--widget-toolbar-icon-size);
  height: var(--widget-toolbar-icon-size);
  background: transparent;
  border-radius: var(--widget-toolbar-icon-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--widget-toolbar-icon-pad);
  border: none;
  cursor: pointer;
  transition: background 0.15s;
}
.widget__toolbar-btn:hover {
  background: var(--widget-toolbar-icon-bg);
}
.widget__toolbar-btn img,
.widget__toolbar-btn svg {
  width: 14px;
  height: 14px;
}

/* Tooltip — appears below the icon on hover */
.widget__toolbar-btn::after {
  content: attr(data-tooltip);
  position: absolute;
  top: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  background: #272D42;
  color: #FFFFFF;
  font-size: 11px;
  font-weight: 400;
  white-space: nowrap;
  border-radius: 4px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
  z-index: 10;
}
.widget__toolbar-btn:hover::after {
  opacity: 1;
}
.widget__toolbar-btn:not([data-tooltip])::after,
.widget__toolbar-btn[data-tooltip=""]::after {
  display: none;
}

/* ── Widget body / content area ── */
.widget__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--widget-content-gap);
  min-height: 0;
}

/* ── Value typography ── */
.widget__value {
  font-size: var(--widget-value-fs);
  font-weight: var(--widget-value-fw);
  color: var(--widget-value-color);
  line-height: 1.2;
}
.widget__value--lg {
  font-size: var(--widget-value-lg-fs);
  font-weight: 400;
}
.widget__value--xl {
  font-size: var(--widget-value-xl-fs);
  font-weight: var(--widget-value-xl-fw);
}
.widget__label {
  font-size: var(--widget-label-fs);
  font-weight: var(--widget-label-fw);
  color: var(--widget-label-color);
}
.widget__pct {
  font-size: var(--widget-pct-fs);
  font-weight: var(--widget-pct-fw);
  color: var(--widget-pct-color);
}
.widget__sub {
  font-size: var(--widget-sub-fs);
  color: var(--widget-sub-color);
}

/* ── Stat row (icon/label + value inline) ── */
.stat-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.stat-row__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.stat-row__icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* ── Stat KV pair (label left, value right) ── */
.stat-kv {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid var(--widget-border);
}
.stat-kv:last-child {
  border-bottom: none;
}

/* ── Legend (chart legends) ── */
.chart-legend {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.chart-legend__item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--widget-label-fs);
  color: var(--widget-label-color);
}
.chart-legend__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ── Horizontal bar chart (pure CSS) ── */
.hbar {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.hbar__row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.hbar__label {
  font-size: 11px;
  color: var(--widget-label-color);
  width: 80px;
  text-align: right;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hbar__track {
  flex: 1;
  background: var(--chart-grid);
  border-radius: 2px;
  height: 16px;
  overflow: hidden;
}
.hbar__fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.6s ease-out;
}
.hbar__value {
  font-size: 28px;
  font-weight: 300;
  width: 48px;
  text-align: right;
  flex-shrink: 0;
  line-height: 1;
}

/* ── Severity badge ── */
.sev-badge {
  display: inline-block;
  padding: var(--sev-badge-pad);
  border-radius: var(--sev-badge-radius);
  font-size: var(--sev-badge-fs);
  font-weight: var(--sev-badge-fw);
  color: var(--sev-badge-text);
  white-space: nowrap;
  line-height: 1.3;
}
.sev-badge--critical { background: var(--sev-critical-bg); }
.sev-badge--high     { background: var(--sev-high-bg); }
.sev-badge--medium   { background: var(--sev-medium-bg); color: #000; }
.sev-badge--low      { background: var(--sev-low-bg); }
.sev-badge--verylow  { background: var(--sev-verylow-bg); }

/* ── Alert card (Recent Alerts feed) ── */
.alert-feed {
  display: flex;
  flex-direction: column;
  gap: var(--alert-card-list-gap);
  overflow-y: auto;
  flex: 1;
}
.alert-card {
  background: var(--alert-card-bg);
  border: 1px solid var(--alert-card-border);
  border-radius: var(--alert-card-radius);
  padding: var(--alert-card-padding);
  display: flex;
  flex-direction: column;
  gap: var(--alert-card-gap);
}
.alert-card__header {
  display: flex;
  align-items: center;
  gap: 8px;
}
.alert-card__icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 12px;
  color: #FFFFFF;
}
.alert-card__icon--critical { background: var(--sev-critical-bg); }
.alert-card__icon--high     { background: var(--sev-high-bg); }
.alert-card__icon--medium   { background: var(--sev-medium-bg); }
.alert-card__icon--low      { background: var(--sev-low-bg); }
.alert-card__name {
  font-size: 12px;
  font-weight: 400;
  color: var(--widget-title-color);
  flex: 1;
}
.alert-card__body {
  font-size: var(--alert-card-body-fs);
  color: var(--alert-card-body-color);
  line-height: 1.5;
}
.alert-card__meta {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--widget-label-fs);
  color: var(--widget-label-color);
}

/* ── Donut / ring indicator ── */
.donut-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.donut-wrap canvas {
  display: block;
}
.donut-center {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.donut-center__value {
  font-size: var(--widget-pct-fs);
  font-weight: var(--widget-pct-fw);
  color: var(--widget-pct-color);
  line-height: 1.2;
}
.donut-center__label {
  font-size: 9px;
  color: var(--widget-label-color);
}

/* ── Priority score bar (segmented horizontal) ── */
.prio-bar {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.prio-bar__track {
  display: flex;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
}
.prio-bar__segment {
  height: 100%;
  transition: width 0.5s ease-out;
}
.prio-bar__labels {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.prio-bar__label {
  display: flex;
  align-items: center;
  gap: 4px;
}
.prio-bar__label-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
  flex-shrink: 0;
}
.prio-bar__label-text {
  font-size: 11px;
  color: var(--widget-label-color);
}
.prio-bar__label-value {
  font-size: 11px;
  font-weight: 600;
  color: var(--widget-title-color);
}

/* ── Chart container (for Chart.js canvas) ── */
.chart-container {
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 0;
}
.chart-container canvas {
  width: 100% !important;
  height: 100% !important;
}

/* ── Responder card (avatar + stats) ── */
.responder-strip {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 4px;
}
.responder-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 120px;
  flex-shrink: 0;
}
.responder-card__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--chart-grid);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.responder-card__avatar img,
.responder-card__avatar svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.responder-card__name {
  font-size: 11px;
  color: var(--widget-title-color);
  text-align: center;
}
.responder-card__stat {
  font-size: var(--widget-value-lg-fs);
  font-weight: 400;
  color: var(--widget-value-color);
}
.responder-card__label {
  font-size: 9px;
  color: var(--widget-label-color);
  text-align: center;
}
.responder-card__bar {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  overflow: hidden;
}
.responder-card__bar-fill {
  height: 100%;
  border-radius: 2px;
}

/* ── Divider (thin line between sections inside a widget) ── */
.widget__divider {
  border: none;
  border-top: 1px solid var(--widget-border);
  margin: 0;
}

/* ── Color utility classes ── */
.c-red      { color: var(--chart-red); }
.c-green    { color: var(--chart-green); }
.c-blue     { color: var(--chart-blue); }
.c-amber    { color: var(--chart-amber); }
.c-orange   { color: var(--chart-orange); }
.c-purple   { color: var(--chart-purple); }
.c-teal     { color: var(--chart-teal); }
.c-grey     { color: var(--widget-label-color); }
.c-black    { color: var(--widget-title-color); }
.bg-red     { background: var(--chart-red); }
.bg-green   { background: var(--chart-green); }
.bg-blue    { background: var(--chart-blue); }
.bg-amber   { background: var(--chart-amber); }
.bg-orange  { background: var(--chart-orange); }
.bg-purple  { background: var(--chart-purple); }
.bg-teal    { background: var(--chart-teal); }

/* ── Responsive collapse ── */
@media (max-width: 1024px) {
  .dash__row {
    flex-direction: column;
  }
}
```

## JavaScript API

`widget.js` exposes the `ElegantWidget` global object. Requires **Chart.js 4.x** loaded first.

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
<script src="./components/widget.js"></script>
```

### Public Methods

| Method | Signature | Description |
|---|---|---|
| `donut` | `ElegantWidget.donut(canvasId, data, options)` | Doughnut chart (cutout 68%) |
| `hbar` | `ElegantWidget.hbar(containerId, data, options)` | Horizontal bar (pure DOM) |
| `radar` | `ElegantWidget.radar(canvasId, data, options)` | Radar / spider chart |
| `line` | `ElegantWidget.line(canvasId, data, options)` | Line chart |
| `bar` | `ElegantWidget.bar(canvasId, data, options)` | Vertical bar chart |
| `combo` | `ElegantWidget.combo(canvasId, data, options)` | Bar + line mixed chart |
| `sparkline` | `ElegantWidget.sparkline(canvasId, data, options)` | Tiny inline sparkline |
| `bubble` | `ElegantWidget.bubble(canvasId, data, options)` | Bubble / proportional circles |
| `prioBar` | `ElegantWidget.prioBar(containerId, segments)` | Priority score bar (DOM) |
| `alertFeed` | `ElegantWidget.alertFeed(containerId, alerts)` | Alert card feed (DOM) |

### Constants

- `ElegantWidget.COLORS` — Named colour map (`blue`, `teal`, `purple`, `orange`, `green`, `red`, `amber`, `lightBlue`, `grid`, `label`, `black`, `white`)
- `ElegantWidget.PALETTE` — Array of 8 chart colours

### Chart Configuration Defaults

- Responsive: `true`, maintainAspectRatio: `false`
- Tooltip: dark bg `#272D42`, Zoho Puvi font, radius 4px
- Legend: disabled by default (rendered in HTML)
- Grid lines: `#E9E9E9`
- Tick labels: 11px `#626262`

## Variants

| # | Pattern | Layout | Use for |
|---|---|---|---|
| 1 | Stat Card | Value + sparkline + severity | Primary alert summary |
| 2 | Priority Score Bar | Segmented bar + labels | Score distribution |
| 3 | Donut Chart | Ring + center % + side stats | Intelligence ratios |
| 4 | Horizontal Bar | Label + bar + number | Top-N rankings |
| 5 | Recent Alerts Feed | Scrollable card list | Alert timeline |
| 6 | Radar Chart | Spider + side stats | Multi-dimensional severity |
| 7 | Donut + Side Legend | Chart + vertical legend | SLA / category breakdown |
| 8 | Bubble / Rings | Proportional circles + legend | State analysis |
| 9 | Combo Chart | Bar + line overlay + legend | Source correlation |
| 10 | Pie + Side Legend | Large donut + numbered legend | Closed state breakdown |

## Assembly Notes

1. **Always** wrap widgets in `<div class="dash">` with `.dash__row` rows.
2. Use `widget--gap-lg` for chart-heavy widgets that need extra spacing.
3. Chart patterns require Chart.js 4.x loaded before `widget.js`.
4. Toolbar icons auto-hide — no JS needed (CSS `:hover` driven).
5. Add `data-tooltip="Label"` to toolbar buttons for tooltip text.
6. Use `.bg-red`, `.bg-blue`, etc. utility classes for coloured dots/segments.
7. For responsive layouts, widgets collapse to single column below 1024px.
