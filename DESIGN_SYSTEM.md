# Weather Intelligence - Design System

## Visual Identity

### Brand Colors
```css
Primary Blue:    #0066ff / #3b82f6 (light/dark mode)
Cyan Accent:     #06b6d4 / #00bcd4
Gradient:        Blue → Cyan (premium feel)

Light Mode:
  Background:    #f8fafb
  Card:          #ffffff
  Text:          #0f1419
  Muted:         #6b7280

Dark Mode:
  Background:    #0a0e14
  Card:          #151b27
  Text:          #e8ecf1
  Muted:         #9ca3af
```

### Icon Colors
- **Primary Action**: Blue 600
- **Secondary**: Cyan 600
- **Warning**: Orange 600
- **Success**: Green 600
- **Danger**: Red 600

## Typography

### Fonts
- **Sans**: Geist (by Vercel)
- **Mono**: Geist Mono

### Scale & Hierarchy
```
Heading 1 (5xl): 3rem / 2.5rem mobile
Heading 2 (4xl): 2.25rem
Heading 3 (2xl): 1.5rem
Heading 4 (xl):  1.25rem
Body:            1rem (16px)
Caption:         0.875rem (14px)
Small:           0.75rem (12px)
```

### Font Weights
- Bold: 700 (headings)
- Semibold: 600 (subheadings)
- Medium: 500 (labels)
- Regular: 400 (body text)

### Line Heights
- Headings: 1.2
- Body: 1.5-1.6
- Captions: 1.4

## Spacing System

### Padding & Margins
```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 2.5rem (40px)
3xl: 3rem (48px)
4xl: 4rem (64px)
```

### Section Spacing
- Page sections: `py-20 md:py-32` (80px mobile, 128px desktop)
- Section content: Gap 6-8px for small items, 32px between major sections
- Container: Max-width with `px-4 sm:px-6` padding

## Components

### Button Styles
```
Primary (CTA):
  - Background: bg-blue-600
  - Hover: bg-blue-700
  - Text: text-white
  - Padding: px-6 py-3 (lg size)

Secondary (Outline):
  - Border: border-border
  - Hover: bg-secondary
  - Padding: px-6 py-3

Icon Button:
  - Size: w-5 h-5 (default)
  - Circle: rounded-full
  - Background: bg-blue-100 dark:bg-blue-900/30
```

### Card Styles
```
Default Card:
  - Background: bg-card
  - Border: border border-border
  - Rounded: rounded-2xl
  - Padding: p-6 md:p-8
  - Hover: border-blue-400 dark:border-blue-500

Gradient Card (Metrics):
  - Gradient: bg-gradient-to-br from-[color] to-[color]
  - Text: text-white
  - Rounded: rounded-2xl
  - Pattern: Subtle overlay pattern

Hero Card:
  - Gradient: from-blue-600 to-cyan-600
  - Rounded: rounded-3xl
  - Padding: p-8 md:p-12
  - Text: text-white
```

### Badges & Pills
```
Badge:
  - Background: bg-[color]-50 dark:bg-[color]-900/30
  - Border: border border-[color]-200/500
  - Rounded: rounded-full
  - Padding: px-4 py-2
  - Icon: w-4 h-4
```

## Animations

### Entrance Animations
```javascript
Hero Element:
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}

Staggered Children:
  transition={{ staggerChildren: 0.1 }}
  (causes children to animate sequentially)

Delayed Elements:
  transition={{ delay: 0.2, duration: 0.6 }}
```

### Interaction Animations
```javascript
Hover Scale:
  whileHover={{ scale: 1.05 }}
  transition={{ type: 'spring', stiffness: 300 }}

Button Click:
  whileTap={{ scale: 0.95 }}

Expand/Collapse:
  initial={{ opacity: 0, height: 0 }}
  animate={{ opacity: 1, height: 'auto' }}
  exit={{ opacity: 0, height: 0 }}
  transition={{ duration: 0.3 }}
```

### Transitions
- All color changes: `transition-colors duration-300`
- All transforms: `transition-transform duration-300`
- All opacity: `transition-opacity duration-300`

## Icon System (Lucide React)

