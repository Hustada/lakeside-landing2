'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { Send as SendIcon } from 'lucide-react';
import emailjs from '@emailjs/browser';
import CampfireAnimation from './CampfireAnimation';

// Initialize EmailJS
const PUBLIC_KEY = 'LOfBCNYKVmwoQ10nV';
emailjs.init(PUBLIC_KEY);

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showAnimation, setShowAnimation] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await emailjs.send(
        'service_7oes13r', // Lakeside Landing service
        'template_6z9asrk', // Using the correct template
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_name: 'Lakeside Landing'
        }
      );
      setShowAnimation(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      console.error('EmailJS error:', err);
    }
  };

  const handleReset = () => {
    setShowAnimation(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  const paperVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '12px',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
      },
      '&.Mui-focused': {
        backgroundColor: '#fff',
      }
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#8B6D47',
      borderWidth: '2px',
    },
    '& .MuiInputLabel-root': {
      color: '#6B563C',
      fontFamily: '"Cabin", sans-serif',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#8B6D47',
    },
    mb: 3
  };

  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/woodtexture.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          zIndex: -1,
        }
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={paperVariants}
      >
        <Paper
          elevation={4}
          sx={{
            maxWidth: 600,
            mx: 'auto',
            p: { xs: 3, md: 6 },
            borderRadius: '16px',
            backgroundColor: 'rgba(253, 251, 247, 0.95)',
            border: '2px solid #8B6D47',
            boxShadow: '6px 6px 0px #6B563C, 12px 12px 16px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}
        >
          <AnimatePresence mode="wait">
            {showAnimation ? (
              <motion.div
                key="animation"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <Box sx={{ py: 4 }}>
                  <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    sx={{
                      fontFamily: '"Cabin Sketch", cursive',
                      color: '#6B563C',
                      mb: 2,
                    }}
                  >
                    Message sent! Warming up by the fire...
                  </Typography>
                  <CampfireAnimation />
                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Button
                      onClick={handleReset}
                      variant="outlined"
                      sx={{
                        borderRadius: '20px',
                        borderColor: '#8B6D47',
                        color: '#6B563C',
                        fontFamily: 'Cabin, sans-serif',
                        '&:hover': {
                          borderColor: '#6B563C',
                          backgroundColor: 'rgba(107, 86, 60, 0.05)',
                        }
                      }}
                    >
                      Send Another Message
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  sx={{
                    fontFamily: '"Cabin Sketch", cursive',
                    color: '#6B563C',
                    mb: 2,
                  }}
                >
                  Get in Touch
                </Typography>
                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{
                    mb: 4,
                    color: '#6B563C',
                    fontFamily: 'Cabin, sans-serif',
                  }}
                >
                  Let&apos;s start planning your perfect lakeside getaway
                </Typography>

                <form onSubmit={handleSubmit}>
                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}
                  <motion.div
                    variants={inputVariants}
                    whileFocus="focus"
                  >
                    <TextField
                      fullWidth
                      label="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      sx={textFieldStyle}
                    />
                  </motion.div>

                  <motion.div
                    variants={inputVariants}
                    whileFocus="focus"
                  >
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      sx={textFieldStyle}
                    />
                  </motion.div>

                  <motion.div
                    variants={inputVariants}
                    whileFocus="focus"
                  >
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      sx={textFieldStyle}
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      endIcon={<SendIcon />}
                      sx={{
                        mt: 2,
                        py: 1.5,
                        borderRadius: '28px',
                        backgroundColor: '#8B6D47',
                        color: '#FDFBF7',
                        border: '2px solid #6B563C',
                        fontFamily: '"Cabin", sans-serif',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: '3px 3px 0px #6B563C',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#6B563C',
                          transform: 'translate(2px, 2px)',
                          boxShadow: '1px 1px 0px #6B563C',
                        }
                      }}
                    >
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showAnimation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert
                  severity="success"
                  sx={{
                    mt: 3,
                    borderRadius: '12px',
                    backgroundColor: 'rgba(237, 247, 237, 0.9)',
                  }}
                >
                  Thank you for your message! We&apos;ll get back to you soon.
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </Paper>
      </motion.div>
    </Box>
  );
}
