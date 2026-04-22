# Data Table — Type 2

> Component: Data Table Type 2 (Card-Row Alert Table)
> CSS: `table-type2.css` + `table.css` (ActionBar styles) | JS: `table.js` | HTML ref: `table-type2.html`

## ⚠ Critical Rules (READ BEFORE BUILDING)

- **Type 2 uses the `.t2-*` class system (`.t2-table`, `.t2-cell-left`, `.t2-details`, `.t2-time`, `.t2-assignee`, `.t2-status`, `.t2-remediation`, `.t2-toolbar`).** It is **distinct from `.data-table`** (Type 1).
- **NEVER mix `.data-table` with `.t2-*`** in the same table. They have different row heights (Type 1 = 40px flat, Type 2 = 82–103px cards), different padding (`vertical-align:top`), and different semantics.
- **Use Type 2 only for alert/incident list pages** (Shell D detail pages). For standard Reports tables use Type 1.
- **The table scroll ancestor chain must enforce `overflow:hidden`** on every parent between `.app-shell` and the scrollable area, or you'll get double scrollbars.

---

## Quick Summary

**Card-row alert/incident table** — a rich, multi-line row table designed for alert and incident management screens. Unlike the flat Type 1 table, each row is a tall "card" (82–103px) containing structured content across multiple visual zones:

- **Left sidebar**: Checkbox + vertical divider + thumbs-up icon + count badge
- **Details**: Severity icon + title + priority pill badge + Zia/ATA AI icons + description text
- **Time Generated**: Date string
- **Assignee**: Avatar + name + dropdown chevron
- **Status**: Colored pill badge with dropdown chevron (Open, Acknowledge, Assigned, etc.)
- **Remediation**: "Run Playbook" button, success/failed status, or executing spinner

Includes a **View Selector Toolbar** above the ActionBar for switching views and filtering by date range. Uses ActionBar Type 7 (bulk actions + selected count + pagination).

---

## Configuration

| Setting | How to configure |
|---|---|
| **Column widths** | Set `style="width:Npx;min-width:Npx;"` on `<col>` in `<colgroup>` |
| **Column headers** | Change text in `<th>` elements; Details header has `.t2-sort` for sort indicator |
| **View selector** | Update `.t2-toolbar__select` button text and date range in `.t2-toolbar__right` |
| **Priority levels** | Use modifier classes: `.t2-priority--critical`, `--high`, `--medium`, `--low`, `--verylow` |
| **Status types** | Use modifier classes: `.t2-status--open`, `--acknowledge`, `--assigned`, `--investigation`, `--remediation`, `--remediated`, `--false-positive`, `--benign` |
| **Remediation type** | Switch between `.t2-remediation__link` (Run Playbook), `.t2-remediation__status--success`, `.t2-remediation__status--failed`, `.t2-remediation__executing` |
| **Assignee** | Swap avatar icon between `icon-t2-avatar.svg` (named) and `icon-t2-avatar-unassigned.svg` (unassigned) |
| **Checkbox** | Uses same `table.js` 3-state logic; row class is `.t2-row--selected` instead of `.data-table__row--selected` |

### Priority Levels & Colors

| Level | Background | Border | Score Color | Modifier Class |
|---|---|---|---|---|
| Critical | `#EFDFDD` | `#95291D` | `#95291D` | `.t2-priority--critical` |
| High | `#FCE8E8` | `#DD1616` | `#DD1616` | `.t2-priority--high` |
| Medium | `#FFDECC` | `#FF5900` | `#FF5900` | `.t2-priority--medium` |
| Low | `#F7F0E6` | `#AC6602` | `#AC6602` | `.t2-priority--low` |
| Very Low | `#E8F2E8` | `#198019` | `#198019` | `.t2-priority--verylow` |

All priority pills use `border-radius: 1000px` (fully rounded), `font-size: 11px`, `padding: 4px 7px`.

### Status Types & Colors

