'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MapPin, Search, X, Navigation } from 'lucide-react'
import { SearchBar } from '@/components/search-bar'
import { SearchResult } from '@/types/weather'
import { storage } from '@/lib/storage'
import { weatherAPI } from '@/lib/api/weather'

interface DashboardSidebarProps {
  onLocationSelect: (location: SearchResult) => void
  favorites: SearchResult[]
}

export function DashboardSidebar({ onLocationSelect, favorites }: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [locating, setLocating] = useState(false)
  const recentLocations = storage.getSearchHistory()

  const handleRemoveFavorite = (e: React.MouseEvent, location: SearchResult) => {
    e.stopPropagation()
    storage.removeFavorite(location)
  }

  const handleUseMyLocation = async () => {
    setLocating(true)
    try {
      const loc = await weatherAPI.lookupByIP()
      if (loc) {
        onLocationSelect(loc)
        storage.setLastLocation(loc)
      }
    } finally {
      setLocating(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile toggle button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="lg:hidden fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Search className="w-6 h-6" />
        )}
      </motion.button>

      {/* Sidebar overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -400 }}
        animate={{ x: isOpen ? 0 : 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="hidden lg:block sticky top-0 h-screen bg-card border-r border-border overflow-y-auto"
      >
        <div className="p-6 space-y-8">
          {/* My Location */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
              My Location
            </h3>
            <button
              onClick={handleUseMyLocation}
              disabled={locating}
              className="w-full p-3 rounded-lg border border-border hover:border-blue-400 dark:hover:border-blue-500 hover:bg-secondary/50 transition-all duration-200 text-left flex items-center gap-3"
            >
              <Navigation className={`w-5 h-5 text-blue-500 ${locating ? 'animate-spin' : ''}`} />
              <span className="text-sm font-medium">
                {locating ? 'Detecting location...' : 'Use my current location'}
              </span>
            </button>
          </div>

          {/* Search */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
              Search Location
            </h3>
            <div className="scale-90 origin-top-left">
              <SearchBar
                onLocationSelect={(location) => {
                  onLocationSelect(location)
                  setIsOpen(false)
                }}
                placeholder="Find a location..."
              />
            </div>
          </div>

          {/* Favorites */}
          {favorites.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                Favorites
              </h3>
              <div className="space-y-2">
                {favorites.map((location, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => {
                      onLocationSelect(location)
                      setIsOpen(false)
                    }}
                    className="w-full p-3 rounded-lg border border-border hover:border-blue-400 dark:hover:border-blue-500 hover:bg-secondary/50 transition-all duration-200 text-left flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium">
                        {location.name}
                        {location.region && `, ${location.region}`}
                      </span>
                    </div>
                    <motion.span
                      whileHover={{ scale: 1.2 }}
                      onClick={(e) => handleRemoveFavorite(e, location)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </motion.span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Locations */}
          {recentLocations.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                Recent Searches
              </h3>
              <div className="space-y-2">
                {recentLocations.slice(0, 5).map((location, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => {
                      onLocationSelect(location)
                      setIsOpen(false)
                    }}
                    className="w-full p-3 rounded-lg border border-border hover:border-blue-400 dark:hover:border-blue-500 hover:bg-secondary/50 transition-all duration-200 text-left flex items-center gap-2 group"
                  >
                    <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    <span className="text-sm font-medium truncate">
                      {location.name}
                      {location.region && `, ${location.region}`}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
              Tip: Click the heart icon to save your favorite locations for quick access.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="lg:hidden fixed left-0 top-0 z-40 h-full w-80 bg-card border-r border-border overflow-y-auto"
          >
            <div className="p-6 space-y-8">
              {/* My Location */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                  My Location
                </h3>
                <button
                  onClick={handleUseMyLocation}
                  disabled={locating}
                  className="w-full p-3 rounded-lg border border-border hover:border-blue-400 dark:hover:border-blue-500 hover:bg-secondary/50 transition-all duration-200 text-left flex items-center gap-3"
                >
                  <Navigation className={`w-5 h-5 text-blue-500 ${locating ? 'animate-spin' : ''}`} />
                  <span className="text-sm font-medium">
                    {locating ? 'Detecting location...' : 'Use my current location'}
                  </span>
                </button>
              </div>

              {/* Search */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                  Search Location
                </h3>
                <SearchBar
                  onLocationSelect={(location) => {
                    onLocationSelect(location)
                    setIsOpen(false)
                  }}
                  placeholder="Find a location..."
                />
              </div>

              {/* Favorites */}
              {favorites.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                    Favorites
                  </h3>
                  <div className="space-y-2">
                    {favorites.map((location, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          onLocationSelect(location)
                          setIsOpen(false)
                        }}
                        className="w-full p-3 rounded-lg border border-border hover:border-blue-400 dark:hover:border-blue-500 hover:bg-secondary/50 transition-all duration-200 text-left flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium truncate">
                            {location.name}
                            {location.region && `, ${location.region}`}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
