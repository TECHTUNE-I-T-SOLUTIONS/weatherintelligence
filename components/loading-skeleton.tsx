'use client'

import { motion } from 'framer-motion'

export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Current Weather Skeleton */}
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="rounded-2xl bg-gradient-to-br from-secondary to-muted h-48 md:h-56"
      />

      {/* Hourly Forecast Skeleton */}
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
        className="rounded-2xl bg-secondary h-32"
      />

      {/* Daily Forecast Skeleton */}
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
        className="rounded-2xl bg-secondary h-80"
      />

      {/* AI Insights Skeleton */}
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        className="rounded-2xl bg-secondary h-64"
      />
    </div>
  )
}
