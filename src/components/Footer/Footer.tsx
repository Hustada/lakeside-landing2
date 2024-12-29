'use client';

import { Box, Container, Typography, Link, Stack } from '@mui/material';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#2D2A26',
        color: '#FDFBF7',
        py: { xs: 4, md: 5 },
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'center', md: 'flex-start' }}
            spacing={3}
          >
            {/* Logo/Title */}
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 500,
                  color: '#D4C4B0',
                  mb: 1,
                  letterSpacing: '0.02em'
                }}
              >
                Lakeside Landing
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#6B6560',
                  maxWidth: '300px'
                }}
              >
                Your private lake retreat nestled in the heart of rural Nebraska
              </Typography>
            </Box>

            {/* Contact */}
            <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="mailto:info@lakesidelanding.com"
                  sx={{
                    color: '#D4C4B0',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    '&:hover': {
                      color: '#FDFBF7'
                    }
                  }}
                >
                  info@lakesidelanding.com
                </Link>
              </motion.div>
            </Box>
          </Stack>

          {/* Bottom Section */}
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                fontFamily: 'Cabin, sans-serif',
                '& a': {
                  color: '#8B6D47',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }
              }}
            >
              &copy; {new Date().getFullYear()} LakesideLanding. Forged by{' '}
              <a href="https://thevictorcollective.com" target="_blank" rel="noopener noreferrer">
                The Victor Collective
              </a>
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
