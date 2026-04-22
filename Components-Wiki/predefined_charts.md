# Predefined Charts (ECharts)

> Component: `ElegantEChart.*` (Apache ECharts wrapper with Elegant theme)
> Files: `components/echarts-widget.js`, `components/echarts-widget.css`, `components/echarts-elegant-theme.js`, `components/predefined-charts/*.html`

## Quick Summary

All charts are rendered via the `ElegantEChart` global API, which wraps Apache ECharts with the Elegant design-system theme. Each chart method takes a DOM element ID, a data object, and optional options — then initializes an ECharts instance with the `'elegant'` theme, auto-resizes on window resize, and tracks all instances for bulk operations.

**Required scripts (load in order):**

```html
<script src="components/lib/echarts.min.js"></script>
<script src="components/lib/echarts-liquidfill.min.js"></script>
<script src="components/echarts-elegant-theme.js"></script>
<script src="components/echarts-widget.js"></script>
<!-- For geo widget only: -->
<script src="components/lib/world-map-register.js"></script>
```

**Theme Palette (8 colors):**

```
#2C66DD, #009CBB, #A51C50, #D14900, #198019, #DD1616, #FABB34, #4A90D9
```

---

## Chart Types

### 1. Vertical Bar — `ElegantEChart.bar()`

Daily counts, volume by category. Supports grouped and stacked bars.

**Complete HTML:**

```html
<div class="card__chart" id="chart-bar-1" style="width:100%;min-height:280px;"></div>
<script>
ElegantEChart.bar('chart-bar-1', {
  labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
  datasets: [
    { label: 'Critical', values: [12,19,8,15,22,6,10], color: '#DD1616' },
    { label: 'High',     values: [8,14,11,9,17,5,7],   color: '#D14900' },
    { label: 'Medium',   values: [20,25,18,22,30,12,15], color: '#FABB34' }
  ]
});
</script>
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `labels` | `string[]` | X-axis category labels |
| `datasets` | `array` | Array of series objects |
| `datasets[].label` | `string` | Series name |
| `datasets[].values` | `number[]` | Data values |
| `datasets[].color` | `string` | Hex color |

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `stacked` | `boolean` | `false` | Stack all series into `'total'` |
| `barMaxWidth` | `number` | `40` | Max bar width in px |

---

### 2. Horizontal Bar — `ElegantEChart.hbar()`

Top-N rankings, export counts, user activity.

**Complete HTML:**

```html
<div class="card__chart" id="chart-hbar-1" style="width:100%;min-height:280px;"></div>
<script>
ElegantEChart.hbar('chart-hbar-1', {
  labels: ['User A','User B','User C','User D','User E','User F'],
  datasets: [{ label: 'Export Count', values: [866,3452,34534,35667,1231,1231], color: '#2C66DD' }]
});
</script>
```

**Data format:** Same as vertical bar (`labels`, `datasets`). Y-axis is category (inverted), X-axis is value.

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `stacked` | `boolean` | `false` | Stack series |
| `barMaxWidth` | `number` | `24` | Max bar width |

---

### 3. Line / Area — `ElegantEChart.line()`

Trends over time. Set `fill: true` on a dataset for area fill.

**Complete HTML:**

```html
<div class="card__chart" id="chart-line-1" style="width:100%;min-height:280px;"></div>
<script>
ElegantEChart.line('chart-line-1', {
  labels: ['00:00','04:00','08:00','12:00','16:00','20:00','24:00'],
  datasets: [
    { label: 'Inbound',  values: [120,95,340,580,620,410,180], color: '#2C66DD', fill: true },
    { label: 'Outbound', values: [80,60,210,390,450,310,140],  color: '#009CBB', fill: true }
  ]
});
</script>
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `labels` | `string[]` | X-axis labels |
| `datasets[].label` | `string` | Series name |
| `datasets[].values` | `number[]` | Data values |
| `datasets[].color` | `string` | Hex color |
| `datasets[].fill` | `boolean` | If `true`, adds area fill with 0.08 opacity |

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `smooth` | `boolean` | `true` | Smooth interpolation |
| `showSymbol` | `boolean` | `true` | Show data point symbols |

---

### 4. Donut — `ElegantEChart.donut()`

Distribution / proportion — ring chart (pie with inner radius).

**Complete HTML:**

