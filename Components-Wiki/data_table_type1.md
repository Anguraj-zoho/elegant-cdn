# Data Table — Type 1

> Component: Data Table Type 1
> CSS: `table.css` | JS: `table.js` | HTML ref: `table.html`

## ⚠ Critical Rules (READ BEFORE BUILDING)

- **Use Type 1 for Reports, Compliance, Settings — any flat list.** For alert/incident card rows use Type 2 (distinct `.t2-*` classes; do NOT mix).
- **`.table-scroll-area` is the SOLE scroll container on Shell C.** It takes `flex:1; overflow-y:auto; min-height:0`. Every ancestor from `.app-shell` down must have `min-height:0; overflow:hidden` — missing any one breaks the scroll and the table "disappears".
- **`.table-scroll-area` is a SIBLING of `.classic-tab`**, NOT a child. On Reports pages, classic-tab contains only the chart; the table lives outside.
- **Action buttons use `.btn-primary` / `.btn-secondary` / `.btn-tertiary`** from `tokens.css` + `table.css`. Never inline-style them.
- **Checkboxes inside cells use `.form-checkbox`** (see `form_input.md`), never raw `<input type=checkbox>` (renders native green on macOS).

---

## Quick Summary

**Standard flat data table** — a traditional columnar table with a fixed header row and uniform body rows. Each row is 40px tall, the header is 32px tall. Supports checkbox selection (3-state via `table.js`), action icon columns, icon+text cells, status badge cells, link cells, and plain text cells. This is the workhorse table used across most Log360 Cloud tabs (Reports, Compliance, Settings, etc.) wherever data is presented in a flat, non-hierarchical list.

Rows are separated by 1px `#E9E9E9` horizontal lines with no left/right borders (matching the Figma spec). Hover, selected, and focused states are built in.

---

## Configuration

| Setting | How to configure |
|---|---|
| **Number of columns** | Add/remove `<col>` in `<colgroup>` and corresponding `<th>` / `<td>` |
| **Column widths** | Set `style="width:Npx;"` on each `<col>` element |
| **Column headers** | Change text inside `<th>` elements |
| **Checkbox column** | First `<col>` at 48px, `<th class="cell-checkbox">`, `<td class="cell-checkbox">` |
| **Row data** | Add `<tr>` elements in `<tbody>` (static or via JS) |
| **Sort indicators** | Not built-in for Type 1; add custom sort arrows in `<th>` if needed |
| **Scroll containment** | Wrap in `.table-scroll-area` for sticky header + action bar |

### Data Attributes

| Attribute | Element | Purpose |
|---|---|---|
| `data-checked` | `.cell-checkbox` | Managed by `table.js` — `"unchecked"`, `"checked"`, or `"indeterminate"` |
| `data-ab-action` | `.actionbar__action` | Tags a bulk-action button for state management |
| `data-ab-state` | `.ab-state-btn` | ActionBar state switcher: `"default"`, `"hover"`, `"active"` |
| `data-ab-target` | `.ab-state-btn` | ID of the ActionBar container to apply state to |

---

## Required Icons

### Checkbox Icons (auto-managed by `table.js` — replaced with inline SVG)
| Icon | File | Description |
|---|---|---|
| Unchecked | `icon-checkbox.svg` | White fill, `#ABABAB` border |
| Checked | `icon-checkbox-checked.svg` | `#2C66DD` blue fill, white checkmark |
| Indeterminate | `icon-checkbox-indeterminate.svg` | White fill, `#2C66DD` border + blue dash |

### Action Icons (24×24, used in `.cell-actions`)
| Icon | File | Description |
|---|---|---|
| Approve | `icon-action-approve.svg` | Approve/accept row action |
| Edit | `icon-action-edit.svg` | Edit row action |
| Delete | `icon-action-delete.svg` | Delete row action |
| More | `icon-action-more.svg` | Overflow/more actions |

### Agent Icon (14×14, used in `.cell-icon-text`)
| Icon | File | Description |
|---|---|---|
| Agent | `icon-agent.svg` | Agent identifier icon |

### Status Icons (14×14, used in `.cell-status`)
| Icon | File | Status |
|---|---|---|
| `icon-status-success.svg` | Green checkmark | Success |
| `icon-status-warning.svg` | Amber triangle | Warning |
| `icon-status-stopped.svg` | Red circle X | Stopped |
| `icon-status-on-hold.svg` | Blue pause | On hold |
| `icon-status-not-started.svg` | Gray circle | Not started |
| `icon-status-partial.svg` | Orange half-circle | Partial |
| `icon-status-waiting.svg` | Blue hourglass | Waiting |
| `icon-status-partial-success.svg` | Green half-check | Partial Success |
| `icon-status-info-low.svg` | Blue circle i | Info - low |
| `icon-status-skipped.svg` | Gray skip arrow | Skipped |
| `icon-status-info-medium.svg` | Orange circle i | Info - Medium |
| `icon-status-info-high.svg` | Red circle i | Info - High |
| `icon-status-disabled.svg` | Red circle X | Disabled |
| `icon-status-enabled.svg` | Green checkmark | Enabled |

---

