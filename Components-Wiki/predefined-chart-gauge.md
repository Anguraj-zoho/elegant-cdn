# Predefined Chart: Gauge

> Component: Gauge Meter
> CSS: none (ECharts canvas) | JS: `echarts-widget.js` → `ElegantEChart.gauge()` | HTML ref: `predefined-charts/gauge.html`

## Quick Summary

A single-value gauge meter for displaying health scores, compliance percentages, or performance metrics. Uses a three-zone color scheme: green (0–30%), amber (30–70%), red (70–100%).

## Configuration

### Data Format

```js
{ value: 78, label: 'Health', color: '#2C66DD' }
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `min` | `number` | `0` | Minimum gauge value |
| `max` | `number` | `100` | Maximum gauge value |
| `formatter` | `string` | `'{value}%'` | Detail label format |

## Required Icons

None.

## Complete HTML

```html
<!--
  Elegant Predefined Chart: Gauge
  Usage: Single KPI health score
-->
<div class="card__chart" id="chart-gauge-1" style="width:100%;min-height:280px;"></div>
<script>
ElegantEChart.gauge('chart-gauge-1', { value: 78, label: 'Health', color: '#2C66DD' });
</script>
```

## Assembly Notes

- Progress bar width: 14 px with three-zone axis coloring.
- Pointer width: 4 px, inherits zone color.
- Title: 14 px semibold at 70% offset center.
- Detail value: 28 px semibold at 40% offset center.
- Animation: 1500 ms bounceOut easing.
