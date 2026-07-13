import { Header } from '@/components/header'
import { Shield } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy - Weather Intelligence',
  description: 'Privacy policy and data protection information for Weather Intelligence.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                Weather Intelligence (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates the Weather Intelligence service. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">We may collect information about you in a variety of ways, including:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Location data to provide accurate weather forecasts</li>
                <li>Usage data to improve our services</li>
                <li>Device information for optimization purposes</li>
                <li>Account information if you create a user account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Provide and maintain our services</li>
                <li>Personalize your experience</li>
                <li>Improve and optimize our platform</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Third-Party Services</h2>
              <p className="text-muted-foreground">
                We may employ third-party companies to facilitate our service, provide service-related functionality, and perform other services on our behalf. These third parties are obligated to maintain your information confidentially.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Your Privacy Rights</h2>
              <p className="text-muted-foreground">
                Depending on your location, you may have certain rights regarding your personal information. Please contact us if you wish to exercise any of these rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy, please contact us at privacy@weatherintelligence.app
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
