import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    fullWidthTextWithImageWrapper: {
      "&.fullWidthTextWithImageBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .boxWrapper": {
          width: "100%",
          overflow: "hidden",
        },
        "& .gridcontainer": {
          padding: "31px 0px 140px",
          fontWeight: "normal",
          width: "100%",
          height: "100%",
          backgroundColor: theme.palette.prelemType2.BACKGROUND, //it's for black bg
          textAlign: "center",
          [theme.breakpoints.up("em")]: {
            padding: "31px 0px 200px",
          },
        },
        "& .heightPercentage": {
          height: "100%",
          textAlign: "center",
        },
        "& .heading": {
          maxWidth: "700px",
        },
        "& .description": {
          display: "flex",
          borderRadius: "5px",
          overflow: "hidden",
          [theme.breakpoints.up("em")]: {
            margin: "16px",
          },
          [theme.breakpoints.up("lg")]: {
            margin: "16px 10%",
          },
        },
        "& .slideWrapper": {
          width: "100%",
          height: "100%",
          marginTop: "-126px",
          [theme.breakpoints.up("em")]: {
            marginTop: "-186px",
          },
        },
        "& .imageWrapper": {
          display: "flex",
          borderRadius: theme.borderRadius.value1,
          overflow: "hidden",
          [theme.breakpoints.up("em")]: {
            margin: "0 16px",
          },
          [theme.breakpoints.up("lg")]: {
            margin: "0 10%",
          },
        },
      },
    },
  };
});

export default useCustomStyle;
