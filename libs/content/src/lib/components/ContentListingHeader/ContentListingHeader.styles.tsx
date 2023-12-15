import { Box, FormControlLabel } from '@mui/material';
import { styled } from '@material-ui/core';

export const ContentListingHeaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  margin: 15,
});
export const FormControlCustom = styled(FormControlLabel)({
  margin: '5px 0 !important',
});
