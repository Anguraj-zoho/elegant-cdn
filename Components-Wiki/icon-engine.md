# Icon Engine

> Component: Icon Engine (On-Demand Lucide Icon System)
> CSS: none | JS: `icon-engine.js` | HTML ref: none (utility script)

## Quick Summary

The Icon Engine is the runtime and agent-time utility for resolving icon concepts (keywords, emojis, class names) to Lucide icon files. It provides intelligent matching via an extensive catalog with synonyms, automatic stroke-weight normalization by rendered size, and context-aware size selection. The agent uses this during HTML conversion to download only the needed icons from the Lucide CDN.

## Configuration

### Agent Workflow

1. **SCAN** — Agent reads source HTML, finds all icons/emojis/icon-classes
2. **PLAN** — Agent resolves each to a Lucide name via `ICON_CATALOG`
3. **FETCH** — Agent downloads ONLY needed icons from CDN at required sizes
4. **SAVE** — Agent writes them to `assets/lucide-icons/{name}-{size}.svg`
5. **USE** — Agent writes `<img src="./assets/lucide-icons/...">` in output

### CDN Source

`https://cdn.jsdelivr.net/npm/lucide-static@1.7.0/icons/{name}.svg`

### Stroke Weight by Size

| Size (px) | Stroke Width |
|---|---|
| 8, 10, 12, 14 | `1` |
| 16 | `1.25` |
| 20, 24, 32 | `1.5` |

### Size by Component Context

| Context | Size |
|---|---|
| `plus-in-button` | 10 px |
| `date-picker`, `mini-chevron`, `compact-inline` | 12 px |
| `default`, `button`, `dropdown`, `input`, `sidebar`, `table-cell`, `tile`, `widget-header` | 14 px |
| `tile-header`, `stat-card-icon`, `checkbox`, `topnav` | 16 px |
| `navigation`, `toolbar`, `action-bar`, `table-action`, `drawer-close` | 24 px |
| `hero`, `empty-state`, `feature-icon` | 32 px |

## Required Icons

N/A — this engine fetches icons on demand.

## Complete HTML

No HTML template — this is a utility JavaScript module.

## Complete CSS

No CSS file.

## JavaScript API

