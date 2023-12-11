import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    ecommerce3Slot2Wrapper: {
      "&.ecommerce3Slot2Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .gridContainer": {
          width: "100%",
          display: "flex",
          justifyContent: "center",
          [theme.breakpoints.up("xs")]: {
            flexDirection: "column",
          },
          [theme.breakpoints.up("em")]: {
            flexDirection: "row",
          },
          "& .eachImageGrid": {
            position: "relative",
            padding: "8px",
            "& .Ecommerce3slot2ImageInner": {
              width: "100%",
              position: "relative",
              [theme.breakpoints.up("xs")]: {
                height: "280px",
              },
              [theme.breakpoints.up("md")]: {
                height: "342px",
              },
              [theme.breakpoints.up("em")]: {
                height: "314px",
              },
              "& img": {
                borderRadius: theme.borderRadius.value1,
              },
            },
            "& .textArea": {
              color: "white",
              textAlign: "center",
              position: "absolute",
              bottom: "50px",
              left: 0,
              right: 0,
              height: "fit-content",
              margin: "auto",
              zIndex: 2,
              [theme.breakpoints.up("md")]: {
                textAlign: "left",
                paddingLeft: "32px",
              },
              [theme.breakpoints.up("em")]: {
                width: "80%",
                paddingLeft: "0px",
                textAlign: "center",
                left: "24px",
                right: "24px",
              },
            },
            "& .imageOverlay": {
              position: "absolute",
              [theme.breakpoints.up("xs")]: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%)",
              zIndex: 1,
              borderRadius: theme.borderRadius.value1,
            },
            "& .replaceOvelay": {
              position: "absolute",
              top: "41%",
              left: "46%",
              zIndex: 2,
              display: "flex",
              "& .replaceIconClass": {
                borderRadius: "50%",
                backgroundColor: "#fff",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "& .replaceIconColorClass": {
                  color: "#626060",
                },
              },
            },
            "& .hideElementClass": {
              display: "none",
            },
          },
        },
      },
    },
  };
});
