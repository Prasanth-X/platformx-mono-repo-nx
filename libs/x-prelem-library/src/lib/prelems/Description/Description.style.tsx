import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    descriptionWrapperPrelem: {
      "&.descriptionBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .rightWrapper": {
          width: "100%",
          padding: "15px 0  5px 0px",
          [theme.breakpoints.down("em")]: {
            padding: "15px 0  5px 0px",
          },
          [theme.breakpoints.down("sm")]: {
            padding: "30px 0 0",
          },
        },
        "& .imgBoxColorWrapper": {
          border: `1.5px solid ${theme.palette.prelemType1.NOTIFICATION.ERROR.BACKGROUND}`,
          position: "relative",
          width: "90%",
          marginLeft: "20px",
          marginTop: "10px",
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
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
          },
        },
        "& .dottedImgFirst": {
          position: "absolute",
          top: "18%",
          right: "-9%",
          width: "20%",
          [theme.breakpoints.down("md")]: {
            right: "-10%",
          },
          [theme.breakpoints.down("sm")]: {
            top: "12%",
            width: "25%",
            right: "-5.5%",
          },
          [theme.breakpoints.up("xs")]: {
            top: "10%",
            width: "20%",
            right: "-5%",
          },
          "& img": {
            maxWidth: "100%",
          },
        },
        "& .rightBottomImg": {
          position: "absolute",
          top: "60%",
          right: "25%",
          width: "25%",
          [theme.breakpoints.down("md")]: {
            right: "10%",
          },
          [theme.breakpoints.down("sm")]: {
            top: "58%",
            right: "-5%",
            width: "30%",
          },
          [theme.breakpoints.up("xs")]: {
            top: "60%",
            width: "25%",
            right: "-5%",
          },
          "& img": {
            maxWidth: "100%",
            // border: `5px solid ${theme.palette.primaryColor[100]}`,
            boxShadow: "5px 8px 32px 0 rgba(0, 0, 0, 0.22)",
          },
        },
      },
    },
  };
});
