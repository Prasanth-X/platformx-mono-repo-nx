import { nullToObject, postRestApiCall } from "../../../utils/helperFns";

export const updateQuantityOfCartItem = (ele: any) => {
  const { secondaryArgs = {}, cartId = "", lineItemId = "", quantity } = nullToObject(ele);
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename } =
    nullToObject(secondaryArgs);

  const data = JSON.stringify({
    query: `mutation {updateLineItem(input:{cart_id:${JSON.stringify(
      cartId,
    )}, line_item_id:${JSON.stringify(lineItemId)}, quantity:${quantity}})}`,
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
};

export const removeCartItem = (ele: any) => {
  const { secondaryArgs = {}, cartId = "", lineItemId = "" } = nullToObject(ele);
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename } =
    nullToObject(secondaryArgs);

  const data = JSON.stringify({
    query: `mutation {removeLineItem(input:{cart_id:${JSON.stringify(
      cartId,
    )}, line_item_id:${JSON.stringify(lineItemId)}})}`,
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
};

/**
 *
 * @param lineItems object
 * @returns boolean
 */
export const lineItemsOutOfStockCheck = (lineItems: any) => {
  let inStock = true;
  lineItems.forEach((lineItem: any) => {
    if (!JSON.parse(lineItem?.ecomx_in_stock)) {
      inStock = false;
    }
  });
  return inStock;
};
