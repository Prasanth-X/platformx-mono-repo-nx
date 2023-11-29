import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    gallery2Wrapper: {
      "&.gallery2Bg": {
        background: theme.palette.prelemType3.BACKGROUND,
        "& .boxWrapper": {
          textAlign: "center",
          boxSizing: "border-box",
        },
        "& .descriptionBox": {
          margin: "0 auto",
          textAlign: "center",
          width: "80%",
        },
        "& .looperListWrapper": {
          overflow: "hidden",
          position: "relative",
          padding: "14px 0 0 0",
          "&:hover": {
            "& .overlay": {
              display: "flex",
            },
          },
        },
        "& .looperList": {
          display: "flex",
          marginBottom: "22px",
          video: {
            borderRadius: theme.borderRadius.value1,
          },
        },
        "& .looperItem": {
          maxWidth: "680px",
          [theme.breakpoints.up("xs")]: {
            height: "312px",
          },
          [theme.breakpoints.up("md")]: {
            height: "276px",
          },
          [theme.breakpoints.up("lg")]: {
            height: "276px",
          },
          padding: "0 12px",
        },
        "& .thumbnail": {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          borderRadius: theme.borderRadius.value1,
        },
        "& .hideElementClass": {
          display: "none",
        },
        "& .overlay": {
          background: `rgba(${theme.palette.overlay["editOverlay"]})`,
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1",
          "& .overLaytextgap": {
            marginTop: "0px",
          },
        },
        "& .pointer": {
          cursor: "pointer",
          textAlign: "center",
        },
        "& .iconWrapper": {
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.1)",
          },
        },
        "& .icon": {
          fill: theme.palette.autoRenewIcon,
          [theme.breakpoints.up("xs")]: {
            width: "50px",
            height: "50px",
          },
          [theme.breakpoints.up("sm")]: {
            width: "50px",
            height: "50px",
          },
        },
      },
    },
  };
});
