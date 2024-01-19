import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";
import { MaskImg, LeftArrowIcon, RightArrowIcon } from "@platformx/utilities";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    Banner7Wrapper: {
      "&.Banner7Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        width: "100%",
        padding: "0",
        "& .Banner7": {
          "& .mobRevCol": {
            [theme.breakpoints.down("em")]: {
              padding: "25px 0",
              flexDirection: "column-reverse",
            },
            "& .contentLeftWp": {
              display: "flex",
              alignItems: "center",
            },
            "& .rightImgBox": {
              [theme.breakpoints.down("em")]: {
                paddingBottom: "25px",
              },
              "& img": {
                [theme.breakpoints.up("em")]: {
                  WebkitMaskImage: `url(${MaskImg})`,
                  WebkitMaskSize: "cover",
                  WebkitMaskPosition: "center left",
                },
              },
            },
            "& .slick-arrow.slick-next": {
              "&::after": {
                backgroundImage: `url('${RightArrowIcon}')`,
              },
            },
            "& .slick-arrow.slick-prev": {
              "&::after": {
                backgroundImage: `url('${LeftArrowIcon}')`,
              },
            },
          },
          "& .slick-dots": {
            "& li": {
              "& button": {
                overflow: "hidden",
                borderColor: "transparent",
                cursor: "pointer",
                width: "100%",
                borderRadius: "65px",
                background: theme.palette.prelemType1.TITLE,
                padding: "0",
                height: "100%",
              },
            },
          },
        },
      },
    },
  };
});
