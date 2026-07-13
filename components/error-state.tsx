'use client'

import { AlertTriangle, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

interface ErrorStateProps {
  error: string
  onRetry?: () => void
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-red-500/30 bg-red-500/5 p-8 text-center"
    >
      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">Something went wrong</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{error}</p>
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </motion.button>
      )}
    </motion.div>
  )
}
