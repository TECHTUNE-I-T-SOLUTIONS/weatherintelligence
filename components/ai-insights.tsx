'use client'

import { AIInsights } from '@/types/weather'
import { motion } from 'framer-motion'
import { Lightbulb, Zap, TrendingUp, AlertTriangle } from 'lucide-react'

interface AIInsightsProps {
  data: AIInsights
}

export function AIInsightsCard({ data }: AIInsightsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <h2 className="text-xl font-bold mb-6 text-foreground">AI Insights</h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Summary */}
        <motion.div variants={itemVariants} className="flex gap-3">
          <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-foreground mb-2">Today's Summary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{data.summary}</p>
          </div>
        </motion.div>

        {/* Activities */}
        {data.activities && data.activities.length > 0 && (
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-orange-500" />
              <h3 className="font-semibold text-foreground">Recommended Activities</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {data.activities.map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="px-3 py-2 rounded-lg bg-secondary text-sm font-medium text-foreground text-center"
                >
                  {activity}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Outfit Recommendations */}
        {data.outfit_recommendations && data.outfit_recommendations.length > 0 && (
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-cyan-500" />
              <h3 className="font-semibold text-foreground">Outfit Recommendations</h3>
            </div>
            <div className="space-y-3">
              {data.outfit_recommendations.map((rec, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-3 rounded-lg bg-secondary"
                >
                  <div className="font-semibold text-foreground mb-1 text-sm">
                    {rec.category}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">{rec.reason}</div>
                  <div className="flex flex-wrap gap-2">
                    {rec.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="px-2 py-1 rounded bg-primary/20 text-xs text-primary font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Health Alerts */}
        {data.health_alerts && data.health_alerts.length > 0 && (
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-foreground">Health Alerts</h3>
            </div>
            <div className="space-y-2">
              {data.health_alerts.map((alert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="px-3 py-2 rounded-lg bg-red-500/10 text-sm text-red-700 dark:text-red-400 border border-red-500/20"
                >
                  • {alert}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Travel Tips */}
        {data.travel_tips && data.travel_tips.length > 0 && (
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-foreground mb-3">Travel Tips</h3>
            <div className="space-y-2">
              {data.travel_tips.map((tip, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="px-3 py-2 rounded-lg bg-secondary text-sm text-foreground"
                >
                  • {tip}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