| Status | Fill | Border | Text | Modifier Class |
|---|---|---|---|---|
| Open | `rgba(44,102,221,0.1)` | `#2C66DD` | `#2C66DD` | `.t2-status--open` |
| Acknowledge | `rgba(172,102,2,0.1)` | `#AC6602` | `#AC6602` | `.t2-status--acknowledge` |
| Assigned | `rgba(172,102,2,0.1)` | `#AC6602` | `#AC6602` | `.t2-status--assigned` |
| Under Investigation | `rgba(172,102,2,0.1)` | `#AC6602` | `#AC6602` | `.t2-status--investigation` |
| Under Remediation | `rgba(172,102,2,0.1)` | `#AC6602` | `#AC6602` | `.t2-status--remediation` |
| Remediated | `rgba(25,128,25,0.1)` | `#198019` | `#198019` | `.t2-status--remediated` |
| False Positive | `rgba(25,128,25,0.1)` | `#198019` | `#198019` | `.t2-status--false-positive` |
| Benign Positive | `rgba(25,128,25,0.1)` | `#198019` | `#198019` | `.t2-status--benign` |

All status pills use `border-radius: 32px`, `font-size: 11px`, `padding: 3.5px 8px`, `1px solid border`.

---

## Required Icons

### Severity Icons (14×14, used in `.t2-details__severity`)
| Icon | File | Description |
|---|---|---|
| Critical | `icon-t2-severity-critical.svg` | Red hexagon X |
| Medium | `icon-t2-severity-medium.svg` | Orange diamond ! |

### AI/Analysis Icons (14×14, used in `.t2-details__icons`)
| Icon | File | Description |
|---|---|---|
| Zia | `icon-t2-zia.svg` | Zia AI sparkle icon |
| ATA | `icon-t2-ata.svg` | ATA document search icon |

### Left Sidebar Icons
| Icon | File | Size | Description |
|---|---|---|---|
| Thumbs Up | `icon-t2-thumbsup.svg` | 16×16 | Green thumbs up (vote/acknowledge) |

### Assignee Avatars (20×20, circular)
| Icon | File | Description |
|---|---|---|
| Named | `icon-t2-avatar.svg` | Realistic person with suit/tie, `#D5E0F8` gradient bg |
| Unassigned | `icon-t2-avatar-unassigned.svg` | Gray circle + person silhouette, `#E9E9E9` bg |

### Remediation Icons (14×14 via `.t2-remediation__icon`, 12×12 inside button)
| Icon | File | Description |
|---|---|---|
| Playbook | `icon-t2-playbook.svg` | Lightning bolt playbook icon |
| Success | `icon-t2-rem-success.svg` | Green circle + checkmark |
| Failed | `icon-t2-rem-failed.svg` | Red circle + X |
| Executing | `icon-t2-rem-executing.svg` | Blue gradient spinner (animated via `t2-spin`) |

### Toolbar & Navigation Icons
| Icon | File | Description |
|---|---|---|
| Calendar | `icon-t2-calendar.svg` | Calendar icon (date range picker) |
| Chevron Down | `icon-chevron-down.svg` | Dropdown chevron |
| Filter | `icon-actionbar-filter.svg` | Filter funnel icon |
| Search | `icon-actionbar-search.svg` | Search magnifying glass |
| Chevron Left | `icon-chevron-left.svg` | Previous page arrow |
| Chevron Right | `icon-chevron-right.svg` | Next page arrow |

### Checkbox Icons (auto-managed by `table.js`)
| Icon | File | Description |
|---|---|---|
| Unchecked | `icon-checkbox.svg` | White fill, `#ABABAB` border |
| Checked | `icon-checkbox-checked.svg` | `#2C66DD` blue fill, white checkmark |
| Indeterminate | `icon-checkbox-indeterminate.svg` | White fill, `#2C66DD` border + blue dash |

### ActionBar Bulk Action Icons (14×14)
| Icon | File | Description |
|---|---|---|
| Avatar (action) | `icon-t2-avatar.svg` | Assignee bulk action icon |
| Delete | `icon-ab-delete.svg` | Delete bulk action |
| More | `icon-ab-more.svg` | More actions overflow |

---

## Complete HTML

