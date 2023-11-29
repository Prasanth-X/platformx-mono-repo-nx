import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    signUpScreenWrapper: {
      "&.signUpScreenBg": {
        background: theme.palette.prelemType3.BACKGROUND,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        "& .signUpScreen": {
          maxWidth: "976px",
          width: "100%",
          margin: "0px auto",
          background: theme.palette.prelemType1.BACKGROUND,
          display: "flex",
          flexDirection: "column",
          [theme.breakpoints.up("md")]: {
            borderRadius: theme.borderRadius.value1,
            flexDirection: "row",
          },
          overflow: "hidden",
          "& .leftPanel": {
            width: "100%",
            [theme.breakpoints.up("md")]: {
              width: "55%",
            },
            padding: theme.spacing(3),
            textAlign: "center",
            background: theme.palette.prelemType3.ACCENTS.VARIANT2.BACKGROUND,
            position: "relative",
            "& .logoWrapper": {
              cursor: "pointer",
              display: "flex",
              height: "60px",
              textAlign: "left",
              "& img": {
                maxHeight: "30px",
              },
            },
            "& .imageWrapper": {
              display: "flex",
              justifyContent: "center",
              "& .signUpImg": {
                display: "none",
                [theme.breakpoints.up("md")]: {
                  display: "block",
                },
                maxHeight: "300px",
              },
            },
            "& .quoteMessage": {
              [theme.breakpoints.up("xs")]: {
                width: "100%",
              },
              [theme.breakpoints.up("md")]: {
                width: "70%",
                margin: "0px auto",
              },
            },
            "& .title": {
              color: theme.palette.prelemType3.ACCENTS.VARIANT2.TITLE,
            },
            "& .description": {
              color: theme.palette.prelemType3.ACCENTS.VARIANT2.PARAGRAPH,
            },
          },
          "& .rightPanel": {
            width: "100%",
            [theme.breakpoints.up("md")]: {
              width: "45%",
            },
            padding: theme.spacing(3),
            "& .formContainer": {
              maxWidth: "100%",
              [theme.breakpoints.up("sm")]: {
                maxWidth: "90%",
              },
              [theme.breakpoints.up("md")]: {
                maxWidth: "320px",
              },
              margin: "0px auto",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              height: "100%",
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              "& .input-control-textbox": {
                marginBottom: "15px",
              },
              "& .formGrid": {
                marginTop: theme.spacing(2),
              },
            },
          },
          "& .marginTopZero": {
            marginTop: 0,
          },
          "& .signUpButton": {
            width: "100%",
            marginRight: 0,
          },
          "& .link": {
            marginLeft: "5px",
            cursor: "pointer",
          },
          "& .textCenter": {
            textAlign: "center",
          },
        },
      },
    },
  };
});
