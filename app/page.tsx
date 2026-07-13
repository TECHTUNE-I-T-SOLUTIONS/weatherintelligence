import { Header } from '@/components/header'
import { LandingHero } from '@/components/landing/hero'
import { LandingFeatures } from '@/components/landing/features'
import { LandingHowItWorks } from '@/components/landing/how-it-works'
import { LandingFAQ } from '@/components/landing/faq'
import { LandingFooter } from '@/components/landing/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header showLanding />
      
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingFAQ />
      </main>

      <LandingFooter />
    </div>
  )
}
