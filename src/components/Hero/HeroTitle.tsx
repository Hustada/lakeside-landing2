'use client';

import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';

export default function HeroTitle() {
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
            fontFamily: '"Cabin Sketch", cursive',
            fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' },
            fontWeight: 700,
            color: '#FDFBF7',
            textShadow: '2px 2px 0 #6B563C, 4px 4px 0 rgba(107, 86, 60, 0.6)',
            position: 'relative',
            letterSpacing: '0.02em',
            '& .highlight': {
              color: '#D4C4B0',
              position: 'relative',
              display: 'inline-block',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '10%',
              left: '-2%',
              right: '-2%',
              bottom: '-2%',
              background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
              opacity: 0.15,
              zIndex: -1,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: '0',
              width: '100%',
              height: '4px',
              background: 'linear-gradient(90deg, transparent, #8B6D47, transparent)',
              opacity: 0.6,
            }
          }}
        >
          <motion.span
            initial={{ y: 20, opacity: 0, rotateX: -45 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
          >
            Lakeside
          </motion.span>{' '}
          <motion.span
            className="highlight"
            initial={{ y: 20, opacity: 0, rotateX: -45 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ delay: 0.7, duration: 0.8, type: 'spring' }}
          >
            Landing
          </motion.span>
        </Typography>

        {/* Decorative Pine Trees */}
        <Box
          sx={{
            position: 'absolute',
            left: '-60px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <motion.svg
            width="40"
            height="60"
            viewBox="0 0 40 60"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <path
              d="M20 0L40 30H30L40 50H0L10 30H0L20 0Z"
              fill="#8B6D47"
              opacity="0.8"
            />
          </motion.svg>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            right: '-60px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <motion.svg
            width="40"
            height="60"
            viewBox="0 0 40 60"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <path
              d="M20 0L40 30H30L40 50H0L10 30H0L20 0Z"
              fill="#8B6D47"
              opacity="0.8"
            />
          </motion.svg>
        </Box>
      </motion.div>

      <style jsx global>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          10% { transform: translate(-2%, -2%) }
          20% { transform: translate(2%, 2%) }
          30% { transform: translate(-1%, 1%) }
          40% { transform: translate(1%, -1%) }
          50% { transform: translate(-2%, 2%) }
          60% { transform: translate(2%, -2%) }
          70% { transform: translate(-1%, -1%) }
          80% { transform: translate(1%, 1%) }
          90% { transform: translate(-2%, -2%) }
        }
      `}</style>
    </Box>
  );
}
