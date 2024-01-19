import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    InfoBoxWrapper: {
      "&.InfoBoxBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        width: "100%",
        padding: "0",
        "& .rightCol": {
          [theme.breakpoints.down("em")]: {
            textAlign: "left",
            paddingBottom: "20px",
            paddingLeft: 0,
          },
        },
        "& .imagesBox": {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          paddingBottom: "12%",
          [theme.breakpoints.down("em")]: {
            paddingBottom: "16%",
          },
          "& .image1": {
            width: "66.66%",
            minWidth: "66.66%",
            zIndex: 2,
            border: "3px solid #fff",
            borderRadius: "10px",
          },
          "& .image2": {
            width: "66.66%",
            minWidth: "66.66%",
            display: "flex",
            alignSelf: "flex-end",
            position: "absolute",
            top: "20%",
            zIndex: 1,
            border: "3px solid #fff",
            borderRadius: "10px",
          },
        },
      },
    },
  };
});