```html
<!--
  ============================================================
  TABLE TYPE 2 — Card-Row Alert Table (Predefined HTML Component)
  ============================================================
  A rich, card-style row table for alert/incident management.
  Each row is a multi-line card with severity, priority, description,
  assignee, status, and remediation columns.

  STRUCTURE:
    1. View Selector Toolbar (top) — Select view dropdown + filter + date range
    2. ActionBar (Type 7 style) — Bulk actions + selected count + pagination
    3. Column Headers — Details (sortable) | Time Generated | Assignee | Status | Remediation
    4. Card Rows — Each row contains:
       - Left: Checkbox + divider + ThumbsUp icon + count badge
       - Details: Severity icon + Title + Priority badge + Zia/ATA icons + Description text
       - Time Generated: Date string
       - Assignee: Avatar + Name + Dropdown
       - Status: Colored dot + Status text + Dropdown
       - Remediation: "Run Playbook" button OR Status text (Success/Failed/Executing)

  PRIORITY LEVELS & COLORS (fully rounded pill, border-radius: 1000px):
    Critical — bg: #EFDFDD, border: #95291D, label: black, score: #95291D
    High     — bg: #FCE8E8, border: #DD1616, label: black, score: #DD1616
    Medium   — bg: #FFDECC, border: #FF5900, label: black, score: #FF5900
    Low      — bg: #F7F0E6, border: #AC6602, label: black, score: #AC6602
    Very Low — bg: #E8F2E8, border: #198019, label: black, score: #198019

  STATUS TYPES & COLORS (rounded pill, border-radius: 32px, 10% opacity fill + 1px border):
    Open               — fill: rgba(44,102,221,0.1), border: #2C66DD, text: #2C66DD
    Acknowledge        — fill: rgba(172,102,2,0.1), border: #AC6602, text: #AC6602
    Assigned           — fill: rgba(172,102,2,0.1), border: #AC6602, text: #AC6602
    Under Investigation — fill: rgba(172,102,2,0.1), border: #AC6602, text: #AC6602
    Under Remediation  — fill: rgba(172,102,2,0.1), border: #AC6602, text: #AC6602
    Remediated         — fill: rgba(25,128,25,0.1), border: #198019, text: #198019
    False Positive     — fill: rgba(25,128,25,0.1), border: #198019, text: #198019
    Benign Positive    — fill: rgba(25,128,25,0.1), border: #198019, text: #198019

  ASSIGNEE AVATARS:
    Named assignee  — icon-t2-avatar.svg (realistic person with suit/tie, #D5E0F8 gradient bg)
    Unassigned      — icon-t2-avatar-unassigned.svg (gray circle + person silhouette, #E9E9E9 bg)

  REMEDIATION TYPES:
    Run Playbook       — Blue outlined button with playbook icon
    Success            — Green checkmark circle icon + "Success." + "View Details" link
    Failed             — Red X circle icon + "Failed." + "View Details" link
    Executing Playbook — Spinning blue gradient loader icon + "Executing Playbook..."

  ICON ASSETS:
    icon-t2-severity-critical.svg — Red hexagon X
    icon-t2-severity-medium.svg   — Orange diamond !
    icon-t2-thumbsup.svg          — Green thumbs up
    icon-t2-zia.svg               — Zia AI sparkle icon
    icon-t2-ata.svg               — ATA document search icon
    icon-t2-avatar.svg            — Named user avatar (realistic person with suit)
    icon-t2-avatar-unassigned.svg — Unassigned avatar (gray circle + person silhouette)
    icon-t2-playbook.svg          — Lightning bolt playbook icon
    icon-t2-rem-success.svg       — Green circle + checkmark (remediation success)
    icon-t2-rem-failed.svg        — Red circle + X (remediation failed)
    icon-t2-rem-executing.svg     — Blue gradient spinner (remediation executing)
    icon-t2-calendar.svg          — Calendar icon
    icon-checkbox.svg             — Unchecked checkbox
    icon-checkbox-checked.svg     — Checked checkbox
    icon-checkbox-indeterminate.svg — Indeterminate checkbox
    icon-chevron-down.svg         — Dropdown chevron

  CSS:  tokens.css + table-type2.css
  JS:   table.js (checkbox 3-state logic applies)
  ============================================================
-->

<!-- ── VIEW SELECTOR TOOLBAR ── -->
<div class="t2-toolbar">
  <div class="t2-toolbar__left">
    <span class="t2-toolbar__label">Select view</span>
    <button class="t2-toolbar__select">
      Active Alerts
      <img src="./assets/icons/icon-chevron-down.svg" alt="" />
    </button>
    <div class="t2-toolbar__divider"></div>
    <button class="t2-toolbar__filter" title="Filter">
      <img src="./assets/icons/icon-actionbar-filter.svg" alt="" />
    </button>
  </div>
  <div class="t2-toolbar__right">
    <img src="./assets/icons/icon-t2-calendar.svg" alt="" />
    <span>Last 7 Days</span>
  </div>
</div>

<!-- ── ACTION BAR (Type 7 — Bulk Actions + Selected Count + Pagination) ── -->
<div class="actionbar">
  <div class="actionbar__left">
    <button class="actionbar__icon-btn" title="Search">
      <img src="./assets/icons/icon-actionbar-search.svg" alt="" />
    </button>
    <div class="actionbar__actions">
      <button class="actionbar__action" data-ab-action="incident">
        <span>+ Add to Incident</span>
      </button>
      <button class="actionbar__action" data-ab-action="assignee">
        <img src="./assets/icons/icon-t2-avatar.svg" alt="" style="width:14px;height:14px;" />
        <span>Assignee</span>
      </button>
      <button class="actionbar__action" data-ab-action="delete">
        <img src="./assets/icons/icon-ab-delete.svg" alt="" />
        <span>Delete</span>
      </button>
      <button class="actionbar__action actionbar__action--more" data-ab-action="more">
        <img src="./assets/icons/icon-ab-more.svg" alt="" />
      </button>
    </div>
    <div class="actionbar__selected-count">
      <b>Selected Count: 06</b>
      <a href="#" class="actionbar__clear-all">Clear All</a>
    </div>
  </div>
  <div class="actionbar__right">
    <span class="actionbar__pagination">1-25 <i>of</i> <b>100</b></span>
    <button class="actionbar__nav-btn" title="Previous">
      <img src="./assets/icons/icon-chevron-left.svg" alt="" />
    </button>
    <button class="actionbar__nav-btn" title="Next">
      <img src="./assets/icons/icon-chevron-right.svg" alt="" />
    </button>
  </div>
</div>

<!-- ── CARD-ROW TABLE ── -->
<div class="data-table-wrap">
  <table class="t2-table" id="t2-demo-table">
    <colgroup>
      <col style="width:80px;min-width:80px;" />
      <col />
      <col style="width:150px;min-width:140px;" />
      <col style="width:165px;min-width:150px;" />
      <col style="width:180px;min-width:165px;" />
      <col style="width:175px;min-width:155px;" />
    </colgroup>
    <thead>
      <tr>
        <th class="t2-th-check"></th>
        <th class="t2-th-details"><span class="t2-sort">Details</span></th>
        <th>Time Generated</th>
        <th>Assignee</th>
        <th>Status</th>
        <th>Remediation</th>
      </tr>
    </thead>
    <tbody id="t2-table-body">
      <!-- Rows populated via JS -->
    </tbody>
  </table>
</div>
```

