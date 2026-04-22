# Form Dropdown

> Component: Dropdown (Figma "Dropdown" component — 6 types)
> CSS: `form-dropdown.css` | JS: `form-dropdown.js` | HTML ref: `form-dropdown.html`

## ⚠ Critical Rules (READ BEFORE BUILDING)

- **NEVER use native `<select>`.** Every dropdown on every page uses this component. A raw `<select>` renders the OS-native dropdown chrome (differs per platform) — breaks design consistency.
- **Always paired with `.form-dropdown-trigger`** from `form-input.css`. The trigger is a `<div>` wrapping a readonly `<input class="form-input form-input--select">` with a chevron icon.
- **Placeholder text goes in the `placeholder` attribute** of the trigger input — NEVER as a `.form-dropdown__item`.
- **Pick the right of 6 types**: basic / checkbox-multi / searchable / search+radio / no-data / apply-cancel-footer.

## Quick Summary

A custom dropdown panel system (NEVER native `<select>`) with 6 distinct types: basic text items, checkbox multi-select, searchable, search + radio single-select, no-data empty state, and apply/cancel footer. The dropdown is positioned absolutely below its trigger with a 4px gap, and supports keyboard navigation, search filtering, select-all for checkboxes, and radio single-selection. Always paired with a `.form-dropdown-trigger` from `form-input.css`.

## Configuration

### Container Specs (from Figma)

| Property | Value |
|---|---|
| Width | 280px |
| Background | #FFF |
| Border | 1px #DCDCDC |
| Border radius | 2px |
| Shadow | 0 2px 8px rgba(0,0,0,0.1) |
| Padding | 8px top/bottom, 0 left/right |
| Max list height | 210px (scrollable) |
| Scrollbar | 6px wide, #939393 thumb |

### Item Row Specs

| Type | Height | Padding | Gap |
|---|---|---|---|
| Basic text | 26px | 6px 12px | 10px |
| Checkbox / Radio | 26px | 5px 12px | 8px |

### Item States

| State | CSS |
|---|---|
| Hover | `background: #E9E9E9` |
| Selected (text) | `color: #006AFF` |
| Active (hover/keyboard) | `background: #E9E9E9` |

### Positioning

- The dropdown is `position: absolute` inside `.form-dropdown-wrap` (which is `position: relative`)
- Gap between trigger and dropdown: `top: calc(100% + 4px)`
- Default hidden: `display: none`
- Open state: `.form-dropdown--open` → `display: block`
- Static demo: `.form-dropdown--static` → `position: static; display: block; box-shadow: none`

## Required Icons

All icons are local Figma-exported SVGs from `assets/icons/`:

- `icon-checkbox.svg` — Unchecked checkbox (16×16)
- `icon-checkbox-checked.svg` — Checked checkbox (16×16)
- `icon-checkbox-indeterminate.svg` — Indeterminate checkbox (16×16)
- `icon-radio-checked.svg` — Checked radio (16×16)
- `icon-radio-unchecked.svg` — Unchecked radio (16×16)
- `icon-search-close.svg` — Search clear X (12×12)
- `icon-dropdown-chevron.svg` — Trigger chevron (14×14)

## Variants

### Type 1: Basic Dropdown (plain text items)

Figma: State=Dropdown, Checkbox=false, Radio=false, Search=false

```html
<div class="form-dropdown form-dropdown--static">
  <div class="form-dropdown__list">
    <div class="form-dropdown__item">Option 1</div>
    <div class="form-dropdown__item form-dropdown__item--active">Option 2 (hover)</div>
    <div class="form-dropdown__item">Option 3</div>
    <div class="form-dropdown__item">Option 4</div>
    <div class="form-dropdown__item">Option 5</div>
    <div class="form-dropdown__item">Option 6</div>
    <div class="form-dropdown__item">Option 7</div>
  </div>
</div>
```

### Type 2: Checkbox Multi-Select

Figma: Checkbox=true. Includes "Select All" row with indeterminate state support.

