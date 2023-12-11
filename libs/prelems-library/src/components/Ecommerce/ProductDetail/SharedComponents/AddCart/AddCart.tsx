import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import frame1 from '../../../../../assets/LoyalityPointIcon.png';
import { nullToObject } from '../../lib/utils/helperFns';
import ProductQuantityButton from './QuantityButton';
import { Typography } from '@mui/material';
import ToastContainerHandle from '../../../../../Common/ToastContainer/ToastContainerHandle';
import ToastService from '../../../../../Common/ToastContainer/ToastService';
import '../../../../../service/i18n';
import { useCustomStyle } from './AddCart.style';
import PopupDialog from './PopupDialog';

type ecommerceAddcartProps = {
  rewardPoints?: string | number;
  productId: string | number;
  secondaryArgs: any;
  parentPage: string;
  productFullDetails?: any;
  addToProductInCart?: any;
  productInStockInfo: string;
  cartData: any;
};
const AddCart = (props: ecommerceAddcartProps) => {
  const classes = useCustomStyle();
  const {
    rewardPoints = '',
    secondaryArgs = {},
    productId = '',
    parentPage,
    productFullDetails = {},
    addToProductInCart = () => {},
    productInStockInfo,
    cartData,
  } = nullToObject(props);

  const { t } = useTranslation();

  // const [cartIdValue, setCartIdValue] = useState("");
  const [cartQuantity, setCartQuantity] = useState(1);
  const tempData = false;

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  /**
   * quantity add
   */
  const addToQuantity = () => {
    if (cartQuantity > 0) {
      setCartQuantity(cartQuantity + 1);
    }
  };

  /**
   * quantity reduce
   */
  const removeQuantity = () => {
    if (cartQuantity > 1) {
      setCartQuantity(cartQuantity - 1);
    }
  };

  /**
   * buyNow handle
   */
  const buyNowHandle = () => {
    window.location.href = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/ecommerce/cart-list`;
  };

  // useEffect(() => {
  //   const getCartIdFromLocal = localStorage.getItem("ecommerceCartId");
  //   if (getCartIdFromLocal) {
  //     setCartIdValue(getCartIdFromLocal);
  //   } else {
  //     setCartIdValue("");
  //   }
  // }, []);

  return (
    <>
      <ToastContainerHandle />
      <Box className={`${classes.addToCartWrapper} cartAllButton`}>
        <Box className="productQuantityWrapper">
          <Box className="gapTopQuantity">
            <ProductQuantityButton
              removeQuantity={removeQuantity}
              cartQuantity={cartQuantity}
              addToQuantity={addToQuantity}
              parentPage={parentPage}
              disabled={
                productInStockInfo ? !JSON.parse(productInStockInfo) : false
              }
            />
          </Box>
        </Box>
        <Box className="onlyButtons">
          <Button
            type="button"
            disabled={
              productInStockInfo ? !JSON.parse(productInStockInfo) : false
            }
            variant="primaryButton2"
            onClick={() => {
              if (JSON.parse(productInStockInfo)) {
                const errMsg = t('errorRequest');
                addToProductInCart({
                  secondaryArgs,
                  productId,
                  cartQuantity,
                  tempData,
                  productFullDetails,
                  errMsg,
                });
                // addToCartGetCartId(
                //   secondaryArgs,
                //   productId,
                //   cartQuantity,
                //   false,
                //   t("errorRequest")
                // );
              } else {
                ToastService.failToast(t('item_is_currently_out_of_stock'));
              }
            }}
          >
            {t('add_to_cart')}
          </Button>
          <Button
            variant="primaryButton1"
            type="button"
            disabled={cartData?.line_item?.length > 0 ? false : true}
            onClick={
              cartData?.line_item?.length > 0 ? () => buyNowHandle() : () => {}
            }
          >
            {t('buy_now')}
          </Button>
        </Box>
      </Box>
      {rewardPoints && (
        <Box className={`${classes.mainEarningPointLoyality} mainEarningPoint`}>
          <Box className="BoxLoyalityPoint1">
            <Box className="BoxImageLoyalityPoint">
              <img alt=" " src={frame1} />
            </Box>

            <Box className="MainBoxText">
              <Typography className="TypographyPurchase" variant="p2medium">
                Purchase and earn {rewardPoints} Points
              </Typography>

              <Typography
                onClick={handleClick}
                className="DivMoreInfo"
                variant="p2medium"
              >
                more info
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      <PopupDialog open={open} handleClose={handleClose} />
    </>
  );
};
export default AddCart;