### Common Icons Used
```
Weather:
  - Cloud, CloudRain, Sun, Wind
  - Droplets, Eye, Gauge
  - Thermometer, AlertCircle

UI:
  - Search, ChevronDown, Heart, MapPin
  - X (close), Menu, Settings, Bell
  - TrendingUp, Zap, Sparkles, Target

Sizes: w-4, w-5, w-6 (default), w-12, w-24
Colors: text-blue-500, text-muted-foreground, text-white
```

## Layout Patterns

### Hero Section
```
Background with gradient overlays
Max-width container centered
Heading, subheading, CTA buttons
Feature highlights below
```

### Feature Grid
```
Grid (1 column mobile, 2 md, 3 lg)
Gap: 8px md:10px
Each card: bordered, rounded, hover state
Icon + title + description
```

### Two-Column Layout
```
Left Sidebar (hidden on mobile):
  - Fixed width (240-280px)
  - Sticky position
  - Scroll independently

Right Content:
  - Flex-1 to fill remaining space
  - Max-width container
  - Responsive padding
```

### Accordion
```
Button: Full-width, flex justify-between
Icon rotates on expand: rotate-180
Content slides open: animate height
Border-top on expansion
```

## Responsive Design

### Breakpoints
```
Mobile: 375px (default)
Tablet: 768px (md)
Desktop: 1024px (lg)
Wide: 1280px (xl)
```

### Mobile Patterns
- Stack layouts vertically
- Full-width elements with side padding
- Hamburger menu for navigation
- Drawer sidebar instead of fixed
- Touch-friendly tap targets (min 44px)

### Desktop Patterns
- Multi-column grids
- Fixed sidebars
- Hover states prominent
- Full feature visibility

## Accessibility

### Color Contrast
- Text on background: ≥ 7:1 (AAA standard)
- Interactive elements: Clear visual distinction
- Don't rely on color alone

### Typography
- Font size min 16px for body text
- Line height ≥ 1.5 for readability
- Text balancing with `text-balance`

### Interaction
- Keyboard navigation: Tab order logical
- Focus states: Visible outline
- ARIA labels on icon buttons
- Semantic HTML: `<main>`, `<header>`, `<footer>`

### Motion
- Reduced motion respected: `prefers-reduced-motion`
- Animations optional, not blocking

## Dark Mode

### Implementation
- CSS custom properties with `:root` and `.dark` selector
- `next-themes` provider for persistence
- System preference detection
- Manual toggle in header

### Color Adjustments
- Backgrounds get darker
- Text gets lighter
- Borders: `border-border` updates automatically
- Gradients remain vibrant

## Code Examples

### Feature Card
```tsx
<motion.div
  className="group p-6 md:p-8 rounded-2xl border border-border 
             bg-card hover:border-blue-400 hover:shadow-lg 
             transition-all duration-300"
>
  <div className="w-14 h-14 rounded-xl bg-blue-100 
                  dark:bg-blue-900/30 flex items-center 
                  justify-center mb-4">
    <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
  </div>
  <h3 className="text-xl font-semibold mb-3">{title}</h3>
  <p className="text-muted-foreground leading-relaxed">{description}</p>
</motion.div>
```

### Gradient Button
```tsx
<Button 
  className="bg-gradient-to-r from-blue-600 to-cyan-600 
             hover:from-blue-700 hover:to-cyan-700 
             text-white font-semibold"
>
  Start Exploring
</Button>
```

### Metric Card
```tsx
<motion.div
  className={`rounded-2xl p-6 bg-gradient-to-br 
               from-blue-600 to-cyan-600 text-white`}
>
  <div className="flex items-center justify-between mb-3">
    <Icon className="w-6 h-6 opacity-90" />
    <div className="w-8 h-8 rounded-full bg-white/20" />
  </div>
  <p className="text-white/80 text-sm font-medium">{label}</p>
  <p className="text-3xl font-bold mt-2">{value}</p>
</motion.div>
```

## Testing Checklist

- [ ] Colors appear correctly in light mode
- [ ] Colors appear correctly in dark mode
- [ ] All icons render properly
- [ ] Animations are smooth (60fps)
- [ ] Spacing is consistent
- [ ] Text is readable
- [ ] Buttons are clickable (44px minimum)
- [ ] Layout is responsive
- [ ] No layout shifts
- [ ] Hover states work
- [ ] Focus states are visible

---

This design system ensures consistency, professionalism, and accessibility across the Weather Intelligence platform.
