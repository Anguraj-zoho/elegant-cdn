# ECharts Elegant Theme

> Component: ECharts Elegant Theme
> CSS: none | JS: `echarts-elegant-theme.js` | HTML ref: none (theme registration)

## Quick Summary

Registers a custom `"elegant"` theme for Apache ECharts that matches the Figma Elegant Components 1.0 design tokens. Provides an 8-color palette, consistent typography (Zoho Puvi), dark tooltip styling, and axis/grid defaults. Must be loaded after `echarts.min.js` and before any chart initialization.

## Configuration

### Color Palette

| Name | Hex | Usage |
|---|---|---|
| Blue | `#2C66DD` | Primary series color |
| Teal | `#009CBB` | Secondary series |
| Purple | `#A51C50` | Tertiary series |
| Orange | `#D14900` | Warning / 4th series |
| Green | `#198019` | Success / positive |
| Red | `#DD1616` | Error / negative / critical |
| Amber | `#FABB34` | Caution / attention |
| Light Blue | `#4A90D9` | 8th series color |

### Theme Defaults

| Component | Key Settings |
|---|---|
| Font | `'Zoho Puvi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| Text color | `#626262` |
| Background | Transparent |
| Title | 14 px, weight 600, `#000000` |
| Legend | 11 px, `#626262`, circle item 12×8 |
| Tooltip | Background `#272D42`, text 11 px white, 4 px radius |
| Axis lines | `#E9E9E9`, dashed split lines |
| Grid | `left:40, right:16, top:24, bottom:32`, containLabel |
| Bar | Max width 40, `borderRadius: [2,2,0,0]` |
| Line | Smooth, symbol size 6, line width 2 |
| Gauge | Green 0–30%, Amber 30–70%, Red 70–100% |

## Required Icons

None.

## Complete HTML

No HTML — this is a theme registration script.

## Complete CSS

No CSS file.

## JavaScript API

```js
/**
 * Apache ECharts — Elegant Theme
 * Registers a custom "elegant" theme matching the Figma Elegant Components 1.0 design tokens.
 * 
 * Usage:
 *   <script src="./predefined-components/lib/echarts.min.js"></script>
 *   <script src="./predefined-components/echarts-elegant-theme.js"></script>
 *   var chart = echarts.init(dom, 'elegant');
 */
(function () {
  'use strict';

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

    textStyle: {
      fontFamily: fontFamily,
      fontSize: 12,
      color: '#626262'
    },

    title: {
      textStyle: {
        fontFamily: fontFamily,
        fontSize: 14,
        fontWeight: 600,
        color: '#000000'
      },
      subtextStyle: {
        fontFamily: fontFamily,
        fontSize: 11,
        color: '#626262'
      }
    },

    legend: {
      textStyle: {
        fontFamily: fontFamily,
        fontSize: 11,
        color: '#626262'
      },
      itemWidth: 12,
      itemHeight: 8,
      itemGap: 16
    },

    tooltip: {
      backgroundColor: '#272D42',
      borderColor: '#272D42',
      borderWidth: 0,
      textStyle: {
        fontFamily: fontFamily,
        fontSize: 11,
        color: '#FFFFFF'
      },
      extraCssText: 'border-radius: 4px; padding: 8px 12px; box-shadow: 0 2px 8px rgba(0,0,0,.15);'
    },

    categoryAxis: {
      axisLine: { lineStyle: { color: '#E9E9E9' } },
      axisTick: { show: false },
      axisLabel: {
        fontFamily: fontFamily,
        fontSize: 11,
        color: '#626262'
      },
      splitLine: { lineStyle: { color: '#E9E9E9', type: 'dashed' } }
    },

    valueAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontFamily: fontFamily,
        fontSize: 11,
        color: '#626262'
      },
      splitLine: { lineStyle: { color: '#E9E9E9', type: 'dashed' } }
    },

    line: {
      smooth: true,
      symbolSize: 6,
      lineStyle: { width: 2 }
    },

    bar: {
      barMaxWidth: 40,
      itemStyle: { borderRadius: [2, 2, 0, 0] }
    },

    pie: {
      itemStyle: { borderWidth: 0 },
      label: {
        fontFamily: fontFamily,
        fontSize: 11,
        color: '#626262'
      }
    },

    radar: {
      axisName: {
        fontFamily: fontFamily,
        fontSize: 11,
        color: '#626262'
      },
      splitLine: { lineStyle: { color: '#E9E9E9' } },
      splitArea: { areaStyle: { color: ['transparent', 'rgba(220,220,220,0.1)'] } },
      axisLine: { lineStyle: { color: '#E9E9E9' } }
    },

    gauge: {
      axisLine: { lineStyle: { color: [[0.3, COLORS.green], [0.7, COLORS.amber], [1, COLORS.red]] } },
      axisTick: { lineStyle: { color: '#626262' } },
      axisLabel: { fontFamily: fontFamily, fontSize: 11, color: '#626262' },
      title: { fontFamily: fontFamily, fontSize: 14, fontWeight: 600, color: '#000000' },
      detail: { fontFamily: fontFamily, fontSize: 28, fontWeight: 600, color: '#000000' }
    },

    graph: {
      color: PALETTE
    },

    grid: {
      left: 40,
      right: 16,
      top: 24,
      bottom: 32,
      containLabel: true
    }
  });

  window.ElegantThemeColors = COLORS;
  window.ElegantThemePalette = PALETTE;
})();
```

### Globals Exposed

| Global | Type | Description |
|---|---|---|
| `ElegantThemeColors` | `Object` | Named color map (blue, teal, purple, etc.) |
| `ElegantThemePalette` | `Array<string>` | Ordered 8-color palette array |

## Variants

Single theme — `'elegant'`.

## Assembly Notes

- **Load order:** `echarts.min.js` → `echarts-elegant-theme.js` → `echarts-widget.js`
- Initialize charts with: `echarts.init(dom, 'elegant')`
- The palette is also used by `echarts-widget.js` via `window.ElegantThemePalette`.
