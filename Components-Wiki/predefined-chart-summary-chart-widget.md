# Predefined Chart: Summary Chart Widget

> Component: Summary Chart Widget (KPI Tiles + Stacked Area)
> CSS: `echarts-widget.css` (`.sw-*` classes) | JS: `echarts-widget.js` → `ElegantEChart.summaryChartWidget()` | HTML ref: `predefined-charts/summary-chart-widget.html`

## Quick Summary

A composite dashboard widget combining a row of KPI stat tiles (with trend indicators) above a multi-series stacked area chart. The first tile is highlighted with a blue accent. Optionally includes a bell icon. Used for alert overview dashboards.

## Configuration

### Data Format

```js
{
  tiles: [
    { value: '10000', trend: '20%', label: 'All Alerts' },
    { value: '8000',  trend: '20%', label: 'Active Alerts' },
    { value: '2500',  trend: '20%', label: 'SLA Violated Alerts', icon: 'icon-alert-schedule.svg' },
    { value: '2000',  trend: '20%', label: 'Closed Alerts' }
  ],
  chart: {
    yAxisName: 'Alerts Count',
    labels: ['Nov 01', 'Nov 02', ...],
    colors: ['#E91F1F', '#FF8E36', '#FFC600'],
    datasets: [
      { label: 'Critical',  color: '#E91F1F', values: [...] },
      { label: 'Trouble',   color: '#FF8E36', values: [...] },
      { label: 'Attention', color: '#FFC600', values: [...] }
    ]
  }
}
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `bellIcon` | `boolean` | `true` | Show bell icon circle on the right |
| `iconBase` | `string` | `'./assets/icons/'` | Icon assets base path |

## Required Icons

- `icon-metric-trend-up.svg` (trend arrow)
- `icon-alert-schedule.svg` (optional tile icon)
- `icon-summary-bell.svg` (bell icon)

## Complete HTML

```html
<!--
  Elegant Predefined Widget: Summary Chart (KPI tiles + multi-series chart)
  Usage: Dashboard overview widget with stat tiles above a chart
-->
<div class="sw-widget" id="summary-chart-1"></div>
<script>
ElegantEChart.summaryChartWidget('summary-chart-1', {
  tiles: [
    { value: '10000', trend: '20%', label: 'All Alerts' },
    { value: '8000',  trend: '20%', label: 'Active Alerts' },
    { value: '2500',  trend: '20%', label: 'SLA Violated Alerts', icon: 'icon-alert-schedule.svg' },
    { value: '2000',  trend: '20%', label: 'Closed Alerts' }
  ],
  chart: {
    yAxisName: 'Alerts Count',
    labels: ['Nov 01','Nov 02','Nov 03','Nov 04','Nov 05','Nov 06','Nov 07',
             'Nov 08','Nov 09','Nov 10','Nov 11','Nov 12','Nov 13','Nov 14'],
    colors: ['#E91F1F', '#FF8E36', '#FFC600'],
    datasets: [
      { label: 'Critical',  color: '#E91F1F', values: [120,150,130,140,160,180,200,350,500,800,650,300,250,500] },
      { label: 'Trouble',   color: '#FF8E36', values: [180,200,220,210,230,250,280,450,300,200,250,300,350,400] },
      { label: 'Attention', color: '#FFC600', values: [100,120,110,130,140,160,180,120,100,100,120,130,150,180] }
    ]
  }
});
</script>
```

## Assembly Notes

- First tile gets `.sw-tile--hl` (blue highlight: `#EAF0FC` bg, `#96B3EE` border).
- Chart renders as a stacked area with gradient fills inside a `.sw-chart` div.
- Bell icon: 64×64 px circle with `#E8EDFB` background.
- Chart min-height: 240 px.
- Responsive: tiles stack vertically below 700 px.
