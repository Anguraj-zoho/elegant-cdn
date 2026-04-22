# Predefined Chart: Pictorial Bar

> Component: Pictorial Bar
> CSS: none (ECharts canvas) | JS: `echarts-widget.js` → `ElegantEChart.pictorialBar()` | HTML ref: `predefined-charts/pictorial-bar.html`

## Quick Summary

An icon-shaped bar chart where bars are rendered using custom symbols (roundRect, circle, or SVG paths). Used for visually distinctive comparisons like affected device types.

## Configuration

### Data Format

```js
{
  labels: ['Servers', 'Laptops', ...],
  datasets: [{ label: 'Affected', values: [42, 78, ...], color: '#2C66DD', symbol: 'roundRect' }]
}
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `symbol` | `string` | `'roundRect'` | Default bar symbol shape |
| `repeat` | `boolean` | `false` | Repeat symbols to fill bar |
| `symbolSize` | `[string, number]` | `['80%', '60%']` | Symbol dimensions |

## Required Icons

None.

## Complete HTML

```html
<!--
  Elegant Predefined Chart: Pictorial Bar
  Usage: Icon-based bar visualization (affected device types)
-->
<div class="card__chart" id="chart-pictorial-1" style="width:100%;min-height:280px;"></div>
<script>
ElegantEChart.pictorialBar('chart-pictorial-1', {
  labels: ['Servers','Laptops','Firewalls','Switches','IoT','Mobile'],
  datasets: [{ label: 'Affected', values: [42,78,15,23,56,34], color: '#2C66DD', symbol: 'roundRect' }]
}, { symbolSize: ['100%', 20], repeat: true });
</script>
```

## Assembly Notes

- `symbolClip: true` by default for clean bar edges.
- Each dataset can specify its own `symbol` override.
- Axis ticks hidden for cleaner look.
