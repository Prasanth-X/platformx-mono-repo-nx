import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    service1PrelemWrapper: {
      "&.service1PrelemBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .TypoRight": {
          margin: "30px 0",
        },
        "& .LeftServices1": {
          paddingRight: "25px",
          [theme.breakpoints.down("sm")]: {
            paddingRight: "0px",
          },
        },
        "& .ServiceWrapperBoxOverflowX": {
          overflowX: "hidden",
        },
        "& .ReplaceWrapper": {
          background: `rgba(${theme.palette.overlay["editOverlay"]})`,
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1",
        },
        "& .replaceIconWrapper": {
          width: "70px",
          height: "70px",
          color: theme.palette.autoRenewIcon,
          margin: "auto",
          [theme.breakpoints.down("sm")]: {
            width: "50px",
            height: "50px",
          },
        },
        "& .WrapperBoxIcons": {
          cursor: "pointer",
          textAlign: "center",
        },
      },
    },
  };
});
