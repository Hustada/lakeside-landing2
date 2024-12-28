'use client';

import { useState } from 'react';
import { Grid, Box, Modal, IconButton } from '@mui/material';
import { X } from 'lucide-react';
import Image from 'next/image';
import { photos } from './placeholders';

export default function PhotoGallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <>
      <Grid container spacing={2}>
        {photos.map((photo) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            key={photo.img}
            onClick={() => setSelectedImg(photo.img)}
            sx={{ cursor: 'pointer' }}
          >
            <Box 
              sx={{ 
                position: 'relative', 
                width: '100%', 
                height: 200,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <Image
                src={photo.img}
                alt={photo.title}
                fill
                style={{
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={!!selectedImg}
        onClose={() => setSelectedImg(null)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
          <IconButton
            onClick={() => setSelectedImg(null)}
            sx={{
              position: 'absolute',
              right: -40,
              top: -40,
              color: 'white',
            }}
          >
            <X />
          </IconButton>
          {selectedImg && (
            <Box sx={{ position: 'relative', width: '100%', height: '90vh' }}>
              <Image
                src={selectedImg}
                alt="Selected photo"
                fill
                style={{
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
                sizes="90vw"
              />
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
