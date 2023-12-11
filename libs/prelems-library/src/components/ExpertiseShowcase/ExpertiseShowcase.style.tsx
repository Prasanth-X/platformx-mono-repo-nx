import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    expertiseShowcaseWrapper: {
      "&.expertiseShowcaseBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .topcontent": {
          textAlign: "center",
          margin: "0 auto 25px auto",
          [theme.breakpoints.up("md")]: {
            width: "80%",
          },
        },
        "& .expertise-show-case-wrapper": {
          borderRadius: "5px",
          overflow: "hidden",
          "& .overlay-wrapper": {
            height: "100%",
            position: "relative",
            width: "100%",
            "&:hover": {
              cursor: "pointer",
            },
            "& .imgWrapper": {
              position: "relative",
              display: "flex",
              height: "100%",
              width: "100%",
              padding: 0,
              overflow: "hidden",
              "& img": {
                width: "100%",
                height: "100%",
              },
              "& .bottomButton": {
                position: "absolute",
                width: "100%",
                padding: "0px 10px",
                bottom: "-2px",
                "& button": {
                  width: "100%",
                },
              },
            },
            "& .image-button-text": {
              position: "absolute",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              top: "0",
            },
          },
        },
        "& .expertise-cardwrapper2": {
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          "& .boxinner": {
            position: "absolute",
            zIndex: 1,
            "& .iconBox": {
              borderRadius: "50%",
              backgroundColor: theme.palette.textColor,
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "1rem",
              cursor: "pointer",
            },
          },
        },
      },
    },
  };
});
