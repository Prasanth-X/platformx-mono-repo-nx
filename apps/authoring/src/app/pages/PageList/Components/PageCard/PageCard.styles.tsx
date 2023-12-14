import { Card } from '@mui/material';
import { styled } from '@material-ui/core';
import { ThemeConstants } from '@platformx/utilities';

export const BaseCard = styled(Card)({
  boxShadow: '0 0 2px 0 rgba(115, 114, 114, 0.14)',
  border: 'solid 1px rgba(112, 112, 112, 0.1)',
  backgroundColor: ThemeConstants.WHITE_COLOR,
  borderRadius: '5px',
  color: 'rgba(0, 0, 0, 0.87)',
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  height: '100%',
  display: 'flex',
});
