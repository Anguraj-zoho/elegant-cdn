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
 *   5. USE     — Agent writes <img src="https://cdn.jsdelivr.net/gh/Anguraj-zoho/elegant-cdn@main/assets/lucide-icons/..."> in output
 *
 *   If an icon is already in the folder (from a previous conversion), skip it.
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
 *   <script src="./predefined-components/icon-engine.js"><\/script>
 *   <script>ElegantIcons.init();<\/script>
 *   This auto-replaces <i data-icon="search" data-icon-context="default">
 *   with the correct <img> tag at runtime.
 */
(function () {
  'use strict';

  var CDN_BASE = 'https://cdn.jsdelivr.net/npm/lucide-static@1.7.0/icons/';
  var LOCAL_BASE = 'https://cdn.jsdelivr.net/gh/Anguraj-zoho/elegant-cdn@main/assets/lucide-icons/';

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
     with synonyms for intelligent matching.

     The agent uses this to:
       1. Detect what icon is needed (by concept, emoji, or class name)
       2. Find the best Lucide match (even if not exact name)
       3. Resolve to the correct Lucide file name for CDN fetch

     INTELLIGENCE: If "notification" is searched, it finds "bell".
     If "🔒" is in the HTML, it resolves to "lock".
     If "fa-pencil" is detected, it resolves to "pencil".
     ═══════════════════════════════════════════════════════════════ */
  var ICON_CATALOG = {

    /* ── NAVIGATION & CHROME ── */
    'search':            { elegant: 'icon-actionbar-search', lucide: 'search',           synonyms: ['magnify', 'find', 'lookup', 'magnifying-glass'] },
    'menu':              { elegant: 'icon-menu', lucide: 'menu',             synonyms: ['hamburger', 'nav-toggle', 'bars', 'three-lines'] },
    'close':             { elegant: 'icon-close', lucide: 'x',                synonyms: ['dismiss', 'cancel-icon', 'cross', 'clear'] },
    'chevron-down':      { elegant: 'icon-chevron-down', lucide: 'chevron-down',     synonyms: ['dropdown', 'caret-down', 'arrow-down-sm', 'expand-down'] },
    'chevron-up':        { elegant: null, lucide: 'chevron-up',       synonyms: ['caret-up', 'collapse-up', 'arrow-up-sm'] },
    'chevron-right':     { elegant: 'icon-sm-chevron-right', lucide: 'chevron-right',    synonyms: ['caret-right', 'arrow-right-sm', 'expand-right', 'next'] },
    'chevron-left':      { elegant: 'icon-chevron-left', lucide: 'chevron-left',     synonyms: ['caret-left', 'arrow-left-sm', 'back', 'previous'] },
    'chevrons-left':     { elegant: null, lucide: 'chevrons-left',    synonyms: ['double-back', 'first-page'] },
    'chevrons-right':    { elegant: null, lucide: 'chevrons-right',   synonyms: ['double-next', 'last-page'] },
    'arrow-left':        { elegant: 'icon-ab-arrow-left', lucide: 'arrow-left',       synonyms: ['back-arrow', 'navigate-back'] },
    'arrow-right':       { elegant: 'icon-ab-arrow-right', lucide: 'arrow-right',      synonyms: ['forward-arrow', 'navigate-forward'] },
    'arrow-up':          { elegant: null, lucide: 'arrow-up',         synonyms: ['up', 'sort-asc'] },
    'arrow-down':        { elegant: null, lucide: 'arrow-down',       synonyms: ['down', 'sort-desc'] },
    'arrow-up-right':    { elegant: null, lucide: 'arrow-up-right',   synonyms: ['external-link', 'open-new', 'external'] },
    'home':              { elegant: null, lucide: 'house',             synonyms: ['home', 'dashboard-home', 'main'] },
    'sidebar-collapse':  { elegant: null, lucide: 'panel-left-close',  synonyms: ['collapse-sidebar', 'sidebar-hide'] },
    'sidebar-expand':    { elegant: null, lucide: 'panel-left-open',   synonyms: ['expand-sidebar', 'sidebar-show'] },

    /* ── ACTIONS ── */
    'edit':              { elegant: 'icon-action-edit', lucide: 'pencil',           synonyms: ['modify', 'pencil', 'write', 'update', 'change'] },
    'delete':            { elegant: 'icon-action-delete', lucide: 'trash-2',          synonyms: ['remove', 'trash', 'destroy', 'bin', 'discard'] },
    'add':               { elegant: 'icon-plus', lucide: 'plus',             synonyms: ['create', 'new', 'plus', 'insert'] },
    'add-circle':        { elegant: null, lucide: 'circle-plus',      synonyms: ['add-round', 'plus-circle'] },
    'minus':             { elegant: null, lucide: 'minus',            synonyms: ['subtract', 'remove-line'] },
    'check':             { elegant: 'icon-checkbox-checked', lucide: 'check',            synonyms: ['approve', 'confirm', 'accept', 'done', 'tick', 'ok'] },
    'check-circle':      { elegant: null, lucide: 'circle-check',     synonyms: ['success', 'verified', 'approved'] },
    'x-circle':          { elegant: null, lucide: 'circle-x',         synonyms: ['error-circle', 'failed', 'rejected'] },
    'copy':              { elegant: null, lucide: 'copy',             synonyms: ['duplicate', 'clipboard'] },
    'save':              { elegant: null, lucide: 'save',             synonyms: ['floppy', 'persist', 'store'] },
    'download':          { elegant: null, lucide: 'download',         synonyms: ['export', 'save-file', 'pull-down'] },
    'upload':            { elegant: 'icon-upload', lucide: 'upload',           synonyms: ['import', 'push-up'] },
    'share':             { elegant: 'icon-share', lucide: 'share-2',          synonyms: ['share', 'forward', 'send-to'] },
    'link':              { elegant: null, lucide: 'link',             synonyms: ['chain', 'url', 'hyperlink'] },
    'unlink':            { elegant: null, lucide: 'unlink',           synonyms: ['break-link', 'disconnect'] },
    'move':              { elegant: null, lucide: 'move',             synonyms: ['drag', 'reorder', 'grip'] },
    'grip-vertical':     { elegant: 'icon-grip-vertical', lucide: 'grip-vertical',    synonyms: ['drag-handle', 'reorder-handle'] },
    'maximize':          { elegant: null, lucide: 'maximize-2',       synonyms: ['fullscreen', 'expand', 'enlarge'] },
    'minimize':          { elegant: null, lucide: 'minimize-2',       synonyms: ['exit-fullscreen', 'shrink'] },
    'more-horizontal':   { elegant: 'icon-action-more', lucide: 'ellipsis',         synonyms: ['more', 'three-dots', 'overflow', 'kebab-h', 'options'] },
    'more-vertical':     { elegant: null, lucide: 'ellipsis-vertical', synonyms: ['kebab', 'three-dots-v', 'context-menu', 'vertical-dots'] },
    'refresh':           { elegant: 'icon-actionbar-refresh', lucide: 'refresh-cw',       synonyms: ['reload', 'sync', 'retry', 'update-data'] },
    'rotate':            { elegant: null, lucide: 'rotate-cw',        synonyms: ['rotate-right', 'redo'] },
    'undo':              { elegant: null, lucide: 'undo-2',           synonyms: ['revert', 'go-back'] },
    'redo':              { elegant: null, lucide: 'redo-2',           synonyms: ['redo-action'] },
    'play':              { elegant: null, lucide: 'play',             synonyms: ['start', 'run', 'execute', 'begin'] },
    'pause':             { elegant: null, lucide: 'pause',            synonyms: ['hold', 'suspend'] },
    'stop':              { elegant: null, lucide: 'square',           synonyms: ['halt', 'end'] },
    'power':             { elegant: null, lucide: 'power',            synonyms: ['on-off', 'toggle-power', 'shutdown'] },
    'log-in':            { elegant: null, lucide: 'log-in',           synonyms: ['sign-in', 'login'] },
    'log-out':           { elegant: null, lucide: 'log-out',          synonyms: ['sign-out', 'logout', 'exit'] },
    'send':              { elegant: null, lucide: 'send',             synonyms: ['submit', 'dispatch'] },
    'print':             { elegant: null, lucide: 'printer',          synonyms: ['print-page'] },
    'scan':              { elegant: null, lucide: 'scan',             synonyms: ['barcode', 'qr-scan'] },
    'zap':               { elegant: null, lucide: 'zap',              synonyms: ['lightning', 'bolt', 'flash', 'instant', 'quick-action'] },
    'convert':           { elegant: null, lucide: 'repeat-2',         synonyms: ['transform', 'exchange', 'swap'] },

    /* ── FILTER & SORT ── */
    'filter':            { elegant: 'icon-actionbar-filter', lucide: 'filter',           synonyms: ['funnel', 'narrow', 'sieve'] },
    'filter-x':          { elegant: null, lucide: 'filter-x',         synonyms: ['clear-filter', 'remove-filter'] },
    'sort':              { elegant: null, lucide: 'arrow-up-down',    synonyms: ['sort-toggle', 'order', 'reorder'] },
    'sort-asc':          { elegant: null, lucide: 'arrow-up-narrow-wide', synonyms: ['sort-ascending', 'a-z'] },
    'sort-desc':         { elegant: null, lucide: 'arrow-down-wide-narrow', synonyms: ['sort-descending', 'z-a'] },
    'list-filter':       { elegant: null, lucide: 'list-filter',      synonyms: ['filter-list'] },
    'columns':           { elegant: null, lucide: 'columns-3',        synonyms: ['column-select', 'column-manage'] },

    /* ── VIEW TYPES ── */
    'grid-view':         { elegant: null, lucide: 'layout-grid',      synonyms: ['grid', 'card-view', 'tile-view', 'gallery'] },
    'list-view':         { elegant: null, lucide: 'list',             synonyms: ['list', 'table-view', 'rows'] },
    'kanban-view':       { elegant: null, lucide: 'kanban',           synonyms: ['board-view', 'columns-view'] },
    'calendar-view':     { elegant: null, lucide: 'calendar',         synonyms: ['date-view', 'schedule-view'] },
    'layout-dashboard':  { elegant: null, lucide: 'layout-dashboard',  synonyms: ['dashboard', 'widgets-view'] },

    /* ── NOTIFICATIONS & ALERTS ── */
    'bell':              { elegant: 'icon-alert-bell', lucide: 'bell',             synonyms: ['notification', 'alert-bell', 'reminder', 'alarm'] },
    'bell-ring':         { elegant: null, lucide: 'bell-ring',        synonyms: ['active-notification', 'ringing'] },
    'bell-off':          { elegant: null, lucide: 'bell-off',         synonyms: ['mute-notification', 'silent'] },
    'alert-triangle':    { elegant: null, lucide: 'triangle-alert',   synonyms: ['warning', 'caution', 'danger-triangle', 'exclamation'] },
    'alert-circle':      { elegant: null, lucide: 'circle-alert',     synonyms: ['error', 'danger', 'problem'] },
    'info':              { elegant: 'icon-alert-info', lucide: 'info',             synonyms: ['information', 'about', 'details'] },
    'help-circle':       { elegant: 'icon-help-circle', lucide: 'circle-help',      synonyms: ['help', 'question', 'question-mark', 'faq', 'support'] },
    'message-circle':    { elegant: null, lucide: 'message-circle',   synonyms: ['chat', 'comment', 'conversation'] },
    'message-square':    { elegant: null, lucide: 'message-square',   synonyms: ['message', 'chat-box'] },
    'megaphone':         { elegant: null, lucide: 'megaphone',        synonyms: ['announcement', 'broadcast'] },
    'siren':             { elegant: null, lucide: 'siren',            synonyms: ['emergency', 'urgent'] },

    /* ── SECURITY & THREAT (SOC/SIEM) ── */
    'shield':            { elegant: null, lucide: 'shield',           synonyms: ['security', 'protection', 'guard', 'defend'] },
    'shield-check':      { elegant: null, lucide: 'shield-check',     synonyms: ['secure', 'protected', 'verified-shield'] },
    'shield-alert':      { elegant: null, lucide: 'shield-alert',     synonyms: ['security-warning', 'threat-detected'] },
    'shield-off':        { elegant: null, lucide: 'shield-off',       synonyms: ['unprotected', 'vulnerable'] },
    'lock':              { elegant: null, lucide: 'lock',             synonyms: ['locked', 'secure', 'encrypted', 'private'] },
    'unlock':            { elegant: null, lucide: 'lock-open',        synonyms: ['unlocked', 'unsecured'] },
    'key':               { elegant: null, lucide: 'key',              synonyms: ['password', 'credential', 'auth-key', 'api-key'] },
    'fingerprint':       { elegant: null, lucide: 'fingerprint',      synonyms: ['biometric', 'identity-verify'] },
    'scan-eye':          { elegant: null, lucide: 'scan-eye',         synonyms: ['surveillance', 'monitor-threat'] },
    'bug':               { elegant: null, lucide: 'bug',              synonyms: ['vulnerability', 'exploit', 'malware'] },
    'skull':             { elegant: null, lucide: 'skull',            synonyms: ['threat', 'kill', 'critical-threat', 'dead'] },
    'radar':             { elegant: null, lucide: 'radar',            synonyms: ['detect', 'scan-threat', 'reconnaissance'] },
    'flame':             { elegant: null, lucide: 'flame',            synonyms: ['firewall', 'fire', 'hot', 'burning'] },
    'ban':               { elegant: null, lucide: 'ban',              synonyms: ['block', 'deny', 'forbidden', 'blacklist'] },
    'eye':               { elegant: null, lucide: 'eye',              synonyms: ['view', 'visible', 'watch', 'observe', 'show'] },
    'eye-off':           { elegant: null, lucide: 'eye-off',          synonyms: ['hidden', 'invisible', 'hide', 'blind'] },

    /* ── USERS & IDENTITY ── */
    'user':              { elegant: null, lucide: 'user',             synonyms: ['person', 'profile', 'account', 'individual'] },
    'user-circle':       { elegant: null, lucide: 'circle-user-round', synonyms: ['avatar', 'user-avatar', 'profile-pic'] },
    'users':             { elegant: null, lucide: 'users',            synonyms: ['team', 'group', 'people', 'members'] },
    'user-plus':         { elegant: null, lucide: 'user-plus',        synonyms: ['add-user', 'invite', 'create-account', 'new-member'] },
    'user-minus':        { elegant: null, lucide: 'user-minus',       synonyms: ['remove-user', 'revoke'] },
    'user-check':        { elegant: null, lucide: 'user-check',       synonyms: ['verified-user', 'approved-user'] },
    'user-x':            { elegant: null, lucide: 'user-x',           synonyms: ['blocked-user', 'banned', 'impacted-user', 'victim'] },
    'contact':           { elegant: null, lucide: 'contact',          synonyms: ['address-book', 'vcard'] },

    /* ── DEVICES & INFRASTRUCTURE ── */
    'monitor':           { elegant: null, lucide: 'monitor',          synonyms: ['desktop', 'screen', 'display', 'endpoint', 'workstation'] },
    'laptop':            { elegant: null, lucide: 'laptop',           synonyms: ['notebook', 'portable'] },
    'smartphone':        { elegant: null, lucide: 'smartphone',       synonyms: ['mobile', 'phone', 'device'] },
    'tablet':            { elegant: null, lucide: 'tablet',           synonyms: ['ipad'] },
    'server':            { elegant: null, lucide: 'server',           synonyms: ['host', 'machine', 'backend', 'datacenter'] },
    'database':          { elegant: null, lucide: 'database',         synonyms: ['db', 'datastore', 'storage'] },
    'hard-drive':        { elegant: null, lucide: 'hard-drive',       synonyms: ['disk', 'storage-device'] },
    'cloud':             { elegant: null, lucide: 'cloud',            synonyms: ['cloud-service', 'saas'] },
    'wifi':              { elegant: null, lucide: 'wifi',             synonyms: ['wireless', 'network', 'connected'] },
    'wifi-off':          { elegant: null, lucide: 'wifi-off',         synonyms: ['no-connection', 'offline', 'disconnected'] },
    'globe':             { elegant: null, lucide: 'globe',            synonyms: ['world', 'internet', 'web', 'global', 'domain'] },
    'network':           { elegant: null, lucide: 'network',          synonyms: ['topology', 'nodes', 'connections', 'infra'] },
    'router':            { elegant: null, lucide: 'router',           synonyms: ['gateway', 'access-point'] },
    'cpu':               { elegant: null, lucide: 'cpu',              synonyms: ['processor', 'chip', 'compute'] },
    'memory-stick':      { elegant: null, lucide: 'memory-stick',     synonyms: ['ram', 'memory'] },
    'plug':              { elegant: null, lucide: 'plug',             synonyms: ['connection', 'integrate', 'plugin'] },
    'terminal':          { elegant: null, lucide: 'terminal',         synonyms: ['console', 'cli', 'command-line', 'shell', 'cmd'] },

    /* ── FILES & DOCUMENTS ── */
    'file':              { elegant: null, lucide: 'file',             synonyms: ['document', 'doc', 'page'] },
    'file-text':         { elegant: null, lucide: 'file-text',        synonyms: ['text-doc', 'readme', 'notes'] },
    'file-code':         { elegant: null, lucide: 'file-code',        synonyms: ['source-file', 'script'] },
    'file-check':        { elegant: null, lucide: 'file-check',       synonyms: ['file-approved', 'completed-doc'] },
    'file-warning':      { elegant: null, lucide: 'file-warning',     synonyms: ['file-alert', 'problematic-file'] },
    'file-x':            { elegant: null, lucide: 'file-x',           synonyms: ['file-error', 'invalid-file'] },
    'files':             { elegant: null, lucide: 'files',            synonyms: ['documents', 'multi-file'] },
    'folder':            { elegant: null, lucide: 'folder',           synonyms: ['directory', 'category'] },
    'folder-open':       { elegant: null, lucide: 'folder-open',      synonyms: ['open-folder', 'expanded'] },
    'archive':           { elegant: null, lucide: 'archive',          synonyms: ['compressed', 'zip', 'backup'] },
    'clipboard':         { elegant: null, lucide: 'clipboard',        synonyms: ['paste', 'clipboard-content'] },
    'clipboard-list':    { elegant: null, lucide: 'clipboard-list',   synonyms: ['checklist', 'todo-list', 'tasks'] },
    'book':              { elegant: null, lucide: 'book-open',        synonyms: ['documentation', 'manual', 'guide', 'knowledge-base'] },
    'notebook':          { elegant: null, lucide: 'notebook',         synonyms: ['journal', 'logbook'] },

    /* ── SETTINGS & CONFIGURATION ── */
    'settings':          { elegant: null, lucide: 'settings',         synonyms: ['gear', 'cog', 'config', 'preferences', 'admin'] },
    'sliders':           { elegant: null, lucide: 'sliders-horizontal', synonyms: ['adjustments', 'controls', 'tune', 'configure'] },
    'wrench':            { elegant: null, lucide: 'wrench',           synonyms: ['tool', 'maintenance', 'fix', 'repair'] },
    'toggle-left':       { elegant: null, lucide: 'toggle-left',      synonyms: ['switch-off', 'toggle-off'] },
    'toggle-right':      { elegant: null, lucide: 'toggle-right',     synonyms: ['switch-on', 'toggle-on'] },

    /* ── STATUS & INDICATORS ── */
    'circle':            { elegant: null, lucide: 'circle',           synonyms: ['dot', 'status-dot', 'indicator'] },
    'circle-dot':        { elegant: null, lucide: 'circle-dot',       synonyms: ['radio', 'selected-radio', 'active-dot'] },
    'loader':            { elegant: null, lucide: 'loader',           synonyms: ['spinner', 'loading', 'processing'] },
    'clock':             { elegant: 'icon-alert-clock', lucide: 'clock',            synonyms: ['time', 'schedule', 'pending', 'timer', 'duration'] },
    'calendar':          { elegant: 'icon-alert-calendar', lucide: 'calendar',         synonyms: ['date', 'schedule', 'event', 'appointment'] },
    'calendar-days':     { elegant: null, lucide: 'calendar-days',    synonyms: ['date-range', 'period', 'date-picker'] },
    'hourglass':         { elegant: 'icon-alert-hourglass', lucide: 'hourglass',        synonyms: ['waiting', 'pending-time'] },
    'activity':          { elegant: null, lucide: 'activity',         synonyms: ['pulse', 'health', 'heartbeat', 'live'] },
    'trending-up':       { elegant: null, lucide: 'trending-up',      synonyms: ['increase', 'growth', 'positive-trend', 'up-trend'] },
    'trending-down':     { elegant: null, lucide: 'trending-down',    synonyms: ['decrease', 'decline', 'negative-trend', 'down-trend'] },
    'bar-chart':         { elegant: null, lucide: 'bar-chart-3',      synonyms: ['chart', 'graph', 'analytics', 'stats', 'metrics'] },
    'pie-chart':         { elegant: null, lucide: 'pie-chart',        synonyms: ['donut', 'distribution'] },
    'line-chart':        { elegant: null, lucide: 'chart-line',       synonyms: ['trend-line', 'trend-chart'] },
    'hash':              { elegant: null, lucide: 'hash',             synonyms: ['number', 'count', 'tag'] },
    'percent':           { elegant: null, lucide: 'percent',          synonyms: ['percentage', 'ratio'] },
    'gauge':             { elegant: null, lucide: 'gauge',            synonyms: ['meter', 'speedometer', 'performance'] },

    /* ── DATA & TABLES ── */
    'table':             { elegant: null, lucide: 'table',            synonyms: ['data-grid', 'spreadsheet'] },
    'rows':              { elegant: null, lucide: 'rows-3',           synonyms: ['horizontal-rows', 'list-rows'] },
    'checkbox':          { elegant: 'icon-checkbox', lucide: 'square',           synonyms: ['unchecked', 'checkbox-empty'] },
    'checkbox-checked':  { elegant: 'icon-checkbox-checked', lucide: 'square-check',     synonyms: ['checked', 'selected', 'checkbox-on'] },
    'checkbox-minus':    { elegant: 'icon-checkbox-indeterminate', lucide: 'square-minus',     synonyms: ['indeterminate', 'partial-check'] },

    /* ── LOG & AUDIT (SOC/SIEM) ── */
    'scroll-text':       { elegant: null, lucide: 'scroll-text',      synonyms: ['log', 'audit-log', 'event-log', 'history'] },
    'file-search':       { elegant: null, lucide: 'file-search',      synonyms: ['log-search', 'investigate', 'find-in-file'] },
    'book-open-check':   { elegant: null, lucide: 'book-open-check',  synonyms: ['compliance', 'policy-check', 'audit'] },
    'scale':             { elegant: null, lucide: 'scale',            synonyms: ['compliance-scale', 'balance', 'legal'] },
    'workflow':          { elegant: null, lucide: 'workflow',          synonyms: ['automation', 'process', 'pipeline', 'playbook'] },
    'layers':            { elegant: null, lucide: 'layers',           synonyms: ['stack', 'tiers', 'levels'] },
    'box':               { elegant: null, lucide: 'box',              synonyms: ['package', 'container', 'module'] },

    /* ── COMMUNICATION ── */
    'mail':              { elegant: null, lucide: 'mail',             synonyms: ['email', 'envelope', 'inbox', 'message-email'] },
    'phone':             { elegant: null, lucide: 'phone',            synonyms: ['call', 'telephone'] },
    'video':             { elegant: null, lucide: 'video',            synonyms: ['camera', 'video-call', 'record'] },

    /* ── MAP & LOCATION ── */
    'map-pin':           { elegant: null, lucide: 'map-pin',          synonyms: ['location', 'place', 'pin', 'marker', 'geo'] },
    'globe':             { elegant: null, lucide: 'globe',            synonyms: ['world', 'internet', 'web', 'global', 'domain'] },

    /* ── MISC ── */
    'star':              { elegant: null, lucide: 'star',             synonyms: ['favorite', 'bookmark', 'important', 'priority'] },
    'heart':             { elegant: null, lucide: 'heart',            synonyms: ['like', 'love', 'favorite-alt'] },
    'tag':               { elegant: null, lucide: 'tag',              synonyms: ['label', 'price', 'category-tag'] },
    'flag':              { elegant: null, lucide: 'flag',             synonyms: ['report', 'mark', 'flagged'] },
    'image':             { elegant: null, lucide: 'image',            synonyms: ['photo', 'picture', 'thumbnail'] },
    'code':              { elegant: null, lucide: 'code',             synonyms: ['source', 'developer', 'programming'] },
    'building':          { elegant: null, lucide: 'building-2',       synonyms: ['office', 'company', 'organization', 'enterprise'] },
    'puzzle':            { elegant: null, lucide: 'puzzle',           synonyms: ['integration', 'addon', 'plugin', 'extension'] },
    'lightbulb':         { elegant: null, lucide: 'lightbulb',        synonyms: ['idea', 'tip', 'suggestion', 'insight'] },
    'rocket':            { elegant: null, lucide: 'rocket',           synonyms: ['launch', 'deploy', 'fast', 'boost'] },
    'target':            { elegant: null, lucide: 'target',           synonyms: ['goal', 'aim', 'objective', 'crosshair'] },
    'apps-grid':         { elegant: 'icon-apps-grid', lucide: 'grid-3x3',        synonyms: ['apps', 'app-launcher', 'modules', 'grid-menu'] },
    'external':          { elegant: null, lucide: 'external-link',    synonyms: ['open-external', 'new-window', 'new-tab'] },
  };

  /* ═══════════════════════════════════════════════════════════════
     EMOJI → CONCEPT MAPPING
     When source HTML uses emoji text as icons, this maps them
     to the correct concept key in ICON_CATALOG.
     ═══════════════════════════════════════════════════════════════ */
  var EMOJI_MAP = {
    '⚡': 'zap',       '🔔': 'bell',       '🔒': 'lock',
    '🔓': 'unlock',    '📊': 'bar-chart',   '📈': 'trending-up',
    '📉': 'trending-down', '⚠️': 'alert-triangle', '⚠': 'alert-triangle',
    '✅': 'check-circle', '❌': 'close',      '📋': 'clipboard-list',
    '🔍': 'search',    '👤': 'user',        '👥': 'users',
    '💀': 'skull',     '🛡️': 'shield',     '🛡': 'shield',
    '📁': 'folder',    '📂': 'folder-open', '🔗': 'link',
    '⬆️': 'arrow-up',  '⬆': 'arrow-up',    '⬇️': 'arrow-down',
    '⬇': 'arrow-down', '↗️': 'arrow-up-right', '↗': 'arrow-up-right',
    '◈': 'circle-dot', '◎': 'target',      '●': 'circle',
    '○': 'circle',     '■': 'checkbox',     '□': 'checkbox',
    '▲': 'chevron-up',  '▼': 'chevron-down', '★': 'star', '☆': 'star',
    '🔧': 'wrench',    '⚙️': 'settings',   '⚙': 'settings',
    '📧': 'mail',      '📞': 'phone',       '🌐': 'globe',
    '🏢': 'building',  '📅': 'calendar',    '⏰': 'clock',
    '🔥': 'flame',     '🚀': 'rocket',      '💡': 'lightbulb',
    '🎯': 'target',    '📝': 'file-text',   '🖥️': 'monitor',
    '🖥': 'monitor',   '💻': 'laptop',      '📱': 'smartphone',
    '☁️': 'cloud',     '☁': 'cloud',        '🗑️': 'delete',
    '🗑': 'delete',    '✏️': 'edit',        '✏': 'edit',
    '➕': 'add',       '➖': 'minus',        '🔄': 'refresh',
    '▶️': 'play',      '▶': 'play',         '🔘': 'circle-dot',
    '📌': 'map-pin',   '🏠': 'home',        '🔑': 'key',
    '🎓': 'graduation-cap', '📖': 'book',
  };

  /* ── REVERSE SYNONYM INDEX (built once on first resolve) ── */
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

  /**
   * Resolve any keyword/emoji/concept to its Lucide icon name.
   * Search order: emoji → exact concept → exact lucide → synonym → fuzzy partial.
   */
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

  /**
   * Build the local SVG file path.
   * Pattern: ./assets/lucide-icons/{lucide-name}-{size}.svg
   */
  function localPath(lucideName, size) {
    return LOCAL_BASE + lucideName + '-' + (size || 14) + '.svg';
  }

  /**
   * Build CDN URL for fetching the raw Lucide SVG.
   */
  function cdnUrl(lucideName) {
    return CDN_BASE + lucideName + '.svg';
  }

  /**
   * Transform a raw Lucide SVG (24x24, stroke-width 2) into Elegant specs.
   */
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

  /**
   * Generate an <img> tag for converted HTML output.
   */
  function imgTag(concept, context, altText) {
    var lucideName = resolve(concept);
    if (!lucideName) return '<!-- icon not found: ' + concept + ' -->';
    var size = getSizeForContext(context || 'default');
    var path = localPath(lucideName, size);
    return '<img src="' + path + '" alt="' + (altText || concept) +
           '" width="' + size + '" height="' + size + '" />';
  }

  /**
   * Runtime DOM initializer: replaces <i data-icon="..."> placeholders.
   */
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
