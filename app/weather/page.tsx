'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { SearchResult } from '@/types/weather'
import { storage } from '@/lib/storage'
import { useWeather, useAIInsights } from '@/hooks/use-weather'
import { Header } from '@/components/header'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { WeatherHero } from '@/components/dashboard/weather-hero'
import { WeatherMetricsGrid } from '@/components/dashboard/weather-metrics'
import { DailyForecastDetailed } from '@/components/dashboard/daily-forecast-detailed'
import { AIInsightsCard } from '@/components/ai-insights'
import { LoadingSkeleton } from '@/components/loading-skeleton'
import { ErrorState } from '@/components/error-state'
import { motion } from 'framer-motion'
import { Heart, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { weatherAPI } from '@/lib/api/weather'

export default function WeatherPage() {
  const [selectedLocation, setSelectedLocation] = useState<SearchResult | null>(null)
  const [favorites, setFavorites] = useState<SearchResult[]>([])
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    const lastLocation = storage.getLastLocation()
    if (lastLocation) {
      setSelectedLocation(lastLocation)
      return
    }

    setIsLoadingGeolocation(true)
    weatherAPI.lookupByIP().then((loc) => {
      if (loc) {
        setSelectedLocation(loc)
        storage.setLastLocation(loc)
      }
      setIsLoadingGeolocation(false)
    })
  }, [])

  useEffect(() => {
    if (selectedLocation) {
      const favs = storage.getFavorites()
      setIsFavorited(
        favs.some(
          (fav) =>
            fav.latitude === selectedLocation.latitude &&
            fav.longitude === selectedLocation.longitude
        )
      )
    }
  }, [selectedLocation])

  const weatherQuery = useWeather(
    selectedLocation?.latitude ?? null,
    selectedLocation?.longitude ?? null
  )
  const insightsQuery = useAIInsights(
    selectedLocation?.latitude ?? null,
    selectedLocation?.longitude ?? null
  )

  useEffect(() => {
    if (weatherQuery.isError && !weatherQuery.isLoading) {
      toast.error('Weather service temporarily unavailable.', {
        description: 'The weather API is experiencing issues. Please try again later.',
        duration: 5000,
      })
    }
  }, [weatherQuery.isError, weatherQuery.isLoading])

  const handleLocationSelect = (location: SearchResult) => {
    setSelectedLocation(location)
    storage.setLastLocation(location)
    toast.success(`Weather loaded for ${location.name}`)
  }

  const handleToggleFavorite = () => {
    if (!selectedLocation) return

    if (isFavorited) {
      storage.removeFavorite(selectedLocation)
      toast.info('Removed from favorites')
    } else {
      storage.saveFavorite(selectedLocation)
      toast.success('Added to favorites')
    }

    setIsFavorited(!isFavorited)
    setFavorites(storage.getFavorites())
  }

  const isLoading = isLoadingGeolocation || weatherQuery.isLoading
  const hasError = weatherQuery.isError

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="flex flex-col lg:flex-row">
        <DashboardSidebar onLocationSelect={handleLocationSelect} favorites={favorites} />

        <main className="flex-1 overflow-hidden">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            {selectedLocation && !isLoadingGeolocation && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-8"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <h1 className="text-3xl font-bold">{selectedLocation.name}</h1>
                    {selectedLocation.country && (
                      <p className="text-muted-foreground">
                        {selectedLocation.region ? `${selectedLocation.region} • ` : ''}
                        {selectedLocation.country}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleToggleFavorite}
                  variant={isFavorited ? 'default' : 'outline'}
                  size="lg"
                  className={isFavorited ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  {isFavorited ? 'Favorited' : 'Add to Favorites'}
                </Button>
              </motion.div>
            )}

            {isLoading && <LoadingSkeleton />}

            {hasError && !isLoading && (
              <ErrorState
                error="Failed to load weather data. Please try again."
                onRetry={() => weatherQuery.refetch()}
              />
            )}

            {!isLoading && !hasError && weatherQuery.data && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
                className="space-y-8"
              >
                <WeatherHero
                  location={selectedLocation?.name || 'Unknown'}
                  temperature={weatherQuery.data.current.temperature}
                  condition={weatherQuery.data.current.weather_description}
                  humidity={weatherQuery.data.current.humidity}
                  windSpeed={weatherQuery.data.current.wind_speed}
                  visibility={weatherQuery.data.current.visibility}
                  pressure={weatherQuery.data.current.pressure}
                  uvIndex={weatherQuery.data.current.uv_index || 0}
                  feelsLike={weatherQuery.data.current.apparent_temperature}
                  high={weatherQuery.data.daily[0]?.temperature_max || 0}
                  low={weatherQuery.data.daily[0]?.temperature_min || 0}
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold mb-6">Detailed Metrics</h2>
                  <WeatherMetricsGrid
                    metrics={{
                      humidity: weatherQuery.data.current.humidity,
                      windSpeed: weatherQuery.data.current.wind_speed,
                      visibility: weatherQuery.data.current.visibility,
                      pressure: weatherQuery.data.current.pressure,
                      uvIndex: weatherQuery.data.current.uv_index || 0,
                      cloudCover: weatherQuery.data.current.cloud_cover || 0,
                      dewPoint: weatherQuery.data.current.dew_point || 0,
                    }}
                  />
                </motion.div>

                <DailyForecastDetailed
                  forecast={weatherQuery.data.daily.map(day => ({
                    ...day,
                    condition: day.weather_description,
                    high: day.temperature_max,
                    low: day.temperature_min,
                    precipitation: day.precipitation_sum,
                    windSpeed: day.windspeed_max,
                  }))}
                />

                {insightsQuery.data && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <AIInsightsCard data={insightsQuery.data} />
                  </motion.div>
                )}
              </motion.div>
            )}

            {!selectedLocation && !isLoadingGeolocation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border bg-card p-12 text-center max-w-2xl mx-auto mt-20"
              >
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Select a Location</h2>
                <p className="text-muted-foreground mb-6">
                  Use the search bar on the left to select a location and view detailed weather information.
                </p>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}