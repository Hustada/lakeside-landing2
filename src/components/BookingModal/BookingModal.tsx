'use client';

import { Box, Modal, IconButton, Typography, Paper } from '@mui/material';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BookingCalendar from '../BookingCalendar';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const handleDateSelect = (startDate: Date | null, endDate: Date | null) => {
    if (startDate && endDate) {
      console.log('Selected dates:', { startDate, endDate });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <Modal
          open={open}
          onClose={onClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 0, sm: 2 },
          }}
        >
          <motion.div
            initial={{ 
              scale: 0,
              rotateX: -90,
              y: 100,
            }}
            animate={{ 
              scale: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{ 
              scale: 0,
              rotateX: 90,
              y: -100,
            }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 100,
            }}
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '800px',
              perspective: '1000px',
            }}
          >
            <Paper
              elevation={24}
              sx={{
                bgcolor: 'background.paper',
                borderRadius: { xs: 0, sm: 2 },
                overflow: 'hidden',
                position: 'relative',
                height: { xs: '100vh', sm: 'auto' },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  p: { xs: 2, sm: 3 },
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: 'primary.main',
                  color: 'white',
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h2"
                  sx={{
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  }}
                >
                  Book Your Lake Escape
                </Typography>
                <IconButton
                  onClick={onClose}
                  sx={{
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  <X />
                </IconButton>
              </Box>

              {/* Calendar Section */}
              <Box sx={{ 
                p: { xs: 2, sm: 4 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                    Select your check-in and check-out dates to begin your lakeside adventure
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Box sx={{ 
                    '& .MuiTextField-root': { 
                      width: '100%',
                      mb: 2,
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '1.1rem',
                    },
                    '& .MuiOutlinedInput-root': {
                      fontSize: '1.1rem',
                    },
                  }}>
                    <BookingCalendar onDateSelect={handleDateSelect} />
                  </Box>
                </motion.div>
              </Box>
            </Paper>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
