# Weather Intelligence - Project Manifest

Complete technical documentation of all project files and their purposes.

## Core Application Files

### `/app/layout.tsx`
- Root layout component
- Sets up metadata and viewport configuration
- Initializes theme and query providers
- Enables analytics

### `/app/page.tsx`
- Main weather page component
- Handles geolocation and location selection
- Manages weather data fetching and display
- Coordinates all weather information sections

### `/app/globals.css`
- Global styles and Tailwind configuration
- Semantic design tokens (colors, spacing, typography)
- Light and dark theme definitions
- CSS variables for consistent theming

## Components Structure

### `/components/providers/`

#### `theme-provider.tsx`
- Wraps app with next-themes
- Manages light/dark mode
- Handles theme persistence
- Detects system preferences

#### `query-provider.tsx`
- Initializes React Query client
- Configures caching strategies
- Sets up retry logic
- Manages data fetching defaults

### `/components/ui/` (shadcn/ui)
- Pre-built UI components from shadcn/ui
- Button, input, dropdown components
- Modal, dialog, and sheet components

### Weather Components

#### `header.tsx`
- Top navigation bar
- Branding and logo
- Theme toggle button
- Sticky positioning

#### `search-bar.tsx`
- Location search input
- Autocomplete suggestions
- Search history display
- Click-outside handling
- Framer Motion animations

#### `current-weather.tsx`
- Main weather display card
- Temperature and feels-like
- Detailed metrics (humidity, wind, pressure, etc.)
- Sunrise/sunset times
- UV index with color coding
- Gradient background design

#### `hourly-forecast.tsx`
- 24-hour scrollable forecast
- Hourly temperature trends
- Weather icons and descriptions
- Precipitation data
- Horizontal scroll layout
- Animated transitions

#### `daily-forecast.tsx`
- 7-day forecast view
- Daily high/low temperatures
- Weather descriptions and icons
- Comprehensive metrics (wind, humidity, precipitation)
- Responsive grid layout
- Hover effects

#### `ai-insights.tsx`
- AI-powered weather summary
- Activity recommendations
- Outfit suggestions by category
- Health alerts and warnings
- Travel tips
- Smooth staggered animations

#### `loading-skeleton.tsx`
- Skeleton loaders for all sections
- Smooth pulse animations
- Matches layout dimensions
- Progressive loading appearance

#### `error-state.tsx`
- Error message display
- Retry button with retry handler
- Alert icon and styling
- User-friendly error messages

## Hooks Directory

### `/hooks/use-weather.ts`
- `useWeather()` - Fetch weather data and forecasts
- `useAIInsights()` - Get AI insights and recommendations
- `useSearchLocations()` - Search for locations
- `useReverseGeocode()` - Convert coordinates to location
- All using React Query with proper caching

## Library & Utilities

### `/lib/api/weather.ts`
- Weather API client
- Error handling and retry logic
- All API endpoints
- Request/response formatting
- API key management
- Rate limiting awareness

### `/lib/weather-utils.ts`
- Weather code to description mapping
- Temperature formatting
- Time/date formatting
- Wind direction conversion
- UV index calculations
- Activity recommendations logic
- Utility helper functions

### `/lib/storage.ts`
- localStorage management
- Saved locations management
- Search history tracking
- Last location persistence
- Type-safe data operations

## Types Directory

### `/types/weather.ts`
- TypeScript interfaces for all data structures
- Weather data types
- Location types
- API response types
- AI insights types
- Strongly typed across app

## Configuration Files

### `package.json`
- Project metadata and scripts
- All dependencies and versions
- Build and dev scripts
- pnpm configuration

