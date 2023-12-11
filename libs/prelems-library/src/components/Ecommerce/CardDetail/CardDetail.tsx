import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./../ShippingDetails/ShippingAddress/ShippingAddress.css";
import "./CardDetail.css";
import AddCard from "./AddCard/AddCard";
// import SavedCard from "./SavedCard/SavedCard";
import SubTotal from "../ShippingDetails/SubTotal/SubTotal";
import Confirmation from "../Common/Confirmation/Confirmation";
import "../../../service/i18n";
import { useCustomStyle } from "./CardDetail.style";
import SuccessIcon from "assets/success.gif";

const CardDetail = ({ secondaryArgs }: any) => {
  const classes = useCustomStyle();
  const { t } = useTranslation();

  const [confirm, setConfirm] = useState(false);

  const handleClose = () => {
    setConfirm(false);
  };

  const confirmOrder = () => {
    setConfirm(true);
  };

  return (
    <Box className={`${classes.rightSideCartblock} cardDetails cardDetailsBg`}>
      <Grid container className='shipping-address-wrapper card-detail-wrapper'>
        <Grid item xs={12} sm={12} md={12} em={7} lg={8} xl={8}>
          <Box className='shipping-address-wrapper-left'>
            <AddCard confirmOrder={confirmOrder}></AddCard>
            {/* <SavedCard /> */}
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12} em={5} lg={4} xl={4}>
          <Box className='shipping-address-wrapper-right'>
            <Box className={`right-section ${classes.rightSideCartblock} rightSideCartblockBg`}>
              <Typography variant='h3bold' color='tertiaryTitle' mb={2}>
                {t("your_cart")}
              </Typography>
              <Box className='product-name-price'>
                <Typography variant='p3semibold' color='tertiaryTitle' className='product-name'>
                  Galliano Donna Women Olsen Gem
                </Typography>
                <Typography
                  variant='p1semibold'
                  color='tertiaryParagraph'
                  className='product-price'>
                  <Typography variant='p4semibold' color='tertiaryParagraph' component={"span"}>
                    $
                  </Typography>
                  299.00
                </Typography>
              </Box>
              <SubTotal secondaryArgs={secondaryArgs} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {confirm && (
        <Confirmation
          open={true}
          img={SuccessIcon}
          handleClose={handleClose}
          text={t("order_success")}
          title={t("order_placed")}
        />
      )}
    </Box>
  );
};

export default CardDetail;
