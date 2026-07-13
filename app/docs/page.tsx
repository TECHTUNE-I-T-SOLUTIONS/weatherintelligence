import { Header } from '@/components/header'
import { BookOpen, ArrowRight, Code2, Cloud, Zap } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Documentation - Weather Intelligence',
  description: 'Complete documentation and guides for Weather Intelligence API and platform.',
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Documentation</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Learn how to use Weather Intelligence and integrate our API into your applications.
            </p>
          </div>

          {/* Documentation Sections */}
          <div className="grid gap-6">
            {/* Getting Started */}
            <div className="border border-border rounded-lg p-6 hover:border-primary hover:bg-card/50 transition-all">
              <div className="flex items-start gap-4">
                <Cloud className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
                  <p className="text-muted-foreground mb-4">
                    Learn the basics of Weather Intelligence, including setup, authentication, and making your first API request.
                  </p>
                  <Link href="#" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all">
                    Read Guide
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* API Reference */}
            <div className="border border-border rounded-lg p-6 hover:border-primary hover:bg-card/50 transition-all">
              <div className="flex items-start gap-4">
                <Code2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">API Reference</h2>
                  <p className="text-muted-foreground mb-4">
                    Complete API reference documentation including endpoints, request/response formats, and examples.
                  </p>
                  <Link href="#" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all">
                    View API Docs
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Advanced Features */}
            <div className="border border-border rounded-lg p-6 hover:border-primary hover:bg-card/50 transition-all">
              <div className="flex items-start gap-4">
                <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">Advanced Features</h2>
                  <p className="text-muted-foreground mb-4">
                    Explore advanced features including AI insights, predictive analytics, and custom integrations.
                  </p>
                  <Link href="#" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-12 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-card/50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">How do I get an API key?</h3>
                <p className="text-muted-foreground">Sign up for an account and generate an API key from your dashboard.</p>
              </div>
              <div className="bg-card/50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">What is the rate limit?</h3>
                <p className="text-muted-foreground">Standard plans include 1000 requests per day. Premium plans offer higher limits.</p>
              </div>
              <div className="bg-card/50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Is there a free tier?</h3>
                <p className="text-muted-foreground">Yes, we offer a generous free tier with 100 requests per day.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
