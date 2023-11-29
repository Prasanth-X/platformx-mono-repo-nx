import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    circularLoaderDivWrapper: {
      "&.loadingImgWrapperLoader": {
        minHeight: "255px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.up("md")]: {
          minHeight: "290px",
        },
        [theme.breakpoints.up("em")]: {
          minHeight: "400px",
        },
        right: 0,
        bottom: 0,
        top: "50%",
        left: "50%",
        zIndex: 25,
        width: "50px",
        height: "50px",
        position: "fixed",
        transform: "translate(-50%,-50%)",
        "& .loaderImg": {
          width: "100%",
          borderRadius: theme.borderRadius.value,
        },
      },
    },
  };
});
