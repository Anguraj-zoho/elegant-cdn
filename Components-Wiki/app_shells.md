# App Shells

> Assembly templates for different page types.
> Source: LLM-WIKI.md — App Shells section

Every page in the Elegant 1.0 system is built on one of four predefined App Shells. Each shell defines the structural skeleton, scroll model, and required CSS/JS. Pick the shell that matches your page type, then slot components into the designated content areas.

---

## Shell A — Dashboard (Full Width, No Sidemenu)

### When to use

- Dashboard / Home tab pages
- Threat Hub / SOAR Overview / Analytics
- Security tab pages
- Cloud Protection tab
- Any full-width page with widget grids and charts

### Structure

```
TopNavBar → Line Tab (with dashboard actions) → Optional Toolbar → Widget Grid
```

### Structural diagram

```
div.app-shell (height:100vh; flex:column)
 ├── header.topnavbar (h:78px = row1:44px + row2:34px)
 ├── div.line-tab (h:40px; flex; border-bottom:1px #E9E9E9)
 │    ├── div.line-tab__headers (flex:1; gap:12px)
 │    │    └── button.line-tab__header × N
 │    └── div.line-tab__actions (flex-shrink:0; gap:8px; margin-left:auto)
 │         ├── div.cal-input (w:280px; h:26px; border:1px #C4C4C4)
 │         │    ├── span.cal-input__text (flex:1; font:12px; pad-left:12px)
 │         │    └── span.cal-input__icon (w:26px; h:26px; bg:#F5F5F5; border-left:1px)
 │         ├── button.line-tab__action-icon-btn (24×24) — refresh
 │         ├── button.line-tab__action-icon-btn (24×24) — expand
 │         ├── div.line-tab__action-separator (1×100%; bg:#E9E9E9)
 │         └── button.line-tab__action-settings (40×40px)
 ├── div.toolbar (h:36px; flex; pad:0 16px; gap:12px; border-bottom:1px #E9E9E9) [OPTIONAL]
 │    ├── button.toolbar__btn.toolbar__btn--active (h:24px; bg:#E8F0FE; color:#2C66DD)
 │    ├── div.toolbar__separator (1×16px; bg:#DCDCDC)
 │    ├── button.toolbar__btn × N
 │    ├── div.toolbar__spacer (flex:1)
 │    └── button.toolbar__btn × N (refresh, filter icons)
 └── div.dash (bg:#F5F5F5; pad:16px; flex:1; overflow-y:auto)
      └── div.dash__grid (flex:column; gap:4px)
           ├── div.dash__row.stat-row (flex; gap:4px) — stat cards (max 4, icon-right)
           ├── div.tile-grid (grid:repeat(3,1fr); gap:4px) — tiles (max 3, max 1 row)
           ├── div.dash__row (flex; gap:4px) — hybrid widgets: ECharts + predefined JS (max 3)
           └── div.dash__row (flex; gap:4px) — hybrid widgets: alertList + chart + table (max 3)
```

### Required files

| Type | Files |
|------|-------|
| **CSS** | `tokens.css`, `layout.css`, `topnavbar.css`, `line-tab.css`, `widget.css`, `table.css`, `responsive.css`, `notification-banner.css` |
| **JS** | `topnavbar.js`, `line-tab.js`, `widget.js`, `notification-banner.js`, `icon-engine.js`, `lib/echarts.min.js`, `echarts-elegant-theme.js`, `echarts-widget.js` |

### Scroll model

**Only `.dash` scrolls** (`flex:1; overflow-y:auto`). TopNavBar, Line Tab, and Toolbar are all fixed above the fold. The page itself (`html`, `body`, `.app-shell`) never scrolls.

### Complete assembly example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard — Log360 Cloud</title>
  <link rel="stylesheet" href="components/tokens.css">
  <link rel="stylesheet" href="components/layout.css">
  <link rel="stylesheet" href="components/topnavbar.css">
  <link rel="stylesheet" href="components/line-tab.css">
  <link rel="stylesheet" href="components/widget.css">
  <link rel="stylesheet" href="components/table.css">
  <link rel="stylesheet" href="components/responsive.css">
  <link rel="stylesheet" href="components/notification-banner.css">
  <style>
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .anim-fade-in-up { opacity: 0; animation: fadeInUp 0.4s ease forwards; }
    .anim-delay-1 { animation-delay: 0.05s; }
    .anim-delay-2 { animation-delay: 0.10s; }
    .anim-delay-3 { animation-delay: 0.15s; }
    .anim-delay-4 { animation-delay: 0.20s; }
    .anim-delay-5 { animation-delay: 0.25s; }
    .anim-delay-6 { animation-delay: 0.30s; }
  </style>
</head>
<body>
<div class="sidemenu-backdrop"></div>

