import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    websiteIntroduction2Wrapper: {
      "&.websiteIntroduction2Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .websiteIntroduction2InnerWrapper": {
          flexDirection: "row",
          [theme.breakpoints.down("em")]: {
            flexDirection: "column-reverse",
          },
        },
        "& .rightWrapper": {
          width: "100%",
          padding: "15px 0  5px 50px",
          [theme.breakpoints.down("em")]: {
            padding: "15px 0  5px 40px",
          },
          [theme.breakpoints.down("sm")]: {
            padding: "30px 0 0",
          },
        },
        "& .imgBoxColorWrapper": {
          border: `1.5px solid ${theme.palette.prelemType1.NOTIFICATION.ERROR.BACKGROUND}`,
          position: "relative",
          marginLeft: "25px",
          height: "435px",
          marginBottom: "0px",
          borderRadius: theme.borderRadius.value1,
          [theme.breakpoints.down("em")]: {
            marginBottom: "30px",
            height: "400px",
          },
          [theme.breakpoints.down("sm")]: {
            height: "294px",
          },
          [theme.breakpoints.down("xs")]: {
            height: "292px",
          },
        },
        "& .imgBoxWrapper": {
          marginTop: "-20px",
          marginLeft: "-20px",
          position: "absolute",
          width: "100%",
          height: "435px",
          [theme.breakpoints.down("em")]: {
            marginBottom: "30px",
            height: "400px",
          },
          [theme.breakpoints.down("sm")]: {
            height: "294px",
          },
          [theme.breakpoints.down("xs")]: {
            height: "292px",
          },
        },
        "& .dottedImgFirst": {
          position: "absolute",
          top: "70%",
          left: "-13%",
          [theme.breakpoints.down("md")]: {
            left: "-18%",
          },
          [theme.breakpoints.down("sm")]: {
            top: "64%",
            left: "-6.5%",
          },
          [theme.breakpoints.up("xs")]: {
            left: "-6%",
          },
        },
        "& .dottedImgSecond": {
          position: "absolute",
          top: "10%",
          right: "-4%",
          [theme.breakpoints.down("sm")]: {
            right: 0,
          },
        },
        "& .leftContentWrapper": {
          paddingRight: "50px",
          textAlign: "left",
          [theme.breakpoints.down("em")]: {
            paddingRight: 0,
          },
        },
      },
    },
  };
});
