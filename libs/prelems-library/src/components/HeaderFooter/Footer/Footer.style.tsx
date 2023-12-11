import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    xfooter: {
      "&.footerBackground": {
        backgroundColor: theme.palette.footer.VARIANT1.BACKGROUND,
        borderTop: `solid 1px ${theme.palette.footer.VARIANT1.LINE}`,
        borderRadius: "0px",
        "& .footerPadding": {
          padding: "16px 3%",
          [theme.breakpoints.up("sm")]: {
            padding: "50px 3%",
          },
          //*color: theme.palette.lightText,
        },
        "& .gapRight": {
          [theme.breakpoints.up("em")]: {
            paddingRight: "50px",
          },
        },
        "& .footerLogo": {
          marginBottom: "32px",
          maxWidth: "250px",
        },
        "& .aboutPara": {
          wordWrap: "break-word",
        },
        "& .anchorWrapper": {
          marginTop: "32px",
          "& .anchorGap": {
            margin: "10px 10px 10px 0px",
          },
        },
        "& .margin_zero": {
          marginTop: "0px",
          marginBottom: "0px",
          wordBreak: "break-word",
        },
        "& .footerSecondColumn": {
          [theme.breakpoints.up("em")]: {
            paddingRight: "50px",
            paddingTop: 0,
          },
          [theme.breakpoints.up("xs")]: {
            paddingTop: "50px",
          },
          [theme.breakpoints.up("sm")]: {
            paddingTop: 0,
          },
          "& .footerSection1": {
            display: "flex",
            marginTop: "32px",
            marginBottom: "32px",
            "& img": {
              marginRight: "15px",
            },
          },
          "& .footerSection2": {
            display: "flex",
            marginBottom: "32px",
            "& img": {
              marginRight: "15px",
              marginTop: "0px",
            },
          },
          "& .footerSection3": {
            display: "flex",
            "& img": {
              marginRight: "15px",
              marginTop: "0px",
            },
          },
        },
        "& .footerLastColumn": {
          [theme.breakpoints.up("em")]: {
            paddingRight: "10px",
            paddingTop: 0,
          },
          [theme.breakpoints.down("xs")]: {
            paddingTop: "50px",
            marginTop: "32px",
          },
          [theme.breakpoints.down("sm")]: {
            marginTop: "32px",
          },
          "& .footerSection1": {
            marginTop: "32px",
          },
        },
      },
      "&.footercopyRight": {
        backgroundColor: theme.palette.footer.VARIANT1.BACKGROUND_SECOND,
        padding: "20px 8% 20px 3%",
        //flexDirection: "column-reverse",
        justifyContent: "space-between",
        [theme.breakpoints.up("em")]: {
          padding: "15px 6% 15px 3%",
          flexDirection: "row",
        },
        "& .dividerLine": {
          margin: 0,
          width: "auto",
          padding: "0px 10px 0px 10px",
          borderColor: theme.palette.prelemType2.LINE,
          display: "block",
          [theme.breakpoints.up("em")]: {
            display: "none",
          },
        },
        "& .copyRightLeftcolumn": {
          textAlign: "left",
          padding: "20px 0px 0px 0px",
          [theme.breakpoints.up("em")]: {
            padding: 0,
          },
        },
        "& .copyRightSecondcolumn": {
          flexWrap: "wrap",
          textAlign: "right",
          [theme.breakpoints.up("xs")]: {
            display: "flex",
            paddingTop: "16px",
          },
          [theme.breakpoints.up("em")]: {
            display: "block",
            paddingTop: "0",
          },
        },
        "& .footerLinkColor": {
          [theme.breakpoints.up("xs")]: {
            padding: "0px 10px 24px 0px",
          },
          [theme.breakpoints.up("sm")]: {
            padding: "0px 20px 24px 0px",
          },
          [theme.breakpoints.up("em")]: {
            padding: "0px 0px 0px 30px",
          },
          //*color: theme.palette.lightText,
        },
        "& .margin_zero": {
          marginTop: "0px",
          marginBottom: "0px",
        },
      },
    },
  };
});