<div class="app-shell">

  <!-- TOPNAVBAR (paste from topnavbar.html) -->
  <header class="topnavbar" data-active-tab="Home">
    <!-- ... full topnavbar HTML ... -->
  </header>

  <!-- LINE TAB — sub-navigation + actions -->
  <div class="line-tab">
    <div class="line-tab__headers">
      <button class="line-tab__header line-tab__header--selected" data-tab="overview">Overview</button>
      <button class="line-tab__header" data-tab="network">Network</button>
      <button class="line-tab__header" data-tab="anomaly">Anomaly</button>
    </div>
    <div class="line-tab__actions">
      <div class="cal-input">
        <span class="cal-input__text">Last 24 hours</span>
        <span class="cal-input__icon">
          <img src="assets/icons/icon-dd-calendar.svg" alt="" style="width:14px;height:14px;">
        </span>
      </div>
      <button class="line-tab__action-icon-btn" title="Refresh">
        <img src="assets/icons/icon-actionbar-refresh.svg" alt="" style="width:14px;height:14px;">
      </button>
      <button class="line-tab__action-icon-btn" title="Expand">
        <img src="assets/icons/icon-widget-maximize.svg" alt="" style="width:14px;height:14px;">
      </button>
      <div class="line-tab__action-separator"></div>
      <button class="line-tab__action-settings" title="Settings">
        <img src="assets/icons/icon-dd-settings.svg" alt="" style="width:14px;height:14px;">
      </button>
    </div>
  </div>

  <!-- DASHBOARD GRID — the only scrollable area -->
  <div class="dash">
    <div class="dash__grid">

      <!-- ROW 1: Stat Cards (max 4) -->
      <div class="dash__row stat-row">
        <div class="stat-card anim-fade-in-up anim-delay-1">
          <div class="stat-card__body">
            <span class="stat-card__value">24,891</span>
            <span class="stat-card__trend stat-card__trend--up">+4.7%</span>
            <span class="stat-card__label">Total Events</span>
          </div>
          <img class="stat-card__icon" src="assets/icons/icon-summary-bell.svg" alt="">
        </div>
        <div class="stat-card anim-fade-in-up anim-delay-2">
          <div class="stat-card__body">
            <span class="stat-card__value">1,847</span>
            <span class="stat-card__trend stat-card__trend--up">+4.67%</span>
            <span class="stat-card__label">Firewall Events</span>
          </div>
          <img class="stat-card__icon" src="assets/icons/icon-endpoint.svg" alt="">
        </div>
        <div class="stat-card anim-fade-in-up anim-delay-3">
          <div class="stat-card__body">
            <span class="stat-card__value">312</span>
            <span class="stat-card__trend stat-card__trend--down">-2.1%</span>
            <span class="stat-card__label">Critical Alerts</span>
          </div>
          <img class="stat-card__icon" src="assets/icons/icon-alert-critical.svg" alt="">
        </div>
        <div class="stat-card anim-fade-in-up anim-delay-4">
          <div class="stat-card__body">
            <span class="stat-card__value">98.7%</span>
            <span class="stat-card__label">Uptime</span>
          </div>
          <img class="stat-card__icon" src="assets/icons/icon-status-success.svg" alt="">
        </div>
      </div>

      <!-- ROW 2: Tiles (max 3 per row, max 1 row) -->
      <div class="tile-grid" style="grid-template-columns: repeat(3, 1fr); gap: 4px;">
        <div class="tile-card tile-card--wide anim-fade-in-up anim-delay-5">
          <div class="card__header"><span class="card__title">Active Alerts</span></div>
          <div id="tile-1"></div>
        </div>
        <div class="tile-card anim-fade-in-up anim-delay-6">
          <div class="card__header"><span class="card__title">Total Events</span></div>
          <div id="tile-2"></div>
        </div>
      </div>

      <!-- ROW 3+: Hybrid Widgets -->
      <div class="dash__row">
        <div class="widget anim-fade-in-up anim-delay-7">
          <div class="widget__header">
            <span class="widget__title">Event Trend</span>
            <div class="widget__toolbar">
              <button class="widget__toolbar-btn" onclick="renderEventTrend()" title="Refresh">
                <img src="assets/icons/icon-actionbar-refresh.svg" alt="" style="width:14px;height:14px;">
              </button>
            </div>
          </div>
          <div class="widget__body">
            <div id="chart-event-trend" style="width:100%;min-height:280px;"></div>
          </div>
        </div>
        <div class="widget anim-fade-in-up anim-delay-8">
          <div class="widget__header">
            <span class="widget__title">Recent Alerts</span>
          </div>
          <div class="widget__body">
            <div id="alert-feed"></div>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>

<!-- Bottom sheet (OUTSIDE app-shell) -->
<div class="nav-bottom-sheet" id="navBottomSheet">
  <!-- ... bottom sheet HTML ... -->
</div>

<!-- Scripts -->
<script src="components/lib/echarts.min.js"></script>
<script src="components/echarts-elegant-theme.js"></script>
<script src="components/echarts-widget.js"></script>
<script src="components/topnavbar.js"></script>
<script src="components/line-tab.js"></script>
<script src="components/icon-engine.js"></script>
<script src="components/notification-banner.js"></script>
<script>
  // Tile widgets
  ElegantEChart.tileWidget('tile-1', {
    value: '10,000', trend: '+7.1%',
    severity: [
      { sev: 'critical', value: 640 },
      { sev: 'trouble', value: 220 },
      { sev: 'attention', value: 68 }
    ],
    slaViolated: 25, mutedAlerts: 25
  }, { type: 1 });

  ElegantEChart.tileWidget('tile-2', {
    value: '12,847', trend: '+14.6%', sparkColor: '#2C66DD'
  }, { type: 6 });

  // ECharts widget
  function renderEventTrend() {
    ElegantEChart.line('chart-event-trend', {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        { name: 'Events', values: [1200, 1800, 1400, 2200, 1900, 1600, 2100] }
      ]
    });
  }
  renderEventTrend();

  // Alert feed (predefined JS widget)
  ElegantEChart.alertList('alert-feed', {
    alerts: [
      { title: 'Security Auditing', severity: 'Critical', score: 95,
        desc: 'A new process has been created.', time: '2026-04-14 03:40:31', source: 'Windows' },
      { title: 'Failed Logon Attempt', severity: 'High', score: 78,
        desc: 'Multiple failed logon attempts detected.', time: '2026-04-14 03:38:12', source: 'Windows' }
    ]
  });
