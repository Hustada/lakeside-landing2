'use client';

import { useState } from 'react';
import { Box, ImageList, ImageListItem, Modal, useMediaQuery, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
              onClick={() => setSelectedImg(photo.img)}
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
      >
        <AnimatePresence>
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh',
                outline: 'none',
              }}
            >
              <img
                src={selectedImg}
                alt="Selected"
                style={{
                  maxWidth: '100%',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </>
  );
}