```html
<div class="form-dropdown form-dropdown--static">
  <div class="form-dropdown__select-all">
    <img class="form-dropdown__item-icon" src="./assets/icons/icon-checkbox.svg" data-checked="false" alt="" />
    <span>Select All</span>
  </div>
  <div class="form-dropdown__list">
    <div class="form-dropdown__item form-dropdown__item--check form-dropdown__item--active">
      <img class="form-dropdown__item-icon" src="./assets/icons/icon-checkbox-checked.svg" data-checked="true" alt="" />
      <span>Option 1</span>
    </div>
    <div class="form-dropdown__item form-dropdown__item--check">
      <img class="form-dropdown__item-icon" src="./assets/icons/icon-checkbox.svg" data-checked="false" alt="" />
      <span>Option 2</span>
    </div>
  </div>
</div>
```

### Type 3: Searchable (search bar + scroll)

Figma: Search Bar=true, Scroll=true

```html
<div class="form-dropdown form-dropdown--static">
  <div class="form-dropdown__search">
    <div class="form-dropdown__search-inner">
      <input class="form-dropdown__search-input" type="text" placeholder="Search" />
      <img class="form-dropdown__search-clear" src="./assets/icons/icon-search-close.svg" alt="clear" />
    </div>
  </div>
  <div class="form-dropdown__list">
    <div class="form-dropdown__item">Option 1</div>
    ...items...
  </div>
</div>
```

### Type 4: Search + Radio (single select with search)

Figma: Search Bar=true, Radio Button=true, Scroll=true

```html
<div class="form-dropdown form-dropdown--static">
  <div class="form-dropdown__search">
    <div class="form-dropdown__search-inner">
      <input class="form-dropdown__search-input" type="text" placeholder="Search" />
      <img class="form-dropdown__search-clear" src="./assets/icons/icon-search-close.svg" alt="clear" />
    </div>
  </div>
  <div class="form-dropdown__list">
    <div class="form-dropdown__item form-dropdown__item--radio form-dropdown__item--active">
      <img class="form-dropdown__item-icon" src="./assets/icons/icon-radio-checked.svg" data-checked="true" alt="" />
      <span>Option 1</span>
    </div>
    <div class="form-dropdown__item form-dropdown__item--radio">
      <img class="form-dropdown__item-icon" src="./assets/icons/icon-radio-unchecked.svg" data-checked="false" alt="" />
      <span>Option 2</span>
    </div>
  </div>
</div>
```

### Type 5: No Data State (radio + pagination + empty)

Figma: Radio Button=true, Pagination=true, No data=Yes

```html
<div class="form-dropdown form-dropdown--static">
  <div class="form-dropdown__search">
    <div class="form-dropdown__search-inner">
      <input class="form-dropdown__search-input" type="text" placeholder="Search" value="xyz" />
      <img class="form-dropdown__search-clear form-dropdown__search-clear--visible" src="./assets/icons/icon-search-close.svg" alt="clear" />
    </div>
  </div>
  <div class="form-dropdown__no-data">
    <span class="form-dropdown__no-data-text">No Data Available</span>
    <a class="form-dropdown__no-data-link" href="#">Clear Search</a>
  </div>
</div>
```

### Type 6: Apply / Cancel Footer

Figma: Radio Button=true, Pagination=true, Apply Cancel=true

```html
<div class="form-dropdown form-dropdown--static">
  <div class="form-dropdown__list">
    <div class="form-dropdown__item form-dropdown__item--radio form-dropdown__item--active">
      <img class="form-dropdown__item-icon" src="./assets/icons/icon-radio-checked.svg" data-checked="true" alt="" />
      <span>Option 1</span>
    </div>
    ...items...
  </div>
  <div class="form-dropdown__footer">
    <div class="form-dropdown__footer-line"></div>
    <div class="form-dropdown__footer-actions">
      <button class="btn-apply" type="button">Apply</button>
      <button class="btn-cancel" type="button">Cancel</button>
    </div>
  </div>
</div>
```

## Trigger + Dropdown Integration

The dropdown panel is always paired with a trigger from `form-input.css`. Here is the full integrated pattern:

```html
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
```

**PLACEHOLDER RULE (ZERO TOLERANCE):**
- `"- Select -"` / `"Enter Value"` / `"Choose an option"` is PLACEHOLDER text
- It goes in the `placeholder` attribute — NEVER as a `.form-dropdown__item`
- Empty state: `placeholder="- Select -"` (no value attr, no first item)
- Pre-selected: `value="Windows Server"` + matching `--selected` item

## Complete CSS

