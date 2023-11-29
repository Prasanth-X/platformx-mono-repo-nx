import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    dynamicEcommercePrelem: {
      "&.dynamicEcommercePrelemWrapper": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .priceItem": {
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
        "& .sliderOverFlow": {
          overflow: "hidden",
        },
        "& .headingRow": {
          display: "flex",
          flexDirection: "column",
          paddingLeft: "8px",
          [theme.breakpoints.up("md")]: {
            flexDirection: "row",
          },
        },
        "& .title": {
          width: "90%",
          [theme.breakpoints.up("sm")]: {
            width: "auto",
          },
        },
        "& .line": {
          borderColor: theme.palette.prelemType1.LINE,
        },
        "& .linkText": {
          display: "flex",
          alignItems: "center",
          marginRight: "4px",
          [theme.breakpoints.up("md")]: {
            marginLeft: "10px",
          },
          "&.largeScreen": {
            display: "none",
            [theme.breakpoints.up("md")]: {
              display: "flex",
            },
          },
          "&.smallScreen": {
            display: "flex",
            [theme.breakpoints.up("md")]: {
              display: "none",
            },
          },
        },
        "& .linkTextItem": {
          [theme.breakpoints.up("md")]: {
            paddingLeft: "12px",
            borderLeft: `solid 1px ${theme.palette.prelemType1.LINE}`,
          },
        },
        "& .transparentButton": {
          display: "none",
          "& svg": {
            fill: theme.palette.prelemType1.TITLE,
          },
          [theme.breakpoints.up("md")]: {
            display: "flex",
          },
        },
        "& .navigationWrapper": {
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "12px",
          alignItems: "baseline",
          padding: 0,
          [theme.breakpoints.up("sm")]: {
            alignItems: "center",
          },
          [theme.breakpoints.up("em")]: {
            padding: "0 10px",
          },
          "& .previousBtn": {
            marginRight: "10px",
            [theme.breakpoints.up("md")]: {
              marginRight: "20px",
            },
          },
        },
        "& .sliderImgWrapper": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "255px",
          [theme.breakpoints.up("md")]: {
            minHeight: "290px",
          },
          [theme.breakpoints.up("em")]: {
            minHeight: "480px",
          },
        },
        "& .imgProp": {
          width: "100%",
          borderRadius: theme.borderRadius.value,
        },
        "& .pointer": {
          padding: "10px",
          cursor: "pointer",
        },
        "& .imgWrapper": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "255px",
          [theme.breakpoints.up("md")]: {
            height: "290px",
          },
          [theme.breakpoints.up("em")]: {
            height: "350px",
          },
          "& button": {
            margin: 0,
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
        "& .pointer1": {
          cursor: "pointer",
          textAlign: "center",
        },
        "& .overlayPosition": {
          position: "relative",
          "&:hover": {
            "& .overlay": {
              display: "flex",
            },
          },
        },
        "& .hideElementClass": {
          display: "none",
        },
        "& .overlay": {
          background: `rgba(${theme.palette.overlay["editOverlay"]})`,
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          "& .overLaytextgap": {
            marginTop: "0px",
          },
        },
        "& .autorenewIcon": {
          fill: theme.palette.autoRenewIcon,
          [theme.breakpoints.up("xs")]: {
            width: "50px",
            height: "50px",
          },
          [theme.breakpoints.up("sm")]: {
            width: "50px",
            height: "50px",
          },
        },
      },
    },
  };
});