### Example Card Row HTML (for manual population)

```html
<tr>
  <!-- Left: Checkbox + Divider + ThumbsUp + Badge -->
  <td>
    <div class="t2-cell-left">
      <div class="t2-cell-left__check cell-checkbox">
        <img src="./assets/icons/icon-checkbox.svg" alt="" />
      </div>
      <div class="t2-cell-left__sep"></div>
      <div class="t2-cell-left__meta">
        <img class="t2-cell-left__icon" src="./assets/icons/icon-t2-thumbsup.svg" alt="" />
        <span class="t2-cell-left__badge">12</span>
      </div>
    </div>
  </td>

  <!-- Details: Severity + Title + Priority + AI Icons + Description -->
  <td>
    <div class="t2-details">
      <div class="t2-details__row1">
        <img class="t2-details__severity" src="./assets/icons/icon-t2-severity-critical.svg" alt="" />
        <span class="t2-details__title">EXE - Process executed for the first time</span>
        <span class="t2-priority t2-priority--critical">
          Critical
          <span class="t2-priority__score t2-priority__score--critical">90</span>
        </span>
        <div class="t2-details__icons">
          <img src="./assets/icons/icon-t2-zia.svg" alt="Zia" />
          <img src="./assets/icons/icon-t2-ata.svg" alt="ATA" />
        </div>
      </div>
      <div class="t2-details__desc">
        A new executable was run for the first time on this endpoint, which could indicate malware installation or unauthorized software.
      </div>
    </div>
  </td>

  <!-- Time Generated -->
  <td class="t2-time">Aug 19, 2025 11:45 AM</td>

  <!-- Assignee -->
  <td>
    <div class="t2-assignee">
      <img class="t2-assignee__avatar" src="./assets/icons/icon-t2-avatar.svg" alt="" />
      <span class="t2-assignee__name">John Doe</span>
      <img class="t2-assignee__chevron" src="./assets/icons/icon-chevron-down.svg" alt="" />
    </div>
  </td>

  <!-- Status -->
  <td>
    <span class="t2-status t2-status--open">
      Open
      <img class="t2-status__chevron" src="./assets/icons/icon-chevron-down.svg" alt="" />
    </span>
  </td>

  <!-- Remediation: Run Playbook variant -->
  <td>
    <div class="t2-remediation">
      <a class="t2-remediation__link" href="#">
        <img src="./assets/icons/icon-t2-playbook.svg" alt="" />
        Run Playbook
      </a>
    </div>
  </td>
</tr>
```

