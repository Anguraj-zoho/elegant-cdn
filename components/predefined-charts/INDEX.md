# Predefined Charts — Quick Reference

Pick a chart by type, copy the HTML+JS block into your `widget__body`.

## ECharts (Pure Visualization)

| File | Chart Type | Min Height | Use Case |
|------|-----------|-----------|----------|
| `bar.html` | Vertical Bar | 280px | Daily counts, volume by category |
| `hbar.html` | Horizontal Bar | 280px | Top-N rankings |
| `line.html` | Line / Area | 280px | Time trends (fill:true for area) |
| `stacked-area.html` | Stacked Area | 360px | Multi-series trends |
| `donut.html` | Donut | 280px | Distribution/proportion |
| `radar.html` | Radar | 280px | Multi-axis comparison |
| `combo.html` | Bar + Line | 280px | Dual-axis (count + rate) |
| `scatter.html` | Scatter | 280px | Correlation |
| `gauge.html` | Gauge | 280px | Single KPI score |
| `sankey.html` | Sankey | 360px | Flow/path analysis |
| `sparkline.html` | Sparkline | 60px | Inline mini trend |
| `liquid-fill.html` | Liquid Ring | 120×120 | Percentage KPI |
| `nightingale-rose.html` | Rose | 280px | Polar proportional |
| `waterfall.html` | Waterfall | 280px | Cumulative change |
| `network-graph.html` | Force Graph | 360px | Topology |
| `calendar-heatmap.html` | Calendar | 280px | Daily volume over year |
| `risk-distribution.html` | Composite | 600px | Risk matrix |
| `tangential-polar.html` | Polar Bar | 380px | Polar stacked |
| `pictorial-bar.html` | Pictorial | 280px | Icon-based bars |

## HTML+JS Composite Widgets

| File | Widget Type | Use Case |
|------|-----------|----------|
| `summary-chart-widget.html` | KPI + Chart | Dashboard overview |
| `geo-widget.html` | World Map | Threat geolocation |
| `tile-widgets.html` | Tile (10 types) | KPI stat tiles |

## Required Script Tags (in order)

```html
<script src="components/lib/echarts.min.js"></script>
<script src="components/lib/echarts-liquidfill.min.js"></script>
<script src="components/echarts-elegant-theme.js"></script>
<script src="components/echarts-widget.js"></script>
<!-- For geo widget only: -->
<script src="components/lib/world-map-register.js"></script>
```
