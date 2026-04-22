# Predefined Chart: Radar

> Component: Radar Chart
> CSS: none (ECharts canvas) | JS: `echarts-widget.js` → `ElegantEChart.radar()` | HTML ref: `predefined-charts/radar.html`

## Quick Summary

Multi-axis radar (spider) chart for comparing multiple dimensions simultaneously. Commonly used for security coverage posture, risk assessment profiles, and multi-metric comparison.

## Configuration

### Data Format

```js
{
  labels: ['Axis1', 'Axis2', ...],    // Axis names (polygon vertices)
  datasets: [
    { label: 'Series', values: [85, 72, ...], color: '#2C66DD' }
  ]
}
```

| Data Property | Type | Description |
|---|---|---|
| `labels` | `string[]` | Axis category names |
| `datasets[].label` | `string` | Series name |
| `datasets[].values` | `number[]` | Values per axis |
| `datasets[].color` | `string` | Series color |

## Required Icons

None.

## Complete HTML

```html
<!--
  Elegant Predefined Chart: Radar
  Usage: Multi-axis comparison (coverage, risk posture)
-->
<div class="card__chart" id="chart-radar-1" style="width:100%;min-height:280px;"></div>
<script>
ElegantEChart.radar('chart-radar-1', {
  labels: ['Network','Endpoint','Identity','Cloud','Data','Application'],
  datasets: [
    { label: 'Current', values: [85,72,90,65,78,82], color: '#2C66DD' },
    { label: 'Target',  values: [95,90,95,85,90,90], color: '#198019' }
  ]
});
</script>
```

## Assembly Notes

- Max value auto-calculated as `ceil(maxDataValue * 1.2)`.
- Legend shown only when multiple datasets.
- Area fill opacity: `0.12`; emphasis opacity: `0.25`.
- Container needs `min-height: 280px`.
