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
          <Box
            sx={{
              pt: 3,
              borderTop: 1,
              borderColor: 'rgba(255,255,255,0.1)',
              textAlign: 'center'
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#6B6560',
                fontSize: '0.85rem'
              }}
            >
              {new Date().getFullYear()} Lakeside Landing. All rights reserved.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
