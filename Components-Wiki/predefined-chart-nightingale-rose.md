# Predefined Chart: Nightingale Rose

> Component: Nightingale Rose (Polar Area)
> CSS: none (ECharts canvas) | JS: `echarts-widget.js` → `ElegantEChart.nightingaleRose()` | HTML ref: `predefined-charts/nightingale-rose.html`

## Quick Summary

A polar area chart (Nightingale Rose diagram) where sectors have equal angles but different radii proportional to their values. Used for proportional comparison of attack types, event categories, or distribution analysis.

## Configuration

### Data Format

```js
{
  labels: ['Brute Force', 'SQL Injection', 'XSS', ...],
  values: [340, 280, 220, ...],
  colors: ['#2C66DD', '#009CBB', '#A51C50', ...]  // optional
}
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `roseType` | `string` | `'area'` | Rose type: `'area'` or `'radius'` |
| `radius` | `[string, string]` | `['20%', '65%']` | Inner/outer radius |
| `legend` | `boolean` | `true` | Show legend |

## Required Icons

None.

## Complete HTML

```html
<!--
  Elegant Predefined Chart: Nightingale Rose
  Usage: Polar proportional comparison (attack types)
-->
<div class="card__chart" id="chart-rose-1" style="width:100%;min-height:280px;"></div>
<script>
ElegantEChart.nightingaleRose('chart-rose-1', {
  labels: ['Brute Force','SQL Injection','XSS','Phishing','DDoS','Zero-Day','Ransomware','MitM'],
  values: [340,280,220,195,170,120,95,65],
  colors: ['#2C66DD','#009CBB','#A51C50','#D14900','#198019','#DD1616','#FABB34','#4A90D9']
});
</script>
```

## Assembly Notes

- Labels: 11 px, `#626262`, with `#DCDCDC` label lines.
- Emphasis: scale 6 px with shadow.
- Animation: scale type with elasticOut easing.
- Center position: `['50%', '45%']` (slightly above center for legend room).
