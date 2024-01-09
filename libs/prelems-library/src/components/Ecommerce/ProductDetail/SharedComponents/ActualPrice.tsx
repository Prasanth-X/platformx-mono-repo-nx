import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { currencyBasedIcon, formateNumber } from 'utils/helperFns'
import './ActualPrice.css'

const ActualPrice = ({
  price,
  currency,
  variant,
  className,
  style,
  loading = false,
  color,
}: any) => {
  return (
    <Box className={`ecom-actual-price ${loading ? 'skeletonLoad' : ''}`}>
      {!loading && (
        <Typography
          component="span"
          variant={variant ? variant : 'h2semibold'}
          color={color ? color : ''}
          sx={style}
          className={className ? className : ''}
        >
          {`${currencyBasedIcon(currency)} ${formateNumber(price)}`}
        </Typography>
      )}
    </Box>
  )
}

export default ActualPrice
