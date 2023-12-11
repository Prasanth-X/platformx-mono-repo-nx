import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    customerTestimonial2Wrapper: {
      "&.customerTestimonial2Bg": {
        backgroundColor: theme.palette.prelemType2.BACKGROUND,
        "& .title": {
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        },
        "& .centerText": {
          textAlign: "center",
          "& svg": {
            fill: theme.palette.prelemType2.TITLE,
          },
        },
        "& .noMargin": {
          margin: 0,
        },
        "& .teasureCenter": {
          textAlign: "center",
          [theme.breakpoints.up("xs")]: {
            margin: "12px 15px 30px",
          },
          [theme.breakpoints.up("md")]: {
            margin: "12px 10% 30px",
          },
          [theme.breakpoints.up("em")]: {
            margin: "12px 18% 30px",
          },
        },
        "& .iconUparrowWrapper": {
          textAlign: "center",
          [theme.breakpoints.up("xs")]: {
            margin: 0,
          },
          [theme.breakpoints.up("md")]: {
            margin: "0 18%",
          },
          [theme.breakpoints.up("em")]: {
            margin: "0 30%",
          },
        },
        "& .iconUparrow": {
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginBottom: "10px",
        },
        "& .sliderWidth": {
          marginBottom: "30px",
          width: "100% !important",
        },
        "& .sliderHeight": {
          height: "100%",
          cursor: "pointer",
        },
        "& .pointer": {
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
        "& .hideElementClass": {
          display: "none",
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
        "& .sliderWrapper": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "15px 0 0 0",
        },
        "& .sliderImage": {
          width: "83px",
          height: "83px",
          objectFit: "cover",
          borderRadius: "50%",
          opacity: 5,
        },
        "& .sliderInnerWrapper": {
          padding: "50px 0",
        },
      },
    },
  };
});
