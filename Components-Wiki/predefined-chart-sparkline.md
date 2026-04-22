# Predefined Chart: Sparkline

> Component: Sparkline
> CSS: none (ECharts canvas) | JS: `echarts-widget.js` → `ElegantEChart.sparkline()` | HTML ref: `predefined-charts/sparkline.html`

## Quick Summary

A tiny inline trend chart with no axes, labels, or tooltips. Used inside stat tiles, KPI cards, and tile widgets to show trend direction at a glance. Container height typically 60 px.

## Configuration

### Data Format

```js
{ values: [45, 52, 60, 58, 73, 68, 73] }
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `color` | `string` | `'#DD1616'` | Line and gradient fill color |

## Required Icons

None.

## Complete HTML

```html
<!--
  Elegant Predefined Chart: Sparkline
  Usage: Inline mini trend inside stat tiles or KPI cards. Height: 60px.
-->
<div id="spark-demo" style="width:100%;height:60px;"></div>
<script>
ElegantEChart.sparkline('spark-demo', { values: [45,52,60,58,73,68,73] }, { color: '#2C66DD' });
</script>
```

## Assembly Notes

- Grid is flush (0 padding on all sides) — the chart fills the entire container.
- Smooth line with no symbols, no axes, no tooltip.
- Gradient fill from `color + '30'` (top) to `color + '05'` (bottom).
- Line width: 1.5 px.
- Container must have explicit width and height.
