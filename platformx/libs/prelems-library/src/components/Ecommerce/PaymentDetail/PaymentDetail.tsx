/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useTheme from '@mui/material/styles/useTheme';
import Coupon from '../ShippingDetails/Coupon/Coupon';
import './../ShippingDetails/ShippingDetails.css';
import './PaymentDetail.css';
import SuccessIcon from 'assets/success.gif';
import DeleteIcon from 'assets/delete.gif';

// import CartItems from "../ShippingAddress/CartItems/CartItems";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import RadioGroupItems from 'Common/RadioButton/RadioGroupItems';
import Shipping from '../Cart/SharedComponent/Shipping';
import ShippingAddress from '../ShippingDetails/ShippingAddress/ShippingAddress';
import SubTotal from '../ShippingDetails/SubTotal/SubTotal';
import { useCustomStyle } from './PaymentDetail.style';
// import AddessPreview from "../ShippingDetails/AddessPreview/AddessPreview";
import { ChevronLeft } from '@mui/icons-material';
import ToastContainerHandle from 'Common/ToastContainer/ToastContainerHandle';
import ToastService from 'Common/ToastContainer/ToastService';
import 'service/i18n';
import {
  inputEmptyFieldValidate,
  inputNonEmptyFieldValidate,
  nullToObject,
} from 'utils/helperFns';
import Confirmation from '../Common/Confirmation/Confirmation';
import {
  ecomCartIdBasedGetItem,
  placeOrder,
  addPaymentMethod,
} from '../ProductListing/helper';
import {
  inStateList,
  usStateList,
} from '../ShippingDetails/ShippingAddress/helperAddress';
import { proceedToBillingAddress } from './helper';
import ProductLoader from '../ProductListing/ProductLoader';

type PaymentDetailProps = {
  secondaryArgs: any;
  cartCountUpdate: any;
  enableLogin?: boolean;
  takeToLoginPage: (e?: any) => void;
};