### Remediation Variants

**Success:**
```html
<td>
  <div class="t2-remediation">
    <span class="t2-remediation__status--success">
      <img class="t2-remediation__icon" src="./assets/icons/icon-t2-rem-success.svg" alt="" />
      <span class="t2-remediation__status">Success.</span>
      <a class="t2-remediation__status-link" href="#">View Details</a>
    </span>
  </div>
</td>
```

**Failed:**
```html
<td>
  <div class="t2-remediation">
    <span class="t2-remediation__status--failed">
      <img class="t2-remediation__icon" src="./assets/icons/icon-t2-rem-failed.svg" alt="" />
      <span class="t2-remediation__status">Failed.</span>
      <a class="t2-remediation__status-link" href="#">View Details</a>
    </span>
  </div>
</td>
```

**Executing Playbook:**
```html
<td>
  <div class="t2-remediation">
    <span class="t2-remediation__executing">
      <img class="t2-remediation__icon" src="./assets/icons/icon-t2-rem-executing.svg" alt="" />
      <span>Executing Playbook...</span>
    </span>
  </div>
</td>
```

---

## Complete CSS

### table-type2.css

```css
/* ============================================================
   TABLE TYPE 2 — Card-Row Alert Table
   From Figma: each row is a card (82-103px tall) with:
     Left sidebar (checkbox + thumbsup + count badge)
     Main: severity icon + title + priority badge + description
     Columns: Time Generated | Assignee | Status | Remediation
   ============================================================ */

/* ── View Selector Bar (top toolbar) ── */
.t2-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 12px;
  font-family: var(--font-family);
}
.t2-toolbar__left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.t2-toolbar__label {
  color: #626262;
  font-weight: 400;
}
.t2-toolbar__select {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #000;
  font-weight: 400;
  cursor: pointer;
  background: none;
  border: none;
  font-family: var(--font-family);
  font-size: 12px;
  padding: 4px 0;
}
.t2-toolbar__select img,
.t2-toolbar__select svg {
  width: 12px;
  height: 12px;
  opacity: 0.5;
}
.t2-toolbar__divider {
  width: 1px;
  height: 16px;
  background: #DCDCDC;
}
.t2-toolbar__filter {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: none;
  cursor: pointer;
  border-radius: 2px;
  padding: 0;
}
.t2-toolbar__filter:hover { background: #F5F5F5; }
.t2-toolbar__filter img,
.t2-toolbar__filter svg { width: 14px; height: 14px; }

.t2-toolbar__right {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #626262;
}
.t2-toolbar__right img,
.t2-toolbar__right svg { width: 14px; height: 14px; }

/* ── Card-Row Table Container ── */
.t2-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-family);
  font-size: 12px;
  table-layout: fixed;
}

/* ── Header ── */
.t2-table thead th {
  background: var(--table-header-bg, #F5F5F5);
  font-weight: 500;
  font-size: 12px;
  color: #000;
  text-align: left;
  padding: 0 12px;
  height: 32px;
  border-bottom: 1px solid #E9E9E9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.t2-table thead th.t2-th-check {
  width: 90px;
  min-width: 90px;
  padding: 0;
  text-align: center;
}
.t2-table thead th.t2-th-details {
  width: auto;
}
.t2-table thead th .t2-sort {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}
.t2-table thead th .t2-sort::after {
  content: '';
  display: inline-block;
  width: 0; height: 0;
  border-left: 3.5px solid transparent;
  border-right: 3.5px solid transparent;
  border-bottom: 5px solid #000;
}

/* ── Row Cards ── */
.t2-table tbody tr {
  background: #fff;
  border-bottom: 1px solid #E9E9E9;
  transition: background 0.12s;
}
.t2-table tbody tr:hover {
  background: var(--table-hover-bg, #FAFAFA);
}
.t2-table tbody tr.t2-row--selected {
  background: var(--table-selected-bg, #F9FBFF);
}
.t2-table tbody tr.t2-row--selected:hover {
  background: var(--table-selected-hover-bg, #F0F5FF);
}

.t2-table tbody td {
  padding: 10px 12px;
  vertical-align: top;
  font-size: 11px;
  color: #000;
  border: none;
}

/* ── Left Column (Checkbox + ThumbsUp + Badge) ── */
.t2-cell-left {
  display: flex;
  align-items: flex-start;
  gap: 0;
  height: 100%;
}
.t2-cell-left__check {
  flex: 0 0 16px;
  cursor: pointer;
}
.t2-cell-left__check img,
.t2-cell-left__check svg {
  width: 16px;
  height: 16px;
}
.t2-cell-left__sep {
  width: 1px;
  height: 40px;
  background: #DCDCDC;
  margin: 0 8px;
  flex-shrink: 0;
}
.t2-cell-left__meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.t2-cell-left__icon {
  width: 16px;
  height: 16px;
}
.t2-cell-left__badge {
  font-size: 11px;
  color: #525354;
  font-weight: 400;
  white-space: nowrap;
}

/* ── Details Column (Title + Priority + Description) ── */
.t2-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.t2-details__row1 {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.t2-details__severity {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
.t2-details__title {
  font-size: 12px;
  font-weight: 400;
  color: #000;
}
.t2-details__icons {
  display: flex;
  align-items: center;
  gap: 6px;
}
.t2-details__icons img,
.t2-details__icons svg {
  width: 14px;
  height: 14px;
}

/* Priority Badge — fully rounded pill matching Figma (cornerRadius: 1000) */
.t2-priority {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 7px;
  border-radius: 1000px;
  font-size: 11px;
  font-weight: 400;
  color: #000;
  white-space: nowrap;
}
.t2-priority--critical {
  background: #EFDFDD;
  border: 1px solid #95291D;
}
.t2-priority--high {
  background: #FCE8E8;
  border: 1px solid #DD1616;
}
.t2-priority--medium {
  background: #FFDECC;
  border: 1px solid #FF5900;
}
.t2-priority--low {
  background: #F7F0E6;
  border: 1px solid #AC6602;
}
.t2-priority--verylow {
  background: #E8F2E8;
  border: 1px solid #198019;
}
.t2-priority__score {
  font-weight: 600;
}
.t2-priority__score--critical { color: #95291D; }
.t2-priority__score--high { color: #DD1616; }
.t2-priority__score--medium { color: #FF5900; }
.t2-priority__score--low { color: #AC6602; }
.t2-priority__score--verylow { color: #198019; }

/* Description */
.t2-details__desc {
  font-size: 11px;
  color: #626262;
  line-height: 1.5;
  word-break: break-word;
}

/* ── Time Generated ── */
.t2-time {
  font-size: 11px;
  color: #000;
  white-space: nowrap;
}

/* ── Assignee ── */
.t2-assignee {
  display: flex;
  align-items: center;
  gap: 6px;
}
.t2-assignee__avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  flex-shrink: 0;
}
.t2-assignee__name {
  font-size: 12px;
  color: #000;
  white-space: nowrap;
}
.t2-assignee__chevron {
  width: 12px;
  height: 12px;
  opacity: 0.4;
}

/* ── Status — Rounded pill matching Figma (cornerRadius: 32, 10% opacity fill + 1px border) ── */
.t2-status {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3.5px 8px;
  border-radius: 32px;
  font-size: 11px;
  white-space: nowrap;
  border: 1px solid transparent;
}
.t2-status--open {
  color: #2C66DD;
  background: rgba(44,102,221,0.1);
  border-color: #2C66DD;
}
.t2-status--acknowledge,
.t2-status--assigned,
.t2-status--investigation {
  color: #AC6602;
  background: rgba(172,102,2,0.1);
  border-color: #AC6602;
}
.t2-status--remediation {
  color: #AC6602;
  background: rgba(172,102,2,0.1);
  border-color: #AC6602;
}
.t2-status--remediated,
.t2-status--benign {
  color: #198019;
  background: rgba(25,128,25,0.1);
  border-color: #198019;
}
.t2-status--false-positive {
  color: #198019;
  background: rgba(25,128,25,0.1);
  border-color: #198019;
}
.t2-status__chevron {
  width: 11px;
  height: 11px;
  flex-shrink: 0;
}

/* ── Remediation ── */
.t2-remediation {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}
.t2-remediation__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #2C66DD;
  text-decoration: none;
  font-size: 12px;
  border: 1px solid #2C66DD;
  border-radius: 2px;
  padding: 4px 10px;
  background: none;
  cursor: pointer;
  font-family: var(--font-family);
  white-space: nowrap;
  transition: background 0.12s;
}
.t2-remediation__link:hover {
  background: #F0F6FF;
}
.t2-remediation__link img,
.t2-remediation__link svg {
  width: 12px;
  height: 12px;
}
.t2-remediation__status {
  font-size: 12px;
  color: #000;
}
.t2-remediation__status-link {
  color: #2C66DD;
  text-decoration: none;
  cursor: pointer;
}
.t2-remediation__status-link:hover {
  text-decoration: underline;
}
.t2-remediation__status--success {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.t2-remediation__status--failed {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.t2-remediation__executing {
  font-size: 12px;
  color: #000;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.t2-remediation__icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
.t2-remediation__executing .t2-remediation__icon {
  animation: t2-spin 1.2s linear infinite;
}
@keyframes t2-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### ActionBar Styles (from table.css — shared with Type 1)

Type 2 also requires the ActionBar CSS from `table.css`. The ActionBar classes (`.actionbar`, `.actionbar__left`, `.actionbar__right`, `.actionbar__icon-btn`, `.actionbar__actions`, `.actionbar__action`, `.actionbar__selected-count`, `.actionbar__clear-all`, `.actionbar__pagination`, `.actionbar__nav-btn`, `.actionbar__separator`) are defined in `table.css` and documented in the [Data Table Type 1 wiki](./data_table_type1.md#complete-css). Include `table.css` alongside `table-type2.css`.

---

## JavaScript API

Type 2 uses the same `table.js` as Type 1. The checkbox 3-state logic applies to `.cell-checkbox` elements inside `.t2-cell-left__check`. The full JavaScript is documented in the [Data Table Type 1 wiki](./data_table_type1.md#javascript-api).

Key difference: Type 2 rows use `.t2-row--selected` for the selected background instead of `.data-table__row--selected`. The `table.js` checkbox logic targets `.cell-checkbox` class which works in both table types, but the row highlight class applied by `updateRowHighlight()` is `.data-table__row--selected`. For Type 2 tables, you may need to add a small adapter or handle row selection highlighting via CSS on `.t2-row--selected`.

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

| Column | Class(es) | Content | Notes |
|---|---|---|---|
| **Left (Checkbox + Meta)** | `.t2-cell-left` wrapping `.t2-cell-left__check.cell-checkbox` + `.t2-cell-left__sep` + `.t2-cell-left__meta` | Checkbox, vertical divider, thumbs-up icon, count badge | First column, 80px wide |
| **Details** | `.t2-details` with `.t2-details__row1` + `.t2-details__desc` | Severity icon + title + priority pill + AI icons + description text | Flexible width (auto) |
| **Time Generated** | `.t2-time` (on `<td>`) | Date string, e.g. "Aug 19, 2025 11:45 AM" | 150px wide |
| **Assignee** | `.t2-assignee` | Avatar (20×20 circular) + name + dropdown chevron | 165px wide |
| **Status** | `.t2-status` with modifier class | Colored pill badge + dropdown chevron | 180px wide |
| **Remediation** | `.t2-remediation` | "Run Playbook" button, success/failed status + link, or executing spinner | 175px wide |

### Priority Badge

```html
<span class="t2-priority t2-priority--critical">
  Critical
  <span class="t2-priority__score t2-priority__score--critical">90</span>
