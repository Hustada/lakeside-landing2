import { Box, Container, Typography, Grid, Button, Paper } from '@mui/material';
import { Calendar, MapPin, Users, Wifi } from 'lucide-react';

export default function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/hero-image.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Lakeside Landing
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Your perfect lakefront getaway in the heart of nature
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Calendar />}
              sx={{ px: 4, py: 1.5 }}
            >
              Check Availability
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Quick Info Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Welcome to Lakeside Landing
            </Typography>
            <Typography variant="body1" paragraph>
              Experience the perfect blend of luxury and nature at our waterfront property. 
              This stunning 3-bedroom retreat offers breathtaking lake views, modern amenities, 
              and the perfect setting for your next vacation.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Users />
                <Typography>Sleeps 8</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MapPin />
                <Typography>Lakefront</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Wifi />
                <Typography>Fast WiFi</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Quick Highlights
              </Typography>
              <Grid container spacing={2}>
                {[
                  '3 Bedrooms / 2 Bathrooms',
                  'Private Dock',
                  'Full Kitchen',
                  'Outdoor Fire Pit',
                  'Smart TV',
                  'Lake Views',
                  'Central Air',
                  'Parking for 4 Cars'
                ].map((feature, index) => (
                  <Grid item xs={6} key={index}>
                    <Typography variant="body1">• {feature}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
