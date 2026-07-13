# Weather Intelligence App

AI-powered weather forecasting application with real-time data and intelligent insights.

## Features

- Real-time weather conditions and 7-day forecast
- AI-powered weather insights and recommendations
- Location search with autocomplete
- Favorite locations management
- Responsive design (mobile, tablet, desktop)
- Dark/light theme support
- Offline fallback with demo data

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: TanStack React Query v5
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm or npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create `.env.local` file:
   ```env
   NEXT_PUBLIC_WEATHER_AI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open http://localhost:3000/weather

## API Integration

The app integrates with [weather-ai.co](https://weather-ai.co) API using Bearer token authentication.

### Endpoints Used

- `GET /v1/weather` - Current conditions and forecast
- `GET /v1/search` - Location search
- `GET /v1/geocode/reverse` - Reverse geocoding

### Error Handling

The app includes automatic fallback to demo data when the API is unavailable, ensuring the UI remains functional for demonstration purposes.

## Project Structure

```
app/
├── weather/
│   └── page.tsx          # Main weather dashboard
├── layout.tsx            # Root layout with providers
└── globals.css           # Global styles

components/
├── dashboard/            # Dashboard components
├── providers/            # React Query & Theme providers
├── ui/                   # Reusable UI components
└── header.tsx            # Site header

hooks/
└── use-weather.ts        # React Query hooks

lib/
├── api/
│   └── weather.ts        # API client
├── storage.ts            # localStorage management
└── utils.ts              # Utility functions

types/
└── weather.ts            # TypeScript definitions
```

## Building for Production

```bash
pnpm build
pnpm start
```

## License

Private - All rights reserved