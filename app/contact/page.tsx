'use client'

import { Header } from '@/components/header'
import { Mail, MessageSquare, GitBranch, BookOpen, Clock } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const supportChannels = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email and we\'ll get back to you within 24 hours.',
      action: 'support@weatherintelligence.app',
      href: 'mailto:support@weatherintelligence.app',
      link: 'Send Email'
    },
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Find solutions and guides in our comprehensive documentation.',
      action: 'Browse guides and tutorials',
      href: '/docs',
      link: 'View Docs'
    },
    {
      icon: GitBranch,
      title: 'GitHub Repository',
      description: 'Report bugs and suggest features on our GitHub repository.',
      action: 'github.com/weatherintelligence',
      href: 'https://github.com/weatherintelligence',
      link: 'Open GitHub',
      external: true
    },
  ]

  const faqItems = [
    {
      question: 'How often is the weather data updated?',
      answer: 'Weather data is updated every 10 minutes to ensure you have the most current information available.'
    },
    {
      question: 'What locations are supported?',
      answer: 'We support weather data for any location worldwide. Simply search for your city, region, or country name.'
    },
    {
      question: 'How accurate are the forecasts?',
      answer: 'Our AI models analyze multiple data sources and historical patterns, achieving accuracy rates of 85-95% depending on the forecast period.'
    },
    {
      question: 'Can I save favorite locations?',
      answer: 'Yes! You can save multiple favorite locations and access them instantly from the dashboard.'
    },
    {
      question: 'Is the service available 24/7?',
      answer: 'Yes, Weather Intelligence is available 24/7. Check our status page for any maintenance notifications.'
    },
    {
      question: 'How do I report a bug?',
      answer: 'Please report bugs via email at support@weatherintelligence.app or create an issue on GitHub.'
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
            Support & Help Center
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help! Choose your preferred support channel below.
          </p>
        </motion.div>

        {/* Support Channels */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {supportChannels.map((channel) => {
            const Icon = channel.icon
            return (
              <motion.div key={channel.title} variants={itemVariants}>
                <div className="p-6 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{channel.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">{channel.description}</p>
                  <p className="text-xs font-mono text-primary mb-4 break-all">{channel.action}</p>
                  <Link
                    href={channel.href}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noopener noreferrer' : undefined}
                    className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {channel.link}
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* FAQ Section */}
        <div className="mb-16">
          <motion.h2
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqItems.map((faq, index) => (
              <motion.details
                key={index}
                variants={itemVariants}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <summary className="flex items-center gap-3 font-semibold text-foreground select-none">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary group-open:bg-primary group-open:text-primary-foreground transition-colors">
                    +
                  </span>
                  {faq.question}
                </summary>
                <p className="mt-4 ml-9 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </motion.details>
            ))}
          </motion.div>
        </div>

        {/* Response Time Info */}
        <motion.div
          className="py-8 px-6 rounded-xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-border flex items-start gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold mb-1 text-foreground">Response Time</h3>
            <p className="text-sm text-muted-foreground">
              We aim to respond to all support inquiries within 24 hours. For urgent issues, please email support@weatherintelligence.app with "URGENT" in the subject line.
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center py-12 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-border mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
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
          <p>We're committed to providing excellent support and continuously improving Weather Intelligence.</p>
        </div>
      </footer>
    </div>
  )
}
