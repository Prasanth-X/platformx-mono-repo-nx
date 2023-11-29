import { nullToObject, postRestApiCall } from "../../../utils/helperFns";

export const proceedToBillingAddress = (ele: any) => {
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
    lastName = "",
    firstName = "",
    contactNumber = "",
    additionalAddressInfoData = "",
  } = nullToObject(newObj);
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
    )}, address: {billing_address:${addressObj}}})}`,
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
};
