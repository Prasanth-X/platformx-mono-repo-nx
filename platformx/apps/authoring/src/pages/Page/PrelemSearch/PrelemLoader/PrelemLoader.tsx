import React from 'react';
import { Box, Typography } from '@mui/material';
import ChatGptCommonLoader from '../../../../assets/svg/ChatGptCommonLoader.gif';
import CircularProgress from '@mui/material/CircularProgress';
import { useStyles } from './PrelemLoader.Style';
import { useTranslation } from 'react-i18next';
import ThemeConstants from '../../../../theme/variable';

const PrelemLoader = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Box className={classes.LoaderMainBox}>
      <Box className={classes.ImageBox}>
        <Box>
          <img 
           src={ChatGptCommonLoader} />
        </Box>
      </Box>
    </Box>
  );
};

export default PrelemLoader;
