import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    shoppingSkeltonWrapper: {
      "&.shoppingSkeltonPreLoader": {
        display: "flex",
        flexDirection: "row",
        marginTop: "20px",
        alignItems: "start",
        borderBottom: `1px solid ${theme.palette.prelemType1.LINE}`,
        [theme.breakpoints.up("em")]: {
          marginRight: "20px",
          paddingRight: "30px",
        },
        [theme.breakpoints.up("md")]: {
          alignItems: "center",
        },
        "& .skelton1": {
          margin: "0px 20px 0 0",
          width: "80px",
          height: "92px",
          [theme.breakpoints.up("md")]: {
            margin: "0px 45px 20px 0",
            width: "92px",
          },
          [theme.breakpoints.up("em")]: {
            width: "92px",
            height: "92px",
          },
        },
        "& .skeltonInner": {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        },
        "& .skeltonLine": {
          height: "12px",
          marginBottom: "5px",
          width: "220px",
        },
        "& .skeltonLine1": {
          height: "35px",
          marginBottom: "5px",
          width: "100%",
          display: "block",
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
        },
        "& .skeltonWrapper2": {
          display: "flex",
          flexDirection: "row",
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(2),
          marginLeft: "0",
          justifyContent: "flex-end",
          [theme.breakpoints.up("md")]: {
            display: "none",
            marginLeft: "75px",
            justifyContent: "flex-end",
          },
        },
        "& .skeltopType2": {
          height: "26px",
          width: "100px",
          marginRight: "22px",
          display: "block",
          [theme.breakpoints.up("em")]: {
            display: "none",
          },
        },
        "& .skeltopType3": {
          height: "26px",
          width: "100px",
          display: "block",
          [theme.breakpoints.up("em")]: {
            display: "none",
          },
        },
        "& .skeltonType4": {
          height: "26px",
          width: "100px",
          marginLeft: "15px",
          marginRight: "15px",
          display: "none",
          [theme.breakpoints.up("em")]: {
            display: "block",
          },
          [theme.breakpoints.up("lg")]: {
            marginRight: "65px",
            marginLeft: "22px",
          },
        },
        "& .skeltonType5": {
          height: "58px",
          width: "70px",
          display: "none",
          [theme.breakpoints.up("md")]: {
            display: "block",
          },
        },
        "& .boxWrapper": {
          display: "none",
          flexDirection: "column",
          // marginLeft: '75px',
          marginLeft: "15px",
          [theme.breakpoints.up("md")]: {
            display: "flex",
            justifyContent: "flex-end",
          },
          [theme.breakpoints.up("lg")]: {
            marginLeft: "75px",
          },
        },
        "& .skeltonType6": {
          height: "25px",
          width: "100px",
          display: "block",
          marginRight: "15px",
          [theme.breakpoints.up("em")]: {
            marginRight: "65px",
            display: "none",
          },
        },
        "& .skeltonType7": {
          height: "25px",
          width: "100px",
          marginRight: "15px",
          [theme.breakpoints.up("em")]: {
            marginRight: "65px",
          },
        },
      },
    },
  };
});
