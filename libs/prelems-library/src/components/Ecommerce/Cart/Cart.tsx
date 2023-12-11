import React, { useEffect, useState } from 'react';
import { Grid, Button, Box, Container, Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { nullToObject } from 'lib/utils/helperFns';
import CartTotal from './SharedComponent/CartTotal';
import ShoppingList from './SharedComponent/ShoppingList';
import { ecomCartIdBasedGetItem } from '../ProductListing/helper';
import { useTranslation } from 'react-i18next';
import '../../../service/i18n';
import './Cart.css';
import { useCustomStyle } from './Cart.style';

const Cart = ({ secondaryArgs = {}, cartCountUpdate = () => {} }: any) => {
  const classes = useCustomStyle();
  const [addedCartDetails, setAddedCartDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [refetchLoading, setRefetchLoading] = useState(false);
  const { t, i18n } = useTranslation();
  /**
   * cardId based get full add to card details
   * @param cartId string
   */
  const getCartIdUsedFullAddedItem = async (
    cartId: string | number,
    refetch = false
  ) => {
    if (!refetch) {
      setLoading(true);
    }
    setRefetchLoading(true);
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
    }

    setRefetchLoading(false);
    if (!refetch) {
      setLoading(false);
    }
  };

  const backToShopping = () => {
    window.location.href = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/ecommerce/product-listing`;
  };

  useEffect(() => {
    const getCartIdFromLocal = localStorage.getItem('ecommerceCartId'); //passing to user experince
    if (getCartIdFromLocal) {
      getCartIdUsedFullAddedItem(getCartIdFromLocal);
    } else {
      cartCountUpdate(null);
    }
    if (typeof window !== 'undefined') {
      i18n.changeLanguage(secondaryArgs?.prelemBaseEndpoint?.language);
      // i18n.changeLanguage(url.pathname.split("/")[1]);
    }
  }, []);

  return (
    <Box
      className={`cart-product-list-wrapper prelem-py ${classes.cartDetailWrapper} cartDetailListPage`}
    >
      <Container className="grid_container">
        <Grid container xs={12} em={12}>
          <Grid item xs={12} md={12} em={8} lg={8.5} xl={9}>
            <ShoppingList
              secondaryArgs={secondaryArgs}
              loadCart={getCartIdUsedFullAddedItem}
              loading={loading}
              addedCartDetails={addedCartDetails}
              refetchLoading={refetchLoading}
            />
            <Box className={`button-wrapper buttonWrapper`}>
              <Button
                type="button"
                onClick={() => backToShopping()}
                startIcon={<ChevronLeft />}
                variant="ecommerceLinkButton1"
                disableRipple
                className="continueBtn"
              >
                <Typography
                  variant="p3regular"
                  color="darkText"
                  component="span"
                >
                  {t('continue_shopping')}
                </Typography>
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            em={4}
            lg={3.5}
            xl={3}
            className="cart-total-summary"
            sx={{
              padding: 0,
            }}
          >
            <CartTotal
              addedCartDetails={addedCartDetails}
              secondaryArgs={secondaryArgs}
              refetchLoading={refetchLoading}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;
