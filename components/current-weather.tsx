'use client'

import { Cloud, CloudRain, Wind, Droplets, Eye, Gauge, Sun, Moon } from 'lucide-react'
import { CurrentWeather } from '@/types/weather'
import { 
  formatTemperature, 
  formatWindSpeed, 
  formatVisibility, 
  formatHumidity,
  getWeatherIcon,
  getUVIndexLevel,
  getUVIndexColor 
} from '@/lib/weather-utils'
import { motion } from 'framer-motion'

interface CurrentWeatherProps {
  data: CurrentWeather
  location: string
}

export function CurrentWeatherCard({ data, location }: CurrentWeatherProps) {
  const uvColor = getUVIndexColor(data.uv_index)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-8"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{location}</h2>
          <p className="text-white/80">{data.weather_description}</p>
        </div>

        {/* Main temperature display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-7xl font-bold">{Math.round(data.temperature)}°</div>
            <div className="text-2xl mt-2">C</div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-sm font-semibold text-white/80 mb-1">Feels Like</div>
              <div className="text-2xl font-bold">{Math.round(data.apparent_temperature)}°</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-sm font-semibold text-white/80 mb-1">Humidity</div>
              <div className="text-2xl font-bold">{data.humidity}%</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-sm font-semibold text-white/80 mb-1">Wind</div>
              <div className="text-2xl font-bold">{Math.round(data.wind_speed)} km/h</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-sm font-semibold text-white/80 mb-1">Pressure</div>
              <div className="text-2xl font-bold">{Math.round(data.pressure)} mb</div>
            </div>
          </div>
        </div>

        {/* Detailed info grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4" />
              <span className="text-sm font-semibold text-white/80">Dew Point</span>
            </div>
            <div className="text-lg font-bold">{Math.round(data.dew_point)}°C</div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-semibold text-white/80">Visibility</span>
            </div>
            <div className="text-lg font-bold">{(data.visibility / 1000).toFixed(1)} km</div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Cloud className="w-4 h-4" />
              <span className="text-sm font-semibold text-white/80">Cloud Cover</span>
            </div>
            <div className="text-lg font-bold">{data.cloud_cover}%</div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="w-4 h-4" />
              <span className="text-sm font-semibold text-white/80">UV Index</span>
            </div>
            <div className="text-lg font-bold">{data.uv_index.toFixed(1)} ({getUVIndexLevel(data.uv_index)})</div>
          </div>
        </div>

        {/* Sun times */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-lg p-3">
            <Sun className="w-5 h-5" />
            <div>
              <div className="text-xs font-semibold text-white/80">Sunrise</div>
              <div className="font-bold">{new Date(data.sunrise).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-lg p-3">
            <Moon className="w-5 h-5" />
            <div>
              <div className="text-xs font-semibold text-white/80">Sunset</div>
              <div className="font-bold">{new Date(data.sunset).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
