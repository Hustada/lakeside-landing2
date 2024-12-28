'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Button, Paper } from '@mui/material';
import { TreePine as Tree, Fish, Car, HomeIcon, Sun, Users, Tv } from 'lucide-react';
import { motion } from 'framer-motion';
import BookingModal from '@/components/BookingModal/BookingModal';
import PhotoGallery from '@/components/PhotoGallery';
import ScrollSection from '@/components/ScrollSection/ScrollSection';

export default function Home() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.900',
          color: 'white',
          backgroundImage: 'url(/cabinaerial1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.3)',
          },
        }}
      >
        <Box sx={{ position: 'relative', textAlign: 'center' }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                mb: 2,
                color: '#FDFBF7',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              Lakeside Landing
            </Typography>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                color: '#D4C4B0',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                fontWeight: 400,
                letterSpacing: '0.01em',
              }}
            >
              Your private lake retreat in rural Nebraska
            </Typography>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => setBookingModalOpen(true)}
              sx={{
                bgcolor: '#8B6D47',
                color: '#FDFBF7',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: '#6B563C',
                },
              }}
            >
              Check Availability
            </Button>
          </motion.div>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Property Description */}
        <ScrollSection>
          <Typography variant="h4" component="h2" gutterBottom>
            Welcome to Your Lake Escape
          </Typography>
          <Typography paragraph>
            Experience the tranquility of rural Nebraska at our private 80-acre retreat. 
            This stunning property features a serene private lake, perfect for fishing, 
            boating, and creating lasting memories with family and friends.
          </Typography>
        </ScrollSection>

        {/* Features */}
        <ScrollSection delay={0.2}>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <HomeIcon size={32} />
                </Box>
                <Typography variant="h6" gutterBottom>
                  Comfortable Living
                </Typography>
                <Typography>
                  1200 sq ft of cozy space with a full kitchen, living room, and updated bathroom
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Users size={32} />
                </Box>
                <Typography variant="h6" gutterBottom>
                  Sleeps 8
                </Typography>
                <Typography>
                  3 bunk beds and a queen-sized bed to accommodate your group
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Fish size={32} />
                </Box>
                <Typography variant="h6" gutterBottom>
                  Private Lake
                </Typography>
                <Typography>
                  Fish, boat, or kayak on your own private lake
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </ScrollSection>

        {/* Photo Gallery */}
        <ScrollSection delay={0.4}>
          <Typography variant="h4" component="h2" sx={{ mt: 8, mb: 4 }}>
            Photo Gallery
          </Typography>
          <PhotoGallery />
        </ScrollSection>

        {/* Wildlife Section */}
        <ScrollSection delay={0.6}>
          <Typography variant="h4" component="h2" sx={{ mt: 8, mb: 4 }}>
            Local Wildlife
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Lake Life
              </Typography>
              <Typography paragraph>
                Our private lake is home to various fish species including Bass and Bluegill,
                perfect for fishing enthusiasts of all skill levels.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Land Animals
              </Typography>
              <Typography paragraph>
                The property attracts diverse wildlife including Wild Turkeys and White-tailed Deer,
                offering excellent opportunities for nature observation.
              </Typography>
            </Grid>
          </Grid>
        </ScrollSection>

        {/* Important Notes */}
        <ScrollSection delay={0.8}>
          <Typography variant="h4" component="h2" sx={{ mt: 8, mb: 4 }}>
            Important Notes
          </Typography>
          <Typography paragraph>
            • The cabin is equipped with strong WiFi and a smart TV for your entertainment needs
          </Typography>
          <Typography paragraph>
            • Boats and kayaks are available for guest use
          </Typography>
          <Typography paragraph>
            • Please observe safety guidelines around the lake
          </Typography>
          <Typography paragraph>
            • Check-in instructions and gate access code will be provided upon booking
          </Typography>
        </ScrollSection>
      </Container>

      <BookingModal
        open={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </Box>
  );
}
