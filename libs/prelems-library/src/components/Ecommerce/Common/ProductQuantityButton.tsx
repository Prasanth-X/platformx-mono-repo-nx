import React, { useState } from "react";
import { Button, ButtonGroup, Typography } from "@mui/material";
import "./ProductQuantityButton.css";
import { useCustomStyle } from "./ProductQuantityButton.style";

const ProductQuantityButton = () => {
  const classes = useCustomStyle();
  const [count, setCount] = useState(0);
  const increaseQuantity = () => {
    setCount(count + 1);
  };
  const decreaseQuantity = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <ButtonGroup
      size='small'
      className={`product-cart-counter-wrapper ${classes.productCartWrapper} productCartWrapperbutton`}>
      <Button
        variant='transparent'
        className={`decrease-wrapper buttonHover`}
        onClick={decreaseQuantity}>
        <Typography variant='p2regular'>-</Typography>
      </Button>
      <Button className={`counter-val buttonHover1`}>
        <Typography variant='p3bold'>{count > 0 ? count : 0}</Typography>
      </Button>
      <Button className={`increase-wrapper buttonHover`} onClick={increaseQuantity}>
        <Typography variant='p2regular'>+</Typography>
      </Button>
    </ButtonGroup>
  );
};

export default ProductQuantityButton;
