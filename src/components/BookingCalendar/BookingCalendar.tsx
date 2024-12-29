'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface BookingCalendarProps {
  onDateSelect: (startDate: Date | null, endDate: Date | null) => void;
}

export default function BookingCalendar({ onDateSelect }: BookingCalendarProps) {
  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);

  const handleCheckInChange = (date: Dayjs | null) => {
    setCheckIn(date);
    onDateSelect(date?.toDate() || null, checkOut?.toDate() || null);
  };

  const handleCheckOutChange = (date: Dayjs | null) => {
    setCheckOut(date);
    onDateSelect(checkIn?.toDate() || null, date?.toDate() || null);
  };

  const today = dayjs();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ 
        width: '100%', 
        maxWidth: '800px',
        margin: '0 auto',
        height: { xs: '100%', sm: 'auto' },
        display: 'flex',
        flexDirection: 'column',
      }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ flex: 1 }}
        >
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 2, sm: 4 },
            flexDirection: { xs: 'column', sm: 'row' },
            mb: { xs: 2, sm: 4 },
          }}>
            <DatePicker
              label="Check-in Date"
              value={checkIn}
              onChange={handleCheckInChange}
              minDate={today}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                  '& input': {
                    padding: { xs: '12px', sm: '16px' },
                    cursor: 'pointer',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderWidth: 2,
                  },
                },
                '& .MuiInputLabel-root': {
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  color: 'primary.main',
                  '&.Mui-focused': {
                    color: 'primary.dark'
                  }
                }
              }}
            />
            
            <DatePicker
              label="Check-out Date"
              value={checkOut}
              onChange={handleCheckOutChange}
              minDate={checkIn || today}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                  '& input': {
                    padding: { xs: '12px', sm: '16px' },
                    cursor: 'pointer',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderWidth: 2,
                  },
                },
                '& .MuiInputLabel-root': {
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  color: 'primary.main',
                  '&.Mui-focused': {
                    color: 'primary.dark'
                  }
                }
              }}
            />
          </Box>
        </motion.div>

        {checkIn && checkOut && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Box sx={{ 
              mt: 3, 
              p: 2, 
              bgcolor: 'primary.light',
              borderRadius: 2,
              color: 'primary.dark'
            }}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Selected Stay: {checkIn.format('MM/DD/YYYY')} - {checkOut.format('MM/DD/YYYY')}
              </Typography>
            </Box>
          </motion.div>
        )}
      </Box>
    </LocalizationProvider>
  );
}
