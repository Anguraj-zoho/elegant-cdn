# Predefined Chart: Combo (Bar + Line)

> Component: Combo Chart
> CSS: none (ECharts canvas) | JS: `echarts-widget.js` → `ElegantEChart.combo()` | HTML ref: `predefined-charts/combo.html`

## Quick Summary

A mixed bar-and-line chart for overlaying counts with rates/averages. Supports optional dual Y-axis. Commonly used for incident count (bars) vs resolution time (line).

## Configuration

### Data Format

```js
{
  labels: ['Jan', 'Feb', ...],
  bars:  [{ label: 'Incidents', values: [...], color: '#2C66DD' }],
  lines: [{ label: 'Avg Resolution', values: [...], color: '#DD1616' }]
}
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `dualAxis` | `boolean` | `false` | Add second Y-axis for line series |

## Required Icons

None.

## Complete HTML

```html
<!--
  Elegant Predefined Chart: Combo (Bar + Line)
  Usage: Incidents count (bar) vs resolution time (line). Set dualAxis:true.
-->
<div class="card__chart" id="chart-combo-1" style="width:100%;min-height:280px;"></div>
<script>
ElegantEChart.combo('chart-combo-1', {
  labels: ['Jan','Feb','Mar','Apr','May','Jun'],
  bars:  [{ label: 'Incidents', values: [45,38,52,41,60,48], color: '#2C66DD' }],
  lines: [{ label: 'Avg Resolution (hrs)', values: [4.2,3.8,5.1,3.5,4.8,3.2], color: '#DD1616' }]
}, { dualAxis: true });
</script>
```

## Assembly Notes

- Bar max width: 32 px, rounded top corners.
- Line is smooth with symbol size 6.
- When `dualAxis: true`, the second Y-axis has no split lines.
- Legend always shown (multiple series).
