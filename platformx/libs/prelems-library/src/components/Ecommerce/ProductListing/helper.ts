import {
  getRestApiCall,
  nullToObject,
  postRestApiCall,
  nullToArray,
} from "../../../utils/helperFns";

export const getProductDetails = (
  secondaryArgs: any,
  rows: string | number,
  start: string | number,
  key?: string,
  value?: string[],
) => {
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename = "" } =
    nullToObject(secondaryArgs);

  const getLocalData = localStorage.getItem("ecommerceQuery");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    searchTerm = "",
    tags = [],
    ecommerceRequest: { filter = [] } = {},
  }: any = getLocalData ? JSON.parse(JSON.parse(getLocalData)) : {};
  const attributevalue = value.map((item) => {
    if (item.includes("#", 0)) {
      return item.replace("#", "%23");
    }
    return item;
  });
  const obj: String = `{pagination:{start:${start},rows:${rows}},searchTerm:${JSON.stringify(
    searchTerm,
  )},tags:${JSON.stringify(
    tags,
  )},filter:Ecommerce,isSuggestive:false,ecommerceRequest:{filter:${JSON.stringify(
    filter,
  )},attributes:[{key:${JSON.stringify(key)},value:${JSON.stringify(attributevalue)}}]}}`;

  return getRestApiCall(
    `${deliveryEndPoint}api/v1/web/en/delivery/getEcomProducts?queryParam=${obj}`,
    language,
    sitename,
  );

  //Use for local testing.
  // return getRestApiCall(
  //   `https://dev.delivery.hcl-x.com/platform-x/api/v1/web/en/delivery/getEcomProducts?queryParam=${obj}`
  // );
};

/**
 * cartId based get full details
 */
export const ecomCartIdBasedGetItem = (ele: any) => {
  const { secondaryArgs = {}, cartId = "" } = nullToObject(ele);
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename = "" } =
    nullToObject(secondaryArgs);

  const data = JSON.stringify({
    query: `query { getCartItems(cartId:${JSON.stringify(cartId)}) } `,
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
};

/**
 * productId based get product fill details
 * post call
 */
export const getProductDetailsApiCall = (
  productId: string,
  secondaryArgs: any,
  filterAttr: Array<any>,
) => {
  const filterArray: any = nullToArray(filterAttr).length > 0 ? JSON.stringify(filterAttr) : [];
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename = "" } =
    secondaryArgs;
  const payload = JSON.stringify({
    query: `query {fetchEcomProductDetails(productId:${JSON.stringify(
      productId,
    )},filterAttr:${JSON.stringify(filterArray)})}`,
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, payload, language, sitename);
};

/**
 * shipping address
 * @param ele object
 * @returns object
 */
export const proceedToShippingAddress = (ele: any) => {
  const { secondaryArgs = {}, newObj = {} } = nullToObject(ele);
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename = "" } =
    nullToObject(secondaryArgs);

  const {
    city = "",
    // state = "",
    email = "",
    cartId = "",
    pincode = "",
    address = "",
    landmark = "",
    lastName = "",
    firstName = "",
    alterNumber = "",
    contactNumber = "",
  } = nullToObject(newObj);
  const additionalAddressInfoData = landmark + " " + alterNumber;
  const addressObj = `{ title: ${JSON.stringify(firstName)}, last_name: ${JSON.stringify(
    lastName,
  )}, street_name: ${JSON.stringify(address)}, postal_code: ${JSON.stringify(
    pincode,
  )}, city: ${JSON.stringify(city)}, state: ${JSON.stringify(
    "Alabama",
  )}, country: "US", mobile: ${JSON.stringify(contactNumber)}, email: ${JSON.stringify(
    email,
  )}, additional_address_info: ${JSON.stringify(additionalAddressInfoData)} }`;
  const data = JSON.stringify({
    query: `mutation { addProductToCart(input: { cart_id: ${JSON.stringify(
      cartId,
    )}, address: {shipping_address:${addressObj}}})}`,
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
};

// place order
export const placeOrder = async (ele: any) => {
  const { secondaryArgs = {}, cartId = "", userId = "", total_price = "" } = nullToObject(ele);
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename = "" } =
    nullToObject(secondaryArgs);
  if (userId && total_price) {
    const data = JSON.stringify({
      query: `mutation { addProductToCart(input: { cart_id: ${JSON.stringify(
        cartId,
      )}, user_id: ${JSON.stringify(userId)}, cart_total: ${JSON.stringify(
        total_price,
      )}, place_order: true })}`,
    });
    return await postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
  } else {
    const data = JSON.stringify({
      query: `mutation { addProductToCart(input: { cart_id: ${JSON.stringify(
        cartId,
      )}, place_order: true })}`,
    });
    return await postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
  }
};

export const addPaymentMethod = async (ele: any) => {
  const { secondaryArgs = {}, cartId = "" } = nullToObject(ele);
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename = "" } =
    nullToObject(secondaryArgs);

  const data = JSON.stringify({
    query: `mutation { addProductToCart(input: { cart_id: ${JSON.stringify(
      cartId,
    )}, payment_method:"COD" })}`,
  });
  return await postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
};

/**
 * productId based get reward points
 */
export const getProductDetailsRewardpoints = (amt: string, secondaryArgs: any) => {
  const { prelemBaseEndpoint: { loyaltyPortalEndPoint = "" } = {} } = nullToObject(secondaryArgs);
  return getRestApiCall(`${loyaltyPortalEndPoint}v1/campaign/getCampaignPoints?amount=${amt}`);
};
