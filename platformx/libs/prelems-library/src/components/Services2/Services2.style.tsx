import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    service2PrelemWrapper: {
      "&.service2PrelemBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .gridBoxServices2": {
          marginTop: 0,
          padding: "16px",
          [theme.breakpoints.down("md")]: {
            padding: "16px",
            marginTop: "30px",
          },
          [theme.breakpoints.down("sm")]: {
            padding: "16px 0",
            marginTop: "15px",
          },
        },
        "& .IconWrapper": {
          width: "30px",
          height: "30px",
          [theme.breakpoints.down("md")]: {
            width: "22.2px",
            height: "22.2px",
          },
          [theme.breakpoints.down("sm")]: {
            width: "32px",
            height: "32px",
          },
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "contain",
          },
        },
        "& .ContentBottonServices2": {
          height: "154px",
          overflow: "hidden",
          [theme.breakpoints.down("sm")]: {
            height: "auto",
          },
        },
        "& .Services2LineBottom": {
          height: "1px",
          backgroundColor: theme.palette.prelemType1.LINE,
          marginTop: "24px",
          marginBottom: "20px",
          [theme.breakpoints.down("md")]: {
            marginTop: "18px",
            marginBottom: "14px",
          },
        },
        "& .Service2Box": {
          height: "210px",
          textAlign: "left",
          [theme.breakpoints.down("sm")]: {
            height: "auto",
          },
          "&:hover": {
            "& .line": {
              backgroundColor: theme.palette.prelemType1.LINE,
            },
            "& .imghover": {
              filter:
                "invert(28%) sepia(83%) saturate(5580%) hue-rotate(344deg) brightness(87%) contrast(94%)",
            },
          },
        },
        "& .LeftServices2": {
          paddingRight: "25px",
          [theme.breakpoints.down("sm")]: {
            paddingRight: "0px",
          },
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
