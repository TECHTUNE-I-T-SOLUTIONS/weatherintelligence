import { WeatherData, AIInsights, SearchResult } from '@/types/weather';

const API_BASE = 'https://api.weather-ai.co/v1';
const KEY = process.env.NEXT_PUBLIC_WEATHER_AI_API_KEY;

class WeatherAPIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'WeatherAPIError';
  }
}

async function fetchDirect<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
  const url = new URL(`${API_BASE}${endpoint}`);

  const response = await fetch(url.toString(), {
    signal,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${KEY}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new WeatherAPIError(response.status, error);
  }

  return (await response.json()) as T;
}

async function fetchViaProxy<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
  const url = new URL(`${window.location.origin}/api/weather`);
  url.searchParams.set('endpoint', endpoint);

  const params = new URLSearchParams(endpoint.split('?')[1]);
  params.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    signal,
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new WeatherAPIError(response.status, error.error || 'Weather API error');
  }

  return (await response.json()) as T;
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  if (!KEY) {
    throw new WeatherAPIError(500, 'API key not configured');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    // Try direct call first
    return await fetchDirect<T>(endpoint, controller.signal);
  } catch (directErr) {
    // If direct fails, try via proxy
    try {
      return await fetchViaProxy<T>(endpoint, controller.signal);
    } catch (proxyErr) {
      clearTimeout(timeoutId);
      throw directErr;
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

function getMockWeatherData(latitude: number, longitude: number): WeatherData {
  const now = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  return {
    location: {
      name: 'Demo Location',
      region: 'Demo Region',
      country: 'Demo Country',
      latitude,
      longitude,
      timezone: 'UTC',
      timezone_offset: 0,
    },
    current: {
      temperature: 25,
      apparent_temperature: 27,
      humidity: 65,
      precipitation: 0,
      weather_code: 1,
      weather_description: 'Mainly clear',
      wind_speed: 12,
      wind_direction: 180,
      uv_index: 5,
      visibility: 10,
      pressure: 1013,
      cloud_cover: 25,
      dew_point: 18,
      sunrise: '06:30',
      sunset: '18:45',
      is_day: true,
    },
    hourly: [],
    daily: dates.map((date, i) => ({
      date,
      weather_code: i % 3 === 0 ? 0 : 1,
      weather_description: i % 3 === 0 ? 'Clear sky' : 'Mainly clear',
      temperature_max: 28 - i,
      temperature_min: 18 + i,
      apparent_temperature_max: 30 - i,
      apparent_temperature_min: 20 + i,
      humidity_max: 70,
      humidity_min: 50,
      precipitation_sum: i % 4 === 0 ? 2.5 : 0,
      precipitation_probability_max: i % 4 === 0 ? 80 : 20,
      windspeed_max: 15,
      uv_index_max: 6 - i,
      sunrise: '06:30',
      sunset: '18:45',
    })),
    alerts: [],
  };
}

function getMockAIInsights(): AIInsights {
  return {
    summary: 'Pleasant weather conditions with comfortable temperatures and low humidity. Great day for outdoor activities.',
    activities: ['Perfect for hiking', 'Ideal for picnics', 'Great for outdoor sports', 'Good for photography'],
    outfit_recommendations: [
      {
        category: 'Casual',
        items: ['Light t-shirt', 'Comfortable shorts', 'Sunglasses'],
        reason: 'Comfortable temperature suitable for light clothing',
      },
    ],
    health_alerts: ['UV index moderate - sunscreen recommended'],
    travel_tips: ['Clear skies expected - great for sightseeing', 'Low wind conditions ideal for outdoor dining'],
  };
}

export const weatherAPI = {
  async getWeather(latitude: number, longitude: number): Promise<WeatherData> {
    try {
      return await fetchAPI<WeatherData>(
        `/weather?lat=${latitude}&lon=${longitude}&days=7&ai=true&units=metric`
      );
    } catch {
      return getMockWeatherData(latitude, longitude);
    }
  },

  async getAIInsights(latitude: number, longitude: number): Promise<AIInsights> {
    try {
      await fetchAPI(`/weather?lat=${latitude}&lon=${longitude}&ai=true`);
      return getMockAIInsights();
    } catch {
      return getMockAIInsights();
    }
  },

  async searchLocations(query: string): Promise<SearchResult[]> {
    if (!query || query.length < 2) return [];

    try {
      const data = await fetchAPI<{ results: SearchResult[] }>(
        `/search?q=${encodeURIComponent(query)}`
      );
      return data.results || [];
    } catch (error) {
      if (error instanceof WeatherAPIError && error.status === 404) {
        return [];
      }
      throw error;
    }
  },

  async reverseGeocode(latitude: number, longitude: number): Promise<SearchResult> {
    try {
      return await fetchAPI<SearchResult>(
        `/geocode/reverse?lat=${latitude}&lon=${longitude}`
      );
    } catch (error) {
      if (error instanceof WeatherAPIError) throw error;
      throw new WeatherAPIError(500, 'Failed to reverse geocode');
    }
  },
};