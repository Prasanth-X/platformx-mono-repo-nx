import { nullToObject, postRestApiCall } from "../../utils/helperFns";
import ToastService from "../../Common/ToastContainer/ToastService";

export const getCartId = (secondaryArgs = {}) => {
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename } =
    nullToObject(secondaryArgs);
  const data = JSON.stringify({
    query: `mutation {addProductToCart(input: {initialize:true})}`,
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
};

/**
 * product add to cart
 */
const ecomProductAddToCart = (ele: any) => {
  const {
    secondaryArgs = {},
    cartId = "",
    id = "",
    quantity = "",
    ecomx_variant_id = 1,
  } = nullToObject(ele);
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename } =
    nullToObject(secondaryArgs);

  const data = JSON.stringify({
    query: `mutation { addProductToCart(input: { cart_id: ${JSON.stringify(
      cartId,
    )}, line_item: { product_id: ${JSON.stringify(
      id,
    )}, variant_id: ${ecomx_variant_id}, quantity: ${JSON.stringify(quantity)}}})}`,
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
};

/**
 * add to cart process
 * @param cartId string | number
 */

const addToCartProcess = async (
  cartId: string | number,
  productId: string,
  cartQuantity: string | number,
  secondaryArgs: any,
  fromListing = false,
  ecomx_variant_id = 1,
) => {
  const response = await ecomProductAddToCart({
    id: productId,
    cartId: cartId,
    quantity: cartQuantity,
    secondaryArgs: secondaryArgs,
    ecomx_variant_id: ecomx_variant_id,
  });
  const { data: { data: { addProductToCart = {} } = {} } = {} } = nullToObject(response);
  const { statusCode = 0, msg = "" } = nullToObject(addProductToCart);
  if (statusCode === 200) {
    if (fromListing) {
      window.location.href = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/ecommerce/cart-list`;
    }
    ToastService.SuccessToast((msg || "").charAt(0).toUpperCase() + msg.slice(1));
    return true;
  } else {
    ToastService.failToast(msg);
    return false;
  }
};

/**
 * generate cartId
 * @param secondaryArgs object
 * @returns object
 */

export const addToCartGetCartId = async (
  secondaryArgs: any,
  productId: string,
  cartQuantity: string | number,
  fromListing?: boolean,
  productFullDetails?: any,
  msg?: string,
) => {
  const { ecomx_variant_id = 1 } = nullToObject(productFullDetails);

  const getCartIdFromLocal = localStorage.getItem("ecommerceCartId");
  if (!getCartIdFromLocal) {
    //no cartId in local generate new one
    const responseCartId = await getCartId(secondaryArgs); //get cartId
    const { data: { data: { addProductToCart: { cartId = "", statusCode = 0 } = {} } = {} } = {} } =
      nullToObject(responseCartId);
    if (statusCode === 200) {
      localStorage.setItem("ecommerceCartId", cartId);
      const res = await addToCartProcess(
        cartId,
        productId,
        cartQuantity,
        secondaryArgs,
        fromListing,
        ecomx_variant_id,
      ); //add to cartProcess
      return res;
    } else {
      ToastService.failToast(msg);
    }
  } else {
    const res = await addToCartProcess(
      getCartIdFromLocal,
      productId,
      cartQuantity,
      secondaryArgs,
      fromListing,
      ecomx_variant_id,
    ); //add to cartProcess
    return res;
  }
};
