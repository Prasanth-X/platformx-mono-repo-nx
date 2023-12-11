import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    banner6Wrapper: {
      "&.banner6Props": {
        position: "relative",
        display: "flex",
        "& img": { height: "100%" },
        "& .banner6Overlay": {
          position: "absolute",
          top: "0",
          bottom: "0",
          background: "rgba(0, 0, 0, 0.2)",
          width: "100%",
          height: "100%",
        },
        "& .banner6ContentWrapper": {
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0",
          left: "0",
          textAlign: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "15px",
          "& h1": {
            margin: 0,
          },
          "& .descriptionText": {
            [theme.breakpoints.down("md")]: {
              display: "-webkit-box",
              WebkitLineClamp: "4",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            },
          },
        },
      },
    },
  };
});
