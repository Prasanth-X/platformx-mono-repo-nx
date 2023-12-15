const hideFilterArray = ["Community"];
/**
 * pass contentType
 * if u want hide in filter in content type add in into array
 * @param type
 */
export const contentTypeBasedHideFilter = (type = "") => {
    return hideFilterArray.some((ele) => ele !== type);
}