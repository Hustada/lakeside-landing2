import { NextResponse } from 'next/server';
import { ICalService } from '@/services/ical';

// You'll need to add this to your environment variables
const AIRBNB_ICAL_URL = process.env.AIRBNB_ICAL_URL;

export async function GET(request: Request) {
  try {
    if (!AIRBNB_ICAL_URL) {
      throw new Error('Airbnb iCal URL not configured');
    }

    const { searchParams } = new URL(request.url);
    const start = searchParams.get('start');
    const end = searchParams.get('end');

    if (!start || !end) {
      return NextResponse.json(
        { error: 'Start and end dates are required' },
        { status: 400 }
      );
    }

    const icalService = new ICalService(AIRBNB_ICAL_URL);
    const startDate = new Date(start);
    const endDate = new Date(end);

    const availableDates = await icalService.getAvailableDates(startDate, endDate);

    return NextResponse.json({ availableDates });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}
