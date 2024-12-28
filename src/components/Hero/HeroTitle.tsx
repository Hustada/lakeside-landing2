'use client';

import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function HeroTitle() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        perspective: '1000px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            fontWeight: 700,
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
              animation: 'wave 2s ease-in-out infinite',
            },
            '& .highlight': {
              color: theme.palette.primary.main,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: '100%',
                height: '2px',
                background: theme.palette.primary.main,
                transform: 'scaleX(0)',
                transformOrigin: 'right',
                animation: 'waterFlow 3s ease-in-out infinite',
              }
            },
          }}
        >
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Lakeside
          </motion.span>{' '}
          <motion.span
            className="highlight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Landing
          </motion.span>
        </Typography>
      </motion.div>

      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '-30px',
          transform: 'translateY(-50%)',
          opacity: 0.6,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" fill="none" />
        </motion.svg>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '-30px',
          transform: 'translateY(-50%)',
          opacity: 0.6,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" fill="none" />
        </motion.svg>
      </Box>

      <style jsx global>{`
        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes waterFlow {
          0% {
            transform: scaleX(0);
            transformOrigin: right;
          }
          50% {
            transform: scaleX(1);
            transformOrigin: right;
          }
          50.1% {
            transformOrigin: left;
          }
          100% {
            transform: scaleX(0);
            transformOrigin: left;
          }
        }
      `}</style>
    </Box>
  );
}
