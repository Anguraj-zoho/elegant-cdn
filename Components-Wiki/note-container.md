# Note Container

> Component: Note Container
> CSS: `note-container.css` | JS: none | HTML ref: `note-container.html`

## Quick Summary

A lightweight inline note/info bar with a bold "Note:" label and descriptive body text. Horizontal flex layout with 12 px padding, 8 px gap, 2 px border-radius, white background, and a `#DCDCDC` border. Used for contextual hints, warnings, or instructions within a page section.

## Configuration

| Property | Values | Description |
|---|---|---|
| Label text | Default "Note:" | Bold semibold label prefix |
| Body text | Any HTML including `<a>` links | Descriptive message content |
| Link color | `#006AFF` (via `--link-color`) | Inline link styling |

### Figma Specs

| Property | Value |
|---|---|
| Layout | Horizontal flex, `align-items: flex-start` |
| Padding | 12 px all sides |
| Gap | 8 px |
| Border radius | 2 px |
| Background | `var(--main-content-bg, #FFFFFF)` |
| Border | `1px solid var(--table-border, #DCDCDC)` |
| Font | Zoho Puvi, 12 px / 18 px line-height |
| Label | Semibold 600, black `#000000` |
| Body | Regular 400, black `#000000` |
| Link | Medium 500, `#006AFF`; hover underline `#0055D4` |

## Required Icons

None.

## Complete HTML

```html
<!-- ═══ Note Container — Predefined Component ═══
     CSS: note-container.css
     
     Usage:
     <div class="note-container">
       <span class="note-container__label">Note:</span>
       <span class="note-container__body">
         Your message text here with optional <a href="#">links</a>.
       </span>
     </div>
     
     Specs from Figma:
     - Outer: horizontal flex, 12px padding all sides, 8px gap, 2px radius
     - Background: white (#FFFFFF) via --main-content-bg
     - Border: 1px solid #DCDCDC via --table-border
     - Label: "Note:" — Zoho Puvi Semibold 12px, black
     - Body: Zoho Puvi Regular 12px, black, links in #006AFF
     
     Figma node: 684:81335 (Test Claude file)
═══════════════════════════════════════════════════ -->

<div class="note-container">
  <span class="note-container__label">Note:</span>
  <span class="note-container__body">
    Exporting this dashboard as a template allows you to bundle it into an extension profile and publish it to the Marketplace. Once exported, navigate to <a href="#">Extension Profiles</a> to package this template into an extension.
  </span>
</div>
```

## Complete CSS

```css
/* ═══ Note Container — Predefined Component ═══
   Figma source: "Note" (684:81335) — Test Claude file
   Layout: horizontal flex, 12px padding, 8px gap, 2px radius
   ═══════════════════════════════════════════════ */

.note-container {
  display: flex;
  align-items: flex-start;
  padding: 12px;
  gap: 8px;
  border-radius: 2px;
  background: var(--main-content-bg, #FFFFFF);
  border: 1px solid var(--table-border, #DCDCDC);
  font-family: var(--font-family);
  font-size: 12px;
  line-height: 18px;
}

.note-container__label {
  font-weight: 600;
  color: #000000;
  flex-shrink: 0;
  white-space: nowrap;
}

.note-container__body {
  font-weight: 400;
  color: #000000;
}

.note-container__body a {
  color: var(--link-color, #006AFF);
  text-decoration: none;
  font-weight: 500;
}

.note-container__body a:hover {
  text-decoration: underline;
  color: var(--link-hover, #0055D4);
}
```

## Variants

Single variant. Customize by changing the label text (e.g., "Warning:", "Tip:") and body content.

## Assembly Notes

- Place within any page section that needs contextual guidance.
- Supports inline `<a>` links in the body for navigation references.
- The label is flex-shrink-0 and nowrap, so it never breaks.
- Background and border use CSS custom properties for theme compatibility.
