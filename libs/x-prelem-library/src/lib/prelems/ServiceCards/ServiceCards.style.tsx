import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    serviceCardsWrapperPrelem: {
      "&.serviceCardsBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .imageWrapper": {
          position: "relative",
          display: "flex",
          textAlign: "center",
          padding: 0,
          overflow: "hidden",
          borderRadius: theme.borderRadius.value1,
          "& img": {
            width: "100%",
            height: "400px",
            objectFit: "cover",
            [theme.breakpoints.down("lg")]: {
              height: "350px",
            },
            [theme.breakpoints.down("em")]: {
              height: "270px",
            },
            [theme.breakpoints.down("md")]: {
              height: "220px",
            },
            [theme.breakpoints.down("sm")]: {
              height: "250px",
            },
          },
        },
        "& .tabbtn": {
          width: "100%",
        },
        "& .firstButtonWrapper": {
          position: "absolute",
          bottom: "16px",
          width: "100%",
          padding: "0 25px",
          "& button": {
            width: "100%",
            margin: 0,
          },
        },
        "& .secondButtonWrapper": {
          position: "absolute",
          left: "0",
          width: "100%",
          padding: "0 25px",
          top: "16px",
          "& button": {
            width: "100%",
            margin: 0,
          },
        },
        "& .cardGradient": {
          width: "100%",
          height: "100%",
          position: "absolute",
          background: `rgba(${theme.palette.overlay.cardOverlay})`,
          display: "none",
        },
      },
    },
  };
});