```css
/* ============================================================
   FORM DROPDOWN — Predefined Component
   Extracted from Figma "Dropdown" component
   ──────────────────────────────────────────────────────────────
   6 TYPES:
     Type 1 — Basic (plain text items)
     Type 2 — Checkbox multi-select
     Type 3 — Searchable (search bar + scroll)
     Type 4 — Search + Radio (single select with search)
     Type 5 — No Data state (radio + pagination + empty)
     Type 6 — Apply/Cancel footer (radio + pagination + buttons)
   ──────────────────────────────────────────────────────────────
   SPECS (from Figma):
     Container: 280px wide, bg #FFF, border 1px #DCDCDC, radius 2px
     Padding: 8px top/bottom, 0 left/right
     Item row: 26px height, padding 6px 12px (basic) / 5px 12px (checkbox/radio)
     Item gap: 0 between items
     Hover: bg #E9E9E9
     Selected text: color #006AFF
     Search bar: 40px total, inner input 24px, border #C4C4C4
     Scrollbar: 6px wide, #939393
     Footer (Apply/Cancel): 52px, separator #E9E9E9
   ============================================================ */

/* ── Dropdown Container ── */
.form-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 280px;
  background: #fff;
  border: 1px solid #DCDCDC;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 100;
  box-sizing: border-box;
  font-family: var(--font-family);
  display: none;
}
.form-dropdown--open { display: block; }

/* For demo: static display */
.form-dropdown--static {
  position: static;
  display: block;
  box-shadow: none;
}

/* ── Dropdown List ── */
.form-dropdown__list {
  padding: 8px 0;
  max-height: 210px;
  overflow-y: auto;
}
.form-dropdown__list::-webkit-scrollbar { width: 6px; }
.form-dropdown__list::-webkit-scrollbar-track { background: transparent; }
.form-dropdown__list::-webkit-scrollbar-thumb { background: #939393; border-radius: 3px; }

/* ── Item Row (basic) ── */
.form-dropdown__item {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 26px;
  padding: 6px 12px;
  font-size: 12px;
  color: #000;
  cursor: pointer;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
}
.form-dropdown__item:hover { background: #E9E9E9; }
.form-dropdown__item--selected { color: #006AFF; }
.form-dropdown__item--active { background: #E9E9E9; }

/* ── Item Row (checkbox / radio) ── */
.form-dropdown__item--check,
.form-dropdown__item--radio {
  gap: 8px;
  padding: 5px 12px;
}
.form-dropdown__item-icon {
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
}

/* ── Select All row ── */
.form-dropdown__select-all {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 26px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #000;
  cursor: pointer;
  border-bottom: 1px solid #E9E9E9;
  box-sizing: border-box;
  user-select: none;
}
.form-dropdown__select-all:hover { background: #E9E9E9; }

/* ── Search Bar ── */
.form-dropdown__search {
  display: flex;
  align-items: center;
  padding: 4px 12px 12px 12px;
}
.form-dropdown__search-inner {
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
  padding: 3px 12px;
  background: #fff;
  border: 1px solid #C4C4C4;
  border-radius: 2px;
  box-sizing: border-box;
  gap: 8px;
}
.form-dropdown__search-input {
  flex: 1;
  border: none;
  outline: none;
  font-family: var(--font-family);
  font-size: 12px;
  color: #000;
  background: transparent;
  min-width: 0;
}
.form-dropdown__search-input::placeholder { color: #939393; }
.form-dropdown__search-clear {
  flex: 0 0 12px;
  width: 12px;
  height: 12px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s;
}
.form-dropdown__search-inner:focus-within .form-dropdown__search-clear,
.form-dropdown__search-clear--visible { opacity: 1; }

/* ── Add Custom Value ── */
.form-dropdown__custom {
  display: flex;
  align-items: center;
  height: 26px;
  padding: 6px 12px;
  font-size: 12px;
  color: #626262;
  border-top: 1px solid #E9E9E9;
  cursor: text;
  box-sizing: border-box;
}

/* ── Manage / Settings Row ── */
.form-dropdown__manage {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 26px;
  padding: 6px 12px;
  font-size: 12px;
  color: #006AFF;
  cursor: pointer;
  border-top: 1px solid #E9E9E9;
  box-sizing: border-box;
}
.form-dropdown__manage img,
.form-dropdown__manage svg { width: 14px; height: 14px; }
.form-dropdown__manage:hover { background: #F0F6FF; }

/* ── No Data State ── */
.form-dropdown__no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px 12px;
  text-align: center;
}
.form-dropdown__no-data-text {
  font-size: 12px;
  color: #000;
}
.form-dropdown__no-data-link {
  font-size: 12px;
  color: #006AFF;
  cursor: pointer;
  text-decoration: none;
}
.form-dropdown__no-data-link:hover { text-decoration: underline; }

/* ── Pagination Row ── */
.form-dropdown__pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  height: 26px;
  padding: 0 12px;
  font-size: 11px;
  color: #626262;
  border-top: 1px solid #E9E9E9;
}
.form-dropdown__pagination-link {
  font-size: 11px;
  color: #006AFF;
  cursor: pointer;
  text-decoration: none;
}
.form-dropdown__pagination-link:hover { text-decoration: underline; }

/* ── Apply / Cancel Footer ── */
.form-dropdown__footer {
  display: flex;
  flex-direction: column;
  padding: 12px 8px 4px 8px;
  gap: 12px;
}
.form-dropdown__footer-line {
  height: 1px;
  background: #E9E9E9;
}
.form-dropdown__footer-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.form-dropdown__footer .btn-apply {
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 400;
  height: 24px;
  padding: 0 16px;
  background: #2C66DD;
  color: #fff;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
.form-dropdown__footer .btn-apply:hover { background: #2458C4; }
.form-dropdown__footer .btn-cancel {
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 400;
  height: 24px;
  padding: 0 16px;
  background: #fff;
  color: #000;
  border: 1px solid #ABABAB;
  border-radius: 2px;
  cursor: pointer;
}
.form-dropdown__footer .btn-cancel:hover { background: #F5F5F5; }
.form-dropdown__footer .btn-clear {
  font-family: var(--font-family);
  font-size: 12px;
  color: #006AFF;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
}
.form-dropdown__footer .btn-clear:hover { text-decoration: underline; }

/* ── Wrapper (trigger + dropdown) ── */
.form-dropdown-wrap {
  position: relative;
  display: inline-block;
}
```

