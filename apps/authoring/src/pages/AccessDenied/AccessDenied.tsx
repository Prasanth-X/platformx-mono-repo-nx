import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import { styled } from '@mui/system';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
import warningIcon from '../../assets/svg/warningIcon.svg';
import './AccessDenied.css';

const AccessDeniedBox = styled('div')({
  color: ThemeConstants.BLACK_COLOR_VARIANT1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'calc(100vh - 62px)',
});
const AccessDenied = () => {
  return (
    <>
      <AccessDeniedBox>
        <Box className="cardbox">
          <Box className="imageicon">
            <img src={warningIcon} alt="Access Denie Icon" />
          </Box>
          <Typography variant="h2medium" component="h2">
            Access Denied
          </Typography>
          <Typography variant="h5regular" component="p">
            You don’t have the permission to access this page. Please contact
            admin for better understanding
          </Typography>
        </Box>
      </AccessDeniedBox>
    </>
  );
};

export default AccessDenied;
