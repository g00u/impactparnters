# Impact Partners - AI Coding Agent Instructions

## Project Overview

Static landing page for **Impact Partners**, a Korean investment firm focusing on impact-driven venture capital. Single-page site with hero section, about, investment process, portfolio, news, and contact form. No build system, backend, or framework—plain HTML/CSS/JS.

## Architecture & Structure

### Key Files & Responsibilities

- **index.html**: Semantic structure with fixed header nav, hero section (split layout), and 6 main sections
- **style.css**: 311 lines organized into 10 logical blocks with inline comments (Reset, Header, Buttons, Hero, Sections, Investment Process, Portfolio, News, Contact, Responsive)
- **script.js**: Currently empty—reserved for interactivity (form validation, smooth scrolling, animations)

### Design Patterns

1. **Fixed Header (92px height)**: Positioned absolutely, affects all layout calculations (hero uses `calc(100vh - 92px)`)
2. **Section Container Pattern**: `max-width: 1100px; margin: 0 auto;` with `padding: 140px 24px 120px` for consistent spacing
3. **Grid-Based Layout**: CSS Grid for hero (1fr 2fr split) and portfolio logo grid (`auto-fit, minmax(180px)`)
4. **Brand Color**: Primary blue is `#5885f7` (hero buttons, section labels)
5. **Typography**: Pretendard font stack (Korean-optimized), sized per section type (hero: 52px, subtitle: 28px, body: 17px)

## Development Conventions

### CSS Organization

- **No CSS preprocessor**: Plain CSS with semantic comments separating sections
- **Responsive breakpoint**: Single breakpoint at `@media (max-width: 768px)`—stacks hero to single column, adjusts padding/font sizes
- **Hero image**: External Unsplash URL with `::after` overlay pseudo-element for tone reduction (opacity 0.15)
- **Buttons**: Two variants (`.btn-primary` blue, `.btn-secondary` bordered); use `padding: 10px 22px; border-radius: 20px` consistently

### HTML Conventions

- Section IDs match nav links (`id="about"`, `id="portfolio"`) for anchor navigation
- `.section-label` (12px, uppercase, blue) appears before `.section-title` (40px, bold) in each major section
- Form inputs use placeholders (e.g., "기업명", "이메일"); minimal required attributes

### JavaScript Scope

Currently empty. When adding interactivity:

- Form submission handler (contact form)
- Smooth scroll behavior for anchor links
- Optional: Hero animations, portfolio filters
- No external libraries assumed; use vanilla JS

## Critical Developer Workflows

### Content Updates

1. **Add news item**: Insert new `<li>` in `.news-list` with `.news-title` and `.news-date` spans
2. **Update portfolio logos**: Add `<div class="logo-item">` children to `.logo-grid`
3. **Modify hero image**: Edit background URL in `.hero-image` CSS rule (line ~150)

### Form Validation (future)

Contact form fields: `placeholder="기업명"` (required), `placeholder="이메일"` (email type), textarea (business summary). Add validation in script.js before submission.

### Responsive Testing

Test at 768px breakpoint—hero stacks, nav adjusts gap to 16px, padding reduces to 24px on sides.

## Common Pitfalls & Patterns

### Layout Gotchas

- **Hero height calculation**: Always subtract fixed header height (92px) from viewport. Current: `calc(100vh - 72px)` in CSS but header is 92px—**verify this discrepancy** if issues arise
- **Section max-width**: Never exceed 1100px; margins auto-center. Don't apply to `.hero` (it's full-width grid)
- **Mobile stacking**: Hero grid becomes single column; image height changes to 40vh

### Color & Style Consistency

- **Blue accent**: `#0047ff` (labels), `#5885f7` (buttons)—use hex, not named colors
- **Text colors**: Primary `#111`, secondary `#555`, borders `#ddd`, backgrounds `#f7f8fa`
- **Spacing rhythm**: Gap units are multiples of 8px (14px, 16px, 24px, 28px, etc.)

### External Dependencies

- **Pretendard font**: Loaded from CDN (`https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css`)—no fallback font required beyond system stack
- **No JavaScript framework**: Vanilla JS only; if form validation needed, add minimal inline handlers

## File Examples

### Adding a New Section

```html
<section id="newid" class="section">
  <span class="section-label">LABEL TEXT</span>
  <h2 class="section-title">Title Here</h2>
  <p class="section-desc">Description text...</p>
</section>
```

### Button States

```css
.btn-primary {
  padding: 10px 22px;
  background: #5885f7;
  color: #fff;
  border-radius: 20px;
  font-weight: 600;
  transition: background 0.2s;
}
.btn-primary:hover {
  background: #0036c2;
}
```

## Next Steps for Enhancement

- Implement form submission (POST to backend or email service)
- Add smooth scroll behavior to anchor links
- Consider animations on section scroll (IntersectionObserver)
- Replace placeholder Unsplash image with branded hero image
- Populate portfolio logos with actual company images/links
