# Form Input

> Component: Textbox with Label (Figma "Textbox with Label" & "Form Creation")
> CSS: `form-input.css` | JS: `form-input.js` | HTML ref: `form-input.html`

## ⚠ Critical Rules (READ BEFORE BUILDING)

- **Checkboxes: use `.form-checkbox`** (hides input, shows `icon-checkbox.svg` / `icon-checkbox-checked.svg`). **NEVER** raw `<input type="checkbox">` — it renders the OS-native control (green tick on macOS, square tick on Windows).
- **Radios: use `.form-radio`** (see Type 5 below). **NEVER** raw `<input type="radio">` — same native-rendering problem.
- **Dropdowns: use `form-dropdown.css` patterns.** **NEVER** native `<select>`.
- **Drawer trigger inputs: use `.rpt-textbox`** (`--wide` 280px, `--medium` 200px, `--small` 160px). See STRICT RULE #5 below.
- **Reports filter rows: use `.reports-input-row--type1`.** NEVER redefine `.reports-input-row` in inline `<style>` — the official class is already in `form-input.css`.
- **Input widths are FIXED** (280 / 160 / 100 px) — never `flex:1` or 100% width. Use the variant modifiers `--default` / `--medium` / `--small` / `--full`. (See "Width invariant" below.)
- **Labels hug content** inside `.reports-input-row` or `.form-row--gap-16`. Default label width is 200px.
- **NEVER redefine `.form-row__input` in an inline `<style>` block.** This is the #1 cause of "input is 432px wide instead of 280px" bugs. The library definition (`flex: 0 0 auto; width: 280px`) is the Figma invariant.

## ⛔ Anti-pattern: redefining `.form-row__input` inline

```html
<!-- ❌ WRONG — shipped on the Windows Startup report and produced a 432px
     dropdown trigger inside the Customize View drawer. Inline rule has
     higher specificity than the library file, silently overriding the
     fixed-width contract. -->
<style>
  .drawer-form .form-row__input { flex: 1; min-width: 0; }
  .drawer-form .form-row__input--small { flex: 0 0 120px; }
</style>
```

**Why it breaks:**
1. The library ships `.form-row__input { flex: 0 0 auto; width: 280px; }` as the Figma invariant.
2. Redefining it page-side gives the input "stretch" behavior, which collides with `.form-dropdown-trigger { width: 100% }` and explodes the trigger to fill whatever the parent offers (432px in the drawer).
3. Downstream components (`.form-dropdown-wrap`, `.rpt-textbox`, multi-value tag inputs) all assume the parent respects 280px — their internal padding / icon gutters are tuned for it.
4. Even if YOUR screen looks okay at 432px, it breaks Figma parity and any downstream visual regression review.

## ✅ Width invariant & sanctioned escape hatch

Pick ONE of the four sanctioned width states on `.form-row__input`:

| Modifier | Width | When to use |
|---|---|---|
| `.form-row__input` (no modifier) | **280px** | Default — every standard form field |
| `.form-row__input--default` | 280px | Explicit / for clarity |
| `.form-row__input--medium` | 160px | Medium inputs |
| `.form-row__input--small` | 100px | Short inputs (limits, ports, counts) |
| `.form-row__input--full` | fills row, capped at 100% | Drawer forms where the spec explicitly asks for full-bleed (e.g. long comma-separated list textareas). Rare. |

**Never** set `flex:1`, `width:100%`, `width:Xpx` via inline `<style>`, or any other custom sizing. If the Figma screenshot shows a wider input, it is either:
- the `--full` modifier (check the Figma frame name)
- or a legitimate exception the wiki should document — ask the user before adding one.

### Canonical drawer-form recipe

```html
<div class="drawer-form">
  <div class="form-row">
    <label class="form-row__label">Sort By</label>
    <div class="form-row__input"> <!-- 280px, do NOT override -->
      <div class="form-dropdown-wrap">
        <div class="form-dropdown-trigger" data-dropdown-trigger>
          <input class="form-input form-input--select" type="text" value="Most Occurred" readonly />
          <div class="form-dropdown-trigger__icon"><img src="assets/icons/icon-dropdown-chevron.svg" alt="" /></div>
        </div>
        <!-- .form-dropdown list -->
      </div>
    </div>
  </div>
  <div class="form-row">
    <label class="form-row__label">Limit</label>
    <div class="form-row__input form-row__input--small"> <!-- 100px -->
      <input class="form-input form-input--text" type="text" value="100" />
    </div>
  </div>
</div>
```

The page only has to set up `.drawer-form` as a `flex-direction: column; gap: 16px` container — it must **not** redefine the children.

**Library self-defense (v1.0.2+):** even if a developer sneaks through with an inline `width` override on the `__input` itself, the children (`.form-dropdown-wrap`, `.form-dropdown-trigger`, `.rpt-textbox`) are now clamped to `max-width: 100%` so the bug is visually bounded. But the correct fix is still to remove the override.

## Quick Summary

A comprehensive form input system with 22 input types covering text, textarea, dropdowns, radio groups, password, number spinners, file uploads, tags, date/time, port/protocol fields, frequency selectors, and more. All inputs follow strict fixed-width rules from Figma (280px default, 160px medium, 100px small) and NEVER stretch to fill their container. Labels default to 200px width on Form pages with auto-balance across the form.

## Configuration

### Input Width Rules (STRICT — from Figma)

| Modifier | Width | Usage |
|---|---|---|
| `.form-row__input` (default) | 280px | Standard inputs |
| `.form-row__input--medium` | 160px | Medium inputs |
| `.form-row__input--small` | 100px | Small inputs |

Inputs NEVER use `flex:1` or stretch to fill the container.

### Label Width Rules

| Modifier | Width | Usage |
|---|---|---|
| `.form-row__label` (default) | 200px | Every Form page |
| `.form-row__label--140` | 140px | Rare edge-case (per-row only) |
| `.form-row__label--100` | 100px | Rare edge-case (per-row only) |
| `.form-row__label--80` | 80px | Rare edge-case (per-row only) |

**Auto-balance rule (MANDATORY):** inside a single Form container, ALL labels must share the SAME width — equal to the widest label needed. Never mix per-row `--80/--100/--140` modifiers inside one form; that's the #1 source of visually-jagged label columns.

#### ✅ The safe way — container-scoped balance modifiers (preferred)

Instead of stamping `--100` / `--140` on every `<label>` and hoping you didn't miss one, set ONE modifier on the form container and all labels inherit the same width.

