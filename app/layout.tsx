import type { Metadata, Viewport } from 'next'
import './globals.css'
import ThemeProvider from '@/components/providers/theme-provider'
import QueryProvider from '@/components/providers/query-provider'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Weather Intelligence - AI-Powered Weather Forecasting',
  description: 'Get AI-powered weather insights, personalized recommendations, and accurate forecasts with beautiful visualizations.',
  keywords: ['weather', 'forecast', 'AI', 'weather intelligence', 'predictions'],
  authors: [{ name: 'Weather Intelligence' }],
  openGraph: {
    title: 'Weather Intelligence',
    description: 'AI-powered weather forecasting and insights',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0066ff' },
    { media: '(prefers-color-scheme: dark)', color: '#3b82f6' },
  ],
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ThemeProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}