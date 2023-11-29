import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { currencyBasedIcon, formateNumber } from "../../../../utils/helperFns";
import "./ActualPrice.css";

const SellPrice = ({ price, currency, variant, className, style, loading = false }: any) => {
  return (
    <Box className={`ecom-sell-price ${loading ? "skeletonLoad" : ""}`}>
      {!loading && (
        <Typography
          component='span'
          variant={variant ? variant : "h6regular"}
          color='lightDarkText'
          sx={style}
          className={`sellprice ${className ? className : ""} `}>
          {currencyBasedIcon(currency)} {formateNumber(price)}
        </Typography>
      )}
    </Box>
  );
};

export default SellPrice;
