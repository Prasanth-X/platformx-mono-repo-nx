import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../../service/i18n";
import CouponPopup from "../../../CouponPopup/CouponPopup";
import "./Coupon.css";
import { useCustomStyle } from "./Coupon.style";

const Coupon = () => {
  const classes = useCustomStyle();
  const [showCoupon, setShowCoupon] = useState(false);
  const { t } = useTranslation();
  const handleClick = () => {
    setShowCoupon(true);
  };
  const handleClickClose = () => {
    setShowCoupon(false);
  };

  return (
    <Box className={`ecom-coupon-code ${classes.ecomCoupanCodeWrapper} ecomCoupanCode`}>
      <Typography
        variant='p3semibold'
        className='coupon-code-text'
        color='tertiaryTitle'
        onClick={handleClick}>
        {`${t("have_a_coupon_code")}?`}
      </Typography>
      {showCoupon && (
        <Box className='coupon-box' mt={1} gap={1}>
          <CouponPopup handleClickClose={handleClickClose} />
        </Box>
      )}
    </Box>
  );
};

export default Coupon;
