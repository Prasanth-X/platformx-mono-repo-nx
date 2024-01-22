import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    banner3MainWrapper: {
      "&.banner3Props": {
        position: "relative",
        display: "flex",
        textAlign: "center",
        width: "100%",
        "& img": {
          height: "650px",
          [theme.breakpoints.down("md")]: {
            height: "610px",
          },
          [theme.breakpoints.down("sm")]: {
            height: "920px",
          },
        },
        "& .banner3Overlay": {
          position: "absolute",
          top: "0",
          bottom: "0",
          background: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          height: "100%",
        },
        "& .banner3ContentWrapper": {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
        },
        "& .buttonsWrapper": {
          justifyContent: "center",
          "& button": {
            margin: "10px",
            width: "calc(100% - 20px)",
          },
        },
      },
    },
  };
});
