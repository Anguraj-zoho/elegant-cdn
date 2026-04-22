# Predefined Chart: Waterfall

> Component: Waterfall Chart
> CSS: none (ECharts canvas) | JS: `echarts-widget.js` → `ElegantEChart.waterfall()` | HTML ref: `predefined-charts/waterfall.html`

## Quick Summary

A cumulative change analysis chart showing positive (green) and negative (red) delta bars stacked on invisible base bars. Used for tracking alert additions vs resolutions, budget changes, or any sequential gains/losses.

## Configuration

### Data Format

```js
{
  labels: ['Jan', 'New Alerts', 'Auto-Closed', 'Escalated', ...],
  values: [120, 85, -45, 30, -60, ...]
}
```

- First and last values are treated as absolute totals.
- Middle values are treated as deltas (+positive or -negative).

## Required Icons

None.

## Complete HTML

```html
<!--
  Elegant Predefined Chart: Waterfall
  Usage: Cumulative change analysis (alerts added vs resolved)
-->
<div class="card__chart" id="chart-waterfall-1" style="width:100%;min-height:280px;"></div>
<script>
ElegantEChart.waterfall('chart-waterfall-1', {
  labels: ['Jan','New Alerts','Auto-Closed','Escalated','Manual Fix','Mar','Apr','Spike','Resolved','Jun Total'],
  values: [120, 85, -45, 30, -60, 130, 140, 110, -95, 105]
});
</script>
```

## Assembly Notes

- Uses three stacked series: hidden (transparent base), Increase (green `#198019`), Decrease (red `#DD1616`).
- Tooltip shows individual delta value and running cumulative total.
- Legend shows only Increase/Decrease (hidden series excluded).
- Bar corners rounded: `[2,2,0,0]`.
