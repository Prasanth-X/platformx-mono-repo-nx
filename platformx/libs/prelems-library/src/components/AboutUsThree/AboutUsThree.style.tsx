import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    aboutUsThreeWrapper: {
      "&.aboutUsThreeBg": {
        background: theme.palette.prelemType3.BACKGROUND,
        // background: `linear-gradient(to top, ${theme.palette.primaryColor[300]} 80%, ${theme.palette.primaryColor[200]} 20%)`,
        // [theme.breakpoints.up("sm")]: {
        //   background: `linear-gradient(to top, ${theme.palette.primaryColor[300]} 65%, ${theme.palette.primaryColor[200]} 35%)`,
        // },
        // [theme.breakpoints.up("em")]: {
        //   background: `linear-gradient(to left, ${theme.palette.primaryColor[300]} 67%, ${theme.palette.primaryColor[200]} 33%)`,
        // },
        "& .gridcontainer": {
          padding: "25px 0",
          display: "flex",
          alignItems: "center",
          [theme.breakpoints.up("md")]: {
            padding: "30px 0",
          },
          [theme.breakpoints.up("lg")]: {
            padding: "65px 0",
          },
        },
        "& .imageWrapper": {
          display: "flex",
          height: "272px",
          paddingRight: "5px",
          "& .rounderCardImages": {
            borderRadius: theme.borderRadius.value1,
          },
          [theme.breakpoints.up("sm")]: {
            height: "462px",
          },
          [theme.breakpoints.up("md")]: {
            height: "600px",
            paddingRight: "10px",
          },
          [theme.breakpoints.up("em")]: {
            height: "470px",
          },
          [theme.breakpoints.up("lg")]: {
            height: "500px",
            paddingRight: "16px",
          },
        },
        "& .imageWrapper1": {
          position: "relative",
          display: "flex",
          height: "272px",
          paddingLeft: "5px",
          [theme.breakpoints.up("sm")]: {
            height: "462px",
          },
          [theme.breakpoints.up("md")]: {
            height: "600px",
            paddingLeft: "10px",
          },
          [theme.breakpoints.up("em")]: {
            height: "470px",
          },
          [theme.breakpoints.up("lg")]: {
            height: "500px",
            paddingLeft: "16px",
          },
          "& video": {
            objectFit: "cover",
            borderRadius: theme.borderRadius.value1,
          },
        },
        "& .playIcon": {
          fontSize: "82px",
          color: theme.palette.textColor,
        },
        "& .contentWrapper": {
          marginTop: "17px",
          padding: "10px 0",
          [theme.breakpoints.up("md")]: {
            marginTop: "24px",
            padding: "0px 0px",
          },
          [theme.breakpoints.up("em")]: {
            marginTop: "0",
            padding: "0px 0 10px 44px",
          },
          [theme.breakpoints.up("xl")]: {
            padding: "0px 0 10px 64px",
          },
        },
        "& .alignList": {
          display: "flex",
          alignItems: "center",
        },
        "& .doneIcon": {
          color: theme.palette.prelemType3.NOTIFICATION.SUCCESS.BACKGROUND,
          fontSize: "22px",
          marginRight: "10px",
        },
        "& .gap": {
          marginTop: "24px",
        },
      },
    },
  };
});

export default useCustomStyle;
