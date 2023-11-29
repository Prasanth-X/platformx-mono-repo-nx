import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, Typography } from "@mui/material";
import * as React from "react";
import CoinImage from "../../../../../assets/CoinImage.png";
import { useCustomStyle } from "./Popup.style";

export default function PopupDialog({ open, handleClose }: any) {
  const classes = useCustomStyle();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      sx={{
        ".Platform-x-Dialog-paper": {
          maxWidth: { xs: "100%", sm: "600px" },
          minWidth: { xs: "100%", sm: "600px" },
          width: { xs: "100%", sm: "600px" },
          margin: { xs: "0px" },
          bottom: { xs: 0 },
          borderBottomLeftRadius: { xs: 0, md: 4 },
          borderBottomRightRadius: { xs: 0, md: 4 },
        },
        textAlign: "center",
      }}>
      <Box className={`${classes.mainDivPopup} mainDiv`}>
        <Box className='closeIconCss' onClick={handleClose}>
          <CloseIcon />
        </Box>

        <Box className='secondBox'>
          <Box className='BoxCoinImage'>
            <img alt=' ' src={CoinImage} />
          </Box>
          <Box className='DivTypography1'>
            <Typography className='TypographyShopEarn' variant='p1bold'>
              Shop and Earn
            </Typography>
          </Box>
          <Box className='BoxMargin'>
            <Typography className='DivTypograpgyShop' variant='p3semibold'>
              Shop for $100 to Earn 10 Coins
            </Typography>
          </Box>
          <Box className='BoxBottonMargin'>
            <Typography className='TypograpgyDescription' variant='p3regular'>
              Max 200 Coins per order. Coins are credited after the return period is over for all
              the products in the order
            </Typography>
          </Box>
          <Box className='LastBox'>
            <Typography className='TypoLast' variant='p3regular'>
              Exchange Coins to get additional offers on shopping, food, travel and more
            </Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
