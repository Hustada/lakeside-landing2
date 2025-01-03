'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Typography, Container, CircularProgress, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface BookingDetails {
  startDate: string;
  endDate: string;
}

const CampingAnimation = () => {
  return (
    <Box 
      sx={{ 
        position: 'relative', 
        width: 300, 
        height: 300, 
        margin: '0 auto',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #1a237e 0%, #3949ab 100%)',
        borderRadius: '12px',
      }}
    >
      {/* Moon */}
      <motion.div
        style={{
          position: 'absolute',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fff8e1 0%, #ffd54f 100%)',
          right: '40px',
          top: '40px',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Fireflies */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: '#fff9c4',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 4px 1px rgba(255, 249, 196, 0.7)',
          }}
          animate={{
            opacity: [0, 1, 0],
            x: [0, (Math.random() - 0.5) * 30],
            y: [0, (Math.random() - 0.5) * 30],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Ground */}
      <motion.div
        style={{
          position: 'absolute',
          width: '100%',
          height: '40%',
          bottom: 0,
          background: '#2c1810',
          borderTopLeftRadius: '50% 20%',
          borderTopRightRadius: '50% 20%',
        }}
      />

      {/* Tent */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '60px solid transparent',
          borderRight: '60px solid transparent',
          borderBottom: '80px solid #5d4037',
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-30px',
            width: '60px',
            height: '40px',
            background: '#3e2723',
            clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)',
          }}
        />
      </motion.div>

      {/* Trees */}
      {[-80, 80].map((x, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '50%',
            marginLeft: x,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 + i * 0.2 }}
        >
          <div style={{
            width: 0,
            height: 0,
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderBottom: '40px solid #2e7d32',
            position: 'relative',
            marginBottom: -10,
          }} />
          <div style={{
            width: 0,
            height: 0,
            borderLeft: '25px solid transparent',
            borderRight: '25px solid transparent',
            borderBottom: '50px solid #388e3c',
            position: 'relative',
            marginBottom: -15,
          }} />
          <div style={{
            width: 0,
            height: 0,
            borderLeft: '30px solid transparent',
            borderRight: '30px solid transparent',
            borderBottom: '60px solid #43a047',
          }} />
        </motion.div>
      ))}

      {/* Falling Leaves */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: 8,
            height: 8,
            left: `${Math.random() * 100}%`,
            top: '-10px',
            background: ['#81c784', '#66bb6a', '#4caf50'][i % 3],
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          }}
          animate={{
            y: [0, 300],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [0, 360],
            opacity: [1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "linear"
          }}
        />
      ))}
    </Box>
  );
};

const BookingSuccessContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyBooking = async () => {
      if (!sessionId) return;
      
      try {
        const response = await fetch(`/api/verify-booking?session_id=${sessionId}`);
        const data = await response.json();
        
        if (data.booking) {
          setBookingDetails(data.booking);
        }
      } catch (error) {
        console.error('Error verifying booking:', error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyBooking();
  }, [sessionId]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
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
          pb: 8,
          pt: 8,
        }}
      >
        <CampingAnimation />
        <Box>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Thank you for choosing Lakeside Landing!
          </Typography>
          <Typography color="text.secondary">
            We&apos;ve sent a confirmation email with all the details.
          </Typography>
          {bookingDetails && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Your stay: {bookingDetails.startDate} - {bookingDetails.endDate}
              </Typography>
            </Box>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/" passHref>
              <Button
                variant="contained"
                sx={{
                  mt: 4,
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                Return Home
              </Button>
            </Link>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
};

export default function BookingSuccess() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <BookingSuccessContent />
    </Suspense>
  );
}
