'use client';

import { useState } from 'react';
import { Box, Paper, Typography, TextField } from '@mui/material';

interface BookingCalendarProps {
  onDateSelect?: (startDate: Date | null, endDate: Date | null) => void;
}

export default function BookingCalendar({ onDateSelect }: BookingCalendarProps) {
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');

  const handleCheckInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setCheckIn(date);
    if (onDateSelect) {
      onDateSelect(date ? new Date(date) : null, checkOut ? new Date(checkOut) : null);
    }
  };

  const handleCheckOutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setCheckOut(date);
    if (onDateSelect) {
      onDateSelect(checkIn ? new Date(checkIn) : null, date ? new Date(date) : null);
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Check Availability
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Check-in Date"
          type="date"
          value={checkIn}
          onChange={handleCheckInChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: today }}
          fullWidth
        />
        
        <TextField
          label="Check-out Date"
          type="date"
          value={checkOut}
          onChange={handleCheckOutChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: checkIn || today }}
          fullWidth
        />

        {checkIn && checkOut && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Selected dates: {new Date(checkIn).toLocaleDateString()} - {new Date(checkOut).toLocaleDateString()}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
