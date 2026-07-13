'use client'

import { motion } from 'framer-motion'
import { Cloud, Droplets, Wind, Eye, Gauge, Sun } from 'lucide-react'

interface WeatherHeroProps {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  visibility: number
  pressure: number
  uvIndex: number
  feelsLike: number
  high: number
  low: number
}

export function WeatherHero({
  location,
  temperature,
  condition,
  humidity,
  windSpeed,
  visibility,
  pressure,
  uvIndex,
  feelsLike,
  high,
  low,
}: WeatherHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500 rounded-3xl p-8 md:p-12 text-white"
    >
      {/* Location and time */}
      <div className="mb-8">
        <p className="text-blue-100 text-sm font-medium">Today, {new Date().toLocaleDateString()}</p>
        <h1 className="text-4xl md:text-5xl font-bold text-balance">{location}</h1>
      </div>

      {/* Main temperature display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start gap-4">
            <Cloud className="w-24 h-24 md:w-32 md:h-32 opacity-90" />
            <div>
              <div className="text-8xl md:text-9xl font-bold">{Math.round(temperature)}°</div>
              <p className="text-xl md:text-2xl text-blue-100 mt-2">{condition}</p>
              <p className="text-blue-100 mt-1">Feels like {Math.round(feelsLike)}°</p>
            </div>
          </div>
        </motion.div>

        {/* Hi/Lo temps */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-8"
        >
          <div className="text-center">
            <p className="text-blue-100 text-sm font-medium mb-1">High</p>
            <p className="text-4xl font-bold">{Math.round(high)}°</p>
          </div>
          <div className="w-px bg-blue-400/30" />
          <div className="text-center">
            <p className="text-blue-100 text-sm font-medium mb-1">Low</p>
            <p className="text-4xl font-bold">{Math.round(low)}°</p>
          </div>
        </motion.div>
      </div>

      {/* Detailed metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-blue-400/30">
        {[
          {
            icon: Droplets,
            label: 'Humidity',
            value: `${humidity}%`,
          },
          {
            icon: Wind,
            label: 'Wind Speed',
            value: `${windSpeed} km/h`,
          },
          {
            icon: Eye,
            label: 'Visibility',
            value: `${visibility} km`,
          },
          {
            icon: Gauge,
            label: 'Pressure',
            value: `${pressure} mb`,
          },
        ].map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.05 }}
            className="flex items-center gap-3"
          >
            <metric.icon className="w-5 h-5 opacity-75" />
            <div>
              <p className="text-blue-100 text-xs font-medium">{metric.label}</p>
              <p className="text-lg font-semibold">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* UV Index */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 pt-8 border-t border-blue-400/30 flex items-center gap-4"
      >
        <Sun className="w-5 h-5 opacity-75" />
        <div>
          <p className="text-blue-100 text-sm font-medium">UV Index</p>
          <p className="text-2xl font-semibold">
            {uvIndex}
            <span className="text-base text-blue-100 ml-2">
              {uvIndex <= 2 && '(Low)'}
              {uvIndex > 2 && uvIndex <= 5 && '(Moderate)'}
              {uvIndex > 5 && uvIndex <= 7 && '(High)'}
              {uvIndex > 7 && '(Very High)'}
            </span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
