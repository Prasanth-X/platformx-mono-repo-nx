import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";
import "./ImageCrousel1.css";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    imageCrousel1Wrapper: {
      "&.imageCrousel1": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .sliderContainer1": {
          "& .imgCrouselWrapper": {
            width: "100%",
          },
          "& .slick-dots": {
            bottom: "13px",
            "& li.slick-active button:before": {
              color: "White",
            },
            "& li button:before": {
              color: "White",
              fontSize: "18px",
            },
          },
        },
        "& .crouselWrapper": {
          position: "relative",
          height: "500px",
          width: "100%",
          objectFit: "cover",
          [theme.breakpoints.down("md")]: {
            height: "430px",
          },
          [theme.breakpoints.down("sm")]: {
            height: "340px",
          },
          "& .imgBoxWrapper": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
          },
          "& .imageCrouselBox": {
            position: "absolute",
            justifyContent: "center",
            flexDirection: "column",
            top: 0,
            left: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            height: "100%",
            "& .typoText": {
              width: "50%",
              marginBottom: "40px",
              // color: theme.palette.bgDark,
              [theme.breakpoints.down("md")]: {
                width: "70%",
                marginBottom: "30px",
              },
              [theme.breakpoints.down("sm")]: {
                width: "100%",
                marginBottom: "25px",
              },
            },
            "& .typoTextAnimation": {
              webkitTransition: "all 300ms ease",
              animation: "6s animLineUp ease-out infinite",
            },
          },
        },
      },
    },
  };
});