```js
/**
 * ICON ENGINE — On-Demand Lucide Icon System for Elegant Theme Conversion
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This engine does NOT pre-download icons. Instead, the agent downloads
 * ONLY the icons needed for each specific conversion, at conversion time.
 *
 * ─── HOW IT WORKS (Agent Workflow) ───
 *
 *   1. SCAN    — Agent reads source HTML, finds all icons/emojis/icon-classes
 *   2. PLAN    — Agent resolves each to a Lucide name via ICON_CATALOG below
 *   3. FETCH   — Agent downloads ONLY needed icons from CDN at required sizes
 *   4. SAVE    — Agent writes them to assets/lucide-icons/{name}-{size}.svg
 *   5. USE     — Agent writes <img src="./assets/lucide-icons/..."> in output
 *
 * ─── CDN ───
 *   https://cdn.jsdelivr.net/npm/lucide-static@1.7.0/icons/{name}.svg
 *   License: ISC (open source, free for commercial use)
 *
 * ─── STROKE WEIGHT RULES (consistent per size) ───
 *   ≤14px  → stroke-width: 1      (crisp at small sizes)
 *    16px  → stroke-width: 1.25   (slight boost for medium)
 *   ≥24px  → stroke-width: 1.5    (maintains visual weight at large sizes)
 *
 *   CRITICAL: Every icon at the same size gets the SAME stroke weight.
 *   No more tile A having stroke 0.8 and tile B having stroke 1.5.
 *
 * ─── SIZE GRID (8-point aligned) ───
 *   10px  — plus-in-button (inside Add button)
 *   12px  — compact inline (date pickers, mini chevrons)
 *   14px  — DEFAULT (buttons, dropdowns, tables, inputs, sidebar, tiles)
 *   16px  — tile headers, stat cards, checkbox, topnav icons
 *   24px  — navigation, toolbar, action-bar, table row actions, logo
 *   32px  — empty states, hero sections, feature icons
 *
 * ─── RUNTIME USAGE (optional, in browser) ───
 *   <script src="./predefined-components/icon-engine.js"></script>
 *   <script>ElegantIcons.init();</script>
 *   This auto-replaces <i data-icon="search" data-icon-context="default">
 *   with the correct <img> tag at runtime.
 */
(function () {
  'use strict';

  var CDN_BASE = 'https://cdn.jsdelivr.net/npm/lucide-static@1.7.0/icons/';
  var LOCAL_BASE = './assets/lucide-icons/';

  /* ═══════════════════════════════════════════════════════════════
     STROKE WEIGHT BY RENDERED SIZE
     Every icon at a given size uses the exact same stroke weight.
     ═══════════════════════════════════════════════════════════════ */
  var STROKE_MAP = {
    8:  1,
    10: 1,
    12: 1,
    14: 1,
    16: 1.25,
    20: 1.5,
    24: 1.5,
    32: 1.5,
  };

  function getStroke(size) {
    return STROKE_MAP[size] || (size <= 14 ? 1 : 1.5);
  }

  /* ═══════════════════════════════════════════════════════════════
     SIZE PRESETS BY COMPONENT CONTEXT
     The agent reads context from the source HTML structure and
     picks the correct size automatically.
     ═══════════════════════════════════════════════════════════════ */
  var SIZE_CONTEXT = {
    'plus-in-button':      10,
    'date-picker':         12,
    'mini-chevron':        12,
    'compact-inline':      12,
    'subnav-date':         12,

    'default':             14,
    'button':              14,
    'button-icon':         14,
    'dropdown':            14,
    'input':               14,
    'sidebar':             14,
    'sidebar-chevron':     14,
    'table-cell':          14,
    'table-cell-status':   14,
    'status':              14,
    'chevron':             14,
    'help':                14,
    'tile':                14,
    'tile-icon':           14,
    'widget-header':       14,
    'card-inline':         14,
    'breadcrumb':          14,
    'tab-icon':            14,
    'toast-icon':          14,
    'badge-icon':          14,

    'tile-header':         16,
    'stat-card-icon':      16,
    'checkbox':            16,
    'topnav':              16,

    'navigation':          24,
    'toolbar':             24,
    'action-bar':          24,
    'action-bar-icon':     24,
    'table-action':        24,
    'logo':                24,
    'drawer-close':        24,
    'modal-close':         24,
    'sc-icon-circle':      24,

    'hero':                32,
    'empty-state':         32,
    'feature-icon':        32,
    'illustration':        32,
  };

  function getSizeForContext(context) {
    return SIZE_CONTEXT[context] || SIZE_CONTEXT['default'];
  }

  /* ═══════════════════════════════════════════════════════════════
     ICON CATALOG — Semantic concept → Lucide icon name
     (truncated for brevity — see full source in icon-engine.js)
     ═══════════════════════════════════════════════════════════════ */
  var ICON_CATALOG = {
    'search':            { elegant: 'icon-actionbar-search', lucide: 'search',           synonyms: ['magnify', 'find', 'lookup', 'magnifying-glass'] },
    'menu':              { elegant: 'icon-menu', lucide: 'menu',             synonyms: ['hamburger', 'nav-toggle', 'bars', 'three-lines'] },
    'close':             { elegant: 'icon-close', lucide: 'x',                synonyms: ['dismiss', 'cancel-icon', 'cross', 'clear'] },
    'chevron-down':      { elegant: 'icon-chevron-down', lucide: 'chevron-down',     synonyms: ['dropdown', 'caret-down', 'arrow-down-sm', 'expand-down'] },
    'edit':              { elegant: 'icon-action-edit', lucide: 'pencil',           synonyms: ['modify', 'pencil', 'write', 'update', 'change'] },
    'delete':            { elegant: 'icon-action-delete', lucide: 'trash-2',          synonyms: ['remove', 'trash', 'destroy', 'bin', 'discard'] },
    'add':               { elegant: 'icon-plus', lucide: 'plus',             synonyms: ['create', 'new', 'plus', 'insert'] },
    'filter':            { elegant: 'icon-actionbar-filter', lucide: 'filter',           synonyms: ['funnel', 'narrow', 'sieve'] },
    'refresh':           { elegant: 'icon-actionbar-refresh', lucide: 'refresh-cw',       synonyms: ['reload', 'sync', 'retry', 'update-data'] },
    'bell':              { elegant: 'icon-alert-bell', lucide: 'bell',             synonyms: ['notification', 'alert-bell', 'reminder', 'alarm'] },
    'shield':            { elegant: null, lucide: 'shield',           synonyms: ['security', 'protection', 'guard', 'defend'] },
    'user':              { elegant: null, lucide: 'user',             synonyms: ['person', 'profile', 'account', 'individual'] },
    'server':            { elegant: null, lucide: 'server',           synonyms: ['host', 'machine', 'backend', 'datacenter'] },
    'settings':          { elegant: null, lucide: 'settings',         synonyms: ['gear', 'cog', 'config', 'preferences', 'admin'] },
    // ... 100+ more entries — see full source file
  };

  /* ── EMOJI → CONCEPT MAPPING ── */
  var EMOJI_MAP = {
    '⚡': 'zap',       '🔔': 'bell',       '🔒': 'lock',
    '🔓': 'unlock',    '📊': 'bar-chart',   '📈': 'trending-up',
    '⚠️': 'alert-triangle', '✅': 'check-circle', '❌': 'close',
    '🔍': 'search',    '👤': 'user',        '👥': 'users',
    '🛡️': 'shield',    '🔧': 'wrench',     '⚙️': 'settings',
    // ... 50+ more entries — see full source file
  };

  /* ── REVERSE SYNONYM INDEX ── */
  var _synonymIndex = null;
  function buildSynonymIndex() {
    if (_synonymIndex) return _synonymIndex;
    _synonymIndex = {};
    for (var concept in ICON_CATALOG) {
      var entry = ICON_CATALOG[concept];
      _synonymIndex[concept] = concept;
      _synonymIndex[entry.lucide] = concept;
      if (entry.synonyms) {
        for (var i = 0; i < entry.synonyms.length; i++) {
          _synonymIndex[entry.synonyms[i]] = concept;
        }
      }
    }
    return _synonymIndex;
  }

  function resolve(query) {
    if (!query) return null;
    var q = query.trim();
    if (EMOJI_MAP[q]) {
      var emojiConcept = EMOJI_MAP[q];
      return ICON_CATALOG[emojiConcept] ? ICON_CATALOG[emojiConcept].lucide : null;
    }
    var ql = q.toLowerCase();
    if (ICON_CATALOG[ql]) return ICON_CATALOG[ql].lucide;
    var idx = buildSynonymIndex();
    if (idx[ql]) return ICON_CATALOG[idx[ql]].lucide;
    for (var concept in ICON_CATALOG) {
      if (ICON_CATALOG[concept].lucide === ql) return ql;
    }
    for (var c in ICON_CATALOG) {
      if (c.indexOf(ql) !== -1 || ql.indexOf(c) !== -1) return ICON_CATALOG[c].lucide;
      var entry = ICON_CATALOG[c];
      if (entry.synonyms) {
        for (var j = 0; j < entry.synonyms.length; j++) {
          if (entry.synonyms[j].indexOf(ql) !== -1 || ql.indexOf(entry.synonyms[j]) !== -1) {
            return entry.lucide;
          }
        }
      }
    }
    return null;
  }

  function localPath(lucideName, size) {
    return LOCAL_BASE + lucideName + '-' + (size || 14) + '.svg';
  }

  function cdnUrl(lucideName) {
    return CDN_BASE + lucideName + '.svg';
  }

  function elegantize(svgSource, size) {
    var s = size || 14;
    var sw = getStroke(s);
    return svgSource
      .replace(/width="24"/g, 'width="' + s + '"')
      .replace(/height="24"/g, 'height="' + s + '"')
      .replace(/stroke-width="2"/g, 'stroke-width="' + sw + '"')
      .replace(/class="[^"]*"/g, '')
      .replace(/<!--[^>]*-->\s*/g, '')
      .trim();
  }

  function imgTag(concept, context, altText) {
    var lucideName = resolve(concept);
    if (!lucideName) return '<!-- icon not found: ' + concept + ' -->';
    var size = getSizeForContext(context || 'default');
    var path = localPath(lucideName, size);
    return '<img src="' + path + '" alt="' + (altText || concept) +
           '" width="' + size + '" height="' + size + '" />';
  }

  function init() {
    var els = document.querySelectorAll('[data-icon]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var lucideName = resolve(el.getAttribute('data-icon'));
      if (!lucideName) continue;
      var size = getSizeForContext(el.getAttribute('data-icon-context') || 'default');
      var img = document.createElement('img');
      img.src = localPath(lucideName, size);
      img.alt = el.getAttribute('data-icon');
      img.width = size;
      img.height = size;
      img.style.display = 'inline-block';
      img.style.verticalAlign = 'middle';
      el.replaceWith(img);
    }
  }

  /* ── PUBLIC API ── */
  window.ElegantIcons = {
    resolve: resolve,
    localPath: localPath,
    cdnUrl: cdnUrl,
    elegantize: elegantize,
    imgTag: imgTag,
    init: init,
    getStroke: getStroke,
    getSizeForContext: getSizeForContext,
    ICON_CATALOG: ICON_CATALOG,
    EMOJI_MAP: EMOJI_MAP,
    STROKE_MAP: STROKE_MAP,
    SIZE_CONTEXT: SIZE_CONTEXT,
    CDN_BASE: CDN_BASE,
    LOCAL_BASE: LOCAL_BASE,
  };
})();
```

