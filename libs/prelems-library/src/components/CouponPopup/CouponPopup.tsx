import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Divider, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import React, { useState } from "react";
import CouponBox from "./CouponBox";
import "./CouponPopup.css";
import { useCustomStyle } from "./CouponPopup.styles";
import defaultProps from "./Data.json";
import TextBox from "./TextBox";

function CouponPopup({ handleClickClose }: CouponProps) {
  const [open] = useState(true);
  const classes = useCustomStyle();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClickClose}
        fullWidth
        sx={{
          ".Platform-x-Dialog-paper": {
            maxWidth: { xs: "100%", sm: "50%", em: "33%" },
            minWidth: { xs: "100%", sm: "50%", em: "33%" },
            width: { xs: "100%", sm: "50%", em: "33%" },
            backgroundColor: "white",
            maxHeight: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            right: 0,
            boxShadow: "none",
            margin: "0px",
            borderRadius: "0px",
          },
        }}>
        <DialogContent className={`${classes.mainDivCouponPopup} mainDivPopup`}>
          {/* Content of your popup */}
          <Box className='ApplyCouponMainBox'>
            <Box className='ApplyCouponBox'>
              <Typography className='TypographyApplyCouponBox' variant='h3semibold'>
                Apply Coupon
              </Typography>
              <Box className='BoxCursorPointer' onClick={handleClickClose}>
                <CloseIcon />
              </Box>
            </Box>
            <Box className='Textbox'>
              <Box className='TextFieldbox'>
                <TextBox placeholder={"Enter coupon code"} />
              </Box>

              <Box>
                <Button variant='primaryButton1'>Apply</Button>
              </Box>
            </Box>
            <Divider className='dividerColor' />
            <Box
              className='scrollright'
              sx={{
                maxHeight: { xs: "558px", sm: "772px", em: "310px" },
                minHeight: { xs: "558px", sm: "772px", em: "310px" },
              }}>
              {defaultProps.map((item: any, key: any) => {
                return (
                  <CouponBox
                    key={key}
                    CouponCode={item.CouponCode}
                    Title={item.Title}
                    Description={item.Description}
                    Description2={item.Description2}
                    Expiry={item.Expiry}
                  />
                );
              })}
            </Box>
          </Box>

          {/* bottom section */}
          <Divider />
          <Box className='BoxMaximumSavings'>
            <Box>
              <Typography className='TypographyMarginZero' variant='h6medium'>
                Maximum savings
              </Typography>
              <Typography className='TopBottomMarginZero' variant='p2semibold'>
                $299.00
              </Typography>
            </Box>
            <Button variant='primaryButton1'>Apply</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface CouponProps {
  handleClickClose: () => void;
}

export default CouponPopup;
