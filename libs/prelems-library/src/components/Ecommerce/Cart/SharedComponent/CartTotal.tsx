import React, { useState } from 'react';
import './CartTotal.css';
import Shipping from './Shipping';
import { nullToObject } from '../lib/utils/helperFns';
import { Box, Typography, Button, Divider } from '@mui/material';
import ActualPrice from '../../ProductDetail/SharedComponents/ActualPrice';
import { lineItemsOutOfStockCheck } from '../helper';
import ToastService from '../../../../Common/ToastContainer/ToastService';
import ToastContainerHandle from '../../../../Common/ToastContainer/ToastContainerHandle';
import { useTranslation } from 'react-i18next';
import '../../../../service/i18n';
import { useCustomStyle } from './CartTotal.style';

const CartTotal = (_props: any) => {
  const classes = useCustomStyle();
  const {
    addedCartDetails = {},
    secondaryArgs,
    refetchLoading = false,
  } = _props;
  const [shipType] = useState('freeShipping');
  const { total_price = 0, currency_code } = nullToObject(addedCartDetails);
  const { t } = useTranslation();
  const onCheckoutClick = () => {
    if (lineItemsOutOfStockCheck(addedCartDetails?.line_item)) {
      window.location.href = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/ecommerce/shipping`;
    } else {
      ToastService.failToast(t('out_of_stock_info'));
    }
  };

  return (
    <>
      <ToastContainerHandle />
      <Box className={`${classes.cartrightSideWrapper} cartRightSideBarBg`}>
        <Box className={`top-section sideBarTopSection`}>
          <Typography variant="h3bold" color="tertiaryTitle">{`${t('cart')} ${t(
            'total'
          )}`}</Typography>
          <Box className="top-section-ecom-wrapper" sx={{ display: 'flex' }}>
            <Typography
              variant="p3regular"
              color="tertiaryParagraph"
              className="subtotal"
            >
              {t('subtotal')}
            </Typography>

            <ActualPrice
              loading={refetchLoading}
              price={total_price}
              currency={currency_code}
              variant="p2semibold"
              color="tertiaryParagraph"
            />
          </Box>

          {/* shipping  */}
          <Shipping shipType={shipType} />

          {/* <Box className={classes.boxWrapper}>
            <Button variant="ecommerceLinkButton"> Add Address</Button>
          </Box> */}
        </Box>
        <Box className="bottom-bottom">
          <Divider className="divider" />
          <Box className="subTotalGap">
            <Typography
              variant="p3regular"
              color="tertiaryTitle"
              className="subtotal"
            >
              {`${t('total')}:`}
            </Typography>
            <ActualPrice
              loading={refetchLoading}
              price={total_price}
              currency={currency_code}
              variant="p2semibold"
              color="tertiaryParagraph"
            />
          </Box>
          <Box className="SidebarButtonWrapper">
            <Button
              variant="tertiaryButton1"
              className="buttonWrapperInner"
              onClick={onCheckoutClick}
              disabled={
                Object.keys(addedCartDetails).length === 0 ||
                addedCartDetails?.line_item?.length === 0
              }
            >
              {t('checkout')}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CartTotal;
