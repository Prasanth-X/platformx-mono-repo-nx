import React from "react";
import { IconButton, Badge } from "@mui/material";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";

interface EcomHeaderProps {
  isCartIconEnable: boolean;
  isProductUpdateCount: any;
  navigateToCartPage: any;
}

const EcomHeader = (Props: EcomHeaderProps) => {
  const {
    isCartIconEnable = false,
    isProductUpdateCount = null,
    navigateToCartPage = () => {},
  } = Props;

  return (
    <>
      {isCartIconEnable && (
        <IconButton aria-label='cart' onClick={navigateToCartPage}>
          <Badge classes={{ badge: "customBadge" }} badgeContent={isProductUpdateCount || 0}>
            <ShoppingBasketOutlinedIcon />
          </Badge>
        </IconButton>
      )}
    </>
  );
};

export default EcomHeader;
