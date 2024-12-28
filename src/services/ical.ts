import ical from 'node-ical';
import { addDays } from 'date-fns';
import { BookingPeriod } from '@/types/booking';

export class ICalService {
  private airbnbFeedUrl: string;

  constructor(airbnbFeedUrl: string) {
    this.airbnbFeedUrl = airbnbFeedUrl;
  }

  /**
   * Fetches and parses the Airbnb iCal feed
   */
  async getBookedDates(): Promise<BookingPeriod[]> {
    try {
      const events = await ical.async.fromURL(this.airbnbFeedUrl);
      const bookedPeriods: BookingPeriod[] = [];

      for (const event of Object.values(events)) {
        if (event.type === 'VEVENT') {
          bookedPeriods.push({
            start: event.start,
            end: event.end,
            source: 'airbnb',
            summary: event.summary || 'Airbnb Booking'
          });
        }
      }

      return bookedPeriods;
    } catch (error) {
      console.error('Error fetching Airbnb calendar:', error);
      throw new Error('Failed to fetch Airbnb calendar');
    }
  }

  /**
   * Checks if a date range is available
   */
  async isDateRangeAvailable(start: Date, end: Date): Promise<boolean> {
    const bookedDates = await this.getBookedDates();
    
    for (const booking of bookedDates) {
      // Check if there's any overlap with existing bookings
      if (
        (start >= booking.start && start < booking.end) ||
        (end > booking.start && end <= booking.end) ||
        (start <= booking.start && end >= booking.end)
      ) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Gets available dates within a range
   */
  async getAvailableDates(startDate: Date, endDate: Date): Promise<Date[]> {
    const bookedDates = await this.getBookedDates();
    const availableDates: Date[] = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      let isAvailable = true;
      
      for (const booking of bookedDates) {
        if (currentDate >= booking.start && currentDate < booking.end) {
          isAvailable = false;
          break;
        }
      }

      if (isAvailable) {
        availableDates.push(new Date(currentDate));
      }

      currentDate = addDays(currentDate, 1);
    }

    return availableDates;
  }
}
