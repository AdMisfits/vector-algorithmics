import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { startTime, endTime, firstName, lastName, email, phone, customFields } = body;
    
    // Retrieved from public/smart-capture/config.js
    const calendarId = "yaDsuaLv7xgCEVqasbkw";
    const locationId = "dlGhpYm3nOX6E7eC0Sdr";
    const apiToken = process.env.GHL_API_KEY || "pit-25a96551-8770-4f0d-946c-6c72f7d9e763";

    if (!startTime || !email || !firstName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Usually GHL v2 appointments require contactId OR email/firstName/lastName
    const payload: any = {
      calendarId,
      locationId,
      startTime,
      endTime: endTime || undefined,
      email,
      firstName,
      lastName,
      phone,
      title: `${firstName} ${lastName} - Strategy Session`,
      appointmentStatus: 'new'
    };

    // Note: customFields might need to be passed specifically if tracking needs to be injected into the GHL appointment.
    // Depending on GHL structure, sometimes they are sent on Contact Creation first. 
    // We will attempt to send them in the appointment metadata 

    const response = await fetch(`https://services.leadconnectorhq.com/calendars/events/appointments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Version': '2021-04-15',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GHL Booking API Error:', response.status, errorText);
      return NextResponse.json({ error: 'Failed to book appointment in GHL', details: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
