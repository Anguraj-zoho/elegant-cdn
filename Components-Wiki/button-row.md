# Button Row

> Component: Button Row
> CSS: `tokens.css` + `table.css` (shared) | JS: none | HTML ref: `button-row.html`

## ⚠ Critical Rules (READ BEFORE BUILDING)

- **Every button on every page uses `.btn-primary` / `.btn-secondary` / `.btn-tertiary`.** NEVER inline-style a button (`<button style="background:#2C66DD;color:#fff">`).
- **Save / Cancel pairs:** Save = `.btn-primary`, Cancel = `.btn-secondary` (or `.btn-tertiary` in drawer footers).
- **Button CSS lives in `tokens.css` + `table.css`** — do NOT duplicate or redefine these classes in inline `<style>` blocks.
- **Icon + label pattern:** leading `<img>` + `<span>text</span>` inside the button. Icons render 14×14.

## Quick Summary

Right-aligned row of action buttons placed above tables or at the bottom of forms. Provides three button tiers — **Primary** (filled blue), **Secondary** (blue-bordered), and **Tertiary** (grey-bordered) — with consistent 28 px height and icon pairing conventions.

## Configuration

| Property | Values | Description |
|---|---|---|
| Variant | `.btn-primary` / `.btn-secondary` / `.btn-tertiary` | Visual weight tier |
| Icon position | Leading `<img>` before `<span>` or trailing after | Icon + label ordering |
| Disabled | `disabled` attribute on `<button>` | Greys out the button |
| Gap | `style="gap:8px;"` on `.button-row` | Spacing between multiple buttons |

### Button Variant Rules

| Tier | Class | Background | Border | Text/Icon Color | Height |
|---|---|---|---|---|---|
| Primary | `.btn-primary` | `#2C66DD` filled | none | White text + white icons | 28 px |
| Secondary | `.btn-secondary` | White fill | 1 px `#2C66DD` | Blue text + blue icons | 28 px |
| Tertiary | `.btn-tertiary` | White fill | 1 px `#ABABAB` | Black text + black icons | 28 px |

### Icon Asset Naming

- **Primary icons:** `assets/icons/icon-*.svg` (black stroke, CSS inverts to white)
- **Secondary icons:** `assets/icons/icon-btn-*.svg` (hard-coded `#2C66DD` stroke)
- **Tertiary icons:** `assets/icons/icon-btn-*-dark.svg` (hard-coded `#000000` stroke)

### Pairing Convention

- **Secondary LEFT + Primary RIGHT** → Cancel / Save footer
- **Tertiary LEFT** of a button row → low-emphasis alt (Reset / Skip / Clear)

## Required Icons

- `icon-plus.svg` (primary add)
- `icon-btn-plus.svg` (secondary add)
- `icon-btn-plus-dark.svg` (tertiary add)
- `icon-btn-chevron-right.svg` (secondary wizard/stepper)
- `icon-btn-help-dark.svg` (tertiary help)

## Complete HTML

