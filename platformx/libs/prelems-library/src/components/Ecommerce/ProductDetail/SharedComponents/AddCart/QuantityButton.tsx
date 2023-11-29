import React from "react";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { nullToObject } from "../../../../../utils/helperFns";
import { useCustomStyle } from "./QuantityButton.style";
import { useTranslation } from "react-i18next";
import "../../../../../service/i18n";

const QuantityButton = (_props: any) => {
  const { t } = useTranslation();
  const classes = useCustomStyle();
  const {
    cartQuantity = 0,
    addToQuantity = () => {},
    removeQuantity = () => {},
    loading = false,
    disabled = false,
  } = nullToObject(_props);

  return (
    <ButtonGroup size='small' className={`${classes.buttonWrapper} quantityButtonWrapper`}>
      <Typography variant='h3regular' className='quantityText'>
        {t("quantity")}
      </Typography>
      <Button
        variant='transparent'
        type='button'
        className='transparentBtnMinus'
        onClick={removeQuantity}
        disabled={loading || disabled}>
        -
      </Button>
      <Button variant='transparent' disabled={loading || disabled} className='transparentBtnValue'>
        {cartQuantity}
      </Button>
      <Button
        variant='transparent'
        type='button'
        onClick={addToQuantity}
        disabled={loading || disabled}
        className='transparentBtnPlus'>
        +
      </Button>
    </ButtonGroup>
  );
};

export default QuantityButton;
