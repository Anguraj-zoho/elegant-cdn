# Drawer

> Component: Drawer (Figma Frame 650:42237)
> CSS: `drawer.css` | JS: `drawer.js` | HTML ref: `drawer.html`

## ⚠ Critical Rules (READ BEFORE BUILDING)

- **Every drawer MUST be paired with a `.drawer-backdrop[data-drawer="drawerId"]` element** placed as a prior sibling. Without it, the drawer cannot be closed by clicking outside it.
- **Drawer body layout helpers exist** — use `.drawer-grid`, `.drawer-detail`, `.drawer-card`, `.form-group`, `.form-actions` instead of inline `<div style="display:grid;...">` blocks.
- **Footer buttons use `.btn-primary` (Save) + `.btn-secondary` (Cancel)** from `button-row.md` / `tokens.css`. Never inline-style footer buttons.
- **Form fields inside drawers use `.form-row` / `.form-checkbox` / `.form-radio` / `form-dropdown`.** Never raw `<input type=checkbox/radio>` or `<select>`.
- **Icon priority:** (1) `assets/icons/` local SVGs FIRST, (2) Lucide CDN only for 48px tile icons needing dynamic color.
- **NEVER override `.drawer__body` padding with inline `style="padding:0"`.** The body has a canonical `16px` padding. Opt-out with a modifier class instead:
  - `.drawer__body--no-pad` — remove all padding (full-bleed tables, card grids)
  - `.drawer__body--flush-x` — remove horizontal padding only
  - `.drawer__body--flush-top` — remove top padding (e.g. when the first child is a tab strip that should meet the `.drawer__top` divider)
- **In-drawer tabs must use `line-tab`, NOT `classic-tab`.** A drawer's own surface is already a card; a `classic-tab` inside a drawer creates a redundant/broken double-frame. See `classic_tab.md` → "Pick-the-Right-Tab Decision Matrix".
- **No custom `data-*-tab` + `data-*-pane` attributes.** If you need tabs, use the built-in `data-tab` / `data-tab-content` wiring from `line-tab.js` or the index-based `classic-tab.js`. Adding your own attributes means you also duplicate the JS, which is a smell.
- **In-drawer form inputs keep canonical widths — do NOT stretch.** `.form-row__input` is **280px by default** (see `form_input.md` → "Width invariant"). Never ship inline `.drawer-form .form-row__input { flex: 1; ... }` overrides — this is the #1 cause of "dropdown trigger is 432px wide" regressions. Use `--medium` / `--small` / `--full` modifiers only. A `.drawer-form` container is purely a layout wrapper (column, 16px gap) — it must not redefine child widths.
- **All drawer-form labels share ONE width.** Put a `.drawer-form--labels-80/100/120/140/160/200` modifier on the `.drawer-form` container. Never use `.form-row--gap-16` on multiple rows inside a vertical drawer form — that produces hug-content labels with a jagged left edge (auto-balance violation). See `form_input.md` → "Container-scoped balance modifiers".
- **No hardcoded z-index.** Use the canonical scale (`--z-drawer`, `--z-drawer-dropdown`, etc.) documented in `design_tokens.md`. A `.form-dropdown` inside a drawer auto-lifts to `--z-drawer-dropdown` — don't override.

## ✅ Canonical recipe — Tabs inside a drawer

Use the default `line-tab` variant. Let `.drawer__body`'s built-in 16px padding do the work; apply `--flush-top` if you want the tab-strip's bottom border to meet the `drawer__top` divider.

