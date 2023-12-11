import React, { useState, useEffect } from "react";
import "./SubTotal.css";
import { Box, Typography } from "@mui/material";
import { nullToObject } from "utils/helperFns";
import { ecomCartIdBasedGetItem } from "../../ProductListing/helper";
import ActualPrice from "../../ProductDetail/SharedComponents/ActualPrice";
import { useTranslation } from "react-i18next";
import "service/i18n";
import { useCustomStyle } from "./SubTotal.style";

type ecomSubTotalProps = {
  secondaryArgs?: any;
};

const SubTotal = (_props: ecomSubTotalProps) => {
  const classes = useCustomStyle();
  const { secondaryArgs = {} } = _props;
  const [addedCartDetails, setAddedCartDetails] = useState({});
  const { total_price = "", currency_code = "" } = nullToObject(addedCartDetails);
  const { t } = useTranslation();

  /**
   * cardId based get full add to card details
   * @param cartId string
   */
  const getCartIdUsedFullAddedItem = async (cartId: string | number) => {
    const response = await ecomCartIdBasedGetItem({
      cartId: cartId,
      secondaryArgs: secondaryArgs,
    });
    const { data: { data: { getCartItems: { statusCode = 0, data = {} } = {} } = {} } = {} } =
      nullToObject(response);

    if (statusCode === 200) {
      setAddedCartDetails(data);
    } else {
      setAddedCartDetails({});
    }
  };

  useEffect(() => {
    const getCartIdFromLocal = localStorage.getItem("ecommerceCartId");
    if (getCartIdFromLocal) {
      getCartIdUsedFullAddedItem(getCartIdFromLocal);
    }
  }, []);

  return (
    <Box className={`cart-sub-total-section ${classes.subTotalwrapper} subTotalSection`}>
      <Box className='subtotal-row'>
        <Typography variant='p3regular' color='tertiaryParagraph'>{`${t("subtotal")}:`}</Typography>
        <ActualPrice
          variant='p3regular'
          price={total_price}
          currency={currency_code}
          color='tertiaryTitle'
        />
        {/* <Typography variant="p3regular">$ {sum}</Typography> */}
      </Box>
      <Box className='subtotal-row'>
        <Typography variant='p3regular' color='tertiaryParagraph'>{`${t("shipping")}:`}</Typography>
        <Typography variant='p3regular' color='tertiaryParagraph'>
          $ 0
        </Typography>
      </Box>
      <Box className='subtotal-row'>
        <Typography variant='p2semibold' color='tertiaryTitle'>{`${t("total")}:`}</Typography>
        <ActualPrice
          variant='p2semibold'
          price={total_price}
          currency={currency_code}
          color='tertiaryTitle'
        />
        {/* <Typography variant="p2semibold">$ {sum}</Typography> */}
      </Box>
    </Box>
  );
};

export default SubTotal;
