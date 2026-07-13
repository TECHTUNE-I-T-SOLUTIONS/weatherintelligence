'use client'

import { Search, MapPin, History, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useSearchLocations } from '@/hooks/use-weather'
import { storage } from '@/lib/storage'
import { SearchResult } from '@/types/weather'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchBarProps {
  onLocationSelect: (location: SearchResult) => void
  placeholder?: string
}

export function SearchBar({ onLocationSelect, placeholder = 'Search for a city...' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<SearchResult[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const { data: results = [] } = useSearchLocations(query)

  useEffect(() => {
    setHistory(storage.getSearchHistory())
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (location: SearchResult) => {
    storage.addToSearchHistory(location)
    onLocationSelect(location)
    setQuery('')
    setIsOpen(false)
    setHistory(storage.getSearchHistory())
  }

  const displayResults = query.length >= 2 ? results : history

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setIsOpen(false)
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && displayResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
          >
            {query.length < 2 && (
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Recent Searches
              </div>
            )}
            {displayResults.map((result, idx) => (
              <motion.button
                key={`${result.latitude}-${result.longitude}-${idx}`}
                onClick={() => handleSelect(result)}
                className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex items-start gap-3 border-b border-border last:border-b-0"
                whileHover={{ paddingLeft: '1.25rem' }}
              >
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground truncate">{result.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {result.region && `${result.region}, `}
                    {result.country}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
