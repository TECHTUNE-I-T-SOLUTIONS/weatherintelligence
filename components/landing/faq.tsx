'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How accurate are the weather forecasts?',
    answer: 'Our forecasts use advanced AI algorithms and data from multiple weather services to provide highly accurate predictions. The accuracy decreases slightly the further out you forecast, which is normal for weather prediction.',
  },
  {
    question: 'Can I search for any location in the world?',
    answer: 'Yes, you can search for any city, region, or country. Our database includes millions of locations worldwide. You can also save your favorite locations for quick access.',
  },
  {
    question: 'How often is the weather data updated?',
    answer: 'Weather data is updated every 10 minutes for real-time accuracy. Forecasts are refreshed multiple times daily to reflect the latest meteorological models.',
  },
  {
    question: 'What do the AI insights include?',
    answer: 'AI insights provide weather summaries, activity recommendations based on conditions, outfit suggestions, and personalized advice for your selected location.',
  },
  {
    question: 'Is there a cost to use Weather Intelligence?',
    answer: 'Weather Intelligence is completely free to use. No registration or payment required to access all features and forecasts.',
  },
  {
    question: 'Can I get weather alerts for severe conditions?',
    answer: 'Yes, you can enable notifications to receive alerts about severe weather, significant temperature changes, or other important weather events.',
  },
]

export function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Weather Intelligence.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="border border-border rounded-lg bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/50 transition-colors duration-200"
              >
                <span className="font-semibold text-left">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 py-4 border-t border-border bg-secondary/30"
                  >
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
