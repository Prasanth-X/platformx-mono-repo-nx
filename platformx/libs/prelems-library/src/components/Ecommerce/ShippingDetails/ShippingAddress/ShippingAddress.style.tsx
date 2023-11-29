import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    shippingAdressSectionWrapper: {
      "&.shippingAdressSectionLeft": {
        "& .textWrapperItem": {
          paddingRight: "0px",
          [theme.breakpoints.up("em")]: {
            paddingRight: "15px",
          },
          "& button": {
            marginRight: 0,
          },
        },
        "& .transparentBg": {
          textDecoration: "none",
          background: "transparent",
          borderColor: "transparent",
          width: "auto",
        },
      },
    },
  };
});
