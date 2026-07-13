import { Header } from '@/components/header'
import { Activity, CheckCircle, Clock } from 'lucide-react'

export const metadata = {
  title: 'System Status - Weather Intelligence',
  description: 'Real-time system status and uptime information for Weather Intelligence.',
}

export default function StatusPage() {
  const services = [
    { name: 'API Server', status: 'operational', uptime: '99.98%' },
    { name: 'Weather Data Pipeline', status: 'operational', uptime: '99.95%' },
    { name: 'AI Analysis Engine', status: 'operational', uptime: '99.99%' },
    { name: 'Dashboard', status: 'operational', uptime: '99.99%' },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">System Status</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Check the real-time status of Weather Intelligence services.
            </p>
          </div>

          {/* Overall Status */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-8 mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">All Systems Operational</span>
            </div>
            <p className="text-muted-foreground">No incidents detected in the last 24 hours</p>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold mb-4">Service Status</h2>
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-card/50 transition-colors">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {service.status === 'operational' ? 'Operational' : 'Degraded'}
                </span>
              </div>
            ))}
          </div>

          {/* Maintenance Schedule */}
          <div className="mt-12 pt-12 border-t border-border">
            <h2 className="text-lg font-semibold mb-4">Maintenance Schedule</h2>
            <div className="bg-card/50 border border-border rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">No scheduled maintenance</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We perform routine maintenance outside of peak hours. Subscribe to updates to be notified of any planned downtime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
