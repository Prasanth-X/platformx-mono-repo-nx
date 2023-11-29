import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    productDetailGallery: {
      "&.ecomProductDetailGallery": {
        display: "grid",
        [theme.breakpoints.up("em")]: {
          display: "flex",
        },
        "& .smallImageWrapper": {
          display: "flex",
          order: 2,
          [theme.breakpoints.up("xs")]: {
            flexDirection: "row",
          },
          [theme.breakpoints.up("md")]: {
            flexDirection: "row",
          },
          [theme.breakpoints.up("em")]: {
            order: 1,
            flexDirection: "column",
          },
        },
        "& .large-image, & .product-thumbnail button": {
          "&:after": {
            background: theme.palette.prelemType1.CARDS.ECOM_MASK_BACKGROUND,
            borderRadius: theme.borderRadius.value1,
            opacity: 0.03,
          },
        },
        "& .previousIcon": {
          width: "45px",
          height: "45px",
          marginTop: "30px !important",
          marginRight: "16px",
          fill: theme.palette.prelemType1.TITLE,
        },
        "& .previousIconDesktop": {
          width: "45px",
          height: "45px",
          marginLeft: "16px",
          marginBottom: "16px",
          fill: theme.palette.prelemType1.TITLE,
        },
        "& .skeltonThumb": {
          boxShadow: "none",
          borderRadius: theme.borderRadius.value,
          margin: "16px 10px 16px 0",
          [theme.breakpoints.up("md")]: {
            margin: "22px 22px 22px 0",
          },
          [theme.breakpoints.up("em")]: {
            margin: "0 18px 18px 0",
          },
          "& .skeleton": {
            width: "75px",
            minHeight: "75px",
            [theme.breakpoints.up("md")]: {
              width: "105px",
              minHeight: "105px",
            },
            [theme.breakpoints.up("em")]: {
              width: "80px",
              minHeight: "80px",
            },
          },
        },
        "& .nextIcon": {
          width: "45px",
          height: "45px",
          marginTop: "30px !important",
        },
        "& .nextThumb": {
          width: "45px",
          height: "45px",
          marginLeft: "16px",
        },
        "& .largeImageGap": {
          borderRadius: theme.borderRadius.value,
          boxShadow: "none",
          [theme.breakpoints.up("md")]: {
            marginRight: "20px",
          },
          [theme.breakpoints.up("lg")]: {
            marginRight: "50px",
          },
        },
        "& .cardActionArea": {
          "&:hover": {
            transform: "none",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        },
      },
    },
  };
});