### API Reference

| Method | Signature | Description |
|---|---|---|
| `ElegantIcons.resolve(query)` | `(string) → string\|null` | Resolve any keyword/emoji/concept to Lucide icon name |
| `ElegantIcons.localPath(name, size)` | `(string, number) → string` | Build local file path: `./assets/lucide-icons/{name}-{size}.svg` |
| `ElegantIcons.cdnUrl(name)` | `(string) → string` | Build CDN URL for raw Lucide SVG fetch |
| `ElegantIcons.elegantize(svg, size)` | `(string, number) → string` | Transform raw 24×24 Lucide SVG to Elegant specs |
| `ElegantIcons.imgTag(concept, ctx, alt)` | `(string, string, string) → string` | Generate a complete `<img>` tag |
| `ElegantIcons.init()` | `() → void` | Runtime: replace all `<i data-icon="...">` placeholders |
| `ElegantIcons.getStroke(size)` | `(number) → number` | Get stroke weight for a given pixel size |
| `ElegantIcons.getSizeForContext(ctx)` | `(string) → number` | Get pixel size for a component context string |

### Properties

| Property | Type | Description |
|---|---|---|
| `ICON_CATALOG` | `Object` | Full concept → Lucide mapping with synonyms |
| `EMOJI_MAP` | `Object` | Emoji character → concept key mapping |
| `STROKE_MAP` | `Object` | Size → stroke-width lookup |
| `SIZE_CONTEXT` | `Object` | Context string → pixel size lookup |
| `CDN_BASE` | `string` | Lucide CDN base URL |
| `LOCAL_BASE` | `string` | Local assets folder path |

## Variants

N/A — utility module.

## Assembly Notes

- The full `ICON_CATALOG` contains 100+ entries covering navigation, actions, filters, security/threat, users, devices, files, settings, status, data, logs, communication, and misc categories.
- Resolution priority: emoji → exact concept → exact lucide name → synonym → fuzzy partial match.
- The `elegantize()` function transforms raw Lucide SVGs (24×24, stroke-width 2) to the correct size and stroke weight.
- For the full unabridged source, see `data/components/icon-engine.js`.
