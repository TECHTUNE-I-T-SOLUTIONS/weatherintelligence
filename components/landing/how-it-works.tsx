'use client'

import { motion } from 'framer-motion'
import { Search, Cloud, Sparkles } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: Search,
    title: 'Search Your Location',
    description: 'Enter any city or use your current location to get started with weather insights.',
  },
  {
    number: 2,
    icon: Cloud,
    title: 'Get Real-Time Data',
    description: 'Access current conditions, hourly forecasts, and 7-day predictions instantly.',
  },
  {
    number: 3,
    icon: Sparkles,
    title: 'Receive AI Insights',
    description: 'Get personalized activity suggestions and outfit recommendations based on weather.',
  },
]

export function LandingHowItWorks() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to get the weather intelligence you need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 max-w-4xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connection line */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-400 to-transparent" />
              )}

              {/* Step card */}
              <div className="p-6 md:p-8 rounded-2xl border border-border bg-card">
                {/* Step number */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 flex items-center justify-center mb-4 text-white font-bold text-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>

                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
