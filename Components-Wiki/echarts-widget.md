# ECharts Widget

> Component: ECharts Widget (ElegantEChart)
> CSS: `echarts-widget.css` | JS: `echarts-widget.js` | HTML ref: various `predefined-charts/*.html`

## Quick Summary

A comprehensive Apache ECharts wrapper providing 30+ chart types and HTML-based widgets with Elegant theme styling. Exposes a unified `ElegantEChart.*` API for rendering bar, line, pie, donut, combo, radar, scatter, heatmap, gauge, treemap, sunburst, sankey, funnel, sparkline, waterfall, and many specialized SOC/SIEM widgets (alert cards, team boards, geographic maps, risk distributions, etc.). Auto-injects its CSS if not already loaded.

## Configuration

### Script Load Order

```html
<script src="./predefined-components/lib/echarts.min.js"></script>
<script src="./predefined-components/echarts-elegant-theme.js"></script>
<script src="./predefined-components/echarts-widget.js"></script>
```

### Default Palette

Inherited from `ElegantThemePalette`:
`['#2C66DD', '#009CBB', '#A51C50', '#D14900', '#198019', '#DD1616', '#FABB34', '#4A90D9']`

### Tooltip Defaults

- **Axis tooltip:** Dark background `#272D42`, 11 px white text, axis pointer shadow
- **Item tooltip:** Same dark style, triggered per data point

## Required Icons

Various — depends on widget type:
- Alert widgets: `icon-alert-critical.svg`, `icon-alert-warning.svg`, `icon-alert-clock.svg`, `icon-alert-calendar.svg`, `icon-alert-hourglass.svg`, `icon-alert-avatar-small.svg`
- Analysis widget: `icon-analysis-bell.svg`, `icon-analysis-sort.svg`, `icon-analysis-sev-orange.svg`, `icon-analysis-sev-yellow.svg`
- Metrics widget: `icon-metric-trend-up.svg`, `icon-metric-clock.svg`
- Summary widget: `icon-summary-bell.svg`, `icon-alert-schedule.svg`
- Tile widget: `icon-tile-sev-critical.svg`, `icon-tile-sev-trouble.svg`, `icon-tile-sev-attention.svg`, `icon-tile-muted.svg`, `icon-metric-trend-up.svg`, `icon-metric-clock.svg`
- Geo widget: `gauge-center.svg` (for risk distribution)

## JavaScript API

### Standard ECharts Charts

| Method | Signature | Description |
|---|---|---|
| `ElegantEChart.bar(domId, data, options)` | Vertical bar / grouped / stacked |
| `ElegantEChart.hbar(domId, data, options)` | Horizontal bar |
| `ElegantEChart.line(domId, data, options)` | Line / area / multi-line |
| `ElegantEChart.stackedArea(domId, data, options)` | Stacked area with gradient fill |
| `ElegantEChart.pie(domId, data, options)` | Pie chart |
| `ElegantEChart.donut(domId, data, options)` | Donut (ring) chart |
| `ElegantEChart.combo(domId, data, options)` | Bar + line mixed |
| `ElegantEChart.radar(domId, data, options)` | Radar / spider chart |
| `ElegantEChart.scatter(domId, data, options)` | Scatter / bubble chart |
| `ElegantEChart.heatmap(domId, data, options)` | Heatmap grid |
| `ElegantEChart.gauge(domId, data, options)` | Gauge meter |
| `ElegantEChart.treemap(domId, data, options)` | Treemap |
| `ElegantEChart.sunburst(domId, data, options)` | Sunburst (nested ring) |
| `ElegantEChart.sankey(domId, data, options)` | Sankey flow diagram |
| `ElegantEChart.funnel(domId, data, options)` | Funnel chart |
| `ElegantEChart.sparkline(domId, data, options)` | Tiny inline chart (no axes) |
| `ElegantEChart.liquidFill(domId, data, options)` | Ring progress gauge |
| `ElegantEChart.themeRiver(domId, data, options)` | Stacked stream chart |
| `ElegantEChart.nightingaleRose(domId, data, options)` | Polar area (rose) chart |
| `ElegantEChart.pictorialBar(domId, data, options)` | Icon-shaped bars |
| `ElegantEChart.calendarHeatmap(domId, data, options)` | Calendar heatmap |
| `ElegantEChart.waterfall(domId, data, options)` | Waterfall (delta bar) |
| `ElegantEChart.graph(domId, data, options)` | Network graph (force layout) |
| `ElegantEChart.tangentialPolarBar(domId, data, options)` | Tangential polar bar |
| `ElegantEChart.riskDistribution(domId, data, options)` | Composite: polar + sunburst + radar |

