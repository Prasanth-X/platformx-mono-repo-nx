import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TemplateImage from '../../../assets/images/template.png';
import { HorizontalLine } from '../HorizontalLine';

export const Template = () => {
  return (
    <Grid
      container
      spacing={0}
      direction='row'
      alignItems='center'
      sx={{ pt: 4, pb: 4 }}
    >
      <Grid item xs={12} md={6} mt={2} sx={{ textAlign: 'center' }}>
        <img src={TemplateImage} style={{ maxWidth: '40vw' }} />
      </Grid>
      <Grid item xs={1} md={1}></Grid>
      <Grid item xs={11} md={4} sx={{ textAlign: 'left' }}>
        <Typography variant='h3regular' color='primary.main'>
          Go from concept-to-live in hours with Prelems
        </Typography>
        <HorizontalLine />
        <Typography variant='p4regular'>
          Pre-built Elements (we call them “Prelems”) are the “Lego Blocks” of
          X. Go to market fast with our rich library of Prelems. Each Prelem
          comes with out-of-box modern UX, analytics, accessibility & SEO
          support.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button className='buttonclick' variant='contained'>
            Know More
          </Button>
        </Box>
      </Grid>
      <Grid item xs={1} md={1}></Grid>
    </Grid>
  );
};
