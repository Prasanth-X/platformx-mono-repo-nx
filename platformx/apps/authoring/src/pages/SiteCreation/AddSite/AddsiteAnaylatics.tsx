import { Grid, Box, Typography, Select, MenuItem } from '@mui/material';
import { t } from 'i18next';
import { Fragment, useState } from 'react';
import CookieTextBox from '../../SiteSetting/CookieSetting/CookieTextBox';
const AddsiteAnalytics = () => {
  
 
  return (
    <>
      <Box>
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '20px',
            lineHeight: '24px',
            color: '#14142B',
          }}
          marginTop={5}
        >
          {t("what_is_analytcis")}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '22px',
            color: '#14142B',
          }}
          marginTop={2}
        >
          {t("Analytics_description")}
        </Typography>
       
      </Box>
    </>
  );
};

export default AddsiteAnalytics;