```html
<div class="drawer-backdrop" data-drawer="customizeViewDrawer"></div>
<div class="drawer drawer--md" id="customizeViewDrawer">
  <div class="drawer__main">
    <div class="drawer__top">
      <div class="drawer__title-area"><span class="drawer__title">Customize View</span></div>
      <button class="drawer__close" aria-label="Close">
        <img src="assets/icons/icon-close.svg" alt="" style="width:14px;height:14px;" />
      </button>
    </div>

    <div class="drawer__body drawer__body--flush-top">
      <div class="line-tab" style="margin: 0 -16px; padding: 0 16px;">
        <div class="line-tab__headers">
          <button class="line-tab__header line-tab__header--selected" data-tab="sorting">Sorting and Limits</button>
          <button class="line-tab__header line-tab__header--unselected" data-tab="widget">Widget</button>
        </div>
      </div>
      <div class="line-tab__body" style="padding-top:16px;">
        <div class="line-tab__content line-tab__content--active" data-tab-content="sorting">
          <!-- form rows -->
        </div>
        <div class="line-tab__content" data-tab-content="widget">
          <!-- form rows -->
        </div>
      </div>
    </div>

    <div class="drawer__footer">
      <div class="drawer__footer-line"></div>
      <div class="drawer__footer-actions">
        <div class="drawer__footer-left">
          <button class="drawer__btn-save" data-drawer-close>Save</button>
          <button class="drawer__btn-cancel" data-drawer-close>Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Why this pattern works:**
1. `line-tab`'s body panels sit flush with the drawer body — no redundant frame.
2. Built-in `line-tab.js` handles switching via `data-tab` / `data-tab-content` — no custom attributes needed.
3. The tab strip's negative horizontal margin + matching padding makes its 1px bottom border run edge-to-edge inside the drawer, anchoring the tabs visually to the drawer's top divider.
4. `.drawer__body--flush-top` removes the 16px top padding so the tab strip sits directly under `.drawer__top`'s border.

### `.drawer-form` container contract

`.drawer-form` is the **only** wrapper you should style for drawer forms. It is a layout primitive — nothing more. Use exactly this CSS in your page (or prefer promoting it to a shared CSS file):

```css
.drawer-form { display: flex; flex-direction: column; gap: 16px; }
```

**Forbidden** — these rules break the design system:

```css
/* ❌ NEVER */
.drawer-form .form-row__input { flex: 1; min-width: 0; }   /* breaks 280px invariant */
.drawer-form .form-row__input--small { flex: 0 0 120px; }  /* --small is already 100px */
.drawer-form .form-row__label { flex: 0 0 120px; }         /* use a --labels-* modifier instead */
```

### Picking label width in a drawer form

Pick ONE `--labels-*` modifier on the container, sized to the widest label in the form. **Never** decorate individual `<label>` elements with `--100/--140/--80` inside a drawer — that risks inconsistency and violates the auto-balance rule.

```html
<!-- Customize View (labels: Field / Sort By / Limit) — longest is 7 chars -->
<div class="drawer-form drawer-form--labels-100">
  <div class="form-row">
    <label class="form-row__label">Field</label>
    <div class="form-row__input">...</div>
  </div>
  <div class="form-row">
    <label class="form-row__label">Sort By</label>
    <div class="form-row__input">...</div>
  </div>
  <div class="form-row">
    <label class="form-row__label">Limit</label>
    <div class="form-row__input form-row__input--small">...</div>
  </div>
</div>