```html
<!--
  ============================================================
  BUTTON ROW — Predefined HTML Component
  ============================================================
  Right-aligned row of action buttons above the table.

  BUTTON VARIANTS:
  ────────────────────────────────────────────────────────────
  1) Primary Button   — .btn-primary   (filled blue #2C66DD,  white text + white icons,  28px)
  2) Secondary Button — .btn-secondary (white fill, 1px BLUE  #2C66DD border, blue text/icons, 28px)
  3) Tertiary Button  — .btn-tertiary  (white fill, 1px GREY  #ABABAB border, black text/icons, 28px)

  SECONDARY vs TERTIARY: both are white + outlined + 28px. The ONLY visual
  difference is border color (blue = secondary/next-action, grey = tertiary/neutral).

  ICON ASSETS (external SVG → hard-coded stroke colors — <img> cannot inherit CSS color):
  - Primary:   assets/icons/icon-*.svg        (black stroke, CSS inverts to white)
  - Secondary: assets/icons/icon-btn-*.svg         (hard-coded #2C66DD stroke)
  - Tertiary:  assets/icons/icon-btn-*-dark.svg    (hard-coded #000000 stroke)

  PAIRING CONVENTION:
  - Secondary LEFT + Primary RIGHT   → Cancel / Save footer
  - Tertiary LEFT of a button row    → low-emphasis alt (Reset / Skip / Clear)

  CSS:  tokens.css + table.css
  ============================================================
-->

<!-- ── Variant A: Primary only ── -->
<div class="button-row">
  <button class="btn-primary">
    <img src="../assets/icons/icon-plus.svg" alt="" style="width:10px;height:10px;" />
    <span>Add Device</span>
  </button>
</div>

<!-- ── Variant B: Secondary only ── -->
<div class="button-row">
  <button class="btn-secondary">
    <img src="../assets/icons/icon-btn-plus.svg" alt="" />
    <span>Add Device</span>
  </button>
</div>

<!-- ── Variant C: Tertiary only (neutral / ghost action) ── -->
<div class="button-row">
  <button class="btn-tertiary">
    <img src="../assets/icons/icon-btn-plus-dark.svg" alt="" />
    <span>Add Filter</span>
  </button>
</div>

<!-- ── Variant D: Cancel / Save (Secondary LEFT + Primary RIGHT) ── -->
<div class="button-row" style="gap:8px;">
  <button class="btn-secondary"><span>Cancel</span></button>
  <button class="btn-primary"><span>Save Changes</span></button>
</div>

<!-- ── Variant E: Three-level action row (Tertiary + Secondary + Primary) ── -->
<div class="button-row" style="gap:8px;">
  <button class="btn-tertiary"><span>Reset</span></button>
  <button class="btn-secondary"><span>Preview</span></button>
  <button class="btn-primary"><span>Publish</span></button>
</div>

<!-- ── Variant F: Secondary with trailing chevron (wizard / stepper) ── -->
<div class="button-row">
  <button class="btn-secondary">
    <span>Next Step</span>
    <img src="../assets/icons/icon-btn-chevron-right.svg" alt="" />
  </button>
</div>

<!-- ── Variant G: Tertiary with leading help icon ── -->
<div class="button-row">
  <button class="btn-tertiary">
    <img src="../assets/icons/icon-btn-help-dark.svg" alt="" />
    <span>Learn More</span>
  </button>
</div>

<!-- ── Variant H: Disabled states (all three kinds) ── -->
<div class="button-row" style="gap:8px;">
  <button class="btn-tertiary" disabled><span>Disabled Tertiary</span></button>
  <button class="btn-secondary" disabled><span>Disabled Secondary</span></button>
  <button class="btn-primary" disabled><span>Disabled Primary</span></button>
</div>
```

## Complete CSS

CSS for Button Row is shared via `tokens.css` and `table.css`. The `.button-row`, `.btn-primary`, `.btn-secondary`, and `.btn-tertiary` classes are defined in those files.

## Variants

| Variant | Description | Example |
|---|---|---|
| A | Primary only | Single filled blue CTA |
| B | Secondary only | Single blue-outlined action |
| C | Tertiary only | Single grey-outlined neutral action |
| D | Cancel / Save | Secondary left + Primary right |
| E | Three-level row | Tertiary + Secondary + Primary |
| F | Trailing chevron | Wizard / stepper "Next Step" |
| G | Leading help icon | "Learn More" tertiary |
| H | Disabled states | All three tiers disabled |

## Assembly Notes

- Always place inside a `.button-row` wrapper (flex, right-aligned).
- Use `gap:8px` on the wrapper when pairing multiple buttons.
- Icon sizing: primary plus icon is 10×10 px; secondary/tertiary icons use default SVG size.
- For form footers, use the Cancel / Save pattern (Variant D).
- For wizard steps, use Secondary with trailing chevron (Variant F).
- Button CSS styles are defined in `tokens.css` and `table.css` — do not duplicate.