## Complete HTML

```html
<!--
  ============================================================
  DATA TABLE — Predefined HTML Component
  ============================================================

  CONFIGURATION:
  - Columns:     Update <colgroup> widths and <th> headers
  - Body:        Populate <tbody> with rows (static or via JS)
  - Column types: Use these cell classes:
      .cell-checkbox    — 16x16 checkbox (auto-handled by table.js)
      .cell-actions     — Row of 24x24 action icons, gap 8px
      .cell-icon-text   — 14x14 icon + text, gap 8px
      .cell-status      — 14x14 status icon + text, gap 6px
      .cell-link        — Blue clickable link text
      (plain <td>)      — Regular text cell

  CHECKBOX BEHAVIOUR (powered by table.js):
    table.js auto-replaces any <img> inside .cell-checkbox with inline SVG.
    Three visual states from Figma Elegant 1.0:
      unchecked     — white fill, #ABABAB border
      checked       — #2C66DD blue fill, white checkmark
      indeterminate — white fill, #2C66DD border + blue dash

    - Click a body checkbox  → toggles checked/unchecked, row gets
      .data-table__row--selected (light blue bg)
    - Header checkbox:
        all unchecked → click → checks ALL rows
        all checked   → click → unchecks ALL rows
        some checked  → header shows indeterminate; click → checks ALL
    - Fires custom event "table:selectionchange" on the <table>
      with detail { selectedIndices: [...], count: N }

    Public JS API (window.TableCheckbox):
      TableCheckbox.getSelectedRows(tableEl)   → Array of <tr>
      TableCheckbox.getSelectedCount(tableEl)   → Number
      TableCheckbox.selectAll(tableEl)
      TableCheckbox.deselectAll(tableEl)

  AVAILABLE COLUMN ICONS:
    Checkbox:  icon-checkbox.svg / icon-checkbox-checked.svg /
               icon-checkbox-indeterminate.svg  (SVGs in assets/icons)
    Actions:   icon-action-approve.svg, icon-action-edit.svg,
               icon-action-delete.svg, icon-action-more.svg
    Agent:     icon-agent.svg
    Status (14 types):
      icon-status-success.svg         — Success (green checkmark)
      icon-status-warning.svg         — Warning (amber triangle)
      icon-status-stopped.svg         — Stopped (red circle X)
      icon-status-on-hold.svg         — On hold (blue pause)
      icon-status-not-started.svg     — Not started (gray circle)
      icon-status-partial.svg         — Partial (orange half-circle)
      icon-status-waiting.svg         — Waiting (blue hourglass)
      icon-status-partial-success.svg — Partial Success (green half-check)
      icon-status-info-low.svg        — Info - low (blue circle i)
      icon-status-skipped.svg         — Skipped (gray skip arrow)
      icon-status-info-medium.svg     — Info - Medium (orange circle i)
      icon-status-info-high.svg       — Info - High (red circle i)
      icon-status-disabled.svg        — Disabled (red circle X)
      icon-status-enabled.svg         — Enabled (green checkmark)

  STATUS ICON JS MAP (use in inline <script> for data population):
    var statusMap = {
      'Success':         'icon-status-success.svg',
      'Warning':         'icon-status-warning.svg',
      'Stopped':         'icon-status-stopped.svg',
      'On hold':         'icon-status-on-hold.svg',
      'Not started':     'icon-status-not-started.svg',
      'Partial':         'icon-status-partial.svg',
      'Waiting':         'icon-status-waiting.svg',
      'Partial Success': 'icon-status-partial-success.svg',
      'Info - low':      'icon-status-info-low.svg',
      'Skipped':         'icon-status-skipped.svg',
      'Info - Medium':   'icon-status-info-medium.svg',
      'Info - High':     'icon-status-info-high.svg',
      'Disabled':        'icon-status-disabled.svg',
      'Enabled':         'icon-status-enabled.svg'
    };

  TABLE ROW COLORS:
    Header bg:           #F5F5F5  (--table-header-bg)
    Row hover:           #FAFAFA  (--table-hover-bg)
    Row selected:        #F9FBFF  (--table-selected-bg)
    Row selected+hover:  #F0F5FF  (--table-selected-hover-bg)

  CSS:  tokens.css + table.css
  JS:   table.js  (checkbox 3-state toggle, row highlight, refresh spin)
  ============================================================
-->

<div class="data-table-wrap">
  <table class="data-table">
    <colgroup>
      <col style="width:48px;" />   <!-- Checkbox -->
      <col style="width:130px;" />  <!-- Actions -->
      <col style="width:120px;" />  <!-- Column 1 -->
      <col style="width:140px;" />  <!-- Column 2 -->
      <col style="width:130px;" />  <!-- Column 3 -->
      <col style="width:155px;" />  <!-- Column 4 -->
      <col style="width:100px;" />  <!-- Column 5 -->
      <col style="width:90px;" />   <!-- Column 6 -->
      <col style="width:130px;" />  <!-- Column 7 -->
    </colgroup>
    <thead>
      <tr>
        <th class="cell-checkbox"><img src="../assets/icons/icon-checkbox.svg" alt="" /></th>
        <th>Actions</th>
        <th>Column 1</th>
        <th>Column 2</th>
        <th>Column 3</th>
        <th>Column 4</th>
        <th>Column 5</th>
        <th>Column 6</th>
        <th>Column 7</th>
      </tr>
    </thead>
    <tbody>
      <!-- Static row example: -->
      <!--
      <tr>
        <td class="cell-checkbox"><img src="../assets/icons/icon-checkbox.svg" alt="" /></td>
        <td>
          <div class="cell-actions">
            <img src="../assets/icons/icon-action-approve.svg" alt="Approve" />
            <img src="../assets/icons/icon-action-edit.svg" alt="Edit" />
            <img src="../assets/icons/icon-action-delete.svg" alt="Delete" />
            <img src="../assets/icons/icon-action-more.svg" alt="More" />
          </div>
        </td>
        <td>Value</td>
        <td>Value</td>
        <td>
          <div class="cell-icon-text">
            <img src="../assets/icons/icon-agent.svg" alt="" />
            <span>Agent name</span>
          </div>
        </td>
        <td>2026-01-13 15:51:34</td>
        <td>-</td>
        <td>
          <div class="cell-status">
            <img src="../assets/icons/icon-status-disabled.svg" alt="" />
            <span>Disabled</span>
          </div>
        </td>
        <td><a href="#" class="cell-link">View Reports</a></td>
      </tr>
      -->
    </tbody>
  </table>
</div>
```