<!-- Pin to Dashboard (labels: Select Tab / Widget / Widget Type / Chart Type / Display Name) -->
<div class="drawer-form drawer-form--labels-120">...</div>
```

| Longest label | Modifier |
|---|---|
| ≤ 6 chars ("Field", "Limit") | `--labels-80` |
| 7–10 chars ("Sort By", "Widget Type") | `--labels-100` |
| 11–14 chars ("Display Name") | `--labels-120` |
| 15–18 chars | `--labels-140` |
| 19–22 chars | `--labels-160` |
| 23+ chars | `--labels-200` (default 200px) |

Measure against the widest label in the current form. If two forms in the same drawer (sibling tabs) have different longest labels, pick the larger of the two for visual parity across the tab switch.

Do **not** use `.form-row--gap-16` in a vertical drawer form; that triggers hug-content labels and the left edge becomes jagged.

## Quick Summary

A right-side sliding panel overlay for forms, settings, detail views, and card-grid pickers. The drawer slides in from the right edge of the viewport over a semi-transparent backdrop. Supports multiple width modes, an optional RHS icon strip, configurable top bar (title, subtitle, back arrow, links, buttons), and footer variants (Save/Cancel, Show All, Link Text). Stacks correctly for nested drawers and closes via backdrop click, Escape key, or close button.

## Configuration

### Width Modes (set via `.drawer--{size}` modifier on `.drawer`)

| Modifier | Width | Use Case |
|---|---|---|
| `.drawer--sm` | 480px | Forms, simple settings (default) |
| `.drawer--md` | 600px | Medium content |
| `.drawer--lg` | 800px | Tables, large forms |
| `.drawer--xl` | 1000px | Extra-large content |
| `.drawer--auto` | fit-content (min 360px, max 90vw) | Dynamic width |
| `.drawer--grid6` | 948px | 6-column card grid + 24px padding |
| `.drawer--grid5` | 796px | 5-column card grid + 24px padding |
| `.drawer--grid4` | 644px | 4-column card grid + 24px padding |

### Top Bar Booleans (show/hide via presence of elements)

| Feature | How to Enable |
|---|---|
| Icon | Add `<img>` before `.drawer__title` |
| Back Arrow | Add back-arrow `<button>` before title |
| Subtitle | Add `.drawer__title-sep` + `.drawer__subtitle` |
| Close Icon | `.drawer__close` (always present by default) |
| Link text | Add `.drawer__top-link` in `.drawer__top-actions` |
| Button | Add `<button>` in `.drawer__top-actions` |
| Export As | Add export dropdown in `.drawer__top-actions` |

### Footer Variants (Style property)

| Style | Content |
|---|---|
| Save Cancel | Save + Cancel buttons |
| Show All | "Show All" link instead of buttons |
| Link Text | Primary Link on the right side |

## Required Icons

All icons are local Figma-exported SVGs from `assets/icons/`:

- `icon-close.svg` — Close button (14×14)
- `icon-question.svg` — RHS help icon
- `icon-help.svg` — RHS bot icon
- `icon-dd-settings.svg` — RHS settings icon
- `icon-tab-add-custom.svg` — Card grid "Add Custom" tile
- `icon-tab-network-overview.svg` — Card grid tile example
- `icon-tab-aws-overview.svg` — Card grid tile example

**ICON PRIORITY:** (1) `assets/icons/` local SVGs FIRST → (2) Lucide CDN ONLY for 48px tile icons needing dynamic color. NEVER use Lucide CDN when a local Figma-exported icon exists.

## Variants

### Variant 1: Small Drawer (480px) with Save/Cancel

Standard form/settings drawer. Title + optional subtitle, scrollable body, Save/Cancel footer.

```html
<!-- ── Backdrop ── -->
<div class="drawer-backdrop" data-drawer="myDrawer"></div>

<!-- ── Small Drawer (480px) with Save/Cancel ── -->
<div class="drawer drawer--sm" id="myDrawer">
  <div class="drawer__main">
    <div class="drawer__top">
      <div class="drawer__title-area">
        <span class="drawer__title">Drawer Title</span>
        <span class="drawer__title-sep">–</span>
        <span class="drawer__subtitle">Subtitle</span>
      </div>
      <button class="drawer__close" aria-label="Close">
        <img src="./assets/icons/icon-close.svg" alt="" style="width:14px;height:14px;" />
      </button>
    </div>
    <div class="drawer__body">
      <!-- Your content here -->
    </div>
    <div class="drawer__footer">
      <div class="drawer__footer-line"></div>
      <div class="drawer__footer-actions">
        <div class="drawer__footer-left">
          <button class="drawer__btn-save">Save</button>
          <button class="drawer__btn-cancel" data-drawer-close>Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Variant 2: Large Drawer (800px) with RHS Menu + Save/Cancel + Link

Large content drawer with optional RHS icon strip and footer link.

