'use client'

import { HourlyForecast } from '@/types/weather'
import { formatHour, getWeatherIcon } from '@/lib/weather-utils'
import { motion } from 'framer-motion'

interface HourlyForecastProps {
  data: HourlyForecast[]
}

export function HourlyForecastCard({ data }: HourlyForecastProps) {
  // Get next 24 hours
  const next24Hours = data.slice(0, 24)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <h2 className="text-xl font-bold mb-6 text-foreground">24-Hour Forecast</h2>

      <div className="overflow-x-auto">
        <div className="flex gap-3 pb-4 min-w-min">
          {next24Hours.map((hour, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex-shrink-0 flex flex-col items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-muted transition-colors"
            >
              <div className="text-sm font-semibold text-muted-foreground">
                {formatHour(hour.time)}
              </div>

              <div className="text-2xl">
                {getWeatherIcon(hour.weather_code)}
              </div>

              <div className="text-lg font-bold text-foreground">
                {Math.round(hour.temperature)}°
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>💧 {hour.humidity}%</span>
              </div>

              <div className="text-xs text-muted-foreground text-center max-w-[80px]">
                {hour.weather_description}
              </div>

              {hour.precipitation > 0 && (
                <div className="text-xs font-semibold text-blue-500">
                  {hour.precipitation.toFixed(1)}mm
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
