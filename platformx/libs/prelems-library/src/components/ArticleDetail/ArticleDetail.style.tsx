import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    articleDetailsWrapper: {
      "&.articleDetailsBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .articleDetailsInnerWrapper": {
          flexDirection: "row",
          [theme.breakpoints.down("em")]: {
            flexDirection: "column-reverse",
          },
        },
        "& .wrapperImg": {
          marginBottom: "0px",
          width: "100%",
          "& img": {
            width: "100%",
            objectFit: "cover",
            height: "500px",
          },
          [theme.breakpoints.down("lg")]: {
            "& img": {
              height: "350px",
            },
          },
          [theme.breakpoints.down("em")]: {
            "& img": {
              height: "500px",
            },
          },
          [theme.breakpoints.down("sm")]: {
            marginBottom: "20px",
            "& img": {
              height: "300px",
            },
          },
        },
        "& .contentWrapper": {
          textAlign: "left",
          paddingRight: "50px",
          [theme.breakpoints.down("md")]: {
            paddingRight: "40px",
          },
        },
        "& .subTitle": {
          display: "none",
        },
      },
    },
  };
});
