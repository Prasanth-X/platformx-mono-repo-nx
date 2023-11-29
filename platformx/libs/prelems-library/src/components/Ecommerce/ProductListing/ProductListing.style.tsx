import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    productListingWrapper: {
      "&.productListingPage": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .hiddenButton": {
          visibility: "visible",
          cursor: "pointer",
        },
        "& .iconbutton": {
          padding: "12px 18px",
        },
        "& .buttonWrapper": {
          border: `1px solid ${theme.palette.prelemType1.LINE}`,
          background: "transparent",
          padding: "10px 10px",
          minWidth: "107px",
          height: "58px",
          display: "flex",
          alignContent: "center",
          justifyContent: "space-around",
          alignItems: "center",
        },
        "& .noGapTop": {
          marginTop: 0,
        },
        "& .noGapBottom": {
          marginBottom: 0,
        },
        "& .topheading": {
          minHeight: "20px",
          textTransform: "uppercase",
        },
        "& .price": {
          color: `${theme.palette.prelemType1.LABEL}`,
        },
        "& .buttonItem": {
          "& button": {
            whiteSpace: "nowrap",
            [theme.breakpoints.down("sm")]: {
              minWidth: "130px",
              padding: "6px",
              marginRight: 0,
            },
          },
        },
        "& .boxOverflow": {
          overflow: "hidden",
        },
        "& .productCardWarpper": {
          display: "flex",
          flexDirection: "row",
        },
        "& .loadingImgWrapper": {
          minHeight: "255px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          [theme.breakpoints.up("md")]: {
            minHeight: "290px",
          },
          [theme.breakpoints.up("em")]: {
            minHeight: "400px",
          },
        },
        "& .allProductListingWrapper": {
          display: "flex",
          flexWrap: "wrap",
        },
        "& .noProductWrapper": {
          minHeight: "255px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
          margin: "0px auto",
          [theme.breakpoints.up("md")]: {
            minHeight: "290px",
          },
          [theme.breakpoints.up("em")]: {
            minHeight: "400px",
          },
          "& svg": {
            fill: theme.palette.prelemType1.PARAGRAPH,
            opacity: 0.6,
          },
        },
        "& .iconSize": {
          fontSize: "50px",
        },
        "& .cusror": {
          cursor: "pointer",
        },
        "& .imgWrapper": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // borderRadius: theme.borderRadius.value,
          height: "210px",
          [theme.breakpoints.up("md")]: {
            height: "455px",
          },
          [theme.breakpoints.up("em")]: {
            height: "350px",
          },
          background: theme.palette.prelemType1.CARDS.ECOM_CARD_BACKGROUND,
          borderRadius: theme.borderRadius.value1,
        },
        "& .image-container": {
          "&:after": {
            background: theme.palette.prelemType1.CARDS.ECOM_MASK_BACKGROUND,
            borderRadius: theme.borderRadius.value1,
            opacity: 0.03,
          },
        },
        "& .loadMore": {
          display: "flex",
          justifyContent: "center",
        },
      },
    },
  };
});
