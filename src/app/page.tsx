'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Button, Paper } from '@mui/material';
import { TreePine as Tree, Fish, Car, HomeIcon, Sun, Users, Tv } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BookingModal from '@/components/BookingModal/BookingModal';
import PhotoGallery from '@/components/PhotoGallery';
import ScrollSection from '@/components/ScrollSection/ScrollSection';
import HeroTitle from '@/components/Hero/HeroTitle';
import Reviews from '@/components/Reviews/Reviews';

export default function Home() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Parallax effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.5]);

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        {/* Hero Background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
              zIndex: 1,
            },
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '120%', // Extra height for movement
              top: '-10%', // Start slightly above
              y,
              opacity,
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/cabinaerial1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </motion.div>
        </Box>

        {/* Hero Content */}
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <HeroTitle />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Typography
              variant="h5"
              sx={{
                mt: 4,
                maxWidth: '600px',
                mx: 'auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              Experience tranquility at our private lake retreat
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => setBookingModalOpen(true)}
              sx={{
                mt: 4,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'white',
                },
              }}
            >
              Book Your Stay
            </Button>
          </motion.div>
        </Container>
      </Box>

      <Container 
        maxWidth="lg" 
        sx={{ 
          py: { xs: 8, md: 12 },
          '& > div': {
            position: 'relative',
            mb: { xs: 10, md: 16 },
            pb: { xs: 10, md: 16 },
            '&:not(:last-child)': {
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '300px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #D4C4B0 50%, transparent)',
                opacity: 0.8,
                boxShadow: '0 1px 2px rgba(139, 109, 71, 0.1)'
              }
            },
            '&:last-child': {
              mb: 0,
              pb: 0,
              '&::after': {
                display: 'none'
              }
            }
          }
        }}
      >
        {/* Welcome Section */}
        <ScrollSection>
          <Box
            sx={{
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto',
              mb: 8,
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                fontFamily: '"Cabin Sketch", cursive',
                color: '#6B563C',
                mb: 3,
                textShadow: '1px 1px 0 rgba(107, 86, 60, 0.1)',
              }}
            >
              Welcome to Your Lake Escape
            </Typography>
            <Typography
              sx={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#2C1810',
              }}
            >
              Experience the tranquility of rural Nebraska at our private 80-acre retreat. 
              This stunning property features a serene private lake, perfect for fishing, 
              boating, and creating lasting memories with family and friends.
            </Typography>
          </Box>

          {/* Features Cards */}
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'transparent'
                }}
              >
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
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'transparent'
                }}
              >
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
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'transparent'
                }}
              >
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
        <ScrollSection delay={0.2}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ 
              mb: 3,
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            Photo Gallery
          </Typography>
          <PhotoGallery />
        </ScrollSection>

        {/* Wildlife Section */}
        <ScrollSection delay={0.4}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ 
              mb: 3,
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            Local Wildlife
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Lake Life
              </Typography>
              <Typography 
                paragraph
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  maxWidth: '800px'
                }}
              >
                Our private lake is home to various fish species including Bass and Bluegill,
                perfect for fishing enthusiasts of all skill levels.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Land Animals
              </Typography>
              <Typography 
                paragraph
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  maxWidth: '800px'
                }}
              >
                The property attracts diverse wildlife including Wild Turkeys and White-tailed Deer,
                offering excellent opportunities for nature observation.
              </Typography>
            </Grid>
          </Grid>
        </ScrollSection>

        {/* Important Notes Section */}
        <ScrollSection delay={0.6}>
          <Box
            sx={{
              mt: 12,
              p: 4,
              borderRadius: 4,
              position: 'relative',
              bgcolor: 'rgba(139, 109, 71, 0.05)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -20,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 40,
                height: 40,
                bgcolor: '#8B6D47',
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
              },
            }}
          >
            <Typography
              variant="h5"
              component="h3"
              align="center"
              gutterBottom
              sx={{
                fontFamily: '"Cabin Sketch", cursive',
                color: '#6B563C',
                mb: 4,
              }}
            >
              Important Notes
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    bgcolor: 'white',
                    borderRadius: 2,
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: '#8B6D47' }}
                  >
                    Check-in Details
                  </Typography>
                  <Typography>
                    Check-in is at 3 PM and check-out is at 11 AM. Early check-in may be available upon request.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    bgcolor: 'white',
                    borderRadius: 2,
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: '#8B6D47' }}
                  >
                    What to Bring
                  </Typography>
                  <Typography>
                    We provide basic amenities, but bring your own fishing gear, water toys, and any special items you need.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    bgcolor: 'white',
                    borderRadius: 2,
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: '#8B6D47' }}
                  >
                    House Rules
                  </Typography>
                  <Typography>
                    No smoking inside. Pets are welcome with prior approval. Please respect quiet hours from 10 PM to 7 AM.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </ScrollSection>

        {/* Reviews Section */}
        <ScrollSection delay={0.8}>
          <Reviews />
        </ScrollSection>
      </Container>

      <BookingModal
        open={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </Box>
  );
}