```html
<div class="drawer-backdrop" data-drawer="lgDrawer"></div>
<div class="drawer drawer--lg" id="lgDrawer">
  <div class="drawer__main">
    <div class="drawer__top">
      <div class="drawer__title-area">
        <span class="drawer__title">Large Drawer</span>
        <span class="drawer__title-sep">–</span>
        <span class="drawer__subtitle">Subtitle</span>
      </div>
      <div class="drawer__top-actions">
        <a href="#" class="drawer__top-link">Primary Link</a>
      </div>
      <button class="drawer__close" aria-label="Close">
        <img src="./assets/icons/icon-close.svg" alt="" style="width:14px;height:14px;" />
      </button>
    </div>
    <div class="drawer__body">
    </div>
    <div class="drawer__footer">
      <div class="drawer__footer-line"></div>
      <div class="drawer__footer-actions">
        <div class="drawer__footer-left">
          <button class="drawer__btn-save">Save</button>
          <button class="drawer__btn-cancel" data-drawer-close>Cancel</button>
        </div>
        <div class="drawer__footer-right">
          <a href="#" class="drawer__footer-link">Primary Link</a>
        </div>
      </div>
    </div>
  </div>
  <div class="drawer__rhs">
    <div class="drawer__rhs-group">
      <button class="drawer__rhs-btn" title="Help"><img src="../assets/icons/icon-question.svg" alt="" /></button>
      <button class="drawer__rhs-btn" title="Bot"><img src="../assets/icons/icon-help.svg" alt="" /></button>
    </div>
    <div class="drawer__rhs-group">
      <button class="drawer__rhs-btn" title="Theme"><img src="../assets/icons/icon-dd-settings.svg" alt="" /></button>
    </div>
  </div>
</div>
```

### Variant 3: Auto-width Drawer (fits content)

Dynamic width drawer that sizes to content, capped at 90vw.

```html
<div class="drawer-backdrop" data-drawer="autoDrawer"></div>
<div class="drawer drawer--auto" id="autoDrawer">
  <div class="drawer__main">
    <div class="drawer__top">
      <div class="drawer__title-area">
        <span class="drawer__title">Auto Width</span>
      </div>
      <button class="drawer__close" aria-label="Close">
        <img src="./assets/icons/icon-close.svg" alt="" style="width:14px;height:14px;" />
      </button>
    </div>
    <div class="drawer__body">
    </div>
    <div class="drawer__footer">
      <div class="drawer__footer-line"></div>
      <div class="drawer__footer-actions">
        <div class="drawer__footer-left">
          <button class="drawer__btn-save">Save</button>
          <button class="drawer__btn-cancel" data-drawer-close>Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Variant 4: Card Grid Drawer with Detail Panel

A tile picker layout inside a fixed-grid-width drawer. Includes a card grid (`.drawer-grid`) and an expandable detail panel (`.drawer-detail`).

**Card classes:**
- `.drawer-card` — white card (1px border, 4px radius, 140×140)
- `.drawer-card--muted` — grey card (for "Add Custom"-type tiles)
- `.drawer-card.selected` — blue border highlight
- `.drawer-card__icon` — 48×48 icon container
- `.drawer-card__label` — 12px bold center text
- `.drawer-card__badge` — absolute-positioned green badge ("NEW")

**Detail panel:**
- `.drawer-detail` — hidden by default, `.visible` shows as flex row
- `.drawer-detail__info` — left side: title, fields, description, chart list (scrollable)
- `.drawer-detail__preview` — right side: 300×180 preview image area

```html
<div class="drawer-backdrop" data-drawer="cardDrawer"></div>
<div class="drawer drawer--grid6" id="cardDrawer">
  <div class="drawer__main">
    <div class="drawer__top">
      <div class="drawer__title-area">
        <span class="drawer__title">Pick an Item</span>
      </div>
      <button class="drawer__close" aria-label="Close">
        <img src="./assets/icons/icon-close.svg" alt="" style="width:14px;height:14px;" />
      </button>
    </div>
    <div class="drawer__body" style="padding:16px 24px;">
      <div class="drawer-grid drawer-grid--6col">
        <div class="drawer-card drawer-card--muted">
          <div class="drawer-card__icon"><img src="../assets/icons/icon-tab-add-custom.svg" alt="" /></div>
          <div class="drawer-card__label">Add Custom</div>
        </div>
        <div class="drawer-card selected">
          <div class="drawer-card__icon"><img src="../assets/icons/icon-tab-network-overview.svg" alt="" /></div>
          <div class="drawer-card__label">Network Overview</div>
        </div>
        <div class="drawer-card">
          <div class="drawer-card__icon"><img src="../assets/icons/icon-tab-aws-overview.svg" alt="" /></div>
          <div class="drawer-card__label">AWS Overview</div>
        </div>
      </div>
      <div class="drawer-detail visible">
        <div class="drawer-detail__info">
          <div class="drawer-detail__title">Network Overview</div>
          <div class="drawer-detail__field">
            <label>Tab Name</label>
            <span>Network Overview</span>
          </div>
          <div class="drawer-detail__desc">Visibility into network traffic from routers, switches, firewalls, and IDS/IPS devices.</div>
          <ul class="drawer-detail__charts">
            <li>Traffic by Device</li>
            <li>Top Talkers</li>
            <li>Denied Connections</li>
          </ul>
        </div>
        <div class="drawer-detail__preview">
          <span class="drawer-detail__no-preview">No preview</span>
        </div>
      </div>
    </div>
    <div class="drawer__footer">
      <div class="drawer__footer-line"></div>
      <div class="drawer__footer-actions">
        <div class="drawer__footer-left">
          <button class="drawer__btn-save">Add</button>
          <button class="drawer__btn-cancel" data-drawer-close>Close</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Complete CSS

