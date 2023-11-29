import { Dialog } from '@mui/material';
import { Box, styled } from '@mui/system';

export const DialogContainer = styled(Dialog)((props) => ({
  [props.theme.breakpoints.up('sm')]: {
    display: 'none',
  },
  '.Platform-x-Dialog-paper': {
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    borderRadius: '10px 10px 0 0',
    margin: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

export const FilterContainer = styled(Box)((props) => ({
  margin: '0 0 20px 0',
  '.form_Control': {
    width: '100%',
    '.form_Control_radio': {
      display: 'none',
      '& + span': {
        fontSize: '16px',
      },
    },
    label: {
      margin: '0 !important',
      padding: '5px 20px',
      '&:has(> span.Mui-checked)': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        fontWeight: '500',
      },
    },
  },
}));
