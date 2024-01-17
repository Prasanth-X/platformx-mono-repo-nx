import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    aboutUs2Wrapper: {
      "&.aboutUs2Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .blinkText": {
          color: theme.palette.prelemType1.ACCENTS.VARIANT5.BACKGROUND,
          "& .Typewriter__wrapper": {
            color: theme.palette.prelemType1.ACCENTS.VARIANT5.BACKGROUND,
          },
        },
        "& .textcenter": {
          maxWidth: "100%",
          [theme.breakpoints.down("em")]: {
            textAlign: "center",
          },
        },
        "& .title": {
          marginBottom: 0,
        },
        "& .category": {
          margin: 0,
        },
        "& .categoryText": {
          margin: "0 0 0 0",
          marginBottom: "12px",
        },
        "& .imageWrapper": {
          position: "relative",
          display: "flex",
          [theme.breakpoints.up("xs")]: {
            padding: "0 23px 0 25px",
          },
          [theme.breakpoints.up("sm")]: {
            padding: "0 66px 0 81px",
          },
          [theme.breakpoints.up("md")]: {
            padding: "0 62px 0 112px",
            marginTop: "12px",
          },
          [theme.breakpoints.up("em")]: {
            marginTop: "0",
          },
          [theme.breakpoints.down("md")]: {
            paddingTop: "12px",
          },
        },
        "& .container": {
          display: "flex",
          alignItems: "center",
          [theme.breakpoints.up("xs")]: {
            justifyContent: "center",
            flexWrap: "wrap",
          },
          [theme.breakpoints.up("sm")]: {
            justifyContent: "flex-start",
            flexWrap: "nowrap",
          },
          height: "auto",
        },
        "& .backgroundText": {
          position: "absolute",
          top: "75px",
          width: "290px",
          zIndex: 2,
          [theme.breakpoints.up("xs")]: {
            left: "40px",
            width: "260px",
          },
          [theme.breakpoints.up("sm")]: {
            left: "100px",
            width: "290px",
          },
          [theme.breakpoints.up("md")]: {
            left: "125px",
          },
        },
        "& .fadeBackground": {
          backgroundColor: "rgba(0,0,0,0.53)",
          color: theme.palette.prelemType1.ACCENTS.VARIANT1.BACKGROUND,
        },
        "& .headerBox": {
          display: "flex",
          lineHeight: "40px",
        },
        "& .imageWrapper1": {
          position: "absolute",
          right: 0,
          [theme.breakpoints.up("xs")]: {
            top: "23px",
          },
          [theme.breakpoints.up("sm")]: {
            top: "27px",
          },
          [theme.breakpoints.up("md")]: {
            top: "30px",
          },
        },
        "& .frame1": {
          width: "100%",
          height: "auto",
          objectFit: "contain",
          [theme.breakpoints.up("xs")]: {
            height: "52px",
          },
          [theme.breakpoints.up("sm")]: {
            height: "81px",
          },
          [theme.breakpoints.up("md")]: {
            height: "87px",
          },
        },
        "& .imageWrapper2": {
          position: "absolute",
          left: 0,
          bottom: "53px",
        },
        "& .frame2": {
          width: "100%",
          objectFit: "contain",
          [theme.breakpoints.up("xs")]: {
            height: "56px",
          },
          [theme.breakpoints.up("sm")]: {
            height: "67px",
          },
          [theme.breakpoints.up("md")]: {
            height: "72px",
          },
        },
        "& .imageWrapper3": {
          position: "absolute",
          right: 0,
          bottom: "23px",
          [theme.breakpoints.up("xs")]: {
            marginRight: 0,
          },
          [theme.breakpoints.up("sm")]: {
            marginRight: "35px",
          },
        },
        "& .frame3": {
          width: "100%",
          objectFit: "cover",
          border: `1px solid ${theme.palette.prelemType1.LINE}`,
          borderRadius: theme.borderRadius.value,
          [theme.breakpoints.up("xs")]: {
            height: "22px",
          },
          [theme.breakpoints.up("sm")]: {
            height: "38px",
          },
          [theme.breakpoints.up("md")]: {
            height: "40px",
          },
        },
      },
    },
  };
});
