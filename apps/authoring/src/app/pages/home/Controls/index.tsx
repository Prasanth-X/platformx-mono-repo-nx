import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ControlsCreate from '../../../assets/images/controls-create.png';
import ControlsDomain from '../../../assets/images/controls-domain.png';
import ControlsOptimised from '../../../assets/images/controls-optimized.png';
import ControlsSecure from '../../../assets/images/controls-secure.png';
import { ThemeConstants } from '@platformx/utilities';
import { HorizontalLine } from '../HorizontalLine';

export const Controls = () => {
  return (
    <Box
      p={4}
      sx={{
        backgroundColor: ThemeConstants.LIGHT_BG_COLOR,
        textAlign: 'center',
      }}
    >
      <Typography variant="h3regular" color="primary.main" mt={4}>
        Deliver digital experiences like never before
      </Typography>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <HorizontalLine />
      </Box>
      <Box sx={{ mt: 3, mb: 3 }}>
        <Button className="buttonclick" variant="contained">
          Know More
        </Button>
      </Box>
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={3}>
          <img src={ControlsOptimised} />
          <Typography variant="h4regular" sx={{ height: '60px' }}>
            Content Publishing
          </Typography>
          <Typography
            variant="p4regular"
            pt={2}
            sx={{
              width: '80%',
              margin: 'auto',
              color: ThemeConstants.LIGHT_GREY_COLOR,
            }}
          >
            Single Platform for all your Content Publishing needs.
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <img src={ControlsDomain} />
          <Typography
            variant="h4regular"
            sx={{ height: { xs: '60px', md: '110px', lg: '60px' } }}
          >
            Drive Engagement, Loyalty, Monetization
          </Typography>
          <Typography
            variant="p4regular"
            pt={2}
            sx={{
              width: '80%',
              margin: 'auto',
              color: ThemeConstants.LIGHT_GREY_COLOR,
            }}
          >
            Drive personalized experiences for your business goals.
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <img src={ControlsCreate} />
          <Typography variant="h4regular" sx={{ height: '60px' }}>
            Own Data & Insights
          </Typography>
          <Typography
            variant="p4regular"
            pt={2}
            sx={{
              width: '80%',
              margin: 'auto',
              color: ThemeConstants.LIGHT_GREY_COLOR,
            }}
          >
            X is your own ‘owned and operated’ Platform. Know your users like
            never before.
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <img src={ControlsSecure} />
          <Typography variant="h4regular" sx={{ height: '60px' }}>
            Optimized for scale
          </Typography>
          <Typography
            variant="p4regular"
            pt={2}
            sx={{
              width: '80%',
              margin: 'auto',
              color: ThemeConstants.LIGHT_GREY_COLOR,
            }}
          >
            Designed for scale, modular to fit your needs. Try for a small
            user-base and then scale to millions of users.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
