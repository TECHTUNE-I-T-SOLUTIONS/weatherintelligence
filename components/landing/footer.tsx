'use client'

import Link from 'next/link'
import { Cloud, GitBranch, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

export function LandingFooter() {
  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const linkHoverVariants = {
    hover: {
      x: 4,
      transition: { duration: 0.2 },
    },
  }



  return (
    <footer className="border-t border-border bg-gradient-to-b from-background to-card/30 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div className="md:col-span-1" variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 flex items-center justify-center shadow-lg">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg text-foreground">Weather Intelligence</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional AI-powered weather forecasting, detailed analytics, and real-time insights for accurate predictions.
            </p>
          </motion.div>

          {/* Product */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-4 text-foreground text-sm uppercase tracking-wide">Product</h3>
            <ul className="space-y-3">
              {[
                { label: 'Dashboard', href: '/weather' },
                { label: 'Features', href: '/features' },
                { label: 'How It Works', href: '/how-it-works' },
              ].map((item) => (
                <li key={item.href}>
                  <motion.div variants={linkHoverVariants} whileHover="hover">
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                    >
                      {item.label}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-4 text-foreground text-sm uppercase tracking-wide">Resources</h3>
            <ul className="space-y-3">
              {[
                { label: 'Documentation', href: '/docs' },
                { label: 'Status', href: '/status' },
                { label: 'Contact Support', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <motion.div variants={linkHoverVariants} whileHover="hover">
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                    >
                      {item.label}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-4 text-foreground text-sm uppercase tracking-wide">Legal</h3>
            <ul className="space-y-3">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map((item) => (
                <li key={item.href}>
                  <motion.div variants={linkHoverVariants} whileHover="hover">
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                    >
                      {item.label}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-border pt-8"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Weather Intelligence. All rights reserved.
            </p>

            {/* GitHub Link */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="https://github.com/TECHTUNE-I-T-SOLUTIONS/weatherintelligence"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Repository"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <GitBranch className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
