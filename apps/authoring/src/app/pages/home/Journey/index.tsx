import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { ThemeConstants } from '@platformx/utilities';
import { HorizontalLine } from '../HorizontalLine';

export const Journey = () => {
  return (
    <Box
      p={4}
      sx={{
        backgroundColor: ThemeConstants.LIGHT_BG_COLOR,
        textAlign: 'center',
      }}
    >
      <Typography variant="h3regular" color="primary.main" mt={4}>
        Drive your Direct-to-Consumer Business with X
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
      <Typography
        variant="p4regular"
        sx={{
          mx: 'auto',
          width: { lg: '35%', md: '35%', sm: '60%', xs: '60%' },
        }}
      >
        We’ve created X with enterprise business-users in mind. Come, dive in.
        Try X for your business.
      </Typography>
      <Box sx={{ mt: 3, mb: 3 }}>
        <Button className="buttonclick" variant="contained">
          Sign me up
        </Button>
      </Box>
    </Box>
  );
};
