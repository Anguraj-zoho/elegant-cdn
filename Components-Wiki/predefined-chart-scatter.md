# Predefined Chart: Scatter

> Component: Scatter / Bubble Chart
> CSS: none (ECharts canvas) | JS: `echarts-widget.js` → `ElegantEChart.scatter()` | HTML ref: `predefined-charts/scatter.html`

## Quick Summary

A scatter plot for correlation analysis between two dimensions. Supports multiple series (e.g., severity tiers) and optional bubble mode where a third data dimension controls point size.

## Configuration

### Data Format

```js
{
  datasets: [
    { label: 'Critical', values: [[x, y], [x, y], ...], color: '#DD1616' }
  ]
}
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `xLabel` | `string` | `''` | X-axis label |
| `yLabel` | `string` | `''` | Y-axis label |
| `bubble` | `boolean` | `false` | Enable bubble mode (third value = size) |

## Required Icons

None.

## Complete HTML

```html
<!--
  Elegant Predefined Chart: Scatter
  Usage: Correlation analysis (response time vs severity)
-->
<div class="card__chart" id="chart-scatter-1" style="width:100%;min-height:280px;"></div>
<script>
ElegantEChart.scatter('chart-scatter-1', {
  datasets: [
    { label: 'Critical', values: [[8,95],[12,88],[6,92],[15,78],[9,90]], color: '#DD1616' },
    { label: 'High',     values: [[20,65],[35,55],[18,70],[40,50],[28,60]], color: '#D14900' },
    { label: 'Medium',   values: [[45,30],[60,25],[50,35],[70,20],[55,28]], color: '#FABB34' }
  ]
}, { xLabel: 'Response (min)', yLabel: 'Severity Score' });
</script>
```

## Assembly Notes

- Default symbol size: 10 px; bubble mode uses `val[2]` for size.
- Point opacity: 0.75 default, 1.0 on emphasis with shadow and white border.
- Axis names centered with gap offsets (x: 28, y: 40).
