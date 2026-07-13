# Implementation Details

Technical breakdown of key implementation patterns used in Weather Intelligence.

## Architecture Patterns

### 1. Server-Client Boundary

The app uses Next.js App Router with strategic use of client/server components:

- **Server Components**: Layout, metadata generation
- **Client Components**: All interactive features (marked with 'use client')
- **API Routes**: Weather API proxy (optional for adding authentication)

### 2. Data Fetching Pattern

```
User Input → React Query Hook → API Client → Weather API
                          ↓
                    Local Cache
                          ↓
                    Component Props
```

**Key Files**:
- `hooks/use-weather.ts` - React Query hooks
- `lib/api/weather.ts` - API client with error handling
- Cache strategy: 10min weather, 30min insights, 1hr search

### 3. State Management

React Query handles:
- Remote state (API data)
- Caching and synchronization
- Background refetching
- Error states and retries

localStorage handles:
- User preferences (theme)
- Search history
- Saved locations

React hooks handle:
- UI state (modals, tabs)
- Form state (via React Hook Form)

### 4. Component Architecture

**Smart/Container Components**:
- Page component - Coordinates all data fetching
- Providers - Setup React Query and Theme

**Presentational Components**:
- Weather cards - Display weather data
- Search bar - User input
- Error/Loading states

## Key Implementation Details

### TypeScript Type Safety

```typescript
// Example: WeatherData type
export interface WeatherData {
  location: Location
  current: CurrentWeather
  hourly: HourlyForecast[]
  daily: DailyForecast[]
  alerts?: WeatherAlert[]
}
```

All API responses are typed for safety and IDE autocomplete.

### Error Handling

```typescript
// API wrapper with error handling
try {
  const data = await fetchAPI<T>(endpoint)
  return data
} catch (error) {
  if (error instanceof WeatherAPIError) {
    throw error  // Already handled
  }
  throw new WeatherAPIError(500, 'Unknown error')
}
```

### Caching Strategy

```typescript
// React Query caching
return useQuery({
  queryKey: ['weather', latitude, longitude],
  queryFn: () => weatherAPI.getWeather(latitude, longitude),
  staleTime: 1000 * 60 * 10,  // 10 minutes
  gcTime: 1000 * 60 * 30,     // 30 minutes in cache
  retry: 1,
})
```

### localStorage with TypeScript

```typescript
// Safe localStorage with type checking
getSavedLocations(): SavedLocation[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SAVED_LOCATIONS)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}
```

### Search with Debounce

The SearchBar component:
1. Accepts user input
2. Query triggers only when 2+ characters entered
3. React Query automatically handles debouncing via `enabled` flag
4. Results display with animations

### Responsive Design Pattern

```css
/* Mobile-first approach */
.container {
  /* Mobile styles */
  grid-cols-1
}

/* Tablet and up */
@media (min-width: 768px) {
  grid-cols-2
}

/* Desktop and up */
@media (min-width: 1024px) {
  grid-cols-3
}
```

### Theme Implementation

```typescript
// Using next-themes
const { theme, setTheme } = useTheme()

// Automatic light/dark based on:
// 1. User preference
// 2. System preference
// 3. Default (dark)

// CSS variables in globals.css
:root {
  --background: #f8fafb
  --foreground: #0f1419
}

.dark {
  --background: #0a0e14
  --foreground: #e8ecf1
}
```

### Animation Strategy

Uses Framer Motion for:
- Entrance animations (fade in, slide)
- Hover effects
- Transitions between states
- Staggered children animations

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>
  Content
</motion.div>
```

### Form Validation

Using React Hook Form + Zod:

```typescript
const schema = z.object({
  query: z.string().min(2),
})

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
})
```

## API Integration

### Weather API Client

```typescript
const weatherAPI = {
  async getWeather(lat: number, lon: number) {
    // Construct URL with params
    // Add API key from environment
    // Handle response and errors
    // Return typed data
  }
}
```

### Error Handling in Components

```typescript
const { isError, error, refetch } = useWeather(lat, lon)