### HTML-Based Widgets

| Method | Signature | Description |
|---|---|---|
| `ElegantEChart.teamBoard(domId, data, options)` | Paginated responder cards |
| `ElegantEChart.alertList(domId, data, options)` | Scrollable alert feed |
| `ElegantEChart.analysisWidget(domId, data, options)` | KPI summary + alert profiles |
| `ElegantEChart.metricsWidget(domId, data, options)` | KPI tiles with ring gauges |
| `ElegantEChart.alertType1(domId, data, options)` | Long pending alerts (age + assignee) |
| `ElegantEChart.alertType2(domId, data, options)` | SLA violated alerts |
| `ElegantEChart.alertType3(domId, data, options)` | Prioritized alerts (critical + SLA) |
| `ElegantEChart.suspectList(domId, data, options)` | Top suspects with risk bars |
| `ElegantEChart.summaryChartWidget(domId, data, options)` | KPI tiles + stacked area chart |
| `ElegantEChart.summaryTextWidget(domId, data, options)` | Bullet-point executive summary |
| `ElegantEChart.geoWidget(domId, data, options)` | World map with scatter pins |
| `ElegantEChart.tileWidget(domId, data, options)` | Dashboard KPI tiles (10 types) |

### Utility Methods

| Method | Signature | Description |
|---|---|---|
| `ElegantEChart.dispose(domId)` | `(string) → void` | Destroy chart instance |
| `ElegantEChart.resize()` | `() → void` | Resize all instances |

### Properties

| Property | Type | Description |
|---|---|---|
| `ElegantEChart.instances` | `Object` | Map of all live chart instances |
| `ElegantEChart.PALETTE` | `Array<string>` | 8-color palette |

## Complete CSS

