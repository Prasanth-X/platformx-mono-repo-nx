import { Box, Button, DialogActions, DialogContent } from '@mui/material'
import { styled } from '@mui/styles'

export const XDialogContent = styled(DialogContent)({
  textAlign: 'center',
  padding: '10px 20px',
  maxWidth: 700,
  margin: 'auto',
})

export const XDialogActions = styled(DialogActions)({
  display: 'flex',
  justifyContent: 'center',
  margin: '61px 0 74px',
  paddingBottom: '30px',
})

export const XDialogImageContainer = styled(Box)({
  textAlign: 'center',
  color: '#fd0c0d',
  margin: '71px 0 4px',
})

type DialogButtonPros = {
  loading?: boolean
  startIcon: ''
}

export const XDialogButton = ({
  variant = 'contained',
  startIcon = '',
  ...rest
}: any & DialogButtonPros) => (
  <Button startIcon={startIcon} variant={variant} {...rest} />
)