```css
/* ============================================================
   DRAWER — Predefined CSS Component
   Captured from Figma Elegant Components 1.0 via MCP
   Frame: Drawer (650:42237)

   STRUCTURE:
     Backdrop (rgba(52,63,79,0.4)) + Panel (slides from right)
     Panel = MainContent + RHS Menu (optional 30px icon strip)
     MainContent = TopBar (40px) + Body (scrollable) + Footer (60px)

   WIDTH MODES (set via .drawer--{size} modifier on .drawer):
     .drawer--sm     →  480px  (forms, simple dialogs)
     .drawer--md     →  600px  (medium content)
     .drawer--lg     →  800px  (large content, tables)
     .drawer--xl     →  1000px (extra-large)
     .drawer--auto   →  fit-content (dynamic, max 90vw)
     .drawer--grid6  →  948px  (fixed, 6-col card grid + 24px body padding)
     .drawer--grid5  →  796px  (fixed, 5-col card grid + 24px body padding)
     .drawer--grid4  →  644px  (fixed, 4-col card grid + 24px body padding)
     (default)       →  480px

   FIGMA SPEC:
     TopBar:   h=40, pad 16px LR / 11px TB, gap 16, white bg, 1px bottom border #E9E9E9
     Body:     flex:1, pad 16px all, scrollable, white bg
     Footer:   h=60, pad 0 16 16 16, gap 16, top divider 1px #E9E9E9
     Buttons:  Save (h=28 #2C66DD r=2) / Cancel (h=28 #FFF border #DCDCDC r=2)
     RHS Menu: w=30, white bg, icon buttons 24x24 with 14x14 icons
     Backdrop: rgba(52,63,79,0.4)
     Shadow:   -10px 0 10px rgba(0,0,0,0.16)
   ============================================================ */

.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(52, 63, 79, 0.4);
  z-index: 900;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s ease, visibility 0.25s ease;
}
.drawer-backdrop--active {
  opacity: 1;
  visibility: visible;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  display: flex;
  flex-direction: row;
  z-index: 910;
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), visibility 0s linear 0.3s;
  visibility: hidden;
  pointer-events: none;
}
.drawer--open {
  transform: translateX(0);
  visibility: visible;
  pointer-events: auto;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), visibility 0s linear 0s;
}

.drawer__main {
  width: 480px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  box-shadow: none;
}
.drawer--open .drawer__main {
  box-shadow: -10px 0 10px rgba(0, 0, 0, 0.16);
}
.drawer--sm .drawer__main  { width: 480px; }
.drawer--md .drawer__main  { width: 600px; }
.drawer--lg .drawer__main  { width: 800px; }
.drawer--xl .drawer__main  { width: 1000px; }
.drawer--auto .drawer__main { width: fit-content; min-width: 360px; max-width: 90vw; }
.drawer--grid6 .drawer__main { width: 948px; }
.drawer--grid5 .drawer__main { width: 796px; }
.drawer--grid4 .drawer__main { width: 644px; }

/* ── Top bar (h=40) ── */
.drawer__top {
  height: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #FFFFFF;
  border-bottom: 1px solid #E9E9E9;
  gap: 16px;
}
.drawer__title-area {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}
.drawer__title {
  font-family: var(--font-family, 'Zoho Puvi', sans-serif);
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.drawer__subtitle {
  font-family: var(--font-family, 'Zoho Puvi', sans-serif);
  font-size: 16px;
  font-weight: 400;
  color: #626262;
  white-space: nowrap;
}
.drawer__title-sep {
  font-size: 16px;
  color: #6A6B6C;
}
.drawer__top-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.drawer__top-link {
  font-family: var(--font-family, 'Zoho Puvi', sans-serif);
  font-size: 12px;
  color: #006AFF;
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}
.drawer__top-link:hover { text-decoration: underline; }
.drawer__close {
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  color: #626262;
  flex-shrink: 0;
}
.drawer__close:hover { color: #000000; }
.drawer__close svg { width: 14px; height: 14px; }

/* ── Body (scrollable) ── */
.drawer__body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: #FFFFFF;
}

/* ── Footer (h=60) ── */
.drawer__footer {
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 16px 16px 16px;
  background: #FFFFFF;
  gap: 16px;
}
.drawer__footer-line {
  width: 100%;
  height: 1px;
  background: #E9E9E9;
  flex-shrink: 0;
}
.drawer__footer-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.drawer__footer-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.drawer__footer-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.drawer__btn-save {
  height: 28px;
  padding: 0 16px;
  font-family: var(--font-family, 'Zoho Puvi', sans-serif);
  font-size: 12px;
  font-weight: 500;
  color: #FFFFFF;
  background: #2C66DD;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
.drawer__btn-save:hover { background: #1A56CC; }
.drawer__btn-cancel {
  height: 28px;
  padding: 0 16px;
  font-family: var(--font-family, 'Zoho Puvi', sans-serif);
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  background: #FFFFFF;
  border: 1px solid #DCDCDC;
  border-radius: 2px;
  cursor: pointer;
}
.drawer__btn-cancel:hover { background: #F5F5F5; }
.drawer__footer-link {
  font-family: var(--font-family, 'Zoho Puvi', sans-serif);
  font-size: 12px;
  color: #006AFF;
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}
.drawer__footer-link:hover { text-decoration: underline; }

/* ── RHS Menu (optional 30px icon strip) ── */
.drawer__rhs {
  width: 30px;
  height: 100%;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  flex-shrink: 0;
}
.drawer__rhs-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.drawer__rhs-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 2px;
  color: #626262;
}
.drawer__rhs-btn:hover { background: #F5F5F5; color: #000000; }
.drawer__rhs-btn img,
.drawer__rhs-btn svg { width: 14px; height: 14px; }
.drawer__rhs-avatar {
  width: 30px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #313642;
}
.drawer__rhs-avatar img,
.drawer__rhs-avatar svg { width: 20px; height: 20px; }

/* ── Card Grid (reusable tile picker inside drawer body) ── */
.drawer-grid {
  display: grid;
  gap: 12px;
  justify-content: start;
}
.drawer-grid--6col { grid-template-columns: repeat(6, 140px); }
.drawer-grid--5col { grid-template-columns: repeat(5, 140px); }
.drawer-grid--4col { grid-template-columns: repeat(4, 140px); }

.drawer-card {
  width: 140px;
  height: 140px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  position: relative;
  border: 1px solid #E9E9E9;
  border-radius: 4px;
}
.drawer-card:hover { background: #EAF0FC; border-color: #DCDCDC; }
.drawer-card.selected { background: #EAF0FC; border-color: #2C66DD; border-width: 2px; }
.drawer-card--muted {
  background: #F5F5F5;
  border-color: #E9E9E9;
}
.drawer-card--muted:hover { background: #EBEBEB; }
.drawer-card__icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.drawer-card__icon img,
.drawer-card__icon svg { width: 48px; height: 48px; object-fit: contain; }
.drawer-card__label {
  font-family: var(--font-family, 'Zoho Puvi', sans-serif);
  font-size: 12px;
  font-weight: 600;
  color: #000;
  text-align: center;
  line-height: 1.3;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.drawer-card__badge {
  position: absolute;
  top: 6px;
  right: 6px;
  background: #198019;
  color: #fff;
  font-family: var(--font-family, 'Zoho Puvi', sans-serif);
  font-size: 9px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 2px;
  letter-spacing: 0.3px;
}

/* ── Card Detail Panel (expandable info below grid) ── */
.drawer-detail {
  background: #fff;
  border: 1px solid #E9E9E9;
  border-radius: 4px;
  padding: 24px;
  margin-top: 16px;
  display: none;
  width: 100%;
  box-sizing: border-box;
}
.drawer-detail.visible { display: flex; gap: 24px; }
.drawer-detail__info {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  max-height: 260px;
}
.drawer-detail__title {
  font-family: var(--font-family, 'Zoho Puvi', sans-serif);
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin-bottom: 16px;
}
.drawer-detail__field {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}
.drawer-detail__field label {
  font-family: var(--font-family, 'Zoho Puvi', sans-serif);
  font-size: 12px;
  font-weight: 500;
  color: #000;
  white-space: nowrap;
  min-width: 70px;
}
.drawer-detail__field span {
  font-family: var(--font-family, 'Zoho Puvi', sans-serif);
  font-size: 12px;
  color: #000;
  padding: 4px 8px;
  border: 1px solid #E9E9E9;
  border-radius: 2px;
  background: #F9F9F9;
  flex: 1;
  min-width: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}
.drawer-detail__desc {
  font-family: var(--font-family, 'Zoho Puvi', sans-serif);
  font-size: 12px;
  color: #626262;
  line-height: 1.6;
  margin-bottom: 12px;
}
.drawer-detail__charts {
  list-style: disc;
  padding-left: 20px;
  margin: 0;
}
.drawer-detail__charts li {
  font-family: var(--font-family, 'Zoho Puvi', sans-serif);
  font-size: 12px;
  color: #000;
  line-height: 1.8;
}
.drawer-detail__preview {
  width: 300px;
  height: 180px;
  flex-shrink: 0;
  background: #F5F5F5;
  border: 1px solid #E9E9E9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.drawer-detail__preview img,
.drawer-detail__preview svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.drawer-detail__no-preview {
  font-family: var(--font-family, 'Zoho Puvi', sans-serif);
  font-size: 11px;
  color: #939393;
}

@media (max-width: 1024px) {
  .drawer-grid--6col { grid-template-columns: repeat(3, 140px); }
  .drawer-grid--5col { grid-template-columns: repeat(3, 140px); }
  .drawer-detail.visible { flex-direction: column; }
  .drawer-detail__preview { width: 100%; height: 140px; }
}
@media (max-width: 768px) {
  .drawer__main { width: 100vw !important; }
  .drawer__rhs  { display: none; }
  .drawer-grid--6col,
  .drawer-grid--5col,
  .drawer-grid--4col { grid-template-columns: repeat(2, 140px); }
}
```

