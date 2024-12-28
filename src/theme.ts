import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B6D47',
      dark: '#6B563C',
      light: '#D4C4B0',
    },
    background: {
      default: '#FDFBF7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D2A26',
      secondary: '#6B6560',
    },
    divider: '#E8E2D9',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: '3.5rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      color: '#2D2A26',
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      color: '#2D2A26',
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      color: '#2D2A26',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      color: '#2D2A26',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      color: '#2D2A26',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      color: '#2D2A26',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      color: '#6B6560',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.7,
      color: '#6B6560',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 500,
          textTransform: 'none',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          backgroundColor: '#8B6D47',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#6B563C',
          },
        },
        outlined: {
          borderColor: '#8B6D47',
          color: '#8B6D47',
          '&:hover': {
            borderColor: '#6B563C',
            backgroundColor: 'rgba(139, 109, 71, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#E8E2D9',
            },
            '&:hover fieldset': {
              borderColor: '#8B6D47',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8B6D47',
            },
          },
        },
      },
    },
  },
});

export default theme;
