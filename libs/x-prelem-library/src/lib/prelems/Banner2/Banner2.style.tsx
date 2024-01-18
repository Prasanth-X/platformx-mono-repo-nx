import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    banner2MainWrapper: {
      "&.banner2Props": {
        position: "relative",
        display: "flex",
        "& img": {
          height: "400px",
          [theme.breakpoints.down("md")]: {
            height: "450px",
          },
        },
        "& .banner2ContentWrapper": {
          position: "absolute",
          display: "flex",
          top: 0,
          bottom: 0,
          margin: "auto",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
        },
        "& .textAlignmentRightWrapper": {
          textAlign: "right",
          [theme.breakpoints.down("md")]: {
            textAlign: "center",
          },
        },
        "& .textAlignmentLeftWrapper": {
          textAlign: "left",
          [theme.breakpoints.down("md")]: {
            textAlign: "center",
          },
        },
        "& .deviderWrapper": {
          // background: theme.palette.primaryColor[100],
          height: "100px",
          width: "1px",
          [theme.breakpoints.down("md")]: {
            height: "1px",
            width: "100px",
          },
        },
      },
    },
  };
});
