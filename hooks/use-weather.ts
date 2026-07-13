import { useQuery } from '@tanstack/react-query'
import { weatherAPI } from '@/lib/api/weather'
import { WeatherData, AIInsights } from '@/types/weather'

export function useWeather(latitude: number | null, longitude: number | null) {
  return useQuery<WeatherData>({
    queryKey: ['weather', latitude, longitude],
    queryFn: () => {
      if (latitude === null || longitude === null) {
        throw new Error('Coordinates required')
      }
      return weatherAPI.getWeather(latitude, longitude)
    },
    enabled: latitude !== null && longitude !== null,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

export function useAIInsights(latitude: number | null, longitude: number | null) {
  return useQuery<AIInsights>({
    queryKey: ['ai-insights', latitude, longitude],
    queryFn: () => {
      if (latitude === null || longitude === null) {
        throw new Error('Coordinates required')
      }
      return weatherAPI.getAIInsights(latitude, longitude)
    },
    enabled: latitude !== null && longitude !== null,
    staleTime: 1000 * 60 * 30, // 30 minutes
  })
}

export function useSearchLocations(query: string) {
  return useQuery({
    queryKey: ['search-locations', query],
    queryFn: () => weatherAPI.searchLocations(query),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}

export function useReverseGeocode(latitude: number | null, longitude: number | null) {
  return useQuery({
    queryKey: ['reverse-geocode', latitude, longitude],
    queryFn: () => {
      if (latitude === null || longitude === null) {
        throw new Error('Coordinates required')
      }
      return weatherAPI.reverseGeocode(latitude, longitude)
    },
    enabled: latitude !== null && longitude !== null,
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}
