import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { nullToArray, nullToObject } from 'utils/helperFns'
import '../../../../service/i18n'
import './ShoppingList.css'
import { useCustomStyle } from './ShoppingList.style'
import ShoppingListCard from './ShoppingListCard'
import ShoppingSkeletonListCard from './ShoppingSkeletonListCard'

type ecommerceShoppingListProps = {
  addedCartDetails: any
  loading: boolean
  loadCart: any
  refetchLoading: boolean
  secondaryArgs: any
}
const ShoppingList = (_props: ecommerceShoppingListProps) => {
  const classes = useCustomStyle()
  const { t } = useTranslation()
  const {
    addedCartDetails = {},
    loading,
    loadCart,
    refetchLoading,
    secondaryArgs = {},
  } = nullToObject(_props)
  const { line_item = [] } = nullToObject(addedCartDetails)

  return (
    <Box
      className={`cart-product-list ${classes.productCartListWrapper} productCartListRow`}
    >
      <Typography variant="h3semibold" className="heading">
        {t('cart')}
      </Typography>
      {loading ? (
        <>
          <ShoppingSkeletonListCard />
          <ShoppingSkeletonListCard />
          <ShoppingSkeletonListCard />
        </>
      ) : (
        <Box className="productCartList">
          {nullToArray(line_item).length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="p2medium">
                Your Cart Is Currently Empty!
              </Typography>
            </Box>
          ) : (
            nullToArray(line_item).map((product: any, index: number) => (
              <ShoppingListCard
                cartId={addedCartDetails?.id}
                key={product?.id}
                product={product}
                index={index}
                loadCart={loadCart}
                refetchLoading={refetchLoading}
                secondaryArgs={secondaryArgs}
              />
            ))
          )}
        </Box>
      )}
    </Box>
  )
}

export default ShoppingList
