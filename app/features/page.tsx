'use client'

import { Header } from '@/components/header'
import { Cloud, Zap, BarChart3, Lightbulb, MapPin, Bell } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function FeaturesPage() {
  const features = [
    {
      icon: Cloud,
      title: 'Real-Time Weather Data',
      description: 'Get accurate, up-to-the-minute weather conditions with hourly and 7-day forecasts powered by advanced meteorological models.'
    },
    {
      icon: Zap,
      title: 'AI-Powered Analysis',
      description: 'Our machine learning algorithms analyze weather patterns to provide intelligent insights and personalized recommendations.'
    },
    {
      icon: BarChart3,
      title: 'Detailed Metrics',
      description: 'Access comprehensive weather metrics including humidity, wind speed, visibility, pressure, UV index, cloud cover, and dew point.'
    },
    {
      icon: Lightbulb,
      title: 'Smart Suggestions',
      description: 'Receive AI-generated activity recommendations and outfit suggestions based on current and forecasted weather conditions.'
    },
    {
      icon: MapPin,
      title: 'Location Search',
      description: 'Search any location worldwide with instant autocomplete and save your favorite cities for quick access.'
    },
    {
      icon: Bell,
      title: 'Weather Alerts',
      description: 'Stay informed with timely notifications about significant weather changes and severe weather warnings.'
    },
  ]

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
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-balance">
            Powerful Features for Weather Intelligence
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand and plan around weather conditions with AI-powered insights and real-time data.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:from-blue-500/40 group-hover:to-cyan-500/40 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center py-12 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">Ready to experience advanced weather intelligence?</h2>
          <Link
            href="/weather"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Go to Dashboard
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Explore all features and start forecasting with AI intelligence.</p>
        </div>
      </footer>
    </div>
  )
}
