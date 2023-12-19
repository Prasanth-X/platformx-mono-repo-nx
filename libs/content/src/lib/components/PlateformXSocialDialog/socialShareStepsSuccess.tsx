import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import successGif from '../../assets/images/success.gif';

const SocialShareStepSuccess = ({ selectedTitle }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Box>
      <Grid>
        {/* <Grid item xs={6}></Grid> */}
        <Grid item xs={12}>
          <Box
            sx={{
              textAlign: 'center',
              padding: '50px',
            }}
          >
            <Box>
              <img src={successGif} alt="Success" />
            </Box>
            <Box>
              <Typography variant="h3medium">
                {`“${selectedTitle}” Has been`}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h3medium">
                Scheduled Successfully.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h3medium">on</Typography>
            </Box>
            <Box>
              <FacebookIcon
                sx={{
                  fontSize: '54px',
                }}
              />
              <LinkedInIcon
                sx={{
                  fontSize: '54px',
                }}
              />
            </Box>
            <Box>
              <Button variant="outlined" sx={{ marginRight: '20px' }}>
                Edit
              </Button>
              <Button variant="contained">View</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default SocialShareStepSuccess;
