import { SavedLocation, SearchResult } from '@/types/weather';

const STORAGE_KEYS = {
  SAVED_LOCATIONS: 'weather-app-saved-locations',
  SEARCH_HISTORY: 'weather-app-search-history',
  LAST_LOCATION: 'weather-app-last-location',
  FAVORITES: 'weather-app-favorites',
};

export const storage = {
  // Saved locations
  getSavedLocations(): SavedLocation[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_LOCATIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveLocation(location: SavedLocation): void {
    if (typeof window === 'undefined') return;
    try {
      const locations = this.getSavedLocations();
      const exists = locations.some((l) => l.id === location.id);
      if (!exists) {
        locations.push(location);
        localStorage.setItem(STORAGE_KEYS.SAVED_LOCATIONS, JSON.stringify(locations));
      }
    } catch {
      console.warn('Failed to save location');
    }
  },

  removeSavedLocation(id: string): void {
    if (typeof window === 'undefined') return;
    try {
      const locations = this.getSavedLocations();
      const filtered = locations.filter((l) => l.id !== id);
      localStorage.setItem(STORAGE_KEYS.SAVED_LOCATIONS, JSON.stringify(filtered));
    } catch {
      console.warn('Failed to remove location');
    }
  },

  // Search history
  getSearchHistory(): SearchResult[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addToSearchHistory(location: SearchResult): void {
    if (typeof window === 'undefined') return;
    try {
      const history = this.getSearchHistory();
      // Remove if already exists
      const filtered = history.filter(
        (l) => !(l.latitude === location.latitude && l.longitude === location.longitude)
      );
      // Add to beginning and keep only last 10
      const updated = [location, ...filtered].slice(0, 10);
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(updated));
    } catch {
      console.warn('Failed to add search history');
    }
  },

  clearSearchHistory(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
    } catch {
      console.warn('Failed to clear search history');
    }
  },

  // Last location
  setLastLocation(location: SearchResult): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_LOCATION, JSON.stringify(location));
    } catch {
      console.warn('Failed to set last location');
    }
  },

  getLastLocation(): SearchResult | null {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LAST_LOCATION);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  // Favorites
  getFavorites(): SearchResult[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveFavorite(location: SearchResult): void {
    if (typeof window === 'undefined') return;
    try {
      const favorites = this.getFavorites();
      const exists = favorites.some(
        (fav) =>
          fav.latitude === location.latitude && fav.longitude === location.longitude
      );
      if (!exists) {
        favorites.push(location);
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      }
    } catch {
      console.warn('Failed to save favorite');
    }
  },

  removeFavorite(location: SearchResult): void {
    if (typeof window === 'undefined') return;
    try {
      const favorites = this.getFavorites();
      const filtered = favorites.filter(
        (fav) =>
          !(fav.latitude === location.latitude && fav.longitude === location.longitude)
      );
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered));
    } catch {
      console.warn('Failed to remove favorite');
    }
  },
};
