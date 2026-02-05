# Poet Design System

## Overview
This document defines the complete visual language, component library, and design standards for Poet. Consistency across all pages ensures a professional, cohesive brand identity.

---

## Brand Identity

### Name
**Poet** - Platform for documenting and creating systematic and discretionary trading strategies

### Tagline
*"Success driven by data"*

### Aesthetic
Cyber-quantitative: Merging cutting-edge technology with rigorous quantitative analysis. Dark, high-contrast, neon accents, monospace fonts for data.

### Personality
- Precise
- Data-driven
- Professional
- Technical
- Confident (not arrogant)
- Empowering

---

## Color Palette

### Primary Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Neon Green** | `#00ff88` | rgb(0, 255, 136) | Primary accent, CTAs, success states, highlights |
| **Cyan** | `#00d4ff` | rgb(0, 212, 255) | Secondary accent, links, interactive elements |
| **Charcoal** | `#0a0e27` | rgb(10, 14, 39) | Primary background |
| **Dark Navy** | `#1a1f3a` | rgb(26, 31, 58) | Secondary background, cards |
| **Pure White** | `#ffffff` | rgb(255, 255, 255) | Primary text, headings |
| **Light Gray** | `#b0b0b0` | rgb(176, 176, 176) | Secondary text, muted content |

### Extended Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Deep Purple** | `#2d1b69` | Gradient backgrounds, overlays |
| **Electric Blue** | `#0066ff` | Accent variation |
| **Muted Gray** | `#666666` | Disabled states, borders |
| **Success Green** | `#00ff88` | Positive metrics, winning trades |
| **Warning Orange** | `#ff9500` | Caution, moderate risk |
| **Error Red** | `#ff3b30` | Losses, critical warnings |

### CSS Variables

```css
:root {
  /* Primary Colors */
  --neon-green: #00ff88;
  --cyan: #00d4ff;
  --charcoal: #0a0e27;
  --dark-navy: #1a1f3a;
  --white: #ffffff;
  --light-gray: #b0b0b0;
  
  /* Extended Palette */
  --deep-purple: #2d1b69;
  --electric-blue: #0066ff;
  --muted-gray: #666666;
  --success: #00ff88;
  --warning: #ff9500;
  --error: #ff3b30;
  
  /* Semantic Colors */
  --bg-primary: var(--charcoal);
  --bg-secondary: var(--dark-navy);
  --text-primary: var(--white);
  --text-secondary: var(--light-gray);
  --accent-primary: var(--neon-green);
  --accent-secondary: var(--cyan);
}
```

### Color Usage Guidelines