const PaymentDetail = ({
  secondaryArgs,
  enableLogin = false,
  cartCountUpdate = () => {},
  takeToLoginPage = () => {},
}: PaymentDetailProps) => {
  const browserUrl = window.location.href;
  const classes = useCustomStyle();
  const theme = useTheme();
  const [shipType] = useState('freeShipping');
  const [confirm, setConfirm] = useState(false);
  const [loginPopUp, set_loginPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const orderId = useRef('NA');
  const rewardPoint = useRef('');
  const { t, i18n } = useTranslation();
  const userId = localStorage.getItem('userId');

  const arrBilling = [
    {
      name: t('same_as_shipping_address'),
      value: 'Same as shipping address',
      disabled: false,
    },
    {
      name: t('use_a_different_billing_address'),
      value: 'Use a different billing address',
      disabled: false,
    },
  ];

  const arrPayment = [
    {
      name: t('cash_on_delivery'),
      value: 'COD',
    },
    {
      name: t('debit_card_and_credit_card'),
      value: 'CARD',
      disabled: true,
    },
    {
      name: `UPI ${t('ie')}: Paytm, Google pe, Phone Pe, Bhim UPI`,
      value: 'UPI',
      disabled: true,
    },
    {
      name: t('netbanking'),
      value: 'NETBANKING',
      disabled: true,
    },
    {
      name: 'PayPal',
      value: 'PAYPAL',
      disabled: true,
    },
  ];

  const [isSecondryAddres, setIsSecondryAddres] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [addedCartDetails, setAddedCartDetails] = useState<any>({});
  const [stateArray, setStateArray] = useState(usStateList);
  const [billingAddress, setBillingAddress] = useState<any>({
    city: '',
    email: '',
    address: '',
    landmark: '',
    lastName: '',
    country: 'US',
    firstName: '',
    alterNumber: '',
    contactNumber: '',
    state: usStateList[0].name,
  });
  const [stateErrorManage, setStateErrorManage] = useState<any>({
    addressError: '',
    firstNameError: '',
    contactNumberError: '',
  });

  const onChange = (event: any) => {
    const { target: { name = '', value = '' } = {} } = event;
    const newObj = {
      ...billingAddress,
      [name]: value,
    };
    setBillingAddress(newObj);
  };

  /**
   * error msg update
   */
  const errorMsgUpdate = () => {
    return {
      ...stateErrorManage,
      addressError: billingAddress.address
        ? ''
        : `${t('address')} ${t('is_mandatory')}`,
      firstNameError: billingAddress.firstName
        ? ''
        : `${t('first_name')} ${t('is_mandatory')}`,
      contactNumberError: billingAddress.contactNumber
        ? ''
        : `${t('contact_no')} ${t('is_mandatory')}`,
    };
  };

  const handleChange1 = (e: any) => {
    const { target: { value = '' } = {} } = e;
    setStateArray(value === 'India' ? inStateList : usStateList);
    const newObj = {
      ...billingAddress,
      state: value === 'India' ? inStateList[0].name : usStateList[0].name,
      country: value,
    };
    setBillingAddress(newObj);
  };

  /**
   * cardId based get full add to card details
   * @param cartId string
   */
  const getCartIdUsedFullAddedItem = async (cartId: string | number) => {
    const response = await ecomCartIdBasedGetItem({
      cartId: cartId,
      secondaryArgs: secondaryArgs,
    });
    const {
      data: {
        data: { getCartItems: { statusCode = 0, data = {} } = {} } = {},
      } = {},
    } = nullToObject(response);

    if (statusCode === 200) {
      setAddedCartDetails(data);
      cartCountUpdate(data);
    } else {
      setAddedCartDetails({});
      cartCountUpdate(null);
    }
  };

  const onContinueToPayment = async (details: any) => {
    const cartId = localStorage.getItem('ecommerceCartId');
    if (!cartId) return;
    if (checked) {
      setLoading(true);
      const addedbillingAddressresponse = await proceedToBillingAddress({
        secondaryArgs,
        newObj: {
          ...details,
          cartId: localStorage.getItem('ecommerceCartId'),
        },
      });
      setLoading(false);

      const {
        data: {
          data: { addProductToCart: addBillingAddressToCart = {} } = {},
        } = {},
      } = addedbillingAddressresponse;
      if (addBillingAddressToCart?.statusCode === 200) {
        setLoading(true);
        const response = await addPaymentMethod({ secondaryArgs, cartId });
        const {
          data: {
            data: { addProductToCart: { msg = '', statusCode = 0 } = {} } = {},
          } = {},
        } = response;
        setLoading(false);

        if (statusCode === 200) {
          const { total_price = '' } = nullToObject(addedCartDetails);
          const responseForPaymentMethod = await placeOrder({
            secondaryArgs,
            cartId,
            userId,
            total_price: '' + Math.round(total_price),
          });
          const {
            data: {
              data: {
                addProductToCart: {
                  msg: message = '',
                  statusCode: StatusCodeForPaymentMethodApi = 0,
                  order_number = '',
                  reward_data = {},
                } = {},
              } = {},
            } = {},
          } = responseForPaymentMethod;
          if (StatusCodeForPaymentMethodApi === 200) {
            rewardPoint.current = reward_data?.LoyaltydPoints || '';
            orderId.current = order_number;
            setConfirm(true);
            localStorage.removeItem('ecommerceCartId');
            cartCountUpdate(null); //cart count item empty
          } else {
            rewardPoint.current = '';
            orderId.current = 'NA';
            ToastService.failToast(message ? message : t('errorRequest'));
          }
        } else if (msg) {
          ToastService.failToast(msg);
        } else {
          ToastService.failToast(t('errorRequest'));
        }
      } else if (
        addBillingAddressToCart?.msg &&
        typeof addBillingAddressToCart?.msg === 'string'
      ) {
        ToastService.failToast(addBillingAddressToCart?.msg);
      } else {
        ToastService.failToast(t('errorRequest'));
      }
    } else {
      ToastService.failToast(
        `${t('please_agree_to_the')} ${t('terms_and_conditions')}.`
      );
    }
  };

  const validateInputs = () => {
    const inputEmptyValidate = inputEmptyFieldValidate({
      address: billingAddress.address,
      firstName: billingAddress.firstName,
      contactNumber: billingAddress.contactNumber,
    });
    if (inputEmptyValidate) {
      //empty validate
      const newObj = errorMsgUpdate();
      setStateErrorManage(newObj);
      const errorMsgValidate = inputNonEmptyFieldValidate({
        ...newObj,
      });
      if (errorMsgValidate) {
        //error msg need to be empty
        const billingAddressobj = {
          ...billingAddress,
          email: addedCartDetails?.shipping_address?.email
            ? addedCartDetails?.shipping_address?.email
            : '',
          additionalAddressInfoData:
            billingAddress?.landmark + ' ' + billingAddress?.alterNumber,
        };
        onContinueToPayment(billingAddressobj);
      }
    } else {
      setStateErrorManage(errorMsgUpdate());
    }
  };

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    const isChecked = event.target as HTMLInputElement;
    setChecked(isChecked.checked);
  };
  const getSelectedValue = (value: any) => {
    arrBilling[1]?.value === value
      ? setIsSecondryAddres(true)
      : setIsSecondryAddres(false);
  };

  const handleClose = () => {
    window.location.href = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/ecommerce/product-listing`;
    setConfirm(false);
  };

  /**
   * passing cart details to user experiance
   * @param cartId string
   */
  const cartItemDetails = async (cartId = '') => {
    const response = await ecomCartIdBasedGetItem({
      cartId: cartId,
      secondaryArgs: secondaryArgs,
    });
    const {
      data: {
        data: { getCartItems: { statusCode = 0, data = {} } = {} } = {},
      } = {},
    } = nullToObject(response);

    if (statusCode === 200) {
      cartCountUpdate(data);
    } else {
      cartCountUpdate(null);
    }
  };

  useEffect(() => {
    const getCartIdFromLocal = localStorage.getItem('ecommerceCartId');
    if (getCartIdFromLocal) {
      cartItemDetails(getCartIdFromLocal);
    } else {
      cartCountUpdate(null);
    }
    if (typeof window !== 'undefined') {
      i18n.changeLanguage(secondaryArgs?.prelemBaseEndpoint?.language);
      // i18n.changeLanguage(url.pathname.split("/")[1]);
    }
  }, []);

  // const backToShaoping = () => {
  //   window.location.href = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/ecommerce/product-listing`;
  // };

  const goBack = () => {
    window.location.href = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/ecommerce/shipping`;
  };

  const skipUserLoginProcess = () => {
    if (!isSecondryAddres) {
      const billingAddressobj = {
        firstName: addedCartDetails?.shipping_address?.title
          ? addedCartDetails?.shipping_address?.title
          : '',
        lastName: addedCartDetails?.shipping_address?.last_name
          ? addedCartDetails?.shipping_address?.last_name
          : '',
        address: addedCartDetails?.shipping_address?.street_name
          ? addedCartDetails?.shipping_address?.street_name
          : '',
        pincode: addedCartDetails?.shipping_address?.postal_code
          ? addedCartDetails?.shipping_address?.postal_code
          : '',
        email: addedCartDetails?.shipping_address?.email
          ? addedCartDetails?.shipping_address?.email
          : '',
        contactNumber: addedCartDetails?.shipping_address?.mobile
          ? addedCartDetails?.shipping_address?.mobile
          : '',
        city: addedCartDetails?.shipping_address?.city
          ? addedCartDetails?.shipping_address?.city
          : '',
        state: addedCartDetails?.shipping_address?.state
          ? addedCartDetails?.shipping_address?.state
          : '',
        country: addedCartDetails?.shipping_address?.country
          ? addedCartDetails?.shipping_address?.country
          : '',
        additionalAddressInfoData: addedCartDetails?.shipping_address
          ?.additional_address_info
          ? addedCartDetails?.shipping_address?.additional_address_info
          : '',
      };
      onContinueToPayment(billingAddressobj);
    } else {
      validateInputs();
    }
  };

  const onClickOfContinuetoPayment = () => {
    if (enableLogin && !userId?.length) {
      set_loginPopUp(true);
    } else {
      set_loginPopUp(false);
      skipUserLoginProcess();
    }
  };

  /**
   *login warning popUp close
   */
  const handleCloseLoginPopUp = () => {
    set_loginPopUp(false);
    skipUserLoginProcess();
  };

  useEffect(() => {
    const getCartIdFromLocal = localStorage.getItem('ecommerceCartId');
    if (getCartIdFromLocal) {
      getCartIdUsedFullAddedItem(getCartIdFromLocal);
    } else {
      cartCountUpdate(null);
    }
  }, []);

  const confirmationLoyalty =
    userId && rewardPoint
      ? `You are rewarded with ${rewardPoint.current} loyalty points`
      : '';

  const confimationMessage = `Your order has been placed successfully, your order number is ${orderId.current}. ${confirmationLoyalty}`;

  return (
    <Box
      className={`prelem-py ${classes.paymentDetailSectionWrapper} paymentDetailSelection`}
    >
      <Container className="grid_container">
        <>{loading ? <ProductLoader /> : null}</>
        <ToastContainerHandle />
        <Grid
          container
          className="shipping-address-wrapper shipping-detail-wrapper"
        >
          <Grid item xs={12} sm={12} md={12} em={7} lg={8} xl={8}>
            <Box className={`shipping-address-wrapper-left boxWrapper`}>
              {/* {Address Detail} */}
              {/* <AddessPreview billingAddress={{}} /> */}

              {/* {Billing address} */}
              <Typography variant="h4bold" id="billing-radio-group">
                {t('billing_address')}
              </Typography>
              <Box
                className={`payment-detail-section paymentDetail ${
                  isSecondryAddres ? 'same-address' : ''
                }`}
              >
                <Box className="radio-wrapper">
                  <RadioGroupItems
                    arrData={arrBilling}
                    groupName="billing-radio-group"
                    name="billing-radio-group"
                    sepratorLine={true}
                    getSelectedValue={getSelectedValue}
                  />
                </Box>
                {isSecondryAddres && (
                  <ShippingAddress
                    stateArray={stateArray}
                    handleChange={onChange}
                    stateManage={billingAddress}
                    secondaryArgs={secondaryArgs}
                    handleChange1={handleChange1}
                    stateErrorManage={stateErrorManage}
                    showBottomPanel={false}
                  />
                )}
              </Box>

              {/* {Payment Methods} */}
              <Typography variant="h4bold">{t('payment_methods')}</Typography>
              <Box className={`payment-detail-section paymentDetail`}>
                <Box className="radio-wrapper">
                  <RadioGroupItems
                    arrData={arrPayment}
                    groupName="payment-radio-group"
                    sepratorLine={true}
                    getSelectedValue={getSelectedValue}
                  />
                </Box>
              </Box>

              {/* {Term condition} */}
              <Box>
                <Typography variant="p4regular">
                  {t('user_consent_to_process_order')}
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      sx={{
                        '& svg': {
                          fill: theme.palette.prelemType1.CHECKBOX.BOX_COLOR,
                        },
                      }}
                    />
                  }
                  checked={checked}
                  onChange={handleChange}
                  label={
                    <Typography variant="p4regular">
                      {`${t('i_have_read_and_agree')} `}
                      <Link
                        href={`${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/ecommercetermsandconditions`}
                        target="_blank"
                        color="primaryAnchorLink"
                        rel="noopener noreferrer"
                      >
                        {t('terms_and_conditions')}
                      </Link>
                      *
                    </Typography>
                  }
                />
              </Box>
              <Box mb={3} className="bottom-button-text-wrapper">
                <Button
                  type="button"
                  startIcon={<ChevronLeft />}
                  variant="ecommerceLinkButton1"
                  disableRipple
                  onClick={() => goBack()}
                  className="linkBtn"
                >
                  {t('return_to_shipping')}
                </Button>
                <Button
                  type="button"
                  onClick={onClickOfContinuetoPayment}
                  variant="primaryButton1"
                >
                  {t('continue_to_payment')}
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            em={5}
            lg={4}
            xl={4}
            className="paymentDetailRightSidebarwrapper"
          >
            <Box className="shipping-address-wrapper-right">
              <Box className={`right-section  addressWrapperBg`}>
                <Coupon />
                <Shipping shipType={shipType} />
                <SubTotal secondaryArgs={secondaryArgs} />
              </Box>
            </Box>
          </Grid>

          {confirm && (
            <Confirmation
              open={true}
              img={SuccessIcon}
              handleClose={handleClose}
              text={confimationMessage}
              title={t('order_placed')}
            />
          )}

          {enableLogin && loginPopUp && (
            <Confirmation
              open={true}
              img={DeleteIcon}
              title={t('Warning')}
              buttonOne={'Continue'}
              buttonTwo={'Take me to Login'}
              handleClose={handleCloseLoginPopUp}
              buttonOneFunc={handleCloseLoginPopUp}
              buttonTwoFunc={() => takeToLoginPage(browserUrl)}
              text={t('Please login to gain loyalty points.')}
            />
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default PaymentDetail;
