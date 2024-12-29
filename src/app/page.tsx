'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Button, Paper } from '@mui/material';
import { Fish, HomeIcon, Users } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BookingModal from '@/components/BookingModal/BookingModal';
import PhotoGallery from '@/components/PhotoGallery';
import ScrollSection from '@/components/ScrollSection/ScrollSection';
import HeroTitle from '@/components/Hero/HeroTitle';
import Reviews from '@/components/Reviews/Reviews';
import ContactForm from '@/components/ContactForm/ContactForm';

export default function Home() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Parallax effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.5]);

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative', 
        height: '100vh', 
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: { xs: '30%', sm: '0' },
          background: {
            xs: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
            sm: 'none'
          },
          zIndex: 1,
        }
      }}>
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
              background: {
                xs: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)',
                sm: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)'
              },
              zIndex: 1,
            },
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '120%',
              top: '-10%',
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
                backgroundPosition: { xs: 'center 30%', sm: 'center' },
                filter: { xs: 'brightness(0.9)', sm: 'none' },
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
            justifyContent: { xs: 'flex-end', sm: 'center' },
            alignItems: 'center',
            textAlign: 'center',
            color: 'white',
            pb: { xs: 12, sm: 0 },
          }}
        >
          <HeroTitle />
          
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
                mt: { xs: 3, sm: 6 },
                px: { xs: 4, sm: 6 },
                py: { xs: 1.5, sm: 2 },
                borderRadius: '28px',
                textTransform: 'none',
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' },
                fontFamily: '"Cabin Sketch", cursive',
                fontWeight: 700,
                letterSpacing: '0.05em',
                backgroundColor: '#8B6D47',
                color: '#FDFBF7',
                border: '2px solid #FDFBF7',
                boxShadow: '4px 4px 0px #6B563C, 8px 8px 16px rgba(0,0,0,0.3)',
                position: 'relative',
                transition: 'all 0.3s ease',
                overflow: 'visible',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -2,
                  left: -2,
                  right: -2,
                  bottom: -2,
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderRadius: '30px',
                  transition: 'all 0.3s ease',
                },
                '&:hover': {
                  backgroundColor: '#6B563C',
                  transform: 'translate(2px, 2px)',
                  boxShadow: '2px 2px 0px #6B563C, 4px 4px 8px rgba(0,0,0,0.3)',
                  '&::before': {
                    transform: 'translate(-4px, -4px)',
                  }
                },
                '&:active': {
                  transform: 'translate(4px, 4px)',
                  boxShadow: '0px 0px 0px #6B563C, 2px 2px 4px rgba(0,0,0,0.3)',
                }
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
          py: { xs: 3, md: 6 },
          '& > div': {
            position: 'relative',
            mb: { xs: 4, md: 8 },
            pb: { xs: 4, md: 8 },
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
              mb: { xs: 4, md: 8 },
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                fontFamily: '"Cabin Sketch", cursive',
                color: '#6B563C',
                mb: { xs: 2, md: 3 },
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
            variant="h2" 
            component="h2" 
            gutterBottom
            sx={{ 
              mb: 3,
              textAlign: 'center',
              fontFamily: '"Cabin Sketch", cursive',
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
              fontWeight: 700,
              color: '#2C1810',
              textShadow: '2px 2px 0 rgba(107, 86, 60, 0.6)'
            }}
          >
            Photo Gallery
          </Typography>
          <PhotoGallery />
        </ScrollSection>

        {/* Wildlife Section */}
        <ScrollSection delay={0.4}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom
            sx={{ 
              mb: 4,
              textAlign: 'center',
              fontFamily: '"Cabin Sketch", cursive',
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
              fontWeight: 700,
              color: '#2C1810',
              textShadow: '2px 2px 0 rgba(107, 86, 60, 0.6)'
            }}
          >
            Local Wildlife
          </Typography>
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={3}
                sx={{ 
                  p: 4,
                  height: '100%',
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <Fish size={48} style={{ color: '#6B563C' }} />
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      fontFamily: '"Cabin Sketch", cursive',
                      color: '#2C1810',
                      textAlign: 'center'
                    }}
                  >
                    Lake Life
                  </Typography>
                  <Typography sx={{ textAlign: 'center', color: '#6B563C' }}>
                    • Largemouth Bass<br/>
                    • Bluegill<br/>
                    • Channel Catfish<br/>
                    • Great Blue Herons<br/>
                    • Wood Ducks
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={3}
                sx={{ 
                  p: 4,
                  height: '100%',
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6B563C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 15V7c0-2.2 1.8-4 4-4s4 1.8 4 4v8"/>
                    <path d="M17 15H7l-4 6h18l-4-6z"/>
                    <path d="M12 3v4"/>
                  </svg>
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      fontFamily: '"Cabin Sketch", cursive',
                      color: '#2C1810',
                      textAlign: 'center'
                    }}
                  >
                    Forest Friends
                  </Typography>
                  <Typography sx={{ textAlign: 'center', color: '#6B563C' }}>
                    • White-tailed Deer<br/>
                    • Wild Turkeys<br/>
                    • Red Fox<br/>
                    • Eastern Cottontails<br/>
                    • Gray Squirrels
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={3}
                sx={{ 
                  p: 4,
                  height: '100%',
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6B563C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 1 7.92 12.446a9 9 0 1 1 -16.626 -8.874a7.5 7.5 0 0 1 8.313 -3.572z"/>
                  </svg>
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      fontFamily: '"Cabin Sketch", cursive',
                      color: '#2C1810',
                      textAlign: 'center'
                    }}
                  >
                    Feathered Friends
                  </Typography>
                  <Typography sx={{ textAlign: 'center', color: '#6B563C' }}>
                    • Cardinals<br/>
                    • Blue Jays<br/>
                    • Chickadees<br/>
                    • Woodpeckers<br/>
                    • Goldfinches
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography 
              variant="body1" 
              sx={{ 
                fontStyle: 'italic',
                color: '#6B563C',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              Note: Wildlife sightings vary by season. Remember to observe from a safe distance and never feed wild animals.
            </Typography>
          </Box>
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
        <ScrollSection delay={0.2}>
          <Reviews />
        </ScrollSection>

        <ScrollSection delay={0.2}>
          <ContactForm />
        </ScrollSection>
      </Container>

      <BookingModal
        open={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </Box>
  );
}