**Backgrounds:**
- Primary pages: `--charcoal` (#0a0e27)
- Cards/sections: `--dark-navy` (#1a1f3a)
- Overlays: `rgba(10, 14, 39, 0.95)`

**Text:**
- Headings: `--white` (#ffffff)
- Body: `--light-gray` (#b0b0b0)
- Emphasis: `--neon-green` (#00ff88)
- Links: `--cyan` (#00d4ff)

**Accents:**
- Call-to-actions: `--neon-green` (#00ff88)
- Hover states: `--cyan` (#00d4ff)
- Active states: Lighter shade of accent

**Data Visualization:**
- Positive values: `--success` (#00ff88)
- Negative values: `--error` (#ff3b30)
- Neutral: `--light-gray` (#b0b0b0)

### Accessibility

**Contrast Ratios:**
- White text on charcoal: 15.8:1 (AAA)
- Neon green on charcoal: 13.2:1 (AAA)
- Cyan on charcoal: 10.5:1 (AAA)
- Light gray on charcoal: 7.8:1 (AA)

**Minimum Standards:**
- Headings: 4.5:1 (AA Large)
- Body text: 7:1 (AAA)
- UI components: 3:1 (minimum)

---

## Typography

### Font Families

**Display (Headings):**
- **Orbitron** - Geometric sans-serif, futuristic aesthetic
- Weights: Regular (400), Medium (500), Bold (700), Black (900)
- Usage: H1, H2, H3, navigation, CTAs, hero text

**Body (Content):**
- **JetBrains Mono** - Monospace, code-friendly, technical
- Weights: Regular (400), Medium (500), Bold (700)
- Usage: Paragraphs, lists, data, code, tables

**Fallbacks:**
```css
--font-display: 'Orbitron', 'Arial Black', sans-serif;
--font-body: 'JetBrains Mono', 'Courier New', monospace;
```

### Font Imports

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

### Type Scale

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| **H1** | Orbitron | 48px (3rem) | 700 | 1.2 | 0.02em |
| **H2** | Orbitron | 36px (2.25rem) | 700 | 1.3 | 0.01em |
| **H3** | Orbitron | 28px (1.75rem) | 500 | 1.4 | 0em |
| **H4** | Orbitron | 22px (1.375rem) | 500 | 1.5 | 0em |
| **Body Large** | JetBrains Mono | 18px (1.125rem) | 400 | 1.7 | 0em |
| **Body** | JetBrains Mono | 16px (1rem) | 400 | 1.7 | 0em |
| **Body Small** | JetBrains Mono | 14px (0.875rem) | 400 | 1.6 | 0em |
| **Caption** | JetBrains Mono | 12px (0.75rem) | 400 | 1.5 | 0em |
| **Button** | Orbitron | 16px (1rem) | 700 | 1 | 0.05em |
| **Nav Link** | Orbitron | 16px (1rem) | 500 | 1 | 0.02em |

### CSS Typography

```css
/* Headings */
h1 {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: var(--white);
}

h2 {
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.01em;
  color: var(--white);
}

h3 {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 1.4;
  color: var(--white);
}

/* Body Text */
body {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.7;
  color: var(--light-gray);
}

p {
  margin-bottom: 1.5rem;
}

/* Emphasis */
strong {
  font-weight: 700;
  color: var(--white);
}

em {
  font-style: italic;
  color: var(--neon-green);
}

/* Links */
a {
  color: var(--cyan);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--neon-green);
  text-decoration: underline;
}
```

### Responsive Typography

```css
/* Mobile (< 768px) */
@media (max-width: 767px) {
  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }
  body { font-size: 0.875rem; }
}

/* Tablet (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.5rem; }
}

/* Desktop (> 1024px) */
/* Use default scale */
```

---

## Spacing System

### Scale (8px base unit)

| Name | Value | Usage |
|------|-------|-------|
| **xs** | 4px (0.25rem) | Tight spacing, icon padding |
| **sm** | 8px (0.5rem) | Small gaps, compact UI |
| **md** | 16px (1rem) | Default spacing, paragraph margins |
| **lg** | 24px (1.5rem) | Section spacing, card padding |
| **xl** | 32px (2rem) | Large sections, hero padding |
| **2xl** | 48px (3rem) | Major sections, page margins |
| **3xl** | 64px (4rem) | Section dividers, hero spacing |

### CSS Variables

```css
:root {
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  --spacing-3xl: 4rem;     /* 64px */
}
```

### Layout Grid

**Container Width:** 1200px max-width
**Gutter:** 24px (--spacing-lg)
**Columns:** 12-column grid

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

@media (max-width: 767px) {
  .container {
    padding: 0 var(--spacing-md);
  }
}
```

---

## Component Library

### Buttons

#### Primary Button
```html
<button class="btn btn-primary">Start Trading</button>
```

```css
.btn {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 12px 32px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.btn-primary {
  background: var(--neon-green);
  color: var(--charcoal);
}

.btn-primary:hover {
  background: var(--cyan);
  box-shadow: 0 4px 20px rgba(0, 255, 136, 0.4);
  transform: translateY(-2px);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--neon-green);
  border: 2px solid var(--neon-green);
}

.btn-secondary:hover {
  background: var(--neon-green);
  color: var(--charcoal);
}
```

#### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--cyan);
  border: none;
  text-decoration: underline;
}

.btn-ghost:hover {
  color: var(--neon-green);
}
```

---

### Cards

```html
<div class="card">
  <h3 class="card-title">First Hour Effect</h3>
  <p class="card-description">Momentum pattern in Solana with 75% accuracy.</p>
  <div class="card-footer">
    <span class="metric">Sharpe: 2.15</span>
  </div>
</div>
```

```css
.card {
  background: var(--dark-navy);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 8px;
  padding: var(--spacing-lg);
  transition: all 0.3s ease;
}

.card:hover {
  border-color: var(--neon-green);
  box-shadow: 0 8px 32px rgba(0, 255, 136, 0.2);
  transform: translateY(-4px);
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--white);
}

.card-description {
  color: var(--light-gray);
  margin-bottom: var(--spacing-lg);
}

.card-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: var(--spacing-md);
}

.metric {
  font-family: var(--font-body);
  color: var(--neon-green);
  font-weight: 700;
}
```

---

### Navigation

```html
<nav class="navbar">
  <div class="nav-brand">
    <a href="index.html">POET</a>
  </div>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li class="dropdown">
      <a href="#">Strategies ▾</a>
      <ul class="dropdown-menu">
        <li><a href="first_hour_strategy.html">First Hour Effect</a></li>
      </ul>
    </li>
  </ul>
</nav>
```

```css
.navbar {
  background: rgba(10, 14, 39, 0.95);
  backdrop-filter: blur(10px);
  padding: var(--spacing-md) var(--spacing-lg);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid rgba(0, 255, 136, 0.2);
}

.nav-brand a {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--neon-green);
  letter-spacing: 0.1em;
}

.nav-links {
  display: flex;
  gap: var(--spacing-lg);
  list-style: none;
}

.nav-links a {
  font-family: var(--font-display);
  color: var(--white);
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: var(--neon-green);
}

.dropdown-menu {
  position: absolute;
  background: var(--dark-navy);
  border: 1px solid var(--neon-green);
  border-radius: 4px;
  padding: var(--spacing-sm);
  display: none;
}

.dropdown:hover .dropdown-menu {
  display: block;
}
```

---

### Tables

```html
<table class="data-table">
  <thead>
    <tr>
      <th>Date</th>
      <th>Symbol</th>
      <th>P&L %</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2024-01-15</td>
      <td>SOL/USD</td>
      <td class="positive">+2.45%</td>
    </tr>
  </tbody>
</table>
```

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-body);
  font-size: 0.875rem;
}

.data-table thead {
  background: var(--dark-navy);
  border-bottom: 2px solid var(--neon-green);
}

.data-table th {
  padding: var(--spacing-md);
  text-align: left;
  font-weight: 700;
  color: var(--white);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.data-table td {
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--light-gray);
}

.data-table tr:hover {
  background: rgba(0, 255, 136, 0.05);
}

.positive {
  color: var(--success);
  font-weight: 700;
}

.negative {
  color: var(--error);
  font-weight: 700;
}
```

---

### Forms

```html
<form class="form">
  <div class="form-group">
    <label for="symbol">Symbol</label>
    <input type="text" id="symbol" placeholder="SOL/USD">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

```css
.form-group {
  margin-bottom: var(--spacing-lg);
}

label {
  display: block;
  font-family: var(--font-display);
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
  color: var(--white);
}

input, textarea, select {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--dark-navy);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 4px;
  color: var(--white);
  font-family: var(--font-body);
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--neon-green);
  box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
}

input::placeholder {
  color: var(--muted-gray);
}
```

---

### Badges

```html
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Beta</span>
<span class="badge badge-error">Deprecated</span>
```

```css
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-success {
  background: rgba(0, 255, 136, 0.2);
  color: var(--success);
  border: 1px solid var(--success);
}

.badge-warning {
  background: rgba(255, 149, 0, 0.2);
  color: var(--warning);
  border: 1px solid var(--warning);
}

.badge-error {
  background: rgba(255, 59, 48, 0.2);
  color: var(--error);
  border: 1px solid var(--error);
}
```

---

## Animation & Motion

### Transitions

**Standard Duration:** 0.3s
**Easing:** ease (default) or ease-in-out

```css
/* Hover transitions */
.element {
  transition: all 0.3s ease;
}

/* Color transitions */
.link {
  transition: color 0.3s ease;
}

/* Transform transitions */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
```

### Keyframe Animations

#### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease forwards;
}
```

#### Glow Pulse
```css
@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.8);
  }
}

.glow {
  animation: glowPulse 2s infinite;
}
```

#### Grid Background Animation
```css
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}
```

---

## Iconography

### Icon Style
- Line icons (not filled)
- 24px default size
- 2px stroke width
- Consistent corner radius

### Recommended Icon Library
**Font Awesome 6** (free tier)

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

### Common Icons

| Usage | Icon | Code |
|-------|------|------|
| Chart | 📈 | `<i class="fa-solid fa-chart-line"></i>` |
| Strategy | 🎯 | `<i class="fa-solid fa-bullseye"></i>` |
| Tools | 🔧 | `<i class="fa-solid fa-wrench"></i>` |
| Download | ⬇️ | `<i class="fa-solid fa-download"></i>` |
| Upload | ⬆️ | `<i class="fa-solid fa-upload"></i>` |
| Settings | ⚙️ | `<i class="fa-solid fa-gear"></i>` |
| Info | ℹ️ | `<i class="fa-solid fa-circle-info"></i>` |
| Warning | ⚠️ | `<i class="fa-solid fa-triangle-exclamation"></i>` |

```css
.icon {
  color: var(--neon-green);
  font-size: 24px;
}
```

---

## Responsive Design

### Breakpoints

| Device | Min Width | Max Width | Container |
|--------|-----------|-----------|-----------|
| Mobile | - | 767px | 100% |
| Tablet | 768px | 1024px | 720px |
| Desktop | 1025px | - | 1200px |

### Mobile-First Approach

```css
/* Mobile (default) */
.element {
  font-size: 1rem;
  padding: var(--spacing-md);
}

/* Tablet */
@media (min-width: 768px) {
  .element {
    font-size: 1.125rem;
    padding: var(--spacing-lg);
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .element {
    font-size: 1.25rem;
    padding: var(--spacing-xl);
  }
}
```

---

## Accessibility (WCAG 2.1 AA)

### Requirements

- **Color Contrast:** Minimum 7:1 for body text, 4.5:1 for large text
- **Keyboard Navigation:** All interactive elements accessible via Tab
- **Focus States:** Visible outline on focus
- **Alt Text:** All images have descriptive alt attributes
- **ARIA Labels:** Screen reader support for complex components

### Focus States

```css
*:focus {
  outline: 2px solid var(--neon-green);
  outline-offset: 2px;
}

button:focus-visible {
  box-shadow: 0 0 0 4px rgba(0, 255, 136, 0.3);
}
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-02-05 | Initial design system documentation |

---

## Related Documents
- `styles.css` - Global stylesheet implementation
- `home-styles.css` - Homepage-specific styles
- `strategy-styles.css` - Strategy page styles