if (isError) {
  return (
    <ErrorState 
      error={error.message} 
      onRetry={() => refetch()}
    />
  )
}
```

## Performance Techniques

### 1. Code Splitting
- Next.js automatically splits by route
- Dynamic imports for heavy components
- Lazy loading of features

### 2. Image Optimization
- Next.js Image component
- Automatic format selection
- Responsive image sizes

### 3. Caching Headers
- Query results cached in memory
- localStorage for user data
- API responses with time-based cache

### 4. Bundle Analysis
```bash
# Check bundle size
pnpm build
# Next.js shows size report
```

## Security Implementation

### 1. Environment Variables
```env
# .env.local (never commit)
NEXT_PUBLIC_WEATHER_AI_API_KEY=secret_key
```

### 2. Input Validation
```typescript
// Zod schema validation
const searchSchema = z.object({
  query: z.string().min(2).max(100),
})
```

### 3. XSS Prevention
- React automatically escapes content
- No dangerouslySetInnerHTML used
- User input validated before display

### 4. CORS Handling
- Weather API handles CORS
- Requests include proper headers
- Rate limiting awareness

## Testing Approach

### Manual Testing Checklist
- [ ] Search functionality works
- [ ] Theme toggle switches
- [ ] Responsive layouts on mobile
- [ ] Error states display
- [ ] Loading states show
- [ ] Weather data displays correctly
- [ ] Animations are smooth
- [ ] No console errors

### Browser DevTools Tips
- Throttle network to test loading
- Simulate slow devices
- Check console for errors
- Verify API calls in Network tab
- Check localStorage contents

## Deployment Considerations

### Environment Variables
Different values for different environments:
```
Development: .env.local
Production: Vercel/Platform settings
Docker: Pass via -e flag
```

### Build Output
```bash
pnpm build
# Creates .next directory
# Contains optimized production code
# Ready for `pnpm start` or deployment
```

### Performance Metrics
Monitor these in production:
- LCP (Largest Contentful Paint)
- FCP (First Contentful Paint)
- CLS (Cumulative Layout Shift)
- API response times

## Extending the Application

### Adding a New Feature

1. **Create Type Definition** (`types/weather.ts`)
2. **Add API Endpoint** (`lib/api/weather.ts`)
3. **Create React Query Hook** (`hooks/use-weather.ts`)
4. **Build Component** (`components/new-feature.tsx`)
5. **Integrate in Page** (`app/page.tsx`)

### Example: Adding Alerts

```typescript
// 1. Add type
export interface WeatherAlert {
  headline: string
  severity: 'extreme' | 'severe'
}

// 2. Add API method
async getAlerts(lat: number, lon: number) {
  return fetchAPI<WeatherAlert[]>('/alerts')
}

// 3. Add hook
export function useWeatherAlerts(lat: number, lon: number) {
  return useQuery({
    queryKey: ['alerts', lat, lon],
    queryFn: () => weatherAPI.getAlerts(lat, lon),
  })
}

// 4. Create component
export function AlertsCard({ alerts }) {
  return (
    <div>
      {alerts.map(alert => (
        <AlertItem key={alert.headline} alert={alert} />
      ))}
    </div>
  )
}

// 5. Use in page
const { data: alerts } = useWeatherAlerts(lat, lon)
return <AlertsCard alerts={alerts} />
```

## Debugging Tips

### Check Console Errors
```bash
# Run dev server and check terminal output
pnpm dev
# Look for TypeScript errors
# Check for runtime errors
```

### Verify API Key
```javascript
// In browser console
console.log(process.env.NEXT_PUBLIC_WEATHER_AI_API_KEY)
```

### Check React Query
```javascript
// Install React Query DevTools (optional)
// Visualize queries and cache
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
```

### Network Analysis
1. Open DevTools → Network tab
2. Search for API calls
3. Check response status codes
4. Verify response data structure

## Common Pitfalls

1. **Forgetting 'use client'** - Client components need directive
2. **API key in code** - Always use .env.local
3. **Not handling null/undefined** - Always check data before display
4. **Missing error boundaries** - Wrap risky components
5. **Infinite render loops** - Check useEffect dependencies

## Best Practices Applied

- TypeScript strict mode enabled
- ESLint configuration included
- Semantic HTML markup
- ARIA labels for accessibility
- Responsive mobile-first design
- Environment variable management
- Error handling at all levels
- Performance optimizations
- Code organization and structure
- Comprehensive documentation

---

For more details, see the other documentation files in the project.