| Container modifier | Label width | When to use |
|---|---|---|
| `.drawer-form` (no modifier) or `.form-group` | 200px (inherits default) | Standard form / wide drawer |
| `.drawer-form--labels-80` / `.form-group--labels-80` | 80px | Very tight drawers (Customize View with 1-word labels) |
| `.drawer-form--labels-100` / `.form-group--labels-100` | 100px | Most compact drawers (Customize View, Pin to Dashboard) |
| `.drawer-form--labels-120` / `.form-group--labels-120` | 120px | Medium drawers |
| `.drawer-form--labels-140` / `.form-group--labels-140` | 140px | Wider drawers |
| `.drawer-form--labels-160` / `.form-group--labels-160` | 160px | Settings forms with long labels |
| `.drawer-form--labels-200` / `.form-group--labels-200` | 200px | Explicit — same as default |

```html
<!-- ✅ CORRECT — one class balances every label to 100px -->
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
```

#### ⛔ Anti-pattern — `.form-row--gap-16` in a drawer form with >1 row

`.form-row--gap-16` triggers **hug-content** labels. That's appropriate for a **horizontal `.reports-input-row`** (labels of independent fields). Inside a **vertical drawer form**, hug-content produces a jagged left edge — "Field" at 25px, "Sort By" at 60px, "Limit" at 30px — which violates the auto-balance rule.

```html
<!-- ❌ WRONG — produced the "inconsistent label width" bug in Customize View -->
<div class="drawer-form">
  <div class="form-row form-row--gap-16">...</div>  <!-- hug-content -->
  <div class="form-row form-row--gap-16">...</div>  <!-- hug-content -->
  <div class="form-row form-row--gap-16">...</div>  <!-- hug-content -->
</div>
```

**Rule of thumb:**
- Vertical form (rows stacked, one field per row) → container modifier `--labels-*`.
- Horizontal row (`.reports-input-row` — multiple fields side-by-side) → `.form-row--gap-16` on each row is fine (labels are independent).

**Dev warning:** with `<html data-fi-debug>`, any `.drawer-form` with more than one row but no `--labels-*` modifier is outlined red.

**Hug-content exception:** `.form-row--gap-16` is still the correct choice inside a `.reports-input-row` on a Reports page — the filters there are logically independent fields.

### Reports Input Row Spacing (STRICT RULE #3)

- Label → input gap: **16px** (not 8px) — `.form-row--gap-16`
- Gap between sibling input groups: **24px** — set on `.reports-input-row`
- Type 1 layout: 12px gap + flex-spacer pattern via `.reports-input-row--type1`

### RPT-Textbox (Input-as-Drawer-Trigger, STRICT RULE #5)

When an INPUT control opens a Drawer (icon inside textbox launches a drawer), MUST use `.rpt-textbox`:

```html
<div class="rpt-textbox rpt-textbox--wide">
  <input type="text" value="DC-PRIMARY-01, +4 more" />
  <button class="rpt-textbox__icon-btn" title="Select — opens drawer" onclick="openDrawer()">
    <img src="./assets/icons/icon-input-plus.svg" alt="" />
  </button>
</div>
```

Width variants: `--wide` 280px | `--medium` 200px | `--small` 160px.

## Required Icons

All icons are local Figma-exported SVGs from `assets/icons/`:

- `icon-search.svg` — Search icon (14×14)
- `icon-radio-checked.svg` — Checked radio button (16×16)
- `icon-radio-unchecked.svg` — Unchecked radio button (16×16)
- `icon-info.svg` — Info tooltip icon (14×14)
- `icon-plus.svg` — Plus / add icon (14×14)
- `icon-dropdown-chevron.svg` — Dropdown chevron (14×14)
- `icon-calendar.svg` — Calendar icon (14×14)
- `icon-upload.svg` — Upload icon (14×14)
- `icon-eye-show.svg` — Show password (14×14)
- `icon-eye-hide.svg` — Hide password (14×14)
- `icon-number-up.svg` — Number spinner up arrow (8×5)
- `icon-number-down.svg` — Number spinner down arrow (8×5)
- `icon-tag-close.svg` — Tag remove X (10×10)
- `icon-checkbox.svg` — Unchecked checkbox (16×16)
- `icon-checkbox-checked.svg` — Checked checkbox (16×16)
- `icon-input-plus.svg` — RPT-textbox drawer trigger icon (14×14)

## Variants

### Type 1: Standard Text Input (Label + Textbox)

Figma: innerType="Standard", mandatory=false

```html
<div class="form-row">
  <label class="form-row__label">Label Name</label>
  <div class="form-row__input">
    <input class="form-input form-input--text" type="text" placeholder="Enter a unique name" />
  </div>
</div>
```

### Type 2: Standard Text with Mandatory (*)

Figma: innerType="Standard", mandatory=true

```html
<div class="form-row">
  <label class="form-row__label">Label Name <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <input class="form-input form-input--text" type="text" placeholder="Enter a unique name" />
  </div>
</div>
```

### Type 3: Description / Textarea

Figma: innerType="Description", h=68px

```html
<div class="form-row">
  <label class="form-row__label">Description <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <textarea class="form-input form-input--textarea" placeholder="Enter description..."></textarea>
  </div>
</div>
```

### Type 4: Standard with Front Icon

Figma: innerType="Standard with Front Icon"

```html
<div class="form-row">
  <label class="form-row__label">Search <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <div class="form-input-icon-wrap form-input-icon-wrap--left">
      <span class="form-input-icon-wrap__icon"><img src="./assets/icons/icon-search.svg" alt="" /></span>
      <input class="form-input" type="text" placeholder="Enter a unique name" />
    </div>
  </div>
</div>
```

### Type 5: Radio Group (Domain / Workgroup)

Figma: idx 4 — detached with 2 radios

```html
<div class="form-row">
  <label class="form-row__label">Connection Type <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <div class="form-radio-group">
      <label class="form-radio">
        <input class="form-radio__input" type="radio" name="connectionType" value="domain" checked />
        <img class="form-radio__icon form-radio__icon--checked" src="./assets/icons/icon-radio-checked.svg" alt="" />
        <img class="form-radio__icon form-radio__icon--unchecked" src="./assets/icons/icon-radio-unchecked.svg" alt="" />
        <span>Domain</span>
      </label>
      <label class="form-radio">
        <input class="form-radio__input" type="radio" name="connectionType" value="workgroup" />
        <img class="form-radio__icon form-radio__icon--checked" src="./assets/icons/icon-radio-checked.svg" alt="" />
        <img class="form-radio__icon form-radio__icon--unchecked" src="./assets/icons/icon-radio-unchecked.svg" alt="" />
        <span>Workgroup</span>
      </label>
      <img class="form-radio__info" src="./assets/icons/icon-info.svg" alt="info" title="Choose connection type" />
    </div>
  </div>
</div>
```

