import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    awards1Wrapper: {
      "&.awards1Bg": {
        background: theme.palette.prelemType3.BACKGROUND,
        "& .centerText": {
          textAlign: "center",
        },
        "& .headingWrapper": {
          display: "inline-block",
          width: "420px",
          maxWidth: "350px",
          [theme.breakpoints.up("sm")]: {
            width: "420px",
            maxWidth: "420px",
          },
        },
        "& .headingWordWrap": {
          wordWrap: "break-word",
        },
        "& .awardWrapper": {
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          overflow: "hidden",
          position: "relative",
          paddingTop: "32px",
          [theme.breakpoints.up("md")]: {
            paddingTop: "50px",
          },
          "&:hover": {
            "& .overlay": {
              display: "flex",
            },
          },
        },
        "& .cardWrapper": {
          display: "flex",
          flexDirection: "row",
          margin: "0px auto",
        },
        "& .cardItem": {
          color: "#5C6574",
          filter: "grayscale(100%)",
          opacity: "0.7",
          mixBlendMode: "luminosity",
          margin: "0 12px",
          width: "243px",
          maxHeight: "254px",
          [theme.breakpoints.up("md")]: {
            width: "202px",
            maxHeight: "228px",
          },
          [theme.breakpoints.up("em")]: {
            width: "260px",
            maxHeight: "268px",
            margin: "0 13px",
          },
          boxShadow: "none",
          border: `solid 1px ${theme.palette.prelemType3.LINE}`,
          borderRadius: theme.borderRadius.value1,
          "&:hover": {
            filter: "grayscale(0%)",
            opacity: "1",
            mixBlendMode: "normal",
          },
          "& .title": {
            color: theme.palette.prelemType3.CARDS.VARIANT1.TITLE,
          },
          "& .cardDescription": {
            color: theme.palette.prelemType3.CARDS.VARIANT1.PARAGRAPH,
          },
        },
        "& .cardContent": {
          minHeight: "74px",
          padding: "14px 12px 12px",
          textAlign: "center",
          [theme.breakpoints.up("sm")]: {
            minHeight: "73px",
          },
          [theme.breakpoints.up("md")]: {
            padding: "7px 12px 18px",
          },
          [theme.breakpoints.up("em")]: {
            padding: "16px 12px 12px",
            minHeight: "76px",
          },
        },
        "& .cardActionWrapper": {
          height: "79px",
          marginBottom: "79px",
          display: "flex",
          justifyContent: "center",
          [theme.breakpoints.up("md")]: {
            height: "66px",
            marginBottom: "31px",
          },
          [theme.breakpoints.up("em")]: {
            height: "85px",
            marginBottom: "38px",
          },
        },
        "& .cardMedia": {
          maxWidth: "114px",
          maxHeight: "79px",
          margin: "0 auto",
          objectFit: "contain",
          [theme.breakpoints.up("md")]: {
            maxWidth: "95px",
            maxHeight: "66px",
          },
          [theme.breakpoints.up("em")]: {
            maxWidth: "125px",
            maxHeight: "85px",
          },
        },
        "& .card": {
          opacity: "0.7",
          mixBlendMode: "luminosity",
          filter: "grayscale(100%)",
          border: `solid 1px ${theme.palette.prelemType3.CARDS.VARIANT1.BORDER_COLOR}`,
          borderRadius: theme.borderRadius.value1,
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 12px",
          width: "243px",
          height: "254px",
          [theme.breakpoints.up("md")]: {
            width: "202px",
            height: "228px",
          },
          [theme.breakpoints.up("em")]: {
            margin: "0 13px",
            width: "260px",
            height: "268px",
          },
          "&:hover": {
            filter: "grayscale(0%)",
            opacity: "1",
            mixBlendMode: "normal",
          },
        },
        "& .noPadding": {
          padding: 0,
        },
        "& .cardImg": {
          width: "65%",
          margin: "0 auto",
        },
        "& .centerItem": {
          margin: "0px auto",
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
        "& .awardCards": {
          color: "#5C6574",
          // filter: "grayscale(100%)",
          opacity: "0.9",
          mixBlendMode: "luminosity",
          border: `solid 1px ${theme.palette.prelemType3.CARDS.VARIANT1.BORDER_COLOR}`,
          background: theme.palette.prelemType3.CARDS.VARIANT1.BACKGROUND,
          borderRadius: "8px",
          boxShadow: "none",
          margin: "0 12px",
          width: "243px",
          maxHeight: "254px",
          [theme.breakpoints.up("md")]: {
            width: "202px",
            maxHeight: "228px",
          },
          [theme.breakpoints.up("em")]: {
            margin: "0 13px",
            width: "260px",
            maxHeight: "268px",
          },
          "&:hover": {
            filter: "grayscale(0%)",
            opacity: "1",
            mixBlendMode: "normal",
            borderColor: theme.palette.prelemType3.CARDS.VARIANT1.BORDER_COLOR_HOVER,
          },
          "& .title": {
            color: theme.palette.prelemType3.CARDS.VARIANT1.TITLE,
          },
          "& .cardDescription": {
            color: theme.palette.prelemType3.CARDS.VARIANT1.PARAGRAPH,
          },
        },
        "& .awardTitleCenter": {
          minHeight: "74px",
          padding: "14px 12px 0px",
          textAlign: "center",
          [theme.breakpoints.up("sm")]: {
            minHeight: "73px",
          },
          [theme.breakpoints.up("md")]: {
            padding: "7px 12px 0px",
          },
          [theme.breakpoints.up("em")]: {
            minHeight: "76px",
            padding: "16px 12px 0px",
          },
        },
        "& .awardCardActionWrapper": {
          display: "flex",
          justifyContent: "center",
          height: "79px",
          marginBottom: "79px",
          [theme.breakpoints.up("md")]: {
            height: "66px",
            marginBottom: "31px",
          },
          [theme.breakpoints.up("em")]: {
            height: "85px",
            marginBottom: "38px",
          },
        },
        "& .awardCardMedia": {
          maxWidth: "114px",
          maxHeight: "79px",
          margin: "0 auto",
          objectFit: "contain",
          [theme.breakpoints.up("md")]: {
            maxWidth: "95px",
            maxHeight: "66px",
          },
          [theme.breakpoints.up("em")]: {
            maxWidth: "125px",
            maxHeight: "85px",
          },
        },
        "& .awardCards1": {
          opacity: "0.7",
          mixBlendMode: "luminosity",
          filter: "grayscale(100%)",
          margin: "0 12px",
          width: "243px",
          height: "254px",
          border: `solid 1px ${theme.palette.prelemType3.LINE}`,
          borderRadius: theme.borderRadius.value1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          [theme.breakpoints.up("md")]: {
            margin: "0 12px",
            width: "202px",
            height: "228px",
          },
          [theme.breakpoints.up("em")]: {
            margin: "0 13px",
            width: "260px",
            height: "268px",
          },
          "&:hover": {
            filter: "grayscale(0%)",
            opacity: "1",
            mixBlendMode: "normal",
          },
        },
      },
    },
  };
});
