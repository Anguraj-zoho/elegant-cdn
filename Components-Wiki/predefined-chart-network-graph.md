# Predefined Chart: Network Graph

> Component: Network Graph (Force Layout)
> CSS: none (ECharts canvas) | JS: `echarts-widget.js` → `ElegantEChart.graph()` | HTML ref: `predefined-charts/network-graph.html`

## Quick Summary

A force-directed graph for visualizing network topology, attack paths, and entity relationships. Nodes are colored by category with proportional sizing, connected by curved edges. Supports roaming (pan + zoom) and adjacency emphasis on hover.

## Configuration

### Data Format

```js
{
  categories: ['Attacker', 'C2 Server', 'Target', 'Honeypot'],
  nodes: [
    { name: '10.0.3.47', category: 0, size: 35 },
    ...
  ],
  links: [
    { source: '10.0.3.47', target: 'C2-proxy.evil' },
    ...
  ]
}
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `layout` | `string` | `'force'` | Graph layout algorithm |
| `repulsion` | `number` | `200` | Force repulsion strength |
| `edgeLength` | `[number, number]` | `[80, 160]` | Edge length range |

## Required Icons

None.

## Complete HTML

```html
<!--
  Elegant Predefined Chart: Network Graph (Force Layout)
  Usage: Topology, attack paths, relationship mapping
-->
<div class="card__chart card__chart--tall" id="chart-graph-1" style="width:100%;min-height:360px;"></div>
<script>
ElegantEChart.graph('chart-graph-1', {
  categories: ['Attacker','C2 Server','Target','Honeypot'],
  nodes: [
    { name: '10.0.3.47', category: 0, size: 35 },
    { name: '192.168.1.100', category: 0, size: 30 },
    { name: 'C2-proxy.evil', category: 1, size: 28 },
    { name: 'malware-cdn.io', category: 1, size: 25 },
    { name: 'Web Server', category: 2, size: 32 },
    { name: 'DB Server', category: 2, size: 30 },
    { name: 'AD Controller', category: 2, size: 34 },
    { name: 'Mail Server', category: 2, size: 28 },
    { name: 'HNY-02', category: 3, size: 22 },
    { name: 'HNY-05', category: 3, size: 20 }
  ],
  links: [
    { source: '10.0.3.47', target: 'C2-proxy.evil' },
    { source: '192.168.1.100', target: 'malware-cdn.io' },
    { source: 'C2-proxy.evil', target: 'Web Server' },
    { source: 'C2-proxy.evil', target: 'AD Controller' },
    { source: 'malware-cdn.io', target: 'DB Server' },
    { source: 'malware-cdn.io', target: 'Mail Server' },
    { source: 'Web Server', target: 'DB Server' }
  ]
}, { repulsion: 300 });
</script>
```

## Assembly Notes

- Node labels: 11 px Zoho Puvi, black.
- Edge lines: `#DCDCDC` with 0.1 curveness, 0.6 opacity.
- Emphasis focuses adjacency with 3 px line width and full opacity.
- Container needs `min-height: 360px`.
- Animation: 1500 ms with quinticInOut easing on update.
