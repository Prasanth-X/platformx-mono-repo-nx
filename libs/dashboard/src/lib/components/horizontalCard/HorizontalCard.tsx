import { Box, Typography } from '@mui/material';
import React, { memo } from 'react';
import './HorizontalCard.css';
import { useStyles } from './HorizontalCard.styles';

const HorizontalCard = ({ Title, Description, url, icon }: any) => {
  const classes = useStyles();
  const handelCardClick = () => {
    window.open(url, '_self');
  };
  return (
    <Box className='borderbox' onClick={handelCardClick}>
      <Box
        className={classes.backgroundIconImage}
        sx={{
          backgroundImage: `url(${icon})`,
        }}
      ></Box>
      <Box>
        <Box>
          <img src={icon} alt={Title} />
        </Box>
        <Typography component='div' variant='h5bold' className='title'>
          {Title}
        </Typography>
        <Typography
          component='div'
          variant='h6medium'
          className={classes.description}
        >
          {Description}
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(HorizontalCard);
