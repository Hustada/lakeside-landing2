'use client';

import { useState } from 'react';
import { Box, Typography, Rating, IconButton, Container } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'Kansas City',
    rating: 5,
    date: 'December 2023',
    text: 'An absolute hidden gem! The lake was perfect for fishing, and the cabin had everything we needed. Such a peaceful getaway.',
    highlight: 'Perfect for fishing'
  },
  {
    id: 2,
    name: 'Mike R.',
    location: 'Denver',
    rating: 5,
    date: 'November 2023',
    text: 'We loved having the entire lake to ourselves. The kids had a blast kayaking and the sunsets were breathtaking. Will definitely return!',
    highlight: 'Great for families'
  },
  {
    id: 3,
    name: 'Emily K.',
    location: 'Omaha',
    rating: 5,
    date: 'October 2023',
    text: 'The perfect escape from city life. The cabin was cozy and well-maintained. Spent hours by the fire pit watching stars.',
    highlight: 'Cozy retreat'
  }
];

const StarIcon = () => (
  <span style={{ color: '#8B6D47', fontSize: '1.2rem', marginRight: '2px' }}>★</span>
);

export default function Reviews() {
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <Box sx={{ py: 8, bgcolor: '#F5F1EC' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            fontFamily: '"Cabin Sketch", cursive',
            color: '#6B563C',
            textShadow: '1px 1px 0 rgba(107, 86, 60, 0.1)',
          }}
        >
          Our Guestbook
        </Typography>

        <Box 
          sx={{ 
            position: 'relative',
            maxWidth: 800,
            mx: 'auto',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -20,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              height: 'calc(100% + 40px)',
              background: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 1%, rgba(0,0,0,0.1) 99%, transparent 100%)',
              zIndex: 0,
            }
          }}
        >
          <Box
            sx={{
              position: 'relative',
              background: 'repeating-linear-gradient(#F5F5F5, #F5F5F5 38px, #D4C4B0 38px, #D4C4B0 39px)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
              p: 4,
              borderRadius: 2,
              minHeight: '300px',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '40px',
                height: '100%',
                width: '1px',
                background: '#FF9999',
                opacity: 0.7,
              }
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ pl: 7 }}>
                  <Box sx={{ mb: 2, display: 'flex', gap: 0.5 }}>
                    {Array.from({ length: reviews[currentReview].rating }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </Box>

                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      color: '#2C1810',
                      lineHeight: '38px',
                      mb: 3,
                      fontFamily: '"Caveat", cursive',
                      fontWeight: 500,
                      transform: 'rotate(-1deg)',
                    }}
                  >
                    {reviews[currentReview].text}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 2,
                      fontFamily: '"Caveat", cursive',
                      color: '#6B563C',
                      mt: 4,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '1.6rem',
                        fontWeight: 600,
                      }}
                    >
                      — {reviews[currentReview].name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '1.3rem',
                        fontStyle: 'italic',
                      }}
                    >
                      {reviews[currentReview].location} • {reviews[currentReview].date}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>

          <IconButton
            onClick={prevReview}
            disabled={currentReview === 0}
            sx={{
              position: 'absolute',
              left: -60,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: '#F5F1EC',
              border: '2px solid #D4C4B0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              color: '#8B6D47',
              '&:hover': {
                bgcolor: '#F5F1EC',
                transform: 'translateY(-50%) scale(1.1)',
              },
              '&.Mui-disabled': {
                opacity: 0.5,
                bgcolor: '#F5F1EC',
              },
            }}
          >
            <ChevronLeft />
          </IconButton>

          <IconButton
            onClick={nextReview}
            disabled={currentReview === reviews.length - 1}
            sx={{
              position: 'absolute',
              right: -60,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: '#F5F1EC',
              border: '2px solid #D4C4B0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              color: '#8B6D47',
              '&:hover': {
                bgcolor: '#F5F1EC',
                transform: 'translateY(-50%) scale(1.1)',
              },
              '&.Mui-disabled': {
                opacity: 0.5,
                bgcolor: '#F5F1EC',
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mt: 4
          }}
        >
          {reviews.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentReview(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: index === currentReview ? '#8B6D47' : '#D4C4B0',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'scale(1.2)',
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