### `tsconfig.json`
- TypeScript configuration
- Strict type checking enabled
- Path aliases (@/*)
- ES2020 target

### `next.config.mjs`
- Next.js configuration
- Turbopack settings
- Image optimization
- Experimental features

### `tailwind.config.js`
- Tailwind CSS configuration
- Custom theme extensions
- Plugin configurations
- Content paths

### `.env.example`
- Environment variable template
- NEXT_PUBLIC_WEATHER_AI_API_KEY
- Instructions for setup

### `.gitignore`
- Git ignore patterns
- Node modules, builds
- Environment files
- IDE configurations

## Public Assets

### `/public/robots.txt`
- SEO robot directives
- Sitemap reference
- Crawl delays

### `/public/sitemap.xml`
- XML sitemap for SEO
- URL hierarchy
- Change frequency
- Priority settings

### `/public/` - Icon Files
- Favicons for different browsers
- Apple icon
- SVG icon

## Documentation Files

### `README.md`
- Comprehensive project documentation
- Feature list
- Tech stack details
- Getting started instructions
- API integration guide
- Project structure
- Performance info
- Deployment instructions
- Troubleshooting
- Roadmap

### `DEPLOYMENT.md`
- Deployment guides for multiple platforms
- Vercel (recommended)
- Docker containerization
- Netlify deployment
- Railway deployment
- AWS EC2 setup
- Google Cloud Run
- Monitoring setup
- Security checklist
- Performance optimization

### `QUICKSTART.md`
- 5-minute quick start guide
- API key setup
- Environment configuration
- Running locally
- Testing instructions
- Troubleshooting quick fixes

### `PROJECT_MANIFEST.md` (This File)
- Complete file documentation
- Purpose of each file
- Component relationships
- Dependencies and data flow

## Development Tools

### Development Dependencies
- **Next.js** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Runtime Dependencies
- **React** - UI library
- **React Query** - Data fetching
- **React Hook Form** - Forms
- **Zod** - Validation
- **next-themes** - Theme management
- **Leaflet** - Maps (optional)
- **Recharts** - Charts (optional)

## Data Flow

```
User Input (Search)
    ↓
SearchBar Component
    ↓
useSearchLocations Hook
    ↓
Weather API (Search endpoint)
    ↓
Results → localStorage + display
    ↓
User Selection
    ↓
Page Component
    ↓
useWeather + useAIInsights Hooks
    ↓
Weather API (Weather + Insights)
    ↓
React Query Cache
    ↓
Display Components (CurrentWeather, Hourly, Daily, AIInsights)
```

## Component Hierarchy

```
RootLayout
├── ThemeProvider
├── QueryProvider
└── Main Page
    ├── Header
    │   └── ThemeToggle
    ├── SearchBar
    ├── CurrentWeatherCard
    ├── HourlyForecastCard
    ├── DailyForecastCard
    ├── AIInsightsCard
    └── Footer
```

## API Integration Points

All API calls go through:
1. `lib/api/weather.ts` - Client
2. `hooks/use-weather.ts` - React Query wrapper
3. Component display layers

### Required API Key
- `NEXT_PUBLIC_WEATHER_AI_API_KEY`
- Set in `.env.local` and deployment platforms
- All requests include this key automatically

## Performance Optimizations

- React Query caching (10min weather, 30min insights, 1hr search)
- Code splitting via Next.js
- Image optimization
- Framer Motion for smooth animations
- Lazy loading components
- Memoization where needed

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

## Testing Strategy

The app is designed for:
- Manual browser testing (visual)
- Responsive design testing (mobile/tablet)
- API integration testing (Weather AI)
- Theme switching testing
- Search functionality testing
- Error handling testing

## Security Measures

- API key in environment variables (never hardcoded)
- Input validation with Zod
- XSS protection via React
- HTTPS recommended for production
- localStorage only for non-sensitive data

## Build & Deploy

- Development: `pnpm dev`
- Production Build: `pnpm build && pnpm start`
- Docker: `docker build -t weather-intelligence .`
- Vercel: Connected GitHub repo auto-deploys

## Future Expansion Points

- Database integration for user accounts
- Additional weather data providers
- Real-time notifications
- Historical weather data
- Weather alerts and warnings
- PWA capabilities
- Multi-language support
- Mobile app version

---

Last Updated: January 1, 2025
Version: 1.0.0