---

## Complete CSS

```css
/* ============================================================
   TABLE + ACTIONBAR — Captured from Figma MCP
   ActionBar: h=36, padding 6px 4px, bg=white, stroke #E9E9E9
   Table: header h=32, row h=40, col gap via padding
   Actions icons: 24x24 each, gap 8px
   Agent/Status: 14x14 icon + text, gap 8px
   Checkbox col: 48px
   ============================================================ */

/* ── Button Row (above ActionBar) ── */
.button-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: var(--button-row-padding-top);
  padding-bottom: var(--button-row-padding-bottom);
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  height: var(--btn-primary-height);
  padding: var(--btn-primary-padding);
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  font-size: var(--btn-primary-font-size);
  font-family: inherit;
  font-weight: 400;
  border: none;
  border-radius: var(--btn-primary-radius);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
  line-height: 1;
}
.btn-primary:hover {
  background: #2458C4;
}
/* Icons inside .btn-primary MUST render white on the blue fill.
   - <img src="*.svg"> with a black stroke/fill: invert to #FFFFFF via filter.
   - Inline <svg> using currentColor: inherits the button's white text color. */
.btn-primary img,
.btn-primary svg {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  color: #FFFFFF;
  fill: #FFFFFF;
  stroke: #FFFFFF;
}
.btn-primary img,
.btn-primary svg {
  filter: brightness(0) invert(1);
}
.btn-primary:disabled img,
.btn-primary:disabled svg,
.btn-primary[disabled] img,
.btn-primary[disabled] svg {
  /* Keep icon white even when the button is disabled (opacity on the button handles the muted look). */
  filter: brightness(0) invert(1);
}

/* ── Secondary Button (Figma: 740:68772) ────────────────────────────────
   White fill, 1px #2C66DD border, blue text + blue icons.
   Icons use stroke="currentColor" so they inherit the button's blue color —
   no filter hack needed. Height 28px matches primary so they align in rows.
   ──────────────────────────────────────────────────────────────────── */
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: var(--btn-secondary-height);
  padding: var(--btn-secondary-padding);
  background: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
  font-family: inherit;
  font-size: var(--btn-secondary-font-size);
  font-weight: 400;
  line-height: 1;
  border: 1px solid var(--btn-secondary-border);
  border-radius: var(--btn-secondary-radius);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.btn-secondary:hover {
  background: var(--btn-secondary-hover-bg);
}
.btn-secondary:disabled,
.btn-secondary[disabled] {
  opacity: var(--btn-secondary-disabled-opacity);
  cursor: not-allowed;
  pointer-events: none;
}
/* Icons inside .btn-secondary render BLUE (#2C66DD).
   - <img src="icon-btn-*.svg">  → the SVG files have hard-coded stroke="#2C66DD"
     (external SVG loaded via <img> does NOT inherit parent CSS color, so we
     bake the color into the asset. This matches how icon-plus.svg / icon-help.svg
     work elsewhere in the library.)
   - Inline <svg stroke="currentColor"> → inherits the button's text color (#2C66DD).
   Both approaches produce identical blue icons. */
.btn-secondary svg {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
}
.btn-secondary img,
.btn-secondary svg {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}

/* ── Tertiary Button (Figma: 740:68997) ─────────────────────────────────
   White outlined neutral button. White fill, 1px #ABABAB solid grey border,
   black text + black icons. Same 28px height as primary/secondary for
   row-baseline alignment — distinguished from Secondary ONLY by border
   color (grey vs blue). Used for low-emphasis supporting actions such as
   "Clear", "Reset", "Skip", "Add Filter", inline table-row actions, or a
   third option in a multi-action row.

   Text (#000000) and icon (#000000) are the same color in the current
   spec, but we keep separate --btn-tertiary-text and --btn-tertiary-icon
   tokens so future Figma updates can diverge them without a CSS rewrite.
   ──────────────────────────────────────────────────────────────────── */
.btn-tertiary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: var(--btn-tertiary-height);
  padding: var(--btn-tertiary-padding);
  background: var(--btn-tertiary-bg);
  color: var(--btn-tertiary-text);
  font-family: inherit;
  font-size: var(--btn-tertiary-font-size);
  font-weight: 400;
  line-height: 1;
  border: 1px solid var(--btn-tertiary-border);
  border-radius: var(--btn-tertiary-radius);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, border-color 0.15s;
}
.btn-tertiary:hover {
  background: var(--btn-tertiary-hover-bg);
}
.btn-tertiary:disabled,
.btn-tertiary[disabled] {
  opacity: var(--btn-tertiary-disabled-opacity);
  cursor: not-allowed;
  pointer-events: none;
}
/* Icons inside .btn-tertiary render BLACK (#000000).
   - <img src="icon-btn-*-dark.svg">  → the *-dark.svg files have hard-coded
     stroke="#000000" (external SVG loaded via <img> does NOT inherit parent
     CSS color, so we bake the color into the asset).
   - Inline <svg stroke="currentColor"> → set an inline style or inherits
     from a CSS rule that sets color to --btn-tertiary-icon.
   Both approaches produce identical black icons. */
.btn-tertiary svg {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  fill: none;
  stroke: var(--btn-tertiary-icon);
  color: var(--btn-tertiary-icon);
}
.btn-tertiary img,
.btn-tertiary svg {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}

/* ── ActionBar ── */
.actionbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--actionbar-height);               /* 36px */
  border-top: 1px solid #E9E9E9;                 /* Figma: strokeTop only */
  background: var(--actionbar-bg);
  padding: 6px 4px;                              /* Figma: padding 6 4 6 4 */
}

.actionbar__left,
.actionbar__right {
  display: flex;
  align-items: center;
  gap: 8px;                                       /* Figma: itemSpacing 8 */
}

.actionbar__icon-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 3px;
  padding: 0;
  transition: background 0.12s;
}
.actionbar__icon-btn:hover {
  background: var(--table-header-bg);
}
.actionbar__icon-btn img,
.actionbar__icon-btn svg {
  width: 24px;
  height: 24px;
}

/* View-type combined icon (grid + dropdown arrow) */
.actionbar__icon-btn--view img,
.actionbar__icon-btn--view svg {
  width: 42px;
  height: 24px;
}
.actionbar__icon-btn--view {
  width: auto;
}

.actionbar__separator {
  width: 1px;
  height: 16px;
  background: var(--actionbar-border);
  flex-shrink: 0;
}

.actionbar__pagination {
  font-size: var(--actionbar-pagination-font-size);
  color: var(--sidebar-text-secondary);
  white-space: nowrap;
}
.actionbar__pagination b {
  color: var(--table-text-primary);
  font-weight: 600;
}
.actionbar__pagination i {
  font-style: italic;
}

/* Pagination prev/next arrows (24x24) */
.actionbar__nav-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
}
.actionbar__nav-btn img,
.actionbar__nav-btn svg {
  width: 14px;
  height: 14px;
}

/* ── Report ActionBar Primary Button (Type 8) ──
   Outlined secondary-style button with icon + label,
   used on the LEFT side of report-page action bars.
   Default use: "+ Incident" to trigger Incident Workbench.
   Also reusable for "+ Export", "+ Save View", etc. */
.actionbar__btn-report {
  height: 24px;
  border: 1px solid #ABABAB;
  border-radius: 2px;
  padding: 5px 16px;
  font-size: 12px;
  font-family: var(--font-family);
  background: #FFFFFF;
  color: #000000;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  box-sizing: border-box;
  transition: background 0.12s;
}
.actionbar__btn-report:hover {
  background: #F0F0F0;
}
.actionbar__btn-report:active {
  background: #E9E9E9;
}
.actionbar__btn-report img,
.actionbar__btn-report svg {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}

/* ── ActionBar Bulk Actions (Type 2) ── */
.actionbar__actions {
  display: flex;
  align-items: center;
  gap: 4px;
}
.actionbar__action {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  border: none;
  background: #fff;
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  color: #000;
  border-radius: 2px;
  white-space: nowrap;
  transition: background 0.12s;
}
.actionbar__action:hover {
  background: #E9E9E9;
}
.actionbar__action.actionbar__action--active {
  background: #EAF0FC;
}
.actionbar__action img,
.actionbar__action svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
.actionbar__action--more {
  padding: 5px 6px;
}
.actionbar__action--more img,
.actionbar__action--more svg {
  width: 14px;
  height: 14px;
}

/* ── ActionBar Selected Count (Type 7) ── */
.actionbar__selected-count {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #000;
  white-space: nowrap;
}
.actionbar__selected-count b {
  font-weight: 600;
}
.actionbar__clear-all {
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  color: var(--link-color);
  padding: 0;
}
.actionbar__clear-all:hover {
  text-decoration: underline;
}

/* ── ActionBar Filter Dropdown (Type 5) ── */
.actionbar__filter-dropdown {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #000;
  white-space: nowrap;
}
.actionbar__filter-dropdown select {
  border: 1px solid #DCDCDC;
  border-radius: 3px;
  font-family: inherit;
  font-size: 12px;
  padding: 2px 20px 2px 6px;
  height: 24px;
  background: #fff;
  cursor: pointer;
  appearance: auto;
}

/* ── ActionBar Toggle View (Type 6) ── */
.actionbar__icon-btn--toggle {
  width: auto;
}
.actionbar__icon-btn--toggle img,
.actionbar__icon-btn--toggle svg {
  width: 50px;
  height: 20px;
}

/* ── ActionBar Table View Type (Type 4) ── */
.actionbar__icon-btn--table-view {
  width: auto;
}
.actionbar__icon-btn--table-view img,
.actionbar__icon-btn--table-view svg {
  width: 42px;
  height: 24px;
}

/* ── Table Scroll Containment Chain ──
   For .table-scroll-area to be the SOLE scroll container, every ancestor must
   be height-constrained with overflow:hidden. The chain:
     html,body { overflow:hidden; height:100% }
     .app-shell { height:100vh; flex column }        — already in layout.css
     .app-body  { overflow:hidden; min-height:0 }    — add via page override
     .main-content { overflow:hidden; min-height:0 } — add via page override
     .table-scroll-area { flex:1; overflow-y:auto }   — the ONLY scrollbox
   Without overflow:hidden on ancestors, content overflows to the browser
   viewport scrollbar and the entire page scrolls — the #1 bug we keep fixing.
   HTML: <div class="table-scroll-area"> <div class="actionbar">…</div> <div class="data-table-wrap">…</div> </div>
   MUST be placed AFTER predefined CSS in the cascade (page-scoped <style> or inline). */
.table-scroll-area {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}
.table-scroll-area .data-table-wrap { overflow: visible; }
.table-scroll-area .data-table { border-collapse: separate; border-spacing: 0; table-layout: fixed; width: 100%; }
.table-scroll-area .data-table td,
.table-scroll-area .data-table th { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.table-scroll-area .data-table tbody tr  { border-top: none; border-bottom: none; }
.table-scroll-area .data-table tbody td  { border-top: 1px solid #E9E9E9; }
.table-scroll-area .data-table tbody tr:last-child td { border-bottom: 1px solid #E9E9E9; }
.table-scroll-area .data-table thead tr  { background: transparent; }
.table-scroll-area .actionbar {
  position: sticky; top: 0; z-index: 3;
  background: var(--actionbar-bg, #FFFFFF);
}
.table-scroll-area .data-table thead th {
  position: sticky; top: 36px; z-index: 2;
  background: var(--table-header-bg, #FAFAFA);
  border-top: 1px solid #E9E9E9;
  box-shadow: inset 0 -1px 0 #E9E9E9;
}
.classic-tab + .table-scroll-area { margin-top: 16px; }

/* ── Data Table ── */
.data-table-wrap {
  overflow-x: auto;
  /* Figma: NO left/right border on table — only horizontal row lines */
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--table-font-size);
  line-height: 1.5;
}

.data-table thead tr {
  background: var(--table-header-bg);
}

.data-table th {
  height: var(--table-header-height);             /* 32px */
  padding: 0 8px;
  border-top: 1px solid #E9E9E9;                 /* Figma: strokeTop only */
  border-bottom: none;
  text-align: left;
  vertical-align: middle;
  font-weight: var(--table-header-font-weight);   /* 500 Medium */
  color: var(--table-header-color);               /* BLACK */
  font-size: var(--table-header-font-size);
  white-space: nowrap;
}

.data-table td {
  height: var(--table-row-height);                /* 40px */
  padding: 0 8px;
  vertical-align: middle;
  color: var(--table-text-primary);
}

.data-table tbody tr {
  border-top: 1px solid #E9E9E9;                 /* Figma: strokeTop=1 */
  border-bottom: 1px solid #E9E9E9;              /* Figma: strokeBottom=1 */
  /* NO left/right borders — Figma: strokeLeft=0, strokeRight=0 */
  transition: background 0.1s;
}
.data-table tbody tr:hover {
  background: var(--table-hover-bg);
}
.data-table tbody tr.data-table__row--selected {
  background: var(--table-selected-bg, #F9FBFF);
}
.data-table tbody tr.data-table__row--selected:hover {
  background: var(--table-selected-hover-bg, #F0F5FF);
}
.data-table tbody tr.data-table__row--focused {
  background: var(--table-hover-bg, #FAFAFA);
}

/* ── Cell: Actions (24x24 icons, gap 8px) ── */
.cell-actions {
  display: flex;
  align-items: center;
  gap: 8px;                                       /* Figma: itemSpacing 8 */
}
.cell-actions img,
.cell-actions svg {
  width: 24px;
  height: 24px;
  cursor: pointer;
  flex-shrink: 0;
}

/* ── Cell: Icon + Text (Agent column, 14x14 icon + text) ── */
.cell-icon-text {
  display: flex;
  align-items: center;
  gap: 8px;                                       /* Figma: Slot 4 itemSpacing 8 */
}
.cell-icon-text img,
.cell-icon-text svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* ── Cell: Status (14x14 icon + text) ── */
.cell-status {
  display: flex;
  align-items: center;
  gap: 6px;
}
.cell-status img,
.cell-status svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* ── Cell: Link ── */
.cell-link {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.15s;
}
.cell-link:hover {
  text-decoration: underline;
  color: var(--link-hover);
}

/* ── Cell: Checkbox (16x16 checkbox, padding-left 8px) ── */
.cell-checkbox {
  width: 48px;
  padding-left: 8px !important;
  text-align: left;
}
.cell-checkbox img,
.cell-checkbox svg {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  display: block;
}
```

