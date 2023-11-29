import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    serviceCard6Wrapper: {
      "&.serviceCard6Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .firstColumnWrapper": {
          [theme.breakpoints.up("xs")]: {
            textAlign: "left",
            marginLeft: 0,
            paddingRight: "16px",
            paddingLeft: 0,
          },
          [theme.breakpoints.up("sm")]: {
            padding: "0px 60px 0px 0px",
          },
          [theme.breakpoints.up("md")]: {
            padding: "0px 50px 0px 0px",
          },
          [theme.breakpoints.up("em")]: {
            marginLeft: 0,
            padding: "0px 90px 0px 0px",
          },
          [theme.breakpoints.up("xl")]: {
            padding: "0px 80px 0px 0px",
          },
        },
        "& .secondColumnWrapper": {
          display: "inline-block",
          position: "relative",
          [theme.breakpoints.up("xs")]: {
            order: 1,
            // marginBottom: '30px',
            marginLeft: 0,
            paddingTop: "12px",
          },
          [theme.breakpoints.up("sm")]: {
            order: 2,
            marginBottom: 0,
            marginLeft: 0,
            paddingTop: "12px",
          },
          [theme.breakpoints.up("md")]: {
            marginLeft: 0,
            paddingTop: "12px",
          },
          [theme.breakpoints.up("lg")]: {
            paddingTop: 0,
          },
          "&:hover": {
            "& .overlay": {
              display: "flex",
            },
          },
        },
        "& .noPadding": {
          paddingLeft: theme.spacing(1),
        },
        "& .cardWrapper": {
          width: "310px",
          padding: "33px 37px 32px 28px",
          borderRadius: "8px",
          boxShadow: "none",
          position: "relative",
          height: "420px",
          [theme.breakpoints.up("md")]: {
            height: "424px",
          },
          [theme.breakpoints.up("lg")]: {
            height: "440px",
          },
        },
        "& .cardContent": {
          [theme.breakpoints.up("xs")]: {
            padding: "2px",
          },
          [theme.breakpoints.up("sm")]: {
            padding: "10px",
          },
          [theme.breakpoints.up("lg")]: {
            padding: "10px",
          },
        },
        "& .singlebr": {
          color: theme.palette.prelemType1.ACCENTS.VARIANT1.TITLE,
        },
        "& .sixbr": {
          color: theme.palette.prelemType1.ACCENTS.VARIANT1.PARAGRAPH,
        },
        "& .sliderWrapper": {
          display: "block",
        },
        "& .cardItem": {
          width: "50px",
          height: "50px",
          marginBottom: "12px",
          borderRadius: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        },
        "& .cardItemImg": {
          margin: "12px",
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
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          "& .overLaytextgap": {
            marginTop: "0px",
          },
        },
        "& .bottomAlign": {
          position: "absolute",
          bottom: "36px",
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
