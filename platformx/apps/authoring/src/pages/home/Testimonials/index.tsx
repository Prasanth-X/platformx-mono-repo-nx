import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TestimonialsImage from '../../../assets/images/testimonial.png';
import { HorizontalLine } from '../HorizontalLine';

export const Testimonials = () => {
  return (
    <Grid
      container
      spacing={2}
      direction='row'
      alignItems='center'
      sx={{ pt: 4, pb: 4 }}
    >
      <Grid item xs={1}></Grid>
      <Grid item xs={11} md={4}>
        <Typography
          variant='h3regular'
          color='primary.main'
          sx={{ textAlign: 'left' }}
        >
          Customer Testimonials
        </Typography>
        <HorizontalLine />
        <Typography variant='p4regular' sx={{ textAlign: 'left' }}>
          ‟Love what X has done for us”
        </Typography>
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Typography variant='p4regular'>- Manchester United</Typography>
        </Box>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
        <img src={TestimonialsImage} style={{ maxWidth: '40vw' }} />
      </Grid>
    </Grid>
  );
};