---

## JavaScript API

```js
/* ============================================================
   TABLE — Predefined JavaScript
   Checkbox selection (3-state), row highlight, actionbar refresh.
   Include via: <script src="../predefined-components/table.js"></script>
   ============================================================ */

(function () {
  'use strict';

  /* ── SVG templates for the 3 checkbox states (from Figma Elegant 1.0) ── */
  var SVG_UNCHECKED =
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="0.5" y="0.5" width="15" height="15" rx="1.5" fill="white" stroke="#ABABAB"/>' +
    '</svg>';

  var SVG_CHECKED =
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0H2Z" fill="#2C66DD"/>' +
    '<path d="M12 5.5L6.5 10.5L4 8.22727" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  var SVG_INDETERMINATE =
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="0.5" y="0.5" width="15" height="15" rx="1.5" fill="white" stroke="#2C66DD"/>' +
    '<rect x="4" y="7" width="8" height="1.5" rx="0.75" fill="#2C66DD"/>' +
    '</svg>';

  /* ── Checkbox State Machine ── */

  function setCheckboxState(cell, state) {
    if (!cell) return;
    cell.setAttribute('data-checked', state);
    if (state === 'checked') {
      cell.innerHTML = SVG_CHECKED;
    } else if (state === 'indeterminate') {
      cell.innerHTML = SVG_INDETERMINATE;
    } else {
      cell.innerHTML = SVG_UNCHECKED;
    }
  }

  function getCheckboxState(cell) {
    return cell ? (cell.getAttribute('data-checked') || 'unchecked') : 'unchecked';
  }

  function isRowChecked(row) {
    var cb = row.querySelector('.cell-checkbox');
    return cb && getCheckboxState(cb) === 'checked';
  }

  /* ── Header ↔ Body sync ── */

  function syncHeaderCheckbox(table) {
    var headerCb = table.querySelector('thead .cell-checkbox');
    var bodyRows = table.querySelectorAll('tbody tr');
    if (!headerCb || bodyRows.length === 0) return;

    var total = 0;
    var checked = 0;
    bodyRows.forEach(function (row) {
      var cb = row.querySelector('.cell-checkbox');
      if (cb) {
        total++;
        if (getCheckboxState(cb) === 'checked') checked++;
      }
    });

    if (checked === 0) {
      setCheckboxState(headerCb, 'unchecked');
    } else if (checked === total) {
      setCheckboxState(headerCb, 'checked');
    } else {
      setCheckboxState(headerCb, 'indeterminate');
    }
  }

  function updateRowHighlight(row) {
    if (isRowChecked(row)) {
      row.classList.add('data-table__row--selected');
    } else {
      row.classList.remove('data-table__row--selected');
    }
  }

  /* ── Initialise checkbox interactions per table ── */

  function initCheckboxes() {
    document.querySelectorAll('.data-table').forEach(function (table) {
      var headerCb = table.querySelector('thead .cell-checkbox');
      var bodyRows = table.querySelectorAll('tbody tr');

      // Replace existing <img> checkboxes with inline SVG (unchecked default)
      table.querySelectorAll('.cell-checkbox').forEach(function (cell) {
        setCheckboxState(cell, 'unchecked');
        cell.style.cursor = 'pointer';
      });

      // Header checkbox: click → select all / deselect all
      if (headerCb) {
        headerCb.addEventListener('click', function (e) {
          e.stopPropagation();
          var currentState = getCheckboxState(headerCb);
          var newRowState = (currentState === 'checked') ? 'unchecked' : 'checked';

          bodyRows.forEach(function (row) {
            var cb = row.querySelector('.cell-checkbox');
            if (cb) {
              setCheckboxState(cb, newRowState);
              updateRowHighlight(row);
            }
          });

          setCheckboxState(headerCb, newRowState === 'checked' ? 'checked' : 'unchecked');
          fireSelectionChange(table);
        });
      }

      // Body row checkboxes: individual toggle
      bodyRows.forEach(function (row) {
        var cb = row.querySelector('.cell-checkbox');
        if (!cb) return;

        cb.addEventListener('click', function (e) {
          e.stopPropagation();
          var current = getCheckboxState(cb);
          var next = (current === 'checked') ? 'unchecked' : 'checked';
          setCheckboxState(cb, next);
          updateRowHighlight(row);
          syncHeaderCheckbox(table);
          fireSelectionChange(table);
        });
      });
    });
  }

  /* ── Selection change custom event ── */

  function fireSelectionChange(table) {
    var selected = [];
    table.querySelectorAll('tbody tr').forEach(function (row, i) {
      if (isRowChecked(row)) selected.push(i);
    });
    table.dispatchEvent(new CustomEvent('table:selectionchange', {
      detail: { selectedIndices: selected, count: selected.length },
      bubbles: true
    }));
  }

  /* ── Public API: get selected rows ── */

  window.TableCheckbox = {
    getSelectedRows: function (tableEl) {
      var rows = [];
      if (!tableEl) return rows;
      tableEl.querySelectorAll('tbody tr').forEach(function (row) {
        if (isRowChecked(row)) rows.push(row);
      });
      return rows;
    },
    getSelectedCount: function (tableEl) {
      if (!tableEl) return 0;
      var count = 0;
      tableEl.querySelectorAll('tbody tr').forEach(function (row) {
        if (isRowChecked(row)) count++;
      });
      return count;
    },
    selectAll: function (tableEl) {
      if (!tableEl) return;
      tableEl.querySelectorAll('tbody tr').forEach(function (row) {
        var cb = row.querySelector('.cell-checkbox');
        if (cb) { setCheckboxState(cb, 'checked'); updateRowHighlight(row); }
      });
      syncHeaderCheckbox(tableEl);
      fireSelectionChange(tableEl);
    },
    deselectAll: function (tableEl) {
      if (!tableEl) return;
      tableEl.querySelectorAll('tbody tr').forEach(function (row) {
        var cb = row.querySelector('.cell-checkbox');
        if (cb) { setCheckboxState(cb, 'unchecked'); updateRowHighlight(row); }
      });
      syncHeaderCheckbox(tableEl);
      fireSelectionChange(tableEl);
    }
  };

  /* ── Row click highlight (non-checkbox area) ── */
  function initRowHighlight() {
    document.querySelectorAll('.data-table tbody tr').forEach(function (row) {
      row.addEventListener('click', function (e) {
        if (e.target.closest('.cell-checkbox') || e.target.closest('.cell-actions')) return;
        document.querySelectorAll('.data-table tbody tr').forEach(function (r) {
          if (!isRowChecked(r)) r.classList.remove('data-table__row--focused');
        });
        if (!isRowChecked(row)) row.classList.add('data-table__row--focused');
      });
    });
  }

  /* ── ActionBar refresh button ── */
  function initRefreshBtn() {
    document.querySelectorAll('.actionbar__icon-btn[title="Refresh"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var icon = btn.querySelector('img') || btn.querySelector('svg');
        if (!icon) return;
        icon.style.transition = 'transform 0.4s ease';
        icon.style.transform  = 'rotate(360deg)';
        setTimeout(function () { icon.style.transform = ''; }, 450);
      });
    });
  }

  /* ── MutationObserver: re-init when tbody rows are dynamically added ── */
  function observeTableBody() {
    document.querySelectorAll('.data-table tbody').forEach(function (tbody) {
      var observer = new MutationObserver(function () {
        initCheckboxes();
        initRowHighlight();
      });
      observer.observe(tbody, { childList: true });
    });
  }

  /* ── ActionBar state switcher (for bulk action button states) ── */
  function initActionBarStates() {
    document.querySelectorAll('.ab-state-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var state = btn.getAttribute('data-ab-state');
        var targetId = btn.getAttribute('data-ab-target');
        var group = btn.closest('.ab-state-switcher');
        if (!group || !targetId) return;

        group.querySelectorAll('.ab-state-btn').forEach(function (b) {
          b.classList.remove('ab-state-btn--active');
        });
        btn.classList.add('ab-state-btn--active');

        var actions = document.getElementById(targetId).querySelectorAll('[data-ab-action]');
        actions.forEach(function (a) {
          a.classList.remove('actionbar__action--active');
          if (state === 'default') {
            a.style.background = '#fff';
          } else if (state === 'hover') {
            a.style.background = '#E9E9E9';
          } else if (state === 'active') {
            a.style.background = '#EAF0FC';
            a.classList.add('actionbar__action--active');
          }
        });
      });
    });
  }

  function init() {
    initCheckboxes();
    initRowHighlight();
    initRefreshBtn();
    initActionBarStates();
    observeTableBody();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

---

## Column Types

| Class | Usage | Size | Description |
|---|---|---|---|
| `.cell-checkbox` | `<th>` and `<td>` | 48px wide, 16×16 icon | 3-state checkbox managed by `table.js`. Place as first column. |
| `.cell-actions` | `<td>` wrapper `<div>` | 24×24 icons, gap 8px | Row action icons (approve, edit, delete, more). Typically second column. |
| `.cell-icon-text` | `<td>` wrapper `<div>` | 14×14 icon + text, gap 8px | Icon + label pair (e.g. Agent column). |
| `.cell-status` | `<td>` wrapper `<div>` | 14×14 icon + text, gap 6px | Status icon + text label (e.g. Enabled, Disabled, Success). |
| `.cell-link` | `<a>` inside `<td>` | — | Blue clickable link (`--link-color`), underline on hover. |
| *(plain `<td>`)* | `<td>` | — | Regular text cell. No special class needed. |

### Status Icon JS Map

Use this map when dynamically populating status cells:

```js
var statusMap = {
  'Success':         'icon-status-success.svg',
  'Warning':         'icon-status-warning.svg',
  'Stopped':         'icon-status-stopped.svg',
  'On hold':         'icon-status-on-hold.svg',
  'Not started':     'icon-status-not-started.svg',
  'Partial':         'icon-status-partial.svg',
  'Waiting':         'icon-status-waiting.svg',
  'Partial Success': 'icon-status-partial-success.svg',
  'Info - low':      'icon-status-info-low.svg',
  'Skipped':         'icon-status-skipped.svg',
  'Info - Medium':   'icon-status-info-medium.svg',
  'Info - High':     'icon-status-info-high.svg',
  'Disabled':        'icon-status-disabled.svg',
  'Enabled':         'icon-status-enabled.svg'
};
```

---

## ActionBar Integration

The Data Table Type 1 is paired with an **ActionBar** component placed directly above it. The ActionBar provides search, bulk actions, pagination, and other toolbar controls.

### Typical Layout

```html
<div class="table-scroll-area">
  <!-- ActionBar sits above the table -->
  <div class="actionbar">
    <div class="actionbar__left">...</div>
    <div class="actionbar__right">...</div>
  </div>
  <!-- Table below -->
  <div class="data-table-wrap">
    <table class="data-table">...</table>
  </div>
