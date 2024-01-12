import EastIcon from '@mui/icons-material/East'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { nullToArray, nullToObject } from 'utils/helperFns'
import fallBackImage from '../../../assets/fallBackImage.png'
import '../../../service/i18n'
import ActualPrice from '../ProductDetail/SharedComponents/ActualPrice'
import { addToCartGetCartId } from '../hepler'
import './ProductListing.css'
import { useCustomStyle } from './ProductListing.style'
import ProductLoader from './ProductLoader'
import { ecomCartIdBasedGetItem, getProductDetails } from './helper'

type ProductListingProps = {
  secondaryArgs: any
  cartCountUpdate: any
  fromPage: any
  attributes?: {
    key: string
    value: string[]
  }
}
const ProductListing = ({
  secondaryArgs = {},
  fromPage = '',
  attributes,
  cartCountUpdate = () => {},
}: ProductListingProps) => {
  const rowData = 12
  const classes = useCustomStyle()
  const [productList, setProductList] = useState([])
  const [pagePerStart, setPagePerStart] = useState(0)
  const [loadMoreIsEnable, setLoadMoreIsEnable] = useState(true)
  const pageFrom = fromPage === 'productList' ? true : false
  const [loading, setLoading] = useState(false)
  const { t, i18n } = useTranslation()
  const { key, value } = attributes
  /**
   * get product list api call
   */
  const getProductList = async () => {
    setLoading(true)
    const res = await getProductDetails(
      secondaryArgs,
      pageFrom === true ? 8 : rowData,
      pagePerStart,
      key,
      value,
    )
    const { data: { data: { fetchEcomProducts = [] } = {} } = {}, status = 0 } =
      res
    setLoading(false)
    if (status === 200) {
      const newArray = [...productList, ...fetchEcomProducts] //product concat
      setLoadMoreIsEnable(productList.length !== newArray.length ? true : false) //load more button show
      setProductList(newArray)
    } else {
      setProductList([])
    }
  }

  /**
   * product details navigate
   * @param productId string | number
   */
  const onViewDetails = (productId: string) => {
    //Todo: logic to be added for direct cart navigation.
    window.location.href = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/ecommerce/product-detail?productId=${productId}`
  }

  const cartItemDetails = async (cartId = '') => {
    setLoading(true)
    const response = await ecomCartIdBasedGetItem({
      cartId: cartId,
      secondaryArgs: secondaryArgs,
    })
    setLoading(false)
    const {
      data: {
        data: { getCartItems: { statusCode = 0, data = {} } = {} } = {},
      } = {},
    } = nullToObject(response)

    if (statusCode === 200) {
      cartCountUpdate(data)
    } else {
      cartCountUpdate(null)
    }
  }

  const addtoCartAndRedirect = async (id: string) => {
    setLoading(true)
    const response = await addToCartGetCartId(
      secondaryArgs,
      id,
      1,
      true,
      {},
      t('errorRequest'),
    )

    setLoading(false)
    if (response) {
      const getCartIdFromLocal = localStorage.getItem('ecommerceCartId')
      if (getCartIdFromLocal) {
        cartItemDetails(getCartIdFromLocal)
      } else {
        cartCountUpdate(null)
      }
    }
  }

  // const addtoCartAndRedirect = (id: string) => {
  //   addToCartGetCartId(secondaryArgs, id, 1, true, t("errorRequest"));
  // };
  /**
   * infinity load more option
   */
  const loadMoreItems = () => {
    setPagePerStart(pagePerStart + rowData)
  }

  useEffect(() => {
    getProductList()
  }, [pagePerStart])

  useEffect(() => {
    const getCartIdFromLocal = localStorage.getItem('ecommerceCartId')
    if (getCartIdFromLocal) {
      cartItemDetails(getCartIdFromLocal)
    } else {
      cartCountUpdate(null)
    }
    if (typeof window !== 'undefined') {
      i18n.changeLanguage(secondaryArgs?.prelemBaseEndpoint?.language)
    }
  }, [])

  return (
    <Box className={`${classes.productListingWrapper} productListingPage`}>
      <Container className="grid_container prelem-py">
        <Grid container xs={12} md={12} className="boxOverflow">
          <Grid
            item
            xs={9}
            md={6}
            className="ecommerce-product-card productCardWarpper"
          >
            <Typography variant="h2regular">
              {pageFrom ? t('related_products') : t('product_view')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} className="allProductListingWrapper">
            <>{loading ? <ProductLoader /> : null}</>
            {(!productList || productList.length === 0) && !loading ? (
              <Box className="noProductWrapper">
                <HighlightOffRoundedIcon className="iconSize" />
                <Typography variant="h3" color="lightDarkText">
                  {t('no_products')}
                </Typography>
              </Box>
            ) : (
              <>
                {productList.map((card, index) => (
                  <Grid
                    item
                    xs={6}
                    em={4}
                    lg={3}
                    key={`${card?.id}_${index.toString()}`}
                    className="product cusror"
                    onClick={() => onViewDetails(card.id)}
                  >
                    <Box className="image-container">
                      <Box className="imgWrapper">
                        <img
                          className="image"
                          onError={(e: any) => {
                            if (e.target.src !== fallBackImage) {
                              e.target.onerror = null
                              e.target.src = fallBackImage
                            }
                          }}
                          src={
                            nullToArray(card?.attr_images).length > 0
                              ? card?.attr_images[0]
                              : fallBackImage
                          }
                          alt="background"
                        />
                      </Box>
                      <Box className="hidden-button buttonItem">
                        <Button
                          variant="primaryButton1"
                          onClick={(event) => {
                            event.stopPropagation()
                            if (!JSON.parse(card?.ecomx_in_stock)) return
                            addtoCartAndRedirect(card.id)
                          }}
                        >
                          {JSON.parse(card?.ecomx_in_stock)
                            ? t('add_to_cart')
                            : t('out_of_stock')}
                        </Button>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        className="ellipsisTextof1line noGapBottom topheading"
                        variant="p4medium"
                        color="darkText"
                      >
                        {card?.attribute?.brand}
                      </Typography>
                      <Typography
                        color="darkText"
                        className="ellipsisTextof2lines noGapBottom"
                        variant="p3semibold"
                      >
                        {card?.ecomx_name}
                      </Typography>
                      <ActualPrice
                        price={card?.ecomx_sale_price}
                        currency={card?.ecomx_currency_code}
                        variant="p3regular"
                        className="price"
                      />
                    </Box>
                  </Grid>
                ))}
              </>
            )}
          </Grid>

          {/* load more */}
          <Grid item xs={12} className="loadMore prelem-py">
            {!pageFrom &&
            !(productList?.length < rowData) &&
            loadMoreIsEnable ? (
              <Button
                variant="primaryButton1"
                endIcon={<EastIcon className="arrowIcon icon" />}
                onClick={loadMoreItems}
              >
                {t('load_more')}
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
ProductListing.defaultProps = {
  attributes: {
    key: '',
    value: [''],
  },
}
export default ProductListing
