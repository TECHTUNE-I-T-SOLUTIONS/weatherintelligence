'use client'

import { motion } from 'framer-motion'
import { Cloud, Droplets, Wind } from 'lucide-react'

interface DailyForecastDay {
  date: string
  condition: string
  high: number
  low: number
  precipitation: number
  windSpeed: number
}

interface DailyForecastDetailedProps {
  forecast: DailyForecastDay[]
}

export function DailyForecastDetailed({ forecast }: DailyForecastDetailedProps) {
  const getWeatherIcon = (condition: string) => {
    // Simplified weather icon mapping
    if (condition.toLowerCase().includes('rain')) return '🌧'
    if (condition.toLowerCase().includes('cloud')) return '☁'
    if (condition.toLowerCase().includes('sun') || condition.toLowerCase().includes('clear')) return '☀'
    if (condition.toLowerCase().includes('snow')) return '❄'
    if (condition.toLowerCase().includes('wind')) return '💨'
    return '☀'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-3xl p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold mb-8">7-Day Forecast</h2>

      <div className="space-y-3">
        {forecast.map((day, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-blue-400 dark:hover:border-blue-500 hover:bg-secondary/50 transition-all duration-300"
          >
            {/* Day and condition */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-20">
                <p className="font-semibold text-sm">
                  {new Date(day.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(day.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">{day.condition}</span>
              </div>
            </div>

            {/* Temperature range */}
            <div className="flex items-center gap-4 flex-1 md:flex-initial">
              <div className="text-right">
                <p className="text-sm font-semibold">{Math.round(day.high)}°</p>
                <p className="text-xs text-muted-foreground">{Math.round(day.low)}°</p>
              </div>

              {/* Temperature bar */}
              <div className="w-16 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-50" />
            </div>

            {/* Metrics */}
            <div className="hidden sm:flex items-center gap-6">
              <div className="flex items-center gap-1">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-sm">{day.precipitation}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="w-4 h-4 text-cyan-500" />
                <span className="text-sm">{day.windSpeed} km/h</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
