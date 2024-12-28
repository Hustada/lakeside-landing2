'use client';

import { useState } from 'react';
import { Box, ImageList, ImageListItem, Modal, useMediaQuery, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const photos = [
  { img: '/cabinaerial1.jpg', title: 'Aerial View of Property' },
  { img: '/cabinaerial2.jpg', title: 'Drone Shot of Lake' },
  { img: '/cabinfront2.jpg', title: 'Cabin Front View' },
  { img: '/cabinfront3.jpg', title: 'Cabin Entrance' },
  { img: '/cabinfront4.jpg', title: 'Front Porch' },
  { img: '/cabinfront5.jpg', title: 'Cabin Exterior' },
  { img: '/cabinback1.jpg', title: 'Back View' },
  { img: '/cabinback2.jpg', title: 'Lake View' },
  { img: '/cabinback3.jpg', title: 'Back Porch' },
  { img: '/cabinnight1.jpg', title: 'Night View' },
  { img: '/firepit1.jpg', title: 'Fire Pit' },
  { img: '/firepit2.jpg', title: 'Evening Fire' },
];

export default function PhotoGallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <ImageList
        variant="masonry"
        cols={isMobile ? 1 : 3}
        gap={16}
        sx={{
          '& .MuiImageListItem-root': {
            overflow: 'hidden',
            borderRadius: 2,
          },
        }}
      >
        {photos.map((photo) => (
          <ImageListItem
            key={photo.img}
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedImg(photo.img)}
            sx={{ cursor: 'pointer' }}
          >
            <img
              src={photo.img}
              alt={photo.title}
              loading="lazy"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Modal
        open={!!selectedImg}
        onClose={() => setSelectedImg(null)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
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
