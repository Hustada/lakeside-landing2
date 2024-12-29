'use client';

import { Box, Container, Typography, Link, Stack, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { MapPin, Mail, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#2D2A26',
        color: '#FDFBF7',
        py: { xs: 6, md: 8 },
        mt: 'auto',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #8B6D47 0%, #D4C4B0 50%, #8B6D47 100%)',
          opacity: 0.8,
        },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={6}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
          >
            {/* Logo/Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontFamily: '"Cabin Sketch", cursive',
                  color: '#D4C4B0',
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                Lakeside Landing
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#A09B96',
                  lineHeight: 1.6,
                  fontFamily: 'Cabin, sans-serif',
                }}
              >
                Your private lake retreat nestled in the heart of rural Nebraska
              </Typography>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ width: '100%', maxWidth: '400px' }}
            >
              <Stack spacing={2} alignItems="center">
                <Link
                  href="https://maps.app.goo.gl/HVZNp8K3r1vBWvLp7"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: '#D4C4B0',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#FDFBF7',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  <MapPin size={18} />
                  <Typography variant="body2">
                    Denton, Nebraska
                  </Typography>
                </Link>
                
                <Link
                  href="mailto:contact@lakesidelanding.co"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: '#D4C4B0',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#FDFBF7',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  <Mail size={18} />
                  <Typography variant="body2">
                    contact@lakesidelanding.co
                  </Typography>
                </Link>

                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: '#D4C4B0',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#FDFBF7',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  <Instagram size={18} />
                  <Typography variant="body2">
                    @lakesidelanding
                  </Typography>
                </Link>
              </Stack>
            </motion.div>
          </Stack>

          <Divider sx={{ borderColor: 'rgba(212, 196, 176, 0.1)' }} />

          {/* Bottom Section */}
          <Box sx={{ textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: 'Cabin, sans-serif',
                  color: '#6B6560',
                }}
              >
                2024 LakesideLanding. Forged by The Victor Collective.
              </Typography>
            </motion.div>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
