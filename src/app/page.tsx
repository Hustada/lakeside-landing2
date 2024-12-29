'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Button, Paper } from '@mui/material';
import { Fish, HomeIcon, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BookingModal from '@/components/BookingModal/BookingModal';
import PhotoGallery from '@/components/PhotoGallery';
import ScrollSection from '@/components/ScrollSection/ScrollSection';
import HeroTitle from '@/components/Hero/HeroTitle';
import Reviews from '@/components/Reviews/Reviews';
import ContactForm from '@/components/ContactForm/ContactForm';

// Hero images configuration
const heroImages = [
  {
    url: '/cabinaerial2.jpg',
    gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 100%)',
    mobileGradient: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)',
  },
  {
    url: '/cabinback2.jpg',
    gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 100%)',
    mobileGradient: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)',
  },
  {
    url: '/cabinfront2.jpg',
    gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 100%)',
    mobileGradient: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)',
  },
  {
    url: '/cabinfront4.jpg',
    gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 100%)',
    mobileGradient: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.55) 100%)',
  },
  {
    url: '/exterior1.jpg',
    gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 100%)',
    mobileGradient: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)',
  },
  {
    url: '/firepit1.jpg',
    gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.35) 100%)',
    mobileGradient: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.45) 100%)',
  },
  {
    url: '/firepit2.jpg',
    gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.35) 100%)',
    mobileGradient: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.45) 100%)',
  },
];

export default function Home() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  const fadeVariants = {
    enter: {
      opacity: 0,
      scale: 1.05,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
    },
  };

  const currentImage = heroImages[currentImageIndex] || heroImages[0];

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
                xs: currentImage.mobileGradient,
                sm: currentImage.gradient
              },
              zIndex: 1,
              transition: 'background 2s ease-in-out',
            },
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              variants={fadeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                opacity: { duration: 1.2, ease: "easeInOut" },
                scale: { duration: 1.4, ease: "easeInOut" },
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '120%',
                top: '-10%',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${currentImage.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: { xs: 'center 30%', sm: 'center' },
                  filter: { xs: 'brightness(0.9)', sm: 'none' },
                }}
              />
            </motion.div>
          </AnimatePresence>
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
          <Box sx={{ mt: 2 }}>
            <Button
              onClick={() => setBookingModalOpen(true)}
              sx={{
                mt: { xs: 2, sm: 4 },
                px: { xs: 4, sm: 6 },
                py: { xs: 1.5, sm: 2 },
                borderRadius: '4px',
                textTransform: 'none',
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' },
                fontFamily: '"Cabin Sketch", cursive',
                background: '#F4E9D7',
                color: '#6B563C',
                border: '1px solid #8B6D47',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `
                    linear-gradient(
                      135deg,
                      rgba(139, 109, 71, 0.05) 25%,
                      transparent 25%,
                      transparent 50%,
                      rgba(139, 109, 71, 0.05) 50%,
                      rgba(139, 109, 71, 0.05) 75%,
                      transparent 75%
                    )
                  `,
                  backgroundSize: '8px 8px',
                  opacity: 1,
                  zIndex: 1,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to right, rgba(139, 109, 71, 0.1), transparent, rgba(139, 109, 71, 0.1))',
                  zIndex: 1,
                },
                '& .MuiButton-label': {
                  position: 'relative',
                  zIndex: 2,
                },
                '&:hover': {
                  background: '#EDE0C9',
                  transform: 'translateY(1px)',
                  boxShadow: '1px 1px 2px rgba(0,0,0,0.15)',
                  '&::before': {
                    opacity: 0.8,
                  },
                },
                '&:active': {
                  transform: 'translateY(2px)',
                  boxShadow: '0px 0px 1px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Box sx={{ 
                position: 'relative', 
                zIndex: 2,
                fontWeight: 'bold',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&::before, &::after': {
                  content: '""',
                  height: '1px',
                  width: '12px',
                  background: '#8B6D47',
                  opacity: 0.6,
                },
              }}>
                Book Your Stay
              </Box>
            </Button>
          </Box>

          {/* Scroll Arrow */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 1 }
            }}
            style={{
              position: 'absolute',
              bottom: '60px',
              cursor: 'pointer',
            }}
          >
            <motion.div
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              onClick={() => {
                const contentSection = document.getElementById('content-start');
                if (contentSection) {
                  contentSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Box
                sx={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <Box
                  component="svg"
                  sx={{
                    width: 24,
                    height: 24,
                    fill: 'none',
                    stroke: 'currentColor',
                    strokeWidth: 2,
                  }}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </Box>
              </Box>
            </motion.div>
          </motion.div>
        </Container>

        <BookingModal
          open={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
        />
      </Box>

      {/* Content Start */}
      <Box id="content-start">
        <Container 
          maxWidth="lg" 
          sx={{ 
            py: { xs: 6, md: 10 },
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
                        transform: 'translateY(-4px)'
                      }
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
                        transform: 'translateY(-4px)'
                      }
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
                        transform: 'translateY(-4px)'
                      }
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
      </Box>
    </Box>
  );
}