## JavaScript API

```js
/**
 * DRAWER — Predefined JS Component
 * Handles open/close animations, backdrop click, Escape key, focus trap.
 *
 * PUBLIC API:
 *   ElegantDrawer.open(drawerId)   — open drawer by id
 *   ElegantDrawer.close(drawerId)  — close drawer by id
 *   ElegantDrawer.toggle(drawerId) — toggle open/close
 *
 * HTML HOOKS:
 *   data-drawer-open="drawerId"    — on any element to open a drawer
 *   data-drawer-close              — on any element inside a drawer to close it
 *   .drawer__close                 — auto-bound close button
 *   .drawer-backdrop[data-drawer="drawerId"] — backdrop auto-bound
 */
(function () {
  'use strict';

  function getDrawer(id) { return document.getElementById(id); }
  function getBackdrop(id) { return document.querySelector('.drawer-backdrop[data-drawer="' + id + '"]'); }

  function open(id) {
    var drawer = getDrawer(id);
    var backdrop = getBackdrop(id);
    if (!drawer) return;
    if (backdrop) backdrop.classList.add('drawer-backdrop--active');
    drawer.classList.add('drawer--open');
    document.body.style.overflow = 'hidden';
    drawer.dispatchEvent(new CustomEvent('drawer:open', { detail: { id: id } }));
  }

  function close(id) {
    var drawer = getDrawer(id);
    var backdrop = getBackdrop(id);
    if (!drawer) return;
    drawer.classList.remove('drawer--open');
    if (backdrop) backdrop.classList.remove('drawer-backdrop--active');
    document.body.style.overflow = '';
    drawer.dispatchEvent(new CustomEvent('drawer:close', { detail: { id: id } }));
  }

  function toggle(id) {
    var drawer = getDrawer(id);
    if (!drawer) return;
    if (drawer.classList.contains('drawer--open')) close(id);
    else open(id);
  }

  function findDrawerId(el) {
    var drawer = el.closest('.drawer');
    return drawer ? drawer.id : null;
  }

  document.addEventListener('click', function (e) {
    var openTrigger = e.target.closest('[data-drawer-open]');
    if (openTrigger) {
      e.preventDefault();
      open(openTrigger.getAttribute('data-drawer-open'));
      return;
    }

    var closeTrigger = e.target.closest('[data-drawer-close]');
    if (closeTrigger) {
      e.preventDefault();
      var id = closeTrigger.getAttribute('data-drawer-close') || findDrawerId(closeTrigger);
      if (id) close(id);
      return;
    }

    var closeBtn = e.target.closest('.drawer__close');
    if (closeBtn) {
      e.preventDefault();
      var id = findDrawerId(closeBtn);
      if (id) close(id);
      return;
    }

    var backdrop = e.target.closest('.drawer-backdrop');
    if (backdrop && backdrop.classList.contains('drawer-backdrop--active')) {
      var id = backdrop.getAttribute('data-drawer');
      if (id) close(id);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var openDrawers = document.querySelectorAll('.drawer--open');
      if (openDrawers.length) {
        var last = openDrawers[openDrawers.length - 1];
        close(last.id);
      }
    }
  });

  window.ElegantDrawer = { open: open, close: close, toggle: toggle };
})();
```

