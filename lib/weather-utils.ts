// Weather code to description mapping
const WEATHER_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: 'Clear sky', icon: '☀️' },
  1: { description: 'Mainly clear', icon: '🌤️' },
  2: { description: 'Partly cloudy', icon: '⛅' },
  3: { description: 'Overcast', icon: '☁️' },
  45: { description: 'Foggy', icon: '🌫️' },
  48: { description: 'Depositing rime fog', icon: '🌫️' },
  51: { description: 'Light drizzle', icon: '🌧️' },
  53: { description: 'Moderate drizzle', icon: '🌧️' },
  55: { description: 'Dense drizzle', icon: '🌧️' },
  61: { description: 'Slight rain', icon: '🌧️' },
  63: { description: 'Moderate rain', icon: '🌧️' },
  65: { description: 'Heavy rain', icon: '⛈️' },
  71: { description: 'Slight snow', icon: '❄️' },
  73: { description: 'Moderate snow', icon: '❄️' },
  75: { description: 'Heavy snow', icon: '❄️' },
  77: { description: 'Snow grains', icon: '❄️' },
  80: { description: 'Slight rain showers', icon: '🌧️' },
  81: { description: 'Moderate rain showers', icon: '⛈️' },
  82: { description: 'Violent rain showers', icon: '⛈️' },
  85: { description: 'Slight snow showers', icon: '❄️' },
  86: { description: 'Heavy snow showers', icon: '❄️' },
  95: { description: 'Thunderstorm', icon: '⛈️' },
  96: { description: 'Thunderstorm with slight hail', icon: '⛈️' },
  99: { description: 'Thunderstorm with heavy hail', icon: '⛈️' },
};

export function getWeatherDescription(code: number): string {
  return WEATHER_CODES[code]?.description || 'Unknown';
}

export function getWeatherIcon(code: number): string {
  return WEATHER_CODES[code]?.icon || '🌍';
}

export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°C`;
}

export function formatTime(time: string): string {
  const date = new Date(time);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export function formatDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatFullDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function formatHour(time: string): string {
  const date = new Date(time);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false }).padStart(5, '0');
}

export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((degrees % 360) / 45) % 8;
  return directions[index];
}

export function getUVIndexLevel(index: number): string {
  if (index < 3) return 'Low';
  if (index < 6) return 'Moderate';
  if (index < 8) return 'High';
  if (index < 11) return 'Very High';
  return 'Extreme';
}

export function getUVIndexColor(index: number): string {
  if (index < 3) return '#00E400';
  if (index < 6) return '#F7E400';
  if (index < 8) return '#F8B600';
  if (index < 11) return '#E1000B';
  return '#B50000';
}

export function formatWindSpeed(speed: number): string {
  return `${Math.round(speed)} km/h`;
}

export function formatVisibility(visibility: number): string {
  if (visibility > 10) return 'Excellent';
  if (visibility > 5) return 'Good';
  if (visibility > 1) return 'Moderate';
  return 'Poor';
}

export function formatHumidity(humidity: number): string {
  if (humidity < 30) return 'Dry';
  if (humidity < 60) return 'Comfortable';
  if (humidity < 80) return 'Humid';
  return 'Very Humid';
}

export function isSunny(code: number): boolean {
  return code <= 3;
}

export function isRainy(code: number): boolean {
  return (code >= 51 && code <= 67) || (code >= 80 && code <= 82);
}

export function isSnowy(code: number): boolean {
  return (code >= 71 && code <= 77) || (code >= 85 && code <= 86);
}

export function getActivityRecommendations(code: number, temp: number): string[] {
  const activities: string[] = [];

  if (isSunny(code) && temp > 15 && temp < 30) {
    activities.push('🏃 Outdoor Running');
    activities.push('🚴 Cycling');
  }

  if ((isSunny(code) || (code >= 1 && code <= 3)) && temp > 20) {
    activities.push('🏊 Swimming');
    activities.push('⛱️ Beach Day');
  }

  if (isSnowy(code)) {
    activities.push('⛷️ Skiing');
    activities.push('⛸️ Ice Skating');
  }

  if (isRainy(code)) {
    activities.push('📚 Indoor Reading');
    activities.push('🎬 Movie Night');
    activities.push('🧘 Yoga');
  }

  if (temp < 0) {
    activities.push('☕ Hot Beverages');
  }

  if (!activities.length) {
    activities.push('🚶 Walking');
    activities.push('🎮 Gaming');
  }

  return activities;
}
