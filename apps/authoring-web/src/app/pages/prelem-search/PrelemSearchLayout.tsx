import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import contactImgp1 from '../../assets/Contact.png';
import contactImgp2 from '../../assets/contactUs.png';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath: contactImgp1,
  },
  {
    label: 'Bird',
    imgPath: contactImgp2,
  },
  {
    label: 'Bali, Indonesia',
    imgPath: contactImgp1,
  },
  {
    label: 'Goč, Serbia',
    imgPath: contactImgp2,
  },
];

const PrelemSearchLayout = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };
  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) =>
          (<div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component='img'
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>)
        )}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position='static'
        activeStep={activeStep}
        nextButton={
          <Button
            size='small'
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ?
              <KeyboardArrowLeft />
             :
              <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ?
              <KeyboardArrowRight />
             :
              <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default PrelemSearchLayout;