```html
<div class="card__chart" id="chart-donut-1" style="width:100%;min-height:280px;"></div>
<script>
ElegantEChart.donut('chart-donut-1', {
  labels: ['Critical','High','Medium','Low'],
  values: [18,34,56,92],
  colors: ['#DD1616','#D14900','#FABB34','#198019']
});
</script>
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `labels` | `string[]` | Slice names |
| `values` | `number[]` | Slice values |
| `colors` | `string[]` | Hex colors per slice (falls back to PALETTE) |

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `innerRadius` | `string` | `'55%'` | Inner radius |
| `outerRadius` | `string` | `'75%'` | Outer radius |
| `legend` | `boolean` | `true` | Show legend |
| `showLabel` | `boolean` | `false` | Show slice labels |

---

### 5. Pie — `ElegantEChart.pie()`

Pie chart (solid, no hole).

**Complete HTML:**

```html
<div class="card__chart" id="chart-pie-1" style="width:100%;min-height:280px;"></div>
<script>
ElegantEChart.pie('chart-pie-1', {
  labels: ['Network','Cloud','Endpoint','Identity'],
  values: [401,268,223,108],
  colors: ['#2C66DD','#009CBB','#FABB34','#A51C50']
});
</script>
```

**Data format:** Same as donut (`labels`, `values`, `colors`).

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `radius` | `string` | `'60%'` | Pie radius |
| `legend` | `boolean` | `true` | Show legend |
| `showLabel` | `boolean` | `true` | Show slice labels |

---

### 6. Stacked Area — `ElegantEChart.stackedArea()`

Multi-series stacked area with gradient fill. Min-height 360px.

**Complete HTML:**

```html
<div class="card__chart card__chart--tall" id="chart-stacked-1" style="width:100%;min-height:360px;"></div>
<script>
ElegantEChart.stackedArea('chart-stacked-1', {
  labels: ['Nov 01','Nov 02','Nov 03','Nov 04','Nov 05','Nov 06','Nov 07'],
  datasets: [
    { label: 'Create', values: [120,150,180,200,220,250,230], color: '#2C66DD' },
    { label: 'Delete', values: [300,320,350,380,400,420,440], color: '#DD1616' },
    { label: 'Update', values: [50,60,55,70,65,80,75],        color: '#A51C50' }
  ]
});
</script>
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `labels` | `string[]` | X-axis labels |
| `datasets[].label` | `string` | Series name |
| `datasets[].values` | `number[]` | Data values |
| `datasets[].color` | `string` | Hex color (gradient fill auto-applied) |

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `noStack` | `boolean` | `false` | If `true`, areas are not stacked |

---

### 7. Radar — `ElegantEChart.radar()`

Multi-axis comparison (coverage, risk posture).

**Complete HTML:**

```html
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

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `labels` | `string[]` | Radar axis names |
| `datasets[].label` | `string` | Series name |
| `datasets[].values` | `number[]` | Values per axis |
| `datasets[].color` | `string` | Hex color |

Max value is auto-calculated as `ceil(maxValue × 1.2)`.

---

### 8. Combo (Bar + Line) — `ElegantEChart.combo()`

Dual-axis: incidents count (bar) vs resolution time (line).

**Complete HTML:**

```html
<div class="card__chart" id="chart-combo-1" style="width:100%;min-height:280px;"></div>
<script>
ElegantEChart.combo('chart-combo-1', {
  labels: ['Jan','Feb','Mar','Apr','May','Jun'],
  bars:  [{ label: 'Incidents', values: [45,38,52,41,60,48], color: '#2C66DD' }],
  lines: [{ label: 'Avg Resolution (hrs)', values: [4.2,3.8,5.1,3.5,4.8,3.2], color: '#DD1616' }]
}, { dualAxis: true });
</script>
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `labels` | `string[]` | X-axis labels |
| `bars` | `array` | Bar series: `{ label, values, color }` |
| `lines` | `array` | Line series: `{ label, values, color }` |

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `dualAxis` | `boolean` | `false` | Add second Y-axis for lines |

---

### 9. Scatter — `ElegantEChart.scatter()`

Correlation analysis (response time vs severity).

**Complete HTML:**

