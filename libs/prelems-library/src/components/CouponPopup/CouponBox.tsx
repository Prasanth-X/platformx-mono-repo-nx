import CircleIcon from "@mui/icons-material/Circle";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { CouponProps } from "./Coupon.Types";

const CouponBox = ({ CouponCode, Title, Description, Description2, Expiry }: CouponProps) => {
  return (
    <>
      <Box className='TextboxExtra'>
        <Box className='TextboxExtraPadding'>
          <Box className='BoxOtherCoupon'>
            <CircleIcon className='CircleIconStyle' />

            <Typography className='TypograpgyDivOtherCoupon' variant='h5medium'>
              {CouponCode}
            </Typography>
          </Box>
          <Divider className='dividerColor' />
          <Box>
            <Typography className='TypograpgySave' variant='h5medium'>
              {Title}
            </Typography>
            <Typography className='TypograpgyOffOnMin' variant='h6regular'>
              {Description}
            </Typography>
            <Box className='BoxTypograpgyExpiryAndDate'>
              <Box>
                <Typography className='OtherCouponsTypograpgyExpiry' variant='h7regular'>
                  Expiry:
                </Typography>
              </Box>
              <Box>
                <Typography className='OtherCouponTypograpgyDate' variant='h7semibold'>
                  {Expiry}
                </Typography>
              </Box>
            </Box>

            {Description2 ? (
              <>
                <Divider className='dividerColor' />
                <Typography variant='p4regular' className='TypographyMarginTop'>
                  {/* Shop for $200 more to apply. */}
                  {Description2}
                </Typography>
              </>
            ) : null}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CouponBox;