</span>
```

Modifiers: `--critical`, `--high`, `--medium`, `--low`, `--verylow`

### Status Badge

```html
<span class="t2-status t2-status--open">
  Open
  <img class="t2-status__chevron" src="./assets/icons/icon-chevron-down.svg" alt="" />
</span>
```

Modifiers: `--open`, `--acknowledge`, `--assigned`, `--investigation`, `--remediation`, `--remediated`, `--false-positive`, `--benign`

---

## ActionBar Integration

Type 2 uses a **two-tier toolbar** above the card-row table:

### Tier 1: View Selector Toolbar (`.t2-toolbar`)
- Left: "Select view" label + view dropdown button + divider + filter icon
- Right: Calendar icon + date range text ("Last 7 Days")
- This is Type 2–specific and does NOT exist in Type 1.

### Tier 2: ActionBar (`.actionbar` — Type 7 variant)
- Left: Search + bulk actions ("+ Add to Incident", Assignee, Delete, More) + "Selected Count: 06" + "Clear All" link
- Right: Pagination "1-25 of 100" + prev/next arrows

### Full Layout

```html
<div class="table-scroll-area">
  <!-- Tier 1: View selector -->
  <div class="t2-toolbar">...</div>
  <!-- Tier 2: ActionBar -->
  <div class="actionbar">...</div>
  <!-- Card-row table -->
  <div class="data-table-wrap">
    <table class="t2-table">...</table>
  </div>