```html
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

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `datasets[].label` | `string` | Series name |
| `datasets[].values` | `[x,y][]` | Array of `[x, y]` coordinate pairs |
| `datasets[].color` | `string` | Hex color |

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `xLabel` | `string` | `''` | X-axis name |
| `yLabel` | `string` | `''` | Y-axis name |
| `bubble` | `boolean` | `false` | If `true`, uses `[x, y, size]` for bubble sizing |

---

### 10. Gauge — `ElegantEChart.gauge()`

Single KPI health score.

**Complete HTML:**

```html
<div class="card__chart" id="chart-gauge-1" style="width:100%;min-height:280px;"></div>
<script>
ElegantEChart.gauge('chart-gauge-1', { value: 78, label: 'Health', color: '#2C66DD' });
</script>
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `value` | `number` | Gauge value (0–100 by default) |
| `label` | `string` | Gauge title |
| `color` | `string` | Pointer/progress color |

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `formatter` | `string` | `'{value}%'` | Detail formatter |

---

### 11. Sparkline — `ElegantEChart.sparkline()`

Inline mini trend inside stat tiles or KPI cards. Height: 60px.

**Complete HTML:**

```html
<div id="spark-demo" style="width:100%;height:60px;"></div>
<script>
ElegantEChart.sparkline('spark-demo', { values: [45,52,60,58,73,68,73] }, { color: '#2C66DD' });
</script>
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `values` | `number[]` | Data points |

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `color` | `string` | `'#DD1616'` | Line and gradient color |

---

### 12. Liquid Fill (Ring Gauge) — `ElegantEChart.liquidFill()`

Percentage KPIs (threat level, compliance, uptime). Container: 120×120px.

**Complete HTML:**

```html
<div class="liquid-chart" id="lf-demo" style="width:120px;height:120px;"></div>
<script>
ElegantEChart.liquidFill('lf-demo', {
  values: [0.72],
  borderColor: '#DD1616'
}, { fontSize: 20, radius: '85%' });
</script>
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `values` | `number[]` | Single-element array with 0–1 fraction |
| `borderColor` | `string` | Ring color |

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `fontSize` | `number` | `24` | Center label font size |
| `radius` | `string` | `'85%'` | Gauge radius |
| `formatter` | `function` | `(v) => (v*100).toFixed(0)+'%'` | Value formatter |

---

### 13. Sankey — `ElegantEChart.sankey()`

Flow analysis (attack paths, source → action → target). Min-height 360px.

**Complete HTML:**

```html
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

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `nodes` | `array` | Array of `{ name: string }` |
| `links` | `array` | Array of `{ source: string, target: string, value: number }` |

---

### 14. Nightingale Rose — `ElegantEChart.nightingaleRose()`

Polar proportional comparison (attack types).

**Complete HTML:**

```html
<div class="card__chart" id="chart-rose-1" style="width:100%;min-height:280px;"></div>
<script>
ElegantEChart.nightingaleRose('chart-rose-1', {
  labels: ['Brute Force','SQL Injection','XSS','Phishing','DDoS','Zero-Day','Ransomware','MitM'],
  values: [340,280,220,195,170,120,95,65],
  colors: ['#2C66DD','#009CBB','#A51C50','#D14900','#198019','#DD1616','#FABB34','#4A90D9']
});
</script>
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `labels` | `string[]` | Category names |
| `values` | `number[]` | Values per category |
| `colors` | `string[]` | Hex colors |

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `roseType` | `string` | `'area'` | Rose type: `'area'` or `'radius'` |
| `radius` | `string[]` | `['20%', '65%']` | Inner/outer radius |
| `legend` | `boolean` | `true` | Show legend |

---

### 15. Waterfall — `ElegantEChart.waterfall()`

Cumulative change analysis (alerts added vs resolved).

**Complete HTML:**

```html
<div class="card__chart" id="chart-waterfall-1" style="width:100%;min-height:280px;"></div>
<script>
ElegantEChart.waterfall('chart-waterfall-1', {
  labels: ['Jan','New Alerts','Auto-Closed','Escalated','Manual Fix','Mar','Apr','Spike','Resolved','Jun Total'],
  values: [120, 85, -45, 30, -60, 130, 140, 110, -95, 105]
});
</script>
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `labels` | `string[]` | Bar labels |
| `values` | `number[]` | Positive = increase (green `#198019`), negative = decrease (red `#DD1616`). First and last values are treated as totals. |

---

### 16. Network Graph — `ElegantEChart.graph()`

Topology, attack paths, relationship mapping. Min-height 360px.

**Complete HTML:**

