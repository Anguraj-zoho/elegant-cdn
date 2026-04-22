# Predefined Chart: Liquid Fill (Ring Gauge)

> Component: Liquid Fill / Ring Progress Gauge
> CSS: `echarts-widget.css` (`.liquid-*` classes) | JS: `echarts-widget.js` → `ElegantEChart.liquidFill()` | HTML ref: `predefined-charts/liquid-fill.html`

## Quick Summary

A circular ring progress gauge for displaying percentage KPIs like threat level, compliance score, or uptime. Renders as a rounded-cap gauge arc with a centered percentage label. Standard container size: 120×120 px.

## Configuration

### Data Format

```js
{ values: [0.72], borderColor: '#DD1616' }
```

| Data Property | Type | Description |
|---|---|---|
| `values` | `number[]` | Array with single 0–1 value |
| `value` | `number` | Alternative single value |
| `borderColor` / `color` | `string` | Ring arc color |

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `fontSize` | `number` | `24` | Center label font size |
| `radius` | `string` | `'85%'` | Ring radius |
| `formatter` | `function` | `v => (v*100).toFixed(0) + '%'` | Center label formatter |

## Required Icons

None.

## Complete HTML

```html
<!--
  Elegant Predefined Chart: Liquid Fill (Ring Gauge)
  Usage: Percentage KPIs (threat level, compliance, uptime)
  Container: 120x120px
-->
<div class="liquid-chart" id="lf-demo" style="width:120px;height:120px;"></div>
<script>
ElegantEChart.liquidFill('lf-demo', {
  values: [0.72],
  borderColor: '#DD1616'
}, { fontSize: 20, radius: '85%' });
</script>
```

## Assembly Notes

- Uses ECharts gauge type (not the echarts-liquidfill plugin) with `startAngle:90`, `endAngle:-270`.
- Track background: `#E9E9E9`, 14 px width.
- Progress has `roundCap: true` for smooth ends.
- Animation: 1500 ms cubicOut.
- For multiple rings in a row, wrap in `.liquid-row` container.
