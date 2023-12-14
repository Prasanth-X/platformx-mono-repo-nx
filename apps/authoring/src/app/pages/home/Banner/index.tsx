import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeConstants } from '@platformx/utilities';

export const Banner = () => {
  return (
    <Grid
      container
      spacing={2}
      className="section"
      sx={{
        minHeight: { xs: '500px', md: '360px', lg: '500px' },
      }}
      direction="row"
      alignItems="center"
    >
      <Grid item xs={1}></Grid>
      <Grid item xs={8} md={5} sx={{ textAlign: 'left' }}>
        <Typography variant="h3regular" color="common.white" sx={{ pb: 1 }}>
          Super charge your
        </Typography>
        <Typography variant="h1regular" color="common.white" sx={{ pb: 2 }}>
          Direct-to-Consumer Business
        </Typography>
        <Typography
          variant="p4regular"
          color="common.white"
          sx={{ width: { lg: '65%', md: '65%', sm: '90%', xs: '90%' } }}
        >
          Run your D2C engagement and monetization initiatives through a single
          platform
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            className="buttonclick"
            sx={{
              textTransform: 'none',
              borderColor: ThemeConstants.WHITE_COLOR,
              color: ThemeConstants.WHITE_COLOR,
              borderRadius: '34px',
              minWidth: '120px',
              padding: '10px 20px',
              '&:hover': {
                color: ThemeConstants.WHITE_COLOR,
                borderColor: ThemeConstants.WHITE_COLOR,
              },
            }}
          >
            Know More
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
