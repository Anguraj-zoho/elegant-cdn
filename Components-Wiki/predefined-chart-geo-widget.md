# Predefined Chart: Geo Widget

> Component: Geo Widget (World Map + Scatter Pins)
> CSS: `echarts-widget.css` (`.gw-*` classes) | JS: `echarts-widget.js` → `ElegantEChart.geoWidget()` | HTML ref: `predefined-charts/geo-widget.html`

## Quick Summary

A geographical map widget showing threat locations as scatter-pin markers colored by severity (Critical/Trouble/Attention). Features tab navigation, region selector, and a color-coded legend. Requires the world map GeoJSON file for ECharts map rendering.

## Configuration

| Option | Type | Default | Description |
|---|---|---|---|
| `tabs` | `string[]` | `['Overview', 'Alerts Timeline View']` | Tab labels above the map |
| `regionLabel` | `string` | `'World'` | Label for the region dropdown |
| `mapJsonUrl` | `string` | `'./predefined-components/lib/world.json'` | Path to world GeoJSON |
| `iconBase` | `string` | `'./assets/icons/'` | Icon base path |

### Marker Data

Each marker in `data.markers[]`:

| Property | Type | Description |
|---|---|---|
| `name` | `string` | Location label |
| `lat` | `number` | Latitude |
| `lng` | `number` | Longitude |
| `severity` | `string` | `'critical'` / `'trouble'` / `'attention'` |
| `value` | `number` | Alert count |

### Severity Colors

| Severity | Color |
|---|---|
| Critical | `#E91F1F` |
| Trouble | `#FF8E36` |
| Attention | `#FFC600` |

## Required Icons

None (inline SVG for pins).

Requires: `lib/world.json` (GeoJSON), `lib/echarts.min.js`

## Complete HTML

```html
<!--
  Elegant Predefined Chart: Geo Widget (World Map + Scatter Pins)
  Usage: Threat geolocation, blocked countries
  Requires: lib/world-map-register.js, lib/world.json
-->
<div class="gw-widget" id="geo-demo-1"></div>
<script>
ElegantEChart.geoWidget('geo-demo-1', {
  markers: [
    { name: 'San Francisco', lat: 37.77, lng: -122.42, severity: 'critical', value: 12 },
    { name: 'New York',      lat: 40.71, lng: -74.01,  severity: 'critical', value: 15 },
    { name: 'Mumbai',        lat: 19.08, lng: 72.88,   severity: 'critical', value: 18 },
    { name: 'Tokyo',         lat: 35.68, lng: 139.69,  severity: 'critical', value: 11 },
    { name: 'Berlin',        lat: 52.52, lng: 13.41,   severity: 'trouble',  value: 5 },
    { name: 'Lagos',         lat: 6.52,  lng: 3.38,    severity: 'attention', value: 9 },
    { name: 'Sydney',        lat: -33.87, lng: 151.21, severity: 'trouble',  value: 4 }
  ]
}, {
  tabs: ['Overview', 'Alerts Timeline View'],
  regionLabel: 'World'
});
</script>
```

## Assembly Notes

- Container must have a defined height (e.g., `min-height: 380px` via `.gw-map`).
- The map GeoJSON is fetched asynchronously — if already registered via `echarts.registerMap('world', ...)`, it reuses the existing registration.
- Tab buttons toggle active state visually but do not change map data by default — wire custom handlers as needed.