</div>
```

The ActionBar CSS classes are shared with Type 1 (defined in `table.css`). The View Selector Toolbar classes (`.t2-toolbar*`) are defined in `table-type2.css`.

---

## States

### Row States

| State | Class | Background | Trigger |
|---|---|---|---|
| Default | *(none)* | `#FFFFFF` | — |
| Hover | `:hover` | `#FAFAFA` (`--table-hover-bg`) | Mouse enters card row |
| Selected | `.t2-row--selected` | `#F9FBFF` (`--table-selected-bg`) | Checkbox checked |
| Selected + Hover | `.t2-row--selected:hover` | `#F0F5FF` (`--table-selected-hover-bg`) | Hover over selected card row |

### Checkbox States

Same as Type 1 — 3-state checkbox managed by `table.js`:

| State | Visual | SVG |
|---|---|---|
| Unchecked | White box, `#ABABAB` border | `SVG_UNCHECKED` |
| Checked | `#2C66DD` blue fill, white checkmark | `SVG_CHECKED` |
| Indeterminate | White box, `#2C66DD` border, blue dash | `SVG_INDETERMINATE` |

### Remediation States

| State | Visual | Class/Element |
|---|---|---|
| Run Playbook | Blue outlined button with lightning icon | `.t2-remediation__link` |
| Success | Green checkmark icon + "Success." + "View Details" link | `.t2-remediation__status--success` |
| Failed | Red X icon + "Failed." + "View Details" link | `.t2-remediation__status--failed` |
| Executing | Spinning blue loader + "Executing Playbook..." | `.t2-remediation__executing` (icon uses `@keyframes t2-spin`) |

