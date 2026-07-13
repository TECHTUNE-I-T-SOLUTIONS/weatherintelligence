'use client'

import { DailyForecast } from '@/types/weather'
import { formatFullDate, getWeatherIcon, getWeatherDescription } from '@/lib/weather-utils'
import { motion } from 'framer-motion'
import { Cloud, Droplets, Wind, Eye } from 'lucide-react'

interface DailyForecastProps {
  data: DailyForecast[]
}

export function DailyForecastCard({ data }: DailyForecastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <h2 className="text-xl font-bold mb-6 text-foreground">7-Day Forecast</h2>

      <div className="space-y-3">
        {data.slice(0, 7).map((day, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center gap-4 p-4 rounded-lg bg-secondary hover:bg-muted transition-colors"
          >
            {/* Date */}
            <div className="flex-shrink-0 min-w-[120px]">
              <div className="font-semibold text-foreground">
                {formatFullDate(day.date)}
              </div>
            </div>

            {/* Weather icon and description */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-3xl">
                {getWeatherIcon(day.weather_code)}
              </div>
              <div className="text-sm text-muted-foreground">
                {day.weather_description}
              </div>
            </div>

            {/* Temperature range */}
            <div className="flex-shrink-0 min-w-[100px]">
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-red-500">{Math.round(day.temperature_max)}°</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-blue-500">{Math.round(day.temperature_min)}°</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 hidden md:grid grid-cols-4 gap-3 ml-auto">
              <div className="flex items-center gap-1 text-xs">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-muted-foreground">{Math.round(day.precipitation_sum)} mm</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Wind className="w-4 h-4 text-cyan-500" />
                <span className="text-muted-foreground">{Math.round(day.windspeed_max)} km/h</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Cloud className="w-4 h-4 text-gray-500" />
                <span className="text-muted-foreground">{day.humidity_max}%</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="font-semibold text-orange-500">{day.precipitation_probability_max}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
