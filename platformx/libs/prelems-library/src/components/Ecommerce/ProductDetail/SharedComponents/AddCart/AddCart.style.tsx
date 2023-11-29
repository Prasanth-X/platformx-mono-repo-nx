import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    addToCartWrapper: {
      "&.cartAllButton": {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
        },
        marginTop: "24px",
        "& .productQuantityWrapper": {
          [theme.breakpoints.down("sm")]: {
            marginRight: "0px",
          },
          marginRight: "20px",
          display: "block",
          "& .quantityButtonWrapper": {
            [theme.breakpoints.down("sm")]: {
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            },
            "& button": {
              [theme.breakpoints.down("sm")]: {
                minWidth: "40px !important",
              },
            },
            "& .quantityText": {
              margin: "0px",
              lineHeight: "unset",
              width: "auto",
              flex: "auto",
              [theme.breakpoints.up("sm")]: {
                display: "none",
              },
            },
          },
        },
        "& .gapTopQuantity": {
          marginTop: "10px",
        },
        "& .onlyButtons": {
          [theme.breakpoints.down("sm")]: {
            display: "flex",
            flexDirection: "row",
            "& button": {
              minWidth: `calc(50% - 5px)`,
            },
          },
        },
      },
    },
    mainEarningPointLoyality: {
      "&.mainEarningPoint": {
        border: "1px solid #8CC8FA",
        borderRadius: "5px",
        marginTop: "15px",
        background: "#F3FAFF",
        "& .BoxLoyalityPoint1": {
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        },
        "& .BoxImageLoyalityPoint": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0px 14px",
        },
        "& .MainBoxText": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      "& .TypographyPurchase": {
        margin: "0px",
        color: "#2D2D39",
      },
      "& .DivMoreInfo": {
        color: "#4B9EF9",
        fontStyle: "italic",
        textDecoration: "underline",
        cursor: "pointer",
        marginLeft: "5px",
      },
    },
  };
});
