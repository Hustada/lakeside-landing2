'use client';

import { useState } from 'react';
import { Modal, Box, IconButton } from '@mui/material';
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
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <Box
              sx={{
                position: 'relative',
                bgcolor: 'background.paper',
                borderRadius: 2,
                p: 4,
                maxWidth: '90vw',
                maxHeight: '90vh',
                overflow: 'auto',
              }}
            >
              <IconButton
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }}
              >
                <X />
              </IconButton>
              <BookingCalendar onDateSelect={handleDateSelect} />
            </Box>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
