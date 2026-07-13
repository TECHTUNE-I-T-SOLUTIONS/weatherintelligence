// Weather data types
export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  alerts?: WeatherAlert[];
}

export interface Location {
  name: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_offset: number;
}

export interface CurrentWeather {
  temperature: number;
  apparent_temperature: number;
  humidity: number;
  precipitation: number;
  weather_code: number;
  weather_description: string;
  wind_speed: number;
  wind_direction: number;
  uv_index: number;
  visibility: number;
  pressure: number;
  cloud_cover: number;
  dew_point: number;
  sunrise: string;
  sunset: string;
  is_day: boolean;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  apparent_temperature: number;
  humidity: number;
  precipitation: number;
  weather_code: number;
  weather_description: string;
  wind_speed: number;
  wind_direction: number;
  uv_index: number;
  visibility: number;
  cloud_cover: number;
}

export interface DailyForecast {
  date: string;
  weather_code: number;
  weather_description: string;
  temperature_max: number;
  temperature_min: number;
  apparent_temperature_max: number;
  apparent_temperature_min: number;
  humidity_max: number;
  humidity_min: number;
  precipitation_sum: number;
  precipitation_probability_max: number;
  windspeed_max: number;
  uv_index_max: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherAlert {
  headline: string;
  description: string;
  onset: string;
  expires: string;
  severity: 'extreme' | 'severe' | 'moderate' | 'minor';
}

export interface AIInsights {
  summary: string;
  activities: string[];
  outfit_recommendations: OutfitRecommendation[];
  health_alerts: string[];
  travel_tips: string[];
}

export interface OutfitRecommendation {
  category: string;
  items: string[];
  reason: string;
}

export interface SearchResult {
  name: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface SavedLocation {
  id: string;
  name: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  addedAt: number;
}
