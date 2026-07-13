'use client'

import { motion } from 'framer-motion'
import {
  Cloud,
  Zap,
  Target,
  TrendingUp,
  Map,
  Bell,
} from 'lucide-react'

const features = [
  {
    icon: Cloud,
    title: 'Detailed Forecasts',
    description: 'Get hour-by-hour predictions and 7-day forecasts with temperature, precipitation, wind speed, and humidity data.',
  },
  {
    icon: Zap,
    title: 'AI-Powered Insights',
    description: 'Receive intelligent weather summaries and analysis powered by advanced machine learning algorithms.',
  },
  {
    icon: Target,
    title: 'Activity Suggestions',
    description: 'Get personalized activity recommendations based on current weather conditions and forecasts.',
  },
  {
    icon: TrendingUp,
    title: 'Weather Trends',
    description: 'Analyze weather patterns over time with interactive charts and historical data visualization.',
  },
  {
    icon: Map,
    title: 'Location Search',
    description: 'Search for any location worldwide with autocomplete and save your favorite places.',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Get notified about severe weather and significant changes in your selected location.',
  },
]

export function LandingFeatures() {
  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            Powerful Weather Intelligence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stay informed and plan your day with confidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 md:p-8 rounded-2xl border border-border bg-card hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
