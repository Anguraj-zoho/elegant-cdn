# Predefined Chart: Calendar Heatmap

> Component: Calendar Heatmap
> CSS: none (ECharts canvas) | JS: `echarts-widget.js` → `ElegantEChart.calendarHeatmap()` | HTML ref: `predefined-charts/calendar-heatmap.html`

## Quick Summary

A GitHub-style calendar heatmap showing daily values over an entire year. Each cell represents a day, colored by intensity. Used for login activity patterns, alert frequency, daily event volume, and seasonal trend analysis.

## Configuration

### Data Format

```js
{
  values: [['2026-01-01', 42], ['2026-01-02', 35], ...],  // [date, value]
  range: '2026'  // year string
}
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `colorRange` | `string[]` | `['#ebedf0','#9be9a8','#40c463','#30a14e','#216e39']` | 5-step green gradient |
| `cellSize` | `[string, number]` | `['auto', 18]` | Cell dimensions |

## Required Icons

None.

## Complete HTML

```html
<!--
  Elegant Predefined Chart: Calendar Heatmap
  Usage: Daily volume over a year (login activity, alert frequency)
-->
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

## Assembly Notes

- Data format: `[[ISO-date-string, numeric-value], ...]`.
- Visual map: horizontal, centered at bottom, calculable range slider.
- Calendar styling: white cell borders (2 px), `#E9E9E9` split lines.
- Day/month labels: 11 px Zoho Puvi, `#626262`.
- Year label hidden by default.
- Container needs `min-height: 280px`.
