import { ChevronLeft } from "@mui/icons-material";
import { Grid, Typography, Box, Button, Container } from "@mui/material";
import ToastContainerHandle from "Common/ToastContainer/ToastContainerHandle";
import ProductLoader from "components/Ecommerce/ProductListing/ProductLoader";
import React, { useEffect, useState } from "react";
import CartGallery from "./CartGallery";
import Ratings from "./Ratings";
import SkeletonLoader from "./SkeletonLoader";
import ProductAttribute from "./ProductAttribute";
import AddCart from "./AddCart/AddCart";
import EcomProductPrice from "./ProductPrice";
import { addToCartGetCartId } from "components/Ecommerce/hepler";
import { nullToObject } from "utils/helperFns";
import { ecomCartIdBasedGetItem } from "components/Ecommerce/ProductListing/helper";

interface ProductDisplayProps {
  rewardPoints?: string | number;
  secondaryArgs: any;
  loading: boolean;
  productFullDetails: any;
  productId: string;
  sizeVariantsHandle: (item: any) => void;
  t: any;
  cartCountUpdate: any;
}

export default function ProductDisplay({
  secondaryArgs,
  loading,
  productFullDetails,
  productId,
  sizeVariantsHandle,
  t,
  cartCountUpdate,
  rewardPoints,
}: ProductDisplayProps) {
  const [addtoCartLoading, setAddtoCartLoading] = useState(false);
  const [cartData, setCartData] = useState();

  const cartItemDetails = async (cartId = "") => {
    const response = await ecomCartIdBasedGetItem({
      cartId: cartId,
      secondaryArgs: secondaryArgs,
    });
    const { data: { data: { getCartItems: { statusCode = 0, data = {} } = {} } = {} } = {} } =
      nullToObject(response);

    if (statusCode === 200) {
      cartCountUpdate(data);
      setCartData(data);
    }
  };
  const addToProductInCart = async (ele: any = {}) => {
    const {
      secondaryArgs: secondaryArg,
      productId: prId,
      cartQuantity,
      tempData,
      productFullDetails: prDetails,
    } = ele;
    setAddtoCartLoading(true);
    const response = await addToCartGetCartId(
      secondaryArg,
      prId,
      cartQuantity,
      tempData,
      prDetails,
      t("errorRequest"),
    );
    setAddtoCartLoading(false);
    if (response) {
      const getCartIdFromLocal = localStorage.getItem("ecommerceCartId");
      if (getCartIdFromLocal) {
        cartItemDetails(getCartIdFromLocal);
      } else {
        cartCountUpdate(null);
      }
    }
  };
  const goBack = () => {
    window.location.href = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/ecommerce/product-listing`;
  };

  useEffect(() => {
    const getCartIdFromLocal = localStorage.getItem("ecommerceCartId");
    if (getCartIdFromLocal) {
      cartItemDetails(getCartIdFromLocal);
    } else {
      cartCountUpdate(null);
    }
  }, [productId]);

  return (
    <>
      <Container className={`grid_container prelem-py`}>
        {/* toast container */}
        <ToastContainerHandle />
        <>{addtoCartLoading ? <ProductLoader /> : null}</>
        <Button
          type='button'
          startIcon={<ChevronLeft />}
          variant='ecommerceLinkButton1'
          disableRipple
          onClick={() => goBack()}
          className='transparentBg'>
          {t("back")}
        </Button>

        <Grid container xs={12} md={12} className={`gridContainer gridContainerProduct`}>
          <Grid item xs={12} md={12} em={6} lg={7}>
            {/* product imag handle */}
            <CartGallery loading={loading} productFullDetails={productFullDetails} />
          </Grid>
          <Grid className='ecommerceProductDetailsTextArea' item xs={12} md={12} em={6} lg={5}>
            <Box>
              {loading ? (
                <>
                  <Box className='skeleton skeleton-text'></Box>
                  <Box className='skeleton skeleton-text'></Box>
                </>
              ) : (
                <Typography
                  variant='h1bold'
                  className='ellipsisTextof2lines'
                  sx={{
                    ...(!loading && {
                      marginBottom: "15px",
                    }),
                  }}>
                  {productFullDetails?.ecomx_name}
                </Typography>
              )}

              <Ratings />

              {loading ? (
                <>
                  <Box className='skeleton skeleton-text skeleton-price'></Box>
                </>
              ) : (
                <EcomProductPrice productFullDetails={productFullDetails} />
              )}

              {loading ? (
                <>
                  <Box className='skeleton skeleton-text skeleton-description'></Box>
                  <Box className='skeleton skeleton-text skeleton-description'></Box>
                </>
              ) : (
                <Typography variant='p3regular' className='ellipsisTextof4lines'>
                  {productFullDetails?.ecomx_desc}
                </Typography>
              )}

              {/* size */}
              {loading ? (
                <SkeletonLoader />
              ) : (
                <>
                  <ProductAttribute
                    variantsHandle={sizeVariantsHandle}
                    productFullDetails={productFullDetails}
                  />
                </>
              )}

              {/* color */}
              {/* {loading ? (
                <SkeletonLoader />
              ) : (
                <ProductColorList
                  variantsHandle={colorVariantsHandle}
                  productFullDetails={productFullDetails}
                />
              )}

              {/* add to cart */}
              <AddCart
                cartData={cartData}
                productId={productId}
                parentPage='productdetail'
                rewardPoints={rewardPoints}
                secondaryArgs={secondaryArgs}
                addToProductInCart={addToProductInCart}
                productInStockInfo={productFullDetails?.ecomx_in_stock}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
