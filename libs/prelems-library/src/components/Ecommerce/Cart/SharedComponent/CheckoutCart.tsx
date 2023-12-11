import React from "react";
import { Box, Typography, Button } from "@mui/material";
import "./CartTotal.css";
import { useTranslation } from "react-i18next";
import "../../../../service/i18n";
import { useCustomStyle } from "./CheckoutCart.style";

const CheckoutCart = () => {
  const { t } = useTranslation();
  const classes = useCustomStyle();

  return (
    <Box className='bottom-action-button-cart'>
      <Box className={`subtotal-text ${classes.subtotalBorder} checkOutBorder`}>
        <Typography variant='p3medium'>{`${t("subtotal")}:`}</Typography>
        <Typography variant='p3medium'>$299.00</Typography>
      </Box>
      <Button variant='secondaryButton1' className='white-viewcart-button'>
        {t("view_cart")}
      </Button>
      <Button variant='primaryButton1' className='black-checkout-button'>
        {t("checkout")}
      </Button>
    </Box>
  );
};
export default CheckoutCart;
