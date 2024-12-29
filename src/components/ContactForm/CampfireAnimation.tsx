'use client';

import { motion } from 'framer-motion';
import { Box } from '@mui/material';

export default function CampfireAnimation() {
  const flameVariants = {
    animate: {
      y: [-5, -15, -5],
      scaleY: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const sparkVariants = {
    animate: (i: number) => ({
      y: [-20, -60],
      x: [-10 + i * 20, -20 + i * 30],
      opacity: [1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: i * 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '280px', mt: 2, overflow: 'visible' }}>
      {/* Logs */}
      <motion.svg
        width="120"
        height="40"
        viewBox="0 0 120 40"
        style={{
          position: 'absolute',
          bottom: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <motion.path
          d="M10 20 L50 20 L60 10 L110 10"
          stroke="#6B563C"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d="M20 30 L60 30 L70 20 L100 20"
          stroke="#8B6D47"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </motion.svg>

      {/* Fire */}
      <motion.svg
        width="80"
        height="160"
        viewBox="0 0 80 120"
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          overflow: 'visible',
        }}
      >
        {/* Main Flame */}
        <motion.path
          d="M40 0 C20 30 0 60 20 90 C30 100 50 100 60 90 C80 60 60 30 40 0"
          fill="#FF6B35"
          variants={flameVariants}
          animate="animate"
        />
        <motion.path
          d="M40 15 C25 40 10 65 25 85 C32 92 48 92 55 85 C70 65 55 40 40 15"
          fill="#FFB563"
          variants={flameVariants}
          animate="animate"
        />
        <motion.path
          d="M40 30 C30 50 20 70 30 85 C35 90 45 90 50 85 C60 70 50 50 40 30"
          fill="#FFF3C3"
          variants={flameVariants}
          animate="animate"
        />
      </motion.svg>

      {/* Sparks */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            bottom: '100px',
            left: '50%',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: '#FFB563',
          }}
          custom={i}
          variants={sparkVariants}
          animate="animate"
        />
      ))}
    </Box>
  );
}
