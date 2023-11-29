import React from "react";
import "./ShippingAddress.css";
import { ChevronLeft } from "@mui/icons-material";
import DropDown from "../../../../Common/DropDown/Dropdown";
import { Grid, Box, Typography, Button } from "@mui/material";
import { countryList } from "./helperAddress";
import StringOnBlurTextBox from "../../../../Common/TextBox/StringTextBoxComponent/StringOnBlurTextBox";
import { useTranslation } from "react-i18next";
import "../../../../service/i18n";
import { useCustomStyle } from "./ShippingAddress.style";

const ShippingAddress = (_props: any) => {
  const { t } = useTranslation();
  const classes = useCustomStyle();
  const {
    stateArray = [],
    showBottomPanel,
    stateManage = {},
    secondaryArgs = {},
    stateErrorManage = {},
    handleChange = () => {},
    preViewAddress = () => {},
    handleChange1 = () => {},
  } = _props;
  const { addressError = "", firstNameError = "", contactNumberError = "" } = stateErrorManage;

  const backToCart = () => {
    window.location.href = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/ecommerce/cart-list`;
  };

  return (
    <Box
      className={`address-section ${classes.shippingAdressSectionWrapper} shippingAdressSectionLeft`}>
      {showBottomPanel && <Typography variant='h4semibold'>{t("shipping_address")}</Typography>}
      <Box component='form' noValidate>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} em={6} className='text-wrapper'>
            <StringOnBlurTextBox
              maxLength={32}
              name='firstName'
              label={t("first_name")}
              handleChange={handleChange}
              errorMessage={firstNameError}
              value={stateManage.firstName}
              cssClass='input-control-textbox'
              customInPutAllowField={"CustomFirstName"}
            />
          </Grid>

          <Grid item xs={12} sm={12} em={6} className='text-wrapper'>
            <StringOnBlurTextBox
              name='lastName'
              label={t("last_name")}
              handleChange={handleChange}
              value={stateManage.lastName}
              cssClass='input-control-textbox'
              customInPutAllowField={"CustomFirstName"}
            />
          </Grid>

          <Grid item xs={12} sm={12} em={12} className='text-wrapper'>
            <StringOnBlurTextBox
              name='address'
              handleChange={handleChange}
              value={stateManage.address}
              cssClass='input-control-textbox'
              label={t("address")}
              errorMessage={addressError}
            />
          </Grid>

          <Grid item xs={12} sm={12} em={6} className='text-wrapper'>
            <StringOnBlurTextBox
              rows={3}
              name='city'
              label={t("town_city")}
              multiline={false}
              value={stateManage.city}
              handleChange={handleChange}
              cssClass='input-control-textbox'
            />
          </Grid>

          <Grid item xs={12} sm={12} em={6} className='text-wrapper'>
            <DropDown
              label={t("counrty")}
              name='Country'
              arrayData={countryList}
              parentHandler={handleChange1}
              stateValue={stateManage.country}
              cssClass='input-control-selectbox'
            />
          </Grid>

          <Grid item xs={12} sm={12} em={6} className='text-wrapper'>
            <StringOnBlurTextBox
              name='landmark'
              label={t("land_mark")}
              value={stateManage.landmark}
              handleChange={handleChange}
              cssClass='input-control-textbox'
            />
          </Grid>

          <Grid item xs={12} sm={12} em={6} className='text-wrapper'>
            <DropDown
              label={t("state")}
              name='state'
              arrayData={stateArray}
              parentHandler={handleChange}
              stateValue={stateManage.state}
              cssClass='input-control-selectbox'
            />
          </Grid>

          <Grid item xs={12} sm={12} em={6} className='text-wrapper'>
            <StringOnBlurTextBox
              maxLength={10}
              name='contactNumber'
              label={t("contact_no")}
              handleChange={handleChange}
              customInPutAllowField={"number"}
              cssClass='input-control-textbox'
              value={stateManage.contactNumber}
              errorMessage={contactNumberError}
            />
          </Grid>
          <Grid item xs={12} sm={12} em={6} className='text-wrapper'>
            <StringOnBlurTextBox
              maxLength={10}
              name='alterNumber'
              handleChange={handleChange}
              label={t("alternate_no")}
              cssClass='input-control-textbox'
              value={stateManage.alterNumber}
              customInPutAllowField={"number"}
            />
          </Grid>
        </Grid>

        {showBottomPanel && (
          <Box className={`bottom-button-text-wrapper textWrapperItem`}>
            <Button
              className={`center-align-item address transparentBg`}
              type='button'
              startIcon={<ChevronLeft />}
              variant='ecommerceLinkButton1'
              disableRipple
              onClick={() => backToCart()}>
              {t("return_to_cart")}
            </Button>
            <Button
              type='button'
              variant='primaryButton1'
              className='black-button'
              onClick={() => preViewAddress()}>
              {t("continue_to_shipping")}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ShippingAddress;
