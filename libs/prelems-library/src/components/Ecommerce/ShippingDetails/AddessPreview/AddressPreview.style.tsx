import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    addressPreviewWrapper: {
      "&.addressPreviewScreen": {
        borderBottom: `solid 1px ${theme.palette.prelemType1.LINE}`,
        "& .pointer": {
          cursor: "pointer",
        },
      },
      "&.addressdetailScreen": {
        "& .shippingOuterBorder": {
          border: `solid 1px ${theme.palette.prelemType1.LINE}`,
          marginTop: "12px",
        },
      },
    },
  };
});
