'use client';

import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { getStripe } from '@/lib/stripe-client';
import logger from '@/utils/logger';

interface BookingCalendarProps {
  onDateSelect: (startDate: Date | null, endDate: Date | null) => void;
}

export default function BookingCalendar({ onDateSelect }: BookingCalendarProps) {
  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckInChange = (date: Dayjs | null) => {
    logger.info('Check-in date selected', { date: date?.format('YYYY-MM-DD') });
    setCheckIn(date);
    onDateSelect(date?.toDate() || null, checkOut?.toDate() || null);
  };

  const handleCheckOutChange = (date: Dayjs | null) => {
    logger.info('Check-out date selected', { date: date?.format('YYYY-MM-DD') });
    setCheckOut(date);
    onDateSelect(checkIn?.toDate() || null, date?.toDate() || null);
  };

  const handleCheckout = async () => {
    if (!checkIn || !checkOut) {
      logger.warn('Attempted checkout without dates selected');
      alert('Please select both check-in and check-out dates');
      return;
    }

    logger.info('Starting checkout process', {
      checkIn: checkIn.format('YYYY-MM-DD'),
      checkOut: checkOut.format('YYYY-MM-DD'),
    });

    setIsLoading(true);
    try {
      // Create the checkout session first
      logger.debug('Creating checkout session');
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: checkIn.format('YYYY-MM-DD'),
          endDate: checkOut.format('YYYY-MM-DD'),
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to create checkout session');
      }

      logger.info('Checkout session created', { sessionId: data.sessionId });

      // Then initialize Stripe and redirect
      logger.debug('Initializing Stripe');
      const stripe = await getStripe();

      // Redirect to Stripe checkout
      logger.debug('Redirecting to Stripe checkout');
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      logger.error('Checkout process failed', {
        error: error.message,
        stack: error.stack,
      });
      console.error('Checkout error:', error);
      alert(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
          {checkIn && checkOut && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                onClick={handleCheckout}
                disabled={isLoading}
                sx={{
                  bgcolor: '#2C1810',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#3D2415',
                  },
                }}
              >
                {isLoading ? 'Processing...' : 'Proceed to Checkout'}
              </Button>
            </Box>
          )}
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
