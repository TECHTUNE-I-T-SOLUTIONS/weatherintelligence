import { WeatherData, AIInsights, SearchResult } from '@/types/weather';

const API_BASE = 'https://api.weather-ai.co/v1';

class WeatherAPIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'WeatherAPIError';
  }
}

async function fetchViaProxy<T>(endpoint: string): Promise<T> {
  const url = new URL(`${window.location.origin}/api/weather`);
  url.searchParams.set('endpoint', endpoint);

  const params = new URLSearchParams(endpoint.split('?')[1]);
  params.forEach((value, key) => url.searchParams.set(key, value));

  const response = await fetch(url.toString(), {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new WeatherAPIError(response.status, error.error || 'Weather API error');
  }

  return (await response.json()) as T;
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    return await fetchViaProxy<T>(endpoint);
  } finally {
    clearTimeout(timeoutId);
  }
}

const sf = (v: any, fb = 0) => (v !== null && v !== undefined && !isNaN(v) ? v : fb);
const sfs = (v: any, fb = '') => (v !== null && v !== undefined ? String(v) : fb);

const WEATHER_DESC: Record<number, string> = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Foggy', 48: 'Depositing rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
  55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
  71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
  80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
  85: 'Slight snow showers', 86: 'Heavy snow showers', 95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail',
};

const desc = (code: number) => WEATHER_DESC[code] || 'Unknown';

function normalizeWeather(raw: any, lat: number, lon: number): WeatherData {
  const c = raw.current || {};
  const d = raw.daily || [];
  const h = raw.hourly || [];
  const wc = sf(c.weathercode);

  return {
    location: {
      name: raw.location?.name || sfs(raw.city) || 'Unknown',
      region: raw.location?.region || sfs(raw.region) || '',
      country: raw.location?.country || sfs(raw.country) || '',
      latitude: sf(raw.location?.latitude, lat),
      longitude: sf(raw.location?.longitude, lon),
      timezone: raw.location?.timezone || 'UTC',
      timezone_offset: sf(raw.location?.timezone_offset),
    },
    current: {
      temperature: sf(c.temperature),
      apparent_temperature: sf(c.apparent_temperature, c.temperature),
      humidity: sf(c.humidity, 50),
      precipitation: sf(c.precipitation),
      weather_code: wc,
      weather_description: desc(wc),
      wind_speed: sf(c.windspeed),
      wind_direction: sf(c.winddirection),
      uv_index: sf(c.uv_index, 3),
      visibility: sf(c.visibility, 10),
      pressure: sf(c.pressure, 1013),
      cloud_cover: sf(c.cloud_cover, 30),
      dew_point: sf(c.dew_point, 15),
      sunrise: sfs(c.sunrise, '06:00'),
      sunset: sfs(c.sunset, '18:00'),
      is_day: c.is_day === 1 || c.is_day === true,
    },
    hourly: Array.isArray(h) ? h.map((x: any) => {
      const hwc = sf(x.weathercode);
      return {
        time: sfs(x.time), temperature: sf(x.temperature || x.temp),
        apparent_temperature: sf(x.apparent_temperature, x.temperature || x.temp),
        humidity: sf(x.humidity, 50), precipitation: sf(x.precipitation),
        weather_code: hwc, weather_description: desc(hwc),
        wind_speed: sf(x.windspeed), wind_direction: sf(x.winddirection),
        uv_index: sf(x.uv_index, 3), visibility: sf(x.visibility, 10),
        cloud_cover: sf(x.cloud_cover, 30),
      };
    }) : [],
    daily: Array.isArray(d) ? d.map((x: any) => {
      const dwc = sf(x.weathercode);
      return {
        date: sfs(x.date, new Date().toISOString().split('T')[0]),
        weather_code: dwc, weather_description: desc(dwc),
        temperature_max: sf(x.temperature_max || x.temp_max),
        temperature_min: sf(x.temperature_min || x.temp_min),
        apparent_temperature_max: sf(x.apparent_temperature_max, x.temperature_max || x.temp_max),
        apparent_temperature_min: sf(x.apparent_temperature_min, x.temperature_min || x.temp_min),
        humidity_max: sf(x.humidity_max, 60), humidity_min: sf(x.humidity_min, 40),
        precipitation_sum: sf(x.precipitation_sum || x.precipitation),
        precipitation_probability_max: sf(x.precipitation_probability_max, x.precipitation ? 50 : 0),
        windspeed_max: sf(x.windspeed_max || x.windspeed, 10),
        uv_index_max: sf(x.uv_index_max, 5),
        sunrise: sfs(x.sunrise, '06:00'), sunset: sfs(x.sunset, '18:00'),
      };
    }) : [],
    alerts: [],
  };
}

