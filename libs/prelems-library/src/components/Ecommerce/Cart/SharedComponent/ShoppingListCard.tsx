/* eslint-disable no-console */
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Tooltip,
  Typography,
} from '@mui/material'
import { useRef, useState } from 'react'
import { nullToObject } from 'utils/helperFns'
import ToastContainerHandle from '../../../../Common/ToastContainer/ToastContainerHandle'
import ToastService from '../../../../Common/ToastContainer/ToastService'
import ActualPrice from '../../ProductDetail/SharedComponents/ActualPrice'
import QuantityButton from '../../ProductDetail/SharedComponents/AddCart/QuantityButton'
import SellPrice from '../../ProductDetail/SharedComponents/SellPrice'
import { removeCartItem, updateQuantityOfCartItem } from '../helper'
import ShoppingSkeletonListCard from './ShoppingSkeletonListCard'
// import { useTranslation } from "react-i18next";
import '../../../../service/i18n'
import { useCustomStyle } from './ShoppingListCard.style'

function ShoppingListCard({
  product,
  index,
  cartId,
  loadCart,
  refetchLoading,
  secondaryArgs,
}: any) {
  const classes = useCustomStyle()
  const [quantity, setQuantity] = useState(product?.ecomx_quantity)
  const itemRefforRemoval = useRef('')
  const iftemRefforUpdating = useRef('')
  const [removeItemLoading, setRemoveItemLoading] = useState(false)
  const [quantityLoading, setQuantityLoading] = useState(false)
  // const { t } = useTranslation();
  const updateQuantityOfItem = async (quant: number) => {
    iftemRefforUpdating.current = product?.id
    setQuantityLoading(true)
    const response = await updateQuantityOfCartItem({
      secondaryArgs: secondaryArgs,
      cartId: cartId,
      lineItemId: product?.id,
      quantity: quant,
    })
    const {
      data: {
        data: { updateLineItem: { statusCode = 0, msg = '' } = {} } = {},
      } = {},
    } = nullToObject(response)

    if (statusCode === 200) {
      setQuantity(quant)
      setQuantityLoading(false)
      loadCart(cartId, true)
      iftemRefforUpdating.current = ''
    } else {
      ToastService.failToast(msg)
      setQuantityLoading(false)
    }
  }

  const removeProduct = async () => {
    itemRefforRemoval.current = product?.id
    setRemoveItemLoading(true)
    const response = await removeCartItem({
      secondaryArgs: secondaryArgs,
      cartId: cartId,
      lineItemId: product?.id,
    })
    const {
      data: { data: { removeLineItem: { statusCode = 0 } = {} } = {} } = {},
    } = nullToObject(response)

    if (statusCode === 200) {
      setRemoveItemLoading(false)
      loadCart(cartId, true)
    }
  }

  const prices = {
    realPrice: product?.ecomx_quantity * product?.ecomx_list_price,
    discountedPrice: product?.ecomx_quantity * product?.ecomx_sale_price,
  }

  const increaseQuantity = () => {
    // if (quantity > 0 && parseInt(product?.ecomx_stock_quantity) > 0) {
    //   updateQuantityOfItem(quantity + 1);
    // } else {
    //   ToastService.failToast(t("please_enter_lesser_quantity"));
    // }
    if (quantity > 0) {
      updateQuantityOfItem(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantityOfItem(quantity - 1)
    }
  }
  const quantityLoadingCheck =
    (quantityLoading || refetchLoading) &&
    product?.id === iftemRefforUpdating.current
  return (
    <>
      <ToastContainerHandle />
      {(removeItemLoading || refetchLoading) &&
      product?.id === itemRefforRemoval.current ? (
        <ShoppingSkeletonListCard />
      ) : (
        <Box
          key={product?.id}
          className={`${classes.cartEachItemRowsWrapper} cartEachItemRows`}
        >
          <Box className="productRow">
            <CloseRoundedIcon
              onClick={removeProduct}
              className="removeIconrow"
            />
            <Box className={`cart-product-list-item productImageWrapper`}>
              <Card className={`product-list-image imageWrapper`}>
                <CardActionArea className="product-list-image-container">
                  <CardMedia
                    component="img"
                    image={product?.attr_images[0] || ''}
                    alt={`Thumbnail ${index}`}
                    className="list-image"
                  />
                </CardActionArea>
              </Card>
            </Box>
            <Box className={`mobile smallScreen`}>
              <Box className="productNameWrapper">
                <Tooltip title={product?.ecomx_name} placement="right-end">
                  <Typography variant="p3medium" className="productName">
                    {product?.ecomx_name}
                  </Typography>
                </Tooltip>
                <Box className={`only-mobile quantityandPriceWrapper`}>
                  <Box className="quantityBtn">
                    <QuantityButton
                      addToQuantity={increaseQuantity}
                      removeQuantity={decreaseQuantity}
                      cartQuantity={quantity}
                      loading={quantityLoading}
                    />
                  </Box>

                  <Box className="sellPriceWrapper">
                    <Box className="sellPriceBox">
                      {prices?.realPrice !== prices?.discountedPrice && (
                        <SellPrice
                          loading={quantityLoadingCheck}
                          price={prices?.realPrice}
                          currency={product?.ecomx_currency_code}
                          variant="p3regular"
                        />
                      )}
                    </Box>

                    <Box>
                      {/* {!quantityLoadingCheck && ( */}
                      <ActualPrice
                        loading={quantityLoadingCheck}
                        price={prices?.discountedPrice}
                        currency={product?.ecomx_currency_code}
                        variant="p2semibold"
                      />
                      {/* )} */}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="sellPriceDesktopWrapper">
            <Box className="boxWrapper">
              <Box className="priceWrapper">
                {/* {!quantityLoadingCheck && ( */}
                {prices?.realPrice !== prices?.discountedPrice && (
                  <SellPrice
                    loading={quantityLoadingCheck}
                    price={prices?.realPrice}
                    currency={product?.ecomx_currency_code}
                    variant="p3regular"
                  />
                )}
                {/* )} */}
              </Box>
              <Box className="hideShow">
                <QuantityButton
                  addToQuantity={increaseQuantity}
                  removeQuantity={decreaseQuantity}
                  cartQuantity={quantity}
                  loading={quantityLoadingCheck}
                />
              </Box>
              <Box className="sellPriceWrapper2">
                <Box
                  sx={{
                    marginRight: { em: '65px' },
                    display: { xs: 'block', em: 'none' },
                  }}
                >
                  {prices?.realPrice !== prices?.discountedPrice && (
                    <SellPrice
                      loading={quantityLoadingCheck}
                      price={prices?.realPrice}
                      currency={product?.ecomx_currency_code}
                      variant="p3regular"
                    />
                  )}
                </Box>

                <ActualPrice
                  loading={quantityLoadingCheck}
                  price={prices?.discountedPrice}
                  currency={product?.ecomx_currency_code}
                  variant="p2semibold"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}

export default ShoppingListCard
