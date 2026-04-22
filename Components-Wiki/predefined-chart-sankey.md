# Predefined Chart: Sankey

> Component: Sankey Flow Diagram
> CSS: none (ECharts canvas) | JS: `echarts-widget.js` → `ElegantEChart.sankey()` | HTML ref: `predefined-charts/sankey.html`

## Quick Summary

A flow diagram showing directed relationships between nodes with proportional link widths. Commonly used for attack path analysis (source → technique → target), data flow visualization, and multi-step process mapping.

## Configuration

### Data Format

```js
{
  nodes: [{ name: 'NodeA' }, { name: 'NodeB' }, ...],
  links: [{ source: 'NodeA', target: 'NodeB', value: 45 }, ...]
}
```

| Data Property | Type | Description |
|---|---|---|
| `nodes[].name` | `string` | Node identifier |
| `links[].source` | `string` | Source node name |
| `links[].target` | `string` | Target node name |
| `links[].value` | `number` | Flow magnitude |

## Required Icons

None.

## Complete HTML

```html
<!--
  Elegant Predefined Chart: Sankey
  Usage: Flow analysis (attack paths, source → action → target)
-->
<div class="card__chart card__chart--tall" id="chart-sankey-1" style="width:100%;min-height:360px;"></div>
<script>
ElegantEChart.sankey('chart-sankey-1', {
  nodes: [
    { name: '192.168.1.100' },{ name: '10.0.3.47' },{ name: '172.16.0.55' },
    { name: 'Brute Force' },{ name: 'SQL Injection' },{ name: 'Port Scan' },{ name: 'Phishing' },
    { name: 'Web Server' },{ name: 'DB Server' },{ name: 'Mail Server' },{ name: 'AD Controller' }
  ],
  links: [
    { source: '192.168.1.100', target: 'Brute Force', value: 45 },
    { source: '192.168.1.100', target: 'Port Scan', value: 30 },
    { source: '10.0.3.47', target: 'SQL Injection', value: 38 },
    { source: '10.0.3.47', target: 'Phishing', value: 22 },
    { source: '172.16.0.55', target: 'Brute Force', value: 28 },
    { source: 'Brute Force', target: 'AD Controller', value: 50 },
    { source: 'Brute Force', target: 'Web Server', value: 23 },
    { source: 'SQL Injection', target: 'DB Server', value: 40 },
    { source: 'Port Scan', target: 'Web Server', value: 15 },
    { source: 'Phishing', target: 'Mail Server', value: 22 }
  ]
});
</script>
```

## Assembly Notes

- Uses gradient colored links with 0.5 curveness and 0.35 opacity (0.6 on emphasis).
- Node width: 16 px, gap: 12 px.
- Container needs `min-height: 360px` (tall chart).
- Emphasis focuses on adjacent nodes.