```css
/* ══════════════════════════════════════════════════════════════
   ElegantEChart Widget CSS
   All CSS required by HTML-generating widget functions in echarts-widget.js.
   This file is auto-injected by echarts-widget.js if not already loaded.
   You can also include it manually: <link rel="stylesheet" href="./predefined-components/echarts-widget.css" />
   ══════════════════════════════════════════════════════════════ */

/* ── Pipeline widget (Alerts Intelligence) ── */
.pipeline { display: flex; align-items: center; gap: 0; padding: 24px 32px 16px; width: 100%; }
.pipeline__stage { display: flex; flex-direction: column; align-items: center; flex: 0 0 auto; min-width: 80px; }
.pipeline__icon {
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; border: 3px solid; flex-shrink: 0;
}
.pipeline__icon svg { display: block; }
.pipeline__arrow { flex: 1 1 0; display: flex; flex-direction: column; align-items: center; min-width: 48px; gap: 4px; padding: 0 8px; }
.pipeline__arrow-line {
  width: 100%; height: 0; border-top: 1px dashed #C0C0C0; position: relative;
}
.pipeline__arrow-line::after {
  content: ''; position: absolute; right: -2px; top: -4px;
  border: 4px solid transparent; border-left: 6px solid #C0C0C0;
}
.pipeline__pct { font-size: 11px; font-weight: 500; color: #626262; white-space: nowrap; }
.pipeline__badge {
  font-size: 11px; font-weight: 600; color: #fff; border-radius: 4px; padding: 2px 10px; margin-top: 12px;
  white-space: nowrap;
}
.pipeline__value { font-size: 22px; font-weight: 600; color: #000; margin-top: 6px; line-height: 1.2; }
.pipeline__sub { font-size: 11px; color: #626262; margin-top: 2px; }

/* ── Timeline widget (Alerts Timeline) ── */
.tl-widget { padding: 8px 0 0; }
.tl-track-wrap { position: relative; padding: 0 24px; margin-bottom: 0; }
.tl-track { display: flex; align-items: center; }
.tl-bar { flex: 1; height: 4px; background: #2C66DD; }
.tl-node {
  width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 3px solid #2C66DD;
  z-index: 1; flex-shrink: 0;
}
.tl-node--filled { background: #2C66DD; }
.tl-labels {
  display: flex; justify-content: space-between; padding: 8px 18px 0;
}
.tl-label { font-size: 11px; color: #626262; text-align: center; width: 0; flex: 1; }
.tl-label:first-child { text-align: left; flex: 0 0 auto; width: auto; }
.tl-label:last-child { text-align: right; flex: 0 0 auto; width: auto; }
.tl-metrics { display: flex; gap: 24px; padding: 16px 0 0 4px; flex-wrap: wrap; }
.tl-metric { display: flex; align-items: center; gap: 6px; font-size: 11px; }
.tl-metric-name { font-weight: 600; color: #000; }
.tl-metric-val { color: #2C66DD; font-weight: 500; }
.tl-metric-icon { width: 12px; height: 12px; opacity: .6; }

/* ── Bubble proportional (Alerts State) ── */
.bubble-wrap { position: relative; width: 100%; min-height: 220px; display: flex; align-items: center; justify-content: center; }
.bubble-ellipses { position: absolute; inset: -20px; pointer-events: none; overflow: visible; }
.bubble-row { display: flex; align-items: center; justify-content: center; gap: 28px; position: relative; z-index: 1; padding: 24px 0; }
.bubble-item { display: flex; flex-direction: column; align-items: center; }
.bubble-circle {
  border-radius: 50%; display: flex; flex-direction: column; align-items: center;
  justify-content: center; border-style: solid; transition: transform .2s ease;
  background: rgba(255,255,255,0.85);
}
.bubble-circle:hover { transform: scale(1.08); }
.bubble-val { font-weight: 700; color: #000; }
.bubble-pct { font-size: 11px; color: #626262; }
.bubble-label { font-size: 11px; color: #626262; margin-top: 4px; }

/* ── Liquid row ── */
.liquid-row { display: flex; gap: 16px; justify-content: center; align-items: center; padding: 8px 0; }
.liquid-cell { display: flex; flex-direction: column; align-items: center; }
.liquid-chart { width: 120px; height: 120px; }
.liquid-label { font-size: 11px; color: #626262; margin-top: 4px; }

/* ── Team Board (Alerts Responders) ── */
.tb-widget { width: 100%; }
.tb-scroll { display: flex; gap: 12px; overflow-x: auto; padding: 4px 0 8px; scrollbar-width: thin; scrollbar-color: #DCDCDC transparent; }
.tb-scroll::-webkit-scrollbar { height: 4px; }
.tb-scroll::-webkit-scrollbar-thumb { background: #DCDCDC; border-radius: 2px; }
.tb-card {
  flex: 0 0 160px; border: 1px solid #E9E9E9; border-radius: 6px; padding: 12px;
  display: flex; flex-direction: column; gap: 6px; background: #fff; transition: box-shadow .15s;
}
.tb-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,.08); }
.tb-card--unassigned { border-style: dashed; background: #FAFAFA; }
.tb-card-top { display: flex; gap: 10px; align-items: flex-start; }
.tb-avatar { flex-shrink: 0; }
.tb-avatar img, .tb-avatar svg { display: block; }
.tb-right { flex: 1; min-width: 0; }
.tb-name { font-size: 11px; color: #626262; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tb-count { font-size: 22px; font-weight: 700; color: #000; line-height: 1.2; }
.tb-metrics { display: flex; flex-direction: column; gap: 3px; }
.tb-metric { display: flex; align-items: baseline; gap: 6px; }
.tb-metric-label { font-size: 10px; color: #ABABAB; text-transform: uppercase; letter-spacing: 0.3px; white-space: nowrap; }
.tb-metric-val { font-size: 11px; font-weight: 600; color: #000; white-space: nowrap; }
.tb-bar { width: 100%; height: 4px; background: #F0F0F0; border-radius: 2px; overflow: hidden; margin-top: 2px; }
.tb-bar-fill { height: 100%; border-radius: 2px; transition: width .6s ease; }
.tb-pagination {
  display: flex; align-items: center; justify-content: flex-end; gap: 8px;
  padding-top: 8px; border-top: 1px solid #F0F0F0; margin-top: 4px;
}
.tb-page-info { font-size: 11px; color: #ABABAB; }
.tb-page-btn {
  width: 24px; height: 24px; border: 1px solid #DCDCDC; border-radius: 4px;
  background: #fff; cursor: pointer; font-size: 14px; color: #626262;
  display: flex; align-items: center; justify-content: center; padding: 0;
}
.tb-page-btn:hover:not(:disabled) { background: #F0F6FF; border-color: #2C66DD; color: #2C66DD; }
.tb-page-btn:disabled { opacity: 0.35; cursor: default; }

/* ── Alert List widget ── */
.al-widget { width: 100%; display: flex; flex-direction: column; flex: 1; }
.al-title-row { display: flex; align-items: center; gap: 6px; }
.al-bell { width: 14px; height: 14px; }
.al-scroll {
  display: flex; flex-direction: column; gap: 8px;
  overflow-y: auto; max-height: 520px; padding: 4px 2px 4px 0;
  scrollbar-width: thin; scrollbar-color: #DCDCDC transparent;
}
.al-scroll::-webkit-scrollbar { width: 4px; }
.al-scroll::-webkit-scrollbar-thumb { background: #C4C4C4; border-radius: 2px; }
.al-row {
  background: #fff; border: 1px solid #ECECEC; border-radius: 4px;
  padding: 12px 16px; display: flex; flex-direction: column; gap: 8px;
  transition: box-shadow .15s ease;
}
.al-row:hover { box-shadow: 0 2px 8px rgba(0,0,0,.06); }
.al-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
.al-head-left { display: flex; align-items: center; gap: 8px; min-width: 0; }
.al-sev-icon { width: 20px; height: 20px; flex-shrink: 0; }
.al-title { font-size: 12px; font-weight: 600; color: #000; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.al-badge {
  display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px;
  border-radius: 1000px; font-size: 11px; white-space: nowrap; flex-shrink: 0;
}
.al-badge-label { color: #000; }
.al-badge-score { font-weight: 600; }
.al-tags { display: flex; gap: 4px; flex-shrink: 0; }
.al-tag { font-size: 11px; padding: 2px 8px; border-radius: 4px; white-space: nowrap; }
.al-desc { font-size: 11px; color: #626262; line-height: 1.5; }
.al-time { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #626262; }
.al-clock-icon { width: 12px; height: 12px; opacity: .7; }

/* ── Suspect List widget ── */
.sp-widget { width: 100%; }
.sp-list { display: flex; flex-direction: column; }
.sp-row { padding: 8px 0; }
.sp-top { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 6px; }
.sp-name { font-size: 12px; color: #000; }
.sp-count { font-size: 14px; font-weight: 600; color: #000; }
.sp-bottom { display: flex; align-items: center; gap: 12px; }
.sp-bar-wrap { flex: 1; min-width: 0; }
.sp-bar-track {
  display: flex; height: 5px; border-radius: 3px; overflow: hidden; width: 100%;
}
.sp-bar-seg { height: 100%; flex-shrink: 0; }
.sp-bar-seg:first-child { border-radius: 3px 0 0 3px; }
.sp-bar-seg:last-child { border-radius: 0 3px 3px 0; }
.sp-score { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
.sp-score-bar { width: 2px; height: 29px; border-radius: 1px; }
.sp-score-num { font-size: 32px; font-weight: 600; line-height: 1; }
.sp-divider { height: 1px; background: #F5F5F5; }

/* ── Analysis Widget (KPI summary + alert profiles) ── */
.aw-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.aw-kpis { display: flex; align-items: flex-start; gap: 40px; flex-wrap: wrap; }
.aw-kpi { display: flex; flex-direction: column; gap: 4px; }
.aw-kpi-val { display: flex; align-items: baseline; gap: 4px; }
.aw-big { font-size: 28px; font-weight: 400; color: #000; line-height: 1.1; }
.aw-unit { font-size: 16px; color: #626262; }
.aw-kpi-label { font-size: 12px; color: #000; }
.aw-bell { width: 72px; height: 72px; border-radius: 50%; background: #E9E9E9; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.aw-bell img,
.aw-bell svg { width: 32px; height: 32px; }
.aw-divider { height: 1px; background: #E9E9E9; margin: 16px 0; }
.aw-bottom { display: flex; flex-direction: column; gap: 12px; }
.aw-subtitle { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #000; }
.aw-sort-icon { width: 14px; height: 14px; opacity: .6; cursor: pointer; }
.aw-profiles { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 4px;
  scrollbar-width: thin; scrollbar-color: #DCDCDC transparent; }
.aw-profiles::-webkit-scrollbar { height: 4px; }
.aw-profiles::-webkit-scrollbar-thumb { background: #DCDCDC; border-radius: 2px; }
.aw-profile { flex: 1 1 0; min-width: 160px; max-width: 200px; border: 1px solid #E9E9E9; border-radius: 4px; padding: 12px; display: flex; flex-direction: column; gap: 12px; background: #fff; }
.aw-profile-head { display: flex; align-items: flex-start; gap: 6px; }
.aw-profile-sev { width: 24px; height: 24px; flex-shrink: 0; }
.aw-profile-name { font-size: 12px; font-weight: 600; color: #000; line-height: 1.3; }
.aw-profile-stats { display: flex; align-items: baseline; gap: 8px; }
.aw-profile-count { font-size: 20px; font-weight: 400; color: #000; }
.aw-profile-total { font-size: 12px; color: #626262; }
.aw-profile-sep { width: 1px; height: 16px; background: #E9E9E9; align-self: center; }
.aw-profile-pct { font-size: 20px; font-weight: 400; color: #000; }
@media (max-width: 700px) {
  .aw-kpis { gap: 24px; }
  .aw-bell { width: 56px; height: 56px; }
  .aw-bell img,
  .aw-bell svg { width: 24px; height: 24px; }
  .aw-profile { min-width: 140px; }
}

/* ── Metrics Widget (KPI tiles with ring gauges) ── */
.mw-row { display: flex; align-items: stretch; gap: 12px; width: 100%; }
.mw-tile { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; flex: 1 1 0;
  background: #F5F5F5; border: 1px solid #DCDCDC; border-radius: 4px; min-width: 0; gap: 16px; }
.mw-sep { display: none; }
.mw-tile-left { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.mw-tile-right { flex-shrink: 0; }
.mw-val-dur, .mw-val-count { display: flex; align-items: baseline; gap: 4px; flex-wrap: wrap; }
.mw-big { font-size: 28px; font-weight: 400; color: #000; line-height: 1.1; }
.mw-unit { font-size: 16px; color: #626262; }
.mw-label { font-size: 12px; color: #000; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mw-trend { display: inline-flex; align-items: center; gap: 3px; padding: 1px 6px; border-radius: 8px; font-size: 11px; font-weight: 500; margin-left: 6px; }
.mw-trend-icon { width: 12px; height: 10px; }
.mw-ring { width: 60px; height: 60px; }
.mw-ring svg { width: 60px; height: 60px; }
@media (max-width: 900px) {
  .mw-row { flex-wrap: wrap; gap: 8px; }
  .mw-tile { flex: 1 1 45%; border-radius: 4px !important; border-left: 1px solid #DCDCDC !important; }
  .mw-tile--hl { border-color: #96B3EE !important; }
  .mw-sep { display: none; }
}
@media (max-width: 560px) {
  .mw-tile { flex: 1 1 100%; }
}

/* ── Alert Card Widgets (Type 1 / 2 / 3) ── */
.ac-widget { width: 100%; display: flex; flex-direction: column; }
.ac-scroll { display: flex; flex-direction: column; gap: 12px; overflow-y: auto; max-height: 480px; padding: 4px 4px 4px 0;
  scrollbar-width: thin; scrollbar-color: #DCDCDC transparent; }
.ac-scroll::-webkit-scrollbar { width: 6px; }
.ac-scroll::-webkit-scrollbar-thumb { background: #DCDCDC; border-radius: 3px; }
.ac-row {
  border: 1px solid #E9E9E9; border-radius: 4px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px;
  background: #fff; transition: box-shadow .15s;
}
.ac-row:hover { box-shadow: 0 2px 8px rgba(0,0,0,.06); }
.ac-head { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.ac-sev-icon { width: 24px; height: 24px; flex-shrink: 0; }
.ac-title { font-size: 12px; font-weight: 500; color: #000; }
.ac-badge { display: inline-flex; align-items: center; gap: 4px; padding: 1px 8px; border-radius: 10px; font-size: 11px; white-space: nowrap; }
.ac-badge-label { color: #000; }
.ac-badge-score { font-weight: 600; }
.ac-desc { font-size: 11px; color: #626262; line-height: 1.5; }
.ac-footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
.ac-time { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #626262; }
.ac-icon-sm { width: 11px; height: 11px; flex-shrink: 0; }
.ac-icon-md { width: 14px; height: 14px; flex-shrink: 0; }
.ac-age { display: flex; align-items: center; gap: 4px; font-size: 11px; }
.ac-age-val { color: #000; font-weight: 500; }
.ac-age-unit { color: #939393; }
.ac-assignee { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #000; }
.ac-avatar { width: 20px; height: 20px; border-radius: 50%; }
.ac-status-btn {
  display: inline-flex; align-items: center; gap: 4px; padding: 2px 10px; border: 1px solid #2C66DD; border-radius: 10px;
  font-size: 11px; color: #2C66DD; cursor: pointer; background: transparent; white-space: nowrap;
}
.ac-status-btn svg { width: 11px; height: 11px; }
.ac-sla { display: flex; align-items: center; gap: 4px; font-size: 12px; }
.ac-sla-text { color: #DD1616; font-weight: 500; }
.ac-sla-text--info { color: #2C66DD; }
.card__schedule-icon { width: 12px; height: 12px; margin-left: 6px; opacity: .6; }

/* ── Summary with Chart Widget ── */
.sw-widget { width: 100%; display: flex; flex-direction: column; flex: 1; }
.sw-top { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 16px; }
.sw-tiles { display: flex; gap: 12px; flex: 1; flex-wrap: wrap; }
.sw-tile {
  flex: 1; min-width: 140px; padding: 10px 14px; border-radius: 4px;
  background: #F5F5F5; border: 1px solid #DCDCDC;
  display: flex; flex-direction: column; gap: 4px;
}
.sw-tile--hl { background: #EAF0FC; border-color: #96B3EE; }
.sw-tile--hl .sw-val { color: #184091; }
.sw-tile--hl .sw-label { color: #184091; }
.sw-tile-row { display: flex; align-items: center; gap: 6px; }
.sw-val { font-size: 28px; font-weight: 400; color: #000; line-height: 1.1; }
.sw-trend { display: inline-flex; align-items: center; gap: 2px; }
.sw-trend-icon { width: 12px; height: 12px; }
.sw-trend-text { font-size: 11px; font-weight: 400; color: #DD1616; }
.sw-label { font-size: 12px; color: #000; }
.sw-label-icon { width: 12px; height: 12px; vertical-align: middle; opacity: .6; margin-left: 2px; }
.sw-bell {
  width: 64px; height: 64px; border-radius: 50%; background: #E8EDFB;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.sw-bell img,
.sw-bell svg { width: 30px; height: 30px; }
.sw-chart { width: 100%; flex: 1; min-height: 240px; }
@media (max-width: 700px) {
  .sw-tiles { flex-direction: column; }
  .sw-tile { min-width: 100%; }
}

/* ── Summary Text-Only Widget ── */
.st-widget { width: 100%; display: flex; flex-direction: column; flex: 1; }
.st-scroll {
  display: flex; flex-direction: column; gap: 12px;
  overflow-y: auto; max-height: 460px; padding: 0 4px 0 0;
  scrollbar-width: thin; scrollbar-color: #939393 transparent;
}
.st-scroll::-webkit-scrollbar { width: 6px; }
.st-scroll::-webkit-scrollbar-thumb { background: #939393; border-radius: 16px; }
.st-scroll::-webkit-scrollbar-track { background: transparent; }
.st-item { display: flex; gap: 8px; align-items: flex-start; line-height: 1.65; }
.st-bullet {
  width: 5px; height: 5px; border-radius: 50%; background: #626262;
  flex-shrink: 0; margin-top: 7px;
}
.st-text { font-size: 11px; color: #626262; }
.st-text b { font-weight: 600; color: #000; }

/* ── Geographical Widget ── */
.gw-widget { width: 100%; display: flex; flex-direction: column; flex: 1; }
.gw-controls { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.gw-tabs {
  display: inline-flex; background: #E9E9E9; border-radius: 6px; padding: 2px; gap: 2px;
}
.gw-tab {
  font-size: 12px; font-weight: 400; color: #626262; border: none; background: transparent;
  padding: 4px 12px; border-radius: 4px; cursor: pointer; white-space: nowrap;
  font-family: var(--font-family);
}
.gw-tab--active { background: #fff; color: #000; font-weight: 500; box-shadow: 0 1px 2px rgba(0,0,0,.08); }
.gw-region {
  display: flex; align-items: center; gap: 4px; font-size: 12px; color: #000; cursor: pointer;
}
.gw-map { width: 100%; flex: 1; min-height: 380px; border: 1px solid #E9E9E9; border-radius: 4px; }
.gw-legend {
  display: flex; gap: 16px; justify-content: center; padding-top: 8px; flex-shrink: 0;
}
.gw-legend-item { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #000; }
.gw-legend-dot { width: 8px; height: 8px; border-radius: 50%; }

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

/* Types 1-10 abbreviated — see full CSS in echarts-widget.css source */
.ti-1 { align-items: flex-end; }
.ti-2 { flex-direction: column; align-items: stretch; gap: 0; }
.ti-4 { justify-content: space-between; }
.ti-5 { justify-content: space-between; flex-wrap: wrap; }
.ti-6 { flex-wrap: wrap; align-items: flex-start; position: relative; }
.ti-7 { flex-wrap: wrap; align-items: flex-start; }
.ti-8 { flex-direction: column; align-items: stretch; gap: 6px; }
.ti-9 { flex-direction: column; align-items: stretch; gap: 10px; }
.ti-10 { flex-direction: column; align-items: stretch; gap: 8px; }
```