</div>
```

### ActionBar Variants (choose one)

| Type | Left Side | Right Side |
|---|---|---|
| **Type 1** | Search | Pagination + Prev/Next |
| **Type 2** | Search + Separator + Bulk Actions (Enable/Disable/Delete/More) | Pagination + Prev/Next |
| **Type 3** | Search | Pagination + Prev/Next + Separator + Refresh |
| **Type 4** | Search | Pagination + Prev/Next + Separator + Table View Dropdown |
| **Type 5** | Search | Filter Dropdown ("Showing All") + Pagination + Prev/Next |
| **Type 6** | Search | Pagination + Prev/Next + Separator + Toggle View |
| **Type 7** | Search + Separator + Selected Count + Clear All | Pagination + Prev/Next |
| **Type 8** | Search + Separator + "+ Incident" Report Button | Pagination + Prev/Next + Separator + Column View |

### Scroll Containment

When wrapped in `.table-scroll-area`:
- The ActionBar becomes `position: sticky; top: 0` (z-index 3)
- The `<thead>` becomes `position: sticky; top: 36px` (z-index 2, 36px = ActionBar height)
- Body rows scroll beneath both sticky elements

---

## States

### Row States

| State | Class | Background | Trigger |
|---|---|---|---|
| Default | *(none)* | `transparent` / `#FFFFFF` | — |
| Hover | `:hover` | `#FAFAFA` (`--table-hover-bg`) | Mouse enters row |
| Selected | `.data-table__row--selected` | `#F9FBFF` (`--table-selected-bg`) | Checkbox checked |
| Selected + Hover | `.data-table__row--selected:hover` | `#F0F5FF` (`--table-selected-hover-bg`) | Hover over selected row |
| Focused | `.data-table__row--focused` | `#FAFAFA` (`--table-hover-bg`) | Click on row (non-checkbox, non-action area) |