## States

| State | Class / Mechanism | Description |
|---|---|---|
| **Closed** (default) | No `.drawer--open` on `.drawer`, no `.drawer-backdrop--active` | Panel off-screen right, backdrop invisible |
| **Open** | `.drawer--open` + `.drawer-backdrop--active` | Panel slides in, backdrop visible, body scroll locked |
| **Nested** | Multiple drawers can be `.drawer--open` simultaneously | Escape closes the topmost (last in DOM order) |
| **Detail Panel Hidden** | `.drawer-detail` (no `.visible`) | Card detail area collapsed |
| **Detail Panel Visible** | `.drawer-detail.visible` | Shows info + preview below the card grid |
| **Card Selected** | `.drawer-card.selected` | Blue border highlight on selected tile |

### Events

- `drawer:open` — CustomEvent fired on the `.drawer` element when opened
- `drawer:close` — CustomEvent fired on the `.drawer` element when closed

## Assembly Notes

- **Placement:** Drawer HTML (backdrop + drawer panel) goes at the **end of `<body>`**, after all page content. This ensures correct z-index stacking.
- **Backdrop pairing:** Every drawer MUST have a matching `.drawer-backdrop[data-drawer="drawerId"]` placed as a sibling before the drawer element.
- **Body scroll lock:** The JS automatically sets `document.body.style.overflow = 'hidden'` on open and clears it on close.
- **Trigger placement:** The `data-drawer-open="drawerId"` attribute can go on ANY element anywhere in the page (buttons, links, table rows, cards, etc.).
- **Forms inside drawers:** Place `.form-group` with `.form-row` elements inside `.drawer__body`. Use `form-input.css` and `form-dropdown.css` for form controls.
- **Responsive:** At ≤768px, drawer goes full-width and the RHS strip hides. Card grids collapse to 2 columns.
- **Dependencies:** Requires `tokens.css` + `drawer.css` + `drawer.js`.