## JavaScript API

```js
/* ============================================================
   FORM DROPDOWN — Interactive Behaviors
   ============================================================ */
(function () {
  function initDropdownToggles() {
    document.querySelectorAll('[data-dropdown-trigger]').forEach(trigger => {
      const wrap = trigger.closest('.form-dropdown-wrap');
      if (!wrap) return;
      const dd = wrap.querySelector('.form-dropdown');
      if (!dd) return;
      trigger.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = dd.classList.contains('form-dropdown--open');
        closeAllDropdowns();
        if (!isOpen) dd.classList.add('form-dropdown--open');
      });
    });
    document.addEventListener('click', () => closeAllDropdowns());
    document.querySelectorAll('.form-dropdown').forEach(dd => {
      dd.addEventListener('click', e => e.stopPropagation());
    });
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.form-dropdown--open').forEach(dd => {
      dd.classList.remove('form-dropdown--open');
    });
  }

  function initDropdownItems() {
    document.querySelectorAll('.form-dropdown__item:not(.form-dropdown__item--check):not(.form-dropdown__item--radio)').forEach(item => {
      item.addEventListener('click', () => {
        const list = item.closest('.form-dropdown__list');
        if (!list) return;
        list.querySelectorAll('.form-dropdown__item').forEach(i => i.classList.remove('form-dropdown__item--selected'));
        item.classList.add('form-dropdown__item--selected');
        const wrap = item.closest('.form-dropdown-wrap');
        if (wrap) {
          const trigger = wrap.querySelector('[data-dropdown-trigger]');
          if (trigger && trigger.tagName !== 'BUTTON') {
            const sel = trigger.querySelector('.form-input') || trigger;
            if (sel.tagName === 'SELECT') return;
            sel.value = item.textContent.trim();
          }
          const dd = wrap.querySelector('.form-dropdown');
          if (dd) dd.classList.remove('form-dropdown--open');
        }
      });
    });
  }

  function initCheckboxItems() {
    document.querySelectorAll('.form-dropdown__item--check').forEach(item => {
      item.addEventListener('click', () => {
        const icon = item.querySelector('.form-dropdown__item-icon');
        if (!icon) return;
        const isChecked = icon.dataset.checked === 'true';
        icon.dataset.checked = isChecked ? 'false' : 'true';
        icon.src = isChecked
          ? './assets/icons/icon-checkbox.svg'
          : './assets/icons/icon-checkbox-checked.svg';
        item.classList.toggle('form-dropdown__item--active', !isChecked);
        updateSelectAll(item.closest('.form-dropdown'));
      });
    });
  }

  function initSelectAll() {
    document.querySelectorAll('.form-dropdown__select-all').forEach(row => {
      row.addEventListener('click', () => {
        const dd = row.closest('.form-dropdown');
        if (!dd) return;
        const items = dd.querySelectorAll('.form-dropdown__item--check');
        const allChecked = [...items].every(i => i.querySelector('.form-dropdown__item-icon')?.dataset.checked === 'true');
        items.forEach(item => {
          const icon = item.querySelector('.form-dropdown__item-icon');
          if (!icon) return;
          icon.dataset.checked = allChecked ? 'false' : 'true';
          icon.src = allChecked
            ? './assets/icons/icon-checkbox.svg'
            : './assets/icons/icon-checkbox-checked.svg';
          item.classList.toggle('form-dropdown__item--active', !allChecked);
        });
        const saIcon = row.querySelector('.form-dropdown__item-icon');
        if (saIcon) {
          saIcon.dataset.checked = allChecked ? 'false' : 'true';
          saIcon.src = allChecked
            ? './assets/icons/icon-checkbox.svg'
            : './assets/icons/icon-checkbox-checked.svg';
        }
      });
    });
  }

  function updateSelectAll(dd) {
    if (!dd) return;
    const items = dd.querySelectorAll('.form-dropdown__item--check');
    const saRow = dd.querySelector('.form-dropdown__select-all');
    if (!saRow) return;
    const saIcon = saRow.querySelector('.form-dropdown__item-icon');
    if (!saIcon) return;
    const checkedCount = [...items].filter(i => i.querySelector('.form-dropdown__item-icon')?.dataset.checked === 'true').length;
    if (checkedCount === 0) {
      saIcon.src = './assets/icons/icon-checkbox.svg';
      saIcon.dataset.checked = 'false';
    } else if (checkedCount === items.length) {
      saIcon.src = './assets/icons/icon-checkbox-checked.svg';
      saIcon.dataset.checked = 'true';
    } else {
      saIcon.src = './assets/icons/icon-checkbox-indeterminate.svg';
      saIcon.dataset.checked = 'partial';
    }
  }

  function initRadioItems() {
    document.querySelectorAll('.form-dropdown__item--radio').forEach(item => {
      item.addEventListener('click', () => {
        const list = item.closest('.form-dropdown__list');
        if (!list) return;
        list.querySelectorAll('.form-dropdown__item--radio').forEach(i => {
          const icon = i.querySelector('.form-dropdown__item-icon');
          if (icon) {
            icon.src = './assets/icons/icon-radio-unchecked.svg';
            icon.dataset.checked = 'false';
          }
          i.classList.remove('form-dropdown__item--active');
        });
        const icon = item.querySelector('.form-dropdown__item-icon');
        if (icon) {
          icon.src = './assets/icons/icon-radio-checked.svg';
          icon.dataset.checked = 'true';
        }
        item.classList.add('form-dropdown__item--active');
      });
    });
  }

  function initSearchFilter() {
    document.querySelectorAll('.form-dropdown__search-input').forEach(input => {
      const dd = input.closest('.form-dropdown');
      if (!dd) return;
      const clearBtn = dd.querySelector('.form-dropdown__search-clear');
      input.addEventListener('input', () => {
        const q = input.value.toLowerCase();
        if (clearBtn) clearBtn.classList.toggle('form-dropdown__search-clear--visible', q.length > 0);
        dd.querySelectorAll('.form-dropdown__item').forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(q) ? '' : 'none';
        });
        const noData = dd.querySelector('.form-dropdown__no-data');
        if (noData) {
          const anyVisible = [...dd.querySelectorAll('.form-dropdown__item')].some(i => i.style.display !== 'none');
          noData.style.display = anyVisible ? 'none' : '';
        }
      });
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          input.value = '';
          input.dispatchEvent(new Event('input'));
          clearBtn.classList.remove('form-dropdown__search-clear--visible');
        });
      }
    });
  }

  function initApplyCancel() {
    document.querySelectorAll('.form-dropdown__footer .btn-apply').forEach(btn => {
      btn.addEventListener('click', () => {
        const dd = btn.closest('.form-dropdown');
        if (dd) dd.classList.remove('form-dropdown--open');
      });
    });
    document.querySelectorAll('.form-dropdown__footer .btn-cancel').forEach(btn => {
      btn.addEventListener('click', () => {
        const dd = btn.closest('.form-dropdown');
        if (dd) dd.classList.remove('form-dropdown--open');
      });
    });
    document.querySelectorAll('.form-dropdown__footer .btn-clear').forEach(btn => {
      btn.addEventListener('click', () => {
        const dd = btn.closest('.form-dropdown');
        if (!dd) return;
        dd.querySelectorAll('.form-dropdown__item--check, .form-dropdown__item--radio').forEach(item => {
          const icon = item.querySelector('.form-dropdown__item-icon');
          if (!icon) return;
          const isRadio = item.classList.contains('form-dropdown__item--radio');
          icon.src = isRadio ? './assets/icons/icon-radio-unchecked.svg' : './assets/icons/icon-checkbox.svg';
          icon.dataset.checked = 'false';
          item.classList.remove('form-dropdown__item--active');
        });
        updateSelectAll(dd);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initDropdownToggles();
    initDropdownItems();
    initCheckboxItems();
    initSelectAll();
    initRadioItems();
    initSearchFilter();
    initApplyCancel();
  });
})();
```