### Type 6: Text with Pre-filled Value + Plus Icon

Figma: Text Value visible + "plus" icon at right edge (14×14)

```html
<div class="form-row">
  <label class="form-row__label">Device Type <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <div class="form-input-icon-wrap form-input-icon-wrap--right">
      <input class="form-input form-input--text" type="text" value="Member Server, Workstation" />
      <span class="form-input-icon-wrap__icon form-input-icon-wrap__plus" title="Add new"><img src="./assets/icons/icon-plus.svg" alt="add" /></span>
    </div>
  </div>
</div>
```

### Type 7: Select / Dropdown (Custom)

Figma: "Textbox without Label" + Input Types = true. NEVER use native `<select>`.

**PLACEHOLDER RULE (ZERO TOLERANCE):**
- `"- Select -"` / `"Enter Value"` / `"Choose an option"` is PLACEHOLDER text.
- It goes in the `placeholder` attribute — NEVER as a `.form-dropdown__item`.

**Variant A — EMPTY / DEFAULT state** (placeholder shown in #939393 gray):

```html
<div class="form-row">
  <label class="form-row__label">Category <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <div class="form-dropdown-wrap">
      <div class="form-dropdown-trigger" data-dropdown-trigger>
        <input class="form-input form-input--select" type="text" placeholder="- Select -" readonly />
        <div class="form-dropdown-trigger__icon"><img src="./assets/icons/icon-dropdown-chevron.svg" alt="" /></div>
      </div>
      <div class="form-dropdown">
        <div class="form-dropdown__list">
          <div class="form-dropdown__item">Option A</div>
          <div class="form-dropdown__item">Option B</div>
          <div class="form-dropdown__item">Option C</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Variant B — PRE-SELECTED state** (value rendered in #000 black):

```html
<div class="form-row">
  <label class="form-row__label">Category <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <div class="form-dropdown-wrap">
      <div class="form-dropdown-trigger" data-dropdown-trigger>
        <input class="form-input form-input--select" type="text" value="Option B" readonly />
        <div class="form-dropdown-trigger__icon"><img src="./assets/icons/icon-dropdown-chevron.svg" alt="" /></div>
      </div>
      <div class="form-dropdown">
        <div class="form-dropdown__list">
          <div class="form-dropdown__item">Option A</div>
          <div class="form-dropdown__item form-dropdown__item--selected">Option B</div>
          <div class="form-dropdown__item">Option C</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Type 8: Date/Time Range

Figma: value "2025-12-01 00:00:00 - 2026-12-01 23:59:59"

```html
<div class="form-row">
  <label class="form-row__label">Date Range <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <div class="form-input-calendar">
      <input class="form-input" type="text" value="2025-12-01 00:00:00 - 2026-12-01 23:59:59" />
      <img class="form-input-calendar__icon" src="./assets/icons/icon-calendar.svg" alt="" />
    </div>
  </div>
</div>
```

### Type 9: File Upload (with Upload button)

Figma: placeholder "- Upload -", button "Upload"

```html
<div class="form-row form-row--half">
  <label class="form-row__label">SSL Certificate <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <div class="form-input-upload">
      <input class="form-input" type="text" placeholder="- Upload -" readonly />
      <button class="form-input-upload__btn" type="button">
        <img src="./assets/icons/icon-upload.svg" alt="" /> Upload
      </button>
    </div>
  </div>
</div>
```

### Type 10: File Upload (with Browse button)

Figma: placeholder "- Upload -", button "Browse"

```html
<div class="form-row form-row--half">
  <label class="form-row__label">Import File <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <div class="form-input-upload">
      <input class="form-input" type="text" placeholder="- Upload -" readonly />
      <button class="form-input-upload__btn" type="button">Browse</button>
    </div>
  </div>
</div>
```

### Type 11: File Upload (with Cc suffix)

Figma: placeholder "- Upload -", suffix "Cc"

```html
<div class="form-row form-row--half">
  <label class="form-row__label">Email Cc <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <div class="form-input-upload">
      <input class="form-input" type="text" placeholder="- Upload -" readonly />
      <button class="form-input-upload__btn" type="button">Cc</button>
    </div>
  </div>
</div>
```

### Type 12: Text with Pre-filled Server Name

Figma: value "PROD-SVR-01"

```html
<div class="form-row">
  <label class="form-row__label">Server Name <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <input class="form-input form-input--text" type="text" value="PROD-SVR-01" />
  </div>
</div>
```

### Type 13: Password Input

Figma: value masked "●●●●●●●●●"

```html
<div class="form-row">
  <label class="form-row__label">Password <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <div class="form-input-password">
      <input class="form-input" type="password" value="mysecretpassword123" />
      <button class="form-input-password__toggle" type="button">
        <img src="./assets/icons/icon-eye-show.svg" alt="Show" />
      </button>
    </div>
  </div>
</div>
```

### Type 14: Icon Right (calendar trigger, search icon right)

Figma: innerType="Standard - Icon Right"

```html
<div class="form-row form-row--half">
  <label class="form-row__label">Date <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <div class="form-input-icon-wrap form-input-icon-wrap--right">
      <input class="form-input" type="text" placeholder="Enter Value" />
      <span class="form-input-icon-wrap__icon"><img src="./assets/icons/icon-calendar.svg" alt="" /></span>
    </div>
  </div>
</div>
```

### Type 15: Icon Left

Figma: innerType="Standard - Icon Left"

```html
<div class="form-row form-row--half">
  <label class="form-row__label">Search <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <div class="form-input-icon-wrap form-input-icon-wrap--left">
      <span class="form-input-icon-wrap__icon"><img src="./assets/icons/icon-search.svg" alt="" /></span>
      <input class="form-input" type="text" placeholder="Enter Value" />
    </div>
  </div>
</div>
```

### Type 16: Number Input (with up/down arrows)

Figma: innerType="Number", value=25

```html
<div class="form-row form-row--half">
  <label class="form-row__label">Port Number <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <div class="form-input-number">
      <input class="form-input" type="number" value="25" min="1" max="65535" />
      <div class="form-input-number__arrows">
        <button class="form-input-number__btn form-input-number__btn--up" type="button">
          <img src="./assets/icons/icon-number-up.svg" alt="up" />
        </button>
        <button class="form-input-number__btn form-input-number__btn--down" type="button">
          <img src="./assets/icons/icon-number-down.svg" alt="down" />
        </button>
      </div>
    </div>
  </div>
</div>
```

### Type 17: Port Input (protocol + host + port)

Figma: innerType="Port-1" → "https://" + input + ":443"

```html
<div class="form-row form-row--half">
  <label class="form-row__label">Server URL <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <div class="form-input-port">
      <span class="form-input-port__prefix">https://</span>
      <input class="form-input" type="text" placeholder="Enter Value" />
      <span class="form-input-port__suffix">:443</span>
    </div>
  </div>
</div>
```

### Type 18: Frequency Input (dropdown + time selectors)

Figma: innerType="Frequency"

```html
<div class="form-row">
  <label class="form-row__label">Schedule <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <div class="form-input-frequency">
      <div class="form-dropdown-wrap">
        <input class="form-input form-input--select" type="text" value="Daily" readonly data-dropdown-trigger style="width:auto;min-width:80px;" />
        <div class="form-dropdown" style="width:120px;">
          <div class="form-dropdown__list">
            <div class="form-dropdown__item form-dropdown__item--selected">Daily</div>
            <div class="form-dropdown__item">Weekly</div>
            <div class="form-dropdown__item">Monthly</div>
          </div>
        </div>
      </div>
      <span class="form-input-frequency__sep">at</span>
      <div class="form-input-number">
        <input class="form-input" type="number" value="12" min="0" max="23" />
        <div class="form-input-number__arrows">
          <button class="form-input-number__btn form-input-number__btn--up" type="button"><img src="./assets/icons/icon-number-up.svg" alt="" /></button>
          <button class="form-input-number__btn form-input-number__btn--down" type="button"><img src="./assets/icons/icon-number-down.svg" alt="" /></button>
        </div>
      </div>
      <span class="form-input-frequency__sep">hrs</span>
      <div class="form-input-number">
        <input class="form-input" type="number" value="00" min="0" max="59" />
        <div class="form-input-number__arrows">
          <button class="form-input-number__btn form-input-number__btn--up" type="button"><img src="./assets/icons/icon-number-up.svg" alt="" /></button>
          <button class="form-input-number__btn form-input-number__btn--down" type="button"><img src="./assets/icons/icon-number-down.svg" alt="" /></button>
        </div>
      </div>
      <span class="form-input-frequency__sep">mins</span>
    </div>
  </div>
</div>
```

### Type 19: Dropdown with Icon (Custom)

Figma: innerType="Stand with Icon Dropdown". Same structure as Type 7.

```html
<div class="form-row form-row--half">
  <label class="form-row__label">Category <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <div class="form-dropdown-wrap">
      <div class="form-dropdown-trigger" data-dropdown-trigger>
        <input class="form-input form-input--select" type="text" placeholder="Enter Value" readonly />
        <div class="form-dropdown-trigger__icon"><img src="./assets/icons/icon-dropdown-chevron.svg" alt="" /></div>
      </div>
      <div class="form-dropdown">
        <div class="form-dropdown__list">
          <div class="form-dropdown__item">Category A</div>
          <div class="form-dropdown__item">Category B</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Type 20: Tags Input

Figma: innerType="Tags", pre-filled tags

```html
<div class="form-row form-row--half">
  <label class="form-row__label">Tags <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <div class="form-input-tags">
      <span class="form-input-tags__tag">admin <img class="form-input-tags__tag-remove" src="./assets/icons/icon-tag-close.svg" alt="×" /></span>
      <span class="form-input-tags__tag">security <img class="form-input-tags__tag-remove" src="./assets/icons/icon-tag-close.svg" alt="×" /></span>
      <input class="form-input-tags__input" type="text" placeholder="Add tag..." />
    </div>
  </div>
</div>
```

### Type 21: Text with Description Helper

Figma: descVisible=true

```html
<div class="form-row">
  <label class="form-row__label">Retention Period <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <input class="form-input form-input--text" type="text" placeholder="Select retention period" />
    <span class="form-row__desc">Data will be automatically purged after the retention period expires.</span>
  </div>
</div>
```

### Type 22: Email Input

Figma: value "admin@zohocorp.com"

```html
<div class="form-row">
  <label class="form-row__label">Email <span class="form-row__mandatory">*</span></label>
  <div class="form-row__input">
    <input class="form-input form-input--text" type="email" value="admin@zohocorp.com" />
  </div>
</div>
```

### Save / Cancel Bar

Figma: "Save and Cancel" component, 24px gap from form group.

**Canonical button order (LEFT → RIGHT):**
1. `.btn-primary` — Save / Apply / Submit (action color)
2. `.btn-tertiary` — Cancel / Discard (neutral white + grey border)
3. `.form-actions__link` — Reset (optional text link, rightmost)

**ZERO TOLERANCE:** Never use `.btn-secondary` (blue border) for Cancel.

```html
<div class="form-actions">
  <button class="btn-primary" type="button">Save</button>
  <button class="btn-secondary" type="button">Cancel</button>
  <a class="form-actions__link" href="#">Reset</a>
</div>
```

## Complete CSS

```css
/* ============================================================
   FORM INPUT — Predefined Component
   Extracted from Figma "Textbox with Label" & "Form Creation"
   Specs: height 26px per row, 16px gap between rows, 24px gap
   between form group and save/cancel bar
   ──────────────────────────────────────────────────────────────
   STRICT RULE #1 — INPUT WIDTHS: Form inputs have 3 FIXED widths
   from Figma. They NEVER stretch to fill the container.
     Default = 280px  (Figma innerType "Standard")
     Medium  = 160px  (Figma innerType "Medium")
     Small   = 100px  (Figma innerType "Small")

   STRICT RULE #2 — LABEL WIDTHS: Form labels have ONE default
   plus THREE rare width variants. The default is used on every
   real multi-input Form page. The rare variants are used inside
   a Reports Input Row container (`.reports-input-row`).

     Default  (Form pages)        = 200px  → .form-row__label
     Rare (edge-case only)    140 = 140px  → .form-row__label--140
     Rare (edge-case only)    100 = 100px  → .form-row__label--100
     Rare (edge-case only)     80 =  80px  → .form-row__label--80
     (Inside a .reports-input-row or .form-row--gap-16, labels HUG
      content — STRICT RULE #4 below. The rare widths are forbidden
      there; the cascade auto-overrides them to width:auto.)

   STRICT RULE #3 — REPORTS INPUT ROW SPACING (MANDATORY whenever
   one OR more inputs sit inside a `.reports-input-row` container
   on a Reports page):

     • Label → input gap = 16px  (NOT 8px)
         → .form-row--gap-16  (applied explicitly)
         → ALSO auto-applied by the descendant rule
           `.reports-input-row .form-row { gap:16px; }` below, so
           developers get the correct spacing even if they forget
           the modifier.
     • Gap BETWEEN sibling input groups in the row = 24px
         → set `.reports-input-row { gap: 24px; }` on the container
         (this is the page-scoped container, not a predefined class).
     • Buttons (.btn-primary, filter buttons) that live inside the
       Reports Input Row follow the same 24px sibling gap.
     • When the row uses a specific LAYOUT TYPE from the
       "Input Row Layout Assembly" system (e.g. Type 1 for
       Reports), the Type modifier `.reports-input-row--typeN`
       overrides the gap to the value captured from Figma
       (Type 1 = 12px + flex-spacer pattern). See the
       "INPUT ROW LAYOUT ASSEMBLY — TYPES" block below for the
       full Type spec.

   STRICT RULE #5 — WHEN AN INPUT IS THE DRAWER TRIGGER, USE `.rpt-textbox`
   (conditional, narrow-scope rule):

     ⚠️ IMPORTANT SCOPE:
       A Drawer in Elegant 1.0 can be opened by ANY component —
       Primary/Secondary/Tertiary buttons, action-bar icon buttons,
       links, menu items, row-clicks on a table, cards, alerts,
       etc. An input is just ONE of many possible triggers.
       This rule does NOT mandate that every drawer be opened by
       an input, and it does NOT mandate that every input open a
       drawer.

     ✅ THE RULE IS CONDITIONAL — it only applies in this specific
     intersection:

        IF  (the trigger is a text-input control)
        AND (clicking the embedded icon opens a Drawer)
        THEN the input MUST use the predefined `.rpt-textbox`
             component.

   STRICT RULE #4 — HUG-CONTENT LABELS IN A 16PX-GAP ROW
   (MANDATORY whenever `.form-row--gap-16` is applied, OR whenever
   a `.form-row` is nested inside a `.reports-input-row`):

     • Label width = HUG CONTENT (auto, no fixed basis).

   🚨 AUTO-BALANCE RULE (applies to every Form page that has
      multiple inputs in a stack or row): if ONE label's character
      count grows or shrinks, ALL labels on that page must adopt
      the SAME width — equal to the widest label needed.
   ============================================================ */

/* ── Form Container ── */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ── Save / Cancel Bar ── */
.form-actions {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 16px 16px 16px 0;
  border-top: 1px solid #E9E9E9;
  margin-top: 24px;
}
.form-actions__link {
  font-family: var(--font-family);
  font-size: 12px; color: #006AFF;
  text-decoration: none; cursor: pointer;
  margin-left: 4px;
}
.form-actions__link:hover { color: #0055D4; text-decoration: underline; }

/* ── Single Form Row (label + input) ── */
.form-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  min-height: 26px;
}
.form-row--inline {
  display: inline-flex;
  width: auto;
}
.form-row--gap-16 { gap: 16px; }

/* ── Reports Input Row — MANDATORY spacing (STRICT RULE #3) ── */
.reports-input-row .form-row { gap: 16px; }

/* ── Type 1 (Reports) — left filters + flex-spacer + right-aligned Period ── */
.reports-input-row--type1 {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  flex-wrap: nowrap;
}

.reports-input-row__group {
  display: flex;
  align-items: center;
  gap: 12px;
}
.reports-input-row__group--right { margin-left: auto; }

.reports-input-row--type1 > .reports-input-row__right { margin-left: auto; }


/* ── Hug-content label (STRICT RULE #4) ── */
.form-row--gap-16 > .form-row__label,
.reports-input-row .form-row__label {
  flex: 0 0 auto;
  width: auto;
  min-width: 0;
}

/* ── Label Area ── */
.form-row__label {
  flex: 0 0 200px;
  display: flex;
  align-items: center;
  gap: 2px;
  height: 26px;
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 400;
  color: #000;
  white-space: nowrap;
}
.form-row__label--140 { flex-basis: 140px; }
.form-row__label--100 { flex-basis: 100px; }
.form-row__label--80  { flex-basis:  80px; }
.form-row__mandatory {
  color: #DD1616;
  font-size: 12px;
  margin-left: 2px;
}

/* ── Input Area (right side) — NEVER flex:1 / fill container ── */
.form-row__input {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 280px;
}

/* ── Fixed Input Widths (from Figma) ── */
.form-row__input--default { width: 280px; }
.form-row__input--medium  { width: 160px; }
.form-row__input--small   { width: 100px; }

/* ── Shared Input Base ── */
.form-input {
  font-family: var(--font-family);
  font-size: 12px;
  color: #000;
  height: 26px;
  padding: 0 8px;
  border: 1px solid #DCDCDC;
  border-radius: 2px;
  background: #fff;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  transition: border-color 0.15s;
}
.form-input::placeholder {
  color: #939393;
  font-size: 12px;
}
.form-input:hover { border-color: #ABABAB; }
.form-input:focus { border-color: #2C66DD; }
.form-input:disabled,
.form-input[readonly]:not(.form-input--select) {
  background: #F5F5F5;
  color: #939393;
  cursor: not-allowed;
}
.form-input--error { border-color: #DD1616 !important; }

/* ── Type: Standard Text ── */
.form-input--text { /* inherits base */ }

/* ── Type: Description / Textarea ── */
.form-input--textarea {
  height: 68px;
  padding: 6px 8px;
  resize: vertical;
  line-height: 1.5;
}

/* ── Type: Select / Dropdown (Custom — NEVER native <select>) ── */
.form-dropdown-trigger {
  display: flex;
  align-items: center;
  width: 100%;
  height: 26px;
  background: #fff;
  border: 1px solid #C4C4C4;
  border-radius: 2px;
  box-sizing: border-box;
  cursor: pointer;
  transition: border-color 0.15s;
  overflow: hidden;
}
.form-dropdown-trigger:hover { border-color: #ABABAB; }

.form-dropdown-wrap:has(.form-dropdown--open) .form-dropdown-trigger {
  border-color: #2C66DD;
}

.form-input--select {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: none !important;
  border-radius: 0;
  background: transparent;
  padding: 0 0 0 12px;
  cursor: pointer;
  user-select: none;
  caret-color: transparent;
  appearance: none;
  -webkit-appearance: none;
}
.form-input--select:hover,
.form-input--select:focus { border-color: transparent !important; box-shadow: none; }
.form-input--select[readonly] {
  background: transparent;
  color: #000;
  cursor: pointer;
}
.form-input--select::placeholder { color: #939393; opacity: 1; }
.form-input--select::-webkit-input-placeholder { color: #939393; }
.form-input--select::-moz-placeholder { color: #939393; opacity: 1; }

.form-dropdown-trigger__icon {
  flex: 0 0 26px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F5F5F5;
  border-left: 1px solid #C4C4C4;
  border-radius: 0 2px 2px 0;
  box-sizing: border-box;
}
.form-dropdown-trigger__icon img,
.form-dropdown-trigger__icon svg {
  width: 14px;
  height: 14px;
  display: block;
}

/* Compact variant — pagination page-size pickers, action-bar filters */
.form-dropdown-trigger--compact {
  height: 22px;
}
.form-dropdown-trigger--compact .form-input--select {
  padding-left: 8px;
  font-size: 11px;
}
.form-dropdown-trigger--compact .form-dropdown-trigger__icon {
  flex: 0 0 20px;
  width: 20px;
  height: 22px;
  background: transparent;
  border-left: none;
  border-radius: 0;
}
.form-dropdown-trigger--compact .form-dropdown-trigger__icon img,
.form-dropdown-trigger--compact .form-dropdown-trigger__icon svg {
  width: 10px;
  height: 10px;
}

/* ── Type: Standard with Front Icon ── */
.form-input-icon-wrap {
  display: flex;
  align-items: center;
  height: 26px;
  border: 1px solid #DCDCDC;
  border-radius: 2px;
  background: #fff;
  overflow: hidden;
  transition: border-color 0.15s;
}
.form-input-icon-wrap:hover { border-color: #ABABAB; }
.form-input-icon-wrap:focus-within { border-color: #2C66DD; }
.form-input-icon-wrap__icon {
  flex: 0 0 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
}
.form-input-icon-wrap__icon img,
.form-input-icon-wrap__icon svg { width: 14px; height: 14px; }
.form-input-icon-wrap .form-input {
  border: none;
  height: 24px;
  flex: 1;
}
.form-input-icon-wrap .form-input:focus { box-shadow: none; }

/* Icon on right side */
.form-input-icon-wrap--right { flex-direction: row; }
.form-input-icon-wrap--right .form-input-icon-wrap__icon { order: 2; }
.form-input-icon-wrap--right .form-input { order: 1; }

/* Plus icon (clickable — opens tab) */
.form-input-icon-wrap__plus { cursor: pointer; }
.form-input-icon-wrap__plus:hover { background: #F5F5F5; border-radius: 2px; }

/* Icon on left side */
.form-input-icon-wrap--left .form-input-icon-wrap__icon { order: 1; }
.form-input-icon-wrap--left .form-input { order: 2; }

/* ── Type: Radio Group ── */
.form-radio-group {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 26px;
}
.form-radio {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: 12px;
  color: #000;
}
.form-radio__input { display: none; }
.form-radio__icon {
  width: 16px; height: 16px;
  flex: 0 0 16px;
}
.form-radio__icon--checked { display: none; }
.form-radio__icon--unchecked { display: block; }
.form-radio__input:checked ~ .form-radio__icon--checked { display: block; }
.form-radio__input:checked ~ .form-radio__icon--unchecked { display: none; }
.form-radio__info {
  width: 14px; height: 14px;
  margin-left: 4px;
  cursor: help;
}

/* ── Type: Password ── */
.form-input-password {
  display: flex;
  align-items: center;
  height: 26px;
  border: 1px solid #DCDCDC;
  border-radius: 2px;
  background: #fff;
  overflow: hidden;
  transition: border-color 0.15s;
}
.form-input-password:hover { border-color: #ABABAB; }
.form-input-password:focus-within { border-color: #2C66DD; }
.form-input-password .form-input {
  border: none; height: 24px; flex: 1;
}
.form-input-password__toggle {
  flex: 0 0 26px;
  display: flex; align-items: center; justify-content: center;
  height: 26px; cursor: pointer; background: none; border: none; padding: 0;
}
.form-input-password__toggle img,
.form-input-password__toggle svg { width: 14px; height: 14px; }

/* ── Type: Number (with up/down arrows) ── */
.form-input-number {
  display: flex;
  align-items: center;
  height: 26px;
  border: 1px solid #DCDCDC;
  border-radius: 2px;
  background: #fff;
  overflow: hidden;
  transition: border-color 0.15s;
}
.form-input-number:hover { border-color: #ABABAB; }
.form-input-number:focus-within { border-color: #2C66DD; }
.form-input-number .form-input {
  border: none; height: 24px; flex: 1;
  text-align: center; -moz-appearance: textfield;
}
.form-input-number .form-input::-webkit-inner-spin-button,
.form-input-number .form-input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.form-input-number__arrows {
  display: flex; flex-direction: column;
  flex: 0 0 20px; height: 26px;
  border-left: 1px solid #DCDCDC;
}
.form-input-number__btn {
  flex: 1; display: flex; align-items: center; justify-content: center;
  cursor: pointer; background: none; border: none; padding: 0;
}
.form-input-number__btn:hover { background: #F5F5F5; }
.form-input-number__btn img,
.form-input-number__btn svg { width: 8px; height: 5px; }
.form-input-number__arrows .form-input-number__btn + .form-input-number__btn {
  border-top: 1px solid #DCDCDC;
}

/* ── Type: Port (protocol + host + port) ── */
.form-input-port {
  display: flex;
  align-items: center;
  height: 26px;
  gap: 0;
}
.form-input-port__prefix {
  flex: 0 0 auto;
  height: 26px; padding: 0 8px;
  display: flex; align-items: center;
  font-family: var(--font-family); font-size: 12px; color: #626262;
  background: #F5F5F5;
  border: 1px solid #DCDCDC;
  border-right: none; border-radius: 2px 0 0 2px;
  white-space: nowrap;
}
.form-input-port .form-input {
  border-radius: 0; flex: 1 1 0; min-width: 0;
}
.form-input-port__suffix {
  flex: 0 0 auto;
  height: 26px; padding: 0 8px;
  display: flex; align-items: center;
  font-family: var(--font-family); font-size: 12px; color: #626262;
  background: #F5F5F5;
  border: 1px solid #DCDCDC;
  border-left: none; border-radius: 0 2px 2px 0;
  white-space: nowrap;
}

/* ── Type: Frequency ── */
.form-input-frequency {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 26px;
  flex-wrap: nowrap;
}
.form-input-frequency .form-dropdown-trigger {
  width: auto; min-width: 80px; flex: 0 0 auto;
}
.form-input-frequency__sep {
  font-family: var(--font-family);
  font-size: 12px; color: #626262;
  white-space: nowrap;
}
/* ── Type: Dropdown with icon ── */
.form-input--icon-dropdown {
  padding-left: 28px;
  background-image: url('../assets/icons/icon-chevron-down.svg');
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 12px;
}

/* ── Type: Tags ── */
.form-input-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  min-height: 26px;
  padding: 3px 8px;
  border: 1px solid #DCDCDC;
  border-radius: 2px;
  background: #fff;
  cursor: text;
  transition: border-color 0.15s;
}
.form-input-tags:hover { border-color: #ABABAB; }
.form-input-tags:focus-within { border-color: #2C66DD; }
.form-input-tags__tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 18px;
  padding: 0 6px;
  background: #E8F0FE;
  border-radius: 2px;
  font-family: var(--font-family);
  font-size: 11px; color: #2C66DD;
  white-space: nowrap;
}
.form-input-tags__tag-remove {
  width: 10px; height: 10px;
  cursor: pointer; opacity: 0.7;
}
.form-input-tags__tag-remove:hover { opacity: 1; }
.form-input-tags__input {
  flex: 1; min-width: 60px;
  border: none; outline: none;
  font-family: var(--font-family);
  font-size: 12px; color: #000;
  background: transparent;
  height: 20px;
}
.form-input-tags__input::placeholder { color: #939393; }

/* ── Type: File Upload ── */
.form-input-upload {
  display: flex;
  align-items: center;
  gap: 0;
  height: 26px;
}
.form-input-upload .form-input {
  border-radius: 2px 0 0 2px;
  flex: 1 1 0;
  min-width: 0;
  color: #939393;
}
.form-input-upload__btn {
  flex: 0 0 auto;
  height: 26px; padding: 0 12px;
  display: flex; align-items: center; gap: 4px;
  font-family: var(--font-family);
  font-size: 12px; color: #000;
  background: #F5F5F5;
  border: 1px solid #DCDCDC;
  border-left: none; border-radius: 0 2px 2px 0;
  cursor: pointer; white-space: nowrap;
}
.form-input-upload__btn:hover { background: #EDEDED; }
.form-input-upload__btn img,
.form-input-upload__btn svg { width: 14px; height: 14px; }

/* ── Type: Date/Time (Calendar) ── */
.form-input-calendar {
  position: relative;
}
.form-input-calendar .form-input {
  padding-right: 28px;
}
.form-input-calendar__icon {
  position: absolute;
  right: 8px; top: 50%;
  transform: translateY(-50%);
  width: 14px; height: 14px;
  pointer-events: none;
}

/* ── Type: Checkbox (with label) ── */
.form-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 26px;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: 12px; color: #000;
}
.form-checkbox__input { display: none; }
.form-checkbox__icon { width: 16px; height: 16px; flex: 0 0 16px; }
.form-checkbox__icon--checked { display: none; }
.form-checkbox__icon--unchecked { display: block; }
.form-checkbox__input:checked ~ .form-checkbox__icon--checked { display: block; }
.form-checkbox__input:checked ~ .form-checkbox__icon--unchecked { display: none; }

/* ── Description Helper ── */
.form-row__desc {
  font-family: var(--font-family);
  font-size: 11px;
  color: #939393;
  line-height: 1.4;
  margin-top: 2px;
}

/* ── Composite wrappers inherit parent width ── */
.form-input-icon-wrap,
.form-input-password,
.form-input-number,
.form-input-port,
.form-input-upload,
.form-input-calendar,
.form-input-tags {
  width: 100%;
}

/* Override number spinner to its natural compact width */
.form-input-number { max-width: 100px; width: auto; }
.form-input-frequency .form-input-number { max-width: 70px; }

/* ── Input States ── */
.form-input--hover { border-color: #ABABAB; }
.form-input--focus { border-color: #2C66DD; }
.form-input--disabled { background: #F5F5F5; color: #939393; cursor: not-allowed; }
.form-input--readonly { background: #F5F5F5; color: #626262; }
.form-input--error { border-color: #DD1616; }
.form-error-text {
  font-family: var(--font-family);
  font-size: 11px; color: #DD1616;
  margin-top: 2px;
}

/* ============================================================
   RPT-TEXTBOX — Input-as-Drawer-Trigger Component (STRICT RULE #5)
   ============================================================ */
.rpt-textbox {
  height: 26px;
  border: 1px solid #C4C4C4;
  border-radius: 2px;
  font-size: 12px;
  font-family: var(--font-family);
  background: #fff;
  display: flex;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  flex-shrink: 0;
}
.rpt-textbox--wide   { width: 280px; }
.rpt-textbox--medium { width: 200px; }
.rpt-textbox--small  { width: 160px; }

.rpt-textbox input {
  border: none;
  outline: none;
  font-size: 12px;
  font-family: var(--font-family);
  flex: 1;
  min-width: 0;
  background: transparent;
  padding: 3px 0 3px 12px;
  height: 100%;
  color: #000;
}
.rpt-textbox input::placeholder { color: #939393; }

.rpt-textbox__icon-btn {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F5F5F5;
  border: none;
  border-left: 1px solid #C4C4C4;
  cursor: pointer;
  padding: 0;
}
.rpt-textbox__icon-btn:hover { background: #EBEBEB; }
.rpt-textbox__icon-btn:focus-visible {
  outline: 2px solid #2C66DD;
  outline-offset: -2px;
}
.rpt-textbox__icon-btn img,
.rpt-textbox__icon-btn svg { width: 14px; height: 14px; }

/* States */
.rpt-textbox--focus { border-color: #2C66DD; }
.rpt-textbox--disabled { background: #F5F5F5; }
.rpt-textbox--disabled input { color: #939393; cursor: not-allowed; }
.rpt-textbox--disabled .rpt-textbox__icon-btn { cursor: not-allowed; opacity: .6; }
.rpt-textbox--error { border-color: #DD1616; }

/* Responsive: full width on narrow screens (≤768px) */
@media (max-width: 768px) {
  .rpt-textbox,
  .rpt-textbox--wide,
  .rpt-textbox--medium,
  .rpt-textbox--small { width: 100%; }
}
```

## JavaScript API

```js
/* ============================================================
   FORM INPUT — Predefined Component JS
   Handles: password toggle, number spinner, tags, radio groups,
   file upload, validation states
   ============================================================ */
(function () {
  var ICON = './assets/icons/';

  /* ── Password Toggle ── */
  function initPasswordToggles() {
    document.querySelectorAll('.form-input-password__toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var wrap = btn.closest('.form-input-password');
        var inp = wrap.querySelector('.form-input');
        var img = btn.querySelector('img');
        if (inp.type === 'password') {
          inp.type = 'text';
          img.src = ICON + 'icon-eye-hide.svg';
          img.alt = 'Hide';
        } else {
          inp.type = 'password';
          img.src = ICON + 'icon-eye-show.svg';
          img.alt = 'Show';
        }
      });
    });
  }

  /* ── Number Spinner ── */
  function initNumberSpinners() {
    document.querySelectorAll('.form-input-number').forEach(function (wrap) {
      var inp = wrap.querySelector('.form-input');
      var upBtn = wrap.querySelector('.form-input-number__btn--up');
      var downBtn = wrap.querySelector('.form-input-number__btn--down');
      if (!inp) return;

      var min = inp.hasAttribute('min') ? parseInt(inp.min, 10) : -Infinity;
      var max = inp.hasAttribute('max') ? parseInt(inp.max, 10) : Infinity;
      var step = inp.hasAttribute('step') ? parseInt(inp.step, 10) : 1;

      function update(delta) {
        var val = parseInt(inp.value, 10) || 0;
        val += delta;
        if (val < min) val = min;
        if (val > max) val = max;
        inp.value = val;
        inp.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (upBtn) upBtn.addEventListener('click', function () { update(step); });
      if (downBtn) downBtn.addEventListener('click', function () { update(-step); });
    });
  }

  /* ── Tags Input ── */
  function initTagsInputs() {
    document.querySelectorAll('.form-input-tags').forEach(function (wrap) {
      var input = wrap.querySelector('.form-input-tags__input');
      if (!input) return;

      wrap.addEventListener('click', function () { input.focus(); });

      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          var val = input.value.trim().replace(/,/g, '');
          if (!val) return;
          addTag(wrap, val);
          input.value = '';
        }
        if (e.key === 'Backspace' && !input.value) {
          var tags = wrap.querySelectorAll('.form-input-tags__tag');
          if (tags.length) tags[tags.length - 1].remove();
        }
      });

      wrap.querySelectorAll('.form-input-tags__tag-remove').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          btn.closest('.form-input-tags__tag').remove();
        });
      });
    });
  }

  function addTag(wrap, text) {
    var input = wrap.querySelector('.form-input-tags__input');
    var tag = document.createElement('span');
    tag.className = 'form-input-tags__tag';
    tag.innerHTML = text + ' <img class="form-input-tags__tag-remove" src="' + ICON + 'icon-tag-close.svg" alt="remove" />';
    tag.querySelector('.form-input-tags__tag-remove').addEventListener('click', function (e) {
      e.stopPropagation();
      tag.remove();
    });
    wrap.insertBefore(tag, input);
  }

  /* ── Radio Groups ── */
  function initRadioGroups() {
    document.querySelectorAll('.form-radio-group').forEach(function (group) {
      group.querySelectorAll('.form-radio').forEach(function (label) {
        var input = label.querySelector('.form-radio__input');
        if (!input) return;
        input.addEventListener('change', function () {
          group.querySelectorAll('.form-radio').forEach(function (l) {
            var ci = l.querySelector('.form-radio__icon--checked');
            var ui = l.querySelector('.form-radio__icon--unchecked');
            var ri = l.querySelector('.form-radio__input');
            if (ri && ri.checked) {
              if (ci) ci.style.display = 'block';
              if (ui) ui.style.display = 'none';
            } else {
              if (ci) ci.style.display = 'none';
              if (ui) ui.style.display = 'block';
            }
          });
        });
      });
    });
  }

  /* ── File Upload ── */
  function initFileUploads() {
    document.querySelectorAll('.form-input-upload').forEach(function (wrap) {
      var btn = wrap.querySelector('.form-input-upload__btn');
      var display = wrap.querySelector('.form-input');
      if (!btn || !display) return;

      var fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.style.display = 'none';
      wrap.appendChild(fileInput);

      btn.addEventListener('click', function () { fileInput.click(); });

      fileInput.addEventListener('change', function () {
        if (fileInput.files.length) {
          display.value = fileInput.files[0].name;
          display.style.color = '#000';
        }
      });
    });
  }

  /* ── State Demonstration (for demo page) ── */
  function initStateSwitchers() {
    document.querySelectorAll('[data-form-state-target]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-form-state-target');
        var state = btn.getAttribute('data-form-state');
        var target = document.getElementById(targetId);
        if (!target) return;

        target.className = target.className.replace(/form-input--(hover|focus|error|disabled|readonly)/g, '').trim();
        target.disabled = false;
        target.readOnly = false;

        if (state === 'hover') target.classList.add('form-input--hover');
        else if (state === 'focus') target.classList.add('form-input--focus');
        else if (state === 'error') target.classList.add('form-input--error');
        else if (state === 'disabled') { target.classList.add('form-input--disabled'); target.disabled = true; }
        else if (state === 'readonly') { target.classList.add('form-input--readonly'); target.readOnly = true; }

        btn.parentElement.querySelectorAll('[data-form-state-target]').forEach(function (b) {
          b.classList.remove('ab-state-btn--active');
        });
        btn.classList.add('ab-state-btn--active');
      });
    });
  }

  /* ── Init ── */
  function init() {
    initPasswordToggles();
    initNumberSpinners();
    initTagsInputs();
    initRadioGroups();
    initFileUploads();
    initStateSwitchers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

## States

| State | Class | Visual Effect |
|---|---|---|
| **Default** | (no modifier) | Border #DCDCDC, bg #FFF |
| **Hover** | `.form-input--hover` or `:hover` | Border #ABABAB |
| **Focus** | `.form-input--focus` or `:focus` | Border #2C66DD |
| **Error** | `.form-input--error` | Border #DD1616 |
| **Disabled** | `.form-input--disabled` + `disabled` attr | Bg #F5F5F5, color #939393, cursor not-allowed |
| **Readonly** | `.form-input--readonly` + `readonly` attr | Bg #F5F5F5, color #626262 |

### Validation Error Text

```html
<span class="form-error-text">This field is required</span>
```

Place directly after the input inside `.form-row__input`.

### RPT-Textbox States

| State | Class | Visual Effect |
|---|---|---|
| **Focus** | `.rpt-textbox--focus` | Border #2C66DD |
| **Disabled** | `.rpt-textbox--disabled` | Bg #F5F5F5, icon button dimmed |
| **Error** | `.rpt-textbox--error` | Border #DD1616 |

## Assembly Notes

- **Placement in drawers:** Place `.form-group` inside `.drawer__body`. The form container provides 16px gap between rows.
- **Placement in main content:** Place inside `.main-content` area, typically within a content section.
- **Form group wrapper:** Always wrap multiple `.form-row` elements in a `.form-group` for correct spacing.
- **Save/Cancel bar:** Place `.form-actions` after the `.form-group`, separated by 24px `margin-top`.
- **Reports Input Row:** Use `.reports-input-row` container with `.reports-input-row--type1` for the standard filter bar layout.
- **Dropdown panels:** Type 7 and Type 19 require `form-dropdown.css` and `form-dropdown.js` for the dropdown panel behavior.
- **Dependencies:** Requires `tokens.css` + `form-input.css` + `form-input.js`. Dropdown types also need `form-dropdown.css` + `form-dropdown.js`.
