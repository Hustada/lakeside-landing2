'use client';

import { useState, useEffect, useCallback } from 'react';
import { Box, ImageList, ImageListItem, Modal, useMediaQuery, useTheme, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Animation variants for photo transitions
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

// Organize photos into groups for better layout control
const photos = [
  { img: '/cabinaerial1.jpg', title: 'Aerial View of Property', span: 2 },
  { img: '/cabinaerial2.jpg', title: 'Drone Shot of Lake', span: 1 },
  { img: '/cabinfront2.jpg', title: 'Cabin Front View', span: 1 },
  { img: '/cabinfront3.jpg', title: 'Cabin Entrance', span: 1 },
  { img: '/cabinfront4.jpg', title: 'Front Porch', span: 1 },
  { img: '/cabinfront5.jpg', title: 'Cabin Exterior', span: 2 },
  { img: '/cabinback1.jpg', title: 'Back View', span: 1 },
  { img: '/cabinback2.jpg', title: 'Lake View', span: 1 },
  { img: '/cabinback3.jpg', title: 'Back Porch', span: 1 },
  { img: '/cabinnight1.jpg', title: 'Night View', span: 2 },
  { img: '/firepit1.jpg', title: 'Fire Pit', span: 1 },
  { img: '/firepit2.jpg', title: 'Evening Fire', span: 1 },
];

export default function PhotoGallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Get current photo index
  const currentIndex = selectedImg ? photos.findIndex(photo => photo.img === selectedImg) : -1;

  // Navigation functions
  const showNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      setDirection(1);
      setSelectedImg(photos[currentIndex + 1].img);
    }
  }, [currentIndex]);

  const showPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setSelectedImg(photos[currentIndex - 1].img);
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImg) return;
      
      switch (e.key) {
        case 'ArrowRight':
          showNext();
          break;
        case 'ArrowLeft':
          showPrev();
          break;
        case 'Escape':
          setSelectedImg(null);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImg, showNext, showPrev]);

  return (
    <>
      <Box sx={{ mt: 4 }}>
        <ImageList
          variant="masonry"
          cols={isMobile ? 1 : 3}
          gap={24}
          sx={{
            mb: 8,
            '& .MuiImageListItem-root': {
              overflow: 'hidden',
              borderRadius: 2,
              '& img': {
                transition: 'transform 0.3s ease-in-out',
              },
              '&:hover img': {
                transform: 'scale(1.05)',
              },
            },
          }}
        >
          {photos.map((photo) => (
            <ImageListItem
              key={photo.img}
              component={motion.div}
              cols={isMobile ? 1 : photo.span}
              rows={1}
              onClick={() => {
                setDirection(0);
                setSelectedImg(photo.img);
              }}
              sx={{ 
                cursor: 'pointer',
                aspectRatio: photo.span === 2 ? '16/9' : '4/3',
              }}
            >
              <img
                src={photo.img}
                alt={photo.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <Modal
        open={!!selectedImg}
        onClose={() => setSelectedImg(null)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          backdropFilter: 'blur(8px)',
        }}
        onClick={() => setSelectedImg(null)}
      >
        <AnimatePresence>
          {selectedImg && (
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Close Button */}
              <IconButton
                onClick={() => setSelectedImg(null)}
                sx={{
                  position: 'absolute',
                  top: { xs: 8, md: 16 },
                  right: { xs: 8, md: 16 },
                  zIndex: 2,
                  color: 'white',
                  bgcolor: 'rgba(0,0,0,0.3)',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.5)',
                  },
                }}
              >
                <X size={24} />
              </IconButton>

              {/* Previous Button */}
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                disabled={currentIndex === 0}
                sx={{
                  position: 'absolute',
                  left: { xs: 2, md: 40 },
                  color: 'white',
                  bgcolor: 'rgba(0,0,0,0.3)',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.5)',
                  },
                  '&.Mui-disabled': {
                    display: 'none',
                  },
                }}
              >
                <ChevronLeft size={32} />
              </IconButton>

              {/* Next Button */}
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                disabled={currentIndex === photos.length - 1}
                sx={{
                  position: 'absolute',
                  right: { xs: 2, md: 40 },
                  color: 'white',
                  bgcolor: 'rgba(0,0,0,0.3)',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.5)',
                  },
                  '&.Mui-disabled': {
                    display: 'none',
                  },
                }}
              >
                <ChevronRight size={32} />
              </IconButton>

              <motion.div
                key={selectedImg}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                style={{
                  position: 'relative',
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  outline: 'none',
                }}
              >
                <img
                  src={selectedImg}
                  alt={photos[currentIndex]?.title || "Selected"}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '90vh',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  }}
                />
              </motion.div>
            </Box>
          )}
        </AnimatePresence>
      </Modal>
    </>
  );
}
