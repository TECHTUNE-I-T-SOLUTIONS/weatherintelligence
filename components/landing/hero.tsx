'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Cloud, Zap, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
      {/* Background gradient elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-80 left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              AI-Powered Weather Intelligence
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance"
          >
            Your Personal Weather{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 text-transparent bg-clip-text">
              Intelligence
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance leading-relaxed"
          >
            Get hyperlocal forecasts powered by advanced AI, personalized activity recommendations, and outfit suggestions based on real-time weather conditions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/weather">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Start Exploring
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-secondary"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto"
          >
            {[
              {
                icon: Cloud,
                label: 'Accurate Forecasts',
                description: 'Hour-by-hour and 7-day predictions',
              },
              {
                icon: Zap,
                label: 'AI Insights',
                description: 'Smart activity & outfit suggestions',
              },
              {
                icon: Sparkles,
                label: 'Real-Time Data',
                description: 'Updated every 10 minutes',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.1, duration: 0.6 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{feature.label}</p>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
