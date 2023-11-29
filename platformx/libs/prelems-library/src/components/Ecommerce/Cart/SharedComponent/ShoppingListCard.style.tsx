import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    cartEachItemRowsWrapper: {
      "&.cartEachItemRows": {
        display: "flex",
        marginTop: "20px",
        borderBottom: `1px solid ${theme.palette.prelemType1.LINE}`,
        justifyContent: "space-between",
        flexDirection: "column",
        [theme.breakpoints.up("md")]: {
          alignItems: "flex-start",
        },
        [theme.breakpoints.up("lg")]: {
          flexDirection: "row",
        },
        "& .productRow": {
          display: "flex",
          width: "100%",
          [theme.breakpoints.up("lg")]: {
            width: "auto",
          },
        },
        "& .removeIconrow": {
          cursor: "pointer",
          alignSelf: "flex-start",
          marginTop: "24px",
          margin: "24px 4px 0 0",
          color: theme.palette.prelemType1.TITLE,
          [theme.breakpoints.up("sm")]: {
            margin: "24px 16px 0 0",
            position: "relative",
          },
        },
        "& .productImageWrapper": {
          margin: "0px 20px 0 0",
          width: "70px",
          height: "80px",
          // display: "none",
          [theme.breakpoints.up("sm")]: {
            // display: "block"
          },
          [theme.breakpoints.up("md")]: {
            margin: "0px 45px 20px 0",
            width: "92px",
            height: "92px",
          },
          [theme.breakpoints.up("em")]: {
            width: "92px",
            height: "92px",
          },
        },
        "& .imageWrapper": {
          width: "70px",
          height: "80px",
          padding: "5px",
          [theme.breakpoints.up("md")]: {
            width: "92px",
            height: "92px",
            padding: "10px",
          },
        },
        "& .smallScreen": {
          width: `calc(100% - 120px)`,
          marginBottom: "16px",
        },
        "& .productNameWrapper": {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        },
        "& .productName": {
          marginTop: 0,
          width: "100%",
          WebkitLineClamp: 2,
          textOverflow: "ellipsis",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          wordWrap: "break-word",
          [theme.breakpoints.up("lg")]: {
            width: "270px",
          },
          [theme.breakpoints.up("em")]: {
            marginTop: "revert",
          },
        },
        "& .quantityandPriceWrapper": {
          display: "flex",
          flexDirection: "column",
          [theme.breakpoints.up("sm")]: {
            flexDirection: "row",
            // alignItems: "center",
          },
          // "& .ecom-actual-price.skeletonLoad": {
          //   marginRight: "16px",
          // }
          "& .quantityText": {
            display: "none",
          },
        },
        "& .quantityBtn": {
          marginTop: 0,
          display: "flex",
          [theme.breakpoints.up("lg")]: {
            display: "none",
          },
        },
        "& .sellPriceWrapper": {
          display: "flex",
          flexDirection: "row",
          marginTop: "8px",
          // marginBottom: "16px",
          marginLeft: "0",
          [theme.breakpoints.up("sm")]: {
            marginLeft: "20px",
            marginTop: 0,
          },
          [theme.breakpoints.up("md")]: {
            // marginLeft: "75px",
            marginLeft: "16px",
            justifyContent: "flex-end",
          },
          [theme.breakpoints.up("lg")]: {
            display: "none",
          },
          "& .ecom-sell-price.skeletonLoad": {
            marginRight: "16px",
            marginTop: "8px",
          },
          "& .ecom-actual-price.skeletonLoad": {
            marginTop: "8px",
          },
        },
        "& .sellPriceDesktopWrapper": {
          display: "none",
          alignItems: "flex-end",
          [theme.breakpoints.up("lg")]: {
            display: "flex",
          },
        },
        "& .boxWrapper": {
          display: "flex",
          alignItems: "center",
          height: "72px",
        },
        "& .priceWrapper": {
          marginLeft: "20px",
          marginRight: "12px",
          display: "none",
          [theme.breakpoints.up("em")]: {
            display: "flex",
          },
        },
        "& .hideShow": {
          display: "none",
          [theme.breakpoints.up("md")]: {
            display: "block",
          },
          "& .quantityText": {
            display: "none",
          },
        },
        "& .sellPriceWrapper2": {
          display: "none",
          flexDirection: "column",
          // marginLeft: "35px",
          marginLeft: "12px",
          [theme.breakpoints.up("md")]: {
            display: "flex",
            justifyContent: "flex-end",
          },
        },
        "& .sellPriceBox": {
          display: "block",
          [theme.breakpoints.up("lg")]: {
            display: "none",
          },
        },
      },
    },
  };
});