function mockData(lat: number, lon: number): WeatherData {
  const now = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });
  return {
    location: { name: 'Demo Location', region: '', country: 'Nigeria', latitude: lat, longitude: lon, timezone: 'UTC', timezone_offset: 0 },
    current: { temperature: 25, apparent_temperature: 27, humidity: 65, precipitation: 0, weather_code: 1, weather_description: 'Mainly clear', wind_speed: 12, wind_direction: 180, uv_index: 5, visibility: 10, pressure: 1013, cloud_cover: 25, dew_point: 18, sunrise: '06:30', sunset: '18:45', is_day: true },
    hourly: [],
    daily: dates.map((date, i) => ({ date, weather_code: i % 3 === 0 ? 0 : 1, weather_description: i % 3 === 0 ? 'Clear sky' : 'Mainly clear', temperature_max: 28 - i, temperature_min: 18 + i, apparent_temperature_max: 30 - i, apparent_temperature_min: 20 + i, humidity_max: 70, humidity_min: 50, precipitation_sum: i % 4 === 0 ? 2.5 : 0, precipitation_probability_max: i % 4 === 0 ? 80 : 20, windspeed_max: 15, uv_index_max: 6 - i, sunrise: '06:30', sunset: '18:45' })),
    alerts: [],
  };
}

function mockInsights(): AIInsights {
  return {
    summary: 'Pleasant weather conditions with comfortable temperatures and low humidity.',
    activities: ['Perfect for hiking', 'Ideal for picnics', 'Great for outdoor sports'],
    outfit_recommendations: [{ category: 'Casual', items: ['Light t-shirt', 'Comfortable shorts', 'Sunglasses'], reason: 'Comfortable temperature suitable for light clothing' }],
    health_alerts: ['UV index moderate - sunscreen recommended'],
    travel_tips: ['Clear skies expected - great for sightseeing'],
  };
}

export const weatherAPI = {
  async getWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const raw = await fetchAPI<any>(`/weather?lat=${lat}&lon=${lon}&days=7&ai=false&units=metric`);
      return normalizeWeather(raw, lat, lon);
    } catch { return mockData(lat, lon); }
  },

  async getAIInsights(_lat: number, _lon: number): Promise<AIInsights> {
    return mockInsights();
  },

  async searchLocations(query: string): Promise<SearchResult[]> {
    if (!query || query.length < 2) return [];
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&accept-language=en`,
        { headers: { 'User-Agent': 'WeatherApp/1.0' } }
      );
      if (!res.ok) return [];
      const data = await res.json();
      return data.map((item: any) => ({
        name: item.display_name?.split(',')[0] || item.name || query,
        region: item.state || '',
        country: item.country || '',
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
      }));
    } catch { return []; }
  },

  async reverseGeocode(lat: number, lon: number): Promise<SearchResult | null> {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10&accept-language=en`,
        { headers: { 'User-Agent': 'WeatherApp/1.0' } }
      );
      if (!res.ok) return null;
      const data = await res.json();
      if (!data?.address) return null;
      return {
        name: data.address.city || data.address.town || data.address.village || data.address.county || 'Unknown',
        region: data.address.state || '',
        country: data.address.country || '',
        latitude: lat,
        longitude: lon,
      };
    } catch { return null; }
  },

  async lookupByIP(): Promise<SearchResult | null> {
    try {
      // Use /weather?ip=auto per docs; location comes from response headers
      const raw = await fetchAPI<any>('/weather?ip=auto&days=1&ai=false&units=metric');
      const loc: SearchResult = {
        name: raw.location?.name || sfs(raw.city) || 'Unknown',
        region: raw.location?.region || sfs(raw.region) || '',
        country: raw.location?.country || sfs(raw.country) || '',
        latitude: sf(raw.location?.latitude),
        longitude: sf(raw.location?.longitude),
      };
      if (loc.latitude && loc.longitude) {
        const rev = await weatherAPI.reverseGeocode(loc.latitude, loc.longitude);
        return rev || loc;
      }
      return null;
    } catch { return null; }
  },
};