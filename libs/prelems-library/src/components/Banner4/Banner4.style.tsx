import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    banner4Wrapper: {
      "&.banner4Bgwrapper": {
        "& .prelemBox": {
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(to bottom,${theme.palette.prelemType1.ACCENTS.VARIANT2.BACKGROUND} 70%, ${theme.palette.prelemType1.BACKGROUND} 30%)`,
        },
        "& .dottedRound1": {
          position: "absolute",
          [theme.breakpoints.up("xs")]: {
            top: "-40px",
            left: "-30px",
            maxWidth: "141px",
          },
          [theme.breakpoints.up("md")]: {
            top: "-50px",
            left: "55px",
            maxWidth: "182px",
          },
          [theme.breakpoints.up("lg")]: {
            top: "-60px",
            left: "140px",
            maxWidth: "235px",
          },
        },
        "& .dottedRound2": {
          position: "absolute",
          top: "70%",
          transform: "rotate(180deg)",
          left: "auto",
          zIndex: 1,
          [theme.breakpoints.up("xs")]: {
            right: 0,
            maxWidth: "141px",
            marginTop: "-100px",
          },
          [theme.breakpoints.up("md")]: {
            right: 0,
            maxWidth: "182px",
            marginTop: "-130px",
          },
          [theme.breakpoints.up("lg")]: {
            right: 140,
            maxWidth: "235px",
            marginTop: "-165px",
          },
        },
        "& .container": {
          position: "relative",
        },
        "& .gridItem": {
          textAlign: "center",
          margin: "auto",
          [theme.breakpoints.up("xs")]: {
            padding: "96px 0 48px",
            maxWidth: "100%",
          },
          [theme.breakpoints.up("sm")]: {
            maxWidth: "80%",
          },
          [theme.breakpoints.up("md")]: {
            padding: "65px 0 52px",
            maxWidth: "450px",
          },
          [theme.breakpoints.up("lg")]: {
            padding: "65px 0 46px",
            maxWidth: "500px",
          },
        },
        "& .title1": {
          color: theme.palette.prelemType1.ACCENTS.VARIANT2.TITLE,
        },
        "& .imageContainer": {
          [theme.breakpoints.up("xs")]: {
            width: "96%",
          },
          [theme.breakpoints.up("sm")]: {
            width: "96%",
          },
          [theme.breakpoints.up("md")]: {
            width: "606px",
          },
          [theme.breakpoints.up("em")]: {
            width: "870px",
          },
          margin: "auto",
          borderRadius: "8px",
          overflow: "hidden",
          display: "flex",
        },
        "& .image": {
          width: "100%",
          objectFit: "cover",
        },
        "& .fullWidth": {
          width: "100%",
          height: "100%",
        },
      },
    },
  };
});
