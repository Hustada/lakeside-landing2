'use client';

import { useState, useEffect, useCallback } from 'react';
import { Box, ImageList, ImageListItem, Modal, useMediaQuery, useTheme, IconButton, Typography, Tabs, Tab } from '@mui/material';
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

type PhotoGroup = {
  title: string;
  description: string;
  photos: PhotoItem[];
};

type PhotoItem = {
  img: string;
  title: string;
};

// Organize photos into physical areas
const photoGroups: PhotoGroup[] = [
  {
    title: "Property Overview",
    description: "Aerial views and exterior perspectives of Lakeside Landing",
    photos: [
      { img: '/cabinaerial1.jpg', title: 'Aerial View of Property' },
      { img: '/cabinaerial2.jpg', title: 'Drone Shot of Lake' },
      { img: '/cabinfront2.jpg', title: 'Cabin Front View' },
      { img: '/cabinfront3.jpg', title: 'Cabin Entrance' },
      { img: '/cabinfront4.jpg', title: 'Front Porch' },
      { img: '/cabinfront5.jpg', title: 'Cabin Exterior' },
      { img: '/cabinnight1.jpg', title: 'Night View' },
    ]
  },
  {
    title: "Living Room",
    description: "Spacious living area with lake views and comfortable seating",
    photos: [
      { img: '/livingroom1.jpg', title: 'Living Room Welcome' },
      { img: '/livingroom2.jpg', title: 'Cozy Seating' },
      { img: '/livingroom3.jpg', title: 'Living Space' },
      { img: '/livingroom4.jpg', title: 'Gathering Space' },
      { img: '/livingroom5.jpg', title: 'Living Area' },
      { img: '/livingroom6.jpg', title: 'Lake View Inside' },
      { img: '/livingroom7.jpg', title: 'Relaxation Space' },
      { img: '/livingroom9.jpg', title: 'Cozy Corner' },
      { img: '/livingroom10.jpg', title: 'Reading Nook' },
    ]
  },
  {
    title: "Kitchen & Dining",
    description: "Modern kitchen and dining space for memorable meals",
    photos: [
      { img: '/cabinkitchen1.jpg', title: 'Modern Kitchen' },
      { img: '/cabinkitchen2.jpg', title: 'Kitchen Details' },
      { img: '/cabinkitchen4.jpg', title: 'Kitchen View' },
      { img: '/cabinkitchen5.jpg', title: 'Kitchen Space' },
      { img: '/cabindining1.jpg', title: 'Dining Area' },
      { img: '/cabindining2.jpg', title: 'Dining Space' },
    ]
  },
  {
    title: "Outdoor Living",
    description: "Lakefront views, back porch, and outdoor entertainment",
    photos: [
      { img: '/cabinback1.jpg', title: 'Back View' },
      { img: '/cabinback2.jpg', title: 'Lake View' },
      { img: '/cabinback3.jpg', title: 'Back Porch' },
      { img: '/firepit1.jpg', title: 'Fire Pit' },
      { img: '/firepit2.jpg', title: 'Evening Fire' },
    ]
  }
];

// Flatten photos for modal navigation
const allPhotos = photoGroups.flatMap(group => group.photos);

export default function PhotoGallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Get current photo index from all photos
  const currentIndex = selectedImg ? allPhotos.findIndex(photo => photo.img === selectedImg) : -1;

  // Navigation functions
  const showNext = useCallback(() => {
    if (currentIndex < allPhotos.length - 1) {
      setDirection(1);
      setSelectedImg(allPhotos[currentIndex + 1].img);
    }
  }, [currentIndex]);

  const showPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setSelectedImg(allPhotos[currentIndex - 1].img);
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%', mt: 4 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            mb: 3,
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              minWidth: { xs: 'auto', sm: 200 },
            },
          }}
        >
          {photoGroups.map((group, index) => (
            <Tab key={group.title} label={group.title} />
          ))}
        </Tabs>

        {photoGroups.map((group, index) => (
          <Box
            key={group.title}
            role="tabpanel"
            hidden={activeTab !== index}
            sx={{ mb: 8 }}
          >
            {activeTab === index && (
              <>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 1,
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                  }}
                >
                  {group.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 3,
                    color: theme.palette.text.secondary,
                  }}
                >
                  {group.description}
                </Typography>
                <ImageList
                  // Switch to standard grid for more predictable layout
                  variant="standard"
                  cols={isMobile ? 2 : 3}
                  gap={16}
                  sx={{
                    '& .MuiImageListItem-root': {
                      overflow: 'hidden',
                      borderRadius: 2,
                      // Force consistent aspect ratio
                      '&::before': {
                        content: '""',
                        display: 'block',
                        paddingTop: '66.67%', // 3:2 aspect ratio
                      },
                      '& img': {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease-in-out',
                      },
                      '&:hover img': {
                        transform: 'scale(1.05)',
                      },
                    },
                  }}
                >
                  {group.photos.map((photo) => (
                    <ImageListItem
                      key={photo.img}
                      component={motion.div}
                      onClick={() => {
                        setDirection(0);
                        setSelectedImg(photo.img);
                      }}
                      sx={{ 
                        cursor: 'pointer',
                      }}
                    >
                      <img
                        src={photo.img}
                        alt={photo.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </>
            )}
          </Box>
        ))}
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
        <AnimatePresence initial={false} custom={direction}>
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
                <ChevronLeft size={24} />
              </IconButton>

              {/* Next Button */}
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                disabled={currentIndex === allPhotos.length - 1}
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
                <ChevronRight size={24} />
              </IconButton>

              <motion.img
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
                src={selectedImg}
                alt={allPhotos.find(p => p.img === selectedImg)?.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </Box>
          )}
        </AnimatePresence>
      </Modal>
    </>
  );
}
