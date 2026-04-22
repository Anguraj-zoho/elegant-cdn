# Predefined Chart: Risk Distribution

> Component: Risk Distribution (Composite Widget)
> CSS: `echarts-widget.css` | JS: `echarts-widget.js` → `ElegantEChart.riskDistribution()` | HTML ref: `predefined-charts/risk-distribution.html`

## Quick Summary

A complex composite visualization combining three coordinated charts: a **stacked polar bar** (Risk Velocity), a **semicircular sunburst** (Org Risk Distribution), and a **radar chart** (Risk by Category). All three share a severity color scheme. Supports a `sunburstOnly` mode for standalone use. Includes an SVG gauge overlay in the sunburst center.

## Configuration

### Data Format

```js
{
  severityColors: ['#DD1616', '#FB5901', '#FABB34'],
  polar: {
    title: 'Risk Velocity',
    labels: ['1Sep', '2Sep', ...],
    datasets: [
      { label: 'Critical', values: [...], color: '#DD1616' },
      { label: 'Trouble', values: [...], color: '#FB5901' },
      { label: 'Attention', values: [...], color: '#FABB34' }
    ]
  },
  sunburst: {
    title: 'Org Risk Distribution',
    categories: [
      { name: 'Assets', color: '#002EAC', children: [
        { name: 'Misconfiguration', value: 230, color: '#0E38A9', children: [...] }
      ]}
    ]
  },
  radar: {
    title: 'Risk by Category',
    labels: ['Identity', 'Operational', ...],
    max: 30000,
    datasets: [...]
  }
}
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `sunburstOnly` | `boolean` | `false` | Show only sunburst (no polar/radar) |
| `assetPath` | `string` | `'./assets/icons/'` | Path for gauge-center.svg |
| `gaugeScale` | `number` | `1.12` | Scale factor for center gauge overlay |

## Required Icons

- `gauge-center.svg` (semicircular gauge SVG overlay)

## Complete HTML

```html
<!--
  Elegant Predefined Chart: Risk Distribution (Composite)
  Usage: Complex risk view with polar bars + sunburst + radar overlay
  Container: min-height 600px
-->
<div id="chart-risk-1" style="width:100%;height:600px;"></div>
<script>
ElegantEChart.riskDistribution('chart-risk-1', {
  severityColors: ['#DD1616', '#FB5901', '#FABB34'],
  polar: {
    title: 'Risk Velocity',
    labels: ['1Sep','2Sep','3Sep','4Sep','5Sep','6Sep','7Sep','8Sep','9Sep','10Sep'],
    datasets: [
      { label: 'Critical',  values: [80,60,90,70,50,85,65,75,45,80], color: '#DD1616' },
      { label: 'Trouble',   values: [50,40,60,55,35,55,45,50,30,55], color: '#FB5901' },
      { label: 'Attention', values: [30,25,35,30,20,40,30,35,20,35], color: '#FABB34' }
    ]
  },
  sunburst: {
    score: 79, scoreLabel: 'High Risk', scoreDelta: '-6 pts (30 days)',
    categories: [
      { name: 'Assets', color: '#002EAC', children: [
        { name: 'Misconfiguration', value: 230, color: '#0E38A9', children: [
          { name: 'UEBA Risk', value: 230, color: '#3465EC' }
        ]},
        { name: 'Vulnerability', value: 240, color: '#1141C6' }
      ]},
      { name: 'Applications', color: '#0087A1', children: [
        { name: 'UEBA Risk', value: 230, color: '#009CBB' }
      ]},
      { name: 'Users', color: '#9750FB', children: [
        { name: 'DLP Risk', value: 300, color: '#B27CFF' }
      ]}
    ]
  },
  radar: {
    title: 'Risk by Category',
    labels: ['Identity','Operational','Data Exposure','Lateral','Evasion','Intrusion','Surface'],
    max: 30000,
    datasets: [
      { label: 'Critical',  values: [25000,18000,22000,15000,20000,28000,24000], color: '#DD1616' },
      { label: 'Trouble',   values: [15000,12000,16000,10000,14000,18000,16000], color: '#FB5901' },
      { label: 'Attention', values: [8000,6000,10000,5000,8000,12000,9000],      color: '#FABB34' }
    ]
  }
});
</script>
```

## Assembly Notes

- Container must be at least 600 px tall.
- Layout: 20% polar | 60% sunburst | 20% radar (flex row).
- Sunburst uses semicircular display (bottom half hidden) with `startAngle: 180`.
- The gauge SVG overlay is absolutely positioned and auto-resized via ResizeObserver.
- A transparent "spacer" sunburst segment creates the bottom-half gap.
- Returns `{ polar, sunburst, radar }` chart instances for programmatic control.
