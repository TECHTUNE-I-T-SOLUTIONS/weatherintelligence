'use client'

import { Header } from '@/components/header'
import { BookOpen, Code2, HelpCircle, Zap, FileText, GitBranch } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ResourcesPage() {
  const resources = [
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Complete guide to using Weather Intelligence, including setup, features, and best practices.',
      href: '/docs',
      tag: 'Guide'
    },
    {
      icon: Code2,
      title: 'GitHub Repository',
      description: 'Access the source code, contribute to the project, and explore technical implementation details.',
      href: 'https://github.com/weatherintelligence',
      external: true,
      tag: 'Open Source'
    },
    {
      icon: Zap,
      title: 'System Status',
      description: 'Monitor the health and uptime of Weather Intelligence services and infrastructure.',
      href: '/status',
      tag: 'Status'
    },
    {
      icon: HelpCircle,
      title: 'FAQ',
      description: 'Find answers to common questions about using the platform and understanding weather data.',
      href: '/#faq',
      tag: 'Help'
    },
    {
      icon: FileText,
      title: 'Privacy Policy',
      description: 'Learn how we collect, use, and protect your personal information and data.',
      href: '/privacy',
      tag: 'Legal'
    },
    {
      icon: FileText,
      title: 'Terms of Service',
      description: 'Review our terms and conditions for using the Weather Intelligence platform.',
      href: '/terms',
      tag: 'Legal'
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
            Resources & Documentation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to get started, troubleshoot issues, and make the most of Weather Intelligence.
          </p>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {resources.map((resource) => {
            const Icon = resource.icon
            return (
              <motion.div key={resource.title} variants={itemVariants}>
                <Link href={resource.href} target={resource.external ? '_blank' : undefined}>
                  <div className="group p-6 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all duration-300 h-full cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-blue-500/40 group-hover:to-cyan-500/40 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {resource.tag}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{resource.description}</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Quick Links Section */}
        <motion.div
          className="py-12 px-8 rounded-2xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8">Quick Access</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/docs" className="group p-4 rounded-lg border border-transparent hover:border-primary hover:bg-card transition-all">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Get Started</h3>
                  <p className="text-sm text-muted-foreground">Read the documentation</p>
                </div>
              </div>
            </Link>

            <Link href="/weather" className="group p-4 rounded-lg border border-transparent hover:border-primary hover:bg-card transition-all">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Try Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Start exploring weather</p>
                </div>
              </div>
            </Link>

            <Link href="/status" className="group p-4 rounded-lg border border-transparent hover:border-primary hover:bg-card transition-all">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Check Status</h3>
                  <p className="text-sm text-muted-foreground">View system health</p>
                </div>
              </div>
            </Link>

            <a href="https://github.com/weatherintelligence" target="_blank" rel="noopener noreferrer" className="group p-4 rounded-lg border border-transparent hover:border-primary hover:bg-card transition-all">
              <div className="flex items-center gap-3">
                <GitBranch className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">View Code</h3>
                  <p className="text-sm text-muted-foreground">Explore on GitHub</p>
                </div>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div
          className="text-center py-12 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-border mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">Need more help?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Can't find what you're looking for? Check our documentation or reach out to our support team.
          </p>
          <Link
            href="/docs"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            View Full Documentation
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Everything you need to use Weather Intelligence effectively and stay informed.</p>
        </div>
      </footer>
    </div>
  )
}
