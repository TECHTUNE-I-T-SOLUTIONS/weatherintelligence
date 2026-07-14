import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'https://api.weather-ai.co/v1';
const KEY = process.env.WEATHER_AI_API_KEY || process.env.NEXT_PUBLIC_WEATHER_AI_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const endpoint = searchParams.get('endpoint') || '/weather';

  if (!KEY) {
    return NextResponse.json(
      { error: 'API key not configured on server' },
      { status: 500 }
    );
  }

  try {
    const url = new URL(`${API_BASE}${endpoint}`);

    // Only copy params that are NOT already in the endpoint
    const endpointQuery = endpoint.split('?')[1] || '';
    const existingParams = new URLSearchParams(endpointQuery);
    
    searchParams.forEach((value, key) => {
      if (key !== 'endpoint' && !existingParams.has(key)) {
        url.searchParams.set(key, value);
      }
    });

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${KEY}`,
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
    
    // Forward geo headers from /weather-geo responses
    const headers = new Headers();
    const country = response.headers.get('X-Country');
    const region = response.headers.get('X-Region');
    const city = response.headers.get('X-City');
    
    if (country || region || city) {
      headers.set('X-Country', country || '');
      headers.set('X-Region', region || '');
      headers.set('X-City', city || '');
    }

    return NextResponse.json(data, { headers });
  } catch (error) {
    return NextResponse.json(
      { error: `Network error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}