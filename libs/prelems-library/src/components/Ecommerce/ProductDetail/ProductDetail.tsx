import React, { useEffect, useState } from 'react';
import '../../../service/i18n';
import { useTranslation } from 'react-i18next';
import { nullToObject, nullToString } from 'lib/utils/helperFns';
import ProductListing from '../ProductListing/ProductListing';
import ToastService from '../../../Common/ToastContainer/ToastService';
import { Grid, Box } from '@mui/material';
import {
  getProductDetailsApiCall,
  getProductDetailsRewardpoints,
} from '../ProductListing/helper';
import './ProductDetail.css';
import { useCustomStyle } from './ProductDetail.style';
import TabDocument from './SharedComponents/TabDocument';
import ProductDisplay from './SharedComponents/ProductDisplay';

const ProductDetail = ({
  productId = '',
  secondaryArgs = {},
  cartCountUpdate = () => {},
  showAdditionalDetails = true,
}: any) => {
  const { t, i18n } = useTranslation();
  const classes = useCustomStyle();

  const [loading, setLoading] = useState(false);
  const [rewardPoints, set_rewardPoints] = useState('');
  const [variantsDetails, set_VariantsDetails] = useState<any>([]);
  // const [variantsDetails] = useState<any>([]);
  const [productFullDetails, setProductFullDetails] = useState<any>({});

  const getPoitDetails = async (fetchEcomProductDetails: any) => {
    const { ecomx_sale_price = '' } = fetchEcomProductDetails;
    const amt = ecomx_sale_price ? '' + Math.round(ecomx_sale_price) : '';
    const response = await getProductDetailsRewardpoints(amt, secondaryArgs);
    const { data = {} } = response;
    const { result = '' } = nullToObject(data);
    set_rewardPoints(nullToString(result));
  };

  /**
   * id based get product details get
   */
  const getProductDetails = async () => {
    setLoading(true);
    const res = await getProductDetailsApiCall(
      productId,
      secondaryArgs,
      variantsDetails
    );
    const {
      data: { data: { fetchEcomProductDetails = {} } = {} } = {},
      status = 0,
    } = nullToObject(res);
    if (status === 200) {
      getPoitDetails(fetchEcomProductDetails); //get reward point api
      setProductFullDetails(fetchEcomProductDetails);
    } else {
      ToastService.failToast(t('errorRequest'));
      setProductFullDetails({});
    }
    setLoading(false);
  };

  /**
   * size variant handle
   * @param item
   */
  const sizeVariantsHandle = (item: any) => {
    const newArray = [...variantsDetails, item];
    const ids = newArray.map(({ key }) => key);
    const filtered = newArray.filter(
      ({ key }: any, index) => !ids.includes(key, index + 1)
    );
    set_VariantsDetails(filtered);
  };

  // const addtoCartAndRedirect = async (id: string) => {
  //   const response = await addToCartGetCartId(
  //     secondaryArgs,
  //     id,
  //     1,
  //     true,
  //     {},
  //     t("errorRequest")
  //   );
  //   if (response) {
  //     const getCartIdFromLocal = localStorage.getItem("ecommerceCartId");
  //     if (getCartIdFromLocal) {
  //       cartItemDetails(getCartIdFromLocal);
  //     } else {
  //       cartCountUpdate(null);
  //     }
  //   }
  // };

  useEffect(() => {
    getProductDetails();
  }, [productId, variantsDetails]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      i18n.changeLanguage(secondaryArgs?.prelemBaseEndpoint?.language);
      // i18n.changeLanguage(url.pathname.split("/")[1]);
    }
  }, []);

  return (
    <Box className={`${classes.productDetailWrapper} productDetailpage`}>
      <ProductDisplay
        rewardPoints={rewardPoints}
        secondaryArgs={secondaryArgs}
        loading={loading}
        productFullDetails={productFullDetails}
        productId={productId}
        sizeVariantsHandle={sizeVariantsHandle}
        t={t}
        cartCountUpdate={cartCountUpdate}
      />
      {showAdditionalDetails && (
        <>
          <Grid xs={12} className="prelem-py">
            <TabDocument productFullDetails={productFullDetails} />
          </Grid>
          <Grid xs={12} className="productListingWrapper">
            <ProductListing
              cartCountUpdate={cartCountUpdate}
              secondaryArgs={secondaryArgs}
              fromPage="productList"
            />
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ProductDetail;