</script>
</body>
</html>
```

### Dashboard row order (strict)

```
ROW 1: Stat Cards    → max 4 per row, compact value + trend + label
ROW 2: Tiles         → max 3 per row, max 1 row total, rich data tiles (JS API)
ROW 3+: Hybrid Widgets → max 3 per row, MIX of ECharts + predefined JS widgets
```

---

## Shell B — Settings (Sidemenu + Classic Tab + Table)

### When to use

- Settings tab pages
- Admin configuration pages
- Any page with a sidebar navigation tree, form tabs, and data tables

### Structure

```
TopNavBar → Sidebar(Settings tree) + Main(Page Header → Classic Tab → Table)
```

### Structural diagram

```
div.app-shell (height:100vh; flex:column)
 ├── header.topnavbar (h:78px)
 ├── div.app-body (flex:1; flex:row; overflow:hidden)
 │    ├── aside.sidemenu (w:240px; flex:column; border-right:1px #E9E9E9)
 │    │    ├── div.sidemenu__search-wrap (pad:8px 12px)
 │    │    ├── div.sidemenu__scroll (flex:1; overflow-y:auto)
 │    │    │    └── div.sidemenu__section × N
 │    │    │         ├── button.sidemenu__l1 (h:32px; pad-left:16px)
 │    │    │         └── a.sidemenu__item (h:32px; pad-left:40px)
 │    │    └── div.sidemenu__bottom (h:32px; border-top:1px)
 │    └── main.main-content (flex:1; pad:0 16px; flex:column)
 │         ├── div.page-header (h:40px; flex; gap:8px; border-bottom:1px)
 │         │    ├── h1.page-header__title (font:14px/600)
 │         │    └── button.page-header__help (14×14 icon)
 │         └── div.classic-tab (pad-top:16px)
 │              ├── div.classic-tab__headers (h:32px; flex)
 │              │    ├── button.classic-tab__header × N (pad:9px 16px; font:12px)
 │              │    └── div.classic-tab__filler (flex:1)
 │              └── div.classic-tab__body (bg:#fff; border:1px no-top; pad:16px)
 │                   └── [CONTENT: button-row, actionbar, data-table]
 └── [nav-bottom-sheet for mobile]
```

### Required files

| Type | Files |
|------|-------|
| **CSS** | `tokens.css`, `layout.css`, `topnavbar.css`, `sidemenu.css`, `header.css`, `classic-tab.css`, `table.css`, `form-input.css`, `form-dropdown.css`, `responsive.css`, `notification-banner.css` |
| **JS** | `topnavbar.js`, `sidemenu.js`, `classic-tab.js`, `table.js`, `form-dropdown.js`, `form-input.js`, `notification-banner.js`, `icon-engine.js` |

### Scroll model

Two independent scroll areas:
1. **`.sidemenu__scroll`** — scrolls the sidebar menu tree
2. **`.classic-tab__body`** or **`.table-scroll-area`** — scrolls the content/table area

### Complete assembly example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Settings — Log360 Cloud</title>
  <link rel="stylesheet" href="components/tokens.css">
  <link rel="stylesheet" href="components/layout.css">
  <link rel="stylesheet" href="components/topnavbar.css">
  <link rel="stylesheet" href="components/sidemenu.css">
  <link rel="stylesheet" href="components/header.css">
  <link rel="stylesheet" href="components/classic-tab.css">
  <link rel="stylesheet" href="components/table.css">
  <link rel="stylesheet" href="components/form-input.css">
  <link rel="stylesheet" href="components/form-dropdown.css">
  <link rel="stylesheet" href="components/drawer.css">
  <link rel="stylesheet" href="components/responsive.css">
  <link rel="stylesheet" href="components/notification-banner.css">
</head>
<body>
<div class="sidemenu-backdrop"></div>

<div class="app-shell">

  <!-- TOPNAVBAR -->
  <header class="topnavbar" data-active-tab="Settings">
    <!-- ... full topnavbar HTML ... -->
  </header>

  <div class="app-body">

    <!-- SIDEMENU (Settings tree) -->
    <aside class="sidemenu" data-active-item="Applications">
      <div class="sidemenu__search-wrap">
        <input class="sidemenu__search" type="text" placeholder="Search settings...">
        <img src="assets/icons/icon-search-settings.svg" alt="" class="sidemenu__search-icon">
      </div>
      <div class="sidemenu__scroll scrollbar-thin">
        <div class="sidemenu__section">
          <button class="sidemenu__l1 sidemenu__l1--expanded">
            <img src="assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__l1-icon">
            <img src="assets/icons/icon-troubleshoot.svg" alt="" class="sidemenu__l1-section-icon">
            <span>Troubleshoot</span>
          </button>
          <a class="sidemenu__item sidemenu__item--active" href="#">Applications</a>
          <a class="sidemenu__item" href="#">Log Sources</a>
          <a class="sidemenu__item" href="#">Devices</a>
        </div>
        <div class="sidemenu__section">
          <button class="sidemenu__l1">
            <img src="assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__l1-icon">
            <img src="assets/icons/icon-admin-settings.svg" alt="" class="sidemenu__l1-section-icon">
            <span>Admin Settings</span>
          </button>
        </div>
      </div>
      <div class="sidemenu__bottom">
        <button class="sidemenu__bottom-btn" id="sidebarCollapse" title="Collapse sidebar">
          <img src="assets/icons/icon-slider-close.svg" alt="">
        </button>
      </div>
    </aside>

    <!-- Expand button (shown when sidebar collapsed) -->
    <button class="sidemenu-expand" id="sidebarExpand" title="Expand sidebar">
      <img src="assets/icons/icon-slider-close.svg" alt="">
    </button>

    <!-- MAIN CONTENT -->
    <main class="main-content">

      <!-- PAGE HEADER -->
      <div class="page-header">
        <h1 class="page-header__title">Applications</h1>
        <button class="page-header__help" title="Help">
          <img src="assets/icons/icon-btn-help.svg" alt="" style="width:14px;height:14px;">
        </button>
      </div>

      <!-- CLASSIC TAB -->
      <div class="classic-tab">
        <div class="classic-tab__headers">
          <button class="classic-tab__header classic-tab__header--selected" data-tab="general">General</button>
          <button class="classic-tab__header" data-tab="advanced">Advanced</button>
          <button class="classic-tab__header" data-tab="permissions">Permissions</button>
          <div class="classic-tab__filler"></div>
        </div>
        <div class="classic-tab__body">

          <!-- Tab content: General -->
          <div class="classic-tab__content classic-tab__content--active" data-tab-content="general">

            <!-- Button row -->
            <div class="button-row">
              <button class="btn-primary">
                <img src="assets/icons/icon-btn-plus.svg" alt="" style="width:14px;height:14px;">
                Add Application
              </button>
            </div>

            <!-- Table with ActionBar -->
            <div class="table-scroll-area">
              <div class="actionbar">
                <div class="actionbar__left">
                  <button class="actionbar__icon-btn" title="Search">
                    <img src="assets/icons/icon-ab-search.svg" alt="" style="width:14px;height:14px;">
                  </button>
                  <div class="actionbar__separator"></div>
                  <button class="actionbar__icon-btn" title="Filter">
                    <img src="assets/icons/icon-actionbar-filter.svg" alt="" style="width:14px;height:14px;">
                  </button>
                </div>
                <div class="actionbar__right">
                  <span class="actionbar__pagination">1 - 25 of 142</span>
                  <button class="actionbar__icon-btn" title="Previous">
                    <img src="assets/icons/icon-chevron-left.svg" alt="" style="width:14px;height:14px;">
                  </button>
                  <button class="actionbar__icon-btn" title="Next">
                    <img src="assets/icons/icon-chevron-right.svg" alt="" style="width:14px;height:14px;">
                  </button>
                  <div class="actionbar__separator"></div>
                  <button class="actionbar__icon-btn" title="Refresh">
                    <img src="assets/icons/icon-actionbar-refresh.svg" alt="" style="width:14px;height:14px;">
                  </button>
                </div>
              </div>
              <div class="data-table-wrap">
                <table class="data-table">
                  <colgroup>
                    <col style="width:48px">
                    <col style="width:25%">
                    <col style="width:20%">
                    <col style="width:20%">
                    <col style="width:15%">
                    <col style="width:100px">
                  </colgroup>
                  <thead>
                    <tr>
                      <th><img src="assets/icons/icon-checkbox.svg" alt="" style="width:14px;height:14px;"></th>
                      <th>Application Name</th>
                      <th>Type</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><img src="assets/icons/icon-checkbox.svg" alt="" style="width:14px;height:14px;"></td>
                      <td>Apache Web Server</td>
                      <td>Web Server</td>
                      <td>Infrastructure</td>
                      <td>
                        <div class="cell-status">
                          <img src="assets/icons/icon-status-success.svg" alt="" style="width:14px;height:14px;">
                          <span>Enabled</span>
                        </div>
                      </td>
                      <td>
                        <div class="cell-actions">
                          <img src="assets/icons/icon-action-edit.svg" alt="Edit" style="width:14px;height:14px;">
                          <img src="assets/icons/icon-action-delete.svg" alt="Delete" style="width:14px;height:14px;">
                          <img src="assets/icons/icon-action-more.svg" alt="More" style="width:14px;height:14px;">
                        </div>
                      </td>
                    </tr>
                    <!-- ... more rows ... -->
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      </div>

    </main>
  </div>

</div>

<!-- Bottom sheet -->
<div class="nav-bottom-sheet" id="navBottomSheet">
  <!-- ... -->
</div>

<!-- Drawers (outside app-shell) -->
<div class="drawer-backdrop" data-drawer="add-app"></div>
<div class="drawer drawer--md" id="addAppDrawer">
  <div class="drawer__main">
    <div class="drawer__top">
      <span class="drawer__title">Add Application</span>
      <button class="drawer__close">&times;</button>
    </div>
    <div class="drawer__body">
      <!-- Form fields here -->
    </div>
    <div class="drawer__footer">
      <button class="drawer__btn-save">Save</button>
      <button class="drawer__btn-cancel">Cancel</button>
    </div>
  </div>
</div>

<!-- Scripts -->
<script src="components/topnavbar.js"></script>
<script src="components/sidemenu.js"></script>
<script src="components/classic-tab.js"></script>
<script src="components/table.js"></script>
<script src="components/drawer.js"></script>
<script src="components/form-input.js"></script>
<script src="components/form-dropdown.js"></script>
<script src="components/icon-engine.js"></script>
<script src="components/notification-banner.js"></script>
</body>
</html>
```

### Classic tab flex containment

For the table to scroll properly inside the classic tab body, add these overrides:

```css
.classic-tab { flex: 1; display: flex; flex-direction: column; min-height: 0; }
.classic-tab__body { flex: 1; display: flex; flex-direction: column; min-height: 0; overflow: hidden; }
.classic-tab__content { flex: 1; display: flex; flex-direction: column; min-height: 0; }
```

---

## Shell C — Reports (Sidemenu Type 2 + Chart + Table)

### When to use

- Reports tab pages
- Compliance pages
- Any page with a sidebar report tree, chart area, and data table below

### Structure

```
TopNavBar → Optional QuickLink → Sidebar(Reports tree) + Main(Header → Filter Row → Classic Tab [chart] → ActionBar → Table)
```

### Structural diagram

```
div.app-shell (height:100vh; flex:column)
 ├── header.topnavbar (h:78px; data-active-tab="Reports")
 ├── div.reports-quicklink [OPTIONAL]
 │    └── div.line-tab.line-tab--quicklink (h:32px)
 ├── div.app-body (flex:1; flex:row; overflow:hidden)
 │    ├── aside.sidemenu.sidemenu--type2 (w:240px)
 │    ├── button.sidemenu-expand (24×40; fixed left)
 │    └── main.main-content (flex:1; flex:column; overflow:hidden)
 │         ├── div.page-header (h:40px; + page-header__actions)
 │         ├── div.reports-input-row (filter inputs row)
 │         ├── div.classic-tab [chart only inside — Type C rule]
 │         │    └── div.rpt-chart-area + rpt-chart-floater
 │         └── div.table-scroll-area (flex:1; overflow-y:auto)
 │              ├── div.actionbar (sticky top:0; z-index:3; h:36px)
 │              └── div.data-table-wrap
 │                   └── table.data-table (table-layout:fixed; width:100%)
 └── [drawers for row detail]
```

### Required files

| Type | Files |
|------|-------|
| **CSS** | `tokens.css`, `layout.css`, `topnavbar.css`, `sidemenu.css`, `header.css`, `classic-tab.css`, `table.css`, `form-input.css`, `drawer.css`, `responsive.css`, `notification-banner.css` |
| **JS** | `topnavbar.js`, `sidemenu.js`, `classic-tab.js`, `table.js`, `drawer.js`, `form-input.js`, `form-dropdown.js`, `notification-banner.js`, `icon-engine.js`, `lib/echarts.min.js`, `echarts-elegant-theme.js`, `echarts-widget.js` |

### Scroll model

**Only `.table-scroll-area` scrolls** (`flex:1; overflow-y:auto; min-height:0`). The ActionBar is sticky at the top of the scroll area (`position:sticky; top:0; z-index:3`), and `<thead>` is sticky at `top:36px` (ActionBar height).

### Complete assembly example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reports — Log360 Cloud</title>
  <link rel="stylesheet" href="components/tokens.css">
  <link rel="stylesheet" href="components/layout.css">
  <link rel="stylesheet" href="components/topnavbar.css">
  <link rel="stylesheet" href="components/sidemenu.css">
  <link rel="stylesheet" href="components/header.css">
  <link rel="stylesheet" href="components/classic-tab.css">
  <link rel="stylesheet" href="components/table.css">
  <link rel="stylesheet" href="components/form-input.css">
  <link rel="stylesheet" href="components/form-dropdown.css">
  <link rel="stylesheet" href="components/drawer.css">
  <link rel="stylesheet" href="components/responsive.css">
  <link rel="stylesheet" href="components/notification-banner.css">
</head>
<body>
<div class="sidemenu-backdrop"></div>

<div class="app-shell">

  <!-- TOPNAVBAR -->
  <header class="topnavbar" data-active-tab="Reports">
    <!-- ... full topnavbar HTML ... -->
  </header>

  <!-- QUICKLINK BAR (optional) -->
  <div class="reports-quicklink">
    <div class="line-tab line-tab--quicklink">
      <div class="line-tab__headers">
        <button class="line-tab__header line-tab__header--selected">Servers & Workstation</button>
        <button class="line-tab__header">Applications</button>
        <button class="line-tab__header">Cloud Apps</button>
        <button class="line-tab__header">Firewalls</button>
      </div>
    </div>
  </div>

  <div class="app-body">

    <!-- SIDEMENU TYPE 2 (Reports tree) -->
    <aside class="sidemenu sidemenu--type2" data-active-item="All Events">
      <div class="sidemenu__search-wrap">
        <input class="sidemenu__search" type="text" placeholder="Search reports...">
        <img src="assets/icons/icon-search-settings.svg" alt="" class="sidemenu__search-icon">
      </div>
      <div class="sidemenu__scroll scrollbar-thin">
        <div class="sidemenu__section">
          <button class="sidemenu__l1 sidemenu__l1--expanded">
            <img src="assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__l1-icon">
            <span>Windows</span>
          </button>
          <a class="sidemenu__item sidemenu__item--active">All Events</a>
          <a class="sidemenu__item">Logon Reports</a>
          <a class="sidemenu__item">Account Management</a>
          <a class="sidemenu__item">Policy Changes</a>
        </div>
        <div class="sidemenu__section">
          <button class="sidemenu__l1">
            <img src="assets/icons/icon-sm-chevron-right.svg" alt="" class="sidemenu__l1-icon">
            <span>Unix</span>
          </button>
        </div>
      </div>
      <div class="sidemenu__bottom">
        <button class="sidemenu__bottom-btn" id="sidebarCollapse" title="Collapse sidebar">
          <img src="assets/icons/icon-slider-close.svg" alt="">
        </button>
      </div>
    </aside>

    <button class="sidemenu-expand" id="sidebarExpand" title="Expand sidebar">
      <img src="assets/icons/icon-slider-close.svg" alt="">
    </button>

    <!-- MAIN CONTENT -->
    <main class="main-content">

      <!-- PAGE HEADER with actions -->
      <div class="page-header">
        <h1 class="page-header__title">All Events</h1>
        <div class="page-header__actions">
          <button class="page-header__action-btn" title="Export">
            <img src="assets/icons/icon-rpt-export.svg" alt="" style="width:14px;height:14px;">
          </button>
          <button class="page-header__action-btn" title="Schedule">
            <img src="assets/icons/icon-rpt-schedule.svg" alt="" style="width:14px;height:14px;">
          </button>
          <button class="page-header__action-btn" title="More">
            <img src="assets/icons/icon-rpt-more.svg" alt="" style="width:14px;height:14px;">
          </button>
        </div>
      </div>

      <!-- FILTER INPUT ROW -->
      <div class="reports-input-row reports-input-row--type1">
        <div class="reports-input-row__group">
          <label>Log Source:</label>
          <div class="form-dropdown-wrap">
            <div class="form-dropdown-trigger">
              <input class="form-input form-input--select" readonly value="All Sources" data-dropdown-trigger>
              <div class="form-dropdown-trigger__icon"></div>
            </div>
          </div>
        </div>
        <div class="reports-input-row__group">
          <label>Time Period:</label>
          <div class="form-dropdown-wrap">
            <div class="form-dropdown-trigger">
              <input class="form-input form-input--select" readonly value="Last 24 hours" data-dropdown-trigger>
              <div class="form-dropdown-trigger__icon"></div>
            </div>
          </div>
        </div>
        <button class="btn-primary">Generate</button>
      </div>

      <!-- CLASSIC TAB (chart area only — Type C rule) -->
      <div class="classic-tab">
        <div class="classic-tab__headers">
          <button class="classic-tab__header classic-tab__header--selected" data-tab="line">Line</button>
          <button class="classic-tab__header" data-tab="bar">Bar</button>
          <button class="classic-tab__header" data-tab="area">Area</button>
          <div class="classic-tab__filler"></div>
        </div>
        <div class="classic-tab__body">
          <div class="classic-tab__content classic-tab__content--active" data-tab-content="line">
            <div class="rpt-chart-area">
              <div id="report-chart" style="width:100%;min-height:240px;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- TABLE SCROLL AREA (only this scrolls) -->
      <div class="table-scroll-area">
        <div class="actionbar">
          <div class="actionbar__left">
            <button class="actionbar__icon-btn" title="Search">
              <img src="assets/icons/icon-ab-search.svg" alt="" style="width:14px;height:14px;">
            </button>
            <div class="actionbar__separator"></div>
            <button class="actionbar__icon-btn" title="Columns">
              <img src="assets/icons/icon-ab-column.svg" alt="" style="width:14px;height:14px;">
            </button>
          </div>
          <div class="actionbar__right">
            <span class="actionbar__pagination">1 - 50 of 2,847</span>
            <button class="actionbar__icon-btn" title="Previous">
              <img src="assets/icons/icon-chevron-left.svg" alt="" style="width:14px;height:14px;">
            </button>
            <button class="actionbar__icon-btn" title="Next">
              <img src="assets/icons/icon-chevron-right.svg" alt="" style="width:14px;height:14px;">
            </button>
            <div class="actionbar__separator"></div>
            <button class="actionbar__icon-btn" title="Refresh">
              <img src="assets/icons/icon-actionbar-refresh.svg" alt="" style="width:14px;height:14px;">
            </button>
          </div>
        </div>
        <div class="data-table-wrap">
          <table class="data-table">
            <colgroup>
              <col style="width:48px">
              <col style="width:18%">
              <col style="width:12%">
              <col style="width:15%">
              <col style="width:25%">
              <col style="width:15%">
              <col style="width:100px">
            </colgroup>
            <thead>
              <tr>
                <th><img src="assets/icons/icon-checkbox.svg" alt="" style="width:14px;height:14px;"></th>
                <th>Time</th>
                <th>Source</th>
                <th>User</th>
                <th>Event</th>
                <th>Severity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src="assets/icons/icon-checkbox.svg" alt="" style="width:14px;height:14px;"></td>
                <td>2026-04-14 10:23:45</td>
                <td>DC-01</td>
                <td>admin@corp.local</td>
                <td>User logon successful (Event ID: 4624)</td>
                <td><span class="sev-badge sev-badge--low">Low</span></td>
                <td>
                  <div class="cell-actions">
                    <img src="assets/icons/icon-action-more.svg" alt="Details" style="width:14px;height:14px;">
                  </div>
                </td>
              </tr>
              <!-- ... more rows ... -->
            </tbody>
          </table>
        </div>
      </div>

    </main>
  </div>

</div>

<!-- Drawers -->
<div class="drawer-backdrop" data-drawer="event-detail"></div>
<div class="drawer drawer--lg" id="eventDetailDrawer">
  <div class="drawer__main">
    <div class="drawer__top">
      <span class="drawer__title">Event Details</span>
      <button class="drawer__close">&times;</button>
    </div>
    <div class="drawer__body">
      <!-- Event detail content -->
    </div>
    <div class="drawer__footer">
      <button class="drawer__btn-save">Add to Incident</button>
      <button class="drawer__btn-cancel">Close</button>
    </div>
  </div>
</div>

<!-- Scripts -->
<script src="components/lib/echarts.min.js"></script>
<script src="components/echarts-elegant-theme.js"></script>
<script src="components/echarts-widget.js"></script>
<script src="components/topnavbar.js"></script>
<script src="components/sidemenu.js"></script>
<script src="components/classic-tab.js"></script>
<script src="components/table.js"></script>
<script src="components/drawer.js"></script>
<script src="components/form-input.js"></script>
<script src="components/form-dropdown.js"></script>
<script src="components/icon-engine.js"></script>
<script src="components/notification-banner.js"></script>
<script>
  ElegantEChart.line('report-chart', {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      { name: 'Events', values: [120, 85, 340, 420, 380, 210] }
    ]
  });
</script>
</body>
</html>
```

### Key differences from Shell B

- Uses `sidemenu--type2` variant (flat report tree instead of settings accordion)
- Has an optional quicklink bar above the app-body
- Classic tab contains ONLY the chart area (not the table)
- Table lives outside the classic tab, in its own `.table-scroll-area`
- ActionBar is sticky inside the table scroll area
- Filter inputs use `reports-input-row` pattern with `form-dropdown-wrap`

---

## Shell D — Split Panel (Detail + AI/Properties)

### When to use

- AI Investigation pages
- Incident Detail / Workbench pages
- Playbook Editor
- Correlation detail views
- Any page that needs a left content panel + right properties/AI panel

### Structure

```
TopNavBar → Line Tab → Split Layout (Left panel [scrollable] + Right panel [scrollable])
```

### Structural diagram

```
div.app-shell (height:100vh; flex:column)
 ├── header.topnavbar (h:78px)
 ├── div.app-body (flex:1; overflow:hidden)
 │    └── main.main-content (flex:1; flex:column; overflow:hidden)
 │         ├── div.line-tab (h:40px)
 │         └── div.line-tab__body (flex:1; flex:column; min-height:0)
 │              └── div.line-tab__content--active (flex:1; flex:column)
 │                   └── div.split-layout (flex:row; flex:1; min-height:0)
 │                        ├── div.left-panel (flex:1; overflow-y:auto; pad:0 16px 24px)
 │                        │    ├── div.header-bar (flex; gap:12px; h:48px; border-bottom:1px)
 │                        │    └── [widgets, tables, timeline]
 │                        └── div.right-panel (w:380px; border-left:1px; flex:column)
 │                             ├── div.panel-header (pad:12px 16px)
 │                             ├── div.panel-body (flex:1; overflow-y:auto; pad:16px)
 │                             └── div.panel-footer (pad:12px 16px; border-top:1px)
```

### Required files

| Type | Files |
|------|-------|
| **CSS** | `tokens.css`, `layout.css`, `topnavbar.css`, `line-tab.css`, `widget.css`, `table.css`, `responsive.css` |
| **JS** | `topnavbar.js`, `line-tab.js`, `widget.js`, `table.js`, `lib/echarts.min.js`, `echarts-elegant-theme.js`, `echarts-widget.js` |

### Scroll model

**Two independent scroll areas:**
1. **`.left-panel`** — scrolls the main content (widgets, tables, timeline)
2. **`.right-panel .panel-body`** — scrolls the AI/properties panel

The `line-tab__body` container needs `flex:1; min-height:0` for the split layout to fill remaining space.

### Complete assembly example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Investigation — Log360 Cloud</title>
  <link rel="stylesheet" href="components/tokens.css">
  <link rel="stylesheet" href="components/layout.css">
  <link rel="stylesheet" href="components/topnavbar.css">
  <link rel="stylesheet" href="components/line-tab.css">
  <link rel="stylesheet" href="components/widget.css">
  <link rel="stylesheet" href="components/table.css">
  <link rel="stylesheet" href="components/responsive.css">
  <style>
    .split-layout {
      display: flex;
      flex: 1;
      min-height: 0;
    }
    .left-panel {
      flex: 1;
      overflow-y: auto;
      padding: 0 16px 24px;
    }
    .right-panel {
      width: 380px;
      border-left: 1px solid #E9E9E9;
      display: flex;
      flex-direction: column;
    }
    .header-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      height: 48px;
      border-bottom: 1px solid #E9E9E9;
      padding: 0 0 8px;
    }
    .panel-header {
      padding: 12px 16px;
      border-bottom: 1px solid #E9E9E9;
      font-size: 14px;
      font-weight: 600;
    }
    .panel-body {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }
    .panel-footer {
      padding: 12px 16px;
      border-top: 1px solid #E9E9E9;
      display: flex;
      gap: 8px;
    }
  </style>
</head>
<body>
<div class="app-shell">

  <!-- TOPNAVBAR -->
  <header class="topnavbar" data-active-tab="Alerts">
    <!-- ... full topnavbar HTML ... -->
  </header>

  <div class="app-body">
    <main class="main-content" style="padding:0;">

      <!-- LINE TAB -->
      <div class="line-tab">
        <div class="line-tab__headers">
          <button class="line-tab__header line-tab__header--selected" data-tab="investigation">Investigation</button>
          <button class="line-tab__header" data-tab="timeline">Timeline</button>
          <button class="line-tab__header" data-tab="evidence">Evidence</button>
        </div>
      </div>

      <!-- LINE TAB BODY -->
      <div class="line-tab__body" style="flex:1; display:flex; flex-direction:column; min-height:0;">
        <div class="line-tab__content line-tab__content--active" data-tab-content="investigation"
             style="flex:1; display:flex; flex-direction:column;">

          <!-- SPLIT LAYOUT -->
          <div class="split-layout">

            <!-- LEFT PANEL (main content) -->
            <div class="left-panel scrollbar-thin">
              <div class="header-bar">
                <h2 style="font-size:16px; font-weight:600;">INC-2026-0042</h2>
                <span class="sev-badge sev-badge--critical">Critical</span>
              </div>

              <!-- Summary widget -->
              <div class="widget" style="margin-top:16px;">
                <div class="widget__header">
                  <span class="widget__title">Attack Summary</span>
                </div>
                <div class="widget__body">
                  <p style="font-size:12px; color:#626262; line-height:1.6;">
                    Suspicious process execution detected on endpoint WKS-042. The process
                    chain indicates potential lateral movement following initial access via
                    phishing email attachment.
                  </p>
                </div>
              </div>

              <!-- Chart widget -->
              <div class="widget" style="margin-top:4px;">
                <div class="widget__header">
                  <span class="widget__title">Event Timeline</span>
                </div>
                <div class="widget__body">
                  <div id="timeline-chart" style="width:100%;min-height:200px;"></div>
                </div>
              </div>

              <!-- Affected entities table -->
              <div class="widget" style="margin-top:4px;">
                <div class="widget__header">
                  <span class="widget__title">Affected Entities</span>
                </div>
                <div class="widget__body" style="padding:0;">
                  <table class="data-table">
                    <colgroup>
                      <col style="width:30%">
                      <col style="width:25%">
                      <col style="width:25%">
                      <col style="width:20%">
                    </colgroup>
                    <thead>
                      <tr>
                        <th>Entity</th>
                        <th>Type</th>
                        <th>Risk Score</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>WKS-042</td>
                        <td>Endpoint</td>
                        <td>92</td>
                        <td><span class="sev-badge sev-badge--critical">Critical</span></td>
                      </tr>
                      <tr>
                        <td>john.doe@corp.local</td>
                        <td>User</td>
                        <td>85</td>
                        <td><span class="sev-badge sev-badge--high">High</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- RIGHT PANEL (AI / Properties) -->
            <div class="right-panel">
              <div class="panel-header">AI Investigation</div>
              <div class="panel-body scrollbar-thin">
                <div style="font-size:12px; color:#626262; line-height:1.8;">
                  <p><strong>Insights:</strong></p>
                  <p>The attack chain shows a classic spear-phishing → malware execution →
                     lateral movement pattern. MITRE ATT&CK techniques identified:</p>
                  <ul style="padding-left:16px; margin-top:8px;">
                    <li>T1566.001 — Spearphishing Attachment</li>
                    <li>T1059.001 — PowerShell Execution</li>
                    <li>T1021.002 — SMB/Windows Admin Shares</li>
                  </ul>
                  <p style="margin-top:12px;"><strong>Recommended Actions:</strong></p>
                  <ul style="padding-left:16px; margin-top:8px;">
                    <li>Isolate WKS-042 from network</li>
                    <li>Reset credentials for john.doe</li>
                    <li>Scan all endpoints for IOCs</li>
                  </ul>
                </div>
              </div>
              <div class="panel-footer">
                <button class="btn-primary">Apply Remediation</button>
                <button class="btn-tertiary">Dismiss</button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </main>
  </div>
</div>

<!-- Scripts -->
<script src="components/lib/echarts.min.js"></script>
<script src="components/echarts-elegant-theme.js"></script>
<script src="components/echarts-widget.js"></script>
<script src="components/topnavbar.js"></script>
<script src="components/line-tab.js"></script>
<script>
  ElegantEChart.line('timeline-chart', {
    labels: ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30'],
    datasets: [
      { name: 'Events', values: [2, 5, 12, 8, 24, 18, 6] }
    ]
  });
</script>
</body>
</html>
```

---

## How to Choose a Shell

### Decision tree

```
Is the page a dashboard / overview with widgets and charts?
  └── YES → Shell A (Dashboard)
  └── NO ↓

Does the page have a sidebar + forms/settings + table?
  └── YES → Shell B (Settings)
  └── NO ↓

Does the page have a sidebar + report chart + data table?
  └── YES → Shell C (Reports)
  └── NO ↓

Does the page need a left/right split panel layout?
  └── YES → Shell D (Split Panel)
  └── NO ↓

None fit → Create a custom shell (see below)
```

### Quick lookup table

| If the feature is under... | Use Shell | Contains |
|---|---|---|
| Home (Dashboard) | **A** | line-tab + dash grid + widgets + charts |
| Reports | **C** | sidemenu type2 + chart + table + drawers |
| Compliance | **C** | sidemenu type2 + chart + table + drawers |
| Settings | **B** | sidemenu + classic-tab + forms + table |
| Security / Threat Hub | **A** | line-tab + toolbar + dash grid |
| Alerts (main view) | **A** or **B** | depends on sub-page |
| Cloud Protection | **A** | line-tab + dash grid |
| Any detail / investigation | **D** | split panel (left detail + right AI/properties) |
| Incident Workbench | **D** | split panel |

### Tab → Shell → Screenshot folder mapping

| User request contains | Tab folder | Shell | Sidemenu? |
|---|---|---|---|
| "report", "logon", "events", "audit" | `REPORTS TAB/` | C | Yes (type2) |
| "setting", "config", "admin", "device management" | `Settings TAB/` | B | Yes |
| "dashboard", "overview", "home", "trend" | `DASHBOARD TAB/` | A | No |
| "compliance", "PCI", "HIPAA", "SOX" | `COMPLIANCE TAB/` | C | Yes |
| "alert", "alert profile", "investigation" | `ALERTS TAB/` | A/B | Depends |
| "security", "rule", "detection" | `Security TAB/` | A | No |
| "search", "query", "log search" | `SEARCH TAB/` | Custom | No |
| "cloud protection", "shadow apps" | `CLOUD PROTECTION TAB/` | A | No |
| "incident", "workbench" | `Incident workbench.../` | D | No |

---

## Creating Custom Shells

### When none of the 4 predefined shells fit

Some features may require a page structure that doesn't match any predefined shell — for example, a drag-and-drop workflow editor, a full-screen map view, or a multi-pane editor. In these cases, create a **new shell** that follows Elegant structural principles.

### Custom shell requirements

Every custom shell MUST follow these structural rules:

1. **Root container:** `div.app-shell` with `height:100vh; display:flex; flex-direction:column`
2. **TopNavBar:** `header.topnavbar` at the top (h:78px) — always present
3. **Flex containment:** Every ancestor between `.app-shell` and the scrollable area must have `flex:1; min-height:0; overflow:hidden`
4. **Single scroll:** Designate exactly ONE scrollable container (or two for split layouts)
5. **All colors from tokens:** Never hardcode hex outside the token palette
6. **8-point grid spacing:** All padding/margin/gap from `4|8|12|16|20|24` (24px max)
7. **Zoho Puvi font:** Never use Inter, Roboto, Arial, or any other font
8. **Border radius:** 4px for cards, 2px for inputs/buttons
9. **No foreign libraries:** Zero Bootstrap, Tailwind, Material, Font Awesome

### Custom shell template

```html
<div class="app-shell">
  <!-- TopNavBar (always present) -->
  <header class="topnavbar" data-active-tab="YourTab">
    <!-- ... -->
  </header>

  <!-- Optional: line-tab or toolbar -->

  <!-- Main body area -->
  <div class="app-body">
    <!-- Your custom layout here -->
    <!-- Ensure proper flex containment chain -->
    <!-- Designate ONE scrollable container -->
  </div>
</div>
```

### Example: Full-screen map shell

```css
.map-shell { flex: 1; display: flex; flex-direction: column; min-height: 0; }
.map-toolbar { height: 40px; display: flex; align-items: center; padding: 0 16px; border-bottom: 1px solid #E9E9E9; }
.map-container { flex: 1; min-height: 0; position: relative; }
```

### Shell adaptability principle

Shells are **starting templates, not rigid constraints**. You may:
- Add new inputs, buttons, or toolbar items to any shell
- Extend the content area with new component patterns
- Combine elements from different shells if the feature demands it
- Create entirely new layout patterns using Elegant tokens

The goal is that the user cannot tell whether a page uses a predefined shell or a custom one — the visual language is always consistent.

---

## Scroll Rules Summary (All Shells)

| Shell | Scrollable element | CSS |
|-------|-------------------|-----|
| A (Dashboard) | `.dash` | `flex:1; overflow-y:auto;` |
| B (Settings) | `.table-scroll-area` or `.classic-tab__body` | `flex:1; overflow-y:auto;` |
| C (Reports) | `.table-scroll-area` | `flex:1; overflow-y:auto; min-height:0;` |
| D (Split Panel) | `.left-panel` AND `.right-panel .panel-body` | `overflow-y:auto;` on each |

### Required on EVERY page

```css
html, body { height: 100%; margin: 0; overflow: hidden; }
.app-shell  { height: 100vh; display: flex; flex-direction: column; overflow: hidden; }
```

### Flex containment chain (MANDATORY)

Every ancestor between `.app-shell` and the scrollable element MUST have:

```css
.parent { flex: 1; display: flex; flex-direction: column; min-height: 0; overflow: hidden; }
```

If ANY ancestor is missing `min-height:0` or `overflow:hidden`, the scroll breaks and the page overflows.
