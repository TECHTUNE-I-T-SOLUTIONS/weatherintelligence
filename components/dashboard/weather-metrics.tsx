'use client'

import { motion } from 'framer-motion'
import {
  Droplets,
  Wind,
  Eye,
  Gauge,
  Zap,
  Cloud,
  Thermometer,
} from 'lucide-react'

interface MetricsGridProps {
  metrics: {
    humidity: number
    windSpeed: number
    visibility: number
    pressure: number
    uvIndex: number
    cloudCover: number
    dewPoint: number
  }
}

export function WeatherMetricsGrid({ metrics }: MetricsGridProps) {
  const metricsList = [
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${metrics.humidity}%`,
      color: 'from-blue-600 to-blue-500',
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${metrics.windSpeed} km/h`,
      color: 'from-cyan-600 to-cyan-500',
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${metrics.visibility} km`,
      color: 'from-purple-600 to-purple-500',
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${metrics.pressure} mb`,
      color: 'from-orange-600 to-orange-500',
    },
    {
      icon: Zap,
      label: 'UV Index',
      value: `${metrics.uvIndex}`,
      color: 'from-yellow-600 to-yellow-500',
    },
    {
      icon: Cloud,
      label: 'Cloud Cover',
      value: `${metrics.cloudCover}%`,
      color: 'from-slate-600 to-slate-500',
    },
    {
      icon: Thermometer,
      label: 'Dew Point',
      value: `${metrics.dewPoint}°C`,
      color: 'from-teal-600 to-teal-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {metricsList.map((metric, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05, duration: 0.5 }}
          viewport={{ once: true }}
          className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${metric.color} text-white group cursor-pointer hover:shadow-lg transition-shadow duration-300`}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <metric.icon className="w-6 h-6 opacity-90" />
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center" />
            </div>
            <p className="text-white/80 text-sm font-medium">{metric.label}</p>
            <p className="text-3xl font-bold mt-2 text-balance">{metric.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
