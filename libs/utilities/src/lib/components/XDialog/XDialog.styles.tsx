import { styled, Box, Theme } from '@mui/system';
import { Button, DialogActions, DialogContent } from '@mui/material';

export const XDialogContent = styled(DialogContent)({
  textAlign: 'center',
  padding: '10px 20px',
  maxWidth: 700,
  margin: 'auto',
});

export const XDialogActions = styled(DialogActions)({
  display: 'flex',
  justifyContent: 'center',
  margin: '61px 0 74px',
  paddingBottom: '30px',
});

interface XDialogImageContainerProps {
  theme?: Theme;
}

export const XDialogImageContainer = styled(Box)<XDialogImageContainerProps>({
  textAlign: 'center',
  color: '#fd0c0d',
  margin: '71px 0 4px',
});

type DialogButtonPros = {
  loading?: boolean;
  startIcon: '';
};

export const XDialogButton = ({
  variant = 'contained',
  startIcon = '',
  ...rest
}: any & DialogButtonPros) => (
  <Button startIcon={startIcon} variant={variant} {...rest} />
)
