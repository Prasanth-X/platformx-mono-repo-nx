import { makeStyles, styled } from '@material-ui/core';
import { Typography } from '@mui/material';

export const useAddSiteStyle = makeStyles((theme) => ({
  addSitePage: {
    maxWidth: '850px',
    margin: 'auto',
    padding: '0 15px',
  },
  typoBoxStyle: {
    overflowWrap: 'break-word',
  },
}));

export const ControlTitle = styled(Typography)((theme) => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '17px',
  color: ' #14142B',
}));

export const siteSettingPanelTitle = {
  fontSize: '16px',
  fontFamily: 'InterSemiBold',
  fontWeight: 600,
  color: '#14142B',
};

export const siteSettingPanelSubTitle = {
  fontSize: '12px',
  fontFamily: 'Inter',
};

export const siteSettingPanelCounterStyle = {
  fontSize: '30px',
  fontFamily: 'InterBold',
  fontWeight: 700,
};

export const textPlaceHolderStyle = {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '24px',
  color: '#6E7191',
};

export const textBoxStyle = {
  fontSize: '16px',
  fontFamily: 'Inter',
  fontWeight: '400',
};

export const typoBoxStyle = {};
