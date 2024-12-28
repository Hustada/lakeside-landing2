export interface BookingPeriod {
  start: Date;
  end: Date;
  source: 'airbnb' | 'direct';
  summary: string;
}

export interface CalendarDay {
  date: Date;
  isAvailable: boolean;
  price?: number;
  isSelected?: boolean;
}