## States

| State | Class / Mechanism | Description |
|---|---|---|
| **Closed** (default) | No `.form-dropdown--open` | `display: none`, panel hidden |
| **Open** | `.form-dropdown--open` | `display: block`, panel visible below trigger |
| **Static** (demo) | `.form-dropdown--static` | Always visible, no positioning, no shadow |
| **Item hover** | `:hover` on `.form-dropdown__item` | `background: #E9E9E9` |
| **Item selected** | `.form-dropdown__item--selected` | `color: #006AFF` (blue text) |
| **Item active** | `.form-dropdown__item--active` | `background: #E9E9E9` (keyboard/current) |
| **Checkbox checked** | `data-checked="true"` on icon `<img>` | Icon swaps to `icon-checkbox-checked.svg` |
| **Checkbox unchecked** | `data-checked="false"` on icon `<img>` | Icon shows `icon-checkbox.svg` |
| **Select All partial** | `data-checked="partial"` | Icon shows `icon-checkbox-indeterminate.svg` |
| **Radio selected** | `data-checked="true"` on icon `<img>` | Icon swaps to `icon-radio-checked.svg` |
| **No data** | `.form-dropdown__no-data` visible | Shows "No Data Available" + "Clear Search" link |
| **Search clear visible** | `.form-dropdown__search-clear--visible` | X button appears when search has text |
| **Trigger focus ring** | `.form-dropdown-wrap:has(.form-dropdown--open) .form-dropdown-trigger` | Trigger border turns `#2C66DD` blue |

## Assembly Notes

- **Placement:** The `.form-dropdown-wrap` goes inside `.form-row__input` for form layouts, or standalone for action-bar filters.
- **Inside drawers:** Dropdown panels work inside `.drawer__body` — the absolute positioning is relative to `.form-dropdown-wrap`, not the drawer.
- **Z-index:** Dropdown panels are `z-index: 100`. If used inside a drawer (`z-index: 910`), they stack correctly because of the stacking context.
- **Click-outside close:** The JS binds a document-level click listener that calls `closeAllDropdowns()`. Clicks inside the dropdown panel are stopped via `e.stopPropagation()`.
- **Trigger CSS:** The trigger (`.form-dropdown-trigger`, `.form-input--select`, `.form-dropdown-trigger__icon`) is defined in `form-input.css`, NOT in `form-dropdown.css`. Both files are required.
- **Compact trigger:** Use `.form-dropdown-trigger--compact` for smaller contexts (pagination, action-bar). Defined in `form-input.css`.
- **Dependencies:** Requires `tokens.css` + `form-input.css` (for trigger) + `form-dropdown.css` + `form-dropdown.js`.
