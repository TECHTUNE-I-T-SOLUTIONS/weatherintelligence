'use client'

import { Header } from '@/components/header'
import { Search, Zap, BarChart3, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Search,
      number: '01',
      title: 'Search for a Location',
      description: 'Enter any city, region, or country name. Our intelligent search will instantly find the location and retrieve real-time weather data.',
      features: ['Global location coverage', 'Autocomplete suggestions', 'Save favorites']
    },
    {
      icon: Zap,
      number: '02',
      title: 'Real-Time Data Collection',
      description: 'Weather Intelligence retrieves comprehensive meteorological data including temperature, humidity, wind patterns, and atmospheric pressure.',
      features: ['Hourly updates', 'Multi-source data', 'Accuracy verified']
    },
    {
      icon: BarChart3,
      number: '03',
      title: 'AI Analysis & Processing',
      description: 'Advanced machine learning algorithms analyze the weather patterns, historical data, and forecasting models to identify trends and anomalies.',
      features: ['Pattern recognition', 'Trend analysis', 'Anomaly detection']
    },
    {
      icon: Lightbulb,
      number: '04',
      title: 'Intelligent Insights',
      description: 'Get personalized recommendations for activities, outfit suggestions, and critical weather alerts tailored to your location and preferences.',
      features: ['Smart suggestions', 'Custom alerts', 'Personalized insights']
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
          className="mb-20 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-balance">
            How Weather Intelligence Works
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple yet powerful process to deliver accurate weather insights powered by artificial intelligence.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="space-y-12 md:space-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                {/* Content */}
                <div className={isEven ? 'md:order-1' : 'md:order-2'}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl font-bold text-primary/20">{step.number}</div>
                    <div className="flex-1">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{step.description}</p>

                  <div className="space-y-2">
                    {step.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Illustration Placeholder */}
                <div className={isEven ? 'md:order-2' : 'md:order-1'}>
                  <div className="h-72 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-border flex items-center justify-center">
                    <Icon className="w-24 h-24 text-primary/20" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          className="mt-20 py-12 px-8 rounded-2xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Powered by Advanced Technology</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Real-Time Data</h3>
              <p className="text-sm text-muted-foreground">Continuous monitoring and updates from multiple weather sources worldwide.</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Machine Learning</h3>
              <p className="text-sm text-muted-foreground">AI algorithms that learn from patterns to provide accurate forecasts and insights.</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Cloud Infrastructure</h3>
              <p className="text-sm text-muted-foreground">Scalable, reliable platform built on modern cloud technology for instant access.</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center py-12 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-border mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">See it in action</h2>
          <Link
            href="/weather"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Try the Dashboard
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Understanding weather has never been easier with AI-powered intelligence.</p>
        </div>
      </footer>
    </div>
  )
}
