'use client';

import { useState } from 'react';
import { Box, Paper, Typography, TextField } from '@mui/material';
import { motion } from 'framer-motion';

interface BookingCalendarProps {
  onDateSelect: (startDate: Date | null, endDate: Date | null) => void;
}

export default function BookingCalendar({ onDateSelect }: BookingCalendarProps) {
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');

  const handleCheckInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setCheckIn(date);
    onDateSelect(date ? new Date(date) : null, checkOut ? new Date(checkOut) : null);
  };

  const handleCheckOutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setCheckOut(date);
    onDateSelect(checkIn ? new Date(checkIn) : null, date ? new Date(date) : null);
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: '800px',
      margin: '0 auto',
      '& .MuiTextField-root': {
        '& input': {
          fontSize: '1.2rem',
          padding: '16px',
        },
        '& label': {
          fontSize: '1.1rem',
        }
      }
    }}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ 
          display: 'flex', 
          gap: 4,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <TextField
            label="Check-in Date"
            type="date"
            value={checkIn}
            onChange={handleCheckInChange}
            InputLabelProps={{ 
              shrink: true,
              sx: { 
                color: 'primary.main',
                '&.Mui-focused': {
                  color: 'primary.dark'
                }
              }
            }}
            inputProps={{ 
              min: today,
              style: { cursor: 'pointer' }
            }}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderWidth: 2,
                },
              },
            }}
          />
          
          <TextField
            label="Check-out Date"
            type="date"
            value={checkOut}
            onChange={handleCheckOutChange}
            InputLabelProps={{ 
              shrink: true,
              sx: { 
                color: 'primary.main',
                '&.Mui-focused': {
                  color: 'primary.dark'
                }
              }
            }}
            inputProps={{ 
              min: checkIn || today,
              style: { cursor: 'pointer' }
            }}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderWidth: 2,
                },
              },
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
              Selected Stay: {new Date(checkIn).toLocaleDateString()} - {new Date(checkOut).toLocaleDateString()}
            </Typography>
          </Box>
        </motion.div>
      )}
    </Box>
  );
}
