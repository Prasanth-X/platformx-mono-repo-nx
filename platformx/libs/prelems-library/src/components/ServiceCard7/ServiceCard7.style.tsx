import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    serviceCard7wrapper: {
      "&.serviceCard7Bg": {
        background: `linear-gradient(to bottom, ${theme.palette.prelemType2.BACKGROUND} 50%, ${theme.palette.prelemType1.BACKGROUND} 50%)`,
        "& .headingContainer": {
          padding: "15px 0",
          [theme.breakpoints.up("md")]: {
            padding: "0px 70px 0px 0px",
          },
          [theme.breakpoints.up("lg")]: {
            padding: "0px 120px 0px 0px",
          },
          [theme.breakpoints.up("xl")]: {
            padding: "0px 280px 0px 0px",
          },
        },
        "& .line": {
          borderBottom: `solid 1px ${theme.palette.prelemType2.LINE}`,
          width: "80%",
        },
        "& .textcolor": {
          color: theme.palette.prelemType2.ACCENTS.VARIANT4.BACKGROUND,
        },
        "& .gap": {
          marginTop: "20px",
          [theme.breakpoints.up("lg")]: {
            marginTop: "40px",
          },
          [theme.breakpoints.up("lg")]: {
            padding: "0px 120px 0px 0px",
          },
        },
        "& .serviceCardWrapper": {
          display: "inline-block",
          position: "relative",
          marginTop: "30px",
          order: 1,
          [theme.breakpoints.up("sm")]: {
            marginTop: "64px",
            order: 2,
          },
          "&:hover": {
            "& .overlay": {
              display: "flex",
            },
          },
        },
        "& .slider-container1-wrapper": {
          position: "relative",
        },
        "& .card": {
          padding: "38px 18px 28px",
          borderRadius: theme.borderRadius.value1,
          boxShadow: "none",
          border: `solid 1px ${theme.palette.prelemType2.CARDS.VARIANT1.BORDER_COLOR}`,
          position: "relative",
          background: theme.palette.prelemType2.CARDS.VARIANT1.BACKGROUND,
          "& .title": {
            color: theme.palette.prelemType1.CARDS.VARIANT1.TITLE,
          },
          "& .cardDescription": {
            color: theme.palette.prelemType1.CARDS.VARIANT1.PARAGRAPH,
          },
        },
        "& .cardcontent": {
          padding: "0px !important",
          height: "100%",
        },
        "& .imgWrapper": {
          width: "42px",
          height: "42px",
          marginBottom: "25px",
        },
        "& .boxContainer": {
          display: "flex",
          flexDirection: "column",
        },
        "& .blockItem": {
          display: "block",
        },
        "& .boxFullRow": {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          paddingRight: "0px",
          justifyContent: "flex-end",
          marginTop: "24px",
          [theme.breakpoints.up("em")]: {
            flexDirection: "row",
            alignItems: "center",
            paddingRight: "15px",
          },
        },
        "& .description": {
          maxWidth: "100%",
          textAlign: "left",
          marginRight: "0px",
          marginBottom: "12px",
          [theme.breakpoints.up("em")]: {
            maxWidth: "65%",
            textAlign: "right",
            marginRight: "38px",
          },
        },
        "& .heightAuto": {
          height: "100%",
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
          zIndex: "1",
          "& .overLaytextgap": {
            marginTop: "0px",
          },
        },
        "& .pointer": {
          cursor: "pointer",
          textAlign: "center",
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

export default useCustomStyle;