### Status Dropdown States

The status pill (`.t2-status`) includes a chevron icon, indicating it's a dropdown trigger. Click opens a status change dropdown (implement as custom dropdown or `<select>`).

### Empty State

When `<tbody>` has no rows, show a full-width empty message row. Alternatively, overlay a centered empty-state illustration on `.data-table-wrap`.

### Loading State

No built-in loading skeleton. Implement with placeholder card rows using animated CSS shimmer gradients or a centered spinner overlay.

---

## Assembly Notes

- Place inside `.main-content`, typically in the **Alerts** tab or any incident/alert management view.
- The component has 3 layers: View Selector Toolbar → ActionBar → Card-Row Table.
- Wrap all three in `.table-scroll-area` for sticky header behavior.
- Requires **two CSS files**: `tokens.css` + `table-type2.css` + `table.css` (for ActionBar styles).
- Requires `table.js` loaded at end of `<body>` (or after DOM ready).
- The `.t2-table` class is distinct from `.data-table` — do not mix them. Type 2 rows are taller (82–103px vs 40px) with `vertical-align: top` and `padding: 10px 12px`.
- The ancestor chain must enforce `overflow: hidden` (same as Type 1) to prevent double scrollbars.
- The Details column uses `width: auto` (flexible) while all other columns have fixed widths — the Details column absorbs remaining horizontal space.
- Remediation column content varies per row — use the appropriate HTML variant (Run Playbook / Success / Failed / Executing) based on the row's remediation state.
- The `@keyframes t2-spin` animation is defined in `table-type2.css` for the executing spinner icon.
