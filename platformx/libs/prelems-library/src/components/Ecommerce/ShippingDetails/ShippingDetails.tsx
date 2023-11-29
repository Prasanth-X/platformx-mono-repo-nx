import React, { useState, useEffect } from "react";
import "./ShippingDetails.css";
import EcomCoupon from "./Coupon/Coupon";
import SubTotal from "./SubTotal/SubTotal";
import { useTranslation } from "react-i18next";
// import CartItems from "./CartItems/CartItems";
import OrderNotes from "./OrderNotes/OrderNotes";
import Shipping from "../Cart/SharedComponent/Shipping";
import AddessPreview from "./AddessPreview/AddessPreview";
import ReturnCustomer from "./ReturnCustomer/ReturnCustomer";
import { Grid, Box, Button, Container } from "@mui/material";
import ShippingAddress from "./ShippingAddress/ShippingAddress";
import { ecomCartIdBasedGetItem, proceedToShippingAddress } from "../ProductListing/helper";
import ToastService from "../../../Common/ToastContainer/ToastService";
import ContactInformation from "./ContactInformation/ContactInformation";
import {
  emailValidate,
  inputEmptyFieldValidate,
  inputNonEmptyFieldValidate,
  nullToObject,
} from "../../../utils/helperFns";
import { ChevronLeft } from "@mui/icons-material";
import { inStateList, usStateList } from "./ShippingAddress/helperAddress";
import ToastContainerHandle from "../../../Common/ToastContainer/ToastContainerHandle";
import "../../../service/i18n";
import { useCustomStyle } from "./ShippingDetails.style";

type ShippingDetailsProps = {
  secondaryArgs: any;
  cartCountUpdate: any;
};