```html
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

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `categories` | `string[]` | Legend categories |
| `nodes` | `array` | `{ name, category (index), size }` |
| `links` | `array` | `{ source, target }` (names match node names) |

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `repulsion` | `number` | `200` | Force repulsion strength |
| `edgeLength` | `number[]` | `[80, 160]` | Min/max edge length |
| `layout` | `string` | `'force'` | Layout algorithm |

---

### 17. Calendar Heatmap — `ElegantEChart.calendarHeatmap()`

Daily volume over a year (login activity, alert frequency).

**Complete HTML:**

```html
<div class="card__chart" id="chart-calendar-1" style="width:100%;min-height:280px;"></div>
<script>
(function(){
  var data = [];
  var start = new Date('2026-01-01');
  var end = new Date('2026-12-31');
  for (var d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    var iso = d.toISOString().slice(0, 10);
    var dow = d.getDay();
    data.push([iso, Math.round(Math.random() * 60 + (dow > 0 && dow < 6 ? 30 : 0))]);
  }
  ElegantEChart.calendarHeatmap('chart-calendar-1', { values: data, range: '2026' });
})();
</script>
```

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `values` | `[string, number][]` | Array of `['YYYY-MM-DD', count]` tuples |
| `range` | `string` | Year string (e.g. `'2026'`) |

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `colorRange` | `string[]` | `['#ebedf0','#9be9a8','#40c463','#30a14e','#216e39']` | Heatmap color gradient |
| `cellSize` | `array` | `['auto', 18]` | Cell dimensions |

---

### 18. Pictorial Bar — `ElegantEChart.pictorialBar()`

Icon-based bar visualization (affected device types).

**Complete HTML:**

```html
<div class="card__chart" id="chart-pictorial-1" style="width:100%;min-height:280px;"></div>
<script>
ElegantEChart.pictorialBar('chart-pictorial-1', {
  labels: ['Servers','Laptops','Firewalls','Switches','IoT','Mobile'],
  datasets: [{ label: 'Affected', values: [42,78,15,23,56,34], color: '#2C66DD', symbol: 'roundRect' }]
}, { symbolSize: ['100%', 20], repeat: true });
</script>
```

**Data format:** Same as bar (`labels`, `datasets`). Each dataset can specify a `symbol`.

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `symbol` | `string` | `'roundRect'` | ECharts symbol shape |
| `symbolSize` | `array` | `['80%', '60%']` | Symbol dimensions |
| `repeat` | `boolean` | `false` | Repeat symbols to fill bar |

---

### 19. Tangential Polar Bar — `ElegantEChart.tangentialPolarBar()`

Polar stacked bars (incident states by severity).

**Complete HTML:**

```html
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

**Data format:**

| Field | Type | Description |
|-------|------|-------------|
| `categories` | `string[]` | Radial axis categories |
| `datasets[].label` | `string` | Series name |
| `datasets[].color` | `string` | Hex color |
| `datasets[].values` | `number[]` | Values per category |

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `roundCap` | `boolean` | `true` | Round bar caps |
| `startAngle` | `number` | `90` | Start angle |
| `barWidth` | `number` | `10` | Bar width |
| `barGap` | `string` | `'35%'` | Gap between bars |
| `barCategoryGap` | `string` | `'50%'` | Gap between categories |
| `radius` | `array` | `[30, '80%']` | Inner/outer radius |
| `center` | `array` | `['50%', '50%']` | Center position |
| `max` | `number` | auto | Max angle axis value |
| `showLabels` | `boolean` | `true` | Show bar value labels |
| `showCategoryLabels` | `boolean` | `true` | Show category text labels |
| `categoryLabelPositions` | `array` | `[]` | Array of `{ x, y, align }` for each category label |

---

### 20. Risk Distribution (Composite) — `ElegantEChart.riskDistribution()`

Complex risk view with polar bars + sunburst + radar. Min-height 600px.

**Complete HTML:**

