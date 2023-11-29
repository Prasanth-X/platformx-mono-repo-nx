import { getRestApiCall, nullToObject } from "../../utils/helperFns";

export const getProductDetails = (inputData: any, secondaryArgs: any) => {
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename = "" } =
    nullToObject(secondaryArgs);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    pagination: { start = 0, rows = 20 } = {},
    searchTerm = "",
    tags = [],
    ecommerceRequest: { filter = [] } = {},
  }: any = inputData;

  const obj: String = `{pagination:{start:${start},rows:${rows}},searchTerm:${JSON.stringify(
    searchTerm,
  )},tags:${JSON.stringify(
    tags,
  )},filter:Ecommerce,isSuggestive:false,ecommerceRequest:{filter:${JSON.stringify(filter)}}}`;
  return getRestApiCall(
    `${deliveryEndPoint}api/v1/web/en/delivery/getEcomProducts?queryParam=${obj}`,
    language,
    sitename,
  );
  // Use for local testing.
  //   return getRestApiCall(
  //     `https://dev.delivery.hcl-x.com/platform-x/api/v1/web/en/delivery/getEcomProducts?queryParam=${obj}`
  // "en",
  // "sitename"
  //   );
};
