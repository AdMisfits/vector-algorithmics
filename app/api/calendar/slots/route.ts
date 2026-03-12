import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const timezone = searchParams.get('timezone');
  
  // Retrieved from public/smart-capture/config.js
  const calendarId = "yaDsuaLv7xgCEVqasbkw";
  const apiToken = process.env.GHL_API_KEY || "pit-25a96551-8770-4f0d-946c-6c72f7d9e763";

  if (!startDate || !endDate) {
    return NextResponse.json({ error: 'Missing startDate or endDate' }, { status: 400 });
  }

  let apiUrl = `https://services.leadconnectorhq.com/calendars/${calendarId}/free-slots?startDate=${startDate}&endDate=${endDate}`;
  if (timezone) {
    apiUrl += `&timezone=${encodeURIComponent(timezone)}`;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Version': '2021-04-15',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GHL API Error:', response.status, errorText);
      return NextResponse.json({ error: 'Failed to fetch slots from GHL', details: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