const ShippingDetails = ({
  secondaryArgs = {},
  cartCountUpdate = () => {},
}: ShippingDetailsProps) => {
  const { t, i18n } = useTranslation();
  const classes = useCustomStyle();
  const [shipType] = useState("freeShipping");
  const [stateArray, setStateArray] = useState(usStateList);
  const [preViewAddressToggle, setAPeViewAddressToggle] = useState(false);
  const [stateManage, setStateManage] = useState<any>({
    city: "",
    email: "",
    address: "",
    landmark: "",
    lastName: "",
    country: "US",
    firstName: "",
    alterNumber: "",
    contactNumber: "",
    state: usStateList[0].name,
  });

  const [stateErrorManage, setStateErrorManage] = useState<any>({
    emailError: "",
    addressError: "",
    firstNameError: "",
    contactNumberError: "",
  });

  const onChange = (event: any) => {
    const { target: { name = "", value = "" } = {} } = event;
    const newObj = {
      ...stateManage,
      [name]: value,
    };
    setStateManage(newObj);
  };

  /**
   * error msg update
   */
  const errorMsgUpdate = () => {
    return {
      ...stateErrorManage,
      addressError: stateManage.address ? "" : `${t("address")} ${t("is_mandatory")}`,
      firstNameError: stateManage.firstName ? "" : `${t("first_name")} ${t("is_mandatory")}`,
      contactNumberError: stateManage.contactNumber
        ? ""
        : `${t("contact_no")} ${t("is_mandatory")}`,
      emailError: stateManage.email
        ? !emailValidate(stateManage.email)
          ? `${t("email_id")} ${t("is_not_in_valid_format")}`
          : ""
        : `${t("email_id")} ${t("is_mandatory")}`,
    };
  };

  /**]
   * go to address and preview mode
   */
  const preViewAddress = () => {
    const inputEmptyValidate = inputEmptyFieldValidate({
      email: stateManage.email,
      address: stateManage.address,
      firstName: stateManage.firstName,
      contactNumber: stateManage.contactNumber,
    });

    if (stateManage.email) {
      //email validate
      if (inputEmptyValidate) {
        //empty validate
        const newObj = errorMsgUpdate();
        setStateErrorManage(newObj);
        const errorMsgValidate = inputNonEmptyFieldValidate({
          ...newObj,
        });

        if (errorMsgValidate) {
          //error msg need to be empty
          setAPeViewAddressToggle(!preViewAddressToggle);
        }
      } else {
        setStateErrorManage(errorMsgUpdate());
      }
    } else {
      setStateErrorManage(errorMsgUpdate());
    }
  };

  /**
   * go to payment page
   */
  const goToPayment = async () => {
    const res = await proceedToShippingAddress({
      secondaryArgs,
      newObj: {
        ...stateManage,
        cartId: localStorage.getItem("ecommerceCartId"),
      },
    });
    const { data: { data: { addProductToCart = {} } = {} } = {} } = nullToObject(res);
    const { statusCode = 0 } = nullToObject(addProductToCart);
    if (statusCode === 200) {
      window.location.href = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/ecommerce/payment`;
    } else {
      ToastService.failToast(t("errorRequest"));
    }
  };

  const handleChange1 = (e: any) => {
    const { target: { value = "" } = {} } = e;
    setStateArray(value === "India" ? inStateList : usStateList);
    const newObj = {
      ...stateManage,
      state: value === "India" ? inStateList[0].name : usStateList[0].name,
      country: value,
    };
    setStateManage(newObj);
  };

  /**
   * passing cart details to user experiance
   * @param cartId string
   */
  const cartItemDetails = async (cartId = "") => {
    const response = await ecomCartIdBasedGetItem({
      cartId: cartId,
      secondaryArgs: secondaryArgs,
    });

    const { data: { data: { getCartItems: { statusCode = 0, data = {} } = {} } = {} } = {} } =
      nullToObject(response);

    if (statusCode === 200) {
      cartCountUpdate(data);
    } else {
      cartCountUpdate(null);
    }
  };

  useEffect(() => {
    const getCartIdFromLocal = localStorage.getItem("ecommerceCartId");
    if (getCartIdFromLocal) {
      cartItemDetails(getCartIdFromLocal);
    } else {
      cartCountUpdate(null);
    }
    if (typeof window !== "undefined") {
      i18n.changeLanguage(secondaryArgs?.prelemBaseEndpoint?.language);
      // i18n.changeLanguage(url.pathname.split("/")[1]);
    }
  }, []);
  const userId = localStorage.getItem("userId");
  const userLoginDetails = localStorage.getItem("userLoginDetails");
  const isLoggedInUser = Boolean(userId && userLoginDetails);

  return (
    <Box
      className={`shipping-address-wrapper prelem-py ${classes.shippingDetailWrapper} shippingDetailPage`}>
      <Container className='grid_container'>
        <Grid container>
          <ToastContainerHandle />
          <Grid item xs={12} sm={12} md={12} em={7} lg={8} xl={8}>
            {!preViewAddressToggle ? (
              <>
                <Box className={`shipping-address-wrapper-left rightGap`}>
                  {!isLoggedInUser && (
                    <>
                      <Box className='return-customer-section'>
                        <ReturnCustomer />
                      </Box>
                      <Box className='contact-information-section' mb={1.5}>
                        <ContactInformation
                          handleChange={onChange}
                          stateManage={stateManage}
                          stateErrorManage={stateErrorManage}
                        />
                      </Box>
                    </>
                  )}

                  <Box className='address-section' mb={1.5}>
                    <ShippingAddress
                      showBottomPanel={true}
                      stateArray={stateArray}
                      handleChange={onChange}
                      stateManage={stateManage}
                      secondaryArgs={secondaryArgs}
                      handleChange1={handleChange1}
                      preViewAddress={preViewAddress}
                      stateErrorManage={stateErrorManage}
                    />
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Box className={`shipping-address-wrapper-left address-section rightGap1`}>
                  <AddessPreview stateManage={stateManage} preViewAddress={preViewAddress} />
                  <OrderNotes />
                  <Box className='bottom-button-text-wrapper textWrapper' mb={1}>
                    <Button
                      type='button'
                      startIcon={<ChevronLeft />}
                      variant='ecommerceLinkButton1'
                      disableRipple
                      onClick={() => preViewAddress()}
                      className='textProp'>
                      {t("return_to_information")}
                    </Button>
                    <Button onClick={goToPayment} type='button' variant='primaryButton1'>
                      {t("make_payment")}
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={12} em={5} lg={4} xl={4}>
            <Box className='shipping-address-wrapper-right'>
              <Box className='right-section rightSectionBg'>
                <EcomCoupon />
                <Shipping shipType={shipType} />
                <SubTotal secondaryArgs={secondaryArgs} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ShippingDetails;