```html
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

---

### Additional Chart Types in echarts-widget.js

#### Heatmap — `ElegantEChart.heatmap()`

```js
ElegantEChart.heatmap(domId, {
  xLabels: ['Mon','Tue','Wed','Thu','Fri'],
  yLabels: ['00:00','06:00','12:00','18:00'],
  values: [[0,0,10],[0,1,20],[1,0,30],...]  // [xIdx, yIdx, value]
}, { colorRange: ['#FFFFFF', '#2C66DD'], showLabel: true });
```

#### Treemap — `ElegantEChart.treemap()`

```js
ElegantEChart.treemap(domId, {
  items: [
    { name: 'Network', value: 500, children: [...] },
    { name: 'Cloud', value: 300 }
  ]
});
```

#### Sunburst — `ElegantEChart.sunburst()`

```js
ElegantEChart.sunburst(domId, {
  items: [
    { name: 'Root', children: [
      { name: 'Child A', value: 100 },
      { name: 'Child B', value: 200, children: [...] }
    ]}
  ]
});
```

#### Funnel — `ElegantEChart.funnel()`

```js
ElegantEChart.funnel(domId, {
  labels: ['Total','Filtered','Analyzed','Escalated','Resolved'],
  values: [1200, 800, 500, 200, 80],
  colors: ['#2C66DD','#009CBB','#FABB34','#D14900','#DD1616']
}, { legend: true });
```

#### Theme River — `ElegantEChart.themeRiver()`

```js
ElegantEChart.themeRiver(domId, {
  values: [
    ['2026/01/01', 10, 'Series A'],
    ['2026/01/01', 20, 'Series B'],
    ...
  ]
});
```

---

## Complete CSS

The chart containers use minimal CSS (mainly sizing). The relevant classes from `echarts-widget.css`:

```css
.card__chart {
  /* Set via inline style: width:100%; min-height:280px; */
}
.card__chart--tall {
  /* Used for taller charts: min-height:360px */
}
.liquid-chart { width: 120px; height: 120px; }
.liquid-row { display: flex; gap: 16px; justify-content: center; align-items: center; padding: 8px 0; }
.liquid-cell { display: flex; flex-direction: column; align-items: center; }
.liquid-label { font-size: 11px; color: #626262; margin-top: 4px; }
```

Charts are rendered into ECharts canvas containers — the visual styling comes from the Elegant theme registered in `echarts-elegant-theme.js`.

---

## JavaScript API

### Common Signature

All chart methods follow this pattern:

```js
ElegantEChart.<method>(domId, data, options) → echarts.ECharts | null
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `domId` | `string` | ID of the target DOM element |
| `data` | `object` | Data object (shape varies per chart type) |
| `options` | `object` | Optional config overrides |

**Returns:** The ECharts instance (or `null` if the DOM element was not found).

### Full Method List

| Method | Chart Type | Min Height |
|--------|-----------|------------|
| `ElegantEChart.bar(domId, data, opts)` | Vertical Bar | 280px |
| `ElegantEChart.hbar(domId, data, opts)` | Horizontal Bar | 280px |
| `ElegantEChart.line(domId, data, opts)` | Line / Area | 280px |
| `ElegantEChart.stackedArea(domId, data, opts)` | Stacked Area | 360px |
| `ElegantEChart.pie(domId, data, opts)` | Pie | 280px |
| `ElegantEChart.donut(domId, data, opts)` | Donut | 280px |
| `ElegantEChart.combo(domId, data, opts)` | Bar + Line | 280px |
| `ElegantEChart.radar(domId, data, opts)` | Radar | 280px |
| `ElegantEChart.scatter(domId, data, opts)` | Scatter | 280px |
| `ElegantEChart.heatmap(domId, data, opts)` | Heatmap Grid | 280px |
| `ElegantEChart.gauge(domId, data, opts)` | Gauge | 280px |
| `ElegantEChart.treemap(domId, data, opts)` | Treemap | 280px |
| `ElegantEChart.sunburst(domId, data, opts)` | Sunburst | 280px |
| `ElegantEChart.sankey(domId, data, opts)` | Sankey | 360px |
| `ElegantEChart.funnel(domId, data, opts)` | Funnel | 280px |
| `ElegantEChart.sparkline(domId, data, opts)` | Sparkline | 60px |
| `ElegantEChart.liquidFill(domId, data, opts)` | Liquid Ring | 120×120 |
| `ElegantEChart.themeRiver(domId, data, opts)` | Theme River | 280px |
| `ElegantEChart.nightingaleRose(domId, data, opts)` | Rose | 280px |
| `ElegantEChart.pictorialBar(domId, data, opts)` | Pictorial | 280px |
| `ElegantEChart.calendarHeatmap(domId, data, opts)` | Calendar | 280px |
| `ElegantEChart.waterfall(domId, data, opts)` | Waterfall | 280px |
| `ElegantEChart.graph(domId, data, opts)` | Network Graph | 360px |
| `ElegantEChart.tangentialPolarBar(domId, data, opts)` | Polar Bar | 380px |
| `ElegantEChart.riskDistribution(domId, data, opts)` | Composite | 600px |

### Utility Methods

| Method | Description |
|--------|-------------|
| `ElegantEChart.dispose(domId)` | Destroy a chart instance (removes resize listener, disposes ECharts) |
| `ElegantEChart.resize()` | Resize all active chart instances |
| `ElegantEChart.instances` | `Object` — Map of all live ECharts instances by domId |
| `ElegantEChart.PALETTE` | `string[]` — The 8-color theme palette |

### HTML-Generating Widget Methods

These produce HTML (not ECharts canvas) and return `{ dom, refresh }`:

| Method | Description |
|--------|-------------|
| `ElegantEChart.summaryChartWidget(domId, data, opts)` | KPI tiles + stacked area chart |
| `ElegantEChart.geoWidget(domId, data, opts)` | World map with scatter pins |
| `ElegantEChart.tileWidget(domId, data, opts)` | Dashboard KPI tiles (10 types) |
| `ElegantEChart.alertList(domId, data, opts)` | Scrollable alert feed |
| `ElegantEChart.analysisWidget(domId, data, opts)` | KPI summary + top alert profiles |
| `ElegantEChart.metricsWidget(domId, data, opts)` | KPI tiles with ring gauges |
| `ElegantEChart.alertType1(domId, data, opts)` | Long pending alerts (age + assignee) |
| `ElegantEChart.alertType2(domId, data, opts)` | SLA violated alerts |
| `ElegantEChart.alertType3(domId, data, opts)` | Prioritized alerts (critical + SLA) |
| `ElegantEChart.suspectList(domId, data, opts)` | Top suspects with risk bars |
| `ElegantEChart.teamBoard(domId, data, opts)` | Responder cards |
| `ElegantEChart.summaryTextWidget(domId, data, opts)` | Bullet-point executive summary |

---

## Elegant Theme

The theme is registered in `echarts-elegant-theme.js`:

```js
var COLORS = {
  blue:      '#2C66DD',
  teal:      '#009CBB',
  purple:    '#A51C50',
  orange:    '#D14900',
  green:     '#198019',
  red:       '#DD1616',
  amber:     '#FABB34',
  lightBlue: '#4A90D9',
};

var PALETTE = [
  COLORS.blue, COLORS.teal, COLORS.purple, COLORS.orange,
  COLORS.green, COLORS.red, COLORS.amber, COLORS.lightBlue
];

var fontFamily = "'Zoho Puvi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

echarts.registerTheme('elegant', {
  color: PALETTE,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: fontFamily, fontSize: 12, color: '#626262' },
  title: {
    textStyle: { fontFamily: fontFamily, fontSize: 14, fontWeight: 600, color: '#000000' },
    subtextStyle: { fontFamily: fontFamily, fontSize: 11, color: '#626262' }
  },
  legend: {
    textStyle: { fontFamily: fontFamily, fontSize: 11, color: '#626262' },
    itemWidth: 12, itemHeight: 8, itemGap: 16
  },
  tooltip: {
    backgroundColor: '#272D42', borderColor: '#272D42', borderWidth: 0,
    textStyle: { fontFamily: fontFamily, fontSize: 11, color: '#FFFFFF' },
    extraCssText: 'border-radius: 4px; padding: 8px 12px; box-shadow: 0 2px 8px rgba(0,0,0,.15);'
  },
  categoryAxis: {
    axisLine: { lineStyle: { color: '#E9E9E9' } },
    axisTick: { show: false },
    axisLabel: { fontFamily: fontFamily, fontSize: 11, color: '#626262' },
    splitLine: { lineStyle: { color: '#E9E9E9', type: 'dashed' } }
  },
  valueAxis: {
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { fontFamily: fontFamily, fontSize: 11, color: '#626262' },
    splitLine: { lineStyle: { color: '#E9E9E9', type: 'dashed' } }
  },
  line: { smooth: true, symbolSize: 6, lineStyle: { width: 2 } },
  bar: { barMaxWidth: 40, itemStyle: { borderRadius: [2, 2, 0, 0] } },
  pie: {
    itemStyle: { borderWidth: 0 },
    label: { fontFamily: fontFamily, fontSize: 11, color: '#626262' }
  },
  radar: {
    axisName: { fontFamily: fontFamily, fontSize: 11, color: '#626262' },
    splitLine: { lineStyle: { color: '#E9E9E9' } },
    splitArea: { areaStyle: { color: ['transparent', 'rgba(220,220,220,0.1)'] } },
    axisLine: { lineStyle: { color: '#E9E9E9' } }
  },
  gauge: {
    axisLine: { lineStyle: { color: [[0.3, '#198019'], [0.7, '#FABB34'], [1, '#DD1616']] } },
    axisTick: { lineStyle: { color: '#626262' } },
    axisLabel: { fontFamily: fontFamily, fontSize: 11, color: '#626262' },
    title: { fontFamily: fontFamily, fontSize: 14, fontWeight: 600, color: '#000000' },
    detail: { fontFamily: fontFamily, fontSize: 28, fontWeight: 600, color: '#000000' }
  },
  graph: { color: PALETTE },
  grid: { left: 40, right: 16, top: 24, bottom: 32, containLabel: true }
});

window.ElegantThemeColors = COLORS;
window.ElegantThemePalette = PALETTE;
```

---

## Data Format

### Standard Chart Pattern (bar, hbar, line, stacked area)

```js
{
  labels: ['Label1', 'Label2', ...],
  datasets: [
    { label: 'Series Name', values: [n1, n2, ...], color: '#hex' },
    ...
  ]
}
```

### Pie / Donut Pattern

```js
{
  labels: ['Slice1', 'Slice2', ...],
  values: [n1, n2, ...],
  colors: ['#hex1', '#hex2', ...]
}
```

### Combo Pattern (bar + line)

```js
{
  labels: [...],
  bars:  [{ label, values, color }],
  lines: [{ label, values, color }]
}
```

### Scatter Pattern

```js
{
  datasets: [
    { label: 'Name', values: [[x,y], [x,y], ...], color: '#hex' }
  ]
}
```

### Graph / Sankey Node+Link Pattern

```js
{
  nodes: [{ name: 'Node A' }, ...],
  links: [{ source: 'Node A', target: 'Node B', value: 10 }, ...]
}
```

### Calendar Heatmap Pattern

```js
{
  values: [['2026-01-01', 42], ['2026-01-02', 58], ...],
  range: '2026'
}
```

---

## Internal Constants

The library uses shared tooltip/animation/legend configs:

```js
var TOOLTIP_AXIS = {
  show: true, trigger: 'axis',
  backgroundColor: '#272D42', borderColor: '#272D42', borderWidth: 0,
  textStyle: { fontFamily: "'Zoho Puvi', sans-serif", fontSize: 11, color: '#FFFFFF' },
  extraCssText: 'border-radius:4px;padding:8px 12px;box-shadow:0 2px 8px rgba(0,0,0,.15);',
  axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(44,102,221,0.06)' } }
};

var TOOLTIP_ITEM = {
  show: true, trigger: 'item',
  backgroundColor: '#272D42', borderColor: '#272D42', borderWidth: 0,
  textStyle: { fontFamily: "'Zoho Puvi', sans-serif", fontSize: 11, color: '#FFFFFF' },
  extraCssText: 'border-radius:4px;padding:8px 12px;box-shadow:0 2px 8px rgba(0,0,0,.15);'
};

var ANIM = { animationDuration: 800, animationEasing: 'cubicOut' };

var LEGEND_BOTTOM = {
  show: true, bottom: 0, left: 'center',
  icon: 'circle', itemWidth: 8, itemHeight: 8, itemGap: 16,
  textStyle: { fontFamily: "'Zoho Puvi', sans-serif", fontSize: 11, color: '#626262' }
};
```

---

## Assembly Notes

- All charts go inside `.widget__body` or `.line-tab__body` on dashboard/report pages.
- Standard chart containers use `<div class="card__chart" id="..." style="width:100%;min-height:280px;"></div>`.
- Taller charts (stacked area, sankey, graph) use `class="card__chart card__chart--tall"` with `min-height:360px`.
- The ECharts instance auto-resizes on `window.resize`. Call `ElegantEChart.resize()` after tab switches or container size changes.
- Use `ElegantEChart.dispose(domId)` to destroy a chart before re-creating it in the same container.
- The CSS file (`echarts-widget.css`) is auto-injected by `echarts-widget.js` if not already linked.
- All charts are initialized with the `'elegant'` theme via `echarts.init(dom, 'elegant')`.
