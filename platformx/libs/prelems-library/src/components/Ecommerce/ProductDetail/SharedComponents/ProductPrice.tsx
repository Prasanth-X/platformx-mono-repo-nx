import React from "react";
import Box from "@mui/material/Box";
import { nullToObject } from "../../../../utils/helperFns";
import SellPrice from "./SellPrice";
import ActualPrice from "./ActualPrice";
import { useCustomStyle } from "./ProductPrice.style";

const ProductPrice = (_props: any = {}) => {
  const classes = useCustomStyle();
  const { productFullDetails = {} } = nullToObject(_props);
  return (
    <Box className={classes.productPriceWrapper}>
      {productFullDetails?.ecomx_list_price !== productFullDetails?.ecomx_sale_price && (
        <SellPrice
          price={productFullDetails?.ecomx_list_price}
          currency={productFullDetails?.ecomx_currency_code}
          variant='h6regular'
          className={classes.sellPrice}
        />
      )}
      <ActualPrice
        price={productFullDetails?.ecomx_sale_price}
        currency={productFullDetails?.ecomx_currency_code}
        variant='p2semibold'
        className={classes.actualPrice}
      />
    </Box>
  );
};

export default ProductPrice;
