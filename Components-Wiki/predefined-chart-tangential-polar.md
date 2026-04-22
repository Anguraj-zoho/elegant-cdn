# Predefined Chart: Tangential Polar Bar

> Component: Tangential Polar Bar
> CSS: none (ECharts canvas) | JS: `echarts-widget.js` → `ElegantEChart.tangentialPolarBar()` | HTML ref: `predefined-charts/tangential-polar.html`

## Quick Summary

A polar coordinate bar chart where bars extend radially from a center point, grouped by categories along the radius axis. Used for comparing values across states/categories with severity breakdown (e.g., Open/In Progress/Closed incidents by severity).

## Configuration

### Data Format

```js
{
  categories: ['Open', 'In Progress', 'Closed'],
  datasets: [
    { label: 'Attention', color: '#FABB34', values: [62, 78, 45] },
    { label: 'Trouble',   color: '#FF5900', values: [95, 153, 80] },
    { label: 'Critical',  color: '#C1181B', values: [150, 200, 120] }
  ]
}
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `roundCap` | `boolean` | `true` | Rounded bar ends |
| `startAngle` | `number` | `90` | Starting angle |
| `barWidth` | `number` | `10` | Bar thickness |
| `barGap` | `string` | `'35%'` | Gap between bars in same category |
| `barCategoryGap` | `string` | `'50%'` | Gap between categories |
| `radius` | `[number, string]` | `[30, '80%']` | Inner/outer radius |
| `center` | `[string, string]` | `['50%', '50%']` | Chart center position |
| `max` | `number` | auto | Maximum angle axis value |
| `showLabels` | `boolean` | `true` | Show value labels on bars |
| `labelPosition` | `string` | `'middle'` | Label position on bars |
| `showCategoryLabels` | `boolean` | `true` | Show category text labels |
| `categoryLabelPositions` | `object[]` | `[]` | `[{x, y, align}]` positions for labels |

## Required Icons

None.

## Complete HTML

```html
<!--
  Elegant Predefined Chart: Tangential Polar Bar
  Usage: Polar stacked bars (incident states by severity)
-->
<div class="card__chart" id="chart-polar-1" style="width:100%;min-height:380px;"></div>
<script>
ElegantEChart.tangentialPolarBar('chart-polar-1', {
  categories: ['Open', 'In Progress', 'Closed'],
  datasets: [
    { label: 'Attention', color: '#FABB34', values: [62, 78, 45] },
    { label: 'Trouble',   color: '#FF5900', values: [95, 153, 80] },
    { label: 'Critical',  color: '#C1181B', values: [150, 200, 120] }
  ]
}, {
  roundCap: true, startAngle: 90, barWidth: 10, barGap: '40%',
  barCategoryGap: '55%', radius: [30, '85%'], center: ['55%', '50%'], max: 260,
  categoryLabelPositions: [
    { x: '48%', y: '58%' },
    { x: '41%', y: '42%' },
    { x: '34%', y: '27%' }
  ]
});
</script>
```

## Assembly Notes

- Category labels are positioned via ECharts `graphic` elements (absolute text overlays).
- Value labels: 11 px, white, weight 500 — shown in middle of bar.
- Axis lines, ticks, and labels all hidden for clean polar appearance.
- Container needs `min-height: 380px`.
