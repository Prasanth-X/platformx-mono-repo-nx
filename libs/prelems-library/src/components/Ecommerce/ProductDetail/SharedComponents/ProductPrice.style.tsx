import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  return {
    productPriceWrapper: {
      width: "100%",
      display: "flex",
    },
    sellPrice: {
      paddingRight: "10px",
    },
    actualPrice: {
      marginRight: "10px",
    },
  };
});
