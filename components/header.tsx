'use client'

import Link from 'next/link'
import { Cloud } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  showLanding?: boolean
}

export function Header({ showLanding }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Weather Intelligence</h1>
            <p className="text-xs text-muted-foreground">AI-Powered Forecasting</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {showLanding && (
            <Link href="/weather">
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
