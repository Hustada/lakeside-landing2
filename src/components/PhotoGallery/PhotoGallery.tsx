'use client';

import { useState, useEffect, useCallback } from 'react';
import { Box, ImageList, ImageListItem, Modal, useMediaQuery, useTheme, IconButton, Typography, Tabs, Tab } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';

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
  const [touchStart, setTouchStart] = useState(0);
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

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;

    // Require at least 50px movement for a swipe
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showNext();
      } else {
        showPrev();
      }
      setTouchStart(0);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(0);
  };

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
      <Box sx={{ width: '100%', mt: { xs: 2, md: 4 } }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            mb: { xs: 2, md: 3 },
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              minWidth: { xs: 'auto', sm: 200 },
              py: { xs: 1, sm: 1.5 },
            },
          }}
        >
          {photoGroups.map((group) => (
            <Tab key={group.title} label={group.title} />
          ))}
        </Tabs>

        {photoGroups.map((group) => (
          <Box
            key={group.title}
            role="tabpanel"
            hidden={activeTab !== photoGroups.indexOf(group)}
            sx={{ mb: { xs: 3, md: 6 } }}
          >
            {activeTab === photoGroups.indexOf(group) && (
              <>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: { xs: 1, md: 2 },
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                  }}
                >
                  {group.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: { xs: 2, md: 3 },
                    color: theme.palette.text.secondary,
                    fontSize: { xs: '0.875rem', md: '1rem' },
                  }}
                >
                  {group.description}
                </Typography>
                <ImageList
                  variant="standard"
                  cols={isMobile ? 1 : 3}
                  gap={isMobile ? 8 : 16}
                  sx={{
                    m: 0,
                    '& .MuiImageListItem-root': {
                      overflow: 'hidden',
                      borderRadius: 2,
                      mb: { xs: 1, md: 2 },
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
                        transform: isMobile ? 'none' : 'scale(1.05)',
                      },
                      '&:active': {
                        opacity: isMobile ? 0.8 : 1,
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
                      <Image
                        src={photo.img}
                        alt={photo.title}
                        loading="lazy"
                        width={400}
                        height={300}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
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
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={(e) => e.stopPropagation()}
              />
            </Box>
          )}
        </AnimatePresence>
      </Modal>
    </>
  );
}
