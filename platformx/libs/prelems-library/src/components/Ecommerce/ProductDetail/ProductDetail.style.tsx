import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    productDetailWrapper: {
      "&.productDetailpage": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .transparentBg": {
          textDecoration: "none",
          background: "transparent",
          width: "auto",
        },
        "& .gridContainerProduct": {
          width: "100%",
          display: "flex",
          flexDirection: "column",
          paddingTop: "25px",
          [theme.breakpoints.up("md")]: {
            paddingTop: "35px",
          },
          [theme.breakpoints.up("em")]: {
            paddingTop: "35px",
            flexDirection: "row",
          },
        },
        "& .tabDocumentWrapper": {
          margin: "0px 0px",
          [theme.breakpoints.up("md")]: {
            margin: "20px 0",
          },
        },
        "& .productListingWrapper": {
          padding: "0",
          [theme.breakpoints.up("md")]: {},
          [theme.breakpoints.up("em")]: {
            padding: "0 25px",
          },
        },
      },
    },
  };
});
