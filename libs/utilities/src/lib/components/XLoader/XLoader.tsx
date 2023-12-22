import React, { useState, useEffect } from 'react';
import { Backdrop, Box, CircularProgress, LinearProgress } from '@mui/material';
import { ThemeConstants } from '@platformx/utilities';
type XLoaderProps = {
  type: 'circular' | 'linear';
};
const XLoader = ({ type }: XLoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const renderProgress = () => {
    switch (type) {
      case 'circular':
        return (
          <CircularProgress
            style={{
              width: '40px',
              height: '40px',
              color: ThemeConstants.PRIMARY_MAIN_COLOR,
            }}
          />
        );
      case 'linear':
        return <LinearProgress variant="determinate" value={progress} />;
      default:
        return null;
    }
  };

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open
    >
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <Box
          sx={{
            width: '60px',
            height: '60px',
            padding: '10px',
            borderRadius: '7px',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          {renderProgress()}
        </Box>
      </Box>
    </Backdrop>
  );
};

export default XLoader;
