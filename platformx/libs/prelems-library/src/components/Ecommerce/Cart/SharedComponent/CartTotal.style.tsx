import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    cartrightSideWrapper: {
      "&.cartRightSideBarBg": {
        backgroundColor: theme.palette.prelemType3.BACKGROUND,
        padding: "16px",
        [theme.breakpoints.up("md")]: {
          padding: "25px 20px",
        },
        "& .top-section-ecom-wrapper": {
          display: "flex",
          height: "48px",
          alignItems: "center",
          "& .skeletonLoad": {
            width: "90px",
          },
        },
        "& .subtotal": {
          // color: theme.palette.primaryColor[700],
          flexGrow: 1,
        },
        "& .boxWrapper": {
          marginTop: "30px",
          marginLeft: "0px",
          marginBottom: "50px",
        },
        "& .subTotalGap": {
          display: "flex",
          marginTop: "8px",
          alignItems: "center",
          height: "48px",
          "& .skeletonLoad": {
            width: "90px",
          },
        },
        "& .SidebarButtonWrapper": {
          display: "flex",
          justifyContent: "end",
        },
        "& .buttonWrapperInner": {
          margin: 0,
          marginTop: "40px",
          minWidth: "100%",
          [theme.breakpoints.up("md")]: {
            minWidth: "210px",
          },
          [theme.breakpoints.up("em")]: {
            minWidth: "100%",
          },
        },
        "& .sideBarTopSection": {
          marginBottom: "30px",
          [theme.breakpoints.up("em")]: {
            flexGrow: 1,
            minHeight: "450px",
            display: "flex",
            flexDirection: "column",
          },
        },
        "& .divider": {
          borderColor: theme.palette.prelemType3.LINE,
        },
      },
    },
  };
});
