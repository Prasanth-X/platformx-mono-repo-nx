import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  return {
    radioBackground: {
      "&.shippingRadioItems": {
        "& .shippingRadioButton": {
          width: "20px",
          height: "20px",
        },
        "& .radioTextGap": {
          marginLeft: "12px",
          display: "inline-flex",
        },
        "& .radioLabelItem": {
          margin: 0,
        },
      },
    },
  };
});
