import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'https://api.weather-ai.co/v1';
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_AI_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const endpoint = searchParams.get('endpoint') || '/weather';
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const days = searchParams.get('days') || '7';
  const ai = searchParams.get('ai') || 'true';
  const units = searchParams.get('units') || 'metric';

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    const url = new URL(`${API_BASE}${endpoint}`);
    url.searchParams.set('lat', lat || '');
    url.searchParams.set('lon', lon || '');
    url.searchParams.set('days', days);
    url.searchParams.set('ai', ai);
    url.searchParams.set('units', units);

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: `Weather API error: ${error}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Network error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}