> **Note:** The full CSS is 465 lines. The complete verbatim source is in `data/components/echarts-widget.css`. The tile widget types (1–10) each have their own sub-classes — refer to the source file for the complete type-specific CSS.

## Complete HTML

No single HTML template — each chart type has its own HTML reference file in `predefined-charts/`. See the individual predefined chart wiki files for specific usage examples.

## Variants

### Standard ECharts Charts (25 types)

bar, hbar, line, stackedArea, pie, donut, combo, radar, scatter, heatmap, gauge, treemap, sunburst, sankey, funnel, sparkline, liquidFill, themeRiver, nightingaleRose, pictorialBar, calendarHeatmap, waterfall, graph, tangentialPolarBar, riskDistribution

### HTML Widgets (12 types)

teamBoard, alertList, analysisWidget, metricsWidget, alertType1, alertType2, alertType3, suspectList, summaryChartWidget, summaryTextWidget, geoWidget, tileWidget (10 sub-types)

## Assembly Notes

- Auto-injects CSS if not already loaded (detects `echarts-widget.css` in existing stylesheets).
- All ECharts instances auto-bind to window resize.
- Use `ElegantEChart.dispose(domId)` to clean up before removing chart DOM.
- HTML widgets return `{ refresh, dom }` objects for programmatic re-rendering.
- The `tileWidget` supports 10 distinct tile types via `options.type` (1–10).
- The full JS source is 2239 lines — see `data/components/echarts-widget.js` for the complete implementation.