### Checkbox States

| State | Visual | SVG |
|---|---|---|
| Unchecked | White box, `#ABABAB` border | `SVG_UNCHECKED` |
| Checked | `#2C66DD` blue fill, white checkmark | `SVG_CHECKED` |
| Indeterminate | White box, `#2C66DD` border, blue dash | `SVG_INDETERMINATE` |

### Empty State

When `<tbody>` has no rows, the table shows only the header row with an empty body. Implement a custom empty-state message by adding a full-width `<tr>` with a single `<td colspan="N">` containing the empty message.

### Loading State

No built-in loading skeleton. Implement by adding placeholder rows with animated CSS gradients or a centered spinner overlay on `.data-table-wrap`.

---

## Assembly Notes

- Place inside `.main-content`, typically after the `.header` and/or `.classic-tab` component.
- Wrap the ActionBar + table in `.table-scroll-area` for sticky header behavior.
- The ancestor chain must enforce `overflow: hidden` to prevent double scrollbars:
  - `.app-shell` → `height: 100vh; flex column`
  - `.app-body` → `overflow: hidden; min-height: 0`
  - `.main-content` → `overflow: hidden; min-height: 0`
  - `.table-scroll-area` → `flex: 1; overflow-y: auto` (the **only** scrollbox)
- Requires `tokens.css` (design tokens) loaded before `table.css`.
- Requires `table.js` loaded at end of `<body>` (or after DOM ready).
- If placed after a `.classic-tab`, the rule `.classic-tab + .table-scroll-area { margin-top: 16px }` automatically adds spacing.
- `<colgroup>` widths should be adjusted to fit the actual data. Use `table-layout: fixed` (applied by `.table-scroll-area` rules) for predictable column sizing.
