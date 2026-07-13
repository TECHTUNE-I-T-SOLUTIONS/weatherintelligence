import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'https://api.weather-ai.co/v1';
// Server-side only env variable - never exposed to browser
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
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Network error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}