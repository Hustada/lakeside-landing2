'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

export default function BookingSuccess() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyBooking = async () => {
      try {
        const response = await fetch(`/api/verify-booking?session_id=${sessionId}`);
        const data = await response.json();
        setBookingDetails(data);
      } catch (error) {
        console.error('Error verifying booking:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionId) {
      verifyBooking();
    }
  }, [sessionId]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
          gap: 4,
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontFamily: '"Cabin Sketch", cursive',
              color: '#2C1810',
              mb: 2,
            }}
          >
            Booking Confirmed!
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Thank you for choosing Lakeside Landing!
          </Typography>
          <Typography color="text.secondary">
            We've sent a confirmation email with all the details.
          </Typography>
          {bookingDetails && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="body1">
                Check-in: {new Date(bookingDetails.startDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                Check-out: {new Date(bookingDetails.endDate).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </motion.div>
      </Box>
    </Container>
  );
}
